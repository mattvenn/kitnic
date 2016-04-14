#!/usr/bin/env coffee
ninjaBuildGen = require('ninja-build-gen')
globule       = require('globule')
path          = require('path')


if process.argv[2] == 'production'
    config = 'production'
else
    config = 'dev'


ninja = ninjaBuildGen('1.5.1', 'build/')


ninja.header("#generated from #{path.basename(module.filename)}
    with '#{config}' config")


# - Rules - #

ninja.rule('copy').run('cp $in $out')
    .description('$command')


ninja.rule('remove').run('rm -rf $in')
    .description('$command')


browserify = "browserify --extension='.jsx' --transform [ babelify
    --presets [ react es2015 ] ]"


if config == 'dev'
    browserify += ' --debug'
else
    browserify += ' -g uglifyify'

persistify = browserify.replace('browserify', 'persistify')

modules = ['react', 'react-dom']
excludes = '-x ' + modules.join(' -x ')
requires = '-r ' + modules.join(' -r ')


rule = ninja.rule('coffee-task')
if (config == 'production')
    rule.run("coffee -- $in -- #{config} $out")
else
    #write to $out.d depfile in makefile format for ninja to keep track of deps
    rule.run("browserify -t coffeeify --extension='.coffee' --list $taskFile > $out.d
        && if [ '$jsMain' != '' ]; then #{browserify} --list $jsMain >> $out.d; fi
        && coffee ./depfileify.coffee $out $out.d
        && coffee -- $in -- #{config} $targetFiles")
    .depfile('$out.d')
    .description("coffee -- $in -- #{config} $targetFiles")


rule = ninja.rule('browserify')
if (config == 'production')
    compress_opts =
        sequences     : true  # join consecutive statemets with the “comma operator”
        properties    : true  # optimize property access: a["foo"] → a.foo
        dead_code     : true  # discard unreachable code
        drop_debugger : true  # discard “debugger” statements
        unsafe        : false # some unsafe optimizations (see below)
        conditionals  : true  # optimize if-s and conditional expressions
        comparisons   : true  # optimize comparisons
        evaluate      : true  # evaluate constant expressions
        booleans      : true  # optimize boolean expressions
        loops         : true  # optimize loops
        unused        : false # drop unused variables/functions
        hoist_funs    : true  # hoist function declarations
        hoist_vars    : false # hoist variable declarations
        if_return     : true  # optimize if-s followed by return/continue
        join_vars     : true  # join var declarations
        cascade       : true  # try to cascade `right` into `left` in sequences
        side_effects  : true  # drop side-effect-free statements
        warnings      : true

    compress_opts = [o + '=' + s for o,s of compress_opts]

    uglifyjs = "uglifyjs --mangle --reserved '#{modules}'
        --compress '#{compress_opts}'"

    rule.run("#{browserify} #{excludes} $in | #{uglifyjs} > $out")
else
    rule.run("#{browserify} #{excludes} --list $in > $out.d
        && coffee ./depfileify.coffee $out $out.d
        && #{persistify} #{excludes} $in -o $out"
    )
    .depfile('$out.d')
    .description("persistify #{excludes} $in -o $out")

rule = ninja.rule('browserify-require')
if (config == 'production')
    rule.run("#{browserify} #{requires} $in | #{uglifyjs} > $out")
else
    rule.run("#{persistify} #{requires} $in -o $out")


ninja.rule('sass').run('sass --sourcemap=none --load-path $path $in $out')


# - Edges - #

ninja.edge('build/vendor.js').using('browserify-require')


images = globule.find('src/images/*')
for f in images
    ninja.edge(f.replace('src','build')).from(f).using('copy')


boardFolders = globule.find('boards/*/*/*', {filter:'isDirectory'})


jsSrc = globule.find(['src/*.js', 'src/*.jsx'])


jsMainTargets = jsSrc.map (f) ->
    temp = f.replace('src', 'build/.temp')
    ninja.edge(temp).from(f).using('copy')
    return temp


jsPageTargets = {}
for folder in boardFolders
    jsPageTargets[folder] = []
    jsSrc.map (f) ->
        temp = f.replace('src', "build/.temp/#{folder}")
        jsPageTargets[folder].push(temp)
        ninja.edge(temp).from(f).using('copy')


sassSrc = globule.find('src/*.scss')


ninja.edge('build/index.css').from('src/main.scss')
    .need(sassSrc).assign('path', 'src/')
    .using('sass')


ninja.edge('build/page.css').from('src/page.scss')
    .need(sassSrc).assign('path', 'src/')
    .using('sass')


ninja.edge('build/app.js').from('build/.temp/render.jsx')
    .need('build/.temp/boards.json').using('browserify')


for folder in boardFolders
    ninja.edge("build/#{folder}/app.js")
        .need("build/.temp/#{folder}/info.json")
        .need("build/.temp/#{folder}/zip-info.json")
        .from("build/.temp/#{folder}/render_page.jsx")
        .using('browserify')


for taskFile in globule.find('tasks/*.coffee')
    task = require("./#{path.dirname(taskFile)}/#{path.basename(taskFile)}")
    addEdge = (t) ->
        if config == 'production'
            ninja.edge(t.targets)
                .from([taskFile].concat(t.deps))
                .using('coffee-task')
        else
            edge = ninja.edge(t.targets[0])
                .from([taskFile].concat(t.deps))
                .assign('taskFile', taskFile)
                .assign('targetFiles', t.targets.join(' '))
                .using('coffee-task')
            if task.moduleDep
                edge.assign('jsMain', t.deps[0])
            for target in t.targets[1..]
                ninja.edge(target).from(t.targets[0])
    if typeof task == 'function'
        for folder in boardFolders
            addEdge(task(folder, config))
    else
        addEdge(task)


ninja.edge('clean').from('build/').using('remove')


all = ninja.edges.filter (c) ->
    'clean' not in c.targets
.reduce (prev, c) ->
    prev.concat(c.targets)
, []


ninja.edge('all').from(all)


ninja.byDefault('all')


ninja.save('build.ninja')


console.log("generated ./build.ninja with '#{config}' config")

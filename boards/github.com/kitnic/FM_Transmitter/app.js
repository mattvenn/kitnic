!function e(t,r,a){function n(o,c){if(!r[o]){if(!t[o]){var s="function"==typeof require&&require;if(!c&&s)return s(o,!0);if(i)return i(o,!0);var l=new Error("Cannot find module '"+o+"'");throw l.code="MODULE_NOT_FOUND",l}var m=r[o]={exports:{}};t[o][0].call(m.exports,function(e){var r=t[o][1][e];return n(r?r:e)},m,m.exports,e,t,r,a)}return r[o].exports}for(var i="function"==typeof require&&require,o=0;o<a.length;o++)n(a[o]);return n}({1:[function(e,t,r){"use strict";var a=e("react"),n=e("react-dom"),i=a.createClass({displayName:"BoardShowcase",getInitialState:function(){return{viewFrontBoard:1}},frontBoardView:function(e){e.preventDefault(),this.setState({viewFrontBoard:1})},backBoardView:function(e){e.preventDefault(),this.setState({viewFrontBoard:0})},render:function(){var e="frontBoard boardDiagram ",t="backBoard boardDiagram ";return this.state.viewFrontBoard?e+=" selectedBoard":t+=" selectedBoard",a.createElement("div",{className:"boardShowcaseContainer"},a.createElement("div",{className:"toggleBoardView"},a.createElement("button",{disabled:this.state.viewFrontBoard,className:"circuitToggleBtn circuitFrontBtn",onClick:this.frontBoardView},"Front"),a.createElement("button",{disabled:!this.state.viewFrontBoard,className:"circuitToggleBtn circuitBackBtn",onClick:this.backBoardView},"Back")),a.createElement("div",{className:"boardShowcase"},a.createElement("div",{className:"boardEdge"}),a.createElement("div",{className:"boardContainer"},a.createElement("img",{className:e,src:"images/top.svg"}),a.createElement("div",{className:"circuitBorderContainer"},a.createElement("div",{className:"circuitBorder"})),a.createElement("img",{className:t,src:"images/bottom.svg"})),a.createElement("div",{className:"boardEdge"})))}});t.exports=i},{react:"react","react-dom":"react-dom"}],2:[function(e,t,r){"use strict";var a=e("react"),n=e("lodash"),i=e("1-click-bom"),o=e("browser-version"),c=a.createClass({displayName:"BOM",getInitialState:function(){var e={},t=!0,r=!1,a=void 0;try{for(var n,o=i.lineData.retailer_list[Symbol.iterator]();!(t=(n=o.next()).done);t=!0){var c=n.value;e[c]=void 0}}catch(s){r=!0,a=s}finally{try{!t&&o["return"]&&o["return"]()}finally{if(r)throw a}}return{onClick:function(){window.open("//1clickBOM.com","_self")},adding:e}},componentDidMount:function(){var e=this,t=o();/Chrome/.test(t)?this.setState({onClick:function(){chrome.webstore.install(void 0,void 0,function(e){return console.log(e)})}}):/Firefox/.test(t)&&this.setState({onClick:function(){window.open("//addons.mozilla.org/firefox/downloads/latest/634060/addon-634060-latest.xpi","_self")}}),window.addEventListener("message",function(t){if(t.source==window&&"extension"==t.data.from)switch(t.data.message){case"register":e.setState({onClick:function(e){window.postMessage({from:"page",message:"quickAddToCart",value:e},"*")}});break;case"updateAddingState":e.setState({adding:t.data.value})}},!1)},render:function(){var e=this;if(0===this.props.items.length)return a.createElement("div",null,"no BOM yet");var t=["reference","quantity","description"],r=i.lineData.retailer_list,o=n.max(this.props.items.map(function(e){return e.partNumbers.length}).concat(1)),c=n.times(o,n.constant("Part Number")),s=function(e,t){return a.createElement("th",{key:"heading-"+e+"-"+t},e)},l=["References","Qty","Description"].map(s);l=l.concat(c.map(s));var m=function(t,r){var n=e.state.adding[t]?"icon-spin1 animate-spin":"icon-basket-3";return a.createElement("th",{key:"heading-"+t,className:"retailerHeading",onClick:e.state.onClick.bind(null,t)},t,a.createElement("span",null," "),a.createElement("i",{style:{fontSize:18},className:n}))};l=l.concat(r.map(m));var d=this.props.items.map(function(e,r){var i=t.map(function(t){return a.createElement("td",{"data-th":t.charAt(0).toUpperCase()+t.slice(1),key:r+"-"+t},e[t])});return i=i.concat(n.times(o,function(t){var r=e.partNumbers[t],n={};return 0!==t||""!==r&&null!=r||(n={backgroundColor:"pink"}),a.createElement("td",{"data-th":"Part Number",key:e.reference+"-partNumber-"+t,style:n},r)})),i=i.concat(n.keys(e.retailers).map(function(t,r){var n={};return""===e.retailers[t]&&(n={backgroundColor:"pink"}),a.createElement("td",{"data-th":t,key:e.reference+"-"+t+"-"+r,style:n},e.retailers[t])})),a.createElement("tr",{className:"tr-"+r%2,key:"bom-tr-"+r},i)});return a.createElement("table",{className:"responsive"},a.createElement("thead",null,a.createElement("tr",null,l)),a.createElement("tbody",null,d))}});t.exports=c},{"1-click-bom":"1-click-bom","browser-version":"browser-version",lodash:"lodash",react:"react"}],3:[function(e,t,r){"use strict";var a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a])}return e},n=e("react"),i=e("react-dom"),o=n.createClass({displayName:"FadeImage",getInitialState:function(){return{opacity:0}},fadeIn:function(){this.setState({opacity:1})},render:function(){var e=this.props.style||{};return e.transition="opacity "+(this.props.speed||1)+"s",e.opacity=this.state.opacity,n.createElement("img",a({},this.props,{style:e,src:this.props.src,onLoad:this.fadeIn}))}});t.exports=o},{react:"react","react-dom":"react-dom"}],4:[function(e,t,r){t.exports={id:"github.com/kitnic/FM_Transmitter",description:"Simple low powered FM radio transmitter based on a MAX2606",site:"https://www.youtube.com/watch?v=ZUxDXXBO3eA",bom:[{reference:"U2",quantity:1,description:"VCO",partNumbers:["Maxim Integrated MAX2606EUT+T"],retailers:{Digikey:"MAX2606EUT+TCT-ND",Mouser:"MAX2606EUT+T",RS:"",Newark:"",Farnell:"2517284"},row:11},{reference:"R1, R2",quantity:2,description:"1.1k 0805",partNumbers:["Panasonic ERJ-6ENF1001V"],retailers:{Digikey:"P1.00KCCT-ND",Mouser:"ERJ6ENF1001V",RS:"7326037",Newark:"64R5369",Farnell:"2303550"},row:11},{reference:"L1",quantity:1,description:"390nH",partNumbers:["Murata LQW2BASR39J00L"],retailers:{Digikey:"490-5673-1-ND",Mouser:"LQW2BASR39J00L",RS:"8390976",Newark:"",Farnell:"2219340"},row:11},{reference:"U1",quantity:1,description:"3.3V regulator",partNumbers:["Diodes Inc. AP2210N-3.3TRG1"],retailers:{Digikey:"AP2210N-3.3TRG1DICT-ND",Mouser:"AP2210N3.3TRG1",RS:"8287426",Newark:"",Farnell:""},row:11},{reference:"MK1",quantity:1,description:"Microphone",partNumbers:["CUI CMC-5042PF-AC"],retailers:{Digikey:"102-1724-ND",Mouser:"CMC5042PFAC",RS:"",Newark:"",Farnell:""},row:11},{reference:"R3",quantity:1,description:"2.2k 0805",partNumbers:["Yageo RC0805FR-072K2L"],retailers:{Digikey:"311-2.20KCRCT-ND",Mouser:"RC0805FR072K2L",RS:"6182928",Newark:"68R0236",Farnell:"2459315"},row:11},{reference:"C4, C5",quantity:2,description:"1nF 0805 NP0",partNumbers:["Yageo CC0805JRNPO9BN102"],retailers:{Digikey:"311-1122-1-ND",Mouser:"CC0805JRNPO9BN102",RS:"6698899",Newark:"68R4850",Farnell:"718567"},row:11},{reference:"C1, C3",quantity:2,description:"2.2uF 0805 X7R",partNumbers:["Yageo CC0805KKX7R7BB225"],retailers:{Digikey:"311-1881-1-ND",Mouser:"CC0805KKX7R7BB225",RS:"",Newark:"65R8872",Farnell:""},row:11},{reference:"VR1",quantity:1,description:"10k pot",partNumbers:["BI Technologies 44WR10KLFT7"],retailers:{Digikey:"987-1046-1-ND",Mouser:"44WR10KLFT7",RS:"",Newark:"16M0773",Farnell:"2411389"},row:11}],repo:"https://github.com/kitnic/FM_Transmitter"}},{}],5:[function(e,t,r){"use strict";var a=e("react"),n=e("react-dom"),i=e("react-document-title"),o=e("./title_bar"),c=e("./fade_image"),s=e("./bom"),l=e("./board_showcase"),m=e("./info.json"),d=e("./zip-info.json"),u=a.createClass({displayName:"Page",render:function(){var e,t=m.id.split("/").slice(2).join(" / "),r=m.id.split("/").slice(0,2).join(" / ");e=""==m.site?a.createElement("div",{className:"disabledSite",title:"no website info available"},a.createElement("span",{className:"octicon octicon-link"}),"website"):a.createElement("a",{href:m.site},a.createElement("span",{className:"octicon octicon-link"})," website");var n=a.createElement("a",{href:m.repo},a.createElement("span",{className:"octicon octicon-repo"})," repo");return a.createElement(i,{title:t+" - kitnic.it"},a.createElement("div",null,a.createElement("div",{className:"Page"},a.createElement(o,null,a.createElement("div",{className:"titleText"},t),a.createElement("div",{className:"subtitleText"},r)),a.createElement("div",{className:"infoBar"},a.createElement("div",{className:"infoBarInner"},a.createElement("div",{className:"infoBarDescription"},m.description),a.createElement("div",{className:"infoBarLinksContainer"},a.createElement("div",{className:"infoBarLinks"},e),a.createElement("div",{className:"infoBarLinks"},n),a.createElement("div",{className:"infoBarLinks"},a.createElement("a",{href:d},a.createElement("span",{className:"octicon octicon-circuit-board"})," gerbers"))))),a.createElement(l,null),a.createElement(s,{items:m.bom?m.bom:[]}))))}});t.exports=u},{"./board_showcase":1,"./bom":2,"./fade_image":3,"./info.json":4,"./title_bar":7,"./zip-info.json":8,react:"react","react-document-title":"react-document-title","react-dom":"react-dom"}],6:[function(e,t,r){"use strict";var a=e("react"),n=e("react-dom"),i=e("./page");n.render(a.createElement(i,null),document.getElementById("content"))},{"./page":5,react:"react","react-dom":"react-dom"}],7:[function(e,t,r){"use strict";var a=e("react"),n=e("react-dom"),i=a.createClass({displayName:"TitleBar",render:function(){return a.createElement("div",{className:"titleBar"},a.createElement("div",{className:"logoContainer"},a.createElement("a",{href:"/"},a.createElement("center",null,a.createElement("img",{className:"logoImg",src:"/images/logo.svg"})))),a.createElement("div",{className:"middleContainer"},this.props.children),a.createElement("div",{className:"submitContainer"},a.createElement("a",{href:"https://github.com/monostable/kitnic/#submitting-your-project"},a.createElement("center",null,a.createElement("img",{className:"submitImage",src:"/images/submit.svg"})))))}});t.exports=i},{react:"react","react-dom":"react-dom"}],8:[function(e,t,r){t.exports="FM_Transmitter-49bf0fa-gerbers.zip"},{}]},{},[6]);
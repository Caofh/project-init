!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var n=e();for(var r in n)("object"==typeof exports?exports:t)[r]=n[r]}}("undefined"!=typeof self?self:this,function(){return function(t){function e(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,e),i.l=!0,i.exports}var n={};return e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="/dist/",e(e.s=1)}([function(t,e,n){"use strict";e.a={name:"",data:function(){return{listOrigin:[],channel:[],channelCount:40,itemCss:"",duration:8,barrageData:[],winW:0,barNum:0,barLoop:null}},props:{baseConfig:{type:Object,default:{container:"",list:[],channel:[60],itemCss:""}}},created:function(){this.listOrigin=this.baseConfig.list,this.channel=this.baseConfig.channel,this.channelCount=this.baseConfig.channelCount,this.itemCss=this.baseConfig.itemCss,this.duration=this.baseConfig.duration},mounted:function(){var t=this;this.$nextTick(function(){t.winW=t.baseConfig.container?document.getElementById(t.baseConfig.container.replace(/\#/,"")).getBoundingClientRect().width:window.innerWidth,t.start()})},methods:{start:function(){for(var t=this,e=this.channel.length,n=[],r=0;r<e;r++)n.push({top:this.channel[r],data:[]});this.barrageData=n,this.$nextTick(function(){t.loopCore()})},loopCore:function(){var t=this;if(!this.listOrigin.length)return void(this.barLoop=setTimeout(function(){t.loopCore()},300));var e=this.listOrigin[0],n=this.getMinChannel();void 0===n?this.barLoop=setTimeout(function(){t.loopCore()},300):(e.left=this.winW,e.top=this.channel[n],this.barrageData[n].data.push(e),this.listOrigin.splice(0,1),this.barLoop=setTimeout(function(){if(t.$refs["item"+n][t.$refs["item"+n].length-1]){var e=t.$refs["item"+n][t.$refs["item"+n].length-1].getBoundingClientRect().width,r=t.duration;if(t.$refs["item"+n][t.$refs["item"+n].length-2]){var i=t.$refs["item"+n][t.$refs["item"+n].length-2].getBoundingClientRect().width,o=t.$refs["item"+n][t.$refs["item"+n].length-2].style["transition-duration"].replace(/\s/g,""),a=(t.winW+i)/parseInt(o);r=Math.ceil((t.winW+e)/a)}t.barrageData[n].data[t.barrageData[n].data.length-1].left=-e,t.barrageData[n].data[t.barrageData[n].data.length-1].duration=r,t.$forceUpdate(),t.barNum++,t.consoleTip("检测到弹幕池子中的数据，共渲染弹幕数："+t.barNum),t.deleteBarrage()}t.loopCore()},300))},getMinChannel:function(){var t=this,e=[];this.channel.map(function(n,r){if(t.$refs["item"+r]){var i=t.$refs["item"+r].length?t.getNodePosition(t.$refs["item"+r][t.$refs["item"+r].length-1]):0;e.push(i)}else e.push(0)});var n=Math.min.apply(null,e);return n<this.winW?e.indexOf(n):void 0},getNodePosition:function(t){if(!t)return 0;var e=t.getBoundingClientRect(),n=this.baseConfig.container?document.getElementById(this.baseConfig.container.replace(/\#/,"")).getBoundingClientRect():"";return(this.baseConfig.container?e.left-n.left:e.left)+e.width},deleteBarrage:function(){var t=this,e=[];this.barrageData.map(function(n,r){var i={top:n.top,data:[]},o=n.data.length;n.data.map(function(e,n){n<o-t.channelCount?i.data.push(null):i.data.push(e)}),e.push(i)}),this.barrageData=e,this.consoleTip("清理过期弹幕")},consoleTip:function(t){console.log(t)},addBarrage:function(t){this.listOrigin.push(t),this.$forceUpdate(),this.consoleTip("向弹幕池子中追加弹幕弹幕数据")},clearBarrage:function(){var t=[];this.barrageData.map(function(e,n){var r={top:e.top,data:[]};t.push(r)}),this.barrageData=t,this.consoleTip("清除所有弹幕数据")},stopLoop:function(){clearTimeout(this.barLoop),this.barLoop=null,this.consoleTip("暂停弹幕轮训")},reStart:function(){this.loopCore(),this.consoleTip("重启弹幕轮训")}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(2);n.d(e,"default",function(){return r.a})},function(t,e,n){"use strict";function r(t){n(3)}var i=n(0),o=n(9),a=n(8),s=r,u=a(i.a,o.a,!1,s,null,null);e.a=u.exports},function(t,e,n){var r=n(4);"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);n(6)("133d32f3",r,!0,{})},function(t,e,n){e=t.exports=n(5)(!1),e.push([t.i,"body{margin:0}body .c-barrage{position:relative;width:100%;height:100%}body .c-barrage .item-part{position:absolute;width:100%;height:100%;overflow-x:hidden}body .c-barrage .item-part .item{box-sizing:border-box;position:absolute;transition-property:all;transition-timing-function:linear;will-change:transform;background:#f0f0f0;color:#000;padding:10px;border-radius:10px}",""])},function(t,e){function n(t,e){var n=t[1]||"",i=t[3];if(!i)return n;if(e&&"function"==typeof btoa){var o=r(i);return[n].concat(i.sources.map(function(t){return"/*# sourceURL="+i.sourceRoot+t+" */"})).concat([o]).join("\n")}return[n].join("\n")}function r(t){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(t))))+" */"}t.exports=function(t){var e=[];return e.toString=function(){return this.map(function(e){var r=n(e,t);return e[2]?"@media "+e[2]+"{"+r+"}":r}).join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var r={},i=0;i<this.length;i++){var o=this[i][0];"number"==typeof o&&(r[o]=!0)}for(i=0;i<t.length;i++){var a=t[i];"number"==typeof a[0]&&r[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="("+a[2]+") and ("+n+")"),e.push(a))}},e}},function(t,e,n){function r(t){for(var e=0;e<t.length;e++){var n=t[e],r=f[n.id];if(r){r.refs++;for(var i=0;i<r.parts.length;i++)r.parts[i](n.parts[i]);for(;i<n.parts.length;i++)r.parts.push(o(n.parts[i]));r.parts.length>n.parts.length&&(r.parts.length=n.parts.length)}else{for(var a=[],i=0;i<n.parts.length;i++)a.push(o(n.parts[i]));f[n.id]={id:n.id,refs:1,parts:a}}}}function i(){var t=document.createElement("style");return t.type="text/css",l.appendChild(t),t}function o(t){var e,n,r=document.querySelector("style["+v+'~="'+t.id+'"]');if(r){if(h)return g;r.parentNode.removeChild(r)}if(b){var o=p++;r=d||(d=i()),e=a.bind(null,r,o,!1),n=a.bind(null,r,o,!0)}else r=i(),e=s.bind(null,r),n=function(){r.parentNode.removeChild(r)};return e(t),function(r){if(r){if(r.css===t.css&&r.media===t.media&&r.sourceMap===t.sourceMap)return;e(t=r)}else n()}}function a(t,e,n,r){var i=n?"":r.css;if(t.styleSheet)t.styleSheet.cssText=C(e,i);else{var o=document.createTextNode(i),a=t.childNodes;a[e]&&t.removeChild(a[e]),a.length?t.insertBefore(o,a[e]):t.appendChild(o)}}function s(t,e){var n=e.css,r=e.media,i=e.sourceMap;if(r&&t.setAttribute("media",r),m.ssrId&&t.setAttribute(v,e.id),i&&(n+="\n/*# sourceURL="+i.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */"),t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}var u="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!u)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var c=n(7),f={},l=u&&(document.head||document.getElementsByTagName("head")[0]),d=null,p=0,h=!1,g=function(){},m=null,v="data-vue-ssr-id",b="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());t.exports=function(t,e,n,i){h=n,m=i||{};var o=c(t,e);return r(o),function(e){for(var n=[],i=0;i<o.length;i++){var a=o[i],s=f[a.id];s.refs--,n.push(s)}e?(o=c(t,e),r(o)):o=[];for(var i=0;i<n.length;i++){var s=n[i];if(0===s.refs){for(var u=0;u<s.parts.length;u++)s.parts[u]();delete f[s.id]}}}};var C=function(){var t=[];return function(e,n){return t[e]=n,t.filter(Boolean).join("\n")}}()},function(t,e){t.exports=function(t,e){for(var n=[],r={},i=0;i<e.length;i++){var o=e[i],a=o[0],s=o[1],u=o[2],c=o[3],f={id:t+":"+i,css:s,media:u,sourceMap:c};r[a]?r[a].parts.push(f):n.push(r[a]={id:a,parts:[f]})}return n}},function(t,e){t.exports=function(t,e,n,r,i,o){var a,s=t=t||{},u=typeof t.default;"object"!==u&&"function"!==u||(a=t,s=t.default);var c="function"==typeof s?s.options:s;e&&(c.render=e.render,c.staticRenderFns=e.staticRenderFns,c._compiled=!0),n&&(c.functional=!0),i&&(c._scopeId=i);var f;if(o?(f=function(t){t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,t||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),r&&r.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(o)},c._ssrRegister=f):r&&(f=r),f){var l=c.functional,d=l?c.render:c.beforeCreate;l?(c._injectStyles=f,c.render=function(t,e){return f.call(e),d(t,e)}):c.beforeCreate=d?[].concat(d,f):[f]}return{esModule:a,exports:s,options:c}}},function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"c-barrage"},t._l(t.barrageData,function(e,r){return n("div",{ref:"itemPart",refInFor:!0,staticClass:"item-part"},t._l(e.data,function(e,i){return e?n("div",{key:i,ref:"item"+r,refInFor:!0,staticClass:"item",style:{transform:"translateX("+e.left+"px)","transition-duration":(e.duration||8)+"s",top:e.top+"px"}},[n("div",{style:t.itemCss?t.itemCss:"",domProps:{innerHTML:t._s(e.itemTemplate?e.itemTemplate:e.content)}})]):t._e()}),0)}),0)},i=[],o={render:r,staticRenderFns:i};e.a=o}])});
//# sourceMappingURL=index.js.map
(function(t){function e(e){for(var r,a,u=e[0],o=e[1],c=e[2],l=0,h=[];l<u.length;l++)a=u[l],Object.prototype.hasOwnProperty.call(s,a)&&s[a]&&h.push(s[a][0]),s[a]=0;for(r in o)Object.prototype.hasOwnProperty.call(o,r)&&(t[r]=o[r]);A&&A(e);while(h.length)h.shift()();return i.push.apply(i,c||[]),n()}function n(){for(var t,e=0;e<i.length;e++){for(var n=i[e],r=!0,u=1;u<n.length;u++){var o=n[u];0!==s[o]&&(r=!1)}r&&(i.splice(e--,1),t=a(a.s=n[0]))}return t}var r={},s={app:0},i=[];function a(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=t,a.c=r,a.d=function(t,e,n){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)a.d(n,r,function(e){return t[e]}.bind(null,r));return n},a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="/yijinnumber/";var u=window["webpackJsonp"]=window["webpackJsonp"]||[],o=u.push.bind(u);u.push=e,u=u.slice();for(var c=0;c<u.length;c++)e(u[c]);var A=o;i.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},1200:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"phoneInfo"},[n("h2",[t._v("請輸入您的電話號碼")]),n("h4"),n("input",{attrs:{id:"phoneNum",type:"text",maxlength:"10"},on:{input:t.phoneCheck}}),n("div",{staticClass:"phoneResult"},t._l(t.phoneResult,(function(e){return n("div",{staticClass:"resultText"},[n("h3",[t._v(t._s(e[0]))]),n("a",{attrs:{href:e[2],target:"_blank"}},[t._v(t._s(e[1]))])])})),0)])},s=[],i={props:{phoneResult:Array},methods:{phoneCheck:function(t){this.$emit("phoneCheck",t)}},mounted:function(){}},a=i,u=(n("a249"),n("2877")),o=Object(u["a"])(a,r,s,!1,null,"6ac33977",null);e["default"]=o.exports},"4b19":function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"idInfo"},[n("h2",[t._v("請輸入您的身分證字號")]),n("h4",[t._v("算人生際遇")]),n("input",{attrs:{id:"idNum",type:"text",maxlength:"10"},on:{input:t.idCheck}}),n("div",{staticClass:"idResult"},t._l(t.idResult,(function(e,r){return n("div",{staticClass:"idResultText"},[n("h3",[t._v(t._s(e[0])+" ")]),n("a",{attrs:{href:e[2],target:"_blank"}},[t._v(t._s(e[1]))]),n("h3",[t._v(t._s(t.idResultLimit(r)[0]))]),n("h3",[t._v("|")]),n("h3",[t._v(t._s(t.idResultLimit(r)[1])+" ")]),n("h4",[t._v("歲")])])})),0)])},s=[],i={props:{idResult:Array,idResultLimit:Function},methods:{idCheck:function(t){this.$emit("idCheck",t)}}},a=i,u=(n("9c7a"),n("2877")),o=Object(u["a"])(a,r,s,!1,null,"c0d3bbb0",null);e["default"]=o.exports},"4ce4":function(t,e,n){},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("transition",{attrs:{name:"page",mode:"out-in"}},[n("router-view",{attrs:{phoneResult:t.phoneResult,idResult:t.idResult,idResultLimit:t.idResultLimit},on:{phoneCheck:t.phoneCheck,idCheck:t.idCheck}})],1),n("div",{staticClass:"list"},[n("router-link",{attrs:{to:"/PhoneNumber"}},[t._v("算手機能量")]),n("router-link",{attrs:{to:"/IDNumber"}},[t._v("算流年")])],1)],1)},i=[],a=(n("4de4"),n("d81d"),n("a434"),n("b0c0"),n("ac1f"),n("5319"),n("1276"),n("498a"),{data:function(){return{phoneNum:"",idNum:"",code:{A:"01",B:"02",C:"03",D:"04",E:"05",F:"06",G:"07",H:"08",I:"09",J:"10",K:"11",L:"12",M:"13",N:"14",O:"15",P:"16",Q:"17",R:"18",S:"19",T:"20",U:"21",V:"22",W:"23",X:"24",Y:"25",Z:"26"},numData:{0:{name:"伏位",num:["11","22","33","44","66","77","88","99","00","55"],searchUrl:"https://www.google.com.tw/search?sxsrf=ALeKk03bdwORn-GjJP1a3jcEIxnFaZLfRA%3A1609738447488&ei=z6jyX8GmHZ6Rr7wPmZqIiAQ&q=%E6%98%93%E7%B6%93+%E4%BC%8F%E4%BD%8D&oq=%E6%98%93%E7%B6%93+%E4%BC%8F%E4%BD%8D&gs_lcp=CgZwc3ktYWIQAzICCAA6BAgAEEdQqpsnWN6sJ2DOridoAHACeACAAYQBiAHFApIBAzEuMpgBAKABAaABAqoBB2d3cy13aXrIAQjAAQE&sclient=psy-ab&ved=0ahUKEwiByt-Cx4HuAhWeyIsBHRkNAkEQ4dUDCA0&uact=5"},1:{name:"延年",num:["19","26","34","43","62","78","87","91"],searchUrl:"https://www.google.com.tw/search?sxsrf=ALeKk01EK2j-2gzA0bwSbBcX_TMPZV8kXg%3A1609740617751&ei=SbHyX8e6LcObmAX-z6vwDQ&q=%E6%98%93%E7%B6%93+%E5%BB%B6%E5%B9%B4&oq=%E6%98%93%E7%B6%93+%E5%BB%B6%E5%B9%B4&gs_lcp=CgZwc3ktYWIQAzIECCMQJ1DNWljNWmCXYWgAcAB4AIABhwGIAeMBkgEDMS4xmAEAoAECoAEBqgEHZ3dzLXdpesABAQ&sclient=psy-ab&ved=0ahUKEwiHg86Nz4HuAhXDDaYKHf7nCt4Q4dUDCA0&uact=5"},2:{name:"生氣",num:["14","28","39","41","67","76","82","93"],searchUrl:"https://www.google.com.tw/search?sxsrf=ALeKk03bplJbfPexageQH0MVBvSD9XUPwg%3A1609740202311&ei=qq_yX-rMEqWImAW8uqGoAw&q=%E6%98%93%E7%B6%93+%E7%94%9F%E6%B0%A3&oq=%E6%98%93%E7%B6%93+%E7%94%9F%E6%B0%A3&gs_lcp=CgZwc3ktYWIQAzICCAA6BAgjECdQi54KWIueCmCDpQpoAHAAeACAAYUBiAHpAZIBAzAuMpgBAKABAqABAaoBB2d3cy13aXrAAQE&sclient=psy-ab&ved=0ahUKEwjqycHHzYHuAhUlBKYKHTxdCDUQ4dUDCA0&uact=5"},3:{name:"天醫",num:["13","27","31","49","68","72","86","94"],searchUrl:"https://www.google.com.tw/search?sxsrf=ALeKk00x-kF-mkuD4V8Q3kqblqfYCFqUWA%3A1609740458405&ei=qrDyX4-cGI7c0gTevqugDg&q=%E6%98%93%E7%B6%93+%E5%A4%A9%E9%86%AB&oq=%E6%98%93%E7%B6%93+%E5%A4%A9%E9%86%AB&gs_lcp=CgZwc3ktYWIQAzIECCMQJzoFCCEQoAFQ7L0JWPfOCWDb1gloAnAAeACAAXuIAZQDkgEDMi4ymAEAoAECoAEBqgEHZ3dzLXdpesABAQ&sclient=psy-ab&ved=0ahUKEwiPmdDBzoHuAhUOrpQKHV7fCuQQ4dUDCA0&uact=5"},4:{name:"禍害",num:["17","23","32","46","64","71","89","98"],searchUrl:"https://www.google.com.tw/search?sxsrf=ALeKk01qgcGAzOzFQLRNuFkxV6uQgBSFNw%3A1609740385149&ei=YbDyX_DkCLLFmAXu3IPgAQ&q=%E6%98%93%E7%B6%93+%E7%A6%8D%E5%AE%B3&oq=%E6%98%93%E7%B6%93+%E7%A6%8D%E5%AE%B3&gs_lcp=CgZwc3ktYWIQAzICCAA6BAgjECc6BQgAEM0CULB5WPSFAWCliwFoAXAAeACAAaMBiAHmA5IBAzEuM5gBAKABAqABAaoBB2d3cy13aXrAAQE&sclient=psy-ab&ved=0ahUKEwiwmdmezoHuAhWyIqYKHW7uABwQ4dUDCA0&uact=5"},5:{name:"六煞",num:["16","29","38","47","61","74","83","92"],searchUrl:"https://www.google.com.tw/search?sxsrf=ALeKk03Ezd7hQDy2ujcP1sSl31KRUV2iVg%3A1609740403720&ei=c7DyX7bKK6ummAWlsLm4Cw&q=%E6%98%93%E7%B6%93+%E5%85%AD%E7%85%9E&oq=%E6%98%93%E7%B6%93+%E5%85%AD%E7%85%9E&gs_lcp=CgZwc3ktYWIQAzICCAA6BAgjECdQr2VYr2VgrmtoAXAAeACAAWyIAZ8CkgEDMS4ymAEAoAECoAEBqgEHZ3dzLXdpesABAQ&sclient=psy-ab&ved=0ahUKEwj2z8anzoHuAhUrE6YKHSVYDrcQ4dUDCA0&uact=5"},6:{name:"絕命",num:["12","21","37","48","69","73","84","96"],searchUrl:"https://www.google.com.tw/search?sxsrf=ALeKk03-riZV9TQLr9amU9Zo-R1NdQ0Mig%3A1609740418184&ei=grDyX_bhCpDU0gTCyrO4Cg&q=%E6%98%93%E7%B6%93+%E7%B5%95%E5%91%BD&oq=%E6%98%93%E7%B6%93+%E7%B5%95%E5%91%BD&gs_lcp=CgZwc3ktYWIQAzICCAA6BAgjECdQpI4BWKSOAWDPqwFoAXAAeACAAWKIAYECkgEBM5gBAKABAqABAaoBB2d3cy13aXrAAQE&sclient=psy-ab&ved=0ahUKEwj2qrmuzoHuAhUQqpQKHULlDKcQ4dUDCA0&uact=5"},7:{name:"五鬼",num:["18","24","36","42","63","79","81","97"],searchUrl:"https://www.google.com.tw/search?sxsrf=ALeKk032jL0CCQv7ujOPFGITywTUvElbxw%3A1609740440878&ei=mLDyX9eKNYLWmAXQ576gCw&q=%E6%98%93%E7%B6%93+%E4%BA%94%E9%AC%BC&oq=%E6%98%93%E7%B6%93+%E4%BA%94%E9%AC%BC&gs_lcp=CgZwc3ktYWIQAzICCAA6BAgjECdQ2HtY2Htgy4IBaABwAHgAgAFYiAH2AZIBATOYAQCgAQKgAQGqAQdnd3Mtd2l6wAEB&sclient=psy-ab&ved=0ahUKEwjXtqK5zoHuAhUCK6YKHdCzD7QQ4dUDCA0&uact=5"}},checkResultData:[],phoneResult:[],idResult:[],idCheckData1:[],idCheckData2:[],idCheckResultData:[]}},methods:{phoneCheck:function(t){if(this.checkResultData=[],!t.target.composing){this.phoneNum=t.target.value.trim(),this.phoneNum=this.phoneNum.replace("\\u200B","");for(var e=[],n=0;n<this.phoneNum.length-1;n++)e.push(this.phoneNum[n]+this.phoneNum[n+1]);this.phoneResult=this.remove0055(e)}},remove0055:function(t){var e=t.filter((function(t){return"55"!==t&&"00"!==t}));return this.check5(e)},check5:function(t){for(var e=[],n=0;n<t.length;n++)"95"==t[n]&&"51"==t[n+1]?(e.push("91"),e.push("19")):"51"==t[n]&&"95"==t[n-1]?e.push("91"):"15"==t[n]&&"59"==t[n+1]?(e.push("19"),e.push("91")):"59"==t[n]&&"15"==t[n-1]?e.push("19"):"5"==t[n].split("")[1]&&n!==t.length-1?(e.push(t[n].split("")[0]+t[n+1].split("")[1]),t.splice(n+1,1)):"5"==t[n].split("")[0]&&0==n?e.push(t[n+1].split("")[0]+t[n+1].split("")[0]):"5"==t[n].split("")[1]&&n==t.length-1?(e.push(t[n].split("")[0]+t[n].split("")[0]),t.splice(n+1,1)):"5"===t[n].split("")[0]&&"5"===t[n].split("")[1]||e.push(t[n]);return this.check0(e)},check0:function(t){for(var e=[],n=0;n<t.length;n++)"0"==t[n].split("")[1]&&n!=t.length-1?e.push(t[n].split("")[0]+t[n].split("")[0]):"0"==t[n].split("")[0]&&n!=t.length-1||"0"==t[n].split("")[0]&&0==n||"0"==t[n].split("")[0]&&n==t.length-1?e.push(t[n].split("")[1]+t[n].split("")[1]):"0"==t[n].split("")[1]&&n==t.length-1?e.push(t[n].split("")[0]+t[n].split("")[0]):e.push(t[n]);return this.checkResult(e)},checkResult:function(t){var e=this;return this.checkResultData=t.map((function(t){for(var n in e.numData)for(var r in e.numData[n].num)if(t==e.numData[n].num[r])return[t,e.numData[n].name,e.numData[n].searchUrl]}))},upperCase:function(t){var e=t.toUpperCase();return e},idTempData:function(t){for(var e="",n=0;n<t.length;n++)e+=this.leeterToNum(t[n]);return e},leeterToNum:function(t){for(var e in this.code)if(t==e)return this.code[e];return t},idCheck:function(t){this.idCheckData1=[];var e=t.target.value,n=this.upperCase(e);this.idTempData(n);for(var r=this.idTempData(n),s=0;s<r.length-1;s++)this.idCheckData1.push(r[s]+r[s+1]);var i=this.idCheckData1;this.idResult=this.remove0055(i)},idResultLimit:function(t){for(var e=t+1,n=t+13,r=0;r<this.idResult.length;r++)t>0&&(e=5*t+8,n=5*t+13);return[e,n]}}}),u=a,o=(n("7faf"),n("2877")),c=Object(o["a"])(u,s,i,!1,null,null,null),A=c.exports,l=(n("d3b7"),n("8c4f"));r["a"].use(l["a"]);var h=[{path:"/",name:"Home"},{path:"/PhoneNumber",name:"PhoneNumber",component:function(){return Promise.resolve().then(n.bind(null,"1200"))}},{path:"/IDNumber",name:"IDNumber",component:function(){return Promise.resolve().then(n.bind(null,"4b19"))}}],p=new l["a"]({routes:h}),d=p,m=n("2f62");r["a"].use(m["a"]);var E=new m["a"].Store({state:{},mutations:{},actions:{},modules:{}}),f=n("1200"),g=n("4b19");r["a"].component("PhoneNumber",f["default"]),r["a"].component("IDNumber",g["default"]),r["a"].config.productionTip=!1,new r["a"]({router:d,store:E,render:function(t){return t(A)}}).$mount("#app")},"7faf":function(t,e,n){"use strict";var r=n("b8ff"),s=n.n(r);s.a},"9c7a":function(t,e,n){"use strict";var r=n("b166"),s=n.n(r);s.a},a249:function(t,e,n){"use strict";var r=n("4ce4"),s=n.n(r);s.a},b166:function(t,e,n){},b8ff:function(t,e,n){}});
//# sourceMappingURL=app.282d8b1a.js.map
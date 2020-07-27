(this["webpackJsonpSorting-Time-Visualizer"]=this["webpackJsonpSorting-Time-Visualizer"]||[]).push([[0],{30:function(e,t,n){e.exports=n.p+"static/media/card-flip.2317ec81.mp3"},37:function(e,t,n){e.exports=n(51)},42:function(e,t,n){},43:function(e,t,n){},49:function(e,t,n){},50:function(e,t,n){},51:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(18),i=n.n(o),c=(n(42),n(43),n(7)),s=n.n(c),l=n(10),u=n(15),h=n(19),d=n(20),m=n(12),g=n(25),f=n(23),b=n(66),y=n(69),p=n(68),v=n(70),k=n(71),x=Object(b.a)({root:{width:250,color:"rgba(100%, 100%, 100%, 82.5%)"},input:{width:50,color:"rgba(100%, 100%, 100%, 82.5%)",backgroundColor:"rgba(100%, 100%, 100%, 20%)",borderRadius:"10px"}});function E(e){var t=x(),n=r.a.useState(25),o=Object(l.a)(n,2),i=o[0],c=o[1];Object(a.useEffect)((function(){i<5?e.onSlide(5):i>125?e.onSlide(125):e.onSlide(i)}),[i]);return r.a.createElement("div",{className:t.root},r.a.createElement(p.a,{className:"slider-label",id:"input-slider",gutterBottom:!0},"Array Length"),r.a.createElement(y.a,{container:!0,spacing:2,alignItems:"center"},r.a.createElement(y.a,{item:!0,xs:!0},r.a.createElement(v.a,{min:5,max:125,style:{color:"rgba(100%, 100%, 100%, 82.5%)"},value:"number"===typeof i?i:0,onChange:function(e,t){c(t)},"aria-labelledby":"input-slider"})),r.a.createElement(y.a,{item:!0},r.a.createElement(k.a,{className:t.input,value:i,margin:"dense",onChange:function(e){c(""===e.target.value?"":Number(e.target.value))},onBlur:function(){i<5?c(5):i>125&&c(125)},inputProps:{step:10,min:5,max:125,type:"number","aria-labelledby":"input-slider",style:{textAlign:"center"}}}))))}var C=Object(b.a)({root:{width:200,color:"rgba(100%, 100%, 100%, 82.5%)"}});function S(e){var t=C(),n=r.a.useState(10),o=Object(l.a)(n,2),i=o[0],c=o[1];Object(a.useEffect)((function(){return e.onSlide(i)}),[i]);return r.a.createElement("div",{className:t.root},r.a.createElement(p.a,{className:"slider-label",id:"continuous-slider",gutterBottom:!0},"Sorting Speed"),r.a.createElement(y.a,{container:!0,spacing:2},r.a.createElement(y.a,{item:!0}),r.a.createElement(y.a,{item:!0,xs:!0},r.a.createElement(v.a,{value:i,onChange:function(e,t){c(t)},style:{color:"rgba(100%, 100%, 100%, 82.5%)"},"aria-labelledby":"continuous-slider"})),r.a.createElement(y.a,{item:!0})))}n(49);var j=function(e){Object(g.a)(n,e);var t=Object(f.a)(n);function n(e){var a;return Object(h.a)(this,n),(a=t.call(this,e)).state={algorithm:"selection"},a}return Object(d.a)(n,[{key:"handleSpeedChange",value:function(e){this.props.onSpeedChange(e)}},{key:"handleGenerate",value:function(e){this.props.onGenerate(e)}},{key:"handleReset",value:function(){this.props.onReset()}},{key:"handleExecute",value:function(){var e=document.getElementById("menu-select").value;this.props.onExecute(e)}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{id:"menu-container"},r.a.createElement("div",{className:"menu-item",id:"selection-sort",onClick:function(){return e.handleGenerate()}},"New Array"),r.a.createElement("div",{className:"menu-item",id:"selection-sort",onClick:function(){return e.handleReset()}},"Reset Array"),r.a.createElement(S,{onSlide:function(t){return e.handleSpeedChange(t)}}),r.a.createElement(E,{onSlide:function(t){return e.handleGenerate(t)}}),r.a.createElement("select",{className:"menu-item",id:"menu-select"},r.a.createElement("option",{value:"selection"},"Selection Sort"),r.a.createElement("option",{value:"insertion"},"Insertion Sort"),r.a.createElement("option",{value:"merge"},"Merge Sort"),r.a.createElement("option",{value:"quick"},"Quicksort")),r.a.createElement("div",{className:"menu-item",id:"execute",onClick:function(){return e.handleExecute()}},"Execute"))}}]),n}(r.a.Component);n(50);function w(e){for(var t,n,a=[],r=0;r<e.length;r++){t=r,a.push([r,"#8a2be2","sorted"]);for(var o=r+1;o<e.length;o++)e[o]<e[t]?(t=o,a.push([o,"#8a2be2"])):a.push([o,"#dc143c"]);t>r&&(n=e[t],e[t]=e[r],e[r]=n,a.push([r,t]))}return a}function O(e){for(var t=[],n=1;n<e.length;n++){var a=n-1,r=e[n];for(t.push([n,"#8a2be2"]);a>=0&&e[a]>r;){var o=e[a+1];e[a+1]=e[a],e[a]=o,t.push([a,a+1]),a--}}return t}var I=n(29),R=n.n(I),A=n(30),N=n.n(A),B="#24682d",M=new R.a(N.a,{throttleMs:50}),T=function(e){Object(g.a)(n,e);var t=Object(f.a)(n);function n(e){var a;return Object(h.a)(this,n),(a=t.call(this,e)).state={array:[],bars:[]},a.cachedArray=[],a.animationInterval=0,a.defaultLength=60,a.maxHeight=550,a.isRunning=!1,a.generateArray=a.generateArray.bind(Object(m.a)(a)),a.resetArray=a.resetArray.bind(Object(m.a)(a)),a.speedChange=a.speedChange.bind(Object(m.a)(a)),a.handleExecute=a.handleExecute.bind(Object(m.a)(a)),a}return Object(d.a)(n,[{key:"componentDidMount",value:function(){this.generateArray()}},{key:"generateArray",value:function(e){if(this.isRunning){for(var t=document.getElementsByClassName("array"),n=0;n<t.length;n++)console.log(t),t[n].style.backgroundColor=B;this.isRunning=!1}var a;e?(a=e,this.defaultLength=e):a=this.defaultLength;var o=window.innerWidth,i=Math.max(o/(10*a),1.5),c=Math.max((o-100)/(1.75*a),7),s=Math.max(c/10,3),l=s/3;this.maxHeight=.85*(document.getElementById("bars-container").getBoundingClientRect().bottom-document.getElementById("menu-container").getBoundingClientRect().bottom);for(var u=[],h=0;h<a;h++)u.push(Math.floor(Math.random()*this.maxHeight+15));this.setState({array:u,bars:u.map((function(e,t){return r.a.createElement("div",{className:"array",key:t,idx:t,color:B,type:void 0,style:{height:e,margin:i,width:c,borderTopLeftRadius:s,borderTopRightRadius:s,borderBottomLeftRadius:l,borderBottomRightRadius:l}})}))}),this.cachedArray=[];for(var d=0;d<u.length;d++)this.cachedArray.push(u[d])}},{key:"resetArray",value:function(){var e=document.getElementsByClassName("array"),t=e.length;if(this.isRunning){for(var n=0;n<t;n++)e[n].style.backgroundColor=B;this.isRunning=!1}for(var a=[],r=0;r<t;r++)e[r].style.height=this.cachedArray[r]+"px",e[r].type=void 0,a.push(this.cachedArray[r]);this.setState({array:a})}},{key:"speedChange",value:function(e){this.animationInterval=e<5?300:1500/e-15}},{key:"animateSelectionSort",value:function(){var e=Object(u.a)(s.a.mark((function e(){var t,n,a,r,o,i,c,u,h,d,m,g,f;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=w(this.state.array),(n=document.getElementsByClassName("array"))[0].style.backgroundColor="#8a2be2",e.next=5,L(this.animationInterval);case 5:a=1;case 6:if(!(a<t.length)){e.next=48;break}if(this.isRunning){e.next=9;break}return e.abrupt("return");case 9:if("number"!==typeof t[a][1]){e.next=28;break}return M.play(),n[t[a-1][0]].style.backgroundColor=B,r=Object(l.a)(t[a],2),o=r[0],i=r[1],n[o].style.backgroundColor="#ffff00",n[i].style.backgroundColor="#ffff00",e.next=17,L(this.animationInterval);case 17:return c=n[o].style.height,n[o].style.height=n[i].style.height,n[i].style.height=c,e.next=22,L(this.animationInterval);case 22:return n[o].style.backgroundColor="#8a2be2",n[i].style.backgroundColor=B,e.next=26,L(this.animationInterval);case 26:e.next=45;break;case 28:if(u=Object(l.a)(t[a],3),h=u[0],d=u[1],m=u[2],n[h].style.backgroundColor=d,n[h].type=m,"#dc143c"===t[a-1][1]&&(n[t[a-1][0]].style.backgroundColor=B),"#8a2be2"!==d){e.next=43;break}g=h-1;case 34:if(!(g>0)){e.next=43;break}if("sorted"!==n[g].type){e.next=37;break}return e.abrupt("break",43);case 37:if("rgb(138, 43, 226)"!==n[g].style.backgroundColor){e.next=40;break}return n[g].style.backgroundColor=B,e.abrupt("break",43);case 40:g--,e.next=34;break;case 43:return e.next=45,L(this.animationInterval);case 45:a++,e.next=6;break;case 48:return n[n.length-1].style.backgroundColor="#8a2be2",e.next=51,L(this.animationInterval);case 51:f=0;case 52:if(!(f<n.length)){e.next=60;break}return n[f].style.backgroundColor=B,n[f].type=void 0,e.next=57,L(.33*this.animationInterval);case 57:f++,e.next=52;break;case 60:this.isRunning=!1;case 61:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"animateInsertionSort",value:function(){var e=Object(u.a)(s.a.mark((function e(){var t,n,a,r,o,i,c,u,h,d,m,g;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=O(this.state.array),(n=document.getElementsByClassName("array"))[0].style.backgroundColor="#8a2be2",e.next=5,L(this.animationInterval);case 5:a=0;case 6:if(!(a<t.length)){e.next=38;break}if(this.isRunning){e.next=10;break}for(r=0;r<n.length;r++)n[r].style.backgroundColor=B;return e.abrupt("return");case 10:if("number"!==typeof t[a][1]){e.next=31;break}return o=Object(l.a)(t[a],2),i=o[0],c=o[1],n[i].style.backgroundColor="#ffff00",n[c].style.backgroundColor="#dc143c",e.next=16,L(this.animationInterval);case 16:return u=n[i].style.height,n[i].style.height=n[c].style.height,n[c].style.height=u,n[i].style.backgroundColor="#dc143c",n[c].style.backgroundColor="#ffff00",e.next=23,L(this.animationInterval);case 23:if(n[c].style.backgroundColor="#8a2be2",a!==t.length-1&&"number"===typeof t[a+1][1]){e.next=29;break}return M.play(),e.next=28,L(this.animationInterval);case 28:n[i].style.backgroundColor="#8a2be2";case 29:e.next=35;break;case 31:return h=Object(l.a)(t[a],2),d=h[0],m=h[1],n[d].style.backgroundColor=m,e.next=35,L(this.animationInterval);case 35:a++,e.next=6;break;case 38:return e.next=40,L(this.animationInterval);case 40:g=0;case 41:if(!(g<n.length)){e.next=48;break}return n[g].style.backgroundColor=B,e.next=45,L(.33*this.animationInterval);case 45:g++,e.next=41;break;case 48:this.isRunning=!1;case 49:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"animateMergeSort",value:function(){var e=Object(u.a)(s.a.mark((function e(){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log("Todo: Merge sort");case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()},{key:"animateQuickSort",value:function(){var e=Object(u.a)(s.a.mark((function e(){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log("Todo: Quicksort");case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()},{key:"testSort",value:function(e){for(var t=0;t<1e3;t++){for(var n=[],a=0;a<1e3;a++)n.push(Math.floor(500*Math.random()+20));var r=[].concat(n);e(n),r.sort((function(e,t){return e-t})),console.log(G(n,r))}}},{key:"handleExecute",value:function(){var e=Object(u.a)(s.a.mark((function e(t){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:this.isRunning=!0,"selection"===t?this.animateSelectionSort():"insertion"===t?this.animateInsertionSort():"merge"===t?this.animateMergeSort():"quick"===t&&this.animateQuickSort();case 2:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("div",{id:"color-strip"}),r.a.createElement(j,{onGenerate:this.generateArray,onReset:this.resetArray,onSpeedChange:this.speedChange,onExecute:this.handleExecute}),r.a.createElement("div",{id:"bars-container"},this.state.bars))}}]),n}(r.a.Component);function L(e){return new Promise((function(t){return setTimeout(t,e)}))}function G(e,t){if(e.length!==t.length)return!1;for(var n=0;n<e.length;n++)if(e[n]!==t[n])return!1;return!0}var Q=function(){return r.a.createElement("div",{className:"App"},r.a.createElement(T,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(Q,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[37,1,2]]]);
//# sourceMappingURL=main.1e7b8b08.chunk.js.map
(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{142:function(e,n,t){"use strict";t.r(n),t.d(n,"TestComponent",function(){return a});var o=t(17),u=t(0),c=t.n(u),a=function(e){var n=Object(u.useState)("name"),t=Object(o.a)(n,2),a=t[0],l=t[1],r=Object(u.useState)(Math.pow(e.count,2)),i=Object(o.a)(r,2),m=i[0],f=i[1],s=Object(u.useState)(null),p=Object(o.a)(s,2),b=p[0],d=p[1],j=Object(u.useRef)(null);Object(u.useEffect)(function(){console.log("componentDidMount");var e=setTimeout(E,1e3);return function(){console.log("componentWillUnmount \u043f\u0440\u0438 \u0443\u0434\u0430\u043b\u0435\u043d\u0438\u0438 \u043a\u043e\u043c\u043f\u043e\u043d\u0435\u043d\u0442\u0430"),clearTimeout(e)}},[1]),Object(u.useEffect)(function(){return console.log("componentDidUpdate",e),e.count!==b&&(d(e.count),f(Math.pow(e.count,2))),function(){console.log("componentWillUnmount \u043f\u0440\u0438 \u043f\u0435\u0440\u0435\u0440\u0435\u043d\u0434\u0435\u0440\u0435 \u043a\u043e\u043c\u043f\u043e\u043d\u0435\u043d\u0442\u0430")}});var O=Object(u.useMemo)(function(){return console.log("\u0432\u044b\u0437\u044b\u0432\u0430\u0435\u0442\u0441\u044f \u043f\u0440\u0438 \u0438\u0437\u043c\u0435\u043d\u0435\u043d\u0438\u0438 count"),m<<5},[m]),E=function(){return f(function(e){return m+1})};return c.a.createElement("div",null,c.a.createElement("p",null,"name: ",a),c.a.createElement("p",null,"count: ",m),c.a.createElement("p",null,"memoizedValue: ",O),c.a.createElement("input",{type:"text",name:"name",defaultValue:a,onChange:function(e){return l(e.target.value)},ref:j}),c.a.createElement("button",{onClick:function(){j.current.focus()}},"focus input"),c.a.createElement("button",{onClick:E},"increment count"))};n.default=a}}]);
//# sourceMappingURL=3.98f2015e.chunk.js.map
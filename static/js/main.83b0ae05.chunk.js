(this["webpackJsonpreact-chat-app"]=this["webpackJsonpreact-chat-app"]||[]).push([[0],{37:function(e,t,n){},42:function(e,t,n){},43:function(e,t,n){},49:function(e,t,n){},50:function(e,t,n){},51:function(e,t,n){},52:function(e,t,n){},53:function(e,t,n){},54:function(e,t,n){"use strict";n.r(t);var a=n(2),r=n.n(a),c=n(31),s=n.n(c),i=n(19),o=(n(37),n(10)),l=n(5),u=n(6),d=n.n(u),h=n(14),j=n(16);n(39),n(55);j.a.initializeApp({apiKey:"AIzaSyCr-FYUZWwOEm1KPpk7hWS3oV1-BNEg96Q",authDomain:"my-chat-app-aa73c.firebaseapp.com",projectId:"my-chat-app-aa73c",storageBucket:"my-chat-app-aa73c.appspot.com",messagingSenderId:"422748533719",appId:"1:422748533719:web:2fc9ec870dbeaf4bad9192",measurementId:"G-ZVBXSF1QPL"});var p=j.a.auth(),b=j.a.firestore();function m(){return O.apply(this,arguments)}function O(){return(O=Object(h.a)(d.a.mark((function e(){var t;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,p.setPersistence(j.a.auth.Auth.Persistence.SESSION);case 3:return(t=new j.a.auth.GoogleAuthProvider).setCustomParameters({prompt:"select_account"}),e.next=7,p.signInWithPopup(t);case 7:e.next=12;break;case 9:throw e.prev=9,e.t0=e.catch(0),e.t0;case 12:case"end":return e.stop()}}),e,null,[[0,9]])})))).apply(this,arguments)}function f(e,t,n){return x.apply(this,arguments)}function x(){return(x=Object(h.a)(d.a.mark((function e(t,n,a){var r,c;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,p.setPersistence(j.a.auth.Auth.Persistence.SESSION);case 3:return e.next=5,p.createUserWithEmailAndPassword(n,a);case 5:return r=e.sent,c=r.user,e.next=9,c.updateProfile({displayName:t});case 9:e.next=14;break;case 11:throw e.prev=11,e.t0=e.catch(0),e.t0;case 14:case"end":return e.stop()}}),e,null,[[0,11]])})))).apply(this,arguments)}function g(e,t){return v.apply(this,arguments)}function v(){return(v=Object(h.a)(d.a.mark((function e(t,n){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,p.setPersistence(j.a.auth.Auth.Persistence.SESSION);case 3:return e.next=5,p.signInWithEmailAndPassword(t,n);case 5:e.next=10;break;case 7:throw e.prev=7,e.t0=e.catch(0),e.t0;case 10:case"end":return e.stop()}}),e,null,[[0,7]])})))).apply(this,arguments)}function w(){p.signOut().catch((function(e){return console.error("Error during sign-out: ",e.code,e.message)}))}n(42),n(43);var N=n(1),y=function(){var e="/chat"===Object(l.h)().pathname;return Object(N.jsxs)("header",{className:"header ".concat(e?"reduced":null),children:[Object(N.jsx)(i.b,{to:"/",className:"logo",children:"The Chat"}),e?Object(N.jsx)("button",{className:"sign-out",onClick:w,children:"Sign Out"}):null]})},S=n(24),k=n(29),I=(n(49),function(e){var t=e.sender,n=e.content,a=e.time,r=e.isReceived,c=e.color;return Object(N.jsxs)("article",{className:"message "+(r?"received":""),children:[Object(N.jsx)("h4",{className:"name",style:{color:"hsl(".concat(c,", 100%, 40%)")},children:t}),Object(N.jsx)("p",{className:"content",children:n}),Object(N.jsx)("time",{className:"date",children:a})]})}),A=r.a.memo(I),E=(n(50),function(e){var t=e.user,n=Object(a.useState)(""),r=Object(o.a)(n,2),c=r[0],s=r[1],i=Object(a.useState)([]),l=Object(o.a)(i,2),u=l[0],j=l[1],p=Object(a.useState)([]),m=Object(o.a)(p,2),O=m[0],f=m[1],x=Object(a.useState)([]),g=Object(o.a)(x,2),v=g[0],w=g[1],y=Object(a.useRef)();Object(a.useEffect)((function(){var e=b.collection("messages/").orderBy("sentAt","desc").limit(25).onSnapshot((function(e){console.log("Updating the chat from db!");var t=[];e.docChanges().filter((function(e){return"added"===e.type})).forEach((function(e){var n=Object(k.a)({id:e.doc.id},e.doc.data());t.push(n)})),t.reverse(),j((function(e){return[].concat(Object(S.a)(e),t)})),y.current.scrollIntoView({behavior:"smooth"})}),(function(e){return console.error(e)}));return function(){return e()}}),[]),Object(a.useEffect)((function(){var e=u.map((function(e){return e.senderId}));e.push.apply(e,Object(S.a)(O.map((function(e){return e.senderId}))));for(var t=e.filter((function(t,n){return e.indexOf(t)===n})),n=Math.ceil(360/t.length),a={},r=0;r<t.length;r++)a[t[r]]=r*n;w(a)}),[u,O]);var I=function(){var e=Object(h.a)(d.a.mark((function e(n){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n.preventDefault(),""!==c.trim()){e.next=4;break}return s(""),e.abrupt("return");case 4:return e.prev=4,e.next=7,b.collection("messages/").add({senderId:t.id,senderName:t.name,content:c,sentAt:new Date});case 7:s(""),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(4),console.error("Error sending message: ",e.t0);case 13:case"end":return e.stop()}}),e,null,[[4,10]])})));return function(t){return e.apply(this,arguments)}}(),E=function(){var e=Object(h.a)(d.a.mark((function e(){var t,n,a;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=[],n=[],e.prev=2,console.log("Loading more messages from the db..."),0!==O.length){e.next=10;break}return e.next=7,b.collection("messages/").where("sentAt","<",u[0].sentAt).orderBy("sentAt","desc").limit(25).get();case 7:n=e.sent,e.next=13;break;case 10:return e.next=12,b.collection("messages/").where("sentAt","<",O[0].sentAt).orderBy("sentAt","desc").limit(25).get();case 12:n=e.sent;case 13:n.empty?console.log("No more messages"):(n.forEach((function(e){var n=Object(k.a)({id:e.id},e.data());t.push(n)})),(a=t.reverse()).push.apply(a,Object(S.a)(O)),f(t)),e.next=19;break;case 16:e.prev=16,e.t0=e.catch(2),console.error("Error during the load of old messages: ",e.t0);case 19:case"end":return e.stop()}}),e,null,[[2,16]])})));return function(){return e.apply(this,arguments)}}();return Object(N.jsxs)("main",{className:"chatpage",children:[Object(N.jsx)("section",{className:"chat-container",children:Object(N.jsxs)("div",{className:"chat-slider",children:[Object(N.jsx)("button",{className:"load-btn",onClick:E,children:"....MORE..."}),O.map((function(e){return Object(N.jsx)(A,{sender:e.senderName,content:e.content,time:e.sentAt.toDate().toLocaleString(),isReceived:e.senderId!==t.id,color:v[e.senderId]},e.id)})),u.map((function(e){return Object(N.jsx)(A,{sender:e.senderName,content:e.content,time:e.sentAt.toDate().toLocaleString(),isReceived:e.senderId!==t.id,color:v[e.senderId]},e.id)})),Object(N.jsx)("div",{ref:y})]})}),Object(N.jsxs)("form",{className:"chat-controls",onSubmit:I,children:[Object(N.jsx)("textarea",{className:"text-area",name:"input",rows:"1",placeholder:"Write your message!",value:c,onInput:function(e){e.preventDefault(),s(e.target.value),e.target.style.height="100%",e.target.style.height=e.target.scrollHeight+"px"}}),Object(N.jsx)("button",{className:"btn",type:"submit",children:Object(N.jsx)("i",{className:"fa fa-paper-plane"})})]})]})}),C=(n(51),function(e){var t=e.isLoggedIn,n=Object(l.g)();return Object(N.jsx)("main",{className:"homepage",children:Object(N.jsxs)("div",{className:"card flex-column",children:[Object(N.jsxs)("h2",{children:["Welcome to ",Object(N.jsx)("span",{className:"logo",children:"The Chat"})]}),t?Object(N.jsxs)("div",{className:"container",children:[Object(N.jsx)("p",{children:"Start chatting with your friends"}),Object(N.jsx)("button",{className:"btn",onClick:function(){return n.push("/chat")},children:"START"}),Object(N.jsx)("button",{className:"link",onClick:w,children:"Log out"})]}):Object(N.jsxs)("div",{className:"container",children:[Object(N.jsx)("p",{children:"Please login"}),Object(N.jsx)("button",{className:"btn",onClick:function(){return n.push("/login")},children:"LOG IN"}),Object(N.jsx)(i.b,{to:"/signin",className:"link",children:"Are you new? Register"})]})]})})}),P=(n(52),function(e){var t=e.history,n=Object(a.useState)(""),r=Object(o.a)(n,2),c=r[0],s=r[1],i=Object(a.useState)(""),l=Object(o.a)(i,2),u=l[0],j=l[1],p=Object(a.useState)(""),b=Object(o.a)(p,2),m=b[0],O=b[1],x=function(e){switch(e.preventDefault(),e.target.name){case"name":s(e.target.value);break;case"email":j(e.target.value);break;case"password":O(e.target.value);break;default:console.error("Something went wrong with the input")}},g=function(){var e=Object(h.a)(d.a.mark((function e(n){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.preventDefault(),e.prev=1,e.next=4,f(c,u,m);case 4:t.push("/"),window.location.reload(),e.next=12;break;case 8:e.prev=8,e.t0=e.catch(1),alert("Something went wrong, try again"),console.error("An error occurred during registration: ",e.t0.code,e.t0.message);case 12:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(t){return e.apply(this,arguments)}}();return Object(N.jsx)("main",{className:"signpage",children:Object(N.jsxs)("div",{className:"card flex-column",children:[Object(N.jsx)("h3",{children:"Sign in with your email and password"}),Object(N.jsxs)("form",{className:"sign-form",onSubmit:g,children:[Object(N.jsxs)("div",{className:"container",children:[Object(N.jsx)("label",{children:"Full Name"}),Object(N.jsx)("input",{type:"text",placeholder:"insert your name",name:"name",value:c,onChange:x,required:!0})]}),Object(N.jsxs)("div",{className:"container",children:[Object(N.jsx)("label",{className:"email-label",children:"Email"}),Object(N.jsx)("input",{type:"email",placeholder:"insert your email",name:"email",value:u,onChange:x,required:!0})]}),Object(N.jsxs)("div",{className:"container",children:[Object(N.jsx)("label",{children:"Password"}),Object(N.jsx)("input",{type:"password",placeholder:"insert your password",name:"password",value:m,onChange:x,required:!0})]}),Object(N.jsx)("button",{className:"btn",type:"submit",children:"SIGN IN"})]})]})})}),L=(n(53),function(e){var t=e.history,n=Object(a.useState)(""),r=Object(o.a)(n,2),c=r[0],s=r[1],i=Object(a.useState)(""),l=Object(o.a)(i,2),u=l[0],j=l[1],p=function(e){switch(e.preventDefault(),e.target.name){case"email":s(e.target.value);break;case"password":j(e.target.value);break;default:console.error("Something is wrong with the input")}},b=function(){var e=Object(h.a)(d.a.mark((function e(n){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.preventDefault(),e.prev=1,e.next=4,g(c,u);case 4:t.push("/"),e.next=11;break;case 7:e.prev=7,e.t0=e.catch(1),alert("Credential are wrong"),console.error("Error during sign-in: ",e.t0.code,e.t0.message);case 11:case"end":return e.stop()}}),e,null,[[1,7]])})));return function(t){return e.apply(this,arguments)}}(),O=function(){var e=Object(h.a)(d.a.mark((function e(){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,m();case 3:t.push("/"),e.next=10;break;case 6:e.prev=6,e.t0=e.catch(0),alert("Something went wrong, try again!"),console.error("Error in Google signin: ",e.t0.code,e.t0.message,e.t0.credentials);case 10:case"end":return e.stop()}}),e,null,[[0,6]])})));return function(){return e.apply(this,arguments)}}();return Object(N.jsx)("main",{className:"loginpage",children:Object(N.jsxs)("div",{className:"card flex-column",children:[Object(N.jsxs)("section",{className:"option",children:[Object(N.jsx)("h3",{children:"Login with your email and password"}),Object(N.jsxs)("form",{onSubmit:b,children:[Object(N.jsx)("label",{children:"Email"}),Object(N.jsx)("input",{type:"email",placeholder:"insert your email",name:"email",value:c,onChange:p,required:!0}),Object(N.jsx)("label",{children:"Password"}),Object(N.jsx)("input",{type:"password",placeholder:"insert your password",name:"password",value:u,onChange:p,required:!0}),Object(N.jsx)("button",{className:"btn",type:"submit",children:"LOG IN"})]})]}),Object(N.jsx)("hr",{}),Object(N.jsxs)("section",{className:"option",children:[Object(N.jsx)("h3",{children:"Login with Google"}),Object(N.jsx)("button",{className:"btn btn-google",type:"button",onClick:O,children:"LOG IN WITH GOOGLE"})]})]})})});var D=function(){var e=Object(a.useState)(!1),t=Object(o.a)(e,2),n=t[0],r=t[1],c=Object(a.useState)({id:"",name:""}),s=Object(o.a)(c,2),i=s[0],u=s[1];return Object(a.useEffect)((function(){var e=p.onAuthStateChanged((function(e){console.log("Auth state changed: ",e),e?(u({id:e.uid,name:e.displayName}),r(!0)):(r(!1),u({id:"",name:""}))}));return function(){return e()}}),[]),Object(N.jsxs)(N.Fragment,{children:[Object(N.jsx)(y,{}),Object(N.jsxs)(l.d,{children:[Object(N.jsx)(l.b,{exact:!0,path:"/",children:Object(N.jsx)(C,{isLoggedIn:n})}),Object(N.jsx)(l.b,{path:"/login",component:L}),Object(N.jsx)(l.b,{path:"/signin",component:P}),Object(N.jsx)(l.b,{path:"/chat",children:n?Object(N.jsx)(E,{user:i}):Object(N.jsx)(l.a,{to:"/"})}),Object(N.jsx)(l.b,{children:Object(N.jsx)("h2",{children:"404 Page Not Found"})})]})]})};s.a.render(Object(N.jsx)(r.a.StrictMode,{children:Object(N.jsx)(i.a,{basename:"/TheChat_App",children:Object(N.jsx)(D,{})})}),document.getElementById("root"))}},[[54,1,2]]]);
//# sourceMappingURL=main.83b0ae05.chunk.js.map
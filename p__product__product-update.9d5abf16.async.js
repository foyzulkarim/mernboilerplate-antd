(self.webpackChunkant_design_pro=self.webpackChunkant_design_pro||[]).push([[3221],{90380:function(A,M,n){"use strict";n.d(M,{yC:function(){return f},QX:function(){return U},FO:function(){return P},Vx:function(){return o},a1:function(){return t},Od:function(){return u}});var m=n(3182),b=n(94043),c=n.n(b),i=n(39031);function f(e){return v.apply(this,arguments)}function v(){return v=(0,m.Z)(c().mark(function e(a){return c().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,(0,i.v_)("/api/products/search",a);case 2:return r.abrupt("return",r.sent);case 3:case"end":return r.stop()}},e)})),v.apply(this,arguments)}function U(e,a){return g.apply(this,arguments)}function g(){return g=(0,m.Z)(c().mark(function e(a,h){return c().wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return s.next=2,(0,i.v_)("/api/products/count",a,h);case 2:return s.abrupt("return",s.sent);case 3:case"end":return s.stop()}},e)})),g.apply(this,arguments)}function P(e,a){return D.apply(this,arguments)}function D(){return D=(0,m.Z)(c().mark(function e(a,h){return c().wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return s.next=2,(0,i.U2)("/api/products/".concat(a),{},h);case 2:return s.abrupt("return",s.sent);case 3:case"end":return s.stop()}},e)})),D.apply(this,arguments)}function o(e){return _.apply(this,arguments)}function _(){return _=(0,m.Z)(c().mark(function e(a){return c().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,(0,i.gz)("/api/products",a);case 2:return r.abrupt("return",r.sent);case 3:case"end":return r.stop()}},e)})),_.apply(this,arguments)}function t(e){return l.apply(this,arguments)}function l(){return l=(0,m.Z)(c().mark(function e(a){return c().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,(0,i.v_)("/api/products",a);case 2:return r.abrupt("return",r.sent);case 3:case"end":return r.stop()}},e)})),l.apply(this,arguments)}function u(e,a){return d.apply(this,arguments)}function d(){return d=(0,m.Z)(c().mark(function e(a,h){return c().wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return s.next=2,(0,i.IV)("/api/products/".concat(a),{},h);case 2:return s.abrupt("return",s.sent);case 3:case"end":return s.stop()}},e)})),d.apply(this,arguments)}},73244:function(A,M,n){"use strict";n.r(M);var m=n(58024),b=n(39144),c=n(11849),i=n(34792),f=n(48086),v=n(3182),U=n(2824),g=n(94043),P=n.n(g),D=n(15196),o=n(5966),_=n(90672),t=n(31199),l=n(86615),u=n(45510),d=n(43581),e=n(75362),a=n(90380),h=n(67294),r=n(85893),s=function(L){var K=(0,h.useState)(null),B=(0,U.Z)(K,2),E=B[0],R=B[1];(0,h.useEffect)(function(){var O=L.match.params.id,p=function(){var T=(0,v.Z)(P().mark(function C(y){var I;return P().wrap(function(Z){for(;;)switch(Z.prev=Z.next){case 0:return Z.next=2,(0,a.FO)(y);case 2:I=Z.sent,I.size>3&&(I.size=4),R(I);case 5:case"end":return Z.stop()}},C)}));return function(y){return T.apply(this,arguments)}}();p(O)},[]);var W=(0,d.QT)(a.Vx,{manual:!0,onSuccess:function(p){f.default.success("Product is saved",p),d.m8.push("/products")},onError:function(p){console.log(p),f.default.error("Error happened ",p)}}),j=W.run,w=function(){var O=(0,v.Z)(P().mark(function p(T){return P().wrap(function(y){for(;;)switch(y.prev=y.next){case 0:console.log(T),j((0,c.Z)({_id:E._id},T));case 2:case"end":return y.stop()}},p)}));return function(T){return O.apply(this,arguments)}}();return E&&(0,r.jsx)(e.ZP,{content:"My amazing product update form",children:(0,r.jsx)(b.Z,{bordered:!1,children:(0,r.jsxs)(D.ZP,{hideRequiredMark:!1,style:{margin:"auto",marginTop:8,maxWidth:600},name:"basic",layout:"vertical",initialValues:E,onFinish:w,children:[(0,r.jsx)(o.Z,{width:"md",label:"Name",name:"name",value:E.name,rules:[{required:!0,message:"Please enter product name"}],placeholder:"Please enter product name"}),(0,r.jsx)(o.Z,{width:"md",label:"SKU",name:"sku",value:E.sku,rules:[{required:!0,message:"Please enter the SKU"}],placeholder:"Please enter product sku"}),(0,r.jsx)(_.Z,{label:"Description",width:"xl",name:"description",value:E.description,rules:[{required:!0,message:"Please enter description"}],placeholder:"Please enter product description"}),(0,r.jsx)(t.Z,{label:(0,r.jsx)("span",{children:"Cost"}),name:"cost",value:E.cost,placeholder:"Please enter product cost",min:0,width:"md",fieldProps:{formatter:function(p){return"".concat(p||0)}}}),(0,r.jsx)(t.Z,{label:(0,r.jsx)("span",{children:"Price"}),name:"price",value:E.price,placeholder:"Please enter product price",min:0,width:"md",fieldProps:{formatter:function(p){return"".concat(p||0)}}}),(0,r.jsx)(l.Z.Group,{options:[{value:1,label:"Small"},{value:2,label:"Medium"},{value:3,label:"Large"},{value:4,label:"X-Large"}],label:"Size",value:E.size,name:"size"}),(0,r.jsx)(u.Z,{width:"md",name:"manufacturingDate",value:E.manufacturingDate,label:"Manufacturing date"}),(0,r.jsx)(u.Z,{width:"md",name:"expiryDate",value:E.expiryDate,label:"Expiry date"})]})})})};M.default=s},39031:function(A,M,n){"use strict";n.d(M,{U2:function(){return U},v_:function(){return g},gz:function(){return P},IV:function(){return D}});var m=n(3182),b=n(11849),c=n(94043),i=n.n(c),f=n(11238),v=n(43581);f.ZP.interceptors.request.use(function(o,_){var t=localStorage.getItem("auth");if(t&&JSON.parse(t)){var l=JSON.parse(t),u=l.token;u?_.headers.Authorization="Bearer ".concat(u):_.headers.Authorization=null}return console.log("url",o),_.headers["rbac-client-time"]="".concat(new Date," "),{url:"".concat("http://localhost:5005").concat(o),options:(0,b.Z)((0,b.Z)({},_),{},{interceptors:!0})}}),f.ZP.interceptors.response.use(function(){var o=(0,m.Z)(i().mark(function _(t,l){var u,d;return i().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if(t.status!==401){a.next=4;break}return localStorage.removeItem("auth"),v.m8.replace({pathname:"/user/login"}),a.abrupt("return",{name:t.name});case 4:if(t.status!==400){a.next=12;break}return a.next=7,t.clone().json();case 7:return u=a.sent,console.log("data",u),d=new Error(u.message),d.error=u.error,a.abrupt("return",d);case 12:return a.abrupt("return",t);case 13:case"end":return a.stop()}},_)}));return function(_,t){return o.apply(this,arguments)}}());var U=function(){var o=(0,m.Z)(i().mark(function _(t,l,u){return i().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,f.ZP)(t,(0,b.Z)({method:"GET",params:l,skipErrorHandler:!0},u||{})));case 1:case"end":return e.stop()}},_)}));return function(t,l,u){return o.apply(this,arguments)}}(),g=function(){var o=(0,m.Z)(i().mark(function _(t,l,u){return i().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,f.ZP)(t,(0,b.Z)({method:"POST",data:l,skipErrorHandler:!0},u||{}));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},_)}));return function(t,l,u){return o.apply(this,arguments)}}(),P=function(){var o=(0,m.Z)(i().mark(function _(t,l,u){return i().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,f.ZP)(t,(0,b.Z)({method:"PUT",data:l,skipErrorHandler:!0},u||{})));case 1:case"end":return e.stop()}},_)}));return function(t,l,u){return o.apply(this,arguments)}}(),D=function(){var o=(0,m.Z)(i().mark(function _(t,l,u){return i().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,f.ZP)(t,(0,b.Z)({method:"DELETE",data:l,skipErrorHandler:!0},u||{})));case 1:case"end":return e.stop()}},_)}));return function(t,l,u){return o.apply(this,arguments)}}()}}]);
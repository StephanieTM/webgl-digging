(self.webpackChunkfe_proj=self.webpackChunkfe_proj||[]).push([[591],{65875:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return D}});n(44230);var r,a=n(1350),i=n(67294),u=(n(30467),n(55673)),c=(n(58136),n(5789)),o=n(28481),l=(n(54067),n(64713)),v=n(70884),s=n(91745),f=n(91801),A=n(9690),h=n(28177),E=n(55087),R=n.n(E),x=n(23999),m=n.n(x);!function(e){e[e.xAxis=0]="xAxis",e[e.yAxis=1]="yAxis",e[e.zAxis=2]="zAxis"}(r||(r={}));var g=l.ZP.Group,b=l.ZP.Button,_=[(0,A.vh)(-.5,-.5,.5,1),(0,A.vh)(-.5,.5,.5,1),(0,A.vh)(.5,.5,.5,1),(0,A.vh)(.5,-.5,.5,1),(0,A.vh)(-.5,-.5,-.5,1),(0,A.vh)(-.5,.5,-.5,1),(0,A.vh)(.5,.5,-.5,1),(0,A.vh)(.5,-.5,-.5,1)],F=[(0,A.vh)(0,0,0,1),(0,A.vh)(1,0,0,1),(0,A.vh)(1,1,0,1),(0,A.vh)(0,1,0,1),(0,A.vh)(0,0,1,1),(0,A.vh)(1,0,1,1),(0,A.vh)(1,1,1,1),(0,A.vh)(0,1,1,1)];function T(){var e=(0,i.useRef)(null),t=(0,v.Q)(e),n=(0,s.O)(t,R(),m()),a=(0,i.useRef)([]),l=(0,i.useRef)([]),A=(0,i.useRef)([0,0,0]),E=(0,i.useRef)(null),x=(0,i.useState)(r.xAxis),T=(0,o.Z)(x,2),d=T[0],B=T[1],y=(0,i.useCallback)((function(){t&&n&&(t.clear(t.COLOR_BUFFER_BIT|t.DEPTH_BUFFER_BIT),A.current[d]+=1,t.uniform3fv(E.current,A.current),a.current.length&&t.drawArrays(t.TRIANGLES,0,a.current.length))}),[t,d,n]);return(0,i.useEffect)((function(){function e(e,t,n,r){for(var i=[e,t,n,e,n,r],u=0;u<i.length;u+=1)a.current.push(_[i[u]]),l.current.push(F[i[u]])}e(1,0,3,2),e(2,3,7,6),e(3,0,4,7),e(6,5,1,2),e(4,5,6,7),e(5,4,0,1)}),[]),(0,i.useEffect)((function(){if(t&&n&&e.current){t.viewport(0,0,e.current.width,e.current.height),t.clearColor(1,1,1,1),t.useProgram(n),t.enable(t.DEPTH_TEST);var r=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,r),t.bufferData(t.ARRAY_BUFFER,(0,h.xH)(a.current),t.STATIC_DRAW);var i=t.getAttribLocation(n,"vPosition");t.vertexAttribPointer(i,4,t.FLOAT,!1,0,0),t.enableVertexAttribArray(i);var u=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,u),t.bufferData(t.ARRAY_BUFFER,(0,h.xH)(l.current),t.STATIC_DRAW);var c=t.getAttribLocation(n,"vColor");t.vertexAttribPointer(c,4,t.FLOAT,!1,0,0),t.enableVertexAttribArray(c),E.current=t.getUniformLocation(n,"theta")}}),[t,n]),(0,f.L)(y),i.createElement("div",{style:{padding:"20px"}},i.createElement(u.Z,{gutter:10},i.createElement(c.Z,{style:{marginRight:"20px"}},"Direction: "),i.createElement(c.Z,{span:8},i.createElement(g,{value:d,onChange:function(e){return B(e.target.value)},size:"small"},i.createElement(b,{value:r.xAxis},"Rotate X"),i.createElement(b,{value:r.yAxis},"Rotate Y"),i.createElement(b,{value:r.zAxis},"Rotate Z")))),i.createElement("canvas",{ref:e,width:512,height:512}))}var d;n(82472),n(92990),n(18927),n(33105),n(35035),n(74345),n(7174),n(32846),n(44731),n(77209),n(96319),n(58867),n(37789),n(33739),n(29368),n(14483),n(12056),n(3462),n(30678),n(27462),n(33824),n(55021),n(12974),n(15016),n(41539),n(66992),n(39575);!function(e){e[e.xAxis=0]="xAxis",e[e.yAxis=1]="yAxis",e[e.zAxis=2]="zAxis"}(d||(d={}));var B=l.ZP.Group,y=l.ZP.Button,p=[(0,A.vh)(-.5,-.5,.5,1),(0,A.vh)(-.5,.5,.5,1),(0,A.vh)(.5,.5,.5,1),(0,A.vh)(.5,-.5,.5,1),(0,A.vh)(-.5,-.5,-.5,1),(0,A.vh)(-.5,.5,-.5,1),(0,A.vh)(.5,.5,-.5,1),(0,A.vh)(.5,-.5,-.5,1)],C=[(0,A.vh)(0,0,0,1),(0,A.vh)(1,0,0,1),(0,A.vh)(1,1,0,1),(0,A.vh)(0,1,0,1),(0,A.vh)(0,0,1,1),(0,A.vh)(1,0,1,1),(0,A.vh)(1,1,1,1),(0,A.vh)(0,1,1,1)],P=[1,0,3,1,3,2,2,3,7,2,7,6,3,0,4,3,4,7,6,5,1,6,1,2,4,5,6,4,6,7,5,4,0,5,0,1];function U(){var e=(0,i.useRef)(null),t=(0,v.Q)(e),n=(0,s.O)(t,R(),m()),r=(0,i.useRef)([0,0,0]),a=(0,i.useRef)(null),l=(0,i.useState)(d.xAxis),A=(0,o.Z)(l,2),E=A[0],x=A[1],g=(0,i.useCallback)((function(){t&&n&&(t.clear(t.COLOR_BUFFER_BIT|t.DEPTH_BUFFER_BIT),r.current[E]+=1,t.uniform3fv(a.current,r.current),t.drawElements(t.TRIANGLES,36,t.UNSIGNED_BYTE,0))}),[t,n,E]);return(0,i.useEffect)((function(){if(t&&n&&e.current){t.viewport(0,0,e.current.width,e.current.height),t.clearColor(1,1,1,1),t.useProgram(n),t.enable(t.DEPTH_TEST);var r=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,r),t.bufferData(t.ARRAY_BUFFER,(0,h.xH)(p),t.STATIC_DRAW);var i=t.getAttribLocation(n,"vPosition");t.vertexAttribPointer(i,4,t.FLOAT,!1,0,0),t.enableVertexAttribArray(i);var u=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,u),t.bufferData(t.ARRAY_BUFFER,(0,h.xH)(C),t.STATIC_DRAW);var c=t.getAttribLocation(n,"vColor");t.vertexAttribPointer(c,4,t.FLOAT,!1,0,0),t.enableVertexAttribArray(c);var o=t.createBuffer();t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,o),t.bufferData(t.ELEMENT_ARRAY_BUFFER,new Uint8Array(P),t.STATIC_DRAW),a.current=t.getUniformLocation(n,"theta")}}),[t,n]),(0,f.L)(g),i.createElement("div",{style:{padding:"20px"}},i.createElement(u.Z,{gutter:10},i.createElement(c.Z,{style:{marginRight:"20px"}},"Direction: "),i.createElement(c.Z,{span:8},i.createElement(B,{value:E,onChange:function(e){return x(e.target.value)},size:"small"},i.createElement(y,{value:d.xAxis},"Rotate X"),i.createElement(y,{value:d.yAxis},"Rotate Y"),i.createElement(y,{value:d.zAxis},"Rotate Z")))),i.createElement("canvas",{ref:e,width:512,height:512}))}var L=a.Z.TabPane;function D(){return i.createElement("div",{style:{padding:"20px"}},i.createElement("h1",null,"Cubes"),i.createElement(a.Z,{tabPosition:"right"},i.createElement(L,{tab:"Colored Cube",key:"colored-cube"},i.createElement("h2",null,i.createElement("code",{style:{margin:"0 10px"}},"drawArrays"),"Version"),i.createElement(T,null),i.createElement("h2",null,i.createElement("code",{style:{margin:"0 10px"}},"drawElements"),"Version"),i.createElement(U,null))))}},82472:function(e,t,n){n(19843)("Uint8",(function(e){return function(t,n,r){return e(this,t,n,r)}}))},23999:function(e){e.exports="precision highp float;\n\nvarying vec4 fColor;\n\nvoid main() {\n  gl_FragColor = fColor;\n}\n"},55087:function(e){e.exports="attribute vec4 vPosition;\nattribute vec4 vColor;\n\nvarying vec4 fColor;\n\nuniform vec3 theta;\n\nvoid main() {\n  vec3 angles = radians(theta);\n  vec3 c = cos(angles);\n  vec3 s = sin(angles);\n\n\n  mat4 rx = mat4(\n     1.0,  0.0,  0.0,  0.0,\n     0.0,  c.x,  s.x,  0.0,\n     0.0, -s.x,  c.x,  0.0,\n     0.0,  0.0,  0.0,  1.0\n  );\n\n  mat4 ry = mat4(\n     c.y,  0.0, -s.y,  0.0,\n     0.0,  1.0,  0.0,  0.0,\n     s.y,  0.0,  c.y,  0.0,\n     0.0,  0.0,  0.0,  1.0\n  );\n\n  mat4 rz = mat4(\n     c.z,  s.z,  0.0,  0.0,\n    -s.z,  c.z,  0.0,  0.0,\n     0.0,  0.0,  1.0,  0.0,\n     0.0,  0.0,  0.0,  1.0\n  );\n\n  fColor = vColor;\n  gl_Position = rz * ry * rx * vPosition;\n  gl_Position.z = -gl_Position.z;\n}\n"}}]);
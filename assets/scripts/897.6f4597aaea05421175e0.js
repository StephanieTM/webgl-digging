(self.webpackChunkfe_proj=self.webpackChunkfe_proj||[]).push([[897],{91801:function(r,t,n){"use strict";n.d(t,{L:function(){return a}});n(32564);var e=n(67294);function a(r){(0,e.useEffect)((function(){var t=0;return function n(){t=requestAnimationFrame(n),r()}(),function(){cancelAnimationFrame(t)}}),[r])}},91745:function(r,t,n){"use strict";n.d(t,{O:function(){return u}});var e=n(28481),a=n(67294);function u(r,t,n){var u=(0,a.useState)(null),i=(0,e.Z)(u,2),o=i[0],h=i[1],f=(0,a.useCallback)((function(t,n){if(!t||!r)return null;var e=r.createShader(t);return r.shaderSource(e,n),r.compileShader(e),r.getShaderParameter(e,r.COMPILE_STATUS)?e:(console.error(r.getShaderInfoLog(e)),null)}),[r]);return(0,a.useEffect)((function(){if(r){var e=f(r.VERTEX_SHADER,t),a=f(r.FRAGMENT_SHADER,n),u=r.createProgram();r.attachShader(u,e),r.attachShader(u,a),r.linkProgram(u),r.getProgramParameter(u,r.LINK_STATUS)?h(u):(console.error("Could not initialize shaders."),h(null))}}),[f,r,t,n]),o}},70884:function(r,t,n){"use strict";n.d(t,{Q:function(){return u}});var e=n(28481),a=n(67294);function u(r,t){var n=function(r,t){var n=(0,a.useState)(null),u=(0,e.Z)(n,2),o=u[0],h=u[1];return(0,a.useEffect)((function(){if(r.current)for(var n=0;n<i.length;n+=1)try{h(r.current.getContext(i[n],t));break}catch(r){}}),[r,t]),o}(r,t);return(0,a.useEffect)((function(){r.current&&n&&(window.WebGLRenderingContext||console.error("This page requires a browser that supports WebGL."))}),[r,n]),n}var i=["webgl","experimental-webgl","webkit-3d","moz-webgl"]},1345:function(r,t,n){"use strict";n.d(t,{y:function(){return a},u:function(){return u}});var e=n(42921);n(92222),n(47042);function a(r){var t;return(t=[]).concat.apply(t,(0,e.Z)(r.slice()))}function u(r){return r*Math.PI/180}},51894:function(r,t,n){"use strict";n.d(t,{CY:function(){return u},wO:function(){return i},_E:function(){return o}});n(40561);var e=n(1345),a=n(9690);function u(){for(var r=arguments.length,t=new Array(r),n=0;n<r;n++)t[n]=arguments[n];var u=(0,e.y)(t),i=[];switch(u.length){case 0:u[0]=1,i.push((0,a.K4)(u[0],0)),i.push((0,a.K4)(0,u[0]));break;case 1:i.push((0,a.K4)(u[0],0)),i.push((0,a.K4)(0,u[0]));break;default:i.push((0,a.K4)(u)),u.splice(0,2),i.push((0,a.K4)(u))}return i.matrix=!0,i}function i(){for(var r=arguments.length,t=new Array(r),n=0;n<r;n++)t[n]=arguments[n];var u=(0,e.y)(t),i=[];switch(u.length){case 0:u[0]=1,i.push((0,a.R3)(u[0],0,0)),i.push((0,a.R3)(0,u[0],0)),i.push((0,a.R3)(0,0,u[0]));break;case 1:i.push((0,a.R3)(u[0],0,0)),i.push((0,a.R3)(0,u[0],0)),i.push((0,a.R3)(0,0,u[0]));break;default:i.push((0,a.R3)(u)),u.splice(0,3),i.push((0,a.R3)(u)),u.splice(0,3),i.push((0,a.R3)(u))}return i.matrix=!0,i}function o(){for(var r=arguments.length,t=new Array(r),n=0;n<r;n++)t[n]=arguments[n];var u=(0,e.y)(t),i=[];switch(u.length){case 0:u[0]=1,i.push((0,a.vh)(u[0],0,0,0)),i.push((0,a.vh)(0,u[0],0,0)),i.push((0,a.vh)(0,0,u[0],0)),i.push((0,a.vh)(0,0,0,u[0]));break;case 1:i.push((0,a.vh)(u[0],0,0,0)),i.push((0,a.vh)(0,u[0],0,0)),i.push((0,a.vh)(0,0,u[0],0)),i.push((0,a.vh)(0,0,0,u[0]));break;default:i.push((0,a.vh)(u)),u.splice(0,4),i.push((0,a.vh)(u)),u.splice(0,4),i.push((0,a.vh)(u)),u.splice(0,4),i.push((0,a.vh)(u))}return i.matrix=!0,i}},15325:function(r,t,n){"use strict";n.d(t,{IH:function(){return i},xH:function(){return h},BV:function(){return o},Ei:function(){return f}});n(79753),n(44197),n(92990),n(18927),n(33105),n(35035),n(74345),n(7174),n(32846),n(44731),n(77209),n(96319),n(58867),n(37789),n(33739),n(29368),n(14483),n(12056),n(3462),n(30678),n(27462),n(33824),n(55021),n(12974),n(15016),n(41539),n(66992),n(39575);var e=n(9690),a=n(51894);function u(r){if(!r.matrix)throw new Error("transpose(): trying to transpose a non-matrix");for(var t=[],n=0;n<r.length;n+=1){for(var e=[],a=0;a<r[n].length;a+=1)e.push(r[a][n]);t[n]=e}return t.matrix=!0,t}function i(r,t){if(r.matrix!==t.matrix)throw new Error("add(): trying to add matrix and non-matrix variables");if(r.matrix&&t.matrix){if(r.length!==t.length)throw new Error("add(): trying to add matrices of different dimensions");for(var n=[],e=0;e<r.length;e+=1){if(r[e].length!==t[e].length)throw new Error("add(): trying to add matrices of different dimensions");for(var a=[],u=0;u<r[e].length;u+=1)a.push(r[e][u]+t[e][u]);n[e]=a}return n.matrix=!0,n}if(r.length!==t.length)throw new Error("add(): trying to add vectors of different dimensions");for(var i=[],o=0;o<r.length;o+=1)i.push(r[o]+t[o]);return i}function o(r,t){if(r.matrix&&t.matrix){if(r.length!==t.length)throw new Error("mult(): trying to mult matrices of different dimensions");for(var n=[],e=0;e<r.length;e+=1){if(r[e].length!==t[e].length)throw new Error("mult(): trying to mult matrices of different dimensions");for(var a=[],u=0;u<t.length;u+=1){for(var i=0,o=0;o<r.length;o+=1)i+=r[e][o]*t[o][u];a.push(i)}n[e]=a}return n.matrix=!0,n}if(r.matrix&&r.length===t.length){for(var h=[],f=0;f<t.length;f+=1){for(var s=0,c=0;c<t.length;c+=1)s+=r[f][c]*t[c];h.push(s)}return h}if(r.length!==t.length)throw new Error("mult(): trying to mult vectors of different dimensions");for(var l=[],g=0;g<r.length;g+=1)l.push(r[g]*t[g]);return l}function h(r){!0===r.matrix&&(r=u(r));var t=r.length,n=!1;Array.isArray(r[0])&&(n=!0,t*=r[0].length);var e=new Float32Array(t);if(n)for(var a=0,i=0;i<r.length;i+=1)for(var o=0;o<r[i].length;o+=1)e[a++]=r[i][o];else for(var h=0;h<r.length;h+=1)e[h]=r[h];return e}var f={vec2:new Float32Array(h((0,e.K4)())).byteLength,vec3:new Float32Array(h((0,e.R3)())).byteLength,vec4:new Float32Array(h((0,e.vh)())).byteLength,mat2:new Float32Array(h((0,a.CY)())).byteLength,mat3:new Float32Array(h((0,a.wO)())).byteLength,mat4:new Float32Array(h((0,a._E)())).byteLength}},9690:function(r,t,n){"use strict";n.d(t,{K4:function(){return a},R3:function(){return u},vh:function(){return i}});n(40561);var e=n(1345);function a(){for(var r=arguments.length,t=new Array(r),n=0;n<r;n++)t[n]=arguments[n];for(var a=(0,e.y)(t),u=a.length,i=0;i<2-u;i+=1)a.push(0);return a.splice(0,2)}function u(){for(var r=arguments.length,t=new Array(r),n=0;n<r;n++)t[n]=arguments[n];for(var a=(0,e.y)(t),u=a.length,i=0;i<3-u;i+=1)a.push(0);return a.splice(0,3)}function i(){for(var r=arguments.length,t=new Array(r),n=0;n<r;n++)t[n]=arguments[n];for(var a=(0,e.y)(t),u=a.length,i=0;i<4-u;i+=1)a.push(0);return a.splice(0,4)}}}]);
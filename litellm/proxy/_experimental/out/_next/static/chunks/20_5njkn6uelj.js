(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,605500,(e,t,i)=>{"use strict";e.i(247167),Object.defineProperty(i,"__esModule",{value:!0}),Object.defineProperty(i,"Image",{enumerable:!0,get:function(){return v}});let a=e.r(555682),r=e.r(190809),n=e.r(843476),o=r._(e.r(271645)),s=a._(e.r(174080)),l=a._(e.r(325633)),d=e.r(908927),u=e.r(65856),p=e.r(49381),g=a._(e.r(1948)),m=e.r(818581);function c(e,t,i,a,r,n,o){let s=e?.src;e&&e["data-loaded-src"]!==s&&(e["data-loaded-src"]=s,("decode"in e?e.decode():Promise.resolve()).catch(()=>{}).then(()=>{if(e.parentElement&&e.isConnected){if("empty"!==t&&r(!0),i?.current){let t=new Event("load");Object.defineProperty(t,"target",{writable:!1,value:e});let a=!1,r=!1;i.current({...t,nativeEvent:t,currentTarget:e,target:e,isDefaultPrevented:()=>a,isPropagationStopped:()=>r,persist:()=>{},preventDefault:()=>{a=!0,t.preventDefault()},stopPropagation:()=>{r=!0,t.stopPropagation()}})}a?.current&&a.current(e)}}))}function f(e){return o.use?{fetchPriority:e}:{fetchpriority:e}}"u"<typeof window&&(globalThis.__NEXT_IMAGE_IMPORTED=!0);let _="u"<typeof window?o.useEffect:o.useLayoutEffect,h=(0,o.forwardRef)(({src:e,srcSet:t,sizes:i,height:a,width:r,decoding:s,className:l,style:d,fetchPriority:u,placeholder:p,loading:g,unoptimized:h,fill:b,onLoadRef:v,onLoadingCompleteRef:y,setBlurComplete:x,setShowAltText:w,sizesInput:j,onLoad:P,onError:z,...I},O)=>{let S=(0,o.useRef)(!1),C=(0,o.useRef)(null);_(()=>{let{current:e}=S,{current:t}=C;e||null===t||(z&&(t.src=t.src),t.complete&&c(t,p,v,y,x,h,j),S.current=!0)},[e,p,v,y,z,h,j]);let $=(0,m.useMergedRef)(O,C);return(0,n.jsx)("img",{...I,...f(u),loading:g,width:r,height:a,decoding:s,"data-nimg":b?"fill":"1",className:l,style:d,sizes:i,srcSet:t,src:e,ref:$,onLoad:e=>{c(e.currentTarget,p,v,y,x,h,j)},onError:e=>{w(!0),"empty"!==p&&x(!0),z&&z(e)}})});function b({isAppRouter:e,imgAttributes:t}){let i={as:"image",imageSrcSet:t.srcSet,imageSizes:t.sizes,crossOrigin:t.crossOrigin,referrerPolicy:t.referrerPolicy,...f(t.fetchPriority)};return e&&s.default.preload?(s.default.preload(t.src,i),null):(0,n.jsx)(l.default,{children:(0,n.jsx)("link",{rel:"preload",href:t.srcSet?void 0:t.src,...i},"__nimg-"+t.src+t.srcSet+t.sizes)})}let v=(0,o.forwardRef)((e,t)=>{let i=(0,o.useContext)(u.RouterContext),a=(0,p.useImageConfig)(),{onLoad:r,onLoadingComplete:s}=e,l=(0,o.useRef)(r);(0,o.useEffect)(()=>{l.current=r},[r]);let m=(0,o.useRef)(s);(0,o.useEffect)(()=>{m.current=s},[s]);let[c,f]=(0,o.useState)(!1),[_,v]=(0,o.useState)(!1),{props:y,meta:x}=(0,d.getImgProps)(e,{defaultLoader:g.default,imgConf:a,blurComplete:c,showAltText:_});return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(h,{...y,unoptimized:x.unoptimized,placeholder:x.placeholder,fill:x.fill,onLoadRef:l,onLoadingCompleteRef:m,setBlurComplete:f,setShowAltText:v,sizesInput:e.sizes,ref:t}),x.preload?(0,n.jsx)(b,{isAppRouter:!i,imgAttributes:y}):null]})});("function"==typeof i.default||"object"==typeof i.default&&null!==i.default)&&void 0===i.default.__esModule&&(Object.defineProperty(i.default,"__esModule",{value:!0}),Object.assign(i.default,i),t.exports=i.default)},325164,e=>{"use strict";var t=e.i(605500);e.s(["default",()=>t.Image])},49381,(e,t,i)=>{"use strict";e.i(247167),Object.defineProperty(i,"__esModule",{value:!0}),Object.defineProperty(i,"useImageConfig",{enumerable:!0,get:function(){return s}});let a=e.r(271645),r=e.r(987690),n=e.r(918556),o={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[32,48,64,96,128,256,384],qualities:[75],path:"/_next/image/",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!0};function s(){let e=(0,a.useContext)(n.ImageConfigContext);return(0,r.prepareImageConfig)(o,e)}("function"==typeof i.default||"object"==typeof i.default&&null!==i.default)&&void 0===i.default.__esModule&&(Object.defineProperty(i.default,"__esModule",{value:!0}),Object.assign(i.default,i),t.exports=i.default)},670965,(e,t,i)=>{"use strict";function a(e,t){let i=e||75;return t?.qualities?.length?t.qualities.reduce((e,t)=>Math.abs(t-i)<Math.abs(e-i)?t:e,t.qualities[0]):i}Object.defineProperty(i,"__esModule",{value:!0}),Object.defineProperty(i,"findClosestQuality",{enumerable:!0,get:function(){return a}})},908927,(e,t,i)=>{"use strict";e.i(247167),Object.defineProperty(i,"__esModule",{value:!0}),Object.defineProperty(i,"getImgProps",{enumerable:!0,get:function(){return l}});let a=e.r(543369),r=e.r(488143),n=["-moz-initial","fill","none","scale-down",void 0];function o(e){return void 0!==e.default}function s(e){return void 0===e?e:"number"==typeof e?Number.isFinite(e)?e:0/0:"string"==typeof e&&/^[0-9]+$/.test(e)?parseInt(e,10):0/0}function l({src:e,sizes:t,unoptimized:i=!1,priority:d=!1,preload:u=!1,loading:p,className:g,quality:m,width:c,height:f,fill:_=!1,style:h,overrideSrc:b,onLoad:v,onLoadingComplete:y,placeholder:x="empty",blurDataURL:w,fetchPriority:j,decoding:P="async",layout:z,objectFit:I,objectPosition:O,lazyBoundary:S,lazyRoot:C,...$},E){var M;let k,R,{imgConf:A,showAltText:N,blurComplete:T,defaultLoader:L}=E;if(void 0===L)throw Error("images.loaderFile detected but the file is missing default export.\nRead more: https://nextjs.org/docs/messages/invalid-images-config");let D=$.loader||L;delete $.loader,delete $.srcSet;let F="__next_img_default"in D;if(F){if("custom"===A.loader)throw Error(`Image with src "${e}" is missing "loader" prop.
Read more: https://nextjs.org/docs/messages/next-image-missing-loader`)}else{let e=D;D=t=>{let{config:i,...a}=t;return e(a)}}if(z){"fill"===z&&(_=!0);let e={intrinsic:{maxWidth:"100%",height:"auto"},responsive:{width:"100%",height:"auto"}}[z];e&&(h={...h,...e});let i={responsive:"100vw",fill:"100vw"}[z];i&&!t&&(t=i)}let U="",q=s(c),B=s(f);if((M=e)&&"object"==typeof M&&(o(M)||void 0!==M.src)){let t=o(e)?e.default:e;if(!t.src)throw Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received ${JSON.stringify(t)}`);if(!t.height||!t.width)throw Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received ${JSON.stringify(t)}`);if(k=t.blurWidth,R=t.blurHeight,w=w||t.blurDataURL,U=t.src,!_)if(q||B){if(q&&!B){let e=q/t.width;B=Math.round(t.height*e)}else if(!q&&B){let e=B/t.height;q=Math.round(t.width*e)}}else q=t.width,B=t.height}let H=!d&&!u&&("lazy"===p||void 0===p);(!(e="string"==typeof e?e:U)||e.startsWith("data:")||e.startsWith("blob:"))&&(i=!0,H=!1),A.unoptimized&&(i=!0),F&&!A.dangerouslyAllowSVG&&e.split("?",1)[0].endsWith(".svg")&&(i=!0);let G=s(m),W=Object.assign(_?{position:"absolute",height:"100%",width:"100%",left:0,top:0,right:0,bottom:0,objectFit:I,objectPosition:O}:{},N?{}:{color:"transparent"},h),Y=T||"empty"===x?null:"blur"===x?`url("data:image/svg+xml;charset=utf-8,${(0,r.getImageBlurSvg)({widthInt:q,heightInt:B,blurWidth:k,blurHeight:R,blurDataURL:w||"",objectFit:W.objectFit})}")`:`url("${x}")`,V=n.includes(W.objectFit)?"fill"===W.objectFit?"100% 100%":"cover":W.objectFit,Q=Y?{backgroundSize:V,backgroundPosition:W.objectPosition||"50% 50%",backgroundRepeat:"no-repeat",backgroundImage:Y}:{},J=function({config:e,src:t,unoptimized:i,width:r,quality:n,sizes:o,loader:s}){if(i){if(t.startsWith("/")&&!t.startsWith("//")){let e=(0,a.getDeploymentId)();if(t.includes("/_next/static/immutable")&&!(0,a.getAssetToken)())e=void 0;else if(e){let i=t.indexOf("?");if(-1!==i){let a=new URLSearchParams(t.slice(i+1));a.get("dpl")||(a.append("dpl",e),t=t.slice(0,i)+"?"+a.toString())}else t+=`?dpl=${e}`}}return{src:t,srcSet:void 0,sizes:void 0}}let{widths:l,kind:d}=function({deviceSizes:e,allSizes:t},i,a){if(a){let i=/(^|\s)(1?\d?\d)vw/g,r=[];for(let e;e=i.exec(a);)r.push(parseInt(e[2]));if(r.length){let i=.01*Math.min(...r);return{widths:t.filter(t=>t>=e[0]*i),kind:"w"}}return{widths:t,kind:"w"}}return"number"!=typeof i?{widths:e,kind:"w"}:{widths:[...new Set([i,2*i].map(e=>t.find(t=>t>=e)||t[t.length-1]))],kind:"x"}}(e,r,o),u=l.length-1;return{sizes:o||"w"!==d?o:"100vw",srcSet:l.map((i,a)=>`${s({config:e,src:t,quality:n,width:i})} ${"w"===d?i:a+1}${d}`).join(", "),src:s({config:e,src:t,quality:n,width:l[u]})}}({config:A,src:e,unoptimized:i,width:q,quality:G,sizes:t,loader:D}),K=H?"lazy":p;return{props:{...$,loading:K,fetchPriority:j,width:q,height:B,decoding:P,className:g,style:{...W,...Q},sizes:J.sizes,srcSet:J.srcSet,src:b||J.src},meta:{unoptimized:i,preload:u||d,placeholder:x,fill:_}}}},325633,(e,t,i)=>{"use strict";e.i(247167),Object.defineProperty(i,"__esModule",{value:!0});var a={default:function(){return f},defaultHead:function(){return p}};for(var r in a)Object.defineProperty(i,r,{enumerable:!0,get:a[r]});let n=e.r(555682),o=e.r(190809),s=e.r(843476),l=o._(e.r(271645)),d=n._(e.r(898879)),u=e.r(742732);function p(){return[(0,s.jsx)("meta",{charSet:"utf-8"},"charset"),(0,s.jsx)("meta",{name:"viewport",content:"width=device-width"},"viewport")]}function g(e,t){return"string"==typeof t||"number"==typeof t?e:t.type===l.default.Fragment?e.concat(l.default.Children.toArray(t.props.children).reduce((e,t)=>"string"==typeof t||"number"==typeof t?e:e.concat(t),[])):e.concat(t)}let m=["name","httpEquiv","charSet","itemProp"];function c(e){let t,i,a,r;return e.reduce(g,[]).reverse().concat(p().reverse()).filter((t=new Set,i=new Set,a=new Set,r={},e=>{let n=!0,o=!1;if(e.key&&"number"!=typeof e.key&&e.key.indexOf("$")>0){o=!0;let i=e.key.slice(e.key.indexOf("$")+1);t.has(i)?n=!1:t.add(i)}switch(e.type){case"title":case"base":i.has(e.type)?n=!1:i.add(e.type);break;case"meta":for(let t=0,i=m.length;t<i;t++){let i=m[t];if(e.props.hasOwnProperty(i))if("charSet"===i)a.has(i)?n=!1:a.add(i);else{let t=e.props[i],a=r[i]||new Set;("name"!==i||!o)&&a.has(t)?n=!1:(a.add(t),r[i]=a)}}}return n})).reverse().map((e,t)=>{let i=e.key||t;return l.default.cloneElement(e,{key:i})})}let f=function({children:e}){let t=(0,l.useContext)(u.HeadManagerContext);return(0,s.jsx)(d.default,{reduceComponentsToState:c,headManager:t,children:e})};("function"==typeof i.default||"object"==typeof i.default&&null!==i.default)&&void 0===i.default.__esModule&&(Object.defineProperty(i.default,"__esModule",{value:!0}),Object.assign(i.default,i),t.exports=i.default)},488143,(e,t,i)=>{"use strict";function a({widthInt:e,heightInt:t,blurWidth:i,blurHeight:r,blurDataURL:n,objectFit:o}){let s=i?40*i:e,l=r?40*r:t,d=s&&l?`viewBox='0 0 ${s} ${l}'`:"";return`%3Csvg xmlns='http://www.w3.org/2000/svg' ${d}%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3CfeColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/%3E%3CfeFlood x='0' y='0' width='100%25' height='100%25'/%3E%3CfeComposite operator='out' in='s'/%3E%3CfeComposite in2='SourceGraphic'/%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3C/filter%3E%3Cimage width='100%25' height='100%25' x='0' y='0' preserveAspectRatio='${d?"none":"contain"===o?"xMidYMid":"cover"===o?"xMidYMid slice":"none"}' style='filter: url(%23b);' href='${n}'/%3E%3C/svg%3E`}Object.defineProperty(i,"__esModule",{value:!0}),Object.defineProperty(i,"getImageBlurSvg",{enumerable:!0,get:function(){return a}})},918556,(e,t,i)=>{"use strict";e.i(247167),Object.defineProperty(i,"__esModule",{value:!0}),Object.defineProperty(i,"ImageConfigContext",{enumerable:!0,get:function(){return n}});let a=e.r(555682)._(e.r(271645)),r=e.r(987690),n=a.default.createContext(r.imageConfigDefault)},987690,(e,t,i)=>{"use strict";Object.defineProperty(i,"__esModule",{value:!0});var a={VALID_LOADERS:function(){return n},imageConfigDefault:function(){return d},prepareImageConfig:function(){return l}};for(var r in a)Object.defineProperty(i,r,{enumerable:!0,get:a[r]});let n=["default","imgix","cloudinary","akamai","custom"],o={},s=new WeakMap;function l(e,t){let i=e??o,a=t??o,r=s.get(i);if(r){let e=r.get(a);if(e)return e}let n=e||t||d,l=[...n.deviceSizes].sort((e,t)=>e-t),u=[...n.imageSizes],p={deviceSizes:l,imageSizes:u,allSizes:[...l,...u].sort((e,t)=>e-t),qualities:void 0===n.qualities?void 0:[...n.qualities].sort((e,t)=>e-t),path:n.path,loader:n.loader,dangerouslyAllowSVG:n.dangerouslyAllowSVG,unoptimized:n.unoptimized,domains:n.domains,remotePatterns:n.remotePatterns,localPatterns:"u"<typeof window&&void 0!==t?t.localPatterns:n.localPatterns,output:n.output};return r||(r=new WeakMap,s.set(i,r)),r.set(a,p),p}let d={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[32,48,64,96,128,256,384],path:"/_next/image",loader:"default",loaderFile:"",domains:[],disableStaticImages:!1,minimumCacheTTL:14400,formats:["image/webp"],maximumDiskCacheSize:void 0,maximumRedirects:3,maximumResponseBody:5e7,dangerouslyAllowLocalIP:!1,dangerouslyAllowSVG:!1,contentSecurityPolicy:"script-src 'none'; frame-src 'none'; sandbox;",contentDispositionType:"attachment",localPatterns:void 0,remotePatterns:[],qualities:[75],unoptimized:!1,customCacheHandler:!1}},1948,(e,t,i)=>{"use strict";e.i(247167),Object.defineProperty(i,"__esModule",{value:!0}),Object.defineProperty(i,"default",{enumerable:!0,get:function(){return o}});let a=e.r(670965),r=e.r(543369);function n({config:e,src:t,width:i,quality:o}){let s=(0,r.getDeploymentId)();if(t.startsWith("/")&&!t.startsWith("//"))if(t.includes("/_next/static/immutable")&&!(0,r.getAssetToken)())s=void 0;else{let e=t.indexOf("?");if(-1!==e){let i=new URLSearchParams(t.slice(e+1)),a=i.get("dpl");if(a){s=a,i.delete("dpl");let r=i.toString();t=t.slice(0,e)+(r?"?"+r:"")}}}if(t.startsWith("/")&&t.includes("?")&&e.localPatterns?.length===1&&"**"===e.localPatterns[0].pathname&&""===e.localPatterns[0].search)throw Error(`Image with src "${t}" is using a query string which is not configured in images.localPatterns.
Read more: https://nextjs.org/docs/messages/next-image-unconfigured-localpatterns`);let l=(0,a.findClosestQuality)(o,e);return`${e.path}?url=${encodeURIComponent(t)}&w=${i}&q=${l}${t.startsWith("/")&&s?`&dpl=${s}`:""}`}n.__next_img_default=!0;let o=n},65856,(e,t,i)=>{"use strict";e.i(247167),Object.defineProperty(i,"__esModule",{value:!0}),Object.defineProperty(i,"RouterContext",{enumerable:!0,get:function(){return a}});let a=(e.r(555682)._(e.r(271645))).default.createContext(null)},898879,(e,t,i)=>{"use strict";Object.defineProperty(i,"__esModule",{value:!0}),Object.defineProperty(i,"default",{enumerable:!0,get:function(){return s}});let a=e.r(271645),r="u"<typeof window,n=r?()=>{}:a.useLayoutEffect,o=r?()=>{}:a.useEffect;function s(e){let{headManager:t,reduceComponentsToState:i}=e;function s(){if(t&&t.mountedInstances){let e=a.Children.toArray(Array.from(t.mountedInstances).filter(Boolean));t.updateHead(i(e))}}return r&&(t?.mountedInstances?.add(e.children),s()),n(()=>(t?.mountedInstances?.add(e.children),()=>{t?.mountedInstances?.delete(e.children)})),n(()=>(t&&(t._pendingUpdate=s),()=>{t&&(t._pendingUpdate=s)})),o(()=>(t&&t._pendingUpdate&&(t._pendingUpdate(),t._pendingUpdate=null),()=>{t&&t._pendingUpdate&&(t._pendingUpdate(),t._pendingUpdate=null)})),null}},909947,e=>{"use strict";var t=e.i(865361);e.s(["f",0,e=>{let i,{apiKeySource:a,accessToken:r,apiKey:n,inputMessage:o,chatHistory:s,selectedTags:l,selectedVectorStores:d,selectedGuardrails:u,selectedPolicies:p,selectedVoice:g,endpointType:m,selectedModel:c,selectedSdk:f,proxySettings:_,customHeaders:h}=e,b="session"===a?r:n,v=window.location.origin,y=_?.LITELLM_UI_API_DOC_BASE_URL;y&&y.trim()?v=y:_?.PROXY_BASE_URL&&(v=_.PROXY_BASE_URL);let x=o||"Your prompt here",w=x.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\n"),j=s.filter(e=>!e.isImage).map(({role:e,content:t})=>({role:e,content:t})),P={};l.length>0&&(P.tags=l),d.length>0&&(P.vector_stores=d),u.length>0&&(P.guardrails=u),p.length>0&&(P.policies=p);let z=c||"your-model-name",I=h&&Object.keys(h).length>0?`,
	default_headers=${JSON.stringify(h,null,2).replace(/\n/g,"\n	")}`:"",O="azure"===f?`import openai

client = openai.AzureOpenAI(
	api_key="${b||"YOUR_LITELLM_API_KEY"}",
	azure_endpoint="${v}",
	api_version="2024-02-01"${I}
)`:`import openai

client = openai.OpenAI(
	api_key="${b||"YOUR_LITELLM_API_KEY"}",
	base_url="${v}"${I}
)`;switch(m){case t.Q.CHAT:{let e=Object.keys(P).length>0,t="";if(e){let e=JSON.stringify({metadata:P},null,2).split("\n").map(e=>" ".repeat(4)+e).join("\n").trim();t=`,
    extra_body=${e}`}let a=j.length>0?j:[{role:"user",content:x}];i=`
import base64

# Helper function to encode images to base64
def encode_image(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')

# Example with text only
response = client.chat.completions.create(
    model="${z}",
    messages=${JSON.stringify(a,null,4)}${t}
)

print(response)

# Example with image or PDF (uncomment and provide file path to use)
# base64_file = encode_image("path/to/your/file.jpg")  # or .pdf
# response_with_file = client.chat.completions.create(
#     model="${z}",
#     messages=[
#         {
#             "role": "user",
#             "content": [
#                 {
#                     "type": "text",
#                     "text": "${w}"
#                 },
#                 {
#                     "type": "image_url",
#                     "image_url": {
#                         "url": f"data:image/jpeg;base64,{base64_file}"  # or data:application/pdf;base64,{base64_file}
#                     }
#                 }
#             ]
#         }
#     ]${t}
# )
# print(response_with_file)
`;break}case t.Q.RESPONSES:{let e=Object.keys(P).length>0,t="";if(e){let e=JSON.stringify({metadata:P},null,2).split("\n").map(e=>" ".repeat(4)+e).join("\n").trim();t=`,
    extra_body=${e}`}let a=j.length>0?j:[{role:"user",content:x}];i=`
import base64

# Helper function to encode images to base64
def encode_image(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')

# Example with text only
response = client.responses.create(
    model="${z}",
    input=${JSON.stringify(a,null,4)}${t}
)

print(response.output_text)

# Example with image or PDF (uncomment and provide file path to use)
# base64_file = encode_image("path/to/your/file.jpg")  # or .pdf
# response_with_file = client.responses.create(
#     model="${z}",
#     input=[
#         {
#             "role": "user",
#             "content": [
#                 {"type": "input_text", "text": "${w}"},
#                 {
#                     "type": "input_image",
#                     "image_url": f"data:image/jpeg;base64,{base64_file}",  # or data:application/pdf;base64,{base64_file}
#                     "detail": "auto",
#                 },
#             ],
#         }
#     ]${t}
# )
# print(response_with_file.output_text)
`;break}case t.Q.IMAGE:i="azure"===f?`
# NOTE: The Azure SDK does not have a direct equivalent to the multi-modal 'responses.create' method shown for OpenAI.
# This snippet uses 'client.images.generate' and will create a new image based on your prompt.
# It does not use the uploaded image, as 'client.images.generate' does not support image inputs in this context.
import os
import requests
import json
import time
from PIL import Image

result = client.images.generate(
	model="${z}",
	prompt="${o}",
	n=1
)

json_response = json.loads(result.model_dump_json())

# Set the directory for the stored image
image_dir = os.path.join(os.curdir, 'images')

# If the directory doesn't exist, create it
if not os.path.isdir(image_dir):
	os.mkdir(image_dir)

# Initialize the image path
image_filename = f"generated_image_{int(time.time())}.png"
image_path = os.path.join(image_dir, image_filename)

try:
	# Retrieve the generated image
	if json_response.get("data") && len(json_response["data"]) > 0 && json_response["data"][0].get("url"):
			image_url = json_response["data"][0]["url"]
			generated_image = requests.get(image_url).content
			with open(image_path, "wb") as image_file:
					image_file.write(generated_image)

			print(f"Image saved to {image_path}")
			# Display the image
			image = Image.open(image_path)
			image.show()
	else:
			print("Could not find image URL in response.")
			print("Full response:", json_response)
except Exception as e:
	print(f"An error occurred: {e}")
	print("Full response:", json_response)
`:`
import base64
import os
import time
import json
from PIL import Image
import requests

# Helper function to encode images to base64
def encode_image(image_path):
	with open(image_path, "rb") as image_file:
			return base64.b64encode(image_file.read()).decode('utf-8')

# Helper function to create a file (simplified for this example)
def create_file(image_path):
	# In a real implementation, this would upload the file to OpenAI
	# For this example, we'll just return a placeholder ID
	return f"file_{os.path.basename(image_path).replace('.', '_')}"

# The prompt entered by the user
prompt = "${w}"

# Encode images to base64
base64_image1 = encode_image("body-lotion.png")
base64_image2 = encode_image("soap.png")

# Create file IDs
file_id1 = create_file("body-lotion.png")
file_id2 = create_file("incense-kit.png")

response = client.responses.create(
	model="${z}",
	input=[
			{
					"role": "user",
					"content": [
							{"type": "input_text", "text": prompt},
							{
									"type": "input_image",
									"image_url": f"data:image/jpeg;base64,{base64_image1}",
									"detail": "auto",
							},
							{
									"type": "input_image",
									"image_url": f"data:image/jpeg;base64,{base64_image2}",
									"detail": "auto",
							},
							{
									"type": "input_image",
									"file_id": file_id1,
									"detail": "auto",
							},
							{
									"type": "input_image",
									"file_id": file_id2,
									"detail": "auto",
							}
					],
			}
	],
	tools=[{"type": "image_generation"}],
)

# Process the response
image_generation_calls = [
	output
	for output in response.output
	if output.type == "image_generation_call"
]

image_data = [output.result for output in image_generation_calls]

if image_data:
	image_base64 = image_data[0]
	image_filename = f"edited_image_{int(time.time())}.png"
	with open(image_filename, "wb") as f:
			f.write(base64.b64decode(image_base64))
	print(f"Image saved to {image_filename}")
else:
	# If no image is generated, there might be a text response with an explanation
	text_response = [output.text for output in response.output if hasattr(output, 'text')]
	if text_response:
			print("No image generated. Model response:")
			print("\\n".join(text_response))
	else:
			print("No image data found in response.")
	print("Full response for debugging:")
	print(response)
`;break;case t.Q.IMAGE_EDITS:i="azure"===f?`
import base64
import os
import time
import json
from PIL import Image
import requests

# Helper function to encode images to base64
def encode_image(image_path):
	with open(image_path, "rb") as image_file:
			return base64.b64encode(image_file.read()).decode('utf-8')

# The prompt entered by the user
prompt = "${w}"

# Encode images to base64
base64_image1 = encode_image("body-lotion.png")
base64_image2 = encode_image("soap.png")

# Create file IDs
file_id1 = create_file("body-lotion.png")
file_id2 = create_file("incense-kit.png")

response = client.responses.create(
	model="${z}",
	input=[
			{
					"role": "user",
					"content": [
							{"type": "input_text", "text": prompt},
							{
									"type": "input_image",
									"image_url": f"data:image/jpeg;base64,{base64_image1}",
									"detail": "auto",
							},
							{
									"type": "input_image",
									"image_url": f"data:image/jpeg;base64,{base64_image2}",
									"detail": "auto",
							},
							{
									"type": "input_image",
									"file_id": file_id1,
									"detail": "auto",
							},
							{
									"type": "input_image",
									"file_id": file_id2,
									"detail": "auto",
							}
					],
			}
	],
	tools=[{"type": "image_generation"}],
)

# Process the response
image_generation_calls = [
	output
	for output in response.output
	if output.type == "image_generation_call"
]

image_data = [output.result for output in image_generation_calls]

if image_data:
	image_base64 = image_data[0]
	image_filename = f"edited_image_{int(time.time())}.png"
	with open(image_filename, "wb") as f:
			f.write(base64.b64decode(image_base64))
	print(f"Image saved to {image_filename}")
else:
	# If no image is generated, there might be a text response with an explanation
	text_response = [output.text for output in response.output if hasattr(output, 'text')]
	if text_response:
			print("No image generated. Model response:")
			print("\\n".join(text_response))
	else:
			print("No image data found in response.")
	print("Full response for debugging:")
	print(response)
`:`
import base64
import os
import time

# Helper function to encode images to base64
def encode_image(image_path):
	with open(image_path, "rb") as image_file:
			return base64.b64encode(image_file.read()).decode('utf-8')

# Helper function to create a file (simplified for this example)
def create_file(image_path):
	# In a real implementation, this would upload the file to OpenAI
	# For this example, we'll just return a placeholder ID
	return f"file_{os.path.basename(image_path).replace('.', '_')}"

# The prompt entered by the user
prompt = "${w}"

# Encode images to base64
base64_image1 = encode_image("body-lotion.png")
base64_image2 = encode_image("soap.png")

# Create file IDs
file_id1 = create_file("body-lotion.png")
file_id2 = create_file("incense-kit.png")

response = client.responses.create(
	model="${z}",
	input=[
			{
					"role": "user",
					"content": [
							{"type": "input_text", "text": prompt},
							{
									"type": "input_image",
									"image_url": f"data:image/jpeg;base64,{base64_image1}",
									"detail": "auto",
							},
							{
									"type": "input_image",
									"image_url": f"data:image/jpeg;base64,{base64_image2}",
									"detail": "auto",
							},
							{
									"type": "input_image",
									"file_id": file_id1,
									"detail": "auto",
							},
							{
									"type": "input_image",
									"file_id": file_id2,
									"detail": "auto",
							}
					],
			}
	],
	tools=[{"type": "image_generation"}],
)

# Process the response
image_generation_calls = [
	output
	for output in response.output
	if output.type == "image_generation_call"
]

image_data = [output.result for output in image_generation_calls]

if image_data:
	image_base64 = image_data[0]
	image_filename = f"edited_image_{int(time.time())}.png"
	with open(image_filename, "wb") as f:
			f.write(base64.b64decode(image_base64))
	print(f"Image saved to {image_filename}")
else:
	# If no image is generated, there might be a text response with an explanation
	text_response = [output.text for output in response.output if hasattr(output, 'text')]
	if text_response:
			print("No image generated. Model response:")
			print("\\n".join(text_response))
	else:
			print("No image data found in response.")
	print("Full response for debugging:")
	print(response)
`;break;case t.Q.EMBEDDINGS:i=`
response = client.embeddings.create(
	input="${o||"Your string here"}",
	model="${z}",
	encoding_format="base64" # or "float"
)

print(response.data[0].embedding)
`;break;case t.Q.TRANSCRIPTION:i=`
# Open the audio file
audio_file = open("path/to/your/audio/file.mp3", "rb")

# Make the transcription request
response = client.audio.transcriptions.create(
	model="${z}",
	file=audio_file${o?`,
	prompt="${o.replace(/\\/g,"\\\\").replace(/"/g,'\\"')}"`:""}
)

print(response.text)
`;break;case t.Q.SPEECH:i=`
# Make the text-to-speech request
response = client.audio.speech.create(
	model="${z}",
	input="${o||"Your text to convert to speech here"}",
	voice="${g}"  # Options: alloy, ash, ballad, coral, echo, fable, nova, onyx, sage, shimmer
)

# Save the audio to a file
output_filename = "output_speech.mp3"
response.stream_to_file(output_filename)
print(f"Audio saved to {output_filename}")

# Optional: Customize response format and speed
# response = client.audio.speech.create(
#     model="${z}",
#     input="${o||"Your text to convert to speech here"}",
#     voice="alloy",
#     response_format="mp3",  # Options: mp3, opus, aac, flac, wav, pcm
#     speed=1.0  # Range: 0.25 to 4.0
# )
# response.stream_to_file("output_speech.mp3")
`;break;default:i="\n# Code generation for this endpoint is not implemented yet."}return`${O}
${i}`}])},906197,e=>{"use strict";var t=e.i(843476),i=e.i(176782),a=e.i(911825),r=e.i(225913),n=e.i(196631);e.i(772436);let o=(0,r.f)("group/item flex w-full flex-wrap items-center rounded-md border text-sm transition-colors duration-100 outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 [a]:transition-colors [a]:hover:bg-muted",{variants:{variant:{default:"border-transparent",outline:"border-border",muted:"border-transparent bg-muted/50"},size:{default:"gap-3.5 px-4 py-3.5",sm:"gap-2.5 px-3 py-2.5",xs:"gap-2 px-2.5 py-2 in-data-[slot=dropdown-menu-content]:p-0"}},defaultVariants:{variant:"default",size:"default"}});(0,r.f)("flex shrink-0 items-center justify-center gap-2 group-has-data-[slot=item-description]/item:translate-y-0.5 group-has-data-[slot=item-description]/item:self-start [&_svg]:pointer-events-none",{variants:{variant:{default:"bg-transparent",icon:"[&_svg:not([class*='size-'])]:size-4",image:"size-10 overflow-hidden rounded-sm group-data-[size=sm]/item:size-8 group-data-[size=xs]/item:size-6 [&_img]:size-full [&_img]:object-cover"}},defaultVariants:{variant:"default"}}),e.s(["M",0,function({className:e,variant:t="default",size:r="default",render:s,...l}){return(0,a.f)({defaultTagName:"div",props:(0,i.w)({className:(0,n.c)(o({variant:t,size:r,className:e}))},l),render:s,state:{slot:"item",variant:t,size:r}})},"P",0,function({className:e,...i}){return(0,t.jsx)("div",{"data-slot":"item-actions",className:(0,n.c)("flex items-center gap-2",e),...i})},"H",0,function({className:e,...i}){return(0,t.jsx)("div",{"data-slot":"item-content",className:(0,n.c)("flex flex-1 flex-col gap-1 group-data-[size=xs]/item:gap-0 [&+[data-slot=item-content]]:flex-none",e),...i})},"B",0,function({className:e,...i}){return(0,t.jsx)("p",{"data-slot":"item-description",className:(0,n.c)("line-clamp-2 text-left text-sm leading-normal font-normal text-muted-foreground group-data-[size=xs]/item:text-xs [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",e),...i})},"t",0,function({className:e,...i}){return(0,t.jsx)("div",{role:"list","data-slot":"item-group",className:(0,n.c)("group/item-group flex w-full flex-col gap-4 has-data-[size=sm]:gap-2.5 has-data-[size=xs]:gap-2",e),...i})},"$",0,function({className:e,...i}){return(0,t.jsx)("div",{"data-slot":"item-title",className:(0,n.c)("line-clamp-1 flex w-fit items-center gap-2 text-sm leading-snug font-medium underline-offset-4",e),...i})}])},808562,e=>{"use strict";var t,i=e.i(843476),a=e.i(271645),r=e.i(363785),n=e.i(667865),o=e.i(951437),s=e.i(956789),l=e.i(552245),d=e.i(405934),u=e.i(96533),p=e.i(733332);let g=a.createContext(void 0);var m=e.i(31052);let c=((t={}).disabled="data-disabled",t.orientation="data-orientation",t.multiple="data-multiple",t),f={multiple:e=>e?{[c.multiple]:""}:null},_=a.forwardRef(function(e,t){let{defaultValue:r,disabled:c=!1,loopFocus:_=!0,onValueChange:h,orientation:b="horizontal",multiple:v=!1,value:y,className:x,render:w,style:j,...P}=e,z=(0,u.f)(!0),I=function(e){let t=a.useContext(g);if(void 0===t&&!e)throw Error((0,p.f)(68));return t}(!0),O=a.useMemo(()=>void 0!==y||void 0!==r,[y,r]),S=(z?.disabled??!1)||(I?.disabled??!1)||c,[C,$]=(0,o.f)({controlled:y,default:void 0===y?r??s.v:void 0,name:"ToggleGroup",state:"value"}),E=(0,n.f)((e,t,i)=>{let a;v?(a=C.slice(),t?a.push(e):a.splice(C.indexOf(e),1)):a=t?[e]:[],h?.(a,i),i.isCanceled||$(a)}),M={disabled:S,multiple:v,orientation:b},k=a.useMemo(()=>({disabled:S,orientation:b,setGroupValue:E,value:C,isValueInitialized:O}),[S,b,E,C,O]),R={role:"group"},A=(0,l.f)("div",e,{enabled:!!z,state:M,ref:t,props:[R,P],stateAttributesMapping:f});return(0,i.jsx)(m.U.Provider,{value:k,children:z?A:(0,i.jsx)(d.f,{render:w,className:x,style:j,state:M,refs:[t],props:[R,P],stateAttributesMapping:f,loopFocus:_,enableHomeAndEndKeys:!0,orientation:b})})});var h=e.i(196631),b=e.i(170962);let v=a.createContext({size:"default",variant:"default",spacing:2,orientation:"horizontal"});e.s(["z",0,function({className:e,variant:t,size:a,spacing:r=2,orientation:n="horizontal",children:o,...s}){return(0,i.jsx)(_,{"data-slot":"toggle-group","data-variant":t,"data-size":a,"data-spacing":r,"data-orientation":n,style:{"--gap":r},className:(0,h.c)("group/toggle-group flex w-fit flex-row items-center gap-[--spacing(var(--gap))] rounded-md data-[spacing=0]:data-[variant=outline]:shadow-xs data-vertical:flex-col data-vertical:items-stretch",e),...s,children:(0,i.jsx)(v.Provider,{value:{variant:t,size:a,spacing:r,orientation:n},children:o})})},"H",0,function({className:e,children:t,variant:n="default",size:o="default",...s}){let l=a.useContext(v);return(0,i.jsx)(r.f,{"data-slot":"toggle-group-item","data-variant":l.variant||n,"data-size":l.size||o,"data-spacing":l.spacing,className:(0,h.c)("shrink-0 group-data-[spacing=0]/toggle-group:rounded-none group-data-[spacing=0]/toggle-group:px-2 group-data-[spacing=0]/toggle-group:shadow-none focus:z-10 focus-visible:z-10 group-data-[spacing=0]/toggle-group:has-data-[icon=inline-end]:pr-1.5 group-data-[spacing=0]/toggle-group:has-data-[icon=inline-start]:pl-1.5 group-data-horizontal/toggle-group:data-[spacing=0]:first:rounded-l-md group-data-vertical/toggle-group:data-[spacing=0]:first:rounded-t-md group-data-horizontal/toggle-group:data-[spacing=0]:last:rounded-r-md group-data-vertical/toggle-group:data-[spacing=0]:last:rounded-b-md data-[state=on]:bg-muted group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:border-l-0 group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0 group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-l group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t",(0,b.F)({variant:l.variant||n,size:l.size||o}),e),...s,children:t})}],808562)},170962,31052,363785,e=>{"use strict";var t=e.i(843476),i=e.i(271645),a=e.i(951437),r=e.i(788015),n=e.i(552245),o=e.i(733332);let s=i.createContext(void 0);function l(e=!0){let t=i.useContext(s);if(void 0===t&&!e)throw Error((0,o.f)(7));return t}e.s(["U",0,s,"J",0,l],31052);var d=e.i(540886),u=e.i(348990),p=e.i(675606),g=e.i(380025);let m=i.forwardRef(function(e,o){let{className:s,defaultPressed:m=!1,disabled:c=!1,form:f,onPressedChange:_,pressed:h,render:b,type:v,value:y,nativeButton:x=!0,style:w,...j}=e,P=(0,r.f)(y||void 0),z=l(),I=z?.value??[],O=z?void 0:m,S=(c||z?.disabled)??!1,[C,$]=(0,a.f)({controlled:z?void 0!==P&&I.indexOf(P)>-1:h,default:O,name:"Toggle",state:"pressed"}),{getButtonProps:E,buttonRef:M}=(0,d.f)({disabled:S,native:x}),k={disabled:S,pressed:C},R=[M,o],A=[{"aria-pressed":C,onClick(e){let t=!C,i=(0,p.j)(g.f.none,e.nativeEvent);_?.(t,i),i.isCanceled||(P&&z?.setGroupValue?.(P,t,i),i.isCanceled||$(t))}},j,E],N=(0,n.f)("button",e,{enabled:!z,state:k,ref:R,props:A}),T=i.useMemo(()=>({disabled:S,focusableWhenDisabled:!1}),[S]);return z?(0,t.jsx)(u.f,{tag:"button",render:b,className:s,style:w,metadata:T,state:k,refs:R,props:A}):N});e.s(["f",0,m],363785);var c=e.i(225913),f=e.i(196631);let _=(0,c.f)("group/toggle inline-flex items-center justify-center gap-1 rounded-md text-sm font-medium whitespace-nowrap transition-[color,box-shadow] outline-none hover:bg-muted hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 aria-pressed:bg-muted dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",{variants:{variant:{default:"bg-transparent",outline:"border border-input bg-transparent shadow-xs hover:bg-muted"},size:{default:"h-9 min-w-9 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",sm:"h-8 min-w-8 px-2.5 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5",lg:"h-10 min-w-10 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2"}},defaultVariants:{variant:"default",size:"default"}});e.s(["z",0,function({className:e,variant:i="default",size:a="default",...r}){return(0,t.jsx)(m,{"data-slot":"toggle",className:(0,f.c)(_({variant:i,size:a,className:e})),...r})},"F",0,_],170962)},735450,e=>{"use strict";var t=e.i(411382),i=e.i(772325),a=e.i(54105),r=e.i(240192),n=e.i(138620);let o="https://docs.litellm.ai/docs/decisions",s=`${o}#supported-providers`,l=`${o}#self-hosted-laya-and-nimble`,d=new Set(["/v1/decisions","/v1/systemone"]),u=t.z.object({litellm_provider:a.z.string(),mode:a.z.string().nullish(),supported_endpoints:i.z.array(a.z.string()).nullish()}),p="decisions",g=["evaluation",p],m=e=>null!=e&&g.includes(e),c=e=>m(e.mode)||(e.supported_endpoints??[]).some(e=>d.has(e)),f=e=>{let t=r.z.record(a.z.string(),n.z.unknown()).safeParse(e);return t.success?Object.entries(t.data).flatMap(([e,t])=>{let i=u.safeParse(t);return i.success?[[e,i.data]]:[]}):[]},_={decisions:0,"self-hosted":1,"needs-upgrade":2},h=t.z.object({decision_model_providers:i.z.array(a.z.string())}),b=(e,t)=>e.model.length-t.model.length||e.model.localeCompare(t.model),v=(e,t,i)=>({row:e,routeOrder:_[e.route],rankInProvider:i.slice(0,t).filter(t=>t.provider===e.provider).length});e.s(["O",0,o,"d",0,p,"Z",0,s,"L",0,l,"B",0,"playground?tab=system-one","F",0,function(e){let t=f(e),i=t.filter(([,e])=>c(e)),a=new Map([...new Set(i.map(([,e])=>e.litellm_provider))].map(e=>{let i=t.filter(([,t])=>t.litellm_provider===e);return[e,{decisionOnly:i.every(([,e])=>c(e))}]}));return{models:new Set(i.map(([e])=>e)),providers:a}},"W",0,(e,t)=>f(e).filter(([,e])=>c(e)).map(([e,i])=>({model:e,provider:i.litellm_provider,route:t?.has(i.litellm_provider)?"decisions":(i.supported_endpoints??["/v1/decisions"]).includes("/v1/decisions")?null===t?"decisions":"needs-upgrade":"self-hosted"})).toSorted(b).map(v).toSorted((e,t)=>e.routeOrder-t.routeOrder||e.rankInProvider-t.rankInProvider||e.row.provider.localeCompare(t.row.provider)).map(({row:e})=>e),"i",0,e=>m(e)?p:e??void 0,"q",0,e=>e.flatMap(e=>e===p?g:[e]),"m",0,c,"_",0,m,"r",0,(e,t,i)=>void 0!==t&&e.providers.get(t)?.decisionOnly===!0||i.some(t=>e.models.has(t)),"P",0,e=>{let t=h.safeParse(e);return t.success?new Set(t.data.decision_model_providers):null}])}]);
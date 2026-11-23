(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,605500,(e,t,i)=>{"use strict";e.i(247167),Object.defineProperty(i,"__esModule",{value:!0}),Object.defineProperty(i,"Image",{enumerable:!0,get:function(){return y}});let r=e.r(555682),a=e.r(190809),n=e.r(843476),l=a._(e.r(271645)),o=r._(e.r(174080)),s=r._(e.r(325633)),u=e.r(908927),d=e.r(65856),c=e.r(49381),p=r._(e.r(1948)),m=e.r(818581);function g(e,t,i,r,a,n,l){let o=e?.src;e&&e["data-loaded-src"]!==o&&(e["data-loaded-src"]=o,("decode"in e?e.decode():Promise.resolve()).catch(()=>{}).then(()=>{if(e.parentElement&&e.isConnected){if("empty"!==t&&a(!0),i?.current){let t=new Event("load");Object.defineProperty(t,"target",{writable:!1,value:e});let r=!1,a=!1;i.current({...t,nativeEvent:t,currentTarget:e,target:e,isDefaultPrevented:()=>r,isPropagationStopped:()=>a,persist:()=>{},preventDefault:()=>{r=!0,t.preventDefault()},stopPropagation:()=>{a=!0,t.stopPropagation()}})}r?.current&&r.current(e)}}))}function f(e){return l.use?{fetchPriority:e}:{fetchpriority:e}}"u"<typeof window&&(globalThis.__NEXT_IMAGE_IMPORTED=!0);let h="u"<typeof window?l.useEffect:l.useLayoutEffect,_=(0,l.forwardRef)(({src:e,srcSet:t,sizes:i,height:r,width:a,decoding:o,className:s,style:u,fetchPriority:d,placeholder:c,loading:p,unoptimized:_,fill:b,onLoadRef:y,onLoadingCompleteRef:x,setBlurComplete:v,setShowAltText:w,sizesInput:j,onLoad:$,onError:P,...k},S)=>{let C=(0,l.useRef)(!1),I=(0,l.useRef)(null);h(()=>{let{current:e}=C,{current:t}=I;e||null===t||(P&&(t.src=t.src),t.complete&&g(t,c,y,x,v,_,j),C.current=!0)},[e,c,y,x,P,_,j]);let M=(0,m.useMergedRef)(S,I);return(0,n.jsx)("img",{...k,...f(d),loading:p,width:a,height:r,decoding:o,"data-nimg":b?"fill":"1",className:s,style:u,sizes:i,srcSet:t,src:e,ref:M,onLoad:e=>{g(e.currentTarget,c,y,x,v,_,j)},onError:e=>{w(!0),"empty"!==c&&v(!0),P&&P(e)}})});function b({isAppRouter:e,imgAttributes:t}){let i={as:"image",imageSrcSet:t.srcSet,imageSizes:t.sizes,crossOrigin:t.crossOrigin,referrerPolicy:t.referrerPolicy,...f(t.fetchPriority)};return e&&o.default.preload?(o.default.preload(t.src,i),null):(0,n.jsx)(s.default,{children:(0,n.jsx)("link",{rel:"preload",href:t.srcSet?void 0:t.src,...i},"__nimg-"+t.src+t.srcSet+t.sizes)})}let y=(0,l.forwardRef)((e,t)=>{let i=(0,l.useContext)(d.RouterContext),r=(0,c.useImageConfig)(),{onLoad:a,onLoadingComplete:o}=e,s=(0,l.useRef)(a);(0,l.useEffect)(()=>{s.current=a},[a]);let m=(0,l.useRef)(o);(0,l.useEffect)(()=>{m.current=o},[o]);let[g,f]=(0,l.useState)(!1),[h,y]=(0,l.useState)(!1),{props:x,meta:v}=(0,u.getImgProps)(e,{defaultLoader:p.default,imgConf:r,blurComplete:g,showAltText:h});return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(_,{...x,unoptimized:v.unoptimized,placeholder:v.placeholder,fill:v.fill,onLoadRef:s,onLoadingCompleteRef:m,setBlurComplete:f,setShowAltText:y,sizesInput:e.sizes,ref:t}),v.preload?(0,n.jsx)(b,{isAppRouter:!i,imgAttributes:x}):null]})});("function"==typeof i.default||"object"==typeof i.default&&null!==i.default)&&void 0===i.default.__esModule&&(Object.defineProperty(i.default,"__esModule",{value:!0}),Object.assign(i.default,i),t.exports=i.default)},325164,e=>{"use strict";var t=e.i(605500);e.s(["default",()=>t.Image])},49381,(e,t,i)=>{"use strict";e.i(247167),Object.defineProperty(i,"__esModule",{value:!0}),Object.defineProperty(i,"useImageConfig",{enumerable:!0,get:function(){return o}});let r=e.r(271645),a=e.r(987690),n=e.r(918556),l={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[32,48,64,96,128,256,384],qualities:[75],path:"/_next/image/",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!0};function o(){let e=(0,r.useContext)(n.ImageConfigContext);return(0,a.prepareImageConfig)(l,e)}("function"==typeof i.default||"object"==typeof i.default&&null!==i.default)&&void 0===i.default.__esModule&&(Object.defineProperty(i.default,"__esModule",{value:!0}),Object.assign(i.default,i),t.exports=i.default)},670965,(e,t,i)=>{"use strict";function r(e,t){let i=e||75;return t?.qualities?.length?t.qualities.reduce((e,t)=>Math.abs(t-i)<Math.abs(e-i)?t:e,t.qualities[0]):i}Object.defineProperty(i,"__esModule",{value:!0}),Object.defineProperty(i,"findClosestQuality",{enumerable:!0,get:function(){return r}})},908927,(e,t,i)=>{"use strict";e.i(247167),Object.defineProperty(i,"__esModule",{value:!0}),Object.defineProperty(i,"getImgProps",{enumerable:!0,get:function(){return s}});let r=e.r(543369),a=e.r(488143),n=["-moz-initial","fill","none","scale-down",void 0];function l(e){return void 0!==e.default}function o(e){return void 0===e?e:"number"==typeof e?Number.isFinite(e)?e:0/0:"string"==typeof e&&/^[0-9]+$/.test(e)?parseInt(e,10):0/0}function s({src:e,sizes:t,unoptimized:i=!1,priority:u=!1,preload:d=!1,loading:c,className:p,quality:m,width:g,height:f,fill:h=!1,style:_,overrideSrc:b,onLoad:y,onLoadingComplete:x,placeholder:v="empty",blurDataURL:w,fetchPriority:j,decoding:$="async",layout:P,objectFit:k,objectPosition:S,lazyBoundary:C,lazyRoot:I,...M},O){var z;let N,A,{imgConf:R,showAltText:E,blurComplete:L,defaultLoader:H}=O;if(void 0===H)throw Error("images.loaderFile detected but the file is missing default export.\nRead more: https://nextjs.org/docs/messages/invalid-images-config");let U=M.loader||H;delete M.loader,delete M.srcSet;let T="__next_img_default"in U;if(T){if("custom"===R.loader)throw Error(`Image with src "${e}" is missing "loader" prop.
Read more: https://nextjs.org/docs/messages/next-image-missing-loader`)}else{let e=U;U=t=>{let{config:i,...r}=t;return e(r)}}if(P){"fill"===P&&(h=!0);let e={intrinsic:{maxWidth:"100%",height:"auto"},responsive:{width:"100%",height:"auto"}}[P];e&&(_={..._,...e});let i={responsive:"100vw",fill:"100vw"}[P];i&&!t&&(t=i)}let F="",D=o(g),q=o(f);if((z=e)&&"object"==typeof z&&(l(z)||void 0!==z.src)){let t=l(e)?e.default:e;if(!t.src)throw Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received ${JSON.stringify(t)}`);if(!t.height||!t.width)throw Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received ${JSON.stringify(t)}`);if(N=t.blurWidth,A=t.blurHeight,w=w||t.blurDataURL,F=t.src,!h)if(D||q){if(D&&!q){let e=D/t.width;q=Math.round(t.height*e)}else if(!D&&q){let e=q/t.height;D=Math.round(t.width*e)}}else D=t.width,q=t.height}let B=!u&&!d&&("lazy"===c||void 0===c);(!(e="string"==typeof e?e:F)||e.startsWith("data:")||e.startsWith("blob:"))&&(i=!0,B=!1),R.unoptimized&&(i=!0),T&&!R.dangerouslyAllowSVG&&e.split("?",1)[0].endsWith(".svg")&&(i=!0);let W=o(m),G=Object.assign(h?{position:"absolute",height:"100%",width:"100%",left:0,top:0,right:0,bottom:0,objectFit:k,objectPosition:S}:{},E?{}:{color:"transparent"},_),K=L||"empty"===v?null:"blur"===v?`url("data:image/svg+xml;charset=utf-8,${(0,a.getImageBlurSvg)({widthInt:D,heightInt:q,blurWidth:N,blurHeight:A,blurDataURL:w||"",objectFit:G.objectFit})}")`:`url("${v}")`,J=n.includes(G.objectFit)?"fill"===G.objectFit?"100% 100%":"cover":G.objectFit,Y=K?{backgroundSize:J,backgroundPosition:G.objectPosition||"50% 50%",backgroundRepeat:"no-repeat",backgroundImage:K}:{},V=function({config:e,src:t,unoptimized:i,width:a,quality:n,sizes:l,loader:o}){if(i){if(t.startsWith("/")&&!t.startsWith("//")){let e=(0,r.getDeploymentId)();if(t.includes("/_next/static/immutable")&&!(0,r.getAssetToken)())e=void 0;else if(e){let i=t.indexOf("?");if(-1!==i){let r=new URLSearchParams(t.slice(i+1));r.get("dpl")||(r.append("dpl",e),t=t.slice(0,i)+"?"+r.toString())}else t+=`?dpl=${e}`}}return{src:t,srcSet:void 0,sizes:void 0}}let{widths:s,kind:u}=function({deviceSizes:e,allSizes:t},i,r){if(r){let i=/(^|\s)(1?\d?\d)vw/g,a=[];for(let e;e=i.exec(r);)a.push(parseInt(e[2]));if(a.length){let i=.01*Math.min(...a);return{widths:t.filter(t=>t>=e[0]*i),kind:"w"}}return{widths:t,kind:"w"}}return"number"!=typeof i?{widths:e,kind:"w"}:{widths:[...new Set([i,2*i].map(e=>t.find(t=>t>=e)||t[t.length-1]))],kind:"x"}}(e,a,l),d=s.length-1;return{sizes:l||"w"!==u?l:"100vw",srcSet:s.map((i,r)=>`${o({config:e,src:t,quality:n,width:i})} ${"w"===u?i:r+1}${u}`).join(", "),src:o({config:e,src:t,quality:n,width:s[d]})}}({config:R,src:e,unoptimized:i,width:D,quality:W,sizes:t,loader:U}),Q=B?"lazy":c;return{props:{...M,loading:Q,fetchPriority:j,width:D,height:q,decoding:$,className:p,style:{...G,...Y},sizes:V.sizes,srcSet:V.srcSet,src:b||V.src},meta:{unoptimized:i,preload:d||u,placeholder:v,fill:h}}}},325633,(e,t,i)=>{"use strict";e.i(247167),Object.defineProperty(i,"__esModule",{value:!0});var r={default:function(){return f},defaultHead:function(){return c}};for(var a in r)Object.defineProperty(i,a,{enumerable:!0,get:r[a]});let n=e.r(555682),l=e.r(190809),o=e.r(843476),s=l._(e.r(271645)),u=n._(e.r(898879)),d=e.r(742732);function c(){return[(0,o.jsx)("meta",{charSet:"utf-8"},"charset"),(0,o.jsx)("meta",{name:"viewport",content:"width=device-width"},"viewport")]}function p(e,t){return"string"==typeof t||"number"==typeof t?e:t.type===s.default.Fragment?e.concat(s.default.Children.toArray(t.props.children).reduce((e,t)=>"string"==typeof t||"number"==typeof t?e:e.concat(t),[])):e.concat(t)}let m=["name","httpEquiv","charSet","itemProp"];function g(e){let t,i,r,a;return e.reduce(p,[]).reverse().concat(c().reverse()).filter((t=new Set,i=new Set,r=new Set,a={},e=>{let n=!0,l=!1;if(e.key&&"number"!=typeof e.key&&e.key.indexOf("$")>0){l=!0;let i=e.key.slice(e.key.indexOf("$")+1);t.has(i)?n=!1:t.add(i)}switch(e.type){case"title":case"base":i.has(e.type)?n=!1:i.add(e.type);break;case"meta":for(let t=0,i=m.length;t<i;t++){let i=m[t];if(e.props.hasOwnProperty(i))if("charSet"===i)r.has(i)?n=!1:r.add(i);else{let t=e.props[i],r=a[i]||new Set;("name"!==i||!l)&&r.has(t)?n=!1:(r.add(t),a[i]=r)}}}return n})).reverse().map((e,t)=>{let i=e.key||t;return s.default.cloneElement(e,{key:i})})}let f=function({children:e}){let t=(0,s.useContext)(d.HeadManagerContext);return(0,o.jsx)(u.default,{reduceComponentsToState:g,headManager:t,children:e})};("function"==typeof i.default||"object"==typeof i.default&&null!==i.default)&&void 0===i.default.__esModule&&(Object.defineProperty(i.default,"__esModule",{value:!0}),Object.assign(i.default,i),t.exports=i.default)},488143,(e,t,i)=>{"use strict";function r({widthInt:e,heightInt:t,blurWidth:i,blurHeight:a,blurDataURL:n,objectFit:l}){let o=i?40*i:e,s=a?40*a:t,u=o&&s?`viewBox='0 0 ${o} ${s}'`:"";return`%3Csvg xmlns='http://www.w3.org/2000/svg' ${u}%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3CfeColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/%3E%3CfeFlood x='0' y='0' width='100%25' height='100%25'/%3E%3CfeComposite operator='out' in='s'/%3E%3CfeComposite in2='SourceGraphic'/%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3C/filter%3E%3Cimage width='100%25' height='100%25' x='0' y='0' preserveAspectRatio='${u?"none":"contain"===l?"xMidYMid":"cover"===l?"xMidYMid slice":"none"}' style='filter: url(%23b);' href='${n}'/%3E%3C/svg%3E`}Object.defineProperty(i,"__esModule",{value:!0}),Object.defineProperty(i,"getImageBlurSvg",{enumerable:!0,get:function(){return r}})},918556,(e,t,i)=>{"use strict";e.i(247167),Object.defineProperty(i,"__esModule",{value:!0}),Object.defineProperty(i,"ImageConfigContext",{enumerable:!0,get:function(){return n}});let r=e.r(555682)._(e.r(271645)),a=e.r(987690),n=r.default.createContext(a.imageConfigDefault)},987690,(e,t,i)=>{"use strict";Object.defineProperty(i,"__esModule",{value:!0});var r={VALID_LOADERS:function(){return n},imageConfigDefault:function(){return u},prepareImageConfig:function(){return s}};for(var a in r)Object.defineProperty(i,a,{enumerable:!0,get:r[a]});let n=["default","imgix","cloudinary","akamai","custom"],l={},o=new WeakMap;function s(e,t){let i=e??l,r=t??l,a=o.get(i);if(a){let e=a.get(r);if(e)return e}let n=e||t||u,s=[...n.deviceSizes].sort((e,t)=>e-t),d=[...n.imageSizes],c={deviceSizes:s,imageSizes:d,allSizes:[...s,...d].sort((e,t)=>e-t),qualities:void 0===n.qualities?void 0:[...n.qualities].sort((e,t)=>e-t),path:n.path,loader:n.loader,dangerouslyAllowSVG:n.dangerouslyAllowSVG,unoptimized:n.unoptimized,domains:n.domains,remotePatterns:n.remotePatterns,localPatterns:"u"<typeof window&&void 0!==t?t.localPatterns:n.localPatterns,output:n.output};return a||(a=new WeakMap,o.set(i,a)),a.set(r,c),c}let u={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[32,48,64,96,128,256,384],path:"/_next/image",loader:"default",loaderFile:"",domains:[],disableStaticImages:!1,minimumCacheTTL:14400,formats:["image/webp"],maximumDiskCacheSize:void 0,maximumRedirects:3,maximumResponseBody:5e7,dangerouslyAllowLocalIP:!1,dangerouslyAllowSVG:!1,contentSecurityPolicy:"script-src 'none'; frame-src 'none'; sandbox;",contentDispositionType:"attachment",localPatterns:void 0,remotePatterns:[],qualities:[75],unoptimized:!1,customCacheHandler:!1}},1948,(e,t,i)=>{"use strict";e.i(247167),Object.defineProperty(i,"__esModule",{value:!0}),Object.defineProperty(i,"default",{enumerable:!0,get:function(){return l}});let r=e.r(670965),a=e.r(543369);function n({config:e,src:t,width:i,quality:l}){let o=(0,a.getDeploymentId)();if(t.startsWith("/")&&!t.startsWith("//"))if(t.includes("/_next/static/immutable")&&!(0,a.getAssetToken)())o=void 0;else{let e=t.indexOf("?");if(-1!==e){let i=new URLSearchParams(t.slice(e+1)),r=i.get("dpl");if(r){o=r,i.delete("dpl");let a=i.toString();t=t.slice(0,e)+(a?"?"+a:"")}}}if(t.startsWith("/")&&t.includes("?")&&e.localPatterns?.length===1&&"**"===e.localPatterns[0].pathname&&""===e.localPatterns[0].search)throw Error(`Image with src "${t}" is using a query string which is not configured in images.localPatterns.
Read more: https://nextjs.org/docs/messages/next-image-unconfigured-localpatterns`);let s=(0,r.findClosestQuality)(l,e);return`${e.path}?url=${encodeURIComponent(t)}&w=${i}&q=${s}${t.startsWith("/")&&o?`&dpl=${o}`:""}`}n.__next_img_default=!0;let l=n},65856,(e,t,i)=>{"use strict";e.i(247167),Object.defineProperty(i,"__esModule",{value:!0}),Object.defineProperty(i,"RouterContext",{enumerable:!0,get:function(){return r}});let r=(e.r(555682)._(e.r(271645))).default.createContext(null)},898879,(e,t,i)=>{"use strict";Object.defineProperty(i,"__esModule",{value:!0}),Object.defineProperty(i,"default",{enumerable:!0,get:function(){return o}});let r=e.r(271645),a="u"<typeof window,n=a?()=>{}:r.useLayoutEffect,l=a?()=>{}:r.useEffect;function o(e){let{headManager:t,reduceComponentsToState:i}=e;function o(){if(t&&t.mountedInstances){let e=r.Children.toArray(Array.from(t.mountedInstances).filter(Boolean));t.updateHead(i(e))}}return a&&(t?.mountedInstances?.add(e.children),o()),n(()=>(t?.mountedInstances?.add(e.children),()=>{t?.mountedInstances?.delete(e.children)})),n(()=>(t&&(t._pendingUpdate=o),()=>{t&&(t._pendingUpdate=o)})),l(()=>(t&&t._pendingUpdate&&(t._pendingUpdate(),t._pendingUpdate=null),()=>{t&&t._pendingUpdate&&(t._pendingUpdate(),t._pendingUpdate=null)})),null}},66330,e=>{"use strict";var t=e.i(735450);e.s(["f",0,(e,i,r,a)=>{if("extraction"===e)return`import requests

response = requests.post(
    ${JSON.stringify(`${i}/v1/extraction`)},  # Your LiteLLM Proxy URL
    headers={${JSON.stringify(a)}: "Bearer your_api_key"},
    json={
        "model": ${JSON.stringify(r)},
        "state": "Invoice #4471 from Acme Tools. Total $174.00, due in 30 days.",
        "fields": {
            "vendor": {"type": "text", "instructions": "Who sent the invoice?"},
            "total": {"type": "number", "unit": "USD"}
        }
    }
)

print(response.json()["answers"])`;return(0,t._)(e)?`import requests

response = requests.post(
    ${JSON.stringify(`${i}/v1/systemone`)},  # Your LiteLLM Proxy URL
    headers={${JSON.stringify(a)}: "Bearer your_api_key"},
    json={
        "model": ${JSON.stringify(r)},
        "state": "I was charged twice for my subscription this month.",
        "questions": {
            "wants_refund": {
                "type": "noul",
                "instructions": "Is the customer asking for money back?"
            }
        }
    }
)

print(response.json()["answers"])`:`import openai

client = openai.OpenAI(
    api_key="your_api_key",
    base_url=${JSON.stringify(i)}  # Your LiteLLM Proxy URL
)

response = client.chat.completions.create(
    model=${JSON.stringify(r)},
    messages=[
        {
            "role": "user",
            "content": "Hello, how are you?"
        }
    ]
)

print(response.choices[0].message.content)`}])},909947,e=>{"use strict";var t=e.i(865361);e.s(["f",0,e=>{let i,{apiKeySource:r,accessToken:a,apiKey:n,inputMessage:l,chatHistory:o,selectedTags:s,selectedVectorStores:u,selectedGuardrails:d,selectedPolicies:c,selectedVoice:p,endpointType:m,selectedModel:g,selectedSdk:f,proxySettings:h,customHeaders:_}=e,b="session"===r?a:n,y=window.location.origin,x=h?.LITELLM_UI_API_DOC_BASE_URL;x&&x.trim()?y=x:h?.PROXY_BASE_URL&&(y=h.PROXY_BASE_URL);let v=l||"Your prompt here",w=v.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\n"),j=o.filter(e=>!e.isImage).map(({role:e,content:t})=>({role:e,content:t})),$={};s.length>0&&($.tags=s),u.length>0&&($.vector_stores=u),d.length>0&&($.guardrails=d),c.length>0&&($.policies=c);let P=g||"your-model-name",k=_&&Object.keys(_).length>0?`,
	default_headers=${JSON.stringify(_,null,2).replace(/\n/g,"\n	")}`:"",S="azure"===f?`import openai

client = openai.AzureOpenAI(
	api_key="${b||"YOUR_LITELLM_API_KEY"}",
	azure_endpoint="${y}",
	api_version="2024-02-01"${k}
)`:`import openai

client = openai.OpenAI(
	api_key="${b||"YOUR_LITELLM_API_KEY"}",
	base_url="${y}"${k}
)`;switch(m){case t.Q.CHAT:{let e=Object.keys($).length>0,t="";if(e){let e=JSON.stringify({metadata:$},null,2).split("\n").map(e=>" ".repeat(4)+e).join("\n").trim();t=`,
    extra_body=${e}`}let r=j.length>0?j:[{role:"user",content:v}];i=`
import base64

# Helper function to encode images to base64
def encode_image(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')

# Example with text only
response = client.chat.completions.create(
    model="${P}",
    messages=${JSON.stringify(r,null,4)}${t}
)

print(response)

# Example with image or PDF (uncomment and provide file path to use)
# base64_file = encode_image("path/to/your/file.jpg")  # or .pdf
# response_with_file = client.chat.completions.create(
#     model="${P}",
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
`;break}case t.Q.RESPONSES:{let e=Object.keys($).length>0,t="";if(e){let e=JSON.stringify({metadata:$},null,2).split("\n").map(e=>" ".repeat(4)+e).join("\n").trim();t=`,
    extra_body=${e}`}let r=j.length>0?j:[{role:"user",content:v}];i=`
import base64

# Helper function to encode images to base64
def encode_image(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')

# Example with text only
response = client.responses.create(
    model="${P}",
    input=${JSON.stringify(r,null,4)}${t}
)

print(response.output_text)

# Example with image or PDF (uncomment and provide file path to use)
# base64_file = encode_image("path/to/your/file.jpg")  # or .pdf
# response_with_file = client.responses.create(
#     model="${P}",
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
	model="${P}",
	prompt="${l}",
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
	model="${P}",
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
	model="${P}",
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
	model="${P}",
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
	input="${l||"Your string here"}",
	model="${P}",
	encoding_format="base64" # or "float"
)

print(response.data[0].embedding)
`;break;case t.Q.TRANSCRIPTION:i=`
# Open the audio file
audio_file = open("path/to/your/audio/file.mp3", "rb")

# Make the transcription request
response = client.audio.transcriptions.create(
	model="${P}",
	file=audio_file${l?`,
	prompt="${l.replace(/\\/g,"\\\\").replace(/"/g,'\\"')}"`:""}
)

print(response.text)
`;break;case t.Q.SPEECH:i=`
# Make the text-to-speech request
response = client.audio.speech.create(
	model="${P}",
	input="${l||"Your text to convert to speech here"}",
	voice="${p}"  # Options: alloy, ash, ballad, coral, echo, fable, nova, onyx, sage, shimmer
)

# Save the audio to a file
output_filename = "output_speech.mp3"
response.stream_to_file(output_filename)
print(f"Audio saved to {output_filename}")

# Optional: Customize response format and speed
# response = client.audio.speech.create(
#     model="${P}",
#     input="${l||"Your text to convert to speech here"}",
#     voice="alloy",
#     response_format="mp3",  # Options: mp3, opus, aac, flac, wav, pcm
#     speed=1.0  # Range: 0.25 to 4.0
# )
# response.stream_to_file("output_speech.mp3")
`;break;default:i="\n# Code generation for this endpoint is not implemented yet."}return`${S}
${i}`}])},583408,e=>{"use strict";var t=e.i(843476),i=e.i(555436),r=e.i(322831),a=e.i(519455),n=e.i(950594),l=e.i(967489);e.s(["f",0,function({search:e,tag:o,scan:s,tags:u,active:d,setSearch:c,setTag:p,setScan:m,clear:g}){let{t:f}=(0,r.f)(),h=[{value:"",label:f("skills.filters.allTags")},...[...new Set([...u,...o?[o]:[]])].map(e=>({value:e,label:e}))],_=[{value:"all",label:f("skills.filters.allScans")},{value:"yes",label:f("skills.filters.scanned")},{value:"no",label:f("skills.filters.notScanned")}];return(0,t.jsxs)("div",{className:"flex flex-wrap items-center gap-2",children:[(0,t.jsxs)(n.H,{className:"w-full sm:w-80",children:[(0,t.jsx)(n.B,{children:(0,t.jsx)(i.f,{className:"size-4"})}),(0,t.jsx)(n.M,{"aria-label":f("skills.filters.search"),placeholder:f("skills.filters.search"),value:e,onChange:e=>c(e.target.value)})]}),(0,t.jsxs)(l.d,{items:h,value:o,onValueChange:e=>p(e??""),children:[(0,t.jsx)(l.P,{className:"w-44","aria-label":f("skills.filters.tag"),children:(0,t.jsx)(l.U,{})}),(0,t.jsx)(l.r,{children:h.map(e=>(0,t.jsx)(l.T,{value:e.value,children:e.label},e.value))})]}),(0,t.jsxs)(l.d,{items:_,value:s,onValueChange:e=>m("yes"===e||"no"===e?e:"all"),children:[(0,t.jsx)(l.P,{className:"w-48","aria-label":f("skills.table.columns.securityScan"),children:(0,t.jsx)(l.U,{})}),(0,t.jsx)(l.r,{children:_.map(e=>(0,t.jsx)(l.T,{value:e.value,children:e.label},e.value))})]}),d&&(0,t.jsx)(a.K,{variant:"ghost",size:"sm",onClick:g,children:f("skills.filters.clear")})]})}])},594107,e=>{"use strict";var t=e.i(843476),i=e.i(494862);e.i(622826);var r=e.i(200208),a=e.i(112179),n=e.i(487486),l=e.i(201787),o=e.i(617885);let s={created_by:"skills.table.columns.createdBy",approved_by:"skills.table.columns.approvedBy"};e.s(["f",0,function(e={}){return[{id:"download_count",accessorKey:"download_count",header:({column:e})=>(0,t.jsx)(i.v,{column:e,title:l.f.t("skills.table.columns.downloads")}),size:120,sortUndefined:"last",accessorFn:e=>e.download_count??void 0,cell:({row:e})=>(0,t.jsx)("span",{className:"tabular-nums",children:e.original.download_count?.toLocaleString(l.f.language)??"—"})},{id:"keywords",header:l.f.t("skills.table.columns.tags"),size:180,enableSorting:!1,cell:({row:e})=>(0,t.jsx)("div",{className:"flex max-w-52 flex-wrap gap-1",children:e.original.keywords?.length?e.original.keywords.map(e=>(0,t.jsx)(n.f,{variant:"secondary",children:e},e)):"—"})},...["created_by","approved_by"].map(r=>({id:r,accessorKey:r,size:190,enableSorting:!0,header:({column:e})=>(0,t.jsx)(i.v,{column:e,title:(0,t.jsx)("span",{title:l.f.t("skills.table.identitySortHelp"),children:l.f.t(s[r])})}),cell:({row:i})=>(0,t.jsx)("span",{className:"block max-w-48 truncate text-xs",title:i.original[r]??void 0,children:(0,o.b)(i.original[r],e)||l.f.t("skills.table.notRecorded")})})),...["created_at","updated_at"].map(e=>({id:e,accessorKey:e,size:140,enableSorting:!0,accessorFn:t=>t[e]?new Date(t[e]).getTime():void 0,sortUndefined:"last",header:({column:r})=>(0,t.jsx)(i.v,{column:r,title:l.f.t("created_at"===e?"skills.table.columns.createdAt":"skills.table.columns.updatedAt")}),cell:({row:i})=>(0,t.jsx)(r.S,{value:i.original[e],precision:"date"})})),{id:"security_scan_passed",accessorKey:"security_scan_passed",size:130,enableSorting:!0,header:({column:e})=>(0,t.jsx)(i.v,{column:e,title:(0,t.jsx)("span",{title:l.f.t("skills.table.scanHelp"),children:l.f.t("skills.table.columns.securityScan")})}),cell:({row:e})=>(0,t.jsx)("span",{title:l.f.t("skills.table.scanHelp"),children:(0,t.jsx)(a.f,{tone:"neutral",label:l.f.t(e.original.security_scan_passed?"skills.table.publicYes":"skills.table.publicNo")})})}]}])},209261,e=>{"use strict";var t=e.i(201787);let i=/^[a-zA-Z0-9][a-zA-Z0-9._-]*(\/[a-zA-Z0-9][a-zA-Z0-9._-]*)*$/,r=e=>e.trim().replace(/\/+$/,""),a="github.com",n=/\.zip$/i,l=/^[0-9a-fA-F]{64}$/,o=/^\d{1,3}(\.\d{1,3}){3}$/,s=/^[A-Za-z0-9-]+$/,u=/^[A-Za-z0-9._-]+$/,d=/^https?:\/\//i,c="ssh://",p=/^([a-z0-9._-]+)@([^:/@]+):(?!\/)(.+)$/i,m=e=>`${e.protocol}//${e.host}${e.pathname.replace(/\/+$/,"")}`,g=e=>e.pathname.split("/").filter(e=>""!==e),f=e=>{try{return new URL(e)}catch{return null}},h=e=>e.hostname.includes(".")&&!e.hostname.startsWith("[")&&!o.test(e.hostname),_=e=>{let t=e.trim();if(""===t||t.startsWith("//"))return null;let i=f(/^[a-z][a-z0-9+.-]*:\/\//i.test(t)?t:`https://${t}`);return i&&"https:"===i.protocol&&""===i.username&&""===i.password&&h(i)?i:null},b=e=>{let t=e.split("/").filter(e=>""!==e);return t[t.length-1]??""},y=e=>e.toLowerCase().replace(/[^a-z0-9-]+/g,"-").replace(/-+/g,"-").replace(/^-+|-+$/g,""),x=(e,t)=>{let i=t?.trim();return e&&i?{...e,parsed:{...e.parsed,.../^[a-fA-F0-9]{40}$/.test(i)?{sha:i.toLowerCase()}:{ref:i}},label:`${e.label} (${i})`}:e},v=(e,t,i,a)=>{if(!e.length)return null;try{let n=i?.trim()||decodeURIComponent(e[0]),l=i?.trim()?e.findIndex((t,i)=>decodeURIComponent(e.slice(0,i+1).join("/"))===n)+1:1;if(!l||"blob"===t&&e.length===l)return null;let o=e.slice(l,"blob"===t?-1:void 0).map(decodeURIComponent).join("/"),s="blob"===t?decodeURIComponent(e[e.length-1]):void 0,u=!!(o||s);return{ref:n,path:u?o:r(a??""),pathFromUrl:u,fileFromUrl:s}}catch{return null}},w=(e,a,n,l="reference")=>{let o=g(e);if(o.length<2)return null;let d=o[0],c=o[1].replace(/\.git$/,"");if(!s.test(d)||!u.test(c))return null;let p=`${d}/${c}`,m=`https://github.com/${p}`,f={parsed:{source:"github",repo:p},label:t.f.t("claudeCodePlugins.sources.githubRepo",{repo:p}),suggestedName:y(c)},h=o[2],_="tree"===h||"blob"===h?v(o.slice(3),h,n,a):void 0;if(null===_||void 0===_&&2!==o.length)return null;let w=_?.path??r(a??"");return"reference"===l&&w&&!i.test(w)?null:x({...w?{parsed:{source:"git-subdir",url:m,path:w},label:t.f.t("claudeCodePlugins.sources.githubSubdir",{repo:p,path:w}),suggestedName:y(b(w))}:f,..._?{pathFromUrl:_.pathFromUrl,fileFromUrl:_.fileFromUrl}:{}},_?.ref??n)},j=(e,a,n,l)=>{let o=r(l??"");return""!==o?i.test(o)?{parsed:{source:"git-subdir",url:a,path:o},label:t.f.t("claudeCodePlugins.sources.gitSubdir",{kind:e,url:a,path:o}),suggestedName:y(b(o))}:null:{parsed:{source:"url",url:a},label:t.f.t("claudeCodePlugins.sources.gitRepo",{kind:e,url:a}),suggestedName:y(n)}},$=e=>{let t=_(e);if(!t)return null;let i=t.host.replace(/^www\./,"");return[a,"skills.sh"].includes(i)?f(`${t.protocol}//${i}${t.pathname}${t.search}${t.hash}`):null},P="<your-litellm-key>",k=e=>!!e&&""!==e.trim()&&/^[a-z0-9-]+$/.test(e);e.s(["i",0,P,"x",0,e=>{let t=$(e);return t?.host==="skills.sh"?["import"]:t?["register","import"]:["register"]},"U",0,(e,t)=>JSON.stringify({extraKnownMarketplaces:{litellm:{source:{source:"url",url:`${e}/claude-code/marketplace.json`,...t?{headers:{Authorization:`Bearer ${P}`}}:{}}}}},null,2),"a",0,e=>`/plugin install ${e.name}@litellm`,"v",0,(e,t,i,r)=>{if("archive"!==t.source||!k(e)||t.sha256&&!l.test(t.sha256))return null;let a=t.sha256?`/claude-code/plugins/${e}/archive/${t.sha256}.zip`:`/skill-hub/skills/${e}/archive`;try{let e=new URL(`${i.replace(/\/+$/,"")}${a}`,r);return/^https?:$/.test(e.protocol)&&t.url===e.href?a:null}catch{return null}},"_",0,e=>"github"===e.source&&e.repo?t.f.t("claudeCodePlugins.sources.githubDisplay",{repo:e.repo}):"git-subdir"===e.source&&e.url&&e.path?`${e.url} @ ${e.path}`:("url"===e.source||"archive"===e.source)&&e.url?e.url:t.f.t("claudeCodePlugins.sources.unknown"),"E",0,e=>{if(!["github","url","git-subdir","archive"].includes(e.source))return null;let t="github"===e.source?e.repo&&`https://github.com/${e.repo}`:e.url;if(!t||!d.test(t))return null;if("archive"===e.source)return t;let i=f(t),r=i&&i.hostname.replace(/^www\./,"");if(!i||r!==a&&"gitlab.com"!==r)return t;let n=g(i);if(!(r===a?2===n.length:n.length>=2&&!n.includes("-")))return t;let l=m(i).replace(/\.git$/,""),o=e.sha||e.ref;if(!o)return l;let s="git-subdir"===e.source&&e.path?`/${e.path.split("/").map(encodeURIComponent).join("/")}`:"";return`${l}/${r===a?"tree":"-/tree"}/${encodeURIComponent(o)}${s}`},"r",0,e=>!e||/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e),"R",0,e=>!e||/^\d+\.\d+\.\d+(-[a-zA-Z0-9.-]+)?(\+[a-zA-Z0-9.-]+)?$/.test(e),"b",0,e=>""===e.trim()||l.test(e.trim()),"D",0,e=>e&&""!==e.trim()?e.split(",").map(e=>e.trim()).filter(e=>""!==e):[],"C",0,(e,t,i,r)=>{let a=$(e);if(!a||a.search||a.hash)return null;if("skills.sh"===a.host)try{let e=a.pathname.replace(/^\/+|\/+$/g,"").split("/").map(decodeURIComponent);if(3!==e.length||e.slice(0,2).some(e=>!u.test(e)))return null;let r=e[2];if(!r)return null;return{selection:{url:a.href,...i?.trim()?{ref:i.trim()}:{},...t?.trim()?{path:t.trim()}:{}},preview:null,skillFromUrl:r}}catch{return null}let n=w(a,t,i,"portable");if(!n||n.fileFromUrl&&"SKILL.md"!==n.fileFromUrl)return null;let l=n.parsed,o=l.sha??l.ref;return{selection:{url:"github"===l.source?`https://github.com/${l.repo}`:l.url??a.href,...r?.trim()?{skill:r.trim()}:{},...o?{ref:o}:{},...l.path||n.fileFromUrl?{path:l.path??""}:{}},preview:n}},"Z",0,(e,i,r)=>{let l=((e,t)=>{let i=e.trim(),r=p.exec(i),a=r?`${c}${r[1]}@${r[2]}/${r[3]}`:i;if(!a.toLowerCase().startsWith(c))return null;let n=f(a);if(!n||""===n.username||""!==n.password||!h(n))return null;let l=a.indexOf("/",c.length);return -1===l||n.pathname!==a.slice(l)||g(n).length<2?null:j("SSH",i,b(n.pathname).replace(/\.git$/i,""),t)})(e,i);if(l)return x(l,r);let o=_(e);if(!o)return null;let s=o.hostname.replace(/^www\./,"");if(s===a&&["tree","blob"].includes(g(o)[2]))return w(o,i,r);if("gitlab.com"===s&&/\/-\/(?:tree|blob)(?:\/|$)/.test(o.pathname))return((e,t,i)=>{let r=g(e),a=r.findIndex((e,t)=>"-"===e&&["tree","blob"].includes(r[t+1])),n=r[a+1];if(a<2||"tree"!==n&&"blob"!==n)return null;let l=v(r.slice(a+2),n,i,t);if(!l)return null;let o=j("Git",`${e.protocol}//${e.host.replace(/^www\./,"")}/${r.slice(0,a).join("/")}`,r[a-1].replace(/\.git$/,""),l.path);return x(o?{...o,pathFromUrl:l.pathFromUrl,fileFromUrl:l.fileFromUrl}:null,l.ref)})(o,i,r);if(n.test(o.pathname))return{parsed:{source:"archive",url:o.href},label:t.f.t("claudeCodePlugins.sources.zipArchive",{location:`${o.host}${o.pathname}`}),suggestedName:y(b(o.pathname).replace(n,""))};return s===a?w(o,i,r):x(((e,t)=>{if(g(e).length<2)return null;let i=b(e.pathname).replace(/\.git$/,"");return j("Git",m(e),i,t)})(o,i),r)},"c",0,(e,t)=>!!(e?.pathFromUrl&&e.parsed.path&&!(t.trim()||e.parsed.sha||e.parsed.ref?.includes("/"))),"e",0,k])},962600,e=>{"use strict";var t=e.i(438847),i=e.i(45570),r=e.i(899426);let a=["name","download_count","created_at","updated_at","created_by","approved_by","security_scan_passed"],n={keyPrefix:"skills_",defaultPageSize:50,maxPageSize:100,sortFields:a,defaultSort:{id:"name",desc:!1},filterColumns:[]},l={tag:t.d.withDefault(""),scan:(0,t.b)(["all","yes","no"]).withDefault("all")},o={urlKeys:{tag:"skills_filter_tag",scan:"skills_filter_scan"}};e.s(["O",0,a,"W",0,function(e,t){let i=(0,r.h)(t.search,[e.name,e.description,e.domain,e.namespace,e.created_by,e.approved_by,e.published_by,...e.keywords??[]]),a=!t.tag||(e.keywords??[]).some(e=>e.toLowerCase()===t.tag.toLowerCase()),n="all"===t.scan||!!e.security_scan_passed==("yes"===t.scan);return i&&a&&n},"n",0,function(e){return{sort_by:a.find(t=>t===e[0]?.id)??"name",sort_order:e[0]?.desc?"desc":"asc"}},"f",0,function(e){return[...new Set(e.flatMap(e=>e.keywords??[]))].sort((e,t)=>e.localeCompare(t))},"a",0,function(e=a){let r=(0,i.f)({...n,sortFields:e}),[s,u]=(0,t.i)(l,o),d=e=>{u(e),r.onPaginationChange({...r.pagination,pageIndex:0})};return{...r,...s,setTag:e=>d({tag:e}),setScan:e=>d({scan:e}),clear:()=>{d(null),r.setSearch("")},active:!!(r.search.trim()||s.tag||"all"!==s.scan)}}])},33355,e=>{"use strict";var t=e.i(843476),i=e.i(322831),r=e.i(418371),a=e.i(916925),n=e.i(196631),l=e.i(784774),o=e.i(201787);let s=["standard","flex","balanced","priority","ultrafast","batches"],u={standard:"deploymentPricing.tiers.standard",flex:"deploymentPricing.tiers.flex",balanced:"deploymentPricing.tiers.balanced",priority:"deploymentPricing.tiers.priority",ultrafast:"deploymentPricing.tiers.ultrafast",batches:"deploymentPricing.tiers.batches"},d=["token","second","image","pixel","character","query","request"],c=["input","cache_read","explicit_cache_read","cache_write","output"],p=["","text","image","audio","video","reasoning"],m=/^(.+)_(flex|balanced|priority|ultrafast|batches)$/,g=/^(.+)_above_(\d+)k_tokens$/,f=/^(.+)_above_(\d+hr)$/,h=/^(input|output)_cost_per_(?:(text|image|audio|video|reasoning)_(?:per_)?)?([a-z]+)$/,_=/^(explicit_)?cache_(read|creation)_input_(?:(image|audio)_)?token_cost$/,b=(e,t)=>{let i=t.exec(e);return i?[i[1],i[2]]:[e,null]},y={start:{input:"deploymentPricing.charges.input",cache_read:"deploymentPricing.charges.cacheRead",explicit_cache_read:"deploymentPricing.charges.explicitCacheRead",cache_write:"deploymentPricing.charges.cacheWrite",output:"deploymentPricing.charges.output"},inline:{input:"deploymentPricing.chargesInline.input",cache_read:"deploymentPricing.chargesInline.cacheRead",explicit_cache_read:"deploymentPricing.chargesInline.explicitCacheRead",cache_write:"deploymentPricing.chargesInline.cacheWrite",output:"deploymentPricing.chargesInline.output"}},x={start:{text:"deploymentPricing.modalities.text",image:"deploymentPricing.modalities.image",audio:"deploymentPricing.modalities.audio",video:"deploymentPricing.modalities.video",reasoning:"deploymentPricing.modalities.reasoning"},inline:{text:"deploymentPricing.modalitiesInline.text",image:"deploymentPricing.modalitiesInline.image",audio:"deploymentPricing.modalitiesInline.audio",video:"deploymentPricing.modalitiesInline.video",reasoning:"deploymentPricing.modalitiesInline.reasoning"}},v={token:"deploymentPricing.units.token",second:"deploymentPricing.units.second",image:"deploymentPricing.units.image",pixel:"deploymentPricing.units.pixel",character:"deploymentPricing.units.character",query:"deploymentPricing.units.query",request:"deploymentPricing.units.request"},w=({charge:e,modality:t},i)=>t?o.f.t("deploymentPricing.withModality",{modality:o.f.t(x[i][t]),charge:o.f.t(y.inline[e])}):o.f.t(y[i][e]),j=(e,t)=>e.cacheDuration?o.f.t("deploymentPricing.withCacheDuration",{charge:w(e,t),duration:e.cacheDuration}):w(e,t),$=e=>o.f.t(v[e]),P=e=>o.f.t("deploymentPricing.rowLabel",{charge:j(e,"start"),unit:$(e.unit)}),k=e=>[c.indexOf(e.charge),d.indexOf(e.unit),p.indexOf(e.modality),parseInt(e.cacheDuration||"0",10)],S=new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2,maximumFractionDigits:10,useGrouping:!1}),C=e=>0===e?o.f.t("deploymentPricing.free"):S.format(e),I=(e,t)=>C("token"===t?1e6*e:e),M=/^(.*?)_?cost_per_(.+)$/,O=/^(.+?)_cost(?:_(.+))?$/,z=e=>{let t=e.replaceAll("_"," ").trim();return t.charAt(0).toUpperCase()+t.slice(1)},N=e=>{let t=M.exec(e);if(t)return o.f.t("deploymentPricing.rowLabel",{charge:t[1]?z(t[1]):o.f.t("deploymentPricing.fallbackCost"),unit:t[2].replaceAll("_"," ")});let i=O.exec(e);return i?z([i[1],i[2]].filter(Boolean).join(" ")):z(e)},A=e=>"price"===e.cost.kind,R=e=>Object.entries(e).map(([e,t])=>({key:e,value:t,cost:(e=>{let[t,i]=b(e,m),[r,a]=b(t,g),[n,l]=b(r,f),o=(e=>{let t=h.exec(e);if(t){let[,e,i="",r]=t;return d.includes(r)?{charge:e,modality:i,unit:r}:null}let i=_.exec(e);if(i){let[,e,t,r=""]=i;return"creation"===t?e?null:{charge:"cache_write",modality:r,unit:"token"}:{charge:e?"explicit_cache_read":"cache_read",modality:r,unit:"token"}}return null})(n);return o?{kind:"price",...o,cacheDuration:l??"",threshold:null===a?null:1e3*Number(a),tier:i??"standard"}:{kind:"unknown",key:e}})(e)})),E=(e,t)=>e.filter((i,r)=>e.findIndex(e=>t(e)===t(i))===r),L=(e,t)=>{let i,r;return i=k(e.cost),r=k(t.cost),i.reduce((e,t,i)=>e||t-r[i],0)},H=e=>e>=1e6?`${+(e/1e6).toFixed(1)}M`:e>=1e3?`${+(e/1e3).toFixed(1)}K`:String(e),U=({cost:e,value:t})=>{let i=j(e,"inline"),r=I(t,e.unit);return"token"===e.unit?o.f.t("deploymentPricing.tierPrice",{price:r,charge:i}):o.f.t("deploymentPricing.tierPricePerUnit",{price:r,charge:i,unit:$(e.unit)})};function T({group:e,tiers:r}){let{t:a}=(0,i.f)(),n=null===e.threshold?a("deploymentPricing.basePrices"):a("deploymentPricing.aboveThreshold",{threshold:H(e.threshold)});return(0,t.jsxs)(l.z,{"aria-label":n,children:[null!==e.threshold&&(0,t.jsx)(l.N,{className:"hover:bg-transparent",children:(0,t.jsx)(l.V,{colSpan:r.length+1,scope:"colgroup",className:"h-8 text-xs text-muted-foreground",children:n})}),e.rows.map(e=>(0,t.jsxs)(l.N,{children:[(0,t.jsx)(l.V,{scope:"row",className:"font-normal",children:e.label}),r.map(i=>(0,t.jsx)(l.d,{className:l.J,children:e.prices[i]},i))]},e.label))]})}function F({deployment:e}){let n,d,c,p,m,{t:g}=(0,i.f)(),f=(c=[...E(d=(n=R(e.costs)).filter(A),({cost:e})=>e.threshold)].map(({cost:e})=>e.threshold).sort((e,t)=>(e??0)-(t??0)),p=s.filter(e=>d.some(({cost:t})=>t.tier===e)),{tiers:p,groups:m=c.map(e=>{let t;return{threshold:e,rows:[...E(t=d.filter(({cost:t})=>t.threshold===e),({cost:e})=>P(e))].sort(L).map(({cost:e})=>({label:P(e),prices:Object.fromEntries(t.filter(t=>P(t.cost)===P(e)).map(e=>[e.cost.tier,I(e.value,e.cost.unit)]))}))}}),hasBlankCells:m.some(({rows:e})=>e.some(({prices:e})=>p.some(t=>!(t in e)))),unknown:n.filter(e=>!A(e)).map(({key:e,value:t})=>({key:e,label:N(e),price:C(t)}))}),h=e.tiered_pricing,_=(0,a.h)(e.provider).displayName;return(0,t.jsxs)("section",{"aria-label":g("deploymentPricing.providerPricing",{provider:_}),className:"flex flex-col gap-2 rounded-lg border border-border p-3",children:[(0,t.jsxs)("h4",{className:"flex items-center gap-2 text-sm font-medium",children:[(0,t.jsx)(r.f,{provider:e.provider}),_]}),f.groups.length>0&&(0,t.jsxs)(l.s,{children:[(0,t.jsx)(l.E,{children:(0,t.jsxs)(l.N,{className:"hover:bg-transparent",children:[(0,t.jsx)(l.V,{children:g("deploymentPricing.chargeColumn")}),f.tiers.map(e=>(0,t.jsx)(l.V,{className:l.J,children:g(u[e])},e))]})}),f.groups.map(e=>(0,t.jsx)(T,{group:e,tiers:f.tiers},e.threshold??"base"))]}),f.hasBlankCells&&(0,t.jsx)("p",{className:"text-xs text-muted-foreground",children:g("deploymentPricing.blankCells")}),h.length>0&&(0,t.jsxs)("div",{className:"flex flex-col gap-1 text-sm",children:[(0,t.jsx)("p",{className:"text-xs font-medium text-muted-foreground",children:g("deploymentPricing.tieredPricing")}),(0,t.jsx)("ul",{className:"flex flex-col gap-0.5 tabular-nums",children:h.map(e=>(0,t.jsx)("li",{children:(({range:[e,t],costs:i})=>{let r=R(i),a=[...[...r.filter(A)].sort(L).map(U),...r.filter(e=>!A(e)).map(({key:e,value:t})=>o.f.t("deploymentPricing.tierPrice",{price:C(t),charge:N(e).toLowerCase()}))];return o.f.t("deploymentPricing.tierRange",{low:H(e),high:H(t),prices:a.join(" / ")})})(e)},e.range.join("-")))})]}),f.unknown.length>0&&(0,t.jsx)("dl",{className:"grid grid-cols-[minmax(0,1fr)_auto] gap-x-4 gap-y-1 text-sm",children:f.unknown.map(({key:e,label:i,price:r})=>(0,t.jsxs)("div",{className:"contents",children:[(0,t.jsx)("dt",{className:"truncate",children:i}),(0,t.jsx)("dd",{className:"text-right tabular-nums",children:r})]},e))})]})}e.s(["f",0,function({deployments:e,heading:r,className:a}){let{t:l}=(0,i.f)();return e&&0!==e.length?(0,t.jsxs)("div",{className:(0,n.c)("flex flex-col gap-3",a),children:[r,e.length>1&&(0,t.jsx)("p",{className:"text-xs text-muted-foreground",children:l("deploymentPricing.deploymentCount",{count:e.length})}),e.map((e,i)=>(0,t.jsx)(F,{deployment:e},`${e.provider}-${i}`)),(0,t.jsx)("p",{className:"text-xs text-muted-foreground",children:l("deploymentPricing.requestAdjustments")})]}):null}],33355)},913761,e=>{"use strict";var t=e.i(602869),i=e.i(916925),r=e.i(735450),a=e.i(201787);let n={chat:"publicModelHub.format.modes.chat",completion:"publicModelHub.format.modes.completion",embedding:"publicModelHub.format.modes.embedding",rerank:"publicModelHub.format.modes.rerank",image_generation:"publicModelHub.format.modes.imageGeneration",image_edit:"publicModelHub.format.modes.imageEdit",audio_speech:"publicModelHub.format.modes.audioSpeech",audio_transcription:"publicModelHub.format.modes.audioTranscription",video_generation:"publicModelHub.format.modes.videoGeneration",realtime:"publicModelHub.format.modes.realtime",responses:"publicModelHub.format.modes.responses",batch:"publicModelHub.format.modes.batch",ocr:"publicModelHub.format.modes.ocr",decisions:"publicModelHub.format.modes.decisions"},l=e=>e.replaceAll("_"," ").replace(/^./,e=>e.toUpperCase()),o=new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2,maximumFractionDigits:4,useGrouping:!1}),s={supports_vision:"publicModelHub.format.capabilities.vision",supports_function_calling:"publicModelHub.format.capabilities.functionCalling",supports_reasoning:"publicModelHub.format.capabilities.reasoning",supports_web_search:"publicModelHub.format.capabilities.webSearch",supports_parallel_function_calling:"publicModelHub.format.capabilities.parallelFunctionCalling",supports_url_context:"publicModelHub.format.capabilities.urlContext",supports_fast_mode:"publicModelHub.format.capabilities.fastMode"},u=Object.keys(s),d=e=>{let t=u.indexOf(e);return -1===t?u.length:t},c=e=>Object.hasOwn(s,e)?a.f.t(s[e]):l(e.replace(/^supports_/,"")),p={healthy:{tone:"success",label:"publicModelHub.format.health.healthy"},unhealthy:{tone:"error",label:"publicModelHub.format.health.unhealthy"}};e.s(["m",0,"text-[15px] leading-[22px] font-semibold","G",0,e=>c(`supports_${e}`),"a",0,e=>0===e?a.f.t("publicModelHub.format.free"):e?o.format(1e6*e):"-","k",0,e=>e?e>=1e6?`${+(e/1e6).toFixed(1)}M`:e>=1e3?`${Math.round(e/1e3)}K`:String(e):"-","M",0,()=>(0,t._h)(),"H",0,e=>{let t=e.health_status??"";return Object.hasOwn(p,t)?{tone:p[t].tone,label:a.f.t(p[t].label)}:{tone:"neutral",label:a.f.t("publicModelHub.format.notChecked")}},"S",0,e=>{let t=(0,r.i)(e);return t?Object.hasOwn(n,t)&&a.f.t(n[t])||l(t):"-"},"E",0,e=>Object.entries(e).filter(([e,t])=>e.startsWith("supports_")&&!0===t).map(([e])=>e).sort((e,t)=>d(e)-d(t)).map(c),"q",0,e=>(0,i.h)(e).logo,"P",0,e=>(0,i.h)(e).displayName.replace(/\s*\(.*\)$/,""),"W",0,(e,t=Date.now())=>{let i=e?new Date(e).getTime():0/0;if(Number.isNaN(i))return"-";let r=Math.max(0,Math.round((t-i)/6e4));if(r<1)return a.f.t("publicModelHub.format.relativeTime.justNow");if(r<60)return a.f.t("publicModelHub.format.relativeTime.minutes",{minutes:r});let n=Math.round(r/60);if(n<24)return a.f.t("publicModelHub.format.relativeTime.hours",{hours:n});let l=Math.round(n/24);return a.f.t("publicModelHub.format.relativeTime.days",{count:l})},"Q",0,e=>Object.entries(e??{}).map(([e,t])=>({title:e,url:"string"==typeof t?t:t.url,index:"string"==typeof t?0:t.index??0})).sort((e,t)=>e.index-t.index).map(({title:e,url:t})=>({title:e,url:t})),"X",0,e=>e.replaceAll("*","<model-name>")])},489432,e=>{"use strict";var t=e.i(66330),i=e.i(209261),r=e.i(909947),a=e.i(865361),n=e.i(602869),l=e.i(735450),o=e.i(913761);let s="Hello, how are you?",u=e=>{let t;if(!e.pass_through_path)return null;let i=(t=e.pass_through_methods,!t?.length||t.includes("POST")?"POST":t[0]),r=i.replace(/[\\"$`]/g,"\\$&"),a=`${(0,o.M)()}${e.pass_through_path}`.replace(/[\\"$`]/g,"\\$&");return"POST"===i?`curl -X "${r}" "${a}" \\
  -H "Authorization: Bearer your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{"input": "Hello, how are you?"}'`:`curl -X "${r}" "${a}" \\
  -H "Authorization: Bearer your_api_key"`};e.s(["c",0,e=>e.pass_through_path?u(e):e.mode&&"chat"!==e.mode?null:`curl ${(0,o.M)()}/v1/chat/completions \\
  -H "Authorization: Bearer $LITELLM_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "${(0,o.X)(e.model_group)}",
    "messages": [{"role": "user", "content": "Hello"}]
  }'`,"j",0,()=>`/plugin marketplace add ${(0,o.M)()}/claude-code/marketplace.json`,"W",0,e=>{if("passthrough"===e.mode||e.pass_through_path)return u(e)??"";let i=(0,o.X)(e.model_group);if((0,l._)(e.mode))return(0,t.f)(e.mode,(0,o.M)(),i,(0,n.kR)());let d={apiKeySource:"custom",accessToken:null,apiKey:"your_api_key",inputMessage:s,chatHistory:[{role:"user",content:s,isImage:!1}],selectedTags:[],selectedVectorStores:[],selectedGuardrails:[],selectedPolicies:[],selectedMCPServers:[],endpointType:(0,a.t)(e.mode||"chat"),selectedModel:i,selectedSdk:"openai",proxySettings:{PROXY_BASE_URL:(0,o.M)()}};return(0,r.f)(d)},"g",0,u,"z",0,e=>(0,i.a)(e)])},466098,348594,831538,e=>{"use strict";var t=e.i(586448),i=e.i(602869),r=e.i(271645),a=e.i(198458),n=e.i(735450);let l="mode",o="providers",s="features",u=e=>Array.isArray(e)?e.filter(e=>"string"==typeof e):[],d=(e,t)=>{let i,r;return i=`filter[${e}][in]`,""===(r=u(t).join(","))?[]:[[i,r]]},c=e=>{switch(e.id){case l:return d(e.id,(0,n.q)(u(e.value)));case o:case s:return d(e.id,e.value);default:return[]}},p=e=>Object.fromEntries(e.flatMap(c)),m=(e,t)=>u(e.find(e=>e.id===t)?.value),g=(e,t,i)=>{let r=e.filter(e=>e.id!==t);return(Array.isArray(i)?0===i.length:""===i.trim())?r:[...r,{id:t,value:i}]};e.s(["g",0,s,"e",0,l,"T",0,o,"i",0,["model_group","mode","providers","max_input_tokens","max_output_tokens","input_cost_per_token","output_cost_per_token","rpm","tpm"],"U",0,e=>e.split("_").map(e=>e.charAt(0).toUpperCase()+e.slice(1)).join(" "),"o",0,m,"$",0,p,"R",0,g],348594);let f="/public/v1/model_hub",h=["publicModelHub","list"],_=[{id:"model_group",desc:!1}],b=async(e,t)=>{try{return await i.Mw.get(f,{query:e,signal:t})}catch(e){throw t.aborted||console.error("There was an error fetching the public model data",e),e}};e.s(["H",0,50,"Z",0,f,"t",0,e=>{let t=(0,a.f)({queryKey:h,fetchPage:b,serializeFilters:p,defaultSorting:_,defaultPageSize:50,enabled:e}),{onColumnFiltersChange:i}=t,n=(0,r.useCallback)((e,t)=>i(i=>g(i,e,t)),[i]),u=(0,r.useCallback)(e=>n(o,e),[n]),d=(0,r.useCallback)(e=>n(l,e),[n]),c=(0,r.useCallback)(e=>n(s,e),[n]);return{...t,providerValues:m(t.columnFilters,o),onProvidersChange:u,modeValues:m(t.columnFilters,l),onModesChange:d,featureValues:m(t.columnFilters,s),onFeaturesChange:c,hasActiveQuery:""!==t.searchValue.trim()||t.columnFilters.length>0}}],831538);let y=["providers","modes","features"];e.s(["f",0,e=>{let[r,a,n]=(0,t.f)({queries:y.map(t=>({queryKey:["publicModelHub","facet",t],queryFn:({signal:e})=>i.Mw.get(`${f}/${t}`,{query:{page_size:100},signal:e}),enabled:e,staleTime:1/0}))}).map(e=>e.data?.data??[]);return{providers:r,modes:a,features:n}}],466098)},735450,e=>{"use strict";var t=e.i(411382),i=e.i(772325),r=e.i(54105),a=e.i(240192),n=e.i(138620);let l="https://docs.litellm.ai/docs/decisions",o=`${l}#supported-providers`,s=`${l}#self-hosted-laya-and-nimble`,u=new Set(["/v1/decisions","/v1/systemone"]),d=t.z.object({litellm_provider:r.z.string(),mode:r.z.string().nullish(),supported_endpoints:i.z.array(r.z.string()).nullish()}),c="decisions",p=["evaluation",c],m=e=>null!=e&&p.includes(e),g=e=>m(e.mode)||(e.supported_endpoints??[]).some(e=>u.has(e)),f=e=>{let t=a.z.record(r.z.string(),n.z.unknown()).safeParse(e);return t.success?Object.entries(t.data).flatMap(([e,t])=>{let i=d.safeParse(t);return i.success?[[e,i.data]]:[]}):[]},h={decisions:0,"self-hosted":1,"needs-upgrade":2},_=t.z.object({decision_model_providers:i.z.array(r.z.string())}),b=(e,t)=>e.model.length-t.model.length||e.model.localeCompare(t.model),y=(e,t,i)=>({row:e,routeOrder:h[e.route],rankInProvider:i.slice(0,t).filter(t=>t.provider===e.provider).length});e.s(["O",0,l,"d",0,c,"Z",0,o,"L",0,s,"B",0,"playground?tab=system-one","F",0,function(e){let t=f(e),i=t.filter(([,e])=>g(e)),r=new Map([...new Set(i.map(([,e])=>e.litellm_provider))].map(e=>{let i=t.filter(([,t])=>t.litellm_provider===e);return[e,{decisionOnly:i.every(([,e])=>g(e))}]}));return{models:new Set(i.map(([e])=>e)),providers:r}},"W",0,(e,t)=>f(e).filter(([,e])=>g(e)).map(([e,i])=>({model:e,provider:i.litellm_provider,route:t?.has(i.litellm_provider)?"decisions":(i.supported_endpoints??["/v1/decisions"]).includes("/v1/decisions")?null===t?"decisions":"needs-upgrade":"self-hosted"})).toSorted(b).map(y).toSorted((e,t)=>e.routeOrder-t.routeOrder||e.rankInProvider-t.rankInProvider||e.row.provider.localeCompare(t.row.provider)).map(({row:e})=>e),"i",0,e=>m(e)?c:e??void 0,"q",0,e=>e.flatMap(e=>e===c?p:[e]),"m",0,g,"_",0,m,"r",0,(e,t,i)=>void 0!==t&&e.providers.get(t)?.decisionOnly===!0||i.some(t=>e.models.has(t)),"P",0,e=>{let t=_.safeParse(e);return t.success?new Set(t.data.decision_model_providers):null}])},899426,e=>{"use strict";let t=e=>e.trim().toLowerCase();function i(e,i){let r=t(e);if(""===r)return!0;let a=i.filter(e=>"string"==typeof e).map(e=>e.toLowerCase());return!!a.some(e=>e.includes(r))||r.split(/\s+/).every(e=>a.some(t=>t.includes(e)))}e.s(["$",0,function(e,t,r){return e.filter(e=>i(t,r(e)))},"h",0,i,"e",0,function(e,i,r){let a=t(i);if(""===a)return[...e];let n=e=>{let t=r(e).toLowerCase();return 1e3*(t===a)+100*!!t.startsWith(a)+(1e3-t.length)};return[...e].sort((e,t)=>n(t)-n(e))}])}]);
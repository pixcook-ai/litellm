(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,991799,897250,e=>{"use strict";var t=e.i(475254);let r=(0,t.f)("moon",[["path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",key:"a7tn18"}]]);e.s(["f",0,r],991799);let i=(0,t.f)("sun",[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]]);e.s(["f",0,i],897250)},522016,(e,t,r)=>{"use strict";e.i(247167),Object.defineProperty(r,"__esModule",{value:!0});var i={default:function(){return _},useLinkStatus:function(){return y}};for(var n in i)Object.defineProperty(r,n,{enumerable:!0,get:i[n]});let a=e.r(190809),o=e.r(843476),l=a._(e.r(271645)),s=e.r(195057),u=e.r(8372),c=e.r(818581),d=e.r(718967),p=e.r(405550),m=e.r(388540),f=e.r(91949),g=e.r(573668),h=e.r(509396);function _(t){var r;let i,n,a,[_,y]=(0,l.useOptimistic)(f.IDLE_LINK_STATUS),v=(0,l.useRef)(null),{href:x,as:w,children:j,prefetch:P=null,passHref:$,replace:k,shallow:S,scroll:C,onClick:M,onMouseEnter:O,onTouchStart:I,legacyBehavior:E=!1,onNavigate:z,transitionTypes:N,ref:L,unstable_dynamicOnHover:R,...A}=t;i=j,E&&("string"==typeof i||"number"==typeof i)&&(i=(0,o.jsx)("a",{children:i}));let T=l.default.useContext(u.AppRouterContext),U=!1!==P,F=!1===P?"none":!0===P?"full":"auto",H="none"!==F?"auto"===F?h.FetchStrategy.PPR:h.FetchStrategy.Full:h.FetchStrategy.PPR,D="string"==typeof(r=w||x)?r:(0,s.formatUrl)(r);if(E){if(i?.$$typeof===Symbol.for("react.lazy"))throw Error("`<Link legacyBehavior>` received a direct child that is either a Server Component, or JSX that was loaded with React.lazy(). This is not supported. Either remove legacyBehavior, or make the direct child a Client Component that renders the Link's `<a>` tag.");n=l.default.Children.only(i)}let B=E?n&&"object"==typeof n&&n.ref:L,q,W=l.default.useCallback(e=>(null!==T&&(v.current=(0,f.mountLinkInstance)(e,D,T,H,U,y,q)),()=>{v.current&&((0,f.unmountLinkForCurrentNavigation)(v.current),v.current=null),(0,f.unmountPrefetchableInstance)(e)}),[U,D,T,H,y,q]),K={ref:(0,c.useMergedRef)(W,B),onClick(t){E||"function"!=typeof M||M(t),E&&n.props&&"function"==typeof n.props.onClick&&n.props.onClick(t),!T||t.defaultPrevented||function(t,r,i,n,a,o,l,s="none"){if("u">typeof window){let u,{nodeName:c}=t.currentTarget;if("A"===c.toUpperCase()&&((u=t.currentTarget.getAttribute("target"))&&"_self"!==u||t.metaKey||t.ctrlKey||t.shiftKey||t.altKey||t.nativeEvent&&2===t.nativeEvent.which)||t.currentTarget.hasAttribute("download"))return;if(!(0,g.isLocalURL)(r)){n&&(t.preventDefault(),location.replace(r));return}if(t.preventDefault(),o){let e=!1;if(o({preventDefault:()=>{e=!0}}),e)return}let{navigate:d}=e.r(132916);d(r,n?"replace":"push",!1===a?m.ScrollBehavior.NoScroll:m.ScrollBehavior.Default,i.current,l,s)}}(t,D,v,k,C,z,N,F)},onMouseEnter(e){E||"function"!=typeof O||O(e),E&&n.props&&"function"==typeof n.props.onMouseEnter&&n.props.onMouseEnter(e),T&&U&&(0,f.onNavigationIntent)(e.currentTarget,!0===R)},onTouchStart:function(e){E||"function"!=typeof I||I(e),E&&n.props&&"function"==typeof n.props.onTouchStart&&n.props.onTouchStart(e),T&&U&&(0,f.onNavigationIntent)(e.currentTarget,!0===R)}};return(0,d.isAbsoluteUrl)(D)?K.href=D:E&&!$&&("a"!==n.type||"href"in n.props)||(K.href=(0,p.addBasePath)(D)),a=E?l.default.cloneElement(n,K):(0,o.jsx)("a",{...A,...K,children:i}),(0,o.jsx)(b.Provider,{value:_,children:a})}let b=(0,l.createContext)(f.IDLE_LINK_STATUS),y=()=>(0,l.useContext)(b);("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},605500,(e,t,r)=>{"use strict";e.i(247167),Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"Image",{enumerable:!0,get:function(){return y}});let i=e.r(555682),n=e.r(190809),a=e.r(843476),o=n._(e.r(271645)),l=i._(e.r(174080)),s=i._(e.r(325633)),u=e.r(908927),c=e.r(65856),d=e.r(49381),p=i._(e.r(1948)),m=e.r(818581);function f(e,t,r,i,n,a,o){let l=e?.src;e&&e["data-loaded-src"]!==l&&(e["data-loaded-src"]=l,("decode"in e?e.decode():Promise.resolve()).catch(()=>{}).then(()=>{if(e.parentElement&&e.isConnected){if("empty"!==t&&n(!0),r?.current){let t=new Event("load");Object.defineProperty(t,"target",{writable:!1,value:e});let i=!1,n=!1;r.current({...t,nativeEvent:t,currentTarget:e,target:e,isDefaultPrevented:()=>i,isPropagationStopped:()=>n,persist:()=>{},preventDefault:()=>{i=!0,t.preventDefault()},stopPropagation:()=>{n=!0,t.stopPropagation()}})}i?.current&&i.current(e)}}))}function g(e){return o.use?{fetchPriority:e}:{fetchpriority:e}}"u"<typeof window&&(globalThis.__NEXT_IMAGE_IMPORTED=!0);let h="u"<typeof window?o.useEffect:o.useLayoutEffect,_=(0,o.forwardRef)(({src:e,srcSet:t,sizes:r,height:i,width:n,decoding:l,className:s,style:u,fetchPriority:c,placeholder:d,loading:p,unoptimized:_,fill:b,onLoadRef:y,onLoadingCompleteRef:v,setBlurComplete:x,setShowAltText:w,sizesInput:j,onLoad:P,onError:$,...k},S)=>{let C=(0,o.useRef)(!1),M=(0,o.useRef)(null);h(()=>{let{current:e}=C,{current:t}=M;e||null===t||($&&(t.src=t.src),t.complete&&f(t,d,y,v,x,_,j),C.current=!0)},[e,d,y,v,$,_,j]);let O=(0,m.useMergedRef)(S,M);return(0,a.jsx)("img",{...k,...g(c),loading:p,width:n,height:i,decoding:l,"data-nimg":b?"fill":"1",className:s,style:u,sizes:r,srcSet:t,src:e,ref:O,onLoad:e=>{f(e.currentTarget,d,y,v,x,_,j)},onError:e=>{w(!0),"empty"!==d&&x(!0),$&&$(e)}})});function b({isAppRouter:e,imgAttributes:t}){let r={as:"image",imageSrcSet:t.srcSet,imageSizes:t.sizes,crossOrigin:t.crossOrigin,referrerPolicy:t.referrerPolicy,...g(t.fetchPriority)};return e&&l.default.preload?(l.default.preload(t.src,r),null):(0,a.jsx)(s.default,{children:(0,a.jsx)("link",{rel:"preload",href:t.srcSet?void 0:t.src,...r},"__nimg-"+t.src+t.srcSet+t.sizes)})}let y=(0,o.forwardRef)((e,t)=>{let r=(0,o.useContext)(c.RouterContext),i=(0,d.useImageConfig)(),{onLoad:n,onLoadingComplete:l}=e,s=(0,o.useRef)(n);(0,o.useEffect)(()=>{s.current=n},[n]);let m=(0,o.useRef)(l);(0,o.useEffect)(()=>{m.current=l},[l]);let[f,g]=(0,o.useState)(!1),[h,y]=(0,o.useState)(!1),{props:v,meta:x}=(0,u.getImgProps)(e,{defaultLoader:p.default,imgConf:i,blurComplete:f,showAltText:h});return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(_,{...v,unoptimized:x.unoptimized,placeholder:x.placeholder,fill:x.fill,onLoadRef:s,onLoadingCompleteRef:m,setBlurComplete:g,setShowAltText:y,sizesInput:e.sizes,ref:t}),x.preload?(0,a.jsx)(b,{isAppRouter:!r,imgAttributes:v}):null]})});("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},325164,e=>{"use strict";var t=e.i(605500);e.s(["default",()=>t.Image])},49381,(e,t,r)=>{"use strict";e.i(247167),Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"useImageConfig",{enumerable:!0,get:function(){return l}});let i=e.r(271645),n=e.r(987690),a=e.r(918556),o={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[32,48,64,96,128,256,384],qualities:[75],path:"/_next/image/",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!0};function l(){let e=(0,i.useContext)(a.ImageConfigContext);return(0,n.prepareImageConfig)(o,e)}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},818581,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"useMergedRef",{enumerable:!0,get:function(){return n}});let i=e.r(271645);function n(e,t){let r=(0,i.useRef)(null),n=(0,i.useRef)(null);return(0,i.useCallback)(i=>{if(null===i){let e=r.current;e&&(r.current=null,e());let t=n.current;t&&(n.current=null,t())}else e&&(r.current=a(e,i)),t&&(n.current=a(t,i))},[e,t])}function a(e,t){if("function"!=typeof e)return e.current=t,()=>{e.current=null};{let r=e(t);return"function"==typeof r?r:()=>e(null)}}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},670965,(e,t,r)=>{"use strict";function i(e,t){let r=e||75;return t?.qualities?.length?t.qualities.reduce((e,t)=>Math.abs(t-r)<Math.abs(e-r)?t:e,t.qualities[0]):r}Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"findClosestQuality",{enumerable:!0,get:function(){return i}})},908927,(e,t,r)=>{"use strict";e.i(247167),Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"getImgProps",{enumerable:!0,get:function(){return s}});let i=e.r(543369),n=e.r(488143),a=["-moz-initial","fill","none","scale-down",void 0];function o(e){return void 0!==e.default}function l(e){return void 0===e?e:"number"==typeof e?Number.isFinite(e)?e:0/0:"string"==typeof e&&/^[0-9]+$/.test(e)?parseInt(e,10):0/0}function s({src:e,sizes:t,unoptimized:r=!1,priority:u=!1,preload:c=!1,loading:d,className:p,quality:m,width:f,height:g,fill:h=!1,style:_,overrideSrc:b,onLoad:y,onLoadingComplete:v,placeholder:x="empty",blurDataURL:w,fetchPriority:j,decoding:P="async",layout:$,objectFit:k,objectPosition:S,lazyBoundary:C,lazyRoot:M,...O},I){var E;let z,N,{imgConf:L,showAltText:R,blurComplete:A,defaultLoader:T}=I;if(void 0===T)throw Error("images.loaderFile detected but the file is missing default export.\nRead more: https://nextjs.org/docs/messages/invalid-images-config");let U=O.loader||T;delete O.loader,delete O.srcSet;let F="__next_img_default"in U;if(F){if("custom"===L.loader)throw Error(`Image with src "${e}" is missing "loader" prop.
Read more: https://nextjs.org/docs/messages/next-image-missing-loader`)}else{let e=U;U=t=>{let{config:r,...i}=t;return e(i)}}if($){"fill"===$&&(h=!0);let e={intrinsic:{maxWidth:"100%",height:"auto"},responsive:{width:"100%",height:"auto"}}[$];e&&(_={..._,...e});let r={responsive:"100vw",fill:"100vw"}[$];r&&!t&&(t=r)}let H="",D=l(f),B=l(g);if((E=e)&&"object"==typeof E&&(o(E)||void 0!==E.src)){let t=o(e)?e.default:e;if(!t.src)throw Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received ${JSON.stringify(t)}`);if(!t.height||!t.width)throw Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received ${JSON.stringify(t)}`);if(z=t.blurWidth,N=t.blurHeight,w=w||t.blurDataURL,H=t.src,!h)if(D||B){if(D&&!B){let e=D/t.width;B=Math.round(t.height*e)}else if(!D&&B){let e=B/t.height;D=Math.round(t.width*e)}}else D=t.width,B=t.height}let q=!u&&!c&&("lazy"===d||void 0===d);(!(e="string"==typeof e?e:H)||e.startsWith("data:")||e.startsWith("blob:"))&&(r=!0,q=!1),L.unoptimized&&(r=!0),F&&!L.dangerouslyAllowSVG&&e.split("?",1)[0].endsWith(".svg")&&(r=!0);let W=l(m),K=Object.assign(h?{position:"absolute",height:"100%",width:"100%",left:0,top:0,right:0,bottom:0,objectFit:k,objectPosition:S}:{},R?{}:{color:"transparent"},_),G=A||"empty"===x?null:"blur"===x?`url("data:image/svg+xml;charset=utf-8,${(0,n.getImageBlurSvg)({widthInt:D,heightInt:B,blurWidth:z,blurHeight:N,blurDataURL:w||"",objectFit:K.objectFit})}")`:`url("${x}")`,J=a.includes(K.objectFit)?"fill"===K.objectFit?"100% 100%":"cover":K.objectFit,V=G?{backgroundSize:J,backgroundPosition:K.objectPosition||"50% 50%",backgroundRepeat:"no-repeat",backgroundImage:G}:{},Y=function({config:e,src:t,unoptimized:r,width:n,quality:a,sizes:o,loader:l}){if(r){if(t.startsWith("/")&&!t.startsWith("//")){let e=(0,i.getDeploymentId)();if(t.includes("/_next/static/immutable")&&!(0,i.getAssetToken)())e=void 0;else if(e){let r=t.indexOf("?");if(-1!==r){let i=new URLSearchParams(t.slice(r+1));i.get("dpl")||(i.append("dpl",e),t=t.slice(0,r)+"?"+i.toString())}else t+=`?dpl=${e}`}}return{src:t,srcSet:void 0,sizes:void 0}}let{widths:s,kind:u}=function({deviceSizes:e,allSizes:t},r,i){if(i){let r=/(^|\s)(1?\d?\d)vw/g,n=[];for(let e;e=r.exec(i);)n.push(parseInt(e[2]));if(n.length){let r=.01*Math.min(...n);return{widths:t.filter(t=>t>=e[0]*r),kind:"w"}}return{widths:t,kind:"w"}}return"number"!=typeof r?{widths:e,kind:"w"}:{widths:[...new Set([r,2*r].map(e=>t.find(t=>t>=e)||t[t.length-1]))],kind:"x"}}(e,n,o),c=s.length-1;return{sizes:o||"w"!==u?o:"100vw",srcSet:s.map((r,i)=>`${l({config:e,src:t,quality:a,width:r})} ${"w"===u?r:i+1}${u}`).join(", "),src:l({config:e,src:t,quality:a,width:s[c]})}}({config:L,src:e,unoptimized:r,width:D,quality:W,sizes:t,loader:U}),Z=q?"lazy":d;return{props:{...O,loading:Z,fetchPriority:j,width:D,height:B,decoding:P,className:p,style:{...K,...V},sizes:Y.sizes,srcSet:Y.srcSet,src:b||Y.src},meta:{unoptimized:r,preload:c||u,placeholder:x,fill:h}}}},325633,(e,t,r)=>{"use strict";e.i(247167),Object.defineProperty(r,"__esModule",{value:!0});var i={default:function(){return g},defaultHead:function(){return d}};for(var n in i)Object.defineProperty(r,n,{enumerable:!0,get:i[n]});let a=e.r(555682),o=e.r(190809),l=e.r(843476),s=o._(e.r(271645)),u=a._(e.r(898879)),c=e.r(742732);function d(){return[(0,l.jsx)("meta",{charSet:"utf-8"},"charset"),(0,l.jsx)("meta",{name:"viewport",content:"width=device-width"},"viewport")]}function p(e,t){return"string"==typeof t||"number"==typeof t?e:t.type===s.default.Fragment?e.concat(s.default.Children.toArray(t.props.children).reduce((e,t)=>"string"==typeof t||"number"==typeof t?e:e.concat(t),[])):e.concat(t)}let m=["name","httpEquiv","charSet","itemProp"];function f(e){let t,r,i,n;return e.reduce(p,[]).reverse().concat(d().reverse()).filter((t=new Set,r=new Set,i=new Set,n={},e=>{let a=!0,o=!1;if(e.key&&"number"!=typeof e.key&&e.key.indexOf("$")>0){o=!0;let r=e.key.slice(e.key.indexOf("$")+1);t.has(r)?a=!1:t.add(r)}switch(e.type){case"title":case"base":r.has(e.type)?a=!1:r.add(e.type);break;case"meta":for(let t=0,r=m.length;t<r;t++){let r=m[t];if(e.props.hasOwnProperty(r))if("charSet"===r)i.has(r)?a=!1:i.add(r);else{let t=e.props[r],i=n[r]||new Set;("name"!==r||!o)&&i.has(t)?a=!1:(i.add(t),n[r]=i)}}}return a})).reverse().map((e,t)=>{let r=e.key||t;return s.default.cloneElement(e,{key:r})})}let g=function({children:e}){let t=(0,s.useContext)(c.HeadManagerContext);return(0,l.jsx)(u.default,{reduceComponentsToState:f,headManager:t,children:e})};("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},488143,(e,t,r)=>{"use strict";function i({widthInt:e,heightInt:t,blurWidth:r,blurHeight:n,blurDataURL:a,objectFit:o}){let l=r?40*r:e,s=n?40*n:t,u=l&&s?`viewBox='0 0 ${l} ${s}'`:"";return`%3Csvg xmlns='http://www.w3.org/2000/svg' ${u}%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3CfeColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/%3E%3CfeFlood x='0' y='0' width='100%25' height='100%25'/%3E%3CfeComposite operator='out' in='s'/%3E%3CfeComposite in2='SourceGraphic'/%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3C/filter%3E%3Cimage width='100%25' height='100%25' x='0' y='0' preserveAspectRatio='${u?"none":"contain"===o?"xMidYMid":"cover"===o?"xMidYMid slice":"none"}' style='filter: url(%23b);' href='${a}'/%3E%3C/svg%3E`}Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"getImageBlurSvg",{enumerable:!0,get:function(){return i}})},918556,(e,t,r)=>{"use strict";e.i(247167),Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"ImageConfigContext",{enumerable:!0,get:function(){return a}});let i=e.r(555682)._(e.r(271645)),n=e.r(987690),a=i.default.createContext(n.imageConfigDefault)},987690,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var i={VALID_LOADERS:function(){return a},imageConfigDefault:function(){return u},prepareImageConfig:function(){return s}};for(var n in i)Object.defineProperty(r,n,{enumerable:!0,get:i[n]});let a=["default","imgix","cloudinary","akamai","custom"],o={},l=new WeakMap;function s(e,t){let r=e??o,i=t??o,n=l.get(r);if(n){let e=n.get(i);if(e)return e}let a=e||t||u,s=[...a.deviceSizes].sort((e,t)=>e-t),c=[...a.imageSizes],d={deviceSizes:s,imageSizes:c,allSizes:[...s,...c].sort((e,t)=>e-t),qualities:void 0===a.qualities?void 0:[...a.qualities].sort((e,t)=>e-t),path:a.path,loader:a.loader,dangerouslyAllowSVG:a.dangerouslyAllowSVG,unoptimized:a.unoptimized,domains:a.domains,remotePatterns:a.remotePatterns,localPatterns:"u"<typeof window&&void 0!==t?t.localPatterns:a.localPatterns,output:a.output};return n||(n=new WeakMap,l.set(r,n)),n.set(i,d),d}let u={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[32,48,64,96,128,256,384],path:"/_next/image",loader:"default",loaderFile:"",domains:[],disableStaticImages:!1,minimumCacheTTL:14400,formats:["image/webp"],maximumDiskCacheSize:void 0,maximumRedirects:3,maximumResponseBody:5e7,dangerouslyAllowLocalIP:!1,dangerouslyAllowSVG:!1,contentSecurityPolicy:"script-src 'none'; frame-src 'none'; sandbox;",contentDispositionType:"attachment",localPatterns:void 0,remotePatterns:[],qualities:[75],unoptimized:!1,customCacheHandler:!1}},1948,(e,t,r)=>{"use strict";e.i(247167),Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"default",{enumerable:!0,get:function(){return o}});let i=e.r(670965),n=e.r(543369);function a({config:e,src:t,width:r,quality:o}){let l=(0,n.getDeploymentId)();if(t.startsWith("/")&&!t.startsWith("//"))if(t.includes("/_next/static/immutable")&&!(0,n.getAssetToken)())l=void 0;else{let e=t.indexOf("?");if(-1!==e){let r=new URLSearchParams(t.slice(e+1)),i=r.get("dpl");if(i){l=i,r.delete("dpl");let n=r.toString();t=t.slice(0,e)+(n?"?"+n:"")}}}if(t.startsWith("/")&&t.includes("?")&&e.localPatterns?.length===1&&"**"===e.localPatterns[0].pathname&&""===e.localPatterns[0].search)throw Error(`Image with src "${t}" is using a query string which is not configured in images.localPatterns.
Read more: https://nextjs.org/docs/messages/next-image-unconfigured-localpatterns`);let s=(0,i.findClosestQuality)(o,e);return`${e.path}?url=${encodeURIComponent(t)}&w=${r}&q=${s}${t.startsWith("/")&&l?`&dpl=${l}`:""}`}a.__next_img_default=!0;let o=a},65856,(e,t,r)=>{"use strict";e.i(247167),Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"RouterContext",{enumerable:!0,get:function(){return i}});let i=(e.r(555682)._(e.r(271645))).default.createContext(null)},195057,(e,t,r)=>{"use strict";e.i(247167),Object.defineProperty(r,"__esModule",{value:!0});var i={formatUrl:function(){return l},formatWithValidation:function(){return u},urlObjectKeys:function(){return s}};for(var n in i)Object.defineProperty(r,n,{enumerable:!0,get:i[n]});let a=e.r(190809)._(e.r(998183)),o=/https?|ftp|gopher|file/;function l(e){let{auth:t,hostname:r}=e,i=e.protocol||"",n=e.pathname||"",l=e.hash||"",s=e.query||"",u=!1;t=t?encodeURIComponent(t).replace(/%3A/i,":")+"@":"",e.host?u=t+e.host:r&&(u=t+(~r.indexOf(":")?`[${r}]`:r),e.port&&(u+=":"+e.port)),s&&"object"==typeof s&&(s=String(a.urlQueryToSearchParams(s)));let c=e.search||s&&`?${s}`||"";return i&&!i.endsWith(":")&&(i+=":"),e.slashes||(!i||o.test(i))&&!1!==u?(u="//"+(u||""),n&&"/"!==n[0]&&(n="/"+n)):u||(u=""),l&&"#"!==l[0]&&(l="#"+l),c&&"?"!==c[0]&&(c="?"+c),n=n.replace(/[?#]/g,encodeURIComponent),c=c.replace("#","%23"),`${i}${u}${n}${c}${l}`}let s=["auth","hash","host","hostname","href","path","pathname","port","protocol","query","search","slashes"];function u(e){return l(e)}},573668,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"isLocalURL",{enumerable:!0,get:function(){return a}});let i=e.r(718967),n=e.r(652817);function a(e){if(!(0,i.isAbsoluteUrl)(e))return!0;try{let t=(0,i.getLocationOrigin)(),r=new URL(e,t);return r.origin===t&&(0,n.hasBasePath)(r.pathname)}catch(e){return!1}}},898879,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"default",{enumerable:!0,get:function(){return l}});let i=e.r(271645),n="u"<typeof window,a=n?()=>{}:i.useLayoutEffect,o=n?()=>{}:i.useEffect;function l(e){let{headManager:t,reduceComponentsToState:r}=e;function l(){if(t&&t.mountedInstances){let e=i.Children.toArray(Array.from(t.mountedInstances).filter(Boolean));t.updateHead(r(e))}}return n&&(t?.mountedInstances?.add(e.children),l()),a(()=>(t?.mountedInstances?.add(e.children),()=>{t?.mountedInstances?.delete(e.children)})),a(()=>(t&&(t._pendingUpdate=l),()=>{t&&(t._pendingUpdate=l)})),o(()=>(t&&t._pendingUpdate&&(t._pendingUpdate(),t._pendingUpdate=null),()=>{t&&t._pendingUpdate&&(t._pendingUpdate(),t._pendingUpdate=null)})),null}},718967,(e,t,r)=>{"use strict";e.i(247167),Object.defineProperty(r,"__esModule",{value:!0});var i={DecodeError:function(){return _},MiddlewareNotFoundError:function(){return x},MissingStaticPage:function(){return v},NormalizeError:function(){return b},PageNotFoundError:function(){return y},SP:function(){return g},ST:function(){return h},WEB_VITALS:function(){return a},execOnce:function(){return o},getDisplayName:function(){return d},getLocationOrigin:function(){return u},getURL:function(){return c},isAbsoluteUrl:function(){return s},isResSent:function(){return p},loadGetInitialProps:function(){return f},normalizeRepeatedSlashes:function(){return m},stringifyError:function(){return w}};for(var n in i)Object.defineProperty(r,n,{enumerable:!0,get:i[n]});let a=["CLS","FCP","INP","LCP","TTFB"];function o(e){let t,r=!1;return(...i)=>(r||(r=!0,t=e(...i)),t)}let l=/^[a-zA-Z][a-zA-Z\d+\-.]*?:/,s=e=>{let t=e.charCodeAt(0);return!!(t>=65&&t<=90||t>=97&&t<=122)&&l.test(e)};function u(){let{protocol:e,hostname:t,port:r}=window.location;return`${e}//${t}${r?":"+r:""}`}function c(){let{href:e}=window.location,t=u();return e.substring(t.length)}function d(e){return"string"==typeof e?e:e.displayName||e.name||"Unknown"}function p(e){return e.finished||e.headersSent}function m(e){let t=e.split("?");return t[0].replace(/\\/g,"/").replace(/\/\/+/g,"/")+(t[1]?`?${t.slice(1).join("?")}`:"")}async function f(e,t){let r=t.res||t.ctx&&t.ctx.res;if(!e.getInitialProps)return t.ctx&&t.Component?{pageProps:await f(t.Component,t.ctx)}:{};let i=await e.getInitialProps(t);if(r&&p(r))return i;if(!i)throw Error(`"${d(e)}.getInitialProps()" should resolve to an object. But found "${i}" instead.`);return i}let g="u">typeof performance,h=g&&["mark","measure","getEntriesByName"].every(e=>"function"==typeof performance[e]);class _ extends Error{}class b extends Error{}class y extends Error{constructor(e){super(),this.code="ENOENT",this.name="PageNotFoundError",this.message=`Cannot find module for page: ${e}`}}class v extends Error{constructor(e,t){super(),this.message=`Failed to load static file for page: ${e} ${t}`}}class x extends Error{constructor(){super(),this.code="ENOENT",this.message="Cannot find the middleware module"}}function w(e){return JSON.stringify({message:e.message,stack:e.stack})}},731565,e=>{"use strict";var t=e.i(115571),r=e.i(271645);function i(e){let r=t=>{"disableBlogPosts"===t.key&&e()},i=t=>{let{key:r}=t.detail;"disableBlogPosts"===r&&e()};return window.addEventListener("storage",r),window.addEventListener(t.M,i),()=>{window.removeEventListener("storage",r),window.removeEventListener(t.M,i)}}function n(){return"true"===(0,t.t)("disableBlogPosts")}e.s(["f",0,function(){return(0,r.useSyncExternalStore)(i,n,()=>!1)}])},636772,e=>{"use strict";var t=e.i(271645),r=e.i(115571);function i(e){let t=t=>{"disableShowPrompts"===t.key&&e()},i=t=>{let{key:r}=t.detail;"disableShowPrompts"===r&&e()};return window.addEventListener("storage",t),window.addEventListener(r.M,i),()=>{window.removeEventListener("storage",t),window.removeEventListener(r.M,i)}}function n(){return"true"===(0,r.t)("disableShowPrompts")}e.s(["f",0,function(){return(0,t.useSyncExternalStore)(i,n,()=>!1)}])},66330,e=>{"use strict";var t=e.i(735450);e.s(["f",0,(e,r,i,n)=>{if("extraction"===e)return`import requests

response = requests.post(
    ${JSON.stringify(`${r}/v1/extraction`)},  # Your LiteLLM Proxy URL
    headers={${JSON.stringify(n)}: "Bearer your_api_key"},
    json={
        "model": ${JSON.stringify(i)},
        "state": "Invoice #4471 from Acme Tools. Total $174.00, due in 30 days.",
        "fields": {
            "vendor": {"type": "text", "instructions": "Who sent the invoice?"},
            "total": {"type": "number", "unit": "USD"}
        }
    }
)

print(response.json()["answers"])`;return(0,t._)(e)?`import requests

response = requests.post(
    ${JSON.stringify(`${r}/v1/systemone`)},  # Your LiteLLM Proxy URL
    headers={${JSON.stringify(n)}: "Bearer your_api_key"},
    json={
        "model": ${JSON.stringify(i)},
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
    base_url=${JSON.stringify(r)}  # Your LiteLLM Proxy URL
)

response = client.chat.completions.create(
    model=${JSON.stringify(i)},
    messages=[
        {
            "role": "user",
            "content": "Hello, how are you?"
        }
    ]
)

print(response.choices[0].message.content)`}])},423680,276701,e=>{"use strict";var t=e.i(843476);let r="inline-flex h-9 shrink-0 items-center justify-center gap-1 rounded-md px-2 text-sm font-medium leading-none text-foreground outline-none transition-colors hover:bg-accent focus-visible:ring-3 focus-visible:ring-ring/50 ";e.s(["f",0,r],276701);var i=e.i(664659),n=e.i(322831);let a="https://docs.litellm.ai/docs/",o=()=>(0,t.jsx)(i.f,{className:"pointer-events-none size-2.5 opacity-0","aria-hidden":!0});e.s(["k",0,a,"E",0,()=>{let{t:e}=(0,n.f)();return(0,t.jsxs)("a",{href:a,target:"_blank",rel:"noopener noreferrer",className:r,children:[e("shell.docsLink.label"),(0,t.jsx)(o,{})]})}],423680)},455880,e=>{"use strict";var t=e.i(843476),r=e.i(991799),i=e.i(897250),n=e.i(363178),a=e.i(271645),o=e.i(322831),l=e.i(519455);let s=()=>()=>{};function u(){let{t:e}=(0,o.f)(),{setTheme:t,resolvedTheme:r}=(0,n.useTheme)(),i=a.default.useSyncExternalStore(s,()=>!0,()=>!1)&&"dark"===r,l=e(i?"themeToggle.switchToLight":"themeToggle.switchToDark");return{isDark:i,label:l,toggleTheme:()=>t(i?"light":"dark")}}e.s(["U",0,()=>{let{isDark:e,label:n,toggleTheme:a}=u();return(0,t.jsx)(l.K,{variant:"ghost",size:"icon-sm","aria-label":n,title:n,className:"text-muted-foreground",onClick:a,children:e?(0,t.jsx)(r.f,{}):(0,t.jsx)(i.f,{})})},"X",0,u])},909947,e=>{"use strict";var t=e.i(865361);e.s(["f",0,e=>{let r,{apiKeySource:i,accessToken:n,apiKey:a,inputMessage:o,chatHistory:l,selectedTags:s,selectedVectorStores:u,selectedGuardrails:c,selectedPolicies:d,selectedVoice:p,endpointType:m,selectedModel:f,selectedSdk:g,proxySettings:h,customHeaders:_}=e,b="session"===i?n:a,y=window.location.origin,v=h?.LITELLM_UI_API_DOC_BASE_URL;v&&v.trim()?y=v:h?.PROXY_BASE_URL&&(y=h.PROXY_BASE_URL);let x=o||"Your prompt here",w=x.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\n"),j=l.filter(e=>!e.isImage).map(({role:e,content:t})=>({role:e,content:t})),P={};s.length>0&&(P.tags=s),u.length>0&&(P.vector_stores=u),c.length>0&&(P.guardrails=c),d.length>0&&(P.policies=d);let $=f||"your-model-name",k=_&&Object.keys(_).length>0?`,
	default_headers=${JSON.stringify(_,null,2).replace(/\n/g,"\n	")}`:"",S="azure"===g?`import openai

client = openai.AzureOpenAI(
	api_key="${b||"YOUR_LITELLM_API_KEY"}",
	azure_endpoint="${y}",
	api_version="2024-02-01"${k}
)`:`import openai

client = openai.OpenAI(
	api_key="${b||"YOUR_LITELLM_API_KEY"}",
	base_url="${y}"${k}
)`;switch(m){case t.Q.CHAT:{let e=Object.keys(P).length>0,t="";if(e){let e=JSON.stringify({metadata:P},null,2).split("\n").map(e=>" ".repeat(4)+e).join("\n").trim();t=`,
    extra_body=${e}`}let i=j.length>0?j:[{role:"user",content:x}];r=`
import base64

# Helper function to encode images to base64
def encode_image(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')

# Example with text only
response = client.chat.completions.create(
    model="${$}",
    messages=${JSON.stringify(i,null,4)}${t}
)

print(response)

# Example with image or PDF (uncomment and provide file path to use)
# base64_file = encode_image("path/to/your/file.jpg")  # or .pdf
# response_with_file = client.chat.completions.create(
#     model="${$}",
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
    extra_body=${e}`}let i=j.length>0?j:[{role:"user",content:x}];r=`
import base64

# Helper function to encode images to base64
def encode_image(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')

# Example with text only
response = client.responses.create(
    model="${$}",
    input=${JSON.stringify(i,null,4)}${t}
)

print(response.output_text)

# Example with image or PDF (uncomment and provide file path to use)
# base64_file = encode_image("path/to/your/file.jpg")  # or .pdf
# response_with_file = client.responses.create(
#     model="${$}",
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
`;break}case t.Q.IMAGE:r="azure"===g?`
# NOTE: The Azure SDK does not have a direct equivalent to the multi-modal 'responses.create' method shown for OpenAI.
# This snippet uses 'client.images.generate' and will create a new image based on your prompt.
# It does not use the uploaded image, as 'client.images.generate' does not support image inputs in this context.
import os
import requests
import json
import time
from PIL import Image

result = client.images.generate(
	model="${$}",
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
	model="${$}",
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
`;break;case t.Q.IMAGE_EDITS:r="azure"===g?`
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
	model="${$}",
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
	model="${$}",
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
`;break;case t.Q.EMBEDDINGS:r=`
response = client.embeddings.create(
	input="${o||"Your string here"}",
	model="${$}",
	encoding_format="base64" # or "float"
)

print(response.data[0].embedding)
`;break;case t.Q.TRANSCRIPTION:r=`
# Open the audio file
audio_file = open("path/to/your/audio/file.mp3", "rb")

# Make the transcription request
response = client.audio.transcriptions.create(
	model="${$}",
	file=audio_file${o?`,
	prompt="${o.replace(/\\/g,"\\\\").replace(/"/g,'\\"')}"`:""}
)

print(response.text)
`;break;case t.Q.SPEECH:r=`
# Make the text-to-speech request
response = client.audio.speech.create(
	model="${$}",
	input="${o||"Your text to convert to speech here"}",
	voice="${p}"  # Options: alloy, ash, ballad, coral, echo, fable, nova, onyx, sage, shimmer
)

# Save the audio to a file
output_filename = "output_speech.mp3"
response.stream_to_file(output_filename)
print(f"Audio saved to {output_filename}")

# Optional: Customize response format and speed
# response = client.audio.speech.create(
#     model="${$}",
#     input="${o||"Your text to convert to speech here"}",
#     voice="alloy",
#     response_format="mp3",  # Options: mp3, opus, aac, flac, wav, pcm
#     speed=1.0  # Range: 0.25 to 4.0
# )
# response.stream_to_file("output_speech.mp3")
`;break;default:r="\n# Code generation for this endpoint is not implemented yet."}return`${S}
${r}`}])},583408,e=>{"use strict";var t=e.i(843476),r=e.i(555436),i=e.i(322831),n=e.i(519455),a=e.i(950594),o=e.i(967489);e.s(["f",0,function({search:e,tag:l,scan:s,tags:u,active:c,setSearch:d,setTag:p,setScan:m,clear:f}){let{t:g}=(0,i.f)(),h=[{value:"",label:g("skills.filters.allTags")},...[...new Set([...u,...l?[l]:[]])].map(e=>({value:e,label:e}))],_=[{value:"all",label:g("skills.filters.allScans")},{value:"yes",label:g("skills.filters.scanned")},{value:"no",label:g("skills.filters.notScanned")}];return(0,t.jsxs)("div",{className:"flex flex-wrap items-center gap-2",children:[(0,t.jsxs)(a.H,{className:"w-full sm:w-80",children:[(0,t.jsx)(a.B,{children:(0,t.jsx)(r.f,{className:"size-4"})}),(0,t.jsx)(a.M,{"aria-label":g("skills.filters.search"),placeholder:g("skills.filters.search"),value:e,onChange:e=>d(e.target.value)})]}),(0,t.jsxs)(o.d,{items:h,value:l,onValueChange:e=>p(e??""),children:[(0,t.jsx)(o.P,{className:"w-44","aria-label":g("skills.filters.tag"),children:(0,t.jsx)(o.U,{})}),(0,t.jsx)(o.r,{children:h.map(e=>(0,t.jsx)(o.T,{value:e.value,children:e.label},e.value))})]}),(0,t.jsxs)(o.d,{items:_,value:s,onValueChange:e=>m("yes"===e||"no"===e?e:"all"),children:[(0,t.jsx)(o.P,{className:"w-48","aria-label":g("skills.table.columns.securityScan"),children:(0,t.jsx)(o.U,{})}),(0,t.jsx)(o.r,{children:_.map(e=>(0,t.jsx)(o.T,{value:e.value,children:e.label},e.value))})]}),c&&(0,t.jsx)(n.K,{variant:"ghost",size:"sm",onClick:f,children:g("skills.filters.clear")})]})}])},594107,e=>{"use strict";var t=e.i(843476),r=e.i(494862);e.i(622826);var i=e.i(200208),n=e.i(112179),a=e.i(487486),o=e.i(201787),l=e.i(617885);let s={created_by:"skills.table.columns.createdBy",approved_by:"skills.table.columns.approvedBy"};e.s(["f",0,function(e={}){return[{id:"download_count",accessorKey:"download_count",header:({column:e})=>(0,t.jsx)(r.v,{column:e,title:o.f.t("skills.table.columns.downloads")}),size:120,sortUndefined:"last",accessorFn:e=>e.download_count??void 0,cell:({row:e})=>(0,t.jsx)("span",{className:"tabular-nums",children:e.original.download_count?.toLocaleString(o.f.language)??"—"})},{id:"keywords",header:o.f.t("skills.table.columns.tags"),size:180,enableSorting:!1,cell:({row:e})=>(0,t.jsx)("div",{className:"flex max-w-52 flex-wrap gap-1",children:e.original.keywords?.length?e.original.keywords.map(e=>(0,t.jsx)(a.f,{variant:"secondary",children:e},e)):"—"})},...["created_by","approved_by"].map(i=>({id:i,accessorKey:i,size:190,enableSorting:!0,header:({column:e})=>(0,t.jsx)(r.v,{column:e,title:(0,t.jsx)("span",{title:o.f.t("skills.table.identitySortHelp"),children:o.f.t(s[i])})}),cell:({row:r})=>(0,t.jsx)("span",{className:"block max-w-48 truncate text-xs",title:r.original[i]??void 0,children:(0,l.b)(r.original[i],e)||o.f.t("skills.table.notRecorded")})})),...["created_at","updated_at"].map(e=>({id:e,accessorKey:e,size:140,enableSorting:!0,accessorFn:t=>t[e]?new Date(t[e]).getTime():void 0,sortUndefined:"last",header:({column:i})=>(0,t.jsx)(r.v,{column:i,title:o.f.t("created_at"===e?"skills.table.columns.createdAt":"skills.table.columns.updatedAt")}),cell:({row:r})=>(0,t.jsx)(i.S,{value:r.original[e],precision:"date"})})),{id:"security_scan_passed",accessorKey:"security_scan_passed",size:130,enableSorting:!0,header:({column:e})=>(0,t.jsx)(r.v,{column:e,title:(0,t.jsx)("span",{title:o.f.t("skills.table.scanHelp"),children:o.f.t("skills.table.columns.securityScan")})}),cell:({row:e})=>(0,t.jsx)("span",{title:o.f.t("skills.table.scanHelp"),children:(0,t.jsx)(n.f,{tone:"neutral",label:o.f.t(e.original.security_scan_passed?"skills.table.publicYes":"skills.table.publicNo")})})}]}])},209261,e=>{"use strict";var t=e.i(201787);let r=/^[a-zA-Z0-9][a-zA-Z0-9._-]*(\/[a-zA-Z0-9][a-zA-Z0-9._-]*)*$/,i=e=>e.trim().replace(/\/+$/,""),n="github.com",a=/\.zip$/i,o=/^[0-9a-fA-F]{64}$/,l=/^\d{1,3}(\.\d{1,3}){3}$/,s=/^[A-Za-z0-9-]+$/,u=/^[A-Za-z0-9._-]+$/,c=/^https?:\/\//i,d="ssh://",p=/^([a-z0-9._-]+)@([^:/@]+):(?!\/)(.+)$/i,m=e=>`${e.protocol}//${e.host}${e.pathname.replace(/\/+$/,"")}`,f=e=>e.pathname.split("/").filter(e=>""!==e),g=e=>{try{return new URL(e)}catch{return null}},h=e=>e.hostname.includes(".")&&!e.hostname.startsWith("[")&&!l.test(e.hostname),_=e=>{let t=e.trim();if(""===t||t.startsWith("//"))return null;let r=g(/^[a-z][a-z0-9+.-]*:\/\//i.test(t)?t:`https://${t}`);return r&&"https:"===r.protocol&&""===r.username&&""===r.password&&h(r)?r:null},b=e=>{let t=e.split("/").filter(e=>""!==e);return t[t.length-1]??""},y=e=>e.toLowerCase().replace(/[^a-z0-9-]+/g,"-").replace(/-+/g,"-").replace(/^-+|-+$/g,""),v=(e,t)=>{let r=t?.trim();return e&&r?{...e,parsed:{...e.parsed,.../^[a-fA-F0-9]{40}$/.test(r)?{sha:r.toLowerCase()}:{ref:r}},label:`${e.label} (${r})`}:e},x=(e,t,r,n)=>{if(!e.length)return null;try{let a=r?.trim()||decodeURIComponent(e[0]),o=r?.trim()?e.findIndex((t,r)=>decodeURIComponent(e.slice(0,r+1).join("/"))===a)+1:1;if(!o||"blob"===t&&e.length===o)return null;let l=e.slice(o,"blob"===t?-1:void 0).map(decodeURIComponent).join("/"),s="blob"===t?decodeURIComponent(e[e.length-1]):void 0,u=!!(l||s);return{ref:a,path:u?l:i(n??""),pathFromUrl:u,fileFromUrl:s}}catch{return null}},w=(e,n,a,o="reference")=>{let l=f(e);if(l.length<2)return null;let c=l[0],d=l[1].replace(/\.git$/,"");if(!s.test(c)||!u.test(d))return null;let p=`${c}/${d}`,m=`https://github.com/${p}`,g={parsed:{source:"github",repo:p},label:t.f.t("claudeCodePlugins.sources.githubRepo",{repo:p}),suggestedName:y(d)},h=l[2],_="tree"===h||"blob"===h?x(l.slice(3),h,a,n):void 0;if(null===_||void 0===_&&2!==l.length)return null;let w=_?.path??i(n??"");return"reference"===o&&w&&!r.test(w)?null:v({...w?{parsed:{source:"git-subdir",url:m,path:w},label:t.f.t("claudeCodePlugins.sources.githubSubdir",{repo:p,path:w}),suggestedName:y(b(w))}:g,..._?{pathFromUrl:_.pathFromUrl,fileFromUrl:_.fileFromUrl}:{}},_?.ref??a)},j=(e,n,a,o)=>{let l=i(o??"");return""!==l?r.test(l)?{parsed:{source:"git-subdir",url:n,path:l},label:t.f.t("claudeCodePlugins.sources.gitSubdir",{kind:e,url:n,path:l}),suggestedName:y(b(l))}:null:{parsed:{source:"url",url:n},label:t.f.t("claudeCodePlugins.sources.gitRepo",{kind:e,url:n}),suggestedName:y(a)}},P=e=>{let t=_(e);if(!t)return null;let r=t.host.replace(/^www\./,"");return[n,"skills.sh"].includes(r)?g(`${t.protocol}//${r}${t.pathname}${t.search}${t.hash}`):null},$="<your-litellm-key>",k=e=>!!e&&""!==e.trim()&&/^[a-z0-9-]+$/.test(e);e.s(["i",0,$,"x",0,e=>{let t=P(e);return t?.host==="skills.sh"?["import"]:t?["register","import"]:["register"]},"U",0,(e,t)=>JSON.stringify({extraKnownMarketplaces:{litellm:{source:{source:"url",url:`${e}/claude-code/marketplace.json`,...t?{headers:{Authorization:`Bearer ${$}`}}:{}}}}},null,2),"a",0,e=>`/plugin install ${e.name}@litellm`,"v",0,(e,t,r,i)=>{if("archive"!==t.source||!k(e)||t.sha256&&!o.test(t.sha256))return null;let n=t.sha256?`/claude-code/plugins/${e}/archive/${t.sha256}.zip`:`/skill-hub/skills/${e}/archive`;try{let e=new URL(`${r.replace(/\/+$/,"")}${n}`,i);return/^https?:$/.test(e.protocol)&&t.url===e.href?n:null}catch{return null}},"_",0,e=>"github"===e.source&&e.repo?t.f.t("claudeCodePlugins.sources.githubDisplay",{repo:e.repo}):"git-subdir"===e.source&&e.url&&e.path?`${e.url} @ ${e.path}`:("url"===e.source||"archive"===e.source)&&e.url?e.url:t.f.t("claudeCodePlugins.sources.unknown"),"E",0,e=>{if(!["github","url","git-subdir","archive"].includes(e.source))return null;let t="github"===e.source?e.repo&&`https://github.com/${e.repo}`:e.url;if(!t||!c.test(t))return null;if("archive"===e.source)return t;let r=g(t),i=r&&r.hostname.replace(/^www\./,"");if(!r||i!==n&&"gitlab.com"!==i)return t;let a=f(r);if(!(i===n?2===a.length:a.length>=2&&!a.includes("-")))return t;let o=m(r).replace(/\.git$/,""),l=e.sha||e.ref;if(!l)return o;let s="git-subdir"===e.source&&e.path?`/${e.path.split("/").map(encodeURIComponent).join("/")}`:"";return`${o}/${i===n?"tree":"-/tree"}/${encodeURIComponent(l)}${s}`},"r",0,e=>!e||/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e),"R",0,e=>!e||/^\d+\.\d+\.\d+(-[a-zA-Z0-9.-]+)?(\+[a-zA-Z0-9.-]+)?$/.test(e),"b",0,e=>""===e.trim()||o.test(e.trim()),"D",0,e=>e&&""!==e.trim()?e.split(",").map(e=>e.trim()).filter(e=>""!==e):[],"C",0,(e,t,r,i)=>{let n=P(e);if(!n||n.search||n.hash)return null;if("skills.sh"===n.host)try{let e=n.pathname.replace(/^\/+|\/+$/g,"").split("/").map(decodeURIComponent);if(3!==e.length||e.slice(0,2).some(e=>!u.test(e)))return null;let i=e[2];if(!i)return null;return{selection:{url:n.href,...r?.trim()?{ref:r.trim()}:{},...t?.trim()?{path:t.trim()}:{}},preview:null,skillFromUrl:i}}catch{return null}let a=w(n,t,r,"portable");if(!a||a.fileFromUrl&&"SKILL.md"!==a.fileFromUrl)return null;let o=a.parsed,l=o.sha??o.ref;return{selection:{url:"github"===o.source?`https://github.com/${o.repo}`:o.url??n.href,...i?.trim()?{skill:i.trim()}:{},...l?{ref:l}:{},...o.path||a.fileFromUrl?{path:o.path??""}:{}},preview:a}},"Z",0,(e,r,i)=>{let o=((e,t)=>{let r=e.trim(),i=p.exec(r),n=i?`${d}${i[1]}@${i[2]}/${i[3]}`:r;if(!n.toLowerCase().startsWith(d))return null;let a=g(n);if(!a||""===a.username||""!==a.password||!h(a))return null;let o=n.indexOf("/",d.length);return -1===o||a.pathname!==n.slice(o)||f(a).length<2?null:j("SSH",r,b(a.pathname).replace(/\.git$/i,""),t)})(e,r);if(o)return v(o,i);let l=_(e);if(!l)return null;let s=l.hostname.replace(/^www\./,"");if(s===n&&["tree","blob"].includes(f(l)[2]))return w(l,r,i);if("gitlab.com"===s&&/\/-\/(?:tree|blob)(?:\/|$)/.test(l.pathname))return((e,t,r)=>{let i=f(e),n=i.findIndex((e,t)=>"-"===e&&["tree","blob"].includes(i[t+1])),a=i[n+1];if(n<2||"tree"!==a&&"blob"!==a)return null;let o=x(i.slice(n+2),a,r,t);if(!o)return null;let l=j("Git",`${e.protocol}//${e.host.replace(/^www\./,"")}/${i.slice(0,n).join("/")}`,i[n-1].replace(/\.git$/,""),o.path);return v(l?{...l,pathFromUrl:o.pathFromUrl,fileFromUrl:o.fileFromUrl}:null,o.ref)})(l,r,i);if(a.test(l.pathname))return{parsed:{source:"archive",url:l.href},label:t.f.t("claudeCodePlugins.sources.zipArchive",{location:`${l.host}${l.pathname}`}),suggestedName:y(b(l.pathname).replace(a,""))};return s===n?w(l,r,i):v(((e,t)=>{if(f(e).length<2)return null;let r=b(e.pathname).replace(/\.git$/,"");return j("Git",m(e),r,t)})(l,r),i)},"c",0,(e,t)=>!!(e?.pathFromUrl&&e.parsed.path&&!(t.trim()||e.parsed.sha||e.parsed.ref?.includes("/"))),"e",0,k])},962600,e=>{"use strict";var t=e.i(438847),r=e.i(45570),i=e.i(899426);let n=["name","download_count","created_at","updated_at","created_by","approved_by","security_scan_passed"],a={keyPrefix:"skills_",defaultPageSize:50,maxPageSize:100,sortFields:n,defaultSort:{id:"name",desc:!1},filterColumns:[]},o={tag:t.d.withDefault(""),scan:(0,t.b)(["all","yes","no"]).withDefault("all")},l={urlKeys:{tag:"skills_filter_tag",scan:"skills_filter_scan"}};e.s(["O",0,n,"W",0,function(e,t){let r=(0,i.h)(t.search,[e.name,e.description,e.domain,e.namespace,e.created_by,e.approved_by,e.published_by,...e.keywords??[]]),n=!t.tag||(e.keywords??[]).some(e=>e.toLowerCase()===t.tag.toLowerCase()),a="all"===t.scan||!!e.security_scan_passed==("yes"===t.scan);return r&&n&&a},"n",0,function(e){return{sort_by:n.find(t=>t===e[0]?.id)??"name",sort_order:e[0]?.desc?"desc":"asc"}},"f",0,function(e){return[...new Set(e.flatMap(e=>e.keywords??[]))].sort((e,t)=>e.localeCompare(t))},"a",0,function(e=n){let i=(0,r.f)({...a,sortFields:e}),[s,u]=(0,t.i)(o,l),c=e=>{u(e),i.onPaginationChange({...i.pagination,pageIndex:0})};return{...i,...s,setTag:e=>c({tag:e}),setScan:e=>c({scan:e}),clear:()=>{c(null),i.setSearch("")},active:!!(i.search.trim()||s.tag||"all"!==s.scan)}}])},33355,e=>{"use strict";var t=e.i(843476),r=e.i(322831),i=e.i(418371),n=e.i(916925),a=e.i(196631),o=e.i(784774),l=e.i(201787);let s=["standard","flex","balanced","priority","ultrafast","batches"],u={standard:"deploymentPricing.tiers.standard",flex:"deploymentPricing.tiers.flex",balanced:"deploymentPricing.tiers.balanced",priority:"deploymentPricing.tiers.priority",ultrafast:"deploymentPricing.tiers.ultrafast",batches:"deploymentPricing.tiers.batches"},c=["token","second","image","pixel","character","query","request"],d=["input","cache_read","explicit_cache_read","cache_write","output"],p=["","text","image","audio","video","reasoning"],m=/^(.+)_(flex|balanced|priority|ultrafast|batches)$/,f=/^(.+)_above_(\d+)k_tokens$/,g=/^(.+)_above_(\d+hr)$/,h=/^(input|output)_cost_per_(?:(text|image|audio|video|reasoning)_(?:per_)?)?([a-z]+)$/,_=/^(explicit_)?cache_(read|creation)_input_(?:(image|audio)_)?token_cost$/,b=(e,t)=>{let r=t.exec(e);return r?[r[1],r[2]]:[e,null]},y={start:{input:"deploymentPricing.charges.input",cache_read:"deploymentPricing.charges.cacheRead",explicit_cache_read:"deploymentPricing.charges.explicitCacheRead",cache_write:"deploymentPricing.charges.cacheWrite",output:"deploymentPricing.charges.output"},inline:{input:"deploymentPricing.chargesInline.input",cache_read:"deploymentPricing.chargesInline.cacheRead",explicit_cache_read:"deploymentPricing.chargesInline.explicitCacheRead",cache_write:"deploymentPricing.chargesInline.cacheWrite",output:"deploymentPricing.chargesInline.output"}},v={start:{text:"deploymentPricing.modalities.text",image:"deploymentPricing.modalities.image",audio:"deploymentPricing.modalities.audio",video:"deploymentPricing.modalities.video",reasoning:"deploymentPricing.modalities.reasoning"},inline:{text:"deploymentPricing.modalitiesInline.text",image:"deploymentPricing.modalitiesInline.image",audio:"deploymentPricing.modalitiesInline.audio",video:"deploymentPricing.modalitiesInline.video",reasoning:"deploymentPricing.modalitiesInline.reasoning"}},x={token:"deploymentPricing.units.token",second:"deploymentPricing.units.second",image:"deploymentPricing.units.image",pixel:"deploymentPricing.units.pixel",character:"deploymentPricing.units.character",query:"deploymentPricing.units.query",request:"deploymentPricing.units.request"},w=({charge:e,modality:t},r)=>t?l.f.t("deploymentPricing.withModality",{modality:l.f.t(v[r][t]),charge:l.f.t(y.inline[e])}):l.f.t(y[r][e]),j=(e,t)=>e.cacheDuration?l.f.t("deploymentPricing.withCacheDuration",{charge:w(e,t),duration:e.cacheDuration}):w(e,t),P=e=>l.f.t(x[e]),$=e=>l.f.t("deploymentPricing.rowLabel",{charge:j(e,"start"),unit:P(e.unit)}),k=e=>[d.indexOf(e.charge),c.indexOf(e.unit),p.indexOf(e.modality),parseInt(e.cacheDuration||"0",10)],S=new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2,maximumFractionDigits:10,useGrouping:!1}),C=e=>0===e?l.f.t("deploymentPricing.free"):S.format(e),M=(e,t)=>C("token"===t?1e6*e:e),O=/^(.*?)_?cost_per_(.+)$/,I=/^(.+?)_cost(?:_(.+))?$/,E=e=>{let t=e.replaceAll("_"," ").trim();return t.charAt(0).toUpperCase()+t.slice(1)},z=e=>{let t=O.exec(e);if(t)return l.f.t("deploymentPricing.rowLabel",{charge:t[1]?E(t[1]):l.f.t("deploymentPricing.fallbackCost"),unit:t[2].replaceAll("_"," ")});let r=I.exec(e);return r?E([r[1],r[2]].filter(Boolean).join(" ")):E(e)},N=e=>"price"===e.cost.kind,L=e=>Object.entries(e).map(([e,t])=>({key:e,value:t,cost:(e=>{let[t,r]=b(e,m),[i,n]=b(t,f),[a,o]=b(i,g),l=(e=>{let t=h.exec(e);if(t){let[,e,r="",i]=t;return c.includes(i)?{charge:e,modality:r,unit:i}:null}let r=_.exec(e);if(r){let[,e,t,i=""]=r;return"creation"===t?e?null:{charge:"cache_write",modality:i,unit:"token"}:{charge:e?"explicit_cache_read":"cache_read",modality:i,unit:"token"}}return null})(a);return l?{kind:"price",...l,cacheDuration:o??"",threshold:null===n?null:1e3*Number(n),tier:r??"standard"}:{kind:"unknown",key:e}})(e)})),R=(e,t)=>e.filter((r,i)=>e.findIndex(e=>t(e)===t(r))===i),A=(e,t)=>{let r,i;return r=k(e.cost),i=k(t.cost),r.reduce((e,t,r)=>e||t-i[r],0)},T=e=>e>=1e6?`${+(e/1e6).toFixed(1)}M`:e>=1e3?`${+(e/1e3).toFixed(1)}K`:String(e),U=({cost:e,value:t})=>{let r=j(e,"inline"),i=M(t,e.unit);return"token"===e.unit?l.f.t("deploymentPricing.tierPrice",{price:i,charge:r}):l.f.t("deploymentPricing.tierPricePerUnit",{price:i,charge:r,unit:P(e.unit)})};function F({group:e,tiers:i}){let{t:n}=(0,r.f)(),a=null===e.threshold?n("deploymentPricing.basePrices"):n("deploymentPricing.aboveThreshold",{threshold:T(e.threshold)});return(0,t.jsxs)(o.z,{"aria-label":a,children:[null!==e.threshold&&(0,t.jsx)(o.N,{className:"hover:bg-transparent",children:(0,t.jsx)(o.V,{colSpan:i.length+1,scope:"colgroup",className:"h-8 text-xs text-muted-foreground",children:a})}),e.rows.map(e=>(0,t.jsxs)(o.N,{children:[(0,t.jsx)(o.V,{scope:"row",className:"font-normal",children:e.label}),i.map(r=>(0,t.jsx)(o.d,{className:o.J,children:e.prices[r]},r))]},e.label))]})}function H({deployment:e}){let a,c,d,p,m,{t:f}=(0,r.f)(),g=(d=[...R(c=(a=L(e.costs)).filter(N),({cost:e})=>e.threshold)].map(({cost:e})=>e.threshold).sort((e,t)=>(e??0)-(t??0)),p=s.filter(e=>c.some(({cost:t})=>t.tier===e)),{tiers:p,groups:m=d.map(e=>{let t;return{threshold:e,rows:[...R(t=c.filter(({cost:t})=>t.threshold===e),({cost:e})=>$(e))].sort(A).map(({cost:e})=>({label:$(e),prices:Object.fromEntries(t.filter(t=>$(t.cost)===$(e)).map(e=>[e.cost.tier,M(e.value,e.cost.unit)]))}))}}),hasBlankCells:m.some(({rows:e})=>e.some(({prices:e})=>p.some(t=>!(t in e)))),unknown:a.filter(e=>!N(e)).map(({key:e,value:t})=>({key:e,label:z(e),price:C(t)}))}),h=e.tiered_pricing,_=(0,n.h)(e.provider).displayName;return(0,t.jsxs)("section",{"aria-label":f("deploymentPricing.providerPricing",{provider:_}),className:"flex flex-col gap-2 rounded-lg border border-border p-3",children:[(0,t.jsxs)("h4",{className:"flex items-center gap-2 text-sm font-medium",children:[(0,t.jsx)(i.f,{provider:e.provider}),_]}),g.groups.length>0&&(0,t.jsxs)(o.s,{children:[(0,t.jsx)(o.E,{children:(0,t.jsxs)(o.N,{className:"hover:bg-transparent",children:[(0,t.jsx)(o.V,{children:f("deploymentPricing.chargeColumn")}),g.tiers.map(e=>(0,t.jsx)(o.V,{className:o.J,children:f(u[e])},e))]})}),g.groups.map(e=>(0,t.jsx)(F,{group:e,tiers:g.tiers},e.threshold??"base"))]}),g.hasBlankCells&&(0,t.jsx)("p",{className:"text-xs text-muted-foreground",children:f("deploymentPricing.blankCells")}),h.length>0&&(0,t.jsxs)("div",{className:"flex flex-col gap-1 text-sm",children:[(0,t.jsx)("p",{className:"text-xs font-medium text-muted-foreground",children:f("deploymentPricing.tieredPricing")}),(0,t.jsx)("ul",{className:"flex flex-col gap-0.5 tabular-nums",children:h.map(e=>(0,t.jsx)("li",{children:(({range:[e,t],costs:r})=>{let i=L(r),n=[...[...i.filter(N)].sort(A).map(U),...i.filter(e=>!N(e)).map(({key:e,value:t})=>l.f.t("deploymentPricing.tierPrice",{price:C(t),charge:z(e).toLowerCase()}))];return l.f.t("deploymentPricing.tierRange",{low:T(e),high:T(t),prices:n.join(" / ")})})(e)},e.range.join("-")))})]}),g.unknown.length>0&&(0,t.jsx)("dl",{className:"grid grid-cols-[minmax(0,1fr)_auto] gap-x-4 gap-y-1 text-sm",children:g.unknown.map(({key:e,label:r,price:i})=>(0,t.jsxs)("div",{className:"contents",children:[(0,t.jsx)("dt",{className:"truncate",children:r}),(0,t.jsx)("dd",{className:"text-right tabular-nums",children:i})]},e))})]})}e.s(["f",0,function({deployments:e,heading:i,className:n}){let{t:o}=(0,r.f)();return e&&0!==e.length?(0,t.jsxs)("div",{className:(0,a.c)("flex flex-col gap-3",n),children:[i,e.length>1&&(0,t.jsx)("p",{className:"text-xs text-muted-foreground",children:o("deploymentPricing.deploymentCount",{count:e.length})}),e.map((e,r)=>(0,t.jsx)(H,{deployment:e},`${e.provider}-${r}`)),(0,t.jsx)("p",{className:"text-xs text-muted-foreground",children:o("deploymentPricing.requestAdjustments")})]}):null}],33355)},913761,e=>{"use strict";var t=e.i(602869),r=e.i(916925),i=e.i(735450),n=e.i(201787);let a={chat:"publicModelHub.format.modes.chat",completion:"publicModelHub.format.modes.completion",embedding:"publicModelHub.format.modes.embedding",rerank:"publicModelHub.format.modes.rerank",image_generation:"publicModelHub.format.modes.imageGeneration",image_edit:"publicModelHub.format.modes.imageEdit",audio_speech:"publicModelHub.format.modes.audioSpeech",audio_transcription:"publicModelHub.format.modes.audioTranscription",video_generation:"publicModelHub.format.modes.videoGeneration",realtime:"publicModelHub.format.modes.realtime",responses:"publicModelHub.format.modes.responses",batch:"publicModelHub.format.modes.batch",ocr:"publicModelHub.format.modes.ocr",decisions:"publicModelHub.format.modes.decisions"},o=e=>e.replaceAll("_"," ").replace(/^./,e=>e.toUpperCase()),l=new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2,maximumFractionDigits:4,useGrouping:!1}),s={supports_vision:"publicModelHub.format.capabilities.vision",supports_function_calling:"publicModelHub.format.capabilities.functionCalling",supports_reasoning:"publicModelHub.format.capabilities.reasoning",supports_web_search:"publicModelHub.format.capabilities.webSearch",supports_parallel_function_calling:"publicModelHub.format.capabilities.parallelFunctionCalling",supports_url_context:"publicModelHub.format.capabilities.urlContext",supports_fast_mode:"publicModelHub.format.capabilities.fastMode"},u=Object.keys(s),c=e=>{let t=u.indexOf(e);return -1===t?u.length:t},d=e=>Object.hasOwn(s,e)?n.f.t(s[e]):o(e.replace(/^supports_/,"")),p={healthy:{tone:"success",label:"publicModelHub.format.health.healthy"},unhealthy:{tone:"error",label:"publicModelHub.format.health.unhealthy"}};e.s(["m",0,"text-[15px] leading-[22px] font-semibold","G",0,e=>d(`supports_${e}`),"a",0,e=>0===e?n.f.t("publicModelHub.format.free"):e?l.format(1e6*e):"-","k",0,e=>e?e>=1e6?`${+(e/1e6).toFixed(1)}M`:e>=1e3?`${Math.round(e/1e3)}K`:String(e):"-","M",0,()=>(0,t._h)(),"H",0,e=>{let t=e.health_status??"";return Object.hasOwn(p,t)?{tone:p[t].tone,label:n.f.t(p[t].label)}:{tone:"neutral",label:n.f.t("publicModelHub.format.notChecked")}},"S",0,e=>{let t=(0,i.i)(e);return t?Object.hasOwn(a,t)&&n.f.t(a[t])||o(t):"-"},"E",0,e=>Object.entries(e).filter(([e,t])=>e.startsWith("supports_")&&!0===t).map(([e])=>e).sort((e,t)=>c(e)-c(t)).map(d),"q",0,e=>(0,r.h)(e).logo,"P",0,e=>(0,r.h)(e).displayName.replace(/\s*\(.*\)$/,""),"W",0,(e,t=Date.now())=>{let r=e?new Date(e).getTime():0/0;if(Number.isNaN(r))return"-";let i=Math.max(0,Math.round((t-r)/6e4));if(i<1)return n.f.t("publicModelHub.format.relativeTime.justNow");if(i<60)return n.f.t("publicModelHub.format.relativeTime.minutes",{minutes:i});let a=Math.round(i/60);if(a<24)return n.f.t("publicModelHub.format.relativeTime.hours",{hours:a});let o=Math.round(a/24);return n.f.t("publicModelHub.format.relativeTime.days",{count:o})},"Q",0,e=>Object.entries(e??{}).map(([e,t])=>({title:e,url:"string"==typeof t?t:t.url,index:"string"==typeof t?0:t.index??0})).sort((e,t)=>e.index-t.index).map(({title:e,url:t})=>({title:e,url:t})),"X",0,e=>e.replaceAll("*","<model-name>")])},489432,e=>{"use strict";var t=e.i(66330),r=e.i(209261),i=e.i(909947),n=e.i(865361),a=e.i(602869),o=e.i(735450),l=e.i(913761);let s="Hello, how are you?",u=e=>{let t;if(!e.pass_through_path)return null;let r=(t=e.pass_through_methods,!t?.length||t.includes("POST")?"POST":t[0]),i=r.replace(/[\\"$`]/g,"\\$&"),n=`${(0,l.M)()}${e.pass_through_path}`.replace(/[\\"$`]/g,"\\$&");return"POST"===r?`curl -X "${i}" "${n}" \\
  -H "Authorization: Bearer your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{"input": "Hello, how are you?"}'`:`curl -X "${i}" "${n}" \\
  -H "Authorization: Bearer your_api_key"`};e.s(["c",0,e=>e.pass_through_path?u(e):e.mode&&"chat"!==e.mode?null:`curl ${(0,l.M)()}/v1/chat/completions \\
  -H "Authorization: Bearer $LITELLM_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "${(0,l.X)(e.model_group)}",
    "messages": [{"role": "user", "content": "Hello"}]
  }'`,"j",0,()=>`/plugin marketplace add ${(0,l.M)()}/claude-code/marketplace.json`,"W",0,e=>{if("passthrough"===e.mode||e.pass_through_path)return u(e)??"";let r=(0,l.X)(e.model_group);if((0,o._)(e.mode))return(0,t.f)(e.mode,(0,l.M)(),r,(0,a.kR)());let c={apiKeySource:"custom",accessToken:null,apiKey:"your_api_key",inputMessage:s,chatHistory:[{role:"user",content:s,isImage:!1}],selectedTags:[],selectedVectorStores:[],selectedGuardrails:[],selectedPolicies:[],selectedMCPServers:[],endpointType:(0,n.t)(e.mode||"chat"),selectedModel:r,selectedSdk:"openai",proxySettings:{PROXY_BASE_URL:(0,l.M)()}};return(0,i.f)(c)},"g",0,u,"z",0,e=>(0,r.a)(e)])},466098,348594,831538,e=>{"use strict";var t=e.i(586448),r=e.i(602869),i=e.i(271645),n=e.i(198458),a=e.i(735450);let o="mode",l="providers",s="features",u=e=>Array.isArray(e)?e.filter(e=>"string"==typeof e):[],c=(e,t)=>{let r,i;return r=`filter[${e}][in]`,""===(i=u(t).join(","))?[]:[[r,i]]},d=e=>{switch(e.id){case o:return c(e.id,(0,a.q)(u(e.value)));case l:case s:return c(e.id,e.value);default:return[]}},p=e=>Object.fromEntries(e.flatMap(d)),m=(e,t)=>u(e.find(e=>e.id===t)?.value),f=(e,t,r)=>{let i=e.filter(e=>e.id!==t);return(Array.isArray(r)?0===r.length:""===r.trim())?i:[...i,{id:t,value:r}]};e.s(["g",0,s,"e",0,o,"T",0,l,"i",0,["model_group","mode","providers","max_input_tokens","max_output_tokens","input_cost_per_token","output_cost_per_token","rpm","tpm"],"U",0,e=>e.split("_").map(e=>e.charAt(0).toUpperCase()+e.slice(1)).join(" "),"o",0,m,"$",0,p,"R",0,f],348594);let g="/public/v1/model_hub",h=["publicModelHub","list"],_=[{id:"model_group",desc:!1}],b=async(e,t)=>{try{return await r.Mw.get(g,{query:e,signal:t})}catch(e){throw t.aborted||console.error("There was an error fetching the public model data",e),e}};e.s(["H",0,50,"Z",0,g,"t",0,e=>{let t=(0,n.f)({queryKey:h,fetchPage:b,serializeFilters:p,defaultSorting:_,defaultPageSize:50,enabled:e}),{onColumnFiltersChange:r}=t,a=(0,i.useCallback)((e,t)=>r(r=>f(r,e,t)),[r]),u=(0,i.useCallback)(e=>a(l,e),[a]),c=(0,i.useCallback)(e=>a(o,e),[a]),d=(0,i.useCallback)(e=>a(s,e),[a]);return{...t,providerValues:m(t.columnFilters,l),onProvidersChange:u,modeValues:m(t.columnFilters,o),onModesChange:c,featureValues:m(t.columnFilters,s),onFeaturesChange:d,hasActiveQuery:""!==t.searchValue.trim()||t.columnFilters.length>0}}],831538);let y=["providers","modes","features"];e.s(["f",0,e=>{let[i,n,a]=(0,t.f)({queries:y.map(t=>({queryKey:["publicModelHub","facet",t],queryFn:({signal:e})=>r.Mw.get(`${g}/${t}`,{query:{page_size:100},signal:e}),enabled:e,staleTime:1/0}))}).map(e=>e.data?.data??[]);return{providers:i,modes:n,features:a}}],466098)},799676,e=>{"use strict";var t=e.i(843476),r=e.i(271645),i=e.i(552245),n=e.i(733332);let a=r.createContext(void 0);function o(){let e=r.useContext(a);if(void 0===e)throw Error((0,n.f)(13));return e}let l={imageLoadingStatus:()=>null},s=r.forwardRef(function(e,n){let{className:o,render:s,style:u,...c}=e,[d,p]=r.useState("idle"),m=r.useMemo(()=>({imageLoadingStatus:d,setImageLoadingStatus:p}),[d,p]),f=(0,i.f)("span",e,{state:{imageLoadingStatus:d},ref:n,props:c,stateAttributesMapping:l});return(0,t.jsx)(a.Provider,{value:m,children:f})});var u=e.i(667865),c=e.i(146376),d=e.i(137584),p=e.i(209407),m=e.i(223910),f=e.i(956789);let g={...l,...p.T},h=r.forwardRef(function(e,t){let{className:n,render:a,onLoadingStatusChange:l,style:s,...p}=e,{setImageLoadingStatus:h}=o(),_=function(e,{referrerPolicy:t,crossOrigin:i,sizes:n,srcSet:a}){let[o,l]=r.useState("idle");return(0,c.f)(()=>{if(!e&&!a)return l("error"),f.x;let r=!0,o=new window.Image,s=e=>()=>{r&&l(e)};return l("loading"),o.onload=s("loaded"),o.onerror=s("error"),t&&(o.referrerPolicy=t),o.crossOrigin=i??null,n&&(o.sizes=n),a&&(o.srcset=a),e&&(o.src=e),o.complete&&l(o.naturalWidth>0?"loaded":"error"),()=>{r=!1}},[e,a,n,i,t]),o}(p.src,p),b="loaded"===_,{mounted:y,transitionStatus:v,setMounted:x}=(0,m.f)(b),w=r.useRef(null),j=(0,u.f)(e=>{l?.(e),h(e)});(0,c.f)(()=>{"idle"!==_&&j(_)},[_,j]),(0,c.f)(()=>()=>h("idle"),[h]),(0,d.f)({open:b,ref:w,onComplete(){b||x(!1)}});let P=(0,i.f)("img",e,{state:{imageLoadingStatus:_,transitionStatus:v},ref:[t,w],props:p,stateAttributesMapping:g,enabled:y});return y?P:null});var _=e.i(439957);let b=r.forwardRef(function(e,t){let{className:n,render:a,delay:s,style:u,...c}=e,{imageLoadingStatus:d}=o(),[p,m]=r.useState(void 0===s),f=(0,_.e)();return r.useEffect(()=>(void 0!==s?f.start(s,()=>m(!0)):m(!0),f.clear),[f,s]),(0,i.f)("span",e,{state:{imageLoadingStatus:d},ref:t,props:c,stateAttributesMapping:l,enabled:"loaded"!==d&&(void 0===s||p)})});e.s(["Fallback",0,b,"Image",0,h,"Root",0,s],514751);var y=e.i(514751),y=y,v=y,x=y,w=e.i(196631);let j=r.forwardRef(({className:e,...r},i)=>(0,t.jsx)(y.Root,{ref:i,"data-slot":"avatar",className:(0,w.c)("relative flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full",e),...r}));j.displayName="Avatar";let P=r.forwardRef(({className:e,...r},i)=>(0,t.jsx)(v.Image,{ref:i,"data-slot":"avatar-image",className:(0,w.c)("size-full object-cover",e),...r}));P.displayName="AvatarImage";let $=r.forwardRef(({className:e,...r},i)=>(0,t.jsx)(x.Fallback,{ref:i,"data-slot":"avatar-fallback",className:(0,w.c)("flex size-full items-center justify-center rounded-full text-xs font-medium",e),...r}));$.displayName="AvatarFallback",e.s(["E",0,j,"b",0,$,"Z",0,P],799676)},747862,e=>{"use strict";var t=e.i(843476);e.i(176782),e.i(911825);var r=e.i(225913),i=e.i(196631);e.i(772436);let n=(0,r.f)("flex w-fit items-stretch *:focus-visible:relative *:focus-visible:z-raised has-[>[data-slot=button-group]]:gap-2 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-md [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1",{variants:{orientation:{horizontal:"*:data-slot:rounded-r-none [&>[data-slot]:not(:has(~[data-slot]))]:rounded-r-md! [&>[data-slot]~[data-slot]]:rounded-l-none [&>[data-slot]~[data-slot]]:border-l-0",vertical:"flex-col *:data-slot:rounded-b-none [&>[data-slot]:not(:has(~[data-slot]))]:rounded-b-md! [&>[data-slot]~[data-slot]]:rounded-t-none [&>[data-slot]~[data-slot]]:border-t-0"}},defaultVariants:{orientation:"horizontal"}});e.s(["f",0,function({className:e,orientation:r,...a}){return(0,t.jsx)("div",{role:"group","data-slot":"button-group","data-orientation":r,className:(0,i.c)(n({orientation:r}),e),...a})}])},275144,e=>{"use strict";var t=e.i(843476),r=e.i(271645),i=e.i(602869),n=e.i(411382),a=e.i(54105),o=e.i(213056),l=e.i(154626),s=e.i(782066);let u=n.z.object({values:n.z.object({logo_url:a.z.string().nullish(),logo_url_dark:a.z.string().nullish(),favicon_url:a.z.string().nullish()}),logo_url_via_proxy:o.z.boolean().optional(),logo_url_dark_via_proxy:o.z.boolean().optional()});function c(e,t){let r=u.parse(e),i=`${t??""}/get_image`;return{logoUrl:r.logo_url_via_proxy?i:r.values.logo_url||(0,s.B)(l.h),logoUrlDark:r.logo_url_dark_via_proxy?`${i}?theme=dark`:r.values.logo_url_dark||null,faviconUrl:r.values.favicon_url||null}}let d=(0,r.createContext)(void 0);e.s(["J",0,({children:e,accessToken:n})=>{let[a,o]=(0,r.useState)((0,s.B)(l.h)),[u,p]=(0,r.useState)(null),[m,f]=(0,r.useState)(null);return(0,r.useEffect)(()=>{(async()=>{try{let e=(0,i._h)(),t=e?`${e}/get/ui_theme_settings`:"/get/ui_theme_settings",r=await fetch(t,{method:"GET",headers:{"Content-Type":"application/json"}});if(r.ok){let t=c(await r.json(),e);o(t.logoUrl),p(t.logoUrlDark),f(t.faviconUrl)}}catch(e){console.warn("Failed to load theme settings from backend:",e)}})()},[]),(0,r.useEffect)(()=>{if(m){let e=document.querySelectorAll("link[rel*='icon']");if(e.length>0)e.forEach(e=>{e.href=m});else{let e=document.createElement("link");e.rel="icon",e.href=m,document.head.appendChild(e)}}},[m]),(0,t.jsx)(d.Provider,{value:{logoUrl:a,setLogoUrl:o,logoUrlDark:u,setLogoUrlDark:p,faviconUrl:m,setFaviconUrl:f},children:e})},"r",0,c,"i",0,()=>{let e=(0,r.useContext)(d);if(!e)throw Error("useTheme must be used within a ThemeProvider");return e}])},735450,e=>{"use strict";var t=e.i(411382),r=e.i(772325),i=e.i(54105),n=e.i(240192),a=e.i(138620);let o="https://docs.litellm.ai/docs/decisions",l=`${o}#supported-providers`,s=`${o}#self-hosted-laya-and-nimble`,u=new Set(["/v1/decisions","/v1/systemone"]),c=t.z.object({litellm_provider:i.z.string(),mode:i.z.string().nullish(),supported_endpoints:r.z.array(i.z.string()).nullish()}),d="decisions",p=["evaluation",d],m=e=>null!=e&&p.includes(e),f=e=>m(e.mode)||(e.supported_endpoints??[]).some(e=>u.has(e)),g=e=>{let t=n.z.record(i.z.string(),a.z.unknown()).safeParse(e);return t.success?Object.entries(t.data).flatMap(([e,t])=>{let r=c.safeParse(t);return r.success?[[e,r.data]]:[]}):[]},h={decisions:0,"self-hosted":1,"needs-upgrade":2},_=t.z.object({decision_model_providers:r.z.array(i.z.string())}),b=(e,t)=>e.model.length-t.model.length||e.model.localeCompare(t.model),y=(e,t,r)=>({row:e,routeOrder:h[e.route],rankInProvider:r.slice(0,t).filter(t=>t.provider===e.provider).length});e.s(["O",0,o,"d",0,d,"Z",0,l,"L",0,s,"B",0,"playground?tab=system-one","F",0,function(e){let t=g(e),r=t.filter(([,e])=>f(e)),i=new Map([...new Set(r.map(([,e])=>e.litellm_provider))].map(e=>{let r=t.filter(([,t])=>t.litellm_provider===e);return[e,{decisionOnly:r.every(([,e])=>f(e))}]}));return{models:new Set(r.map(([e])=>e)),providers:i}},"W",0,(e,t)=>g(e).filter(([,e])=>f(e)).map(([e,r])=>({model:e,provider:r.litellm_provider,route:t?.has(r.litellm_provider)?"decisions":(r.supported_endpoints??["/v1/decisions"]).includes("/v1/decisions")?null===t?"decisions":"needs-upgrade":"self-hosted"})).toSorted(b).map(y).toSorted((e,t)=>e.routeOrder-t.routeOrder||e.rankInProvider-t.rankInProvider||e.row.provider.localeCompare(t.row.provider)).map(({row:e})=>e),"i",0,e=>m(e)?d:e??void 0,"q",0,e=>e.flatMap(e=>e===d?p:[e]),"m",0,f,"_",0,m,"r",0,(e,t,r)=>void 0!==t&&e.providers.get(t)?.decisionOnly===!0||r.some(t=>e.models.has(t)),"P",0,e=>{let t=_.safeParse(e);return t.success?new Set(t.data.decision_model_providers):null}])},899426,e=>{"use strict";let t=e=>e.trim().toLowerCase();function r(e,r){let i=t(e);if(""===i)return!0;let n=r.filter(e=>"string"==typeof e).map(e=>e.toLowerCase());return!!n.some(e=>e.includes(i))||i.split(/\s+/).every(e=>n.some(t=>t.includes(e)))}e.s(["$",0,function(e,t,i){return e.filter(e=>r(t,i(e)))},"h",0,r,"e",0,function(e,r,i){let n=t(r);if(""===n)return[...e];let a=e=>{let t=i(e).toLowerCase();return 1e3*(t===n)+100*!!t.startsWith(n)+(1e3-t.length)};return[...e].sort((e,t)=>a(t)-a(e))}])}]);
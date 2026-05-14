function t(t,e,i,s){var n,o=arguments.length,r=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(r=(o<3?n(r):o>3?n(e,i,r):n(e,i))||r);return o>3&&r&&Object.defineProperty(e,i,r),r}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),n=new WeakMap;let o=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=n.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&n.set(e,t))}return t}toString(){return this.cssText}};const r=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new o(i,t,s)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:h,defineProperty:l,getOwnPropertyDescriptor:c,getOwnPropertyNames:d,getOwnPropertySymbols:u,getPrototypeOf:p}=Object,_=globalThis,f=_.trustedTypes,m=f?f.emptyScript:"",g=_.reactiveElementPolyfillSupport,y=(t,e)=>t,$={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},v=(t,e)=>!h(t,e),w={attribute:!0,type:String,converter:$,reflect:!1,useDefault:!1,hasChanged:v};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),_.litPropertyMetadata??=new WeakMap;let b=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=w){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&l(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:n}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const o=s?.call(this);n?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??w}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const t=this.properties,e=[...d(t),...u(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),n=e.litNonce;void 0!==n&&s.setAttribute("nonce",n),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const n=(void 0!==i.converter?.toAttribute?i.converter:$).toAttribute(e,i.type);this._$Em=t,null==n?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:$;this._$Em=s;const o=n.fromAttribute(e,t.type);this[s]=o??this._$Ej?.get(s)??o,this._$Em=null}}requestUpdate(t,e,i,s=!1,n){if(void 0!==t){const o=this.constructor;if(!1===s&&(n=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??v)(n,e)||i.useDefault&&i.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:n},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==n||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};b.elementStyles=[],b.shadowRootOptions={mode:"open"},b[y("elementProperties")]=new Map,b[y("finalized")]=new Map,g?.({ReactiveElement:b}),(_.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const A=globalThis,x=t=>t,C=A.trustedTypes,E=C?C.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",k=`lit$${Math.random().toFixed(9).slice(2)}$`,M="?"+k,P=`<${M}>`,R=document,T=()=>R.createComment(""),U=t=>null===t||"object"!=typeof t&&"function"!=typeof t,O=Array.isArray,H="[ \t\n\f\r]",L=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,N=/-->/g,D=/>/g,j=RegExp(`>|${H}(?:([^\\s"'>=/]+)(${H}*=${H}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),F=/'/g,I=/"/g,z=/^(?:script|style|textarea|title)$/i,B=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),W=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),V=new WeakMap,Y=R.createTreeWalker(R,129);function G(t,e){if(!O(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const X=(t,e)=>{const i=t.length-1,s=[];let n,o=2===e?"<svg>":3===e?"<math>":"",r=L;for(let e=0;e<i;e++){const i=t[e];let a,h,l=-1,c=0;for(;c<i.length&&(r.lastIndex=c,h=r.exec(i),null!==h);)c=r.lastIndex,r===L?"!--"===h[1]?r=N:void 0!==h[1]?r=D:void 0!==h[2]?(z.test(h[2])&&(n=RegExp("</"+h[2],"g")),r=j):void 0!==h[3]&&(r=j):r===j?">"===h[0]?(r=n??L,l=-1):void 0===h[1]?l=-2:(l=r.lastIndex-h[2].length,a=h[1],r=void 0===h[3]?j:'"'===h[3]?I:F):r===I||r===F?r=j:r===N||r===D?r=L:(r=j,n=void 0);const d=r===j&&t[e+1].startsWith("/>")?" ":"";o+=r===L?i+P:l>=0?(s.push(a),i.slice(0,l)+S+i.slice(l)+k+d):i+k+(-2===l?e:d)}return[G(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class Z{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,o=0;const r=t.length-1,a=this.parts,[h,l]=X(t,e);if(this.el=Z.createElement(h,i),Y.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=Y.nextNode())&&a.length<r;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(S)){const e=l[o++],i=s.getAttribute(t).split(k),r=/([.?@])?(.*)/.exec(e);a.push({type:1,index:n,name:r[2],strings:i,ctor:"."===r[1]?et:"?"===r[1]?it:"@"===r[1]?st:tt}),s.removeAttribute(t)}else t.startsWith(k)&&(a.push({type:6,index:n}),s.removeAttribute(t));if(z.test(s.tagName)){const t=s.textContent.split(k),e=t.length-1;if(e>0){s.textContent=C?C.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],T()),Y.nextNode(),a.push({type:2,index:++n});s.append(t[e],T())}}}else if(8===s.nodeType)if(s.data===M)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf(k,t+1));)a.push({type:7,index:n}),t+=k.length-1}n++}}static createElement(t,e){const i=R.createElement("template");return i.innerHTML=t,i}}function J(t,e,i=t,s){if(e===W)return e;let n=void 0!==s?i._$Co?.[s]:i._$Cl;const o=U(e)?void 0:e._$litDirective$;return n?.constructor!==o&&(n?._$AO?.(!1),void 0===o?n=void 0:(n=new o(t),n._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=n:i._$Cl=n),void 0!==n&&(e=J(t,n._$AS(t,e.values),n,s)),e}class K{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??R).importNode(e,!0);Y.currentNode=s;let n=Y.nextNode(),o=0,r=0,a=i[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new Q(n,n.nextSibling,this,t):1===a.type?e=new a.ctor(n,a.name,a.strings,this,t):6===a.type&&(e=new nt(n,this,t)),this._$AV.push(e),a=i[++r]}o!==a?.index&&(n=Y.nextNode(),o++)}return Y.currentNode=R,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=J(this,t,e),U(t)?t===q||null==t||""===t?(this._$AH!==q&&this._$AR(),this._$AH=q):t!==this._$AH&&t!==W&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>O(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==q&&U(this._$AH)?this._$AA.nextSibling.data=t:this.T(R.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Z.createElement(G(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new K(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=V.get(t.strings);return void 0===e&&V.set(t.strings,e=new Z(t)),e}k(t){O(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new Q(this.O(T()),this.O(T()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=x(t).nextSibling;x(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,n){this.type=1,this._$AH=q,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=q}_$AI(t,e=this,i,s){const n=this.strings;let o=!1;if(void 0===n)t=J(this,t,e,0),o=!U(t)||t!==this._$AH&&t!==W,o&&(this._$AH=t);else{const s=t;let r,a;for(t=n[0],r=0;r<n.length-1;r++)a=J(this,s[i+r],e,r),a===W&&(a=this._$AH[r]),o||=!U(a)||a!==this._$AH[r],a===q?t=q:t!==q&&(t+=(a??"")+n[r+1]),this._$AH[r]=a}o&&!s&&this.j(t)}j(t){t===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===q?void 0:t}}class it extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==q)}}class st extends tt{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){if((t=J(this,t,e,0)??q)===W)return;const i=this._$AH,s=t===q&&i!==q||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==q&&(i===q||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class nt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){J(this,t)}}const ot=A.litHtmlPolyfillSupport;ot?.(Z,Q),(A.litHtmlVersions??=[]).push("3.3.3");const rt=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class at extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let n=s._$litPart$;if(void 0===n){const t=i?.renderBefore??null;s._$litPart$=n=new Q(e.insertBefore(T(),t),t,void 0,i??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}}at._$litElement$=!0,at.finalized=!0,rt.litElementHydrateSupport?.({LitElement:at});const ht=rt.litElementPolyfillSupport;ht?.({LitElement:at}),(rt.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const lt=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},ct={attribute:!0,type:String,converter:$,reflect:!1,hasChanged:v},dt=(t=ct,e,i)=>{const{kind:s,metadata:n}=i;let o=globalThis.litPropertyMetadata.get(n);if(void 0===o&&globalThis.litPropertyMetadata.set(n,o=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),o.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const n=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,n,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const n=this[s];e.call(this,i),this.requestUpdate(s,n,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ut(t){return(e,i)=>"object"==typeof i?dt(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function pt(t){return ut({...t,state:!0,attribute:!1})}const _t="https://cdn.amcharts.com/lib/5",ft=[`${_t}/index.js`,`${_t}/xy.js`,`${_t}/radar.js`,`${_t}/themes/Animated.js`],mt={units:"celsius",width:"300px",height:"300px",chart_color:"#808080",humidity_color:"#4488cc",colored_bullets:!1,show_values:!0,show_trends:!0,show_last_updated:!0,stale_threshold:10,threshold_low:null,threshold_high:null,threshold_color:"#ff4444",min_value:null,max_value:null,rotate_chart:!1,rotate_speed:60};function gt(t,e,i){return e===i?t:"°C"===e&&"°F"===i?9*t/5+32:"°F"===e&&"°C"===i?5*(t-32)/9:t}function yt(t){return t.unit_of_measurement||"°C"}function $t(t,e){let i=t;"fahrenheit"===e&&(i=5*(t-32)/9);const s=Math.max(0,Math.min(40,i))/40;let n,o,r;if(s<.25){const t=s/.25;n=0,o=Math.round(180*t),r=Math.round(255*(1-.3*t))}else if(s<.5){const t=(s-.25)/.25;n=0,o=Math.round(180+75*t),r=Math.round(178*(1-t))}else if(s<.75){const t=(s-.5)/.25;n=Math.round(255*t),o=255,r=0}else{const t=(s-.75)/.25;n=255,o=Math.round(255*(1-t)),r=0}return"#"+((1<<24)+(n<<16)+(o<<8)+r).toString(16).slice(1)}let vt=null;class wt{constructor(t){this.root=null,this.chart=null,this.xAxis=null,this.series=null,this.humiditySeries=null,this.config=t}create(t){this.root&&this.dispose(),this.root=am5.Root.new(t),this.root._logo.dispose(),this.root.setThemes([am5themes_Animated.new(this.root)]),this.chart=this.root.container.children.push(am5radar.RadarChart.new(this.root,{panX:!1,panY:!1,wheelX:"none",wheelY:"none"}));const e=am5radar.AxisRendererCircular.new(this.root,{minGridDistance:0});e.grid.template.setAll({stroke:am5.color(16777215),strokeOpacity:.5,strokeWidth:1}),e.labels.template.setAll({fill:am5.color(16777215),fontSize:"0.8em",radius:10}),this.xAxis=this.chart.xAxes.push(am5xy.CategoryAxis.new(this.root,{maxDeviation:0,categoryField:"room",renderer:e,tooltip:am5.Tooltip.new(this.root,{})}));const i=am5radar.AxisRendererRadial.new(this.root,{minGridDistance:20});i.grid.template.setAll({stroke:am5.color(16777215),strokeOpacity:.5,strokeWidth:1}),i.labels.template.setAll({fill:am5.color(16777215),fontSize:"0.6em"});const s={renderer:i,numberFormat:"fahrenheit"===this.config.units?"#'°F'":"#'°C'"};null!=this.config.min_value&&(s.min=this.config.min_value),null!=this.config.max_value&&(s.max=this.config.max_value),null==this.config.min_value&&null==this.config.max_value||(s.strictMinMax=!0),this.chart.yAxes.push(am5xy.ValueAxis.new(this.root,s));const n=this.config.chart_color||"#808080";this.series=this.chart.series.push(am5radar.RadarLineSeries.new(this.root,{name:"Temperature",xAxis:this.xAxis,yAxis:this.chart.yAxes.getIndex(0),valueYField:"temperature",categoryXField:"room",stroke:am5.color(n),tooltip:am5.Tooltip.new(this.root,{labelText:"{valueY}"+("fahrenheit"===this.config.units?"°F":"°C")})})),this.series.strokes.template.setAll({strokeWidth:2,stroke:am5.color(n),strokeOpacity:.8}),this.series.fills.template.setAll({visible:!0,fillOpacity:.2,fill:am5.color(n)});if(null!=this.config.threshold_low||null!=this.config.threshold_high||this.config.colored_bullets){const t=this;this.series.bullets.push(function(e,i,s){const o=s.dataContext.temperature;let r=!1;null!=t.config.threshold_low&&o<t.config.threshold_low&&(r=!0),null!=t.config.threshold_high&&o>t.config.threshold_high&&(r=!0);const a=r?t.config.threshold_color||"#ff4444":t.config.colored_bullets&&s.dataContext.color?s.dataContext.color:n;return am5.Bullet.new(e,{sprite:am5.Circle.new(e,{radius:r?7:4,fill:am5.color(a)})})})}if(this.config.humidity_entities&&this.config.humidity_entities.length>0){const t=this.config.humidity_color||"#4488cc",e=am5radar.AxisRendererRadial.new(this.root,{minGridDistance:20});e.grid.template.setAll({visible:!1}),e.labels.template.setAll({visible:!1}),this.chart.yAxes.push(am5xy.ValueAxis.new(this.root,{renderer:e,min:0,max:100,strictMinMax:!0})),this.humiditySeries=this.chart.series.push(am5radar.RadarLineSeries.new(this.root,{name:"Humidity",xAxis:this.xAxis,yAxis:this.chart.yAxes.getIndex(1),valueYField:"humidity",categoryXField:"room",stroke:am5.color(t),tooltip:am5.Tooltip.new(this.root,{labelText:"{valueY}%"})})),this.humiditySeries.strokes.template.setAll({strokeWidth:2,stroke:am5.color(t),strokeOpacity:.8,strokeDasharray:[4,4]}),this.humiditySeries.fills.template.setAll({visible:!1})}if(this.config.rotate_chart){const t=this.chart,e=this.config.rotate_speed||60,i=Date.now();this.root.events.on("frameended",function(){const s=(Date.now()-i)/1e3/e*360%360;t.set("startAngle",270+s),t.set("endAngle",270+s+360)})}this.series.appear(1e3),this.humiditySeries&&this.humiditySeries.appear(1e3),this.chart.appear(1e3,100)}updateData(t,e){this.xAxis&&this.series&&(this.xAxis.data.setAll(t),this.series.data.setAll(t),this.humiditySeries&&e&&e.length>0&&this.humiditySeries.data.setAll(e))}dispose(){this.root&&(this.root.dispose(),this.root=null,this.chart=null,this.xAxis=null,this.series=null,this.humiditySeries=null)}}let bt=class extends at{async connectedCallback(){super.connectedCallback(),await this._loadHelpers()}async _loadHelpers(){this._helpers=await(window.loadCardHelpers?.())}setConfig(t){this._config=structuredClone(t)}_fireChanged(){const t=new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0});this.dispatchEvent(t)}_valueChanged(t,e){this._config[t]!==e&&(this._config={...this._config,[t]:e},this._fireChanged())}_entityChanged(t,e){const i=[...this._config.entities];i[t]={...i[t],entity:e},this._config={...this._config,entities:i},this._fireChanged()}_entityNameChanged(t,e){const i=[...this._config.entities];i[t]={...i[t],name:e},this._config={...this._config,entities:i},this._fireChanged()}_humidityEntityChanged(t,e){const i=[...this._config.humidity_entities||[]];i[t]={...i[t],entity:e},this._config={...this._config,humidity_entities:i},this._fireChanged()}_addEntity(){const t=[...this._config.entities,{entity:""}];this._config={...this._config,entities:t},this._fireChanged()}_removeEntity(t){const e=this._config.entities.filter((e,i)=>i!==t);this._config={...this._config,entities:e},this._fireChanged()}_addHumidityEntity(){const t=[...this._config.humidity_entities||[],{entity:""}];this._config={...this._config,humidity_entities:t},this._fireChanged()}_removeHumidityEntity(t){const e=(this._config.humidity_entities||[]).filter((e,i)=>i!==t);this._config={...this._config,humidity_entities:e},this._fireChanged()}render(){return this._config&&this.hass?B`
      <div class="editor">
        <div class="section">
          <h3>Temperature Entities</h3>
          ${this._config.entities.map((t,e)=>B`
              <div class="entity-row">
                <ha-entity-picker
                  .hass=${this.hass}
                  .value=${t.entity}
                  .includeDomains=${["sensor"]}
                  allow-custom-entity
                  @value-changed=${t=>this._entityChanged(e,t.detail.value)}
                ></ha-entity-picker>
                <ha-textfield
                  .value=${t.name||""}
                  placeholder="Display name"
                  @input=${t=>this._entityNameChanged(e,t.target.value)}
                ></ha-textfield>
                <ha-icon-button
                  .path=${"M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"}
                  @click=${()=>this._removeEntity(e)}
                ></ha-icon-button>
              </div>
            `)}
          <mwc-button @click=${this._addEntity}>Add Temperature Entity</mwc-button>
        </div>

        <div class="section">
          <h3>Humidity Entities (optional)</h3>
          ${(this._config.humidity_entities||[]).map((t,e)=>B`
              <div class="entity-row">
                <ha-entity-picker
                  .hass=${this.hass}
                  .value=${t.entity}
                  .includeDomains=${["sensor"]}
                  allow-custom-entity
                  @value-changed=${t=>this._humidityEntityChanged(e,t.detail.value)}
                ></ha-entity-picker>
                <ha-icon-button
                  .path=${"M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"}
                  @click=${()=>this._removeHumidityEntity(e)}
                ></ha-icon-button>
              </div>
            `)}
          <mwc-button @click=${this._addHumidityEntity}>Add Humidity Entity</mwc-button>
        </div>

        <div class="section">
          <h3>Display</h3>
          <ha-textfield
            label="Title"
            .value=${this._config.title||""}
            @input=${t=>this._valueChanged("title",t.target.value)}
          ></ha-textfield>

          <ha-select
            label="Units"
            .value=${this._config.units||"celsius"}
            @selected=${t=>this._valueChanged("units",t.target.value)}
          >
            <mwc-list-item value="celsius">Celsius</mwc-list-item>
            <mwc-list-item value="fahrenheit">Fahrenheit</mwc-list-item>
          </ha-select>

          <div class="side-by-side">
            <ha-textfield
              label="Width"
              .value=${this._config.width||"300px"}
              @input=${t=>this._valueChanged("width",t.target.value)}
            ></ha-textfield>
            <ha-textfield
              label="Height"
              .value=${this._config.height||"300px"}
              @input=${t=>this._valueChanged("height",t.target.value)}
            ></ha-textfield>
          </div>

          <div class="side-by-side">
            <div>
              <label>Chart Color</label>
              <input
                type="color"
                .value=${this._config.chart_color||"#808080"}
                @input=${t=>this._valueChanged("chart_color",t.target.value)}
              />
            </div>
            <div>
              <label>Humidity Color</label>
              <input
                type="color"
                .value=${this._config.humidity_color||"#4488cc"}
                @input=${t=>this._valueChanged("humidity_color",t.target.value)}
              />
            </div>
          </div>

          <ha-formfield label="Colored bullets">
            <ha-switch
              .checked=${this._config.colored_bullets||!1}
              @change=${t=>this._valueChanged("colored_bullets",t.target.checked)}
            ></ha-switch>
          </ha-formfield>
          <ha-formfield label="Show values on labels">
            <ha-switch
              .checked=${!1!==this._config.show_values}
              @change=${t=>this._valueChanged("show_values",t.target.checked)}
            ></ha-switch>
          </ha-formfield>
          <ha-formfield label="Show trend arrows">
            <ha-switch
              .checked=${!1!==this._config.show_trends}
              @change=${t=>this._valueChanged("show_trends",t.target.checked)}
            ></ha-switch>
          </ha-formfield>
          <ha-formfield label="Show last updated">
            <ha-switch
              .checked=${!1!==this._config.show_last_updated}
              @change=${t=>this._valueChanged("show_last_updated",t.target.checked)}
            ></ha-switch>
          </ha-formfield>
          <ha-formfield label="Rotate chart">
            <ha-switch
              .checked=${this._config.rotate_chart||!1}
              @change=${t=>this._valueChanged("rotate_chart",t.target.checked)}
            ></ha-switch>
          </ha-formfield>
        </div>

        <div class="section">
          <h3>Thresholds</h3>
          <div class="side-by-side">
            <ha-textfield
              label="Low threshold"
              type="number"
              .value=${String(this._config.threshold_low??"")}
              @input=${t=>{const e=t.target.value;this._valueChanged("threshold_low",""===e?null:parseFloat(e))}}
            ></ha-textfield>
            <ha-textfield
              label="High threshold"
              type="number"
              .value=${String(this._config.threshold_high??"")}
              @input=${t=>{const e=t.target.value;this._valueChanged("threshold_high",""===e?null:parseFloat(e))}}
            ></ha-textfield>
          </div>
          <div>
            <label>Threshold Color</label>
            <input
              type="color"
              .value=${this._config.threshold_color||"#ff4444"}
              @input=${t=>this._valueChanged("threshold_color",t.target.value)}
            />
          </div>
          <ha-textfield
            label="Stale threshold (minutes)"
            type="number"
            .value=${String(this._config.stale_threshold??10)}
            @input=${t=>{const e=t.target.value;this._valueChanged("stale_threshold",""===e?10:parseFloat(e))}}
          ></ha-textfield>
        </div>

        <div class="section">
          <h3>Axis</h3>
          <div class="side-by-side">
            <ha-textfield
              label="Min value (auto if empty)"
              type="number"
              .value=${String(this._config.min_value??"")}
              @input=${t=>{const e=t.target.value;this._valueChanged("min_value",""===e?null:parseFloat(e))}}
            ></ha-textfield>
            <ha-textfield
              label="Max value (auto if empty)"
              type="number"
              .value=${String(this._config.max_value??"")}
              @input=${t=>{const e=t.target.value;this._valueChanged("max_value",""===e?null:parseFloat(e))}}
            ></ha-textfield>
          </div>
        </div>
      </div>
    `:B``}static{this.styles=r`
    .editor {
      padding: 16px;
    }
    .section {
      margin-bottom: 24px;
    }
    .section h3 {
      margin: 0 0 12px;
      font-size: 1em;
      font-weight: 500;
      color: var(--primary-text-color);
    }
    .entity-row {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
    }
    .entity-row ha-entity-picker {
      flex: 2;
    }
    .entity-row ha-textfield {
      flex: 1;
    }
    .side-by-side {
      display: flex;
      gap: 16px;
      margin-bottom: 8px;
    }
    .side-by-side > * {
      flex: 1;
    }
    ha-textfield,
    ha-select {
      display: block;
      margin-bottom: 8px;
    }
    ha-formfield {
      display: block;
      margin-bottom: 4px;
    }
    mwc-button {
      margin-top: 8px;
    }
    label {
      display: block;
      margin-bottom: 4px;
      font-size: 0.9em;
      color: var(--secondary-text-color);
    }
    input[type='color'] {
      width: 48px;
      height: 32px;
      border: none;
      cursor: pointer;
    }
  `}};t([ut({attribute:!1})],bt.prototype,"hass",void 0),t([pt()],bt.prototype,"_config",void 0),bt=t([lt("temperature-radar-card-editor")],bt),console.info("%c TEMPERATURE-RADAR-CARD %c v1.0.0 ","color: white; background: #555; font-weight: bold;","color: white; background: #007acc; font-weight: bold;");let At=class extends at{constructor(){super(...arguments),this._error=null,this._chartManager=null,this._previousTemperatures=new Map,this._previousStates=new Map,this._lastUpdated=null,this._timestampInterval=null,this._chartReady=!1}static getConfigElement(){return document.createElement("temperature-radar-card-editor")}static getStubConfig(t){const e=Object.keys(t.states).filter(e=>e.startsWith("sensor.")&&t.states[e].attributes.unit_of_measurement&&["°C","°F"].includes(t.states[e].attributes.unit_of_measurement)).slice(0,4).map(t=>({entity:t}));return{entities:e.length>0?e:[{entity:""}]}}getCardSize(){const t=parseInt(this._config?.height||"300",10);return Math.ceil(t/50)+1}getGridOptions(){return{rows:this.getCardSize(),min_rows:3,columns:4,min_columns:2}}set hass(t){const e=this._hass;this._hass=t,this._chartReady&&this._hasRelevantStateChange(e,t)&&this._processStates()}get hass(){return this._hass}setConfig(t){if(!t.entities||!Array.isArray(t.entities)||0===t.entities.length)throw new Error("Please define at least one entity");for(const e of t.entities)if(!e.entity)throw new Error('Each entity must have an "entity" field');if(t.humidity_entities){if(!Array.isArray(t.humidity_entities))throw new Error('"humidity_entities" must be an array');for(const e of t.humidity_entities)if(!e.entity)throw new Error('Each humidity entity must have an "entity" field')}this._config=structuredClone({...mt,...t})}connectedCallback(){super.connectedCallback(),this._timestampInterval=setInterval(()=>{this._updateTimestamp()},6e4)}disconnectedCallback(){super.disconnectedCallback(),this._timestampInterval&&(clearInterval(this._timestampInterval),this._timestampInterval=null),this._chartManager&&(this._chartManager.dispose(),this._chartManager=null,this._chartReady=!1)}shouldUpdate(t){return!(!t.has("_config")&&!t.has("_error"))}firstUpdated(t){this._initChart()}async _initChart(){try{await(window.am5?Promise.resolve():vt||(vt=ft.reduce((t,e)=>t.then(()=>new Promise((t,i)=>{const s=document.querySelector(`script[src="${e}"]`);if(s)return void("true"===s.dataset.loaded?t():(s.addEventListener("load",()=>t()),s.addEventListener("error",()=>i(new Error(`Failed to load ${e}`)))));const n=document.createElement("script");n.src=e,n.onload=()=>{n.dataset.loaded="true",t()},n.onerror=()=>i(new Error(`Failed to load ${e}`)),document.head.appendChild(n)})),Promise.resolve()),vt));const t=this.shadowRoot?.getElementById("chart-container");if(!t)return;this._chartManager=new wt(this._config),this._chartManager.create(t),this._chartReady=!0,this._hass&&this._processStates()}catch(t){this._error=`Failed to load chart library: ${t.message}`}}_hasRelevantStateChange(t,e){if(!t)return!0;const i=[...this._config.entities,...this._config.humidity_entities||[]];for(const s of i){const i=t.states[s.entity],n=e.states[s.entity];if(!i&&n)return!0;if(i&&n&&i.state!==n.state)return!0}return!1}_processStates(){if(!this._hass)return;const t="fahrenheit"===this._config.units?"°F":"°C",e="fahrenheit"===this._config.units?"°F":"°C",i=[];for(const s of this._config.entities){const n=this._hass.states[s.entity];if(!n||"unavailable"===n.state||"unknown"===n.state)continue;const o=parseFloat(n.state);if(isNaN(o))continue;const r=gt(o,yt(n.attributes),t);let a=s.name||n.attributes.friendly_name||s.entity;if(this._config.show_values){let t=`${Math.round(10*r)/10}${e}`;if(this._config.show_trends){const e=this._previousTemperatures.get(s.entity);if(void 0!==e){const i=r-e;i>.1?t+=" ▲":i<-.1&&(t+=" ▼")}}a+="\n"+t}i.push({room:a,temperature:r,color:$t(r,this._config.units||"celsius"),unit_of_measurement:t}),this._previousTemperatures.set(s.entity,r),this._previousStates.set(s.entity,n.state)}let s;if(this._config.humidity_entities&&this._config.humidity_entities.length>0){s=[];for(const t of this._config.humidity_entities){const e=this._hass.states[t.entity];if(!e||"unavailable"===e.state||"unknown"===e.state)continue;const n=parseFloat(e.state);if(isNaN(n))continue;const o=t.name||e.attributes.friendly_name||t.entity,r=i.find(t=>t.room.startsWith(o));s.push({room:r?r.room:o,humidity:n}),this._previousStates.set(t.entity,e.state)}}i.length>0&&(this._lastUpdated=new Date,this._chartManager?.updateData(i,s),this._updateTimestamp())}_updateTimestamp(){if(!this._config.show_last_updated||!this._lastUpdated)return;const t=this.shadowRoot?.getElementById("updated-label");if(!t)return;t.textContent=`Updated ${function(t){const e=Math.floor((Date.now()-t.getTime())/1e3);if(e<60)return"just now";const i=Math.floor(e/60);return i<60?`${i} min ago`:`${Math.floor(i/60)}h ${i%60}m ago`}(this._lastUpdated)}`;(Date.now()-this._lastUpdated.getTime())/6e4>(this._config.stale_threshold||10)?t.classList.add("stale"):t.classList.remove("stale")}render(){if(this._error)return B`<ha-card>
        <div class="error">${this._error}</div>
      </ha-card>`;if(!this._config)return B``;const t="number"==typeof this._config.width?`${this._config.width}px`:this._config.width||"300px",e="number"==typeof this._config.height?`${this._config.height}px`:this._config.height||"300px";return B`
      <ha-card .header=${this._config.title||""}>
        <div class="card-content">
          <div
            id="chart-container"
            style="width:${t};height:${e};margin:0 auto;"
          ></div>
          ${this._config.show_last_updated?B`<div id="updated-label" class="updated-label"></div>`:""}
        </div>
      </ha-card>
    `}static{this.styles=r`
    :host {
      display: block;
    }
    .card-content {
      padding: 16px;
    }
    .updated-label {
      text-align: center;
      font-size: 0.8em;
      color: var(--secondary-text-color, #888);
      margin-top: 8px;
    }
    .updated-label.stale {
      color: var(--warning-color, #ff8800);
    }
    .error {
      padding: 16px;
      color: var(--error-color, #db4437);
    }
  `}};t([pt()],At.prototype,"_config",void 0),t([pt()],At.prototype,"_error",void 0),At=t([lt("temperature-radar-card")],At),window.customCards=window.customCards||[],window.customCards.push({type:"temperature-radar-card",name:"Temperature Radar Card",description:"Multi-room temperature radar/spider chart using amCharts 5",preview:!0,documentationURL:"https://github.com/sanghviharshit/temperature-radar-card"});export{At as TemperatureRadarCard};

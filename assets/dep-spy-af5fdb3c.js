var S=Object.defineProperty;var Q=(e,t,s)=>t in e?S(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s;var r=(e,t,s)=>(Q(e,typeof t!="symbol"?t+"":t,s),s);const O={},W={};var N="https://registry.npmmirror.com",J="https://github.com",A=/^(@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/i,B=["name","version","size","resolvePath","description","dependencies","peerDependencies"];function _(e,t){let s="",n="";return F()||(s=(void 0)(j(e,t),"package.json"),n=(void 0)(s)),[s,n]}function j(e,t){if((void 0)((void 0)(t,"node_modules")),process.cwd()!=t)return t=(void 0)(t,"../"),j(e,t);throw new Error(`Cannot find module '${e}' from '${t}'`)}function F(){return(void 0)((void 0)(process.cwd(),"node_modules",".pnpm"))}function G(e){let t=(void 0)(e,"utf8");return JSON.parse(t)}var b=typeof window<"u";async function I(e="",t={}){let{size:s,baseDir:n}=t,i;switch(U(e)){case 0:case 1:{i=b?await R(e):await K(e,n,s);break}case 2:i=JSON.parse(e);break;default:if(b)throw new Error("invalid parameter");i=V()}return L(i)}function V(){let e=G((void 0)(process.cwd(),"package.json"));return e.resolvePath=process.cwd(),e}async function R(e){let t;return e.endsWith("$")?(e=e.replace(/\$/g,""),t=`${N}/${e}`):t=`${N}/${e}/latest`,await fetch(t).then(s=>s.json())}async function K(e,t,s){let[n,i]=_(e,t),o=G(n);return s&&(o.size=E(n,["node_modules"])),o.resolvePath=i,o}function E(e,t=[]){(void 0)(e).isDirectory()||(e=(void 0)(e));let s=0,n=(void 0)(e);for(let i=0;i<n.length;i++){if(t.includes(n[i]))continue;let o=(void 0)(e,n[i]),a=(void 0)(o);a.isDirectory()?s+=E(o,t):s+=a.size}return s}function L(e){let t=typeof window<"u",s={};return B.forEach(n=>{if(t&&e.dist&&n==="size")s[n]=e.dist[n];else if(t&&e[n]&&n==="dependencies"){let i=e[n],o={};Object.keys(i).forEach(a=>{o[a]=`${a}/$${i[a]}$`}),s[n]=o}else e[n]&&(s[n]=e[n])}),s}function U(e){if(e=e==null?void 0:e.trim(),!e)return 3;if(e.startsWith(J))return 0;if(e.startsWith("{"))return 2;if(A.test(e))return 1;throw new Error("Invalid info type")}var z=typeof window<"u",X=W.Worker,q=class{constructor(e,t,s){r(this,"resultArray",[]);r(this,"taskQueue",[]);r(this,"tasksNumber",0);r(this,"workersPool",new Map);r(this,"taskIndexMap");r(this,"closePool");if(this.maxPoolSize=e,this.path=t,this.completeTask=s,!z)for(let n=0;n<e;n++)this.createWorker()}createWorker(){let e=new X(O.resolve(__dirname,this.path));e.on("message",t=>{this.addToResult(t,e),this.runNextTask(e)}),e.on("error",t=>{console.error(t),this.addToResult(null,e),this.runNextTask(e)}),this.workersPool.set(e,null)}runNextTask(e){if(this.taskQueue.length!==0){let t=this.taskQueue.shift();this.workersPool.set(e,t),e.postMessage(t);return}this.tasksNumber===0&&this.closePool(this.resultArray)}run(){if(z){if(!this.completeTask)return console.warn("浏览器状态下无处理函数"),Promise.reject("浏览器状态下无处理函数");let e=this.taskQueue.map(t=>this.completeTask(...t));return this.taskQueue=[],Promise.all(e)}return new Promise(e=>{this.closePool=e,this.tasksNumber=this.taskQueue.length,this.resultArray=new Array(this.tasksNumber),this.createTaskIndex();for(let[t]of this.workersPool)this.runNextTask(t)})}addToTaskQueue(e){this.taskQueue.push(e)}createTaskIndex(){this.taskIndexMap=new Map(this.taskQueue.map((e,t)=>[e,t]))}addToResult(e,t){this.tasksNumber--;let s=this.workersPool.get(t),n=this.taskIndexMap.get(s);this.resultArray[n]=e}},H=typeof window<"u",T,y;H||(T=process.cwd(),y=(void 0)(T),(void 0)(y.absoluteBaseUrl,y.paths));const x={};var Y={depth:3,size:!1,entry:null,output:{graph:"ds.graph.json",staticGraph:"ds.static.json",circularDependency:"ds.circular.json",codependency:"ds.co.json"}},Z=typeof window<"u",D=class{constructor(e,t={},s){r(this,"graph");r(this,"cache",new Map);r(this,"paths",[]);r(this,"pathsSet",new Set);r(this,"resolvePaths",[]);r(this,"codependency",new Map);r(this,"circularDependency",new Set);this.info=e,this.config=t,this.pool=s,Z||this.resolvePaths.push(process.cwd())}async initGraph(e){const{name:t,version:s,size:n,resolvePath:i,dependencies:o,description:a}=e,c=t+s;if(this.cache.has(c)){const h=this.cache.get(c);h.cache=c;const d=this.cloneCache(this.cache.get(c),[...this.paths,t],[...this.paths,t]);return this.codependency.has(c)?this.codependency.get(c).push(d):this.codependency.set(c,[this.cache.get(c),d]),d}if(!o)return new g(t,s,{},[...this.paths,t],0,{description:a,size:n});if(this.pathsSet.has(t)){const h=new g(t,s,{},[...this.paths,t],1/0,{description:a,circlePath:[...this.paths,t],size:n});return this.circularDependency.add(h),h}const l={};let p=n;const w=new g(t,s,l,[...this.paths,t],0,{description:a}),k=Object.entries(o);this.paths.push(t),this.pathsSet.add(t),this.resolvePaths.push(i);const m=[];for(let h=0;h<k.length&&!(this.config.depth&&this.paths.length==this.config.depth);h++){const[d,u]=k[h];m.push(u),this.pool.addToTaskQueue([d,{baseDir:this.resolvePaths.slice(-1)[0],size:this.config.size}])}const v=await this.pool.run();for(let h=0;h<v.length;h++){const d=v[h];if(!d)continue;const u=await this.initGraph(d),f=m[h];let P;if(f.endsWith("$")){const M=f.indexOf("$");P=f.slice(M+1,-1)}u.declarationVersion=P||f,p+=u.size;const C=u.name+u.version;u.circlePath||this.cache.set(C,u),l[u.name]=u,w.childrenNumber+=(u.childrenNumber===1/0?0:u.childrenNumber)+1}return this.paths.pop(),this.pathsSet.delete(t),this.resolvePaths.pop(),w.size=p,w}cloneCache(e,t,s){const n={...e,path:t,cacheParentPath:s,dependencies:{}};return Object.entries(e.dependencies).forEach(([i,o])=>{n.dependencies[i]=this.cloneCache(o,[...t,i],s)}),n}async getGraph(){return await this.ensureGraph(),this.graph}async getCodependency(){return await this.ensureGraph(),Object.fromEntries(this.codependency)}async getCircularDependency(){return await this.ensureGraph(),Array.from(this.circularDependency)}async outputToFile(){await this.ensureGraph();const{graph:e,circularDependency:t,codependency:s}=this.config.output;e&&this.writeJson(await this.getGraph(),e),t&&this.writeJson(await this.getCircularDependency(),t),s&&this.writeJson(await this.getCodependency(),s)}async ensureGraph(){if(!this.graph){const e=await I(this.info);this.graph=await this.initGraph(e)}}writeJson(e,t){(void 0)((void 0)(process.cwd(),t),JSON.stringify(e,(s,n)=>s==="childrenNumber"&&n===1/0?"Infinity":n),{flag:"w"})}},g=class{constructor(e,t,s,n,i,o){r(this,"declarationVersion");r(this,"size");r(this,"description");r(this,"circlePath");return this.name=e,this.version=t,this.dependencies=s,this.path=n,this.childrenNumber=i,Object.entries(o).forEach(([a,c])=>{c&&(this[a]=c)}),new Proxy(this,{set:function(a,c,l,p){return l?Reflect.set(a,c,l,p):!0}})}},$=new q(x.cpus?x.cpus().length:0,"./workers/moduleInfoWorker.js",I);function te(e,t=Y){let s=null;return e?s=new D(e,t,$):s=new D("",t,$),s}export{te as g};

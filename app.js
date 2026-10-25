(async()=>{
const SYNC=["extra","hide","pst","cfg","site","ofr","demo","hero","txt","vis","slides","pages","ord"];let REM={},API_OK=false,CSRF="",ME={admin:false};
try{const r=await fetch("/api/state",{credentials:"same-origin"});if(r.ok&&(r.headers.get("content-type")||"").includes("json")){REM=await r.json();API_OK=true;try{ME=await(await fetch("/api/me",{credentials:"same-origin"})).json()}catch(e){}CSRF=ME.csrf||""}}catch(e){}

const CFG={shop:"Thread & Trend",addr:"অনলাইন ফ্যাশন স্টোর, ঢাকা",tel:"01XXXXXXXXX",wa:"8801XXXXXXXXX",email:"hello@threadandtrend.example"};
// [brand, model, cond(new/used), grade, official, price, oldPrice, সাইজ, ROM, CPU, ফিট, rating, reviews, color]
const RAW=[
['নারীদের', 'Floral Midi Dress', 'new', 'New', 1, 1890, 2490, 'S–XL', 'Rayon', 'Soft flowy', 'Regular fit', 4.9, 128, 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=85'],
['নারীদের', 'Embroidered Kurti', 'new', 'New', 1, 1490, 1790, 'S–XXL', 'Cotton', 'Embroidered', 'Straight fit', 4.8, 96, 'https://images.unsplash.com/photo-1583391733956-6c78276477e8?auto=format&fit=crop&w=800&q=85'],
['কিশোরী', 'Oversized Graphic Tee', 'used', 'Sale', 0, 690, 890, 'XS–XL', 'Cotton jersey', 'Graphic print', 'Oversized', 4.7, 41, 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=85'],
['কিশোর', 'Relaxed Fit Cargo Pants', 'new', 'New', 0, 1290, 0, '28–36', 'Cotton twill', 'Utility cargo', 'Relaxed fit', 4.5, 37, 'https://images.unsplash.com/photo-1517438476312-10d79c077509?auto=format&fit=crop&w=800&q=85'],
['নারীদের', 'Pastel Co-ord Set', 'new', 'New', 1, 1790, 2190, 'S–XL', 'Linen blend', 'Two-piece set', 'Relaxed fit', 4.8, 210, 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=85'],
['নারীদের', 'Printed Cotton Three-Piece', 'new', 'New', 1, 2390, 0, 'S–XXL', 'Cotton', 'Printed', 'Classic fit', 4.6, 52, 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=85'],
['কিশোরী', 'Denim Jacket', 'new', 'New', 1, 1590, 0, 'XS–XL', 'Denim', 'Button front', 'Regular fit', 4.5, 88, 'https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=800&q=85'],
['নারীদের', 'Elegant Abaya', 'new', 'New', 1, 2690, 2990, 'M–XXL', 'Nida fabric', 'Minimal', 'Loose fit', 4.6, 63, 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&w=800&q=85'],
['কিশোরী', 'Pleated Skirt', 'used', 'Sale', 1, 990, 1190, 'XS–L', 'Poly blend', 'Pleated', 'A-line', 4.4, 45, 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=800&q=85'],
['কিশোর', 'Oversized Hoodie', 'new', 'New', 1, 1390, 1590, 'S–XXL', 'Fleece cotton', 'Solid color', 'Oversized', 4.5, 71, 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=85'],
['নারীদের', 'Everyday Long Top', 'new', 'New', 1, 890, 1090, 'S–XXL', 'Cotton', 'Minimal', 'Relaxed fit', 4.5, 154, 'https://images.unsplash.com/photo-1566206091558-7f218b696731?auto=format&fit=crop&w=800&q=85'],
['কিশোরী', 'Wide-Leg Denim Jeans', 'new', 'New', 0, 1490, 1790, '26–34', 'Denim', 'Classic wash', 'Wide-leg', 4.6, 118, 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=85'],
['নারীদের', 'Satin Evening Dress', 'new', 'New', 0, 2290, 2590, 'S–XL', 'Satin', 'Evening wear', 'Slim fit', 4.4, 176, 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=85'],
['কিশোর', 'Basic Polo T-Shirt', 'used', 'Sale', 0, 590, 0, 'S–XXL', 'Piqué cotton', 'Solid polo', 'Regular fit', 4.5, 29, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=85'],
['কিশোরী', 'Cropped Sweatshirt', 'new', 'New', 1, 990, 1190, 'XS–XL', 'Fleece', 'Minimal', 'Cropped fit', 4.2, 82, 'https://images.unsplash.com/photo-1554568218-0f1715e72254?auto=format&fit=crop&w=800&q=85'],
['কিশোর', 'Everyday Chinos', 'new', 'New', 1, 1190, 1290, '28–38', 'Cotton stretch', 'Plain', 'Slim straight', 4.1, 57, 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=85'],
['নারীদের', 'Floral Summer Top', 'used', 'Sale', 1, 790, 0, 'S–XL', 'Viscose', 'Floral print', 'Regular fit', 4.1, 94, 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?auto=format&fit=crop&w=800&q=85'],
['কিশোরী', 'Denim Mini Skirt', 'new', 'New', 0, 1090, 1290, 'XS–XL', 'Denim', 'Classic blue', 'A-line', 4.2, 33, 'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?auto=format&fit=crop&w=800&q=85'],
['কিশোর', 'Zip-Up Track Jacket', 'new', 'New', 1, 1690, 0, 'S–XXL', 'Poly cotton', 'Zip-up', 'Regular fit', 4.0, 64, 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=85'],
['নারীদের', 'Premium Occasion Dress', 'new', 'New', 0, 3290, 3590, 'S–XL', 'Chiffon blend', 'Occasion wear', 'Flowy fit', 4.7, 58, 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=85'],
['ইউনিসেক্স', 'Minimal Sweatshirt', 'new', 'New', 0, 1190, 1390, 'S–XXL', 'Cotton fleece', 'Minimal', 'Relaxed fit', 4.4, 27, 'https://images.unsplash.com/photo-1578681994506-b8f463449011?auto=format&fit=crop&w=800&q=85']
];
const BASE=RAW.map((r,i)=>({id:i,b:r[0],m:r[1],c:r[2],g:r[3],off:!!r[4],p:r[5],o:r[6],ram:r[7],rom:r[8],cpu:r[9],gpu:r[10],r:r[11],n:r[12],col:r[13],d:1,cat:/dress|kurti|abaya|top|three-piece|co-ord|satin|floral|occasion/i.test(r[1])?"নারীদের পোশাক":/teen|cargo|hoodie|denim|polo|chinos|sweatshirt|skirt|jacket/i.test(r[1])?"কিশোরদের ফ্যাশন":"ক্যাজুয়াল ওয়্যার"}));
const esc=s=>String(s).replace(/[<>&"'`]/g,"");
const ls=(k,d)=>{if(API_OK&&SYNC.includes(k)){const v=REM[k];return v===undefined?d:v}try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}};
const lsSet=(k,v)=>{if(API_OK&&SYNC.includes(k)){REM[k]=v;queueSave();return true}try{localStorage.setItem(k,JSON.stringify(v));return true}catch(e){return false}};
let sq;function queueSave(){clearTimeout(sq);sq=setTimeout(async()=>{try{const r=await fetch("/api/state",{method:"PUT",headers:{"content-type":"application/json","x-csrf-token":CSRF},credentials:"same-origin",body:JSON.stringify(REM)});
  if(r.ok)toast("☁️ সার্ভারে সংরক্ষিত");else if(r.status===401){ADM=false;render();toast("সেশন শেষ – আবার লগইন করুন")}else{const j=await r.json().catch(()=>({}));toast("⚠️ "+(j.error||"সংরক্ষণ হয়নি"))}}catch(e){toast("⚠️ ইন্টারনেট সমস্যা – সংরক্ষণ হয়নি")}},500)}
function apiLogout(){fetch("/api/logout",{method:"POST",headers:{"x-csrf-token":CSRF},credentials:"same-origin"}).catch(()=>{})}
let ADM=false;try{ADM=sessionStorage.getItem("adm")==="1"}catch(e){}if(API_OK)ADM=!!ME.admin;
let EXTRA=ls("extra",[]),HIDE=ls("hide",[]),P=[];
Object.assign(CFG,ls("cfg",{}));
let PS=ls("pst",{}),CQ=ls("cq",{}),DEMO=ls("demo","1"),PEND=[];const build=()=>{P=BASE.filter(b=>!EXTRA.some(e=>e.id===b.id)).concat(EXTRA).filter(p=>!HIDE.includes(p.id)&&!(p.d&&DEMO==="0")&&(ADM||!(PS[p.id]&&PS[p.id].h)))};
const byId=id=>P.find(p=>p.id===id);
build();
let BR=["নারীদের","কিশোরী","কিশোর","ইউনিসেক্স"];
let CONDS=[["all","সব পোশাক"],["new","নতুন কালেকশন"],["used","সেল / ক্লিয়ারেন্স"],["off","নারীদের"],["unoff","কিশোরদের"]];
let RANGES=[["সব বাজেট",0,Infinity],["৳500 এর নিচে",0,500],["৳500–1,000",500,1000],["৳1,000–2,000",1000,2000],["৳2,000+",2000,Infinity]];
let LIM=6;
const S={q:"",c:"all",b:"",cat:"",min:0,max:Infinity,rg:0,deal:false,open:false};
let cart=[];
try{cart=JSON.parse(localStorage.getItem("cart")||"[]")}catch(e){}
const $=id=>document.getElementById(id);
const fmt=n=>"৳ "+n.toLocaleString("en-IN");
const bn=n=>n.toLocaleString("en-IN");
const save=()=>{try{localStorage.setItem("cart",JSON.stringify(cart))}catch(e){}};

let _id=0;
const shade=(h,a)=>{const n=parseInt(h.slice(1),16)||0,f=x=>Math.max(0,Math.min(255,Math.round(x+a)));return"#"+[n>>16,n>>8&255,n&255].map(x=>f(x).toString(16).padStart(2,"0")).join("")};
function phoneSvg(c,b,v){
  if(/^(https?:|data:|\/api\/img\/)/.test(c))return `<img src="${c.replace(/"/g,"%22")}" alt="${esc(b||"পোশাক")}" loading="lazy" data-b="${esc(b||"")}" class="h-full w-full object-contain">`;
  const k=++_id,c0=/^#[0-9a-f]{6}$/i.test(c)?c:"#4b5563",hi=shade(c0,60),lo=shade(c0,-55),d=b==="নারীদের"?"a":b==="কিশোর"?"s":b==="ইউনিসেক্স"?"g":/^(OnePlus|Oppo|Realme|Vivo)$/.test(b)?"r":"x";
  const lens=(x,y,r)=>`<circle cx="${x}" cy="${y}" r="${r+1.3}" fill="#1f2937"/><circle cx="${x}" cy="${y}" r="${r}" fill="url(#l${k})"/><circle cx="${x-r/3}" cy="${y-r/3}" r="${r/4}" fill="#fff" opacity=".6"/>`;
  const defs=`<defs><linearGradient id="b${k}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${hi}"/><stop offset=".55" stop-color="${c0}"/><stop offset="1" stop-color="${lo}"/></linearGradient><linearGradient id="w${k}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${shade(c0,25)}"/><stop offset="1" stop-color="#0b1220"/></linearGradient><radialGradient id="l${k}"><stop offset="0" stop-color="#60a5fa"/><stop offset=".5" stop-color="#0b1220"/><stop offset="1" stop-color="#000"/></radialGradient></defs>`;
  const body=`<rect x="26" y="4" width="48" height="112" rx="9" fill="url(#b${k})"/><rect x="24.6" y="30" width="1.4" height="10" rx=".7" fill="${lo}"/><rect x="74" y="26" width="1.4" height="16" rx=".7" fill="${lo}"/><rect x="74" y="48" width="1.4" height="9" rx=".7" fill="${lo}"/>`;
  const cam={a:`<rect x="30" y="8" width="23" height="23" rx="6" fill="#fff" opacity=".16"/>${lens(36,14,3.6)}${lens(46,14,3.6)}${lens(41,24,3.6)}<circle cx="48" cy="25" r="1.4" fill="#fde68a"/>`,
   s:`${lens(37,15,3.6)}${lens(37,26,3.6)}${lens(37,37,3.6)}<circle cx="46" cy="13" r="1.3" fill="#fde68a"/>`,
   g:`<rect x="26" y="17" width="48" height="13" fill="#0b1220" opacity=".9"/>${lens(38,23.5,3.6)}${lens(50,23.5,3.6)}<rect x="58" y="21" width="8" height="5" rx="2.5" fill="#fff" opacity=".25"/>`,
   r:`<circle cx="39" cy="19" r="11.5" fill="#fff" opacity=".16"/>${lens(35,15,3.4)}${lens(44,15,3.4)}${lens(39.5,24,3.4)}`,
   x:`<rect x="30" y="8" width="20" height="20" rx="5" fill="#0b1220" opacity=".75"/>${lens(36,14,3.6)}${lens(44,22,3.6)}<circle cx="45" cy="13" r="1.3" fill="#fde68a"/>`}[d];
  const back=`<rect x="28" y="6" width="9" height="108" rx="4.5" fill="#fff" opacity=".12"/>${cam}`;
  const front=`<rect x="29" y="7" width="42" height="106" rx="7" fill="#05080f"/><rect x="30.2" y="8.2" width="39.6" height="103.6" rx="6" fill="url(#w${k})"/><text x="50" y="44" font-size="13" font-weight="700" fill="#fff" text-anchor="middle" font-family="Inter,sans-serif">9:41</text><text x="50" y="53" font-size="3.6" fill="#fff" opacity=".8" text-anchor="middle" font-family="sans-serif">Mon, 20 Oct</text>${d==="a"?'<rect x="41" y="11" width="18" height="5" rx="2.5" fill="#000"/>':'<circle cx="50" cy="12.5" r="2" fill="#000"/>'}<rect x="34" y="78" width="32" height="11" rx="3" fill="#fff" opacity=".14"/><rect x="34" y="92" width="15" height="11" rx="3" fill="#fff" opacity=".14"/><rect x="51" y="92" width="15" height="11" rx="3" fill="#fff" opacity=".14"/><path d="M30 8H52L30 60Z" fill="#fff" opacity=".07"/>`;
  return `<svg viewBox="0 0 100 120" class="h-full w-full" role="img" aria-label="${esc(b||"")} phone">${defs}${body}${v==="b"?back:front}</svg>`}
const viewsOf=p=>p.imgs&&p.imgs.length?p.imgs.map(u=>[u,p.b]):(/^(https?:|data:|\/api\/img\/)/.test(p.col)?[[p.col,p.b]]:[[p.col,p.b,"f"],[p.col,p.b,"b"]]);
document.addEventListener("error",e=>{const t=e.target;if(t&&t.tagName==="IMG"&&t.dataset.b!==undefined){const d=document.createElement("div");d.className="h-full w-full";d.innerHTML=phoneSvg("#4b5563",t.dataset.b);t.replaceWith(d)}},true);
const stars=r=>"★".repeat(Math.round(r))+"☆".repeat(5-Math.round(r));

function filtered(){
  const w=S.q.split(/\s+/).filter(Boolean);
  const r=P.filter(p=>{
    const c=S.c==="all"||(S.c==="new"&&p.c==="new")||(S.c==="used"&&p.c==="used")||(S.c==="off"&&p.off)||(S.c==="unoff"&&!p.off);
    const hay=(p.b+" "+p.m+" "+p.cpu+" "+p.gpu+" "+p.ram+"gb "+p.rom+"gb").toLowerCase();
    return c&&(!S.b||p.b===S.b)&&p.p>=S.min&&p.p<=S.max&&(!S.deal||p.o>p.p)&&(!S.cat||p.cat===S.cat)&&w.every(x=>hay.includes(x));
  });
  if(S.sort==="pa")r.sort((a,b)=>a.p-b.p);else if(S.sort==="pd")r.sort((a,b)=>b.p-a.p);else if(S.sort==="rt")r.sort((a,b)=>b.r-a.r);else if(S.min>0||S.max<Infinity)r.sort((a,b)=>b.p-a.p);
  return r;
}

function card(p){
  const inC=cart.includes(p.id);
  const badge=p.c==="new"?"bg-emerald-50 text-emerald-700":"bg-amber-50 text-amber-700";
  return `<article data-open="${p.id}" class="card flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white ${PS[p.id]&&PS[p.id].h?"opacity-50":""}">
    <div class="relative aspect-square bg-gray-50 p-4">
      <span class="absolute left-2 top-2 rounded-md px-2 py-0.5 text-[11px] font-bold ${badge}">${p.c==="new"?"New":"কালেকশন "+p.g}</span>
      ${p.o?`<span class="absolute right-2 top-2 rounded-md bg-blue-50 px-1.5 py-0.5 text-[10px] font-semibold text-blue-700 cf-off">Women’s</span>`:""}${p.d?`<span class="absolute bottom-2 left-2 rounded-md bg-slate-900/80 px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-white">DEMO</span>`:""}${PS[p.id]&&PS[p.id].s?`<div class="absolute inset-0 flex items-center justify-center bg-white/60"><span class="-rotate-12 rounded-lg bg-rose-600 px-3 py-1 text-sm font-bold text-white">বিক্রি হয়ে গেছে</span></div>`:""}${ADM?`<button data-pm="${p.id}" class="absolute bottom-2 right-2 z-[1] flex h-8 w-8 items-center justify-center rounded-full bg-white text-lg font-bold shadow ring-1 ring-gray-200">⋮</button>`:""}
      ${phoneSvg(p.col,p.b)}
    </div>
    <div class="flex flex-1 flex-col p-3">
      <div class="text-[11px] font-medium text-gray-500 cf-brand">${p.b}</div>
      <h3 class="text-sm font-semibold leading-snug">${p.m}</h3>
      <div class="mt-1 text-[11px] text-amber-500 cf-rat">${p.r?stars(p.r)+` <span class="text-gray-500">${p.r.toLocaleString("en-IN")} (${bn(p.n)})</span>`:""}</div>
      <div class="mt-1.5 space-y-0.5 text-[11px] text-gray-600">
        ${p.ram||p.rom?`<div class="cf-ram">💾 ${p.ram?String(p.ram)+" সাইজ":""}${p.ram&&p.rom?" · ":""}${p.rom?String(p.rom)+" ফেব্রিক":""}</div>`:""}
        ${p.cpu?`<div class="truncate cf-cpu">⚙️ ${p.cpu}</div>`:""}
        ${p.gpu?`<div class="truncate cf-gpu">🎮 ${p.gpu}</div>`:""}
      </div>
      <div class="mt-auto pt-2">
        ${p.o>p.p?`<div class="flex items-center gap-1.5 cf-old"><span class="text-xs text-gray-400 line-through">${fmt(p.o)}</span><span class="rounded-md bg-rose-50 px-1.5 py-0.5 text-[11px] font-bold text-rose-600">-${Math.round((1-p.p/p.o)*100)}%</span></div>`:""}<div class="text-base font-bold ${p.o>p.p?"text-rose-600":"text-gray-900"}">${fmt(p.p)}</div>
        <button data-id="${p.id}" class="cf-btn rs mt-2 w-full rounded-lg py-2 text-xs font-semibold active:scale-95 ${PS[p.id]&&PS[p.id].s?"pointer-events-none opacity-40 ":""}${inC?"bg-emerald-600 text-white":"border border-gray-900 text-gray-900"}">${inC?"বুক করা হয়েছে ✓":"স্টোরে বুক করুন"}</button>
      </div>
    </div></article>`;
}

function render(){
  const all=filtered(),list=S.open?all:all.slice(0,LIM);
  $("grid").innerHTML=list.map(card).join("");
  $("empty").classList.toggle("hidden",all.length>0);
  $("count").textContent=bn(all.length)+"টি পোশাক পাওয়া গেছে"+(S.b?" · "+S.b:"")+(S.deal?" · ধামাকা অফার":"");
  const m=$("more");m.classList.toggle("hidden",all.length<=LIM);m.classList.toggle("flex",all.length>LIM);
  $("moreT").textContent=S.open?"কম দেখুন":"আরও "+bn(all.length-LIM)+"টি পোশাক দেখুন";
  $("arr").style.transform=S.open?"rotate(180deg)":"";
  $("conds").innerHTML=(P.some(p=>p.o>p.p)?`<button class="pill ${S.deal?"on":""}" data-o="1" style="${S.deal?"":"border-color:#f59e0b;color:#b45309;background:#fffbeb"}">🔥 অফার</button>`:"")+CONDS.map(c=>`<button class="pill ${S.c===c[0]?"on":""}" data-c="${c[0]}">${c[1]}</button>`).join("");
  $("brands").innerHTML=[...new Set([...BR,...P.map(p=>p.b)])].map(b=>`<button data-b="${b}" class="rounded-xl border px-1 py-2.5 text-xs font-semibold transition ${S.b===b?"border-gray-900 bg-gray-900 text-white":"border-gray-200 bg-gray-50 text-gray-800"}"><span class="mb-1 mx-auto flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold ${S.b===b?"bg-white text-gray-900":"bg-white text-gray-700 border border-gray-200"}">${b[0]}</span>${b}</button>`).join("");
  $("ranges").innerHTML=RANGES.map((r,i)=>`<button class="pill ${S.rg===i?"on":""}" data-r="${i}">${r[0]}</button>`).join("");
  $("dealBtn").textContent=S.deal?"সব পোশাক দেখুন":OFR.btn;
  const n=cart.length;
  $("nav").innerHTML=[
    ["home","হোম","M3 11l9-8 9 8v9a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1z"],
    ["filter","ফিল্টার","M3 5h18l-7 8v6l-4 2v-8z"],
    ["cart","কার্ট / বুকিং","M6 7h12l1 13H5zM9 7a3 3 0 016 0"],
    ["contact","যোগাযোগ","M12 21s-7-6.2-7-11a7 7 0 0114 0c0 4.8-7 11-7 11zM12 12a2 2 0 100-4 2 2 0 000 4z"]
  ].flatMap((x,i)=>i===2&&ADM?[["settings","Settings","M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0M14 4v4M8 10v4M16 16v4"],x]:[x]).map(x=>`<button data-n="${x[0]}" class="flex-1 relative flex flex-col items-center gap-0.5 py-2 text-[11px] font-medium text-gray-600 active:text-gray-900"><svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="${x[2]}"/></svg>${tx("nav."+x[0],x[1])}${x[0]==="cart"&&n?`<span class="absolute right-[22%] top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-600 px-1 text-[10px] font-bold text-white">${bn(n)}</span>`:""}</button>`).join("");
}
let ft;const feedback=(dl=400)=>{clearTimeout(ft);ft=setTimeout(()=>{const act=S.q||S.b||S.cat||S.c!=="all"||S.deal||S.min>0||S.max<Infinity;if(!act)return;const n=filtered().length;toast(n?n+"টি পোশাক পাওয়া গেছে ↓":"কোনো পোশাক পাওয়া যায়নি");const el=$("grid").parentElement,top=el.getBoundingClientRect().top;if(n&&(top>innerHeight*.5||top<-40))el.scrollIntoView({behavior:"smooth",block:"start"})},dl)};
const upd=()=>{S.open=false;render();feedback()};

$("q").addEventListener("input",e=>{S.q=e.target.value.trim().toLowerCase();upd()});
$("bud").addEventListener("input",e=>{
  const v=parseInt(e.target.value,10);S.rg=-1;
  if(v>0){S.min=0;S.max=v}else{S.min=0;S.max=Infinity;S.rg=0}
  upd();
});
$("conds").onclick=e=>{const o=e.target.closest("[data-o]");if(o){S.deal=!S.deal;upd();return}const b=e.target.closest("[data-c]");if(b){S.c=b.dataset.c;if(S.c==="all")S.deal=false;upd()}};
$("brands").onclick=e=>{const b=e.target.closest("[data-b]");if(b){S.b=S.b===b.dataset.b?"":b.dataset.b;upd()}};
$("ranges").onclick=e=>{const b=e.target.closest("[data-r]");if(!b)return;
  const i=+b.dataset.r,r=RANGES[i];S.rg=i;S.min=r[1];S.max=r[2];
  $("bud").value=(r[2]===Infinity||r[2]===0)?"":r[2];upd()};
$("dealBtn").onclick=()=>{S.deal=!S.deal;upd();if(S.deal)$("grid").scrollIntoView()};
$("more").onclick=()=>{S.open=!S.open;render();if(!S.open)$("grid").scrollIntoView()};
$("reset").onclick=()=>{Object.assign(S,{q:"",c:"all",b:"",cat:"",min:0,max:Infinity,rg:0,deal:false,open:false});$("q").value="";$("bud").value="";render()};
$("grid").onclick=e=>{const pm=e.target.closest("[data-pm]");if(pm){phoneMenu(+pm.dataset.pm);return}const o=e.target.closest("[data-open]"),b=e.target.closest(".rs");if(!b){if(o)showDetail(+o.dataset.open);return}
  const id=+b.dataset.id;cart=cart.includes(id)?cart.filter(x=>x!==id):[...cart,id];save();render()};

function openSheet(html){$("sheetBody").innerHTML=html;$("sheet").classList.remove("hidden");$("sheet").classList.add("flex")}
function closeSheet(){$("sheet").classList.add("hidden");$("sheet").classList.remove("flex")}
function cartSheet(){
  if(!cart.length){openSheet(`<h3 class="mb-2 text-lg font-bold">কার্ট / বুকিং</h3><p class="py-6 text-center text-gray-500">এখনো কোনো পোশাক বুক করা হয়নি।</p>`);return}
  const items=cart.map(byId).filter(Boolean),q=p=>CQ[p.id]||1,total=items.reduce((s,p)=>s+p.p*q(p),0);
  const msg=`আসসালামু আলাইকুম, আমি ${CFG.shop} থেকে এই পোশাকগুলো বুক করতে চাই:\n`+items.map(p=>`• ${p.b} ${p.m} ${p.ram?`(সাইজ ${p.ram}, ${p.rom}) `:""}× ${q(p)} – ৳${p.p*q(p)}`).join("\n")+`\nমোট: ৳${total}`;
  openSheet(`<h3 class="mb-3 text-lg font-bold">কার্ট / বুকিং</h3>
  ${items.map(p=>`<div class="flex items-center gap-3 border-b border-gray-100 py-3"><div class="h-14 w-12 shrink-0 rounded-lg bg-gray-50 p-1">${phoneSvg(p.col,p.b)}</div><div class="min-w-0 flex-1"><div class="truncate text-sm font-semibold">${p.m}</div><div class="text-sm font-bold">${fmt(p.p*q(p))}</div><div class="mt-1 flex items-center gap-2"><button data-qd="${p.id}" aria-label="কমান" class="h-7 w-7 rounded-lg border border-gray-300 font-bold">−</button><span class="w-5 text-center text-sm font-semibold">${q(p)}</span><button data-qu="${p.id}" aria-label="বাড়ান" class="h-7 w-7 rounded-lg border border-gray-300 font-bold">+</button></div></div><button data-rm="${p.id}" class="text-xs font-medium text-rose-600">সরান</button></div>`).join("")}
  <div class="flex justify-between py-3 text-base font-bold"><span>মোট</span><span>${fmt(total)}</span></div>
  <a href="https://wa.me/${CFG.wa}?text=${encodeURIComponent(msg)}" target="_blank" rel="noopener" class="block rounded-xl bg-emerald-600 py-3 text-center font-semibold text-white">WhatsApp-এ বুকিং পাঠান</a><div class="mt-2 grid grid-cols-2 gap-2"><a href="mailto:${CFG.email}?subject=${encodeURIComponent("পোশাক বুকিং – "+CFG.shop)}&body=${encodeURIComponent(msg)}" class="rounded-xl border-2 border-blue-200 bg-blue-50 py-3 text-center font-semibold text-blue-700">✉️ ইমেইলে পাঠান</a><a href="tel:${CFG.tel}" class="rounded-xl border border-gray-900 py-3 text-center font-semibold">📞 কল করুন</a></div>
  <p class="mt-2 text-center text-xs text-gray-500">ডেমো বুকিং: অনলাইন পেমেন্ট নেই। দোকানে এসে পোশাক দেখে পেমেন্ট করতে পারবেন।</p>`);
}
function contactSheet(){
  const m=`আসসালামু আলাইকুম, আমি ${CFG.shop}-এর পোশাক সম্পর্কে জানতে চাই।`;
  openSheet(`<h3 class="mb-1 text-lg font-bold">${CFG.shop}</h3><p class="mb-4 text-sm text-gray-600">📍 ${CFG.addr}</p>
  <div class="grid grid-cols-2 gap-3">
   <a href="tel:${CFG.tel}" class="rounded-xl border border-gray-900 py-3 text-center font-semibold">📞 কল করুন</a>
   <a href="https://wa.me/${CFG.wa}?text=${encodeURIComponent(m)}" target="_blank" rel="noopener" class="rounded-xl bg-emerald-600 py-3 text-center font-semibold text-white">💬 WhatsApp</a>
   <a href="mailto:${CFG.email}?subject=${encodeURIComponent(CFG.shop)}&body=${encodeURIComponent(m)}" class="rounded-xl border-2 border-blue-200 bg-blue-50 py-3 text-center font-semibold text-blue-700">✉️ ইমেইল</a>
   <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CFG.addr)}" target="_blank" rel="noopener" class="rounded-xl bg-gray-100 py-3 text-center font-semibold">🗺️ ম্যাপ</a></div>
  ${ADM?`<button data-adm class="mt-6 block w-full text-center text-xs text-gray-400">সেটিংস খুলুন</button>`:""}`)}
$("sheetBody").onclick=e=>{
  const qq=e.target.closest("[data-qd],[data-qu]");if(qq){const id=+(qq.dataset.qd||qq.dataset.qu);CQ[id]=Math.min(9,Math.max(1,(CQ[id]||1)+(qq.dataset.qu?1:-1)));lsSet("cq",CQ);cartSheet();return}
  
  const b=e.target.closest("[data-rm]");if(b){cart=cart.filter(x=>x!==+b.dataset.rm);save();render();cartSheet();return}
  const t=e.target.closest("[data-adm],[data-s],[data-do],[data-del],[data-edit],[data-pa],[data-sm]");if(t)adminAct(t)};
$("nav").onclick=e=>{const b=e.target.closest("[data-n]");if(!b)return;
  const n=b.dataset.n;
  if(n==="home"){hideDetail();window.scrollTo({top:0})}
  if(n==="filter"){hideDetail();$("filters").scrollIntoView();const i=$("bud");i.parentElement.classList.add("pulse");setTimeout(()=>i.parentElement.classList.remove("pulse"),2200)}
  if(n==="cart")cartSheet();
  if(n==="contact")contactSheet();if(n==="settings")settingsSheet()};

/* ---------- পোশাকের বিস্তারিত পেজ ---------- */
let cur=null;
const row=(k,v)=>v?`<div class="flex justify-between gap-4 border-b border-gray-100 py-2.5 text-sm"><span class="text-gray-500">${k}</span><span class="text-right font-medium">${v}</span></div>`:"";
function related(p){return P.filter(x=>x.id!==p.id).map(x=>({x,s:Math.abs(x.p-p.p)/p.p-(x.b===p.b?.25:0)-(x.c===p.c?.05:0)})).sort((a,b)=>a.s-b.s).slice(0,8).map(o=>o.x)}
function hideDetail(){$("detail").classList.add("hidden");document.body.style.overflow=""}
window.addEventListener("popstate",hideDetail);
function showDetail(id,keep){
  const p=byId(id);if(!p)return;
  const d=$("detail"),was=!d.classList.contains("hidden"),top=keep?d.scrollTop:0;cur=id;
  const inC=cart.includes(id),q=`আসসালামু আলাইকুম, আমি ${p.b} ${p.m} (${fmt(p.p)}) পোশাকটি সম্পর্কে জানতে চাই।`;
  const wa=`https://wa.me/${CFG.wa}?text=`+encodeURIComponent(q);
  const mail=`mailto:${CFG.email}?subject=`+encodeURIComponent(p.b+" "+p.m)+"&body="+encodeURIComponent(q);
  d.innerHTML=`<div class="sticky top-0 z-10 flex items-center gap-3 border-b border-gray-100 bg-white px-3 pb-3" style="padding-top:calc(env(safe-area-inset-top,0px) + 12px)"><button data-back class="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100"><svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 6l-6 6 6 6"/></svg></button><div class="truncate font-bold">${p.m}</div>${ADM?`<button data-pm="${p.id}" class="ml-auto flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-lg font-bold">⋮</button>`:""}</div>
<div class="mx-auto max-w-2xl px-4 pb-28">
<div id="dmain" class="mx-auto mt-3 aspect-[4/3] max-h-72 rounded-2xl bg-gray-50 p-5">${phoneSvg(p.col,p.b)}</div><div class="mt-2 flex gap-2">${viewsOf(p).map((v,i)=>`<button data-gi="${i}" aria-label="ছবি ${i+1}" class="h-14 w-12 rounded-xl border border-gray-200 bg-gray-50 p-1">${phoneSvg(v[0],v[1],v[2])}</button>`).join("")}</div>
<div class="mt-4 flex flex-wrap gap-2 text-xs font-bold"><span class="rounded-md px-2 py-1 ${p.c==="new"?"bg-emerald-50 text-emerald-700":"bg-amber-50 text-amber-700"}">${p.c==="new"?"New":"কালেকশন "+p.g}</span><span class="rounded-md bg-blue-50 px-2 py-1 text-blue-700">${p.off?"Women’s":"Teen"}</span></div>
<div class="mt-2 text-xs text-gray-500">${p.b}</div><h1 class="text-xl font-bold">${p.m}</h1>
${p.r?`<div class="text-sm text-amber-500">${stars(p.r)} <span class="text-gray-500">${p.r.toLocaleString("en-IN")} (${bn(p.n)} রিভিউ)</span></div>`:""}
<div class="mt-2 text-2xl font-bold">${fmt(p.p)} ${p.o?`<span class="text-sm font-normal text-gray-400 line-through">${fmt(p.o)}</span> <span class="text-sm font-semibold text-rose-600">${fmt(p.o-p.p)} সাশ্রয়</span>`:""}</div>
<div class="mt-3 rounded-xl bg-amber-50 px-3 py-2 text-xs text-amber-800">💳 12 মাসে ভাগ করলে আনুমানিক ${fmt(Math.round(p.p/12))}/মাস (শুধু হিসাবের জন্য; কিস্তি সুবিধা দোকানে জানুন)</div>
<h2 class="mb-1 mt-5 text-base font-bold">বিস্তারিত স্পেসিফিকেশন</h2>
<div class="rounded-2xl border border-gray-200 px-4">${row("পোশাকের ধরন",p.b)}${row("অবস্থা",p.c==="new"?"নতুন":"সেল / ক্লিয়ারেন্স (কালেকশন "+p.g+")")}${row("সেগমেন্ট",p.off?"নারীদের":"কিশোরদের")}${row("সাইজ",p.ram||"")}${row("ফেব্রিক",p.rom||"")}${row("ম্যাটেরিয়াল",p.cpu)}${row("ফিট",p.gpu)}${row("স্টাইল",p.scr)}${row("রং",p.cam)}${row("কেয়ার নির্দেশনা",p.bat)}${row("কালেকশন",p.os)}</div>
${p.note?`<p class="mt-3 rounded-xl bg-gray-50 p-3 text-sm text-gray-700">${p.note}</p>`:""}
<button data-id="${p.id}" class="rs mt-4 w-full rounded-xl py-3 text-sm font-semibold ${PS[p.id]&&PS[p.id].s?"pointer-events-none opacity-40 ":""}${inC?"bg-emerald-600 text-white":"border border-gray-900 text-gray-900"}">${inC?"বুক করা হয়েছে ✓":"স্টোরে বুক করুন"}</button>
<h2 class="mb-2 mt-6 text-base font-bold">যোগাযোগ করুন</h2>
<div class="grid grid-cols-2 gap-3">
<a href="${mail}" class="flex h-24 flex-col items-center justify-center gap-1 rounded-2xl border-2 border-blue-200 bg-blue-50 text-base font-bold text-blue-700 active:scale-95"><span class="text-2xl">✉️</span>ইমেইল</a>
<a href="${wa}" target="_blank" rel="noopener" class="wa flex h-24 flex-col items-center justify-center gap-1 rounded-2xl bg-emerald-500 text-base font-bold text-white active:scale-95"><span class="text-2xl">💬</span>হোয়াটসঅ্যাপ</a></div>
<a href="tel:${CFG.tel}" class="mt-3 flex items-center justify-center gap-2 rounded-2xl border border-gray-300 py-3.5 text-lg font-bold active:bg-gray-50">📞 ${CFG.tel}</a>
<p class="mt-1 text-center text-xs text-gray-500">নম্বরে ট্যাপ করলে সরাসরি কল যাবে</p>
<h2 class="mb-3 mt-7 text-base font-bold">এই দামের কাছাকাছি আরও পোশাক</h2>
<div class="grid grid-cols-2 gap-3">${related(p).map(card).join("")}</div></div>`;
  d.classList.remove("hidden");document.body.style.overflow="hidden";d.scrollTop=top;
  if(!was)try{history.pushState({d:1},"")}catch(e){}
}
$("detail").onclick=e=>{const pm=e.target.closest("[data-pm]");if(pm){phoneMenu(+pm.dataset.pm);return}
  if(e.target.closest("[data-back]")){history.state&&history.state.d?history.back():hideDetail();return}
  const r=e.target.closest(".rs");
  if(r){const id=+r.dataset.id;cart=cart.includes(id)?cart.filter(x=>x!==id):[...cart,id];save();render();showDetail(cur,true);return}
  const gi=e.target.closest("[data-gi]");if(gi){const p=byId(cur),v=viewsOf(p)[+gi.dataset.gi];$("dmain").innerHTML=phoneSvg(v[0],v[1],v[2]);return}
  const o=e.target.closest("[data-open]");if(o)showDetail(+o.dataset.open)};

/* ---------- অ্যাডমিন / সেটিংস ---------- */
const CL="mt-1 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm outline-none focus:border-blue-500";
const inp=(id,l,ph,t)=>`<label class="block text-xs font-medium text-gray-600">${l}<input id="${id}" type="${t||"text"}" ${t==="number"?'inputmode="numeric"':""} placeholder="${ph||""}" class="${CL}"></label>`;
const sel=(id,l,o)=>`<label class="block text-xs font-medium text-gray-600">${l}<select id="${id}" class="${CL}">${o.map(x=>`<option value="${x[0]}">${x[1]}</option>`).join("")}</select></label>`;
const btn=(a,t,c)=>`<button data-do="${a}" class="mt-4 w-full rounded-xl py-3 font-semibold ${c||"bg-gray-900 text-white"}">${t}</button>`;
const back=`<button data-s="menu" class="mb-3 text-sm font-medium text-blue-600">← সেটিংস</button>`;
function adminLogin(){const first=!API_OK&&!ls("ph",null);openSheet(`<h3 class="mb-3 text-lg font-bold">${first?"নতুন অ্যাডমিন পিন তৈরি করুন":"অ্যাডমিন লগইন"}</h3>${inp("pin",first?"নতুন পিন (কমপক্ষে ৬ অক্ষর)":(API_OK?"অ্যাডমিন পাসওয়ার্ড":"পিন"),"","password")}${first?`<div class="mt-3">${inp("pin2","পিন আবার লিখুন","","password")}</div>`:""}<p id="err" class="mt-2 text-sm text-rose-600"></p>${btn(first?"setup":"login",first?"পিন সেট করে ঢুকুন":"লগইন")}`)}
function settingsSheet(v){
  if(!ADM){adminLogin();return}
  if(v==="add")openSheet(`${back}<h3 class="mb-1 text-lg font-bold">নতুন পোশাক যোগ করুন</h3><p class="mb-3 text-xs text-gray-500">শুধু মডেল ও দাম আবশ্যক। যেটা দিতে চান না, খালি রাখুন।</p><div class="grid grid-cols-2 gap-3">${inp("f_m","পোশাকের নাম *","Oversized Tee")}<label class="block text-xs font-medium text-gray-600">ব্র্যান্ড<input id="f_b" list="bl" placeholder="নারীদের" class="${CL}"><datalist id="bl">${BR.map(b=>`<option value="${b}">`).join("")}</datalist></label>${inp("f_p","বর্তমান / অফারের দাম (টাকা) *","45000","number")}${inp("f_op","আগের দাম (কাটা দাম)","","number")}${inp("f_dp","অথবা ছাড় % (দাম নিজে হিসাব হবে)","10","number")}${sel("f_c","অবস্থা",[["new","নতুন"],["used","সেল / ক্লিয়ারেন্স"]])}${sel("f_g","কালেকশন নোট",[["A+","A+"],["A","A"],["B","B"]])}${sel("f_o","সেগমেন্ট",[["1","নারীদের"],["0","কিশোরদের"]])}${inp("f_ram","সাইজ","S–XL")}${inp("f_rom","ফেব্রিক","Cotton")}${inp("f_cpu","ম্যাটেরিয়াল","Cotton")}${inp("f_gpu","ফিট","Regular fit")}${inp("f_scr","স্টাইল","Regular fit")}${inp("f_cam","রং","Solid / Printed")}${inp("f_bat","কেয়ার নির্দেশনা","ঠান্ডা পানিতে ধোয়া ভালো")}${inp("f_os","কালেকশন","Spring / Summer")}${inp("f_cat","ক্যাটাগরি (যেমন: গেমিং, রং, বাজেট)","")}${inp("f_r","রিভিউ রেটিং (১-৫)","4.5","number")}${inp("f_n","রিভিউ সংখ্যা","20","number")}</div><div class="mt-3 space-y-3">${inp("f_img","ছবির লিংক (https://...)","খালি রাখলে ডিফল্ট ছবি")}<label class="block text-xs font-medium text-gray-600">ছবি আপলোড (একাধিক · jpg/png/webp)<input id="f_files" type="file" accept="image/jpeg,image/png,image/webp" multiple class="${CL}"></label><div id="fprev" class="flex flex-wrap gap-2"></div>${inp("f_note","অতিরিক্ত নোট","বক্স, চার্জার সহ...")}</div><p id="err" class="mt-2 text-sm text-rose-600"></p>${btn("save","পোশাক সংরক্ষণ করুন")}`);
  else if(v==="manage")openSheet(`${back}<h3 class="mb-2 text-lg font-bold">পোশাক ম্যানেজ (${bn(P.length)}টি)</h3>${P.map(p=>`<div class="flex items-center justify-between gap-2 border-b border-gray-100 py-2.5 text-sm"><div class="min-w-0"><div class="truncate font-semibold">${p.m}</div><div class="text-xs text-gray-500">${fmt(p.p)}${p.id>=100?" · নিজের যোগ করা":" · স্যাম্পল"}</div></div><div class="flex shrink-0 gap-3"><button data-edit="${p.id}" class="text-xs font-medium text-blue-600">সম্পাদনা</button><button data-del="${p.id}" class="text-xs font-medium text-rose-600">মুছুন</button></div></div>`).join("")||"<p class='py-4 text-gray-500'>কোনো পোশাক নেই।</p>"}${btn("hidesample","সব স্যাম্পল পোশাক মুছুন","border border-rose-300 text-rose-600")}${HIDE.length?btn("showsample","স্যাম্পল পোশাক ফিরিয়ে আনুন","border border-gray-300"):""}`);
  else if(v==="offer"){const f=(id,l,t)=>inp(id,l,"",t);
    openSheet(`${back}<h3 class="mb-2 text-lg font-bold">🔥 অফার তৈরি ও ডিজাইন</h3><div id="opv" class="mb-3 rounded-2xl p-4"><div id="opvT" class="text-lg font-bold"></div><div id="opvX" class="text-xs"></div></div><div class="space-y-3">${sel("o_on","অফার ব্যানার",[["1","চালু"],["0","বন্ধ"]])}${f("o_t","শিরোনাম")}${f("o_x","ছোট বর্ণনা")}${f("o_btn","বাটনের লেখা")}${f("o_end","অফার শেষ হওয়ার সময় (খালি রাখলে ৩ দিন)","datetime-local")}${sel("o_th","রঙের থিম",[["navy","নেভি ও সোনালি"],["red","লাল ধামাকা"],["green","সবুজ উৎসব"],["purple","বেগুনি প্রিমিয়াম"],["gold","হালকা সোনালি"],["custom","নিজের রং"]])}<div class="grid grid-cols-3 gap-3">${f("o_c1","রং ১","color")}${f("o_c2","রং ২","color")}${f("o_ca","হাইলাইট","color")}</div>${sel("o_pop","ঢোকামাত্র পপ-আপ",[["1","চালু"],["0","বন্ধ"]])}</div><p class="mt-3 text-xs text-gray-500">পোশাকে অফার দিতে: পোশাক যোগ বা এডিটে "আগের দাম" ও বর্তমান দাম (অথবা ছাড় %) দিন।</p>${btn("saveoffer","অফার সংরক্ষণ করুন")}${btn("resetoffer","ডেমো অফার ফিরিয়ে আনুন","border border-gray-300")}`);
    [["o_on","on"],["o_t","t"],["o_x","x"],["o_btn","btn"],["o_end","end"],["o_th","th"],["o_c1","c1"],["o_c2","c2"],["o_ca","ca"],["o_pop","pop"]].forEach(([i,k])=>$(i).value=OFR[k]);opv()}
  else if(v==="brand"){openSheet(`${back}<h3 class="mb-2 text-lg font-bold">🏷️ লোগো, ফন্ট ও সোশ্যাল</h3><div class="space-y-3"><label class="block text-xs font-medium text-gray-600">দোকানের লোগো (ছবি)<input id="b_file" type="file" accept="image/jpeg,image/png,image/webp" class="${CL}"></label><div id="bprev">${SITE.logo?`<img src="${SITE.logo}" alt="" class="h-12 rounded-lg border bg-white object-contain p-1">`:""}</div>${SITE.logo?`<button data-do="logoclr" class="text-xs font-medium text-rose-600">বর্তমান লোগো সরান</button>`:""}
    ${sel("b_font","লেখার ফন্ট",Object.entries(FONTS).map(([k,v])=>[k,v[0]]))}<p class="pt-2 text-sm font-semibold">সোশ্যাল লিংক (https:// দিয়ে শুরু; ফাঁকা রাখলে দেখাবে না)</p>${inp("b_fb","Facebook পেজের লিংক","")}${inp("b_ig","Instagram লিংক","")}${inp("b_yt","YouTube লিংক","")}${inp("b_tt","TikTok লিংক","")}</div><p id="err" class="mt-2 text-sm text-rose-600"></p>${btn("savebrand","সংরক্ষণ করুন")}`);BL=null;$("b_font").value=SITE.font||"";$("b_fb").value=CFG.fb||"";$("b_ig").value=CFG.ig||"";$("b_yt").value=CFG.yt||"";$("b_tt").value=CFG.tt||""}
  else if(v==="slides"){SL=slList().map(s=>({...s}));slidesView()}
  else if(v==="pages"){PG=(ls("pages",[])||[]).map(p=>({...p}));pagesView()}
  else if(v==="layout")openSheet(`${back}<h3 class="mb-1 text-lg font-bold">↕️ সেকশন সাজানো</h3><p class="mb-2 text-xs text-gray-500">তীর চেপে উপরে-নিচে সরান। পরিবর্তন সঙ্গে সঙ্গে সাইটে দেখা যায়।</p>${ordIds().map((k,i,a)=>`<div class="flex items-center justify-between border-b border-gray-100 py-3"><span class="text-sm font-semibold">${SECORD.find(x=>x[0]===k)[1]}</span><span class="flex gap-2"><button data-do="ordup" data-k="${k}" ${i?"":"disabled"} aria-label="উপরে" class="h-9 w-9 rounded-lg border border-gray-300">↑</button><button data-do="orddn" data-k="${k}" ${i<a.length-1?"":"disabled"} aria-label="নিচে" class="h-9 w-9 rounded-lg border border-gray-300">↓</button></span></div>`).join("")}${btn("ordreset","ডিফল্ট ক্রমে ফেরান","border border-gray-300")}`);
  else if(v==="hero"){const d=id=>(REG.find(r=>r[0]===id)||[])[2];
    openSheet(`${back}<h3 class="mb-2 text-lg font-bold">🖼️ হিরো ব্যানার</h3><p class="mb-3 text-xs text-gray-500">সাইটের একদম উপরের বড় অংশ: লেখা, রং, পোশাক বা নিজের ছবি।</p><div class="space-y-3">${sel("h_on","হিরো ব্যানার",[["1","দেখান"],["0","লুকান"]])}${inp("h_l","ছোট লেবেল (উপরের ক্ষুদ্র লেখা)","")}${inp("h_t","বড় শিরোনাম","")}${inp("h_s","ছোট বর্ণনা","")}<div class="grid grid-cols-2 gap-3">${inp("h_b1","বাটন ১ এর লেখা","")}${inp("h_b2","বাটন ২ এর লেখা","")}</div>${sel("h_th","রঙের থিম",[["light","হালকা নীল"],["dark","গাঢ় নেভি"],["warm","উষ্ণ কমলা"],["green","সবুজ"],["purple","বেগুনি"],["custom","নিজের রং"]])}<div class="grid grid-cols-2 gap-3">${inp("h_c1","রং ১","","color")}${inp("h_c2","রং ২","","color")}</div><div class="grid grid-cols-2 gap-3">${sel("h_p1","বাম পোশাক (পিছন দিক)",[["auto","স্বয়ংক্রিয়"],...P.map(p=>[String(p.id),p.b+" "+p.m])])}${sel("h_p2","ডান পোশাক (সামনে)",[["auto","স্বয়ংক্রিয়"],...P.map(p=>[String(p.id),p.b+" "+p.m])])}</div>
    <label class="block text-xs font-medium text-gray-600">অথবা নিজের ছবি (পোশাকের বদলে দেখাবে)<input id="h_file" type="file" accept="image/jpeg,image/png,image/webp" class="${CL}"></label><div id="hprev">${HERO.img?`<img src="${HERO.img}" alt="" class="h-20 rounded-lg border object-contain">`:""}</div>${HERO.img?`<button data-do="heroclr" class="text-xs font-medium text-rose-600">বর্তমান ছবি সরান</button>`:""}</div>${btn("savehero","হিরো সংরক্ষণ করুন")}`);
    $("h_on").value=String(HERO.on);$("h_th").value=HERO.th;$("h_c1").value=HERO.c1;$("h_c2").value=HERO.c2;$("h_p1").value=String(HERO.p1);$("h_p2").value=String(HERO.p2);
    $("h_l").value=TXTS["hero.lbl"]||d("hero.lbl");$("h_t").value=SITE.ht;$("h_s").value=SITE.hs;$("h_b1").value=TXTS["hero.b1"]||d("hero.b1");$("h_b2").value=TXTS["hero.b2"]||d("hero.b2");HI=null}
  else if(v==="texts"){openSheet(`${back}<h3 class="mb-2 text-lg font-bold">✏️ সব লেখা ও সেকশন</h3><p class="mb-2 text-sm font-semibold">কোন সেকশন দেখাবে</p>${SECS.map(([k,l])=>`<label class="flex items-center justify-between border-b border-gray-100 py-2.5 text-sm"><span>${l}</span><input type="checkbox" id="v_${k}" class="h-5 w-5"></label>`).join("")}<p class="mb-1 mt-4 text-sm font-semibold">লেখা বদলান <span class="text-xs font-normal text-gray-500">(ফাঁকা রাখলে আগের লেখা)</span></p><div class="space-y-3">${REG.map(([k,l])=>inp("t_"+k.replace(/\./g,"_"),l,"")).join("")}</div>${btn("savetxt","সংরক্ষণ করুন")}${btn("resettxt","সব লেখা ডিফল্টে ফেরান","border border-gray-300")}`);
    SECS.forEach(([k])=>$("v_"+k).checked=!VIS[k]);REG.forEach(([k,l,d])=>$("t_"+k.replace(/\./g,"_")).value=TXTS[k]||d)}
  else if(v==="demo")openSheet(`${back}<h3 class="mb-2 text-lg font-bold">🧪 ডেমো মোড</h3><p class="mb-3 text-sm text-gray-600">চালু থাকলে উপরে ডেমো বার দেখায় এবং নমুনা পোশাকে <b>DEMO</b> ট্যাগ থাকে। বন্ধ করলে সব নমুনা পোশাক লুকিয়ে যায়, শুধু আপনার নিজের যোগ করা আসল পোশাক দেখাবে।</p>${btn("toggledemo",DEMO==="1"?"ডেমো মোড বন্ধ করুন":"ডেমো মোড চালু করুন")}`);
  else if(v==="look"){const T=[["rat","রেটিং ও রিভিউ"],["ram","সাইজ / ফেব্রিক"],["cpu","ম্যাটেরিয়াল"],["gpu","ফিট"],["old","আগের দাম (কাটা)"],["off","Women’s ট্যাগ"],["btn","বুক করুন বাটন"],["brand","পোশাকের ধরন"]];
    openSheet(`${back}<h3 class="mb-2 text-lg font-bold">কার্ড ও লুক ডিজাইন</h3><p class="text-sm font-semibold">কার্ডে যা যা দেখাবে</p>${T.map(t=>`<label class="flex items-center justify-between border-b border-gray-100 py-2.5 text-sm"><span>${t[1]}</span><input type="checkbox" id="k_${t[0]}" class="h-5 w-5"></label>`).join("")}<div class="mt-4 grid grid-cols-2 gap-3">${sel("l_ar","ছবির আকার",[["1/1","চৌকো"],["4/3","চওড়া (৪:৩)"],["3/4","লম্বা (৩:৪)"]])}${sel("l_rad","কোণার গোলাকার",[["0","চৌকো"],["10","হালকা"],["16","সাধারণ"],["28","বেশি গোল"]])}${sel("l_sh","ছায়া",[["none","নেই"],["0 1px 2px rgba(15,23,42,.05),0 10px 26px -14px rgba(15,23,42,.22)","হালকা ছায়া"]])}${sel("l_fs","লেখার সাইজ",[["0.9","ছোট"],["1","স্বাভাবিক"],["1.1","বড়"],["1.2","আরও বড়"]])}${sel("l_cs","কার্ডের স্টাইল",[["std","স্ট্যান্ডার্ড"],["compact","কম্প্যাক্ট (ছবি ছোট)"],["image","ছবি-প্রধান (স্পেক কম)"]])}${inp("l_bg","পেজের ব্যাকগ্রাউন্ড","","color")}</div>${btn("savelook","সংরক্ষণ করুন")}`);
    T.forEach(t=>$("k_"+t[0]).checked=!SITE.hf.includes(t[0]));$("l_ar").value=SITE.ar;$("l_rad").value=SITE.rad;$("l_sh").value=SITE.sh;$("l_fs").value=SITE.fs;$("l_bg").value=SITE.bg;$("l_cs").value=SITE.cs||"std"}
    else if(v==="backup"){openSheet(`${back}<h3 class="mb-2 text-lg font-bold">ব্যাকআপ / রিস্টোর</h3><p class="mb-2 text-xs text-gray-500">নিচের লেখা কপি করে সেভ রাখুন। পরে পেস্ট করে রিস্টোর করতে পারবেন।</p><textarea id="bk" rows="8" class="${CL}"></textarea><p id="err" class="mt-2 text-sm text-rose-600"></p>${btn("restore","রিস্টোর করুন")}`);$("bk").value=JSON.stringify({extra:EXTRA,hide:HIDE,pst:PS,cfg:ls("cfg",{}),site:SITE})}
  else if(v==="site"){openSheet(`${back}<h3 class="mb-3 text-lg font-bold">সাইট সেটিংস</h3><div class="space-y-3">${inp("s_name","দোকানের নাম")}${inp("s_tag","হেডারের ঠিকানা ট্যাগ")}${inp("s_ht","হিরো শিরোনাম")}${inp("s_hs","হিরো ছোট লেখা")}${inp("s_br","পোশাকের ধরন (কমা দিয়ে আলাদা করুন)")}${inp("s_rg","বাজেট বাটন (নাম:সর্বনিম্ন-সর্বোচ্চ, কমা দিয়ে)")}${inp("s_lim","শুরুতে কয়টি পোশাক দেখাবে","","number")}${inp("s_ph","সার্চ বারের লেখা")}${inp("s_cl","ফিল্টার পিলের নাম (১মসহ ৫টি, কমা দিয়ে)")}${inp("s_bh","ব্র্যান্ড সেকশনের শিরোনাম")}${inp("s_uh","বাজেট সেকশনের শিরোনাম")}${inp("s_gt","পোশাক তালিকার শিরোনাম")}${sel("s_col","পোশাকের কলাম",[["1","১ কলাম"],["2","২ কলাম"]])}${inp("s_ac","প্রধান রং (বাটন, ব্যাজ)","","color")}</div>${btn("savesite","সংরক্ষণ করুন")}`);[["s_name","name"],["s_tag","tag"],["s_ht","ht"],["s_hs","hs"],["s_br","brands"],["s_lim","lim"],["s_rg","ranges"],["s_ph","ph"],["s_cl","cl"],["s_bh","bh"],["s_uh","uh"],["s_gt","gt"],["s_ac","ac"]].forEach(([i,k])=>$(i).value=SITE[k]);$("s_col").value=String(SITE.col)}
  else if(v==="contact")openSheet(`${back}<h3 class="mb-3 text-lg font-bold">যোগাযোগ সেটিংস</h3><div class="space-y-3">${inp("c_wa","হোয়াটসঅ্যাপ বিজনেস নম্বর (দেশ কোডসহ, + ছাড়া)",CFG.wa)}${inp("c_tel","পোশাক নম্বর",CFG.tel)}${inp("c_email","ইমেইল",CFG.email)}${inp("c_addr","দোকানের ঠিকানা",CFG.addr)}</div>${btn("savecfg","সংরক্ষণ করুন")}`);
  else if(v==="pin")openSheet(`${back}<h3 class="mb-3 text-lg font-bold">পিন বদলান</h3>${inp("np","নতুন পিন (কমপক্ষে ৬ অক্ষর)","","password")}<p id="err" class="mt-2 text-sm text-rose-600"></p>${btn("savepin","পিন সংরক্ষণ")}`);
  else openSheet(`<h3 class="mb-3 text-lg font-bold">⚙️ অ্যাডমিন সেটিংস</h3><div class="space-y-2">${[["offer","🔥 অফার তৈরি ও ডিজাইন"],["hero","🖼️ হিরো ব্যানার (উপরের বড় ছবি)"],["slides","🎞️ স্লাইডার ব্যানার (একাধিক ছবি)"],["brand","🏷️ লোগো, ফন্ট ও সোশ্যাল"],["pages","📄 পেজ (নীতিমালা ইত্যাদি)"],["layout","↕️ সেকশন সাজানো"],["texts","✏️ সব লেখা ও সেকশন দেখানো/লুকানো"],["add","➕ নতুন পোশাক যোগ করুন"],["manage","📋 পোশাক ম্যানেজ / সম্পাদনা"],["site","🎨 ডিজাইন ও লেখা কাস্টমাইজ"],["demo","🧪 ডেমো মোড"],["look","🖌️ কার্ড ও লুক ডিজাইন"],["backup","💾 ব্যাকআপ / রিস্টোর"],["contact","📞 যোগাযোগ সেটিংস"],["pin","🔑 পিন বদলান"]].filter(x=>!(API_OK&&x[0]==="pin")).map(x=>`<button data-s="${x[0]}" class="w-full rounded-xl border border-gray-200 px-4 py-3.5 text-left font-semibold active:bg-gray-50">${x[1]}</button>`).join("")}</div>${btn("logout","লগআউট","border border-gray-300 text-gray-700")}`);
}
function adminAct(t){
  const g=id=>(($(id)||{}).value||"").trim(),num=id=>parseInt(g(id),10)||0,err=m=>{const x=$("err");if(x)x.textContent=m};
  if(t.dataset.adm!==undefined){settingsSheet();return}
  if(t.dataset.pa){const id=+t.dataset.pid,a=t.dataset.pa,s=PS[id]=PS[id]||{};
    if(a==="edit"){editPhone(id);return}
    if(a==="dup"){const p=byId(id);EXTRA.push({...p,id:Math.max(99,...EXTRA.map(x=>x.id))+1,m:p.m+" (কপি)"});lsSet("extra",EXTRA)}
    else if(a==="sold")s.s=!s.s;else if(a==="hide")s.h=!s.h;
    else if(a==="del"){EXTRA=EXTRA.filter(p=>p.id!==id);if(id<100)HIDE=[...HIDE,id];lsSet("extra",EXTRA);lsSet("hide",HIDE);hideDetail()}
    lsSet("pst",PS);render();closeSheet();return}
  if(t.dataset.edit){editPhone(+t.dataset.edit);return}
  if(t.dataset.s){EDIT=null;PEND=[];settingsSheet(t.dataset.s);return}
  if(t.dataset.del){const id=+t.dataset.del;EXTRA=EXTRA.filter(p=>p.id!==id);if(id<100)HIDE=[...HIDE,id];lsSet("extra",EXTRA);lsSet("hide",HIDE);build();render();settingsSheet("manage");return}
  const a=t.dataset.do;
  if(a==="login"||a==="setup"){(async()=>{
    if(API_OK){t.disabled=true;t.textContent="যাচাই হচ্ছে…";
      try{const r=await fetch("/api/login",{method:"POST",headers:{"content-type":"application/json"},credentials:"same-origin",body:JSON.stringify({password:g("pin")})});const j=await r.json().catch(()=>({}));
        if(r.ok){CSRF=j.csrf;ADM=true;closeSheet();toast("\u2705 অ্যাডমিন লগইন সফল");render();idle();return}
        err(r.status===429?"অনেকবার ভুল হয়েছে। "+Math.max(1,Math.ceil((j.retry||60)/60))+" মিনিট পরে চেষ্টা করুন":r.status===503?(j.error||"সার্ভার প্রস্তুত নয়"):"ভুল পাসওয়ার্ড")}
      catch(e){err("সার্ভারের সাথে যোগাযোগ করা যাচ্ছে না")}
      t.disabled=false;t.textContent="লগইন";return}
    const lk=ls("lock",{n:0,u:0});
    if(Date.now()<lk.u){err("অনেকবার ভুল হয়েছে। "+Math.ceil((lk.u-Date.now())/60000)+" মিনিট পরে চেষ্টা করুন");return}
    let ok=false;
    try{if(a==="setup"){if(g("pin").length<6||g("pin")!==g("pin2")){err("কমপক্ষে ৬ অক্ষর দিন এবং দুটো মিলতে হবে");return}await setPin(g("pin"));ok=true}else ok=await checkPin(g("pin"))}
    catch(e){err("নিরাপদ লগইনের জন্য HTTPS লাগবে");return}
    if(ok){lsSet("lock",{n:0,u:0});ADM=true;try{sessionStorage.setItem("adm","1")}catch(e){}closeSheet();toast("✅ অ্যাডমিন লগইন সফল");render();idle()}
    else{const n=lk.n+1;lsSet("lock",{n,u:n>=5?Date.now()+Math.min(60,2**(n-5))*5*60000:0});err(n>=5?"অনেকবার ভুল পিন। কিছুক্ষণ অপেক্ষা করুন":"ভুল পিন ("+(5-n)+" বার বাকি)")}
  })()}
  else if(a==="logout"){if(API_OK)apiLogout();ADM=false;try{sessionStorage.removeItem("adm")}catch(e){}render();closeSheet()}
  else if(a==="save"){
    let pr=num("f_p");const dp0=num("f_dp");if(pr<=0&&num("f_op")>0&&dp0>0&&dp0<100)pr=Math.round(num("f_op")*(1-dp0/100));if(!g("f_m")||pr<=0){err("পোশাকের নাম ও দাম অবশ্যই দিন");return}
    const old=EDIT!=null?byId(EDIT):null,id=EDIT!=null?EDIT:Math.max(99,...EXTRA.map(p=>p.id))+1,c=g("f_c"),im=g("f_img");EXTRA=EXTRA.filter(p=>p.id!==id);EDIT=null;const IM=PEND.length?PEND.slice():((old&&old.imgs)||[]);PEND=[];
    EXTRA.push({id,b:esc(g("f_b"))||"অন্যান্য",m:esc(g("f_m")),c,g:c==="new"?"New":(g("f_g")||"A"),off:g("f_o")==="1",p:pr,o:num("f_op")>pr?num("f_op"):0,ram:num("f_ram"),rom:num("f_rom"),cpu:esc(g("f_cpu")),gpu:esc(g("f_gpu")),scr:esc(g("f_scr")),cam:esc(g("f_cam")),bat:esc(g("f_bat")),os:esc(g("f_os")),note:esc(g("f_note")),cat:esc(g("f_cat")),r:Math.min(5,parseFloat(g("f_r"))||0),n:num("f_n"),imgs:IM,col:IM.length?IM[0]:(/^(https?:\/\/|#[0-9a-f]{3,6}$)/i.test(im)?im:(old&&old.col[0]==="#"?old.col:"#4b5563"))});
    if(!lsSet("extra",EXTRA))toast("⚠️ ব্রাউজারের জায়গা শেষ – ছবি কম বা ছোট দিন");build();Object.assign(S,{q:"",c:"all",b:"",cat:"",min:0,max:Infinity,rg:0,deal:false,open:false});$("q").value="";$("bud").value="";render();settingsSheet("manage")}
  else if(a==="hidesample"){HIDE=BASE.map(p=>p.id);lsSet("hide",HIDE);build();render();settingsSheet("manage")}
  else if(a==="showsample"){HIDE=[];lsSet("hide",HIDE);build();render();settingsSheet("manage")}
  else if(a==="savesite"){Object.assign(SITE,{name:esc(g("s_name"))||SITE.name,tag:esc(g("s_tag")),ht:esc(g("s_ht")),hs:esc(g("s_hs")),brands:esc(g("s_br"))||SITE.brands,lim:num("s_lim")||6,ranges:esc(g("s_rg")),ph:esc(g("s_ph")),cl:esc(g("s_cl")),bh:esc(g("s_bh")),uh:esc(g("s_uh")),gt:esc(g("s_gt")),ac:g("s_ac")||"#111827",col:g("s_col")});lsSet("site",SITE);applySite();Object.assign(S,{b:"",open:false,rg:0,min:0,max:Infinity});$("bud").value="";render();settingsSheet()}
  else if(a==="logoclr"){BL="";$("bprev").innerHTML="";toast("লোগো সরানো হবে – সংরক্ষণ চাপুন")}
  else if(a==="savebrand"){const bad=["b_fb","b_ig","b_yt","b_tt"].find(id=>g(id)&&!/^https:\/\/[^\s<>"'`]{4,300}$/.test(g(id)));if(bad){err("লিংক https:// দিয়ে শুরু হতে হবে");return}
    if(BL!==null)SITE.logo=BL;BL=null;SITE.font=g("b_font");const o={fb:g("b_fb"),ig:g("b_ig"),yt:g("b_yt"),tt:g("b_tt")};Object.assign(CFG,o);lsSet("cfg",{...ls("cfg",{}),...o});lsSet("site",SITE);applySite();render();toast("\u2705 সংরক্ষিত");settingsSheet("brand")}
  else if(a==="sldel"){slCap();SL.splice(+t.dataset.i,1);slidesView()}
  else if(a==="slsave"){slCap();const bad=SL.find(s=>s.link&&!/^(offer|all|https:\/\/[^\s<>"'`]{4,300})$/.test(s.link));if(bad){err("লিংক হতে হবে: offer, all, বা https://… ঠিকানা");return}
    lsSet("slides",SL.map(s=>({img:s.img,cap:s.cap||"",link:s.link||""})));render();toast("\u2705 স্লাইডার সংরক্ষিত");closeSheet()}
  else if(a==="pgadd"){pgCap();PG.push({id:Math.random().toString(36).slice(2,8),t:"",b:""});pagesView()}
  else if(a==="pgdel"){pgCap();PG.splice(+t.dataset.i,1);pagesView()}
  else if(a==="pgsave"){pgCap();if(PG.some(p=>!p.t.trim())){err("প্রতিটি পেজের নাম দিন");return}lsSet("pages",PG.map(p=>({id:p.id,t:p.t.trim(),b:p.b})));render();toast("\u2705 পেজ সংরক্ষিত");closeSheet()}
  else if(a==="ordup"||a==="orddn"){const o=ordIds(),i=o.indexOf(t.dataset.k),k=a==="ordup"?i-1:i+1;if(i>-1&&k>=0&&k<o.length){[o[i],o[k]]=[o[k],o[i]];lsSet("ord",o);applyOrder()}settingsSheet("layout")}
  else if(a==="ordreset"){lsSet("ord",[]);applyOrder();settingsSheet("layout")}
  else if(a==="heroclr"){HI="";$("hprev").innerHTML="";toast("ছবি সরানো হবে – সংরক্ষণ চাপুন")}
  else if(a==="savehero"){Object.assign(HERO,{on:g("h_on"),th:g("h_th"),c1:g("h_c1"),c2:g("h_c2"),p1:g("h_p1"),p2:g("h_p2")});if(HI!==null)HERO.img=HI;HI=null;
    SITE.ht=esc(g("h_t"))||SITE.ht;SITE.hs=esc(g("h_s"));lsSet("site",SITE);const o={...TXTS};
    for(const[k,id]of[["hero.lbl","h_l"],["hero.b1","h_b1"],["hero.b2","h_b2"]]){const vv=esc(g(id)),dd=REG.find(r=>r[0]===k)[2];if(vv&&vv!==dd)o[k]=vv;else delete o[k]}
    TXTS=o;lsSet("txt",o);lsSet("hero",HERO);render();toast("\u2705 হিরো ব্যানার সংরক্ষিত");settingsSheet("hero")}
  else if(a==="savetxt"){const o={};for(const[k,,dd]of REG){const vv=esc(g("t_"+k.replace(/\./g,"_")));if(vv&&vv!==dd)o[k]=vv}
    const vs={};SECS.forEach(([k])=>{if(!$("v_"+k).checked)vs[k]=true});TXTS=o;VIS=vs;lsSet("txt",o);lsSet("vis",vs);render();toast("\u2705 সংরক্ষিত");settingsSheet("texts")}
  else if(a==="resettxt"){TXTS={};VIS={};lsSet("txt",{});lsSet("vis",{});render();toast("ডিফল্টে ফিরেছে");settingsSheet("texts")}
  else if(a==="toggledemo"){DEMO=DEMO==="1"?"0":"1";lsSet("demo",DEMO);render();settingsSheet("demo")}
  else if(a==="saveoffer"){Object.assign(OFR,{on:g("o_on"),t:esc(g("o_t"))||OFR.t,x:esc(g("o_x")),btn:esc(g("o_btn"))||"অফার দেখুন",end:g("o_end"),th:g("o_th"),c1:g("o_c1"),c2:g("o_c2"),ca:g("o_ca"),pop:g("o_pop")});lsSet("ofr",OFR);try{sessionStorage.removeItem("pop")}catch(e){}applyOffer();tick();toast("\u2705 অফার সংরক্ষিত হয়েছে");settingsSheet("offer")}
  else if(a==="resetoffer"){if(API_OK){REM.ofr={};queueSave();setTimeout(()=>location.reload(),900)}else{try{localStorage.removeItem("ofr")}catch(e){}location.reload()}}
  else if(a==="savelook"){const hf=["rat","ram","cpu","gpu","old","off","btn","brand"].filter(k=>!$("k_"+k).checked);Object.assign(SITE,{hf,ar:g("l_ar"),rad:g("l_rad"),sh:g("l_sh"),fs:g("l_fs"),bg:g("l_bg"),cs:g("l_cs")});lsSet("site",SITE);applySite();settingsSheet("look")}
  else if(a==="restore"){try{const d=JSON.parse($("bk").value);EXTRA=d.extra||[];HIDE=d.hide||[];PS=d.pst||{};lsSet("extra",EXTRA);lsSet("hide",HIDE);lsSet("pst",PS);if(d.cfg){Object.assign(CFG,d.cfg);lsSet("cfg",d.cfg)}if(d.site){Object.assign(SITE,d.site);lsSet("site",SITE)}applySite();render();closeSheet()}catch(e){err("ব্যাকআপের লেখাটি ঠিক নেই")}}
  else if(a==="savecfg"){const o={};[["wa","c_wa"],["tel","c_tel"],["email","c_email"],["addr","c_addr"]].forEach(([k,i])=>{if(g(i))o[k]=esc(g(i))});Object.assign(CFG,o);lsSet("cfg",{...ls("cfg",{}),...o});settingsSheet()}
  else if(a==="savepin"){(async()=>{if(g("np").length<6){err("কমপক্ষে ৬ অক্ষর দিন");return}await setPin(g("np"));toast("✅ পিন বদলানো হয়েছে");closeSheet()})()}
}
let EDIT=null;
function editPhone(id){const p=byId(id);if(!p)return;PEND=[];settingsSheet("add");EDIT=id;
  const m={f_m:"m",f_b:"b",f_p:"p",f_op:"o",f_c:"c",f_g:"g",f_ram:"ram",f_rom:"rom",f_cpu:"cpu",f_gpu:"gpu",f_scr:"scr",f_cam:"cam",f_bat:"bat",f_os:"os",f_r:"r",f_n:"n",f_note:"note",f_cat:"cat"};
  for(const k in m){const v=p[m[k]];if(v)$(k).value=v}
  $("f_o").value=p.off?"1":"0";if(p.col.startsWith("http"))$("f_img").value=p.col;
  document.querySelector("#sheetBody h3").textContent="পোশাক সম্পাদনা"}
const SITE=Object.assign({name:"Thread & Trend",tag:"অনলাইন ফ্যাশন স্টোর",dt:"🔥 ধামাকা অফার!",dx:"সীমিত সময়ে বিশেষ ছাড় – শেষ হতে বাকি",deal:"1",brands:BR.join(", "),lim:6,order:["banner","conds","brands","budget","grid"],off:[],ph:"আপনার পছন্দের পোশাক খুঁজুন...",cl:CONDS.map(c=>c[1]).join(", "),bh:"পোশাকের ধরন বাছাই করুন",uh:"আপনার বাজেট",gt:"আপনার জন্য সেরা পোশাক",v:2,ht:"প্রিমিয়াম পোশাক, শোরুমের অভিজ্ঞতা",hs:"নতুন ও সেল / ক্লিয়ারেন্স পোশাক – দেখে, ছুঁয়ে, বুঝে কিনুন",ac:"#111827",col:"2",ar:"1/1",rad:"16",sh:"0 1px 2px rgba(15,23,42,.05),0 10px 26px -14px rgba(15,23,42,.22)",fs:"1",bg:"#ffffff",dbc:"#0f172a",hf:[],ranges:RANGES.slice(1).map(r=>`${r[0]}:${r[1]}-${r[2]===Infinity?"":r[2]}`).join(", ")},(()=>{const o=ls("site",{});if(o.v!==2)delete o.ranges;return o})());
function applySite(){BR=SITE.brands.split(",").map(s=>s.trim()).filter(Boolean);LIM=Math.max(2,parseInt(SITE.lim,10)||6);RANGES=[RANGES[0]].concat(String(SITE.ranges).split(",").map(s=>{const p=s.split(":");if(p.length<2)return null;const q=p[1].split("-");return[p[0].trim(),+q[0]||0,q[1]&&+q[1]?+q[1]:Infinity]}).filter(Boolean));CFG.shop=SITE.name;document.title=SITE.name;
  $("shopName").textContent="👗 "+SITE.name;$("shopTag").textContent=SITE.tag;applyOffer();
  $("q").placeholder=SITE.ph;const CK=["all","new","used","off","unoff"],cl=String(SITE.cl).split(",");CONDS=CK.map((k,i)=>[k,(cl[i]||"").trim()||CONDS[i][1]]);
  $("grid").parentElement.querySelector("h2").textContent=SITE.gt;$("brands").previousElementSibling.textContent=SITE.bh;$("bud").parentElement.previousElementSibling.textContent=SITE.uh;
  document.documentElement.style.setProperty("--ac",SITE.ac);$("grid").style.gridTemplateColumns=`repeat(${SITE.col},minmax(0,1fr))`;design();applyBrand()}
/* গোপন প্রবেশ: দোকানের নামে ৫ বার দ্রুত ট্যাপ, অথবা লিংকের শেষে #admin */
let tp=0,tt;$("shopName").onclick=()=>{tp++;clearTimeout(tt);tt=setTimeout(()=>tp=0,1500);if(tp>=5){tp=0;ADM?settingsSheet():adminLogin()}};
if(location.hash==="#admin")adminLogin();
function phoneMenu(id){const p=byId(id);if(!p)return;const s=PS[id]||{};
  openSheet(`<h3 class="mb-3 truncate text-lg font-bold">${p.m}</h3><div class="space-y-2">${[["edit","✏️ এডিট করুন"],["dup","📄 ডুপ্লিকেট করুন"],["sold",s.s?"↩️ আবার বিক্রির জন্য খুলুন":"✅ বিক্রি হয়ে গেছে চিহ্নিত করুন"],["hide",s.h?"👁️ গ্রাহকদের দেখান":"🙈 গ্রাহকদের থেকে লুকান"],["del","🗑️ মুছে ফেলুন"]].map(x=>`<button data-pa="${x[0]}" data-pid="${id}" class="w-full rounded-xl border px-4 py-3.5 text-left font-semibold ${x[0]==="del"?"border-rose-200 text-rose-600":"border-gray-200"}">${x[1]}</button>`).join("")}</div>`)}
function design(){const st=document.documentElement.style;st.setProperty("--ar",SITE.ar);st.setProperty("--rd",SITE.rad+"px");st.setProperty("--sh",SITE.sh);st.setProperty("--fs",SITE.fs);st.setProperty("--bg",SITE.bg);["rat","ram","cpu","gpu","old","off","btn","brand"].forEach(k=>document.body.classList.toggle("hf-"+k,SITE.hf.includes(k)))}
const _r=render;render=()=>{build();_r();applyOffer();homeUI();$("admBadge").classList.toggle("hidden",!ADM)};
const hx=b=>[...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,"0")).join("");
async function hashPin(pin,salt){const k=await crypto.subtle.importKey("raw",new TextEncoder().encode(pin),"PBKDF2",false,["deriveBits"]);return hx(await crypto.subtle.deriveBits({name:"PBKDF2",hash:"SHA-256",salt:new TextEncoder().encode(salt),iterations:150000},k,256))}
async function setPin(pin){const s=hx(crypto.getRandomValues(new Uint8Array(16)));lsSet("ph",{s,h:await hashPin(pin,s)});try{localStorage.removeItem("pin")}catch(e){}}
async function checkPin(pin){const o=ls("ph",null);return !!o&&await hashPin(pin,o.s)===o.h}
function toast(m){const t=document.createElement("div");t.textContent=m;t.className="pointer-events-none fixed left-1/2 top-4 z-[60] -translate-x-1/2 rounded-full bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white shadow-xl";document.body.appendChild(t);setTimeout(()=>t.remove(),2300)}
let it;function idle(){clearTimeout(it);if(ADM)it=setTimeout(()=>{if(API_OK)apiLogout();ADM=false;try{sessionStorage.removeItem("adm")}catch(e){}render();closeSheet();toast("নিরাপত্তার জন্য অটো লগআউট হয়েছে")},15*60000)}
["pointerdown","keydown"].forEach(ev=>addEventListener(ev,idle,{passive:true}));
$("admBadge").onclick=()=>settingsSheet();
document.addEventListener("keydown",e=>{if(e.key!=="Enter")return;const t=e.target;if(!t||t.tagName!=="INPUT"||t.type==="file")return;
  if(t.id==="q"||t.id==="bud"){e.preventDefault();t.blur();feedback(0);return}
  if(t.id!=="pin"&&t.id!=="pin2"){e.preventDefault();t.blur()}});
document.addEventListener("pointerdown",e=>{const a=document.activeElement;if(a&&/^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName)&&!e.target.closest("input,textarea,select,label"))a.blur()},{passive:true});
$("sheet").addEventListener("click",e=>{if(e.target.id==="sheet")closeSheet()});
$("sheetBody").addEventListener("keydown",e=>{if(e.key==="Enter"&&(e.target.id==="pin"||e.target.id==="pin2")){e.preventDefault();const b=$("sheetBody").querySelector('[data-do="login"],[data-do="setup"]');if(b)b.click()}});
$("sort").onchange=e=>{S.sort=e.target.value;upd()};
if(ADM)idle();
async function addImg(du){let u=du;
  if(API_OK){try{const r=await fetch("/api/upload",{method:"POST",headers:{"content-type":"application/json","x-csrf-token":CSRF},credentials:"same-origin",body:JSON.stringify({data:du})});const j=await r.json();if(!r.ok){toast("⚠️ "+(j.error||"আপলোড হয়নি"));return}u=j.url}catch(e){toast("⚠️ আপলোড হয়নি");return}}
  PEND.push(u);$("fprev").innerHTML=PEND.map(x=>`<img src="${x}" alt="" class="h-14 w-14 rounded-lg border object-cover">`).join("")}
function readFiles(fl){PEND=[];[...fl].slice(0,5).forEach(f=>{if(!/^image\/(jpeg|png|webp)$/.test(f.type)||f.size>8e6){toast("শুধু jpg/png/webp, ৮MB এর মধ্যে");return}
  const im=new Image(),fr=new FileReader();im.onload=()=>{const m=Math.min(1,800/Math.max(im.width,im.height)),c=document.createElement("canvas");c.width=Math.round(im.width*m);c.height=Math.round(im.height*m);c.getContext("2d").drawImage(im,0,0,c.width,c.height);addImg(c.toDataURL("image/jpeg",.82))};im.onerror=()=>toast("ছবিটি পড়া যায়নি");fr.onload=()=>{im.src=fr.result};fr.readAsDataURL(f)})}
$("sheetBody").addEventListener("change",e=>{if(e.target.id==="f_files")readFiles(e.target.files)});
function homeUI(){
  $("demoBar").classList.toggle("hidden",DEMO!=="1");$("heroT").textContent=SITE.ht;$("heroS").textContent=SITE.hs;
  applyHero();applyTxt();applyVis();applySlides();applyFooter();applyCats();
  const act=S.q||S.b||S.cat||S.c!=="all"||S.deal||S.min>0||S.max<Infinity;$("rows").classList.toggle("hidden",!!act||!P.length||!!VIS.rows);
  const cd=l=>l.map(p=>`<div class="w-44 shrink-0">${card(p)}</div>`).join("");
  $("best").innerHTML=cd([...P].sort((x,y)=>y.r*y.n-x.r*x.n).slice(0,6));$("newest").innerHTML=cd([...P].sort((x,y)=>y.id-x.id).slice(0,6));
  $("locT").textContent=SITE.name;$("locA").textContent="📍 "+CFG.addr;$("locC").href="tel:"+CFG.tel;$("locW").href="https://wa.me/"+CFG.wa;$("locE").href="mailto:"+CFG.email;$("locM").href="https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(CFG.addr);$("ftN").textContent=SITE.name;$("yr").textContent=new Date().getFullYear()}
const gh=$("grid").onclick;$("best").onclick=gh;$("newest").onclick=gh;
$("heroGo").onclick=()=>$("grid").scrollIntoView();$("heroOf").onclick=()=>{S.deal=true;upd();$("grid").scrollIntoView()};
const REG=[["hero.lbl","হিরো ছোট লেবেল","PREMIUM SHOWROOM"],["hero.b1","হিরো বাটন ১","সব পোশাক দেখুন"],["hero.b2","হিরো বাটন ২","🔥 অফার"],
["trust.1","বিশ্বাসের সারি ১","✔ অরিজিনাল পোশাক"],["trust.2","বিশ্বাসের সারি ২","🛡️ ওয়ারেন্টি"],["trust.3","বিশ্বাসের সারি ৩","📍 শোরুমে দেখে কিনুন"],["trust.4","বিশ্বাসের সারি ৪","💬 দ্রুত রেসপন্স"],
["rows.best","প্রথম সারির শিরোনাম","⭐ সেরা বিক্রি"],["rows.new","দ্বিতীয় সারির শিরোনাম","🆕 নতুন এসেছে"],
["why.t","সুবিধা সেকশনের শিরোনাম","কেন আমাদের শোরুম"],["why.1t","সুবিধা ১ – শিরোনাম","📍 শোরুমে সরাসরি দেখুন"],["why.1d","সুবিধা ১ – বর্ণনা","পোশাক হাতে নিয়ে দেখে, যাচাই করে তবেই কিনুন।"],
["why.2t","সুবিধা ২ – শিরোনাম","🛡️ ওয়ারেন্টি ও বিক্রয়োত্তর সেবা"],["why.2d","সুবিধা ২ – বর্ণনা","শর্ত ও মেয়াদ প্রতিটি পোশাকের জন্য দোকানে জানুন।"],
["why.3t","সুবিধা ৩ – শিরোনাম","💬 দ্রুত যোগাযোগ"],["why.3d","সুবিধা ৩ – বর্ণনা","হোয়াটসঅ্যাপ বা পোশাকে জানুন দাম ও স্টক।"],["why.note","সুবিধার নিচের ছোট নোট","ডেমো কনটেন্ট – আপনার প্রকৃত তথ্য দিয়ে বদলান।"],
["foot.1","ফুটারের নীতি-লাইন","গোপনীয়তা নীতি · রিটার্ন ও ওয়ারেন্টি নীতি (দোকানের নীতি যোগ করুন)"],["foot.2","ফুটারের অধিকার-লাইন","সব অধিকার সংরক্ষিত"],
["demo.bar","ডেমো বারের লেখা","🧪 ডেমো মোড · নমুনা পণ্য, দাম ও রিভিউ – আসল তথ্য দিয়ে বদলান"],
["nav.home","নিচের মেনু – হোম","হোম"],["nav.filter","নিচের মেনু – ফিল্টার","ফিল্টার"],["nav.cart","নিচের মেনু – কার্ট","কার্ট / বুকিং"],["nav.contact","নিচের মেনু – যোগাযোগ","যোগাযোগ"]];
const SECS=[["hero","হিরো ব্যানার (উপরের বড় ছবি)"],["slider","স্লাইডার ব্যানার"],["trust","বিশ্বাসের সারি"],["rows","সেরা বিক্রি ও নতুন এসেছে সারি"],["why","কেন আমাদের শোরুম"],["loc","লোকেশন ও যোগাযোগ কার্ড"],["foot","ফুটার"]];
const HT={light:["#e0e7ff","#ffffff"],dark:["#0f172a","#1e293b"],warm:["#ffedd5","#fff7ed"],green:["#d1fae5","#ecfdf5"],purple:["#ede9fe","#faf5ff"]};
let TXTS=ls("txt",{}),VIS=ls("vis",{}),HI=null;
const HERO=Object.assign({on:"1",th:"light",c1:"#e0e7ff",c2:"#ffffff",img:"",p1:"auto",p2:"auto"},ls("hero",{}));
const tx=(k,d)=>TXTS[k]||d;
function applyTxt(){document.querySelectorAll("[data-t]").forEach(el=>{if(el.dataset.d===undefined)el.dataset.d=el.textContent;el.textContent=TXTS[el.dataset.t]||el.dataset.d})}
function applyVis(){for(const[k]of SECS)if(k!=="rows"&&k!=="slider"&&$(k))$(k).classList.toggle("hidden",!!VIS[k])}
function applyHero(){const b=$("heroBox"),dk=lum(HERO.c1)<.55;
  b.style.background=`radial-gradient(120% 120% at 100% 0%,${HERO.c1} 0,${HERO.c2} 100%)`;
  $("hero").classList.toggle("hidden",String(HERO.on)==="0"||!!VIS.hero);
  const fg=dk?"#fff":"#0f172a",g=$("heroGo"),o=$("heroOf");
  $("heroT").style.color=fg;$("heroS").style.color=dk?"#cbd5e1":"#475569";$("heroL").style.color=dk?"#94a3b8":"#64748b";
  g.style.setProperty("background-color",dk?"#fff":"var(--ac,#111827)","important");g.style.setProperty("color",dk?"#0f172a":"#fff","important");o.style.background=dk?"transparent":"#fff";o.style.color=fg;o.style.borderColor=dk?"rgba(255,255,255,.4)":"#d1d5db";
  const ph=$("heroPh");
  if(HERO.img){ph.innerHTML=`<img src="${HERO.img}" alt="" class="h-full w-full object-contain" style="filter:drop-shadow(0 16px 14px rgba(15,23,42,.25))">`;return}
  const pk=v=>/^\d+$/.test(String(v))?byId(+v):null,a=pk(HERO.p1)||P.find(x=>x.b==="নারীদের")||P[0],c=pk(HERO.p2)||P.find(x=>x.b==="কিশোর")||P[1]||a;
  if(a)ph.innerHTML=`<div class="-mr-5 h-[86%] w-[56%]" style="transform:rotate(-8deg);filter:drop-shadow(0 16px 14px rgba(15,23,42,.28))">${phoneSvg(a.col,a.b,"b")}</div><div class="h-full w-[56%]" style="transform:rotate(6deg);filter:drop-shadow(0 18px 16px rgba(15,23,42,.3))">${phoneSvg(c.col,c.b)}</div>`}
function readHero(f){if(!f)return;if(!/^image\/(jpeg|png|webp)$/.test(f.type)||f.size>8e6){toast("শুধু jpg/png/webp, ৮MB এর মধ্যে");return}
  const im=new Image(),fr=new FileReader();im.onload=async()=>{const m=Math.min(1,1000/Math.max(im.width,im.height)),c=document.createElement("canvas");c.width=Math.round(im.width*m);c.height=Math.round(im.height*m);c.getContext("2d").drawImage(im,0,0,c.width,c.height);let u=c.toDataURL("image/jpeg",.82);
    if(API_OK){try{const r=await fetch("/api/upload",{method:"POST",headers:{"content-type":"application/json","x-csrf-token":CSRF},credentials:"same-origin",body:JSON.stringify({data:u})});const jj=await r.json();if(!r.ok){toast("⚠️ "+(jj.error||"আপলোড হয়নি"));return}u=jj.url}catch(e){toast("⚠️ আপলোড হয়নি");return}}
    HI=u;$("hprev").innerHTML=`<img src="${u}" alt="" class="h-20 rounded-lg border object-contain">`};
  im.onerror=()=>toast("ছবিটি পড়া যায়নি");fr.onload=()=>{im.src=fr.result};fr.readAsDataURL(f)}
$("sheetBody").addEventListener("change",async e=>{const i=e.target.id;
  if(i==="h_file")readHero(e.target.files[0]);
  else if(i==="b_file"){const u=await pickImg(e.target.files[0],600);if(u){BL=u;$("bprev").innerHTML=`<img src="${u}" alt="" class="h-12 rounded-lg border bg-white object-contain p-1">`}}
  else if(i==="sl_file"){slCap();const u=await pickImg(e.target.files[0],1200);if(u){SL.push({img:u,cap:"",link:""});slidesView()}}});
$("sheetBody").addEventListener("input",e=>{const i=e.target.id;if(i==="h_th"&&HT[e.target.value]){$("h_c1").value=HT[e.target.value][0];$("h_c2").value=HT[e.target.value][1]}else if(i==="h_c1"||i==="h_c2")$("h_th").value="custom"});
/* ===== লোগো, ফন্ট, সোশ্যাল, পেজ, স্লাইডার, ক্যাটাগরি, সেকশন সাজানো ===== */
const FONTS={"":["ডিফল্ট (Hind Siliguri)",""],anek:["Anek Bangla","Anek+Bangla"],baloo:["Baloo Da 2","Baloo+Da+2"],noto:["Noto Sans Bengali","Noto+Sans+Bengali"],tiro:["Tiro Bangla (সেরিফ)","Tiro+Bangla"]};
const SECORD=[["hero","হিরো ব্যানার"],["slider","স্লাইডার ব্যানার"],["offerSec","অফার ব্যানার"],["trust","বিশ্বাসের সারি"],["rows","সেরা বিক্রি ও নতুন সারি"],["filters","ফিল্টার ও সার্চ অংশ"],["gridSec","পোশাকের তালিকা"],["why","কেন আমাদের শোরুম"],["loc","লোকেশন কার্ড"],["foot","ফুটার"]];
const ordIds=()=>{const d=SECORD.map(x=>x[0]),o=(ls("ord",[])||[]).filter(x=>d.includes(x));return[...new Set([...o,...d.filter(x=>!o.includes(x))])]};
function applyOrder(){ordIds().forEach((k,i)=>{const e=$(k);if(e)e.style.order=i+1})}
function applyFont(){const f=FONTS[SITE.font],st=document.documentElement.style;let l=$("ffl");
  if(f&&f[1]){if(!l){l=document.createElement("link");l.id="ffl";l.rel="stylesheet";document.head.appendChild(l)}l.href=`https://fonts.googleapis.com/css2?family=${f[1]}:wght@400;500;600;700&display=swap`;st.setProperty("--ff",`"${f[0].replace(/ \(.*/,"")}",Inter,system-ui,sans-serif`)}
  else{if(l)l.remove();st.removeProperty("--ff")}}
function applyBrand(){const n=$("shopName");if(SITE.logo)n.innerHTML=`<img src="${SITE.logo}" alt="${SITE.name}" class="h-9 max-w-[180px] object-contain">`;else n.textContent="👗 "+SITE.name;
  ["std","compact","image"].forEach(x=>document.body.classList.remove("cs-"+x));document.body.classList.add("cs-"+(SITE.cs||"std"));applyFont();applyOrder()}
function pickImg(f,max){return new Promise(res=>{if(!f)return res(null);if(!/^image\/(jpeg|png|webp)$/.test(f.type)||f.size>8e6){toast("শুধু jpg/png/webp, ৮MB এর মধ্যে");return res(null)}
  const im=new Image(),fr=new FileReader();im.onload=async()=>{const m=Math.min(1,max/Math.max(im.width,im.height)),c=document.createElement("canvas");c.width=Math.round(im.width*m);c.height=Math.round(im.height*m);c.getContext("2d").drawImage(im,0,0,c.width,c.height);
    let q=.82,u=c.toDataURL("image/jpeg",q);while(u.length>1100000&&q>.4){q-=.12;u=c.toDataURL("image/jpeg",q)}
    if(API_OK){try{const r=await fetch("/api/upload",{method:"POST",headers:{"content-type":"application/json","x-csrf-token":CSRF},credentials:"same-origin",body:JSON.stringify({data:u})});const jj=await r.json();if(!r.ok){toast("⚠️ "+(jj.error||"আপলোড হয়নি"));return res(null)}u=jj.url}catch(e){toast("⚠️ আপলোড হয়নি");return res(null)}}
    res(u)};im.onerror=()=>{toast("ছবিটি পড়া যায়নি");res(null)};fr.onload=()=>{im.src=fr.result};fr.readAsDataURL(f)})}
// --- স্লাইডার ---
let slT=0;
const slList=()=>(ls("slides",[])||[]).filter(s=>s&&s.img);
function paintDots(){const b=$("slides");if(!b.children.length)return;const i=Math.round(b.scrollLeft/b.clientWidth);[...$("dots").children].forEach((d,k)=>{d.style.background=k===i?"var(--ac,#111827)":"#d1d5db";d.style.width=k===i?"18px":"6px"})}
function applySlides(){const L=slList(),sec=$("slider"),off=!L.length||!!VIS.slider;sec.classList.toggle("hidden",off);if(off)return;
  $("slides").innerHTML=L.map((s,i)=>`<div data-sl="${i}" class="relative w-full shrink-0 snap-center ${s.link?"cursor-pointer":""}" style="aspect-ratio:16/7"><img src="${s.img}" alt="${s.cap||"ব্যানার"}" class="h-full w-full object-cover"${i?' loading="lazy"':""}>${s.cap?`<div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 text-sm font-semibold text-white">${s.cap}</div>`:""}</div>`).join("");
  $("dots").innerHTML=L.length>1?L.map(()=>`<span class="h-1.5 w-1.5 rounded-full bg-gray-300 transition-all"></span>`).join(""):"";paintDots()}
$("slides").addEventListener("scroll",paintDots,{passive:true});$("slides").addEventListener("touchstart",()=>{slT=Date.now()},{passive:true});
$("slides").onclick=e=>{const d=e.target.closest("[data-sl]");if(!d)return;const s=slList()[+d.dataset.sl];if(!s||!s.link)return;
  if(s.link==="offer"){S.deal=true;upd();$("gridSec").scrollIntoView()}else if(s.link==="all")$("gridSec").scrollIntoView();else if(/^https:\/\//.test(s.link))window.open(s.link,"_blank","noopener,noreferrer")};
setInterval(()=>{const b=$("slides"),n=b.children.length;if(n<2||document.hidden||Date.now()-slT<8000)return;b.scrollTo({left:((Math.round(b.scrollLeft/b.clientWidth)+1)%n)*b.clientWidth,behavior:"smooth"})},4500);
let SL=[];
const slCap=()=>SL.forEach((s,i)=>{if($("sc_"+i)){s.cap=esc($("sc_"+i).value);s.link=$("sl_"+i).value.trim()}});
function slidesView(){openSheet(`${back}<h3 class="mb-1 text-lg font-bold">🎞️ স্লাইডার ব্যানার</h3><p class="mb-3 text-xs text-gray-500">সর্বোচ্চ ৮টি ছবি (১৬:৭ মাপ ভালো)। লিংক ঘরে লিখুন: <b>offer</b> (অফারের পোশাক), <b>all</b> (সব পোশাক), অথবা https:// দিয়ে শুরু ঠিকানা; ফাঁকা রাখলে ক্লিক কাজ করবে না।</p>
  ${SL.map((s,i)=>`<div class="mb-3 rounded-2xl border border-gray-200 p-3"><img src="${s.img}" alt="" class="mb-2 h-20 w-full rounded-lg object-cover"><div class="space-y-2">${inp("sc_"+i,"ছোট লেখা (ঐচ্ছিক)","")}${inp("sl_"+i,"লিংক","")}</div><button data-do="sldel" data-i="${i}" class="mt-2 text-xs font-medium text-rose-600">এই স্লাইড মুছুন</button></div>`).join("")}
  ${SL.length<8?`<label class="block text-xs font-medium text-gray-600">নতুন ছবি যোগ করুন<input id="sl_file" type="file" accept="image/jpeg,image/png,image/webp" class="${CL}"></label>`:""}<p id="err" class="mt-2 text-sm text-rose-600"></p>${btn("slsave","স্লাইডার সংরক্ষণ করুন")}`);
  SL.forEach((s,i)=>{$("sc_"+i).value=s.cap||"";$("sl_"+i).value=s.link||""})}
// --- পেজ (নীতিমালা ইত্যাদি) ---
let PG=[];
const pgCap=()=>PG.forEach((p,i)=>{if($("pt_"+i)){p.t=esc($("pt_"+i).value);p.b=$("pb_"+i).value.replace(/[<>`]/g,"")}});
function pagesView(){openSheet(`${back}<h3 class="mb-1 text-lg font-bold">📄 পেজ (নীতিমালা ইত্যাদি)</h3><p class="mb-3 text-xs text-gray-500">ফুটারে লিংক হিসেবে দেখাবে, যেমন গোপনীয়তা নীতি, রিটার্ন ও ওয়ারেন্টি, আমাদের সম্পর্কে। সর্বোচ্চ ১০টি।</p>
  ${PG.map((p,i)=>`<div class="mb-3 rounded-2xl border border-gray-200 p-3">${inp("pt_"+i,"পেজের নাম","")}<label class="mt-2 block text-xs font-medium text-gray-600">লেখা<textarea id="pb_${i}" rows="6" class="${CL}"></textarea></label><button data-do="pgdel" data-i="${i}" class="mt-2 text-xs font-medium text-rose-600">এই পেজ মুছুন</button></div>`).join("")}
  ${PG.length<10?btn("pgadd","➕ নতুন পেজ","border border-gray-300"):""}<p id="err" class="mt-2 text-sm text-rose-600"></p>${btn("pgsave","পেজ সংরক্ষণ করুন")}`);
  PG.forEach((p,i)=>{$("pt_"+i).value=p.t;$("pb_"+i).value=p.b})}
function applyFooter(){const s=[["fb","Facebook"],["ig","Instagram"],["yt","YouTube"],["tt","TikTok"]].filter(([k])=>/^https:\/\//.test(CFG[k]||""));
  $("soc").innerHTML=s.map(([k,n])=>`<a href="${CFG[k]}" target="_blank" rel="noopener noreferrer" class="rounded-full border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700">${n}</a>`).join("");
  $("pgl").innerHTML=(ls("pages",[])||[]).map(p=>`<button data-pg="${p.id}" class="underline underline-offset-2">${p.t}</button>`).join("")}
$("pgl").onclick=e=>{const b=e.target.closest("[data-pg]");if(!b)return;const p=(ls("pages",[])||[]).find(x=>x.id===b.dataset.pg);if(!p)return;
  openSheet(`<h3 class="mb-3 text-lg font-bold">${p.t}</h3><div id="pgb" class="whitespace-pre-wrap text-sm leading-7 text-gray-700"></div>`);$("pgb").textContent=p.b}
// --- ক্যাটাগরি চিপ ---
function applyCats(){const c=[...new Set(P.map(p=>p.cat).filter(Boolean))];$("cats").innerHTML=c.map(x=>`<button class="pill ${S.cat===x?"on":""}" data-k="${x}">🏷️ ${x}</button>`).join("")}
$("cats").onclick=e=>{const b=e.target.closest("[data-k]");if(b){S.cat=S.cat===b.dataset.k?"":b.dataset.k;upd()}};
// --- ব্র্যান্ডিং ও সাজানো ভিউ-এর অবস্থা ---
let BL=null;
const OT={navy:["#0f172a","#1e293b","#fbbf24"],red:["#7f1d1d","#be123c","#fde68a"],green:["#064e3b","#047857","#fde68a"],purple:["#3b0764","#6d28d9","#fcd34d"],gold:["#fff7ed","#ffedd5","#b45309"]};
const OFR=Object.assign({on:"1",t:"🔥 ধামাকা অফার!",x:"সীমিত সময়ে বিশেষ ছাড় – শেষ হওয়ার আগেই কিনুন",btn:"অফার দেখুন",end:"",th:"navy",c1:"#0f172a",c2:"#1e293b",ca:"#fbbf24",pop:"1"},ls("ofr",{}));
const offerEnd=()=>{if(OFR.end){const t=new Date(OFR.end).getTime();if(!isNaN(t))return t}const d=new Date();d.setDate(d.getDate()+3);d.setHours(23,59,59,0);return d.getTime()};
const offerOn=()=>String(OFR.on)!=="0"&&offerEnd()>Date.now();
const lum=h=>{const n=parseInt(String(h).slice(1),16)||0;return(.299*(n>>16)+.587*(n>>8&255)+.114*(n&255))/255};
function applyOffer(){const L=P.filter(p=>p.o>p.p),mx=Math.max(0,...L.map(p=>Math.round((1-p.p/p.o)*100))),st=document.documentElement.style,lt=lum(OFR.c1)<.55;
  $("dealT").textContent=OFR.t;$("dealX").textContent=OFR.x+(mx?" · সর্বোচ্চ "+mx+"% ছাড়":"");
  st.setProperty("--db",`linear-gradient(135deg,${OFR.c1},${OFR.c2})`);st.setProperty("--oa",OFR.ca);st.setProperty("--ot",lt?"#fff":"#1f2937");st.setProperty("--os",lt?"#cbd5e1":"#4b5563");st.setProperty("--ob",lum(OFR.ca)>.55?"#1f2937":"#fff");
  $("deal").classList.toggle("hidden",!offerOn());$("dealBtn").textContent=S.deal?"সব পোশাক দেখুন":OFR.btn}
function tick(){const s=Math.max(0,Math.floor((offerEnd()-Date.now())/1000)),p=x=>x.toLocaleString("en-IN",{minimumIntegerDigits:2,useGrouping:false}),d=Math.floor(s/86400);
  $("cd").textContent=(d?d+" দিন  ":"")+`${p(Math.floor(s%86400/3600))} : ${p(Math.floor(s%3600/60))} : ${p(s%60)}`;$("deal").classList.toggle("hidden",!offerOn())}
function opv(){const v=id=>($(id)||{}).value||"";if(!$("opv"))return;const lt=lum(v("o_c1"))<.55;$("opv").style.background=`linear-gradient(135deg,${v("o_c1")},${v("o_c2")})`;$("opvT").textContent=v("o_t");$("opvT").style.color=v("o_ca");$("opvX").textContent=v("o_x");$("opvX").style.color=lt?"#e2e8f0":"#4b5563"}
$("sheetBody").addEventListener("input",e=>{const i=e.target.id;if(i==="o_th"&&OT[e.target.value]){const[a,b,c]=OT[e.target.value];$("o_c1").value=a;$("o_c2").value=b;$("o_ca").value=c}else if(i==="o_c1"||i==="o_c2"||i==="o_ca")$("o_th").value="custom";opv()});
function offerPop(){if(ADM||!offerOn()||String(OFR.pop)==="0")return;try{if(sessionStorage.getItem("pop"))return;sessionStorage.setItem("pop","1")}catch(e){}
  const L=P.filter(p=>p.o>p.p);if(!L.length)return;const mx=Math.max(...L.map(p=>Math.round((1-p.p/p.o)*100)));
  $("popT").textContent=OFR.t;$("popT").style.color="var(--oa)";$("popX").textContent=L.length+"টি পোশাকে বিশেষ ছাড় · সর্বোচ্চ "+mx+"% পর্যন্ত";$("popX").style.color="var(--os)";$("cd2").style.color="var(--ot)";
  $("pop").firstElementChild.style.background="var(--db)";const g=$("popGo");g.style.background="var(--oa)";g.style.color="var(--ob)";
  $("pop").classList.remove("hidden");$("pop").classList.add("flex")}
const popClose=()=>{$("pop").classList.add("hidden");$("pop").classList.remove("flex")};
$("pop").onclick=e=>{if(e.target.id==="pop"||e.target.closest("[data-x]"))popClose()};
$("popGo").onclick=()=>{popClose();S.deal=true;S.open=false;render();$("grid").scrollIntoView()};
setInterval(()=>{const c=$("cd2");if(c)c.textContent=$("cd").textContent},1000);
setTimeout(offerPop,700);
applySite();tick();setInterval(tick,1000);render();

})();

'use strict';
const $=s=>document.querySelector(s);
const FALL='data:image/svg+xml,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120"><rect width="120" height="120" fill="#e3e6e8"/><path d="M30 85l20-25 15 18 10-12 15 19z" fill="#b8bec2"/><circle cx="45" cy="42" r="8" fill="#b8bec2"/></svg>');
const KEY='s7gallery';
const F={o:'',mono:'grayscale(1)',sepia:'sepia(.8)',warm:'sepia(.35) saturate(1.3)',cool:'hue-rotate(185deg) saturate(.7) brightness(1.05)',vivid:'saturate(1.6) contrast(1.1)',fade:'contrast(.85) brightness(1.1) saturate(.8)'};
let S,list=[],vi=0,tok=0;
const P=n=>String(n).padStart(2,0),D=t=>new Date(t);
const MON=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const fmtD=t=>{const d=D(t);return `${MON[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`};
const fmtT=t=>{const d=D(t),h=d.getHours();return `${h%12||12}:${P(d.getMinutes())} ${h<12?'AM':'PM'}`};
const dur=s=>`${Math.floor(s/60)}:${P(s%60)}`;

/* 저장소 (기존 데이터 읽기 전용) */
const db=()=>new Promise((r,j)=>{const q=indexedDB.open('s7g',1);q.onupgradeneeded=()=>q.result.createObjectStore('k');q.onsuccess=()=>r(q.result);q.onerror=j});
const idbGet=async()=>{try{const d=await db();return await new Promise(r=>{const q=d.transaction('k').objectStore('k').get(KEY);q.onsuccess=()=>r(q.result);q.onerror=()=>r()})}catch(e){}};

/* 샘플 사진: 기존 코드 그대로 */
const rnd=s=>()=>{s|=0;s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};
const hsl=(h,s,l)=>`hsl(${h|0},${s}%,${l}%)`;
function paint(c,k,seed){const x=c.getContext('2d'),w=c.width,h=c.height,r=rnd(seed),H=r()*360,R=(a,b)=>a+r()*(b-a),g=x.createLinearGradient(0,0,0,h);
const circ=(px,py,rad,col)=>{x.fillStyle=col;x.beginPath();x.arc(px,py,rad,0,7);x.fill()};
if(k=='landscape'){g.addColorStop(0,hsl(R(190,220),70,R(55,70)));g.addColorStop(.65,hsl(R(20,50),85,R(70,85)));x.fillStyle=g;x.fillRect(0,0,w,h);circ(R(.2,.8)*w,h*R(.15,.35),h*.07,'#fff9');
for(let i=0;i<3;i++){x.fillStyle=hsl(H,25,52-i*14);x.beginPath();x.moveTo(0,h);for(let p=0;p<=w;p+=w/8)x.lineTo(p,h*(.6+i*.1)-r()*h*.22);x.lineTo(w,h);x.fill()}x.fillStyle=hsl(110,35,28);x.fillRect(0,h*.88,w,h*.12)}
else if(k=='food'){x.fillStyle=hsl(R(20,35),45,28);x.fillRect(0,0,w,h);for(let i=0;i<9;i++){x.fillStyle='#0001';x.fillRect(0,i*h/9,w,2)}
circ(w*.45,h*.52,h*.4,'#f4f4f2');circ(w*.45,h*.52,h*.32,'#e8e8e4');for(let i=0;i<8;i++)circ(w*.45+R(-.2,.2)*h,h*.52+R(-.2,.2)*h,h*R(.04,.09),hsl(R(0,60),70,R(40,60)));for(let i=0;i<5;i++)circ(w*.45+R(-.2,.2)*h,h*.52+R(-.2,.2)*h,h*.045,hsl(R(90,130),55,38));
circ(w*.88,h*.25,h*.13,'#fff');circ(w*.88,h*.25,h*.1,hsl(25,60,22))}
else if(k=='person'){g.addColorStop(0,hsl(H,40,75));g.addColorStop(1,hsl(H+40,40,55));x.fillStyle=g;x.fillRect(0,0,w,h);x.fillStyle=hsl(R(0,360),45,38);x.beginPath();x.ellipse(w/2,h*1.02,w*.3,h*.32,0,0,7);x.fill();
x.fillStyle=hsl(25,45,64);x.fillRect(w*.46,h*.58,w*.08,h*.12);circ(w/2,h*.45,h*.2,hsl(25,50,R(62,78)));x.fillStyle=hsl(R(15,40),40,R(12,30));x.beginPath();x.arc(w/2,h*.43,h*.21,Math.PI,0);x.fill();
circ(w*.44,h*.46,h*.016,'#222');circ(w*.56,h*.46,h*.016,'#222');x.strokeStyle='#a33';x.lineWidth=3;x.beginPath();x.arc(w/2,h*.5,h*.05,.2,2.9);x.stroke()}
else if(k=='pet'){x.fillStyle=hsl(R(30,200),30,R(70,85));x.fillRect(0,0,w,h);x.fillStyle=hsl(30,30,55);x.fillRect(0,h*.78,w,h*.22);const fur=hsl(R(20,45),R(35,60),R(35,70));
x.fillStyle=fur;x.beginPath();x.ellipse(w/2,h*.82,w*.28,h*.22,0,0,7);x.fill();circ(w/2,h*.48,h*.24,fur);for(const s of[-1,1]){x.beginPath();x.moveTo(w/2+s*h*.1,h*.3);x.lineTo(w/2+s*h*.26,h*.12);x.lineTo(w/2+s*h*.22,h*.38);x.fill()}
circ(w/2-h*.09,h*.46,h*.025,'#111');circ(w/2+h*.09,h*.46,h*.025,'#111');circ(w/2,h*.55,h*.03,'#d77');circ(w/2,h*.6,h*.07,'#fff6')}
else if(k=='screenshot'){x.fillStyle='#f4f5f6';x.fillRect(0,0,w,h);x.fillStyle='#1ba39b';x.fillRect(0,0,w,h*.09);x.fillStyle='#fff';x.fillRect(w*.05,h*.035,w*.4,h*.02);
for(let i=0;i<8;i++){const m=i%2,bw=w*R(.35,.65);x.fillStyle=m?'#fee500':'#fff';x.beginPath();x.roundRect?x.roundRect(m?w*.93-bw:w*.07,h*(.13+i*.105),bw,h*.07,8):x.rect(m?w*.93-bw:w*.07,h*(.13+i*.105),bw,h*.07);x.fill();x.fillStyle='#8884';x.fillRect((m?w*.93-bw:w*.07)+10,h*(.13+i*.105)+h*.03,bw-20,3)}}
else{g.addColorStop(0,hsl(R(25,50),60,80));g.addColorStop(1,hsl(R(20,40),40,55));x.fillStyle=g;x.fillRect(0,0,w,h);x.fillStyle='#fff8';x.fillRect(w*.08,h*.08,w*.3,h*.4);x.fillStyle=hsl(R(20,35),45,32);x.fillRect(0,h*.72,w,h*.28);
x.fillStyle=hsl(R(0,360),50,45);x.fillRect(w*.2,h*.5,w*.35,h*.07);x.fillStyle=hsl(R(0,360),50,60);x.fillRect(w*.22,h*.45,w*.3,h*.05);x.fillStyle='#fff';x.fillRect(w*.65,h*.58,w*.12,h*.14);circ(w*.84,h*.55,h*.1,hsl(110,40,36))}
const v=x.createRadialGradient(w/2,h/2,h*.3,w/2,h/2,h*.9);v.addColorStop(0,'#0000');v.addColorStop(1,'#0005');x.fillStyle=v;x.fillRect(0,0,w,h)}
const stamp=t=>{const d=D(t);return `${d.getFullYear()}${P(d.getMonth()+1)}${P(d.getDate())}_${P(d.getHours())}${P(d.getMinutes())}${P(d.getSeconds())}`};
function seed(){const K=['landscape','food','person','pet','daily','landscape','food','pet','daily','person'],r=rnd(5),ps=[];let t=new Date(2016,9,3,9,0).getTime();
for(let i=0;i<40;i++){t+=(r()*30+6)*36e5;const shot=i%9==4,vid=i%11==5,k=shot?'screenshot':K[i%10];
ps.push({id:'s'+i,ts:Math.round(t),kind:k,seed:i*97+13,type:vid?'video':'photo',dur:vid?8+i:0,album:shot?'screenshot':(k=='person'||k=='pet')&&i%3==0?'a1':'camera',fav:i%13==0?1:0,w:shot?1440:4032,h:shot?2560:3024,size:Math.round((shot?.4:1.8)*1e6+r()*2e6)})}
ps.forEach(p=>p.name=(p.kind=='screenshot'?'Screenshot_':p.type=='video'?'':'')+stamp(p.ts).replace('_',p.kind=='screenshot'?'-':'_')+(p.kind=='screenshot'?'.png':p.type=='video'?'.mp4':'.jpg'));
ps.forEach(p=>{if(p.type=='photo'&&p.kind!='screenshot')p.name='IMG_'+p.name});
return{photos:ps,albums:[{id:'a1',name:'가족'}],cols:3}}

/* 렌더링 */
const IC={},byId=id=>S.photos.find(p=>p.id==id);
const src=p=>new Promise((res,rej)=>{if(p.frames)p=byId(p.frames[0])||p;if(IC[p.id])return res(IC[p.id]);
if(p.data){const im=new Image();im.onload=()=>res(IC[p.id]=im);im.onerror=rej;im.src=p.data;return}
const c=document.createElement('canvas'),s=p.kind=='screenshot';c.width=s?450:800;c.height=s?800:600;paint(c,p.kind,p.seed);res(IC[p.id]=c)});
const fstr=e=>e?`brightness(${100+(e.b||0)}%) contrast(${100+(e.c||0)}%) saturate(${100+(e.s||0)}%) ${F[e.f||'o']}`:'none';
async function render(p,W,e=p.edit){const im=await src(p);let sw=im.naturalWidth||im.width,sh=im.naturalHeight||im.height,sx=0,sy=0;
if(e&&e.crop){const a=e.crop;if(sw/sh>a){const n=sh*a;sx=(sw-n)/2;sw=n}else{const n=sw/a;sy=(sh-n)/2;sh=n}}
const sc=Math.min(1,W/Math.max(sw,sh)),dw=sw*sc,dh=sh*sc,rot=((e&&e.rot)||0)%360,q=rot%180!=0,c=document.createElement('canvas');
c.width=q?dh:dw;c.height=q?dw:dh;const x=c.getContext('2d');x.filter=fstr(e);x.translate(c.width/2,c.height/2);x.rotate(rot*Math.PI/180);if(e&&e.flip)x.scale(-1,1);x.drawImage(im,sx,sy,sw,sh,-dw/2,-dh/2,dw,dh);return c}
const TC={};
async function fill(im,p,W=300){const k=p.id+JSON.stringify(p.edit||0)+W;if(!TC[k]){try{TC[k]=(await render(p,W)).toDataURL('image/jpeg',.8)}catch(e){TC[k]=FALL}}im.src=TC[k]}

/* 목록: 최신순, 구분선 없이 3열 연속 그리드 (iOS 사진 라이브러리) */
function grid(ps){return '<div class="g">'+ps.map((p,i)=>`<div class="c" data-i="${i}"><img data-id="${p.id}" alt="">${p.type=='video'?`<span class="bd">${dur(p.dur)}</span>`:''}</div>`).join('')+'</div>'}

/* 상세 */
function openV(i){vi=i;const v=$('#v');v.classList.remove('hu');document.body.classList.remove('dark','lib');v.hidden=false;showV()}
/* 필름스트립: 현재 사진 주변 썸네일 */
function strip(){const s=$('#strip'),a=Math.max(0,vi-14),b=Math.min(list.length,vi+15);
s.innerHTML=list.slice(a,b).map((p,j)=>`<img data-n="${a+j}" alt="" class="${a+j==vi?'cur':''}">`).join('');
s.querySelectorAll('img').forEach(im=>fill(im,list[+im.dataset.n],120));
const c=s.querySelector('.cur');if(c)s.scrollLeft=c.offsetLeft-s.clientWidth/2+c.offsetWidth/2}
async function showV(){const p=list[vi],k=++tok,im=$('#vimg');
$('#vd').textContent=fmtD(p.ts);$('#vtm').textContent=fmtT(p.ts);strip();
try{const u=(await render(p,1600)).toDataURL('image/jpeg',.92);if(k==tok)im.src=u}catch(e){if(k==tok)im.src=FALL}}
function go(d){const n=vi+d;if(n<0||n>=list.length)return;vi=n;showV()}
function back(){tok++;$('#v').hidden=true;document.body.classList.remove('dark');document.body.classList.add('lib');const c=document.querySelector(`.c[data-i="${vi}"]`);c&&c.scrollIntoView({block:'nearest'})}
function toggleUI(){const v=$('#v');v.classList.toggle('hu');document.body.classList.toggle('dark',v.classList.contains('hu'))}

/* 아이콘 (iOS 사진 앱 스타일 선 아이콘) */
const SVG={
dots:'<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>',
ring:'<svg viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="9.5"/><circle cx="7.5" cy="12" r="1.3" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.3" fill="currentColor" stroke="none"/><circle cx="16.5" cy="12" r="1.3" fill="currentColor" stroke="none"/></svg>',
back:'<svg viewBox="0 0 12 21"><path d="M10 2L2 10.5 10 19"/></svg>',
share:'<svg viewBox="0 0 24 24"><path d="M8 10H6v11h12V10h-2M12 15V3M8 7l4-4 4 4"/></svg>',
heart:'<svg viewBox="0 0 24 24"><path d="M12 20s-8-4.6-8-10a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.4-8 10-8 10z"/></svg>',
paw:'<svg viewBox="0 0 24 24"><circle cx="12" cy="15" r="5.5"/><circle cx="7.5" cy="10" r="1.6" fill="currentColor" stroke="none"/><circle cx="16.5" cy="10" r="1.6" fill="currentColor" stroke="none"/><circle cx="10" cy="7" r="1.4" fill="currentColor" stroke="none"/><circle cx="14" cy="7" r="1.4" fill="currentColor" stroke="none"/><path d="M3.5 3v3M2 4.5h3"/></svg>',
trash:'<svg viewBox="0 0 24 24"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/></svg>',
lib:'<svg viewBox="0 0 28 28"><rect x="3" y="6" width="18" height="16" rx="3"/><path d="M7 19l5-6 3 3 2-2 4 5z" fill="#fff" stroke="none"/></svg>',
fy:'<svg viewBox="0 0 28 28"><rect x="6" y="4" width="16" height="20" rx="3"/><path d="M14 17s-3.5-2-3.5-4.2a1.8 1.8 0 0 1 3.5-.8 1.8 1.8 0 0 1 3.5.8C17.5 15 14 17 14 17z"/></svg>',
alb:'<svg viewBox="0 0 28 28"><rect x="4" y="9" width="20" height="14" rx="2"/><path d="M7 6h14M9 3h10"/></svg>',
srch:'<svg viewBox="0 0 28 28"><circle cx="12" cy="12" r="7"/><path d="M17.5 17.5L24 24"/></svg>'};

async function init(){document.body.classList.add('lib');S=await idbGet()||seed();
list=[...S.photos].sort((a,b)=>b.ts-a.ts);
$('#app').innerHTML=`<div id="main">${list.length?grid(list):''}</div>
<div class="lt"><b id="dt"></b></div>
<div class="acts"><button class="pill">Select</button><button class="round" aria-label="더보기">${SVG.dots}</button></div>
<div class="bottom"><div class="seg" id="seg"><button>Years</button><button>Months</button><button>Days</button><button class="on">All Photos</button></div>
<nav class="tabs"><button class="on">${SVG.lib}<span>Library</span></button><button>${SVG.fy}<span>For You</span></button><button>${SVG.alb}<span>Albums</span></button><button>${SVG.srch}<span>Search</span></button></nav></div>
<div id="v" hidden><div class="top"><button class="bk" id="bk" aria-label="뒤로">${SVG.back}</button><div class="tt"><b id="vd"></b><small id="vtm"></small></div><div class="tr"><button>Edit</button><button class="more" aria-label="더보기">${SVG.ring}</button></div></div>
<div id="stage"><img id="vimg" alt=""></div><div class="strip" id="strip"></div>
<div class="vb"><button aria-label="공유">${SVG.share}</button><button aria-label="즐겨찾기">${SVG.heart}</button><button aria-label="보정">${SVG.paw}</button><button aria-label="삭제">${SVG.trash}</button></div></div>`;
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){io.unobserve(e.target);fill(e.target,byId(e.target.dataset.id))}}),{root:$('#main'),rootMargin:'600px'});
document.querySelectorAll('#main img[data-id]').forEach(im=>{im.onerror=()=>im.src=FALL;io.observe(im)});
$('#main').onclick=e=>{const c=e.target.closest('.c');c&&openV(+c.dataset.i)};
$('#bk').onclick=back;
$('#strip').onclick=e=>{const i=e.target.closest('img');if(i){vi=+i.dataset.n;showV()}};
/* 상단 날짜 라벨: 화면 맨 위에 보이는 사진의 날짜 */
const M=$('#main'),upd=()=>{const t=M.getBoundingClientRect().top,c=[...M.querySelectorAll('.c')].find(x=>x.getBoundingClientRect().bottom>t+60);if(c)$('#dt').textContent=fmtD(list[+c.dataset.i].ts)};
M.onscroll=upd;upd();
document.querySelectorAll('#seg button').forEach(b=>b.onclick=()=>document.querySelectorAll('#seg button').forEach(x=>x.classList.toggle('on',x===b)));
$('#vimg').onerror=e=>e.target.src=FALL;
let x0=null;const st=$('#stage'),im=$('#vimg');
st.onpointerdown=e=>{x0=e.clientX;st.setPointerCapture(e.pointerId)};
st.onpointermove=e=>{if(x0!=null)im.style.transform=`translateX(${e.clientX-x0}px)`};
st.onpointerup=st.onpointercancel=e=>{if(x0==null)return;const d=e.clientX-x0;x0=null;im.style.transform='';if(Math.abs(d)>60)go(d<0?1:-1);else if(Math.abs(d)<6)toggleUI()}}
init();

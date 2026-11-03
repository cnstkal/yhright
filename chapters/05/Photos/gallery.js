'use strict';
const $=s=>document.querySelector(s);
const FALL='data:image/svg+xml,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120"><rect width="120" height="120" fill="#e3e6e8"/><path d="M30 85l20-25 15 18 10-12 15 19z" fill="#b8bec2"/><circle cx="45" cy="42" r="8" fill="#b8bec2"/></svg>');
const KEY='s7gallery';
const F={o:'',mono:'grayscale(1)',sepia:'sepia(.8)',warm:'sepia(.35) saturate(1.3)',cool:'hue-rotate(185deg) saturate(.7) brightness(1.05)',vivid:'saturate(1.6) contrast(1.1)',fade:'contrast(.85) brightness(1.1) saturate(.8)'};
let S,list=[],vi=0,tok=0;
const P=n=>String(n).padStart(2,0),D=t=>new Date(t);
const fmtD=t=>{const d=D(t);return `${d.getFullYear()}년 ${d.getMonth()+1}월 ${d.getDate()}일`};
const fmtT=t=>{const d=D(t),h=d.getHours();return `${h<12?'오전':'오후'} ${h%12||12}:${P(d.getMinutes())}`};
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

/* iOS 18 라이브러리: 3열 그리드 / 월·연도 보기 / 정렬·필터 */
const ST={mode:'all',sort:'new',flt:'all',q:'',sel:false,pick:new Set(),srch:false};
const FL={all:'모든 항목',fav:'즐겨찾기',photo:'사진',video:'동영상',shot:'스크린샷'};
const ym=t=>{const d=D(t);return `${d.getFullYear()}년 ${d.getMonth()+1}월`};
function visible(){const q=ST.q.trim();let a=S.photos.filter(p=>ST.flt=='all'||(ST.flt=='fav'&&p.fav)||(ST.flt=='photo'&&p.type=='photo'&&p.kind!='screenshot')||(ST.flt=='video'&&p.type=='video')||(ST.flt=='shot'&&p.kind=='screenshot'));
if(q)a=a.filter(p=>(fmtD(p.ts)+' '+(p.type=='video'?'동영상 비디오':'사진')+' '+(p.kind=='screenshot'?'스크린샷':'')+' '+(p.fav?'즐겨찾기':'')+' '+p.name).includes(q));
return a.sort((x,y)=>ST.sort=='new'?y.ts-x.ts:x.ts-y.ts)}
const cell=(p,i)=>`<div class="c${ST.pick.has(p.id)?' on':''}" data-i="${i}"><img data-id="${p.id}" alt="">${p.fav?'<svg class="fv" viewBox="0 0 24 24"><path d="M12 21s-8-5-8-11a4.5 4.5 0 0 1 8-2.5A4.5 4.5 0 0 1 20 10c0 6-8 11-8 11z"/></svg>':''}${p.type=='video'?`<span class="bd">${dur(p.dur)}</span>`:''}<i class="ck"></i></div>`;
function groups(by){const g=[];list.forEach((p,i)=>{const k=by=='years'?D(p.ts).getFullYear()+'년':ym(p.ts),l=g[g.length-1];if(l&&l.k==k){l.n++}else g.push({k,i,p,n:1})});return g}
function grid(ps){return `<div class="g">${ps.map(cell).join('')}</div>`}
function body(){if(!list.length)return '<div class="em">표시할 항목이 없습니다</div>';
if(ST.mode=='all')return grid(list);
return `<div class="${ST.mode=='years'?'yr':'mo'}">${groups(ST.mode).map(g=>`<div class="gc" data-go="${g.i}"><img data-id="${g.p.id}" alt=""><div class="gl"><b>${g.k}</b><small>${g.n}</small></div></div>`).join('')}</div>`}
function head(){const ph=list.filter(p=>p.type!='video').length,vd=list.length-ph;let t=ST.sel?(ST.pick.size?`${ST.pick.size}장 선택됨`:'항목 선택'):(list.length?fmtD(topTs()):'라이브러리');
$('#ht').textContent=t;$('#hs').textContent=ST.sel?'':`사진 ${ph.toLocaleString()}장, 동영상 ${vd.toLocaleString()}개`;$('#hs').hidden=ST.sel;
$('#bsel').textContent=ST.sel?'취소':'선택';$('#main').classList.toggle('sel',ST.sel);$('#bsrch').hidden=ST.sel;$('#sb2').hidden=!ST.srch;
document.querySelectorAll('.sg button').forEach(b=>b.classList.toggle('on',b.dataset.m==ST.mode))}
function topTs(){const m=$('#main');if(ST.mode!='all'||!m)return list[0]?list[0].ts:0;const r=m.getBoundingClientRect();for(const c of m.querySelectorAll('.c')){if(c.getBoundingClientRect().bottom>r.top+4)return list[+c.dataset.i].ts}return list[0].ts}
let io;
function draw(keep){list=visible();const m=$('#main'),y=keep?m.scrollTop:0;m.innerHTML=body();m.scrollTop=y;head();
io&&io.disconnect();io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){io.unobserve(e.target);fill(e.target,byId(e.target.dataset.id))}}),{root:m,rootMargin:'600px'});
m.querySelectorAll('img[data-id]').forEach(im=>{im.onerror=()=>im.src=FALL;io.observe(im)})}
function menu(){const s=$('#mn');s.innerHTML=`<div class="sh2"><div class="t">정렬</div>${[['new','최신순'],['old','오래된순']].map(a=>`<button data-so="${a[0]}">${a[1]}<b>${ST.sort==a[0]?'✓':''}</b></button>`).join('')}<div class="t">필터</div>${Object.keys(FL).map(k=>`<button data-fl="${k}">${FL[k]}<b>${ST.flt==k?'✓':''}</b></button>`).join('')}</div>`;s.hidden=false}

/* 상세 */
function openV(i){vi=i;const v=$('#v');v.classList.remove('hu');document.body.classList.remove('dark');v.hidden=false;showV()}
async function showV(){const p=list[vi],k=++tok,im=$('#vimg');
$('#vd').textContent=fmtD(p.ts);$('#vtm').textContent=fmtT(p.ts);$('#cnt').textContent=`${vi+1} / ${list.length}`;
try{const u=(await render(p,1600)).toDataURL('image/jpeg',.92);if(k==tok)im.src=u}catch(e){if(k==tok)im.src=FALL}}
function go(d){const n=vi+d;if(n<0||n>=list.length)return;vi=n;showV()}
function back(){tok++;$('#v').hidden=true;document.body.classList.remove('dark');const c=document.querySelector(`.c[data-i="${vi}"]`);c&&c.scrollIntoView({block:'nearest'})}
function toggleUI(){const v=$('#v');v.classList.toggle('hu');document.body.classList.toggle('dark',v.classList.contains('hu'))}

async function init(){S=await idbGet()||seed();
$('#app').innerHTML=`<div class="hd"><div class="hl"><b id="ht"></b><small id="hs"></small></div><div class="hr"><button id="bsrch" aria-label="검색"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M16 16l5 5"/></svg></button><button id="bsel" class="pl">선택</button></div></div>
<div id="sb2" class="sb2" hidden><input id="qi" placeholder="검색" enterkeyhint="search"></div>
<div id="main"></div>
<div class="ctl"><div class="sg"><button data-m="years">연도</button><button data-m="months">월</button><button data-m="all">모든 사진</button></div><button id="bsf" class="rb" aria-label="정렬 및 필터"><svg viewBox="0 0 24 24"><path d="M4 7h16M7 12h10M10 17h4"/></svg></button></div>
<div id="mn" class="mn" hidden></div>
<div id="v" hidden><div class="top"><button class="bk" id="bk"><svg viewBox="0 0 12 21"><path d="M10 2L2 10.5 10 19"/></svg>사진</button><b id="vd"></b><small id="vtm"></small></div>
<div id="stage"><img id="vimg" alt=""></div><div class="vb"><span id="cnt"></span></div></div>`;
draw();
const m=$('#main');let raf=0;
m.onscroll=()=>{if(ST.mode!='all'||ST.sel||raf)return;raf=requestAnimationFrame(()=>{raf=0;head()})};
m.onclick=e=>{const g=e.target.closest('.gc');if(g){ST.mode='all';draw();const c=m.querySelector(`.c[data-i="${g.dataset.go}"]`);c&&(m.scrollTop=c.offsetTop);head();return}
const c=e.target.closest('.c');if(!c)return;const p=list[+c.dataset.i];
if(ST.sel){ST.pick.has(p.id)?ST.pick.delete(p.id):ST.pick.add(p.id);c.classList.toggle('on');head()}else openV(+c.dataset.i)};
document.querySelector('.sg').onclick=e=>{const b=e.target.closest('button');if(!b)return;ST.mode=b.dataset.m;draw()};
$('#bsel').onclick=()=>{ST.sel=!ST.sel;ST.pick.clear();draw(true)};
$('#bsrch').onclick=()=>{ST.srch=!ST.srch;if(!ST.srch&&ST.q){ST.q='';$('#qi').value='';draw()}head();if(ST.srch)$('#qi').focus()};
$('#qi').oninput=e=>{ST.q=e.target.value;draw()};
$('#bsf').onclick=menu;
$('#mn').onclick=e=>{const b=e.target.closest('button');if(b){if(b.dataset.so)ST.sort=b.dataset.so;if(b.dataset.fl)ST.flt=b.dataset.fl;draw();$('#mn').hidden=true}else if(e.target.id=='mn')$('#mn').hidden=true};
$('#bk').onclick=back;
$('#vimg').onerror=e=>e.target.src=FALL;
let x0=null;const st=$('#stage'),im=$('#vimg');
st.onpointerdown=e=>{x0=e.clientX;st.setPointerCapture(e.pointerId)};
st.onpointermove=e=>{if(x0!=null)im.style.transform=`translateX(${e.clientX-x0}px)`};
st.onpointerup=st.onpointercancel=e=>{if(x0==null)return;const d=e.clientX-x0;x0=null;im.style.transform='';if(Math.abs(d)>60)go(d<0?1:-1);else if(Math.abs(d)<6)toggleUI()}}
init();

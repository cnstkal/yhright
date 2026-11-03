'use strict';
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const ic=d=>`<svg viewBox="0 0 24 24"><path d="${d}"/></svg>`;
const I={back:ic('M20 11H7.8l5.6-5.6L12 4l-8 8 8 8 1.4-1.4L7.8 13H20z'),more:ic('M12 8a2 2 0 100-4 2 2 0 000 4zm0 2a2 2 0 100 4 2 2 0 000-4zm0 6a2 2 0 100 4 2 2 0 000-4z'),
share:ic('M18 16a3 3 0 00-2 .8l-7-4.1a3 3 0 000-1.4l7-4.1A3 3 0 1015 5a3 3 0 000 .7L8 9.8a3 3 0 100 4.4l7.1 4.2a3 3 0 00-.1.6 3 3 0 103-3z'),
del:ic('M6 19a2 2 0 002 2h8a2 2 0 002-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z'),edit:ic('M3 17.3V21h3.7L17.8 9.9l-3.7-3.7zM20.7 7a1 1 0 000-1.4l-2.3-2.3a1 1 0 00-1.4 0l-1.8 1.8 3.7 3.7z'),
heart:ic('M12 21l-1.4-1.3C5.4 15.100 2 12 2 8.500A5.500 5.500 0 017.500 3 6 6 0 0112 5.100 6 6 0 0116.500 3 5.500 5.500 0 0122 8.500c0 3.500-3.400 6.600-8.600 11.200z'),
check:ic('M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z'),close:ic('M19 6.4L17.6 5 12 10.6 6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12z'),play:ic('M8 5v14l11-7z'),
mv:ic('M10 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V8a2 2 0 00-2-2h-8z')};
const FALL='data:image/svg+xml,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120"><rect width="120" height="120" fill="#e3e6e8"/><path d="M30 85l20-25 15 18 10-12 15 19z" fill="#b8bec2"/><circle cx="45" cy="42" r="8" fill="#b8bec2"/></svg>');
const KEY='s7gallery-2017',BUILT=[['camera','카메라'],['screenshot','스크린샷'],['download','다운로드']];
const F={o:'',mono:'grayscale(1)',sepia:'sepia(.8)',warm:'sepia(.35) saturate(1.3)',cool:'hue-rotate(185deg) saturate(.7) brightness(1.05)',vivid:'saturate(1.6) contrast(1.1)',fade:'contrast(.85) brightness(1.1) saturate(.8)'};
const FN={o:'원본',mono:'흑백',sepia:'세피아',warm:'따뜻한',cool:'차가운',vivid:'선명하게',fade:'페이드'};
let S,tab='photos',alb=null,sel=null,list=[],vi=0,E=null,vt=null,et='crop';
const P=n=>String(n).padStart(2,0),D=t=>new Date(t);
const fmtD=t=>{const d=D(t);return `${d.getFullYear()}년 ${d.getMonth()+1}월 ${d.getDate()}일 ${'일월화수목금토'[d.getDay()]}요일`};
const fmtT=t=>{const d=D(t),h=d.getHours();return `${h<12?'오전':'오후'} ${h%12||12}:${P(d.getMinutes())}`};
const stamp=t=>{const d=D(t);return `${d.getFullYear()}${P(d.getMonth()+1)}${P(d.getDate())}_${P(d.getHours())}${P(d.getMinutes())}${P(d.getSeconds())}`};
const sz=b=>b>1e6?(b/1e6).toFixed(2)+' MB':Math.round(b/1e3)+' KB';
const dur=s=>`${Math.floor(s/60)}:${P(s%60)}`;
const toast=m=>{const t=$('#toast');t.textContent=m;t.classList.add('on');clearTimeout(t.h);t.h=setTimeout(()=>t.classList.remove('on'),1800)};
/* 저장소 */
const db=()=>new Promise((r,j)=>{const q=indexedDB.open('s7g',1);q.onupgradeneeded=()=>q.result.createObjectStore('k');q.onsuccess=()=>r(q.result);q.onerror=j});
const idbGet=async()=>{try{const d=await db();return await new Promise(r=>{const q=d.transaction('k').objectStore('k').get(KEY);q.onsuccess=()=>r(q.result);q.onerror=()=>r()})}catch(e){}};
const save=async()=>{try{const d=await db();d.transaction('k','readwrite').objectStore('k').put(S,KEY)}catch(e){toast('저장하지 못했습니다')}};
/* 샘플 사진: 캔버스로 서로 다른 장면 생성 */
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
function seed(){const K=['landscape','food','person','pet','daily','landscape','food','pet','daily','person'],r=rnd(5),ps=[];let t=Date.now();
 for(let i=0;i<40;i++){t-=(r()*18+3)*36e5;const shot=i%9==4,vid=i%11==5,k=shot?'screenshot':K[i%10];
  ps.push({id:'s'+i,ts:Math.round(t),kind:k,seed:i*97+13,type:vid?'video':'photo',dur:vid?8+i:0,album:shot?'screenshot':(k=='person'||k=='pet')&&i%3==0?'a1':'camera',fav:i%13==0?1:0,w:shot?1440:4032,h:shot?2560:3024,size:Math.round((shot?.4:1.8)*1e6+r()*2e6)})}
 ps.forEach(p=>p.name=(p.kind=='screenshot'?'Screenshot_':p.type=='video'?'':'')+stamp(p.ts).replace('_',p.kind=='screenshot'?'-':'_')+(p.kind=='screenshot'?'.png':p.type=='video'?'.mp4':'.jpg'));
 ps.forEach(p=>{if(p.type=='photo'&&p.kind!='screenshot')p.name='IMG_'+p.name});
 return{photos:ps,albums:[{id:'a1',name:'가족'}],cols:3}}
/* 렌더링(편집 결과는 원본과 별도 데이터) */
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
/* 목록 */
const all=()=>[...S.photos].sort((a,b)=>b.ts-a.ts);
const of=id=>id=='recent'?all().slice(0,20):id=='fav'?all().filter(p=>p.fav):all().filter(p=>p.album==id);
const albs=()=>[...BUILT.map(([id,name])=>({id,name,b:1})),{id:'recent',name:'최근 항목',b:1,v:1},{id:'fav',name:'즐겨찾기',b:1,v:1},...S.albums];
const aname=id=>(albs().find(a=>a.id==id)||{}).name||'';
const cell=(p,i)=>`<div class="c${sel&&sel.has(p.id)?' s':''}" data-i="${i}"><img data-id="${p.id}" alt=""><span class="ck">${I.check}</span>${p.type=='video'?`<span class="bd">${I.play}${dur(p.dur)}</span>`:p.frames?'<span class="bd">GIF</span>':''}${p.fav?`<span class="fv">${I.heart}</span>`:''}</div>`;
function grid(ps){let h='',last='';ps.forEach((p,i)=>{const d=fmtD(p.ts);if(d!=last){h+=(last?'</div>':'')+`<h4>${d}</h4><div class="g">`;last=d}h+=cell(p,i)});return h+'</div>'}
const albumsHtml=()=>`<div class="al">${albs().map(a=>{const n=of(a.id);return `<div class="ac" data-id="${a.id}"><div class="th">${n[0]?`<img data-id="${n[0].id}" alt="">`:''}</div><b>${a.name}</b><small>${n.length}</small></div>`}).join('')}<div class="ac nw" data-a="newalb"><div class="th">+</div><b>앨범 만들기</b></div></div>`;
function head(){const h=$('#head'),cur=albs().find(a=>a.id==alb);
 h.className='top';h.innerHTML=sel?`<button class="ic" data-a="cancel">${I.close}</button><b class="ttl">${sel.size?sel.size+'개 선택됨':'항목 선택'}</b><button class="tx on" data-a="all">전체 선택</button>`
 :`${alb?`<button class="ic" data-a="back">${I.back}</button><b class="ttl">${cur?cur.name:''}</b>`:`<div class="tabs"><span data-t="photos" class="${tab=='photos'?'on':''}">사진</span><span data-t="albums" class="${tab=='albums'?'on':''}">앨범</span></div>`}<button class="ic" data-a="more">${I.more}</button>`}
function draw(){const ps=tab=='albums'&&!alb?null:alb?of(alb):all(),m=$('#main');list=ps||[];head();
 m.className=sel?'sm':'';m.innerHTML=ps?(ps.length?grid(ps):'<p class="em">사진이 없습니다.<br>⋮ 메뉴에서 사진을 추가하세요.</p>'):albumsHtml();m.style.setProperty('--c',S.cols);
 const b=$('#bar');b.hidden=!sel;[...b.querySelectorAll('button')].forEach(x=>x.disabled=!sel||!sel.size);
 $$('#main img[data-id]').forEach(im=>{im.onerror=()=>im.src=FALL;fill(im,byId(im.dataset.id))})}
/* 팝업 */
const pop=(items,cls='')=>new Promise(r=>{const m=$('#menu'),s=$('#scrim');m.className=cls;m.innerHTML=items.map((x,i)=>`<div data-i="${i}">${x}</div>`).join('');m.hidden=s.hidden=false;
 const c=v=>{m.hidden=s.hidden=true;r(v)};m.onclick=e=>{const i=e.target.closest('[data-i]');i&&c(+i.dataset.i)};s.onclick=()=>c(-1)});
function dlg(t,o={}){return new Promise(r=>{const d=$('#dlg'),b=o.btn||['취소','확인'];d.innerHTML=`<div class="box"><h3>${t}</h3>${o.msg?`<p>${o.msg}</p>`:''}${o.input!=null?`<input value="${o.input}" maxlength="30">`:''}${(o.list||[]).map((x,i)=>`<button class="li" data-i="${i}">${x}</button>`).join('')}<div class="bt">${b.map((x,i)=>`<button data-b="${i}">${x}</button>`).join('')}</div></div>`;d.hidden=false;const q=d.querySelector('input');q&&q.focus();
 d.onclick=e=>{const x=e.target.closest('button');if(!x&&e.target!=d)return;d.hidden=true;if(!x)return r(null);if(x.dataset.i!=null)return r({i:+x.dataset.i});r(!o.list&&+x.dataset.b==b.length-1?{ok:1,v:q&&q.value.trim()}:null)}})}
const APPS=[['메시지','#4caf50','✉'],['이메일','#ff7043','@'],['블루투스','#2979ff','B'],['Wi-Fi Direct','#26a69a','W'],['메모','#fbc02d','✎'],['Drive','#5c6bc0','▲']];
async function share(ps){const i=await pop(APPS.map(a=>`<i style="background:${a[1]}">${a[2]}</i>${a[0]}`),'sheet');if(i<0)return;toast(`${APPS[i][0]}(으)로 ${ps.length}개 항목을 공유했습니다`);if(sel){sel=null;draw()}}
async function remove(ps){const r=await dlg('삭제',{msg:`${ps.length}개 항목을 삭제하시겠습니까?`,btn:['취소','삭제']});if(!r)return false;const ids=new Set(ps.map(p=>p.id));S.photos=S.photos.filter(p=>!ids.has(p.id));S.photos.forEach(p=>{if(p.frames)p.frames=p.frames.filter(f=>!ids.has(f))});await save();toast('삭제했습니다');return true}
async function moveTo(ps){const opts=albs().filter(a=>!a.v);const r=await dlg('앨범으로 이동',{list:opts.map(a=>a.name),btn:['취소']});if(!r)return;ps.forEach(p=>p.album=opts[r.i].id);await save();toast(`${opts[r.i].name} 앨범으로 이동했습니다`);sel=null;draw()}
async function addPhotos(files){for(const f of files){try{const d=await new Promise((ok,no)=>{const fr=new FileReader();fr.onload=()=>ok(fr.result);fr.onerror=no;fr.readAsDataURL(f)});
 const im=await new Promise((ok,no)=>{const i=new Image();i.onload=()=>ok(i);i.onerror=no;i.src=d}),k=Math.min(1,1280/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=im.width*k;c.height=im.height*k;c.getContext('2d').drawImage(im,0,0,c.width,c.height);
 S.photos.push({id:'u'+Date.now()+Math.random().toString(36).slice(2,5),name:f.name,ts:Date.now(),type:'photo',kind:'upload',data:c.toDataURL('image/jpeg',.85),album:alb&&!['recent','fav'].includes(alb)?alb:'download',fav:0,w:im.width,h:im.height,size:f.size})}catch(e){toast('불러올 수 없는 파일입니다')}}
 await save();draw();toast('사진을 추가했습니다')}
/* 슬라이드 쇼 */
function slide(ps){if(!ps.length)return;let i=0;const s=$('#ss'),im=s.querySelector('img');const show=async()=>{im.style.animation='none';void im.offsetWidth;im.style.animation='';im.src=(await render(ps[i%ps.length],1000)).toDataURL('image/jpeg',.85);i++};
 s.hidden=false;show();const t=setInterval(show,2500);s.onclick=()=>{clearInterval(t);s.hidden=true}}
/* 사진 보기 */
const cp=()=>list[vi];
function openV(i){vi=i;$('#v').hidden=false;$('#v').classList.remove('hu');showV()}
async function showV(){clearInterval(vt);const p=cp(),im=$('#vimg');if(!p)return;$('#vd').textContent=fmtD(p.ts);$('#vtm').textContent=fmtT(p.ts);$('.vb').classList.toggle('on',!!p.fav);
 const pl=$('#pl'),vp=$('.vp');pl.hidden=p.type!='video';vp.hidden=p.type!='video';im.style.animation='';
 if(p.type=='video'){$('#cur').textContent='0:00 / '+dur(p.dur);$('#vp i').style.width='0'}
 try{const fr=p.frames?p.frames.map(byId).filter(Boolean):null;if(fr&&fr.length>1){const u=await Promise.all(fr.map(f=>render(f,900).then(c=>c.toDataURL('image/jpeg',.85))));let k=0;im.src=u[0];vt=setInterval(()=>im.src=u[++k%u.length],600)}else im.src=(await render(p,1000)).toDataURL('image/jpeg',.9)}catch(e){im.src=FALL}}
function go(d){const n=vi+d;if(n<0||n>=list.length)return toast(d>0?'마지막 사진입니다':'첫 번째 사진입니다');vi=n;const im=$('#vimg');im.className=d>0?'inR':'inL';showV()}
function playV(){const p=cp(),b=$('#pl');if(b.dataset.on){clearInterval(vt);delete b.dataset.on;b.hidden=false;$('#vimg').style.animation='';return}
 b.dataset.on=1;b.hidden=true;let t=0;$('#vimg').style.animation=`kb ${p.dur}s linear forwards`;vt=setInterval(()=>{t+=.25;$('#vp i').style.width=Math.min(100,t/p.dur*100)+'%';$('#cur').textContent=dur(Math.floor(t))+' / '+dur(p.dur);
 if(t>=p.dur){clearInterval(vt);delete b.dataset.on;b.hidden=false;$('#vimg').style.animation=''}},250)}
async function infoV(p){await dlg('상세정보',{msg:`파일명: ${p.name}<br>촬영 날짜: ${fmtD(p.ts)} ${fmtT(p.ts)}<br>해상도: ${p.w} x ${p.h}<br>크기: ${sz(p.size)}<br>앨범: ${aname(p.album)}${p.edit?'<br>편집됨 (원본은 그대로 보존)':''}`,btn:['확인']})}
async function menuV(){const p=cp(),it=['상세정보','슬라이드 쇼','배경화면으로 설정','연락처 사진으로 설정','앨범으로 이동'],i=await pop(it);
 if(i==0)infoV(p);else if(i==1){$('#v').hidden=true;slide(list)}
 else if(i==2){const r=await dlg('배경화면으로 설정',{list:['홈 화면','잠금 화면','홈 화면 및 잠금 화면'],btn:['취소']});if(r){S.wall=p.id;save();toast('배경화면으로 설정했습니다 (시뮬레이션)')}}
 else if(i==3){const n=['엄마','아빠','친구','동생'],r=await dlg('연락처 선택',{list:n,btn:['취소']});if(r){S.contacts=S.contacts||{};S.contacts[n[r.i]]=p.id;save();toast(`${n[r.i]} 연락처 사진으로 지정했습니다`)}}
 else if(i==4){await moveTo([p]);$('#v').hidden||showV()}}
/* 편집 */
const DEF=()=>({rot:0,flip:0,b:0,c:0,s:0,f:'o',crop:0});
function openEd(){const p=cp();if(p.type=='video'||p.frames)return toast('이 항목은 편집할 수 없습니다');E={p,e:Object.assign(DEF(),p.edit)};et='crop';$('#ed').hidden=false;panel();pv()}
let pvT=0;async function pv(){const k=++pvT,c=await render(E.p,700,E.e);if(k!=pvT)return;$('#pv').replaceChildren(c)}
function panel(){const e=E.e,p=$('#ep'),B=(a,v,l,on)=>`<button data-a="${a}" data-v="${v}" class="${on?'on':''}">${l}</button>`;
 $$('.et span').forEach(s=>s.classList.toggle('on',s.dataset.e==et));
 p.innerHTML=et=='crop'?[['원본',0],['1:1',1],['4:3',4/3],['16:9',16/9],['3:4',.75]].map(r=>B('ecrop',r[1],r[0],Math.abs(e.crop-r[1])<.01)).join('')+B('erot',0,'↻ 회전')+B('eflip',0,'⇄ 좌우 반전',e.flip)
 :et=='adj'?[['b','밝기'],['c','대비'],['s','채도']].map(a=>`<label><span>${a[1]}</span><input type="range" min="-50" max="50" value="${e[a[0]]}" data-k="${a[0]}"></label>`).join(''):Object.keys(F).map(k=>B('eflt',k,FN[k],e.f==k)).join('')}
$('#app')||0;
/* 동작 */
const A={back(){alb=null;sel=null;draw()},cancel(){sel=null;draw()},all(){sel=sel.size==list.length?new Set():new Set(list.map(p=>p.id));draw()},
 async more(){if(sel){const i=await pop(['앨범으로 이동','GIF 만들기','슬라이드 쇼']);if(i<0)return;const ps=S.photos.filter(p=>sel.has(p.id));
  if(i==0)moveTo(ps);else if(i==2)slide(ps);else if(i==1){const f=ps.filter(p=>p.type=='photo'&&!p.frames);if(f.length<2)return toast('사진을 2장 이상 선택하세요');const t=Date.now();S.photos.push({id:'g'+t,name:`GIF_${stamp(t)}.gif`,ts:t,type:'photo',kind:f[0].kind,seed:f[0].seed,album:'camera',frames:f.slice(0,10).map(p=>p.id),fav:0,w:f[0].w,h:f[0].h,size:f.length*3e5});await save();sel=null;draw();toast('GIF를 만들었습니다')}return}
  const cur=albs().find(a=>a.id==alb),it=alb?['선택','사진 추가','슬라이드 쇼',...(cur&&!cur.b?['이름 변경','앨범 삭제']:[])]:tab=='albums'?['앨범 만들기','사진 추가']:['선택','사진 추가','썸네일 크기','슬라이드 쇼'],i=await pop(it);if(i<0)return;const n=it[i];
  if(n=='선택'){sel=new Set();draw()}else if(n=='사진 추가')$('#up').click();else if(n=='썸네일 크기'){S.cols=S.cols>=5?2:S.cols+1;save();draw()}else if(n=='슬라이드 쇼')slide(list);else if(n=='앨범 만들기')A.newalb();
  else if(n=='이름 변경'){const r=await dlg('앨범 이름 변경',{input:cur.name,btn:['취소','확인']});if(r&&r.v){cur.name=r.v;save();draw()}}
  else if(n=='앨범 삭제'){const r=await dlg('앨범 삭제',{msg:'앨범을 삭제합니다. 앨범 안의 사진은 카메라 앨범으로 이동됩니다.',btn:['취소','삭제']});if(r){S.photos.forEach(p=>{if(p.album==alb)p.album='camera'});S.albums=S.albums.filter(a=>a.id!=alb);alb=null;save();draw()}}},
 async newalb(){const r=await dlg('앨범 만들기',{input:'',btn:['취소','만들기']});if(r&&r.v){S.albums.push({id:'a'+Date.now(),name:r.v});await save();draw();toast('앨범을 만들었습니다')}},
 share(){share(S.photos.filter(p=>sel.has(p.id)))},async del(){if(await remove(S.photos.filter(p=>sel.has(p.id)))){sel=null;draw()}},
 mv(){moveTo(S.photos.filter(p=>sel.has(p.id)))},
 vback(){clearInterval(vt);$('#v').hidden=true;list=tab=='albums'&&!alb?list:list;draw()},
 vfav(){const p=cp();p.fav=p.fav?0:1;save();$('.vb').classList.toggle('on',!!p.fav);toast(p.fav?'즐겨찾기에 추가했습니다':'즐겨찾기에서 삭제했습니다')},
 vshare(){share([cp()])},vedit:openEd,vmore:menuV,vplay:playV,
 async vdel(){const p=cp();if(await remove([p])){list.splice(vi,1);if(!list.length){A.vback()}else{vi=Math.min(vi,list.length-1);showV()}}},
 ecancel(){$('#ed').hidden=true},ereset(){E.e=DEF();panel();pv()},
 async esave(){E.p.edit=JSON.stringify(E.e)==JSON.stringify(DEF())?undefined:Object.assign({},E.e);if(!E.p.edit)delete E.p.edit;await save();$('#ed').hidden=true;showV();toast('저장했습니다')},
 ecrop(el){E.e.crop=+el.dataset.v;panel();pv()},erot(){E.e.rot=(E.e.rot+90)%360;pv()},eflip(){E.e.flip=E.e.flip?0:1;panel();pv()},eflt(el){E.e.f=el.dataset.v;panel();pv()}};
document.addEventListener('click',e=>{const el=e.target.closest('[data-a],[data-t],[data-e],.c,.ac[data-id]');if(!el)return;
 if(el.dataset.t){tab=el.dataset.t;alb=null;sel=null;draw()}else if(el.dataset.e){et=el.dataset.e;panel()}
 else if(el.dataset.a){A[el.dataset.a]&&A[el.dataset.a](el)}
 else if(el.classList.contains('c')){if(lpd){lpd=0;return}const p=list[+el.dataset.i];if(sel){sel.has(p.id)?sel.delete(p.id):sel.add(p.id);draw()}else openV(+el.dataset.i)}
 else{alb=el.dataset.id;draw()}});
document.addEventListener('input',e=>{const k=e.target.dataset.k;if(k&&E){E.e[k]=+e.target.value;pv()}});
let lp,lpd=0;
async function init(){S=await idbGet()||seed();S.cols=S.cols||3;
 $('#app').innerHTML=`<div id="head"></div><div id="main"></div><div id="bar" hidden><button data-a="share">${I.share}공유</button><button data-a="del">${I.del}삭제</button><button data-a="mv">${I.mv}이동</button><button data-a="more">${I.more}더보기</button></div>
 <div id="v" hidden><div class="top"><button class="ic" data-a="vback">${I.back}</button><div><b id="vd"></b><small id="vtm"></small></div><button class="ic" data-a="vmore">${I.more}</button></div>
 <div id="stage"><img id="vimg" alt=""><button id="pl" data-a="vplay" hidden>${I.play}</button></div><div class="vp" hidden><span id="cur"></span><div id="vp"><i></i></div></div>
 <div class="vb"><button aria-label="즐겨찾기" title="즐겨찾기" data-a="vfav">${I.heart}</button><button aria-label="공유" title="공유" data-a="vshare">${I.share}</button><button aria-label="편집" title="편집" data-a="vedit">${I.edit}</button><button aria-label="삭제" title="삭제" data-a="vdel">${I.del}</button></div></div>
 <div id="ed" hidden><div class="top"><button class="tx" data-a="ecancel">취소</button><b class="ttl">사진 편집</b><button class="tx" data-a="ereset">원본 복원</button><button class="tx on" data-a="esave">저장</button></div><div id="pv"></div><div class="et"><span data-e="crop">자르기·회전</span><span data-e="adj">조정</span><span data-e="flt">필터</span></div><div id="ep"></div></div>
 <div id="ss" hidden><img alt=""></div><div id="scrim" hidden></div><div id="menu" hidden></div><div id="dlg" hidden></div><div id="toast"></div><input id="up" type="file" accept="image/*" multiple hidden>`;
 const m=$('#main');m.onpointerdown=e=>{const c=e.target.closest('.c');if(!c||sel)return;lpd=0;lp=setTimeout(()=>{lpd=1;sel=new Set([list[+c.dataset.i].id]);draw()},500)};m.onpointerup=m.onpointermove=m.onpointercancel=()=>clearTimeout(lp);
 let x0=null;const st=$('#stage');st.onpointerdown=e=>{if(e.target.closest('#pl'))return;x0=e.clientX};st.onpointermove=e=>{if(x0!=null)$('#vimg').style.transform=`translateX(${e.clientX-x0}px)`};
 st.onpointerup=st.onpointercancel=e=>{if(x0==null)return;const d=e.clientX-x0;x0=null;$('#vimg').style.transform='';if(Math.abs(d)>60)go(d<0?1:-1);else if(Math.abs(d)<6)$('#v').classList.toggle('hu')};
 $('#vimg').onerror=e=>e.target.src=FALL;$('#vimg').onanimationend=e=>{if(e.animationName!='kb')e.target.className=''};
 $('#up').onchange=e=>{addPhotos([...e.target.files]);e.target.value=''};draw()}
init();

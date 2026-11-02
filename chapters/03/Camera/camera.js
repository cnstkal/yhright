'use strict';
(()=>{
const $=s=>document.querySelector(s);
const KEY='s7gallery',DB='s7g'; // 사진 앱(Photos)과 같은 저장소를 사용
const MODES=['타임랩스','슬로 모션','비디오','사진','인물 사진','파노라마'];
const PHOTO=3;
let stream=null,lastPhoto=null,focusTimer=null,toastTimer=null,mode=PHOTO;

const I={
  flash:'<svg viewBox="0 0 24 24"><path d="M13.5 2.5 5.5 13.5h6l-1 8 8-11h-6z"/></svg>',
  chev:'<svg class="chev" viewBox="0 0 24 24"><path d="M6 9.5l6 6 6-6"/></svg>',
  live:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5.5" stroke-dasharray="2.2 2.2"/><circle cx="12" cy="12" r="1.8" fill="currentColor" stroke="none"/></svg>',
  flip:'<svg viewBox="0 0 36 36"><path d="M5 12h6l2-3h10l2 3h6v16H5z"/><path d="M14 20a4 4 0 0 1 7-2.5M22 20a4 4 0 0 1-7 2.5M21 16.5v2h-2M15 23.5v-2h2"/></svg>',
  timer:'<svg viewBox="0 0 24 24"><circle cx="12" cy="13.5" r="7.5"/><path d="M12 13.5V9.5M10 2.5h4"/></svg>',
  ratio:'<svg viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="12" rx="1.5"/><path d="M7 6v12"/></svg>',
  exposure:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8"/></svg>',
  filter:'<svg viewBox="0 0 24 24"><circle cx="9" cy="9" r="5.5"/><circle cx="15" cy="9" r="5.5"/><circle cx="12" cy="15" r="5.5"/></svg>',
  sun:'<svg viewBox="0 0 20 20"><circle cx="10" cy="10" r="3.5"/><path d="M10 1.5v2M10 16.5v2M1.5 10h2M16.5 10h2M4 4l1.4 1.4M14.6 14.6L16 16M4 16l1.4-1.4M14.6 5.4L16 4"/></svg>'
};
const TOOLS=[['flash','플래시'],['live','Live'],['timer','타이머'],['ratio','화면 비율'],['exposure','노출'],['filter','필터']];

function toast(s){const t=$('#toast');t.textContent=s;t.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove('show'),1800)}
function db(){return new Promise((res,rej)=>{const q=indexedDB.open(DB,1);q.onupgradeneeded=()=>q.result.createObjectStore('k');q.onsuccess=()=>res(q.result);q.onerror=rej})}

async function save(data,w,h){
  const d=await db();
  const state=await new Promise(r=>{const q=d.transaction('k').objectStore('k').get(KEY);q.onsuccess=()=>r(q.result||{photos:[],albums:[{id:'a1',name:'가족'}],cols:3});q.onerror=()=>r({photos:[],albums:[{id:'a1',name:'가족'}],cols:3})});
  const ts=Date.now();
  state.photos=state.photos||[];
  state.photos.push({id:'c'+ts,name:new Date(ts).toISOString(),ts,type:'photo',dur:0,kind:'upload',data,album:'camera',fav:0,w,h,size:Math.round(w*h*.2),loc:'',store:'기기 저장공간',mode:'사진'});
  await new Promise((r,j)=>{const t=d.transaction('k','readwrite');t.objectStore('k').put(state,KEY);t.oncomplete=r;t.onerror=j});
  setThumb(data,true);
}
function setThumb(src,pop){
  lastPhoto=src;
  const th=$('#thumbnail');
  th.style.backgroundImage='url('+src+')';
  if(pop){th.classList.remove('pop');void th.offsetWidth;th.classList.add('pop')}
}
async function updateThumb(){
  try{
    const d=await db(),q=d.transaction('k').objectStore('k').get(KEY);
    q.onsuccess=()=>{const p=((q.result||{}).photos||[]).filter(x=>x.data&&x.type!=='video').sort((a,b)=>b.ts-a.ts)[0];if(p)setThumb(p.data)};
  }catch(e){}
}

async function start(){
  try{
    if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia)throw Error('x');
    if(stream)stream.getTracks().forEach(t=>t.stop());
    stream=await navigator.mediaDevices.getUserMedia({audio:false,video:{facingMode:{ideal:'environment'},width:{ideal:1920},height:{ideal:1440}}});
    const v=$('#live');v.srcObject=stream;await v.play();$('#fallback').hidden=true;
  }catch(e){
    const f=$('#fallback');f.hidden=false;
    f.textContent=e.name==='NotAllowedError'?'카메라 접근을 허용해 주십시오.':'카메라를 사용할 수 없습니다.\nHTTPS 환경과 권한을 확인해 주십시오.';
  }
}

function capture(){
  const v=$('#live');
  if(!v.videoWidth){toast('카메라가 준비되지 않았습니다.');return}
  const w=960,h=1280,c=document.createElement('canvas');c.width=w;c.height=h;
  const x=c.getContext('2d'),vw=v.videoWidth,vh=v.videoHeight;
  let cw=vw,ch=vw*4/3;if(ch>vh){ch=vh;cw=vh*3/4}
  const sx=(vw-cw)/2,sy=(vh-ch)/2;
  x.drawImage(v,sx,sy,cw,ch,0,0,w,h);
  const f=$('#flash');f.classList.add('on');setTimeout(()=>f.classList.remove('on'),80);
  save(c.toDataURL('image/jpeg',.9),w,h).catch(()=>toast('사진 저장에 실패했습니다.'));
}

function setMode(i){
  mode=i;
  document.querySelectorAll('.mode').forEach((b,j)=>b.classList.toggle('on',j===i));
  const on=document.querySelector('.mode.on');
  if(on)on.scrollIntoView({inline:'center',block:'nearest'});
}
function setZoom(btn){document.querySelectorAll('.z').forEach(b=>b.classList.toggle('on',b===btn))}
function showFocus(e){
  const p=$('#preview'),r=p.getBoundingClientRect(),f=$('#focus');
  f.style.left=(e.clientX-r.left)+'px';f.style.top=(e.clientY-r.top)+'px';
  f.classList.remove('on');void f.offsetWidth;f.classList.add('on');
  clearTimeout(focusTimer);focusTimer=setTimeout(()=>f.classList.remove('on'),1600);
}

$('#app').innerHTML=`<div class="top">
  <button class="ic" data-a="noop" aria-label="플래시">${I.flash}</button>
  <button class="ic" data-a="tools" aria-label="추가 촬영 도구 펼치기">${I.chev}</button>
  <button class="ic" data-a="noop" aria-label="Live Photo">${I.live}</button>
</div>
<section id="preview">
  <video id="live" autoplay muted playsinline></video>
  <div id="fallback">카메라 연결 중…</div>
  <div id="flash"></div>
  <div id="focus"><i class="sun">${I.sun}<b></b></i></div>
  <div class="zoom"><button class="z" data-a="zoom" aria-label="0.5배">0.5x</button><button class="z on" data-a="zoom" aria-label="1배">1x</button></div>
</section>
<section id="bottom">
  <div id="modes">${MODES.map((m,i)=>`<button class="mode${i===mode?' on':''}" data-a="mode" data-i="${i}">${m}</button>`).join('')}</div>
  <div id="controls">
    <button id="thumbnail" data-a="thumb" aria-label="최근 사진"></button>
    <button id="shutter" data-a="shot" aria-label="셔터"><i></i></button>
    <button id="switch" data-a="noop" aria-label="카메라 전환">${I.flip}</button>
  </div>
  <div id="tools">${TOOLS.map(([k,l])=>`<button class="tool" data-a="noop">${I[k]}<span>${l}</span></button>`).join('')}</div>
</section>
<div id="review" hidden><div class="bar"><button data-a="close">완료</button></div><img alt="촬영한 사진"></div>
<div id="toast"></div>`;

document.addEventListener('click',e=>{
  const b=e.target.closest('[data-a]');if(!b)return;
  const a=b.dataset.a;
  if(a==='shot')capture();
  else if(a==='mode')setMode(+b.dataset.i);
  else if(a==='zoom')setZoom(b);
  else if(a==='tools'){$('#bottom').classList.toggle('tools-open');b.querySelector('.chev').classList.toggle('up')}
  else if(a==='thumb'){if(!lastPhoto)return toast('촬영한 사진이 없습니다.');$('#review img').src=lastPhoto;$('#review').hidden=false}
  else if(a==='close')$('#review').hidden=true;
});
$('#preview').addEventListener('pointerdown',e=>{if(!e.target.closest('.zoom'))showFocus(e)});

setMode(PHOTO);
updateThumb();start();
addEventListener('pagehide',()=>{if(stream)stream.getTracks().forEach(t=>t.stop())});
})();

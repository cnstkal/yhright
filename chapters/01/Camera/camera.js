'use strict';
(()=>{
const $=s=>document.querySelector(s),KEY='s7gallery-2017',DB='s7g';
let front=false,stream=null,lastPhoto=null;
const sw='<svg viewBox="0 0 36 36"><path d="M5 12h6l2-3h10l2 3h6v16H5z"/><path d="M14 20a4 4 0 0 1 7-2.5M22 20a4 4 0 0 1-7 2.5M21 16.5v2h-2M15 23.5v-2h2"/></svg>';
function toast(s){const t=$('#toast');t.textContent=s;t.classList.add('show');clearTimeout(t._t);t._t=setTimeout(()=>t.classList.remove('show'),1800)}
function db(){return new Promise((res,rej)=>{const q=indexedDB.open(DB,1);q.onupgradeneeded=()=>q.result.createObjectStore('k');q.onsuccess=()=>res(q.result);q.onerror=rej})}
async function save(data,w,h){const d=await db(),q=d.transaction('k').objectStore('k').get(KEY);
const state=await new Promise(r=>{q.onsuccess=()=>r(q.result||{photos:[],albums:[{id:'a1',name:'가족'}],cols:3});q.onerror=()=>r({photos:[]})});
const ts=Date.now();state.photos=state.photos||[];
state.photos.push({id:'c'+ts,name:new Date(ts).toISOString(),ts,type:'photo',dur:0,kind:'upload',data,album:'camera',fav:0,w,h,size:Math.round(w*h*.2),loc:'',store:'기기 저장공간',mode:'사진'});
await new Promise((r,j)=>{const t=d.transaction('k','readwrite');t.objectStore('k').put(state,KEY);t.oncomplete=r;t.onerror=j});
setThumb(data)}
function setThumb(s){lastPhoto=s;$('#thumbnail').style.backgroundImage='url('+s+')'}
async function updateThumb(){try{const d=await db(),q=d.transaction('k').objectStore('k').get(KEY);q.onsuccess=()=>{const p=((q.result||{}).photos||[]).filter(x=>x.data&&x.type!=='video').sort((a,b)=>b.ts-a.ts)[0];if(p)setThumb(p.data)}}catch(e){}}
async function start(){try{if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia)throw Error('x');if(stream)stream.getTracks().forEach(t=>t.stop());
stream=await navigator.mediaDevices.getUserMedia({audio:false,video:{facingMode:front?'user':'environment',width:{ideal:1920},height:{ideal:1440}}});
const v=$('#live');v.srcObject=stream;v.classList.toggle('front',front);await v.play();$('#fallback').hidden=true}
catch(e){const f=$('#fallback');f.hidden=false;f.textContent=e.name==='NotAllowedError'?'카메라 접근을 허용해 주십시오.':'카메라를 사용할 수 없습니다.\nHTTPS 환경과 권한을 확인해 주십시오.';f.style.whiteSpace='pre-line'}}
function capture(){const v=$('#live');if(!v.videoWidth){toast('카메라가 준비되지 않았습니다.');return}
const w=960,h=1280,c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d'),vw=v.videoWidth,vh=v.videoHeight;
let cw=vw,ch=vw*4/3;if(ch>vh){ch=vh;cw=vh*3/4}
const sx=(vw-cw)/2,sy=(vh-ch)/2;x.save();if(front){x.translate(w,0);x.scale(-1,1)}x.drawImage(v,sx,sy,cw,ch,0,0,w,h);x.restore();
const f=$('#flash');f.classList.add('on');setTimeout(()=>f.classList.remove('on'),90);
save(c.toDataURL('image/jpeg',.9),w,h).catch(()=>toast('사진 저장에 실패했습니다.'))}
$('#app').innerHTML=`<div class="top"></div>
<section id="preview"><video id="live" autoplay muted playsinline></video><div id="fallback">카메라 연결 중…</div><div id="flash"></div></section>
<section id="bottom"><div id="label">사진</div><div class="controls"><button id="thumbnail" data-a="thumb" aria-label="최근 사진"></button><button id="shutter" data-a="shot" aria-label="셔터"></button><button id="switch" data-a="switch" aria-label="전면/후면 카메라 전환">${sw}</button></div></section>
<div id="review" hidden><div class="bar"><button data-a="close">완료</button></div><img alt="촬영한 사진"><div class="ft"><button data-a="gallery">사진 앱에서 보기</button></div></div><div id="toast"></div>`;
document.addEventListener('click',e=>{const b=e.target.closest('[data-a]');if(!b)return;const a=b.dataset.a;
if(a==='shot')capture();
else if(a==='switch'){front=!front;start()}
else if(a==='thumb'){if(!lastPhoto)return toast('촬영한 사진이 없습니다.');$('#review img').src=lastPhoto;$('#review').hidden=false}
else if(a==='close')$('#review').hidden=true;
else if(a==='gallery')location.href='../Photos/gallery.html'});
updateThumb();start();addEventListener('pagehide',()=>{if(stream)stream.getTracks().forEach(t=>t.stop())});
})();

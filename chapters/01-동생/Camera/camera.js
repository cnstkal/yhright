'use strict';
const $=s=>document.querySelector(s),P=n=>String(n).padStart(2,0),LS='s7cam',KEY='s7gallery',GAL='../Photos/gallery.html';
const ic=d=>`<svg viewBox="0 0 24 24" fill-rule="evenodd"><path d="${d}"/></svg>`;
const I={gear:ic('M20.9 13.5v-3l-2.2-.4a7 7 0 00-.8-1.900l1.300-1.800-2.100-2.100-1.800 1.300a7 7 0 00-1.900-.8L13.100 3h-3l-.4 2.200a7 7 0 00-1.900.8L6 4.700 3.900 6.800l1.300 1.800c-.4.600-.6 1.200-.8 1.900l-2.300.4v3l2.300.4c.2.700.4 1.300.8 1.900l-1.300 1.800 2.100 2.100 1.800-1.300c.6.400 1.200.6 1.900.8l.4 2.300h3l.4-2.300c.7-.2 1.300-.4 1.900-.8l1.800 1.300 2.100-2.100-1.300-1.800c.4-.6.6-1.200.8-1.900zM12 8a4 4 0 100 8 4 4 0 000-8z'),
flash:ic('M7 2v11h3v9l7-12h-4l4-8z'),timer:ic('M15 1H9v2h6zm-3 5a8 8 0 100 16 8 8 0 000-16zm1 9h-2V9h2z'),hdr:ic('M4 7v10h2v-4h3v4h2V7H9v4H6V7zm9 0v10h4a3 3 0 003-3v-4a3 3 0 00-3-3zm2 2h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z'),
ratio:ic('M5 4h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5a1 1 0 011-1zm2 3v10h10V7z'),fx:ic('M9 4a5 5 0 100 10 5 5 0 000-10zm6 4a5 5 0 100 10 5 5 0 000-10z'),
sw:ic('M20 4h-3.200L15 2H9L7.200 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm-5 11.500V13H9v2.500L5.500 12 9 8.500V11h6V8.500l3.500 3.500z'),
back:ic('M20 11H7.800l5.600-5.600L12 4l-8 8 8 8 1.400-1.400L7.800 13H20z')};
const RS={'4:3':[3024,4032,'16M',480,640],'16:9':[2268,4032,'9M',360,640],'1:1':[3024,3024,'9M',480,480]};
const MODES=['자동','프로','파노라마','아웃포커스','동영상 콜라주','슬로 모션','하이퍼랩스','음식','가상 촬영','모드 다운로드'],MI=['A','P','⇔','◎','▦','S','H','♨','◉','⇩'],VID=[4,5,6];
const FL=['꺼짐','자동','켬'],TM=[0,2,5,10],SS=['1/500','1/250','1/125','1/60','1/30','1/15','1/8','1/4','1/2','1"'],ISO=[50,100,200,400,800];
const F={o:'',mono:'grayscale(1)',sepia:'sepia(.8)',warm:'sepia(.35) saturate(1.3)',cool:'hue-rotate(185deg) saturate(.7)',vivid:'saturate(1.6) contrast(1.1)',fade:'contrast(.85) brightness(1.1) saturate(.8)'};
const FN={o:'없음',mono:'흑백',sepia:'세피아',warm:'따뜻한',cool:'차가운',vivid:'선명',fade:'페이드'};
let C=Object.assign({flash:0,hdr:0,timer:0,ratio:'4:3',filter:'o',mode:0,front:0,zoom:1,grid:0,review:1,loc:0,stab:1,voice:0,vsize:'FHD 1920x1080',store:'기기 저장공간',pt:'iso',dl:[],pro:{iso:1,ss:4,wb:5000,fo:100,tint:0,ev:0}},JSON.parse(localStorage[LS]||'{}'));
const sv=()=>localStorage[LS]=JSON.stringify(C);
let rec=0,rt=0,rs=0,busy=0,fxo=0,AC;
const toast=m=>{const t=$('#toast');t.textContent=m;t.classList.add('on');clearTimeout(t.h);t.h=setTimeout(()=>t.classList.remove('on'),1600)};
/* 소리 */
function beep(f=1200,d=.08){try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();const o=AC.createOscillator(),g=AC.createGain();o.frequency.value=f;g.gain.value=.15;o.connect(g);g.connect(AC.destination);o.start();g.gain.exponentialRampToValueAtTime(.001,AC.currentTime+d);o.stop(AC.currentTime+d)}catch(e){}}
/* 실제 기기 카메라 */
let cameraStream=null,cameraReady=false,cameraError="";
let liveVideo;
async function startCamera(){
  if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia){
    cameraError="이 브라우저에서는 카메라를 사용할 수 없습니다. HTTPS로 접속해 주세요.";
    toast(cameraError);return;
  }
  try{
    if(cameraStream)cameraStream.getTracks().forEach(t=>t.stop());
    cameraStream=await navigator.mediaDevices.getUserMedia({
      audio:false,
      video:{facingMode:C.front?"user":"environment"}
    });
    liveVideo.srcObject=cameraStream;
    await liveVideo.play();
    cameraReady=true;cameraError="";
    fit();
  }catch(err){
    cameraReady=false;
    cameraError=err&&err.name==="NotAllowedError"?"카메라 권한이 거부됐습니다. 브라우저 설정에서 카메라를 허용해 주세요.":err&&err.name==="NotFoundError"?"사용할 수 있는 카메라를 찾지 못했습니다.":"카메라를 시작하지 못했습니다.";
    toast(cameraError);
  }
}
function stopCamera(){
  if(cameraStream){cameraStream.getTracks().forEach(t=>t.stop());cameraStream=null}
  cameraReady=false;
}
function cameraFrame(){
  if(!cameraReady||!liveVideo.videoWidth||!liveVideo.videoHeight)throw new Error(cameraError||"카메라가 준비되지 않았습니다.");
  const r=RS[C.ratio],w=r[3],h=r[4],c=document.createElement("canvas");
  c.width=w;c.height=h;
  const x=c.getContext("2d");
  const vw=liveVideo.videoWidth,vh=liveVideo.videoHeight;
  const target=w/h,source=vw/vh;
  let sx=0,sy=0,sw=vw,sh=vh;
  if(source>target){sw=vh*target;sx=(vw-sw)/2}else{sh=vw/target;sy=(vh-sh)/2}
  x.save();if(C.front){x.translate(w,0);x.scale(-1,1)}
  x.filter=fstr()||"none";
  x.drawImage(liveVideo,sx,sy,sw,sh,0,0,w,h);
  x.restore();
  return [c,[r[0],r[1]]];
}
function fstr(){const p=C.pro,pm=C.mode==1;let s='';if(pm){s+=`brightness(${1+p.ev*.25+Math.log2(ISO[p.iso]/100)*.1+(p.ss-4)*.08}) `;s+=(p.wb>5000?`hue-rotate(${(p.wb-5000)/25}deg) `:`sepia(${(5000-p.wb)/3000}) `)+`hue-rotate(${p.tint*3}deg) blur(${Math.abs(p.fo-100)/45}px) `}
 if(C.mode==7)s+='saturate(1.5) contrast(1.05) ';if(C.hdr)s+='contrast(1.12) saturate(1.1) ';return s+F[C.filter]}
function fit(){const w=$('#vfw'),r=RS[C.ratio],a=r[3]/r[4],b=$('#box');if(!w)return;let bw=w.clientWidth,bh=bw/a;if(bh>w.clientHeight){bh=w.clientHeight;bw=bh*a}b.style.width=bw+'px';b.style.height=bh+'px';const v=$('#vf');v.width=r[3];v.height=r[4]}
function loop(){if(cameraReady){liveVideo.style.filter=fstr()}requestAnimationFrame(loop)}
function apply(){$('#vf').style.filter=fstr();$('#grid').hidden=!C.grid;$('#af').hidden=C.mode!=1&&C.mode!=3?false:false;
 const t=$('.top');t.innerHTML=`<button data-a="set">${I.gear}</button><button data-a="flash" class="${C.flash?'on':''}">${I.flash}<b>${C.flash==1?'A':C.flash==2?'':'×'}</b></button><button data-a="timer" class="${C.timer?'on':''}">${I.timer}<b>${C.timer||''}</b></button><button data-a="hdr" class="${C.hdr?'on':''}">${I.hdr}</button><button data-a="ratio">${I.ratio}<b>${C.ratio}</b></button><button data-a="fxs" class="${fxo?'on':''}">${I.fx}</button><button data-a="sw">${I.sw}</button>`;
 $('#md').textContent=MODES[C.mode];$('#sh').className=VID.includes(C.mode)?'v':'';$('#zi').textContent='x'+C.zoom.toFixed(1);$('#zr').value=C.zoom;$('#vc').hidden=!C.voice;
 const fx=$('#fx');fx.hidden=!fxo;fx.innerHTML=Object.keys(F).map(k=>`<button data-f="${k}" class="${C.filter==k?'on':''}">${FN[k]}</button>`).join('');
 const pp=$('#pp');pp.hidden=C.mode!=1;if(C.mode==1)pro();sv();fit()}
const PT={iso:['ISO',0,4,1,v=>ISO[v]],ss:['셔터 속도',0,9,1,v=>SS[v]],wb:['화이트 밸런스',2300,7500,100,v=>v+'K'],fo:['초점',0,100,5,v=>v<10?'접사':v>=100?'∞':v],tint:['색조',-10,10,1,v=>v],ev:['노출값',-2,2,.5,v=>(v>0?'+':'')+v]};
function pro(){const p=C.pro,k=C.pt,d=PT[k];$('#pp').innerHTML=`<div id="pt">${Object.keys(PT).map(a=>`<button data-pt="${a}" class="${a==k?'on':''}">${PT[a][0]}</button>`).join('')}</div><div class="r"><input type="range" min="${d[1]}" max="${d[2]}" step="${d[3]}" value="${p[k]}" data-p="${k}"><span>${d[4](p[k])}</span></div>`}
/* 저장 (갤러리와 같은 IndexedDB) */
const db=()=>new Promise((r,j)=>{const q=indexedDB.open('s7g',1);q.onupgradeneeded=()=>q.result.createObjectStore('k');q.onsuccess=()=>r(q.result);q.onerror=j});
const getS=async d=>new Promise(r=>{const q=d.transaction('k').objectStore('k').get(KEY);q.onsuccess=()=>r(q.result);q.onerror=()=>r()});
async function put(p){const d=await db(),S=(await getS(d))||{photos:[],albums:[{id:'a1',name:'가족'}],cols:3};S.photos.push(p);await new Promise(r=>{const t=d.transaction('k','readwrite');t.objectStore('k').put(S,KEY);t.oncomplete=r;t.onerror=r})}
async function thumb(u){let url=u;if(!url){try{const S=await getS(await db()),l=(S&&S.photos||[]).filter(p=>p.data).sort((a,b)=>b.ts-a.ts)[0];url=l&&l.data}catch(e){}}if(url)$('#th').style.backgroundImage=`url(${url})`}
const stamp=t=>{const d=new Date(t);return `${d.getFullYear()}${P(d.getMonth()+1)}${P(d.getDate())}_${P(d.getHours())}${P(d.getMinutes())}${P(d.getSeconds())}`};
function frame(){return cameraFrame()}
async function save(c,wh,vid){const ts=Date.now(),d=c.toDataURL('image/jpeg',.85),n=stamp(ts)+(vid?'.mp4':'.jpg');
 await put({id:'c'+ts,name:n,ts,type:vid?'video':'photo',dur:vid?vid:0,kind:'upload',data:d,album:'camera',fav:0,w:wh[0],h:wh[1],size:Math.round(wh[0]*wh[1]*(vid?.9*vid:.18)),loc:C.loc?'서울특별시':'',store:C.store,mode:MODES[C.mode]});thumb(d);return d}
async function snap(){if(busy||rec)return;if(VID.includes(C.mode))return startRec();if(C.mode==9)return;
 if(C.timer){busy=1;for(let i=C.timer;i>0;i--){$('#cd').hidden=false;$('#cd').textContent=i;beep(800,.05);await new Promise(r=>setTimeout(r,1000))}$('#cd').hidden=true;busy=0}
 beep();const f=$('#fl'),fire=C.flash==2||(C.flash==1&&!C.front&&C.pro.ev<=0&&C.mode!=1);$('#af').classList.add('hit');setTimeout(()=>$('#af').classList.remove('hit'),300);
 f.className='on';setTimeout(()=>f.className='fade',fire?220:70);setTimeout(()=>f.className='',500);
 let c,wh;try{[c,wh]=frame()}catch(e){toast(e.message);return}const d=await save(c,wh,0);if(C.review){$('#rv img').src=d;$('#rv').hidden=false}}
let mediaRecorder=null,recordedChunks=[];
function startRec(){
 if(!cameraReady){toast(cameraError||"먼저 카메라 권한을 허용해 주세요.");return}
 if(!window.MediaRecorder){toast("이 브라우저는 동영상 촬영을 지원하지 않습니다.");return}
 try{
  recordedChunks=[];
  const mime=MediaRecorder.isTypeSupported("video/webm;codecs=vp8")?"video/webm;codecs=vp8":"video/webm";
  mediaRecorder=new MediaRecorder(cameraStream,{mimeType:mime});
  mediaRecorder.ondataavailable=e=>{if(e.data&&e.data.size)recordedChunks.push(e.data)};
  mediaRecorder.onstop=async()=>{
    const blob=new Blob(recordedChunks,{type:mediaRecorder.mimeType||"video/webm"});
    const reader=new FileReader();
    reader.onload=async()=>{const ts=Date.now(),data=reader.result,n=stamp(ts)+".webm";await put({id:"c"+ts,name:n,ts,type:"video",dur:Math.max(1,rs),kind:"upload",data,album:"camera",fav:0,w:liveVideo.videoWidth,h:liveVideo.videoHeight,size:blob.size,loc:C.loc?"서울특별시":"",store:C.store,mode:MODES[C.mode]});thumb(data);toast("동영상을 저장했습니다")};
    reader.readAsDataURL(blob);
  };
  mediaRecorder.start();rec=1;rs=0;beep(1500,.1);$('#rec').classList.add('on');$('#rc').hidden=false;$('#rc b').textContent="00:00";
  rt=setInterval(()=>{rs++;$('#rc b').textContent=`${P(Math.floor(rs/60))}:${P(rs%60)}`},1000);
 }catch(e){toast("동영상 촬영을 시작하지 못했습니다.")}
}
async function stopRec(){
 clearInterval(rt);rec=0;beep(1000,.1);$('#rec').classList.remove('on');$('#rc').hidden=true;
 if(mediaRecorder&&mediaRecorder.state!=="inactive")mediaRecorder.stop();
}
/* 설정 */
const OPT={psize:Object.keys(RS),vsize:['FHD 1920x1080','HD 1280x720','UHD 3840x2160','QHD 2560x1440'],store:['기기 저장공간','SD 카드']};
const ST=[['사진 크기','ratio'],['동영상 크기','vsize'],['동영상 흔들림 보정','stab',1],['위치 태그','loc',1],['촬영 후 사진 확인','review',1],['저장 위치','store'],['격자','grid',1],['음성 제어','voice',1]];
function setUI(){const o=$('#st');o.innerHTML=`<h2><button data-a="sclose">${I.back}</button>카메라 설정</h2>`+ST.map(s=>{const k=s[1],v=s[2]?(C[k]?'켬':'끔'):k=='ratio'?`${C.ratio} (${RS[C.ratio][2]})`:C[k];return `<div class="row" data-s="${k}"><span>${s[0]}</span><em>${v}</em></div>`}).join('')}
/* 동작 */
const A={set(){$('#st').hidden=false;setUI()},sclose(){$('#st').hidden=true;apply()},flash(){C.flash=(C.flash+1)%3;toast('플래시: '+FL[C.flash]);apply()},hdr(){C.hdr=C.hdr?0:1;toast('HDR '+(C.hdr?'켬':'끔'));apply()},
 timer(){C.timer=TM[(TM.indexOf(C.timer)+1)%4];toast(C.timer?`타이머 ${C.timer}초`:'타이머 끔');apply()},ratio(){const k=Object.keys(RS);C.ratio=k[(k.indexOf(C.ratio)+1)%3];toast(`사진 크기 ${C.ratio} (${RS[C.ratio][2]})`);apply()},
 fxs(){fxo=!fxo;apply()},sw(){if(rec)return;C.front=C.front?0:1;toast(C.front?'전면 카메라':'후면 카메라');startCamera();apply()},shut:snap,rec(){if(rec)stopRec();else{if(!VID.includes(C.mode)){}startRec()}},
 gal(){location.href=GAL},md(){const m=$('#mdl');m.hidden=false;m.innerHTML=`<div class="gr">${MODES.map((n,i)=>`<div data-m="${i}" class="${i==C.mode?'on':''}"><i>${MI[i]}</i>${n}</div>`).join('')}</div>`},
 rvc(){$('#rv').hidden=true},dlc(){$('#dl').hidden=true},voice(){toast('"치즈"');snap()}};
document.addEventListener('click',e=>{const el=e.target.closest('[data-a],[data-f],[data-m],[data-pt],[data-s],[data-i]');if(!el)return;const d=el.dataset;
 if(d.a)A[d.a]&&A[d.a]();else if(d.f){C.filter=d.f;apply()}else if(d.pt){C.pt=d.pt;sv();pro()}
 else if(d.m!=null){$('#mdl').hidden=true;const i=+d.m;if(i==9){dl();return}if(rec)return;C.mode=i;if(i==2)toast('파노라마: 셔터를 누르면 좌우로 촬영합니다');apply()}
 else if(d.s){const k=d.s;if(k=='ratio')A.ratio();else if(OPT[k]){const o=OPT[k];C[k]=o[(o.indexOf(C[k])+1)%o.length]}else C[k]=C[k]?0:1;setUI();sv()}
 else if(d.i){C.dl=C.dl||[];C.dl.includes(d.i)?C.dl.splice(C.dl.indexOf(d.i),1):C.dl.push(d.i);sv();dl()}});
function dl(){const o=$('#dl'),L=['타임랩스','파노라마 3D','스포츠','야간 촬영','애니메이션 GIF'];o.hidden=false;o.innerHTML=`<h2><button data-a="dlc">${I.back}</button>모드 다운로드</h2>`+L.map(n=>`<div class="row" data-i="${n}"><span>${n}</span><em>${(C.dl||[]).includes(n)?'설치됨':'다운로드'}</em></div>`).join('')}
$('#app').addEventListener('click',e=>{if(e.target.id=='mdl')e.target.hidden=true});
document.addEventListener('input',e=>{const t=e.target;if(t.id=='zr'){C.zoom=+t.value;apply()}else if(t.dataset.p){C.pro[t.dataset.p]=+t.value;apply()}});
$('#app').innerHTML=`<div class="top"></div><div id="vfw"><div id="box"><video id="live-camera" autoplay muted playsinline></video><canvas id="vf" style="display:none"></canvas><div id="grid"></div><div id="af"></div><div id="cd" hidden></div><div id="rc" hidden><i></i><b>00:00</b></div><div id="fl"></div><div id="zm">−<input id="zr" type="range" min="1" max="8" step=".1"><span id="zi"></span>+</div><button id="vc" data-a="voice" hidden>"치즈" 라고 말하세요</button></div></div>
<div id="fx" hidden></div><div id="pp" hidden></div><button id="md" data-a="md"></button>
<div class="bot"><button id="th" data-a="gal"></button><button id="sh" data-a="shut"><i></i></button><button id="rec" data-a="rec"><i></i></button></div>
<div id="mdl" class="ov" hidden></div><div id="st" class="ov" hidden></div><div id="dl" class="ov" hidden></div><div id="rv" class="ov" data-a="rvc" hidden><img alt=""></div><div id="toast"></div>`;
liveVideo=$('#live-camera');addEventListener('resize',fit);apply();thumb();startCamera();requestAnimationFrame(loop);addEventListener('pagehide',stopCamera);

(()=>{
'use strict';
const $=s=>document.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,6);
const KEY='yhright.phone.v1',HOUR=36e5,DAY=864e5;

/* ---------- 아이콘 ---------- */
const PH='<svg viewBox="0 0 24 24" class="f"><use href="#ph"/></svg>';
const PERSON='<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7z"/></svg>';
const I={
  vm:'<svg viewBox="0 0 24 12"><circle cx="6" cy="6" r="4.2"/><circle cx="18" cy="6" r="4.2"/><path d="M6 10.2h12"/></svg>',
  vmb:'<svg viewBox="0 0 24 24" style="fill:none;stroke:#fff;stroke-width:2"><circle cx="8" cy="12" r="3.5"/><circle cx="16" cy="12" r="3.5"/><path d="M8 15.5h8"/></svg>',
  mail:'<svg viewBox="0 0 24 18" style="width:34px;height:26px"><rect width="24" height="18" rx="2" fill="#f4a21c"/><path d="M3 4l9 7 9-7M3 15l6-5M21 15l-6-5" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  vmail:'<svg viewBox="0 0 24 18" style="width:34px;height:26px"><rect width="24" height="18" rx="2" fill="#4b7bb0"/><circle cx="8" cy="9" r="3" fill="none" stroke="#fff" stroke-width="1.8"/><circle cx="16" cy="9" r="3" fill="none" stroke="#fff" stroke-width="1.8"/><path d="M8 12h8" stroke="#fff" stroke-width="1.8"/></svg>',
  video:'<svg viewBox="0 0 24 24" style="fill:none;stroke:#fff;stroke-width:1.8;stroke-linejoin:round;width:34px;height:34px"><rect x="2" y="6" width="14" height="12" rx="1.5"/><path d="M16 10l6-3v10l-6-3"/></svg>',
  kp:'<svg viewBox="0 0 24 24"><use href="#kp"/></svg>',
  msg:'<svg viewBox="0 0 24 24"><path d="M3 5h18v12H8l-5 4z"/></svg>',
  star:'<svg viewBox="0 0 24 24"><path d="M12 3l2.7 5.6 6.1.8-4.4 4.2 1.1 6.1L12 16.8 6.5 19.7l1.1-6.1L3.2 9.4l6.1-.8z"/></svg>',
  starf:'<svg viewBox="0 0 24 24" class="fl"><path d="M12 3l2.7 5.6 6.1.8-4.4 4.2 1.1 6.1L12 16.8 6.5 19.7l1.1-6.1L3.2 9.4l6.1-.8z"/></svg>',
  call:'<svg viewBox="0 0 24 24" class="fl"><use href="#ph"/></svg>',
  out:'<svg class="ti" viewBox="0 0 14 14"><path d="M3 11L11 3M5 3h6v6" fill="none" stroke="#3a9d23" stroke-width="1.8"/></svg>',
  in:'<svg class="ti" viewBox="0 0 14 14"><path d="M11 3L3 11M3 5v6h6" fill="none" stroke="#3b7fd0" stroke-width="1.8"/></svg>',
  miss:'<svg class="ti" viewBox="0 0 14 14"><path d="M11 3L3 11M3 5v6h6" fill="none" stroke="#e8604f" stroke-width="1.8"/></svg>',
  add:'<svg viewBox="0 0 24 24"><path d="M12 4v16M4 12h16"/></svg>',
  extra:'<svg viewBox="0 0 24 24" class="fl"><use href="#ph"/></svg>',
  bt:'<svg viewBox="0 0 24 24"><path d="M7 7l10 10-5 5V2l5 5L7 17"/></svg>',
  spk:'<svg viewBox="0 0 24 24" class="fl"><path d="M3 9h4l5-5v16l-5-5H3zM15 8.5a5 5 0 0 1 0 7M17.5 6a8.5 8.5 0 0 1 0 12" style="stroke:#666;stroke-width:1.8;stroke-linecap:round"/></svg>',
  mute:'<svg viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3M4 4l16 16"/></svg>'
};

/* ---------- 데이터 ---------- */
function seed(){
  const n=Date.now();
  const c=[['엄마','010-1234-5678',1],['아빠','010-2345-6789',0],['형','010-3456-7890',1],['민준','010-4567-8901',0],['지수','010-5678-9012',1],['김철수','010-6789-0123',0],['박영희','02-345-6789',0],['Alex','010-7890-1234',0]]
    .map(([name,num,fav],i)=>({id:'c'+i,name,num,fav:!!fav}));
  const l=(type,ci,ago,dur)=>({id:uid(),type,name:c[ci].name,num:c[ci].num,ts:n-ago,dur:dur||0});
  return{contacts:c,
    logs:[l('in',0,HOUR,95),l('miss',3,3*HOUR),l('out',2,5*HOUR,184),l('in',4,DAY+HOUR,32),l('miss',5,DAY+4*HOUR),l('out',0,2*DAY,410)],
    speed:{2:'c0',3:'c2'},set:{tone:true,vib:true}};
}
let S=null;
try{S=JSON.parse(localStorage.getItem(KEY))}catch(e){}
if(!S||!S.contacts||!S.logs)S=seed();
S.speed=S.speed||{};S.set=S.set||{tone:true,vib:true};
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}};
save();

const digits=s=>String(s).replace(/[^\d+*#]/g,'');
function fmtNum(n){
  const d=String(n).replace(/[^\d]/g,'');
  if(/[*#+]/.test(n))return n;
  if(d.length===11&&d.startsWith('01'))return d.replace(/(\d{3})(\d{4})(\d{4})/,'$1-$2-$3');
  if(d.length===10&&d.startsWith('01'))return d.replace(/(\d{3})(\d{3})(\d{4})/,'$1-$2-$3');
  if(d.length===9&&d.startsWith('02'))return d.replace(/(\d{2})(\d{3})(\d{4})/,'$1-$2-$3');
  if(d.length===10&&d.startsWith('02'))return d.replace(/(\d{2})(\d{4})(\d{4})/,'$1-$2-$3');
  if(d.length===10)return d.replace(/(\d{3})(\d{3})(\d{4})/,'$1-$2-$3');
  return n;
}
const byNum=n=>S.contacts.find(c=>digits(c.num)===digits(n));
const byId=id=>S.contacts.find(c=>c.id===id);
const COLORS=['#e57373','#64b5f6','#81c784','#ba68c8','#ffb74d','#4db6ac','#a1887f'];
const avHtml=c=>c?`<span class="av" style="background:${COLORS[S.contacts.indexOf(c)%COLORS.length]}">${esc(c.name.charAt(0))}</span>`:`<span class="av">${PERSON}</span>`;
function fmtTime(ts){
  const d=new Date(ts),n=new Date();
  if(d.toDateString()===n.toDateString()){const h=d.getHours();return(h<12?'오전 ':'오후 ')+((h%12)||12)+':'+String(d.getMinutes()).padStart(2,'0')}
  return(d.getMonth()+1)+'월 '+d.getDate()+'일';
}
function fmtFull(ts){const d=new Date(ts),h=d.getHours();return d.getFullYear()+'.'+(d.getMonth()+1)+'.'+d.getDate()+' '+(h<12?'오전 ':'오후 ')+((h%12)||12)+':'+String(d.getMinutes()).padStart(2,'0')}
const fmtDur=s=>{s=Math.round(s);const m=Math.floor(s/60);return m?m+'분 '+(s%60)+'초':s+'초'};
const TYPE={out:'발신',in:'수신',miss:'부재중'};
const CHO=['ㄱ','ㄱ','ㄴ','ㄷ','ㄷ','ㄹ','ㅁ','ㅂ','ㅂ','ㅅ','ㅅ','ㅇ','ㅈ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
function initial(n){const c=n.charCodeAt(0);if(c>=0xAC00&&c<=0xD7A3)return CHO[Math.floor((c-0xAC00)/588)];return/[a-z]/i.test(n.charAt(0))?n.charAt(0).toUpperCase():'#'}
const isKo=s=>/[ㄱ-힣]/.test(s.charAt(0));
const sortC=(a,b)=>(isKo(b.name)-isKo(a.name))||a.name.localeCompare(b.name,'ko');

/* ---------- 화면 전환 ---------- */
const VIEWS=['Main','Log','Con','Edit','Call','Speed','Set'];
let stack=[],cur='Main',tab='log',padOpen=true,num='',selLog=null,selCon=null,editId=null;
function show(v,push){
  if(push)stack.push(cur);
  VIEWS.forEach(x=>$('#v'+x).hidden=x!==v);cur=v;closePop();
}
function back(){const v=stack.pop()||'Main';show(v);refreshAll()}
function refreshAll(){renderTab();renderLogDet();renderConDet();}

/* ---------- 탭 ---------- */
$('#tabs').addEventListener('click',e=>{const b=e.target.closest('[data-tab]');if(!b)return;tab=b.dataset.tab;if(tab!=='log'&&tab!=='fav'&&tab!=='con')return;padOpen=false;renderTab()});
function renderTab(){
  document.querySelectorAll('#tabs button').forEach(b=>b.classList.toggle('on',b.dataset.tab===tab));
  $('#pgLog').hidden=tab!=='log';$('#pgFav').hidden=tab!=='fav';$('#pgCon').hidden=tab!=='con';
  $('#dialer').hidden=!padOpen;$('#disp').hidden=!padOpen;$('#fab').hidden=padOpen;
  if(tab==='log')renderLog();if(tab==='fav')renderFav();if(tab==='con')renderCon();
  if(padOpen)renderPad();
}
function renderLog(){
  const L=[...S.logs].sort((a,b)=>b.ts-a.ts);
  $('#pgLog').innerHTML=L.length?'<ul class="list" style="overflow:visible">'+L.map(l=>{
    const c=byNum(l.num),nm=l.name||(c&&c.name)||fmtNum(l.num);
    return `<li class="it" data-log="${l.id}">${avHtml(c)}<div class="bd"><div class="n1 ${l.type==='miss'?'miss':''}">${esc(nm)}</div><div class="n2">${I[l.type]}<span>${esc(fmtNum(l.num))}</span></div></div><span class="tm">${fmtTime(l.ts)}</span></li>`}).join('')+'</ul>':'<div class="empty">최근기록이 없습니다</div>';
}
function favList(){return S.contacts.filter(c=>c.fav).sort(sortC)}
function renderFav(){
  const F=favList();
  $('#pgFav').innerHTML=F.length?'<ul class="list" style="overflow:visible">'+F.map(c=>`<li class="it" data-con="${c.id}">${avHtml(c)}<div class="bd"><div class="n1">${esc(c.name)}</div><div class="n2">${esc(fmtNum(c.num))}</div></div></li>`).join('')+'</ul>':'<div class="empty">즐겨찾기가 없습니다</div>';
}
function renderCon(){
  const q=$('#cq').value.trim().toLowerCase();
  const L=S.contacts.filter(c=>!q||c.name.toLowerCase().includes(q)||digits(c.num).includes(digits(q))&&digits(q)).sort(sortC);
  let h='',p='';
  L.forEach(c=>{const i=initial(c.name);if(i!==p){h+=`<div class="sec">${esc(i)}</div>`;p=i}
    h+=`<div class="it" data-con="${c.id}">${avHtml(c)}<div class="bd"><div class="n1">${esc(c.name)}</div><div class="n2">${esc(fmtNum(c.num))}</div></div></div>`});
  $('#conList').innerHTML=L.length?h:'<div style="padding:60px 0;text-align:center;color:var(--g);font-size:18px">연락처가 없습니다</div>';
}
$('#cq').addEventListener('input',renderCon);
$('#pgLog').addEventListener('click',e=>{const li=e.target.closest('[data-log]');if(li){selLog=li.dataset.log;renderLogDet();show('Log',true)}});
['#pgFav','#conList'].forEach(s=>$(s).addEventListener('click',e=>{const li=e.target.closest('[data-con]');if(li){selCon=li.dataset.con;renderConDet();show('Con',true)}}));

/* ---------- 다이얼러 ---------- */
const KEYS=[['1',''],['2','ㄱㅋ'],['3','ㄴㄹ'],['4','ㄷㅌ'],['5','ㅂㅍ'],['6','ㅅㅎ'],['7','ㅈㅊ'],['8','ㅇㅁ'],['9',''],['*',''],['0','+'],['#','']];
$('#keys').innerHTML=KEYS.map(([k,s])=>`<button class="key" data-k="${k}"><b>${k==='*'?'✱':k}</b><small>${k==='1'?I.vm:s}</small></button>`).join('');
function renderPad(){
  const d=fmtNum(num);
  $('#dn').textContent=d;$('#dn').style.fontSize=d.length>13?'24px':'34px';
  const c=num?byNum(num):null;$('#dname').textContent=c?c.name:'';
  $('#bs').hidden=!num;
  const call=`<button class="db call${num?' round':''}" data-act="dial" aria-label="전화">${PH}</button>`;
  const hide=`<button class="hide" data-act="hidepad">${I.kp.replace('<svg','<svg class="f"')}<span>숨기기</span></button>`;
  $('#dbar').innerHTML=num
    ?`<button class="sq" data-act="msgnum" aria-label="메시지">${I.mail}</button>${call}${hide}`
    :`<button class="sq" data-act="vm" aria-label="음성사서함">${I.vmail}</button>${call}<button class="db vid" data-act="video" aria-label="영상통화">${I.video}</button>${hide}`;
}
let holdT=null,held=false;
$('#keys').addEventListener('pointerdown',e=>{
  const b=e.target.closest('[data-k]');if(!b)return;
  held=false;clearTimeout(holdT);const k=b.dataset.k;
  holdT=setTimeout(()=>{held=true;
    if(k==='0'){num+='+';renderPad()}
    else if(/[2-9]/.test(k)&&!num){const c=byId(S.speed[k]);c?startCall(c.num,c.name):toast('단축번호가 지정되지 않았습니다')}
    else if(k==='1'&&!num)toast('음성사서함을 사용할 수 없습니다');
  },600);
});
['pointerup','pointerleave','pointercancel'].forEach(ev=>$('#keys').addEventListener(ev,()=>clearTimeout(holdT)));
$('#keys').addEventListener('click',e=>{
  const b=e.target.closest('[data-k]');if(!b)return;
  if(held){held=false;return}
  if(num.length<20){num+=b.dataset.k;renderPad()}
});
let bsT=null;
$('#bs').addEventListener('pointerdown',()=>{bsT=setTimeout(()=>{num='';renderPad();bsT='x'},600)});
$('#bs').addEventListener('click',()=>{if(bsT==='x'){bsT=null;return}clearTimeout(bsT);num=num.slice(0,-1);renderPad()});

/* ---------- 상세 ---------- */
function renderLogDet(){
  const l=S.logs.find(x=>x.id===selLog);if(!l)return;
  const c=byNum(l.num),nm=l.name||(c&&c.name)||fmtNum(l.num);
  const same=S.logs.filter(x=>digits(x.num)===digits(l.num)).sort((a,b)=>b.ts-a.ts);
  $('#logDet').innerHTML=`<div class="hero">${avHtml(c)}<h2>${esc(nm)}</h2><p>${esc(fmtNum(l.num))}</p></div>
  <div class="acts"><button data-act="dcall" data-n="${esc(l.num)}">${I.call}전화</button><button data-act="dmsg">${I.msg}메시지</button>${c?'':`<button data-act="addnum" data-n="${esc(l.num)}">${I.add}연락처 추가</button>`}</div>
  ${same.map(x=>`<div class="row"><span class="k">${TYPE[x.type]}</span><span style="flex:1">${fmtFull(x.ts)}</span><span style="color:var(--sub);font-size:13px">${x.type==='miss'?'':fmtDur(x.dur)}</span></div>`).join('')}
  <div class="row link" data-act="dellog">기록 삭제</div>`;
}
function renderConDet(){
  const c=byId(selCon);if(!c)return;
  $('#conDet').innerHTML=`<div class="hero">${avHtml(c)}<h2>${esc(c.name)}</h2><p>${esc(fmtNum(c.num))}</p></div>
  <div class="acts"><button data-act="dcall" data-n="${esc(c.num)}">${I.call}전화</button><button data-act="dmsg">${I.msg}메시지</button><button data-act="togfav">${c.fav?I.starf:I.star}${c.fav?'즐겨찾기 해제':'즐겨찾기'}</button></div>
  <div class="row"><span class="k">휴대전화</span><span>${esc(fmtNum(c.num))}</span></div>
  <div class="row link" data-act="delcon">삭제</div>`;
}

/* ---------- 연락처 추가/편집 ---------- */
function openEdit(id,presetNum){
  editId=id;const c=id?byId(id):null;
  $('#edTitle').textContent=c?'연락처 편집':'연락처 추가';
  $('#edName').value=c?c.name:'';$('#edNum').value=c?c.num:(presetNum||'');
  show('Edit',true);
}
function saveEdit(){
  const name=$('#edName').value.trim(),n=$('#edNum').value.trim();
  if(!name)return toast('이름을 입력하세요');
  if(!digits(n))return toast('전화번호를 입력하세요');
  if(editId){const c=byId(editId);c.name=name;c.num=n}
  else{const c={id:uid(),name,num:n,fav:false};S.contacts.push(c);selCon=c.id}
  save();toast('저장되었습니다');
  const wasNew=!editId;stack.pop();
  if(wasNew&&cur==='Edit'){stack=[];renderConDet();show('Con')}else{show('Con')}
  renderConDet();
}

/* ---------- 통화 ---------- */
let call=null,timer=null,startTs=0;
function startCall(n,name,video){
  n=String(n).trim();if(!digits(n))return toast('번호를 입력하세요');
  const c=byNum(n);
  call={num:n,name:name||(c&&c.name)||'',video:!!video,mute:false,spk:false,bt:false,kp:false,hold:false};
  $('#cName').textContent=call.name||fmtNum(n);
  $('#cSub').textContent=call.name?fmtNum(n):'';
  $('#cAv').innerHTML='';
  $('#cTime').textContent='연결 중...';$('#holdBtn').textContent='보류';
  renderCallBtns();show('Call',true);
  startTs=0;clearInterval(timer);
  setTimeout(()=>{if(!call)return;startTs=Date.now();timer=setInterval(tick,500);tick()},1200);
}
function tick(){
  if(!call||!startTs)return;
  const s=Math.floor((Date.now()-startTs)/1000);
  $('#cTime').textContent=String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0');
}
function renderCallBtns(){
  const B=[['add','통화 추가',I.add,0],['extra','추가 볼륨',I.extra,0],['bt','블루투스',I.bt,call.bt],['spk','스피커',I.spk,call.spk],['kp','키패드',I.kp,call.kp],['mute','음소거',I.mute,call.mute]];
  $('#cGrid').innerHTML=B.map(([k,l,ic,on])=>`<button class="cb${on?' on':''}" data-cb="${k}">${ic}<span>${l}</span></button>`).join('');
}
$('#cGrid').addEventListener('click',e=>{
  const b=e.target.closest('[data-cb]');if(!b||!call)return;const k=b.dataset.cb;
  if(k==='add')toast('통화 추가는 시뮬레이션입니다');
  else if(k==='extra')toast('추가 볼륨이 켜졌습니다');
  else{call[k]=!call[k];renderCallBtns();if(k==='mute')toast(call.mute?'음소거가 켜졌습니다':'음소거가 꺼졌습니다')}
});
function endCall(){
  if(!call)return;
  const dur=startTs?Math.round((Date.now()-startTs)/1000):0;
  clearInterval(timer);
  const c=byNum(call.num);
  S.logs.push({id:uid(),type:'out',name:call.name||(c&&c.name)||'',num:call.num,ts:Date.now(),dur});
  save();call=null;num='';stack=[];tab='log';padOpen=false;show('Main');renderTab();
}

/* ---------- 더보기 / 단축번호 / 설정 ---------- */
function openPop(){
  if(!$('#pop').hidden)return closePop();
  const items=[];
  if(!padOpen&&tab==='log')items.push(['clr','기록 전체 삭제']);
  if(!padOpen&&tab==='con')items.push(['new','새 연락처 추가']);
  items.push(['speed','단축번호'],['set','설정']);
  $('#pop').innerHTML=items.map(([k,l])=>`<button data-m="${k}">${l}</button>`).join('');
  $('#pop').hidden=false;
}
function closePop(){$('#pop').hidden=true}
$('#pop').addEventListener('click',e=>{
  const b=e.target.closest('[data-m]');if(!b)return;const k=b.dataset.m;closePop();
  if(k==='speed'){renderSpeed();show('Speed',true)}
  else if(k==='set'){renderSet();show('Set',true)}
  else if(k==='new')openEdit(null);
  else if(k==='clr'){if(!S.logs.length)return toast('삭제할 기록이 없습니다');ask('최근기록을 모두 삭제할까요?','삭제',()=>{S.logs=[];save();renderLog()})}
});
function renderSpeed(){
  let h=`<li class="it"><b style="width:28px;font-size:20px;font-weight:300">1</b><div class="bd"><div class="n1">음성사서함</div></div></li>`;
  for(let i=2;i<=9;i++){const c=byId(S.speed[i]);
    h+=`<li class="it" data-sp="${i}"><b style="width:28px;font-size:20px;font-weight:300">${i}</b><div class="bd"><div class="n1" style="${c?'':'color:#999'}">${c?esc(c.name):'추가'}</div>${c?`<div class="n2">${esc(fmtNum(c.num))}</div>`:''}</div></li>`}
  $('#speedList').innerHTML=h;
}
$('#speedList').addEventListener('click',e=>{
  const li=e.target.closest('[data-sp]');if(!li)return;const i=li.dataset.sp;
  if(S.speed[i]){ask(`단축번호 ${i}번을 삭제할까요?`,'삭제',()=>{delete S.speed[i];save();renderSpeed()});return}
  pickContact('단축번호 '+i+'번 연락처',id=>{S.speed[i]=id;save();renderSpeed()});
});
function renderSet(){
  const it=[['tone','키패드 톤'],['vib','진동 피드백']];
  $('#setList').innerHTML=it.map(([k,l])=>`<li class="it" data-set="${k}"><div class="bd"><div class="n1">${l}</div></div><span class="sw${S.set[k]?' on':''}"></span></li>`).join('')
   +`<li class="it" data-set="blocked"><div class="bd"><div class="n1">차단 번호</div><div class="n2">차단된 번호가 없습니다</div></div></li>`
   +`<li class="it" data-set="reset"><div class="bd"><div class="n1" style="color:var(--red)">테스트 데이터 초기화</div><div class="n2">연락처와 통화 기록을 처음 상태로 되돌립니다</div></div></li>`;
}
$('#setList').addEventListener('click',e=>{
  const li=e.target.closest('[data-set]');if(!li)return;const k=li.dataset.set;
  if(k==='tone'||k==='vib'){S.set[k]=!S.set[k];save();renderSet()}
  else if(k==='blocked')toast('차단 번호는 시뮬레이션입니다');
  else ask('모든 데이터를 처음 상태로 되돌릴까요?','초기화',()=>{S=seed();save();toast('초기화되었습니다');renderSet()});
});

/* ---------- 공통: 연락처 선택 시트, 확인창, 토스트 ---------- */
let pickCb=null;
function pickContact(title,cb){
  pickCb=cb;$('#shTitle').textContent=title;
  $('#shList').innerHTML=[...S.contacts].sort(sortC).map(c=>`<li class="it" data-pk="${c.id}">${avHtml(c)}<div class="bd"><div class="n1">${esc(c.name)}</div><div class="n2">${esc(fmtNum(c.num))}</div></div></li>`).join('');
  $('#sheet').hidden=false;
}
$('#shList').addEventListener('click',e=>{const li=e.target.closest('[data-pk]');if(!li)return;$('#sheet').hidden=true;const f=pickCb;pickCb=null;f&&f(li.dataset.pk)});
let dlgCb=null;
function ask(msg,ok,cb){$('#dlgMsg').textContent=msg;$('#dlgOk').textContent=ok;dlgCb=cb;$('#dlg').hidden=false}
$('#dlgOk').addEventListener('click',()=>{$('#dlg').hidden=true;const f=dlgCb;dlgCb=null;f&&f()});
$('#dlgNo').addEventListener('click',()=>{$('#dlg').hidden=true;dlgCb=null});
let toastT=null;
function toast(m){const t=$('#toast');t.textContent=m;t.hidden=false;clearTimeout(toastT);toastT=setTimeout(()=>t.hidden=true,1700)}
const MSG_URL='../Messages/messages.html';

/* ---------- 버튼 동작 ---------- */
const A={
  more:openPop,back,
  showpad:()=>{padOpen=true;renderTab()},
  hidepad:()=>{padOpen=false;renderTab()},
  dial:()=>{
    if(!num){const l=[...S.logs].filter(x=>x.type==='out').sort((a,b)=>b.ts-a.ts)[0];if(l){num=l.num;renderPad();return}return toast('번호를 입력하세요')}
    startCall(num);
  },
  video:()=>num?startCall(num,'',true):toast('번호를 입력하세요'),
  vm:()=>toast('음성사서함을 사용할 수 없습니다'),
  msgnum:()=>{location.href=MSG_URL},
  dcall:el=>startCall(el.dataset.n),
  dmsg:()=>{location.href=MSG_URL},
  addnum:el=>openEdit(null,el.dataset.n),
  dellog:()=>ask('이 통화 기록을 삭제할까요?','삭제',()=>{
    const l=S.logs.find(x=>x.id===selLog);
    S.logs=S.logs.filter(x=>!l||digits(x.num)!==digits(l.num));
    save();toast('삭제되었습니다');back();
  }),
  editcon:()=>openEdit(selCon),
  togfav:()=>{const c=byId(selCon);c.fav=!c.fav;save();renderConDet();toast(c.fav?'즐겨찾기에 추가되었습니다':'즐겨찾기에서 해제되었습니다')},
  delcon:()=>ask('이 연락처를 삭제할까요?','삭제',()=>{
    S.contacts=S.contacts.filter(c=>c.id!==selCon);
    Object.keys(S.speed).forEach(k=>{if(S.speed[k]===selCon)delete S.speed[k]});
    save();toast('삭제되었습니다');back();
  }),
  edcancel:()=>back(),
  edsave:saveEdit,
  end:endCall,
  hold:()=>{if(!call)return;call.hold=!call.hold;$('#holdBtn').textContent=call.hold?'보류 해제':'보류'},
  shclose:()=>{$('#sheet').hidden=true;pickCb=null}
};
document.addEventListener('click',e=>{
  const el=e.target.closest('[data-act]');
  if(el){const f=A[el.dataset.act];f&&f(el);return}
  if(!e.target.closest('#pop'))closePop();
});

renderTab();
show('Main');
})();

(()=>{
'use strict';
const $=s=>document.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,6);
const KEY='yhright.phone.v1',HOUR=36e5,DAY=864e5;
const MSG_URL='../Messages/messages.html';
const PH='<svg viewBox="0 0 24 24" class="f"><use href="#ph"/></svg>';
const PERSON='<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7z"/></svg>';
const PH_ICON='<svg viewBox="0 0 24 24" class="fl"><use href="#ph"/></svg>';
const MSG_ICON='<svg viewBox="0 0 24 24"><path d="M12 3C6.5 3 2 6.6 2 11c0 2.5 1.4 4.7 3.7 6.2L4.5 21l4.3-2.2c1 .2 2.100.4 3.200.4 5.500 0 10-3.600 10-8S17.500 3 12 3z"/></svg>';
const STAR_ICON='<svg viewBox="0 0 24 24"><path d="M12 3l2.700 5.600 6.100.8-4.400 4.200 1.100 6.100L12 16.800 6.500 19.700l1.100-6.100L3.200 9.400l6.100-.8z"/></svg>';
const ADD_ICON='<svg viewBox="0 0 24 24" style="stroke:var(--blue);stroke-width:2;fill:none"><path d="M12 4v16M4 12h16"/></svg>';

/* ---------- 데이터 (기존 구조 유지) ---------- */
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
if(!Array.isArray(S.vm)){
const n=Date.now(),pk=nm=>S.contacts.find(c=>c.name===nm);
S.vm=[['엄마',3*HOUR,42,0],['지수',DAY+2*HOUR,18,1],['',2*DAY,9,1]].map(([nm,ago,dur,read],i)=>{const c=pk(nm);return{id:'v'+i,name:c?c.name:'',num:c?c.num:'02-555-0147',ts:n-ago,dur,read:!!read}});
}
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
const nameOf=(name,num)=>name||byNum(num)?.name||fmtNum(num);
const avHtml=c=>c?`<span class="av">${c.photo?`<img src="${esc(c.photo)}" alt="">`:esc(c.name.charAt(0))}</span>`:`<span class="av">${PERSON}</span>`;
const p2=n=>String(n).padStart(2,'0');
const WD='일월화수목금토';
function tstr(d){const h=d.getHours();return(h<12?'오전 ':'오후 ')+((h%12)||12)+':'+p2(d.getMinutes())}
function fmtTime(ts){
const d=new Date(ts),n=new Date();
if(d.toDateString()===n.toDateString())return tstr(d);
if(d.toDateString()===new Date(n-DAY).toDateString())return'어제';
if(n-d<6*DAY)return WD[d.getDay()]+'요일';
return d.getFullYear()+'. '+(d.getMonth()+1)+'. '+d.getDate()+'.';
}
const fmtFull=ts=>{const d=new Date(ts);return d.getFullYear()+'. '+(d.getMonth()+1)+'. '+d.getDate()+'. '+tstr(d)};
const fmtDur=s=>{s=Math.round(s);const m=Math.floor(s/60);return m?m+'분 '+(s%60)+'초':s+'초'};
const mmss=s=>p2(Math.floor(s/60))+':'+p2(Math.floor(s%60));
const TYPE={out:'발신 전화',in:'수신 전화',miss:'부재중 전화'};
const CHO=['ㄱ','ㄱ','ㄴ','ㄷ','ㄷ','ㄹ','ㅁ','ㅂ','ㅂ','ㅅ','ㅅ','ㅇ','ㅈ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
function initial(n){const c=n.charCodeAt(0);if(c>=0xAC00&&c<=0xD7A3)return CHO[Math.floor((c-0xAC00)/588)];return/[a-z]/i.test(n.charAt(0))?n.charAt(0).toUpperCase():'#'}
const isKo=s=>/[ㄱ-힣]/.test(s.charAt(0));
const sortC=(a,b)=>(isKo(b.name)-isKo(a.name))||a.name.localeCompare(b.name,'ko');

/* ---------- 상태 표시줄 ---------- */
function clock(){const d=new Date();$('#sbt').textContent=(d.getHours()%12||12)+':'+p2(d.getMinutes())}
clock();setInterval(clock,10000);

/* ---------- 화면 전환 ---------- */
const VIEWS=['Main','Log','Con','Edit','Call','In'];
let stack=[],cur='Main',tab='log',fil='all',editing=false,num='',selLog=null,selCon=null,editId=null,openVm=null;
function show(v,push){
if(push)stack.push(cur);
VIEWS.forEach(x=>$('#v'+x).hidden=x!==v);cur=v;
$('#sbar').classList.toggle('dk',v==='Call'||v==='In');
}
function back(){const v=stack.pop()||'Main';show(v);refreshAll()}
function refreshAll(){renderTab();renderLogDet();renderConDet()}

/* ---------- 탭 / 상단 바 ---------- */
$('#tabs').addEventListener('click',e=>{const b=e.target.closest('[data-tab]');if(!b)return;tab=b.dataset.tab;editing=false;stopVm();renderTab()});
function renderBar(){
const b=$('#mainBar');b.hidden=tab==='pad';let h='';
const ed=`<button class="tb ${tab==='fav'?'r':'l'}" data-act="toggedit">${editing?'완료':'편집'}</button>`;
if(tab==='fav')h=`<button class="tb l pl" data-act="addfav" aria-label="추가">+</button><h1>즐겨찾기</h1>${ed}`;
else if(tab==='log')h=`${ed}<div class="seg"><button data-fil="all" class="${fil==='all'?'on':''}">전체</button><button data-fil="miss" class="${fil==='miss'?'on':''}">부재중</button></div>${editing?'<button class="tb r" data-act="clrlog">지우기</button>':''}`;
else if(tab==='con')h=`<h1>연락처</h1><button class="tb r pl" data-act="newcon" aria-label="추가">+</button>`;
else if(tab==='vm')h='<h1>음성 사서함</h1>';
b.innerHTML=h;
}
function renderTab(){
document.querySelectorAll('#tabs button').forEach(b=>b.classList.toggle('on',b.dataset.tab===tab));
['Fav','Log','Con','Pad','Vm'].forEach(k=>$('#pg'+k).hidden=k.toLowerCase()!==tab);
renderBar();
if(tab==='fav')renderFav();else if(tab==='log')renderLog();else if(tab==='con')renderCon();else if(tab==='pad')renderPad();else renderVm();
if(tab==='log'&&S.logs.some(l=>l.type==='miss'&&l.seen===false)){S.logs.forEach(l=>{if(l.seen===false)l.seen=true});save()}
badge();
}
function badge(){
const n=S.logs.filter(l=>l.type==='miss'&&l.seen===false).length;
$('#bdg').hidden=!n||tab==='log';$('#bdg').textContent=n;
}

/* ---------- 최근 통화 ---------- */
function renderLog(){
const L=[...S.logs].filter(l=>fil==='all'||l.type==='miss').sort((a,b)=>b.ts-a.ts);
$('#pgLog').innerHTML=L.length?'<ul>'+L.map(l=>{
const c=byNum(l.num),miss=l.type==='miss';
return `<li class="it" data-calln="${esc(l.num)}" data-name="${esc(l.name||'')}">${editing?`<button class="minus" data-dellog="${l.id}" aria-label="삭제"></button>`:''}${avHtml(c)}<div class="bd"><div class="n1 ${miss?'miss':''}">${esc(nameOf(l.name,l.num))}</div><div class="n2">${l.type==='out'?'↗ ':''}${l.type==='in'?'↙ ':''}${miss?'↙ ':''}${esc(fmtNum(l.num))}</div></div><span class="tm">${fmtTime(l.ts)}</span><button class="info" data-infolog="${l.id}" aria-label="정보">i</button></li>`}).join('')+'</ul>':'<div class="empty">'+(fil==='miss'?'부재중 전화가 없습니다':'최근 통화가 없습니다')+'</div>';
}
/* ---------- 즐겨찾기 ---------- */
function renderFav(){
const F=S.contacts.filter(c=>c.fav).sort(sortC);
$('#pgFav').innerHTML=F.length?'<ul>'+F.map(c=>`<li class="it" data-callc="${c.id}">${editing?`<button class="minus" data-unfav="${c.id}" aria-label="삭제"></button>`:''}${avHtml(c)}<div class="bd"><div class="n1">${esc(c.name)}</div><div class="n2">휴대전화</div></div><button class="info" data-infocon="${c.id}" aria-label="정보">i</button></li>`).join('')+'</ul>':'<div class="empty">즐겨찾기가 없습니다</div>';
}
/* ---------- 연락처 ---------- */
function renderCon(){
const q=$('#cq').value.trim().toLowerCase(),dq=digits(q);
const L=S.contacts.filter(c=>!q||c.name.toLowerCase().includes(q)||(dq&&digits(c.num).includes(dq))).sort(sortC);
let h='',p='';
L.forEach(c=>{const i=initial(c.name);if(i!==p){h+=`<div class="sec">${esc(i)}</div>`;p=i}
h+=`<div class="it" data-con="${c.id}">${avHtml(c)}<div class="bd"><div class="n1" style="font-weight:500">${esc(c.name)}</div></div></div>`});
$('#conList').innerHTML=L.length?h:'<div class="empty">검색 결과 없음</div>';
}
$('#cq').addEventListener('input',renderCon);
/* ---------- 음성 사서함 ---------- */
let vp=null;
function stopVm(){if(vp){clearInterval(vp.t);vp=null}}
function player(v){
const on=vp&&vp.id===v.id,pos=on?vp.pos:0;
return `<div class="vmp"><button class="pp" data-act="vmplay" data-id="${v.id}">${on&&vp.on?'❚❚':'▶'}</button><div class="prog"><i style="width:${v.dur?pos/v.dur*100:0}%"></i></div><span class="pt">${mmss(pos)} / ${mmss(v.dur)}</span></div><div class="vact"><button data-act="vmcall" data-id="${v.id}">전화</button><button class="red" data-act="vmdel" data-id="${v.id}">삭제</button></div>`;
}
function renderVm(){
const L=[...S.vm].sort((a,b)=>b.ts-a.ts);
$('#pgVm').innerHTML=L.length?'<ul>'+L.map(v=>{
const c=byNum(v.num),op=openVm===v.id;
return `<li class="it vi${v.read?'':' unread'}" data-vm="${v.id}"><div class="bd"><div class="row1"><span class="n1">${esc(nameOf(v.name,v.num))}</span><span class="tm">${fmtTime(v.ts)}</span></div><div class="n2">${esc(fmtNum(v.num))} · ${fmtDur(v.dur)}</div>${op?player(v):''}</div></li>`}).join('')+'</ul>':'<div class="empty">음성 사서함이 비어 있습니다</div>';
}
/* ---------- 페이지 클릭 ---------- */
$('#pages').addEventListener('click',e=>{
const t=e.target;let el;
if((el=t.closest('[data-unfav]'))){byId(el.dataset.unfav).fav=false;save();renderFav();return}
if((el=t.closest('[data-dellog]'))){S.logs=S.logs.filter(x=>x.id!==el.dataset.dellog);save();renderLog();return}
if((el=t.closest('[data-infolog]'))){selLog=el.dataset.infolog;renderLogDet();show('Log',true);return}
if((el=t.closest('[data-infocon]'))){selCon=el.dataset.infocon;renderConDet();show('Con',true);return}
if(t.closest('.vmp,.vact'))return;
if((el=t.closest('[data-vm]'))){
const id=el.dataset.vm,v=S.vm.find(x=>x.id===id);
if(openVm===id){openVm=null;stopVm()}else{stopVm();openVm=id;if(v){v.read=true;save()}}
renderVm();return;
}
if((el=t.closest('[data-callc]'))){if(!editing){const c=byId(el.dataset.callc);startCall(c.num,c.name)}return}
if((el=t.closest('[data-calln]'))){if(!editing)startCall(el.dataset.calln,el.dataset.name);return}
if((el=t.closest('[data-con]'))){selCon=el.dataset.con;renderConDet();show('Con',true)}
});
/* ---------- 키패드 ---------- */
const KEYS=[['1',''],['2','ABC'],['3','DEF'],['4','GHI'],['5','JKL'],['6','MNO'],['7','PQRS'],['8','TUV'],['9','WXYZ'],['*',''],['0','+'],['#','']];
const keyHtml=KEYS.map(([k,s])=>`<button class="key" data-k="${k}"><b>${k==='*'?'✱':k}</b><small>${k==='1'?'<svg viewBox="0 0 22 10"><circle cx="5" cy="5" r="3.4"/><circle cx="17" cy="5" r="3.4"/><path d="M5 8.4h12"/></svg>':s}</small></button>`).join('');
$('#keys').innerHTML=keyHtml;$('#ckeys').innerHTML=keyHtml;
function renderPad(){
const d=fmtNum(num);
$('#dn').textContent=d;$('#dn').style.fontSize=d.length>13?'26px':'34px';
let nm='';
if(num){const ex=byNum(num);const m=ex||S.contacts.find(c=>digits(c.num).includes(digits(num)));nm=m?(ex?m.name:m.name+'  '+fmtNum(m.num)):''}
$('#dname').textContent=nm;
$('#bs').hidden=!num;$('#addc').hidden=!num||!!byNum(num);
}
let holdT=null,held=false;
$('#keys').addEventListener('pointerdown',e=>{
const b=e.target.closest('[data-k]');if(!b)return;
held=false;clearTimeout(holdT);const k=b.dataset.k;
holdT=setTimeout(()=>{held=true;
if(k==='0'){num+='+';renderPad()}
else if(/[2-9]/.test(k)&&!num){const c=byId(S.speed[k]);c?startCall(c.num,c.name):toast('단축번호가 지정되지 않았습니다')}
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
const c=byNum(l.num);
const same=S.logs.filter(x=>digits(x.num)===digits(l.num)).sort((a,b)=>b.ts-a.ts);
$('#logDet').innerHTML=`<div class="hero">${avHtml(c)}<h2>${esc(nameOf(l.name,l.num))}</h2><p>${esc(fmtNum(l.num))}</p></div>
<div class="acts"><button data-act="dcall" data-n="${esc(l.num)}">${PH_ICON}통화</button><button data-act="dmsg" data-n="${esc(l.num)}">${MSG_ICON}메시지</button>${c?'':`<button data-act="addnum" data-n="${esc(l.num)}">${ADD_ICON}연락처에 추가</button>`}</div>
${same.map(x=>`<div class="row"><span class="k" style="${x.type==='miss'?'color:var(--red)':''}">${TYPE[x.type]}</span><span style="flex:1">${fmtFull(x.ts)}</span><span style="color:var(--g);font-size:13px">${x.type==='miss'?'':fmtDur(x.dur)}</span></div>`).join('')}
<div class="row link" data-act="dellog">통화 기록 삭제</div>`;
}
function renderConDet(){
const c=byId(selCon);if(!c)return;
$('#conDet').innerHTML=`<div class="hero">${avHtml(c)}<h2>${esc(c.name)}</h2></div>
<div class="acts"><button data-act="dmsg" data-n="${esc(c.num)}">${MSG_ICON}메시지</button><button data-act="dcall" data-n="${esc(c.num)}">${PH_ICON}통화</button><button data-act="togfav">${STAR_ICON}${c.fav?'즐겨찾기 해제':'즐겨찾기'}</button></div>
<div class="card"><div class="cl">휴대전화</div><div class="cv">${esc(fmtNum(c.num))}</div></div>
<div class="card list2"><button data-act="dmsg" data-n="${esc(c.num)}">메시지 보내기</button></div>`;
}
/* ---------- 연락처 추가/편집 ---------- */
function openEdit(id,presetNum){
editId=id;const c=id?byId(id):null;
$('#edTitle').textContent=c?'연락처 편집':'새로운 연락처';
$('#edName').value=c?c.name:'';$('#edNum').value=c?c.num:(presetNum||'');
$('#edDel').hidden=!c;
show('Edit',true);
}
function saveEdit(){
const name=$('#edName').value.trim(),n=$('#edNum').value.trim();
if(!name)return toast('이름을 입력하세요');
if(!digits(n))return toast('전화번호를 입력하세요');
if(editId){const c=byId(editId);c.name=name;c.num=n}
else{const c={id:uid(),name,num:n,fav:false};S.contacts.push(c);selCon=c.id}
save();
stack.pop();
if(!editId){stack=[];renderConDet();show('Con');tab='con'}else show('Con');
renderConDet();renderTab();
}
/* ---------- 통화 ---------- */
let call=null,timer=null,startTs=0;
const CI={
mute:'<svg viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>',
kp:'<svg viewBox="0 0 24 24" class="kp"><g><circle cx="5" cy="4" r="1.7"/><circle cx="12" cy="4" r="1.7"/><circle cx="19" cy="4" r="1.7"/><circle cx="5" cy="10" r="1.7"/><circle cx="12" cy="10" r="1.7"/><circle cx="19" cy="10" r="1.7"/><circle cx="5" cy="16" r="1.7"/><circle cx="12" cy="16" r="1.7"/><circle cx="19" cy="16" r="1.7"/><circle cx="12" cy="22" r="1.7"/></g></svg>',
spk:'<svg viewBox="0 0 24 24"><path d="M3 9h4l5-5v16l-5-5H3zM15.500 8.500a5 5 0 0 1 0 7M18 6a8.500 8.500 0 0 1 0 12"/></svg>',
add:'<svg viewBox="0 0 24 24"><path d="M12 4v16M4 12h16"/></svg>',
ft:'<svg viewBox="0 0 24 24"><rect x="2" y="6" width="14" height="12" rx="2"/><path d="M16 10l6-3v10l-6-3"/></svg>',
con:'<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.400 3.600-7 8-7s8 2.600 8 7"/></svg>'
};
function startCall(n,name,video,dir){
n=String(n).trim();if(!digits(n))return toast('번호를 입력하세요');
if(call)return;
const c=byNum(n);
call={num:n,name:name||(c&&c.name)||'',dir:dir||'out',mute:false,spk:false,kp:false,ft:false};
$('#cName').textContent=call.name||fmtNum(n);
$('#cSub').textContent=call.name?'휴대전화 '+fmtNum(n):'휴대전화';
$('#cAv').innerHTML=c&&c.photo?`<img src="${esc(c.photo)}" alt="">`:(c?esc(c.name.charAt(0)):PERSON);
$('#ckp').hidden=true;$('#cGrid').hidden=false;$('#cdn').textContent='';
renderCallBtns();show('Call',true);
clearInterval(timer);startTs=0;
if(call.dir==='in'){startTs=Date.now();timer=setInterval(tick,500);tick()}
else{$('#cTime').textContent='발신 중...';setTimeout(()=>{if(!call||startTs)return;startTs=Date.now();timer=setInterval(tick,500);tick()},1500)}
}
function tick(){
if(!call||!startTs)return;
const s=Math.floor((Date.now()-startTs)/1000);
$('#cTime').textContent=p2(Math.floor(s/60))+':'+p2(s%60);
}
function renderCallBtns(){
const MORE='<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>';
const END='<svg viewBox="0 0 24 24" class="f" style="transform:rotate(135deg)"><use href="#ph"/></svg>';
const B=[['spk','스피커',CI.spk],['ft','FaceTime',CI.ft],['mute','소리 끔',CI.mute],['more','더 보기',MORE],null,['kp','키패드',CI.kp]];
$('#cGrid').innerHTML=B.map(x=>x?`<button class="cb${call[x[0]]?' on':''}" data-cb="${x[0]}"><i>${x[2]}</i><span>${x[1]}</span></button>`:`<button class="cb endc" data-act="end" aria-label="통화 종료"><i>${END}</i><span>종료</span></button>`).join('');
}
$('#cGrid').addEventListener('click',e=>{
const b=e.target.closest('[data-cb]');if(!b||!call)return;const k=b.dataset.cb;
if(k==='kp'){$('#cGrid').hidden=true;$('#ckp').hidden=false;return}
if(k==='add'||k==='ft'||k==='more'){toast('시뮬레이션에서는 사용할 수 없습니다');return}
if(k==='con'){toast('연락처는 통화 후에 확인할 수 있습니다');return}
call[k]=!call[k];renderCallBtns();
});
$('#ckeys').addEventListener('click',e=>{const b=e.target.closest('[data-k]');if(b&&$('#cdn').textContent.length<20)$('#cdn').textContent+=b.dataset.k});
function endCall(){
if(!call)return;
const dur=startTs?Math.round((Date.now()-startTs)/1000):0;
clearInterval(timer);
const c=byNum(call.num);
S.logs.push({id:uid(),type:call.dir==='in'?'in':'out',name:call.name||(c&&c.name)||'',num:call.num,ts:Date.now(),dur});
save();call=null;num='';stack=[];tab='log';editing=false;show('Main');renderTab();
}
/* ---------- 수신 (게임 내 시뮬레이션) ---------- */
let inc=null;
function incoming(n,name){
if(call||inc)return;
const c=byNum(n);
inc={num:n,name:name||(c&&c.name)||''};
$('#iName').textContent=inc.name||fmtNum(n);
$('#iSub').textContent='휴대전화';
$('#iNum').textContent=inc.name?fmtNum(n):'';
$('#iAv').innerHTML=c&&c.photo?`<img src="${esc(c.photo)}" alt="">`:(c?esc(c.name.charAt(0)):PERSON);
stack=[];show('In');
inc.t=setTimeout(()=>closeInc(true),30000);
}
function closeInc(missed){
if(!inc)return;
clearTimeout(inc.t);
if(missed){S.logs.push({id:uid(),type:'miss',name:inc.name,num:inc.num,ts:Date.now(),dur:0,seen:false});save()}
const keep=inc;inc=null;stack=[];tab='log';show('Main');renderTab();
return keep;
}
window.simulateIncoming=incoming;
/* ---------- 공통 ---------- */
let pickCb=null;
function pickContact(title,list,cb){
pickCb=cb;$('#shTitle').textContent=title;
$('#shList').innerHTML=list.sort(sortC).map(c=>`<li class="it" data-pk="${c.id}">${avHtml(c)}<div class="bd"><div class="n1" style="font-weight:500">${esc(c.name)}</div></div></li>`).join('')||'<div class="empty" style="font-size:16px">연락처가 없습니다</div>';
$('#sheet').hidden=false;
}
$('#shList').addEventListener('click',e=>{const li=e.target.closest('[data-pk]');if(!li)return;$('#sheet').hidden=true;const f=pickCb;pickCb=null;f&&f(li.dataset.pk)});
let dlgCb=null;
function ask(msg,ok,cb){$('#dlgMsg').textContent=msg;$('#dlgOk').textContent=ok;dlgCb=cb;$('#dlg').hidden=false}
$('#dlgOk').addEventListener('click',()=>{$('#dlg').hidden=true;const f=dlgCb;dlgCb=null;f&&f()});
$('#dlgNo').addEventListener('click',()=>{$('#dlg').hidden=true;dlgCb=null});
let toastT=null;
function toast(m){const t=$('#toast');t.textContent=m;t.hidden=false;clearTimeout(toastT);toastT=setTimeout(()=>t.hidden=true,1700)}
const msgUrl=(n,nm)=>MSG_URL+'?to='+encodeURIComponent(n)+'&name='+encodeURIComponent(nm||byNum(n)?.name||'');

/* ---------- 버튼 동작 ---------- */
const A={
back,
toggedit:()=>{editing=!editing;renderTab()},
addfav:()=>pickContact('즐겨찾기에 추가',S.contacts.filter(c=>!c.fav),id=>{byId(id).fav=true;save();renderFav()}),
clrlog:()=>{if(!S.logs.length)return toast('삭제할 기록이 없습니다');ask('최근 통화를 모두 삭제할까요?','삭제',()=>{S.logs=[];save();editing=false;renderTab()})},
newcon:()=>openEdit(null),
dial:()=>{
if(!num){const l=[...S.logs].filter(x=>x.type==='out').sort((a,b)=>b.ts-a.ts)[0];if(l){num=l.num;renderPad();return}return toast('번호를 입력하세요')}
startCall(num);
},
addnum:el=>openEdit(null,el&&el.dataset&&el.dataset.n?el.dataset.n:num),
dcall:el=>startCall(el.dataset.n),
dmsg:el=>{location.href=msgUrl(el.dataset.n)},
dellog:()=>ask('이 통화 기록을 삭제할까요?','삭제',()=>{
const l=S.logs.find(x=>x.id===selLog);
S.logs=S.logs.filter(x=>!l||digits(x.num)!==digits(l.num));
save();back();
}),
editcon:()=>openEdit(selCon),
togfav:()=>{const c=byId(selCon);c.fav=!c.fav;save();renderConDet()},
delcon:()=>ask('이 연락처를 삭제할까요?','삭제',()=>{
S.contacts=S.contacts.filter(c=>c.id!==selCon);
Object.keys(S.speed).forEach(k=>{if(S.speed[k]===selCon)delete S.speed[k]});
save();stack=[];tab='con';show('Main');renderTab();
}),
edcancel:()=>back(),
edsave:saveEdit,
end:endCall,
hidekp:()=>{$('#ckp').hidden=true;$('#cGrid').hidden=false},
shclose:()=>{$('#sheet').hidden=true;pickCb=null},
vmplay:el=>{
const v=S.vm.find(x=>x.id===el.dataset.id);if(!v)return;
if(vp&&vp.id===v.id){vp.on=!vp.on;renderVm();return}
stopVm();vp={id:v.id,pos:0,on:true};
vp.t=setInterval(()=>{if(!vp||!vp.on)return;vp.pos+=.25;if(vp.pos>=v.dur){vp.pos=v.dur;vp.on=false}renderVm()},250);
renderVm();
},
vmcall:el=>{const v=S.vm.find(x=>x.id===el.dataset.id);if(v)startCall(v.num,v.name)},
vmdel:el=>ask('이 음성 메시지를 삭제할까요?','삭제',()=>{S.vm=S.vm.filter(x=>x.id!==el.dataset.id);stopVm();openVm=null;save();renderVm()}),
decline:()=>closeInc(true),
later:()=>{closeInc(true);toast('나중에 알림을 받도록 설정했습니다')},
imsg:()=>{const k=closeInc(true);if(k)location.href=msgUrl(k.num,k.name)},
accept:()=>{const k=inc;if(!k)return;clearTimeout(k.t);inc=null;startCall(k.num,k.name,false,'in')}
};
A.bs=()=>{};
document.addEventListener('click',e=>{
const f=e.target.closest('[data-fil]');
if(f){fil=f.dataset.fil;renderTab();return}
const el=e.target.closest('[data-act]');
if(el){const fn=A[el.dataset.act];fn&&fn(el)}
});

/* ---------- 시작 ---------- */
renderTab();
show('Main');
const P=new URLSearchParams(location.search);
if(P.get('incoming'))incoming(P.get('incoming'),P.get('name')||'');
else if(P.get('call')==='1'&&P.get('number'))startCall(P.get('number'),P.get('name')||'');
else if(P.get('number')){tab='pad';num=P.get('number');renderTab()}
})();

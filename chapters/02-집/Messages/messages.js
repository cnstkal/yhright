(()=>{
'use strict';
const $=s=>document.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,7);
const HOUR=3600000,DAY=86400000,KEY='yhright.messages.v1';
const SMS_DEFAULT=['c3','c4'];/* 기존 데이터에 sms 표시가 없을 때 SMS(초록)로 보는 연락처 */

/* ---------- 데이터 (기존 데이터 유지) ---------- */
function seed(){
const now=Date.now();
const m=(me,text,ago)=>({id:uid(),me,text,img:'',ts:now-ago});
return{
contacts:[{id:'c1',name:'엄마',phone:'010-3960-2207'},{id:'c2',name:'형',phone:'010-2394-7716'},{id:'c3',name:'민준',phone:'010-3347-8850'},{id:'c4',name:'지수',phone:'010-7316-8842'}],
threads:[
{id:'t1',ids:['c1'],unread:2,msgs:[m(false,'저녁 뭐 먹을 거니?',5*HOUR),m(true,'아직 못 정했어요',4.5*HOUR),m(false,'그럼 같이 먹자',HOUR)]},
{id:'t2',ids:['c2'],unread:0,msgs:[m(false,'내일 시간 돼?',DAY+2*HOUR),m(true,'응 오후에 괜찮아',DAY+HOUR)]},
{id:'t3',ids:['c3'],unread:1,msgs:[m(false,'내일 회의 자료 보내줄게',3*HOUR)]}
]
};
}
let S=null;
try{S=JSON.parse(localStorage.getItem(KEY))}catch(e){}
if(!S||!Array.isArray(S.threads)||!Array.isArray(S.contacts))S=seed();
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){toast('저장 공간이 부족합니다')}}
const cById=id=>S.contacts.find(c=>c.id===id);
const names=t=>t.ids.map(id=>cById(id)?.name||'알 수 없음').join(', ');
const last=t=>t.msgs[t.msgs.length-1];
const curThread=()=>S.threads.find(t=>t.id===sel);
const isSMS=t=>typeof t.sms==='boolean'?t.sms:t.ids.some(id=>SMS_DEFAULT.includes(id));
const kind=t=>isSMS(t)?'문자 메시지':'iMessage';
const p2=n=>String(n).padStart(2,'0');
const tstr=d=>{const h=d.getHours();return(h<12?'오전 ':'오후 ')+((h%12)||12)+':'+p2(d.getMinutes())};
const WD='일월화수목금토';
function fmt(ts){
const d=new Date(ts),n=new Date();
if(d.toDateString()===n.toDateString())return tstr(d);
if(d.toDateString()===new Date(n-DAY).toDateString())return'어제';
if(n-d<6*DAY)return WD[d.getDay()]+'요일';
return d.getFullYear()+'. '+(d.getMonth()+1)+'. '+d.getDate()+'.';
}
function stamp(ts){
const d=new Date(ts),n=new Date();
let day;
if(d.toDateString()===n.toDateString())day='오늘';
else if(d.toDateString()===new Date(n-DAY).toDateString())day='어제';
else day=d.getFullYear()+'년 '+(d.getMonth()+1)+'월 '+d.getDate()+'일 ('+WD[d.getDay()]+')';
return `<b>${day}</b> ${tstr(d)}`;
}

/* ---------- 화면 전환 ---------- */
const VIEWS={list:'#vList',thread:'#vThread',compose:'#vCompose',pick:'#vPick'};
let cur='list',sel=null,q='',selectMode=false,picked=new Set();
function show(n){for(const k in VIEWS)$(VIEWS[k]).hidden=k!==n;cur=n;closeMenu()}
function openList(){sel=null;selectMode=false;picked=new Set();show('list');renderList()}

/* ---------- 대화 목록 ---------- */
function renderList(){
const items=S.threads
.filter(t=>t.msgs.length)
.filter(t=>!q||names(t).includes(q)||(last(t)?.text||'').includes(q))
.sort((a,b)=>(last(b)?.ts||0)-(last(a)?.ts||0));
$('#list').innerHTML=items.map(t=>{
const l=last(t),nm=names(t),multi=t.ids.length>1;
const pv=l?(l.text||(l.img?'사진':'')):'';
return `<li class="item${t.unread?' unread':''}" data-id="${t.id}">
${selectMode?`<input type="checkbox" class="ck" tabindex="-1" ${picked.has(t.id)?'checked':''}>`:''}
<span class="av">${multi?'그룹':esc(nm.charAt(0))}</span>
<div class="body">
<div class="row1"><span class="nm">${esc(nm)}</span><span class="tm">${l?fmt(l.ts):''}</span></div>
<div class="row2"><span class="pv">${esc(pv)}</span></div>
</div></li>`;
}).join('');
$('#empty').hidden=items.length>0;
$('#selBar').hidden=!selectMode;
$('#selTxt').textContent=picked.size?picked.size+'개 선택됨':'';
$('#editBtn').textContent=selectMode?'완료':'편집';
}
$('#list').addEventListener('click',e=>{
const li=e.target.closest('.item');if(!li)return;
if(selectMode){
const id=li.dataset.id;
picked.has(id)?picked.delete(id):picked.add(id);
renderList();
}else openThread(li.dataset.id);
});
$('#q').addEventListener('input',e=>{q=e.target.value.trim();renderList()});

/* ---------- 대화방 ---------- */
function openThread(id){
sel=id;const t=curThread();if(!t)return openList();
t.unread=0;save();
$('#tName').textContent=names(t);
$('#tIn').placeholder=kind(t);
renderMsgs(t);show('thread');updSend('t');scrollEnd();
}
function renderMsgs(t){
let h='',prevTs=0;
const sms=isSMS(t);
t.msgs.forEach((m,i)=>{
if(!prevTs||m.ts-prevTs>=HOUR||new Date(m.ts).toDateString()!==new Date(prevTs).toDateString())h+=`<div class="day">${stamp(m.ts)}</div>`;
prevTs=m.ts;
const nx=t.msgs[i+1];
const tail=!nx||nx.me!==m.me||nx.ts-m.ts>=HOUR;
h+=`<div class="mrow ${m.me?'me':'them'}${sms?' sms':''}${tail?' tail':''}" data-mid="${m.id}">
<div class="bub">${m.img?`<img src="${m.img}" alt="첨부 사진">`:''}${m.text?esc(m.text):''}</div></div>`;
});
const l=last(t);
if(l&&l.me&&!sms)h+='<div class="dlv">전달됨</div>';
$('#msgs').innerHTML=h;
}
function scrollEnd(){const e=$('#msgs');e.scrollTop=e.scrollHeight}
function sendThread(){
const text=$('#tIn').value.trim();
if(!text&&!tAtt)return;
const t=curThread();if(!t)return;
t.msgs.push({id:uid(),me:true,text,img:tAtt||'',ts:Date.now()});
$('#tIn').value='';tAtt=null;renderPend('t');autosize($('#tIn'));updSend('t');
save();renderMsgs(t);scrollEnd();
}
$('#tForm').addEventListener('submit',e=>{e.preventDefault();sendThread()});
$('#tIn').addEventListener('keydown',e=>{
if(e.key==='Enter'&&!e.shiftKey&&!e.isComposing){e.preventDefault();sendThread()}
});
$('#tIn').addEventListener('input',e=>{autosize(e.target);updSend('t')});
function updSend(k){
const v=(k==='t'?$('#tIn'):$('#cIn')).value.trim(),a=k==='t'?tAtt:cAtt;
(k==='t'?$('#tForm'):$('#vCompose .composer')).classList.toggle('has',!!(v||a));
}

/* 길게 눌러 메시지 삭제 */
let pressT=null;
const clearPress=()=>{clearTimeout(pressT);pressT=null};
$('#msgs').addEventListener('pointerdown',e=>{
const r=e.target.closest('.mrow');if(!r)return;
clearPress();
pressT=setTimeout(()=>{pressT=null;askDelMsg(r.dataset.mid)},600);
});
['pointerup','pointerleave','pointercancel','pointermove'].forEach(ev=>$('#msgs').addEventListener(ev,clearPress));
function askDelMsg(mid){
ask('이 메시지를 삭제할까요?','삭제',()=>{
const t=curThread();if(!t)return;
t.msgs=t.msgs.filter(m=>m.id!==mid);
if(!t.msgs.length)S.threads=S.threads.filter(x=>x.id!==t.id);
save();
if(!t.msgs.length)return openList();
renderMsgs(t);
});
}

/* ---------- 새 메시지 ---------- */
let rIds=[],cAtt=null,tAtt=null,fileTo='t';
function openCompose(){
rIds=[];cAtt=null;
$('#toIn').value='';$('#cIn').value='';autosize($('#cIn'));
renderCompose();renderSugg();show('compose');updSend('c');
}
function composeKind(){
if(!rIds.length)return'iMessage';
const t=findThread(rIds);
return t?kind(t):(rIds.some(id=>SMS_DEFAULT.includes(id))?'문자 메시지':'iMessage');
}
function renderCompose(){
$('#recips').innerHTML=rIds.map(id=>`<span class="rchip" data-rm="${id}">${esc(cById(id)?.name)}</span>`).join('');
const k=composeKind();
$('#cIn').placeholder=k;
$('#cTitle').textContent='새로운 '+k;
renderPend('c');
}
function findThread(ids){
const a=[...ids].sort();
return S.threads.find(x=>x.ids.length===a.length&&[...x.ids].sort().join()===a.join());
}
function addRecip(id){if(!rIds.includes(id))rIds.push(id);renderCompose()}
/* 수신인 검색 */
function matches(v){
v=v.trim();if(!v)return[];
const d=v.replace(/\D/g,'');
return S.contacts.filter(c=>!rIds.includes(c.id)&&(c.name.includes(v)||(d&&(c.phone||'').replace(/\D/g,'').includes(d))));
}
function renderSugg(){
const m=matches($('#toIn').value);
$('#sugg').hidden=!m.length;
$('#sugg').innerHTML=m.map(c=>`<li class="item" data-sid="${c.id}"><span class="av">${esc(c.name.charAt(0))}</span><div class="body"><div class="row1"><span class="nm">${esc(c.name)}</span></div><div class="row2"><span class="pv">${esc(c.phone||'')}</span></div></div></li>`).join('');
}
$('#toIn').addEventListener('input',renderSugg);
$('#sugg').addEventListener('click',e=>{
const li=e.target.closest('[data-sid]');if(!li)return;
addRecip(li.dataset.sid);$('#toIn').value='';renderSugg();
});
$('#toIn').addEventListener('keydown',e=>{
if(e.key==='Backspace'&&!$('#toIn').value&&rIds.length){rIds.pop();renderCompose();return}
if(e.key!=='Enter'||e.isComposing)return;
e.preventDefault();
const v=$('#toIn').value.trim();if(!v)return;
const c=S.contacts.find(x=>x.name===v)||matches(v)[0];
if(!c){toast('연락처를 찾을 수 없습니다');return}
addRecip(c.id);$('#toIn').value='';renderSugg();
});
$('#recips').addEventListener('click',e=>{
const c=e.target.closest('[data-rm]');if(!c)return;
rIds=rIds.filter(x=>x!==c.dataset.rm);renderCompose();
});
$('#cIn').addEventListener('input',e=>{autosize(e.target);updSend('c')});
$('#cIn').addEventListener('keydown',e=>{
if(e.key==='Enter'&&!e.shiftKey&&!e.isComposing){e.preventDefault();sendCompose()}
});
function sendCompose(){
if(!rIds.length)return toast('받는 사람을 선택하세요');
const text=$('#cIn').value.trim();
if(!text&&!cAtt)return;
const ids=[...rIds].sort();
let t=findThread(ids);
if(!t){t={id:uid(),ids,unread:0,sms:composeKind()==='문자 메시지',msgs:[]};S.threads.push(t)}
t.msgs.push({id:uid(),me:true,text,img:cAtt||'',ts:Date.now()});
save();openThread(t.id);
}

/* 연락처 선택: 누르면 바로 추가 */
function openPick(){
$('#pickList').innerHTML=S.contacts.map(c=>`<li class="item" data-cid="${c.id}"><span class="av">${esc(c.name.charAt(0))}</span><div class="body"><div class="row1"><span class="nm">${esc(c.name)}</span></div><div class="row2"><span class="pv">${esc(c.phone||'')}</span></div></div></li>`).join('');
show('pick');
}
$('#pickList').addEventListener('click',e=>{
const li=e.target.closest('[data-cid]');if(!li)return;
addRecip(li.dataset.cid);show('compose');renderSugg();
});

/* ---------- 사진 첨부 ---------- */
function attach(k){fileTo=k;$('#fileIn').click()}
$('#fileIn').addEventListener('change',e=>{
const f=e.target.files[0];e.target.value='';if(!f)return;
readImg(f,d=>{
if(fileTo==='t'){tAtt=d;renderPend('t');updSend('t')}else{cAtt=d;renderPend('c');updSend('c')}
});
});
function readImg(file,cb){
const r=new FileReader();
r.onload=()=>{
const im=new Image();
im.onload=()=>{
const s=Math.min(1,640/Math.max(im.width,im.height));
const c=document.createElement('canvas');
c.width=Math.round(im.width*s);c.height=Math.round(im.height*s);
c.getContext('2d').drawImage(im,0,0,c.width,c.height);
cb(c.toDataURL('image/jpeg',.8));
};
im.src=r.result;
};
r.readAsDataURL(file);
}
function renderPend(k){
const d=k==='t'?tAtt:cAtt;
$(k==='t'?'#tPend':'#cPend').innerHTML=d?`<div class="pimg"><img src="${d}" alt="첨부 미리보기"><button data-unatt="${k}" aria-label="첨부 취소">✕</button></div>`:'';
}
$('#tPend').addEventListener('click',e=>{const b=e.target.closest('[data-unatt]');if(b){tAtt=null;renderPend('t');updSend('t')}});
$('#cPend').addEventListener('click',e=>{const b=e.target.closest('[data-unatt]');if(b){cAtt=null;renderPend('c');updSend('c')}});

/* ---------- 세부사항 메뉴 / 대화상자 / 토스트 ---------- */
function openMenu(){
const t=curThread();if(!t)return;
const c=cById(t.ids[0]);
$('#pop').innerHTML=`<div class="info">${esc(names(t))}${t.ids.length===1&&c?.phone?'<br>'+esc(c.phone):''}<br>${kind(t)}</div><button data-m="call">전화 걸기</button><button data-m="tdel">대화 삭제</button>`;
$('#pop').hidden=false;
}
function closeMenu(){$('#pop').hidden=true}
$('#pop').addEventListener('click',e=>{
const b=e.target.closest('[data-m]');if(!b)return;
const k=b.dataset.m;closeMenu();
if(k==='call')A.call();
else if(k==='tdel'){
ask('이 대화를 삭제할까요?','삭제',()=>{
S.threads=S.threads.filter(t=>t.id!==sel);save();openList();
});
}
});
let dlgCb=null;
function ask(msg,ok,cb){$('#dlgMsg').textContent=msg;$('#dlgOk').textContent=ok;dlgCb=cb;$('#dlg').hidden=false}
$('#dlgOk').addEventListener('click',()=>{$('#dlg').hidden=true;const f=dlgCb;dlgCb=null;f&&f()});
$('#dlgNo').addEventListener('click',()=>{$('#dlg').hidden=true;dlgCb=null});
let toastT=null;
function toast(m){const el=$('#toast');el.textContent=m;el.hidden=false;clearTimeout(toastT);toastT=setTimeout(()=>el.hidden=true,1600)}
function autosize(el){el.style.height='auto';el.style.height=Math.min(120,el.scrollHeight)+'px'}

/* ---------- 버튼 동작 ---------- */
const A={
compose:()=>openCompose(),
edit:()=>{selectMode=!selectMode;picked=new Set();renderList()},
more:()=>{if(!$('#pop').hidden)return closeMenu();openMenu()},
back:()=>openList(),
call:()=>{const t=curThread();if(!t)return;const c=cById(t.ids[0]);const number=c?.phone||'';location.href='../Phone/phone.html?number='+encodeURIComponent(number)+'&name='+encodeURIComponent(c?.name||names(t))+'&call=1'},
attach:()=>attach('t'),
cattach:()=>attach('c'),
csend:()=>sendCompose(),
cback:()=>openList(),
pick:()=>openPick(),
pickback:()=>show('compose'),
delsel:()=>{
if(!picked.size)return toast('대화를 선택하세요');
ask(`선택한 대화 ${picked.size}개를 삭제할까요?`,'삭제',()=>{
S.threads=S.threads.filter(t=>!picked.has(t.id));
save();selectMode=false;picked=new Set();renderList();
});
}
};
document.addEventListener('click',e=>{
const el=e.target.closest('[data-act]');
if(el){const f=A[el.dataset.act];f&&f();return}
if(!e.target.closest('#pop'))closeMenu();
});

/* ---------- 키보드 대응 ---------- */
const vv=window.visualViewport;
function fitVV(){
const root=document.documentElement.style;
root.setProperty('--vvh',(vv?vv.height:innerHeight)+'px');
if(cur==='thread')scrollEnd();
}
if(vv){vv.addEventListener('resize',fitVV)}
window.addEventListener('resize',fitVV);
document.addEventListener('focusin',e=>{if(e.target.matches('textarea,input'))setTimeout(()=>{e.target.scrollIntoView({block:'nearest'});fitVV()},300)});

/* ---------- 시작 ---------- */
save();
renderList();
show('list');
fitVV();
const params=new URLSearchParams(location.search);
const incoming=params.get('to');
if(incoming){
let c=S.contacts.find(x=>(x.phone||'').replace(/\D/g,'')===incoming.replace(/\D/g,''));
if(!c){c={id:uid(),name:params.get('name')||incoming,phone:incoming};S.contacts.push(c);save()}
openCompose();addRecip(c.id);
}
})();

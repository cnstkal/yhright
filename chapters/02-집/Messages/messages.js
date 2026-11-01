(()=>{
'use strict';
const $=s=>document.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,7);
const HOUR=3600000,DAY=86400000,KEY='yhright.messages.v1';
const COLORS=['#7fbfd4','#8ccbc5','#9fb4c0','#9bb7d4','#a9c8a0','#b9a9d4'];
const PERSON='<svg viewBox="0 0 24 24"><circle cx="12" cy="8.5" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7z"/></svg>';
const DOC='<svg viewBox="0 0 24 24"><path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4"/></svg>';

/* ---------- 데이터 ---------- */
function seed(){
  const now=Date.now();
  const m=(me,text,ago,x)=>Object.assign({id:uid(),me,text,img:'',ts:now-ago},x||{});
  const T=(id,ids,unread,msgs)=>({id,ids,unread,msgs:msgs.sort((a,b)=>a.ts-b.ts)});
  const photo=(a,b)=>'data:image/svg+xml;utf8,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="320" height="240"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+a+'"/><stop offset="1" stop-color="'+b+'"/></linearGradient></defs><rect width="320" height="240" fill="url(#g)"/><circle cx="230" cy="80" r="28" fill="#fff6c8"/><path d="M0 240V170l70-50 60 50 50-40 140 60v50z" fill="#3b5d4a"/></svg>');
  return{
    contacts:[{id:'c1',name:'엄마',phone:'010-3960-2207'},{id:'c2',name:'형',phone:'010-2394-7716'},{id:'c3',name:'민준',phone:'010-3347-8850'},{id:'c4',name:'지수',phone:'010-7316-8842'},{id:'c5',name:'김팀장',phone:'010-8124-5530'},{id:'c6',name:'1588-4321',phone:'1588-4321',tmp:true}],
    blocked:[],
    threads:[
      T('t1',['c1'],2,[m(true,'엄마, 이번 주말에 집에 갈게요',3*DAY+2*HOUR),m(false,'그래 아들, 밥 해놓을게. 운전 조심하고',3*DAY+HOUR),m(false,'저녁 뭐 먹을 거니?',5*HOUR),m(true,'아직 못 정했어요',4.5*HOUR),m(false,'그럼 같이 먹자',HOUR)]),
      T('t2',['c2'],0,[m(false,'요즘 회사 어때? 바쁘냐?',2*DAY+3*HOUR),m(true,'야근 많아서 정신없어 ㅠㅠ',2*DAY+2*HOUR),m(false,'내일 시간 돼?',DAY+2*HOUR),m(true,'응 오후에 괜찮아',DAY+HOUR),m(false,'그럼 3시에 집 앞에서 보자',DAY)]),
      T('t3',['c3'],1,[m(false,'이번 금요일 약속 잊지 마라',2*DAY),m(true,'안 잊었어 ㅋㅋ 7시 맞지?',2*DAY-HOUR),m(false,'응 7시 고깃집에서 보자',2*DAY-2*HOUR),m(false,'내일 회의 자료 보내줄게',3*HOUR)]),
      T('t4',['c4'],0,[m(false,'지난주에 찍은 사진이야',2*DAY+3*HOUR),m(false,'',2*DAY+3*HOUR-60000,{img:photo('#9ed0f0','#e8f4ff')}),m(true,'와 예쁘다! 어디야?',2*DAY+2*HOUR),m(false,'뒷산 공원이야. 다음엔 같이 가자',2*DAY+HOUR)]),
      T('t5',['c5'],0,[m(false,'내일 오전 회의는 10시에 시작합니다.',DAY+4*HOUR),m(true,'네, 확인했습니다.',DAY+3*HOUR),m(false,'회의록 파일 보내드립니다.',6*HOUR),m(false,'',6*HOUR-60000,{file:{name:'회의록_1101.pdf',size:482133}})]),
      T('t6',['c6'],1,[m(false,'[Web발신]\n(광고) 가을맞이 최대 50% 할인! 무료수신거부 080-123-4567',8*HOUR)])
    ]
  };
}
let S=null;
try{S=JSON.parse(localStorage.getItem(KEY))}catch(e){}
if(!S||!Array.isArray(S.threads)||!Array.isArray(S.contacts))S=seed();
if(!Array.isArray(S.blocked))S.blocked=[];
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){toast('저장 공간이 부족합니다')}}

const cById=id=>S.contacts.find(c=>c.id===id);
const color=id=>COLORS[Math.max(0,S.contacts.findIndex(c=>c.id===id))%COLORS.length];
const names=t=>t.ids.map(id=>cById(id)?.name||'알 수 없음').join(', ');
const last=t=>t.msgs[t.msgs.length-1];
const curThread=()=>S.threads.find(t=>t.id===sel);
const digits=s=>String(s||'').replace(/\D/g,'');
const isBlocked=t=>t.ids.some(id=>{const p=digits(cById(id)?.phone);return p&&S.blocked.some(b=>digits(b.phone)===p)});
const fmtSize=n=>n<1024?n+'B':n<1048576?Math.round(n/1024)+'KB':(n/1048576).toFixed(1)+'MB';
const prevText=m=>m?(m.text||(m.img?'사진':m.file?'파일':'')):'';

function fmt(ts){
  const d=new Date(ts),n=new Date(),h=d.getHours(),mi=String(d.getMinutes()).padStart(2,'0');
  if(d.toDateString()===n.toDateString())return(h<12?'오전 ':'오후 ')+((h%12)||12)+':'+mi;
  if(d.toDateString()===new Date(n-DAY).toDateString())return'어제';
  return(d.getMonth()+1)+'/'+d.getDate();
}
function dayLabel(ts){
  const d=new Date(ts);
  return d.getFullYear()+'년 '+(d.getMonth()+1)+'월 '+d.getDate()+'일 ('+'일월화수목금토'[d.getDay()]+')';
}

/* ---------- 화면 전환 ---------- */
const VIEWS={list:'#vList',thread:'#vThread',compose:'#vCompose',pick:'#vPick',spam:'#vSpam'};
let cur='list',sel=null,q='',tq='',selectMode=false,picked=new Set();
function show(n){for(const k in VIEWS)$(VIEWS[k]).hidden=k!==n;cur=n;closeMenu()}
function openList(){sel=null;selectMode=false;picked=new Set();show('list');renderList()}

/* ---------- 대화 목록 ---------- */
function renderList(){
  const items=S.threads
    .filter(t=>t.msgs.length&&!isBlocked(t))
    .filter(t=>!q||names(t).includes(q)||t.msgs.some(m=>(m.text||'').includes(q)))
    .sort((a,b)=>(last(b)?.ts||0)-(last(a)?.ts||0));
  $('#list').innerHTML=items.map(t=>{
    const l=last(t),nm=names(t),multi=t.ids.length>1;
    const bg=multi?'#9e9e9e':color(t.ids[0]);
    const pv=prevText(l);
    return `<li class="item${t.unread?' unread':''}" data-id="${t.id}">
      ${selectMode?`<input type="checkbox" class="ck" tabindex="-1" ${picked.has(t.id)?'checked':''}>`:''}
      <span class="av" style="background:${bg}">${PERSON}</span>
      <div class="body">
        <div class="row1"><span class="nm">${esc(nm)}</span><span class="tm">${l?fmt(l.ts):''}</span></div>
        <div class="row2"><span class="pv">${esc(pv)}</span>${t.unread?`<span class="badge">${t.unread}</span>`:''}</div>
      </div></li>`;
  }).join('');
  $('#empty').hidden=items.length>0;
  $('#selBar').hidden=!selectMode;
  $('#selCount').textContent=picked.size;
}
let lpT=null,lp=false;
$('#list').addEventListener('pointerdown',e=>{
  const li=e.target.closest('.item');if(!li||selectMode)return;
  lpT=setTimeout(()=>{lp=true;selectMode=true;picked=new Set([li.dataset.id]);renderList()},600);
});
['pointerup','pointerleave','pointercancel','pointermove'].forEach(ev=>$('#list').addEventListener(ev,()=>clearTimeout(lpT)));
$('#list').addEventListener('click',e=>{
  if(lp){lp=false;return}
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
  $('#tSub').textContent=t.ids.length===1?(cById(t.ids[0])?.phone||''):'';
  tq='';$('#tq').value='';$('#tSearch').hidden=true;
  renderMsgs(t);show('thread');scrollEnd();
}
function renderMsgs(t){
  let h='',prev='';
  const ex=esc(tq);
  const hl=s=>ex?s.split(ex).join('<mark>'+ex+'</mark>'):s;
  const multi=t.ids.length>1;
  t.msgs.filter(m=>!tq||(m.text||'').includes(tq)).forEach(m=>{
    const day=dayLabel(m.ts);
    if(day!==prev){h+=`<div class="day"><span>${day}</span></div>`;prev=day}
    const bg=multi?'#9e9e9e':color(t.ids[0]);
    const f=m.file?`<div class="fcard"><span class="fic">${DOC}</span><span class="fi"><b>${esc(m.file.name)}</b><small>${fmtSize(m.file.size)}</small></span></div>`:'';
    h+=`<div class="mrow ${m.me?'me':'them'}" data-mid="${m.id}">
      ${m.me?'':`<span class="av mav" style="background:${bg}">${PERSON}</span>`}
      <div class="mc"><div class="bub">${m.img?`<img src="${m.img}" alt="첨부 사진">`:''}${f}${m.text?`<span class="txt">${hl(esc(m.text))}</span>`:''}</div>
      <span class="mt">${fmt(m.ts)}</span></div></div>`;
  });
  if(!h&&tq)h='<p class="empty">검색 결과가 없습니다.</p>';
  $('#msgs').innerHTML=h;
}
function scrollEnd(){const e=$('#msgs');e.scrollTop=e.scrollHeight}
function sendThread(){
  const text=$('#tIn').value.trim();
  if(!text&&!tAtt)return;
  const t=curThread();if(!t)return;
  t.msgs.push({id:uid(),me:true,text,img:tAtt?.img||'',file:tAtt?.file||null,ts:Date.now()});
  $('#tIn').value='';tAtt=null;renderPend('t');autosize($('#tIn'));
  save();renderMsgs(t);scrollEnd();
}
$('#tForm').addEventListener('submit',e=>{e.preventDefault();sendThread()});
$('#tIn').addEventListener('keydown',e=>{
  if(e.key==='Enter'&&!e.shiftKey&&!e.isComposing){e.preventDefault();sendThread()}
});
$('#tIn').addEventListener('input',e=>autosize(e.target));
$('#tq').addEventListener('input',e=>{tq=e.target.value.trim();const t=curThread();if(t)renderMsgs(t)});

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
let rIds=[],cAtt=null,tAtt=null,fileTo='t',pickSet=new Set();
function openCompose(){
  rIds=[];cAtt=null;
  $('#toIn').value='';$('#cIn').value='';$('#cCount').textContent='0/70';autosize($('#cIn'));$('#sugg').hidden=true;
  renderCompose();show('compose');
}
function renderCompose(){
  $('#recips').innerHTML=rIds.map(id=>`<span class="rchip" data-rm="${id}">${esc(cById(id)?.name)} ✕</span>`).join('');
  renderPend('c');
}
function addRecip(id){if(!rIds.includes(id))rIds.push(id);renderCompose()}
function commitTo(){
  const v=$('#toIn').value.trim();if(!v)return true;
  let c=S.contacts.find(x=>x.name===v)||S.contacts.find(x=>x.name.startsWith(v)&&!x.tmp)||S.contacts.find(x=>digits(x.phone)&&digits(x.phone)===digits(v));
  if(!c&&/^[\d\-+ ]{3,}$/.test(v)){c={id:uid(),name:v,phone:v,tmp:true};S.contacts.push(c)}
  if(!c){toast('연락처를 찾을 수 없습니다');return false}
  addRecip(c.id);$('#toIn').value='';$('#sugg').hidden=true;return true;
}
$('#toIn').addEventListener('keydown',e=>{
  if(e.key!=='Enter'||e.isComposing)return;
  e.preventDefault();commitTo();
});
$('#toIn').addEventListener('input',e=>{
  const v=e.target.value.trim(),sg=$('#sugg');
  const r=v?S.contacts.filter(c=>!c.tmp&&!rIds.includes(c.id)&&(c.name.includes(v)||digits(c.phone).includes(digits(v))&&digits(v))):[];
  sg.innerHTML=r.map(c=>`<li data-sid="${c.id}"><span class="av" style="background:${color(c.id)}">${PERSON}</span><div><div>${esc(c.name)}</div><small>${esc(c.phone)}</small></div></li>`).join('');
  sg.hidden=!r.length;
});
$('#sugg').addEventListener('click',e=>{
  const li=e.target.closest('[data-sid]');if(!li)return;
  addRecip(li.dataset.sid);$('#toIn').value='';$('#sugg').hidden=true;
});
$('#recips').addEventListener('click',e=>{
  const c=e.target.closest('[data-rm]');if(!c)return;
  rIds=rIds.filter(x=>x!==c.dataset.rm);renderCompose();
});
$('#cIn').addEventListener('input',e=>{
  autosize(e.target);
  $('#cCount').textContent=e.target.value.length+'/70';
});
function sendCompose(){
  if(!commitTo())return;
  if(!rIds.length)return toast('받는 사람을 선택하세요');
  const text=$('#cIn').value.trim();
  if(!text&&!cAtt)return;
  const ids=[...rIds].sort();
  let t=S.threads.find(x=>x.ids.length===ids.length&&[...x.ids].sort().join()===ids.join());
  if(!t){t={id:uid(),ids,unread:0,msgs:[]};S.threads.push(t)}
  t.msgs.push({id:uid(),me:true,text,img:cAtt?.img||'',file:cAtt?.file||null,ts:Date.now()});
  save();openThread(t.id);
}

/* 연락처 선택 */
function openPick(){pickSet=new Set(rIds);renderPick();show('pick')}
function renderPick(){
  $('#pickList').innerHTML=S.contacts.filter(c=>!c.tmp).sort((a,b)=>a.name.localeCompare(b.name,'ko')).map(c=>`<li class="item" data-cid="${c.id}">
    <span class="av" style="background:${color(c.id)}">${PERSON}</span>
    <div class="body"><div class="row1"><span class="nm">${esc(c.name)}</span></div></div>
    <input type="checkbox" class="ck" tabindex="-1" ${pickSet.has(c.id)?'checked':''}></li>`).join('');
}
$('#pickList').addEventListener('click',e=>{
  const li=e.target.closest('[data-cid]');if(!li)return;
  const id=li.dataset.cid;
  pickSet.has(id)?pickSet.delete(id):pickSet.add(id);
  renderPick();
});

/* ---------- 사진 첨부 ---------- */
function attach(k){fileTo=k;openMenu('attach')}
$('#fileIn').addEventListener('change',e=>{
  const f=e.target.files[0];e.target.value='';if(!f)return;
  readImg(f,d=>{
    if(fileTo==='t'){tAtt={img:d};renderPend('t')}else{cAtt={img:d};renderPend('c')}
  });
});
$('#docIn').addEventListener('change',e=>{
  const f=e.target.files[0];e.target.value='';if(!f)return;
  const a={file:{name:f.name,size:f.size}};
  if(fileTo==='t'){tAtt=a;renderPend('t')}else{cAtt=a;renderPend('c')}
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
  $(k==='t'?'#tPend':'#cPend').innerHTML=!d?'':d.img
    ?`<div class="pimg"><img src="${d.img}" alt="첨부 미리보기"><button data-unatt="${k}" aria-label="첨부 취소">✕</button></div>`
    :`<div class="pfile"><span class="fic">${DOC}</span><span class="n">${esc(d.file.name)} (${fmtSize(d.file.size)})</span><button data-unatt="${k}" aria-label="첨부 취소">✕</button></div>`;
}
$('#tPend').addEventListener('click',e=>{const b=e.target.closest('[data-unatt]');if(b){tAtt=null;renderPend('t')}});
$('#cPend').addEventListener('click',e=>{const b=e.target.closest('[data-unatt]');if(b){cAtt=null;renderPend('c')}});

/* ---------- 더보기 메뉴 / 대화상자 / 토스트 ---------- */
const EMOJI=['😀','😁','😂','🤣','😊','😍','😘','😎','🤔','😅','😭','😡','👍','👏','🙏','💪','❤️','🎉','🔥','⭐','☕','🍚','🌙','👋'];
function openMenu(kind){
  const p=$('#pop');p.className='pop';
  if(kind==='emoji'){
    p.className='pop up emo';
    p.innerHTML=EMOJI.map(e=>`<button data-e="${e}">${e}</button>`).join('');
  }else{
    const items=kind==='attach'?[['apic','사진'],['afile','파일']]
      :kind==='thread'?[['tsearch','검색'],['tblock','번호 차단'],['tdel','대화방 삭제']]
      :[['del','메시지 삭제'],['spamv','스팸 번호 차단'],['set','설정']];
    if(kind==='attach')p.className='pop up';
    p.innerHTML=items.map(([k,l])=>`<button data-m="${k}">${l}</button>`).join('');
  }
  p.hidden=false;
}
function closeMenu(){$('#pop').hidden=true}
$('#pop').addEventListener('click',e=>{
  const eb=e.target.closest('[data-e]');
  if(eb){
    const ta=$(cur==='compose'?'#cIn':'#tIn'),s=ta.selectionStart??ta.value.length;
    ta.value=ta.value.slice(0,s)+eb.dataset.e+ta.value.slice(ta.selectionEnd??s);
    ta.selectionStart=ta.selectionEnd=s+eb.dataset.e.length;
    ta.dispatchEvent(new Event('input'));closeMenu();return;
  }
  const b=e.target.closest('[data-m]');if(!b)return;
  const k=b.dataset.m;closeMenu();
  if(k==='del'){selectMode=true;picked=new Set();renderList()}
  else if(k==='tdel'){
    ask('이 대화방을 삭제할까요?','삭제',()=>{
      S.threads=S.threads.filter(t=>t.id!==sel);save();openList();
    });
  }
  else if(k==='apic')$('#fileIn').click();
  else if(k==='afile')$('#docIn').click();
  else if(k==='tsearch'){const b=$('#tSearch');b.hidden=false;$('#tq').focus()}
  else if(k==='tblock'){
    const t=curThread(),c=t&&cById(t.ids[0]);if(!c)return;
    ask('이 번호를 스팸으로 차단할까요?','차단',()=>{
      if(!S.blocked.some(x=>digits(x.phone)===digits(c.phone)))S.blocked.push({phone:c.phone,name:c.name});
      save();openList();toast('차단되었습니다');
    });
  }
  else if(k==='spamv')openSpam();
  else if(k==='set')toast('설정은 시뮬레이션 화면입니다');
});
let dlgCb=null;
function ask(msg,ok,cb){$('#dlgMsg').textContent=msg;$('#dlgOk').textContent=ok;dlgCb=cb;$('#dlg').hidden=false}
$('#dlgOk').addEventListener('click',()=>{$('#dlg').hidden=true;const f=dlgCb;dlgCb=null;f&&f()});
$('#dlgNo').addEventListener('click',()=>{$('#dlg').hidden=true;dlgCb=null});
let toastT=null;
function toast(m){const el=$('#toast');el.textContent=m;el.hidden=false;clearTimeout(toastT);toastT=setTimeout(()=>el.hidden=true,1600)}
function autosize(el){el.style.height='auto';el.style.height=Math.min(120,el.scrollHeight)+'px'}

/* ---------- 스팸 번호 차단 ---------- */
function openSpam(){$('#spIn').value='';renderSpam();show('spam')}
function renderSpam(){
  $('#spList').innerHTML=S.blocked.map((b,i)=>`<li class="spr"><span>${esc(b.phone)}${b.name&&b.name!==b.phone?' ('+esc(b.name)+')':''}</span><button data-unb="${i}">해제</button></li>`).join('');
  $('#spEmpty').hidden=S.blocked.length>0;
}
$('#spList').addEventListener('click',e=>{
  const b=e.target.closest('[data-unb]');if(!b)return;
  S.blocked.splice(+b.dataset.unb,1);save();renderSpam();
});
function addSpam(){
  const v=$('#spIn').value.trim();
  if(digits(v).length<3)return toast('번호를 입력하세요');
  if(S.blocked.some(x=>digits(x.phone)===digits(v)))return toast('이미 차단된 번호입니다');
  S.blocked.push({phone:v,name:v});save();$('#spIn').value='';renderSpam();
}

/* ---------- 메시지 알림 / 수신 ---------- */
let nT=null;
function notify(c,m,t){
  const el=$('#notif');
  el.innerHTML=`<span class="av" style="background:${color(c?.id)}">${PERSON}</span><div><b>${esc(c?.name||'')}</b><p>${esc(prevText(m))}</p></div><span class="nt">지금</span>`;
  el.dataset.tid=t.id;el.hidden=false;clearTimeout(nT);nT=setTimeout(()=>el.hidden=true,4000);
}
$('#notif').addEventListener('click',()=>{const el=$('#notif');el.hidden=true;openThread(el.dataset.tid)});
function receive(phone,text,name,extra){
  if(S.blocked.some(b=>digits(b.phone)===digits(phone)))return false;
  let c=S.contacts.find(x=>digits(x.phone)===digits(phone));
  if(!c){c={id:uid(),name:name||phone,phone,tmp:!name};S.contacts.push(c)}
  let t=S.threads.find(x=>x.ids.length===1&&x.ids[0]===c.id);
  if(!t){t={id:uid(),ids:[c.id],unread:0,msgs:[]};S.threads.push(t)}
  const msg=Object.assign({id:uid(),me:false,text:text||'',img:'',ts:Date.now()},extra||{});
  t.msgs.push(msg);
  if(cur==='thread'&&sel===t.id){renderMsgs(t);scrollEnd()}else{t.unread=(t.unread||0)+1;notify(c,msg,t)}
  save();if(cur==='list')renderList();return true;
}
window.MessagesApp={receive};
window.addEventListener('storage',e=>{
  if(e.key!==KEY||!e.newValue)return;
  try{
    const n=JSON.parse(e.newValue);if(!n||!Array.isArray(n.threads)||!Array.isArray(n.contacts))return;
    const old=new Set(S.threads.flatMap(t=>t.msgs.map(m=>m.id)));
    if(!Array.isArray(n.blocked))n.blocked=[];S=n;
    S.threads.forEach(t=>t.msgs.forEach(m=>{if(!m.me&&!old.has(m.id)&&!isBlocked(t)&&!(cur==='thread'&&sel===t.id))notify(cById(t.ids[0]),m,t)}));
    if(cur==='list')renderList();else if(cur==='thread'){const t=curThread();t?renderMsgs(t):openList()}
  }catch(_){}
});

/* ---------- 버튼 동작 ---------- */
const A={
  compose:()=>openCompose(),
  search:()=>{
    const b=$('#searchBar');b.hidden=!b.hidden;
    if(!b.hidden)$('#q').focus();else{q='';$('#q').value='';renderList()}
  },
  more:()=>{
    if(!$('#pop').hidden)return closeMenu();
    openMenu(cur==='thread'?'thread':'list');
  },
  back:()=>openList(),
  call:()=>{const t=curThread();if(!t)return;const c=cById(t.ids[0]);const number=c?.phone||'';location.href='../Phone/phone.html?number='+encodeURIComponent(number)+'&name='+encodeURIComponent(c?.name||names(t))+'&call=1'},
  attach:()=>attach('t'),
  temoji:()=>{$('#pop').hidden?openMenu('emoji'):closeMenu()},
  cemoji:()=>{$('#pop').hidden?openMenu('emoji'):closeMenu()},
  spamback:()=>openList(),
  spamadd:()=>addSpam(),
  cattach:()=>attach('c'),
  csend:()=>sendCompose(),
  cback:()=>openList(),
  pick:()=>openPick(),
  pickback:()=>{renderCompose();show('compose')},
  pickdone:()=>{rIds=[...pickSet];renderCompose();show('compose')},
  cancelsel:()=>{selectMode=false;picked=new Set();renderList()},
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

/* ---------- 키보드 대응: 가상 키보드 높이만큼 앱 영역을 줄임 ---------- */
const vv=window.visualViewport;
function fitVV(){
  const root=document.documentElement.style;
  root.setProperty('--vvh',(vv?vv.height:innerHeight)+'px');
  root.setProperty('--vvt',(vv?vv.offsetTop:0)+'px');
  if(cur==='thread')scrollEnd();
}
if(vv){vv.addEventListener('resize',fitVV);vv.addEventListener('scroll',fitVV)}
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

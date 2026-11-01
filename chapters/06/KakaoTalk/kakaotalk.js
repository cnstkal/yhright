(()=>{'use strict';
const $=s=>document.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,6);
const KEY='yhright.kakaotalk.v1',H=36e5,DAY=864e5;

/* ---------- 데이터 ---------- */
const ME={id:'me',name:'성화',st:'오늘도 화이팅!'};
const FR=[
 {id:'f1',name:'엄마',st:'밥은 먹었니?'},
 {id:'f2',name:'윤호',st:''},
 {id:'f3',name:'아빠',st:'건강이 최고'},
 {id:'f4',name:'형',st:'바쁨'},
 {id:'f5',name:'성현이형(매니저)',st:'스케줄 확인 필수'},
 {id:'f6',name:'철수',st:'ㅋㅋ'},
 {id:'f7',name:'민기',st:''},
 {id:'f8',name:'홍중',st:'☕'}
];
const HUE={me:210,f1:340,f2:200,f3:30,f4:170,f5:260,f6:120,f7:50,f8:300};
const fById=id=>id==='me'?ME:FR.find(f=>f.id===id);
const SIL='<svg viewBox="0 0 24 24"><circle cx="12" cy="8.500" r="4.800"/><path d="M2.500 24c.5-6.500 4.800-9 9.500-9s9 2.500 9.500 9z"/></svg>';
const avHtml=(id,cls='')=>`<span class="kt-av ${cls}" style="background:hsl(${HUE[id]||210},18%,72%)">${SIL}</span>`;

function seed(){
 const n=Date.now(),m=(from,text,ago)=>({id:uid(),me:from==='me',from,text,ts:n-ago});
 return{chats:[
  {id:'c1',name:'엄마',group:false,members:['f1'],unread:2,msgs:[m('f1','저녁 뭐 먹을 거니?',5*H),m('me','아직 못 정했어요',4.5*H),m('f1','그럼 같이 먹자',H),m('f1','일찍 들어와~',H-6e4)]},
  {id:'c2',name:'철수, 민기, 홍중',group:true,members:['f6','f7','f8'],unread:5,msgs:[m('f6','오늘 모임 몇 시지?',3*H),m('f7','7시 아니었나',2.9*H),m('f8','ㅇㅇ 7시',2.8*H),m('me','나 조금 늦을 듯',2.5*H),m('f6','ㅇㅋㅇㅋ',2*H)]},
  {id:'c3',name:'성현이형(매니저)',group:false,members:['f5'],unread:0,msgs:[m('f5','내일 스케줄 공유드립니다',DAY+3*H),m('me','네 확인했습니다',DAY+2*H)]},
  {id:'c4',name:'윤호',group:false,members:['f2'],unread:1,msgs:[m('f2','야 어디야',DAY*2+H),m('me','집이지',DAY*2),m('f2','나와',DAY*2-H)]},
  {id:'c5',name:'형',group:false,members:['f4'],unread:0,msgs:[m('me','주말에 시간 돼?',DAY*3),m('f4','응 오후에 괜찮아',DAY*3-H)]},
  {id:'c6',name:'아빠',group:false,members:['f3'],unread:0,msgs:[m('f3','운전 조심해라',DAY*6)]}
 ]};
}
let S=null;
try{S=JSON.parse(localStorage.getItem(KEY))}catch(e){}
if(!S||!Array.isArray(S.chats))S=seed();
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}};
save();
const chat=id=>S.chats.find(c=>c.id===id);
const last=c=>c.msgs[c.msgs.length-1];

/* ---------- 시간 ---------- */
const p2=n=>String(n).padStart(2,'0'),WD='일월화수목금토';
const tstr=ts=>{const d=new Date(ts),h=d.getHours();return(h<12?'오전 ':'오후 ')+((h%12)||12)+':'+p2(d.getMinutes())};
function ltime(ts){const d=new Date(ts),n=new Date();
 if(d.toDateString()===n.toDateString())return tstr(ts);
 if(d.toDateString()===new Date(n-DAY).toDateString())return'어제';
 if(d.getFullYear()===n.getFullYear())return(d.getMonth()+1)+'월 '+d.getDate()+'일';
 return d.getFullYear()+'. '+(d.getMonth()+1)+'. '+d.getDate()+'.'}
const dlabel=ts=>{const d=new Date(ts);return d.getFullYear()+'년 '+(d.getMonth()+1)+'월 '+d.getDate()+'일 '+WD[d.getDay()]+'요일'};
const dkey=ts=>new Date(ts).toDateString();
const mkey=ts=>Math.floor(ts/6e4);
(function clk(){const d=new Date();$('#ktClock').textContent=(d.getHours()%12||12)+':'+p2(d.getMinutes());setTimeout(clk,15000)})();

/* ---------- 상단 바 / 탭 ---------- */
const ICS={
 search:'<svg viewBox="0 0 24 24"><circle cx="10.500" cy="10.500" r="6.500"/><path d="M15.500 15.500 21 21"/></svg>',
 add:'<svg viewBox="0 0 24 24"><circle cx="9.500" cy="8" r="4"/><path d="M2.500 20c.5-4 3.200-6 7-6 1.500 0 2.800.3 3.800.9M18 11v7M14.500 14.500h7"/></svg>',
 gear:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3.200"/><path d="M12 2.500v2.800M12 18.700v2.800M2.500 12h2.800M18.700 12h2.800M5.300 5.300l2 2M16.700 16.700l2 2M5.300 18.700l2-2M16.700 7.300l2-2"/></svg>',
 chat:'<svg viewBox="0 0 24 24"><path d="M12 3.500c-5 0-9 3.200-9 7.200 0 2.500 1.600 4.700 4 6l-1 3.800 4.400-2.500c.5.100 1.100.1 1.600.1 5 0 9-3.200 9-7.400S17 3.500 12 3.500zM9 10.500h6M9 13.500h4"/></svg>'
};
let tab='friends';
function renderBar(){
 const b=$('#ktBar');
 b.innerHTML=tab==='friends'
  ?`<button class="kt-l">편집</button><h1>친구</h1><div class="kt-r"><button class="kt-ib" aria-label="검색">${ICS.search}</button><button class="kt-ib" aria-label="친구 추가">${ICS.add}</button><button class="kt-ib" aria-label="설정">${ICS.gear}</button></div>`
  :`<button class="kt-l">편집</button><h1>채팅</h1><div class="kt-r"><button class="kt-ib" aria-label="검색">${ICS.search}</button><button class="kt-ib" aria-label="새 채팅">${ICS.chat}</button><button class="kt-ib" aria-label="설정">${ICS.gear}</button></div>`;
}
function setTab(t){
 if(t!=='friends'&&t!=='chats')return; /* 나머지 탭은 외형만 */
 tab=t;
 document.querySelectorAll('#ktTabs button').forEach(b=>b.classList.toggle('on',b.dataset.tab===tab));
 $('#ktPgFriends').hidden=tab!=='friends';$('#ktPgChats').hidden=tab!=='chats';
 renderBar();tab==='friends'?renderFriends():renderChats();badge();
}
$('#ktTabs').addEventListener('click',e=>{const b=e.target.closest('[data-tab]');if(b)setTab(b.dataset.tab)});
function badge(){const n=S.chats.reduce((a,c)=>a+(c.unread||0),0);$('#ktBdg').hidden=!n;$('#ktBdg').textContent=n>99?'99+':n}

/* ---------- 친구 목록 (프로필 상세 이동 없음) ---------- */
function renderFriends(){
 $('#ktPgFriends').innerHTML=
  `<div class="kt-srch"><div>${ICS.search}검색</div></div>
   <div class="kt-sec">내 프로필</div>
   <div class="kt-fr me">${avHtml('me')}<div class="bd"><div class="nm">${esc(ME.name)}</div><div class="st">${esc(ME.st)}</div></div></div>
   <div class="kt-div"></div>
   <div class="kt-sec">친구<em>${FR.length}</em></div>`+
  FR.slice().sort((a,b)=>a.name.localeCompare(b.name,'ko')).map(f=>`<div class="kt-fr">${avHtml(f.id)}<div class="bd"><div class="nm">${esc(f.name)}</div>${f.st?`<div class="st">${esc(f.st)}</div>`:''}</div></div>`).join('');
}

/* ---------- 채팅 목록 ---------- */
function chatAv(c){
 if(!c.group)return avHtml(c.members[0]);
 return `<span class="kt-av g">${c.members.slice(0,4).map(id=>`<i style="background:hsl(${HUE[id]},18%,72%)">${SIL}</i>`).join('')}</span>`;
}
function renderChats(){
 const L=[...S.chats].filter(c=>c.msgs.length).sort((a,b)=>last(b).ts-last(a).ts);
 $('#ktPgChats').innerHTML=L.length?L.map(c=>{const l=last(c);
  return `<div class="kt-cr" data-id="${c.id}">${chatAv(c)}<div class="bd"><div class="r1"><span class="nm">${esc(c.name)}</span>${c.group?`<span class="cn">${c.members.length+1}</span>`:''}</div><div class="pv">${esc(l.text)}</div></div><div class="rt"><span class="tm">${ltime(l.ts)}</span>${c.unread?`<span class="ub">${c.unread>99?'99+':c.unread}</span>`:''}</div></div>`}).join(''):'<div class="kt-empty">채팅방이 없습니다</div>';
}
$('#ktPgChats').addEventListener('click',e=>{const r=e.target.closest('.kt-cr');if(r)openRoom(r.dataset.id)});

/* ---------- 대화창 ---------- */
let cur=null;
function openRoom(id){
 const c=chat(id);if(!c)return;cur=id;c.unread=0;save();
 $('#ktRName').innerHTML=esc(c.name)+(c.group?`<small>${c.members.length+1}</small>`:'');
 $('#ktMain').hidden=true;$('#ktRoom').hidden=false;$('#ktApp').classList.add('room');
 $('#ktIn').value='';fit($('#ktIn'));upd();renderMsgs();
}
function closeRoom(){cur=null;$('#ktIn').blur();$('#ktRoom').hidden=true;$('#ktMain').hidden=false;$('#ktApp').classList.remove('room');renderChats();badge()}
$('#ktBack').addEventListener('click',closeRoom);

function renderMsgs(){
 const c=chat(cur);let h='',pd='';
 c.msgs.forEach((m,i)=>{
  if(dkey(m.ts)!==pd){h+=`<div class="kt-date">${dlabel(m.ts)}</div>`;pd=dkey(m.ts)}
  const pv=c.msgs[i-1],nx=c.msgs[i+1],sameP=pv&&dkey(pv.ts)===dkey(m.ts)&&pv.from===m.from&&mkey(pv.ts)===mkey(m.ts);
  const sameN=nx&&dkey(nx.ts)===dkey(m.ts)&&nx.from===m.from&&mkey(nx.ts)===mkey(m.ts);
  const first=!sameP,tm=!sameN?`<span class="t">${tstr(m.ts)}</span>`:'<span class="t"></span>';
  if(m.me)h+=`<div class="kt-m me${first?' first':''}">${tm}<div class="kt-b">${esc(m.text)}</div></div>`;
  else{const f=fById(m.from)||{name:''};
   h+=`<div class="kt-m them${first?' first':''}">${first?avHtml(m.from):'<span class="sp"></span>'}<div class="kt-c">${first&&c.group?`<div class="nm">${esc(f.name)}</div>`:''}<div class="kt-bw"><div class="kt-b">${esc(m.text)}</div>${tm}</div></div></div>`}
 });
 $('#ktMsgs').innerHTML=h;end();
}
const end=()=>{const e=$('#ktMsgs');e.scrollTop=e.scrollHeight};

/* ---------- 입력 / 전송 ---------- */
const IN=$('#ktIn');
function fit(el){el.style.height='auto';el.style.height=Math.min(100,el.scrollHeight)+'px'}
function upd(){$('#ktForm').classList.toggle('has',!!IN.value.trim())}
function send(){
 const t=IN.value.trim();if(!t||!cur)return;
 const c=chat(cur);c.msgs.push({id:uid(),me:true,from:'me',text:t,ts:Date.now()});
 IN.value='';fit(IN);upd();save();renderMsgs();
}
$('#ktForm').addEventListener('submit',e=>{e.preventDefault();send();IN.focus()});
IN.addEventListener('input',()=>{fit(IN);upd()});
IN.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey&&!e.isComposing){e.preventDefault();send()}});
$('#ktSend').addEventListener('mousedown',e=>e.preventDefault());

/* ---------- 키보드 대응 ---------- */
if(window.visualViewport){const vv=visualViewport,a=$('#ktApp');
 const f=()=>{a.style.height=vv.height+'px';scrollTo(0,0);if(cur)end()};
 vv.addEventListener('resize',f);vv.addEventListener('scroll',f)}

/* ---------- 시작 ---------- */
setTab('friends');
})();

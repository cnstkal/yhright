(()=>{'use strict';
const $=s=>document.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,6);
const KEY='yhright.kakaotalk.v4',H=36e5,DAY=864e5;

/* ---------- 데이터 ---------- */
const ME={id:'me',name:'정윤호',st:'괜찮아'};
const FR=[
 {id:'f1',name:'송민기',st:'별거 아님'},
 {id:'f2',name:'민재',st:'학교'},
 {id:'f3',name:'현우',st:'잠'},
 {id:'f4',name:'수빈',st:'🍀'},
 {id:'f5',name:'모텔 사장님',st:''},
 {id:'f6',name:'옆방 할아버지',st:''},
 {id:'f7',name:'공시생 형',st:'공부 중'},
 {id:'f8',name:'이모',st:''}
];
const HUE={me:210,f1:340,f2:200,f3:30,f4:170,f5:260,f6:120,f7:50,f8:300};
const fById=id=>id==='me'?ME:FR.find(f=>f.id===id);
const SIL='<svg viewBox="0 0 24 24"><circle cx="12" cy="8.500" r="4.800"/><path d="M2.500 24c.5-6.500 4.800-9 9.500-9s9 2.500 9.500 9z"/></svg>';
const avHtml=(id,cls='')=>`<span class="kt-av ${cls}" style="background:hsl(${HUE[id]||210},18%,72%)">${SIL}</span>`;

function seed(){
 /* 모든 시드 메시지는 이야기 시점(2018년 12월 ~ 2019년 1월)에 맞춘 고정 날짜 */
 const at=(mo,d,h,mi)=>new Date(mo>=6?2018:2019,mo,d,h,mi).getTime();
 const m=(from,text,ts)=>({id:uid(),me:from==='me',from,text,ts});
 return{chats:[
  {id:'c1',name:'송민기',group:false,members:['f1'],unread:1,msgs:[
   m('f1','야 오늘 학교 끝나고 뭐함',at(0,2,17,0)),m('me','모텔 들어가야지 왜',at(0,2,17,2)),
   m('f1','밥은 먹고 들어가라',at(0,2,17,5)),m('me','돈 없어서 대충 먹을거임ㅋㅋ',at(0,2,17,7)),
   m('f1','또 그 소리 ㅋㅋ 내가 뭐 사갈게',at(0,2,17,10)),m('me','됐어 괜찮아',at(0,2,17,12)),
   m('f1','너 진짜 고집 개쎄',at(0,3,21,20)),m('me','니가 할 말은 아닌듯',at(0,3,21,22)),
   m('f1','자냐',at(0,4,0,31)),m('me','아니 왜',at(0,4,0,33)),m('f1','그냥. 너 괜찮나 해서',at(0,4,0,34)),
   m('me','응 괜찮아 ㅎㅎ',at(0,4,0,35)),m('f1','거짓말 치지 마라 ㅋㅋ 내일 학교 와서 밥이나 같이 먹자',at(0,4,0,36)),
   m('me','알았어 ㅋㅋ 잘 자',at(0,4,0,40)),m('f1','ㅇㅇ 잘 자',at(0,4,0,41))
  ]},
  {id:'c2',name:'민기, 민재, 현우',group:true,members:['f1','f2','f3'],unread:2,msgs:[
   m('f2','내일 수행평가 준비했냐',at(0,2,21,40)),m('f1','윤호는 했겠냐',at(0,2,21,41)),
   m('me','야 나 했거든',at(0,2,21,43)),m('f3','ㅋㅋㅋㅋㅋㅋ',at(0,2,21,44)),
   m('f1','끝나고 편의점 ㄱ',at(0,3,15,0)),m('me','돈 없어서 구경만 함',at(0,3,15,2)),m('f1','아 진짜 내가 살게',at(0,3,15,3)),
   m('f3','민기 너 편의점에서 또 라면 사냐',at(0,4,12,10)),m('f1','아니 오늘은 삼각김밥임',at(0,4,12,12)),
   m('f2','둘 다 밥은 먹고 다녀라 제발',at(0,4,12,14)),m('me','넌 엄마냐 ㅋㅋ',at(0,4,12,15)),m('f2','엄마는 아니고 반장임',at(0,4,12,16))
  ]},
  {id:'c3',name:'민재',group:false,members:['f2'],unread:0,msgs:[
   m('f2','윤호야 프린트 남는 거 있음?',at(0,3,19,0)),m('me','응 내일 줄게',at(0,3,19,2)),m('f2','ㄱㅅ',at(0,3,19,3)),
   m('me','근데 너 수학 숙제 답 좀 보여줄래',at(0,4,9,50)),m('f2','안 돼 ㅋㅋ 스스로 해',at(0,4,9,52))
  ]},
  {id:'c5',name:'이모',group:false,members:['f8'],unread:0,msgs:[
   m('f8','윤호야 짐 다 챙겼니',at(11,26,20,3)),m('me','네',at(11,26,20,10)),
   m('f8','이모도 지금 상황이 너무 힘들어서 그래. 이해해줘',at(11,26,20,12)),m('me','알아요',at(11,26,20,15)),
   m('f8','연락은 가끔 하자',at(11,26,20,16))
  ]},
  {id:'c6',name:'수빈',group:false,members:['f4'],unread:1,msgs:[
   m('f4','윤호야 너 민기랑 친하지',at(0,2,13,20)),m('me','응 완전 단짝이지',at(0,2,13,22)),
   m('f4','다행이다. 나 요즘 민기랑 자주 얘기하게 된 것 같아',at(0,2,13,26)),m('me','오 그래? 잘됐다',at(0,2,13,30))
  ]},
  {id:'c4',name:'모텔 사람들',group:true,members:['f5','f6','f7'],unread:0,msgs:[
   m('f5','윤호 학생 오늘 방 정리할 때 수건 문 앞에 둘게요',at(0,1,9,20)),m('me','감사합니다 사장님!',at(0,1,9,22)),
   m('f6','학생 밥은 먹었나',at(0,3,18,40)),m('me','네 할아버지 ㅎㅎ',at(0,3,18,42)),m('f6','김치 좀 담가서 두고 갈게',at(0,3,18,44)),m('me','와 진짜요? 감사합니다',at(0,3,18,46)),
   m('f7','복도에 택배 왔던데 네 거 아님?',at(0,4,21,10)),m('me','아 제 거 맞아요 감사합니다',at(0,4,21,12))
  ]}
 ]};
}
let S=null;
try{S=JSON.parse(localStorage.getItem(KEY))}catch(e){}
if(!S||!Array.isArray(S.chats))S=seed();

/* 챕터 2 서사 데이터: 귀가 후 다시 집을 나와 모텔에 머물게 된 흐름 */
(function addStoryMessages(){
 const c=S.chats.find(x=>x.id==='c1');
 if(!c)return;
 const story=[
  ['f1','집에는 갔어?',new Date(2018,11,28,20,10).getTime(),'story-home-1'],
  ['me','응 일단 집에 왔어',new Date(2018,11,28,20,12).getTime(),'story-home-2'],
  ['f1','그럼 이제 괜찮은 거야?',new Date(2018,11,28,20,14).getTime(),'story-home-3'],
  ['me','잘 모르겠어 오래 못 있을 것 같아',new Date(2018,11,28,20,16).getTime(),'story-home-4'],
  ['f1','무슨 일 있으면 바로 연락해',new Date(2018,11,28,20,18).getTime(),'story-home-5'],
  ['me','결국 집에서도 나왔어',new Date(2018,11,30,18,5).getTime(),'story-motel-1'],
  ['f1','뭐? 지금 어디야',new Date(2018,11,30,18,6).getTime(),'story-motel-2'],
  ['me','모텔. 일단 여기서 지내려고',new Date(2018,11,30,18,8).getTime(),'story-motel-3'],
  ['f1','혼자 있는 거야?',new Date(2018,11,30,18,10).getTime(),'story-motel-4'],
  ['me','응 장기투숙하기로 했어',new Date(2018,11,30,18,12).getTime(),'story-motel-5'],
  ['f1','학교는 계속 다닐 거지',new Date(2018,11,30,18,14).getTime(),'story-motel-6'],
  ['me','당연하지 돈도 벌어야 돼',new Date(2018,11,30,18,16).getTime(),'story-motel-7']
 ];
 const ids=new Set(c.msgs.map(x=>x.id));
 story.forEach(([from,text,ts,id])=>{if(!ids.has(id))c.msgs.push({id,me:from==='me',from,text,ts})});
 c.msgs.sort((a,b)=>a.ts-b.ts);
})();
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

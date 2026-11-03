(()=>{'use strict';
const $=s=>document.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const uid=()=>'m'+Date.now().toString(36)+Math.random().toString(36).slice(2,7);
const KEY='ios14-kakaotalk-v1',H=36e5,DAY=864e5;

/* ---------- 데이터 (가상 인물) ---------- */
const ME={id:'me',name:'정윤호',st:'천천히, 잘 지내기'};
const FR=[
 {id:'f1',name:'엄마',st:'밥은 먹었니?',fav:true},
 {id:'f2',name:'아빠',st:'건강이 최고',fav:true},
 {id:'f3',name:'박성화',st:'퇴근하고 연락할게',fav:true},
 {id:'f4',name:'형',st:'바쁨'},
 {id:'f5',name:'성현(매니저)',st:'스케줄 확인 필수'},
 {id:'f6',name:'철수',st:'ㅋㅋ'},
 {id:'f7',name:'민기',st:''},
 {id:'f8',name:'홍중',st:'☕'},
 {id:'f9',name:'지은',st:'여행 가고 싶다'},
 {id:'f10',name:'수빈',st:'퇴근!'},
 {id:'f11',name:'도윤',st:''},
 {id:'f12',name:'하린',st:'오늘도 맑음'},
 {id:'f13',name:'서준',st:'운동 중'},
 {id:'f14',name:'예린',st:'🌙'},
 {id:'f15',name:'태현',st:''},
 {id:'f16',name:'소영',st:'행복한 하루'}
];
const HUE={me:210,f1:340,f2:30,f3:200,f4:170,f5:260,f6:120,f7:50,f8:300,f9:15,f10:280,f11:190,f12:95,f13:230,f14:320,f15:150,f16:60};
const fById=id=>id==='me'?ME:FR.find(f=>f.id===id);
const PERSON='<svg viewBox="0 0 40 40"><circle cx="20" cy="15" r="7" fill="#fff" stroke="none"/><path d="M6 40c1-9 6.5-13 14-13s13 4 14 13z" fill="#fff" stroke="none"/></svg>';
const bgOf=id=>`hsl(${HUE[id]||210},45%,62%)`;
const avatar=(id,cls='')=>`<span class="av ${cls}" style="background:${bgOf(id)}">${PERSON}</span>`;

function seed(){
 const n=Date.now();
 // r: 읽음 숫자(아직 안 읽은 사람 수), 내 메시지에만 사용
 const m=(from,text,ago,r=0)=>({id:uid(),from,me:from==='me',text,ts:n-ago,r});
 return{chats:[
  {id:'c1',name:'엄마',group:false,members:['f1'],unread:2,msgs:[
   m('f1','저녁 뭐 먹을 거니?',5*H),m('me','아직 못 정했어요',4.5*H,0),m('f1','그럼 같이 먹자',H),m('f1','일찍 들어와~',H-6e4)]},
  {id:'c2',name:'대학 동기 단톡',group:true,members:['f6','f7','f8','f9'],unread:3,msgs:[
   m('f6','오늘 모임 몇 시지?',3*H),m('f7','7시 아니었나',2.9*H),m('f8','ㅇㅇ 7시',2.8*H),
   m('me','나 조금 늦을 듯',2.5*H,4),m('f9','ㅋㅋ 알았어',2*H),m('f6','ㅇㅋㅇㅋ',1.9*H)]},
  {id:'c3',name:'성현(매니저)',group:false,members:['f5'],unread:0,msgs:[
   m('f5','내일 스케줄 공유드립니다',DAY+3*H),m('me','네 확인했습니다',DAY+2*H,1)]},
  {id:'c4',name:'윤호',group:false,members:['f3'],unread:1,msgs:[
   m('f3','야 어디야',2*DAY+H),m('me','집이지',2*DAY,1),m('f3','나와',2*DAY-H)]},
  {id:'c5',name:'형',group:false,members:['f4'],unread:0,msgs:[
   m('me','주말에 시간 돼?',3*DAY,1),m('f4','응 오후에 괜찮아',3*DAY-H)]},
  {id:'c6',name:'아빠',group:false,members:['f2'],unread:0,msgs:[
   m('f2','운전 조심해라',6*DAY)]},
  {id:'c7',name:'주말 등산팀',group:true,members:['f10','f11','f12','f13'],unread:0,msgs:[
   m('f10','이번 주 토요일 북한산 어때요?',8*H),m('f11','좋아요 ㅎㅎ 8시 입구?',7.5*H),
   m('me','좋아요! 도시락은 제가 준비할게요',7*H,4),m('f12','ㅋㅋ 역시',6.5*H),m('f13','7시 반에 보자',H)]},
  {id:'c8',name:'우리집',group:true,members:['f1','f2','f3'],unread:1,msgs:[
   m('f1','오늘 저녁 7시에 같이 먹자',4*DAY),m('f2','좋아',4*DAY-.5*H),m('f3','나 늦을지도',4*DAY-2*H)]}
 ]};
}
let S=null;
try{S=JSON.parse(localStorage.getItem(KEY))}catch(e){}
if(!S||!Array.isArray(S.chats)||!S.chats.length)S=seed();
(function chapter3Chats(){
 const messages=[
  ['f3','오늘 퇴근 조금 늦을 것 같아. 먼저 씻고 있어.',new Date(2022,9,27,18,12).getTime(),'ch3-seonghwa-01'],
  ['me','응 천천히 와. 저녁은 내가 해둘게',new Date(2022,9,27,18,15).getTime(),'ch3-seonghwa-02'],
  ['f3','무리하지 말고. 냉장고에 있는 거 먹어도 돼',new Date(2022,9,27,18,17).getTime(),'ch3-seonghwa-03'],
  ['me','나 이제 여기 사는 사람인데 그 정도는 하지 ㅋㅋ',new Date(2022,9,27,18,20).getTime(),'ch3-seonghwa-04'],
  ['f3','그렇네. 그래도 고마워',new Date(2022,9,27,18,22).getTime(),'ch3-seonghwa-05'],
  ['me','오늘 회사는 어땠어?',new Date(2022,9,28,19,4).getTime(),'ch3-seonghwa-06'],
  ['f3','평소랑 똑같지. 보고서 하나 더 생긴 것 빼고',new Date(2022,9,28,19,6).getTime(),'ch3-seonghwa-07'],
  ['me','대리님 힘내세요',new Date(2022,9,28,19,8).getTime(),'ch3-seonghwa-08'],
  ['f3','놀리는 거지 지금',new Date(2022,9,28,19,9).getTime(),'ch3-seonghwa-09'],
  ['me','조금 ㅎㅎ',new Date(2022,9,28,19,10).getTime(),'ch3-seonghwa-10']
 ];
 let c=S.chats.find(x=>x.id==='c4');
 if(!c){c={id:'c4',name:'박성화',group:false,members:['f3'],unread:0,msgs:[]};S.chats.push(c)}
 c.name='박성화';c.group=false;c.members=['f3'];
 const ids=new Set(c.msgs.map(x=>x.id));
 messages.forEach(([from,text,ts,id])=>{if(!ids.has(id))c.msgs.push({id,from,me:from==='me',text,ts,r:0})});
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

/* ---------- 아이콘 ---------- */
const ICS={
 search:'<svg viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5 21 21"/></svg>',
 add:'<svg viewBox="0 0 24 24"><circle cx="9.5" cy="8" r="4"/><path d="M2.5 20c.5-4 3.2-6 7-6 1.5 0 2.8.3 3.8.9M18 11v7M14.5 14.5h7"/></svg>',
 gear:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3.2"/><path d="M12 2.5v2.8M12 18.7v2.8M2.5 12h2.8M18.7 12h2.8M5.3 5.3l2 2M16.7 16.7l2 2M5.3 18.7l2-2M16.7 7.3l2-2"/></svg>',
 chat:'<svg viewBox="0 0 24 24"><path d="M12 3.5c-5 0-9 3.2-9 7.2 0 2.5 1.6 4.7 4 6l-1 3.8 4.4-2.5c.5.1 1.1.1 1.6.1 5 0 9-3.2 9-7.4S17 3.5 12 3.5zM9 10.5h6M9 13.5h4"/></svg>',
 chev:'<svg viewBox="0 0 12 12"><path d="M2 4l4 4 4-4"/></svg>'
};
const dis=(html,label)=>`<button type="button" class="dis" aria-label="${label}" aria-disabled="true">${html}</button>`;

/* ---------- 상단 바 / 탭 ---------- */
let tab='friends';
function renderBar(){
 const title=tab==='friends'?'친구':'채팅';
 const icons=tab==='friends'
   ?dis(ICS.search,'검색')+dis(ICS.add,'친구 추가')+dis(ICS.gear,'설정')
   :dis(ICS.search,'검색')+dis(ICS.chat,'새 채팅')+dis(ICS.gear,'설정');
 $('#hdr').innerHTML=`<h1>${title}</h1><div class="ico">${icons}</div>`;
}
function setTab(t){
 if(t!=='friends'&&t!=='chats')return; /* 나머지 탭은 외형만 */
 tab=t;
 document.querySelectorAll('#tabs [data-tab]').forEach(b=>b.classList.toggle('on',b.dataset.tab===tab));
 $('#pgFriends').hidden=tab!=='friends';$('#pgChats').hidden=tab!=='chats';
 renderBar();
 tab==='friends'?renderFriends():renderChats();
 badge();
}
$('#tabs').addEventListener('click',e=>{const b=e.target.closest('[data-tab]');if(b&&!b.classList.contains('dis'))setTab(b.dataset.tab)});
function badge(){
 const n=S.chats.reduce((a,c)=>a+(c.unread||0),0);
 const b=$('#bdg');b.hidden=!n;b.textContent=n>99?'99+':n;
}

/* ---------- 친구 목록 (프로필 상세 이동 없음) ---------- */
const fold={fav:false,fr:false};
const frRow=f=>`<div class="fr">${avatar(f.id)}<div class="bd"><div class="nm">${esc(f.name)}</div>${f.st?`<div class="st">${esc(f.st)}</div>`:''}</div></div>`;
function renderFriends(){
 const fav=FR.filter(f=>f.fav);
 const rest=FR.filter(f=>!f.fav).sort((a,b)=>a.name.localeCompare(b.name,'ko'));
 $('#pgFriends').innerHTML=
  `<div class="fr me">${avatar('me')}<div class="bd"><div class="nm">${esc(ME.name)}</div><div class="st">${esc(ME.st)}</div></div></div>
   <div class="gap"></div>
   <button type="button" class="sec${fold.fav?' closed':''}" data-fold="fav">${ICS.chev}<b>즐겨찾기</b> ${fav.length}</button>
   ${fold.fav?'':fav.map(frRow).join('')}
   <button type="button" class="sec${fold.fr?' closed':''}" data-fold="fr">${ICS.chev}<b>친구</b> ${rest.length}</button>
   ${fold.fr?'':rest.map(frRow).join('')}`;
}
$('#pgFriends').addEventListener('click',e=>{
 const s=e.target.closest('[data-fold]');
 if(s){fold[s.dataset.fold]=!fold[s.dataset.fold];renderFriends()}
});

/* ---------- 채팅 목록 ---------- */
function chatAv(c){
 if(!c.group)return avatar(c.members[0]);
 const ids=c.members.slice(0,4);
 return `<span class="gav n${ids.length}">${ids.map(id=>`<i style="background:${bgOf(id)}">${PERSON}</i>`).join('')}</span>`;
}
function renderChats(){
 const L=S.chats.filter(c=>c.msgs.length).sort((a,b)=>last(b).ts-last(a).ts);
 $('#pgChats').innerHTML=L.length?L.map(c=>{const l=last(c);
  return `<div class="cr" data-id="${c.id}" role="button" tabindex="0">${chatAv(c)}`+
   `<div class="bd"><div class="r1"><span class="nm">${esc(c.name)}</span>${c.group?`<span class="cnt">${c.members.length+1}</span>`:''}</div>`+
   `<div class="pv">${esc(l.text)}</div></div>`+
   `<div class="rt"><span class="tm">${ltime(l.ts)}</span>${c.unread?`<span class="ub">${c.unread>99?'99+':c.unread}</span>`:'<span></span>'}</div></div>`;
 }).join(''):'<div class="empty">채팅방이 없습니다</div>';
}
$('#pgChats').addEventListener('click',e=>{const r=e.target.closest('.cr');if(r)openRoom(r.dataset.id)});
$('#pgChats').addEventListener('keydown',e=>{if(e.key==='Enter'){const r=e.target.closest('.cr');if(r)openRoom(r.dataset.id)}});

/* ---------- 채팅방 ---------- */
let cur=null;
function openRoom(id){
 const c=chat(id);if(!c)return;
 cur=id;c.unread=0;save();
 $('#rName').innerHTML=esc(c.name)+(c.group?`<small>${c.members.length+1}</small>`:'');
 $('#vList').hidden=true;$('#vRoom').hidden=false;
 IN.value='';fit();upd();renderMsgs();
}
function closeRoom(){
 cur=null;IN.blur();
 $('#vRoom').hidden=true;$('#vList').hidden=false;
 renderChats();badge();
}
$('#back').addEventListener('click',closeRoom);

function renderMsgs(){
 const c=chat(cur);if(!c)return;
 let h='',pd='';
 c.msgs.forEach((m,i)=>{
  if(dkey(m.ts)!==pd){h+=`<div class="date"><span>${dlabel(m.ts)}</span></div>`;pd=dkey(m.ts)}
  const pv=c.msgs[i-1],nx=c.msgs[i+1];
  const sameP=pv&&pv.from===m.from&&dkey(pv.ts)===dkey(m.ts)&&mkey(pv.ts)===mkey(m.ts);
  const sameN=nx&&nx.from===m.from&&dkey(nx.ts)===dkey(m.ts)&&mkey(nx.ts)===mkey(m.ts);
  const first=!sameP;
  const tm=sameN?'':`<span class="tm">${tstr(m.ts)}</span>`;
  if(m.me){
   const rd=m.r>0?`<span class="rd">${m.r}</span>`:'';
   h+=`<div class="m me${first?' first':''}"><div class="meta">${rd}${tm}</div><div class="b">${esc(m.text)}</div></div>`;
  }else{
   const f=fById(m.from)||{name:''};
   h+=`<div class="m them${first?' first':''}">`+
     `<div class="slot">${first?avatar(m.from,'sm'):''}</div>`+
     `<div class="col">${first&&c.group?`<div class="nm">${esc(f.name)}</div>`:''}`+
     `<div class="line"><div class="b">${esc(m.text)}</div><div class="meta">${tm}</div></div></div></div>`;
  }
 });
 $('#msgs').innerHTML=h;end();
}
const end=()=>{const e=$('#msgs');e.scrollTop=e.scrollHeight};

/* ---------- 입력 / 전송 ---------- */
const IN=$('#inp');
const COMP=$('#form');
function fit(){IN.style.height='auto';IN.style.height=Math.min(100,IN.scrollHeight)+'px'}
function upd(){COMP.classList.toggle('has',!!IN.value.trim())}
function send(){
 const t=IN.value.trim();if(!t||!cur)return;
 const c=chat(cur);
 // 읽음 숫자: 1:1은 상대 1명, 단체방은 나를 제외한 참여자 수
 c.msgs.push({id:uid(),from:'me',me:true,text:t,ts:Date.now(),r:c.group?c.members.length:1});
 IN.value='';fit();upd();save();renderMsgs();
}
$('#form').addEventListener('submit',e=>{e.preventDefault();send();IN.focus()});
IN.addEventListener('input',()=>{fit();upd()});
IN.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey&&!e.isComposing){e.preventDefault();send()}});
$('#send').addEventListener('mousedown',e=>e.preventDefault());

/* ---------- 키보드 대응: 입력창이 키보드 위로 올라오도록 높이 맞춤 ---------- */
if(window.visualViewport){
 const vv=visualViewport,a=$('#app');
 const f=()=>{a.style.height=vv.height+'px';scrollTo(0,0);if(cur)end()};
 vv.addEventListener('resize',f);vv.addEventListener('scroll',f);
}

/* ---------- 시작 ---------- */
setTab('friends');
})();

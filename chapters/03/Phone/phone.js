'use strict';
(()=>{
const $=s=>document.querySelector(s);
const CH='ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ';
const CONTACTS=[
  {id:1,n:'김민준',ph:'010-1234-5678',col:'#ff6b6b',fav:1},
  {id:2,n:'이서연',ph:'010-2345-6789',col:'#4dabf7',fav:1},
  {id:3,n:'박지호',ph:'010-3456-7890',col:'#63c132',fav:1},
  {id:4,n:'최유진',ph:'010-4567-8901',col:'#b197fc'},
  {id:5,n:'정도윤',ph:'010-5678-9012',col:'#ffa94d'},
  {id:6,n:'한지민',ph:'010-6789-0123',col:'#38d9a9',fav:1},
  {id:7,n:'윤하린',ph:'010-7890-1234',col:'#faa2c1'},
  {id:8,n:'강시우',ph:'010-8901-2345',col:'#91a7ff'},
  {id:9,n:'오수빈',ph:'010-9012-3456',col:'#ffd43b'},
  {id:10,n:'임재현',ph:'010-1111-2222',col:'#adb5bd'}
];
const RECENTS=[
  {id:2,t:'오늘 오후 2:14',out:1},
  {id:null,ph:'010-5555-0147',t:'오늘 오전 10:02',miss:1},
  {id:3,t:'어제',out:1},
  {id:9,t:'어제',miss:1},
  {id:6,t:'10월 30일',out:1},
  {id:null,ph:'02-555-0100',t:'10월 28일',miss:1},
  {id:4,t:'10월 25일'}
];
const VOICE=[
  {id:3,d:'어제 오후 6:40',dur:'0:42'},
  {id:null,ph:'010-5555-0147',d:'10월 28일',dur:'1:08'},
  {id:6,d:'10월 20일',dur:'0:19'}
];
const KEYS=[['1',''],['2','ABC'],['3','DEF'],['4','GHI'],['5','JKL'],['6','MNO'],['7','PQRS'],['8','TUV'],['9','WXYZ'],['*',''],['0','+'],['#','']];
const ICON={
  star:'<svg viewBox="0 0 24 24"><path d="M12 3.2l2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6-4.5-4.2 6.1-.7z"/></svg>',
  clock:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5.2l3.4 2"/></svg>',
  person:'<svg viewBox="0 0 24 24"><circle cx="12" cy="8.5" r="4"/><path d="M4.5 20.5c1-4 4-6 7.5-6s6.5 2 7.5 6"/></svg>',
  dots:'<svg viewBox="0 0 24 24" fill="currentColor" stroke="none">'+[[6,5],[12,5],[18,5],[6,11],[12,11],[18,11],[6,17],[12,17],[18,17]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="1.8"/>`).join('')+'<circle cx="12" cy="20.5" r="1.4" opacity="0"/></svg>',
  tape:'<svg viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="12" rx="2.5"/><circle cx="8.5" cy="12" r="2.4"/><circle cx="15.5" cy="12" r="2.4"/><path d="M9 16.5h6"/></svg>',
  info:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9.5"/><path d="M12 11v5.5M12 7.6v.2"/></svg>',
  search:'<svg viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="6"/><path d="M15 15l5 5"/></svg>',
  plus:'<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>',
  back:'<svg viewBox="0 0 24 24" style="width:14px;height:22px"><path d="M15 4l-8 8 8 8"/></svg>',
  phone:'<svg viewBox="0 0 24 24"><path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z"/></svg>',
  x:'<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  msg:'<svg viewBox="0 0 24 24"><path d="M4 5h16v11H9l-5 4z"/></svg>',
  video:'<svg viewBox="0 0 24 24"><rect x="3" y="7" width="12" height="10" rx="2"/><path d="M15 11l6-3v8l-6-3"/></svg>',
  mail:'<svg viewBox="0 0 24 24"><rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="M3.5 7l8.5 6 8.5-6"/></svg>',
  del:'<svg viewBox="0 0 30 30"><path d="M11 8h14v14H11l-6-7z"/><path d="M14 12l6 6M20 12l-6 6"/></svg>'
};
const byId=id=>CONTACTS.find(c=>c.id===id);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const initial=n=>{const c=n.charCodeAt(0);return(c>=0xAC00&&c<=0xD7A3)?CH[Math.floor((c-0xAC00)/588)]:n[0].toUpperCase()};
const av=(c,cls='')=>c?`<i class="av ${cls}" style="background:${c.col}">${esc(c.n[0])}</i>`:`<i class="av ${cls}" style="background:#c7c7cc">${ICON.person.replace('<svg','<svg style="width:60%;height:60%"')}</i>`;
const name=(x)=>x.id?byId(x.id).n:x.ph;

/* 화면 */
$('#app').innerHTML=`
<section class="pages">
  <div class="pg" id="pgFav">
    <div class="nav"><button>편집</button><button class="plus" data-a="noop" aria-label="추가">${ICON.plus}</button></div>
    <h1 class="large">즐겨찾기</h1>
    <div class="rows" id="favList"></div>
  </div>
  <div class="pg" id="pgLog" hidden>
    <div class="nav"><button>편집</button><span></span></div>
    <h1 class="large">최근 통화</h1>
    <div class="seg"><button class="on" data-a="seg" data-v="all">전체</button><button data-a="seg" data-v="miss">부재중</button></div>
    <div class="rows" id="logList"></div>
  </div>
  <div class="pg" id="pgCon" hidden>
    <div class="nav"><span></span><button class="plus" data-a="noop" aria-label="추가">${ICON.plus}</button></div>
    <h1 class="large">연락처</h1>
    <label class="sbox">${ICON.search}<input id="cq" placeholder="검색" autocomplete="off"></label>
    <div id="conList"></div>
  </div>
  <div class="pg" id="pgKey" hidden>
    <div class="nav"><span></span><span class="t" style="font-weight:600;color:#000">키패드</span><span></span></div>
    <div class="disp" id="disp"></div>
    <div class="keys">${KEYS.map(([d,l])=>`<button class="k" data-a="key" data-d="${d}">${d}<small>${l}</small></button>`).join('')}</div>
    <div class="kbot"><span></span><button class="call" data-a="noop" aria-label="통화">${ICON.phone}</button><button class="del" id="del" data-a="del" aria-label="삭제">${ICON.del}</button></div>
  </div>
  <div class="pg" id="pgVm" hidden>
    <div class="nav"><button>편집</button><span></span></div>
    <h1 class="large">음성 사서함</h1>
    <div class="rows" id="vmList"></div>
  </div>
  <div id="detail"></div>
</section>
<nav class="tabs" id="tabs">
  <button class="tab on" data-t="pgFav">${ICON.star}<span>즐겨찾기</span></button>
  <button class="tab" data-t="pgLog">${ICON.clock}<span>최근 통화</span></button>
  <button class="tab" data-t="pgCon">${ICON.person}<span>연락처</span></button>
  <button class="tab" data-t="pgKey">${ICON.dots}<span>키패드</span></button>
  <button class="tab" data-t="pgVm">${ICON.tape}<span>음성 사서함</span></button>
  <i class="hi"></i>
</nav>
<div id="inBanner">
  <i class="av" style="background:#4dabf7" id="bAv">이</i>
  <div class="bt"><div class="nm" id="bNm"></div><div class="sb">휴대전화 수신 중</div></div>
  <button class="bb dec" data-a="ring" aria-label="거절">${ICON.x}</button>
  <button class="bb acc" data-a="ring" aria-label="수락">${ICON.phone}</button>
</div>
<div id="inFull">
  <i class="av" style="background:#4dabf7" id="fAv">이</i>
  <div class="nm" id="fNm"></div>
  <div class="sb">휴대전화</div>
  <div class="fb">
    <div><button class="dec" data-a="ring" aria-label="거절">${ICON.x}</button>거절</div>
    <div><button class="acc" data-a="ring" aria-label="수락">${ICON.phone}</button>수락</div>
  </div>
</div>`;

/* 목록 렌더 */
function row(x,{sub,meta,info,cls=''}={}){
  const c=x.id?byId(x.id):null;
  return `<div class="row ${cls}" ${c?`data-a="detail" data-id="${c.id}"`:''}>${av(c,'sm')}<div class="txt"><div class="nm">${esc(name(x))}</div>${sub?`<div class="sub">${esc(sub)}</div>`:''}</div>${meta?`<span class="meta">${esc(meta)}</span>`:''}${info?`<button class="info" data-a="noop" aria-label="정보">${ICON.info}</button>`:''}</div>`;
}
function renderFav(){
  $('#favList').innerHTML=CONTACTS.filter(c=>c.fav).map(c=>`<div class="row" data-a="detail" data-id="${c.id}" style="cursor:pointer">${av(c,'sm')}<div class="txt"><div class="nm">${esc(c.n)}</div><div class="sub">휴대전화 ${c.ph}</div></div></div>`).join('');
}
let logMode='all';
function renderLog(){
  const list=RECENTS.filter(x=>logMode==='all'||x.miss);
  $('#logList').innerHTML=list.map(x=>row(x,{sub:x.out?'발신':x.miss?'부재중':'수신',meta:x.t,info:1,cls:x.miss?'miss':''})).join('');
}
function renderCon(q=''){
  const list=CONTACTS.filter(c=>!q||c.n.includes(q)||c.ph.includes(q)).sort((a,b)=>a.n.localeCompare(b.n,'ko'));
  const groups={};list.forEach(c=>(groups[initial(c.n)]=groups[initial(c.n)]||[]).push(c));
  const keys=Object.keys(groups).sort((a,b)=>a.localeCompare(b,'ko'));
  $('#conList').innerHTML=keys.map(k=>`<div class="sec" id="g-${CH.includes(k)?CH.indexOf(k):'x'}">${k}</div><div class="rows">${groups[k].map(c=>`<div class="row" data-a="detail" data-id="${c.id}" style="cursor:pointer">${av(c,'sm')}<div class="txt"><div class="nm">${esc(c.n)}</div></div></div>`).join('')}</div>`).join('')||'<div class="sec" style="text-align:center;padding:30px">검색 결과 없음</div>';
}
function renderVm(){
  $('#vmList').innerHTML=VOICE.map(v=>{const c=v.id?byId(v.id):null;return `<div class="row">${av(c,'sm')}<div class="txt"><div class="nm">${esc(c?c.n:v.ph)}</div><div class="sub">${esc(v.d)} · ${v.dur}</div></div><button class="play" data-a="noop" aria-label="재생">${'<svg viewBox="0 0 24 24"><path d="M7 4.5v15l12.5-7.5z"/></svg>'}</button></div>`}).join('');
}

/* 키패드 */
let digits='';
function renderDisp(){
  $('#disp').textContent=digits;
  $('#del').classList.toggle('on',!!digits);
}

/* 연락처 상세 */
function openDetail(id){
  const c=byId(id);if(!c)return;
  $('#detail').innerHTML=`<div class="nav"><button data-a="back" style="display:flex;align-items:center;gap:0">${ICON.back}연락처</button><span></span></div>
  <div class="dhead">${av(c,'xl')}<div class="dn">${esc(c.n)}</div></div>
  <div class="acts">
    <div class="act"><i>${ICON.msg}</i>메시지</div>
    <div class="act"><i>${ICON.phone}</i>전화</div>
    <div class="act"><i>${ICON.video}</i>영상</div>
    <div class="act"><i>${ICON.mail}</i>메일</div>
  </div>
  <div class="card">
    <div class="r"><span>휴대전화</span><span class="v">${esc(c.ph)}</span></div>
    <div class="r"><span>메시지</span><span class="v">${esc(c.ph)}</span></div>
  </div>
  <div class="card"><button class="blue">즐겨찾기에 추가</button></div>
  <div class="card"><button class="blue" style="color:#ff3b30">연락처 삭제</button></div>`;
  $('#detail').classList.add('on');
}

/* 탭 */
function showTab(id){
  document.querySelectorAll('.pg').forEach(p=>p.hidden=p.id!==id);
  document.querySelectorAll('.tab').forEach(t=>t.classList.toggle('on',t.dataset.t===id));
  if(id==='pgLog')renderLog();
}

document.addEventListener('click',e=>{
  const t=e.target.closest('[data-t]');if(t){showTab(t.dataset.t);return}
  const b=e.target.closest('[data-a]');if(!b)return;
  const a=b.dataset.a;
  if(a==='detail')openDetail(+b.dataset.id);
  else if(a==='back')$('#detail').classList.remove('on');
  else if(a==='seg'){logMode=b.dataset.v;document.querySelectorAll('.seg button').forEach(x=>x.classList.toggle('on',x===b));renderLog()}
  else if(a==='key'){if(digits.length<20){digits+=b.dataset.d;renderDisp()}}
  else if(a==='del'){digits=digits.slice(0,-1);renderDisp()}
  else if(a==='ring'){$('#inBanner').classList.remove('on');$('#inFull').classList.remove('on')}
});
$('#cq').addEventListener('input',e=>renderCon(e.target.value.trim()));

/* 수신 화면: 기본은 상단 배너, ?lock 이면 잠금 화면 전체 수신 UI */
const incomingTarget=CONTACTS[1];
['bNm','fNm'].forEach(id=>$('#'+id).textContent=incomingTarget.n);
['bAv','fAv'].forEach(id=>{const el=$('#'+id);el.textContent=incomingTarget.n[0];el.style.background=incomingTarget.col});
if(new URLSearchParams(location.search).has('lock'))$('#inFull').classList.add('on');
else setTimeout(()=>$('#inBanner').classList.add('on'),1500);

renderFav();renderCon();renderVm();renderDisp();
})();

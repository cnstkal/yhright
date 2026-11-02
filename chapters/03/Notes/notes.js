'use strict';
(()=>{
const $=s=>document.querySelector(s);
const KEY='ios14-notes-v1';
const DAY=864e5,today=new Date();today.setHours(9,0,0,0);
const ago=(d,h=0)=>today.getTime()-d*DAY+h*36e5;
const SEED=[
  {id:'n1',t:ago(0,1),title:'장보기 목록',body:'우유 2개\n계란 한 판\n식빵\n토마토 4개\n올리브유'},
  {id:'n2',t:ago(0,-7),title:'제주 여행 준비',body:'숙소 예약 확인\n렌터카 보험 확인 — 자차 포함\n\n날씨가 바람이 많다고 해서 얇은 겉옷 챙기기\n\n카메라 배터리 충전',photos:['assets/notes/photo-1.jpg']},
  {id:'n3',t:ago(1,2),title:'주간 회의 메모',body:'1. 지난주 출시 일정 점검\n2. 디자인 시안 피드백 정리\n3. 다음 분기 목표 초안 작성\n\n다음 회의 전까지 각자 항목별 진행 상황을 공유하기로 함.'},
  {id:'n4',t:ago(3,4),title:'산책 사진',body:'공원 산책하면서 찍은 사진.\n날씨가 좋아서 오래 걸었다.',photos:['assets/notes/photo-2.jpg','assets/notes/photo-3.jpg']},
  {id:'n5',t:ago(6,3),title:'읽을 책',body:'· 데이비드 흄 입문서\n· 일의 기쁨과 슬픔\n· 여행의 기술\n\n이번 달에는 두 권 정도 끝내기.'}
];
const load=()=>{try{const s=JSON.parse(localStorage.getItem(KEY));if(s&&s.length)return s}catch(e){}return JSON.parse(JSON.stringify(SEED))};
let N=load();
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(N))}catch(e){}};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const P=n=>String(n).padStart(2,0);
const WK=['일','월','화','수','목','금','토'];
function listDate(t){const d=new Date(t),n=new Date();const days=Math.floor((new Date(n.toDateString())-new Date(d.toDateString()))/DAY);
  if(days===0)return `${d.getHours()<12?'오전':'오후'} ${d.getHours()%12||12}:${P(d.getMinutes())}`;
  if(days===1)return '어제';if(days<7)return WK[d.getDay()]+'요일';return `${d.getFullYear()}. ${d.getMonth()+1}. ${d.getDate()}.`}
function fullDate(t){const d=new Date(t);return `${d.getFullYear()}년 ${d.getMonth()+1}월 ${d.getDate()}일 ${WK[d.getDay()]}요일 ${d.getHours()<12?'오전':'오후'} ${d.getHours()%12||12}:${P(d.getMinutes())}`}
const firstLine=n=>(n.title||n.body||'').split('\n')[0];
const preview=n=>(n.body||'').split('\n').slice(1).join(' ').trim()||(n.title?'':'추가 텍스트 없음');
const sorted=()=>[...N].sort((a,b)=>b.t-a.t);

/* 화면 */
$('#app').innerHTML=`
<section class="view" id="vList">
  <header class="bar"><button class="b muted" data-x>편집</button><span class="c">메모</span><button class="b" data-x aria-label="더보기"><svg viewBox="0 0 24 24" style="stroke-width:1.5"><circle cx="5" cy="12" r="1.6" fill="currentColor"/><circle cx="12" cy="12" r="1.6" fill="currentColor"/><circle cx="19" cy="12" r="1.6" fill="currentColor"/></svg></button></header>
  <div class="ltitle"><h1>메모</h1><p id="cnt"></p></div>
  <div class="list" id="list"></div>
  <footer class="foot"><span></span><button class="new" data-a="new" aria-label="새 메모"><svg viewBox="0 0 24 24"><path d="M14.5 4.5h-7a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-7"/><path d="M18.5 3.5l2 2L12 14l-3 1 1-3z"/></svg></button></footer>
</section>
<section class="view" id="vRead" hidden>
  <header class="bar"><button class="b" data-a="back"><svg viewBox="0 0 24 24"><path d="M15 4l-8 8 8 8"/></svg>메모</button><span class="c" id="rDate" style="font-size:13px;font-weight:400;color:var(--sub)"></span><button class="b dis" aria-label="더보기"><svg viewBox="0 0 24 24"><circle cx="5" cy="12" r="1.6" fill="currentColor"/><circle cx="12" cy="12" r="1.6" fill="currentColor"/><circle cx="19" cy="12" r="1.6" fill="currentColor"/></svg></button></header>
  <div class="rd" id="rBody"></div>
</section>
<section class="view ed" id="vEdit" hidden>
  <header class="bar"><button class="b" data-a="back"><svg viewBox="0 0 24 24"><path d="M15 4l-8 8 8 8"/></svg>메모</button><span class="c" id="eDate" style="font-size:13px;font-weight:400;color:var(--sub)"></span><button class="b dis" aria-label="더보기"><svg viewBox="0 0 24 24"><circle cx="5" cy="12" r="1.6" fill="currentColor"/><circle cx="12" cy="12" r="1.6" fill="currentColor"/><circle cx="19" cy="12" r="1.6" fill="currentColor"/></svg></button></header>
  <div class="rd"><textarea class="ttl" id="eTitle" rows="1" placeholder="제목" maxlength="120"></textarea><textarea class="body" id="eBody" placeholder="메모 작성"></textarea></div>
</section>`;

/* 목록 */
function renderList(){
  const L=sorted();
  $('#cnt').textContent=`${L.length}개의 메모`;
  $('#list').innerHTML=L.map(n=>`<div class="nrow" data-id="${n.id}"><div class="tx"><div class="t">${esc(firstLine(n)||'새로운 메모')}</div><div class="s"><span class="d dt">${listDate(n.t)}</span><span class="p" style="display:inline;-webkit-line-clamp:1">${esc(preview(n))}</span></div></div>${n.photos&&n.photos.length?`<img class="th" src="${esc(n.photos[0])}" alt="">`:''}</div>`).join('');
}
const showView=id=>{['vList','vRead','vEdit'].forEach(v=>$('#'+v).hidden=v!==id)};
let cur=null;

/* 보기 */
function openRead(id){
  const n=N.find(x=>x.id===id);if(!n)return;cur=n;
  $('#rDate').textContent=fullDate(n.t);
  const lines=(n.body||'').split('\n');
  const photos=n.photos||[];
  let html=`<h1 class="ttlv">${esc(n.title||'')}</h1>`;
  // 사진은 본문 중간 단락 사이에 원본 비율로 삽입
  const pieces=[];
  const bodyParts=(n.body||'').split(/\n\n+/);
  bodyParts.forEach((p,i)=>{pieces.push(`<p class="pre">${esc(p)}</p>`);if(photos[i])pieces.push(`<img class="pimg" src="${esc(photos[i])}" alt="">`)});
  photos.slice(bodyParts.length).forEach(src=>pieces.push(`<img class="pimg" src="${esc(src)}" alt="">`));
  $('#rBody').innerHTML=html+pieces.join('');
  $('#rBody').scrollTop=0;
  showView('vRead');
}

/* 편집: 제목과 본문 자동 저장 */
function openEdit(n){
  cur=n;
  $('#eDate').textContent=fullDate(n.t);
  $('#eTitle').value=n.title||'';
  $('#eBody').value=n.body||'';
  showView('vEdit');
  setTimeout(()=>{fit($('#eTitle'));fit($('#eBody'));$('#eBody').focus({preventScroll:true})},30);
}
function fit(el){el.style.height='auto';el.style.height=el.scrollHeight+'px'}
function newNote(){
  const n={id:'n'+Date.now(),t:Date.now(),title:'',body:'',photos:[]};
  N.push(n);save();openEdit(n);
}
function onEdit(){
  if(!cur)return;
  cur.title=$('#eTitle').value;cur.body=$('#eBody').value;cur.t=Date.now();
  save();fit($('#eTitle'));fit($('#eBody'));
}

/* 이벤트 */
document.addEventListener('click',e=>{
  if(e.target.closest('[data-x]'))return;
  const row=e.target.closest('.nrow');
  if(row&&!$('#vList').hidden){openRead(row.dataset.id);return}
  const b=e.target.closest('[data-a]');if(!b)return;
  const a=b.dataset.a;
  if(a==='new'){newNote()}
  else if(a==='back'){
    if(!$('#vEdit').hidden){renderList();showView('vList');cur=null;return}
    if(!$('#vRead').hidden){showView('vList');cur=null;renderList()}
  }
});
$('#app').addEventListener('click',e=>{
  // 읽기 화면의 본문을 누르면 편집 화면으로 이동 (작성 중인 메모 수정)
  const r=e.target.closest('#vRead .rd');if(!r||!cur)return;
  openEdit(cur);
});
$('#eTitle').addEventListener('input',onEdit);
$('#eBody').addEventListener('input',onEdit);

renderList();showView('vList');
})();

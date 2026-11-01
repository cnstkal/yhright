(()=>{
const $=s=>document.querySelector(s),app=$('#app'),q=$('#q'),ed=$('#ed');
const H=36e5,D=24*H,KEY='memo-app-v1';
const FOLDER='<svg class="ic" viewBox="0 0 32 32" style="stroke-width:1.9"><path d="M3.5 9.5a2.5 2.5 0 0 1 2.5-2.5h5l2.5 2.5H26a2.5 2.5 0 0 1 2.5 2.5v11a2.5 2.5 0 0 1-2.5 2.5H6a2.5 2.5 0 0 1-2.5-2.5zM3.5 12.5h25"/></svg>';
const TRASH='<svg class="ic" viewBox="0 0 32 32" style="stroke-width:1.9"><path d="M5 8.5h22M12 8.5V5.5h8v3M7.5 8.5l1.2 18a2 2 0 0 0 2 1.9h10.6a2 2 0 0 0 2-1.9l1.2-18M13 13v10M16 13v10M19 13v10"/></svg>';
const CH='<svg class="ch" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>';
const now=Date.now();
const seed=[
 ['아침 루틴 정리\n기상 후 물 한 잔, 스트레칭 10분, 간단한 아침 식사 후 오늘 할 일 확인',2*H],
 ['장보기 목록\n우유, 계란, 식빵, 바나나, 방울토마토, 올리브유',30*H],
 ['주말 계획\n토요일 오전 러닝 후 브런치, 오후에는 동네 전시회 구경하기',34*H],
 ['독서 노트 - 습관의 힘\n신호, 반복 행동, 보상의 고리를 이해하면 작은 습관부터 바꿀 수 있다',3*D],
 ['회의 준비\n다음 주 월요일 오전 10시 프로젝트 점검 회의, 진행 상황 3줄로 요약해 가기',4*D+3*H],
 ['영화 보고 싶은 목록\n잔잔한 가족 영화, 여름 배경의 청춘 영화, 오래된 흑백 고전 한 편',6*D],
 ['여행 짐 체크\n충전기, 보조배터리, 우산, 세면도구, 편한 신발, 여권 사본',9*D],
 ['레시피 메모\n토마토 파스타: 마늘 먼저 볶고 토마토 소스 졸이기, 면수는 한 국자 남겨두기',13*D],
 ['운동 기록\n스쿼트 3세트, 플랭크 1분씩 3회, 가볍게 걷기 30분',18*D],
 ['선물 아이디어\n부모님 생신 선물로 따뜻한 목도리나 마사지기, 예산은 10만 원 이내',24*D],
 ['여름 휴가 후보지\n바다가 보이는 조용한 숙소, 기차로 이동 가능한 곳 위주로 찾아보기',58*D],
 ['올해 목표\n매달 책 두 권 읽기, 주 3회 운동하기, 새로운 취미 하나 시작하기',140*D],
 ['좋아하는 문장 모음\n작은 걸음도 계속 걸으면 어디든 닿는다',420*D],
 ['지난 계획 - 이사 정리\n전입신고, 인터넷 이전 신청, 우편물 주소 변경 확인',470*D]
].map((s,i)=>({id:'n'+i,text:s[0],t:now-s[1],del:false}));
[['오래된 임시 메모\n더 이상 필요 없는 임시 문구',20*D],['삭제한 목록\n지난주에 정리한 할 일 목록',8*D],['예전 아이디어\n쓰지 않기로 한 아이디어 초안',40*D]].forEach((s,i)=>seed.push({id:'d'+i,text:s[0],t:now-s[1],del:true}));
let notes;
try{notes=JSON.parse(localStorage.getItem(KEY))}catch(e){}
if(!Array.isArray(notes))notes=seed;
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(notes))}catch(e){}};
let folder='memo',cur=null,from='f';
const esc=s=>s.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const lines=n=>n.text.split('\n').map(x=>x.trim()).filter(Boolean);
const title=n=>lines(n)[0]||'새로운 메모';
const prev=n=>lines(n)[1]||'추가 텍스트 없음';
const live=()=>notes.filter(n=>!n.del);
const inFolder=f=>f==='trash'?notes.filter(n=>n.del):live();
const day0=t=>{const d=new Date(t);d.setHours(0,0,0,0);return d.getTime()};
const diff=t=>Math.round((day0(now)-day0(t))/D);
const WD=['일요일','월요일','화요일','수요일','목요일','금요일','토요일'];
function label(t){
  const d=diff(t),x=new Date(t);
  if(d<=0){const h=x.getHours();return (h<12?'오전 ':'오후 ')+(h%12||12)+':'+String(x.getMinutes()).padStart(2,'0')}
  if(d===1)return'어제';
  if(d<=7)return WD[x.getDay()];
  return x.getFullYear()+'. '+(x.getMonth()+1)+'. '+x.getDate()+'.';
}
function group(t){
  const d=diff(t),x=new Date(t);
  if(d<=0)return'오늘';if(d===1)return'어제';if(d<=7)return'이전 7일';if(d<=30)return'이전 30일';
  return x.getFullYear()===new Date(now).getFullYear()?(x.getMonth()+1)+'월':x.getFullYear()+'년';
}
function go(s){app.dataset.s=s}
function renderFolders(){
  const rows=[['all',FOLDER,'모든 나의 iPhone',live().length],['memo',FOLDER,'메모',live().length],['trash',TRASH,'최근 삭제된 항목',notes.filter(n=>n.del).length]];
  $('#fl').innerHTML=rows.map(r=>`<button class="fr" data-f="${r[0]}">${r[1]}<span class="nm">${r[2]}</span><span class="n">${r[3]}</span>${CH}</button>`).join('');
}
function renderList(){
  const k=q.value.trim().toLowerCase();
  const fname=folder==='all'?'모든 나의 iPhone':folder==='trash'?'최근 삭제된 항목':'메모';
  let a=inFolder(folder).filter(n=>!k||n.text.toLowerCase().includes(k)).sort((x,y)=>y.t-x.t);
  let h=`<h1>${fname}</h1><div class="cnt">${a.length}개의 메모</div>`;
  if(!a.length)h+='<div class="emp">메모 없음</div>';
  let g=null;
  a.forEach(n=>{
    const gn=group(n.t);
    if(gn!==g){if(g!==null)h+='</div>';h+=`<h2>${gn}</h2><div class="card">`;g=gn}
    h+=`<button class="nr" data-id="${n.id}"><b>${esc(title(n))}</b><span><i>${label(n.t)}</i>${esc(prev(n))}</span></button>`;
  });
  if(g!==null)h+='</div>';
  $('#ls').innerHTML=h;
}
function openList(f){folder=f;renderList();go('l')}
function openNote(id,focus){
  const n=notes.find(x=>x.id===id);if(!n)return;
  from=app.dataset.s==='e'?from:app.dataset.s;cur=n;ed.value=n.text;go('e');
  if(focus)setTimeout(()=>ed.focus(),30);else ed.blur();
}
function closeNote(){
  if(cur&&!cur.text.trim()){notes=notes.filter(n=>n!==cur);save()}
  cur=null;ed.blur();
  renderFolders();if(from==='f')go('f');else{renderList();go('l')}
}
function newNote(){
  if(cur&&!cur.text.trim()){ed.focus();return}
  const n={id:'n'+now+Math.random().toString(36).slice(2,6),text:'',t:Date.now(),del:false};
  notes.push(n);save();
  if(app.dataset.s==='f'){from='f';if(folder==='trash')folder='memo'}
  else if(folder==='trash'&&app.dataset.s==='l')folder='memo';
  openNote(n.id,true);
}
$('#fl').addEventListener('click',e=>{const b=e.target.closest('[data-f]');if(b){q.value='';openList(b.dataset.f)}});
$('#ls').addEventListener('click',e=>{const b=e.target.closest('[data-id]');if(b){from='l';openNote(b.dataset.id)}});
$('#lb').addEventListener('click',()=>{q.value='';q.blur();renderFolders();go('f')});
$('#eb').addEventListener('click',closeNote);
document.querySelectorAll('[data-new]').forEach(b=>b.addEventListener('click',newNote));
q.addEventListener('input',()=>{
  if(app.dataset.s==='f'){if(q.value.trim()){folder='all';renderList();go('l')}}
  else renderList();
});
ed.addEventListener('input',()=>{if(cur){cur.text=ed.value;cur.t=Date.now();save()}});
renderFolders();
})();

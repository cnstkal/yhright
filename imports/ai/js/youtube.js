/* ============ 아이콘 ============ */
const I={
 home:(f)=>`<svg width="26" height="26" viewBox="0 0 24 24" fill="${f?'#0f0f0f':'none'}" stroke="#0f0f0f" stroke-width="1.8" stroke-linejoin="round"><path d="M4 11l8-7 8 7v9h-5v-6H9v6H4z"/></svg>`,
 shorts:`<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0f0f0f" stroke-width="1.8" stroke-linejoin="round"><path d="M10 3.5c1.5-1 3.5-.5 4.5 1l.7 1.2 1.3.7c1.7.9 2.2 3 1.2 4.6-.4.6-1 1.1-1.7 1.3l.8 1.3c.9 1.6.4 3.6-1.2 4.5l-4.5 2.6c-1.5 1-3.5.5-4.5-1-.9-1.6-.4-3.6 1.2-4.5l.4-.2c-1.7-.9-2.3-3-1.3-4.6.4-.7 1-1.1 1.7-1.3l-.8-1.3c-1-1.6-.4-3.6 1.3-4.4z"/><path d="M10 9.5v5l4-2.5z" fill="#0f0f0f"/></svg>`,
 plus:`<svg width="30" height="30" viewBox="0 0 24 24" stroke="#0f0f0f" stroke-width="1.8" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>`,
 subs:`<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0f0f0f" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round"><path d="M7 4h10M5 7.5h14"/><rect x="3.5" y="10" width="17" height="10" rx="2"/><path d="M10.5 12.5v5l4-2.5z" fill="#0f0f0f"/></svg>`,
 more:`<svg width="22" height="22" viewBox="0 0 24 24" fill="#0f0f0f"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>`,
 up:`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0f0f0f" stroke-width="1.7" stroke-linejoin="round"><path d="M7 10v10H4V10zM7 10l4-7c1.5 0 2.5 1 2.5 2.5L13 9h6c1.3 0 2.2 1.2 1.9 2.4l-1.7 7.5c-.2.7-.9 1.1-1.6 1.1H7"/></svg>`,
 dn:`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0f0f0f" stroke-width="1.7" stroke-linejoin="round" style="transform:scaleX(-1) scaleY(-1)"><path d="M7 10v10H4V10zM7 10l4-7c1.5 0 2.5 1 2.5 2.5L13 9h6c1.3 0 2.2 1.2 1.9 2.4l-1.7 7.5c-.2.7-.9 1.1-1.6 1.1H7"/></svg>`,
 share:`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0f0f0f" stroke-width="1.7" stroke-linejoin="round"><path d="M14 4l7 7-7 7v-4c-5 0-8 1.5-10 5 .5-6 3.5-10 10-10z"/></svg>`,
 spark:`<svg width="24" height="24" viewBox="0 0 24 24" fill="#0f0f0f"><path d="M12 2c.8 5 3 7.2 8 8-5 .8-7.2 3-8 8-.8-5-3-7.2-8-8 5-.8 7.2-3 8-8z"/></svg>`,
 reply:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0f0f0f" stroke-width="1.8" stroke-linejoin="round"><path d="M4 4h16v12H9l-5 4z"/><path d="M8 8.5h8M8 12h5" stroke-linecap="round"/></svg>`,
 play:`<svg width="30" height="30" viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z"/></svg>`,
 pause:`<svg width="30" height="30" viewBox="0 0 24 24" fill="#fff"><rect x="6" y="5" width="4.5" height="14" rx="1"/><rect x="13.5" y="5" width="4.5" height="14" rx="1"/></svg>`,
 vol:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9v6h4l5 4V5L8 9z" fill="#fff"/><path d="M16.5 8.5a5 5 0 010 7"/></svg>`,
 mut:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9v6h4l5 4V5L8 9z" fill="#fff"/><path d="M17 9l5 6M22 9l-5 6"/></svg>`,
 cc:(on)=>`<svg width="20" height="20" viewBox="0 0 24 24" fill="${on?'#fff':'none'}" stroke="#fff" stroke-width="2" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M7.5 10.5h2.5M7.5 14h2.5M13.5 10.5H16M13.5 14H16" stroke="${on?'#000':'#fff'}"/></svg>`,
 compass:`<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0f0f0f" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z" stroke-linejoin="round"/></svg>`,
 chev:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0f0f0f" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>`,
 down:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0f0f0f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 9l7 7 7-7"/></svg>`
};
const $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const fmt=n=>n>=10000?(n/10000>=10?Math.round(n/10000):(Math.round(n/1000)/10))+'만':n>=1000?(Math.round(n/100)/10)+'천':String(n);
const agoTxt=m=>m<60?m+'분 전':m<1440?Math.floor(m/60)+'시간 전':Math.floor(m/1440)+'일 전';
const dtxt=s=>Math.floor(s/60)+':'+String(Math.floor(s%60)).padStart(2,'0');

/* ============ 샘플 데이터 (모두 가상) ============ */
const CH={
 a:{n:'오늘의 게임창고',c:'#6d4fd6',t:'G'},
 b:{n:'말랑 스튜디오',c:'#e5603d',t:'말'},
 c:{n:'밤산책 라디오',c:'#2f8f83',t:'밤'},
 d:{n:'요리하는 곰',c:'#c2410c',t:'곰'},
 e:{n:'코딩하는 오리',c:'#1e6fd9',t:'오'},
 f:{n:'주말 캠핑로그',c:'#4b7a2a',t:'캠'}
};
const VIDS=[
{id:'v1',ch:'a',title:'스타워즈 신작 리뷰, 솔직하게 말해볼게요',t:'스타워즈\n리뷰',g:['#1d2b53','#7e8fd1'],dur:912,views:152000,ago:720,likes:6100,sub:'구독자 38만명',tag:'#스타워즈 #리뷰',desc:'스타워즈 신작 솔직 리뷰 (샘플 데이터입니다)'},
{id:'v2',ch:'b',title:'ATEEZ 무대 영상',t:'ATEEZ\n무대',g:['#ff8fab','#5b3fa0'],dur:248,views:980000,ago:300,likes:52000,sub:'구독자 120만명',tag:'#ATEEZ #무대',desc:'에이티즈 무대 영상 (샘플 데이터입니다)'},
 {id:'v3',ch:'c',title:'비 오는 날 듣기 좋은 로파이 플레이리스트 2시간',t:'rainy\nlofi',g:['#5b7c99','#1f2f3f'],dur:7240,views:54000,ago:4320,likes:2100,sub:'구독자 9.4만명',tag:'#로파이',desc:'비 오는 밤에 어울리는 잔잔한 곡 모음.'},
{id:'v4',ch:'a',title:'ATEEZ 페스티벌 무대 모음',t:'ATEEZ\n직캠',g:['#f4d35e','#7b2cbf'],dur:655,views:430000,ago:2880,likes:21000,sub:'구독자 38만명',tag:'#ATEEZ #직캠',desc:'에이티즈 페스티벌 무대 모음 (샘플 데이터입니다)'}
];
const SEED_C={
 v1:[
  ['@le_f0000',['#111','#000'],1320,4400,'이 게임 아직도 서비스한다는 게 안 믿김 끝까지 해줘…',[['@요한-f2c',200,82,'돈이 되는데 과연 끝까지 할까'],['@eianson-l3h',1240,154,'처음엔 반응 없으면 접는다고 했는데 이렇게 반응 좋은데 계속 하지 않을까요? 제발 계속 해줬으면 ㅠ'],['@숙숙-v2m',1320,9,'ㅋㅋㅋ 저도 같은 생각']]],
  ['@hjle0401',['#6aa84f','#38761d'],1080,2200,'ㅈㅅ합니다만 초등교사인데 우리반 애들 보는 줄 알았어요… 이번편은 재출근한 기분…',[['@마루-a1',1000,40,'선생님 힘내세요'],['@kiki77',900,12,'ㅋㅋㅋㅋ']]],
  ['@seoyunjung9431',['#8e44ad','#5b2c83'],1140,870,'편집 센스가 점점 늘고 있어요 이번 화 최고',[]],
  ['@mina_diary',['#e67e22','#a04000'],600,310,'옛날 생각나서 괜히 울컥했다',[]]
 ],
 v2:[
  ['@jin_ho',['#2c3e50','#111'],700,5200,'이 조합은 진짜 반칙이다 ㅋㅋㅋㅋ',[['@tomtom',650,33,'인정합니다'],['@하늘이',500,5,'다음 편도 제발']]],
  ['@sora.k',['#c0392b','#7b241c'],980,1800,'후반부 엔딩 자막에서 터졌네요',[]],
  ['@낮잠러',['#16a085','#0e6655'],2000,420,'유치함의 끝을 보여줬다',[]]
 ],
 v3:[
  ['@rain_note',['#34495e','#1b2631'],4000,640,'공부할 때 틀어놓고 있어요. 감사합니다',[]],
  ['@night_owl',['#7d3c98','#512e5f'],3000,210,'3번째 곡 제목 아시는 분?',[['@lofi_fan',2500,8,'설명란에 트랙리스트 있어요']]]
 ],
 v4:[
  ['@요리초보',['#d35400','#873600'],2200,1500,'오늘 저녁으로 해먹었는데 대성공이에요!',[]],
  ['@mom_kitchen',['#27ae60','#145a32'],1800,740,'간장 비율 알려주셔서 감사합니다',[['@곰곰',1500,22,'다음엔 계량 영상도 올릴게요']]]
 ],
 v5:[
  ['@dev_sun',['#2980b9','#1a5276'],5000,430,'프레임워크 없이도 이렇게 되네요. 코드 공유 부탁드려요',[]],
  ['@frontend_kim',['#8e44ad','#4a235a'],3500,190,'상태 관리 부분이 특히 도움됐습니다',[]]
 ],
 v6:[
  ['@camp_loverr',['#556b2f','#2f3b19'],6000,980,'단풍 색감이 너무 좋아요 어디인가요?',[['@주말캠퍼',5500,14,'영상 설명란에 장소 적어뒀어요']]],
  ['@야영러',['#b9770e','#7e5109'],5000,260,'혼캠 부럽네요 ㅠㅠ',[]]
 ]
};
const CAPS=['안녕하세요, 오늘도 와주셨네요','이 장면은 샘플 자막입니다','실제 영상이 아닌 시뮬레이션이에요','끝까지 시청해 주셔서 감사합니다'];

/* ============ 상태 ============ */
const K='yt_sim_v1';
function seed(){
  const S={lk:{},sub:{},cl:{},cm:{},rp:{},prog:{},n:1};
  for(const v in SEED_C){
    S.cm[v]=SEED_C[v].map((c,i)=>({id:v+'c'+i,u:c[0],col:c[1],ago:c[2],lk:c[3],tx:c[4]}));
    SEED_C[v].forEach((c,i)=>{S.rp[v+'c'+i]=c[5].map((r,j)=>({id:v+'c'+i+'r'+j,u:r[0],ago:r[1],lk:r[2],tx:r[3],col:['#8e44ad','#2e86c1']}));});
  }
  return S;
}
let S;try{S=JSON.parse(localStorage.getItem(K))}catch(e){}if(!S||!S.cm)S=seed();
const save=()=>{try{localStorage.setItem(K,JSON.stringify(S))}catch(e){toast('저장 공간이 부족합니다')}};
function toast(t){const e=$('#toast');e.textContent=t;e.classList.add('on');clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.remove('on'),1600)}
const soon=name=>toast(name+' 화면은 아직 지원하지 않아요');

/* ============ 공통 조각 ============ */
const avatar=(ch,sz)=>`<span class="av" style="width:${sz}px;height:${sz}px;font-size:${sz*.42}px;background:${CH[ch].c}">${esc(CH[ch].t)}</span>`;
const userAv=(col,sz,u)=>`<span class="av" style="width:${sz}px;height:${sz}px;font-size:${sz*.45}px;background:linear-gradient(135deg,${col[0]},${col[1]})">${esc((u.replace('@','')[0]||'?').toUpperCase())}</span>`;
const thumb=(v,full)=>`<div class="th" data-v="${v.id}" style="background:linear-gradient(135deg,${v.g[0]},${v.g[1]})">
  <div class="tt">${esc(v.t).replace(/\n/g,'<br>')}</div>
  ${v.promo&&!full?'':''}<span class="dur">${dtxt(v.dur)}</span>
  ${(S.prog[v.id]||v.prog)?`<div class="prog"><i style="width:${Math.round((S.prog[v.id]||v.prog)*100)}%"></i></div>`:''}</div>`;

/* ============ 홈 ============ */
const CATS=['전체','게임','음악','믹스','스케치 코미디','요리','캠핑'];
let cat='전체';
function renderChips(){
  $('#chips').innerHTML=`<button class="chip" id="cmp" style="padding:0 14px;background:#f2f2f2" aria-label="탐색">${I.compass}</button>`+CATS.map(c=>`<button class="chip${c===cat?' on':''}" data-c="${c}">${c}</button>`).join('');
  $('#cmp').onclick=()=>soon('탐색');
  document.querySelectorAll('[data-c]').forEach(b=>b.onclick=()=>{cat=b.dataset.c;renderChips();renderFeed();$('#feed').scrollTop=0});
}
const CATMAP={게임:['a'],음악:['c'],믹스:['c','b'],'스케치 코미디':['b'],요리:['d'],캠핑:['f']};
function renderFeed(){
  const list=VIDS.filter(v=>cat==='전체'||(CATMAP[cat]||[]).includes(v.ch));
  $('#feed').innerHTML=list.length?list.map(v=>`<div class="vid">${thumb(v)}
   <div class="meta" data-v="${v.id}">${avatar(v.ch,36)}<div class="tx"><b>${esc(v.title)}</b><small>${esc(CH[v.ch].n)} · 조회수 ${fmt(v.views)}회 · ${agoTxt(v.ago)}</small></div><button class="more" data-m="${v.id}" aria-label="더보기">${I.more}</button></div>
   ${v.shop?`<div class="shop"><span class="av" style="width:22px;height:22px;border-radius:4px;background:#8aa65a"></span>${esc(v.shop)}<span class="sp"></span>${I.down}</div>`:''}</div>`).join(''):'<div style="padding:60px 20px;text-align:center;color:#606060">이 카테고리의 샘플 영상이 없어요</div>';
  document.querySelectorAll('#feed .th,#feed .meta').forEach(e=>e.onclick=ev=>{if(ev.target.closest('[data-m]'))return;openWatch(e.dataset.v)});
  document.querySelectorAll('[data-m]').forEach(b=>b.onclick=()=>openMenu(b.dataset.m));
}
function renderNav(){
  const items=[['home',I.home(true),1],['shorts',I.shorts,0],['mk',I.plus,0],['subs',I.subs,0],['you',`<span class="av" style="width:30px;height:30px;background:linear-gradient(135deg,#d9a066,#8a5a2b);font-size:13px">나</span>`,0]];
  $('#nav').innerHTML=items.map(([k,ic,on])=>`<button class="${on?'on':''}${k==='mk'?' mk':''}" data-n="${k}" aria-label="${k}">${ic}${k==='subs'?'<i class="rd"></i>':''}</button>`).join('');
  const names={shorts:'Shorts',mk:'만들기',subs:'구독',you:'내 페이지'};
  document.querySelectorAll('[data-n]').forEach(b=>b.onclick=()=>{if(b.dataset.n==='home'){$('#feed').scrollTo({top:0,behavior:'smooth'})}else soon(names[b.dataset.n])});
}
$('#bell').onclick=()=>{$('#bdg').style.display='none';soon('알림')};
$('#srch').onclick=()=>soon('검색');

/* 더보기 메뉴 (홈/추천 공통) */
function openMenu(id){
  const v=VIDS.find(x=>x.id===id);
  $('#mb').innerHTML=`<button data-a="save">나중에 볼 동영상에 저장</button><button data-a="nint">관심 없음</button><button data-a="close">닫기</button>`;
  $('#menu').classList.add('on');
  $('#mb').querySelectorAll('button').forEach(b=>b.onclick=()=>{
    $('#menu').classList.remove('on');
    if(b.dataset.a==='nint'){hidden.add(id);renderFeed();renderRelated()}
    else if(b.dataset.a==='save')soon('보관함');
  });
}
const hidden=new Set();
$('#menu').onclick=e=>{if(e.target.id==='menu')$('#menu').classList.remove('on')};

/* ============ 재생 ============ */
let cur=null,playing=false,t=0,timer=null,muted=false,ccOn=false,ctlT=null;
function openWatch(id){
  cur=VIDS.find(v=>v.id===id);
  t=(S.prog[id]||cur.prog||0)*cur.dur;
  $('#watch').classList.add('on');
  $('#pv').style.background=`linear-gradient(135deg,${cur.g[0]},${cur.g[1]})`;
  $('#pv').innerHTML=`<div class="tt">${esc(cur.t).replace(/\n/g,'<br>')}</div>`;
  $('#promo').style.display=cur.promo?'block':'none';
  closeSheet(true);
  renderInfo();renderRelated();updPlayer();setPlay(true);
  $('#wbody').scrollTop=0;
}
function closeWatch(){
  setPlay(false);
  if(cur){S.prog[cur.id]=Math.min(.999,t/cur.dur);save()}
  $('#watch').classList.remove('on');closeSheet(true);renderFeed();cur=null;
}
$('#wback').onclick=e=>{e.stopPropagation();closeWatch()};
function setPlay(p){
  playing=p;clearInterval(timer);
  if(p)timer=setInterval(()=>{t+=1;if(t>=cur.dur){t=cur.dur;setPlay(false)}updPlayer()},1000);
  updPlayer();
  if(p)hideCtl(1800);else showCtl();
}
function updPlayer(){
  if(!cur)return;
  const r=t/cur.dur*100;
  $('#fl').style.width=r+'%';$('#kn').style.left=r+'%';$('#mini').style.width=r+'%';
  $('#tm').textContent=dtxt(t)+' / '+dtxt(cur.dur);
  $('#pp').innerHTML=playing?I.pause:(t>=cur.dur?'<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12a8 8 0 108-8H8"/><path d="M11 1L8 4l3 3"/></svg>':I.play);
  $('#mute').innerHTML=muted?I.mut:I.vol;
  $('#ccb').innerHTML=I.cc(ccOn);
  const cap=$('#cap');cap.textContent=CAPS[Math.floor(t/4)%CAPS.length];
  cap.classList.toggle('on',ccOn&&playing);
  $('#pv').style.filter=playing?'none':'brightness(.85)';
}
function showCtl(){$('#ctl').classList.add('on');clearTimeout(ctlT)}
function hideCtl(ms){clearTimeout(ctlT);ctlT=setTimeout(()=>{if(playing)$('#ctl').classList.remove('on')},ms)}
$('#player').onclick=e=>{
  if(e.target.closest('button')||e.target.closest('#seek'))return;
  if($('#ctl').classList.contains('on')){if(playing)$('#ctl').classList.remove('on');else showCtl()}else{showCtl();hideCtl(2500)}
};
$('#pp').onclick=e=>{e.stopPropagation();if(t>=cur.dur)t=0;setPlay(!playing)};
$('#mute').onclick=e=>{e.stopPropagation();muted=!muted;updPlayer();toast(muted?'음소거':'음소거 해제')};
$('#ccb').onclick=e=>{e.stopPropagation();ccOn=!ccOn;updPlayer();toast(ccOn?'자막 켜짐 (샘플 자막)':'자막 꺼짐')};
function seekTo(ev){const r=$('#seek').getBoundingClientRect();const x=(ev.touches?ev.touches[0].clientX:ev.clientX)-r.left;t=Math.max(0,Math.min(1,x/r.width))*cur.dur;updPlayer()}
$('#seek').addEventListener('pointerdown',e=>{e.stopPropagation();seekTo(e);const mv=ev=>seekTo(ev),up=()=>{removeEventListener('pointermove',mv);removeEventListener('pointerup',up)};addEventListener('pointermove',mv);addEventListener('pointerup',up)});

/* ============ 영상 정보 ============ */
const vState=v=>S.lk[v.id]||0;
function likeCount(v){return v.likes+(vState(v)===1?1:0)}
function renderInfo(){
  const v=cur,st=vState(v),sb=!!S.sub[v.ch],cc=(S.cm[v.id]||[]).length+Object.entries(S.rp).filter(([k])=>k.startsWith(v.id+'c')).reduce((a,[,x])=>a+x.length,0);
  $('#wbody').innerHTML=`
   <div class="vt">${esc(v.title)}</div>
   <div class="vs"><span><b>${esc(CH[v.ch].n)}</b></span><span>좋아요 ${fmt(likeCount(v))}개</span><span>조회수 ${fmt(v.views)}회</span><span>${agoTxt(v.ago)}</span><span>${esc(v.tag.split(' ')[0])}</span><button class="mr" id="mr">${S.exp?'접기':'더보기'}</button></div>
   ${S.exp?`<div class="desc">${esc(v.desc)}\n\n${esc(v.tag)}</div>`:''}
   <div class="ar">${avatar(v.ch,36)}<button class="sub${sb?' on':''}" id="sub">${sb?'구독중':'구독'}</button><span class="sp"></span>
     <button class="ab${st===1?' on':''}" id="lk" aria-label="좋아요">${st===1?I.up.replace('fill="none"','fill="#0f0f0f"'):I.up}</button>
     <button class="ab${st===-1?' on':''}" id="dl" aria-label="싫어요">${st===-1?I.dn.replace('fill="none"','fill="#0f0f0f"'):I.dn}</button>
     <button class="ab" id="sh" aria-label="공유">${I.share}</button>
     <button class="ab" id="ai" aria-label="추가 기능">${I.spark}</button>
     <button class="ab" id="mo" aria-label="더보기">${I.more}</button></div>
   <button class="cc" id="cc"><div class="h"><div>댓글<span>${fmt(cc)}</span></div><div class="dots"><i></i><i></i><i></i></div></div>
     ${previewRow(v)}</button>
   <div style="height:18px"></div><div id="rel"></div>`;
  $('#mr').onclick=()=>{S.exp=!S.exp;renderInfo()};
  $('#sub').onclick=()=>{S.sub[v.ch]=!S.sub[v.ch];save();renderInfo();toast(S.sub[v.ch]?'구독했습니다':'구독을 취소했습니다')};
  $('#lk').onclick=()=>{S.lk[v.id]=st===1?0:1;save();renderInfo()};
  $('#dl').onclick=()=>{S.lk[v.id]=st===-1?0:-1;save();renderInfo()};
  $('#sh').onclick=async()=>{try{if(navigator.share){await navigator.share({title:v.title,text:v.title})}else{await navigator.clipboard.writeText(v.title);toast('제목을 복사했어요')}}catch(e){}};
  $('#ai').onclick=()=>soon('AI 기능');
  $('#mo').onclick=()=>openMenu(v.id);
  $('#cc').onclick=openSheet;
  renderRelated();
}
function previewRow(v){
  const top=sorted(v.id,'pop')[0];
  return top?`<div class="p">${userAv(top.col,26,top.u)}<span>${esc(top.tx)}</span></div>`:`<div class="p gray">첫 댓글을 남겨보세요</div>`;
}
function renderRelated(){
  const box=$('#rel');if(!box||!cur)return;
  box.innerHTML=VIDS.filter(x=>x.id!==cur.id&&!hidden.has(x.id)).map(v=>`<div class="vid">${thumb(v)}
   <div class="meta" data-v="${v.id}">${avatar(v.ch,36)}<div class="tx"><b>${esc(v.title)}</b><small>${esc(CH[v.ch].n)} · 조회수 ${fmt(v.views)}회 · ${agoTxt(v.ago)}</small></div><button class="more" data-m="${v.id}" aria-label="더보기">${I.more}</button></div></div>`).join('');
  box.querySelectorAll('.th,.meta').forEach(e=>e.onclick=ev=>{if(ev.target.closest('[data-m]'))return;if(cur){S.prog[cur.id]=Math.min(.999,t/cur.dur)}openWatch(e.dataset.v)});
  box.querySelectorAll('[data-m]').forEach(b=>b.onclick=()=>openMenu(b.dataset.m));
}

/* ============ 댓글 시트 ============ */
let sort='pop',openC=null;
function sorted(vid,mode){
  const a=(S.cm[vid]||[]).slice();
  const lk=c=>c.lk+(S.cl[c.id]===1?1:0);
  if(mode==='pop')a.sort((x,y)=>lk(y)-lk(x));
  else if(mode==='old')a.sort((x,y)=>y.ago-x.ago);
  else a.sort((x,y)=>x.ago-y.ago);
  return a;
}
function openSheet(){$('#sheet').classList.add('on');showPane('c');renderSheet()}
function closeSheet(quiet){
  $('#sheet').classList.remove('on');openC=null;
  if(!quiet&&cur)renderInfoKeepScroll();
}
function renderInfoKeepScroll(){const y=$('#wbody').scrollTop;renderInfo();$('#wbody').scrollTop=y}
function showPane(p){$('#p-c').classList.toggle('on',p==='c');$('#p-r').classList.toggle('on',p==='r')}
$('#cx').onclick=()=>closeSheet();
$('#rx').onclick=()=>closeSheet();
$('#rb').onclick=()=>{openC=null;showPane('c');renderSheet()};
$('#info').onclick=()=>toast('댓글은 샘플 데이터이며 이 기기에만 저장됩니다');
const SORTS=[['pop','인기순'],['old','시간순'],['new','최신순']];
function actions(c,kind){
  const st=S.cl[c.id]||0,n=c.lk+(st===1?1:0);
  return `<div class="ac"><button data-l="${c.id}" class="${st===1?'on':''}" aria-label="좋아요">${st===1?I.up.replace('fill="none"','fill="#0f0f0f"'):I.up}<span>${n?fmt(n):''}</span></button>
   <button data-d="${c.id}" class="${st===-1?'on':''}" aria-label="싫어요">${st===-1?I.dn.replace('fill="none"','fill="#0f0f0f"'):I.dn}</button>
   <button class="rp" data-r="${c.id}" aria-label="답글">${I.reply}</button></div>`;
}
function cmHtml(c,opt={}){
  const rc=(S.rp[c.id]||[]).length;
  return `<div class="cm${opt.thread?' thread':''}">${userAv(c.col,opt.sm?26:36,c.u)}<div class="bd">
   <div class="hh"><b>${esc(c.u)}</b>&nbsp;·&nbsp;${agoTxt(c.ago)}<button class="m" data-cm="${c.id}" aria-label="더보기">${I.more}</button></div>
   <p>${esc(c.tx)}</p>${actions(c)}
   ${opt.link&&rc?`<button class="rl" data-o="${c.id}">답글 ${rc}개 ${I.chev.replace('<svg','<svg style="display:inline;vertical-align:-3px;margin-left:4px"')}</button>`:''}</div></div>`;
}
function renderSheet(){
  $('#sorts').innerHTML=SORTS.map(([k,l])=>`<button class="${sort===k?'on':''}" data-s="${k}">${l}</button>`).join('');
  $('#sorts').querySelectorAll('button').forEach(b=>b.onclick=()=>{sort=b.dataset.s;renderSheet();$('#clist').scrollTop=0});
  const list=sorted(cur.id,sort);
  $('#clist').innerHTML=list.length?list.map(c=>cmHtml(c,{thread:(S.rp[c.id]||[]).length>0,link:true})).join(''):'<div style="padding:50px;text-align:center;color:#606060">아직 댓글이 없어요. 첫 댓글을 남겨보세요</div>';
  bindActions($('#clist'));
}
function bindActions(root){
  root.querySelectorAll('[data-l]').forEach(b=>b.onclick=()=>{const id=b.dataset.l;S.cl[id]=S.cl[id]===1?0:1;save();refresh()});
  root.querySelectorAll('[data-d]').forEach(b=>b.onclick=()=>{const id=b.dataset.d;S.cl[id]=S.cl[id]===-1?0:-1;save();refresh()});
  root.querySelectorAll('[data-r],[data-o]').forEach(b=>b.onclick=()=>{openReplies(b.dataset.r||b.dataset.o,!!b.dataset.r)});
  root.querySelectorAll('[data-cm]').forEach(b=>b.onclick=()=>commentMenu(b.dataset.cm));
}
function refresh(){if(openC)renderReplies();else renderSheet()}
function commentMenu(id){
  const mine=findC(id)&&findC(id).mine;
  $('#mb').innerHTML=(mine?`<button data-a="del">삭제</button>`:'')+`<button data-a="rep">신고</button><button data-a="x">닫기</button>`;
  $('#menu').classList.add('on');
  $('#mb').querySelectorAll('button').forEach(b=>b.onclick=()=>{
    $('#menu').classList.remove('on');
    if(b.dataset.a==='del')delComment(id);
    else if(b.dataset.a==='rep')toast('신고 기능은 지원하지 않아요');
  });
}
function findC(id){
  for(const v in S.cm){const c=S.cm[v].find(x=>x.id===id);if(c)return c}
  for(const k in S.rp){const c=S.rp[k].find(x=>x.id===id);if(c)return c}
}
function delComment(id){
  for(const v in S.cm){const i=S.cm[v].findIndex(x=>x.id===id);if(i>-1){S.cm[v].splice(i,1);delete S.rp[id];save();if(openC===id){openC=null;showPane('c')}renderSheet();return}}
  for(const k in S.rp){const i=S.rp[k].findIndex(x=>x.id===id);if(i>-1){S.rp[k].splice(i,1);save();refresh();return}}
}
/* 댓글 작성 */
const ME={u:'@나',col:['#d9a066','#8a5a2b']};
$('#cinp').oninput=e=>{$('#csd').disabled=!e.target.value.trim()};
$('#cform').onsubmit=e=>{
  e.preventDefault();const tx=$('#cinp').value.trim();if(!tx)return;
  (S.cm[cur.id]=S.cm[cur.id]||[]).push({id:cur.id+'m'+(S.n++),u:ME.u,col:ME.col,ago:0,lk:0,tx,mine:1});
  S.rp[S.cm[cur.id].slice(-1)[0].id]=[];
  save();$('#cinp').value='';$('#csd').disabled=true;$('#cinp').blur();
  sort='new';renderSheet();$('#clist').scrollTop=0;
};
/* ============ 답글 ============ */
function openReplies(id,focus){
  openC=id;showPane('r');renderReplies();
  if(focus)setTimeout(()=>$('#rinp').focus(),50);
}
function renderReplies(){
  const c=findC(openC);if(!c){openC=null;showPane('c');return}
  const rs=S.rp[openC]||[];
  $('#rlist').innerHTML=`<div class="rwrap${rs.length?' has':''}"><div class="orig">${cmHtml(c)}</div><div class="rsub">${rs.map(r=>cmHtml(r,{sm:1})).join('')}</div></div>`;
  $('#rlist').querySelector('.orig [data-r]')?.remove();
  bindActions($('#rlist'));
  $('#rinp').value='';$('#rsd').disabled=true;
}
$('#rinp').oninput=e=>{$('#rsd').disabled=!e.target.value.trim()};
$('#rcam').onclick=()=>toast('사진 첨부는 지원하지 않아요');
$('#rform').onsubmit=e=>{
  e.preventDefault();const tx=$('#rinp').value.trim();if(!tx||!openC)return;
  (S.rp[openC]=S.rp[openC]||[]).push({id:openC+'r'+(S.n++),u:ME.u,col:ME.col,ago:0,lk:0,tx,mine:1});
  save();renderReplies();$('#rlist').scrollTop=$('#rlist').scrollHeight;
};

/* ============ 시작 ============ */
renderChips();renderFeed();renderNav();
addEventListener('keydown',e=>{if(e.key==='Escape'){if($('#sheet').classList.contains('on'))closeSheet();else if(cur)closeWatch()}});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&playing)setPlay(false)});

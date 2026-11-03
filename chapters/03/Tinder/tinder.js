
/* ---------- icons ---------- */
const IC={
flame:'<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
compass:'<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>',
heart:'<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
msg:'<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
user:'<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
sliders:'<path d="M21 4h-7M10 4H3M21 12h-9M8 12H3M21 20h-5M12 20H3M14 2v4M8 10v4M16 18v4"/>',
undo:'<path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5 5.5 5.5 0 0 1-5.5 5.5H11"/>',
x:'<path d="M18 6 6 18M6 6l12 12"/>',
star:'<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
send:'<path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/>',
pin:'<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
shield:'<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',
chevd:'<path d="m6 9 6 6 6-6"/>',
back:'<path d="m15 18-6-6 6-6"/>',
more:'<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>',
zap:'<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>',
up:'<path d="m5 12 7-7 7 7"/><path d="M12 19V5"/>',
search:'<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
smile:'<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><path d="M9 9h.01M15 9h.01"/>',
briefcase:'<rect width="20" height="14" x="2" y="7" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
school:'<path d="m4 6 8-4 8 4"/><path d="m18 10 4 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8l4-2"/><path d="M14 22v-4a2 2 0 0 0-4 0v4"/><path d="M18 5v17M6 5v17"/><circle cx="12" cy="9" r="2"/>'
};
const ic=(n,s=24,f='none',sw=2)=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="${f}" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">${IC[n]}</svg>`;
const vf=(s=20,c='currentColor',ck='#fff')=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" fill="${c}"/><path d="m9 12 2 2 4-4" stroke="${ck}" stroke-width="2.4"/></svg>`;
/* fill placeholders in static html */
document.body.innerHTML=document.body.innerHTML
 .replace('__FLAME__',ic('flame',64,'currentColor',1.5)).replace('__UNDO__',ic('undo',24,'none',2.6)).replace('__X__',ic('x',32,'none',3.4))
 .replace('__STAR__',`<span style="color:#7fa8f0">${ic('star',24,'currentColor',1.5)}</span>`)
 .replace('__HEART__',`<span style="color:#f0261e">${ic('heart',34,'currentColor',1.5)}</span>`)
 .replace('__SEND__',`<span style="color:#5b8def">${ic('send',22,'currentColor',1.6)}</span>`)
 .replace('__SLIDERS__',ic('sliders',28)).replace('__ZAP__',ic('zap',26,'currentColor',1.5))
 .replace('__COMPASS__',ic('compass',44)).replace('__SHIELD__',ic('shield',28)).replace('__SMILE__',ic('smile',28));

/* ---------- photo generator (fictional placeholder portraits) ---------- */
const uri=s=>'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(s);
function photo(h,v,sk,o={}){
  if(o.dark) return uri('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 900"><rect width="600" height="900" fill="#05050a"/></svg>');
  const l1=v===2?72:40,l2=v===2?54:16;
  const shirt=`hsl(${(h+v*70+180)%360} 25% ${v===1?55:30}%)`, hair=`hsl(${20+v*6} 25% 11%)`;
  const cx=v===1?390:300, s=v===1?.62:v===2?.5:1, cy=v===1?560:v===2?600:520;
  let b='';
  for(let i=0;i<5;i++){const x=(h*7+i*131+v*53)%600,y=(h*3+i*197+v*71)%700,r=40+(i*29+h)%70;b+=`<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" opacity=".13" filter="url(#bl)"/>`}
  if(v===2) b+=`<rect y="560" width="600" height="340" fill="hsl(${h} 20% 30%)" opacity=".5"/>`;
  const fig=`<g transform="translate(${cx} ${cy}) scale(${s})"><path d="M-250 620C-250 120 -120 40 0 40C120 40 250 120 250 620Z" fill="${shirt}"/><rect x="-36" y="-70" width="72" height="120" rx="20" fill="${sk}" style="filter:brightness(.85)"/><ellipse cy="-170" rx="92" ry="116" fill="${sk}"/><path d="M-104 -185C-110 -340 110 -340 104 -185C74 -255 -74 -255 -104 -185Z" fill="${hair}"/><circle cx="-34" cy="-160" r="6" fill="#2a1d18" opacity=".75"/><circle cx="34" cy="-160" r="6" fill="#2a1d18" opacity=".75"/><path d="M-22 -105Q0 -90 22 -105" stroke="#7a4338" stroke-width="5" fill="none" stroke-linecap="round"/></g>`;
  return uri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 900"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="hsl(${h} 32% ${l1}%)"/><stop offset="1" stop-color="hsl(${(h+45)%360} 38% ${l2}%)"/></linearGradient><filter id="bl"><feGaussianBlur stdDeviation="14"/></filter></defs><rect width="600" height="900" fill="url(#g)"/>${b}${fig}</svg>`);
}
const SK=['#e8c3a5','#d9a98a','#f0d2b8','#c99877','#e3b99b'];

/* ---------- sample data ---------- */
const P={};
function mk(id,name,age,dist,bio,intro,job,school,tags,o={}){
  const h=o.h??((id.charCodeAt(0)*37+id.length*53)%360), sk=SK[(h>>3)%5];
  P[id]={id,name,age,dist,bio,intro,job,school,tags,verified:!!o.vf,online:!!o.on,likedMe:!!o.lk,blur:!!o.bl,extra:o.ex||'none',tag:o.tag||'',official:!!o.off,
    pos:o.pos||'50% 30%',photos:[0,1,2].map(v=>photo(h,v,sk,{dark:o.dark&&v===0}))};
}
// swipe deck (미매치)
mk('mars','mars',28,4,'천천히 알아가는 관계가 좋아요. 부담 주지 않고 편하게 대화해요.','퇴근하고는 보통 집에서 쉬어요. 급하게 생각하지 않아도 괜찮아요.','중소기업 · 사무직 대리','',['커피','영화','산책'],{on:1,ex:'job',h:215});
mk('nangman','낭만고양이',29,8,'진지한 연애를 찾지만 캐주얼해도 괜찮음','어딜 그리 바삐 가시나요?','디자이너','서울예술대학교',['산책','사진','고양이'],{on:1,ex:'none',h:160});
mk('yeongjun','유영준',23,3,'취미와 일상을 공유할 사람','요즘 빠진 건 보드게임이에요','대학생','한양대학교',['보드게임','영화','러닝'],{vf:1,lk:1,on:1,ex:'school',h:210});
mk('jihyun','지현',29,12,'여행과 음악을 좋아해요','최근에 다녀온 곳 추천해줘요','마케터','',['여행','인디음악','와인'],{lk:1,ex:'tags',h:330});
mk('ttussi','뚜씨뚜씨',28,5,'드라이브와 산책을 좋아하는 친구','','',' ',['드라이브','산책','카페'],{vf:1,lk:1,ex:'tags',h:30});
mk('mj','MJ',29,17,'ENFJ, 사진과 음악을 좋아함','필름 카메라 들고 다녀요','포토그래퍼','',['사진','음악','ENFJ'],{ex:'job',h:280});
mk('rare','희귀매물',30,6,'음악과 공연을 좋아해요','이번 주말 공연 같이 갈 사람?','공연 기획자','',['콘서트','재즈','LP'],{vf:1,lk:1,on:1,ex:'job',h:12});
mk('dbd','dbdhwkf',29,11,'진지한 연애를 원해요','','개발자','',['독서','헬스'],{lk:1,ex:'none',h:240});
mk('brent','Brent',27,15,'여행과 운동을 좋아함','Hiking > Netflix','엔지니어','연세대학교',['여행','클라이밍','러닝'],{vf:1,ex:'school',h:190});
mk('junho','정윤호',26,4,'맛집 탐방이 취미예요','줄 서는 집은 일단 갑니다','셰프','',['맛집','요리','위스키'],{vf:1,lk:1,on:1,ex:'job',h:50});
mk('haneul','하늘',25,9,'','',' ','이화여자대학교',['요가','독서'],{lk:1,ex:'school',h:200});
mk('sora','소라',24,7,'고양이 두 마리랑 살아요','집사 구함 (진지)','일러스트레이터','',['고양이','그림','넷플릭스'],{lk:1,on:1,ex:'tags',h:300,bl:1});
mk('taeo','태오',31,13,'주말엔 러닝, 평일엔 커피','한강 러닝 크루 모집 중','바리스타','',['러닝','커피','독립서점'],{ex:'job',h:100});
mk('minseo','민서',27,2,'독서와 전시를 좋아해요','요즘 읽는 책 얘기해요','큐레이터','홍익대학교',['전시','독서','필름'],{vf:1,lk:1,ex:'school',h:260,bl:1});
mk('dohyun','도현',28,10,'','말 걸어줘요','','',['농구','게임'],{ex:'tags',h:140});
// 이미 매치된 상대
mk('seungo','승오',27,6,'등산과 캠핑','','','',['캠핑'],{vf:1,h:90});
mk('gil','길거리에…',26,9,'','','','',[],{h:0,dark:1});
mk('sansan','산산',25,5,'','','','',[],{h:20});
mk('kidal','키달ㅇ',28,4,'','','','',[],{h:215,on:1});
mk('kd','KD',29,8,'','','','',[],{h:225});
mk('L','L',24,11,'','','','',[],{vf:1,h:320});
mk('yuu','Yuu',26,3,'','','','',[],{on:1,h:170,tag:'내가 받은 좋아요'});
mk('haeden','해든',27,7,'','','','',[],{on:1,h:70});
mk('team','Team Tinder',0,0,'','','','',[],{off:1,vf:1});
mk('me','나',28,0,'','','','',[],{h:205});
const ORDER=['nangman','yeongjun','jihyun','ttussi','mj','rare','dbd','brent','junho','haeden_x','haneul','sora','taeo','minseo','dohyun'].filter(id=>P[id]);
const PICKS=['minseo','junho','sora'];

/* ---------- state ---------- */
const now=Date.now(),MIN=60000,DAY=86400000;
const S={tab:'swipe',decided:{},sent:[],history:[],front:null,photoIdx:{},likeCat:0,filters:{},room:null,enter:0,
 matches:['mars','yuu','kd','kidal','L','haeden','seungo','gil','sansan'],
 newMatch:new Set(['mars','seungo','gil','sansan']),
 unread:new Set(['mars','seungo','gil','kd','team','L']),
 matchedAt:{},chats:{},replyN:{}};
const M=(id,t,y,mo,d,h,mi)=>{S.matchedAt[id]=new Date(y,mo,d,h,mi).getTime()};
M('kidal',0,2026,7,7,19,45);M('kd',0,2026,7,9,21,10);M('L',0,2026,7,12,14,5);M('yuu',0,2026,7,15,10,30);M('haeden',0,2026,7,18,18,20);M('seungo',0,2026,8,2,13,0);M('gil',0,2026,8,8,22,30);M('sansan',0,2026,8,20,9,40);
S.chats={mars:[
 {f:'them',x:'안녕하세요, 프로필 보고 인사드려요. 저는 mars라고 해요.',t:now-5*DAY},
 {f:'them',x:'답장 천천히 주셔도 괜찮아요. 앱 자주 안 보시는 것 같아서요.',t:now-4*DAY},
 {f:'them',x:'혹시 불편하시면 편하게 말씀해 주세요. 부담드리고 싶진 않아요.',t:now-3*DAY},
 {f:'them',x:'오늘 날씨 좋네요. 산책하기 괜찮은 날인 것 같아요.',t:now-2*DAY}
],yuu:[{f:'them',x:'오른쪽 스와이프 한 번에 매치!',t:now-10*MIN}],
 kd:[{f:'them',x:'안녕하세요',t:now-20*MIN}],
 team:[{f:'them',x:'🚨 안전한 Tinder 사용을 위한 당부의 말씀을 드려요. 개인정보와 금융 정보는 공유하지 마세요.',t:now-30*MIN}],
 kidal:[{f:'them',x:'안녕',t:now-40*MIN}],
 L:[{f:'them',x:'👋',t:now-50*MIN}],
 haeden:[{f:'them',x:'프로필 사진 분위기 좋네요. 주말에 뭐 하세요?',t:now-60*MIN}],
 seungo:[],gil:[],sansan:[]};
const REPLIES=['ㅎㅎ 반가워요! 오늘 하루는 어땠어요?','저도 비슷해요. 주말엔 보통 뭐 하세요?','오 좋은데요? 다음에 커피 한잔 어때요?','그럼 이번 주에 시간 맞춰봐요 :)'];

/* ---------- helpers ---------- */
const $=s=>document.querySelector(s);
const ampm=d=>(d.getHours()<12?'오전':'오후')+' '+(d.getHours()%12||12)+':'+String(d.getMinutes()).padStart(2,'0');
const fT=t=>ampm(new Date(t));
const fD=t=>{const d=new Date(t);return `${d.getFullYear()}. ${d.getMonth()+1}. ${d.getDate()}.`};
const fMD=t=>{const d=new Date(t);return `${d.getMonth()+1}월 ${d.getDate()}일 ${ampm(d)}`};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
let toastT;function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('on');clearTimeout(toastT);toastT=setTimeout(()=>t.classList.remove('on'),1600)}
const deck=()=>{const b=ORDER.filter(id=>!S.decided[id]&&!S.matches.includes(id));return (S.front&&b.includes(S.front)?[S.front,...b.filter(x=>x!==S.front)]:b).map(id=>P[id])};
const lastMsg=id=>{const c=S.chats[id]||[];return c[c.length-1]};
(function clock(){const d=new Date();$('#clock').textContent=(d.getHours()%12||12)+':'+String(d.getMinutes()).padStart(2,'0');setTimeout(clock,20000)})();

/* ---------- tabs ---------- */
const TABS=[['swipe','스와이프','flame'],['explore','둘러보기','compass'],['like','좋아요','heart'],['chat','채팅','msg'],['profile','프로필','user']];
function renderTabs(){
  const dark=false;
  $('#tabbar').className=dark?'dark':'';
  $('#tabbar').innerHTML=TABS.map(([k,l,i])=>`<button class="tb ${S.tab===k?'on':''}" data-act="tab" data-id="${k}"><span class="ico">${ic(i,26,S.tab===k?'currentColor':'none',S.tab===k?1.5:2)}${k==='like'?'<span class="bdg">99+</span>':''}${k==='chat'&&S.unread.size?'<span class="dotr"></span>':''}</span>${l}</button>`).join('');
  $('#sb').classList.toggle('light',dark);$('#hi').classList.toggle('light',dark);
}
function setTab(k){
  S.tab=k;document.querySelectorAll('.screen').forEach(s=>s.classList.toggle('on',s.id==='s-'+k));
  renderTabs();if(k==='like')renderLike();if(k==='chat')renderChat();if(k==='profile')renderProfile();
}

/* ---------- swipe ---------- */
const stack=$('#stack');let busy=false,drag=null;
function infoHTML(p){
  const ex=p.extra;let l2='';
  if(p.bio) l2+=`<div class="ln">${ic('search',18)}<span>${esc(p.bio)}</span></div>`;
  if(p.intro.trim()) l2+=`<div class="ln s" style="margin-top:12px">${esc(p.intro)}</div>`;
  let x='';
  if(ex==='job'&&p.job.trim())x=`<div class="ln s">${ic('briefcase',18)}<span>${esc(p.job)}</span></div>`;
  if(ex==='school'&&p.school.trim())x=`<div class="ln s">${ic('school',18)}<span>${esc(p.school)}</span></div>`;
  if(ex==='tags')x=`<div class="tags">${p.tags.slice(0,3).map(t=>`<b>${esc(t)}</b>`).join('')}</div>`;
  return `<div class="badges">${p.online?'<span class="bd g">접속 중</span>':''}${p.dist<=10?'<span class="bd">근처</span>':''}</div>${p.likedMe&&!S.decided[p.id]&&!S.matches.includes(p.id)?'<div class="rcv">내가 받은 좋아요 ›</div>':''}
  <div class="nm">${esc(p.name)} <span>${p.age}</span>${p.verified?vf(24,'#fff','#222'):''}</div>
  <div class="ln">${ic('pin',20)}<span>${p.dist}km 거리에 있음</span></div>${l2}${x}`;
}
function dotsHTML(p){const n=S.photoIdx[p.id]||0;return p.photos.map((_,i)=>`<i class="${i===n?'on':''}"></i>`).join('')}
function makeCard(p){
  const el=document.createElement('div');el.className='card';el.dataset.id=p.id;
  el.innerHTML=`<img class="ph" draggable="false" alt="" src="${p.photos[S.photoIdx[p.id]||0]}" style="object-position:${p.pos}"><div class="gtop"></div><div class="gbot"></div><div class="dots">${dotsHTML(p)}</div>
  <div class="stamp like"><svg viewBox="0 0 24 24" width="132" height="132" fill="#ff1f2d"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg></div><div class="stamp nope"><svg viewBox="0 0 24 24" width="124" height="124" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg></div><div class="stamp sup">${ic('star',56,'currentColor',1.5)}<span>슈퍼 라이크</span></div>
  <div class="info">${infoHTML(p)}</div><button class="up" data-act="detail" data-id="${p.id}" aria-label="상세 보기">${ic('up',24,'none',3)}</button>`;
  return el;
}
function setPos(el,i,anim=true){
  el.dataset.pos=i;el.style.zIndex=10-i;
  el.style.transition=anim?'transform .32s cubic-bezier(.2,.8,.2,1),opacity .32s,filter .32s':'none';
  el.style.transform=i===0?'translate(0,0) rotate(0deg) scale(1)':`translateY(${i*12}px) scale(${1-i*.05})`;
  el.style.opacity=1;
}
function layoutStack(){
  const d=deck().slice(0,3),ids=d.map(p=>p.id);
  [...stack.children].forEach(el=>{if(!ids.includes(el.dataset.id))el.remove()});
  d.forEach((p,i)=>{
    let el=stack.querySelector(`[data-id="${p.id}"]`);
    if(!el){
      el=makeCard(p);stack.appendChild(el);
      if(i===0&&S.enter){el.style.transition='none';el.style.transform=`translate(${S.enter*420}px,0) rotate(${S.enter*18}deg)`;el.style.opacity=0;el.dataset.pos=0;el.offsetWidth;}
      else if(i>0){el.style.transition='none';el.style.opacity=0;el.style.transform=`translateY(${i*12}px) scale(${1-i*.05})`;el.offsetWidth}
    }
    setPos(el,i);
  });
  S.enter=0;
  $('#empty').style.display=d.length?'none':'flex';
}
function stamps(el,dx,dy){
  const up=dy<0&&Math.abs(dy)>Math.abs(dx);
  el.querySelector('.like').style.opacity=up?0:Math.max(0,Math.min(1,dx/100));
  el.querySelector('.nope').style.opacity=up?0:Math.max(0,Math.min(1,-dx/100));
  el.querySelector('.sup').style.opacity=up?Math.min(1,-dy/120):0;
}
stack.addEventListener('pointerdown',e=>{
  const el=e.target.closest('.card');if(!el||el.dataset.pos!=='0'||busy||e.target.closest('[data-act]'))return;
  drag={el,x:e.clientX,y:e.clientY,dx:0,dy:0,moved:false,vx:0,px:e.clientX,pt:performance.now(),id:e.pointerId};
  el.style.transition='none';stack.setPointerCapture(e.pointerId);
});
stack.addEventListener('pointermove',e=>{
  if(!drag||e.pointerId!==drag.id)return;
  const dx=e.clientX-drag.x,dy=e.clientY-drag.y,t=performance.now();
  if(t>drag.pt){drag.vx=(e.clientX-drag.px)/(t-drag.pt)};drag.px=e.clientX;drag.pt=t;
  if(Math.hypot(dx,dy)>7)drag.moved=true;
  drag.dx=dx;drag.dy=dy;
  requestAnimationFrame(()=>{if(!drag)return;
    drag.el.style.transform=`translate(${dx}px,${dy}px) rotate(${dx/18}deg)`;stamps(drag.el,dx,dy);
    const nx=stack.querySelector('[data-pos="1"]');if(nx){const p=Math.min(1,Math.hypot(dx,dy)/160);nx.style.transition='none';nx.style.transform=`translateY(${12*(1-p)}px) scale(${.95+.05*p})`}
  });
});
function endDrag(e){
  if(!drag||e.pointerId!==drag.id)return;
  const {el,dx,dy,vx,moved}=drag;drag=null;
  if(!moved){ // tap → 사진 전환
    const r=el.getBoundingClientRect();photoStep(el.dataset.id,(e.clientX-r.left)<r.width/2?-1:1,el);return;}
  const up=dy<-120&&Math.abs(dy)>Math.abs(dx);
  if(up)return fly('super');
  if(dx>110||(vx>.55&&dx>40))return fly('like');
  if(dx<-110||(vx<-.55&&dx<-40))return fly('pass');
  setPos(el,0);stamps(el,0,0);
  const nx=stack.querySelector('[data-pos="1"]');if(nx)setPos(nx,1);
}
stack.addEventListener('pointerup',endDrag);stack.addEventListener('pointercancel',endDrag);
function photoStep(id,dir,el){
  const p=P[id],n=p.photos.length,cur=S.photoIdx[id]||0,nx=Math.max(0,Math.min(n-1,cur+dir));
  if(nx===cur){el.animate([{transform:'translateX(0)'},{transform:`translateX(${-dir*8}px)`},{transform:'translateX(0)'}],{duration:180});return}
  S.photoIdx[id]=nx;const img=el.querySelector('.ph');img.src=p.photos[nx];img.animate([{opacity:.35},{opacity:1}],{duration:200});
  el.querySelector('.dots').innerHTML=dotsHTML(p);
}
function fly(kind){
  if(busy||drag)return;const el=stack.querySelector('[data-pos="0"]');if(!el)return;busy=true;
  const T={like:'translate(560px,-30px) rotate(26deg)',pass:'translate(-560px,-30px) rotate(-26deg)',super:'translate(0,-820px) rotate(0deg)'};
  const st=el.querySelector(kind==='like'?'.like':kind==='pass'?'.nope':'.sup');st.style.transition='opacity .25s';st.style.opacity=1;
  el.style.transition='transform .85s cubic-bezier(.22,.7,.3,1),opacity .85s ease-in';el.style.transform=T[kind];
  const nx=stack.querySelector('[data-pos="1"]');if(nx){nx.style.transition='transform .6s ease,filter .6s';nx.style.transform='translateY(0) scale(1)';nx.style.filter='none'}
  const id=el.dataset.id;
  setTimeout(()=>{decide(id,kind);el.remove();layoutStack();refresh(true);busy=false},880);
}
function flyBtn(kind){
  if(busy||drag)return;const el=stack.querySelector('[data-pos="0"]');if(!el)return;busy=true;
  const st=el.querySelector(kind==='like'?'.like':kind==='pass'?'.nope':'.sup');st.style.transition='opacity .25s';st.style.opacity=1;
  setTimeout(()=>{busy=false;fly(kind)},550);
}
/* ---------- decisions / match ---------- */
function decide(id,kind){
  if(S.decided[id])return;S.decided[id]=kind;if(S.front===id)S.front=null;let m=false;
  if(kind!=='pass'){
    S.sent=[id,...S.sent.filter(x=>x!==id)];
    if(P[id].likedMe&&!S.matches.includes(id)){m=true;S.matches.unshift(id);S.chats[id]=[];S.newMatch.add(id);S.unread.add(id);S.matchedAt[id]=Date.now();setTimeout(()=>showMatch(id),300)}
  }
  S.history.push({id,kind,match:m});
}
function undo(){
  if(busy)return;const h=S.history.pop();if(!h)return toast('되돌릴 카드가 없어요');
  delete S.decided[h.id];S.sent=S.sent.filter(x=>x!==h.id);
  if(h.match){S.matches=S.matches.filter(x=>x!==h.id);delete S.chats[h.id];S.newMatch.delete(h.id);S.unread.delete(h.id)}
  S.front=h.id;S.enter=h.kind==='pass'?-1:1;layoutStack();refresh(true);
}
function refresh(skipStack){if(!skipStack)layoutStack();renderTabs();if(S.tab==='like')renderLike();if(S.tab==='chat')renderChat();if(S.tab==='profile')renderProfile()}

function showMatch(id){
  const p=P[id],o=document.createElement('div');o.className='mt-ov';
  o.innerHTML=`<h1>매치되었어요!</h1><p>${esc(p.name)} 님과 서로 좋아요를 보냈어요</p><div class="mph"><img src="${P.me.photos[0]}" alt=""><img src="${p.photos[0]}" alt=""></div><div class="mht">${ic('heart',44,'currentColor',1.5)}</div>
  <div class="mbs"><button class="mbtn a" data-act="mmsg" data-id="${id}">메시지 보내기</button><button class="mbtn b" data-act="mkeep">계속 둘러보기</button></div>`;
  $('#phone').appendChild(o);
}

/* ---------- LIKE screen ---------- */
const CATS=['좋아요 99개 이상','내가 보낸 좋아요','오늘의 PICK'];
const FL=[['near','근처'],['bio','자기소개 완료'],['ver','프로필 인증'],['age','나이'],['dist','거리']];
function applyF(list){const f=S.filters;return list.filter(p=>(!f.near||p.dist<=5)&&(!f.bio||p.bio.trim())&&(!f.ver||p.verified)&&(!f.age||p.age<=27)&&(!f.dist||p.dist<=10))}
function gcard(p,mode){
  const bl=p.blur&&mode==='recv',k=S.decided[p.id];
  const tag=mode==='sent'?`<div class="tagk ${k==='super'?'sp':''}">${ic(k==='super'?'star':'heart',13,'currentColor',1.5)}${S.matches.includes(p.id)?'매치됨':k==='super'?'슈퍼 라이크':'좋아요 보냄'}</div>`:'';
  return `<div class="gc" data-act="detail" data-id="${p.id}"><img class="${bl?'bl':''}" src="${p.photos[0]}" alt="" style="object-position:${p.pos}"><div class="gcg"></div>${tag}
  <div class="gci">${bl?'<span class="pill-bl"></span>':`<b>${esc(p.name)}</b>`}<span>${p.age}</span>${p.verified?vf(20,'#fff','#222'):''}<div class="gcb">${ic('search',16)}<span>${esc(p.bio.trim()||'아직 소개가 없어요')}</span></div></div></div>`;
}
function renderLike(){
  $('#cats').innerHTML=CATS.map((c,i)=>`<button class="cat ${S.likeCat===i?'on':''}" data-act="cat" data-id="${i}">${c}</button>`).join('');
  const act=Object.keys(S.filters).filter(k=>S.filters[k]).length;
  $('#chips').innerHTML=`<button class="chip ${act?'on':''}" data-act="flt" data-id="reset" aria-label="필터 초기화">${ic('sliders',20)}</button>`+FL.map(([k,l])=>`<button class="chip ${S.filters[k]?'on':''}" data-act="flt" data-id="${k}">${l}</button>`).join('');
  const recv=applyF(ORDER.map(id=>P[id]).filter(p=>p.likedMe&&!S.decided[p.id]&&!S.matches.includes(p.id)));
  const sent=applyF(S.sent.map(id=>P[id]));
  $('#p0').innerHTML=recv.length?`<div class="grid">${recv.map(p=>gcard(p,'recv')).join('')}</div>`:'<div class="none">조건에 맞는 좋아요가 없어요<br>필터를 바꿔 보세요</div>';
  $('#p1').innerHTML=sent.length?`<div class="grid">${sent.map(p=>gcard(p,'sent')).join('')}</div>`:'<div class="none">아직 보낸 좋아요가 없어요<br>스와이프에서 하트를 눌러 보세요</div>';
  const picks=applyF(PICKS.map(id=>P[id]).filter(p=>!S.decided[p.id]&&!S.matches.includes(p.id)));
  $('#p2').innerHTML=picks.length?picks.map(p=>`<div class="pick" data-act="detail" data-id="${p.id}"><img src="${p.photos[0]}" alt=""><div class="gcg" style="height:60%"></div><div class="gci" style="font-size:26px"><b>${esc(p.name)}</b><span>${p.age}</span>${p.verified?vf(24,'#fff','#222'):''}<div class="gcb" style="font-size:16px">${esc(p.bio.trim()||p.intro)}</div><div class="tags" style="margin-top:8px;display:flex;gap:6px;flex-wrap:wrap;width:100%">${p.tags.slice(0,3).map(t=>`<b style="font-size:13px;font-weight:500;border:1px solid rgba(255,255,255,.7);border-radius:14px;padding:4px 10px">${esc(t)}</b>`).join('')}</div></div></div>`).join(''):'<div class="none">오늘의 PICK을 모두 확인했어요</div>';
}
$('#panes').addEventListener('scroll',e=>{const i=Math.round(e.target.scrollLeft/e.target.clientWidth);if(i!==S.likeCat&&e.target.clientWidth){S.likeCat=i;[...$('#cats').children].forEach((c,j)=>c.classList.toggle('on',j===i))}});

/* ---------- chat list ---------- */
function renderChat(){
  const strip=S.matches.filter(id=>S.newMatch.has(id));
  const rows=[...S.matches,'team'].sort((a,b)=>((lastMsg(b)?.t)||S.matchedAt[b]||0)-((lastMsg(a)?.t)||S.matchedAt[a]||0));
  const html=`<div class="sec" style="padding-bottom:12px">새 매치</div>
  <div class="nm-row"><div class="nmc gold" data-act="tab" data-id="like"><div class="im"><img src="${P.jihyun.photos[0]}" alt=""><div class="c99">99+</div></div><span>좋아요</span></div>
  ${strip.map(id=>{const p=P[id];return `<div class="nmc" data-act="room" data-id="${id}"><div class="im">${S.unread.has(id)?'<i class="rd"></i>':''}<img src="${p.photos[0]}" alt=""></div><span>${esc(p.name)}${p.verified?vf(18,'#171717'):''}</span></div>`}).join('')}</div>
  <div class="msgbox"><div class="sec">메시지</div>${rows.map(id=>{
    const p=P[id],m=lastMsg(id),them=!m||m.f==='them';
    const st=S.unread.has(id)?'#E8262A':p.online?'#34a853':'';
    return `<div class="row" data-act="room" data-id="${id}"><div class="av">${p.official?`<div class="tt">${ic('flame',34,'currentColor',1.5)}</div>`:`<img src="${p.photos[0]}" alt="">`}${st?`<i class="st" style="background:${st}"></i>`:''}</div>
    <div class="rb"><div class="rt">${esc(p.name)}${p.verified?vf(22,'#171717'):''}${p.tag&&!(S.chats[id]||[]).some(x=>x.f==='me')?`<span class="tg">${p.tag}</span>`:''}${p.official?'':them?'<span class="turn">내 차례!</span>':`<span class="tm">${fT(m.t)}</span>`}</div>
    <div class="rp">${m?esc(m.x):'새로운 매치예요. 먼저 인사해 보세요'}</div></div></div>`}).join('')}</div>`;
  const sc=$('#cscroll'),top=sc.scrollTop;sc.innerHTML=html;sc.scrollTop=top;
}

/* ---------- profile tab ---------- */
function renderProfile(){
  $('#pf').innerHTML=`<img src="${P.me.photos[0]}" style="width:110px;height:110px;border-radius:50%;object-fit:cover" alt=""><b style="color:#171717;font-size:22px">나, 28</b><span>보낸 좋아요 ${S.sent.length} · 매치 ${S.matches.length}</span><span style="font-size:14px">프로필 편집 등 나머지 기능은<br>시뮬레이션에 포함되지 않아요.</span>`;
}

/* ---------- overlays: detail ---------- */
let dIdx=0;
function openDetail(id){
  const p=P[id];if(!p||p.official)return;dIdx=0;
  const o=document.createElement('div');o.className='ovp slideup';o.id='detail';o.dataset.id=id;
  const acts=!S.matches.includes(id)&&!S.decided[id];
  const reply=`<button class="dreply" data-act="dreply" data-id="${id}">${ic('send',17,'currentColor',2)}답장</button>`;
  const rows=[['pin',`${p.dist}km 거리에 있음`],...(p.job.trim()?[['briefcase',p.job]]:[]),...(p.school.trim()?[['school',p.school]]:[])];
  const bio=p.bio.trim(),intro=p.intro.trim();
  o.innerHTML=`<div class="dsc" id="dsc">
   <div class="dhead"><div><div class="dname">${esc(p.name)} <span>${p.age}</span>${p.verified?vf(24,'#171717'):''}</div>${p.online?'<div class="dsub">접속 중</div>':''}</div><button class="circ" data-act="dclose" aria-label="닫기">${ic('chevd',22,'none',2.6)}</button></div>
   <div class="dph" id="dph"><img id="dimg" src="${p.photos[0]}" alt="" style="object-position:${p.pos}"><div class="dots" style="top:14px" id="ddots">${dotsHTMLd(p,0)}</div></div>
   ${(bio||intro)?`<div class="dcard"><div class="dct">${ic('search',16)}찾고 있는 상대</div><p>${esc(bio||intro)}</p>${bio&&intro?`<p class="dq">${esc(intro)}</p>`:''}${reply}</div>`:''}
   <div class="dph"><img src="${p.photos[1]}" alt=""></div>
   <div class="dcard"><div class="dct">${ic('user',16)}기본 정보</div>${rows.map(([i,t])=>`<div class="drow">${ic(i,20)}<span>${esc(t)}</span></div>`).join('')}${reply}</div>
   ${p.tags.length?`<div class="dcard"><div class="dct">${ic('heart',16)}관심사</div><div class="ch">${p.tags.map(t=>`<b>${esc(t)}</b>`).join('')}</div>${reply}</div>`:''}
   <div class="dph"><img src="${p.photos[2]}" alt=""></div>
   <div style="height:20px"></div></div>
   ${acts?`<div class="dfab"><button class="da" style="width:62px;height:62px" data-act="dpass" data-id="${id}">${ic('x',28,'none',3.2)}</button><button class="da" style="width:52px;height:52px;color:#5b8def" data-act="dsuper" data-id="${id}">${ic('star',24,'currentColor',1.5)}</button><button class="da" style="width:62px;height:62px;color:#f0261e" data-act="dlike" data-id="${id}">${ic('heart',32,'currentColor',1.5)}</button></div>`:''}`;
  $('#ov').appendChild(o);
  $('#dph').addEventListener('click',e=>{const r=e.currentTarget.getBoundingClientRect();const n=p.photos.length;dIdx=Math.max(0,Math.min(n-1,dIdx+((e.clientX-r.left)<r.width/2?-1:1)));const im=$('#dimg');im.src=p.photos[dIdx];im.animate([{opacity:.4},{opacity:1}],{duration:180});$('#ddots').innerHTML=dotsHTMLd(p,dIdx)});
}
const dotsHTMLd=(p,n)=>p.photos.map((_,i)=>`<i class="${i===n?'on':''}"></i>`).join('');
function closeDetail(){const d=$('#detail');if(!d)return;d.classList.remove('slideup');d.classList.add('outd');setTimeout(()=>d.remove(),220)}
function detailAct(id,kind){closeDetail();decide(id,kind);refresh();}

/* ---------- overlays: chat room ---------- */
function openRoom(id){
  if(S.room)return;const p=P[id];S.room=id;S.unread.delete(id);renderTabs();
  const o=document.createElement('div');o.className='ovp slidein';o.id='room';
  o.innerHTML=`<div class="rh"><button class="circ" data-act="rclose" aria-label="뒤로">${ic('back',26,'none',2.4)}</button>
  <div class="rc"><img src="${p.photos[0]}" alt=""><div class="nmp">${esc(p.name)}</div></div><button class="circ" data-act="rmore" aria-label="더보기">${ic('more',26,'none',3)}</button></div>
  <div class="msgs" id="msgs"></div>
  <div class="rin"><button class="gif" data-act="gif">GIF</button><div class="inw"><input id="inp" type="text" placeholder="메시지를 입력하세요" autocomplete="off" enterkeyhint="send"><button class="snd" id="snd" data-act="send" aria-label="전송">${ic('up',22,'none',3)}</button></div></div>`;
  $('#ov').appendChild(o);drawMsgs(false);
  const inp=$('#inp');inp.addEventListener('input',()=>$('#snd').classList.toggle('on',!!inp.value.trim()));
  inp.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.isComposing)sendMsg()});
}
function drawMsgs(animLast){
  const id=S.room;if(!id)return;const p=P[id],box=$('#msgs');if(!box)return;
  const c=S.chats[id]||[];
  const notice=p.official?'':`<div class="notice">${esc(p.name)} 님과 ${fD(S.matchedAt[id]||now)}에 매치됐어요<br>${fMD(S.matchedAt[id]||now)}</div>`;
  box.innerHTML=notice+c.map(m=>m.f==='me'?`<div class="mr me"><span class="mt">${fT(m.t)}</span><div class="bb">${esc(m.x)}</div></div>`:`<div class="mr them"><img src="${p.official?'data:image/svg+xml,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><rect width="10" height="10" fill="#E8262A"/></svg>'):p.photos[0]}" alt=""><div class="bb">${esc(m.x)}</div></div>`).join('');
  if(!animLast)box.querySelectorAll('.mr').forEach(e=>e.style.animation='none');
  box.scrollTop=box.scrollHeight;
}
function sendMsg(){
  const id=S.room,inp=$('#inp');if(!id||!inp)return;const x=inp.value.trim();if(!x)return;
  (S.chats[id]=S.chats[id]||[]).push({f:'me',x,t:Date.now()});S.newMatch.delete(id);inp.value='';$('#snd').classList.remove('on');
  drawMsgs(true);renderChat();
  if(P[id].official)return;
  const n=S.replyN[id]=(S.replyN[id]||0)+1;
  setTimeout(()=>{S.chats[id].push({f:'them',x:REPLIES[(n-1)%REPLIES.length],t:Date.now()});
    if(S.room===id)drawMsgs(true);else S.unread.add(id);renderChat();renderTabs()},1300);
}
function closeRoom(){const r=$('#room');if(!r)return;r.classList.remove('slidein');r.classList.add('out');S.room=null;setTimeout(()=>r.remove(),220);renderChat();renderTabs()}

/* ---------- actions ---------- */
const ACT={
 tab:(id)=>setTab(id),
 pass:()=>flyBtn('pass'),like:()=>flyBtn('like'),super:()=>flyBtn('super'),undo,
 share:()=>toast('프로필을 공유했어요 (시뮬레이션)'),
 soon:()=>toast('시뮬레이션에서는 제공하지 않는 기능이에요'),
 safe:()=>toast('안전 센터는 시뮬레이션에서 제공하지 않아요'),
 gif:()=>toast('GIF는 시뮬레이션에서 제공하지 않아요'),
 rmore:()=>toast('더보기 메뉴는 시뮬레이션에서 제공하지 않아요'),
 detail:(id)=>openDetail(id),dclose:closeDetail,
 dpass:(id)=>detailAct(id,'pass'),dlike:(id)=>detailAct(id,'like'),dsuper:(id)=>detailAct(id,'super'),
 room:(id)=>openRoom(id),rclose:closeRoom,send:sendMsg,
 cat:(id)=>{S.likeCat=+id;$('#panes').scrollTo({left:$('#panes').clientWidth*id,behavior:'smooth'});[...$('#cats').children].forEach((c,j)=>c.classList.toggle('on',j==id))},
 flt:(id)=>{if(id==='reset')S.filters={};else S.filters[id]=!S.filters[id];renderLike()},
 mmsg:(id)=>{document.querySelector('.mt-ov')?.remove();setTab('chat');openRoom(id)},
 dreply:(id)=>{if(S.matches.includes(id)){closeDetail();setTab('chat');setTimeout(()=>openRoom(id),240)}else toast('매치된 뒤에 답장할 수 있어요')},
 mkeep:()=>{document.querySelector('.mt-ov')?.remove()}
};
document.addEventListener('click',e=>{const t=e.target.closest('[data-act]');if(!t)return;const f=ACT[t.dataset.act];if(f){e.stopPropagation();f(t.dataset.id,t,e)}});

/* 모바일 키보드: 보이는 영역에 맞춰 높이 조정 */
if(window.visualViewport){const ph=$('#phone');visualViewport.addEventListener('resize',()=>{ph.style.bottom='auto';ph.style.height=(visualViewport.height-44)+'px'})}

/* init */
renderTabs();layoutStack();

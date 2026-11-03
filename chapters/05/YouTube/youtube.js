'use strict';
const $=s=>document.querySelector(s);
const IC={home:'<path d="M4 11l8-7 8 7v9h-5v-6H9v6H4z"/>',shorts:'<rect x="6" y="3" width="12" height="18" rx="4"/><path d="M10.5 9.5v5l4-2.5z"/>',plus:'<circle cx="12" cy="12" r="9.5"/><path d="M12 7.5v9M7.5 12h9"/>',subs:'<path d="M7 4h10M5 7.5h14"/><rect x="3.5" y="10" width="17" height="10" rx="2"/><path d="M10.5 12.5v5l4-2.5z"/>',you:'<circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/>',search:'<circle cx="11" cy="11" r="7"/><path d="M16 16l5 5"/>',bell:'<path d="M6 17v-6a6 6 0 0 1 12 0v6l2 2H4z"/><path d="M10 21h4"/>',cast:'<path d="M3 18a3 3 0 0 1 3 3M3 14a7 7 0 0 1 7 7M3 10a11 11 0 0 1 11 11"/><path d="M5 5h14v14h-4"/>',more:'<circle class="d" cx="12" cy="5" r="1.7"/><circle class="d" cx="12" cy="12" r="1.7"/><circle class="d" cx="12" cy="19" r="1.7"/>',up:'<path d="M7 10v10H4V10zM7 10l4-7c1.5 0 2.5 1 2.5 2.5L13 9h6c1.3 0 2.2 1.2 1.9 2.4l-1.7 7.5c-.2.7-.9 1.1-1.6 1.1H7"/>',share:'<path d="M14 4l7 7-7 7v-4c-5 0-8 1.5-10 5 .5-6 3.5-10 10-10z"/>',save:'<path d="M4 6h12M4 11h12M4 16h7M18 13v6M15 16h6"/>',cm:'<path d="M4 4h16v12H9l-5 4z"/>',play:'<path d="M8 5v14l11-7z"/>',pause:'<rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/>',back:'<path d="M15 4l-8 8 8 8"/>',close:'<path d="M6 6l12 12M18 6L6 18"/>',full:'<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',list:'<path d="M4 6h16M4 11h16M4 16h8M16 15l5 3-5 3z"/>',vid:'<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M10 9.5v5l4.5-2.5z"/>',down:'<path d="M6 9l6 6 6-6"/>',ban:'<circle cx="12" cy="12" r="9"/><path d="M5.6 5.6l12.8 12.8"/>'};
const ic=(n,c='',st='')=>`<svg viewBox="0 0 24 24" class="${c}" style="${st}">${IC[n]}</svg>`;
const SC=document.createElement('style');SC.textContent='svg .d{fill:currentColor;stroke:none}';document.head.appendChild(SC);
/* ---------- 데이터 ---------- */
const ME='me';
const CH=[
{id:'me',n:'남자성화',h:'@marsssssss_',g:['#ff5f6d','#ffc371'],sub:'구독자 2.3만명'},
{id:'c1',n:'지민의 주방',h:'@jimin_kitchen',g:['#f7971e','#ffd200'],sub:'구독자 38만명'},
{id:'c2',n:'밤하늘 뮤직',h:'@nightsky_music',g:['#41295a','#2f0743'],sub:'구독자 120만명'},
{id:'c3',n:'게임연구소 하루',h:'@haru_gamelab',g:['#11998e','#38ef7d'],sub:'구독자 64만명'},
{id:'c4',n:'뉴스브리핑 데일리',h:'@daily_briefing',g:['#232526','#414345'],sub:'구독자 210만명'},
{id:'c5',n:'여행자 서연',h:'@seoyeon_trip',g:['#2193b0','#6dd5ed'],sub:'구독자 17만명'},
{id:'c6',n:'코딩하는 태오',h:'@teo_codes',g:['#3a7bd5','#3a6073'],sub:'구독자 9.2만명'},
{id:'c7',n:'로파이 카페',h:'@lofi_cafe_kr',g:['#834d9b','#d04ed6'],sub:'구독자 45만명'}];
const chById=id=>CH.find(c=>c.id==id);
const GR=[['#ff9a9e','#fad0c4'],['#667eea','#764ba2'],['#f093fb','#f5576c'],['#4facfe','#00c6fb'],['#43e97b','#38b6a0'],['#fa709a','#fee140'],['#30cfd0','#330867'],['#a18cd1','#fbc2eb'],['#fc5c7d','#6a82fb'],['#f6d365','#fda085'],['#5ee7df','#b490ca'],['#ee9ca7','#ffdde1']];
// [id,채널,제목,분류,길이(초),조회수,며칠 전,댓글 키워드,좋아요]
const VD=[
['v1','me','자취 5년차의 평일 퇴근 후 브이로그','브이로그',612,48200,2,'퇴근 후 저녁 루틴',2900],
['v2','me','편의점 신상 라면 다 먹어봤다 (솔직 후기)','브이로그',845,126000,9,'마지막 라면 평가',7400],
['v3','me','혼자 떠난 부산 1박 2일 여행','여행',1123,83000,21,'광안리 야경',5100],
['v4','me','집에서 만드는 크림 파스타 레시피','요리',478,31500,34,'소스 농도',2200],
['v5','me','게임 한 판만 하려다 새벽 5시 된 썰','게임',731,57800,48,'새벽 5시 엔딩',4300],
['v6','me','내 방 데스크 셋업 공개','테크',559,22400,70,'모니터 암 배치',1700],
['v7','c1','10분 완성! 간장계란밥 말고 진짜 맛있는 덮밥','요리',624,812000,5,'덮밥 소스',41000],
['v8','c2','비 오는 날 듣기 좋은 감성 플레이리스트','음악',3720,2300000,12,'세 번째 곡',88000],
['v9','c3','이번 신작 솔직히 해보니까 말이죠','게임',1260,451000,1,'보스전 공략',19000],
['v10','c4','오늘의 주요 뉴스 10분 브리핑','뉴스',612,1200000,0,'환율 이야기',15000],
['v11','c5','제주도 3박 4일, 이 코스 그대로 따라오세요','여행',1485,365000,7,'숙소 소개',22000],
['v12','c6','개발자 취업, 포트폴리오 이렇게 바꿨습니다','테크',1040,198000,15,'프로젝트 설명',13000],
['v13','c7','공부할 때 틀어놓는 로파이 2시간 믹스','음악',7200,3100000,30,'첫 번째 트랙',120000],
['v14','c1','냉장고 파먹기 일주일 식단 챌린지','요리',905,540000,18,'마지막 날 식단',27000],
['v15','c3','숨은 명작 인디게임 5선','게임',1180,276000,26,'세 번째 게임',16000],
['v16','c5','교토 벚꽃 시즌 완전 정복 가이드','여행',1342,498000,40,'카페 추천',31000],
['v17','c4','이번 주 경제 이슈 한눈에 정리','뉴스',930,640000,3,'금리 전망',9000],
['v18','c6','맥북 vs 윈도우 개발 환경 비교','테크',1405,320000,22,'터미널 세팅',17000],
['v19','c2','새벽 감성 어쿠스틱 모음','음악',2850,950000,52,'기타 연주',44000],
['v20','c1','편의점 재료로 만드는 야식 3종','요리',512,720000,11,'치즈 토핑',35000]];
const SHORTS=[['s1','me','퇴근길 편의점 신상 먹방 🍜',12400,'먹방'],['s2','c1','계란 하나로 5분 만에 아침 만들기',89000,'아침 요리'],['s3','c3','이 보스 이렇게 잡는 사람 처음 봄',52000,'보스'],['s4','c5','제주 바다 색깔 실화냐',77000,'바다 색'],['s5','me','내 방 조명 하나로 분위기 바꾸는 법',9800,'조명'],['s6','c7','비 오는 날 창가 로파이',64000,'빗소리'],['s7','c6','코드 한 줄로 해결되는 버그',31000,'버그'],['s8','c2','오늘의 한 곡 추천',45000,'한 곡']];
const VID=VD.map((a,i)=>({id:a[0],ch:a[1],t:a[2],tag:a[3],dur:a[4],views:a[5],days:a[6],kw:a[7],lk:a[8],g:GR[i%GR.length]}));
const SH=SHORTS.map((a,i)=>({id:a[0],ch:a[1],t:a[2],lk:a[3],kw:a[4],g:GR[(i*5+3)%GR.length]}));
const byId=id=>VID.find(v=>v.id==id)||SH.find(v=>v.id==id);
const TAGS=['전체','음악','게임','뉴스','요리','여행','브이로그','테크'];
/* ---------- 댓글 (영상별 20개, 중복 없음) ---------- */
const TT=['${k} 부분에서 제일 크게 웃었어요','${k} 장면 때문에 세 번 돌려봤습니다','${k} 편집 센스 너무 좋다 ㅋㅋ','${k} 같은 영상 더 올려주세요!','${k} 에서 BGM이 진짜 찰떡이네요','${k} 보고 저도 따라 해봤는데 되네요','${k} 이 부분 나만 좋았나?','${k} 얘기 듣고 괜히 공감돼서 울컥했네요'];
const GG=['알고리즘 덕분에 우연히 봤는데 구독하고 갑니다','퇴근하고 이거 보는 게 낙이에요','오늘 영상도 믿고 봅니다','자막이 센스 있어서 소리 없이도 보게 됨','썸네일 보고 클릭했는데 후회 없음','친구한테 링크 보냈어요','이 채널 구독자가 왜 이렇게 적죠? 더 떠야 함','댓글 읽는 재미도 있는 영상이네요','길이가 딱 적당해서 좋아요','다음 영상은 언제 올라와요?','목소리가 편안해서 틈만 나면 틀어둬요','화질이랑 색감이 점점 좋아지는 게 보여요','처음부터 끝까지 한 번도 안 넘기고 봄','출근길에 보다가 내릴 역 지나칠 뻔','저만 5번째 보는 거 아니죠?','영상 퀄리티 대단하다 진짜','올해 본 영상 중에 제일 편안함','2배속으로 봤다가 다시 1배속으로 돌려서 봄','엄마도 옆에서 보다가 웃으셨어요','밤에 보기 딱 좋은 영상'];
const UN=['하늘','민수','지후','soda','밤비','coco','도윤','rain','서진','momo','별빛','kiwi','태양','nana','오리','jun','수아','mint','한결','leo','다온','pepper','우주','해솔','bomi'];
const rnd=s=>()=>{s|=0;s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};
const hs=s=>[...s].reduce((a,c)=>a*31+c.charCodeAt(0)|0,7);
function mkCm(v){const r=rnd(hs(v.id)),sh=a=>a.map(x=>[r(),x]).sort((p,q)=>p[0]-q[0]).map(p=>p[1]);
const tp=sh(TT).slice(0,6).map(t=>t.replace('${k}',v.kw)),gn=sh(GG).slice(0,14),all=sh([...tp,...gn]),us=sh(UN);
return all.map((tx,i)=>({id:v.id+'c'+i,u:'@'+us[i%us.length]+(i<us.length?'':i),col:GR[(i*7+hs(v.id))%GR.length&15%GR.length],tx,lk:Math.floor(r()*r()*900),m:Math.floor(r()*60*24*(i+1)/3)+3}))}
/* ---------- 상태 ---------- */
const KEY='yh05_youtube_v1';let S;
function load(){try{S=JSON.parse(localStorage.getItem(KEY))}catch(e){}S=Object.assign({tab:'home',chip:'전체',liked:{},dis:{},subs:{c1:1,c2:1,c4:1,c5:1,c7:1},saved:{},hist:['v8','v1'],cm:{},cl:{},seen:{},slk:{},subch:'',pos:{}},S||{});
[...VID,...SH].forEach(v=>{if(!S.cm[v.id])S.cm[v.id]=mkCm(v)});save()}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){toast('저장 공간이 부족합니다')}}
function toast(m){const e=$('#toast');e.textContent=m;e.classList.add('on');clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.remove('on'),1600)}
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const fv=n=>n>=1e4?(n/1e4).toFixed(n>=1e5?0:1).replace('.0','')+'만':n>=1e3?(n/1e3).toFixed(1).replace('.0','')+'천':String(n);
const views=n=>`조회수 ${fv(n)}회`;
const agoD=d=>d<1?'오늘':d<7?d+'일 전':d<30?Math.floor(d/7)+'주 전':d<365?Math.floor(d/30)+'개월 전':Math.floor(d/365)+'년 전';
const agoM=m=>m<60?m+'분 전':m<1440?Math.floor(m/60)+'시간 전':agoD(Math.floor(m/1440));
const tf=s=>{s=Math.floor(s);const h=Math.floor(s/3600),m=Math.floor(s%3600/60);return(h?h+':'+String(m).padStart(2,0):m)+':'+String(s%60).padStart(2,0)};
const gb=g=>`linear-gradient(135deg,${g[0]},${g[1]})`;
const av=(c,z)=>`<span class="av" style="width:${z}px;height:${z}px;font-size:${z*.4}px;background:${gb(c.g)}">${esc(c.n[0])}</span>`;
const myAv=z=>av(chById(ME),z);
/* ---------- 공통 조각 ---------- */
const logo=`<div class="logo"><i class="yt"></i>YouTube</div>`;
const ib=(a,i,x='')=>`<button class="ib" data-a="${a}" aria-label="${a}">${ic(i)}${x}</button>`;
const hdr=(r)=>`<div class="hd">${logo}<div class="rt">${r}</div></div>`;
const rtHome=ib('cast','cast')+ib('notif','bell','<span class="bdg">3</span>')+ib('search','search')+`<button class="ib" data-a="me">${myAv(28)}</button>`;
function card(v){const c=chById(v.ch),p=S.pos[v.id];return`<div class="vid"><div class="th" data-o="${v.id}" style="background:${gb(v.g)}"><span>${esc(v.t.slice(0,26))}</span><span class="d">${tf(v.dur)}</span>${p?`<div class="pr"><i style="width:${Math.min(100,p/v.dur*100)}%"></i></div>`:''}</div><div class="vm" data-o="${v.id}"><span data-ch="${c.id}">${av(c,36)}</span><div class="t"><b>${esc(v.t)}</b><span class="s">${esc(c.n)} · ${views(v.views)} · ${agoD(v.days)}</span></div><button class="kb" data-menu="${v.id}" aria-label="메뉴">${ic('more')}</button></div></div>`}
const mini=v=>`<div class="hc" data-o="${v.id}"><div class="th" style="background:${gb(v.g)}">${esc(v.t.slice(0,16))}<span class="d">${tf(v.dur)}</span></div><b>${esc(v.t)}</b><span>${esc(chById(v.ch).n)}</span></div>`;
const chips=(l,on,a)=>`<div class="chips">${l.map(c=>`<button class="chip ${c==on?'on':''}" data-a="${a}" data-c="${c}">${c}</button>`).join('')}</div>`;
const feedV=()=>VID.filter(v=>S.chip=='전체'||v.tag==S.chip);
/* ---------- 탭 화면 ---------- */
const TABS=[['home','홈','home'],['shorts','Shorts','shorts'],['create','','plus'],['subs','구독','subs'],['you','You','you']];
function render(){const t=S.tab,v=$('#view'),top=$('#top');
document.body.classList.toggle('dk',t=='shorts');document.body.classList.toggle('sht',t=='shorts');
top.style.background=t=='shorts'?'none':'';top.style.backdropFilter=top.style.webkitBackdropFilter=t=='shorts'?'none':'';
$('#tabs').innerHTML=TABS.map(x=>`<button data-t="${x[0]}" class="${x[0]=='create'?'pl':''}" style="${S.tab==x[0]?'':'opacity:.75'}">${ic(x[2],S.tab==x[0]&&x[0]!='create'?'f':'')}${x[1]}</button>`).join('');
v.style.overflow=t=='shorts'?'hidden':'';v.style.paddingBottom=t=='shorts'?'0':'';
if(t=='home'){top.innerHTML=hdr(rtHome)+chips(TAGS,S.chip,'chip');v.innerHTML=`<div style="height:${top.offsetHeight}px"></div>`+(feedV().map(card).join(''))}
else if(t=='shorts'){top.innerHTML=hdr(ib('search','search')+ib('more','more'));v.innerHTML='<div id="sh">'+SH.map(shortV).join('')+'</div>';setupShorts()}
else if(t=='subs'){const ids=Object.keys(S.subs).filter(k=>S.subs[k]);const nw=ch=>!S.seen[ch]&&['c2','c4'].includes(ch);
 top.innerHTML=hdr(ib('cast','cast')+ib('create','vid')+ib('search','search')+`<button class="ib" data-a="me">${myAv(28)}</button>`)+`<div class="chn">${ids.map(i=>{const c=chById(i);return`<button class="cc ${S.subch==i?'on':''}" data-sc="${i}"><span class="av" style="width:56px;height:56px;font-size:22px;background:${gb(c.g)}">${esc(c.n[0])}${nw(i)?'<i class="nw"></i>':''}</span>${esc(c.n)}</button>`}).join('')}</div>`;
 const l=VID.filter(x=>S.subs[x.ch]&&(!S.subch||x.ch==S.subch)).sort((a,b)=>a.days-b.days);
 v.innerHTML=`<div style="height:${top.offsetHeight}px"></div>`+(l.length?l.map(card).join(''):'<div class="em">구독한 채널의 새 영상이 없어요.</div>')}
else{top.innerHTML=hdr(ib('cast','cast')+ib('notif','bell')+ib('search','search'));const me=chById(ME);const hist=S.hist.map(byId).filter(Boolean);
 v.innerHTML=`<div style="height:${top.offsetHeight}px"></div><div class="pf" data-ch="me">${myAv(72)}<div><h2>${me.n}</h2><p>${me.h} · 채널 보기 ›</p></div></div><div class="hs" style="padding-top:10px"><button class="pill" data-a="switch">${ic('you','','width:18px;height:18px')}계정 전환</button><button class="pill" data-toast="Google 계정은 이 시뮬레이션에서 지원하지 않아요">Google 계정</button></div>
 <div class="sec"><b>기록</b><button data-pg="hist">전체보기</button></div><div class="hs">${hist.length?hist.slice(0,8).map(mini).join(''):'<div class="em" style="padding:20px">시청 기록이 없어요.</div>'}</div>
 <div class="sec"><b>재생목록</b><button data-pg="pls">전체보기</button></div><div class="hs"><div class="hc" data-pg="wl"><div class="th" style="background:#2b3442">${ic('clock','',"width:34px;height:34px")}<span class="d">${Object.keys(S.saved).filter(k=>S.saved[k]).length}</span></div><b>나중에 볼 동영상</b><span>비공개</span></div><div class="hc" data-pg="liked"><div class="th" style="background:#44505f">${ic('up','',"width:34px;height:34px")}<span class="d">${Object.keys(S.liked).filter(k=>S.liked[k]).length}</span></div><b>좋아요 표시한 동영상</b><span>비공개</span></div></div>
 <div style="height:8px"></div>${[['mine','vid','내 동영상'],['hist','clock','시청 기록'],['wl','save','나중에 볼 동영상'],['pls','list','재생목록']].map(x=>`<button class="lr" data-pg="${x[0]}">${ic(x[1])}${x[2]}</button>`).join('')}`}
v.scrollTop=S.tab==prevTab?v.scrollTop:0;prevTab=S.tab}
let prevTab='';
/* ---------- 쇼츠 ---------- */
function shortV(s){const c=chById(s.ch),lk=S.slk[s.id],dl=S.slk[s.id+'d'];return`<div class="sv" id="${s.id}" style="background:${gb(s.g)}" data-sid="${s.id}"><span>${esc(s.t)}</span><div class="ra"><button data-sl="${s.id}" class="${lk?'on':''}"><span class="c">${ic('up')}</span>${fv(s.lk+(lk?1:0))}</button><button data-sd="${s.id}" class="${dl?'on':''}"><span class="c">${ic('up','','transform:rotate(180deg)')}</span>싫어요</button><button data-cm="${s.id}"><span class="c">${ic('cm')}</span>${S.cm[s.id].length}</button><button data-share="1"><span class="c">${ic('share')}</span>공유</button></div><div class="bt"><div class="ch" data-ch="${c.id}">${av(c,32)}${esc(c.h)}<button class="sbtn ${S.subs[c.id]?'on':''}" data-ss="${c.id}">${S.subs[c.id]?'구독 중':'구독'}</button></div>${esc(s.t)}</div><div class="pb"><i></i></div></div>`}
function setupShorts(){const sh=$('#sh');if(!sh)return;const i=+(S.shi||0);sh.scrollTop=i*sh.clientHeight;let raf;sh.onscroll=()=>{cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>{S.shi=Math.round(sh.scrollTop/sh.clientHeight);anim()})};anim()}
let sT=null;function anim(){clearInterval(sT);let p=0;sT=setInterval(()=>{if(S.tab!='shorts'){clearInterval(sT);return}p=(p+1)%30;const el=document.querySelectorAll('.sv')[S.shi||0];el&&(el.querySelector('.pb i').style.width=(p/30*100)+'%')},500)}
/* ---------- 서브 페이지 ---------- */
function page(h,back){const p=$('#pg');p.hidden=false;p.className='pg';p.innerHTML=h;p.scrollTop=0;p.dataset.back=back||''}
function closePg(){const p=$('#pg');p.hidden=true;p.innerHTML='';render()}
const bar=(t,x='')=>`<div class="bar"><button class="ib" data-a="pgclose">${ic('back')}</button><span style="flex:1">${t}</span>${x}</div>`;
function openPg(k,arg){let h='';const L=l=>l.length?l.map(card).join(''):'<div class="em">동영상이 없어요.</div>';
if(k=='hist')h=bar('시청 기록')+L(S.hist.map(byId).filter(x=>x&&x.dur));
else if(k=='wl')h=bar('나중에 볼 동영상')+L(VID.filter(v=>S.saved[v.id]));
else if(k=='liked')h=bar('좋아요 표시한 동영상')+L(VID.filter(v=>S.liked[v.id]));
else if(k=='mine')h=bar('내 동영상')+L(VID.filter(v=>v.ch==ME));
else if(k=='pls')h=bar('재생목록')+`<div class="hs" style="padding-top:12px"><div class="hc" data-pg="wl"><div class="th" style="background:#2b3442">${ic('clock','',"width:34px;height:34px")}</div><b>나중에 볼 동영상</b></div><div class="hc" data-pg="liked"><div class="th" style="background:#44505f">${ic('up','',"width:34px;height:34px")}</div><b>좋아요 표시한 동영상</b></div></div>`;
else if(k=='ch'){const c=chById(arg),sb=S.subs[c.id];h=bar(c.n)+`<div class="ban" style="background:${gb(c.g)};height:110px;border-radius:0;margin:0"></div><div class="pf">${av(c,72)}<div><h2>${esc(c.n)}</h2><p>${c.h}</p><p>${c.sub} · 동영상 ${VID.filter(v=>v.ch==c.id).length}개</p></div></div><div style="padding:6px 12px 14px"><button class="sbtn ${sb?'on':''}" data-ss="${c.id}" style="width:100%;height:38px">${sb?'구독 중':'구독'}</button></div>`+VID.filter(v=>v.ch==c.id).map(card).join('')}
else if(k=='search'){h=`<div class="bar"><button class="ib" data-a="pgclose">${ic('back')}</button><div class="srch">${ic('search','',"width:18px;height:18px")}<input id="qi" placeholder="YouTube 검색" enterkeyhint="search"></div></div><div id="sr"><div class="em">검색어를 입력해보세요.<br>예) 라면, 부산, 파스타</div></div>`}
else if(k=='notif')h=bar('알림')+['밤하늘 뮤직님이 새 동영상을 업로드했습니다','뉴스브리핑 데일리님이 새 동영상을 업로드했습니다','누군가 내 댓글에 좋아요를 눌렀습니다'].map((t,i)=>`<div class="cm"><span class="av" style="width:40px;height:40px;background:${gb(CH[i<2?[2,4][i]:0].g)}">${i<2?CH[[2,4][i]].n[0]:'♥'}</span><div class="x"><p>${t}</p><div class="u">${i+1}시간 전</div></div></div>`).join('');
page(h,k);if(k=='search')setTimeout(()=>$('#qi').focus(),60)}
document.addEventListener('input',e=>{if(e.target.id=='qi'){const q=e.target.value.trim(),l=q?VID.filter(v=>(v.t+chById(v.ch).n+v.tag).includes(q)):[];$('#sr').innerHTML=q?(l.length?l.map(card).join(''):'<div class="em">검색 결과가 없어요.</div>'):'<div class="em">검색어를 입력해보세요.</div>'}if(e.target.id=='ci'){}});
/* ---------- 재생 화면 ---------- */
let P=null,T=null;
function openPl(id){const v=VID.find(x=>x.id==id);if(!v)return;S.hist=[id,...S.hist.filter(x=>x!=id)].slice(0,30);save();P={id,cur:S.pos[id]||0,play:true,fs:false,hu:false};clearInterval(T);T=setInterval(()=>{if(!P)return;if(P.play){P.cur=Math.min(v.dur,P.cur+1);if(P.cur>=v.dur)P.play=false;upd()}},1000);const p=$('#pl');p.hidden=false;drawPl(0)}
function closePl(){if(P){S.pos[P.id]=P.cur>=VID.find(x=>x.id==P.id).dur-2?0:P.cur;save()}clearInterval(T);P=null;$('#pl').hidden=true;$('#pl').innerHTML='';if($('#pg').hidden)render()}
function drawPl(keep){const v=VID.find(x=>x.id==P.id),c=chById(v.ch),lk=S.liked[v.id],ds=S.dis[v.id],sb=S.subs[c.id],cm=S.cm[v.id],p=$('#pl'),y=keep?p.scrollTop:0;
p.innerHTML=`<div class="pbx ${P.fs?'fs':''}" id="pbx"><div class="pp ${P.hu?'hu':''}" id="pp"><div class="g" style="background:${gb(v.g)}">${esc(v.t)}</div><div class="ov"><div class="tp"><button class="ib" data-a="plclose" style="color:#fff">${ic('down')}</button><span><button class="ib" data-a="cast" style="color:#fff">${ic('cast')}</button><button class="ib" data-a="plmenu" style="color:#fff">${ic('more')}</button></span></div><div class="md"><button data-a="sk" data-d="-10" class="sk" aria-label="10초 뒤로">${ic('back','','stroke:#fff;fill:none;width:20px')}10</button><button class="big" data-a="pp" id="ppb"></button><button data-a="sk" data-d="10" class="sk" aria-label="10초 앞으로">10${ic('back','','stroke:#fff;fill:none;width:20px;transform:scaleX(-1)')}</button></div><div class="bm"><span id="tm"></span><div class="bar2" id="bar"><i id="pr"></i><u id="kn"></u></div><button data-a="fs" style="color:#fff">${ic('full')}</button></div></div></div></div>
<div class="pi"><h1>${esc(v.t)}</h1><div class="mt">${views(v.views+(P.counted?1:0))} · ${agoD(v.days)}</div>
<div class="pch" data-ch="${c.id}">${av(c,40)}<div class="t"><b>${esc(c.n)}</b><span>${c.sub}</span></div><button class="sbtn ${sb?'on':''}" data-ss="${c.id}">${sb?'구독 중':'구독'}</button></div>
<div class="pa"><button class="pill ${lk?'on':''}" data-a="like">${ic('up')}${fv(v.lk+(lk?1:0))}</button><button class="pill ${ds?'on':''}" data-a="dis">${ic('up','','transform:rotate(180deg)')}</button><button class="pill" data-share="1">${ic('share')}공유</button><button class="pill ${S.saved[v.id]?'on':''}" data-a="wl">${ic('save')}${S.saved[v.id]?'저장됨':'저장'}</button></div>
<div class="cmp" data-cm="${v.id}" style="margin-top:14px"><b>댓글 ${cm.length}</b><div class="r">${av({g:GR[2],n:cm[0].u[1]},24)}<p>${esc(cm[0].tx)}</p></div></div></div>
${VID.filter(x=>x.id!=v.id).slice(0,10).map(card).join('')}`;
p.scrollTop=y;upd()}
function upd(){if(!P)return;const v=VID.find(x=>x.id==P.id),f=P.cur/v.dur*100;const b=$('#ppb');if(b)b.innerHTML=ic(P.play?'pause':'play','f','width:30px;height:30px');$('#tm').textContent=`${tf(P.cur)} / ${tf(v.dur)}`;$('#pr').style.width=f+'%';$('#kn').style.left=f+'%'}
let drag=false;
function scrub(e){const b=$('#bar'),r=b.getBoundingClientRect(),v=VID.find(x=>x.id==P.id);let x=P.fs?(e.clientY-r.top)/r.width*1:(e.clientX-r.left)/r.width;
if(P.fs){x=(e.clientY-r.top)/r.width}P.cur=Math.max(0,Math.min(1,x))*v.dur;upd()}
document.addEventListener('pointerdown',e=>{if(e.target.closest('#bar')){drag=true;scrub(e)}});
document.addEventListener('pointermove',e=>{if(drag)scrub(e)});
document.addEventListener('pointerup',()=>drag=false);
/* ---------- 시트 ---------- */
function sheet(h){const s=$('#sheet');s.hidden=false;s.innerHTML=`<div class="sh">${h}</div>`}
function closeSheet(){$('#sheet').hidden=true;$('#sheet').innerHTML=''}
function cmList(id){return S.cm[id].map(c=>`<div class="cm"><span class="av" style="width:32px;height:32px;font-size:13px;background:${gb(c.mine?chById(ME).g:(Array.isArray(c.col)?c.col:GR[0]))}">${esc(c.u.replace('@','')[0])}</span><div class="x"><div class="u">${esc(c.u)} · ${agoM(c.m)}</div><p>${esc(c.tx)}</p><div class="a"><button data-cl="${c.id}" class="${S.cl[c.id]?'on':''}">${ic('up','',"width:16px;height:16px")} ${c.lk+(S.cl[c.id]?1:0)}</button>${c.mine?`<button data-cd="${c.id}" data-v="${id}">삭제</button>`:''}</div></div></div>`).join('')}
function openCm(id){curCm=id;sheet(`<div class="hh">댓글 ${S.cm[id].length}<button class="ib" data-a="sclose">${ic('close')}</button></div><div class="bd" id="cmb">${cmList(id)}</div><div class="cin">${myAv(32)}<input id="ci" placeholder="댓글 추가..." maxlength="300"><button data-a="csend">등록</button></div>`)}
let curCm=null;
function menu(id){sheet(`<div class="bd" style="padding:8px 0"><button class="opt" data-a="mwl" data-v="${id}">${ic('clock')}나중에 볼 동영상에 저장${S.saved[id]?' (저장됨)':''}</button><button class="opt" data-a="mwl" data-v="${id}">${ic('save')}재생목록에 저장</button><button class="opt" data-share="1">${ic('share')}공유</button><button class="opt" data-a="sclose">${ic('ban')}관심 없음</button></div>`)}
function create(){sheet(`<div class="hh">만들기<button class="ib" data-a="sclose">${ic('close')}</button></div><div class="bd">${[['vid','동영상 업로드'],['shorts','Shorts 동영상 만들기'],['cast','라이브 스트리밍 시작']].map(x=>`<button class="opt" data-toast="${x[2]||x[1]+'는 이 시뮬레이션에서 지원하지 않아요'}">${ic(x[0])}${x[1]}</button>`).join('')}</div>`)}
/* ---------- 이벤트 ---------- */
document.addEventListener('keydown',e=>{if(e.key=='Enter'&&e.target.id=='ci')ACT.csend()});
const ACT={
 chip:d=>{S.chip=d.c;save();render()},cast:()=>toast('기기 연결은 지원하지 않아요'),search:()=>openPg('search'),notif:()=>openPg('notif'),me:()=>{S.tab='you';render()},
 switch:()=>toast('계정 전환은 지원하지 않아요'),create:()=>create(),pgclose:()=>closePg(),sclose:closeSheet,
 plclose:closePl,pp:()=>{const v=VID.find(x=>x.id==P.id);if(P.cur>=v.dur)P.cur=0;P.play=!P.play;upd()},sk:d=>{const v=VID.find(x=>x.id==P.id);P.cur=Math.max(0,Math.min(v.dur,P.cur+ +d.d));upd()},
 fs:()=>{P.fs=!P.fs;$('#pbx').classList.toggle('fs',P.fs)},plmenu:()=>menu(P.id),
 like:()=>{const id=P.id;S.liked[id]=!S.liked[id];if(S.liked[id])S.dis[id]=0;save();drawPl(1)},dis:()=>{const id=P.id;S.dis[id]=!S.dis[id];if(S.dis[id])S.liked[id]=0;save();drawPl(1)},
 wl:()=>{S.saved[P.id]=!S.saved[P.id];save();toast(S.saved[P.id]?'나중에 볼 동영상에 저장했어요':'저장을 취소했어요');drawPl(1)},
 mwl:d=>{S.saved[d.v]=!S.saved[d.v];save();toast(S.saved[d.v]?'나중에 볼 동영상에 저장했어요':'저장을 취소했어요');closeSheet()},
 csend:()=>{const i=$('#ci'),t=i.value.trim();if(!t)return;S.cm[curCm].unshift({id:curCm+'m'+Date.now(),u:'@marsssssss_',tx:t,lk:0,m:0,mine:true});save();openCm(curCm);if(P)drawPl(1);else if(S.tab=='shorts')render();toast('댓글을 추가했어요')}
};
document.addEventListener('click',e=>{const g=s=>e.target.closest(s);let x;
 if(x=g('[data-sd]')){const k=x.dataset.sd+'d',id=x.dataset.sd;S.slk[k]=!S.slk[k];if(S.slk[k])S.slk[id]=0;save();keepShorts();return}
 if(x=g('[data-sl]')){const id=x.dataset.sl;S.slk[id]=!S.slk[id];if(S.slk[id])S.slk[id+'d']=0;save();keepShorts();return}
 if(x=g('[data-ss]')){e.stopPropagation();const id=x.dataset.ss;S.subs[id]=!S.subs[id];save();toast(S.subs[id]?'구독했어요':'구독을 취소했어요');if(P)drawPl(1);else if(!$('#pg').hidden)openPgKeep();else if(S.tab=='shorts')keepShorts();else render();return}
 if(x=g('[data-cl]')){const id=x.dataset.cl;S.cl[id]=!S.cl[id];save();const b=$('#cmb'),y=b.scrollTop;b.innerHTML=cmList(curCm);b.scrollTop=y;return}
 if(x=g('[data-cd]')){S.cm[x.dataset.v]=S.cm[x.dataset.v].filter(c=>c.id!=x.dataset.cd);save();openCm(curCm);if(P)drawPl(1);return}
 if(x=g('[data-cm]')){openCm(x.dataset.cm);return}
 if(x=g('[data-menu]')){e.stopPropagation();menu(x.dataset.menu);return}
 if(g('[data-share]')){toast('링크를 복사했어요');return}
 if(x=g('[data-toast]')){toast(x.dataset.toast);closeSheet();return}
 if(x=g('[data-a]')){const f=ACT[x.dataset.a];if(f){f(x.dataset);return}}
 if(x=g('[data-ch]')){openPg('ch',x.dataset.ch);return}
 if(x=g('[data-o]')){if(P&&!$('#pl').hidden){P.cur=S.pos[x.dataset.o]||0;const id=x.dataset.o;closePlKeep();openPl(id);$('#pl').scrollTop=0}else openPl(x.dataset.o);return}
 if(x=g('[data-pg]')){openPg(x.dataset.pg);return}
 if(x=g('[data-sc]')){const id=x.dataset.sc;S.seen[id]=1;S.subch=S.subch==id?'':id;save();render();return}
 if(x=g('[data-t]')){const t=x.dataset.t;if(t=='create'){create();return}S.tab=t;save();render();return}
 if(g('#pp')&&!g('button')&&P){$('#pp').classList.toggle('hu')}
 if(e.target.id=='sheet')closeSheet();
});
function keepShorts(){const y=$('#sh').scrollTop;render();$('#sh').scrollTop=y}
function openPgKeep(){const p=$('#pg'),k=p.dataset.back,y=p.scrollTop;if(k=='ch'){/* 채널 페이지 재그리기 */const id=chByTitle(p);openPg('ch',id)}p.scrollTop=y}
function chByTitle(p){const t=p.querySelector('.bar span').textContent;return(CH.find(c=>c.n==t)||CH[0]).id}
function closePlKeep(){clearInterval(T);if(P)S.pos[P.id]=P.cur;P=null}
load();render();

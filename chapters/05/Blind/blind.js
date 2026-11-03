const $=s=>document.querySelector(s);
const K='yh05_blind_v1';
const IC={home:'<path d="M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/>',ch:'<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>',pen:'<path d="M4 20l1-4L16 5l3 3L8 19z"/><path d="M14 7l3 3"/>',bell:'<path d="M6 17v-6a6 6 0 0 1 12 0v6l2 2H4z"/><path d="M10 21h4"/>',me:'<circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/>',search:'<circle cx="11" cy="11" r="7"/><path d="M16 16l5 5"/>',mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',back:'<path d="M15 4l-8 8 8 8"/>',heart:'<path d="M12 21s-8-5-8-11a4.5 4.5 0 0 1 8-2.5A4.5 4.5 0 0 1 20 10c0 6-8 11-8 11z"/>',cmt:'<path d="M4 20l1.5-4A9 9 0 1 1 8 18.5z"/>',eye:'<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',more:'<circle cx="5" cy="12" r="1.2"/><circle cx="12" cy="12" r="1.2"/><circle cx="19" cy="12" r="1.2"/>',star:'<path d="M12 3l2.7 5.7 6.3.8-4.6 4.3 1.2 6.2L12 17l-5.6 3 1.2-6.2L3 9.5l6.3-.8z"/>',img:'<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5-5-9 9"/>',x:'<path d="M6 6l12 12M18 6L6 18"/>'};
const ic=(n,c='')=>`<svg viewBox="0 0 24 24" class="${c}">${IC[n]}</svg>`;
const BOARDS={
 '직장인':['직장인 일상','회사생활','이직·커리어','연봉·재테크','직장상사','출퇴근','점심·맛집','업무 스트레스','취업·면접'],
 '회사별':['삼성전자','네이버','카카오','쿠팡','현대자동차','LG전자','SK하이닉스','토스'],
 '직종별':['개발','기획·PM','디자인','영업','마케팅','인사·총무']};
const COMP=BOARDS['회사별'];
const ALL=[].concat(...Object.values(BOARDS));
// [게시판, 회사, 제목, 본문, 몇분전, 좋아요, 조회, [[댓글,좋아요,[대댓글]]]]
const SEED=[
['회사생활','삼성전자','부서 회식 문화 아직도 이런 데 있냐','우리 팀은 아직도 2차 노래방까지 가는데 이게 정상이야?\n금요일마다 눈치 보면서 빠지는 것도 한계다.',12,184,5230,[['요즘은 1차에서 끝내는 팀이 대부분이던데 부럽지도 않다 ㅋㅋ',31,['저희는 코로나 이후로 점심 회식으로 바뀜']],['빠지는 게 낫다 한 번 빠지면 다음부턴 안 물어봄',22],['팀장이 노래 좋아하면 답 없음',9]]],
['연봉·재테크','네이버','3년차 개발자 연봉 협상 이 정도면 괜찮은 거임?','올해 인상률 7%로 통보받았는데 동기들은 10 넘게 받았다는 말이 있음. 이의제기 해볼 만할까?',38,96,3110,[['평가 등급이 B면 7%는 평균 정도임. 근데 동기 정보는 믿지 마',44],['면담 요청해서 근거 물어보는 건 문제없음. 감정적으로만 안 가면 됨',27,['맞아요 저도 한 번 물어봤는데 다음 해에 반영해줌']],['이직 오퍼 하나 쥐고 협상하는 게 제일 빠르다',18]]],
['직장상사','','팀장이 퇴근 5분 전에 일 던지는 거 어떻게 막음?','매번 6시 땡 치면 급한 건 아닌데 내일 아침까지 보고서 만들어달라고 함. 말은 부탁인데 사실상 지시임.',55,261,8870,[['메일로 받아서 기록 남겨. 그럼 눈치 좀 봄',58],['"내일 오전 중에 드리면 될까요?" 하고 시간을 되물어봐',41,['이거 진짜 효과 있음 ㅋㅋ 급하면 급하다고 말함']],['그냥 5시 반에 자리 비우는 사람도 봤다',12]]],
['점심·맛집','','오늘 점심 뭐 먹지 판교 직장인 추천 좀','매일 구내식당 질려서 밖에 나가고 싶은데 걸어서 10분 안쪽에 괜찮은 데 없을까. 가격은 1만원대.',70,43,1620,[['알파돔 뒤쪽에 순두부집 줄은 길어도 회전 빠름',15],['제육 정식 하는 데 많은데 서쪽 골목이 맛있음',11],['11시 50분에 나가면 대기 없음 이게 꿀팁이다',24]]],
['출퇴근','','경기도 광역버스 출근 2시간 넘는 사람?','편도 1시간 50분인데 이직 말고는 답이 없는 걸까. 이사는 전세 때문에 어렵다.',95,137,4380,[['왕복 4시간이면 하루 6분의 1을 길에 버리는 거임',63],['저는 책 읽는 시간이라고 생각하고 버티는 중... 2년 됨',20,['대단하십니다 저는 1년 하고 이사했어요']],['재택 하는 날 있으면 그나마 버틸 만',17]]],
['업무 스트레스','카카오','월요일 아침 알람 끄고 한참 누워있었다','요즘 일요일 저녁부터 숨이 답답함. 번아웃인가 싶기도 하고 병원 가보는 게 맞을까?',130,312,10240,[['저도 그랬는데 정신과 가니까 불안 증세라고 하더라. 일단 가봐',77],['휴가 붙여서 쉬어보는 게 먼저 아닐까요',29],['일요일 저녁은 누구에게나 지옥임...',38]]],
['취업·면접','','면접에서 "왜 이직하세요?" 이렇게 답하면 떨어질까','솔직하게 야근 많아서라고 했는데 분위기가 싸해졌음. 다들 뭐라고 대답해?',180,58,2760,[['성장 가능성이나 직무 전환으로 포장하는 게 정석',34],['솔직한 건 좋은데 전 회사 험담처럼 들리면 안 됨',26],['야근 이유를 구조적 문제로 말하면 오히려 괜찮음',14]]],
['이직·커리어','쿠팡','쿠팡 물류 기획 리크루터 연락 받았는데 어때?','현직자 있으면 팀 분위기랑 워라밸 알려줘. 연봉은 지금보다 15% 정도 오른다고 함.',215,71,3380,[['성과 압박 강한 대신 보상은 확실한 편이야',40],['팀마다 편차가 너무 큼. 면접에서 팀 질문 많이 해봐',33],['스톡 어떻게 주는지도 꼭 확인해',19]]],
['개발','토스','코드리뷰 문화 좋은 회사 특징이 뭘까','리뷰가 형식적이라 배우는 게 없어서 이직 고민 중. 현직자들 팀은 어때?',260,64,2290,[['리뷰어가 의도를 물어보는 문화면 건강한 편',29],['PR 크기 제한 규칙 있는 팀이 대체로 잘 돌아가더라',21],['시니어가 먼저 피드백 받는 모습 보여주면 끝남',16]]],
['직장인 일상','','퇴근하고 헬스장 가는 사람들 대단하다','난 집 오면 씻고 바로 쓰러지는데 7시 헬스장에 사람이 왜 이렇게 많냐 ㅋㅋ',300,88,1840,[['출근 전에 가면 사람 없고 상쾌함',17],['저는 퇴근길에 곧장 가야 안 빠지더라구요',12],['체력 안 키우면 회사 못 다님 진짜로',35]]],
['회사생활','현대자동차','성과급 발표 났는데 기대 이하네','작년엔 400% 줬는데 올해는 반 정도라니. 연말 분위기 벌써 싸하다.',340,203,9420,[['업황 생각하면 그래도 잘 나온 거 아님?',24],['협력사는 이야기도 못 꺼냄 ㅠ',31,['그건 또 그렇네요']],['성과급 믿고 대출 낀 사람들 어쩌냐',48]]],
['직장상사','LG전자','일 못하는 상사 밑에서 버티는 법 있나요','결정은 못 하고 책임은 아래로 넘기는 스타일. 같은 팀 선배들도 다 지쳐 있음.',420,149,5630,[['기록으로 남기고 다른 팀에 내 성과를 보이는 게 중요',52],['오래 있을수록 내가 닮아감. 사수 바꿔달라고 해볼 수 있나',23],['6개월 목표 잡고 이직 준비하면서 다녀',37]]],
['점심·맛집','','구내식당 vs 밖에서 사먹기 어느 쪽이냐','밖에 나가면 만 원이 기본이라 한 달에 20만 원 더 나감. 구내식당은 질리고...',470,52,1980,[['도시락 싸오는 사람이 제일 부자됨',28],['일주일에 두 번만 밖에서 먹기로 정함',19],['점심시간이 유일한 낙인데 돈 아끼면 뭐 하나',22]]],
['출퇴근','SK하이닉스','이천 통근버스 자리 경쟁 너무 심함','새벽 6시 반 차를 놓치면 지각인데 줄이 항상 만석. 해결 방법 없나?',520,76,2410,[['앱에서 예약 가능한 노선으로 옮겨봐',18],['한 정거장 앞에서 타면 자리 있음',25],['자차 출퇴근 하는 사람은 또 주차가 전쟁이래',14]]],
['기획·PM','','PM 직무 신입이 공부해야 할 것들 알려주세요','비전공자고 요즘 SQL이랑 데이터 분석 공부 중인데 이게 맞는 방향인지 모르겠어요.',600,39,1530,[['포트폴리오로 서비스 개선안 한 개 만들어봐',21],['SQL이면 충분히 시작 잘한 거야. 숫자 보는 눈이 중요함',17],['신입 PM 공고는 적으니 마케터나 기획 직무도 같이 봐',13]]],
['마케팅','','광고비 쓰는 마케터 월급은 얼마나 돼?','퍼포먼스 마케팅 3년차 연봉 5천 정도인데 낮은 건지 궁금해요.',680,45,1710,[['스타트업 기준이면 평균 정도임',14],['대기업 이직하면 6천까지는 올라간다 들었음',20],['성과 숫자를 자료로 정리해두는 게 협상에 큰 도움됨',12]]],
['취업·면접','','올해 하반기 공채 서류 합격했다!!','처음으로 서류 합격 받아봤다. 인적성 어떻게 준비하는지 후기 좀 부탁드립니다.',760,119,2230,[['축하해요! 인적성은 기출 위주로 2주 하면 충분해',33],['시간 재면서 푸는 연습이 제일 중요함',18],['면접 준비도 같이 하세요 금방 옴',11]]],
['업무 스트레스','','보고서 12번 수정하고 결국 처음 버전으로 확정','하루 종일 고쳤는데 결국 맨 처음 버전으로 가자고 함. 나 오늘 뭐 했냐...',840,274,7760,[['이거 매번 있는 일인데 매번 화남 ㅋㅋㅋ',66],['버전 파일 다 남겨놓으면 나중에 증거가 됨',29],['고생했다 오늘은 치킨 시켜라',45]]],
['연봉·재테크','','직장인 비상금 몇 개월치 가지고 있어?','생활비 기준 6개월치는 모아야 한다던데 현실적으로 힘들다. 다들 얼마나 있음?',920,67,2050,[['3개월치 정도 있고 나머지는 투자해둠',15],['CMA에 넣어두면 이자도 조금 붙음',22],['이직 준비하려면 적어도 3개월은 필요해',31]]],
['디자인','','디자이너인데 개발자랑 소통이 제일 힘들다','피그마에 다 적어놨는데 구현은 다르게 나옴. 서로 입장이 있는 건 아는데 답답해.',1010,53,1670,[['QA 단계에서 디자인 리뷰 시간을 따로 잡아봐',19],['개발 쪽에서는 스펙이 모호하면 어쩔 수 없음',14,['맞음 간격 수치 정리해주면 좋아함']],['컴포넌트 문서가 있으면 훨씬 덜 싸워요',17]]],
['직장인 일상','네이버','사내 카페 라떼 맛있는데 줄이 너무 길다','오전 10시만 되면 20명씩 줄 서있음. 다들 일 안 하나 ㅋㅋ',1140,31,1210,[['저도 그 줄에 서있습니다',9],['오전 9시 반이 한가함',13],['커피 마시는 시간도 업무의 일부라고 생각해요',8]]],
['영업','','영업직 실적 압박 어디까지 견디는 게 맞음?','월말마다 팀장 눈치 때문에 숨 막힌다. 실적은 나쁘지 않은데도 매번 부족하다고 함.',1300,102,3040,[['목표 기준이 계속 올라가는 구조면 답이 없음',27],['그만큼 인센티브를 주는지가 중요한 듯',23],['실적 좋은데도 압박이면 문제는 사람임',35]]],
['인사·총무','','인사팀 입장에서 말하는 면접 탈락 이유','지원자 태도가 제일 큼. 스펙 비슷하면 협업 가능한지가 갈림. 질문 있으면 받는다.',1500,176,6120,[['면접관 입장에서 제일 싫은 답변이 뭐예요?',38,['말 돌리고 같은 얘기 반복하는 거요']],['학점 컷 정말 있나요?',24],['역질문 준비 안 하면 감점인가요',16]]]
];
let S=null;
const now=()=>Date.now();
function seed(){const t=now();let id=1000;const posts=SEED.map(p=>({id:id++,board:p[0],co:p[1],title:p[2],body:p[3],at:t-p[4]*60000,likes:p[5],views:p[6],mine:false,imgs:[],cm:p[7].map((c,i)=>({id:id++,at:t-p[4]*60000+(i+1)*420000,t:c[0],likes:c[1],re:(c[2]||[]).map(r=>({id:id++,at:t-p[4]*60000+(i+1)*900000,t:r,likes:Math.max(1,c[1]>>3)}))}))}));
return{posts,liked:{},cl:{},fav:['회사생활','개발','삼성전자'],hist:[],next:id,tab:'home',home:'hot',notif:[{t:'내 글에 새 댓글이 달렸어요.',at:t-3600000},{t:'오늘의 인기글을 확인해보세요.',at:t-7200000}]}}
function load(){
 let raw=null;try{raw=JSON.parse(localStorage.getItem(K))}catch(e){}
 if(!raw||!Array.isArray(raw.posts)){S=seed();return}
 const base=seed();
 const num=(v,d=0)=>Number.isFinite(Number(v))?Number(v):d;
 const posts=raw.posts.map((p,i)=>{
  if(!p||typeof p!=='object')return null;
  const cm=Array.isArray(p.cm)?p.cm:[];
  return {...p,id:num(p.id,base.next+i),board:String(p.board||'직장인 일상'),co:String(p.co||''),title:String(p.title||''),body:String(p.body||''),at:num(p.at,now()),likes:num(p.likes),views:num(p.views),mine:!!p.mine,imgs:Array.isArray(p.imgs)?p.imgs.filter(x=>typeof x==='string'):[],cm:cm.filter(c=>c&&typeof c==='object').map((c,j)=>({...c,id:num(c.id,base.next+1000+i*100+j),at:num(c.at,now()),t:String(c.t||''),likes:num(c.likes),re:(Array.isArray(c.re)?c.re:[]).filter(r=>r&&typeof r==='object').map((r,k)=>({...r,id:num(r.id,base.next+2000+i*100+j*10+k),at:num(r.at,now()),t:String(r.t||''),likes:num(r.likes)}))}))};
 }).filter(Boolean);
 const obj=v=>v&&typeof v==='object'&&!Array.isArray(v)?v:{};
 S={...base,...raw,posts,liked:obj(raw.liked),cl:obj(raw.cl),fav:Array.isArray(raw.fav)?raw.fav.filter(x=>typeof x==='string'):base.fav,hist:Array.isArray(raw.hist)?raw.hist.filter(x=>typeof x==='string'):[],notif:Array.isArray(raw.notif)?raw.notif.filter(n=>n&&typeof n==='object').map(n=>({...n,t:String(n.t||''),at:num(n.at,now())})):base.notif,tab:['home','ch','write','bell','me'].includes(raw.tab)?raw.tab:'home',home:['hot','new','fav'].includes(raw.home)?raw.home:'hot'};
 const ids=posts.flatMap(p=>[p.id,...p.cm.flatMap(c=>[c.id,...c.re.map(r=>r.id)])]).filter(Number.isFinite);
 S.next=Math.max(num(raw.next,base.next),...ids.map(x=>x+1),base.next);
 try{localStorage.setItem(K,JSON.stringify(S))}catch(e){}
}
function save(){try{localStorage.setItem(K,JSON.stringify(S))}catch(e){}}
const ago=t=>{const m=Math.floor((now()-t)/60000);if(m<1)return'방금 전';if(m<60)return m+'분 전';const h=Math.floor(m/60);if(h<24)return h+'시간 전';const d=Math.floor(h/24);return d<30?d+'일 전':new Date(t).toLocaleDateString('ko-KR')};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const cnt=p=>(Array.isArray(p.cm)?p.cm:[]).reduce((a,c)=>a+1+(Array.isArray(c.re)?c.re.length:0),0);
const toast=m=>{const e=$('#toast');e.textContent=m;e.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.remove('show'),1600)};
const hotScore=p=>p.likes*2+cnt(p)*3+p.views/100;
function card(p){p.cm=Array.isArray(p.cm)?p.cm:[];p.imgs=Array.isArray(p.imgs)?p.imgs:[];const lk=!!S.liked[p.id];return`<div class="post" data-id="${p.id}"><div class="meta"><b>${esc(p.co||p.board)}</b>${p.co?'· '+esc(p.board):''}· 익명 · ${ago(p.at)}</div><div class="pt">${esc(p.title)}</div><div class="pb">${esc(p.body)}</div><div class="st"><span class="${lk?'on':''}">${ic('heart')}${p.likes+(lk?1:0)}</span><span>${ic('cmt')}${cnt(p)}</span><span>${ic('eye')}${p.views.toLocaleString()}</span>${p.likes+cnt(p)>260?'<span class="hot">HOT</span>':''}</div></div>`}
function feed(list,msg){return list.length?list.map(card).join(''):`<div class="empty">${msg||'게시글이 없어요.'}</div>`}
function top(t){return`<div class="top"><div class="${t?'ttl':'logo'}">${t||'blind'}</div><div class="r"><button data-a="search" aria-label="검색">${ic('search')}</button><button data-a="mail" aria-label="쪽지">${ic('mail')}</button></div></div>`}
const TABS=[['home','홈','home'],['ch','채널','ch'],['write','글쓰기','pen'],['bell','알림','bell'],['me','내 정보','me']];
function render(){
 $('#tabs').innerHTML=TABS.map(t=>`<button data-t="${t[0]}" class="${S.tab===t[0]?'on':''}">${ic(t[2])}${t[1]}</button>`).join('');
 const el=$('#screen');let h='';
 if(S.tab==='home'){let l=[...S.posts];if(S.home==='hot')l.sort((a,b)=>hotScore(b)-hotScore(a));else l.sort((a,b)=>b.at-a.at);
  h=top()+`<div class="seg">${[['hot','인기글'],['new','최신글'],['fav','관심 게시판']].map(s=>`<button data-h="${s[0]}" class="${S.home===s[0]?'on':''}">${s[1]}</button>`).join('')}</div><div class="scroll" id="sc">${S.home==='fav'?feed(l.filter(p=>S.fav.includes(p.board)||S.fav.includes(p.co)),'관심 게시판을 추가해보세요.\n채널 탭에서 ★를 눌러 담을 수 있어요.'):feed(l)}</div>`}
 else if(S.tab==='ch'){const row=n=>`<div class="row" data-b="${esc(n)}"><div>${esc(n)}<small>${S.posts.filter(p=>p.board===n||p.co===n).length}</small></div><button class="star ${S.fav.includes(n)?'on':''}" data-f="${esc(n)}" aria-label="관심">${ic('star')}</button></div>`;
  const pop=[...ALL].map(n=>[n,S.posts.filter(p=>p.board===n||p.co===n).reduce((a,p)=>a+hotScore(p),0)]).sort((a,b)=>b[1]-a[1]).slice(0,5).map(a=>a[0]);
  h=top('채널')+`<div class="scroll"><div class="sec">⭐ 관심 게시판</div>${S.fav.length?`<div class="chips">${S.fav.map(n=>`<span class="chip" data-b="${esc(n)}">${esc(n)}</span>`).join('')}</div>`:'<div class="empty" style="padding:14px">★로 관심 게시판을 추가하세요.</div>'}<div class="sec">🔥 인기 게시판</div>${pop.map(row).join('')}${Object.entries(BOARDS).map(([g,l])=>`<div class="sec">${g} 게시판</div>${l.map(row).join('')}`).join('')}</div>`}
 else if(S.tab==='bell'){h=top('알림')+`<div class="scroll">${S.notif.length?S.notif.map(n=>`<div class="row"><div>${esc(n.t)}<small>${ago(n.at)}</small></div></div>`).join(''):'<div class="empty">새로운 알림이 없어요.</div>'}</div>`}
 else if(S.tab==='me'){const mine=S.posts.filter(p=>p.mine);h=top('내 정보')+`<div class="scroll"><div class="lg"><div class="logo">blind</div><p>로그인 · 회사 인증은 화면 구성만 제공돼요.</p><button class="btn" data-a="login">이메일로 로그인</button><button class="btn g" data-a="verify">회사 이메일 인증</button></div><div class="sec">내가 쓴 글 (${mine.length})</div>${feed(mine,'아직 작성한 글이 없어요.')}</div>`}
 el.innerHTML=h;
}
function layer(h){const l=$('#layer');l.className='layer show';l.innerHTML=h}
function close(){const l=$('#layer');l.className='';l.innerHTML=''}
let cur=null,replyTo=null;
function openPost(id){const p=S.posts.find(x=>x.id==id);if(!p)return;cur=p;replyTo=null;p.views++;save();drawPost()}
function cmHtml(p,c,re){const k=c.id,lk=S.cl[k];return`<div class="cm ${re?'re':''}"><div class="n">익명${(re?'':'')} <i>${ago(c.at)}</i>${c.mine?'<span class="au">내 댓글</span>':''}</div><p>${esc(c.t)}</p><div class="a"><button data-cl="${k}" class="${lk?'on':''}">♡ ${c.likes+(lk?1:0)}</button>${re?'':`<button data-rp="${c.id}">답글</button>`}${c.mine?`<button data-dc="${c.id}">삭제</button>`:''}</div></div>`}
function drawPost(){const p=cur,lk=S.liked[p.id],sc=$('#layer .scroll'),y=sc?sc.scrollTop:0;
 layer(`<div class="back"><button data-a="close">${ic('back')}</button><div class="g">${esc(p.board)}</div><button data-a="more">${ic('more')}</button></div><div class="scroll"><div class="dt"><div class="meta"><b>${esc(p.co||p.board)}</b>· 익명 · ${ago(p.at)}</div><h1>${esc(p.title)}</h1><div class="body">${esc(p.body)}</div>${p.imgs.length?`<div class="imgs">${p.imgs.map(s=>`<img src="${s}" alt="">`).join('')}</div>`:''}<div class="meta" style="margin-top:14px">${ic('eye','')}<span>조회 ${p.views.toLocaleString()}</span></div></div><div class="act"><button data-a="like" class="${lk?'on':''}">${ic('heart')}좋아요 ${p.likes+(lk?1:0)}</button><button data-a="focus">${ic('cmt')}댓글 ${cnt(p)}</button></div>${p.cm.length?p.cm.map(c=>cmHtml(p,c)+c.re.map(r=>cmHtml(p,r,1)).join('')).join(''):'<div class="empty">첫 댓글을 남겨보세요.</div>'}</div><div class="cin">${replyTo?`<span class="rt">답글 작성 중 ✕</span>`:''}<input id="ci" placeholder="${replyTo?'답글을 입력하세요':'댓글을 입력하세요'}" maxlength="500"><button data-a="send">등록</button></div>`);
 const n=$('#layer .scroll');if(n)n.scrollTop=y}
function sheet(h){const s=$('#sheet');s.innerHTML=`<div class="box">${h}</div>`;s.classList.add('show')}
const unsheet=()=>$('#sheet').classList.remove('show');
function openBoard(n){const l=S.posts.filter(p=>p.board===n||p.co===n).sort((a,b)=>b.at-a.at);layer(`<div class="back"><button data-a="close">${ic('back')}</button><div class="g">${esc(n)}</div><button class="star ${S.fav.includes(n)?'on':''}" data-f="${esc(n)}">${ic('star')}</button></div><div class="scroll">${feed(l,'아직 글이 없어요. 첫 글을 남겨보세요.')}</div>`)}
function openSearch(q=''){const r=q?S.posts.filter(p=>(p.title+p.body+p.board+p.co).includes(q)):[];layer(`<div class="back"><button data-a="close">${ic('back')}</button><div class="sbox">${ic('search')}<input id="qi" placeholder="회사, 게시글 검색" value="${esc(q)}" enterkeyhint="search"></div></div><div class="scroll">${q?feed(r,'검색 결과가 없어요.'):`<div class="sec">최근 검색어</div><div class="chips">${S.hist.length?S.hist.map(h=>`<span class="chip" data-q="${esc(h)}">${esc(h)}</span>`).join(''):'<span class="meta">검색 기록이 없어요.</span>'}</div><div class="sec">추천 검색어</div><div class="chips">${['연봉','이직','면접','회식','성과급','출퇴근'].map(h=>`<span class="chip" data-q="${h}">${h}</span>`).join('')}</div>`}</div>`);if(!q)setTimeout(()=>{const i=$('#qi');i&&i.focus()},50)}
let draft={board:'',title:'',body:'',imgs:[]};
function openWrite(){layer(`<div class="back"><button data-a="close">${ic('x')}</button><div class="g">글쓰기</div><button class="ok" id="reg" data-a="submit" ${draft.board&&draft.title.trim()&&draft.body.trim()?'':'disabled'}>등록</button></div><div class="scroll" style="display:flex;flex-direction:column"><div class="f1" data-a="pickb"><b>${draft.board?esc(draft.board):'게시판 선택'}</b><span>›</span></div><input class="ti" id="wt" placeholder="제목" maxlength="60" value="${esc(draft.title)}"><textarea class="ta" id="wb" placeholder="블라인드는 익명 커뮤니티입니다.\n개인정보와 비방은 삼가주세요.">${esc(draft.body)}</textarea><div class="att"><button class="add" data-a="img">${ic('img')}${draft.imgs.length}/4</button>${draft.imgs.map((s,i)=>`<div class="th" style="background-image:url(${s})"><b data-ri="${i}">×</b></div>`).join('')}</div><div class="nt">작성자는 익명으로 표시돼요.</div></div>`)}
function chk(){const b=$('#reg');if(b)b.disabled=!(draft.board&&draft.title.trim()&&draft.body.trim())}
document.addEventListener('input',e=>{if(e.target.id==='wt'){draft.title=e.target.value;chk()}else if(e.target.id==='wb'){draft.body=e.target.value;chk()}});
document.addEventListener('keydown',e=>{if(e.key==='Enter'){if(e.target.id==='ci')act('send');else if(e.target.id==='qi'){const q=e.target.value.trim();if(q){S.hist=[q,...S.hist.filter(x=>x!==q)].slice(0,8);save();openSearch(q)}}}});
$('#pick').addEventListener('change',e=>{[...e.target.files].slice(0,4-draft.imgs.length).forEach(f=>{const r=new FileReader();r.onload=()=>{const im=new Image();im.onload=()=>{const c=document.createElement('canvas'),k=Math.min(1,640/im.width);c.width=im.width*k;c.height=im.height*k;c.getContext('2d').drawImage(im,0,0,c.width,c.height);draft.imgs.push(c.toDataURL('image/jpeg',.7));openWrite()};im.src=r.result};r.readAsDataURL(f)});e.target.value=''});
function act(a,el){
 if(a==='close'){close();cur=null;render()}
 else if(a==='search')openSearch();
 else if(a==='mail'||a==='login'||a==='verify')toast(a==='mail'?'쪽지는 준비 중이에요':'UI만 제공되는 기능이에요');
 else if(a==='like'){const k=cur.id;S.liked[k]=!S.liked[k];save();drawPost()}
 else if(a==='focus'){const i=$('#ci');i&&i.focus()}
 else if(a==='send'){const i=$('#ci'),t=i.value.trim();if(!t)return;const c={id:S.next++,at:now(),t,likes:0,mine:true,re:[]};if(replyTo){const par=cur.cm.find(x=>x.id==replyTo);par.re.push(c)}else cur.cm.push(c);replyTo=null;save();drawPost();const sc=$('#layer .scroll');sc.scrollTop=sc.scrollHeight;toast('댓글이 등록됐어요')}
 else if(a==='more')sheet(`<div class="tt">게시글 메뉴</div>${cur.mine?'<button class="rd" data-a="del">삭제</button>':''}<button class="rd" data-a="report">신고하기</button><button data-a="unsheet">닫기</button>`);
 else if(a==='report')sheet(`<div class="tt">신고 사유를 선택하세요</div>${['욕설·비방','광고·스팸','개인정보 노출','허위 사실','기타'].map(r=>`<button data-a="rdone">${r}</button>`).join('')}<button data-a="unsheet">취소</button>`);
 else if(a==='rdone'){unsheet();toast('신고가 접수되었어요')}
 else if(a==='unsheet')unsheet();
 else if(a==='del'){S.posts=S.posts.filter(p=>p!==cur);save();unsheet();close();render();toast('삭제되었어요')}
 else if(a==='pickb')sheet(`<div class="tt">게시판 선택</div><div style="max-height:50vh;overflow:auto">${ALL.map(n=>`<button data-sb="${esc(n)}">${esc(n)}</button>`).join('')}</div>`);
 else if(a==='img'){if(draft.imgs.length>=4)toast('최대 4장까지 첨부할 수 있어요');else $('#pick').click()}
 else if(a==='submit'){const co=COMP.includes(draft.board)?draft.board:'';const p={id:S.next++,board:draft.board,co:'',title:draft.title.trim(),body:draft.body.trim(),at:now(),likes:0,views:1,mine:true,imgs:draft.imgs,cm:[]};S.posts.unshift(p);draft={board:'',title:'',body:'',imgs:[]};S.tab='home';S.home='new';save();close();render();toast('게시글이 등록되었어요')}
}
document.addEventListener('click',e=>{
 const g=s=>e.target.closest(s);let x;
 if(x=g('[data-sb]')){draft.board=x.dataset.sb;unsheet();openWrite();return}
 if(x=g('[data-f]')){e.stopPropagation();const n=x.dataset.f;S.fav=S.fav.includes(n)?S.fav.filter(v=>v!==n):[...S.fav,n];save();$('#layer.show')?openBoard(n):render();toast(S.fav.includes(n)?'관심 게시판에 추가했어요':'관심 게시판에서 뺐어요');return}
 if(x=g('[data-a]')){act(x.dataset.a,x);return}
 if(x=g('#sheet')){if(e.target.id==='sheet')unsheet();return}
 if(x=g('[data-cl]')){const k=x.dataset.cl;S.cl[k]=!S.cl[k];save();drawPost();return}
 if(x=g('[data-rp]')){replyTo=+x.dataset.rp;drawPost();$('#ci').focus();return}
 if(x=g('[data-dc]')){const id=+x.dataset.dc;cur.cm=cur.cm.filter(c=>c.id!==id).map(c=>({...c,re:c.re.filter(r=>r.id!==id)}));save();drawPost();return}
 if(g('.rt')){replyTo=null;drawPost();return}
 if(x=g('[data-ri]')){draft.imgs.splice(+x.dataset.ri,1);openWrite();return}
 if(x=g('[data-q]')){openSearch(x.dataset.q);return}
 if(x=g('.post')){openPost(x.dataset.id);return}
 if(x=g('[data-b]')){openBoard(x.dataset.b);return}
 if(x=g('[data-h]')){S.home=x.dataset.h;save();render();return}
 if(x=g('[data-t]')){const t=x.dataset.t;if(t==='write'){openWrite();return}S.tab=t;save();render();return}
});
window.addEventListener('error',e=>{const el=$('#screen');if(el&&!el.innerHTML.trim())el.innerHTML='<div class="empty">블라인드를 불러오지 못했어요. 페이지를 새로고침해 주세요.</div>';});
window.addEventListener('unhandledrejection',()=>{const el=$('#screen');if(el&&!el.innerHTML.trim())el.innerHTML='<div class="empty">블라인드를 불러오지 못했어요. 페이지를 새로고침해 주세요.</div>';});
try{load();render()}catch(err){console.error('[Blind init]',err);try{S=seed();save();render()}catch(err2){console.error('[Blind fallback]',err2);const el=$('#screen');if(el)el.innerHTML='<div class="empty">블라인드를 불러오지 못했어요. 페이지를 새로고침해 주세요.</div>'}}

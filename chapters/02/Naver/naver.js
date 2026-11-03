(function(){
'use strict';
var $=function(s){return document.querySelector(s)};
var stack=[{v:'main'}],recent=[],ptab=0,pg=1,view;
var RECENT0=['청소년 쉼터','미성년자 집 구하는 법','부모 연락두절 찾는 법'];
try{var raw=sessionStorage.getItem('nvRecent');recent=raw===null?RECENT0.slice():JSON.parse(raw)}catch(e){recent=RECENT0.slice()}
function save(){try{sessionStorage.setItem('nvRecent',JSON.stringify(recent))}catch(e){}}
function E(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
/* ───────── 벡터 아이콘 (24×24) ───────── */
var P={
bell:'<path d="M6 16v-5a6 6 0 0 1 12 0v5l1.5 2h-15z"/><path d="M10 20.5a2 2 0 0 0 4 0"/>',
search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5 21 21"/>',
camera:'<rect x="3" y="7" width="18" height="13" rx="2.5"/><path d="M8 7l1.5-3h5L16 7"/><circle cx="12" cy="13.5" r="3.5"/>',
mic:'<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
play:'<path d="M8 5v14l11-7z"/>',
back:'<path d="M15 4 7 12l8 8"/>',
close:'<path d="M5 5l14 14M19 5 5 19"/>',
chevD:'<path d="M5 9l7 7 7-7"/>',
chevR:'<path d="M9 5l7 7-7 7"/>',
share:'<path d="M12 3v12M7 8l5-5 5 5M5 14v6h14v-6"/>',
star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
chat:'<path d="M4 5h16v11H9l-5 4z"/>',
heart:'<path d="M12 20S4 14.5 4 9a4 4 0 0 1 8-1 4 4 0 0 1 8 1c0 5.5-8 11-8 11z"/>',
arrow:'<path d="M17 17 7 7M7 15V7h8"/>',
image:'<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="1.6"/><path d="M3 17l5-4 4 3 4-4 5 5"/>',
sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
cloudsun:'<circle cx="8" cy="8" r="3"/><path d="M8 2v1M2 8h1M3.8 3.8l.7.7M12.2 3.8l-.7.7"/><path d="M8 20a4 4 0 0 1 .5-8A5.5 5.5 0 0 1 19 13.5 3.25 3.25 0 0 1 18.5 20z"/>',
pin:'<path d="M12 21s-6-5.5-6-11a6 6 0 0 1 12 0c0 5.5-6 11-6 11z"/><circle cx="12" cy="10" r="2.2"/>',
mail:'<rect x="3" y="6" width="18" height="12" rx="1.5"/><path d="M3 8l9 6 9-6"/>',
cafe:'<path d="M5 8h11v6a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5zM16 10h2a2.5 2.5 0 0 1 0 5h-2M8 3v2M12 3v2"/>',
blog:'<path d="M4 20l1-5L16 4l4 4L9 19zM14 6l4 4"/>',
kin:'<path d="M4 5h16v11h-9l-4 4v-4H4z"/><path d="M10 9.5a2 2 0 1 1 3 1.7c-.7.4-1 .8-1 1.5"/><circle cx="12" cy="14.8" r=".6" fill="currentColor"/>',
shop:'<path d="M5 8h14l-1 12H6zM9 8V6a3 3 0 0 1 6 0v2"/>',
toon:'<rect x="4" y="5" width="16" height="14" rx="2"/><path d="M4 15l4-4 4 4 3-3 5 5"/><circle cx="9" cy="9.5" r="1.3"/>',
map:'<path d="M12 21s-6-5.5-6-11a6 6 0 0 1 12 0c0 5.5-6 11-6 11z"/><circle cx="12" cy="10" r="2.2"/>',
dict:'<path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3zM5 17a3 3 0 0 1 3-3h11"/>',
news:'<path d="M5 4h11v16H7a2 2 0 0 1-2-2zM16 8h3v10a2 2 0 0 1-2 2M8 8h5M8 12h5M8 16h5"/>',
stock:'<path d="M4 19V5M4 19h16M7 15l4-4 3 3 5-6"/>',
estate:'<path d="M4 11l8-7 8 7M6 10v10h12V10M10 20v-6h4v6"/>',
movie:'<rect x="3" y="6" width="18" height="13" rx="1"/><path d="M3 10h18M7 6l2 4M12 6l2 4M17 6l2 4"/>',
music:'<path d="M9 18V6l10-2v12"/><circle cx="7" cy="18" r="2.2"/><circle cx="17" cy="16" r="2.2"/>',
book:'<path d="M12 6c-2-1.5-5-2-8-2v14c3 0 6 .5 8 2 2-1.5 5-2 8-2V4c-3 0-6 .5-8 2zM12 6v14"/>',
life:'<path d="M12 20S4 14.5 4 9a4 4 0 0 1 8-1 4 4 0 0 1 8 1c0 5.5-8 11-8 11z"/>',
sports:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
tech:'<path d="M4 15l2-6h12l2 6v3H4zM4 15h16"/><circle cx="8" cy="18" r="1.5"/><circle cx="16" cy="18" r="1.5"/>',
game:'<rect x="3" y="8" width="18" height="9" rx="4.5"/><path d="M8 10.5v4M6 12.5h4"/><circle cx="15.5" cy="11.5" r=".9"/><circle cx="18" cy="13.5" r=".9"/>',
tv:'<rect x="3" y="5" width="18" height="12" rx="1.5"/><path d="M9 21h6M12 17v4M10 9l5 3-5 3z"/>',
shirt:'<path d="M8 4l-5 3 2 4 2-1v10h10V10l2 1 2-4-5-3a4 4 0 0 1-8 0z"/>',
bag:'<path d="M5 9h14l1 11H4zM9 9V7a3 3 0 0 1 6 0v2"/>',
shoe:'<path d="M3 16v-3l5-1 3-4 3 3 6 2v3zM3 19h18"/>',
watch:'<rect x="8" y="7" width="8" height="10" rx="2"/><path d="M9 7l1-4h4l1 4M9 17l1 4h4l1-4M12 10v2l1.5 1"/>'
};
function ic(n,s,c,w){return '<svg class="vi" viewBox="0 0 24 24" width="'+s+'" height="'+s+'" fill="none" stroke="'+(c||'currentColor')+'" stroke-width="'+(w||2)+'" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(P[n]||'')+'</svg>'}
var COL={mail:'#1ec800',cafe:'#ff8a00',blog:'#2db400',kin:'#3b8bff',shop:'#f5426c',toon:'#00c9a7',map:'#4a90e2',dict:'#7b61ff',news:'#5b6370',stock:'#e53935',estate:'#8d6e63',movie:'#ab47bc',music:'#ec407a',book:'#26a69a',life:'#ef6c8a',sports:'#2e7dd7',tech:'#455a64',game:'#7e57c2',tv:'#d84315'};
function sv(k){return '<i class="sv" style="background:'+(COL[k]||'#888')+'">'+ic(k,22,'#fff',1.8)+'</i>'}
/* ───────── 데이터 (2018년 10월 설정) ───────── */
var SVC=[['메일','mail'],['카페','cafe'],['블로그','blog'],['지식iN','kin'],['쇼핑','shop'],['웹툰','toon'],['사전','dict'],['뉴스','news'],['증권','stock'],['영화','movie'],['뮤직','music']];
var TOPIC=[['라이프','life'],['스포츠','sports'],['차·테크','tech'],['웹툰','toon'],['게임','game'],['TV·동영상','tv'],['뮤직','music'],['영화','movie'],['책·공연','book']];
var TABS=[['뉴스',0,6],['연예',6,11],['스포츠',11,16],['웹툰·뿜',16,19],['차·테크',19,24]];
var CATS=['주요뉴스','정치','경제','사회','생활/문화','IT/과학','스포츠','연예'];
var NEWS=[
['국정감사 2주차 돌입…여야 쟁점 공방 이어져','연합뉴스','10분 전','상임위별 감사가 이어지며 주요 현안을 둘러싼 질의가 오갔다.'],
['태풍 콩레이 북상…남해안 강풍 특보','KBS뉴스','32분 전','기상청은 주말 사이 비바람이 거세질 것으로 내다봤다.'],
['한글날 연휴 앞두고 전국 나들이 행렬','SBS','1시간 전','가을 날씨 속에 주요 관광지마다 방문객이 몰릴 전망이다.'],
['환절기 일교차 커져…감기 환자 늘어','매일경제','2시간 전','보건당국은 개인 위생과 보온에 신경 쓸 것을 당부했다.'],
['애플 아이폰XS 국내 출시 임박…예약 판매 관심','전자신문','3시간 전','이동통신 3사가 사전 예약 일정을 속속 공개하고 있다.'],
['단풍 절정 시기 다가와…설악산 첫 단풍','MBC','4시간 전','예년보다 이른 단풍이 산 정상부터 번지고 있다.'],
['인기 가수 새 앨범 발매…음원 차트 상위권','스타뉴스','20분 전','공개 직후 주요 음원 사이트 실시간 순위에 올랐다.'],
['주말 드라마 시청률 상승세…화제의 장면','OSEN','1시간 전','온라인에서도 관련 영상이 빠르게 퍼지고 있다.'],
['가을 극장가 개봉작 관객 몰이 계속','씨네21','2시간 전','주말 박스오피스에서도 상위권을 지켰다.'],
['예능 프로그램 새 코너 호평…화제성 1위','텔레뉴스','3시간 전','출연진의 호흡이 시청자의 웃음을 자아냈다.'],
['가요계 컴백 대전…가을 앨범 줄줄이','스포츠서울','5시간 전','다수의 가수가 이달 컴백을 예고했다.'],
['프로야구 포스트시즌 돌입, 와일드카드 관심','스포츠동아','15분 전','연장 접전 끝에 짜릿한 승부가 펼쳐졌다.'],
['프로축구 상위 스플릿 순위 경쟁 치열','일간스포츠','1시간 전','남은 경기 결과에 따라 순위가 요동칠 전망이다.'],
['손흥민 시즌 활약, 현지 언론 호평','연합뉴스','2시간 전','경기 후 현지 매체는 높은 평점을 부여했다.'],
['남자 배구 대표팀 세계선수권 선전','KBS뉴스','3시간 전','조별 경기에서 값진 승리를 거뒀다.'],
['프로농구 개막 앞두고 외국인 선수 관심','SBS','4시간 전','각 구단이 전력 점검에 속도를 내고 있다.'],
['이번 주 인기 웹툰 순위 변동…신작 급상승','네이버웹툰','오늘','새로 연재를 시작한 작품이 상위권에 올랐다.'],
['가을 특집 웹툰 연재 시작','네이버웹툰','오늘','다양한 단편이 한자리에 공개됐다.'],
['화제의 웹툰 드라마화 확정 소식','스타뉴스','어제','제작사는 내년 방영을 목표로 준비 중이라고 밝혔다.'],
['신형 SUV 출시, 연비 개선 눈길','오토뉴스','30분 전','신형 모델은 효율과 편의 사양을 크게 개선했다.'],
['갤럭시 노트9 판매 호조…하반기 시장 주도','전자신문','1시간 전','업계는 연말까지 견조한 흐름을 예상하고 있다.'],
['전기차 보급 확대, 충전소 늘어난다','연합뉴스','2시간 전','정부는 올해 안에 충전 시설을 대폭 늘릴 계획이다.'],
['인공지능 스피커 시장 확대, 업계 경쟁 가속','IT조선','4시간 전','음성 인식 서비스를 앞세운 신제품이 잇따르고 있다.'],
['가을철 차량 점검 요령 정리','카가이드','5시간 전','냉각수와 타이어 공기압 점검이 필요하다.']];
var PRESS=[['한겨레','#1b6e3c'],['동아일보','#1b4f9c'],['이데일리','#d32f2f'],['전자신문','#c62828'],['아시아경제','#0d47a1'],['문화일보','#e65100']];
var PROD=[['shirt','#ffe3ec','가을 맨투맨 티셔츠','19,900'],['bag','#e5f0ff','데일리 숄더백','39,000'],['shoe','#e6f7e1','캔버스 스니커즈','24,900'],['watch','#fff1d6','메탈 손목시계','58,000']];
var RT=['통합','VIEW','이미지','동영상','뉴스','지식iN','쇼핑'];
var BL=['맛있는 하루','일상다반사','여행의 기록','리뷰하는 곰','소소한 생활','주말 나들이'],CF=['맘스홀릭 카페','자취생 모임','여행 동호회','중고 장터'],CH=['오늘의 영상','브이로그 연구소','뮤직 라이브','먹방 일기'];
var WI=[['음성','mic','voice'],['이미지','camera','lens'],['음악','music','music']];
var WO=[['메일','mail','svc','mail'],['뉴스','news','news','0'],['카페','cafe','svc','cafe'],['블로그','blog','svc','blog'],['지식iN','kin','svc','kin']];
/* ───────── 지식iN 질문 (챕터 2 고정 콘텐츠) ───────── */
var KIN_QA=[
{q:'미성년자 혼자 집 구하는 법 알려주세요',u:'조용한달',m:'조회 1,204 · 답변 3',a:'만 19세 미만은 보통 혼자 임대차 계약을 맺기 어렵습니다. 계약 자체는 가능하더라도 법정대리인인 부모의 동의가 필요하고, 보증금이 큰 집이라면 보증인도 요구받기 쉽습니다. 지금 당장 머물 곳이 필요하다면 청소년 쉼터나 청소년상담복지센터에 먼저 연락해 보세요. 청소년 긴급전화 1388에서도 상담과 연결 안내를 받을 수 있습니다.'},
{q:'자식 버리는 부모가 있나요',u:'밤하늘',m:'조회 856 · 답변 2',a:'안타깝지만 있습니다. 경제 문제, 이혼, 가정 안의 갈등 등으로 자녀를 돌보지 않거나 집에서 내보내는 경우가 실제로 보고됩니다. 다만 부모의 사정이 어떻든 자녀를 돌보지 않는 행위는 방임이나 유기로 아동학대에 해당할 수 있습니다. 힘든 상황에 놓였다면 혼자 감당하지 말고 학교 선생님이나 상담 기관에 꼭 이야기해 주세요.'},
{q:'부모가 연락두절되면 법적으로 찾을 수 없나요',u:'길잡이',m:'조회 2,311 · 답변 4',a:'연락이 끊겼다고 법적으로 아무것도 할 수 없는 건 아닙니다. 가족이 실종 신고를 하면 경찰이 행방을 확인하기 위해 움직일 수 있고, 가족관계증명서로 친족 관계는 확인할 수 있습니다. 다만 성인이 스스로 연락을 끊고 떠난 경우에는 주소나 행방을 강제로 알아내기 어렵습니다. 구체적인 상황이라면 법률구조공단(국번 없이 132)에 상담을 받아 보시는 걸 권해요.'}
];
/* ───────── 공통 조각 ───────── */
function scene(id,a,b,k){
var g='<defs><linearGradient id="'+id+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+a+'"/><stop offset="1" stop-color="'+b+'"/></linearGradient></defs><rect width="320" height="180" fill="url(#'+id+')"/>';
var s=k=='p'
?'<circle cx="160" cy="70" r="26" fill="#f1d3b8"/><path d="M96 180c4-48 28-70 64-70s60 22 64 70z" fill="#27344f"/><path d="M146 112l14 22 14-22z" fill="#fff"/>'
:'<circle cx="240" cy="52" r="16" fill="#ffe08a"/><path d="M0 150l70-70 50 50 40-34 70 60 90-70v94H0z" fill="#2f6b3a"/><path d="M0 170l90-40 70 28 80-34 80 46v10H0z" fill="#1f4d2b"/>';
return '<svg class="scn" viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" aria-hidden="true">'+g+s+'</svg>'}
function thumb(){return '<div class="th">'+ic('image',26,'#fff',1.5)+'</div>'}
function hd(t,right){return '<div class="hd"><button class="hb" data-back aria-label="뒤로">'+ic('back',22,'#222',2.2)+'</button><h1>'+t+'</h1>'+(right||'')+'</div>'}
function newsLi(i){var j=i%NEWS.length,n=NEWS[j];return '<div class="li" data-go="art" data-a="'+j+'"><div class="tx"><h3>'+n[0]+'</h3><p>'+n[3]+'</p><div class="m">'+n[1]+' · '+n[2]+'</div></div>'+thumb()+'</div>'}
function items(t,n,sub){var o='';for(var i=1;i<=n;i++)o+='<div class="li" data-go="det" data-a="'+t+' '+i+'"><div class="tx"><h3>'+t+' '+i+'번째 글</h3><p>'+sub+'</p><div class="m">2018.10.'+(13-i%9)+' · 조회 '+(i*37)+'</div></div></div>';return o}
function newsList(){var t=TABS[ptab],o='';for(var i=t[1];i<t[2];i++)o+=newsLi(i);return o}
function dt(i){return '2018.10.'+('0'+(14-i%12)).slice(-2)}
/* iOS 12 상태 바 */
function stbar(){
var d=new Date(),h=d.getHours(),t=(h%12||12)+':'+('0'+d.getMinutes()).slice(-2);
return '<span class="l"><svg viewBox="0 0 30 8" width="26" height="7"><circle cx="3" cy="4" r="2.6"/><circle cx="9.5" cy="4" r="2.6"/><circle cx="16" cy="4" r="2.6"/><circle cx="22.5" cy="4" r="2.6"/><circle cx="29" cy="4" r="2.1" fill="none" stroke="#000" stroke-width="1"/></svg><span>KT</span><svg viewBox="0 0 18 13" width="15" height="11"><path d="M9 12.4 6.6 10a3.4 3.4 0 0 1 4.8 0zM9 7.4c-1.8 0-3.5.7-4.8 1.9L3 8.1A8.5 8.5 0 0 1 9 5.7c2.3 0 4.4.9 6 2.4l-1.2 1.2A6.8 6.8 0 0 0 9 7.4zM9 3C6.2 3 3.7 4.1 1.8 5.9L.6 4.7A11.6 11.6 0 0 1 9 1.3c3.2 0 6.1 1.3 8.4 3.400l-1.2 1.200A9.8 9.8 0 0 0 9 3z"/></svg></span>'
+'<span class="tm">'+(h<12?'오전':'오후')+' '+t+'</span>'
+'<span class="r"><span>40%</span><svg viewBox="0 0 28 13" width="25" height="12" fill="none"><rect x=".5" y=".5" width="23" height="12" rx="3.5" stroke="#000" stroke-opacity=".5"/><rect x="2" y="2" width="9.5" height="9" rx="2" fill="#000"/><path d="M25.5 4.500v4" stroke="#000" stroke-opacity=".5" stroke-width="1.6" stroke-linecap="round"/></svg></span>'}
/* 그린닷 휠 */
function wheel(){
var o='',R=[[WI,92,'in'],[WO,158,'']];
R.forEach(function(r,k){var L=r[0],n=L.length;L.forEach(function(w,i){var a=(22+i*136/(n-1))*Math.PI/180,x=Math.round(r[1]*Math.cos(a)),y=Math.round(-r[1]*Math.sin(a)),dl=(k*.05+i*.03).toFixed(2);
o+='<div class="wi '+r[2]+'" style="--x:'+x+'px;--y:'+y+'px;transition-delay:'+dl+'s" data-go="'+w[2]+'" data-a="'+(w[3]||'')+'"><b>'+ic(w[1],22,k?(COL[w[1]]||'#1ec800'):'#1ec800',2)+'</b><span>'+w[0]+'</span></div>'})});
return '<div class="gd" data-dot></div><div class="wh">'+o+'</div><button class="dot" data-dot aria-label="그린닷"><i></i></button>'}
/* ───────── 검색 결과 ───────── */
function viewLi(q,i){var cf=i%3==2,s=cf?CF[i%4]:BL[i%6];return '<div class="li res" data-go="det" data-a="'+q+' 후기 '+(i+1)+'"><div class="tx"><div class="u"><i class="tg">'+(cf?'카페':'블로그')+'</i>'+s+'</div><h3>'+q+' 직접 써 보고 정리한 솔직 후기 '+(i+1)+'</h3><p class="s">'+q+'에 대해 궁금해하시는 분들이 많아서 경험을 정리했어요. 장단점과 팁까지 자세히 적었습니다.</p><div class="m">'+dt(i)+' · 댓글 '+(i*3+2)+'</div></div>'+thumb()+'</div>'}
function kinLi(q,i){return '<div class="li res qa" data-go="det" data-a="'+q+' 질문 '+(i+1)+'"><div class="tx"><div class="u">지식iN</div><h3>'+q+' 어떻게 하면 좋을까요?</h3><p class="s">'+q+'와 관련해 도움이 될 만한 답변입니다. 먼저 기본 내용을 확인해 보세요.</p><div class="m">답변 '+(i+2)+' · '+dt(i+3)+'</div></div></div>'}
function nwsLi(q,i){var n=NEWS[i%NEWS.length];return '<div class="li res" data-go="art" data-a="'+(i%NEWS.length)+'"><div class="tx"><div class="u">'+n[1]+'</div><h3>'+E(q)+' 관련 '+n[0]+'</h3><p class="s">'+n[3]+'</p><div class="m">'+n[2]+'</div></div>'+thumb()+'</div>'}
function vidLi(q,i){return '<div class="li res" data-go="det" data-a="'+q+' 영상 '+(i+1)+'"><div class="vid">'+scene('v'+i,'#4f86c6','#1d2f55',i%2?'l':'p')+'<u>'+ic('play',22,'#fff',0)+'</u><i>0'+(i+3)+':'+(10+i*7)+'</i></div><div class="tx"><h3>'+q+' 하이라이트 '+(i+1)+'</h3><p class="s">'+CH[i%4]+'</p><div class="m">'+dt(i)+' · 조회수 '+(i*1.3+1.2).toFixed(1)+'만</div></div></div>'}
function sct(t,more){return '<div class="sec">'+t+'<small data-rt="'+more+'">더보기'+ic('chevR',12,'#999',2)+'</small></div>'}
function resBody(q,t){var o='',i;q=E(q);
if(t==0){o+=sct('VIEW',1);for(i=0;i<2;i++)o+=viewLi(q,i);
o+=sct('이미지',2)+'<div class="istrip">';for(i=0;i<4;i++)o+=scene('t'+i,'#9fd4ff','#5a8f6a',i%2?'l':'p');o+='</div>';
o+='<div class="gap"></div>'+sct('지식iN',5);for(i=0;i<2;i++)o+=kinLi(q,i);
o+='<div class="gap"></div>'+sct('뉴스',4);for(i=0;i<2;i++)o+=nwsLi(q,i);
o+='<div class="more" data-rt="1">VIEW 검색결과 더보기</div>'}
else if(t==1)for(i=0;i<8;i++)o+=viewLi(q,i);
else if(t==2){o='<div class="igrid">';for(i=0;i<12;i++)o+=scene('g'+i,i%3?'#9fd4ff':'#f1c7a0',i%3?'#5a8f6a':'#8a5a3a',i%2?'l':'p');o+='</div>'}
else if(t==3)for(i=0;i<6;i++)o+=vidLi(q,i);
else if(t==4)for(i=0;i<7;i++)o+=nwsLi(q,i);
else if(t==5)for(i=0;i<6;i++)o+=kinLi(q,i);
else{o='<div class="grid2">';for(i=1;i<=6;i++)o+='<div data-go="det" data-a="'+q+' 상품 '+i+'"><div class="th">'+ic(PROD[i%4][0],34,'#fff',1.5)+'</div><h3>'+q+' 인기 상품 '+i+'</h3><b>'+(i*8+11)+',900원</b></div>';o+='</div>'}
return o}
/* ───────── 화면 ───────── */
function homePane(){
var svc='';SVC.forEach(function(v){svc+='<div data-go="'+(v[1]=='news'?'news':'svc')+'" data-a="'+v[1]+'">'+sv(v[1])+v[0]+'</div>'});
return '<section class="pn"><div class="body"><div class="hero"><div class="gw" style="opacity:.45" data-go="search"><b class="lg">NAVER</b><input readonly aria-label="검색" placeholder="검색어를 입력하세요"><button class="cam" data-go="lens" aria-label="스마트렌즈">'+ic('camera',24,'#1ec800',2)+'</button></div></div>'
+'<div class="gap"></div><div class="sec">날씨<small>서울'+ic('chevD',12,'#999',2)+'</small></div>'
+'<div class="wx"><div><span>현재</span>'+ic('sun',34,'#ffb300',1.8)+'<b>19°</b></div><div><span>내일 오전</span>'+ic('cloudsun',34,'#90a4ae',1.8)+'<b>14°</b></div><div><span>내일 오후</span>'+ic('sun',34,'#ffb300',1.8)+'<b>22°</b></div></div>'
+'<div class="dust">미세먼지 <b>보통</b> 초미세먼지 <b>좋음</b></div><div class="wl"><span data-go="det" data-a="지역별 내일 날씨">지역별 내일 날씨</span><span data-go="det" data-a="주간 예보">주간 예보</span></div>'
+'<div class="ad" data-go="det" data-a="가을맞이 쇼핑 기획전"><em>AD</em>가을맞이 모바일 쇼핑 기획전<br>최대 50% 할인</div>'
+'<div class="gap"></div><div class="sec">서비스 바로가기</div><div class="svc">'+svc+'</div><div style="height:90px"></div></div></section>'}
function newsPane(){
var tabs='';TABS.forEach(function(x,i){tabs+='<div class="'+(i==ptab?'on':'')+'" data-pt="'+i+'">'+x[0]+'</div>'});
var ns='';PRESS.forEach(function(p){ns+='<div class="ns" data-go="news" data-a="0"><svg viewBox="0 0 60 38" width="100%" height="38" aria-hidden="true"><rect x="1" y="1" width="58" height="36" rx="2" fill="#fff" stroke="#ddd"/><rect x="6" y="14" width="22" height="16" fill="#cfd8dc"/><path d="M32 15h22M32 20h22M32 25h16M6 8h18" stroke="#b0b6ba" stroke-width="2"/></svg><b style="color:'+p[1]+'">'+p[0]+'</b></div>'});
return '<section class="pn"><div class="ttl">뉴스</div><div class="pt">'+tabs+'</div><div class="body"><div id="nl">'+newsList()+'</div><div class="gap"></div><div class="sec">뉴스스탠드<small data-go="news" data-a="0">전체 언론사'+ic('chevR',12,'#999',2)+'</small></div><div class="nsg">'+ns+'</div><div class="ft">© NAVER Corp.</div><div style="height:80px"></div></div></section>'}
function shopPane(){
var pr='',tp='';PROD.forEach(function(p,i){pr+='<div class="pd" data-go="det" data-a="인기 상품 '+(i+1)+'"><div class="pi" style="background:'+p[1]+'">'+ic(p[0],40,'#555',1.5)+'</div><h4>'+p[2]+'</h4><b>'+p[3]+'원</b></div>'});
TOPIC.forEach(function(v){tp+='<div data-go="svc" data-a="'+v[1]+'">'+sv(v[1])+v[0]+'</div>'});
return '<section class="pn"><div class="ttl">쇼핑·콘텐츠</div><div class="body"><div class="sec" data-go="svc" data-a="shop">오늘의 쇼핑<small>더보기'+ic('chevR',12,'#999',2)+'</small></div><div class="pds">'+pr+'</div><div class="gap"></div><div class="sec">토픽·콘텐츠</div><div class="svc tp">'+tp+'</div><div style="height:90px"></div></div></section>'}
var SCR={
main:function(){return '<div class="pager" id="pgr"><div class="trk" id="trk">'+newsPane()+homePane()+shopPane()+'</div></div>'+wheel()},
all:function(){var s='',t='';SVC.forEach(function(v){s+='<div data-go="'+(v[1]=='news'?'news':'svc')+'" data-a="'+v[1]+'">'+sv(v[1])+v[0]+'</div>'});TOPIC.forEach(function(v){t+='<div data-go="svc" data-a="'+v[1]+'">'+sv(v[1])+v[0]+'</div>'});
return hd('서비스 전체')+'<div class="body"><div class="sec">네이버 서비스</div><div class="svc">'+s+'</div><div class="sec">토픽</div><div class="svc tp">'+t+'</div></div>'},
noti:function(){return hd('알림')+'<div class="body"><div class="emp">'+ic('bell',48,'#c8c8c8',1.5)+'<p>새로운 알림이 없습니다.</p></div></div>'},
lens:function(){return hd('스마트렌즈')+'<div class="lens"><svg viewBox="0 0 200 200" width="220" height="220" aria-hidden="true"><path d="M20 70V30a10 10 0 0 1 10-10h40M130 20h40a10 10 0 0 1 10 10v40M180 130v40a10 10 0 0 1-10 10h-40M70 180H30a10 10 0 0 1-10-10v-40" fill="none" stroke="#1ec800" stroke-width="6" stroke-linecap="round"/></svg><p>사물을 비춰 보세요</p></div>'},
voice:function(){return hd('음성 검색')+'<div class="vo"><div class="mic" data-q="오늘 날씨">'+ic('mic',38,'#fff',2)+'</div><p>말씀해 주세요</p></div>'},
music:function(){return hd('음악 검색')+'<div class="vo"><div class="mic" data-q="보헤미안 랩소디">'+ic('music',38,'#fff',2)+'</div><p>들려주세요</p></div>'},
search:function(){return '<div class="hd"><button class="hb" data-back aria-label="뒤로">'+ic('back',22,'#222',2.2)+'</button><div class="sin sm"><input id="q" autofocus placeholder="검색어를 입력하세요"><button class="x" id="clr" data-clr aria-label="지우기">'+ic('close',16,'#999',2)+'</button></div><button class="hb" data-do aria-label="검색">'+ic('search',22,'#1ec800',2.4)+'</button></div><div class="body"><div id="ac" class="ac"></div><div id="rc"></div></div>'},
news:function(a){var c=+a||0,t='';CATS.forEach(function(x,i){t+='<div class="'+(i==c?'on':'')+'" data-go="news" data-a="'+i+'" data-rep>'+x+'</div>'});var n='';for(var i=0;i<6;i++)n+=newsLi(i+c);return hd('뉴스')+'<div class="tabs">'+t+'</div><div class="body">'+n+'</div>'},
art:function(a){var n=NEWS[+a],rel='<div class="sec">관련 기사</div>';for(var i=0;i<3;i++)rel+=newsLi(+a+i+1);
return hd('뉴스','<button class="hb" aria-label="공유">'+ic('share',20,'#222',2)+'</button>')+'<div class="body"><div class="art"><h2>'+n[0]+'</h2><div class="m">'+n[1]+' | 2018.10.12. 오전 9:'+(10+(+a%40))+'</div><div class="img">'+scene('a'+a,'#4f86c6','#1d2f55',(+a%2)?'l':'p')+'</div><p>'+n[3]+' 전문가들은 당분간 같은 흐름이 이어질 것으로 보고 있다.</p><p>관계자는 "시민들의 관심이 높은 만큼 지속적으로 상황을 살피겠다"고 밝혔다. 이번 사안은 다음 주에도 주요 의제로 다뤄질 것으로 보인다.</p><p><span class="btn">'+ic('share',16,'#555',2)+'공유</span><span class="btn">'+ic('star',16,'#555',2)+'스크랩</span><span class="btn">'+ic('chat',16,'#555',2)+'댓글</span></p></div>'+rel+'</div>'},
result:function(q,t){var tabs='';RT.forEach(function(x,i){tabs+='<div class="'+(i==(t.tab||0)?'on':'')+'" data-rt="'+i+'">'+x+'</div>'});
return '<div class="hd"><button class="hb" data-back aria-label="뒤로">'+ic('back',22,'#222',2.2)+'</button><div class="sin sm" data-go="search"><input readonly value="'+E(q)+'"></div></div><div class="tabs" id="rtabs">'+tabs+'</div><div class="body" id="rbody">'+resBody(q,t.tab||0)+'</div>'},
svc:function(k){if(k=='kin'){var L='';KIN_QA.forEach(function(x,i){L+='<div class="li" data-go="kinq" data-a="'+i+'"><div class="tx"><h3>'+x.q+'</h3><p>'+E(x.a).slice(0,34)+'…</p><div class="m">'+x.u+' · '+x.m+'</div></div></div>'});return hd('지식iN')+'<div class="body">'+L+'</div>'}var T={mail:['메일',['받은메일함','보낸메일함','내게쓴메일함','휴지통'],'새 메일이 도착했습니다.'],cafe:['카페',['가입 카페','인기글','내 활동'],'오늘 올라온 인기 게시글입니다.'],blog:['블로그',['이웃새글','추천글','내 블로그'],'가을 나들이 다녀온 이야기입니다.'],kin:['지식iN',['질문 목록','답변하기','내 질문'],'궁금한 점을 질문합니다.'],shop:['쇼핑',['오늘의 특가','패션','디지털'],''],toon:['웹툰',['월','화','수','목','금','토','일'],'새 에피소드가 업데이트되었습니다.'],map:['지도',[],''],dict:['사전',['영어','국어','한자','일본어'],''],stock:['증권',['국내','해외','환율'],'오늘의 시황입니다.'],estate:['부동산',['매매','전세','월세'],'신규 매물이 등록되었습니다.'],movie:['영화',['현재상영작','개봉예정','예매순위'],'이번 주 박스오피스입니다.'],music:['뮤직',['실시간','국내','해외'],'오늘의 인기곡입니다.'],book:['책·공연',['베스트셀러','신간','공연'],'이번 주 인기 도서입니다.'],life:['라이프',['푸드','여행','건강'],'오늘의 생활 정보입니다.'],sports:['스포츠',['야구','축구','농구'],'오늘의 경기 소식입니다.'],tech:['차·테크',['자동차','IT','과학'],'새로운 소식이 올라왔습니다.'],game:['게임',['모바일','PC','e스포츠'],'이번 주 인기 게임입니다.'],tv:['TV·동영상',['실시간','다시보기','클립'],'인기 영상을 모았습니다.']};
var t=T[k]||[k,[],''],tabs='',c,i;t[1].forEach(function(x,j){tabs+='<div class="'+(j?'':'on')+'" data-tab>'+x+'</div>'});
if(k=='map')return hd('지도')+'<div class="sbox"><div class="sin"><input placeholder="장소, 주소, 버스 검색"><span class="cam">'+ic('search',22,'#1ec800',2)+'</span></div></div><div class="map">'+ic('pin',38,'#e53935',2)+'</div>';
if(k=='shop'){c='<div class="grid2">';for(i=1;i<=6;i++)c+='<div data-go="det" data-a="상품 '+i+'"><div class="th">'+ic(PROD[i%4][0],34,'#fff',1.5)+'</div><h3>인기 상품 '+i+'</h3><b>'+(i*8+11)+',900원</b></div>';c+='</div>'}
else if(k=='dict')c='<div class="sbox"><div class="sin"><input id="dq" placeholder="단어를 입력하세요"><span class="cam">'+ic('search',22,'#1ec800',2)+'</span></div></div><div id="dr"></div>';
else c=items(t[0],8,t[2]);
return hd(t[0])+(tabs?'<div class="tabs">'+tabs+'</div>':'')+'<div class="body">'+c+'</div>'},
kinq:function(i){var x=KIN_QA[+i]||KIN_QA[0];return hd('지식iN')+'<div class="body"><div class="art"><h2>Q. '+x.q+'</h2><div class="m">질문자 '+x.u+' · '+x.m+'</div><p><b>채택된 답변</b></p><p>'+E(x.a)+'</p><p><span class="btn">'+ic('heart',16,'#555',2)+'공감</span><span class="btn">'+ic('chat',16,'#555',2)+'댓글</span><span class="btn">'+ic('share',16,'#555',2)+'공유</span></p></div></div>'},
det:function(a){return hd(a)+'<div class="body"><div class="art"><h2>'+a+'</h2><div class="m">작성자 naver_user · 2018.10.12.</div><div class="img">'+scene('d','#7fb3e8','#2c4a78','l')+'</div><p>2018년 가을의 이야기입니다. 이 화면은 가상의 상세 내용으로 구성되었습니다.</p><p><span class="btn">'+ic('heart',16,'#555',2)+'공감</span><span class="btn">'+ic('chat',16,'#555',2)+'댓글</span><span class="btn">'+ic('share',16,'#555',2)+'공유</span></p></div></div>'}
};
/* ───────── 렌더 · 이동 ───────── */
function render(){
var t=stack[stack.length-1],d=document.createElement('div');
d.className='scr';d.innerHTML=SCR[t.v](t.a,t);
view.innerHTML='';view.appendChild(d);bind(d,t)}
function go(v,a,rep){if(rep)stack.pop();stack.push({v:v,a:a});render()}
function back(){var d=view.firstChild;if(d&&d.classList.contains('wo')){d.classList.remove('wo');return true}if(stack.length<2)return false;stack.pop();render();return true}
function doSearch(q){q=q.trim();if(!q)return;recent=recent.filter(function(x){return x!=q});recent.unshift(q);recent=recent.slice(0,10);save();go('result',q)}
/* 좌우 스와이프: 뉴스판 ◀ 홈 ▶ 쇼핑·콘텐츠 */
function pager(d){
var p=d.querySelector('#pgr'),k=d.querySelector('#trk');if(!p)return;
var W=0,x0=0,y0=0,dx=0,m=0,t0=0,id=null;
function set(dxp,anim){k.style.transition=anim?'transform .34s cubic-bezier(.22,.8,.3,1)':'none';k.style.transform='translateX('+(-pg*W+dxp)+'px)'}
function fit(){W=p.clientWidth;set(0,0)}fit();
p.onpointerdown=function(e){if(d.classList.contains('wo'))return;W=p.clientWidth;x0=e.clientX;y0=e.clientY;dx=0;m=0;t0=Date.now();id=e.pointerId};
p.onpointermove=function(e){if(id!==e.pointerId)return;var ax=e.clientX-x0,ay=e.clientY-y0;
if(!m){if(Math.abs(ax)>8&&Math.abs(ax)>Math.abs(ay)*1.2){m=1;try{p.setPointerCapture(id)}catch(_){}}else if(Math.abs(ay)>8){m=2}}
if(m!==1)return;dx=ax;if((pg==0&&dx>0)||(pg==2&&dx<0))dx*=.3;set(dx,0)};
function up(e){if(id!==e.pointerId)return;id=null;
if(m===1){var v=dx/Math.max(1,Date.now()-t0);d._drag=1;setTimeout(function(){d._drag=0},60);
if((dx>W*.2||v>.4)&&pg>0)pg--;else if((dx<-W*.2||v<-.4)&&pg<2)pg++;set(0,1)}m=0}
p.onpointerup=up;p.onpointercancel=up;window.onresize=fit}
/* 비활성화 목록: 눌러도 아무 일도 일어나지 않음 */
var DEAD_GO={search:1,lens:1,voice:1,music:1,news:1,art:1};
var DEAD_SVC={mail:1,cafe:1,blog:1};
function blocked(D,t){
if(D.go&&DEAD_GO[D.go])return true;
if(D.go=='svc'&&DEAD_SVC[D.a])return true;
return false}
function bind(d,t){
d.onclick=function(e){
if(d._drag)return;
var el=e.target.closest('[data-back],[data-go],[data-q],[data-do],[data-clr],[data-del],[data-tab],[data-ac],[data-pt],[data-rt],[data-dot]');if(!el)return;var D=el.dataset;
if(blocked(D,t))return;
if('dot' in D)d.classList.toggle('wo');
else if('back' in D)back();
else if(D.q)doSearch(D.q);
else if(D.ac)doSearch(D.ac);
else if('do' in D)doSearch($('#q').value);
else if('clr' in D){$('#q').value='';upd()}
else if(D.del!==undefined){recent.splice(+D.del,1);save();upd()}
else if(D.pt!==undefined){ptab=+D.pt;d.querySelectorAll('.pt div').forEach(function(x,i){x.className=i==ptab?'on':''});$('#nl').innerHTML=newsList()}
else if(D.rt!==undefined){t.tab=+D.rt;d.querySelectorAll('#rtabs div').forEach(function(x,i){x.className=i==t.tab?'on':''});$('#rbody').innerHTML=resBody(t.a,t.tab);$('#rbody').scrollTop=0}
else if('tab' in D){d.querySelectorAll('.tabs div').forEach(function(x){x.className=''});el.className='on'}
else if(D.go)go(D.go,D.a,'rep' in D)};
if(t.v=='main')pager(d);
if(t.v=='search'){var q=$('#q');q.focus();q.oninput=upd;q.onkeydown=function(e){if(e.key=='Enter')doSearch(q.value)};upd()}
if(t.v=='svc'&&t.a=='dict'){$('#dq').oninput=function(){var v=E(this.value);$('#dr').innerHTML=v?'<div class="li"><div class="tx"><h3>'+v+'</h3><p>[명사] '+v+'에 대한 사전 뜻풀이입니다.</p></div></div>':''}}}
function upd(){
var v=$('#q').value.trim(),ac=$('#ac'),rc=$('#rc'),o='';
if(v){[v+' 날씨',v+' 맛집',v+' 후기',v+' 뜻',v+' 가격'].forEach(function(k){o+='<div data-ac="'+E(k)+'"><span>'+E(k)+'</span><em>'+ic('arrow',16,'#aaa',2)+'</em></div>'});ac.innerHTML=o;rc.innerHTML='';return}
ac.innerHTML='';
var r='<div class="sec">최근 검색어</div>';
if(!recent.length)r+='<div class="ft">최근 검색 내역이 없습니다.</div>';
recent.forEach(function(k,i){r+='<div data-q="'+E(k)+'"><span>'+E(k)+'</span><em data-del="'+i+'">'+ic('close',16,'#aaa',2)+'</em></div>'});
rc.className='rc';rc.innerHTML=r+'</div>'}
/* ───────── 시작 ───────── */
$('#app').innerHTML='<div class="stb" id="stb">'+stbar()+'</div><div id="view"></div>';
view=$('#view');
setInterval(function(){var s=$('#stb');if(s)s.innerHTML=stbar()},10000);
window.naverBack=back;
window.addEventListener('message',function(e){if(e.data&&(e.data==='back'||e.data.type==='back')){var ok=back();if(window.parent!==window)parent.postMessage({type:'backHandled',handled:ok},'*')}});
render();
})();

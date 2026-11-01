(function(){
'use strict';
var $=function(s){return document.querySelector(s)};
var stack=[{v:'main'}],recent=[],ptab=0,rt=null,rk=0,view;
try{recent=JSON.parse(sessionStorage.getItem('nvRecent')||'[]')}catch(e){}
function save(){try{sessionStorage.setItem('nvRecent',JSON.stringify(recent))}catch(e){}}

/* ───────── 벡터 아이콘 (24×24, 이모지·문자 기호 미사용) ───────── */
var P={
menu:'<path d="M3 6h18M3 12h18M3 18h18"/>',
bell:'<path d="M6 16v-5a6 6 0 0 1 12 0v5l1.5 2h-15z"/><path d="M10 20.5a2 2 0 0 0 4 0"/>',
search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5 21 21"/>',
camera:'<rect x="3" y="7" width="18" height="13" rx="2.5"/><path d="M8 7l1.5-3h5L16 7"/><circle cx="12" cy="13.5" r="3.5"/>',
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

/* ───────── 데이터 (2016년 8월 설정) ───────── */
var SVC=[['메일','mail'],['카페','cafe'],['블로그','blog'],['지식iN','kin'],['쇼핑','shop'],['웹툰','toon'],['지도','map'],['사전','dict'],['뉴스','news'],['증권','stock'],['영화','movie'],['뮤직','music']];
var TOPIC=[['라이프','life'],['스포츠','sports'],['차·테크','tech'],['웹툰','toon'],['게임','game'],['TV·동영상','tv'],['뮤직','music'],['영화','movie'],['책·공연','book']];
var HOT=['리우올림픽','폭염 대비','포켓몬고','열대야','방학 계획','아이폰7 출시','갤럭시노트7','개학 준비','태풍 경로','무한도전'];
var TABS=[['뉴스',0,6],['연예',6,11],['스포츠',11,16],['웹툰·뿜',16,19],['차·테크',19,24]];
var CATS=['주요뉴스','정치','경제','사회','생활/문화','IT/과학','스포츠','연예'];
var NEWS=[
['리우올림픽 양궁 대표팀, 단체전 금메달 확정','연합뉴스','10분 전','태극 궁사들이 결승에서 접전 끝에 우승했다. 현지 응원단도 열띤 응원을 보냈다.'],
['전국 폭염경보…열대야 이어져 전력 수요 급증','KBS뉴스','32분 전','기상청은 이번 주말까지 무더위가 계속될 것으로 내다봤다.'],
['포켓몬 고 열풍, 속초 관광객 크게 늘어','SBS','1시간 전','게임 출시를 앞두고 일부 지역에 이용자가 몰리고 있다.'],
['2학기 개학 앞두고 학용품 할인 행사 잇따라','매일경제','2시간 전','대형마트와 온라인몰이 앞다퉈 할인에 나섰다.'],
['스마트폰 신제품 공개 임박…업계 관심 집중','전자신문','3시간 전','하반기 시장 경쟁이 본격화될 전망이다.'],
['주말 전국 소나기…태풍 북상 가능성 주시','MBC','4시간 전','기상청은 이동 경로를 예의주시하고 있다.'],
['무한도전 새 특집 예고…촬영 현장 공개','스타뉴스','20분 전','멤버들의 새로운 도전이 시청자의 기대를 모으고 있다.'],
['인기 아이돌 신곡 발표, 음원 차트 1위 석권','OSEN','1시간 전','공개 직후 주요 음원 사이트 실시간 순위 정상에 올랐다.'],
['여름 극장가 개봉작 관객 몰이 계속','씨네21','2시간 전','주말 박스오피스에서도 상위권을 지켰다.'],
['인기 드라마 마지막 회, 자체 최고 시청률','텔레뉴스','3시간 전','마지막 회가 방송되자 온라인에서도 화제가 이어졌다.'],
['가요계 컴백 대전…하반기 앨범 줄줄이','스포츠서울','5시간 전','다수의 가수가 하반기 컴백을 예고했다.'],
['리우올림픽 펜싱 에페 금메달, 값진 쾌거','스포츠동아','15분 전','연장 접전 끝에 짜릿한 역전 우승을 차지했다.'],
['프로야구 선두 경쟁 치열, 주말 3연전 관심','일간스포츠','1시간 전','상위권 팀들의 맞대결이 순위 판도를 좌우할 전망이다.'],
['손흥민 시즌 첫 골, 현지 언론 호평','연합뉴스','2시간 전','경기 후 현지 매체는 높은 평점을 부여했다.'],
['유도 대표팀 은메달 추가, 메달 순위 상승','KBS뉴스','3시간 전','결승에서 아쉽게 패했지만 값진 성과를 거뒀다.'],
['여자 배구 대표팀 8강 진출 확정','SBS','4시간 전','조별리그 마지막 경기에서 승리를 거뒀다.'],
['이번 주 인기 웹툰 순위 변동…신작 급상승','네이버웹툰','오늘','새로 연재를 시작한 작품이 상위권에 올랐다.'],
['여름방학 특집 웹툰 연재 시작','네이버웹툰','오늘','방학을 맞아 다양한 단편이 공개됐다.'],
['화제의 웹툰 영상화 확정 소식','스타뉴스','어제','제작사는 내년 방영을 목표로 준비 중이라고 밝혔다.'],
['신형 SUV 출시, 연비 개선 눈길','오토뉴스','30분 전','신형 모델은 효율과 편의 사양을 크게 개선했다.'],
['갤럭시 신제품 공개 앞두고 사양 유출 논란','전자신문','1시간 전','업계는 공식 발표 전까지 확인이 어렵다는 입장이다.'],
['전기차 보급 확대, 충전소 늘어난다','연합뉴스','2시간 전','정부는 올해 안에 충전 시설을 대폭 늘릴 계획이다.'],
['VR 기기 시장 확대, 게임업계 신작 준비','IT조선','4시간 전','가상현실 콘텐츠 개발이 활발해지고 있다.'],
['폭염 속 차량 관리 요령 정리','카가이드','5시간 전','냉각수와 타이어 공기압 점검이 필요하다.']];
var PRESS=[['한겨레','#1b6e3c'],['동아일보','#1b4f9c'],['이데일리','#d32f2f'],['전자신문','#c62828'],['아시아경제','#0d47a1'],['문화일보','#e65100']];
var PROD=[['shirt','#ffe3ec','여름 반팔 티셔츠','12,900'],['bag','#e5f0ff','데일리 숄더백','39,000'],['shoe','#e6f7e1','캔버스 스니커즈','24,900'],['watch','#fff1d6','메탈 손목시계','58,000']];

/* ───────── 공통 조각 ───────── */
function scene(id,a,b,k){
 var g='<defs><linearGradient id="'+id+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+a+'"/><stop offset="1" stop-color="'+b+'"/></linearGradient></defs><rect width="320" height="180" fill="url(#'+id+')"/>';
 var s=k=='p'
  ?'<circle cx="160" cy="70" r="26" fill="#f1d3b8"/><path d="M96 180c4-48 28-70 64-70s60 22 64 70z" fill="#27344f"/><path d="M146 112l14 22 14-22z" fill="#fff"/>'
  :'<circle cx="240" cy="52" r="16" fill="#ffe08a"/><path d="M0 150l70-70 50 50 40-34 70 60 90-70v94H0z" fill="#2f6b3a"/><path d="M0 170l90-40 70 28 80-34 80 46v10H0z" fill="#1f4d2b"/>';
 return '<svg class="scn" viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" aria-hidden="true">'+g+s+'</svg>'}
function thumb(){return '<div class="th">'+ic('image',26,'#fff',1.5)+'</div>'}
function hd(t,right){return '<div class="hd"><button class="hb" data-back aria-label="뒤로">'+ic('back',22,'#fff',2.2)+'</button><h1>'+t+'</h1>'+(right||'')+'</div>'}
function newsLi(i){var j=i%NEWS.length,n=NEWS[j];return '<div class="li" data-go="art" data-a="'+j+'"><div class="tx"><h3>'+n[0]+'</h3><p>'+n[3]+'</p><div class="m">'+n[1]+' · '+n[2]+'</div></div>'+thumb()+'</div>'}
function items(t,n,sub){var o='';for(var i=1;i<=n;i++)o+='<div class="li" data-go="det" data-a="'+t+' '+i+'"><div class="tx"><h3>'+t+' '+i+'번째 글</h3><p>'+sub+'</p><div class="m">2016.08.'+(13-i%9)+' · 조회 '+(i*37)+'</div></div></div>';return o}
function headlines(){var t=TABS[ptab],o='';for(var i=t[1];i<t[2]&&i<t[1]+6;i++)o+='<div class="h1" data-go="art" data-a="'+i+'">'+NEWS[i][0]+'</div>';return o}
function rankBar(){return '<div class="rkb" data-go="rank"><span class="bdg">실시간급상승</span><b id="rn">'+(rk+1)+'</b><span class="kw" id="kw">'+HOT[rk]+'</span><span class="ar">'+ic('chevD',16,'#999',2)+'</span></div>'}
function stbar(){
 var d=new Date(),h=d.getHours(),t=(h%12||12)+':'+('0'+d.getMinutes()).slice(-2);
 return '<span class="sp"></span>'
 +'<svg viewBox="0 0 24 18" width="15" height="12" aria-hidden="true"><path d="M12 16.5 0 4.5C3.3 1.6 7.4 0 12 0s8.7 1.6 12 4.5z" fill="#fff" opacity=".4"/><path d="M12 16.5 5 9.5C6.8 8 9.3 7 12 7s5.2 1 7 2.5z" fill="#fff"/></svg>'
 +'<svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true"><path d="M0 16 16 0v16z" fill="#fff" opacity=".4"/><path d="M0 16 10 6v10z" fill="#fff"/></svg>'
 +'<span>40%</span><svg viewBox="0 0 22 12" width="19" height="11" aria-hidden="true"><rect x=".5" y=".5" width="18" height="11" rx="2" fill="none" stroke="#fff"/><rect x="2" y="2" width="6" height="8" fill="#fff"/><rect x="19.5" y="3.5" width="2" height="5" fill="#fff"/></svg>'
 +'<span>'+(h<12?'오전':'오후')+' '+t+'</span>'}

/* ───────── 화면 ───────── */
var SCR={
main:function(){
 var tabs='';TABS.forEach(function(x,i){tabs+='<div class="'+(i==ptab?'on':'')+'" data-pt="'+i+'">'+x[0]+'</div>'});
 var svc='';SVC.forEach(function(v){svc+='<div data-go="'+(v[1]=='news'?'news':'svc')+'" data-a="'+v[1]+'">'+sv(v[1])+v[0]+'</div>'});
 var topic='';TOPIC.forEach(function(v){topic+='<div data-go="svc" data-a="'+v[1]+'">'+sv(v[1])+v[0]+'</div>'});
 var ns='';PRESS.forEach(function(p){ns+='<div class="ns" data-go="news" data-a="0"><svg viewBox="0 0 60 38" width="100%" height="38" aria-hidden="true"><rect x="1" y="1" width="58" height="36" rx="2" fill="#fff" stroke="#ddd"/><rect x="6" y="14" width="22" height="16" fill="#cfd8dc"/><path d="M32 15h22M32 20h22M32 25h16M6 8h18" stroke="#b0b6ba" stroke-width="2"/></svg><b style="color:'+p[1]+'">'+p[0]+'</b></div>'});
 var pr='';PROD.forEach(function(p,i){pr+='<div class="pd" data-go="det" data-a="인기 상품 '+(i+1)+'"><div class="pi" style="background:'+p[1]+'">'+ic(p[0],40,'#555',1.5)+'</div><h4>'+p[2]+'</h4><b>'+p[3]+'원</b></div>'});
 return '<div class="hd"><button class="hb" data-go="all" aria-label="메뉴">'+ic('menu',24,'#fff',2.2)+'</button><span class="logo">NAVER</span><button class="hb" data-go="noti" aria-label="알림">'+ic('bell',22,'#fff',2)+'</button></div>'
 +'<div class="sbox"><div class="sin" data-go="search"><input readonly aria-label="검색" placeholder="검색어를 입력하세요"><button class="cam" data-go="lens" aria-label="스마트렌즈">'+ic('camera',24,'#1ec800',2)+'</button></div></div>'
 +'<div class="ptabs"><div class="pt">'+tabs+'</div><button class="more" data-go="all" aria-label="더보기">'+ic('chevD',20,'#666',2)+'</button></div>'
 +'<div class="body">'
 +'<div class="hl" id="hl">'+headlines()+'</div>'
 +rankBar()
 +'<div class="ph"><div data-go="art" data-a="0">'+scene('s1','#3a78c9','#1b2a4a','p')+'<p>리우올림픽 양궁 대표팀, 단체전 금메달 확정</p></div><div data-go="art" data-a="5">'+scene('s2','#9fd4ff','#d5ecff','l')+'<p>주말 전국 소나기…태풍 북상 가능성 주시</p></div></div>'
 +'<div class="gap"></div><div class="sec">서비스</div><div class="svc">'+svc+'</div>'
 +'<div class="gap"></div><div class="sec">뉴스스탠드<small data-go="news" data-a="0">전체 언론사'+ic('chevR',12,'#999',2)+'</small></div><div class="nsg">'+ns+'</div>'
 +'<div class="gap"></div><div class="sec">날씨<small>서울'+ic('chevD',12,'#999',2)+'</small></div>'
 +'<div class="wx"><div><span>현재</span>'+ic('sun',34,'#ffb300',1.8)+'<b>29°</b></div><div><span>내일 오전</span>'+ic('cloudsun',34,'#90a4ae',1.8)+'<b>24°</b></div><div><span>내일 오후</span>'+ic('sun',34,'#ffb300',1.8)+'<b>32°</b></div></div>'
 +'<div class="wl"><span data-go="det" data-a="지역별 내일 날씨">지역별 내일 날씨</span><span data-go="det" data-a="주간 예보">주간 예보</span></div>'
 +'<div class="gap"></div><div class="sec" data-go="svc" data-a="shop">쇼핑<small>더보기'+ic('chevR',12,'#999',2)+'</small></div><div class="pds">'+pr+'</div>'
 +'<div class="gap"></div><div class="sec">토픽</div><div class="svc tp">'+topic+'</div>'
 +'<div class="ft">© NAVER Corp.</div></div>'},
all:function(){var s='',t='';SVC.forEach(function(v){s+='<div data-go="'+(v[1]=='news'?'news':'svc')+'" data-a="'+v[1]+'">'+sv(v[1])+v[0]+'</div>'});TOPIC.forEach(function(v){t+='<div data-go="svc" data-a="'+v[1]+'">'+sv(v[1])+v[0]+'</div>'});
 return hd('서비스 전체')+'<div class="body"><div class="sec">네이버 서비스</div><div class="svc">'+s+'</div><div class="sec">토픽</div><div class="svc tp">'+t+'</div></div>'},
noti:function(){return hd('알림')+'<div class="body"><div class="emp">'+ic('bell',48,'#c8c8c8',1.5)+'<p>새로운 알림이 없습니다.</p></div></div>'},
lens:function(){return hd('스마트렌즈')+'<div class="lens"><svg viewBox="0 0 200 200" width="220" height="220" aria-hidden="true"><path d="M20 70V30a10 10 0 0 1 10-10h40M130 20h40a10 10 0 0 1 10 10v40M180 130v40a10 10 0 0 1-10 10h-40M70 180H30a10 10 0 0 1-10-10v-40" fill="none" stroke="#1ec800" stroke-width="6" stroke-linecap="round"/></svg><p>사물을 비춰 보세요</p></div>'},
rank:function(){var h='';HOT.forEach(function(k,i){h+='<div class="rr" data-q="'+k+'"><b>'+(i+1)+'</b><span>'+k+'</span></div>'});return hd('실시간 급상승 검색어')+'<div class="body">'+h+'</div>'},
search:function(){return '<div class="hd"><button class="hb" data-back aria-label="뒤로">'+ic('back',22,'#fff',2.2)+'</button><div class="sin sm"><input id="q" autofocus placeholder="검색어를 입력하세요"><button class="x" id="clr" data-clr aria-label="지우기">'+ic('close',16,'#999',2)+'</button></div><button class="hb" data-do aria-label="검색">'+ic('search',22,'#fff',2.2)+'</button></div><div class="body"><div id="ac" class="ac"></div><div id="rc"></div></div>'},
news:function(a){var c=+a||0,t='';CATS.forEach(function(x,i){t+='<div class="'+(i==c?'on':'')+'" data-go="news" data-a="'+i+'" data-rep>'+x+'</div>'});var n='';for(var i=0;i<6;i++)n+=newsLi(i+c);return hd('뉴스')+'<div class="tabs">'+t+'</div><div class="body">'+n+'</div>'},
art:function(a){var n=NEWS[+a],rel='<div class="sec">관련 기사</div>';for(var i=0;i<3;i++)rel+=newsLi(+a+i+1);
 return hd('뉴스','<button class="hb" aria-label="공유">'+ic('share',20,'#fff',2)+'</button>')+'<div class="body"><div class="art"><h2>'+n[0]+'</h2><div class="m">'+n[1]+' | 2016.08.12. 오전 9:'+(10+(+a%40))+'</div><div class="img">'+scene('a'+a,'#4f86c6','#1d2f55',(+a%2)?'l':'p')+'</div><p>'+n[3]+' 전문가들은 당분간 같은 흐름이 이어질 것으로 보고 있다.</p><p>관계자는 "시민들의 관심이 높은 만큼 지속적으로 상황을 살피겠다"고 밝혔다. 이번 사안은 다음 주에도 주요 의제로 다뤄질 것으로 보인다.</p><p><span class="btn">'+ic('share',16,'#555',2)+'공유</span><span class="btn">'+ic('star',16,'#555',2)+'스크랩</span><span class="btn">'+ic('chat',16,'#555',2)+'댓글</span></p></div>'+rel+'</div>'},
result:function(q){var o='',D=['blog.naver.com','cafe.naver.com','kin.naver.com','news.naver.com','shopping.naver.com','terms.naver.com'];for(var i=1;i<=6;i++)o+='<div class="li res"><div class="tx"><div class="u">'+D[i-1]+'</div><h3>'+q+' 관련 정보 '+i+'</h3><p class="s">'+q+'에 대한 자세한 내용과 이용 후기를 확인해 보세요. 2016.08.1'+i+'.</p></div>'+(i%2?thumb():'')+'</div>';
 return '<div class="hd"><button class="hb" data-back aria-label="뒤로">'+ic('back',22,'#fff',2.2)+'</button><div class="sin sm" data-go="search"><input readonly value="'+q+'"></div></div><div class="tabs"><div class="on">통합</div><div>블로그</div><div>카페</div><div>지식iN</div><div>뉴스</div><div>쇼핑</div></div><div class="body">'+o+'</div>'},
svc:function(k){var T={mail:['메일',['받은메일함','보낸메일함','내게쓴메일함','휴지통'],'새 메일이 도착했습니다.'],cafe:['카페',['가입 카페','인기글','내 활동'],'오늘 올라온 인기 게시글입니다.'],blog:['블로그',['이웃새글','추천글','내 블로그'],'여름 휴가 다녀온 이야기입니다.'],kin:['지식iN',['질문 목록','답변하기','내 질문'],'궁금한 점을 질문합니다.'],shop:['쇼핑',['오늘의 특가','패션','디지털'],''],toon:['웹툰',['월','화','수','목','금','토','일'],'새 에피소드가 업데이트되었습니다.'],map:['지도',[],''],dict:['사전',['영어','국어','한자','일본어'],''],stock:['증권',['국내','해외','환율'],'오늘의 시황입니다.'],estate:['부동산',['매매','전세','월세'],'신규 매물이 등록되었습니다.'],movie:['영화',['현재상영작','개봉예정','예매순위'],'이번 주 박스오피스입니다.'],music:['뮤직',['실시간','국내','해외'],'오늘의 인기곡입니다.'],book:['책·공연',['베스트셀러','신간','공연'],'이번 주 인기 도서입니다.'],life:['라이프',['푸드','여행','건강'],'오늘의 생활 정보입니다.'],sports:['스포츠',['야구','축구','올림픽'],'오늘의 경기 소식입니다.'],tech:['차·테크',['자동차','IT','과학'],'새로운 소식이 올라왔습니다.'],game:['게임',['모바일','PC','e스포츠'],'이번 주 인기 게임입니다.'],tv:['TV·동영상',['실시간','다시보기','클립'],'인기 영상을 모았습니다.']};
 var t=T[k]||[k,[],''],tabs='',c,i;t[1].forEach(function(x,j){tabs+='<div class="'+(j?'':'on')+'" data-tab>'+x+'</div>'});
 if(k=='map')return hd('지도')+'<div class="sbox"><div class="sin"><input placeholder="장소, 주소, 버스 검색"><span class="cam">'+ic('search',22,'#1ec800',2)+'</span></div></div><div class="map">'+ic('pin',38,'#e53935',2)+'</div>';
 if(k=='shop'){c='<div class="grid2">';for(i=1;i<=6;i++)c+='<div data-go="det" data-a="상품 '+i+'"><div class="th">'+ic(PROD[i%4][0],34,'#fff',1.5)+'</div><h3>인기 상품 '+i+'</h3><b>'+(i*8+11)+',900원</b></div>';c+='</div>'}
 else if(k=='dict')c='<div class="sbox"><div class="sin"><input id="dq" placeholder="단어를 입력하세요"><span class="cam">'+ic('search',22,'#1ec800',2)+'</span></div></div><div id="dr"></div>';
 else c=items(t[0],8,t[2]);
 return hd(t[0])+(tabs?'<div class="tabs">'+tabs+'</div>':'')+'<div class="body">'+c+'</div>'},
det:function(a){return hd(a)+'<div class="body"><div class="art"><h2>'+a+'</h2><div class="m">작성자 naver_user · 2016.08.12.</div><div class="img">'+scene('d','#7fb3e8','#2c4a78','l')+'</div><p>2016년 여름의 이야기입니다. 이 화면은 가상의 상세 내용으로 구성되었습니다.</p><p><span class="btn">'+ic('heart',16,'#555',2)+'공감</span><span class="btn">'+ic('chat',16,'#555',2)+'댓글</span><span class="btn">'+ic('share',16,'#555',2)+'공유</span></p></div></div>'}
};

/* ───────── 렌더 · 이동 ───────── */
function stopRoll(){if(rt){clearInterval(rt);rt=null}}
function render(){
 stopRoll();
 var t=stack[stack.length-1],d=document.createElement('div');
 d.className='scr';d.innerHTML=SCR[t.v](t.a);
 view.innerHTML='';view.appendChild(d);bind(d,t);
 if(t.v=='main')rt=setInterval(function(){rk=(rk+1)%HOT.length;var n=$('#rn'),k=$('#kw');if(n&&k){n.textContent=rk+1;k.textContent=HOT[rk]}},3000)}
function go(v,a,rep){if(rep)stack.pop();stack.push({v:v,a:a});render()}
function back(){if(stack.length<2)return false;stack.pop();render();return true}
function doSearch(q){q=q.trim();if(!q)return;recent=recent.filter(function(x){return x!=q});recent.unshift(q);recent=recent.slice(0,10);save();go('result',q)}
function bind(d,t){
 d.onclick=function(e){
  var el=e.target.closest('[data-back],[data-go],[data-q],[data-do],[data-clr],[data-del],[data-tab],[data-ac],[data-pt]');if(!el)return;var D=el.dataset;
  if('back' in D)back();
  else if(D.q)doSearch(D.q);
  else if(D.ac)doSearch(D.ac);
  else if('do' in D)doSearch($('#q').value);
  else if('clr' in D){$('#q').value='';upd()}
  else if(D.del!==undefined){recent.splice(+D.del,1);save();upd()}
  else if(D.pt!==undefined){ptab=+D.pt;d.querySelectorAll('.pt div').forEach(function(x,i){x.className=i==ptab?'on':''});$('#hl').innerHTML=headlines()}
  else if('tab' in D){d.querySelectorAll('.tabs div').forEach(function(x){x.className=''});el.className='on'}
  else if(D.go)go(D.go,D.a,'rep' in D)};
 if(t.v=='search'){var q=$('#q');q.focus();q.oninput=upd;q.onkeydown=function(e){if(e.key=='Enter')doSearch(q.value)};upd()}
 if(t.v=='svc'&&t.a=='dict'){$('#dq').oninput=function(){var v=this.value;$('#dr').innerHTML=v?'<div class="li"><div class="tx"><h3>'+v+'</h3><p>[명사] '+v+'에 대한 사전 뜻풀이입니다.</p></div></div>':''}}}
function upd(){
 var v=$('#q').value.trim(),ac=$('#ac'),rc=$('#rc'),o='';
 if(v){[v+' 날씨',v+' 맛집',v+' 후기',v+' 뜻',v+' 가격'].forEach(function(k){o+='<div data-ac="'+k+'"><span>'+k+'</span><em>'+ic('arrow',16,'#aaa',2)+'</em></div>'});ac.innerHTML=o;rc.innerHTML='';return}
 ac.innerHTML='';
 var r='<div class="sec">최근 검색어</div>';
 if(!recent.length)r+='<div class="ft">최근 검색 내역이 없습니다.</div>';
 recent.forEach(function(k,i){r+='<div data-q="'+k+'"><span>'+k+'</span><em data-del="'+i+'">'+ic('close',16,'#aaa',2)+'</em></div>'});
 rc.className='rc';rc.innerHTML=r}

/* ───────── 시작 ───────── */
$('#app').innerHTML='<div class="stb" id="stb">'+stbar()+'</div><div id="view"></div>';
view=$('#view');
setInterval(function(){var s=$('#stb');if(s)s.innerHTML=stbar()},10000);
window.naverBack=back;
window.addEventListener('message',function(e){if(e.data&&(e.data==='back'||e.data.type==='back')){var ok=back();if(window.parent!==window)parent.postMessage({type:'backHandled',handled:ok},'*')}});
render();
})();

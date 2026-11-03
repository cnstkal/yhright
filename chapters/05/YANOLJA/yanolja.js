'use strict';
/* 야놀자 2024 연출용: 홈 화면과 MY 야놀자의 예약 내역(상세 포함)만 동작, 나머지는 UI 버튼. 모든 아이콘은 SVG */
(function(){
function num(n){return String(n).replace(/\B(?=(\d{3})+(?!\d))/g,',')}
function won(n){return num(n)+'원'}
var DW=['일','월','화','수','목','금','토'];
function dl(s){var d=new Date(s+'T00:00:00');return d.getFullYear()+'.'+('0'+(d.getMonth()+1)).slice(-2)+'.'+('0'+d.getDate()).slice(-2)+'('+DW[d.getDay()]+')'}
function nights(a,b){return Math.round((new Date(b)-new Date(a))/864e5)}

/* 벡터 아이콘 세트 (24x24) */
var IC={
 search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
 cart:'<path d="M3 4h2l2.4 11h10.2L20 8H6.2"/><circle cx="9" cy="19.5" r="1.3"/><circle cx="17" cy="19.5" r="1.3"/>',
 home:'<path d="M4 11l8-7 8 7v9h-5v-6H9v6H4z"/>',
 region:'<rect x="4" y="4" width="6" height="6" rx="1.5"/><rect x="14" y="4" width="6" height="6" rx="1.5"/><rect x="4" y="14" width="6" height="6" rx="1.5"/><rect x="14" y="14" width="6" height="6" rx="1.5"/>',
 pin:'<path d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
 heart:'<path d="M12 20s-8-5-8-11a4.5 4.5 0 018-2.8A4.5 4.5 0 0120 9c0 6-8 11-8 11z"/>',
 user:'<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/>',
 back:'<path d="M15 5l-7 7 7 7"/>',
 chev:'<path d="M9 5l7 7-7 7"/>',
 hotel:'<rect x="5" y="3" width="14" height="18" rx="1"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M10 21v-4h4v4"/>',
 bed:'<path d="M3 18V7M3 14h18v4M21 14v-2a3 3 0 00-3-3h-7v5"/><circle cx="7" cy="11" r="1.6"/>',
 house:'<path d="M3 12l9-8 9 8M6 10v10h12V10"/><path d="M10 20v-5h4v5"/>',
 tent:'<path d="M12 4L3 20h18z"/><path d="M12 4v16M9 20l3-6 3 6"/>',
 ticket:'<path d="M4 7h16v3a2 2 0 000 4v3H4v-3a2 2 0 000-4z"/><path d="M14 7v10" stroke-dasharray="2 2"/>',
 wave:'<path d="M3 15c2-3 4-3 6 0s4 3 6 0 4-3 6 0M3 20c2-3 4-3 6 0s4 3 6 0 4-3 6 0"/><circle cx="16" cy="7" r="2"/>',
 car:'<path d="M4 17v-5l2-5h12l2 5v5zM4 12h16"/><circle cx="8" cy="17" r="1.6"/><circle cx="16" cy="17" r="1.6"/>',
 plane:'<path d="M3 11l18-7-7 18-3-8z"/>',
 globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
 coupon:'<path d="M3 8h18v3a2 2 0 000 4v3H3v-3a2 2 0 000-4z"/><path d="M14 8v10" stroke-dasharray="2 2"/>',
 star:'<path class="f" d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>'
};
function ic(n,s){s=s||24;return '<svg class="ic" width="'+s+'" height="'+s+'" viewBox="0 0 24 24" aria-hidden="true">'+IC[n]+'</svg>'}
var LOGO='<svg width="104" height="30" viewBox="0 0 104 30" role="img" aria-label="yanolja"><text x="0" y="23" font-size="26" font-weight="900" fill="#ff3478" letter-spacing="-1.4">yanolja</text></svg>';

/* 숙소 사진 영역: 외부 이미지 없이 SVG 일러스트 */
var PAL=[['#8fd0ff','#eaf7ff','#2a8fd6'],['#ffbf94','#fff3e6','#d9703a'],['#b4e29a','#f3fbea','#4f9a3a'],['#cdb4ff','#f6f0ff','#7b52d1'],['#ffb0c8','#fff0f5','#e0447b']];
function th(i,k){
  var p=PAL[i%PAL.length],s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+p[0]+'"/><stop offset="1" stop-color="'+p[1]+'"/></linearGradient></defs><rect width="160" height="120" fill="url(#g)"/><circle cx="124" cy="30" r="13" fill="#fff" opacity=".85"/>';
  if(k=='sea')s+='<path d="M0 80Q20 70 40 80T80 80T120 80T160 80V120H0Z" fill="'+p[2]+'" opacity=".7"/><path d="M0 95Q20 85 40 95T80 95T120 95T160 95V120H0Z" fill="'+p[2]+'"/><rect x="40" y="52" width="46" height="30" fill="#fff"/><path d="M36 54L63 36 90 54Z" fill="'+p[2]+'"/>';
  else if(k=='city')s+='<rect x="22" y="48" width="30" height="72" fill="'+p[2]+'"/><rect x="58" y="30" width="38" height="90" fill="#fff" opacity=".9"/><rect x="102" y="58" width="32" height="62" fill="'+p[2]+'" opacity=".8"/>'+[0,1,2,3].map(function(r){return '<rect x="65" y="'+(40+r*18)+'" width="8" height="8" fill="'+p[2]+'"/><rect x="80" y="'+(40+r*18)+'" width="8" height="8" fill="'+p[2]+'"/>'}).join('');
  else if(k=='hanok')s+='<rect x="0" y="92" width="160" height="28" fill="'+p[2]+'" opacity=".6"/><rect x="38" y="62" width="84" height="32" fill="#fff"/><path d="M26 64Q80 30 134 64L124 62Q80 40 36 62Z" fill="#555"/><path d="M26 64L134 64" stroke="#555" stroke-width="5"/>';
  else if(k=='pool')s+='<rect x="0" y="70" width="160" height="50" fill="#fff" opacity=".7"/><rect x="28" y="78" width="104" height="32" rx="6" fill="'+p[2]+'" opacity=".8"/><path d="M40 92Q52 86 64 92T88 92T112 92" stroke="#fff" stroke-width="3" fill="none"/>';
  else s+='<path d="M0 100L40 52 70 86 104 40 160 100V120H0Z" fill="'+p[2]+'" opacity=".75"/><path d="M60 98L88 66 116 98Z" fill="#fff"/>';
  return 'data:image/svg+xml,'+encodeURIComponent(s+'</svg>');
}

var L=[ /* id,이름,분류,지역,원가,판매가,평점,리뷰,썸네일 */
 [1,'안목 비치 호텔','호텔','강릉 · 안목해변',158000,105000,9.2,1410,'sea'],
 [2,'홍대 오브 호텔','호텔','서울 · 마포구',149000,98000,9.0,2604,'city'],
 [3,'느린섬 게스트하우스','게스트하우스','제주 · 애월읍',45000,34000,9.1,912,'sea'],
 [4,'광안 오션뷰 호텔','호텔','부산 · 수영구',199000,139000,9.3,2051,'city'],
 [5,'온다 한옥 스테이','한옥','전주 · 한옥마을',118000,85000,9.5,688,'hanok'],
 [6,'속초 라온 풀빌라','풀빌라','속초 · 영랑동',340000,279000,9.4,497,'pool'],
 [7,'황남 게스트하우스','게스트하우스','경주 · 황리단길',48000,38000,9.2,603,'hanok'],
 [8,'여수 마리나 호텔','호텔','여수 · 돌산읍',175000,119000,9.1,1066,'sea'],
 [9,'가평 숲속 글램핑','캠핑·글램핑','가평 · 청평면',160000,119000,9.3,422,'mtn']];
function lod(id){return L.filter(function(x){return x[0]==id})[0]}
function rate(x){return Math.round((1-x[5]/x[4])*100)}

var B=[ /* 예약번호,숙소id,객실,체크인,체크아웃,인원,상태(1확정 2완료 3취소),금액,결제수단,예약일 */
 ['YN241214038214',8,'오션뷰 더블','2024-12-14','2024-12-15','성인 2명',1,119000,'토스페이','2024-11-01'],
 ['YN241012026745',5,'온돌 스탠다드','2024-10-12','2024-10-13','성인 2명',2,85000,'카카오페이','2024-09-28'],
 ['YN240803071538',3,'4인 도미토리 침대 2','2024-08-03','2024-08-05','성인 1명',2,68000,'네이버페이','2024-07-15'],
 ['YN240713055902',6,'프라이빗 풀빌라 4인','2024-07-13','2024-07-14','성인 4명',2,279000,'카카오페이','2024-06-20'],
 ['YN240504040317',4,'시티뷰 더블','2024-05-04','2024-05-05','성인 2명',3,199000,'신용카드(체크)','2024-04-09'],
 ['YN240323064471',5,'온돌 스탠다드','2024-03-23','2024-03-24','성인 2명',2,85000,'토스페이','2024-03-08'],
 ['YN240127012689',1,'스탠다드 더블','2024-01-27','2024-01-28','성인 2명',2,105000,'신용카드(체크)','2024-01-14']];
var ST={1:['예약확정','s1'],2:['이용완료','s2'],3:['예약취소','s3']};
var ADR={1:'강원 강릉시 창해로 000',2:'서울 마포구 양화로 000',3:'제주 제주시 애월읍 애월로 000',4:'부산 수영구 광안해변로 000',5:'전북 전주시 완산구 태조로 000',6:'강원 속초시 영랑해안길 000',7:'경북 경주시 포석로 000',8:'전남 여수시 돌산읍 돌산로 000',9:'경기 가평군 청평면 000'};

var S={v:'home',sel:null,st:[]},root=document.getElementById('root');
function hdr(t){return '<div class="hd"><button data-a="back" aria-label="뒤로">'+ic('back',26)+'</button>'+t+'</div>'}
function more(){return '<em class="dm">더보기'+ic('chev',14)+'</em>'}
function pc(x){return '<div class="pc"><img src="'+th(x[0],x[8])+'" alt=""><span class="hrt">'+ic('heart',22)+'</span><b>'+x[1]+'</b>'+x[3]+'<div class="pr"><s>'+num(x[4])+'원</s><br><em>'+rate(x)+'%</em><strong>'+num(x[5])+'원</strong></div></div>'}
function rc2(x){return '<div class="rc2"><img src="'+th(x[0],x[8])+'" alt=""><span class="hrt">'+ic('heart',24)+'</span><span class="tag">'+x[2]+'</span><b>'+x[1]+'</b><span class="sc">'+ic('star',13)+x[6]+'</span> ('+num(x[7])+') · '+x[3]+'<div class="pr"><s>'+num(x[4])+'원</s> <em>'+rate(x)+'%</em><strong>'+num(x[5])+'원</strong> 1박</div></div>'}

function home(){
  var h='<div class="top"><div class="lg">'+LOGO+'</div><div class="sr"><button class="sbox dm" type="button"><span>어디로 떠나시나요?</span>'+ic('search',20)+'</button><span class="ct dm">'+ic('cart',24)+'</span></div>';
  h+='<div class="tabs"><span class="on">추천</span>'+['국내숙소','즐길거리','교통·항공','해외여행'].map(function(t){return '<span class="dm">'+t+'</span>'}).join('')+'</div></div>';
  h+='<section class="sec" style="padding-top:18px"><h2>여행 서비스</h2><div class="grid">'+[['국내숙소','hotel'],['호텔·리조트','bed'],['펜션·풀빌라','house'],['캠핑·글램핑','tent'],['레저·티켓','ticket'],['액티비티','wave'],['렌터카','car'],['항공','plane'],['해외숙소','globe'],['내 주변','pin']].map(function(c){return '<button class="dm" type="button"><i>'+ic(c[1],24)+'</i>'+c[0]+'</button>'}).join('')+'</div></section>';
  h+='<div class="bn"><div class="bs"><div style="background:linear-gradient(120deg,#ff3478,#ff80a8)"><b>봄맞이 국내여행<br>숙소 최대 30% 할인</b>야놀자 단독 특가 · 전국 숙소</div><div style="background:linear-gradient(120deg,#6a5bd6,#a69cf5)"><b>주말 호캉스<br>호텔 모아보기</b>인기 호텔 한눈에</div><div style="background:linear-gradient(120deg,#1e88d6,#6cc6ff)"><b>제주 항공+숙소<br>함께 예약하면 특가</b>교통·항공 기획전</div></div><span class="cnt">1 / 3</span></div>';
  h+='<section class="sec"><h2>숙박 쿠폰<em class="dm">전체보기'+ic('chev',14)+'</em></h2><div class="hs"><div class="cp dm">'+ic('coupon',24)+'숙박 쿠폰<b>최대 20,000원</b>국내숙소 3만원 이상 결제 시</div><div class="cp dm">'+ic('coupon',24)+'첫 예약 혜택<b>5,000원</b>신규 가입 고객 대상</div><div class="cp dm">'+ic('coupon',24)+'연박 할인<b>10% 할인</b>2박 이상 예약 시</div></div></section>';
  h+='<section class="sec"><h2>오늘의 특가'+more()+'</h2><div class="hs">'+[L[3],L[7],L[0],L[8],L[4]].map(pc).join('')+'</div></section>';
  h+='<section class="sec"><h2>추천 숙소'+more()+'</h2>'+[L[4],L[5],L[1],L[2],L[6]].map(rc2).join('')+'</section>';
  h+='<section class="sec"><h2>인기 즐길거리'+more()+'</h2><div class="hs">'+[['제주 승마 체험','제주 · 레저',48000,38000,'mtn'],['설악산 케이블카','속초 · 티켓',15000,12000,'mtn'],['서핑 입문 강습','양양 · 액티비티',70000,55000,'sea'],['한복 대여 2시간','경주 · 체험',25000,18000,'hanok']].map(function(a,i){return '<div class="pc"><img src="'+th(i+1,a[4])+'" alt=""><span class="hrt">'+ic('heart',22)+'</span><b>'+a[0]+'</b>'+a[1]+'<div class="pr"><s>'+num(a[2])+'원</s><br><em>'+Math.round((1-a[3]/a[2])*100)+'%</em><strong>'+num(a[3])+'원</strong></div></div>'}).join('')+'</div></section>';
  return h+'<p class="note">연출용 가상 데이터 · 실제 예약 정보 아님</p>';
}
function list(){
  var h=hdr('MY 야놀자')+'<div class="my"><p>김하늘님<small>야놀자 회원</small></p><div class="mq"><span class="dm">쿠폰<b>2</b></span><span class="dm">포인트<b>1,500P</b></span><span class="dm">찜<b>9</b></span><span class="dm">고객센터<b>'+ic('chev',16)+'</b></span></div></div>';
  h+='<div class="sh">예약내역 <span>'+B.length+'</span></div>';
  B.forEach(function(b,i){var x=lod(b[1]),s=ST[b[6]];
    h+='<button class="rc" data-a="det" data-i="'+i+'"><div class="rh"><span class="st '+s[1]+'">'+s[0]+'</span><span>예약일 '+b[9].replace(/-/g,'.')+'</span></div><div class="rb"><img src="'+th(x[0],x[8])+'" alt=""><div><b>'+x[1]+'</b><p>'+b[2]+' · '+b[5]+'</p><p>체크인 '+dl(b[3])+'</p><p>체크아웃 '+dl(b[4])+'</p><p class="am">'+(b[6]==3?'환불 ':'')+won(b[7])+'</p></div></div></button>'});
  return h;
}
function det(){
  var b=B[S.sel],x=lod(b[1]),s=ST[b[6]],n=nights(b[3],b[4]);
  return hdr('예약 상세')+'<img class="hero" src="'+th(x[0],x[8])+'" alt=""><div class="dtl"><span class="st '+s[1]+'">'+s[0]+'</span><h1>'+x[1]+'</h1><span style="font-size:12px;color:#999">'+x[3]+' · '+x[2]+'</span>'+
   '<div class="box"><div>체크인<b>'+dl(b[3])+'</b>15:00</div><div>체크아웃<b>'+dl(b[4])+'</b>11:00</div></div>'+
   [['예약번호',b[0]],['예약일',b[9].replace(/-/g,'.')],['객실',b[2]],['인원',b[5]],['숙박일수',n+'박'],['주소',ADR[x[0]]],['결제수단',b[8]],['결제금액',won(b[7])],['결제상태',b[6]==3?'전액 환불':'결제완료']].map(function(k){return '<div class="kv"><span>'+k[0]+'</span><span>'+k[1]+'</span></div>'}).join('')+
   '<div class="ab"><button class="dm" type="button">길찾기</button><button class="dm" type="button">숙소 전화</button><button class="dm" type="button">예약 취소</button></div></div>';
}
function tabbar(){
  var t=S.v=='det'?'list':S.v;
  document.getElementById('tabbar').innerHTML=[['home','홈','home'],[0,'지역','region'],[0,'내 주변','pin'],[0,'찜','heart'],['list','MY 야놀자','user']].map(function(x){
    return x[0]?'<span data-a="go" data-i="'+x[0]+'" class="'+(t==x[0]?'on':'')+'">'+ic(x[2],24)+x[1]+'</span>':'<span class="dm">'+ic(x[2],24)+x[1]+'</span>'}).join('');
}
function render(){root.innerHTML={home:home,list:list,det:det}[S.v]();tabbar()}
document.addEventListener('click',function(e){
  var t=e.target.closest('[data-a]');if(!t)return;
  var a=t.dataset.a,i=t.dataset.i;
  if(a=='go'){if(i!=S.v)S.st.push(S.v);S.v=i;window.scrollTo(0,0);render()}
  else if(a=='det'){S.st.push(S.v);S.sel=+i;S.v='det';window.scrollTo(0,0);render()}
  else if(a=='back'){S.v=S.st.pop()||'home';window.scrollTo(0,0);render()}
});
render();
})();

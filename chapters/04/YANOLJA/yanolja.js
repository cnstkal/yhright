'use strict';
/* 야놀자 2023 연출용: 홈 화면과 MY 야놀자의 예약 내역(상세 포함)만 동작, 나머지는 UI 버튼 */
(function(){
function num(n){return String(n).replace(/\B(?=(\d{3})+(?!\d))/g,',')}
function won(n){return num(n)+'원'}
var DW=['일','월','화','수','목','금','토'];
function dl(s){var d=new Date(s+'T00:00:00');return d.getFullYear()+'.'+('0'+(d.getMonth()+1)).slice(-2)+'.'+('0'+d.getDate()).slice(-2)+'('+DW[d.getDay()]+')'}
function nights(a,b){return Math.round((new Date(b)-new Date(a))/864e5)}

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
 [1,'안목 비치 호텔','호텔','강릉 · 안목해변',148000,99000,9.2,1240,'sea'],
 [2,'홍대 오브 호텔','호텔','서울 · 마포구',139000,92000,9.0,2318,'city'],
 [3,'느린섬 게스트하우스','게스트하우스','제주 · 애월읍',42000,32000,9.1,806,'sea'],
 [4,'광안 오션뷰 호텔','호텔','부산 · 수영구',189000,129000,9.3,1873,'city'],
 [5,'온다 한옥 스테이','한옥','전주 · 한옥마을',110000,79000,9.5,594,'hanok'],
 [6,'속초 라온 풀빌라','풀빌라','속초 · 영랑동',320000,259000,9.4,412,'pool'],
 [7,'황남 게스트하우스','게스트하우스','경주 · 황리단길',45000,35000,9.2,517,'hanok'],
 [8,'여수 마리나 호텔','호텔','여수 · 돌산읍',165000,109000,9.1,938,'sea'],
 [9,'가평 숲속 글램핑','캠핑·글램핑','가평 · 청평면',150000,110000,9.3,361,'mtn']];
function lod(id){return L.filter(function(x){return x[0]==id})[0]}
function rate(x){return Math.round((1-x[5]/x[4])*100)}

var B=[ /* 예약번호,숙소id,객실,체크인,체크아웃,인원,상태(1확정 2완료 3취소),금액,결제수단,예약일 */
 ['YN231118042871',8,'오션뷰 더블','2023-11-18','2023-11-19','성인 2명',1,109000,'토스페이','2023-10-29'],
 ['YN230930019354',2,'스탠다드 트윈','2023-09-30','2023-10-01','성인 2명',3,92000,'신용카드(체크)','2023-09-12'],
 ['YN230812077120',6,'프라이빗 풀빌라 4인','2023-08-12','2023-08-13','성인 4명',2,259000,'카카오페이','2023-07-20'],
 ['YN230624051986',3,'4인 도미토리 침대 1','2023-06-24','2023-06-26','성인 1명',2,64000,'네이버페이','2023-06-10'],
 ['YN230505033407',4,'시티뷰 더블','2023-05-05','2023-05-06','성인 2명',2,189000,'신용카드(체크)','2023-04-11'],
 ['YN230318060245',5,'온돌 스탠다드','2023-03-18','2023-03-19','성인 2명',2,79000,'카카오페이','2023-03-04'],
 ['YN230203011678',1,'스탠다드 더블','2023-02-03','2023-02-04','성인 2명',2,99000,'토스페이','2023-01-22']];
var ST={1:['예약확정','s1'],2:['이용완료','s2'],3:['예약취소','s3']};
var ADR={1:'강원 강릉시 창해로 000',2:'서울 마포구 양화로 000',3:'제주 제주시 애월읍 애월로 000',4:'부산 수영구 광안해변로 000',5:'전북 전주시 완산구 태조로 000',6:'강원 속초시 영랑해안길 000',7:'경북 경주시 포석로 000',8:'전남 여수시 돌산읍 돌산로 000',9:'경기 가평군 청평면 000'};

var S={v:'home',sel:null,st:[]},root=document.getElementById('root');
function hdr(t){return '<div class="hd"><button data-a="back">‹</button>'+t+'</div>'}
function pc(x){return '<div class="pc"><img src="'+th(x[0],x[8])+'" alt=""><span class="hrt">♡</span><b>'+x[1]+'</b>'+x[3]+'<div class="pr"><s>'+num(x[4])+'원</s><br><em>'+rate(x)+'%</em><strong>'+num(x[5])+'원</strong></div></div>'}
function rc2(x){return '<div class="rc2"><img src="'+th(x[0],x[8])+'" alt=""><span class="hrt">♡</span><span class="tag">'+x[2]+'</span><b>'+x[1]+'</b><span class="sc"><i>★</i> '+x[6]+'</span> ('+num(x[7])+') · '+x[3]+'<div class="pr"><s>'+num(x[4])+'원</s> <em>'+rate(x)+'%</em><strong>'+num(x[5])+'원</strong> 1박</div></div>'}

function home(){
  var h='<div class="top"><div class="lg"><span class="logo">yanolja</span></div><div class="sr"><button class="sbox dm" type="button"><span>무엇을 하고 놀까요?</span><i>🔍</i></button><span class="ct dm">🛒</span></div>';
  h+='<div class="tabs"><span class="on">추천</span>'+['국내숙소','즐길거리','교통/항공','해외여행'].map(function(t){return '<span class="dm">'+t+'</span>'}).join('')+'</div></div>';
  h+='<section class="sec" style="padding-top:18px"><h2>NEW & HOT</h2><div class="grid">'+[['국내숙소','🏨','HOT'],['호텔·리조트','🛎',''],['펜션·풀빌라','🏡','HOT'],['모텔','🛏',''],['캠핑·글램핑','⛺','NEW'],['레저·티켓','🎟','HOT'],['액티비티','🏄',''],['렌터카','🚗','NEW'],['항공','✈',''],['해외숙소','🌏','']].map(function(c){return '<button class="dm" type="button"><i>'+c[1]+'</i>'+(c[2]?'<u>'+c[2]+'</u>':'')+c[0]+'</button>'}).join('')+'</div></section>';
  h+='<div class="bn"><div class="bs"><div style="background:linear-gradient(120deg,#ff3478,#ff80a8)"><b>가을 국내여행<br>숙소 최대 30% 할인</b>11.30까지 · 야놀자 단독 특가</div><div style="background:linear-gradient(120deg,#6a5bd6,#a69cf5)"><b>연말 호캉스<br>호텔 모아보기</b>인기 호텔 한눈에</div><div style="background:linear-gradient(120deg,#1e88d6,#6cc6ff)"><b>제주 항공+숙소<br>함께 예약하면 특가</b>교통/항공 기획전</div></div><span class="cnt">1 / 3</span></div>';
  h+='<section class="sec"><h2>숙박 쿠폰·할인 이벤트<em class="dm">전체보기 ›</em></h2><div class="hs"><div class="cp dm">숙박 쿠폰<b>최대 20,000원</b>국내숙소 3만원 이상 결제 시<br><span>쿠폰 받기</span></div><div class="cp dm">첫 예약 혜택<b>5,000원</b>신규 가입 고객 대상<br><span>쿠폰 받기</span></div><div class="cp dm">연박 할인<b>10% 할인</b>2박 이상 예약 시<br><span>쿠폰 받기</span></div></div></section>';
  h+='<section class="sec"><h2>오늘의 특가<em class="dm">더보기 ›</em></h2><div class="hs">'+[L[3],L[7],L[0],L[8],L[4]].map(pc).join('')+'</div></section>';
  h+='<section class="sec"><h2>추천 숙소<em class="dm">전체보기 ›</em></h2>'+[L[4],L[5],L[1],L[2],L[6]].map(rc2).join('')+'</section>';
  return h+'<p class="note">연출용 가상 데이터 · 실제 예약 정보 아님</p>';
}
function list(){
  var up=B.filter(function(b){return b[6]==1}).length;
  var h=hdr('MY 야놀자')+'<div class="my"><p>김하늘님<small>야놀자 회원</small></p><div class="mq"><span class="dm">쿠폰<b>2</b></span><span class="dm">포인트<b>1,500P</b></span><span class="dm">찜<b>9</b></span><span class="dm">고객센터<b>›</b></span></div></div>';
  h+='<div class="sh">예약내역 <span style="color:#ff3478">'+B.length+'</span></div>';
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
function render(){
  root.innerHTML={home:home,list:list,det:det}[S.v]();
  var t=S.v=='det'?'list':S.v;
  [].forEach.call(document.querySelectorAll('#tabbar [data-t]'),function(e){e.classList.toggle('on',e.dataset.t==t)});
}
document.addEventListener('click',function(e){
  var t=e.target.closest('[data-a]');if(!t)return;
  var a=t.dataset.a,i=t.dataset.i;
  if(a=='go'){if(i!=S.v)S.st.push(S.v);S.v=i;window.scrollTo(0,0);render()}
  else if(a=='det'){S.st.push(S.v);S.sel=+i;S.v='det';window.scrollTo(0,0);render()}
  else if(a=='back'){S.v=S.st.pop()||'home';window.scrollTo(0,0);render()}
});
render();
})();

'use strict';
/* 야놀자 2020 연출용: 홈 화면과 예약 내역(상세 포함)만 동작, 나머지는 UI 버튼 */
(function(){
function num(n){return String(n).replace(/\B(?=(\d{3})+(?!\d))/g,',')}
function won(n){return num(n)+'원'}
var DW=['일','월','화','수','목','금','토'];
function dl(s){var d=new Date(s+'T00:00:00');return String(d.getFullYear()).slice(2)+'.'+('0'+(d.getMonth()+1)).slice(-2)+'.'+('0'+d.getDate()).slice(-2)+'('+DW[d.getDay()]+')'}

/* 숙소 썸네일: 외부 이미지 없이 SVG로 생성 */
var PAL=[['#7ec8ff','#e8f6ff','#2a8fd6'],['#ffb88a','#fff1e0','#d9703a'],['#a9d98c','#f0fae6','#4f9a3a'],['#c7a8ff','#f4edff','#7b52d1'],['#ffa6c1','#ffeef4','#e0447b']];
function th(i,k){
  var p=PAL[i%PAL.length],s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+p[0]+'"/><stop offset="1" stop-color="'+p[1]+'"/></linearGradient></defs><rect width="160" height="120" fill="url(#g)"/><circle cx="124" cy="30" r="13" fill="#fff" opacity=".85"/>';
  if(k=='sea')s+='<path d="M0 80Q20 70 40 80T80 80T120 80T160 80V120H0Z" fill="'+p[2]+'" opacity=".7"/><path d="M0 95Q20 85 40 95T80 95T120 95T160 95V120H0Z" fill="'+p[2]+'"/><rect x="40" y="52" width="46" height="30" fill="#fff"/><path d="M36 54L63 36 90 54Z" fill="'+p[2]+'"/>';
  else if(k=='city')s+='<rect x="22" y="48" width="30" height="72" fill="'+p[2]+'"/><rect x="58" y="30" width="38" height="90" fill="#fff" opacity=".9"/><rect x="102" y="58" width="32" height="62" fill="'+p[2]+'" opacity=".8"/>'+[0,1,2,3].map(function(r){return '<rect x="65" y="'+(40+r*18)+'" width="8" height="8" fill="'+p[2]+'"/><rect x="80" y="'+(40+r*18)+'" width="8" height="8" fill="'+p[2]+'"/>'}).join('');
  else if(k=='hanok')s+='<rect x="0" y="92" width="160" height="28" fill="'+p[2]+'" opacity=".6"/><rect x="38" y="62" width="84" height="32" fill="#fff"/><path d="M26 64Q80 30 134 64L124 62Q80 40 36 62Z" fill="#555"/><path d="M26 64L134 64" stroke="#555" stroke-width="5"/>';
  else s+='<path d="M0 100L40 52 70 86 104 40 160 100V120H0Z" fill="'+p[2]+'" opacity=".75"/><path d="M60 98L88 66 116 98Z" fill="#fff"/><path d="M88 62L120 98H56Z" fill="'+p[2]+'" opacity=".4"/>';
  return 'data:image/svg+xml,'+encodeURIComponent(s+'</svg>');
}

var L=[ /* id,이름,분류,지역,원가,판매가,평점,리뷰,썸네일종류 */
 [1,'경포 오션뷰 펜션','펜션','강원 강릉',129000,89000,9.2,318,'sea'],
 [2,'홍대 스테이 호텔','호텔','서울 마포',89000,59000,8.9,1204,'city'],
 [3,'느린섬 게스트하우스','게스트하우스','제주 애월',32000,24000,9.0,562,'sea'],
 [4,'해운대 블루 호텔','호텔','부산 해운대',119000,79000,9.1,893,'city'],
 [5,'한옥 스테이 온다','한옥','전북 전주',98000,69000,9.4,447,'hanok'],
 [6,'청초호 모텔','모텔','강원 속초',65000,45000,8.6,731,'city'],
 [7,'별빛 글램핑','캠핑·글램핑','경기 가평',139000,99000,9.3,276,'mtn'],
 [8,'황남 게스트하우스','게스트하우스','경북 경주',38000,28000,9.2,389,'hanok']];
function lod(id){return L.filter(function(x){return x[0]==id})[0]}

var B=[ /* 예약번호,숙소id,객실,체크인,체크아웃,인원,상태(1확정 2완료 3취소),금액,결제수단,예약일 */
 ['YN2012190041',4,'스탠다드 더블','2020-12-19','2020-12-20','2명',1,79000,'신용카드(체크)','2020-12-02'],
 ['YN2010170826',8,'2인 온돌 도미토리','2020-10-17','2020-10-18','2명',2,56000,'카카오페이','2020-10-09'],
 ['YN2008080335',6,'스탠다드 트윈','2020-08-08','2020-08-09','2명',2,45000,'휴대폰 결제','2020-08-05'],
 ['YN2005020512',7,'카라반 4인','2020-05-02','2020-05-03','4명',2,396000,'신용카드','2020-04-14'],
 ['YN2002220187',1,'오션뷰 온돌룸','2020-02-22','2020-02-23','2명',3,89000,'신용카드(체크)','2020-02-10'],
 ['YN2001110263',5,'온돌 스탠다드','2020-01-11','2020-01-12','2명',2,69000,'카카오페이','2020-01-02']];
var ST={1:['예약확정','s1'],2:['이용완료','s2'],3:['예약취소','s3']};

var S={v:'home',sel:null,st:[]},root=document.getElementById('root');
function hdr(t){return '<div class="hd"><button data-a="back">‹</button>'+t+'</div>'}
function dm(l,ic){return '<button class="dm" type="button"><i>'+ic+'</i>'+l+'</button>'}
function pc(x){var r=Math.round((1-x[5]/x[4])*100);return '<div class="pc"><img src="'+th(x[0],x[8])+'" alt=""><b>'+x[1]+'</b>'+x[3]+' · '+x[2]+'<div class="pr"><s>'+num(x[4])+'원</s><br><em>'+r+'%</em><strong>'+num(x[5])+'원</strong></div></div>'}
function lc(x){var r=Math.round((1-x[5]/x[4])*100);return '<div class="lc"><img src="'+th(x[0],x[8])+'" alt=""><div><span class="tag">'+x[2]+'</span><b>'+x[1]+'</b><span class="sc"><i>★</i> '+x[6]+'</span> 리뷰 '+num(x[7])+' · '+x[3]+'<div class="pr"><s>'+num(x[4])+'원</s> <em>'+r+'%</em><strong>'+num(x[5])+'원</strong></div></div></div>'}

function home(){
  var h='<header class="top"><span class="logo">yanolja<small>야놀자</small></span><div class="ti"><span class="dm">🔔</span><span class="dm">🛒</span></div></header>';
  h+='<button class="sbox dm" type="button">🔍 <span>지역, 숙소명으로 <b>검색</b></span></button><div class="opt"><span>오늘 12.10(목) ~ 12.11(금)</span><span>성인 2명</span></div>';
  h+='<section class="cats">'+[['모텔','🛏'],['호텔·리조트','🏨'],['펜션','🏡'],['게스트하우스','🏘'],['캠핑·글램핑','⛺'],['해외숙소','✈'],['레저·티켓','🎟'],['내주변','📍']].map(function(c){return '<button class="dm" type="button"><i>'+c[1]+'</i>'+c[0]+'</button>'}).join('')+'</section>';
  h+='<div class="bn"><div style="background:linear-gradient(120deg,#ff3478,#ff7aa5)"><b>겨울 숙박 특가<br>최대 40% 할인</b>12.31까지 · 전국 숙소</div><div style="background:linear-gradient(120deg,#7b52d1,#a98cf5)"><b>첫 예약 5,000원<br>쿠폰 드려요</b>신규 회원 한정</div><div style="background:linear-gradient(120deg,#2a8fd6,#6cc0ff)"><b>연말 호캉스<br>호텔 모아보기</b>오늘의 특가 확인</div></div>';
  h+='<section class="sec"><h2>오늘 떠나는 특가<em class="dm">더보기 ›</em></h2><div class="hs">'+[L[3],L[1],L[2],L[5],L[7]].map(pc).join('')+'</div></section>';
  h+='<section class="sec"><h2>지금 인기 있는 숙소<em class="dm">전체보기 ›</em></h2>'+[L[4],L[0],L[6],L[3],L[1]].map(lc).join('')+'</section>';
  return h+'<p class="note">연출용 가상 데이터 · 실제 예약 정보 아님</p>';
}
function list(){
  var h=hdr('예약내역')+'<div class="tabs2"><span class="on">전체 '+B.length+'</span><span>숙박</span><span>레저·티켓</span></div>';
  B.forEach(function(b,i){var x=lod(b[1]),s=ST[b[6]];
    h+='<button class="rc" data-a="det" data-i="'+i+'"><div class="rh"><span class="st '+s[1]+'">'+s[0]+'</span><span>예약일 '+b[9].replace(/-/g,'.')+'</span></div><div class="rb"><img src="'+th(x[0],x[8])+'" alt=""><div><b>'+x[1]+'</b><p>체크인 '+dl(b[3])+'</p><p>체크아웃 '+dl(b[4])+'</p><p class="am">'+(b[6]==3?'환불 ':'')+won(b[7])+'</p></div></div></button>'});
  return h;
}
var ADR={1:'강원 강릉시 안목해변길 000',2:'서울 마포구 와우산로 000',3:'제주 제주시 애월읍 000',4:'부산 해운대구 달맞이길 000',5:'전북 전주시 완산구 은행로 000',6:'강원 속초시 청초호반로 000',7:'경기 가평군 청평면 000',8:'경북 경주시 포석로 000'};
function det(){
  var b=B[S.sel],x=lod(b[1]),s=ST[b[6]];
  return hdr('예약 상세')+'<img class="hero" src="'+th(x[0],x[8])+'" alt=""><div class="dtl"><span class="st '+s[1]+'">'+s[0]+'</span><h1>'+x[1]+'</h1><span style="font-size:12px;color:#999">'+x[3]+' · '+x[2]+'</span>'+
   '<div class="box"><div>체크인<b>'+dl(b[3])+'</b>15:00</div><div>체크아웃<b>'+dl(b[4])+'</b>11:00</div></div>'+
   [['예약번호',b[0]],['객실',b[2]],['인원',b[5]],['숙박일수','1박'],['주소',ADR[x[0]]],['결제수단',b[8]],['결제금액',won(b[7])],['결제상태',b[6]==3?'전액 환불':'결제완료']].map(function(k){return '<div class="kv"><span>'+k[0]+'</span><span>'+k[1]+'</span></div>'}).join('')+
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

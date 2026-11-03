'use strict';
/* 야놀자 2025 초반(NOL 브랜드 전환 이전) 연출용
   홈 화면과 예약내역(상세 포함)만 동작하고, 나머지 메뉴는 화면과 버튼만 있는 비활성 상태입니다.
   모든 아이콘·로고는 SVG, 숙소/상품 사진 자리는 SVG 일러스트입니다. */
(function(){
var TODAY='2025-02-20';
function num(n){return String(n).replace(/\B(?=(\d{3})+(?!\d))/g,',')}
function won(n){return num(n)+'원'}
var DW=['일','월','화','수','목','금','토'];
function D(s){return new Date(s+'T00:00:00')}
function dl(s){var d=D(s);return d.getFullYear()+'.'+('0'+(d.getMonth()+1)).slice(-2)+'.'+('0'+d.getDate()).slice(-2)+'('+DW[d.getDay()]+')'}
function dm(s){var d=D(s);return (d.getMonth()+1)+'.'+d.getDate()+'('+DW[d.getDay()]+')'}
function dot(s){return s.replace(/-/g,'.')}
function nights(a,b){return Math.round((D(b)-D(a))/864e5)}
function dday(s){return Math.round((D(s)-D(TODAY))/864e5)}

/* ───── 벡터 아이콘 세트: 24x24, 선 1.8 round 로 통일 ───── */
var IC={
 search:'<circle cx="11" cy="11" r="6.500"/><path d="M20 20l-4.200-4.200"/>',
 bell:'<path d="M6 17v-6a6 6 0 0 1 12 0v6l1.500 2h-15z"/><path d="M10 21.500h4"/>',
 home:'<path d="M4 11l8-7 8 7v9h-5.500v-6h-5v6H4z"/>',
 pin:'<path d="M12 21s7-6.200 7-11.500a7 7 0 1 0-14 0C5 14.800 12 21 12 21z"/><circle cx="12" cy="9.500" r="2.500"/>',
 heart:'<path d="M12 20s-8-4.800-8-10.800A4.400 4.400 0 0 1 12 6.600a4.400 4.400 0 0 1 8 2.600C20 15.200 12 20 12 20z"/>',
 receipt:'<path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9.500 8h5M9.500 12h5"/>',
 user:'<circle cx="12" cy="8" r="4"/><path d="M4.500 20.500c0-4 3.400-6.500 7.500-6.500s7.500 2.500 7.500 6.500"/>',
 back:'<path d="M15 5l-7 7 7 7"/>',
 chev:'<path d="M9 5l7 7-7 7"/>',
 hotel:'<rect x="5" y="3.500" width="14" height="17" rx="1.500"/><path d="M9 8h2M13 8h2M9 12h2M13 12h2M10.500 20.500v-4h3v4"/>',
 globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
 resort:'<path d="M3.500 19V6M3.500 15h17v4M20.500 15v-2.500a3 3 0 0 0-3-3H11V15"/><circle cx="7.500" cy="11.500" r="1.800"/>',
 house:'<path d="M3.500 12L12 4.500 20.500 12"/><path d="M6 10.500V20h12v-9.500"/><path d="M10 20v-5h4v5"/>',
 tent:'<path d="M12 4L3 20h18z"/><path d="M9.500 20L12 15l2.500 5"/>',
 ticket:'<path d="M4 7h16v3a2 2 0 0 0 0 4v3H4v-3a2 2 0 0 0 0-4z"/><path d="M14 7v10" stroke-dasharray="2 2"/>',
 wave:'<path d="M3 16c2-2.500 4-2.500 6 0s4 2.500 6 0 4-2.500 6 0"/><path d="M3 20.500c2-2.500 4-2.500 6 0s4 2.500 6 0 4-2.500 6 0"/><circle cx="15.500" cy="6.500" r="2.200"/><path d="M15.500 9l-2 4"/>',
 car:'<path d="M4 17v-4.500L6 7h12l2 5.500V17z"/><path d="M4 12.500h16"/><circle cx="8" cy="17.500" r="1.500"/><circle cx="16" cy="17.500" r="1.500"/>',
 plane:'<path d="M21 4L10 14.500"/><path d="M21 4l-6.500 17-4-6.500L4 10.500z"/>',
 suitcase:'<rect x="4" y="8" width="16" height="12" rx="2"/><path d="M9 8V6.500A1.500 1.500 0 0 1 10.500 5h3A1.500 1.500 0 0 1 15 6.500V8M9 12v4M15 12v4"/>',
 coupon:'<path d="M3 8h18v3a2 2 0 0 0 0 4v3H3v-3a2 2 0 0 0 0-4z"/><path d="M14.500 10l-5 6"/><circle cx="10" cy="10.500" r=".8"/><circle cx="14" cy="15.500" r=".8"/>',
 star:'<path class="f" d="M12 3l2.700 5.600 6.100.9-4.400 4.300 1 6.100L12 17l-5.400 2.900 1-6.100L3.200 9.500l6.100-.9z"/>',
 cal:'<rect x="4" y="5.500" width="16" height="14.500" rx="2"/><path d="M4 10h16M8.500 3.500v4M15.500 3.500v4"/>',
 gift:'<rect x="4" y="9" width="16" height="11" rx="1.500"/><path d="M3 9h18M12 9v11"/><path d="M12 9C11 6 7 5 7 7.500S10 9 12 9zM12 9c1-3 5-4 5-1.500S14 9 12 9z"/>',
 card:'<rect x="3" y="5.500" width="18" height="13" rx="2"/><path d="M3 10h18M6.500 15h4"/>',
 headset:'<path d="M4.500 14v-2a7.500 7.500 0 0 1 15 0v2"/><rect x="3.500" y="13" width="4" height="6" rx="1.500"/><rect x="16.500" y="13" width="4" height="6" rx="1.500"/><path d="M18.500 19c0 1.500-2 2-4.500 2"/>',
 settings:'<path d="M4 7h10M18 7h2M4 17h2M10 17h10"/><circle cx="16" cy="7" r="2"/><circle cx="8" cy="17" r="2"/>',
 phone:'<path d="M6 3.500h3l1.500 4-2 1.500a11 11 0 0 0 6.500 6.500l1.500-2 4 1.500v3a2 2 0 0 1-2 2A16.500 16.500 0 0 1 4 5.500a2 2 0 0 1 2-2z"/>',
 route:'<circle cx="6" cy="18" r="2"/><circle cx="18" cy="6" r="2"/><path d="M8 18h6a3 3 0 0 0 0-6h-4a3 3 0 0 1 0-6h6"/>',
 down:'<path d="M12 4v11M7.500 11l4.500 4.500 4.500-4.500"/><path d="M5 20h14"/>',
 doc:'<path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4M9.500 12h6M9.500 16h6"/>',
 pencil:'<path d="M4 20l1-4L16.500 4.500a2 2 0 0 1 3 3L8 19z"/>',
 close:'<path d="M6 6l12 12M18 6L6 18"/>',
 clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'
};
function ic(n,s){s=s||24;return '<svg class="ic" width="'+s+'" height="'+s+'" viewBox="0 0 24 24" stroke-width="'+(1.8*24/s).toFixed(2)+'" aria-hidden="true">'+IC[n]+'</svg>'}

/* 야놀자 로고: 핑크 워드마크를 선으로 직접 그린 SVG */
function logo(h){var w=Math.round(h*100/30);return '<svg width="'+w+'" height="'+h+'" viewBox="0 0 100 30" role="img" aria-label="야놀자 yanolja"><g fill="none" stroke="#f7347a" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8l5 12M14 8L8.500 21.500 6 26"/><circle cx="25" cy="14" r="5"/><path d="M30 8v12M37 8v12M37 14a5 5 0 0 1 10 0v6"/><circle cx="60" cy="14" r="5"/><path d="M73.500 3v17M80 8v14a4 4 0 0 1-4 4"/><circle cx="91" cy="14" r="5"/><path d="M96 8v12"/></g><circle cx="80" cy="3.500" r="2.200" fill="#f7347a"/></svg>'}

/* ───── 사진 자리: SVG 일러스트 ───── */
var PAL=[['#7cc4ff','#e6f5ff','#2b7fd6'],['#ffb59a','#fff1e4','#e0673a'],['#a8e0a0','#f1fbe9','#4a9a45'],['#8fe0d6','#eafaf7','#1f9d8f'],['#ffaac6','#fff0f5','#e0386f'],['#9bc2ff','#edf4ff','#2d6bff']];
var THC={};
function th(i,k){
 var key=i+k;if(THC[key])return THC[key];
 var p=PAL[i%PAL.length],a=p[2];
 if(k=='plane')p=['#3b78ff','#b4d2ff',a='#2d6bff'];
 function W(y,o,c){return '<path d="M0 '+y+'Q20 '+(y-8)+' 40 '+y+'T80 '+y+'T120 '+y+'T160 '+y+'V120H0Z" fill="'+(c||a)+'" opacity="'+(o||1)+'"/>'}
 var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+p[0]+'"/><stop offset="1" stop-color="'+p[1]+'"/></linearGradient></defs><rect width="160" height="120" fill="url(#g)"/>';
 if(k!='plane')s+='<circle cx="128" cy="26" r="12" fill="#fff" opacity=".85"/>';
 if(k=='sea'){
  s+='<rect x="36" y="46" width="54" height="38" rx="2" fill="#fff"/><path d="M32 48L63 30l31 18z" fill="'+a+'"/>'+[44,58,72].map(function(x){return '<rect x="'+x+'" y="58" width="8" height="10" fill="'+a+'" opacity=".35"/>'}).join('')+W(84,.55)+W(98);
 }else if(k=='city'){
  s+='<rect x="20" y="50" width="32" height="70" fill="'+a+'"/><rect x="58" y="30" width="40" height="90" fill="#fff" opacity=".92"/><rect x="104" y="58" width="34" height="62" fill="'+a+'" opacity=".8"/>';
  [0,1,2,3].forEach(function(r){s+='<rect x="65" y="'+(40+r*18)+'" width="8" height="8" fill="'+a+'"/><rect x="82" y="'+(40+r*18)+'" width="8" height="8" fill="'+a+'"/>'});
  [0,1,2].forEach(function(r){s+='<rect x="27" y="'+(60+r*18)+'" width="7" height="7" fill="#fff" opacity=".6"/><rect x="39" y="'+(60+r*18)+'" width="7" height="7" fill="#fff" opacity=".6"/>'});
 }else if(k=='hanok'){
  s+='<rect y="94" width="160" height="26" fill="'+a+'" opacity=".6"/><rect x="40" y="64" width="80" height="32" fill="#fff"/><path d="M26 66Q80 30 134 66L124 64Q80 42 36 64Z" fill="#4a4a52"/><rect x="72" y="74" width="16" height="22" fill="'+a+'" opacity=".5"/>';
 }else if(k=='pool'){
  s+='<rect x="108" y="48" width="30" height="26" rx="2" fill="'+a+'"/><rect y="72" width="160" height="48" fill="#fff" opacity=".7"/><rect x="26" y="80" width="108" height="30" rx="7" fill="'+a+'" opacity=".85"/><path d="M38 95Q50 89 62 95T86 95T110 95" stroke="#fff" stroke-width="3" fill="none"/>';
 }else if(k=='mtn'){
  s+='<path d="M0 100L40 52 70 86 104 40 160 100V120H0Z" fill="'+a+'" opacity=".75"/><path d="M92 58L104 40 116 58 110 55 104 61 98 55Z" fill="#fff"/><rect y="100" width="160" height="20" fill="'+a+'"/>';
 }else if(k=='resort'){
  s+=W(78,.5)+'<path d="M40 54a26 22 0 0 1 52 0z" fill="'+a+'"/><path d="M66 54v44" stroke="#555" stroke-width="3"/><ellipse cx="80" cy="110" rx="92" ry="16" fill="#fff" opacity=".85"/>';
 }else if(k=='camp'){
  s+='<path d="M0 96L36 58 64 88 98 48 160 100V120H0Z" fill="'+a+'" opacity=".6"/><path d="M80 52L50 104h60z" fill="#fff"/><path d="M80 52v52" stroke="'+a+'" stroke-width="2"/><path d="M80 74L68 104h24z" fill="'+a+'"/><rect y="104" width="160" height="16" fill="'+a+'"/>';
 }else if(k=='surf'){
  s+=W(64,.45)+W(80,.75)+'<ellipse cx="70" cy="78" rx="22" ry="3.500" fill="#fff"/><circle cx="72" cy="54" r="5" fill="#fff"/><path d="M72 60l-2 12M66 64l12 2" stroke="#fff" stroke-width="3" stroke-linecap="round"/>'+W(98);
 }else if(k=='park'){
  s+='<circle cx="80" cy="56" r="32" fill="none" stroke="'+a+'" stroke-width="3"/><circle cx="80" cy="56" r="4" fill="'+a+'"/><path d="M80 24v64M48 56h64M57 33l46 46M103 33L57 79" stroke="'+a+'" stroke-width="2"/><path d="M80 56l-22 62M80 56l22 62" stroke="'+a+'" stroke-width="3"/>'+[[80,24],[112,56],[80,88],[48,56]].map(function(c){return '<circle cx="'+c[0]+'" cy="'+c[1]+'" r="4.500" fill="#fff" stroke="'+a+'" stroke-width="2"/>'}).join('')+'<rect y="108" width="160" height="12" fill="'+a+'"/>';
 }else if(k=='plane'){
  s+='<ellipse cx="34" cy="96" rx="26" ry="9" fill="#fff" opacity=".8"/><ellipse cx="124" cy="104" rx="32" ry="9" fill="#fff" opacity=".7"/><g transform="rotate(-14 80 60)"><rect x="38" y="53" width="84" height="13" rx="6.500" fill="#fff"/><path d="M80 55L62 26h11l24 29zM80 64L62 94h11l24-30z" fill="#fff"/><path d="M42 55l-7-12h9l9 12z" fill="#fff"/></g>';
 }else if(k=='car'){
  s+='<path d="M0 84L34 60 66 80 104 52 160 84V120H0Z" fill="'+a+'" opacity=".35"/><rect y="86" width="160" height="34" fill="#555"/><path d="M0 104h160" stroke="#fff" stroke-width="3" stroke-dasharray="14 10"/><path d="M44 76l10-18h46l12 18z" fill="'+a+'"/><rect x="34" y="72" width="92" height="18" rx="6" fill="'+a+'"/><path d="M56 62h20v12H52zM80 62h18l8 12H80z" fill="#fff" opacity=".8"/><circle cx="58" cy="92" r="7" fill="#333"/><circle cx="108" cy="92" r="7" fill="#333"/>';
 }
 return THC[key]='data:image/svg+xml,'+encodeURIComponent(s+'</svg>');
}

/* ───── 데이터 ───── */
var TGC=[['쿠폰','p'],['무료취소','b'],['특가','p'],['오늘 출발','b']];
var L=[ /* id,이름,분류,지역,원가,판매가,평점,리뷰,썸네일,권역,태그 */
 [4,'광안 오션뷰 호텔','호텔','부산 · 수영구',199000,139000,9.3,2051,'city','부산',[TGC[0],TGC[1]]],
 [1,'안목 비치 호텔','호텔','강릉 · 안목해변',158000,105000,9.2,1410,'sea','강원',[TGC[2]]],
 [10,'제주 노을 리조트','리조트','제주 · 서귀포시',260000,189000,9.4,1738,'resort','제주',[TGC[0],TGC[1]]],
 [2,'홍대 오브 호텔','호텔','서울 · 마포구',149000,98000,9.0,2604,'city','서울',[TGC[3]]],
 [5,'온다 한옥 스테이','한옥','전주 · 한옥마을',118000,85000,9.5,688,'hanok','전라',[TGC[0]]],
 [6,'속초 라온 풀빌라','풀빌라','속초 · 영랑동',340000,279000,9.4,497,'pool','강원',[TGC[1]]],
 [3,'느린섬 게스트하우스','게스트하우스','제주 · 애월읍',45000,34000,9.1,912,'sea','제주',[TGC[2]]],
 [11,'성수 스튜디오 스테이','호텔','서울 · 성동구',120000,89000,9.1,1320,'city','서울',[TGC[0]]],
 [12,'해운대 라이트 호텔','호텔','부산 · 해운대구',188000,129000,9.2,2877,'sea','부산',[TGC[1]]],
 [7,'황남 게스트하우스','게스트하우스','경주 · 황리단길',48000,38000,9.2,603,'hanok','경북',[TGC[2]]],
 [8,'여수 마리나 호텔','호텔','여수 · 돌산읍',175000,119000,9.1,1066,'sea','전라',[TGC[1]]],
 [9,'가평 숲속 글램핑','캠핑·글램핑','가평 · 청평면',160000,119000,9.3,422,'camp','경기',[TGC[0]]]];
function lod(id){return L.filter(function(x){return x[0]==id})[0]}
var ADR={1:'강원 강릉시 창해로 000',2:'서울 마포구 양화로 000',3:'제주 제주시 애월읍 애월로 000',4:'부산 수영구 광안해변로 000',5:'전북 전주시 완산구 태조로 000',6:'강원 속초시 영랑해안길 000',7:'경북 경주시 포석로 000',8:'전남 여수시 돌산읍 돌산로 000',9:'경기 가평군 청평면 000',10:'제주 서귀포시 중문관광로 000',11:'서울 성동구 아차산로 000',12:'부산 해운대구 해운대해변로 000'};
var REG=['전체','서울','부산','제주','강원','경기','경북','전라'];

var PK=[ /* 이름,부제,1인 가격,태그,썸네일 */
 ['제주 항공+숙소 2박 3일','김포 출발 · 호텔 2박',189000,'항공+숙소','plane'],
 ['부산 KTX+호텔 1박 2일','서울 출발 · 오션뷰 호텔',139000,'교통+숙소','sea'],
 ['오사카 자유여행 3박 4일','인천 출발 · 항공+호텔',429000,'해외여행','city'],
 ['다낭 리조트 3박 5일','인천 출발 · 항공+리조트',599000,'해외여행','resort'],
 ['후쿠오카 온천 2박 3일','부산 출발 · 항공+료칸',359000,'해외여행','hanok']];
var AC=[ /* 이름,지역·분류,원가,판매가,썸네일 */
 ['양양 서핑 입문 강습','양양 · 액티비티',70000,55000,'surf'],
 ['설악산 케이블카','속초 · 티켓',15000,12000,'mtn'],
 ['서울 놀이공원 종일권','서울 · 테마파크',62000,44000,'park'],
 ['부산 요트 투어','부산 · 액티비티',55000,42000,'sea'],
 ['한복 대여 2시간','경주 · 체험',25000,18000,'hanok'],
 ['제주 승마 체험','제주 · 레저',48000,38000,'mtn']];
var CP=[ /* 금액,설명,조건,색,아이콘 */
 ['30,000원','국내숙소 할인쿠폰','15만원 이상 · 2.28까지','p'],
 ['10%','해외숙소 할인쿠폰','최대 50,000원 · 3.15까지','p'],
 ['5,000원','레저·액티비티 쿠폰','첫 예약 시 · 3.31까지','b'],
 ['10,000원','항공권 할인쿠폰','15만원 이상 · 3.10까지','b']];

var TY={stay:['숙소','hotel','p'],leisure:['레저','ticket','b'],flight:['항공','plane','b'],car:['렌터카','car','b']};
var ST={1:['예약확정','s1'],4:['발권완료','s4'],2:['이용완료','s2'],3:['예약취소','s3']};
var B=[ /* t종류 r숙소id a시작 b종료 g인원 s상태 lp상품금액 cp쿠폰 pt포인트 m결제수단 bk예약일 */
 {id:'YN250223061904',t:'leisure',n:'양양 서핑 입문 강습',sub:'강원 양양 · 액티비티',opt:'입문 강습 90분 · 장비 대여 포함',a:'2025-02-23',b:'2025-02-23',g:'성인 2명',s:1,lp:110000,cp:5000,pt:0,m:'네이버페이',bk:'2025-02-14',k:'surf',sd:1,
  box:[['이용일','2025.02.23(일)','오전 10:00 시작'],['이용 인원','성인 2명','장비 포함']],x:[['집합 장소','강원 양양군 현남면 서퍼비치로 000'],['이용 안내','시작 20분 전까지 도착']]},
 {id:'YN250301047218',t:'stay',r:4,opt:'오션뷰 더블 · 조식 포함',a:'2025-03-01',b:'2025-03-02',g:'성인 2명',s:1,lp:139000,cp:10000,pt:1500,m:'토스페이',bk:'2025-02-09'},
 {id:'YN250315098173',t:'flight',n:'김포 - 제주 왕복 항공권',sub:'한빛항공 · 일반석',opt:'왕복 · 일반석 · 위탁수하물 15kg',a:'2025-03-15',b:'2025-03-17',g:'성인 2명',s:4,lp:184800,cp:10000,pt:0,m:'카카오페이',bk:'2025-02-12',k:'plane',sd:2,
  box:[['가는 날','2025.03.15(토)','김포 08:20 출발 · 제주 09:30 도착'],['오는 날','2025.03.17(월)','제주 18:40 출발 · 김포 19:50 도착']],x:[['항공편','HB1203 / HB1218'],['예약 번호(PNR)','K7QX2M']]},
 {id:'YN250118052660',t:'stay',r:5,opt:'온돌 스탠다드',a:'2025-01-18',b:'2025-01-19',g:'성인 2명',s:2,lp:85000,cp:5000,pt:0,m:'신용카드',bk:'2025-01-05'},
 {id:'YN250105033841',t:'leisure',n:'설악산 케이블카',sub:'강원 속초 · 티켓',opt:'왕복 · 성인',a:'2025-01-05',b:'2025-01-05',g:'성인 2명',s:2,lp:24000,cp:0,pt:0,m:'토스페이',bk:'2025-01-02',k:'mtn',sd:3,
  box:[['이용일','2025.01.05(일)','모바일 티켓 사용 완료'],['이용 인원','성인 2명','왕복']],x:[['이용 장소','강원 속초시 설악산로 000']]},
 {id:'YN241214071125',t:'stay',r:8,opt:'오션뷰 더블',a:'2024-12-14',b:'2024-12-15',g:'성인 2명',s:2,lp:119000,cp:0,pt:1000,m:'카카오페이',bk:'2024-11-20'},
 {id:'YN241221040937',t:'stay',r:6,opt:'프라이빗 풀빌라 4인',a:'2024-12-21',b:'2024-12-22',g:'성인 4명',s:3,lp:279000,cp:20000,pt:0,m:'신용카드',bk:'2024-12-02',cx:'2024-12-10'},
 {id:'YN241109025590',t:'car',n:'제주 렌터카 준중형 SUV',sub:'제주공항 · 2일',opt:'준중형 SUV · 자차 완전면책',a:'2024-11-09',b:'2024-11-10',g:'운전자 1명',s:2,lp:76000,cp:8000,pt:0,m:'신용카드',bk:'2024-10-25',k:'car',sd:4,
  box:[['대여','2024.11.09(토)','10:00 · 제주공항'],['반납','2024.11.10(일)','10:00 · 제주공항']],x:[['차량','준중형 SUV (휘발유)'],['보험','자차 완전면책 포함']]}];
B.forEach(function(b){
 if(b.t=='stay'){var x=lod(b.r);b.n=x[1];b.sub=x[3]+' · '+x[2];b.k=x[8];b.sd=x[0];b.x=[['주소',ADR[x[0]]]];b.box=[['체크인',dl(b.a),'15:00 부터'],['체크아웃',dl(b.b),'11:00 까지']]}
 b.paid=b.lp-b.cp-b.pt;
});
function dateLine(b){
 if(b.t=='leisure')return dl(b.a);
 var n=nights(b.a,b.b);
 return dl(b.a)+' ~ '+dl(b.b).slice(5)+(b.t=='flight'?'':' · '+n+'박');
}

/* ───── 화면 ───── */
var S={v:'home',sel:null,f:'all',reg:'전체'},hd=document.getElementById('hd'),root=document.getElementById('root'),tb=document.getElementById('tabbar'),tt=document.getElementById('toast');
function na(){return ' data-a="na"'}
function tg(t){return '<span class="tg '+t[1]+'">'+t[0]+'</span>'}
function more(){return '<em'+na()+'>더보기'+ic('chev',16)+'</em>'}
function sec(t,sub,body,mr){return '<section class="sec"><div class="sh"><div><h2>'+t+'</h2>'+(sub?'<p>'+sub+'</p>':'')+'</div>'+(mr===false?'':more())+'</div>'+body+'</section>'}
function rate(o,p){return Math.round((1-p/o)*100)}

function stayRow(x){
 return '<div class="sr"'+na()+'><div class="im"><img src="'+th(x[0],x[8])+'" alt=""><span class="hrt">'+ic('heart',24)+'</span></div><div class="tx"><div>'+x[10].map(tg).join('')+'</div><b>'+x[1]+'</b><div class="rt">'+ic('star',14)+'<strong>'+x[6]+'</strong>('+num(x[7])+')</div><div class="rg">'+x[2]+' · '+x[3]+'</div><div class="pr"><s>'+num(x[4])+'원</s><div><em>'+rate(x[4],x[5])+'%</em><strong>'+num(x[5])+'원</strong></div><small>1박 · 세금 포함</small></div></div></div>';
}
function stays(){
 var a=L.filter(function(x){return S.reg=='전체'||x[9]==S.reg}).slice(0,6);
 return a.map(stayRow).join('');
}
function chips(){return REG.map(function(r){return '<button type="button" data-a="chip" data-i="'+r+'" class="'+(r==S.reg?'on':'')+'">'+r+'</button>'}).join('')}

var DEC=[
 '<svg class="dc" viewBox="0 0 130 148" aria-hidden="true"><circle cx="100" cy="42" r="54" fill="#fff" opacity=".18"/><circle cx="74" cy="132" r="38" fill="#fff" opacity=".14"/><circle cx="112" cy="104" r="14" fill="#fff" opacity=".5"/></svg>',
 '<svg class="dc" viewBox="0 0 130 148" aria-hidden="true"><circle cx="96" cy="120" r="44" fill="#fff" opacity=".14"/><path d="M22 70L120 28 92 122 68 88z" fill="#fff" opacity=".95"/><path d="M68 88L120 28" stroke="#2d6bff" stroke-width="2.500"/></svg>',
 '<svg class="dc" viewBox="0 0 130 148" aria-hidden="true"><circle cx="98" cy="52" r="42" fill="#f7347a"/><circle cx="70" cy="128" r="30" fill="#fff" opacity=".16"/></svg>',
 '<svg class="dc" viewBox="0 0 130 148" aria-hidden="true"><circle cx="96" cy="40" r="22" fill="#fff" opacity=".6"/><path d="M0 104Q20 92 40 104T80 104T130 104V148H0Z" fill="#fff" opacity=".24"/><path d="M0 124Q20 112 40 124T80 124T130 124V148H0Z" fill="#fff" opacity=".24"/></svg>'];
var BN=[['봄맞이 국내여행<br>숙소 최대 30% 할인','야놀자 단독 특가 · 전국 숙소','c1'],['제주 항공+숙소<br>함께 예약하면 특가','교통·항공 기획전','c2'],['레저·액티비티<br>첫 예약 5,000원 쿠폰','서핑 · 케이블카 · 테마파크','c3'],['해외숙소 얼리버드<br>최대 10% 추가 할인','오사카 · 다낭 · 후쿠오카','c4']];

function home(){
 var h='<div class="lg"><span class="logo">'+logo(30)+'</span><button class="ib" type="button" aria-label="알림"'+na()+'>'+ic('bell',24)+'<i class="dot"></i></button></div>';
 h+='<button class="sbox" type="button"'+na()+'><span><b>어디로 떠나시나요?</b><small>2.21(금) - 2.22(토) · 1박 · 성인 2명</small></span><i class="sgo">'+ic('search',24)+'</i></button>';
 h+='<div class="tabs"><span class="on">추천</span>'+['국내숙소','해외숙소','레저·티켓','교통·항공','여행상품'].map(function(t){return '<span'+na()+'>'+t+'</span>'}).join('')+'</div>';
 var b='<div class="gr">'+[['국내숙소','hotel','p'],['해외숙소','globe','p'],['호텔·리조트','resort','p'],['펜션·풀빌라','house','p'],['캠핑·글램핑','tent','p'],['레저·티켓','ticket','b'],['액티비티','wave','b'],['렌터카','car','b'],['항공','plane','b'],['여행상품','suitcase','b']].map(function(c){return '<button type="button" class="'+c[2]+'"'+na()+'><i>'+ic(c[1],24)+'</i>'+c[0]+'</button>'}).join('')+'</div>';
 b+='<div class="bn"><div class="bs">'+BN.map(function(x,i){return '<div class="'+x[2]+'"'+na()+'><b>'+x[0]+'</b><small>'+x[1]+'</small>'+DEC[i]+'</div>'}).join('')+'</div><span class="cnt" id="cnt">1 / '+BN.length+'</span></div>';
 b+='<div class="mb"><button type="button"'+na()+'>'+ic('coupon',24)+'<span>보유 쿠폰<b>3장</b></span></button><button type="button"'+na()+'>'+ic('gift',24)+'<span>포인트<b>1,500P</b></span></button><button type="button"'+na()+'>'+ic('heart',24)+'<span>찜한 상품<b>9개</b></span></button></div>';
 b+=sec('추천 여행 상품','항공·교통·숙소를 한 번에','<div class="hs">'+PK.map(function(x,i){return '<div class="pk"'+na()+'><div class="im"><img src="'+th(i+1,x[4])+'" alt=""><span class="tg w">'+x[3]+'</span></div><b>'+x[0]+'</b><p>'+x[1]+'</p><div class="pp"><strong>'+num(x[2])+'원~</strong>1인 기준</div></div>'}).join('')+'</div>');
 b+=sec('인기 숙소','지금 많이 찾는 국내 숙소','<div class="chips" id="chips">'+chips()+'</div><div id="stays">'+stays()+'</div>');
 b+=sec('인기 레저·액티비티','이번 주말 놀거리','<div class="hs">'+AC.map(function(a,i){return '<div class="lz"'+na()+'><div class="im"><img src="'+th(i+2,a[4])+'" alt=""><span class="hrt">'+ic('heart',24)+'</span></div><b>'+a[0]+'</b>'+a[1]+'<div class="pr"><s>'+num(a[2])+'원</s><div><em>'+rate(a[2],a[3])+'%</em><strong>'+num(a[3])+'원</strong></div></div></div>'}).join('')+'</div>');
 b+=sec('할인·쿠폰','다운로드하고 바로 사용하세요','<div class="hs">'+CP.map(function(c){return '<div class="cpn '+c[3]+'"><div class="v"><b>'+c[0]+'</b><span>'+c[1]+'</span><small>'+c[2]+'</small></div><button type="button"'+na()+'>'+ic('down',20)+'받기</button></div>'}).join('')+'</div>');
 b+='<p class="nt">연출용 가상 데이터이며 실제 예약 정보가 아닙니다.</p>';
 return ['',h+b];
}

/* 예약 내역 */
function inF(b,f){return f=='all'||(f=='up'&&(b.s==1||b.s==4))||(f=='done'&&b.s==2)||(f=='cx'&&b.s==3)}
function cnt(f){return B.filter(function(b){return inF(b,f)}).length}
function card(b,i){
 var T=TY[b.t],s=ST[b.s],d=(b.s==1||b.s==4)?dday(b.a):null;
 return '<button class="rc" type="button" data-a="det" data-i="'+i+'"><div class="rh"><span class="ty '+T[2]+'">'+ic(T[1],18)+T[0]+'</span><span class="st '+s[1]+'">'+s[0]+'</span>'+(d!==null&&d>=0?'<span class="dd">D-'+d+'</span>':'')+'<span class="sp">예약일 '+dot(b.bk)+'</span></div>'+
  '<div class="rb"><img src="'+th(b.sd,b.k)+'" alt=""><div class="ri"><b>'+b.n+'</b><p>'+b.opt+'</p><p>'+dateLine(b)+'</p><p>'+b.g+'</p></div></div>'+
  '<div class="rf"><span>'+(b.s==3?'환불 금액':'결제 금액')+'</span><strong'+(b.s==3?' class="cx"':'')+'>'+won(b.paid)+'</strong></div></button>';
}
function list(){
 var h='<div class="hd2">예약내역</div><div class="ft">'+[['all','전체'],['up','이용예정'],['done','이용완료'],['cx','취소·환불']].map(function(f){return '<button type="button" data-a="flt" data-i="'+f[0]+'" class="'+(S.f==f[0]?'on':'')+'">'+f[1]+'<i>'+cnt(f[0])+'</i></button>'}).join('')+'</div>';
 var b='',ups=B.filter(function(x){return x.s==1||x.s==4}),n=ups[0];
 if((S.f=='all'||S.f=='up')&&n)b+='<div class="nx"><span class="ni">'+ic('cal',24)+'</span><div><b>가장 가까운 예약</b>'+n.n+' · '+dm(n.a)+'</div><strong>D-'+dday(n.a)+'</strong></div>';
 var rows=B.map(function(x,i){return inF(x,S.f)?card(x,i):''}).join('');
 b+=rows||'<div class="em">'+ic('receipt',24)+'해당하는 예약 내역이 없어요</div>';
 return [h,b];
}
function kv(a){return a.map(function(r){return '<div class="kv"><span>'+r[0]+'</span><span>'+r[1]+'</span></div>'}).join('')}
function sub(t,back){return '<div class="hd"><button class="bk" type="button" data-a="'+(back||'back')+'" aria-label="뒤로">'+ic('back',24)+'</button><h1>'+t+'</h1></div>'}
function det(){
 var b=B[S.sel],T=TY[b.t],s=ST[b.s],d=(b.s==1||b.s==4)?dday(b.a):null;
 var info=[['예약번호',b.id],['예약일',dot(b.bk)],['상품 옵션',b.opt],[b.t=='car'?'운전자':b.t=='flight'?'탑승객':'인원',b.g]];
 if(b.t=='stay')info.push(['숙박 기간',nights(b.a,b.b)+'박']);
 info=info.concat(b.x);
 var pay=[['상품 금액',won(b.lp)]];
 if(b.cp)pay.push(['쿠폰 할인','-'+won(b.cp)]);
 if(b.pt)pay.push(['포인트 사용','-'+num(b.pt)+'P']);
 var h=sub('예약 상세');
 var body='<div class="hero"><img src="'+th(b.sd,b.k)+'" alt=""></div><div class="dt"><div class="top"><span class="ty '+T[2]+'">'+ic(T[1],18)+T[0]+'</span><span class="st '+s[1]+'">'+s[0]+'</span>'+(d!==null&&d>=0?'<span class="dd">D-'+d+'</span>':'')+'</div><h2>'+b.n+'</h2><p class="sub">'+b.sub+'</p><div class="box">'+b.box.map(function(x){return '<div>'+x[0]+'<b>'+x[1]+'</b>'+x[2]+'</div>'}).join('')+'</div></div>'+
  '<div class="blk"><h3>예약 정보</h3>'+kv(info)+'</div>'+
  '<div class="blk"><h3>결제 정보</h3>'+kv(pay)+'<div class="kv tot"><span>'+(b.s==3?'환불 금액':'총 결제 금액')+'</span><span>'+won(b.paid)+'</span></div>'+kv([['결제 수단',b.m],['결제 상태',b.s==3?'전액 환불 ('+dot(b.cx)+')':'결제 완료']])+'</div>'+
  '<div class="ab">'+[[b.t=='stay'||b.t=='car'?'길찾기':'이용 안내','route'],['문의하기','phone'],[b.s==3?'취소 내역':b.s==2?'영수증':'예약 취소',b.s==1||b.s==4?'close':'doc']].map(function(x){return '<button type="button"'+na()+'>'+ic(x[1],24)+x[0]+'</button>'}).join('')+'</div>';
 return [h,body];
}

/* 기타 메뉴: 화면과 버튼만 (동작 없음) */
function my(){
 var h='<div class="hd2">MY 야놀자<span><button class="ib" type="button" aria-label="설정"'+na()+'>'+ic('settings',24)+'</button></span></div>';
 var b='<div class="pf"><span class="av">'+ic('user',24)+'</span><div><b>김하늘님</b><small>야놀자 회원</small></div><button type="button"'+na()+'>내 정보'+ic('chev',16)+'</button></div>';
 b+='<div class="mq"><button type="button"'+na()+'>쿠폰<b>3</b></button><button type="button"'+na()+'>포인트<b>1,500P</b></button><button type="button"'+na()+'>찜<b>9</b></button><button type="button"'+na()+'>리뷰<b>4</b></button></div>';
 b+='<div class="ml">'+[['예약내역','receipt','go','list'],['쿠폰함','coupon'],['포인트','gift'],['결제수단 관리','card'],['리뷰 관리','pencil'],0,['고객센터','headset'],['공지사항','bell'],['이용약관','doc'],['설정','settings']].map(function(m){
  if(!m)return '<button class="gp" type="button" tabindex="-1" aria-hidden="true"></button>';
  return '<button type="button" '+(m[2]?'data-a="go" data-i="'+m[3]+'"':'data-a="na"')+'>'+ic(m[1],24)+m[0]+ic('chev',24)+'</button>'}).join('')+'</div>';
 return [h,b];
}
function near(){
 var h='<div class="hd2">내 주변</div><div class="fch">'+[['숙소','hotel',1],['레저·티켓','ticket'],['맛집','pin'],['교통','car']].map(function(c){return '<button type="button" class="'+(c[2]?'on':'')+'"'+na()+'>'+ic(c[1],18)+c[0]+'</button>'}).join('')+'</div>';
 var pins=[[70,70,'#f7347a'],[150,120,'#f7347a'],[230,60,'#2d6bff'],[290,140,'#f7347a'],[110,170,'#2d6bff']].map(function(p){return '<g transform="translate('+p[0]+' '+p[1]+')"><path d="M0 0c-7-9-11-13-11-19a11 11 0 0 1 22 0c0 6-4 10-11 19z" fill="'+p[2]+'"/><circle cx="0" cy="-19" r="4.200" fill="#fff"/></g>'}).join('');
 var map='<div class="mp"'+na()+'><svg viewBox="0 0 370 230" aria-hidden="true"><rect width="370" height="230" fill="#eef3f8"/><path d="M0 150Q60 130 100 170T200 200T370 190V230H0Z" fill="#cfe3ff"/><rect x="236" y="14" width="96" height="62" rx="12" fill="#dcefd8"/><rect x="20" y="22" width="70" height="46" rx="10" fill="#dcefd8"/><path d="M0 100H370M0 40H370M120 0V230M250 0V230M60 0V150" stroke="#fff" stroke-width="10"/><path d="M0 130L370 70" stroke="#fff" stroke-width="6"/>'+pins+'</svg></div>';
 var b=map+'<div class="sec" style="padding-top:22px"><div class="sh"><div><h2>가까운 숙소</h2></div></div>'+[L[0],L[3],L[7]].map(function(x,i){return stayRow(x).replace('<div class="rg">','<div class="rg"><span class="dst">'+[350,720,1200][i]+'m</span> · ')}).join('')+'</div>';
 return [h,b];
}
function wish(){
 var h='<div class="hd2">찜</div>';
 var b='<div class="em"><svg width="96" height="96" viewBox="0 0 96 96" aria-hidden="true"><circle cx="48" cy="48" r="44" fill="#fff0f5"/><path d="M48 70s-20-12-20-27a11 11 0 0 1 20-6 11 11 0 0 1 20 6c0 15-20 27-20 27z" fill="none" stroke="#f7347a" stroke-width="4.500" stroke-linecap="round" stroke-linejoin="round"/></svg>아직 찜한 상품이 없어요<span class="eb"'+na()+'>인기 숙소 둘러보기</span></div>';
 return [h,b];
}
var VIEWS={home:home,list:list,det:det,my:my,near:near,wish:wish};

function tabbar(){
 var t={det:'list'}[S.v]||S.v;
 tb.innerHTML=[['home','홈','home'],['near','내 주변','pin'],['wish','찜','heart'],['list','예약내역','receipt'],['my','MY','user']].map(function(x){
  return '<button type="button" data-a="go" data-i="'+x[0]+'" class="'+(t==x[0]?'on':'')+'">'+ic(x[2],24)+x[1]+'</button>'}).join('');
}
function render(keep){
 var v=VIEWS[S.v]();hd.innerHTML=v[0];root.innerHTML=v[1];
 if(!keep)root.scrollTop=0;
 tabbar();
}
var tm;
function toast(){tt.textContent='준비 중인 기능이에요';tt.classList.add('on');clearTimeout(tm);tm=setTimeout(function(){tt.classList.remove('on')},1500)}

document.addEventListener('click',function(e){
 var t=e.target.closest('[data-a]');if(!t)return;
 var a=t.dataset.a,i=t.dataset.i;
 if(a=='go'){S.v=i;render()}
 else if(a=='det'){S.sel=+i;S.v='det';render()}
 else if(a=='back'){S.v='list';render()}
 else if(a=='flt'){S.f=i;render()}
 else if(a=='chip'){S.reg=i;document.getElementById('chips').innerHTML=chips();document.getElementById('stays').innerHTML=stays()}
 else if(a=='na'){toast()}
});

/* 프로모션 배너: 스크롤 위치에 맞춰 페이지 표시, 일정 간격으로 자동 넘김 */
document.addEventListener('scroll',function(e){
 var t=e.target;
 if(t.classList&&t.classList.contains('bs')){var c=document.getElementById('cnt');if(c)c.textContent=(Math.round(t.scrollLeft/t.clientWidth)+1)+' / '+t.children.length}
},true);
setInterval(function(){
 var bs=document.querySelector('.bs');if(!bs||S.v!='home')return;
 var i=(Math.round(bs.scrollLeft/bs.clientWidth)+1)%bs.children.length;
 bs.scrollTo({left:i*bs.clientWidth,behavior:'smooth'});
},4500);

render();
})();

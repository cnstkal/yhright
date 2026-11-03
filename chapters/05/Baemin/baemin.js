const $=s=>document.querySelector(s);
const K='yh05_baemin_v1';
const IC={search:'<circle cx="11" cy="11" r="7"/><path d="M16 16l5 5"/>',heart:'<path d="M12 21s-8-5-8-11a4.5 4.5 0 0 1 8-2.5A4.5 4.5 0 0 1 20 10c0 6-8 11-8 11z"/>',home:'<path d="M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/>',list:'<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h4"/>',me:'<circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/>',bell:'<path d="M6 17v-6a6 6 0 0 1 12 0v6l2 2H4z"/><path d="M10 21h4"/>',cart:'<path d="M3 4h3l2.5 11h9L20 7H7"/><circle cx="10" cy="19" r="1.3"/><circle cx="17" cy="19" r="1.3"/>',back:'<path d="M15 4l-8 8 8 8"/>',down:'<path d="M6 9l6 6 6-6"/>',pin:'<path d="M12 21s7-6 7-12a7 7 0 0 0-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>'};
const ic=n=>`<svg viewBox="0 0 24 24">${IC[n]}</svg>`;
const CATS=[['한식','🍚','#ffe9d6'],['중식','🥟','#ffe0e0'],['일식','🍣','#e3f1ff'],['치킨','🍗','#fff1c9'],['피자','🍕','#ffe4cf'],['분식','🍢','#ffdfe5'],['족발·보쌈','🥩','#f1e3d8'],['돈까스·회','🍤','#fdecc8'],['패스트푸드','🍔','#ffeccf'],['카페·디저트','🍰','#fbe3f1'],['야식','🌙','#e6e4fb'],['아시안','🍜','#dff5e6'],['찜·탕','🍲','#ffe2d2'],['도시락','🍱','#e4f2d8']];
const HUE={한식:'#ffd9b0,#ffb27a',중식:'#ffc9c0,#f78b7e',일식:'#cfe6ff,#8cbcf0',치킨:'#ffe29a,#ffb84d',피자:'#ffd0a8,#f58a5c',분식:'#ffc7d3,#f58aa5',['족발·보쌈']:'#e6cdb8,#bb8a68',['돈까스·회']:'#fbe3a8,#e8b04a',패스트푸드:'#ffddb0,#f0a24e',['카페·디저트']:'#f9d3ea,#e697c8',야식:'#d3cff7,#9a92e6',아시안:'#c9efd5,#79cf98',['찜·탕']:'#ffd0bf,#ef8d6b',도시락:'#d5ebbf,#9fcf76',장보기:'#cdeff0,#7fd0d3'};
// [id,이름,분류,대표이모지,별점,리뷰,최소주문,배달팁,분,할인,방식,포장,[[메뉴분류,[[이름,가격,이모지,설명]]]]]
const ST=[
[1,'바삭하우스 치킨 강남점','치킨','🍗',4.8,2314,15000,2900,'35~45',['첫 주문 3,000원 할인'],'배민배달',0,[['대표메뉴',[['후라이드치킨',19000,'🍗','겉바속촉 국내산 생닭'],['양념치킨',20000,'🍖','달콤매콤 수제 양념'],['반반치킨',20500,'🍗','후라이드+양념']]],['사이드',[['치즈볼 5알',5000,'🧀','쭉 늘어나는 모짜렐라'],['치킨무 추가',500,'🥒','']]],['음료',[['콜라 1.25L',2500,'🥤','']]]]],
[2,'굽네 오븐구이 치킨 서초점','치킨','🔥',4.7,1180,16000,3000,'40~50',['포장 시 2,000원 할인'],'가게배달',1,[['대표메뉴',[['고추바사삭',19900,'🍗','매콤한 고추 풍미'],['볼케이노',20900,'🌋','화끈한 매운맛'],['오리지널',18900,'🍖','오븐에 구운 담백함']]],['사이드',[['닭다리 3개',6900,'🍗',''],['갈릭 디핑소스',1000,'🧄','']]]]],
[3,'맘스터치 역삼점','패스트푸드','🍔',4.6,3205,8000,1900,'25~35',['무료배달'],'배민배달',1,[['버거',[['싸이버거',3900,'🍔','바삭한 통닭다리살'],['불싸이버거',4400,'🌶️','매콤한 소스'],['화이트갈릭버거',4900,'🧄','갈릭소스 듬뿍']]],['세트',[['싸이버거 세트',6900,'🍟','버거+감자+콜라']]],['사이드',[['치즈스틱 2개',2500,'🧀','']]]]],
[4,'버거킹 선릉역점','패스트푸드','🍔',4.5,2770,12000,2500,'30~40',['와퍼 세트 1,500원 할인'],'배민배달',1,[['버거',[['와퍼',7300,'🍔','불맛 직화 패티'],['치즈와퍼',7900,'🧀','치즈 한 장 추가'],['콰트로치즈와퍼',9200,'🧀','치즈 4종']]],['사이드',[['프렌치프라이',2900,'🍟',''],['어니언링',3200,'🧅','']]]]],
[5,'엽기떡볶이 논현점','분식','🌶️',4.7,4120,14000,3500,'35~45',['쿠폰 2,000원'],'가게배달',0,[['떡볶이',[['오리지널 떡볶이',14500,'🌶️','매운맛 선택 가능'],['로제 떡볶이',16000,'🍝','부드러운 로제'],['치즈 추가',2000,'🧀','']]],['사이드',[['오뎅튀김 세트',5500,'🍢',''],['주먹밥',3000,'🍙','']]]]],
[6,'아딸 신논현점','분식','🍢',4.4,860,9000,2000,'25~35',['포장 1,000원 할인'],'배민배달',1,[['분식',[['순쌀 떡볶이',4500,'🍢','쫀득한 쌀떡'],['김말이 5개',3500,'🍘','바삭 튀김'],['참치김밥',3500,'🍙','']]]]],
[7,'라화쿵푸 마라탕 역삼점','중식','🍜',4.7,1650,13000,3000,'35~45',['리뷰 이벤트 음료 증정'],'배민배달',0,[['마라탕',[['마라탕 1인',11900,'🍜','재료 고르기 가능'],['마라샹궈',17900,'🥘','볶음 마라'],['꿔바로우',13000,'🍖','바삭 찹쌀 탕수']]],['사이드',[['꿔바로우 소',9500,'🥠',''],['중국당면 추가',2000,'🍜','']]]]],
[8,'홍콩반점0410 강남점','중식','🥟',4.3,1432,12000,2500,'30~40',['2,000원 즉시할인'],'가게배달',1,[['면요리',[['짜장면',7000,'🍜','춘장의 고소함'],['짬뽕',8500,'🌶️','얼큰한 해물'],['짬짜면',10000,'🍜','']]],['식사',[['탕수육 중',17000,'🍖','부먹/찍먹'],['볶음밥',8000,'🍚','']]]]],
[9,'김치찌개 전문 백년집','한식','🍲',4.8,980,12000,2900,'30~40',['3인분 이상 무료배달'],'배민배달',1,[['찌개',[['돼지김치찌개',9000,'🍲','묵은지와 목살'],['참치김치찌개',9000,'🐟',''],['부대찌개',10000,'🍲','푸짐한 사리']]],['추가',[['공기밥',1000,'🍚',''],['라면사리',1500,'🍜','']]]]],
[10,'정식당 한식 도시락','도시락','🍱',4.6,640,9000,2000,'25~35',['첫 주문 2,000원'],'배민배달',1,[['도시락',[['불고기 도시락',7500,'🍱','밥+반찬 5종'],['제육 도시락',7000,'🍱','매콤 제육'],['치킨마요 덮밥',6500,'🍚','']]]]],
[11,'스시로 초밥 역삼점','일식','🍣',4.8,1890,18000,3500,'40~50',['3,000원 할인'],'배민배달',1,[['초밥',[['모둠초밥 12p',17900,'🍣','신선한 재료'],['연어초밥 10p',16900,'🐟','노르웨이 연어'],['특초밥 16p',24900,'🍣','']]],['사이드',[['우동',5500,'🍜',''],['미소국',1500,'🥣','']]]]],
[12,'돈까스 클럽 선릉','돈까스·회','🍤',4.6,1250,12000,2500,'30~40',['돈까스+우동 세트 할인'],'가게배달',1,[['돈까스',[['등심돈까스',10500,'🍤','두툼한 국산 등심'],['치즈돈까스',11500,'🧀','치즈 가득'],['안심돈까스',11000,'🍤','']]],['사이드',[['미니우동',3500,'🍜','']]]]],
[13,'파스타 오븐 강남','한식','🍝',4.5,720,15000,3000,'35~45',['음료 증정'],'가게배달',0,[['파스타',[['까르보나라',12900,'🍝','크림 소스'],['토마토 파스타',11900,'🍅',''],['알리오올리오',11500,'🧄','']]],['피자',[['페퍼로니 피자',15900,'🍕','']]]]],
[14,'도미노피자 선릉점','피자','🍕',4.6,2980,18000,0,'35~45',['포장 시 40% 할인'],'배민배달',1,[['피자',[['포테이토 피자 L',27900,'🍕','고구마+감자'],['콤비네이션 L',26900,'🍕',''],['슈퍼슈프림 L',29900,'🍕','']]],['사이드',[['치즈오븐 스파게티',7900,'🍝',''],['콜라 1.25L',2500,'🥤','']]]]],
[15,'설빙 강남역점','카페·디저트','🍧',4.7,1100,10000,2500,'30~40',['2,000원 할인'],'배민배달',1,[['빙수',[['인절미 설빙',9900,'🍧','고소한 콩가루'],['딸기 설빙',12900,'🍓','생딸기 듬뿍'],['치즈설빙',10900,'🧀','']]],['음료',[['아메리카노',3500,'☕','']]]]],
[16,'아우어베이커리 크로플','카페·디저트','🥐',4.5,530,9000,2000,'25~35',['첫 주문 1,500원'],'배민배달',1,[['디저트',[['크로플 플레인',4500,'🧇',''],['소금빵',3500,'🥐','겉바속촉'],['마카롱 4개',9000,'🍬','']]]]],
[17,'족발야시장 본점','족발·보쌈','🥩',4.7,1560,22000,3500,'40~50',['야식 시간 1,000원 할인'],'배민배달',1,[['족발',[['족발 중',34000,'🥩','쫄깃한 앞다리'],['보쌈 중',32000,'🥬','수육+김치'],['반반 족발',36000,'🥩','']]],['사이드',[['막국수',7000,'🍜',''],['주먹밥',3000,'🍙','']]]]],
[18,'밤도깨비 야식 닭발','야식','🌙',4.5,890,15000,3000,'40~50',['심야 무료배달'],'가게배달',0,[['야식',[['무뼈닭발',17000,'🍗','매콤 불맛'],['주먹밥 세트',4000,'🍙',''],['계란찜',4500,'🥚','']]]]],
[19,'방콕 쌀국수 포차','아시안','🍜',4.6,780,12000,2900,'30~40',['2,000원 할인'],'배민배달',1,[['쌀국수',[['소고기 쌀국수',10500,'🍜','진한 육수'],['팟타이',11500,'🍤',''],['월남쌈 세트',9000,'🥬','']]]]],
[20,'할매순두부 찜탕','찜·탕','🍲',4.6,610,15000,2500,'35~45',['포장 할인'],'배민배달',1,[['찜·탕',[['갈비찜 2인',29000,'🍖',''],['순두부찌개',9500,'🍲',''],['감자탕 소',24000,'🍲','']]]]],
[21,'B마트 동네장보기','장보기','🧺',4.8,5200,10000,0,'20~30',['1시간 이내 도착'],'배민배달',0,[['신선식품',[['국산 계란 30구',7900,'🥚',''],['제주 감귤 1.5kg',9900,'🍊',''],['대파 1단',2500,'🌿','']]],['간편식',[['햇반 12개',13500,'🍚',''],['신라면 5입',4300,'🍜','']]]]],
[22,'과일가게 청과마루','장보기','🍎',4.7,420,15000,2000,'30~40',['과일 2,000원 할인'],'가게배달',0,[['과일',[['사과 3kg',16900,'🍎',''],['딸기 500g',9900,'🍓',''],['바나나 1손',3900,'🍌','']]]]]
];
const sp=s=>({id:s[0],name:s[1],cat:s[2],em:s[3],rate:s[4],rev:s[5],min:s[6],tip:s[7],eta:s[8],disc:s[9],mode:s[10],pk:s[11],menu:s[12]});
const STORES=ST.map(sp),byId=id=>STORES.find(s=>s.id==id);
const won=n=>n.toLocaleString('ko-KR')+'원';
let S;function load(){try{S=JSON.parse(localStorage.getItem(K))}catch(e){}S=Object.assign({tab:'home',svc:'배민배달',fav:[3,11],cart:{sid:0,items:[]},orders:[],recent:[9,5,15],q:''},S||{})}
function save(){try{localStorage.setItem(K,JSON.stringify(S))}catch(e){}}
const toast=m=>{const e=$('#toast');e.textContent=m;e.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.remove('show'),1500)};
const bg=c=>`background:linear-gradient(135deg,${HUE[c]})`;
const ph=(s,cls='')=>`<div class="ph ${cls}" style="${bg(s.cat)}">${s.em}</div>`;
const cntC=()=>S.cart.items.reduce((a,i)=>a+i.q,0),sumC=()=>S.cart.items.reduce((a,i)=>a+i.q*i.price,0);
function card(s){const f=S.fav.includes(s.id);return`<div class="sc" data-s="${s.id}">${ph(s)}<div class="i"><div class="n"><span>${s.name}</span><button class="hrt ${f?'on':''}" data-h="${s.id}" aria-label="찜">${ic('heart')}</button></div><div class="rt"><b>★ ${s.rate.toFixed(1)}</b><i>(${s.rev.toLocaleString()})</i></div><div class="d">최소주문 ${won(s.min)} · 배달팁 ${s.tip?won(s.tip):'무료'}<br>${s.eta}분 · ${s.mode}</div>${s.disc.map(d=>`<span class="tag">${d}</span>`).join('')}${s.pk?'<span class="tag o">포장 가능</span>':''}</div></div>`}
const list=l=>l.length?l.map(card).join(''):'<div class="empty"><i>🍽️</i>표시할 가게가 없어요.</div>';
function head(){return`<div class="hd"><div class="addr bm" data-a="addr">서울 강남구 테헤란로 152 ${ic('down')}</div><div class="r"><button data-a="bell">${ic('bell')}</button><button class="rel" data-a="cart">${ic('cart')}${cntC()?`<span class="bd">${cntC()}</span>`:''}</button></div></div>`}
function searchBar(){return`<div class="sbar" data-a="gosearch">${ic('search')}<span>찾는 맛집 이름이나 메뉴가 있나요?</span></div>`}
const SVC=[['배민배달','🛵'],['가게배달','🏪'],['포장','🛍️'],['장보기·쇼핑','🧺']];
const svcTabs=()=>`<div class="svc">${SVC.map(s=>`<button data-v="${s[0]}" class="${S.svc===s[0]?'on':''} bm"><i>${s[1]}</i>${s[0]}</button>`).join('')}</div>`;
function svcStores(){const v=S.svc;if(v==='포장')return STORES.filter(s=>s.pk&&s.cat!=='장보기');if(v==='장보기·쇼핑')return STORES.filter(s=>s.cat==='장보기');return STORES.filter(s=>s.mode===v&&s.cat!=='장보기')}
const BAN=[['치킨 시킬 땐<br>3,000원 할인','첫 주문 고객 한정','linear-gradient(120deg,#2ac1bc,#1a9f9a)','🍗'],['점심엔 도시락<br>무료배달','오늘만 이벤트','linear-gradient(120deg,#ff8f5a,#f2635b)','🍱'],['장보기 20분<br>B마트 도착','1만원 이상 무료','linear-gradient(120deg,#6b8cf5,#4f6ad8)','🧺']];
function home(){const l=svcStores();let b='';
 if(S.svc==='장보기·쇼핑')b=`<div class="sg">${[['🥬','신선식품'],['🍱','간편식'],['🧻','생필품'],['🍎','과일·청과']].map(x=>`<div class="t bm"><i>${x[0]}</i>${x[1]}</div>`).join('')}</div><div class="sh"><b class="bm">장보기 가게</b></div>${list(l)}`;
 else{b=`<div class="cats">${CATS.map(c=>`<div class="cat" data-c="${c[0]}"><div class="ci" style="background:${c[1+1]}">${c[1]}</div>${c[0]}</div>`).join('')}</div><div class="hs" style="padding-top:6px">${BAN.map(x=>`<div class="ban" style="background:${x[2]};min-width:86%;margin:0"><div><b class="bm">${x[0]}</b><span>${x[1]}</span></div><em>${x[3]}</em></div>`).join('')}</div>
 <div class="sh"><b class="bm">지금 인기 있는 가게</b><span data-c="전체">전체보기</span></div><div class="hs">${[...l].sort((a,b)=>b.rev-a.rev).slice(0,6).map(s=>`<div class="mini" data-s="${s.id}">${ph(s)}<b>${s.name.split(' ').slice(0,2).join(' ')}</b><small>★ ${s.rate} · ${s.eta}분</small></div>`).join('')}</div>
 <div class="sh"><b class="bm">지금 많이 주문하는 메뉴</b></div><div class="hs">${STORES.filter(s=>s.cat!=='장보기').slice(0,8).map(s=>{const m=s.menu[0][1][0];return`<div class="mini" data-s="${s.id}"><div class="ph" style="${bg(s.cat)};height:98px;border-radius:12px;font-size:44px">${m[2]}</div><b>${m[0]}</b><small>${won(m[1])}</small></div>`}).join('')}</div>
 ${S.recent.length?`<div class="sh"><b class="bm">최근 주문한 가게</b></div><div class="hs">${S.recent.map(byId).map(s=>`<div class="mini" data-s="${s.id}">${ph(s)}<b>${s.name.split(' ')[0]}</b><small>★ ${s.rate}</small></div>`).join('')}</div>`:''}
 <div class="sh"><b class="bm">추천 음식점</b><span>${S.svc} ${l.length}곳</span></div>${list(l)}`}
 return head()+searchBar()+svcTabs()+`<div class="scroll">${b}<div style="height:16px"></div></div>`}
function render(){
 $('#tabs').innerHTML=[['search','검색','search'],['fav','찜','heart'],['home','홈','home'],['order','주문내역','list'],['my','마이배민','me']].map(t=>`<button data-t="${t[0]}" class="${S.tab===t[0]?'on':''}">${ic(t[2])}${t[1]}</button>`).join('');
 let h='';
 if(S.tab==='home')h=home();
 else if(S.tab==='search')h=head()+`<div class="sbar">${ic('search')}<input id="qi" placeholder="찾는 맛집 이름이나 메뉴가 있나요?" value="${S.q}" enterkeyhint="search"></div><div class="scroll" id="sres">${sres()}</div>`;
 else if(S.tab==='fav'){const l=STORES.filter(s=>S.fav.includes(s.id));h=`<div class="top2"><div class="g bm" style="margin:0">찜</div></div><div class="scroll">${l.length?list(l):'<div class="empty"><i>🤍</i>마음에 드는 가게를 찜해보세요.</div>'}</div>`}
 else if(S.tab==='order'){h=`<div class="top2"><div class="g bm" style="margin:0">주문내역</div></div><div class="scroll">${S.orders.length?S.orders.map(o=>`<div class="ord"><span class="st">${o.st}</span><br><b>${byId(o.sid).name}</b><small>${new Date(o.at).toLocaleString('ko-KR')} · ${o.items.map(i=>i.name+' '+i.q+'개').join(', ')}</small><b>${won(o.total)}</b><button class="btn g" style="width:100%;margin:10px 0 0" data-s="${o.sid}">가게 다시 보기</button></div>`).join(''):'<div class="empty"><i>🧾</i>주문내역이 없어요.<br>(실제 결제·배달은 연결되지 않아요)</div>'}</div>`}
 else h=`<div class="top2"><div class="g bm" style="margin:0">마이배민</div></div><div class="scroll"><div style="padding:18px 16px"><div class="bm" style="font-size:20px">배민이 님 <span style="color:var(--s);font-size:13px;font-weight:500">일반 등급</span></div></div><div class="sg"><div class="t"><i>🎟️</i>쿠폰 3장</div><div class="t"><i>💰</i>배민포인트 1,200원</div></div>${['공지사항','고객센터','배달주소 관리','리뷰 관리','설정'].map(x=>`<div class="row" data-a="soon">${x}<span>›</span></div>`).join('')}</div>`;
 $('#screen').innerHTML=h;
}
function sres(){const q=S.q.trim();if(!q)return'<div class="empty"><i>🔎</i>가게 이름이나 메뉴를 검색해보세요.<br>예) 치킨, 마라탕, 초밥</div>';return list(STORES.filter(s=>(s.name+s.cat+s.menu.map(m=>m[1].map(i=>i[0]).join()).join()).includes(q)))}
document.addEventListener('input',e=>{if(e.target.id==='qi'){S.q=e.target.value;$('#sres').innerHTML=sres()}});
const nav=[];let cur=null;
function layer(h){const l=$('#layer');l.className='layer show';l.innerHTML=h}
function pop(){nav.pop();if(nav.length){const v=nav[nav.length-1];show(v,true)}else{$('#layer').className='';$('#layer').innerHTML='';render()}}
function push(v){nav.push(v);show(v)}
function show(v){if(v.t==='cat')catView(v);else if(v.t==='store')storeView(v);else if(v.t==='cart')cartView()}
const bk=(t,r='')=>`<div class="top2"><button data-a="back" aria-label="뒤로">${ic('back')}</button><div class="g bm">${t}</div>${r}</div>`;
function catView(v){const l=STORES.filter(s=>(v.c==='전체'||s.cat===v.c)&&s.cat!=='장보기');const so=v.sort||'추천';const arr=[...l];if(so==='별점')arr.sort((a,b)=>b.rate-a.rate);if(so==='리뷰')arr.sort((a,b)=>b.rev-a.rev);if(so==='배달팁')arr.sort((a,b)=>a.tip-b.tip);
 layer(bk(v.c)+`<div class="chips">${['추천','별점','리뷰','배달팁'].map(x=>`<span class="chip ${so===x?'on':''}" data-so="${x}">${x}순</span>`).join('')}</div><div class="scroll" id="cs">${list(arr)}</div>`)}
function storeView(v,keep){const s=byId(v.id);if(!keep&&!S.recent.includes(s.id)){S.recent=[s.id,...S.recent].slice(0,6);save()}const f=S.fav.includes(s.id),inC=S.cart.sid==s.id?cntC():0,sel=v.mc||0;
 const sc=$('#layer .scroll'),y=keep&&sc?sc.scrollTop:0;
 layer(bk(s.name.split(' ')[0],`<button class="hrt ${f?'on':''}" data-h="${s.id}">${ic('heart')}</button><button class="rel" style="margin:0 8px" data-a="cart">${ic('cart')}${cntC()?`<span class="bd">${cntC()}</span>`:''}</button>`)+`<div class="scroll">${ph(s,'hero')}<div class="sti"><h1 class="bm">${s.name}</h1><div class="rt"><b>★ ${s.rate.toFixed(1)}</b><i>리뷰 ${s.rev.toLocaleString()}개</i></div>${s.disc.map(d=>`<span class="tag">${d}</span>`).join('')}</div><div class="box"><div class="kv"><span>최소주문금액</span><span>${won(s.min)}</span></div><div class="kv"><span>배달팁</span><span>${s.tip?won(s.tip):'무료'}</span></div><div class="kv"><span>배달시간</span><span>${s.eta}분</span></div><div class="kv"><span>배달방식</span><span>${s.mode}</span></div></div><div style="height:14px"></div><div class="mcat">${s.menu.map((m,i)=>`<button data-mc="${i}" class="${sel===i?'on':''} bm">${m[0]}</button>`).join('')}</div>${s.menu.map((m,i)=>i!==sel?'':`<div class="mt bm">${m[0]}</div>${m[1].map((it,j)=>`<div class="mi" data-add="${i}-${j}"><div class="x"><b>${it[0]}</b><p>${it[3]}</p><div class="p">${won(it[1])}</div></div><div class="ph" style="${bg(s.cat)}">${it[2]}</div></div>`).join('')}`).join('')}<div style="height:10px"></div></div><button class="fab bm" data-a="cart" ${inC?'':'disabled'}><span style="display:flex;align-items:center"><span class="b">${inC}</span>장바구니 보기</span><span>${inC?won(sumC()):''}</span></button>`);
 const n=$('#layer .scroll');if(n)n.scrollTop=y}
function cartView(){const s=S.cart.sid?byId(S.cart.sid):null,it=S.cart.items,sum=sumC(),tip=s?s.tip:0,ok=s&&sum>=s.min;
 layer(bk('장바구니')+(it.length?`<div class="scroll"><div class="sti" style="padding-bottom:4px"><b class="bm" style="font-size:18px">${s.name}</b></div>${it.map((x,i)=>`<div class="cr"><div class="x"><b>${x.name}</b><small>${won(x.price*x.q)}</small></div><div class="q"><button data-qm="${i}">−</button><span>${x.q}</span><button data-qp="${i}">+</button></div><button data-qd="${i}" style="color:var(--s);font-size:20px;padding:4px 6px">×</button></div>`).join('')}<button class="btn g" data-a="more">+ 메뉴 더 담기</button></div><div class="sum"><div class="kv"><span>주문금액</span><span>${won(sum)}</span></div><div class="kv"><span>배달팁</span><span>${tip?won(tip):'무료'}</span></div><div class="kv tot"><span>총 결제예정금액</span><span>${won(sum+tip)}</span></div>${ok?'':`<div style="color:#f0475e;font-size:12px;margin-top:6px">최소주문금액 ${won(s.min)}까지 ${won(s.min-sum)} 남았어요.</div>`}</div><button class="fab bm" data-a="order" ${ok?'':'disabled'}><span>배달 주문하기</span><span>${won(sum+tip)}</span></button>`:'<div class="scroll"><div class="empty"><i>🛒</i>장바구니가 비어있어요.<br>메뉴를 담아보세요.</div></div>'))}
function addItem(sid,i,j){const s=byId(sid),it=s.menu[i][1][j];if(S.cart.sid&&S.cart.sid!=sid&&S.cart.items.length){if(!confirm('다른 가게의 메뉴가 담겨 있어요.\n장바구니를 비우고 새로 담을까요?'))return;S.cart={sid:0,items:[]}}S.cart.sid=sid;const f=S.cart.items.find(x=>x.name===it[0]);f?f.q++:S.cart.items.push({name:it[0],price:it[1],q:1});save();toast(it[0]+' 담았어요');storeView(nav[nav.length-1],true)}
document.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.id==='qi')e.target.blur()});
document.addEventListener('click',e=>{const g=s=>e.target.closest(s);let x;const top=()=>nav[nav.length-1];
 if(x=g('[data-h]')){e.stopPropagation();const id=+x.dataset.h;S.fav=S.fav.includes(id)?S.fav.filter(v=>v!==id):[...S.fav,id];save();toast(S.fav.includes(id)?'찜했어요':'찜을 해제했어요');if(nav.length)show(top());else render();return}
 if(x=g('[data-a]')){const a=x.dataset.a;
  if(a==='back')pop();else if(a==='cart')push({t:'cart'});else if(a==='gosearch'){S.tab='search';render()}
  else if(a==='more'){const sid=S.cart.sid;nav.length=0;push({t:'store',id:sid})}
  else if(a==='order'){const s=byId(S.cart.sid),sum=sumC();S.orders.unshift({sid:s.id,at:Date.now(),items:S.cart.items,total:sum+s.tip,st:'주문 접수(체험용)'});S.cart={sid:0,items:[]};S.tab='order';save();nav.length=0;$('#layer').className='';render();toast('주문이 접수되었어요 (결제는 연결되지 않아요)')}
  else toast(a==='addr'?'주소 변경은 준비 중이에요':'준비 중이에요');return}
 if(x=g('[data-so]')){const v=top();v.sort=x.dataset.so;show(v);return}
 if(x=g('[data-mc]')){const v=top();v.mc=+x.dataset.mc;storeView(v,true);return}
 if(x=g('[data-add]')){const[i,j]=x.dataset.add.split('-');addItem(top().id,+i,+j);return}
 if(x=g('[data-qp]')){S.cart.items[+x.dataset.qp].q++;save();cartView();return}
 if(x=g('[data-qm]')){const i=+x.dataset.qm;S.cart.items[i].q>1?S.cart.items[i].q--:S.cart.items.splice(i,1);if(!S.cart.items.length)S.cart.sid=0;save();cartView();return}
 if(x=g('[data-qd]')){S.cart.items.splice(+x.dataset.qd,1);if(!S.cart.items.length)S.cart.sid=0;save();cartView();return}
 if(x=g('[data-s]')){push({t:'store',id:+x.dataset.s});return}
 if(x=g('[data-c]')){push({t:'cat',c:x.dataset.c});return}
 if(x=g('[data-v]')){S.svc=x.dataset.v;save();render();return}
 if(x=g('[data-t]')){S.tab=x.dataset.t;save();render();return}
});
load();render();

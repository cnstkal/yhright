const $=s=>document.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const AV=(n,c)=>'data:image/svg+xml,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="${c}"/><text x="50" y="68" font-size="50" text-anchor="middle" fill="#fff" font-family="sans-serif">${n[0]}</text></svg>`);
const IMG=(a,b,t)=>'data:image/svg+xml,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="400" height="500" fill="url(#g)"/><text x="200" y="260" font-size="40" text-anchor="middle" fill="#fff" font-family="sans-serif">${t}</text></svg>`);
const P=(d,f)=>`<svg viewBox="0 0 24 24" fill="${f||'none'}" stroke="${f?'none':'currentColor'}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
const I={
reply:P('<path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 20.5l1.7-5.2A8.4 8.4 0 1 1 21 11.5z"/>'),
rt:P('<path d="M17 2l4 4-4 4M3 11V9a3 3 0 0 1 3-3h15M7 22l-4-4 4-4M21 13v2a3 3 0 0 1-3 3H3"/>'),
like:P('<path d="M12 20.5S3 15 3 8.8A4.8 4.8 0 0 1 12 6.5a4.8 4.8 0 0 1 9 2.3c0 6.2-9 11.7-9 11.7z"/>'),
likeF:P('<path d="M12 21S2 15 2 8.5A5 5 0 0 1 12 6a5 5 0 0 1 10 2.500C22 15 12 21 12 21z"/>','currentColor'),
views:P('<path d="M5 21V12M11 21V4M17 21V9M22 21V14M2 21h0"/>'),
mark:P('<path d="M5 3h14v18l-7-5-7 5z"/>'),markF:P('<path d="M5 3h14v18l-7-5-7 5z"/>','currentColor'),
share:P('<path d="M12 16V3M7 8l5-5 5 5M4 14v6h16v-6"/>'),
lock:P('<rect x="5" y="10" width="14" height="11" rx="3" fill="currentColor"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>'),
chk:'<svg width="18" height="18" viewBox="0 0 24 24"><path fill="#1d9bf0" d="M22 12l-2.4 2.4.3 3.4-3.3.8-1.7 2.9-3-1.4L9 21.5l-1.7-2.9-3.3-.8.3-3.4L2 12l2.3-2.4-.3-3.4 3.3-.8L9 2.5l3 1.4 3-1.4 1.7 2.9 3.3.8-.3 3.400z"/><path d="M8 12l3 3 5-6" stroke="#fff" stroke-width="2" fill="none"/></svg>',
back:P('<path d="M19 12H5M12 19l-7-7 7-7"/>'),
search:P('<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.500-4.500"/>'),
plus:P('<path d="M12 5v14M5 12h14"/>'),
more:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>',
home:P('<path d="M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>'),homeF:P('<path d="M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>','currentColor'),
grok:P('<circle cx="12" cy="12" r="9"/><path d="M5 20L19 4"/>'),
bell:P('<path d="M6 17V11a6 6 0 0 1 12 0v6l2 2H4zM10 21h4"/>'),bellF:P('<path d="M6 17V11a6 6 0 0 1 12 0v6l2 2H4zM10 21h4"/>','currentColor'),
msg:P('<path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 20.5l1.7-5.2A8.4 8.4 0 1 1 21 11.5z"/>'),
x:'<svg class="x" viewBox="0 0 24 24"><path d="M18.200 2.300h3.300l-7.200 8.300 8.500 11.200h-6.700l-5.200-6.800-6 6.800H1.600l7.700-8.800L1.200 2.300h6.800l4.700 6.200zm-1.200 17.500h1.800L7 4.200H5.100z"/></svg>',
cal:P('<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4M16 3v4"/>'),
job:P('<rect x="3" y="7" width="18" height="13" rx="3"/><path d="M9 7V5h6v2"/>'),
post:P('<rect x="3" y="3" width="18" height="18" rx="4"/><path d="M8 9h8M8 14h5"/>'),
media:P('<rect x="4" y="7" width="16" height="13" rx="3"/><path d="M10 11l5 3-5 3z"/>')};
const dropMyPosts=d=>{const mine=new Set(d.posts.filter(p=>p.uid==='u0').map(p=>p.id));d.posts=d.posts.filter(p=>p.uid!=='u0'&&!mine.has(p.parent));return d};
const seed=()=>dropMyPosts({me:'u0',nid:100,notifs:[],unread:0,users:[{id:'u_yuyu',name:'yuyu',handle:'shs2yuyuistruelove',av:AV('y','#b8a0d9'),banner:'',verified:false,locked:false,job:'',bday:'',joined:'2026년 1월',bio:'성화님만 바라보는 yuyu💕',link:'',fing:1,fers:274,f:0},{id:'u_ho',name:'ho',handle:'ho_ding',av:AV('h','#c8b6e2'),banner:'',verified:false,locked:false,job:'',bday:'',joined:'2025년 1월',bio:'',link:'',fing:56,fers:340,f:0},{id:'u_miao',name:'먀오',handle:'miao_mm',av:encodeURI('../이미지/X/프로필/먀오/4fecd7fd9bf771c8fdeda7d5f825d73d.jpg'),banner:'',verified:false,locked:false,job:'',bday:'',joined:'2024년 3월',bio:'',link:'',fing:128,fers:2310,f:0},{id:'u_podung',name:'포둥이 (상태:행복함)',handle:'podung_happy',av:AV('포','#9fd3b4'),banner:'',verified:false,locked:false,job:'',bday:'',joined:'2022년 8월',bio:'',link:'',fing:410,fers:5870,f:0},{id:'u_ming',name:'친절한 밍이',handle:'kind_ming',av:encodeURI('../이미지/X/프로필/친절한 밍이/e7c4bd1ae2f80150727e9673f9e78695.jpg'),banner:'',verified:false,locked:false,job:'',bday:'',joined:'2023년 5월',bio:'',link:'',fing:212,fers:3180,f:0},{id:'u_finger',name:'네번째 손가락',handle:'fourth_finger',av:encodeURI('../이미지/X/프로필/네번째 손가락/128e45413fc7eb8de6f3f59ba208984f.jpg'),banner:'',verified:false,locked:false,job:'',bday:'',joined:'2021년 11월',bio:'',link:'',fing:88,fers:640,f:0},{id:'u0',name:'.',handle:'aisddnqwu43',av:AV('박','#e3a7c2'),banner:'',verified:false,locked:true,job:'',bday:'',joined:'2019년 2월',bio:'',link:'',fing:493,fers:0,f:0}],posts:[{id:'pyuyu1',uid:'u_yuyu',t:'방금',text:'사랑해요 성화님💕',img:'',likes:1,rt:0,views:30,rc:0},{id:'pyuyu2',uid:'u_yuyu',t:'10분',text:'오늘도 성화님 생각만 했어요. 제 하루는 전부 성화님으로 채워져 있어요.',img:'',likes:8,rt:1,views:67,rc:1},{id:'pyuyu3',uid:'u_yuyu',t:'32분',text:'성화님이 웃으면 저도 괜히 따라 웃게 돼요. 그 웃음 제가 매일 지켜볼게요.',img:'',likes:15,rt:2,views:104,rc:2},{id:'pyuyu4',uid:'u_yuyu',t:'1시간',text:'성화님, 오늘 밥은 드셨어요? 안 드셨으면 제가 지금 당장 달려갈 텐데…',img:'',likes:22,rt:0,views:141,rc:3},{id:'pyuyu5',uid:'u_yuyu',t:'2시간',text:'제 마음은 전부 성화님 거예요. 가져가세요, 돌려주셔도 괜찮아요💕',img:'',likes:6,rt:1,views:178,rc:0},{id:'pyuyu6',uid:'u_yuyu',t:'3시간',text:'성화님 목소리가 듣고 싶어서 자꾸 알림만 쳐다봐요. 답장 기다리는 중이에요.',img:'',likes:13,rt:2,views:215,rc:1},{id:'pyuyu7',uid:'u_yuyu',t:'5시간',text:'세상에서 제일 소중한 사람은 성화님이에요. 이건 아무도 못 바꿔요.',img:'',likes:20,rt:0,views:252,rc:2},{id:'pyuyu8',uid:'u_yuyu',t:'어제',text:'성화님이 제 이름 불러주는 순간이 제일 행복해요. 다음에도 꼭 불러주세요!',img:'',likes:4,rt:1,views:289,rc:3},{id:'pyuyu9',uid:'u_yuyu',t:'어제',text:'잠들기 전에도 성화님 생각하면서 눈 감아요. 꿈에서라도 만나요, 성화님💕',img:'',likes:11,rt:2,views:326,rc:0},{id:'pyuyu10',uid:'u_yuyu',t:'2일 전',text:'성화님 곁에 있으면 시간이 빨리 가요. 조금만 더 머물러 주시면 안 될까요?',img:'',likes:18,rt:0,views:363,rc:1},{id:'pyuyu11',uid:'u_yuyu',t:'3일 전',text:'사랑은 원래 이렇게 자꾸 생각나는 거래요. 저는 성화님한테 계속 그래요.',img:'',likes:2,rt:1,views:400,rc:2},{id:'pyuyu12',uid:'u_yuyu',t:'4일 전',text:'성화님, 사랑해요. 오늘이 아니어도 매일 말할 거예요. 몇 번이고요.',img:'',likes:9,rt:2,views:37,rc:3},{id:'pyuyu13',uid:'u_yuyu',t:'5일 전',text:'성화님이 힘든 날엔 제가 옆에서 조용히 있을게요. 그냥 기대기만 하세요.',img:'',likes:16,rt:0,views:74,rc:0},{id:'pyuyu14',uid:'u_yuyu',t:'1주 전',text:'처음 만난 날부터 지금까지 제 마음은 한 번도 흔들린 적 없어요. 진심이에요.',img:'',likes:23,rt:1,views:111,rc:1},{id:'pyuyu15',uid:'u_yuyu',t:'2주 전',text:'성화님을 위해서라면 뭐든지 할 수 있어요. 말만 해 주세요, 바로 달려갈게요💕',img:'',likes:7,rt:2,views:148,rc:2},{id:'pt3',uid:'u_ho',t:'3시간',text:'코 띵동',img:encodeURI('../이미지/X/포스트/ho/31169e7f8d01b5592290c46b8e609501.jpg'),likes:104,rt:36,views:592},{id:'pm1',uid:'u_miao',t:'2시간',text:'성화 요즘 피곤해보여 ㅠㅠ 괜찮겠지… 아푸지말고 밥 많이 먹어라',img:'',likes:24,rt:3,views:312},{id:'pm2',uid:'u_podung',t:'5시간',text:'이번 팝업 동행하실 분 있나요?? 저는 7일 1회차예요!',img:'',likes:4,rt:0,views:123,rc:3},{id:'pk1',uid:'u_ming',t:'1시간',text:'홍중이 머리 바꿧네 좋다...',img:encodeURI('../이미지/X/포스트/친절한 밍이/bbfe9478ccb3155ee2c2edfcd19562d9.jpg'),likes:301,rt:158,views:1450},{id:'pk2',uid:'u_finger',t:'4시간',text:'아니 분명 한 장만 사려고 햇는데 특전 비교하다가 장바구니 8만원 됨',img:'',likes:23,rt:1,views:402,rc:5}]});
let S;try{S=JSON.parse(localStorage.getItem('xsim11'))}catch(e){}
if(!S||!S.users)S=seed();
const save=()=>{try{localStorage.setItem('xsim11',JSON.stringify(S))}catch(e){toast('저장 실패(용량 초과)')}};
const U=id=>S.users.find(u=>u.id===id)||{name:'(삭제됨)',handle:'deleted',av:AV('?','#999')};
const PO=id=>S.posts.find(p=>p.id===id);
const kids=id=>S.posts.filter(p=>p.parent===id);
/* 상세 화면 시간·조회수 표시: "오후 12:14 • 2026.10.25 • 조회 1.6만회" */
const viewsKo=n=>n>=1e4?(n/1e4).toFixed(1)+'만':Number(n||0).toLocaleString('ko-KR');
function detailTime(t){const m=String(t||'').match(/^(\d+)\s*(분|시간|일)/);let d=new Date();if(m){const n=+m[1],ms=m[2]==='분'?6e4:m[2]==='시간'?36e5:864e5;d=new Date(Date.now()-n*ms)}
const h=d.getHours(),mm=String(d.getMinutes()).padStart(2,'0');return `${h<12?'오전':'오후'} ${h%12||12}:${mm} • ${d.getFullYear()}.${String(d.getMonth()+1).padStart(2,'0')}.${String(d.getDate()).padStart(2,'0')}`}
const fmt=n=>n>=1e4?(n/1e3).toFixed(0)+'K':n>=1e3?(n/1e3).toFixed(1)+'K':n;
let R={n:'home',tab:'rec'},stack=[],tmp='',q='';
const toast=m=>{const t=$('#toast');t.textContent=m;t.style.display='block';clearTimeout(toast.h);toast.h=setTimeout(()=>t.style.display='none',1800)};
const go=r=>{stack.push(R);R=r;draw(1)};
const back=()=>{R=stack.pop()||{n:'home',tab:'rec'};draw(1)};
const tab=n=>{stack=[];R={n,tab:'rec',ptab:'posts'};if(n==='notif'){S.unread=0;save()}draw(1)};
function head(u){return `<span class="nm"><b>${esc(u.name)}</b>${u.locked?I.lock.replace('<svg','<svg width="16" height="16"'):''}${u.verified?I.chk:''}<span>@${esc(u.handle)}</span></span>`}
const link=t=>esc(t).replace(/(\b[\w-]+\.(?:com|net|kr|io)\/[^\s]*)/g,'<span class="lnk">$1</span>');
function post(p,o={}){const u=U(p.uid),k=kids(p.id).length||p.rc||0;
return `<div class="post ${o.nb?'nb':''}" data-a="open" data-id="${p.id}"><div class="l"><img class="av" src="${esc(u.av)}" data-a="prof" data-id="${p.uid}">${o.ln?'<div class="ln"></div>':''}</div><div class="r"><div class="nm"><b>${esc(u.name)}</b>${u.locked?I.lock.replace('<svg','<svg width="16" height="16"'):''}${u.verified?I.chk:''}<span>@${esc(u.handle)} · ${esc(p.t)}</span><button class="mo" data-a="pm" data-id="${p.id}">${I.more}</button></div>${p.text?`<div class="tx">${link(p.text)}</div>`:''}${p.img?`<img class="im" src="${esc(p.img)}">`:''}${acts(p,k)}</div></div>`}
function acts(p,k){return `<div class="ac"><button data-a="open" data-id="${p.id}">${I.reply}${k||''}</button><button class="rt ${p.rted?'on':''}" data-a="rt" data-id="${p.id}">${I.rt}${p.rt||''}</button><button class="lk ${p.liked?'on':''}" data-a="lk" data-id="${p.id}">${p.liked?I.likeF:I.like}${p.likes||''}</button><button class="it">${I.views}${p.views||''}</button><button class="bm ${p.marked?'on':''}" data-a="bm" data-id="${p.id}">${p.marked?I.markF:I.mark}</button><button data-a="sh" data-id="${p.id}">${I.share}</button></div>`}
const tops=()=>S.posts.filter(p=>!p.parent);
function draw(reset){const v=$('#view'),y=v.scrollTop;let T='',H='',fab=1;
if(R.n==='home'){const m=S.users.find(u=>u.id===S.me)||S.users[0]||{av:''};
T=`<div class="hd"><img class="av" src="${esc(m.av)}" data-a="prof" data-id="${m.id}"><button data-a="menu">${I.x}</button><span style="width:32px"></span></div><div class="tabs"><button class="${R.tab==='rec'?'on':''}" data-a="ht" data-id="rec">추천</button><button class="${R.tab==='fol'?'on':''}" data-a="ht" data-id="fol">팔로우 중</button></div>`;
let l=tops().filter(p=>R.tab==='rec'||U(p.uid).f||p.uid===S.me).filter(p=>p.uid!=='u_yuyu'||p.id==='pyuyu1'||U(p.uid).f);H=l.length?l.map(p=>post(p)).join(''):'<div class="ph"><b>게시물이 없습니다</b>+ 버튼으로 작성해보세요</div>';}
else if(R.n==='detail'){const p=PO(R.id);if(!p){back();return}const u=U(p.uid),rs=kids(p.id);fab=0;
T=`<div class="hd"><button data-a="back">${I.back.replace('<svg','<svg width="24" height="24"')}</button><span style="flex:1"></span></div>`;
H=`<div style="padding:8px 16px"><div class="row" style="gap:12px;align-items:center"><img class="av" style="width:48px;height:48px;flex:none;border-radius:50%" src="${esc(u.av)}" data-a="prof" data-id="${p.uid}"><div style="flex:1;line-height:22px;min-width:0"><div class="nm" style="font-size:17px"><b style="max-width:none">${esc(u.name)}</b>${u.locked?I.lock.replace('<svg','<svg width="16" height="16"'):''}${u.verified?I.chk:''}</div><span style="color:#536471;font-size:15px">@${esc(u.handle)}</span></div><button data-a="pm" data-id="${p.id}" style="flex:none;color:#536471">${I.more}</button></div>
<div style="font-size:21px;line-height:1.5;margin:14px 0 12px;white-space:pre-wrap;word-break:break-word">${link(p.text)}</div>${p.img?`<img class="im" src="${esc(p.img)}">`:''}
<div style="color:#536471;font-size:15px;padding:12px 0;border-bottom:1px solid #eff3f4">${detailTime(p.t)} • 조회 <b style="color:#0f1419">${viewsKo(p.views)}회</b></div>
${acts(p,rs.length)}</div>
`+rs.map(r=>post(r)).join('');}
else if(R.n==='profile'){const u=U(R.uid),me=u.id===S.me;fab=1;const ps=R.ptab||'posts',a=S.posts.filter(p=>p.uid===u.id);
let l=ps==='posts'?a.filter(p=>!p.parent):ps==='replies'?a.filter(p=>p.parent):ps==='rts'?S.posts.filter(p=>p.rted):a.filter(p=>p.img);
H=`<div class="pf"><div class="bn" style="${u.banner?`background-image:url('${esc(u.banner)}')`:''}"><button class="ic" style="left:14px" data-a="back">${I.back.replace('<svg','<svg width="22" height="22" style="color:#fff"')}</button><button class="ic" style="right:14px" data-a="tab" data-id="search">${I.search.replace('<svg','<svg width="22" height="22" style="color:#fff"')}</button></div>
<div class="pa"><img class="av" src="${esc(u.av)}"></div><div class="bx"><h2>${esc(u.name)}${u.locked?I.lock.replace('<svg','<svg width="22" height="22"'):''}${u.verified?I.chk:'<span class="vb">'+I.chk+'인증받기</span>'}</h2><div class="gr" style="font-size:16px">@${esc(u.handle)}</div>
${u.bio?`<div style="margin:8px 0;white-space:pre-wrap">${esc(u.bio)}</div>`:''}<div class="gr" style="margin-top:12px">${u.job?`<span>${I.job}${esc(u.job)}</span>`:''}${u.bday?`<span>${I.cal}생일: ${esc(u.bday)}</span>`:''}${u.link?`<span class="lnk">${esc(u.link)}</span>`:''}${u.joined?`<span>${I.cal}${esc(u.joined)}에 가입함</span>`:''}</div>
<div style="margin:12px 0;font-size:15px;color:#536471"><b style="color:#0f1419">${u.fing}</b> 팔로잉 &nbsp; <b style="color:#0f1419">${fmt(u.fers)}</b> 팔로워</div></div>
<div class="btns"><button class="btn" data-a="shp" data-id="${u.id}">프로필 공유</button>${me?`<button class="btn" data-a="ep" data-id="${u.id}">프로필 수정</button>`:`<button class="btn ${u.f?'':'pr'}" data-a="fol" data-id="${u.id}">${u.f?'팔로잉':'팔로우'}</button>`}</div>
<div class="ptabs">${[['posts',I.post],['replies',I.reply],['rts',I.rt],['media',I.media]].map(t=>`<button class="${ps===t[0]?'on':''}" data-a="pt" data-id="${t[0]}">${t[1]}</button>`).join('')}</div></div>`+(l.length?l.map(p=>post(p)).join(''):'<div class="ph"><b>표시할 항목이 없습니다</b></div>');}
else if(R.n==='search'){const k=q.toLowerCase();T=`<div class="hd"><b style="font-size:20px">검색</b></div><input id="sq" class="sb" placeholder="검색" value="${esc(q)}">`;
const us=k?S.users.filter(u=>(u.name+u.handle).toLowerCase().includes(k)):[],ps=k?S.posts.filter(p=>p.text.toLowerCase().includes(k)):[];
H=k?(us.map(u=>`<div class="dm" data-a="prof" data-id="${u.id}"><img class="av" src="${esc(u.av)}"><div>${head(u)}</div></div>`).join('')+ps.map(p=>post(p)).join('')||'<div class="ph"><b>결과 없음</b></div>'):'<div class="ph">계정, 게시물을 검색해보세요</div>';}
else if(R.n==='notif'){T=`<div class="hd"><b style="font-size:20px">알림</b></div>`;H=S.notifs.length?S.notifs.map(n=>`<div class="dm" data-a="open" data-id="${n.pid}"><img class="av" src="${esc(U(n.uid).av)}"><div><b>${esc(U(n.uid).name)}</b>님이 회원님의 게시물에 답글을 남겼습니다<div style="color:#536471">${esc(n.text)}</div></div></div>`).join(''):'<div class="ph"><b>알림 없음</b>내 게시물에 다른 계정이 답글을 달면 표시됩니다</div>';}
else{const g=R.n==='grok';T=`<div class="hd"><b style="font-size:20px">${g?'Grok':'쪽지'}</b></div>`;H=`<div class="ph"><b>준비 중</b>${g?'Grok':'쪽지'} 기능은 아직 구현되지 않았습니다</div>`;}
$('#top').innerHTML=T;v.innerHTML=H;v.scrollTop=reset?0:y;
$('#nav').innerHTML=[['home','home','homeF'],['search','search'],['grok','grok'],['notif','bell','bellF'],['msg','msg']].map(n=>{const on=(R.n===n[0]||(R.n==='detail'||R.n==='profile')&&n[0]==='home'&&0);return `<button data-a="tab" data-id="${n[0]}" style="${on?'':'color:#0f1419'}">${on&&n[2]?I[n[2]]:I[n[1]]}${n[0]==='notif'&&S.unread?`<span class="bd">${S.unread}</span>`:''}</button>`}).join('');
$('#fab')&&$('#fab').remove();if(fab&&!['search','grok','msg'].includes(R.n))document.body.insertAdjacentHTML('beforeend',`<button class="fab" id="fab" data-a="new">${I.plus.replace('<svg','<svg style="color:#fff"')}</button>`);}
function modal(h){const m=$('#md');m.innerHTML=`<div class="sh">${h}</div>`;m.classList.add('on')}
const shut=()=>{$('#md').classList.remove('on');$('#md').innerHTML='';tmp=''};
const val=id=>$('#'+id).value;
function pickImg(cb){$('#fi').onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{const im=new Image();im.onload=()=>{const k=Math.min(1,900/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=im.width*k;c.height=im.height*k;c.getContext('2d').drawImage(im,0,0,c.width,c.height);cb(c.toDataURL('image/jpeg',.8))};im.src=r.result};r.readAsDataURL(f);e.target.value=''};$('#fi').click()}
function postForm(p){tmp=p?p.img:'';const e=!!p;
modal(`<h3>${e?'게시물 수정':'새 게시물'}</h3><label>작성 계정</label><select id="fu">${S.users.map(u=>`<option value="${u.id}" ${(e?p.uid:S.me)===u.id?'selected':''}>${esc(u.name)} @${esc(u.handle)}</option>`).join('')}</select><label>본문</label><textarea id="ft">${e?esc(p.text):''}</textarea><label>이미지</label><div class="row"><button class="btn" data-a="img" data-t="post">업로드</button><button class="btn" data-a="noimg">제거</button></div><img class="pv" id="pv" src="${esc(tmp)}" style="${tmp?'':'display:none'}">
<label>작성 시간 표시</label><input id="ftm" value="${e?esc(p.t):'지금'}"><div class="row"><div><label>좋아요</label><input id="fl" type="number" value="${e?p.likes:0}"></div><div><label>재게시</label><input id="fr" type="number" value="${e?p.rt:0}"></div><div><label>조회수</label><input id="fv" type="number" value="${e?p.views:0}"></div></div>
<div class="btns" style="margin:16px 0 0"><button class="btn" data-a="shut">취소</button><button class="btn pr" data-a="sp" data-id="${e?p.id:''}" ${e&&p.parent?`data-par="${p.parent}"`:''}>${e?'저장':'게시'}</button></div>`)}
function userForm(u){const e=!!u;u=u||{id:'',name:'',handle:'',av:'',banner:'',job:'',bday:'',joined:'',bio:'',link:'',fing:0,fers:0,verified:0,locked:0};tmp={av:u.av,banner:u.banner};
const F=(k,l,t)=>`<label>${l}</label><input id="u_${k}" ${t?'type=number':''} value="${esc(u[k])}">`;
modal(`<h3>${e?'프로필 수정':'계정 추가'}</h3>${F('name','이름')}${F('handle','아이디(@ 제외)')}<div class="row"><button class="btn" data-a="img" data-t="av">프로필 사진</button><button class="btn" data-a="img" data-t="banner">배너</button></div>${F('job','직업')}${F('bday','생일')}${F('joined','가입일 (예: 2020년 2월)')}${F('link','링크')}<label>소개글</label><textarea id="u_bio">${esc(u.bio)}</textarea><div class="row">${F('fing','팔로잉',1)}${F('fers','팔로워',1)}</div><div class="row"><label style="display:flex;gap:6px;align-items:center"><input type="checkbox" id="u_verified" ${u.verified?'checked':''} style="width:auto">인증 배지</label><label style="display:flex;gap:6px;align-items:center"><input type="checkbox" id="u_locked" ${u.locked?'checked':''} style="width:auto">잠금</label></div><div class="btns" style="margin:16px 0 0"><button class="btn" data-a="shut">취소</button><button class="btn pr" data-a="su" data-id="${u.id}">저장</button></div>`)}
function menu(){modal(`<h3>계정 · 데이터</h3>${S.users.map(u=>`<div class="mi"><span data-a="prof" data-id="${u.id}" style="flex:1">${esc(u.name)} <span style="color:#536471">@${esc(u.handle)}</span>${u.id===S.me?' ✓':''}</span><span><button data-a="setme" data-id="${u.id}" style="color:#1d9bf0;margin-right:12px">내 계정</button><button data-a="eu" data-id="${u.id}" style="color:#1d9bf0;margin-right:12px">수정</button><button data-a="du" data-id="${u.id}" style="color:#f4212e">삭제</button></span></div>`).join('')}<button class="mi" data-a="au">+ 계정 추가</button><button class="mi" data-a="exp">JSON 내보내기</button><button class="mi" data-a="imp">JSON 가져오기</button><button class="mi" data-a="rst" style="color:#f4212e">데이터 초기화</button>`)}
const rm=id=>{S.posts=S.posts.filter(p=>p.id!==id&&p.parent!==id)};
document.addEventListener('click',e=>{const el=e.target.closest('[data-a]');if(!el)return;const a=el.dataset.a,id=el.dataset.id,p=PO(id);
if(a!=='open'&&a!=='prof'||e.target.closest('button:not([data-a=open])')&&0){}
const stop=['rt','lk','bm','sh','pm','prof'].includes(a)||e.target.closest('.mo,.ac button:not(.it)');if(stop&&a!=='open')e.stopPropagation();
if(a==='open'){return}
else if(a==='prof'){e.stopPropagation();if(id!=='u_yuyu'&&id!=='u0')return;shut();go({n:'profile',uid:id,ptab:'posts'})}
else if(a==='back')back();
else if(a==='tab'){shut();tab(id)}
else if(a==='ht'){R.tab=id;draw(1)}
else if(a==='pt'){R.ptab=id;draw(0)}
else if(a==='lk'){p.liked=!p.liked;p.likes=Math.max(0,p.likes+(p.liked?1:-1));save();draw()}
else if(a==='rt'){p.rted=!p.rted;p.rt=Math.max(0,p.rt+(p.rted?1:-1));save();draw()}
else if(a==='bm'){p.marked=!p.marked;save();draw();toast(p.marked?'북마크에 추가됨':'북마크 해제됨')}
else if(a==='sh'||a==='shp'){const t=a==='sh'?p.text:'@'+U(id).handle;(navigator.clipboard?navigator.clipboard.writeText(t):Promise.reject()).then(()=>toast('클립보드에 복사됨'),()=>toast('복사할 수 없습니다'))}
else if(a==='fol'){const u=U(id);u.f=u.f?0:1;u.fers+=u.f?1:-1;save();draw()}
else if(a==='new')postForm();
else if(a==='pm')modal(`<button class="mi" data-a="ed" data-id="${id}">게시물 수정</button><button class="mi" data-a="dp" data-id="${id}" style="color:#f4212e">삭제</button>`);
else if(a==='ed')postForm(PO(id));
else if(a==='dp'){rm(id);save();shut();if(R.n==='detail'&&R.id===id)back();else draw()}
else if(a==='shut')shut();
else if(a==='img'){const t=el.dataset.t;pickImg(d=>{if(t==='post'){tmp=d;$('#pv').src=d;$('#pv').style.display='block'}else{tmp[t]=d;toast('이미지 선택됨')}})}
else if(a==='noimg'){tmp='';$('#pv').style.display='none'}
else if(a==='sp'){const o={uid:val('fu'),text:val('ft'),img:tmp,t:val('ftm')||'지금',likes:+val('fl')||0,rt:+val('fr')||0,views:+val('fv')||0};if(!o.text.trim()&&!o.img)return toast('내용을 입력하세요');
if(id)Object.assign(PO(id),o);else S.posts.unshift({id:'p'+S.nid++,...o});save();shut();draw(!id)}
else if(a==='reply'){const t=val('rt').trim();if(!t)return;const au=val('ra');S.posts.push({id:'p'+S.nid++,uid:au,t:'지금',text:t,img:'',likes:0,rt:0,views:0,parent:id});if(p.uid===S.me&&au!==S.me){S.notifs.unshift({uid:au,pid:id,text:t});S.unread++}save();draw()}
else if(a==='menu')menu();
else if(a==='setme'){S.me=id;save();shut();draw()}
else if(a==='ep'||a==='eu')userForm(U(id));
else if(a==='au')userForm();
else if(a==='su'){const g=k=>val('u_'+k),o={name:g('name').trim(),handle:g('handle').trim().replace(/^@/,''),av:tmp.av,banner:tmp.banner,job:g('job'),bday:g('bday'),joined:g('joined'),link:g('link'),bio:g('bio'),fing:+g('fing')||0,fers:+g('fers')||0,verified:$('#u_verified').checked,locked:$('#u_locked').checked};if(!o.name||!o.handle)return toast('이름과 아이디를 입력하세요');if(!o.av)o.av=AV(o.name,'#1d9bf0');
if(id)Object.assign(U(id),o);else{const n={id:'u'+S.nid++,f:0,...o};S.users.push(n)}save();shut();draw()}
else if(a==='du'){if(S.users.length<2)return toast('마지막 계정은 삭제할 수 없습니다');if(!confirm('계정과 게시물을 삭제할까요?'))return;S.users=S.users.filter(u=>u.id!==id);S.posts=S.posts.filter(p=>p.uid!==id);if(S.me===id)S.me=S.users[0].id;save();menu();if(R.n==='profile'&&R.uid===id)tab('home');else draw()}
else if(a==='exp'){const b=new Blob([JSON.stringify(S,null,1)],{type:'application/json'}),l=document.createElement('a');l.href=URL.createObjectURL(b);l.download='x-sim.json';l.click()}
else if(a==='imp')$('#fj').click();
else if(a==='rst'){if(confirm('모든 데이터를 초기화할까요?')){S=seed();save();shut();tab('home')}}});
$('#fj').onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{try{const d=JSON.parse(r.result);if(!d.users||!d.posts)throw 0;S=d;S.notifs=S.notifs||[];S.nid=S.nid||1000;save();shut();tab('home');toast('가져오기 완료')}catch(x){toast('올바른 JSON이 아닙니다')}};r.readAsText(f);e.target.value=''};
document.addEventListener('input',e=>{if(e.target.id==='sq'){q=e.target.value;const p=e.target.selectionStart;draw();const s=$('#sq');s.focus();s.setSelectionRange(p,p)}});
document.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.id==='rt'){document.querySelector('[data-a=reply]').click()}});
$('#md').addEventListener('click',e=>{if(e.target.id==='md')shut()});
const tick=()=>{const d=new Date();$('#clk').textContent=d.getHours()%12||12;$('#clk').textContent+=':'+String(d.getMinutes()).padStart(2,'0')};tick();setInterval(tick,30000);
draw(1);

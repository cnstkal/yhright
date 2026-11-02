
const $=s=>document.querySelector(s);
const I={home:'<path d="M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/>',reels:'<rect x="3" y="3" width="18" height="18" rx="5"/><path d="M10 8.5v7l6-3.5z"/>',send:'<path d="M21 3L3 10l7 3 3 7z"/><path d="M10 13L21 3"/>',search:'<circle cx="11" cy="11" r="7"/><path d="M16 16l5 5"/>',heart:'<path d="M12 21s-8-5-8-11a4.5 4.5 0 0 1 8-2.5A4.5 4.5 0 0 1 20 10c0 6-8 11-8 11z"/>',comment:'<path d="M4 20l1.5-4A9 9 0 1 1 8 18.5z"/>',repost:'<path d="M17 3l3 3-3 3M4 11V9a3 3 0 0 1 3-3h13M7 21l-3-3 3-3M20 13v2a3 3 0 0 1-3 3H4"/>',bookmark:'<path d="M6 3h12v18l-6-4-6 4z"/>',plus:'<path d="M12 4v16M4 12h16"/>',bell:'<path d="M6 17V11a6 6 0 0 1 12 0v6l2 2H4z"/><path d="M10 21h4"/>',menu:'<path d="M3 7h18M3 12h18M3 17h18"/>',back:'<path d="M15 4l-8 8 8 8"/>',phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z"/>',video:'<rect x="3" y="6" width="13" height="12" rx="3"/><path d="M16 10l5-3v10l-5-3"/>',camera:'<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',mic:'<rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',image:'<rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="9" cy="9" r="1.5"/><path d="M4 18l5-5 4 4 3-3 4 4"/>',sticker:'<path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8l-6 6H6a2 2 0 0 1-2-2z"/><path d="M20 14h-4a2 2 0 0 0-2 2v4"/><circle cx="9" cy="10" r=".8"/><circle cx="15" cy="10" r=".8"/>',pc:'<circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/>',chev:'<path d="M6 9l6 6 6-6"/>',edit:'<path d="M12 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6"/><path d="M9 15l1-4 8-8 3 3-8 8z"/>',grid:'<path d="M4 4h4v4H4zM10 4h4v4h-4zM16 4h4v4h-4zM4 10h4v4H4zM10 10h4v4h-4zM16 10h4v4h-4zM4 16h4v4H4zM10 16h4v4h-4zM16 16h4v4h-4z"/>',tag:'<rect x="4" y="5" width="16" height="15" rx="3"/><circle cx="12" cy="11" r="3"/><path d="M7 19c1-3 9-3 10 0"/>',x:'<path d="M5 5l14 14M19 5L5 19"/>',more:'<path d="M5 12h.01M12 12h.01M19 12h.01" stroke-width="3"/>',au:'<circle cx="9" cy="8" r="4"/><path d="M2 21c0-4 3-6 7-6s7 2 7 6"/><path d="M19 8v6M16 11h6"/>',play:'<path d="M7 4l13 8-13 8z"/>',lines:'<path d="M3 8h18M3 15h12"/>'};
const ic=(n,s=24,f)=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="${f?'currentColor':'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${I[n]}</svg>`;
const BADGE='<svg width="16" height="16" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#3b8ff0"/><path d="M7 12.5l3.2 3.2L17 9" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const K='igsim_v1',uid=()=>Math.random().toString(36).slice(2,9);
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const ph=(a,b)=>'data:image/svg+xml,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="400" height="500"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="400" height="500" fill="url(#g)"/></svg>`);
const isN=v=>v!==''&&v!=null&&!isNaN(Number(String(v).replace(/,/g,'')));
const fmt=v=>{if(v===''||v==null)return'0';if(!isN(v))return esc(v);const n=Number(String(v).replace(/,/g,''));if(n>=10000){const x=n/10000;return(x>=100?Math.round(x):Math.round(x*10)/10)+'만'}return n.toLocaleString()};
const hash=s=>esc(s).replace(/#[^\s#<]+/g,m=>`<span class="ht">${m}</span>`);
function def(){
 const me={id:'jukeeek',name:'jukeeek',avatar:ph('#d8c7a8','#6b5b4a'),bio:'',link:'jukeeek',mutual:'',postsN:'',followers:0,following:159,note:'오늘의 분위기...'};
 const mk=(u,a,b)=>({id:uid(),user:u,avatar:ph(a,b),img:ph(b,a),seen:0});
 return{me,
 stories:[mk('yunou._.u','#333','#9aa'),mk('eeunhho','#222','#bbb'),mk('bangjunseo','#eee','#f2b')],
 posts:[
  {id:uid(),user:'ateez_official_',avatar:ph('#111','#555'),verified:1,img:ph('#5b6b8f','#c2603a'),likes:189000,commentCount:1543,reposts:16000,shares:19000,liker:'no1likeme8_8',caption:'[📷] ATEEZ(에이티즈) GOLDEN HOUR : Part.6 Promotion Map\n\n2026. 11. 13 2PM RELEASE\n\n📎Pre-save/add : ateez.sng.to/golden-hour-part-6\n\n#ATEEZ #에이티즈\n#GOLDENHOUR #GOLDENHOUR_Part6',date:'10월 9일',liked:0,saved:0,comments:[{id:uid(),u:'wooyounggg__',t:'기대된다!!'}]},
  {id:uid(),user:'grit_park_',avatar:ph('#a98','#432'),verified:0,img:ph('#c9b79c','#8a7a66'),likes:3200,commentCount:48,reposts:120,shares:310,liker:'',caption:'Da Da Da Dadada #일상',date:'10월 8일',liked:0,saved:0,comments:[]}],
 sugg:[{id:uid(),name:'정건호',sub:'회원님을 위한 추천',avatar:ph('#223','#668'),on:0},{id:uid(),name:'archiveme.99',sub:'함께 아는 친구 1명',avatar:ph('#fbd','#f88'),on:0}],
 dms:[
  {id:uid(),name:'🐄🥛',handle:'bright_sou',avatar:ph('#8a7','#445'),ring:0,online:0,sub:'',time:'1주',msgs:[
   {id:uid(),from:'me',text:'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ'},
   {id:uid(),from:'th',img:ph('#e8a33d','#c0392b'),reelUser:'todaywithn...',stamp:'(일) 오전 11:38'},
   {id:uid(),from:'th',text:'소윤아 혹시 너만 괜찮다면 다소언니도 같이 놀아도 될깡? 같이 영화 보고싶대 편하게 얘기해줭',stamp:'(일) 오후 9:59'},
   {id:uid(),from:'me',text:'당욘괜찮'},{id:uid(),from:'th',text:'쪼아'}]},
  {id:uid(),name:'날이',handle:'nal_i',avatar:ph('#ff4d8d','#ffd1e0'),ring:1,online:0,sub:'회원님에게 메시지를 보냈습니다 · 1주',time:'',msgs:[]},
  {id:uid(),name:'좋댓구',handle:'jotdaetgu',avatar:ph('#cfe','#9bd'),ring:0,online:0,sub:'최근 활동: 1시간 전',time:'',msgs:[]},
  {id:uid(),name:'진소윤',handle:'jinsoyun',avatar:ph('#fff','#ccd'),ring:0,online:0,sub:'licoshare님의 릴스를 보냈습니다 · 1주',time:'',msgs:[]},
  {id:uid(),name:'박시온 | 온크트리',handle:'sion_park',avatar:ph('#b9a','#654'),ring:1,online:1,sub:'현재 활동 중',time:'',msgs:[]}]}}
let S;try{S=JSON.parse(localStorage.getItem(K))||def()}catch(e){S=def()}
const save=()=>{try{localStorage.setItem(K,JSON.stringify(S))}catch(e){toast('저장 공간이 부족합니다')}};
let U={tab:'home',chat:null,pd:null,story:null,q:''},F=null,SH=null,ST_T=null,lastKey='';
const toast=m=>{const t=$('#toast');t.textContent=m;t.style.display='block';clearTimeout(t._t);t._t=setTimeout(()=>t.style.display='none',1600)};
const av=(src,n,s=40)=>src?`<img class="av" width="${s}" height="${s}" src="${src}" style="width:${s}px;height:${s}px">`:`<span class="av" style="width:${s}px;height:${s}px;background:#999;font-size:${s/2.4}px">${esc((n||'?')[0])}</span>`;
const rav=(src,n,s,ring,seen)=>ring?`<span class="ring ${seen?'seen':''}"><span>${av(src,n,s)}</span></span>`:av(src,n,s);
const pav=p=>p.user===S.me.id?S.me.avatar:p.avatar;
const P=id=>S.posts.find(p=>p.id===id),D=id=>S.dms.find(d=>d.id===id);
/* ---------- views ---------- */
function postH(p,det){
 return `<div class="post"><div class="ph">${rav(pav(p),p.user,32,1,0)}<b>${esc(p.user)}</b>${p.verified?BADGE:''}<span class="sp"></span><button data-a="pmenu" data-id="${p.id}">${ic('more',20)}</button></div>
 <img class="pimg" src="${p.img}" ${det?'':`data-a="pd" data-id="${p.id}"`}>
 <div class="act"><button data-a="like" data-id="${p.id}" style="${p.liked?'color:#ed4956':''}">${ic('heart',26,p.liked)}</button><button data-a="pd" data-id="${p.id}">${ic('comment',26)}</button><button data-a="toast" data-m="보냈습니다">${ic('send',26)}</button><button class="bm" data-a="save" data-id="${p.id}">${ic('bookmark',26,p.saved)}</button></div>
 <div class="lk"><b>좋아요 ${fmt(p.likes)}개</b></div>
 ${p.liker?`<div class="liker">${av(ph('#234','#678'),p.liker,20)}<span>${esc(p.liker)}님 외 <b>여러 명</b>이 좋아합니다</span></div>`:''}
 <div class="pt"><b>${esc(p.user)}</b> ${hash(p.caption)}</div>
 ${det?'':`<button class="cmt" data-a="pd" data-id="${p.id}">댓글 ${fmt(p.commentCount)}개 모두 보기</button>`}
 <div class="pt gr" style="padding-bottom:10px">${esc(p.date)}</div></div>`}
function homeH(){
 const mine=S.stories.filter(s=>s.user===S.me.id),oth=S.stories.filter(s=>s.user!==S.me.id),seq=[...mine,...oth];
 return `<div class="hd"><div class="l"><button data-a="newpost">${ic('camera',28)}</button></div><div class="c"><span class="logo">Instagram</span></div><div class="r"><button data-a="tab" data-t="dm">${ic('send',26)}</button><button class="rel" data-a="toast" data-m="새 알림이 없습니다">${ic('heart',26)}<i class="dot" style="width:10px;height:10px"></i></button></div></div>
 <div id="sc"><div class="stories"><div class="st mine"><div style="position:relative" data-a="${mine.length?'story':'newstory'}" data-i="0">${rav(S.me.avatar,S.me.id,66,mine.length,mine.every(s=>s.seen))}<button class="pl" data-a="newstory">${ic('plus',16)}</button></div><span class="n">내 스토리</span></div>
 ${oth.map(s=>`<button class="st" data-a="story" data-i="${seq.indexOf(s)}">${rav(s.avatar,s.user,66,1,s.seen)}<span class="n">${esc(s.user)}</span></button>`).join('')}</div>
 ${S.posts.map(p=>postH(p)).join('')||'<div class="empty">게시물이 없습니다. + 버튼으로 추가하세요.</div>'}</div>`}
function profH(){
 const m=S.me,mp=S.posts.filter(p=>p.user===m.id);
 return `<div class="hd"><div class="l"><button data-a="newpost">${ic('plus',30)}</button></div><div class="c"><button data-a="acct" style="display:flex;align-items:center;gap:4px">${esc(m.id)}${ic('chev',16)}<i class="dot"></i></button></div><div class="r"><button data-a="toast" data-m="새 알림이 없습니다">${ic('bell',26)}</button><button data-a="settings">${ic('menu',28)}</button></div></div>
 <div id="sc"><div class="prof"><button data-a="editme" style="position:relative">${av(m.avatar,m.id,86)}</button><div class="stat"><div><b>${m.postsN!==''?fmt(m.postsN):mp.length}</b>게시물</div><div><b>${fmt(m.followers)}</b>팔로워</div><div><b>${fmt(m.following)}</b>팔로잉</div></div></div>
 ${m.name?`<div style="padding:4px 16px;font-weight:600">${esc(m.name)}</div>`:''}${m.bio?`<div class="pt" style="padding:2px 16px">${hash(m.bio)}</div>`:''}
 ${m.link?`<div class="pill">@ ${esc(m.link)}</div>`:''}${m.mutual?`<div class="pt" style="padding:6px 16px">${esc(m.mutual)}</div>`:''}
 <div class="btns"><button data-a="editme">프로필 편집</button><button data-a="toast" data-m="프로필 링크가 복사되었습니다">프로필 공유</button><button class="s" data-a="newsugg">${ic('au',20)}</button></div>
 <div class="sec" style="padding-top:6px"><span>사람 찾아보기</span><button data-a="newsugg" style="color:#4a5cf5;font-weight:600">모두 보기</button></div>
 <div class="sg">${S.sugg.map(s=>`<div class="card"><button class="x" data-a="sdel" data-id="${s.id}">${ic('x',18)}</button><div data-a="sedit" data-id="${s.id}">${av(s.avatar,s.name,130)}<b>${esc(s.name)}</b><small>${esc(s.sub)}</small></div><button class="fb ${s.on?'on':''}" data-a="sfol" data-id="${s.id}">${s.on?'팔로잉':'팔로우'}</button></div>`).join('')}</div>
 <div class="tabs"><div class="on">${ic('grid',24,1)}</div><div>${ic('repost',24)}</div><div>${ic('tag',24)}</div></div>
 ${mp.length?`<div class="grid">${mp.map(p=>`<img src="${p.img}" data-a="pd" data-id="${p.id}">`).join('')}</div>`:'<div class="empty">게시물이 없습니다.<br><br><button data-a="newpost" style="color:#4a5cf5;font-weight:700">첫 게시물 추가</button></div>'}</div>`}
const prev=d=>{if(d.sub)return d.sub;const m=d.msgs[d.msgs.length-1];if(!m)return'대화를 시작하세요';return(m.img&&m.reelUser?'릴스를 보냈습니다':m.img?'사진을 보냈습니다':m.text)+(d.time?' · '+d.time:'')};
function exH(){const q=U.q.trim().toLowerCase();const tiles=[...S.posts.map(p=>({src:p.img,id:p.id})),...S.stories.filter(s=>s.img).map(s=>({src:s.img})),...S.dms.flatMap(d=>d.msgs.filter(m=>m.img).map(m=>({src:m.img})))];
 return `<div class="hd"><div class="c" style="font-size:19px">탐색</div></div><div id="sc"><div class="srch">${ic('search',20)}<input id="eq" placeholder="검색" value="${esc(U.q)}"></div><div class="grid3">${tiles.map(t=>t.id?`<img src="${t.src}" data-a="pd" data-id="${t.id}">`:`<img src="${t.src}">`).join('')||'<div class="empty">표시할 사진이 없습니다</div>'}</div></div>`}
function dlH(){const q=U.q.trim().toLowerCase();return S.dms.filter(d=>!q||(d.name+d.handle).toLowerCase().includes(q)).map(d=>`<button class="row" data-a="chat" data-id="${d.id}"><span style="position:relative">${rav(d.avatar,d.name,66,d.ring,0)}${d.online&&!d.ring?'<i class="on-dot"></i>':''}</span><span class="t"><b>${esc(d.name)}</b><span>${esc(prev(d))}</span></span><i class="cm2">${ic('camera',24)}</i></button>`).join('')||'<div class="empty">대화가 없습니다</div>'}
function dmH(){
 return `<div class="hd"><div class="l"><button data-a="tab" data-t="home">${ic('back',26)}</button></div><div class="c" style="font-size:19px">Direct</div><div class="r"><button data-a="newchat">${ic('plus',28)}</button></div></div>
 <div id="sc"><div class="srch">${ic('search',20)}<input id="dq" placeholder="검색" value="${esc(U.q)}">${ic('lines',20)}</div>
 <div class="notes"><button class="nt" data-a="note">${S.me.note?`<span class="bub">${esc(S.me.note)}</span>`:''}${av(S.me.avatar,S.me.id,76)}<span>내 메모</span></button><div class="nt" data-a="toast" data-m="지도는 디자인 참고용입니다">${av(ph('#9cc7e8','#7fb27a'),'지',76)}<span>지도</span></div></div>
 <div class="sec"><span>메시지</span><button data-a="toast" data-m="메시지 요청이 없습니다">요청</button></div><div id="dl">${dlH()}</div></div>`}
function chatH(){
 const d=D(U.chat),ms=d.msgs;let h='';
 ms.forEach((m,i)=>{const me=m.from==='me',pv=ms[i-1],nx=ms[i+1];
  if(m.stamp)h+=`<div class="stamp">${esc(m.stamp)}</div>`;
  const gp=pv&&pv.from===m.from&&!m.stamp,last=!nx||nx.from!==m.from||nx.stamp;
  const body=m.img&&m.reelUser?`<div class="reel" data-a="mmenu" data-id="${m.id}"><img src="${m.img}"><div class="u">${esc(m.reelUser)}</div><div class="pb">${ic('play',48,1)}</div></div>`:m.img?`<img class="mimg" src="${m.img}" data-a="mmenu" data-id="${m.id}">`:`<div class="bb" data-a="mmenu" data-id="${m.id}">${esc(m.text)}</div>`;
  h+=`<div class="mr ${me?'me':'th'}" style="margin-top:${gp?2:10}px">${me?'':`<span style="width:30px">${last?av(d.avatar,d.name,30):''}</span>`}${body}${!me&&m.img&&m.reelUser?`<div class="side"><i>${ic('send',22)}</i><i>${ic('bookmark',22)}</i></div>`:''}</div>`});
 return `<div class="hd" style="grid-template-columns:auto 1fr auto;gap:10px"><div class="cb"><button class="hb" data-a="back">${ic('back',22)}</button></div><button data-a="cedit" style="display:flex;align-items:center;gap:10px;text-align:left;min-width:0">${av(d.avatar,d.name,36)}<span style="min-width:0"><div style="font-size:15px;white-space:nowrap">${esc(d.name)} ${ic('chev',12)}</div><div style="font-size:15px">${esc(d.handle)}</div></span></button><div class="cb"><button class="hb" data-a="toast" data-m="통화 기능은 지원하지 않습니다">${ic('phone',22)}</button><button class="hb" data-a="toast" data-m="영상통화 기능은 지원하지 않습니다">${ic('video',22)}</button></div></div>
 <div id="sc"><div class="msgs">${h||'<div class="empty">메시지를 보내보세요</div>'}</div></div>
 <div class="ib"><button class="cam" data-a="pick" data-t="cam">${ic('camera',22,0)}</button><input id="ci" placeholder="메시지 보내기..." autocomplete="off"><span class="ic" id="ic1"><button data-a="toast" data-m="음성 메시지는 지원하지 않습니다">${ic('mic',26)}</button><button data-a="pick" data-t="gal">${ic('image',26)}</button><button data-a="emoji">${ic('sticker',26)}</button><button data-a="cplus">${ic('pc',26)}</button></span><button class="snd" id="snd" data-a="send">보내기</button></div>`}
function render(){
 const key=U.chat?'c'+U.chat:U.tab,old=$('#sc'),y=old?old.scrollTop:0,keep=key===lastKey;lastKey=key;
 $('#app').className=U.chat?'chat':'';
 $('#main').innerHTML=U.chat?chatH():U.tab==='home'?homeH():U.tab==='dm'?dmH():U.tab==='ex'?exH():profH();
 const sc=$('#sc');if(sc)sc.scrollTop=U.chat&&!keep?1e9:keep?y:0;
 if(U.chat&&keep&&U._bot){sc.scrollTop=1e9;U._bot=0}
 const T=(a,i,f,x='')=>`<button class="ni ${U.tab===a?'nav-on':''}" ${a?`data-a="tab" data-t="${a}"`:''}>${x||ic(i,28,U.tab===a&&f)}</button>`;
 $('#nav').innerHTML=`<button class="ni" data-a="tab" data-t="home">${ic('home',27,U.tab==='home')}</button><button class="ni" data-a="tab" data-t="ex">${ic('search',27,U.tab==='ex')}</button><button class="ni" data-a="newpost">${ic('plus',27)}</button><button class="ni" data-a="toast" data-m="새 알림이 없습니다">${ic('heart',27)}</button><button class="ni" data-a="tab" data-t="me"><span style="width:27px;height:27px;border-radius:50%;display:flex;${U.tab==='me'?'outline:2px solid #000;outline-offset:1px':''}">${av(S.me.avatar,S.me.id,27)}</span></button>`;
 renderPD();
}
function renderPD(){const e=$('#pd');if(!U.pd||!P(U.pd)){e.style.display='none';return}const p=P(U.pd),y=e.querySelector('.sc')?.scrollTop||0;
 e.style.display='flex';e.innerHTML=`<div class="hd" style="padding-top:env(safe-area-inset-top);height:calc(52px + env(safe-area-inset-top))"><div class="l"><button data-a="pdx">${ic('back',26)}</button></div><div class="c" style="font-size:17px">게시물</div><div class="r"></div></div>
 <div class="sc" style="flex:1;overflow-y:auto">${postH(p,1)}<div style="border-top:1px solid #eee;padding-top:6px">${p.comments.map(c=>`<div class="cm">${av(ph('#aab','#667'),c.u,32)}<div class="t"><b>${esc(c.u)}</b> ${esc(c.t)}</div><button data-a="cdel" data-id="${c.id}">${ic('x',16)}</button></div>`).join('')||'<div class="empty">첫 댓글을 남겨보세요</div>'}</div></div>
 <div class="ib" style="background:#eff0f5"><input id="pci" placeholder="댓글 달기..." autocomplete="off"><button class="snd" style="display:block" data-a="csend">게시</button></div>`;
 e.querySelector('.sc').scrollTop=y}
/* ---------- overlays ---------- */
function sheet(title,items){SH={title,items};const e=$('#sh');e.style.display='flex';e.innerHTML=`<div class="sheet">${title?`<h3>${esc(title)}</h3>`:''}${items.map((it,i)=>`<button class="si ${it[2]||''}" data-a="shi" data-i="${i}">${esc(it[0])}</button>`).join('')}<button class="si" data-a="shx" style="border:0">취소</button></div>`}
const shx=()=>{$('#sh').style.display='none';SH=null};
function form(title,fields,vals,onSave,onDel){F={title,fields,vals:{...vals},onSave,onDel};rForm()}
function rForm(){const e=$('#fm');e.style.display='flex';e.innerHTML=`<div class="sheet"><h3>${esc(F.title)}</h3>${F.fields.map(f=>{const v=F.vals[f.k]??'';let i;
 if(f.t==='i')i=`<div class="imgf"><img src="${v||ph('#ddd','#bbb')}"><label>사진 선택<input type="file" accept="image/*" hidden data-fk="${f.k}"></label><button data-a="fclr" data-k="${f.k}">지우기</button></div>`;
 else if(f.t==='a')i=`<textarea class="fi" data-k="${f.k}">${esc(v)}</textarea>`;
 else if(f.t==='c')return `<label class="fl" style="display:flex;gap:8px;align-items:center;color:#000;font-size:16px"><input type="checkbox" data-k="${f.k}" ${v?'checked':''}> ${esc(f.l)}</label>`;
 else i=`<input class="fi" data-k="${f.k}" value="${esc(v)}">`;return `<span class="fl">${esc(f.l)}</span>${i}`}).join('')}
 <div class="fr">${F.onDel?'<button class="d" data-a="fdel">삭제</button>':''}<button data-a="fx">취소</button><button class="p" data-a="fok">저장</button></div></div>`}
const fx=()=>{$('#fm').style.display='none';F=null};
function shrink(file,cb){const r=new FileReader();r.onload=()=>{const im=new Image();im.onload=()=>{const m=900,s=Math.min(1,m/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=im.width*s;c.height=im.height*s;c.getContext('2d').drawImage(im,0,0,c.width,c.height);cb(c.toDataURL('image/jpeg',.8))};im.src=r.result};r.readAsDataURL(file)}
/* ---------- story ---------- */
const seq=()=>[...S.stories.filter(s=>s.user===S.me.id),...S.stories.filter(s=>s.user!==S.me.id)];
function renderST(){clearTimeout(ST_T);const e=$('#st'),q=seq();if(U.story==null||!q[U.story]){e.style.display='none';U.story=null;return}
 const s=q[U.story];s.seen=1;e.style.display='flex';e.innerHTML=`<div style="position:absolute;inset:0"><img src="${s.img}" style="width:100%;height:100%;object-fit:cover"></div>
 <div style="position:relative;padding-top:env(safe-area-inset-top);color:#fff"><div class="pbars"><i><b></b></i></div><div style="display:flex;align-items:center;gap:10px;padding:4px 12px">${av(s.avatar,s.user,34)}<b>${esc(s.user)}</b><span style="flex:1"></span><button data-a="smenu" style="color:#fff">${ic('more',26)}</button><button data-a="sx" style="color:#fff">${ic('x',28)}</button></div></div>
 <div style="position:relative;flex:1;display:flex"><div style="flex:1" data-a="sprev"></div><div style="flex:1" data-a="snext"></div></div>`;
 ST_T=setTimeout(()=>stNext(),5000);save()}
const stNext=()=>{U.story++;renderST();if(U.story!=null)return;render()};
/* ---------- forms ---------- */
const PF=[{k:'user',l:'계정명',t:'t'},{k:'avatar',l:'프로필 사진',t:'i'},{k:'verified',l:'인증 배지',t:'c'},{k:'img',l:'게시물 이미지',t:'i'},{k:'likes',l:'좋아요 수',t:'t'},{k:'commentCount',l:'댓글 수',t:'t'},{k:'reposts',l:'리포스트 수',t:'t'},{k:'shares',l:'공유 수',t:'t'},{k:'liker',l:'좋아요 누른 계정(없으면 비움)',t:'t'},{k:'caption',l:'캡션 (#해시태그)',t:'a'},{k:'date',l:'게시 날짜',t:'t'}];
function postForm(p,isNew){form(isNew?'새 게시물':'게시물 수정',PF,p,v=>{if(!v.img)v.img=ph('#bbb','#889');Object.assign(p,v);if(isNew)S.posts.unshift(p)},isNew?null:()=>{S.posts=S.posts.filter(x=>x!==p);U.pd=null})}
const newPost=()=>({id:uid(),user:S.me.id,avatar:'',verified:0,img:'',likes:0,commentCount:0,reposts:0,shares:0,liker:'',caption:'',date:'방금 전',liked:0,saved:0,comments:[]});
function msgForm(d,m,isNew){const v=isNew?{me:m.from==='me'}:{me:m.from==='me',text:m.text,img:m.img,reelUser:m.reelUser,stamp:m.stamp};
 form(isNew?'메시지 추가':'메시지 수정',[{k:'me',l:'내가 보낸 메시지',t:'c'},{k:'text',l:'텍스트',t:'a'},{k:'img',l:'이미지 / 릴스 썸네일',t:'i'},{k:'reelUser',l:'릴스 계정명 (입력하면 릴스 공유 미리보기)',t:'t'},{k:'stamp',l:'위에 표시할 날짜·시간 (예: (일) 오전 11:38)',t:'t'}],v,
 x=>{Object.assign(m,{from:x.me?'me':'th',text:x.text||'',img:x.img||'',reelUser:x.reelUser||'',stamp:x.stamp||''});if(isNew)d.msgs.push(m);U._bot=1},isNew?null:()=>{d.msgs=d.msgs.filter(z=>z!==m)})}
const CF=[{k:'name',l:'이름',t:'t'},{k:'handle',l:'아이디',t:'t'},{k:'avatar',l:'프로필 사진',t:'i'},{k:'ring',l:'스토리 링 표시',t:'c'},{k:'online',l:'활동 중 표시',t:'c'},{k:'sub',l:'목록 문구 (비우면 마지막 메시지)',t:'t'},{k:'time',l:'마지막 메시지 시간 (예: 1주)',t:'t'}];
function sendMsg(o){const d=D(U.chat);d.msgs.push({id:uid(),from:'me',text:'',img:'',reelUser:'',stamp:'',...o});save();U._bot=1;render()}
/* ---------- actions ---------- */
const A={
 tab:d=>{U.tab=d.t;U.chat=null;U.q='';render()},
 toast:d=>toast(d.m),
 like:d=>{const p=P(d.id);p.liked=!p.liked;if(isN(p.likes))p.likes=Number(String(p.likes).replace(/,/g,''))+(p.liked?1:-1);fin()},
 save:d=>{const p=P(d.id);p.saved=!p.saved;fin()},
 pd:d=>{U.pd=d.id;renderPD()},pdx:()=>{U.pd=null;renderPD()},
 pmenu:d=>{const p=P(d.id);sheet('',[['수정',()=>postForm(p)],['삭제',()=>{S.posts=S.posts.filter(x=>x!==p);U.pd=null;fin()},'d']])},
 newpost:()=>postForm(newPost(),1),
 csend:()=>{const i=$('#pci'),t=i.value.trim();if(!t)return;const p=P(U.pd);p.comments.push({id:uid(),u:S.me.id,t});if(isN(p.commentCount))p.commentCount=Number(String(p.commentCount).replace(/,/g,''))+1;fin();setTimeout(()=>$('#pci')?.focus(),0)},
 cdel:d=>{const p=P(U.pd);p.comments=p.comments.filter(c=>c.id!==d.id);if(isN(p.commentCount)&&p.commentCount>0)p.commentCount=Number(p.commentCount)-1;fin()},
 story:d=>{U.story=+d.i;renderST()},sx:()=>{U.story=null;renderST();render()},snext:stNext,
 sprev:()=>{U.story=Math.max(0,U.story-1);renderST()},
 smenu:()=>{clearTimeout(ST_T);const s=seq()[U.story];sheet('스토리',[['수정',()=>{U.story=null;renderST();form('스토리 수정',[{k:'user',l:'계정명',t:'t'},{k:'avatar',l:'프로필 사진',t:'i'},{k:'img',l:'스토리 이미지',t:'i'}],s,v=>Object.assign(s,v),()=>{S.stories=S.stories.filter(x=>x!==s)})}],['삭제',()=>{U.story=null;S.stories=S.stories.filter(x=>x!==s);renderST();fin()},'d']]);},
 newstory:()=>{const s={id:uid(),user:S.me.id,avatar:S.me.avatar,img:'',seen:0};form('새 스토리',[{k:'user',l:'계정명',t:'t'},{k:'avatar',l:'프로필 사진',t:'i'},{k:'img',l:'스토리 이미지',t:'i'}],s,v=>{if(!v.img)v.img=ph('#889','#334');Object.assign(s,v);S.stories.unshift(s)})},
 acct:()=>sheet('계정',[[S.me.id+' ✓',()=>{}],['계정 정보 편집',A.editme]]),
 editme:()=>form('프로필 편집',[{k:'id',l:'사용자 아이디',t:'t'},{k:'name',l:'이름',t:'t'},{k:'avatar',l:'프로필 사진',t:'i'},{k:'bio',l:'소개글',t:'a'},{k:'link',l:'외부 링크',t:'t'},{k:'mutual',l:'공통 팔로워 문구',t:'t'},{k:'postsN',l:'게시물 수 (비우면 자동)',t:'t'},{k:'followers',l:'팔로워 수',t:'t'},{k:'following',l:'팔로잉 수',t:'t'},{k:'note',l:'DM 메모',t:'t'}],S.me,v=>{const old=S.me.id;Object.assign(S.me,v);if(old!==v.id)S.posts.forEach(p=>{if(p.user===old)p.user=v.id});S.stories.forEach(s=>{if(s.user===old)s.user=v.id})}),
 sfol:d=>{const s=S.sugg.find(x=>x.id===d.id);s.on=!s.on;if(isN(S.me.following))S.me.following=Number(S.me.following)+(s.on?1:-1);fin()},
 sdel:d=>{S.sugg=S.sugg.filter(x=>x.id!==d.id);fin()},
 sedit:d=>{const s=S.sugg.find(x=>x.id===d.id);form('추천 계정 수정',[{k:'name',l:'계정명',t:'t'},{k:'sub',l:'설명',t:'t'},{k:'avatar',l:'프로필 사진',t:'i'}],s,v=>Object.assign(s,v))},
 newsugg:()=>{const s={id:uid(),name:'',sub:'회원님을 위한 추천',avatar:'',on:0};form('추천 계정 추가',[{k:'name',l:'계정명',t:'t'},{k:'sub',l:'설명',t:'t'},{k:'avatar',l:'프로필 사진',t:'i'}],s,v=>{if(!v.name)return;Object.assign(s,v);S.sugg.push(s)})},
 settings:()=>sheet('설정',[['프로필 편집',A.editme],['새 스토리 추가',A.newstory],['JSON 내보내기',()=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(S,null,1)],{type:'application/json'}));a.download='instagram-sim.json';a.click()}],['JSON 가져오기',()=>$('#jf').click()],['초기화',()=>{if(confirm('모든 데이터를 초기화할까요?')){S=def();U={tab:'home',chat:null,pd:null,story:null,q:''};fin()}},'d']]),
 note:()=>form('내 메모',[{k:'note',l:'메모',t:'t'}],S.me,v=>Object.assign(S.me,v)),
 chat:d=>{U.chat=d.id;render()},back:()=>{U.chat=null;render()},
 newchat:()=>{const d={id:uid(),name:'',handle:'',avatar:'',ring:0,online:0,sub:'',time:'방금',msgs:[]};form('새 대화',CF,d,v=>{if(!v.name&&!v.handle)return;Object.assign(d,v);S.dms.unshift(d);U.chat=d.id})},
 cedit:()=>{const d=D(U.chat);form('대화 상대 편집',CF,d,v=>Object.assign(d,v),()=>{S.dms=S.dms.filter(x=>x!==d);U.chat=null})},
 mmenu:d=>{const dm=D(U.chat),m=dm.msgs.find(x=>x.id===d.id);sheet('',[['수정',()=>msgForm(dm,m)],['삭제',()=>{dm.msgs=dm.msgs.filter(x=>x!==m);fin()},'d']])},
 send:()=>{const i=$('#ci'),t=i.value.trim();if(t)sendMsg({text:t})},
 pick:d=>{U.pk=d.t;$('#gf').click()},
 emoji:()=>{const i=$('#ci');i.value+='😊';i.dispatchEvent(new Event('input'));i.focus()},
 cplus:()=>{const dm=D(U.chat);sheet('추가',[['상대 메시지 추가',()=>msgForm(dm,{id:uid(),from:'th'},1)],['내 메시지 추가 (날짜·릴스 등)',()=>msgForm(dm,{id:uid(),from:'me'},1)],['대화 상대 편집',A.cedit]])},
 shi:d=>{const f=SH.items[+d.i][1];shx();f()},shx,
 fok:()=>{const f=F;f.onSave(f.vals);fx();fin()},fx,fdel:()=>{const f=F;fx();f.onDel();fin()},fclr:d=>{F.vals[d.k]='';rForm()}
};
function fin(){save();render()}
document.addEventListener('click',e=>{const t=e.target.closest('[data-a]');if(!t)return;const f=A[t.dataset.a];if(f){e.preventDefault();f(t.dataset,0,e)}});
document.addEventListener('input',e=>{const t=e.target;
 if(t.dataset.k&&F)F.vals[t.dataset.k]=t.type==='checkbox'?t.checked:t.value;
 if(t.id==='dq'){U.q=t.value;$('#dl').innerHTML=dlH()}
 if(t.id==='eq')U.q=t.value;
 if(t.id==='ci'){const h=!!t.value.trim();$('#ic1').style.display=h?'none':'flex';$('#snd').style.display=h?'block':'none'}});
document.addEventListener('change',e=>{const t=e.target;
 if(t.dataset.k&&t.type==='checkbox'&&F)F.vals[t.dataset.k]=t.checked;
 if(t.dataset.fk&&t.files[0])shrink(t.files[0],u=>{F.vals[t.dataset.fk]=u;rForm()})});
document.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.isComposing){if(e.target.id==='ci')A.send();if(e.target.id==='pci')A.csend()}});
$('#gf').onchange=e=>{const f=e.target.files[0];e.target.value='';if(f)shrink(f,u=>sendMsg({img:u}))};
$('#jf').onchange=e=>{const f=e.target.files[0];e.target.value='';if(!f)return;const r=new FileReader();r.onload=()=>{try{const j=JSON.parse(r.result);if(!j.me||!j.posts||!j.dms)throw 0;S=j;U={tab:'home',chat:null,pd:null,story:null,q:''};fin();toast('가져오기 완료')}catch(x){toast('올바른 JSON이 아닙니다')}};r.readAsText(f)};
['gesturestart','gesturechange'].forEach(n=>document.addEventListener(n,e=>e.preventDefault()));
document.addEventListener('dblclick',e=>e.preventDefault());
render();

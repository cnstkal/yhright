const $=s=>document.querySelector(s);
const esc=t=>t.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const A='fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
const IC={
search:`<svg viewBox="0 0 24 24" ${A}><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>`,
addf:`<svg viewBox="0 0 24 24" ${A}><circle cx="10" cy="8" r="3.5"/><path d="M3.500 20c0-3.600 3-6 6.500-6M18 14v6M15 17h6"/></svg>`,
gear:`<svg viewBox="0 0 24 24" ${A}><circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="6.500"/><path d="M12 3v2.500M12 18.500V21M3 12h2.500M18.500 12H21M5.600 5.600l1.800 1.800M16.600 16.600l1.800 1.800M5.600 18.400l1.800-1.800M16.600 7.400l1.800-1.800"/></svg>`,
chev:`<svg viewBox="0 0 24 24" ${A}><path d="M5 9l7 7 7-7"/></svg>`,
close:`<svg width="26" height="26" viewBox="0 0 24 24" ${A}><path d="M5 5l14 14M19 5L5 19"/></svg>`,
back:`<svg viewBox="0 0 24 24" ${A}><path d="M15 5l-7 7 7 7"/></svg>`,
phone:`<svg width="24" height="24" viewBox="0 0 24 24" ${A}><path d="M22 16.920v3a2 2 0 0 1-2.180 2 19.790 19.790 0 0 1-8.630-3.070 19.500 19.500 0 0 1-6-6 19.790 19.790 0 0 1-3.070-8.670A2 2 0 0 1 4.110 2h3a2 2 0 0 1 2 1.720 12.840 12.840 0 0 0 .7 2.810 2 2 0 0 1-.45 2.110L8.090 9.910a16 16 0 0 0 6 6l1.270-1.270a2 2 0 0 1 2.110-.45 12.840 12.840 0 0 0 2.810.7A2 2 0 0 1 22 16.920z"/></svg>`,
phoneS:`<svg width="22" height="22" viewBox="0 0 24 24" ${A}><path d="M22 16.920v3a2 2 0 0 1-2.180 2 19.790 19.790 0 0 1-8.630-3.070 19.500 19.500 0 0 1-6-6 19.790 19.790 0 0 1-3.070-8.670A2 2 0 0 1 4.110 2h3a2 2 0 0 1 2 1.720 12.840 12.840 0 0 0 .7 2.810 2 2 0 0 1-.45 2.110L8.090 9.910a16 16 0 0 0 6 6l1.270-1.270a2 2 0 0 1 2.110-.45 12.840 12.840 0 0 0 2.810.7A2 2 0 0 1 22 16.920z"/></svg>`,
video:`<svg width="24" height="24" viewBox="0 0 24 24" ${A}><rect x="2" y="6" width="13" height="12" rx="2"/><path d="M15 10l6-3v10l-6-3"/></svg>`,
chat:`<svg width="22" height="22" viewBox="0 0 24 24" ${A}><path d="M21 12a8 8 0 0 1-11.600 7.100L4 20l1.200-4.200A8 8 0 1 1 21 12z"/></svg>`,
menu:`<svg width="24" height="24" viewBox="0 0 24 24" ${A}><path d="M4 7h16M4 12h16M4 17h16"/></svg>`,
dots:`<svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="1.800"/><circle cx="12" cy="12" r="1.800"/><circle cx="19" cy="12" r="1.800"/></svg>`,
plus:`<svg width="26" height="26" viewBox="0 0 24 24" ${A}><path d="M12 5v14M5 12h14"/></svg>`,
hash:`<svg width="24" height="24" viewBox="0 0 24 24" ${A}><path d="M9 4L7 20M17 4l-2 16M4 9h16M3 15h16"/></svg>`,
smile:`<svg width="24" height="24" viewBox="0 0 24 24" ${A}><circle cx="12" cy="12" r="9"/><path d="M8.500 14c1 1.500 2 2 3.500 2s2.500-.5 3.500-2M9 9.500v.5M15 9.500v.5"/></svg>`,
star:`<svg width="24" height="24" viewBox="0 0 24 24" ${A}><path d="M12 3l2.800 5.800 6.200.9-4.500 4.400 1.100 6.200L12 17.300 6.400 20.300l1.100-6.200L3 9.700l6.200-.9z"/></svg>`,
newc:`<svg viewBox="0 0 24 24" ${A}><path d="M20 12.500A8 8 0 1 1 11.500 4M4 21l1.500-4.500M18 3v6M15 6h6"/></svg>`,
send:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111" stroke-width="2.600" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>`
};
function fillIcons(r){(r||document).querySelectorAll('[data-i]').forEach(e=>{if(!e.firstChild)e.innerHTML=IC[e.dataset.i]})}

/* avatars */
function av(f,s){
  const [c1,c2]=f.c,id='g'+f.id+'_'+s;let body;
  const bg=`<defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs><rect width="48" height="48" fill="url(#${id})"/>`;
  if(f.a==0)body=bg+`<circle cx="24" cy="19" r="7" fill="#fff" opacity=".7"/><ellipse cx="24" cy="36" rx="11" ry="7" fill="#fff" opacity=".7"/>`;
  else if(f.a==1)body=`<rect width="48" height="48" fill="#fff"/><path d="M11 20l2-10 8 6h6l8-6 2 10c2 10-6 20-13 20S9 30 11 20z" fill="#f3f3f3" stroke="#222" stroke-width="1.500"/><circle cx="19" cy="24" r="2" fill="#222"/><circle cx="29" cy="24" r="2" fill="#222"/><path d="M22 30q2 2 4 0" stroke="#222" fill="none" stroke-width="1.500"/>`;
  else if(f.a==2)body=bg+`<circle cx="24" cy="24" r="10" fill="#fff" opacity=".85"/><path d="M24 6v6M24 36v6M6 24h6M36 24h6" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`;
  else if(f.a==3)body=`<rect width="48" height="48" fill="#20243a"/><circle cx="32" cy="16" r="7" fill="#f6e7a1"/><circle cx="35" cy="14" r="6" fill="#20243a"/><circle cx="12" cy="12" r="1.200" fill="#fff"/><circle cx="18" cy="24" r="1" fill="#fff"/><circle cx="8" cy="30" r="1" fill="#fff"/>`;
  else body=bg+`<path d="M0 40L14 22l9 12 8-9 17 15v8H0z" fill="#fff" opacity=".75"/><circle cx="35" cy="13" r="5" fill="#fff" opacity=".9"/>`;
  return `<div class="av" style="width:${s}px;height:${s}px"><svg viewBox="0 0 48 48">${body}</svg></div>`;
}

/* data */
const P=[['#c9c8fa','#a9a7f2'],['#a9e8de','#7fd3c6'],['#b7dcff','#86bbf7'],['#ffd9b0','#ffb878'],['#ffc9d6','#f59ab4']];
const FTOTAL=721;
const raw=[
['엄마','',0,1,0],['아빠','',0,0,1],['형','',0,0,2],['이모','',0,0,3],
['민재','',0,1,4],['지우','',0,0,5],['하린','',0,0,6],['도윤','',0,0,7],['수빈','',0,0,8],['현우','',0,0,9],['서연','',0,0,10],['태준','',0,0,11],
['서윤 (문라이트)','',0,1,12],['태오 (블루밍)','',0,0,13],['강현 (네온스테이지)','',0,0,14],['유진 (루미너스)','',0,0,15],['시온 (스텔라)','',0,0,16],['하준 (코발트)','',0,0,17],['연우 (프리즘)','',0,0,18],['도경 (미드나잇)','',0,0,19],
['제작팀 김PD','',0,0,20],['스타일리스트 최실장','',0,0,21],['안무 선생님 류쌤','',0,0,22],['보컬 트레이너 오선생','',0,0,23],['사진작가 정원','',0,0,24],['회사 동기 박대리','',0,0,25],['영상편집 나연','',0,0,26],['음향감독 도현','',0,0,27],['디자이너 해솔','',0,0,28],['홍중 (ATEEZ)','',0,0,29],['여상 (ATEEZ)','',0,0,30],['산 (ATEEZ)','',0,0,31],['민기 (ATEEZ)','',0,0,32],['우영 (ATEEZ)','',0,0,33],['종호 (ATEEZ)','',0,0,34],['A매니저형','',0,0,35],['B매니저','',0,0,36],['형수님','',0,0,37]];
const BG=['#7b8794','#8a7f9a','#6f8f8b','#9a8575','#6f84a3','#8b7d86'];
const DD=[[['D+412','함께한 날']],[],[['D+88','새 프로필']],[],[['D-12','생일'],['D+731','친구가 된 날']]];
const friends=raw.map((r,i)=>({id:i+1,n:r[0],s:r[1],a:r[2],fav:!!r[3],ord:r[4],c:P[i%5],bg:BG[i%6],dd:DD[i%5]}));
const groups={101:{id:101,n:'친구 단톡',grp:[5,6,7,8,9,10,11,12],c:P[0],bg:BG[0],dd:[]},102:{id:102,n:'작업팀 단톡',grp:[20,21,22,23,24,25,26],c:P[1],bg:BG[1],dd:[]},103:{id:103,n:'가족 단톡',grp:[1,2,3,4],c:P[2],bg:BG[2],dd:[]},104:{id:104,n:'ATEEZ',grp:[30,31,32,33,34,35],c:P[3],bg:BG[3],dd:[]},105:{id:105,n:'ATEEZ (매니저 포함)',grp:[30,31,32,33,34,35,36,37],c:P[4],bg:BG[4],dd:[]},106:{id:106,n:'가족',grp:[1,2,3],c:P[0],bg:BG[0],dd:[]}};
const byId=id=>friends.find(f=>f.id==id)||groups[id];

function dOff(o){const d=new Date();d.setDate(d.getDate()+o);return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
const chats={};
function seed(id,rows){chats[id]=rows.map(r=>({me:r[0]==1,t:r[1],x:r[2],tm:r[3],d:dOff(r[4]||0),u:!!r[5],w:r[6]}))}
const unread={};
const tot=()=>Object.values(unread).reduce((a,b)=>a+b,0);
let clf='all';
let sort='ko',open={fav:true,fr:true},cur=null,nav=['list'];

/* list */
function gav(g,s){const m=g.grp.slice(0,4).map(i=>byId(i));const h=s/2;return `<div class="av" style="width:${s}px;height:${s}px;display:grid;grid-template-columns:1fr 1fr;gap:0">${m.map(x=>`<div style="width:${h}px;height:${h}px;overflow:hidden">${av(x,h).replace(/style="width:[^"]*;height:[^"]*"/,'style="width:100%;height:100%;border-radius:0"')}</div>`).join('')}</div>`}
function row(f){return `<div class="fr" data-id="${f.id}">${av(f,48)}<div class="tx"><div class="n">${esc(f.n)}</div>${f.s?`<div class="s">${esc(f.s)}</div>`:''}</div></div>`}
function renderList(){
  const fav=friends.filter(f=>f.fav),rest=friends.filter(f=>!f.fav);
  rest.sort(sort=='ko'?(a,b)=>a.n.localeCompare(b.n,'ko'):(a,b)=>a.ord-b.ord);
  $('#lsc').innerHTML=
   `<div class="sh ${open.fav?'':'cl'}" data-t="fav"><span>즐겨찾는 친구 ${fav.length}</span><span class="sp"></span><span class="ch">${IC.chev}</span></div>`+
   (open.fav?fav.map(row).join(''):'')+
   `<div class="sh ${open.fr?'':'cl'}" data-t="fr"><span>친구 ${FTOTAL}</span><span class="sp"></span>
     <span class="seg"><button data-s="ko" class="${sort=='ko'?'on':''}">가나다순</button><button data-s="add" class="${sort=='add'?'on':''}">친구추가순</button></span><span class="ch">${IC.chev}</span></div>`+
   (open.fr?rest.map(row).join(''):'');
}
$('#lsc').addEventListener('click',e=>{
  const s=e.target.closest('[data-s]');if(s){sort=s.dataset.s;renderList();return}
  const t=e.target.closest('[data-t]');if(t){open[t.dataset.t]=!open[t.dataset.t];renderList();return}
  /* 프로필 상세 열기 비활성화 */
});

/* tabs */
function tabsHTML(a){return `<div data-tab="0"><svg width="30" height="30" viewBox="0 0 30 30" fill="${a==0?'#2a2d3a':'#b9bec6'}"><circle cx="15" cy="10" r="6"/><path d="M3.500 26c0-5 5-8 11.500-8s11.500 3 11.500 8c0 1.200-.8 2-2 2h-19c-1.200 0-2-.8-2-2z"/></svg></div>
  <div data-tab="1"><svg width="32" height="30" viewBox="0 0 32 30" fill="${a==1?'#2a2d3a':'#b9bec6'}"><path d="M16 4C8.800 4 3 8.500 3 14c0 3 1.700 5.700 4.400 7.500L6 27l5.800-3c1.300.3 2.800.5 4.200.5 7.200 0 13-4.500 13-10S23.200 4 16 4z"/></svg>${tot()?`<span class="bdg">${tot()}</span>`:''}</div>
  <div><svg width="34" height="30" viewBox="0 0 34 30" fill="#b9bec6"><path d="M13 3C7 3 2 7 2 12c0 2.500 1.200 4.700 3.200 6.300L4 23l4.800-2.500c1.300.4 2.700.6 4.200.6 6 0 11-4 11-9s-5-9-11-9z"/><path d="M22 10c5 0 10 3.500 10 8 0 2.200-1.100 4.100-2.900 5.500L30 27l-4.400-2.200c-1 .3-2.300.5-3.600.5-4.300 0-8-1.800-9.600-4.500 7-.3 11.600-4.100 9.600-10.800z" opacity=".75"/><path d="M10.500 8.500l5 3.500-5 3.500z" fill="#fff"/></svg></div>
  <div><svg width="30" height="30" viewBox="0 0 30 30" fill="#b9bec6"><path d="M7 11h16l2 15H5z"/><path d="M10.500 12V9a4.500 4.500 0 0 1 9 0v3" fill="none" stroke="#b9bec6" stroke-width="2.200"/></svg></div>
  <div><svg width="34" height="30" viewBox="0 0 34 30" fill="#b9bec6"><circle cx="7" cy="17" r="2.500"/><circle cx="17" cy="17" r="2.500"/><circle cx="27" cy="17" r="2.500"/></svg><span class="rd" style="margin-left:12px"></span></div>`}
function drawTabs(){document.querySelectorAll('.tabs').forEach(e=>e.innerHTML=tabsHTML(+e.dataset.tabs))}


document.addEventListener('click',e=>{const t=e.target.closest('[data-tab]');if(!t)return;
  if(t.dataset.tab==='0'){nav=['list'];show('list');renderList()}
  else{nav=['list','chatlist'];show('chatlist');renderCL()}});
/* nav */
function barTone(c){const b=document.querySelector('.sys-bar');if(!b)return;if(b._o===undefined)b._o=b.style.background;b.style.background=c?'#b2c4d4':b._o}
function show(n){document.querySelectorAll('.scr').forEach(s=>s.classList.toggle('on',s.id==n));barTone(n=='chat')}
function go(n,id){if(id){cur=id;delete unread[id];drawTabs()}nav.push(n);show(n);if(n=='profile')renderProfile();if(n=='chat')renderChat();if(n=='chatlist')renderCL()}
function back(){if(nav.length>1)nav.pop();const n=nav[nav.length-1];show(n);if(n=='list')renderList();if(n=='profile')renderProfile();if(n=='chatlist')renderCL()}
$('#pclose').onclick=back;$('#cback').onclick=back;

/* profile */
function thumb(f,i){
  const sd=f.id*7+i,h=(sd*47)%360,k=sd%3;
  const sh=k==0?`<circle cx="50" cy="45" r="22" fill="#fff" opacity=".55"/>`:k==1?`<path d="M0 100L35 50l25 30 15-18 25 38z" fill="#fff" opacity=".5"/>`:`<rect x="25" y="25" width="50" height="50" rx="12" fill="#fff" opacity=".5" transform="rotate(${sd*9%40} 50 50)"/>`;
  return `<div><svg viewBox="0 0 100 133" preserveAspectRatio="xMidYMid slice" width="100%" height="100%"><defs><linearGradient id="t${sd}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="hsl(${h},60%,72%)"/><stop offset="1" stop-color="hsl(${(h+45)%360},55%,42%)"/></linearGradient></defs><rect width="100" height="133" fill="url(#t${sd})"/><g transform="translate(0,16)">${sh}</g></svg></div>`;
}
function renderProfile(){
  const f=byId(cur);
  $('#profile').style.background=f.bg;
  $('#pstar').style.color=f.fav?'#f2b800':'';
  $('#pstar').querySelector('svg').setAttribute('fill',f.fav?'#f2b800':'none');
  $('#pscroll').innerHTML=
   `<div class="hero">${f.dd.length?`<div class="dd">${f.dd.map(d=>`<div><b>${d[0]}</b>${esc(d[1])}</div>`).join('')}</div>`:''}
    ${av(f,64)}<div class="pname">${esc(f.n)}</div>
    <div class="pbtn"><button>${IC.phoneS}통화</button><button>${IC.video}페이스톡</button><button id="pchat">${IC.chat}1:1 채팅</button></div></div>
    <div class="grid">${Array.from({length:9},(_,i)=>thumb(f,i)).join('')}</div>`;
  $('#pscroll').scrollTop=0;
  $('#pchat').onclick=()=>go('chat',f.id);
}
$('#pstar').onclick=()=>{const f=byId(cur);f.fav=!f.fav;renderProfile()};

/* chat */
const tm=s=>{let[h,m]=s.split(':').map(Number);const p=h<12?'오전':'오후';h=h%12||12;return `${p} ${h}:${String(m).padStart(2,'0')}`};
const dl=d=>{const x=new Date(d+'T00:00');return `${x.getFullYear()}년 ${x.getMonth()+1}월 ${x.getDate()}일 ${'일월화수목금토'[x.getDay()]}요일`};
function stk(k){const f=[`<ellipse cx="50" cy="58" rx="36" ry="32" fill="#fff" stroke="#222" stroke-width="3"/><circle cx="38" cy="52" r="3.500" fill="#222"/><circle cx="62" cy="52" r="3.500" fill="#222"/><path d="M40 72q10-7 20 0" stroke="#222" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M36 42q-4 6-2 12" stroke="#222" stroke-width="2" fill="none"/>`,
`<circle cx="50" cy="50" r="38" fill="#ffd54a" stroke="#222" stroke-width="3"/><circle cx="37" cy="44" r="3.500" fill="#222"/><circle cx="63" cy="44" r="3.500" fill="#222"/><path d="M34 60q16 18 32 0" stroke="#222" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="30" cy="58" r="5" fill="#ff9a8a" opacity=".7"/><circle cx="70" cy="58" r="5" fill="#ff9a8a" opacity=".7"/>`,
`<path d="M50 84C20 62 12 44 24 28c10-12 22-6 26 4 4-10 16-16 26-4 12 16 4 34-26 56z" fill="#ff6f91" stroke="#222" stroke-width="3" stroke-linejoin="round"/><circle cx="40" cy="46" r="3" fill="#222"/><circle cx="60" cy="46" r="3" fill="#222"/>`][k%3];
  return `<svg viewBox="0 0 100 100">${f}</svg>`}
function imgm(){return `<svg viewBox="0 0 200 150" width="200" height="150"><defs><linearGradient id="sk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8ec5ff"/><stop offset="1" stop-color="#ffe3b3"/></linearGradient></defs><rect width="200" height="150" fill="url(#sk)"/><circle cx="150" cy="40" r="16" fill="#fff6c9"/><path d="M0 110C40 70 80 90 120 100s60-20 80-10v60H0z" fill="#6fbf8a"/><path d="M0 130c50-20 100 0 200-10v30H0z" fill="#4a9c6d"/></svg>`}
function renderChat(){
  const f=byId(cur),L=chats[cur]=chats[cur]||[];
  $('#ctitle').textContent=f.n;$('#bkn').textContent=tot()||'';
  let h='';
  L.forEach((m,i)=>{
    const p=L[i-1],n=L[i+1],s=m.w?byId(m.w):f;
    if(!p||p.d!=m.d)h+=`<div class="dv"><span>${dl(m.d)}</span></div>`;
    const first=!p||p.me!=m.me||p.d!=m.d||p.w!=m.w,last=!n||n.me!=m.me||n.d!=m.d||n.tm!=m.tm;
    let c=m.t=='t'?`<div class="bl f">${esc(m.x)}</div>`:m.t=='i'?`<div class="imgm">${imgm()}</div>`:`<div class="stk">${stk(m.k||0)}</div>`;
    if(m.t=='k')c=`<div class="stk">${stk(+m.x||0)}</div>`;
    if(m.t=='t'&&!first)c=c.replace(' f"','"');
    const meta=`<div class="meta">${m.u?'<i>1</i>':''}${last?tm(m.tm):''}</div>`;
    if(m.me)h+=`<div class="rw me ${first?'first':''}">${meta}${c}</div>`;
    else h+=`<div class="rw you ${first?'first':''}">${first?av(s,40).replace('class="av"','class="av" style="margin-right:8px;align-self:flex-start;width:40px;height:40px"').replace(/style="width:40px;height:40px"/,''):'<div class="sp40"></div>'}<div>${first?`<div class="who">${esc(s.n)}</div>`:''}<div style="display:flex;align-items:flex-end">${c}${meta}</div></div></div>`;
  });
  $('#msgs').innerHTML=h;
  $('#msgs').scrollTop=1e9;
  upd();
}
function upd(){const has=$('#ti').value.trim();$('#rgt').className='ib'+(has?' y':'');$('#rgt').innerHTML=has?IC.send:IC.hash}
function push(m){
  const d=new Date(),L=chats[cur]=chats[cur]||[];
  const o={me:true,t:m.t,x:m.x,tm:String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0'),d:dOff(0),u:true};
  L.push(o);renderChat();
  const id=cur;setTimeout(()=>{o.u=false;if(cur==id&&$('#chat').classList.contains('on'))renderChat()},1500);
}
function send(){const v=$('#ti').value.trim();if(!v)return;$('#ti').value='';push({t:'t',x:v});}
$('#rgt').onclick=send;
$('#ti').addEventListener('keydown',e=>{if(e.key=='Enter'&&!e.isComposing){e.preventDefault();send()}});
$('#ti').addEventListener('input',upd);
$('#plus').onclick=()=>push({t:'i'});
$('#emo').onclick=()=>$('#tray').classList.toggle('on');
$('#tray').innerHTML=[0,1,2].map(k=>`<button data-k="${k}">${stk(k)}</button>`).join('');
$('#tray').onclick=e=>{const b=e.target.closest('[data-k]');if(b){push({t:'k',x:b.dataset.k});$('#tray').classList.remove('on')}};


/* chat list */
function pv(m){return m.t=='t'?m.x:m.t=='i'?'사진을 보냈습니다.':'이모티콘을 보냈습니다.'}
function ct(m){const d=m.d;if(d==dOff(0))return tm(m.tm);if(d==dOff(-1))return '어제';const x=new Date(d+'T00:00');return (x.getMonth()+1)+'월 '+x.getDate()+'일'}
function renderCL(){
  const t=tot();
  $('#clp').innerHTML=`<button class="pill ${clf=='all'?'k':''}" data-f="all">전체</button><button class="pill ${clf=='un'?'k':''}" data-f="un">안읽음${t?` <span class="ub">${t}</span>`:''}</button>`;
  let ids=Object.keys(chats).filter(i=>chats[i].length&&byId(i)).sort((a,b)=>{const x=chats[a].slice(-1)[0],y=chats[b].slice(-1)[0];return (y.d+y.tm).localeCompare(x.d+x.tm)});
  if(clf=='un')ids=ids.filter(i=>unread[i]);
  $('#clsc').innerHTML=ids.map(i=>{const f=byId(i),m=chats[i].slice(-1)[0];
    return `<div class="fr cr" data-c="${i}">${f.grp?gav(f,52):av(f,52)}<div class="tx" style="flex:1"><div class="n">${esc(f.n)}</div><div class="s">${esc(pv(m))}</div></div><div class="rt"><span>${ct(m)}</span>${unread[i]?`<b>${unread[i]}</b>`:''}</div></div>`}).join('')||'<div style="padding:60px 20px;text-align:center;color:#aaa">대화가 없습니다</div>';
  drawTabs();
}
$('#clp').addEventListener('click',e=>{const b=e.target.closest('[data-f]');if(b){clf=b.dataset.f;renderCL()}});
$('#clsc').addEventListener('click',e=>{const r=e.target.closest('[data-c]');if(r)go('chat',+r.dataset.c)});
seed(101,[
[0,'t','얘들아 주말에 뭐함?','20:10',-1,0,5],[0,'t','나 그냥 집ㅋㅋ','20:12',-1,0,5],[1,'t','나도 집이야 ㅠ','20:15',-1],
[0,'t','다음주에 한번 모이자','20:20',-1,0,6],[0,'t','좋아 ㄱㄱ','20:21',-1,0,9],[1,'t','장소 정하자','20:25',-1],
[0,'t','우리 집 근처 어때','20:31',0,0,7],[0,'t','ㅋㅋㅋ 너 항상 그 얘기다','20:33',0,0,8],[0,'t','사진 찍어서 올릴게 ㅎㅎ','20:40',0,0,10],[0,'t','그건 기대 안 할게','20:41',0,0,11],[1,'t','ㅋㅋㅋㅋㅋ','20:43',0,0,12]]);
seed(102,[
[0,'t','내일 일정 확인하셨죠?','09:02',-1,0,20],[1,'t','네 확인했습니다','09:05',-1],[0,'t','9시까지 집합입니다','09:06',-1,0,21],
[0,'t','ㅇㅋ 늦지 않을게요','09:10',-1,0,22],[0,'t','차 가져오시는 분?','09:14',-1,0,23],[1,'t','저 가져갈게요','09:16',-1],
[0,'t','의상 사이즈 확인 다시 부탁드려요','09:20',-1,0,24],[0,'t','감사합니다 ㅎㅎ','09:17',-1,0,25],[0,'t','이따 봬요~','09:40',0,0,26]]);
seed(103,[
[0,'t','밥 먹었니?','12:30',-1,0,2],[1,'t','응 먹었어','12:31',-1],[0,'t','너 주말에 집 올 거야?','12:33',-1,0,3],
[0,'t','나 토요일 갈게','12:40',-1,0,4],[1,'t','ㅇㅇ 간다','12:42',0]]);
seed(1,[
[0,'t','성화야 밥은 먹었어?','12:10',-1,0,1],[1,'t','응 먹었어 엄마','12:25',-1],[0,'t','냉장고에 반찬 넣어놨다. 주말에 집 한번 와','12:30',-1,0,1],[1,'t','알겠어 시간 되면 갈게','12:31',0]]);
seed(5,[
[0,'t','야 이번 주 토요일 시간 돼?','21:04',-1,0,5],[1,'t','어 왜','21:10',-1],[0,'t','그냥 같이 밥이나 먹자 ㅋㅋ','21:11',-1,0,5],[0,'t','아 그리고 지난번 빌려준 우산 가져와','21:11',0,0,5]]);
seed(13,[
[0,'t','성화 너 그 노래 연습 영상 봤어? 진짜 좋더라','23:12',-1,0,13],[1,'t','헐 고마워 ㅠㅠ 다음 주에 공개할게','23:30',-1],[0,'t','기대할게!!','23:31',0,0,13]]);
seed(20,[
[0,'t','내일 촬영 콘셉트 시안 보내드렸어요','18:02',-1,0,20],[1,'t','확인했어요 좋아요','18:15',-1],[0,'t','그럼 의상은 어제 얘기한 걸로 가요','18:16',-1,0,20],[1,'t','네 그걸로 해요','18:20',0]]);
/* init */
$('#me').innerHTML=av({id:0,a:0,c:P[0]},44);
renderList();drawTabs();fillIcons();
document.querySelector('#chat .inp #rgt').innerHTML=IC.hash;
function clock(){const d=new Date();$('#clock').textContent=d.getHours()%12||12+':'+String(d.getMinutes()).padStart(2,'0');$('#clock').textContent=(d.getHours()%12||12)+':'+String(d.getMinutes()).padStart(2,'0')}
clock();setInterval(clock,20000);
const app=$('#app');
function fit(){const W=420,iw=innerWidth,ih=innerHeight;let s,H,l=0,t=0;
  if(iw<=500){s=iw/W;H=ih/s}else{H=W*16/9;s=Math.min(iw/W,ih/H);l=(iw-W*s)/2;t=(ih-H*s)/2}
  app.style.cssText=`width:${W}px;height:${H}px;transform:scale(${s});left:${l}px;top:${t}px`}
fit();addEventListener('resize',fit);

const $=s=>document.querySelector(s),K='dc_yuyu_v3';
const GAL='yuyu ai',HEADS=['일반','번역','정보','창작','애니','드라마','무대','리뷰','스포'];
const IMG='';
const sp=(id,t,h,w,fx,d,v,r,cm,ty,ip)=>({id,t,h,w,fx,d,v,r,cm,ty,body:t,ip:ip||''});
function seed(){const p=[
sp(1,"업데이트 아직 안됐냐","일반","ㅇㅇ",0,"09.07",12,0,0,"t","112.160"),
sp(2,"버그 찾았다 ㅋㅋ","일반","ㅇㅇ",0,"09.14",9,0,0,"t","112.160"),
sp(3,"이거 섭종 안했냐","일반","ㅇㅇ",0,"09.19",6,0,0,"t","39.7"),
sp(4,"아직 업뎃 없음?","일반","ㅇㅇ",0,"09.21",15,0,0,"t","112.160"),
sp(5,"버그 또 있네 나만 그런가","일반","ㅇㅇ",0,"09.28",7,0,0,"t","112.160"),
sp(6,"아직도 하는 사람 있네","일반","ㅇㅇ",0,"10.02",4,0,0,"t","175.214"),
sp(7,"업데이트 안됐냐 진짜로","일반","ㅇㅇ",0,"10.05",11,0,0,"t","112.160"),
sp(8,"그래도 아직 쓴다","일반","ㅇㅇ",0,"10.12",8,0,0,"t","112.160"),
sp(9,"버그 찾았다고 했잖아","일반","ㅇㅇ",0,"10.19",14,0,0,"t","112.160")];
return{posts:p,cmts:[],visited:[],votes:{},nid:10,cid:1,me:'ㅇㅇ'}}
let S;try{S=JSON.parse(localStorage.getItem(K))}catch(e){}if(!S)S=seed();
const ipPart=()=>{const l=Math.random()<.5?2:3;return String(l===2?10+Math.floor(Math.random()*90):100+Math.floor(Math.random()*900));};
const randIp=()=>`${ipPart()}.${ipPart()}`;
S.posts.forEach(p=>{p.w='ㅇㅇ';p.ip=p.ip||randIp();p.v=Math.min(100,Math.max(0,Number(p.v)||0));p.img='';p.ty='t';});
S.cmts.forEach(c=>{c.n='ㅇㅇ';c.ip=c.ip||randIp();c.fx=0;});
if(!S.dm){S.dm=1;let i=100;const T=[['치요치요','여기는 콜라보 진짜 자주 하네','10.18 20:24'],['에리피요','ㄹㅇ 굿즈도 괜찮음','10.18 20:45'],['치요치요','https://youtu.be/yrgOHMuy0U0?si=TlHzFEFdujQQkAzf\n저도 이거 보고 왔음 ㅇㅅㅇ','10.18 21:05'],['에리피요','@치요치요\n'+IMG,'10.18 21:06']];
[15,16,14,11,10,7,2].forEach((pid,k)=>{if(!S.posts.some(p=>p.id==pid))return;const t=T.slice(0,k%2?3:4),top=i++;
S.cmts.push({id:top,pid,pr:null,n:T[0][0],fx:1,t:T[0][1],d:t[0][2]});
t.slice(1).forEach(c=>S.cmts.push({id:i++,pid,pr:top,n:c[0],fx:1,t:c[1],d:c[2]}))});
S.cid=Math.max(S.cid,i)}
const save=()=>{try{localStorage.setItem(K,JSON.stringify(S))}catch(e){alert('저장 용량 초과(이미지 제거 필요)')}};
const Q={tab:'all',head:'전체',n:30,q:'',sort:'asc',reply:null,pending:[]};
const P={menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/>',pen:'<path d="M4 20l1-5L16 4l4 4L9 19zM14 6l4 4"/>',star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z" fill="currentColor"/>',b:'<circle cx="12" cy="12" r="9"/><path d="M10 7h3a2 2 0 010 4h-3zM10 11h3.5a2 2 0 010 4H10zM10 7v8"/>',rf:'<path d="M20 12a8 8 0 11-3-6.2M20 4v5h-5"/>',x:'<path d="M6 6l12 12M18 6L6 18"/>',phone:'<rect x="7" y="3" width="10" height="18" rx="2"/>',smile:'<circle cx="12" cy="12" r="9"/><path d="M8 14a5 4 0 008 0M9 9.5v.5M15 9.5v.5"/>',t:'<path d="M6 7V5h12v2M12 5v14M9 19h6"/>',mic:'<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0014 0M12 18v3"/>',chk:'<path d="M5 12l5 5 9-10"/>'};
const I=n=>`<svg class="sv" viewBox="0 0 24 24">${P[n]}</svg>`;
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const fixI=o=>'';
const fd=p=>{const d=p.d,z=n=>String(n).padStart(2,'0');if(/^\d{4}\.\d\d\.\d\d \d\d:\d\d:\d\d$/.test(d))return d;if(/^\d{4}\./.test(d))return d+':'+z(p.id*7%60);return'2026.'+d+' '+z(8+p.id*5%15)+':'+z(p.id*13%60)+':'+z(p.id*29%60)};
const G='#a0a3ae',sv=(b,c)=>`<svg class="${c||'ia'}" viewBox="0 0 24 24">${b}</svg>`;
const LI={i:sv('<path d="M4 4h16a2 2 0 012 2v9a2 2 0 01-2 2h-8l-5 4v-4H4a2 2 0 01-2-2V6a2 2 0 012-2z" fill="#c8c8cc"/><circle cx="8" cy="10.5" r="1.3" fill="#fff"/><circle cx="12" cy="10.5" r="1.3" fill="#fff"/><circle cx="16" cy="10.5" r="1.3" fill="#fff"/>','li'),
n:sv('<path d="M4 4h16a2 2 0 012 2v9a2 2 0 01-2 2h-8l-5 4v-4H4a2 2 0 01-2-2V6a2 2 0 012-2z" fill="#c8c8cc"/><circle cx="8" cy="10.500" r="1.300" fill="#fff"/><circle cx="12" cy="10.500" r="1.300" fill="#fff"/><circle cx="16" cy="10.500" r="1.300" fill="#fff"/>','li'),
c:sv('<circle cx="12" cy="12" r="11" fill="#5b63a8"/><path d="M12 5.500l1.900 4 4.300.5-3.200 3 .9 4.300L12 15l-3.900 2.300.9-4.300-3.200-3 4.300-.5z" fill="none" stroke="#fff" stroke-width="1.600" stroke-linejoin="round"/>','li')};
const AI={b:sv(`<circle cx="12" cy="12" r="10" fill="${G}"/><path d="M9.500 7h3.200a2.200 2.200 0 010 4.400H9.500zM9.500 11.400h3.700a2.300 2.300 0 010 4.600H9.500zM9.500 7v9" stroke="#fff" stroke-width="2" fill="none"/>`),
rp:sv('<path d="M4 12V9a3 3 0 013-3h11M15 2.500l3.500 3.500L15 9.500M20 12v3a3 3 0 01-3 3H6M9 14.500L5.500 18 9 21.500" stroke="#3d8ef0" stroke-width="2.600" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'),
sh:sv(`<g fill="${G}" stroke="${G}" stroke-width="1.600"><circle cx="18" cy="5.500" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="18.500" r="3"/><path d="M8.500 10.500l7-3.600M8.500 13.500l7 3.600"/></g>`),
fd:sv(`<path d="M2 6a2 2 0 012-2h5l2 2.500h9a2 2 0 012 2V18a2 2 0 01-2 2H4a2 2 0 01-2-2z" fill="${G}"/><path d="M12 10.500v6M9 13.500h6" stroke="#fff" stroke-width="2.200"/>`),
rd:sv('<path d="M5 19v-5a7 7 0 0114 0v5z" fill="#c62828"/><rect x="3" y="19" width="18" height="2.500" rx="1" fill="#c62828"/><path d="M12 2v3M4.500 5.500l2 2M19.500 5.500l-2 2" stroke="#c62828" stroke-width="2" stroke-linecap="round"/>'),
ph:'<svg class="ph" viewBox="0 0 24 24"><rect x="6" y="2.500" width="12" height="19" rx="2.500" fill="none" stroke="#3b4890" stroke-width="2.400"/><circle cx="12" cy="18" r="1" fill="#3b4890"/></svg>'};
function rich(t){return esc(t).replace(/(data:image[^\s]+|https?:\/\/[^\s]+\.(?:png|jpe?g|gif|webp)(?:\?[^\s]*)?)/g,'<img src="$1">').replace(/(^|\s|\n)(https?:\/\/[^\s<]+)(?![^<]*>)/g,'$1<a class="u" href="$2" target="_blank" rel="noopener">$2</a>').replace(/(^|\s)(@[^\s<]+)/g,'$1<span class="mt">$2</span>')}
const now=()=>{const d=new Date(),z=n=>String(n).padStart(2,'0');return{l:`${z(d.getMonth()+1)}.${z(d.getDate())}`,c:`${z(d.getMonth()+1)}.${z(d.getDate())} ${z(d.getHours())}:${z(d.getMinutes())}`,f:`${d.getFullYear()}.${z(d.getMonth()+1)}.${z(d.getDate())} ${z(d.getHours())}:${z(d.getMinutes())}:${z(d.getSeconds())}`}};
const go=h=>{location.hash=h};
const cnt=id=>S.cmts.filter(c=>c.pid==id).length;
function head(){return`<div class="nv"><div class="hd"><div class="logo">탭</div><div class="sb"><span class="mn">${I('menu')}</span><input id="q" placeholder="게시판 & 통합검색" value="${esc(Q.q)}"><span class="sg" id="sgo">${I('search')}</span><span class="rc">최근 방문</span></div></div>
<div class="mnu"><a>게시판</a><a class="on">주제판</a><a>소모임</a><a>인물판</a><a>내 활동</a><a>이벤트</a></div></div>
<div class="gt"><h1 data-go="#/" style="cursor:pointer">${GAL} <small>(${S.posts.length.toLocaleString()})</small></h1><span class="lk">${I('info')} 설정 연관</span><button class="wb" data-go="#/w">글쓰기</button></div>`}
function bindHead(){const q=$('#q');if(!q)return;q.onkeydown=e=>{if(e.key==='Enter')doS()};$('#sgo').onclick=doS;
function doS(){Q.q=q.value.trim();Q.tab='all';Q.head='전체';go('#/');render()}
document.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>go(b.dataset.go))}
function list(){
let ps=S.posts.slice().sort((a,b)=>b.id-a.id);
if(Q.tab==='rec')ps=ps.filter(p=>p.r>=5);
if(Q.tab==='no')ps=ps.filter(p=>p.notice);
if(Q.head!=='전체')ps=ps.filter(p=>p.h===Q.head);
if(Q.q)ps=ps.filter(p=>(p.t+p.body+p.w).toLowerCase().includes(Q.q.toLowerCase()));
ps=ps.slice(0,Q.n);
const rows=ps.map(p=>{const ty='i',vis=S.visited.includes(p.id);
return`<div class="row" data-id="${p.id}"><div class="m"><div class="t${vis?' v':''}">${LI[ty||'i']}<span class="x">${esc(p.t)}</span></div>
<div class="s">${esc(p.h)}<i>|</i>${esc(p.w)}${p.ip?'('+esc(p.ip)+')':''}${fixI(p.fx)}<i>|</i>${p.dl||p.d.slice(0,5)}<i>|</i>조회 ${p.v}<i>|</i>추천 <span class="${p.r>=5?'up':''}">${p.r}</span></div></div><div class="cm">${cnt(p.id)}</div></div>`}).join('');
$('#app').innerHTML=head()+`<div class="tabs">${[['all','전체'],['rec','개념글'],['no','공지']].map(([k,l])=>`<button data-t="${k}" class="${Q.tab===k?'on':''}">${l}</button>`).join('')}<select id="nn">${[30,50,100].map(n=>`<option ${n==Q.n?'selected':''} value="${n}">${n}개</option>`).join('')}</select></div>
${rows||'<div class="emp">게시글이 없습니다.</div>'}<button class="fab" data-go="#/w">${I('pen')}</button>`;
document.querySelectorAll('[data-t]').forEach(b=>b.onclick=()=>{Q.tab=b.dataset.t;render()});
document.querySelectorAll('[data-h]').forEach(b=>b.onclick=()=>{Q.head=b.dataset.h;render()});
$('#nn').onchange=e=>{Q.n=+e.target.value;render()};
document.querySelectorAll('.row').forEach(r=>r.onclick=()=>go('#/p/'+r.dataset.id));bindHead()}
function cmtHtml(id){let cs=S.cmts.filter(c=>c.pid==id);const tops=cs.filter(c=>!c.pr);if(Q.sort==='desc')tops.reverse();
const one=(c,r)=>`<div class="cmt${r?' r':''}"><div class="c" data-rp="${c.id}"><div class="nk">${esc(c.n)}${fixI(c.fx)}${c.ip?' ('+esc(c.ip)+')':''}</div><div class="tx">${rich(c.t)}</div><div class="tm"><span>${c.d}</span>${c.mine?`<a data-del="${c.id}">삭제</a>`:''}</div></div></div>`;
return tops.map(t=>one(t,0)+cs.filter(c=>c.pr==t.id).map(c=>one(c,1)).join('')).join('')}
function view(id){const p=S.posts.find(p=>p.id==id);if(!p){go('#/');return}
if(!S.visited.includes(p.id)){S.visited.push(p.id);p.v++;save()}
const v=S.votes[id]||{},n=cnt(id),rp=Q.reply&&S.cmts.find(c=>c.id==Q.reply);
$('#app').innerHTML=head()+`<div class="pt"><h2>[${esc(p.h)}] ${esc(p.t)} ${AI.ph}</h2><div class="a"><span class="au">${esc(p.w)}${p.ip?'('+esc(p.ip)+')':''}${fixI(p.fx)}<i>|</i><span class="dt">${fd(p)}</span></span><span class="gr">${AI.fd.replace('class="ia"','class="ia fo"')}<span class="gl">내 활동 보기</span></span></div></div>
<div class="st">조회수 ${p.v}<i>|</i>추천 ${p.r}<i>|</i><span class="pill">댓글 <b>${n}</b></span>${p.mine?'<span style="margin-left:auto"><button data-ed="1" style="color:#3b4890">수정</button> <button data-dp="1" style="color:#c4262e">삭제</button></span>':''}</div>
<div class="bd">${rich(p.body)}${p.img?`<img src="${p.img}">`:''}</div>
<div class="rec"><div class="n"><b>${p.r}</b><span>${fixI(1)}<b>${p.fr||0}</b></span></div><button class="cc${v.up?' on':''}" id="up">${I('star')}<span>개념</span></button></div>
<div class="act"><button id="dn" class="${v.dn?'on':''}">${AI.b}실베추</button><button id="rp">${AI.rp}펌 0</button><button id="shr">${AI.sh}공유</button><button id="sc" class="${v.sc?'on':''}">${AI.fd}스크랩</button><button class="rd" id="rpt">${AI.rd}신고</button></div>
<div class="btns"><button data-go="#/">목록보기</button><button class="p" data-go="#/w">글쓰기</button></div>
<div class="ch" id="ch"><b>댓글</b><span class="n">[${n}]</span><button class="rf" id="crf">${I('rf')}</button><span class="sp"></span><button id="bdy">본문</button><span style="color:#ccd">|</span><select id="srt"><option value="asc" ${Q.sort=='asc'?'selected':''}>등록순</option><option value="desc" ${Q.sort=='desc'?'selected':''}>최신순</option></select></div>
<div id="cl">${cmtHtml(id)}</div>
<div class="cf">${rp?`<div class="rp"><span>${esc(rp.n)}님에게 답글</span><button id="rc">${I('x')}</button></div>`:''}<div class="t"><input id="cn" placeholder="닉네임" value="${esc(S.me)}"><input id="cp" type="password" placeholder="비밀번호"></div><textarea id="ct" placeholder="댓글을 입력해주세요."></textarea><div class="f"><span>${I('smile')}</span><span class="ic">${I('t')}</span><span style="color:#999">${I('mic')}</span><span class="sp"></span><button class="ok" id="cok">등록</button></div></div>`;
bindHead();document.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>go(b.dataset.go));
const vt=(k,fn)=>{S.votes[id]=S.votes[id]||{};fn(S.votes[id]);save();view(id)};
$('#up').onclick=()=>vt(0,x=>{x.up=!x.up;p.r+=x.up?1:-1;p.fr=(p.fr||0)+(x.up?1:-1)});
$('#dn').onclick=()=>vt(0,x=>{x.dn=!x.dn;p.dn=(p.dn||0)+(x.dn?1:-1)});
$('#sc').onclick=()=>vt(0,x=>{x.sc=!x.sc});
$('#shr').onclick=()=>{const u=location.href;navigator.share?navigator.share({title:p.t,url:u}).catch(()=>{}):navigator.clipboard&&navigator.clipboard.writeText(u).then(()=>alert('링크 복사됨'))};
$('#rpt').onclick=()=>alert('신고가 접수되었습니다.');$('#rp').onclick=()=>alert('펌 기능은 준비 중입니다.');
$('#srt').onchange=e=>{Q.sort=e.target.value;view(id)};$('#crf').onclick=()=>view(id);
$('#bdy').onclick=()=>window.scrollTo(0,0);
if(p.mine){$('[data-ed]').onclick=()=>go('#/w/'+id);$('[data-dp]').onclick=()=>{if(confirm('삭제할까요?')){S.posts=S.posts.filter(x=>x.id!=id);S.cmts=S.cmts.filter(c=>c.pid!=id);save();go('#/')}}}
document.querySelectorAll('[data-rp]').forEach(e=>e.onclick=ev=>{if(ev.target.tagName==='A')return;const c=S.cmts.find(c=>c.id==e.dataset.rp);Q.reply=c.pr||c.id;view(id);$('#ct').value='@'+c.n+' ';$('#ct').focus()});
document.querySelectorAll('[data-del]').forEach(a=>a.onclick=()=>{if(confirm('댓글 삭제?')){const d=+a.dataset.del;S.cmts=S.cmts.filter(c=>c.id!=d&&c.pr!=d);save();view(id)}});
if(rp)$('#rc').onclick=()=>{Q.reply=null;view(id)};
$('#cok').onclick=()=>{const t=$('#ct').value.trim(),n=$('#cn').value.trim()||'ㅇㅇ';if(!t){alert('댓글 내용을 입력하세요.');return}
S.me=n;S.cmts.push({id:S.cid++,pid:+id,pr:Q.reply,n:'ㅇㅇ',ip:randIp(),fx:0,t,d:now().c,mine:1});Q.reply=null;save();view(id);window.scrollTo(0,document.body.scrollHeight)}}
function write(id){const p=id&&S.posts.find(p=>p.id==id)||{h:'일반',t:'',body:''};Q.pending=p.img?[p.img]:[];
$('#app').innerHTML=head()+`<div class="wf"><select><option>${GAL}</option></select><select id="wh">${HEADS.map(h=>`<option ${h==p.h?'selected':''}>${h}</option>`).join('')}</select>
<input type="text" id="wt" placeholder="제목" value="${esc(p.t)}"><textarea id="wb" placeholder="내용을 입력하세요.">${esc(p.body)}</textarea>
<input type="file" id="wf" accept="image/*"><div class="pv" id="pv"></div>
<div class="btns"><button id="wc">취소</button><button class="p" id="wo">${id?'수정':'등록'}</button></div></div>`;
const pv=()=>$('#pv').innerHTML=Q.pending.map(s=>`<img src="${s}">`).join('');pv();bindHead();
$('#wf').onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{const im=new Image();im.onload=()=>{const k=Math.min(1,600/im.width),c=document.createElement('canvas');c.width=im.width*k;c.height=im.height*k;c.getContext('2d').drawImage(im,0,0,c.width,c.height);Q.pending=[c.toDataURL('image/jpeg',.7)];pv()};im.src=r.result};r.readAsDataURL(f)};
$('#wc').onclick=()=>history.back();
$('#wo').onclick=()=>{const t=$('#wt').value.trim(),b=$('#wb').value.trim();if(!t||!b){alert('제목과 내용을 입력하세요.');return}
if(id){Object.assign(p,{t,body:b,h:$('#wh').value,img:Q.pending[0]||''})}else{const d=now();S.posts.push({id:S.nid,t,body:b,h:$('#wh').value,w:'ㅇㅇ',fx:0,d:d.f,dl:d.l,v:0,r:0,ty:'t',img:'',mine:1,ip:randIp()});id=S.nid++}
save();Q.head='전체';Q.tab='all';Q.q='';go('#/p/'+id)}}
function render(){const h=location.hash||'#/',m=h.match(/^#\/(p|w)\/?(\d+)?/);
$('.fab')&&0;if(!m)list();else if(m[1]==='p')view(m[2]);else write(m[2]);
}
window.onhashchange=()=>{render();window.scrollTo(0,0)};
render();

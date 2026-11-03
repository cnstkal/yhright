'use strict';
const $=s=>document.querySelector(s),LS='fb2017-v4',ic=d=>`<svg viewBox="0 0 24 24"><path d="${d}"/></svg>`;
const I={menu:ic('M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z'),bell:ic('M12 22a2 2 0 002-2h-4a2 2 0 002 2zm6-6v-5c0-3.100-1.600-5.600-4.500-6.300V4a1.500 1.500 0 00-3 0v.700C7.600 5.400 6 7.900 6 11v5l-2 2v1h16v-1z'),
ppl:ic('M16 11a3 3 0 100-6 3 3 0 000 6zm-8 0a3 3 0 100-6 3 3 0 000 6zm0 2c-2.300 0-7 1.200-7 3.500V19h14v-2.500C15 14.200 10.300 13 8 13zm8 0c-.3 0-.6 0-1 .1 1.200.9 2 2 2 3.400V19h6v-2.500c0-2.300-4.700-3.500-7-3.500z'),
news:ic('M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z'),msgr:ic('M12 2C6.500 2 2 6.200 2 11.500c0 3 1.400 5.600 3.600 7.300V22l3.300-1.800c1 .3 2 .4 3.100.4 5.500 0 10-4.200 10-9.500S17.500 2 12 2zm1 12.700l-2.600-2.700-5 2.700 5.500-5.800 2.600 2.700 5-2.700z'),
search:ic('M15.500 14h-.8l-.3-.3A6.500 6.500 0 109.500 16a6.500 6.500 0 004.200-1.600l.3.3v.8l5 5 1.500-1.500zm-6 0a4.500 4.500 0 110-9 4.500 4.500 0 010 9z'),back:ic('M20 11H7.800l5.600-5.600L12 4l-8 8 8 8 1.400-1.400L7.800 13H20z'),
like:ic('M1 21h4V9H1zm22-11a2 2 0 00-2-2h-6.300l1-4.600v-.3c0-.4-.2-.8-.4-1L14.200 1 7.600 7.600A2 2 0 007 9v10a2 2 0 002 2h9c.8 0 1.500-.5 1.800-1.200l3-7c.1-.2.2-.5.2-.8z'),
cmt:ic('M21 6h-2v9H6v2a1 1 0 001 1h11l4 4V7a1 1 0 00-1-1zm-4 6V3a1 1 0 00-1-1H3a1 1 0 00-1 1v14l4-4h10a1 1 0 001-1z'),share:ic('M14 9V5l7 7-7 7v-4.100c-5 0-8.500 1.600-11 5.100 1-5 4-10 11-11z'),
more:ic('M6 10a2 2 0 100 4 2 2 0 000-4zm12 0a2 2 0 100 4 2 2 0 000-4zm-6 0a2 2 0 100 4 2 2 0 000-4z'),photo:ic('M21 19V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2zM8.500 13.500l2.500 3 3.500-4.500 4.500 6H5z'),
pin:ic('M12 2a7 7 0 00-7 7c0 5.300 7 13 7 13s7-7.700 7-13a7 7 0 00-7-7zm0 9.500a2.500 2.500 0 110-5 2.500 2.500 0 010 5z'),live:ic('M17 10.500V7a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1v-3.500l4 4v-11z')};
const COL=['#e57373','#64b5f6','#81c784','#ffb74d','#ba68c8','#4db6ac','#f06292','#a1887f'],AUD=['전체 공개','친구','나만 보기'],PLC=['서울 한강공원','명동','홍대입구','강남역','해운대해수욕장','제주 협재해수욕장','우리 학교'];
const PC={};function pic(s){if(PC[s])return PC[s];const c=document.createElement('canvas');c.width=600;c.height=360;const x=c.getContext('2d'),h=s*47%360,g=x.createLinearGradient(0,0,0,360);g.addColorStop(0,`hsl(${h},60%,70%)`);g.addColorStop(1,`hsl(${h+40},50%,45%)`);x.fillStyle=g;x.fillRect(0,0,600,360);x.fillStyle='#fff6';x.beginPath();x.arc(120+s*37%360,90,40,0,7);x.fill();x.fillStyle=`hsl(${h+20},35%,30%)`;x.beginPath();x.moveTo(0,360);for(let i=0;i<=6;i++)x.lineTo(i*100,230+Math.sin(s*3+i*1.7)*50);x.lineTo(600,360);x.fill();return PC[s]=c.toDataURL('image/jpeg',.7)}
const img=i=>typeof i=='number'?pic(i):i;
function seed(){
 const N=['김민재','이수빈','박현우','최지훈','정다은','한예린','오준서','윤서진','강민호','조은찬'],
 B=['서린고등학교 1학년','서린고등학교 1학년','서린고등학교 1학년','서린고등학교 1학년','인천 거주','서린고등학교 1학년','서린고등학교 1학년','고등학생','서린고등학교 1학년','인천 거주'],
 u={u0:{n:'정윤호',b:'서린고등학교 · 고등학교 1학년',c:5}},n=Date.now(),H=36e5;
 N.forEach((x,i)=>u['u'+(i+1)]={n:x,b:B[i],c:i});
 u.u11={n:'종호',b:'중학생 · 윤호보다 한 살 어림',c:6};
 u.p1={n:'인천 맛집 탐방',b:'페이지 · 음식점',c:3,pg:1};
 u.p2={n:'오늘의 유머',b:'페이지 · 커뮤니티',c:1,pg:1};
 const T=[
  ['u1','오늘 개학했는데 교실 너무 덥다 ㅋㅋ',1],
  ['u2','야자 끝나고 집 가는 중… 배고파',3,{img:5,place:'학교 앞'}],
  ['u3','내일 수학 숙제 몇 번까지였지??',6],
  ['u4','주말에 사촌이랑 놀았다 ㅋㅋ',12,{img:3,place:'인천'}],
  ['u0','개학하고 정신없네…',20],
  ['u5','매점 신상 아이스크림 먹어본 사람',28],
  ['u6','체육 시간에 찍은 하늘',36,{img:2}],
  ['u7','시험 범위 떴다… 큰일남',48],
  ['u8','오늘 버스에서 이어폰 한 쪽 잃어버림 ㅠ',60],
  ['u9','주말에 놀 사람 손 🙋',72]
 ];
 const posts=T.map((t,i)=>Object.assign({
  id:'p'+(i+1),u:t[0],t:t[1],ts:n-t[2]*H,aud:0,
  likes:['u1','u2','u3','u4','u5','u6','u7'].filter((_,k)=>(k+i)%3===0),
  cm:i%2?[{u:'u'+(i%9+1),t:i%4?'ㅋㅋㅋㅋ':'나도 ㅋㅋ',ts:n-t[2]*H+6e5}]:[],
  sh:i%4===0?1:0,saved:0
 },t[3]||{}));
 return{
  u,posts,friends:['u1','u2','u3','u4','u5','u6','u7','u8','u9','u10','u11'],
  reqs:[],notes:[
   {id:1,t:'김민재님이 회원님의 게시물을 좋아합니다.',to:['post','p5'],ts:n-2*H,r:0},
   {id:2,t:'이수빈님이 회원님의 게시물에 댓글을 남겼습니다: "ㅋㅋㅋ"',to:['post','p1'],ts:n-5*H,r:0},
   {id:3,t:'박현우님이 회원님의 게시물을 좋아합니다.',to:['post','p5'],ts:n-9*H,r:1}
  ],
  msgs:{u1:[{m:0,t:'내일 수학 숙제 사진 좀 보내줘 ㅠㅠ'},{m:1,t:'ㅇㅋ 집 가서 보내줄게'}],u11:[{m:0,t:'오늘 어디서 자?',ts:n-3*H},{m:1,t:'몰라'},{m:0,t:'전화라도 받아'},{m:1,t:'지금은 싫어'}]},
  set:{ntf:1,snd:1},seq:20
 };
}
let D=JSON.parse(localStorage[LS]||'null')||seed(),V=[{v:'feed'}],hide=new Set();
const sv=()=>{try{localStorage[LS]=JSON.stringify(D)}catch(e){toast('저장 공간이 부족합니다')}},cur=()=>V[V.length-1],me='u0';
const toast=m=>{const t=$('#tt');t.textContent=m;t.classList.add('on');clearTimeout(t.h);t.h=setTimeout(()=>t.classList.remove('on'),1700)};
const ago=t=>{const m=(Date.now()-t)/6e4|0;return m<1?'방금':m<60?m+'분':m<1440?(m/60|0)+'시간':(m/1440|0)+'일'};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const av=(id,s=40)=>`<div class="av" data-a="user" data-u="${id}" style="width:${s}px;height:${s}px;background:${COL[D.u[id].c%8]};font-size:${s*.45}px">${D.u[id].n[0]}</div>`;
const nm=id=>`<span class="nm" data-a="user" data-u="${id}">${D.u[id].n}</span>`;
function dg(t,o={}){return new Promise(r=>{const d=$('#dg'),b=o.btn||['취소','확인'];d.innerHTML=`<div class="box"><h3>${t}</h3>${o.msg?`<p>${o.msg}</p>`:''}${o.input!=null?`<input value="${esc(o.input)}">`:''}${(o.list||[]).map((x,i)=>`<button class="li" data-i="${i}">${x}</button>`).join('')}<div class="bb">${b.map((x,i)=>`<button data-b="${i}">${x}</button>`).join('')}</div></div>`;d.hidden=false;const q=d.querySelector('input');q&&q.focus();
 d.onclick=e=>{const x=e.target.closest('button');if(!x&&e.target!=d)return;d.hidden=true;if(!x)return r(null);if(x.dataset.i!=null)return r({i:+x.dataset.i});r(!o.list&&+x.dataset.b==b.length-1?{ok:1,v:q&&q.value.trim()}:null)}})}
/* 게시물 */
function post(p,full){const l=p.likes.includes(me),o=p.sh&&D.posts.find(x=>x.id==p.sh);
 return `<div class="cd"><div class="cp">${av(p.u)}<div style="flex:1">${nm(p.u)}${p.place?` <span class="sub">— ${esc(p.place)}에서</span>`:''}<div class="sub">${ago(p.ts)} · ${AUD[p.aud]}</div></div><button data-a="more" data-id="${p.id}" style="color:#90949c">${I.more}</button></div>
 ${p.t?`<div class="tx">${esc(p.t)}</div>`:''}${p.img?`<img class="im" src="${img(p.img)}" alt="">`:''}${p.link?`<div class="lk"><img class="im" src="${pic(p.link.img)}" alt=""><div><b>${esc(p.link.t)}</b><small>${p.link.d}</small></div></div>`:''}
 ${o?`<div class="qt"><div class="cp">${av(o.u,32)}<div>${nm(o.u)}<div class="sub">${ago(o.ts)}</div></div></div><div class="tx">${esc(o.t)}</div>${o.img?`<img class="im" src="${img(o.img)}" alt="">`:''}</div>`:''}
 <div class="ct"><span>${p.likes.length?'좋아요 '+p.likes.length+'개':''}</span><span>${p.cm.length?'댓글 '+p.cm.length+'개 ':''}${p.sh?'공유 '+p.sh+'회':''}</span></div>
 <div class="ac"><button data-a="like" data-id="${p.id}" class="${l?'on':''}">${I.like}좋아요</button><button data-a="open" data-id="${p.id}">${I.cmt}댓글</button><button data-a="share" data-id="${p.id}">${I.share}공유</button></div>
 ${full?p.cm.map(c=>`<div class="cm">${av(c.u,32)}<div>${nm(c.u)}<br>${esc(c.t)}<div class="sub">${ago(c.ts)}</div></div></div>`).join(''):''}</div>`}
const VW={
feed:()=>`<div class="cd"><div class="cmp">${av(me)}<button class="sf" data-a="compose">무슨 생각을 하고 계신가요?</button></div><div class="bar"><button data-a="compose" data-k="live">${I.live}라이브</button><button data-a="compose" data-k="photo">${I.photo}사진</button><button data-a="compose" data-k="chk">${I.pin}체크인</button></div></div>`+D.posts.filter(p=>!hide.has(p.id)&&(p.aud<2||p.u==me)).sort((a,b)=>b.ts-a.ts).map(p=>post(p)).join(''),
friends:()=>`<h5>친구 요청 ${D.reqs.length}</h5>${D.reqs.map(u=>`<div class="row">${av(u,56)}<div class="g">${nm(u)}<div class="sub">${D.u[u].b}</div><div style="margin-top:6px;display:flex;gap:8px"><button class="bt" data-a="acc" data-u="${u}">확인</button><button class="bt g2" data-a="rej" data-u="${u}">삭제</button></div></div></div>`).join('')||'<div class="row sub">새로운 친구 요청이 없습니다.</div>'}<h5>친구 ${D.friends.length}명</h5>${D.friends.map(u=>`<div class="row" data-a="user" data-u="${u}">${av(u,48)}<div class="g"><b>${D.u[u].n}</b><div class="sub">${D.u[u].b}</div></div></div>`).join('')}`,
notes:()=>D.notes.map(n=>`<div class="row ${n.r?'':'un'}" data-a="note" data-id="${n.id}">${av(n.to[0]=='user'?n.to[1]:me,48)}<div class="g">${esc(n.t)}<div class="sub">${ago(n.ts)}</div></div></div>`).join(''),
menu:()=>`<div class="row" data-a="user" data-u="${me}">${av(me,48)}<div class="g"><b>${D.u[me].n}</b><div class="sub">내 프로필 보기</div></div></div>`+[['friends','친구'],['grp','그룹'],['pgs','페이지'],['saved','저장된 항목'],['set','설정'],['login','로그아웃']].map(a=>`<div class="row" data-a="go" data-v="${a[0]}"><b class="g">${a[1]}</b></div>`).join(''),
profile:v=>{const u=D.u[v.u],mine=v.u==me,ps=D.posts.filter(p=>p.u==v.u&&(p.aud<2||mine)).sort((a,b)=>b.ts-a.ts),ph=ps.filter(p=>p.img);
 return `<div class="cv" style="background-image:url(${pic(u.c*13+2)})"></div><div class="pf"><div class="av" style="width:88px;height:88px;font-size:40px;background:${COL[u.c%8]}">${u.n[0]}</div><h2>${esc(u.n)}</h2><div class="sub">${esc(u.b)}</div><div style="margin-top:10px">${mine?'<button class="bt" data-a="edit">프로필 편집</button>':u.pg?'<button class="bt" data-a="lk" data-u="'+v.u+'">'+(D.liked&&D.liked.includes(v.u)?'좋아요 취소':'페이지 좋아요')+'</button>':D.friends.includes(v.u)?'<button class="bt g2" data-a="unf" data-u="'+v.u+'">친구</button> <button class="bt" data-a="thr" data-u="'+v.u+'">메시지</button>':'<button class="bt" data-a="add" data-u="'+v.u+'">친구 추가</button>'}</div></div>
 ${ph.length?`<h5>사진</h5><div class="ph">${ph.map(p=>`<img src="${img(p.img)}" data-a="open" data-id="${p.id}" alt="">`).join('')}</div>`:''}${mine||!u.pg?`<h5>친구</h5><div class="fr">${D.friends.slice(0,6).map(f=>`<div>${av(f,64)}${D.u[f].n}</div>`).join('')}</div>`:''}<h5>타임라인</h5>${ps.map(p=>post(p)).join('')||'<div class="row sub">게시물이 없습니다.</div>'}`},
post:v=>post(D.posts.find(p=>p.id==v.id),1)+`<div class="ci"><input id="ci" placeholder="댓글을 입력하세요..."><button data-a="send">게시</button></div>`,
compose:v=>`<div class="cmpb"><div class="cp">${av(me)}<div>${nm(me)}${v.place?`<span class="sub"> — ${esc(v.place)}에서</span>`:''}<br><button class="chip" data-a="aud">${AUD[v.aud]} ▾</button></div></div><textarea id="ta" placeholder="무슨 생각을 하고 계신가요?">${esc(v.t||'')}</textarea>${v.img?`<img class="im" src="${v.img}" alt="">`:''}<div class="bar" style="margin-top:auto"><button data-a="pho">${I.photo}사진</button><button data-a="chk">${I.pin}체크인</button></div></div>`,
search:v=>{const q=(v.q||'').trim(),us=q?Object.keys(D.u).filter(k=>D.u[k].n.includes(q)):[],ps=q?D.posts.filter(p=>p.t.includes(q)):[];return !q?'<div class="row sub">친구, 페이지, 게시물을 검색해 보세요.</div>':us.map(u=>`<div class="row" data-a="user" data-u="${u}">${av(u,40)}<div class="g"><b>${D.u[u].n}</b><div class="sub">${D.u[u].b}</div></div></div>`).join('')+ps.map(p=>post(p)).join('')||'<div class="row sub">검색 결과가 없습니다.</div>'},
msgs:()=>D.friends.map(u=>{const m=(D.msgs[u]||[]).slice(-1)[0];return `<div class="row" data-a="thr" data-u="${u}">${av(u,48)}<div class="g"><b>${D.u[u].n}</b><div class="sub">${m?esc(m.t):'대화를 시작해 보세요'}</div></div></div>`}).join(''),
thr:v=>`<div class="msg">${(D.msgs[v.u]||[]).map(m=>`<div class="${m.m?'me':''}">${esc(m.t)}</div>`).join('')||'<span class="sub">메시지가 없습니다.</span>'}</div><div class="ci"><input id="mi" placeholder="메시지 쓰기"><button data-a="smsg">전송</button></div>`,
grp:v=>v.g==null?['서울고 2학년 4반','포켓몬GO 한국 유저 모임','맛집 공유방'].map((g,i)=>`<div class="row" data-a="go" data-v="grp" data-g="${i}"><b class="g">${g}</b></div>`).join(''):D.posts.filter((p,i)=>i%3==v.g).map(p=>post(p)).join(''),
pgs:()=>Object.keys(D.u).filter(k=>D.u[k].pg).map(u=>`<div class="row" data-a="user" data-u="${u}">${av(u,48)}<div class="g"><b>${D.u[u].n}</b><div class="sub">${D.u[u].b}</div></div></div>`).join(''),
saved:()=>D.posts.filter(p=>p.saved).map(p=>post(p)).join('')||'<div class="row sub">저장된 항목이 없습니다.</div>',
set:()=>[['ntf','알림'],['snd','알림음']].map(s=>`<div class="row" data-a="tog" data-k="${s[0]}"><b class="g">${s[1]}</b><span class="sub">${D.set[s[0]]?'켜짐':'꺼짐'}</span></div>`).join('')+`<div class="row" data-a="go" data-v="login"><b class="g">로그아웃</b></div>`,
login:()=>`<div class="lg"><h1>facebook</h1><input placeholder="이메일 또는 휴대폰 번호"><input type="password" placeholder="비밀번호"><button class="bt" data-a="signin">로그인</button><div style="color:#dfe3ee;font-size:12px">로그아웃되었습니다. 아무 정보나 입력하면 로그인됩니다.</div></div>`};
const TT={friends:'친구',grp:'그룹',pgs:'페이지',saved:'저장된 항목',set:'설정',post:'게시물',msgs:'Messenger',profile:'프로필'};
const unr=()=>D.notes.filter(n=>!n.r).length;
function render(){const v=cur(),main=['feed','friends','notes','menu'].includes(v.v),h=$('#hd'),b=$('#bd');
 if(v.v=='login'){h.hidden=true}else{h.hidden=false;
  h.innerHTML=main?`<div class="hb"><div class="sb" data-a="search">${I.search}<span>검색</span></div><button data-a="msgs">${I.msgr}</button></div><div class="tb">${[['feed',I.news],['friends',I.ppl,D.reqs.length],['notes',I.bell,unr()],['menu',I.menu]].map(t=>`<button data-t="${t[0]}" class="${v.v==t[0]?'on':''}">${t[1]}${t[2]?`<span class="bg">${t[2]}</span>`:''}</button>`).join('')}</div>`
  :`<div class="hb"><button data-a="back">${I.back}</button>${v.v=='search'?`<input id="sq" placeholder="검색" value="${esc(v.q||'')}">`:`<b>${v.v=='compose'?'게시물 만들기':v.v=='thr'?D.u[v.u].n:v.v=='grp'&&v.g!=null?'그룹':TT[v.v]}</b>`}${v.v=='compose'?'<button data-a="submit" style="font-weight:700">게시</button>':''}</div>`}
 b.innerHTML=VW[v.v](v);if(v.v=='thr')b.scrollTop=1e5}
const go=v=>{V.push(v);render();$('#bd').scrollTop=0},back=()=>{V.length>1&&V.pop();render()};
const nid=()=>++D.seq;
function react(p){setTimeout(()=>{const f=D.friends.filter(x=>!p.likes.includes(x))[0];if(!f)return;p.likes.push(f);D.notes.unshift({id:nid(),t:`${D.u[f].n}님이 회원님의 게시물을 좋아합니다.`,to:['post',p.id],ts:Date.now(),r:0});sv();render()},4000)}
const FR=[['u1','야 오늘 모두 수고했다 ㅋㅋ'],['u5','주말에 PC방 갈 사람 구함'],['u9','비 오니까 기분이 센치해진다'],['u6','치킨 먹고 싶다...']];
const A={back,
 compose(el){go({v:'compose',aud:0,t:'',place:'',img:''});if(el&&el.dataset.k=='photo')A.pho();if(el&&el.dataset.k=='chk')A.chk();if(el&&el.dataset.k=='live')toast('라이브 방송은 시뮬레이션에서 지원되지 않습니다')},
 search(){go({v:'search',q:''});$('#sq').focus()},msgs(){go({v:'msgs'})},go(el){go({v:el.dataset.v,g:el.dataset.g!=null?+el.dataset.g:null})},
 user(el){go({v:'profile',u:el.dataset.u})},open(el){go({v:'post',id:el.dataset.id});},
 like(el){const p=D.posts.find(x=>x.id==el.dataset.id),i=p.likes.indexOf(me);i<0?p.likes.push(me):p.likes.splice(i,1);sv();render()},
 send(){const i=$('#ci'),t=i.value.trim();if(!t)return;D.posts.find(p=>p.id==cur().id).cm.push({u:me,t,ts:Date.now()});sv();render()},
 async share(el){const p=D.posts.find(x=>x.id==el.dataset.id),r=await dg('공유',{list:['지금 공유하기 (뉴스피드)','메시지로 보내기'],btn:['취소']});if(!r)return;
  if(r.i==0){p.sh++;D.posts.push({id:'p'+nid(),u:me,t:'',ts:Date.now(),aud:0,likes:[],cm:[],sh:p.id,saved:0});sv();V=[{v:'feed'}];render();toast('공유했습니다')}else{D.msgs.u1=(D.msgs.u1||[]).concat({m:1,t:'게시물 공유: '+(p.t||'사진').slice(0,20)});sv();toast('김민준님에게 메시지를 보냈습니다')}},
 async more(el){const p=D.posts.find(x=>x.id==el.dataset.id),L=[p.saved?'저장 취소':'게시물 저장','게시물 숨기기','링크 복사',...(p.u==me?['삭제']:[])],r=await dg('더보기',{list:L,btn:['취소']});if(!r)return;
  if(r.i==0){p.saved=p.saved?0:1;toast(p.saved?'저장했습니다':'저장을 취소했습니다')}else if(r.i==1){hide.add(p.id);if(cur().v=='post')V.pop()}else if(r.i==2)toast('링크를 복사했습니다');else{D.posts=D.posts.filter(x=>x.id!=p.id);if(cur().v=='post')V.pop()}sv();render()},
 acc(el){const u=el.dataset.u;D.reqs=D.reqs.filter(x=>x!=u);D.friends.push(u);sv();render();toast(D.u[u].n+'님과 친구가 되었습니다')},rej(el){D.reqs=D.reqs.filter(x=>x!=el.dataset.u);sv();render()},
 add(el){toast('친구 요청을 보냈습니다');el.textContent='요청 보냄';el.disabled=true},unf(el){D.friends=D.friends.filter(x=>x!=el.dataset.u);sv();render()},
 lk(el){D.liked=D.liked||[];const u=el.dataset.u,i=D.liked.indexOf(u);i<0?D.liked.push(u):D.liked.splice(i,1);sv();render()},
 note(el){const n=D.notes.find(x=>x.id==el.dataset.id);n.r=1;sv();go(n.to[0]=='post'?{v:'post',id:n.to[1]}:{v:'profile',u:n.to[1]})},
 async edit(){const a=await dg('프로필 편집',{input:D.u[me].n,btn:['취소','다음']});if(!a||!a.v)return;const b=await dg('소개',{input:D.u[me].b,btn:['취소','저장']});if(b){D.u[me].n=a.v;D.u[me].b=b.v||D.u[me].b;sv();render();toast('프로필을 저장했습니다')}},
 thr(el){const u=el.dataset.u;if(cur().v=='msgs'||cur().v=='profile')go({v:'thr',u})},
 smsg(){const i=$('#mi'),t=i.value.trim(),u=cur().u;if(!t)return;(D.msgs[u]=D.msgs[u]||[]).push({m:1,t});sv();render();setTimeout(()=>{(D.msgs[u]=D.msgs[u]||[]).push({m:0,t:['ㅋㅋㅋ 그래','오 좋아!','나중에 얘기하자'][t.length%3]});sv();cur().v=='thr'&&cur().u==u&&render()},1200)},
 tog(el){D.set[el.dataset.k]=D.set[el.dataset.k]?0:1;sv();render()},signin(){V=[{v:'feed'}];render();toast('로그인했습니다')},
 async aud(){const r=await dg('게시 대상',{list:AUD,btn:['취소']});if(r){cur().aud=r.i;sync();render()}},
 async chk(){sync();const r=await dg('체크인',{list:PLC,btn:['취소']});if(r){cur().place=PLC[r.i];render()}},pho(){sync();$('#up').click()},
 submit(){sync();const v=cur();if(!v.t.trim()&&!v.img)return toast('내용을 입력하세요');const p={id:'p'+nid(),u:me,t:v.t.trim(),ts:Date.now(),aud:v.aud,likes:[],cm:[],sh:0,saved:0};if(v.img)p.img=v.img;if(v.place)p.place=v.place;D.posts.push(p);sv();V=[{v:'feed'}];render();toast('게시했습니다');react(p)}};
const sync=()=>{const t=$('#ta');if(t)cur().t=t.value};
document.addEventListener('click',e=>{const el=e.target.closest('[data-a],[data-t]');if(!el)return;if(el.dataset.t){const t=el.dataset.t;if(cur().v==t&&t=='feed'){const f=FR[D.seq%4];D.posts.push({id:'p'+nid(),u:f[0],t:f[1],ts:Date.now(),aud:0,likes:[],cm:[],sh:0,saved:0});sv();toast('새 게시물을 불러왔습니다')}V=[{v:t}];render();return}A[el.dataset.a]&&A[el.dataset.a](el)});
document.addEventListener('input',e=>{if(e.target.id=='sq'){cur().q=e.target.value;$('#bd').innerHTML=VW.search(cur())}});
document.addEventListener('keydown',e=>{if(e.key!='Enter')return;if(e.target.id=='ci')A.send();if(e.target.id=='mi')A.smsg()});
$('#app').innerHTML=`<div id="hd"></div><div id="bd"></div><div id="dg" hidden></div><div id="tt"></div><input id="up" type="file" accept="image/*" hidden>`;
$('#up').onchange=e=>{const f=e.target.files[0];e.target.value='';if(!f)return;const r=new FileReader();r.onload=()=>{const i=new Image();i.onload=()=>{const k=Math.min(1,600/i.width),c=document.createElement('canvas');c.width=i.width*k;c.height=i.height*k;c.getContext('2d').drawImage(i,0,0,c.width,c.height);if(cur().v=='compose'){cur().img=c.toDataURL('image/jpeg',.7);render()}};i.src=r.result};r.readAsDataURL(f)};
render();

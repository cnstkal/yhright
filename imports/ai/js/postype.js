const I={
back:'<path d="M15 5l-7 7 7 7"/>',menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',add:'<rect x="3.5" y="3.5" width="17" height="17" rx="4"/><path d="M12 8v8M8 12h8"/>',
gift:'<rect x="4" y="9" width="16" height="11" rx="2"/><path d="M3 9h18v3H3zM12 9v11M12 9c-3 0-4-4-1.5-4S12 9 12 9zM12 9c3 0 4-4 1.5-4S12 9 12 9z"/>',
bell:'<path d="M6 17V11a6 6 0 0112 0v6l1.5 2h-15zM10 21h4"/>',search:'<circle cx="11" cy="11" r="7"/><path d="M16.5 16.5L21 21"/>',
home:'<path d="M4 11l8-7 8 7v8a1 1 0 01-1 1H5a1 1 0 01-1-1z" fill="currentColor"/>',req:'<path d="M4 20l1-4L16 5l3 3L8 19zM14 7l3 3"/>',box:'<rect x="4" y="4" width="16" height="5" rx="1"/><path d="M5 9v10h14V9M10 13h4"/>',
me:'<circle cx="12" cy="12" r="10" fill="#c9ccd1" stroke="none"/><circle cx="12" cy="10" r="3.5" fill="#fff" stroke="none"/><path d="M6 19c1-4 11-4 12 0" fill="#fff" stroke="none"/>',
heart:'<path d="M12 20s-8-5-8-11a4.5 4.5 0 018-2.5A4.5 4.5 0 0120 9c0 6-8 11-8 11z"/>',cmt:'<path d="M4 12a8 7 0 1114 5l3 3-5-1a8 7 0 01-12-7z"/>',
rep:'<path d="M17 3l3 3-3 3M4 11V9a3 3 0 013-3h13M7 21l-3-3 3-3M20 13v2a3 3 0 01-3 3H4"/>',book:'<path d="M6 3h12v18l-6-5-6 5z"/>',
share:'<path d="M12 15V3M7 8l5-5 5 5M5 12v8h14v-8"/>',more:'<circle cx="5" cy="12" r="1.3" fill="currentColor"/><circle cx="12" cy="12" r="1.3" fill="currentColor"/><circle cx="19" cy="12" r="1.3" fill="currentColor"/>',
gear:'<circle cx="12" cy="12" r="3"/><path d="M12 3l2 2.5 3-.5 1 3 2.5 1.8-1 3 1 3-2.5 1.8-1 3-3-.5L12 21l-2-2.5-3 .5-1-3L3.5 14l1-3-1-3L6 6.2l1-3 3 .5z"/>',
list:'<path d="M9 6h11M9 12h11M9 18h11M4 6h.1M4 12h.1M4 18h.1"/>',chev:'<path d="M6 9l6 6 6-6"/>',x:'<circle cx="12" cy="12" r="10" fill="#8a8a8e" stroke="none"/><path d="M8 8l8 8M16 8l-8 8" stroke="#fff"/>',right:'<path d="M9 5l7 7-7 7"/>'};
const ic=(n,s=24,f)=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="${f?'currentColor':'none'}" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${I[n]}</svg>`;
const $=s=>document.querySelector(s),esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const AU={u:{n:'유유',c:'#b8a0d9',subs:3}};
const P=[];
const UY=['#d8c5e7','#f2d8df','#b7c8e2','#e5d7c4','#c4d9d0','#d4c8ed','#e8d2bd','#b9ceda','#edd4df','#c7c9e8'];
const YUYU_PREVIEWS={
118:["윤호가 아침 식사를 차려 놓자 성화는 식탁에 앉아 수프가 조금 식었다고 투덜거렸다. 메이드복 차림의 윤호는 죄송하다며 그릇을 바꾸려 했지만, 성화는 이미 숟가락을 들고 있었다. “누가 버리래? 네가 다시 데우면 되잖아.” 윤호가 웃으며 고개를 숙이자 성화는 괜히 신문을 펼쳤다. 그런데 윤호가 물러나려는 순간, 성화는 무심한 척 소매 끝을 붙잡고……"],
119:["성화는 외출 준비를 하며 넥타이를 내밀었다. 윤호가 매듭을 정리해 주는 동안에도 성화는 거울만 보는 척했지만, 손끝이 목덜미에 닿을 때마다 어깨가 굳었다. “주인님, 불편하세요?” “네가 너무 가까우니까 그렇지.” 그렇게 말하면서도 성화는 윤호가 한 발 물러서자 왠지 마음에 들지 않아 다시 불렀다. “아직 삐뚤어졌잖아. 다시 해.”"],
120:["윤호는 성화가 좋아하는 홍차와 간식을 정확히 기억하고 있었다. 성화는 매번 당연하다는 듯 받아 놓고는 오늘은 쿠키가 조금 작다느니 차가 너무 뜨겁다느니 잔소리를 늘어놓았다. 윤호는 익숙하게 고개를 끄덕이며 새 접시를 준비했지만, 성화가 무심코 “네가 만든 건 그래도 먹을 만해”라고 덧붙이자 잠깐 웃음을 참지 못했다. 성화는 그 표정을 보고 괜히 한마디 더 하려다가……"],
121:["저택에 손님이 찾아온 날, 윤호는 평소보다 단정하게 성화의 곁을 지켰다. 손님이 윤호를 칭찬하며 오래 말을 붙이자 성화는 대화에 끼어들어 차가 식었다며 자리를 정리시켰다. 윤호가 조용히 사과하자 성화는 “네가 뭘 잘못했는데” 하고 퉁명스럽게 답했다. 정작 손님이 돌아간 뒤에는 윤호가 다른 사람 앞에서 웃던 얼굴이 자꾸 떠올라……"],
122:["윤호가 감기에 걸렸다는 사실을 알게 된 성화는 하루 종일 기분이 좋지 않았다. 쉬라고 명령해 놓고도 물은 마셨는지, 약은 먹었는지 몇 번이나 사람을 보내 확인했다. 결국 직접 방 앞까지 찾아간 성화는 문을 두드리고도 한참 들어가지 못했다. “주인님, 옮으면 안 되니까 들어오시면 안 돼요.” 윤호의 걱정스러운 목소리에 성화는 오히려 화를 내듯 대답했다. “누가 네 허락을 받고 들어온대?”"],
123:["윤호가 며칠 동안 쉬고 돌아오자 성화는 저택이 전보다 조용했다는 말을 끝내 하지 못했다. 대신 책상 위에 쌓인 서류를 한꺼번에 내밀며 이걸 정리하라고 시켰다. 윤호는 일이 많아도 싫은 내색 없이 하나씩 정리했지만, 늦은 밤 손가락에 작은 상처가 난 걸 성화가 먼저 발견했다. “그런 것도 못 보고 일해?” 성화는 구급상자를 가져오며 괜히 인상을 썼고, 윤호는 그 손길이 생각보다 조심스러워……"],
124:["성화는 윤호에게 하루 휴가를 주겠다고 말했다. 윤호가 어디에 다녀오면 좋을지 고민하자 성화는 관심 없는 척 책장을 넘겼지만, 결국 “멀리 가지는 마”라는 말을 덧붙였다. “제가 없으면 불편하세요?” 윤호가 장난스럽게 묻자 성화는 책을 덮고 단호하게 대답했다. “아침 차를 누가 준비하는데.” 말은 그렇게 했지만, 윤호가 정말 외출 준비를 하자 성화는 창밖만 바라보며 시간을 확인했다……"],
125:["저택에 돌아온 윤호의 손에는 성화가 좋아하는 작은 디저트가 들려 있었다. 휴가 중에도 주인님 생각이 났다는 말에 성화는 괜히 그런 걸 사 올 필요 없다고 타박했다. 하지만 접시는 깨끗하게 비워졌고, 윤호가 치우러 오자 성화는 남은 포장지를 감추듯 서랍에 넣었다. “맛없으면 안 먹어도 되는데요.” “누가 맛없대?” 성화는 대답을 마친 뒤에야 자신이 너무 빨리 반응했다는 걸 깨닫고……"],
126:["늦은 밤, 윤호는 서재에서 잠든 성화의 어깨에 담요를 덮어 주었다. 돌아서려던 순간 성화가 윤호의 손목을 가볍게 붙잡았다. “가지 마.” 잠결에 나온 말이라며 얼버무릴 줄 알았는데, 성화는 눈을 뜬 뒤에도 손을 놓지 않았다. 윤호가 조심스럽게 이유를 묻자 성화는 한참 입술을 달싹이다가 고개를 돌렸다. “네가 옆에 있으면…… 이상하게 잠이 잘 와.”"]
};
const YUYU_127=[
'성화의 저택에서 메이드로 일하는 윤호는 누구보다 부지런했다. 아침에는 커튼을 열고 차를 준비했으며, 성화가 일어나기 전 서재와 응접실까지 깔끔하게 정돈해 두었다. 주인님인 성화는 늘 까다로웠다. 차가 조금만 진해도 투덜거렸고, 셔츠 소매가 마음에 들지 않으면 윤호를 다시 불렀다. 윤호는 그럴 때마다 “네, 주인님” 하고 웃으며 시키는 일을 해냈다.',
'“윤호야, 넥타이.”',
'성화가 옷장 앞에서 손을 내밀었다. 윤호는 준비해 둔 넥타이를 건네는 대신 직접 매듭을 정리해 주었다. 가까워진 거리 때문에 성화의 시선이 잠깐 흔들렸다.',
'“혼자 할 수 있는데.”',
'“아까 매듭이 삐뚤어져 있었어요, 주인님.”',
'“그럼 처음부터 제대로 해 놓든가.”',
'말은 까칠했지만 성화는 윤호가 매듭을 마무리할 때까지 가만히 서 있었다. 윤호가 한 걸음 물러나자 성화는 거울을 보는 척하며 괜히 물었다.',
'“오늘 아침은 뭐야?”',
'“주인님이 좋아하시는 토스트랑 달걀, 그리고 홍차예요.”',
'“홍차는 너무 진하지 않게.”',
'“어제는 연하다고 하셨잖아요.”',
'“오늘은 오늘이지.”',
'윤호는 웃음을 참으며 식당으로 향했다. 성화는 그 뒷모습을 보다가 입꼬리가 올라가려는 걸 억지로 눌렀다. 저렇게 매번 웃어 주는 게 얄미웠다. 다른 사람에게도 저렇게 웃는 건지 생각하면 더 마음에 들지 않았다.',
'식사를 마친 성화는 서재에서 서류를 읽었다. 윤호는 차를 새로 우려 옆에 놓고 조용히 물러나려 했다. 그런데 성화가 컵을 내려놓으며 불렀다.',
'“잠깐.”',
'“네, 주인님.”',
'“오늘 저녁 일정 비워 둬.”',
'“손님이 오시나요?”',
'“아니. 너랑 식사할 거야.”',
'윤호는 놀란 눈으로 성화를 바라봤다. 성화는 곧바로 표정을 굳혔다.',
'“매일 밥 차리는 사람이 메뉴를 확인해야 할 거 아니야. 이상하게 생각하지 마.”',
'“저는 아무 말도 안 했는데요.” 윤호가 웃으며 대답했다.',
'성화는 괜히 서류를 넘겼다. 윤호가 저택에 온 지 꽤 됐지만, 둘이 마주 앉아 식사한 적은 거의 없었다. 늘 주인과 메이드라는 이유를 내세워 거리를 뒀다. 그런데 윤호가 휴일에 외출한다는 말을 들었을 때부터 저녁 식탁이 유난히 넓어 보였던 건 설명하기 어려웠다.',
'저녁이 되자 윤호는 작은 식탁에 두 사람 몫의 음식을 차렸다. 성화는 한입 먹고는 간이 괜찮다고 말했다. 칭찬치고는 무뚝뚝했지만 윤호는 기쁜 듯 웃었다.',
'“주인님 입맛에 맞아서 다행이에요.”',
'“내 입맛은 네가 제일 잘 알잖아.”',
'말을 뱉은 성화가 먼저 멈칫했다. 윤호도 잠시 눈을 깜빡이다가 조용히 고개를 끄덕였다.',
'“네. 앞으로도 잘 기억할게요.”',
'그 말이 이상하게 오래 남았다. 성화는 윤호가 늘 곁에 있는 게 당연하다고 여겼다. 아침마다 차를 내오고, 옷매무새를 정리하고, 늦은 밤까지 서재 불이 켜져 있으면 따뜻한 물을 가져다주는 일까지. 하지만 윤호가 없으면 저택이 얼마나 조용해질지, 이제는 상상하는 것만으로도 마음 한구석이 불편했다.',
'식사가 끝난 뒤 윤호가 그릇을 치우려 하자 성화가 먼저 일어났다.',
'“그건 두고 와. 내일 해도 되잖아.”',
'“괜찮아요, 주인님. 금방 끝나요.”',
'“내가 두라고 했어.”',
'윤호는 잠시 망설이다가 고개를 끄덕였다. 성화는 거실 소파에 앉아 자리를 비워 두었다. 윤호가 조심스럽게 맞은편에 앉자 성화는 리모컨을 건네며 말했다.',
'“오늘은 그냥 여기 있어.”',
'“제가 옆에 있어도 괜찮으세요?”',
'성화는 대답 대신 담요를 윤호 쪽으로 밀어 주었다. 귀 끝이 조금 붉어져 있었다.',
'“네가 없으면 심심하니까. 그 정도는 주인으로서 말할 수 있잖아.”',
'윤호는 담요를 받아 들고 환하게 웃었다. 성화는 그 얼굴을 보며 또 괜히 틱틱거리고 싶어졌지만, 이번에는 참았다. 메이드와 주인이라는 이름으로 감춰 두기엔 윤호가 이미 너무 가까운 사람이 되어 있었다. 성화는 그 사실을 인정하기까지 시간이 더 필요하겠지만, 적어도 오늘 밤만큼은 윤호가 곁에 있는 게 싫지 않았다.'
];
for(let i=0;i<10;i++){const ep=127-i,body=ep===127?YUYU_127:YUYU_PREVIEWS[ep];P.push({id:1127-i,au:'u',t:'나를 안아주세요 성화님 '+ep+'화',type:'포스트',time:i===0?'오늘':i===1?'어제':`${i}일 전`,ch:'유유',ad:0,tags:[],g:[UY[i],'#f8f5fa'],cv:'나를 안아주세요 성화님',views:[21,18,24,19,22,17,26,20,23,16][i],pt:0,likes:[4,1,0,2,0,0,1,0,3,0][i],rep:0,cm:[0,0,1,0,0,2,0,0,1,0][i],kind:'post',body});}
P.sort((a,b)=>(a.au==='u'?-1:0)-(b.au==='u'?-1:0)||(a.au==='u'&&b.au==='u'?b.id-a.id:a.id-b.id));
const C0={1127:[['익명1','5시간 전','이분 뭐하는 분이세요?',0,0],['익명2','1일 전','와 뭐짘ㅋㅋㅋㅋ',0,0],['익명3','3시간 전','근데 윤호가 누구예요?',0,0,[['익명4','본인인듯']]],['익명5','2시간 전','대단하시다',0,0],['익명6','2시간 전','(사진)',0,0]]};
let S={sub:{},like:{},book:{},rep:{},cm:{},clk:{}};
try{Object.assign(S,JSON.parse(localStorage.getItem('pt1')||'{}'))}catch(e){}
const save=()=>{try{localStorage.setItem('pt1',JSON.stringify(S))}catch(e){}};
const byId=id=>P.find(p=>p.id==id);
const comments=id=>{const base=(C0[id]||Array.from({length:byId(id).cm},(_,i)=>[['단비','하루','모모','새싹','구름','민트'][i%6],`${i+1}시간 전`,['잘 읽었어요!','분위기가 좋아요','다음 편 기다릴게요','한 번 더 읽고 왔어요','여운이 남네요','좋은 글 감사합니다'][i%6],i%3+1,i===0?1:0])).map((c,i)=>({id:`b${i}`,n:c[0],t:c[1],x:c[2],l:c[3],h:c[4],r:(c[5]||[]).map(q=>({n:q[0],x:q[1]}))}));return base.concat(S.cm[id]||[])};
const cnt=(p,k)=>p[k]+(S[k==='likes'?'like':'rep'][p.id]?1:0);
const ccount=id=>comments(id).length;
let view='home',prev='home',tab='discover',st='all',cur=null;
const avatar=(a,sz)=>`<div class="av" style="${sz?`width:${sz}px;height:${sz}px`:''}"><svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice"><circle cx="50" cy="38" r="18" fill="#f3f4f6"/><path d="M14 100C18 76 32 67 50 67S82 76 86 100Z" fill="#e9eaec"/></svg></div>`;
function actions(p){const l=S.like[p.id],b=S.book[p.id],r=S.rep[p.id];
return `<div class="act"><button data-act="like" data-id="${p.id}" class="${l?'red':''}">${ic('heart',26,l)}${cnt(p,'likes')}</button><button data-act="cm" data-id="${p.id}">${ic('cmt',26)}${ccount(p.id)}</button><span class="sp"></span><button data-act="book" data-id="${p.id}">${ic('book',26,b)}</button><button data-act="share">${ic('share',26)}</button></div>`}
function card(p,mode){const sub=S.sub[p.au];
const cs=comments(p.id);
return `<article class="post"><div class="ph">${avatar(p.au)}<div class="who"><b>${AU[p.au].n}</b><span>${p.time} · ${p.type}</span></div><button class="subbtn ${sub?'on':''}" data-act="sub" data-au="${p.au}">${sub?'구독중':'구독'}</button><button data-act="more" data-id="${p.id}">${ic('more',26)}</button></div>
<div class="pt" data-act="open" data-id="${p.id}">${esc(p.t)}</div><div class="pb" data-act="open" data-id="${p.id}">${esc(p.body[0])}</div>
<div class="tags">${p.ad?'<span class="tag ad">성인</span>':''}${p.tags.map(t=>`<span class="tag">${esc(t)}</span>`).join('')}</div>
${mode==='home'&&p.au!=='u'?`<div class="cover" data-act="open" data-id="${p.id}" style="background:linear-gradient(135deg,${p.g[0]},${p.g[1]})">${esc(p.cv)}</div>`:''}
<div class="meta">조회 ${p.views.toLocaleString()}${p.pt?` · ${p.pt.toLocaleString()}P`:''}</div>${actions(p)}
${mode==='search'&&cs.length&&p.id%2===0?`<div class="prev" data-act="cm" data-id="${p.id}"><div class="av" style="width:30px;height:30px"><svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice"><circle cx="50" cy="38" r="18" fill="#f3f4f6"/><path d="M14 100C18 76 32 67 50 67S82 76 86 100Z" fill="#e9eaec"/></svg></div><span>${esc(cs[0].x)}</span></div>`:''}</article>`}
function renderFeed(){let list=P;if(tab==='subs')list=P.filter(p=>S.sub[p.au]);
$('#feed').innerHTML=list.length?list.map(p=>card(p,'home')).join(''):'<div class="empty">구독한 작가가 없어요.<br>발견 탭에서 구독해 보세요.</div>'}
function renderSearch(){const q=$('#q').value.trim().toLowerCase();$('#qx').style.display=q?'block':'none';
if(!q){$('#sres').innerHTML='<div class="empty">제목, 본문, 작성자, 태그로 검색해 보세요.</div>';return}
let r=P.filter(p=>(AU[p.au].n+p.t+p.body.join(' ')+p.tags.join(' ')).toLowerCase().includes(q));
if(st!=='all')r=r.filter(p=>p.kind===st);
$('#sres').innerHTML=`<div class="cnt">검색 결과 ${r.length}개</div>`+(r.length?r.map(p=>card(p,'search')).join(''):'<div class="empty">검색 결과가 없어요.</div>')}
function renderDetail(){const p=byId(cur),i=P.indexOf(p),pv=P[i-1],nx=P[i+1],cs=comments(p.id),sub=S.sub[p.au];
$('#dtt').textContent=p.t;
const pop=P.filter(x=>x.au===p.au&&x.id!==p.id).slice(0,4);
$('#dbody').innerHTML=`<div style="color:var(--sub);font-size:15px;margin-top:22px">${p.ch||p.type}</div><div class="dtitle">${esc(p.t)}</div>
<div class="ph">${avatar(p.au,44)}<div class="who"><b>${AU[p.au].n}</b><span>${p.time} · 조회 ${p.views}</span></div></div><div class="line"></div>
<div class="body">${p.body.map(x=>`<p>${esc(x)}</p>`).join('')}</div>
<div style="text-align:center;margin:30px 0"><button style="border:1px solid var(--ln);border-radius:12px;padding:14px 22px;font-size:17px"><span style="color:#f33">♥</span> 포스트 후원하기</button></div>
<div class="tags">${p.tags.map(t=>`<span class="tag">${esc(t)}</span>`).join('')}</div><div class="line"></div>
<div style="display:flex;flex-direction:column;gap:6px">${pv?`<div class="pn" data-act="open" data-id="${pv.id}"><span>이전</span><div><b>${esc(pv.t)}</b>${esc(pv.body[0].slice(0,18))}…</div></div>`:''}${nx?`<div class="pn" data-act="open" data-id="${nx.id}"><span>다음</span><div><b>${esc(nx.t)}</b>${esc(nx.body[0].slice(0,18))}…</div></div>`:''}</div>
<div class="ach">${avatar(p.au,56).replace('class="av"','class="av" style="border-radius:14px;'+'"').replace('style="border-radius:14px;" style="','style="border-radius:14px;')}<div class="who"><b style="font-size:20px">${AU[p.au].n}</b><span>구독자 ${(AU[p.au].subs+(sub?1:0)).toLocaleString()}명</span></div><button class="dark ${sub?'on':''}" data-act="sub" data-au="${p.au}">${sub?'구독중':'구독'}</button></div>
<h4>이 채널의 인기 글</h4><div class="hs">${pop.map(x=>`<div class="hc" data-act="open" data-id="${x.id}"><div>${x.ad?'<span class="badge">성인</span>':''}<b>${esc(x.t)}</b></div><p>${esc(x.body[0])}</p></div>`).join('')}</div>
`;
const l=S.like[p.id],b=S.book[p.id],r=S.rep[p.id];
$('#pill').innerHTML=`<button data-act="open" data-id="${pv?pv.id:''}" style="opacity:${pv?1:.3}">${ic('back',22)}</button><button data-act="like" data-id="${p.id}" class="${l?'red':''}" style="${l?'color:#f33':''}">${ic('heart',26,l)}${cnt(p,'likes')}</button><button data-act="cm" data-id="${p.id}">${ic('cmt',26)}${ccount(p.id)}</button><button data-act="book" data-id="${p.id}">${ic('book',26,b)}</button><button data-act="open" data-id="${p.id}" style="opacity:0;pointer-events:none">${ic('list',26)}</button><button data-act="open" data-id="${nx?nx.id:''}" style="opacity:${nx?1:.3}">${ic('right',22)}</button>`;}
function renderNav(){const it=[['home','홈','home',1],['req','리퀘스트','req',0],['search','검색','search',0],['box','보관함','box',0],['me','마이메뉴','me',0]];
$('#nav').innerHTML=it.map(([k,l,i,en])=>`<button class="${en?(view===k||(k==='home'&&view==='detail'&&prev==='home')||(k==='search'&&view==='detail'&&prev==='search')?'on':''):'dis'}" ${en?`data-nav="${k}"`:'tabindex="-1" aria-disabled="true"'}>${ic(i,26)}${l}</button>`).join('')}
function show(v){view=v;document.querySelectorAll('.view').forEach(e=>e.classList.remove('on'));$('#v-'+v).classList.add('on');$('#nav').style.display=v==='detail'?'none':'flex';renderNav()}
function refresh(){if(view==='home')renderFeed();else if(view==='search')renderSearch();else if(view==='detail')renderDetail();else if(view==='ch')renderCh();if(sheetCm)renderCm()}
function go(v){if(v==='search')return;if(v==='detail'){prev=view==='detail'?prev:view}show(v);if(v==='search')setTimeout(()=>$('#q').focus(),50);refresh()}
let openR={},sheetCm=null,sort='인기순',replyTo=null;
function openSheet(html,tall){$('#sheet').className='sheet on'+(tall?' tall':'');$('#sheet').innerHTML=html;$('#dim').classList.add('on')}
function closeSheet(){sheetCm=null;replyTo=null;$('#sheet').className='sheet';$('#dim').classList.remove('on')}
function renderCm(){const id=sheetCm;let cs=comments(id).slice();if(sort==='최신순')cs.reverse();else cs.sort((a,b)=>(b.l+(S.clk[id+b.id]?1:0))-(a.l+(S.clk[id+a.id]?1:0)));
const keep=$('#cl')?$('#cl').scrollTop:0;
openSheet(`<div class="sh cmh"><button data-act="close" aria-label="닫기">${ic('x',22)}</button>댓글 ${cs.length}</div><div id="cl" style="flex:1;overflow-y:auto;min-height:0">${cs.map(c=>`<div class="cm"><div class="av" style="background:#c9ccd1;width:44px;height:44px"></div><div class="in"><div class="hd"><b>${esc(c.n)}</b><time>${c.t}</time></div>${c.x==='(사진)'?'<img class="ph-img" src="'+encodeURI('../이미지/포스타입/D7516F10-5BA4-4EDB-81BD-208116795EDB.jpeg')+'" alt="">':'<p>'+esc(c.x)+'</p>'}<div class="row"><button data-act="cl" data-cid="${c.id}" style="display:flex;gap:6px;align-items:center;${S.clk[id+c.id]?'color:#f33':''}">${ic('heart',24,S.clk[id+c.id])}${c.l+(S.clk[id+c.id]?1:0)}</button>${c.h?'<span style="color:#f33">♥ 작가</span>':''}<button data-act="rp" data-cid="${c.id}" style="font-size:16px">답글 쓰기</button><span style="flex:1"></span><button data-act="share">${ic('share',22)}</button><button data-act="cmore" data-cid="${c.id}">${ic('more',22)}</button></div>${(c.r||[]).length?`<button class="mr" data-act="tr" data-cid="${c.id}">답글 ${c.r.length}개 ${openR[id+c.id]?'닫기':'더 보기'} <i style="display:inline-block;transform:rotate(${openR[id+c.id]?180:0}deg)">${ic('chev',14)}</i></button>${openR[id+c.id]?c.r.map(r=>`<div class="cm rp"><div class="av" style="background:#c9ccd1;width:36px;height:36px"></div><div class="in"><div class="hd"><b>${esc(r.n)}</b><time>${r.t||'방금 전'}</time></div><p>${esc(r.x)}</p><div class="row"><span style="display:flex;gap:6px;align-items:center">${ic('heart',24)}${r.l||0}</span><button data-act="rp" data-cid="${c.id}" style="font-size:16px">답글 쓰기</button><span style="flex:1"></span><button data-act="cmore">${ic('more',22)}</button></div></div></div>`).join(''):''}`:''}</div></div>`).join('')}</div>
<div class="cin"><input id="ci" placeholder="${replyTo?'답글 남기기':'힘이 되는 한마디 남기기'}" value="${esc(window._cv||'')}"><button data-act="send">등록</button></div>`,1);
if($('#cl'))$('#cl').scrollTop=keep}
function menu(items){openSheet(`<div class="grab"></div>`+items.map(([l,a,d])=>`<button class="opt" data-act="${a}" ${d?`data-id="${d}"`:''}>${l}</button>`).join('')+'<div style="height:calc(12px + env(safe-area-inset-bottom,0px))"></div>')}
let toastT;function toast(m){let t=$('#toast');if(!t){t=document.createElement('div');t.id='toast';t.style.cssText='position:fixed;left:50%;bottom:100px;transform:translateX(-50%);background:#222;color:#fff;padding:10px 16px;border-radius:20px;font-size:14px;z-index:50;display:none';document.body.appendChild(t)}t.textContent=m;t.style.display='block';clearTimeout(toastT);toastT=setTimeout(()=>t.style.display='none',1400)}
const isDead=i=>+i>=1118&&+i<=1126;
document.addEventListener('click',e=>{
const nv=e.target.closest('[data-nav]');if(nv){const k=nv.dataset.nav;go(k==='home'?'home':'search');return}
const tb=e.target.closest('[data-tab]');if(tb){tab=tb.dataset.tab;document.querySelectorAll('#hometabs button').forEach(b=>b.classList.toggle('on',b===tb));renderFeed();return}
const sb=e.target.closest('[data-st]');if(sb){st=sb.dataset.st;document.querySelectorAll('#stabs button').forEach(b=>b.classList.toggle('on',b===sb));renderSearch();return}
if(e.target.id==='dim'){closeSheet();return}
const a=e.target.closest('[data-act]');if(!a)return;const act=a.dataset.act,id=a.dataset.id,cid=a.dataset.cid;
if(id&&isDead(id))return;
if(act==='back'){if(view==='detail')show(prev);else show('home');refresh();return}
if(act==='open'){if(!id)return;cur=+id;if(view!=='detail')prev=view;show('detail');renderDetail();$('#dbody').scrollTop=0;return}
if(act==='sub'){const k=a.dataset.au;S.sub[k]=!S.sub[k];save();refresh();return}
if(act==='like'){S.like[id]=!S.like[id];save();refresh();return}
if(act==='book'){S.book[id]=!S.book[id];save();refresh();toast(S.book[id]?'북마크에 저장했어요':'북마크를 해제했어요');return}
if(act==='rep'){S.rep[id]=!S.rep[id];save();refresh();return}
if(act==='share'){toast('링크를 복사했어요');return}
if(act==='cm'){sheetCm=+id;window._cv='';replyTo=null;renderCm();return}
if(act==='more'){menu([['이 작가 구독 '+(S.sub[byId(id).au]?'취소':'하기'),'msub',id],['북마크 '+(S.book[id]?'해제':'저장'),'mbook',id],['링크 복사','mshare'],['신고하기','mreport'],['취소','close']]);return}
if(act==='dmore'){menu([['링크 복사','mshare'],['신고하기','mreport'],['취소','close']]);return}
if(act==='msub'){const k=byId(id).au;S.sub[k]=!S.sub[k];save();closeSheet();refresh();return}
if(act==='mbook'){S.book[id]=!S.book[id];save();closeSheet();refresh();return}
if(act==='mshare'){closeSheet();toast('링크를 복사했어요');return}
if(act==='mreport'){closeSheet();toast('신고가 접수되었어요');return}
if(act==='close'){closeSheet();return}
if(act==='clear'){$('#q').value='';renderSearch();$('#q').focus();return}
if(act==='tr'){const k=sheetCm+cid;openR[k]=!openR[k];renderCm();return}
if(act==='sort'){const keepId=sheetCm;sort=sort==='인기순'?'최신순':'인기순';sheetCm=keepId;renderCm();return}
if(act==='cl'){const k=sheetCm+cid;S.clk[k]=!S.clk[k];save();window._cv=$('#ci').value;renderCm();return}
if(act==='rp'){replyTo=cid;$('#ci').placeholder='답글 남기기';$('#ci').focus();return}
if(act==='cmore'){toast('신고/차단 메뉴는 시뮬레이션에서 지원하지 않아요');return}
if(act==='send'){const v=$('#ci').value.trim();if(!v)return;const id2=sheetCm;S.cm[id2]=S.cm[id2]||[];
if(replyTo){const t=comments(id2).find(c=>c.id===replyTo);if(t&&t.id[0]==='u'){t.r.push({n:'나',x:v});}else{S.cm[id2].push({id:'u'+Date.now(),n:'나',t:'방금 전',x:'↳ '+v,l:0,h:0,r:[]})}}
else S.cm[id2].push({id:'u'+Date.now(),n:'나',t:'방금 전',x:v,l:0,h:0,r:[]});
if(replyTo)openR[id2+replyTo]=1;save();window._cv='';replyTo=null;sort='최신순';renderCm();$('#cl').scrollTop=1e5;refresh();return}
});
document.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.id==='ci')document.querySelector('[data-act=send]').click()});
$('#q').addEventListener('input',renderSearch);
$('#dbody').addEventListener('scroll',e=>{$('#dtt').style.opacity=e.target.scrollTop>80?1:0});
$('#ic-menu').innerHTML=ic('menu',28);$('#ic-add').innerHTML=ic('add',28);$('#ic-gift').innerHTML=ic('gift',28);$('#ic-bell').innerHTML=ic('bell',28);
$('#ic-sback').innerHTML=ic('back',28);$('#ic-dback').innerHTML=ic('back',28);$('#ic-s').innerHTML=ic('search',22);$('#qx').innerHTML=ic('x',22);
$('#ic-set').innerHTML=ic('gear',26);$('#ic-share').innerHTML=ic('share',26);$('#ic-dm').innerHTML=ic('more',26);
/* ===== 작가 프로필(채널) ===== */
let chAu='b',chF='all',chT='a',chB='home';
{const d=document.createElement('div');d.className='view';d.id='v-ch';$('#v-home').after(d);
const s=document.createElement('style');s.textContent='#v-ch .subbtn{display:none}';document.head.appendChild(s)}
function renderCh(){const sub=S.sub[chAu],l=P.filter(p=>p.au===chAu),
r=chT==='s'?l.filter(p=>p.kind==='series'):chT==='c'?[]:chF==='all'?l:l.filter(p=>p.kind===chF),
T=[['a','활동'],['s','시리즈'],['c','커뮤니티']],F=[['all','전체'],['post','포스트'],['request','리퀘스트'],['cm','커뮤니티']];
$('#v-ch').innerHTML=`<div style="height:100%;overflow-y:auto;padding-bottom:90px">
<div style="display:flex;justify-content:space-between;padding:14px 16px"><button data-chb>${ic('back',28)}</button><span style="display:flex;gap:18px">${ic('add',28)}${ic('gift',28)}${ic('bell',28)}</span></div>
<div style="display:flex;gap:16px;padding:8px 16px;align-items:center">${avatar(chAu,104).replace('style="','style="border-radius:22px;')}<div><b style="font-size:26px">${AU[chAu].n}</b><div style="color:var(--sub);margin-top:6px">구독자 ${(AU[chAu].subs+(sub?1:0)).toLocaleString()}명 · 포스트 ${chAu==='u'?127:l.length}개</div><div style="color:var(--sub);margin-top:6px">채널 정보 ${ic('right',14)}</div></div></div>
<div style="display:flex;gap:10px;padding:14px 16px"><button data-act="sub" data-au="${chAu}" style="flex:1;height:48px;border-radius:12px;background:${sub?'#e5e5ea':'#2a2a30'};color:${sub?'#222':'#fff'};font-size:17px">${sub?'구독중':'구독'}</button><button data-act="share" style="width:48px;border-radius:12px;background:#f2f2f5">${ic('share',24)}</button></div>
<div style="display:flex;border-bottom:1px solid var(--ln)">${T.map(([k,n])=>`<button data-cht="${k}" style="flex:1;padding:14px;font-size:18px;color:${chT===k?'#000':'var(--sub)'};font-weight:${chT===k?700:400};border-bottom:3px solid ${chT===k?'#000':'transparent'}">${n}</button>`).join('')}</div>
${chT==='a'?`<div style="display:flex;gap:8px;padding:14px 16px;overflow-x:auto">${F.map(([k,n])=>`<button data-chf="${k}" style="flex:none;padding:10px 18px;border-radius:22px;border:1px solid ${chF===k?'#cfe0ff':'var(--ln)'};background:${chF===k?'#e8f0ff':'none'};color:${chF===k?'#2f6fed':'inherit'}">${n}</button>`).join('')}</div>`:''}
<div style="padding:10px 16px;color:var(--sub);font-weight:700">총 ${chAu==='u'?127:r.length}개</div>${r.length?r.map(p=>card(p,'ch')).join(''):'<div class="empty">아직 없어요.</div>'}${chAu==='u'?'<div style="display:flex;justify-content:center;align-items:center;gap:2px;padding:14px 8px 20px;color:#29292d"><button disabled aria-label="이전 페이지" style="width:24px;height:32px;flex:none;display:grid;place-items:center;color:#a4a4a8;font-size:24px;font-weight:300;line-height:1">‹</button>'+Array.from({length:5},(_,i)=>'<button disabled style="width:40px;height:40px;flex:none;border-radius:13px;background:'+(i===0?'#f1f1f2':'transparent')+';color:#29292d;font-size:22px;font-weight:500;display:grid;place-items:center">'+(i+1)+'</button>').join('')+'<button disabled aria-label="다음 페이지" style="width:24px;height:32px;flex:none;display:grid;place-items:center;color:#29292d;font-size:24px;font-weight:300;line-height:1">›</button></div>':''}</div>`}
document.addEventListener('click',e=>{
if(e.target.closest('[data-chb]')){show(chB);refresh();return}
const t=e.target.closest('[data-cht]'),f=e.target.closest('[data-chf]');
if(t){chT=t.dataset.cht;renderCh();return}if(f){chF=f.dataset.chf;renderCh();return}
if(view==='ch')return;
const h=e.target.closest('.ph .av,.ph .who,.ach .av,.ach .who');if(!h)return;
const a=h.closest('.ph,.ach').querySelector('[data-au]');
chAu=a?a.dataset.au:byId(cur).au;chF='all';chT='a';chB=view;show('ch');renderCh()});
show('home');renderFeed();

const G=(a)=>a.flatMap(y=>a.map(x=>`<circle cx="${x}" cy="${y}" r="2.3" fill="currentColor"/>`)).join('');
const st='fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"';
const I={clock:'<circle cx="12" cy="12" r="10.5" fill="currentColor"/><path d="M12 6.5V12h4.5" stroke="var(--tb)" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
user:'<circle cx="12" cy="12" r="10.5" fill="currentColor"/><circle cx="12" cy="9.6" r="3.3" fill="var(--tb)"/><path d="M6.4 17.6c.9-2.5 3.2-3.7 5.6-3.7s4.7 1.2 5.6 3.7a8 8 0 01-11.2 0z" fill="var(--tb)"/>',
grid:G([5.5,12,18.5]),sil:'<circle cx="12" cy="9" r="3.8" fill="#fff"/><path d="M4.6 21c0-3.8 3.3-6.4 7.4-6.4s7.4 2.6 7.4 6.4z" fill="#fff"/>',
se:`<circle cx="10.5" cy="10.5" r="6.5" ${st} stroke-width="2.4"/><path d="M15.5 15.5L21 21" ${st} stroke-width="2.4"/>`,
fl:`<path d="M3 6h18M6 12h12M9 18h6" ${st} stroke-width="2.2"/>`,cl:`<path d="M15 5l-7 7 7 7" ${st} stroke-width="2.6"/>`,cr:`<path d="M9 5l7 7-7 7" ${st} stroke-width="2.4"/>`,pl:`<path d="M12 4v16M4 12h16" ${st} stroke-width="2.4"/>`,
ph:'<path fill="currentColor" d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1z"/>',
ms:'<path fill="currentColor" d="M12 3C6.8 3 3 6.4 3 10.6c0 2.3 1.1 4.2 2.9 5.6L5 20.5l4-2c.9.3 1.9.4 3 .4 5.2 0 9-3.4 9-7.6S17.2 3 12 3z"/>',
vi:'<rect x="2" y="6" width="13" height="12" rx="3.5" fill="currentColor"/><path d="M16.5 10.3l5-3.1v9.6l-5-3.1z" fill="currentColor"/>',
ft:'<rect x="2" y="6" width="13" height="12" rx="3.5" fill="currentColor" opacity=".7"/><path d="M16.5 10.3l5-3.1v9.6l-5-3.1z" fill="currentColor" opacity=".7"/><text x="8.5" y="15.2" font-size="8.5" font-weight="700" text-anchor="middle" fill="#2e4742">?</text>',
ma:`<rect x="2.5" y="5" width="19" height="14" rx="2.5" ${st} stroke-width="1.8"/><path d="M3 6.5l9 7 9-7" ${st} stroke-width="1.8"/>`,
sp:`<path d="M3 9.5v5h3.5L12 19V5L6.5 9.5z" fill="currentColor"/><path d="M15 9a4 4 0 010 6M17.8 6.3a8 8 0 010 11.4" ${st} stroke-width="1.8"/>`,
mu:`<rect x="9" y="3" width="6" height="11" rx="3" fill="currentColor"/><path d="M6 11a6 6 0 0012 0M12 17.5V21M8.5 21h7" ${st} stroke-width="2"/><path d="M4 4l16 16" ${st} stroke-width="2.4"/>`,
dots:'<circle cx="5" cy="12" r="2" fill="currentColor"/><circle cx="12" cy="12" r="2" fill="currentColor"/><circle cx="19" cy="12" r="2" fill="currentColor"/>',
ao:`<path d="M7 17L17 7M9 7h8v8" ${st} stroke-width="2"/>`,ai:`<path d="M17 7L7 17M15 17H7V9" ${st} stroke-width="2"/>`,
pa:'<path fill="currentColor" d="M7 5h3v14H7zm7 0h3v14h-3z"/>',pp:'<path fill="currentColor" d="M8 5v14l11-7z"/>',bs:`<path d="M3 12l6-7h12v14H9zm7-3l6 6m0-6l-6 6" ${st} stroke-width="1.8"/>`,ck:`<path d="M5 12l5 5 9-10" ${st} stroke-width="2.4"/>`};
const ic=(k,s=24)=>`<svg viewBox="0 0 24 24" width="${s}" height="${s}">${I[k]}</svg>`;
const $=s=>document.querySelector(s),app=$('#app'),m=x=>Date.now()-x*6e4;
let C=[['디자인실장님','010-4821-3057','디자인','sh.park@example.com',''],['홍중이','010-2394-7716','','','점심 약속 확인'],['모아은행 담당','010-7305-1182','은행','yh@example.com',''],['여상이','010-5568-9041','','',''],['산악회 형','010-9130-2264','산악회','','토요일 등산'],['민기','010-3347-8850','','mk@example.com',''],['우주서점 사장님','010-6612-4379','서점','',''],['종호','010-8043-5521','','',''],['수빈 선배','010-1759-6602','학교','sb@example.com',''],['민수','010-2288-1930','','',''],
['PD님','010-2740-1195','방송','yc.yoo@example.com','촬영 일정 확인'],['코디누나','010-6023-4478','스타일링','','의상 피팅 시간'],['매니저형','010-9371-0612','소속사','','콘서트 리허설 일정'],['도윤이','010-3815-7720','','do.na@example.com','대학 동기'],['연습실 누나','010-5147-2093','밴드','','연습실 예약'],['기타 현우','010-8629-3305','밴드','','다음 공연 세트리스트'],['누나','010-4493-8156','','','주말 본가 방문'],['노바 대표님','010-7782-1048','회사','jh.moon@example.com','계약 검토'],['촬영장 누나','010-1264-9980','촬영','','촬영장 위치 문의'],['작가님','010-6390-5527','방송','hs.jo@example.com','원고 수정본'],['인사팀','010-2851-7604','회사','ma.seo@example.com',''],['연출님','010-9047-3362','방송','','편성 회의 안내'],['사회자 누나','010-5583-1419','행사','','행사 MC 섭외'],['은서','010-7316-8842','','es.ko@example.com','여행 계획'],['엄마','010-3960-2207','','','']].map((a,i)=>({id:i+1,name:a[0],phone:a[1],org:a[2],email:a[3],note:a[4],fav:0}));
const U='080-011-6000',cn=id=>C.find(c=>c.id==id),dg=s=>s.replace(/\D/g,''),byNum=n=>C.find(c=>dg(c.phone)==dg(n));
let L=[[3,'in',60,95],[14,'out',420,180],[17,'miss',900,0],[6,'out',1500,300],[5,'in',2000,60],[24,'miss',2700,0],[0,'out',2950,0,U],[11,'in',3400,420],[23,'out',4000,0],[8,'in',4500,120],[12,'out',5000,0],[15,'miss',5500,0],[4,'out',6000,75],[21,'in',6400,240],[9,'out',7000,0],[19,'miss',7600,0],[2,'in',8000,30],[16,'out',8800,0],[0,'miss',9200,0,'02-555-0143'],[25,'out',9800,140]].map((a,i)=>({id:i+1,cid:a[0],type:a[1],t:m(a[2]),dur:a[3],num:a[0]?cn(a[0]).phone:a[4]}));
let V=[{id:1,cid:3,num:'010-7305-1182',t:m(150),len:24,txt:'모아은행 담당입니다. 내일 회의 시간 바뀐 것 같아서요, 확인하시고 연락 주세요.',un:1},{id:2,cid:0,num:'02-555-0143',t:m(560),len:12,txt:'택배 배송 관련 연락드렸습니다. 부재중이셔서 문 앞에 두겠습니다.',un:1},{id:3,cid:2,num:'010-2394-7716',t:m(1300),len:18,txt:'나야. 주말에 시간 되면 같이 밥 먹자. 전화 줘!',un:0}];
let tab='calls',flt='all',edit=0,dial='',call=null,tm=null,vt=null,nid=100;
const FN={all:'최근 통화',miss:'부재중 전화',out:'발신 전화',in:'수신 전화',vm:'음성사서함'};
const ini=n=>n.length>=3?n.slice(-2):n.length==2?n.slice(-1):n;
const av=(c,s)=>`<div class="av" style="--s:${s}px;font-size:${s*.4}px">${c?ini(c.name):ic('sil')}</div>`;
const hm=d=>{const h=d.getHours();return(h<12?'오전 ':'오후 ')+(h%12||12)+':'+String(d.getMinutes()).padStart(2,'0')};
const dd=t=>{const d=new Date(t),n=new Date();return Math.round((new Date(n.getFullYear(),n.getMonth(),n.getDate())-new Date(d.getFullYear(),d.getMonth(),d.getDate()))/864e5)};
const WD=['일요일','월요일','화요일','수요일','목요일','금요일','토요일'];
const ft=t=>{const d=new Date(t),x=dd(t);return x==0?hm(d):x==1?'어제':x<7?WD[d.getDay()]:(d.getMonth()+1)+'월 '+d.getDate()+'일'};
const fl=t=>{const d=new Date(t),x=dd(t);return(x==0?'오늘':x==1?'어제':(d.getMonth()+1)+'월 '+d.getDate()+'일')+' · '+hm(d)};
const du=s=>s>=60?Math.floor(s/60)+'분 '+s%60+'초':s+'초',mmss=s=>String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0');
const fm=s=>{if(/\D/.test(s))return s;const f=/^02/.test(s)?/^(02)(\d{3,4})(\d{0,4}).*/:/^(0\d{2})(\d{3,4})(\d{0,4}).*/;return s.replace(f,(x,a,b,c)=>a+'-'+b+(c?'-'+c:''))};
const toast=s=>{const t=$('#toast');t.textContent=s;t.style.display='block';clearTimeout(t.h);t.h=setTimeout(()=>t.style.display='none',1600)};
const ov=(h,c='')=>{const o=document.createElement('div');o.className='ov '+c;o.innerHTML=h;app.append(o);return o};
const sheet=(msg,items)=>{const d=document.createElement('div');d.className='dlg';d.innerHTML=`<div>${msg?`<p>${msg}</p>`:''}${items.map((x,i)=>`<button class="${x[2]?'red':''}" data-i="${i}">${x[0]}</button>`).join('')}<button data-i="x">취소</button></div>`;app.append(d);d.onclick=e=>{const i=e.target.dataset.i;if(i===undefined&&e.target!=d)return;if(i&&i!='x')items[i][1]();d.remove()}};
const rb=(a,i,l,x='')=>`<button class="rb ${x}" data-a="${a}" aria-label="${l}">${ic(i,22)}</button>`;
/* ---- tabs ---- */
function bar(){const T=[['calls','clock','통화'],['contacts','user','연락처'],['kp','grid','키패드']],mc=L.filter(r=>r.type=='miss').length;
$('#bar').innerHTML=`<div class="pill">${T.map(t=>`<button class="${tab==t[0]?'on':''}" data-a="tab" data-v="${t[0]}" aria-label="${t[2]}">${ic(t[1],28)}${t[2]}${t[0]=='calls'&&mc?`<i class="bg">${mc}</i>`:''}</button>`).join('')}</div><button class="bs" data-a="search" aria-label="검색">${ic('se',28)}</button>`;
document.querySelectorAll('.tab').forEach(e=>e.classList.toggle('on',e.id=='t-'+tab));$('#ix').style.display='none'}
function crow(r){const c=r.cid&&cn(r.cid);return`<div class="row ${r.type=='miss'?'miss':''}" data-a="info" data-v="${r.id}">${av(c,45)}<div class="m"><div class="mm"><span class="n">${c?c.name:r.num}</span><div class="sb">${ic(r.type=='out'?'ao':'ai',14)}${c?'휴대전화':'대한민국'}</div></div><span class="tm">${ft(r.t)}</span>${edit?`<button class="del" data-a="del" data-v="${r.id}">삭제</button>`:`<button class="cbt" data-a="dialn" data-c="${r.cid}" data-n="${r.num}" aria-label="전화">${ic('ph',22)}</button>`}</div></div>`}
function rCalls(){let l=L.filter(r=>flt=='all'||r.type==flt),h=`<div class="hd"><button class="cap" data-a="edit">${edit?'완료':'편집'}</button><b class="tt">통화</b>${rb('menu','fl','필터','r')}</div><h1>${FN[flt]}</h1>`;
if(flt=='vm')h+=V.length?V.map(v=>{const c=v.cid&&cn(v.cid);return`<div class="row" data-a="vm" data-v="${v.id}">${av(c,45)}<div class="m"><div class="mm"><span class="n" style="${v.un?'':'font-weight:500'}">${c?c.name:v.num}</span><div class="sb">${v.txt}</div></div>${v.un?'<span style="color:var(--b)">●</span>':''}<span class="tm">${ft(v.t)}</span></div></div>`}).join(''):'<div class="empty">음성사서함이 비어 있습니다</div>';
else h+=l.length?l.map(crow).join('')+(edit?`<div class="empty"><button class="del" data-a="clr">모두 지우기</button></div>`:''):'<div class="empty">통화 기록이 없습니다</div>';
$('#t-calls').innerHTML=h}
const IDX=[...'ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎ','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','#'];
const CH='ㄱㄱㄴㄷㄷㄹㅁㅂㅂㅅㅅㅇㅈㅈㅊㅋㅌㅍㅎ';
const cho=n=>{const c=n.charCodeAt(0);return c>=44032&&c<=55203?CH[Math.floor((c-44032)/588)]:/[a-z]/i.test(n[0])?n[0].toUpperCase():'#'};
function rContacts(){const g={};[...C].sort((a,b)=>a.name.localeCompare(b.name,'ko')).forEach(c=>(g[cho(c.name)]=g[cho(c.name)]||[]).push(c));
$('#t-contacts').innerHTML=`<div class="hd">${rb('tab','cl','뒤로','w')}<b class="tt">연락처</b>${rb('new','pl','새 연락처','w r')}</div><div class="row" style="min-height:62px">${av(0,40)}<span class="n" style="color:var(--s);font-weight:400;font-size:17px">내 카드</span></div>`+
IDX.filter(k=>g[k]).map(k=>`<div class="sh" id="s-${k}">${k}</div>`+g[k].map(c=>`<div class="row" style="min-height:65px" data-a="cinfo" data-v="${c.id}">${av(c,45)}<div class="m" style="height:65px"><span class="n" style="font-weight:500">${c.name}</span></div></div>`).join('')).join('');
$('#ix').innerHTML=IDX.map(k=>`<a class="${/[A-Z#]/.test(k)?'l':''}" data-a="jump" data-v="${k}">${k}</a>`).join('')}
const padH=()=>[['1',''],['2','ABC'],['3','DEF'],['4','GHI'],['5','JKL'],['6','MNO'],['7','PQRS'],['8','TUV'],['9','WXYZ'],['*',''],['0','+'],['#','']].map(k=>`<button class="k" data-k="${k[0]}"><b>${k[0]=='*'?'∗':k[0]}</b><i>${k[1]}</i></button>`).join('');
function rKp(){const mt=dial.length>3&&C.find(c=>dg(c.phone).includes(dg(dial)));
$('#t-kp').innerHTML=`<div id="num" style="font-size:${dial.length>12?28:38}px">${fm(dial)}${dial?`<button class="rb w" style="position:absolute;right:18px;bottom:6px;width:40px;height:40px;background:none;border:0;box-shadow:none;color:#aaa" data-a="bs" aria-label="지우기">${ic('bs',28)}</button>`:''}</div><div id="sug" ${mt?`data-a="cinfo" data-v="${mt.id}"`:''}>${mt?mt.name:''}</div><div class="pad">${padH()}</div><div style="margin:16px 0 0;height:79px"><button class="cbn cg" ${dial?'':'disabled'} data-a="dialk" aria-label="발신">${ic('ph',36)}</button></div>`}
const all=()=>{bar();rCalls();rContacts();rKp()};
/* ---- detail (dark) ---- */
let cur=null;
function openInfo(cid,num){cur=[cid,num];const c=cid&&cn(cid),recs=L.filter(r=>c?r.cid==c.id:r.num==num);
const lab={out:'발신 통화',in:'수신 통화',miss:'부재중 전화'},btn=(a,i,l,x='')=>`<button data-a="${a}" ${x} aria-label="${l}">${ic(i,28)}</button>`;
const call2=`data-c="${c?c.id:0}" data-n="${c?c.phone:num}"`;
const h=`<div class="dh">${rb('close','cl','뒤로')}<b class="dt2">${c?c.name:num}</b></div><div class="big">${c?ini(c.name):ic('sil')}</div><div class="nm">${c?c.name:num}</div><div class="ns">${c?(c.org||'휴대전화'):'대한민국'}</div>
<div class="ac">${btn('toast','ms','메시지','data-v="메시지는 시뮬레이션에 포함되지 않습니다"')}${btn('dialn','ph','전화',call2)}${btn('toast','vi','영상','data-v="영상 통화는 지원되지 않습니다"')}${btn('toast','ma','이메일',`data-v="${c&&c.email||'등록된 이메일 없음'}"`)}</div>
${recs.length?`<div class="cd"><div class="r2">통화 기록${ic('cr',20)}</div>${recs.map(r=>`<div class="r2"><div>${lab[r.type]}<div class="sb2">${r.type=='out'&&!r.dur?'취소됨':r.dur?du(r.dur):'응답 없음'}</div></div><span>${fl(r.t)}</span></div>`).join('')}</div>`:''}
${c?'':`<div class="cd" data-a="newn" data-v="${num}"><div class="r2">이름 추가${ic('cr',20)}</div></div>`}
<div class="cd" data-a="dialn" ${call2}><div class="r2"><div><div style="font-size:19px">전화번호${c?'':'<span class="tag">최근 항목</span>'}</div><div style="font-size:26px">${c?c.phone:num}</div></div><span style="color:#d9d0ff">${ic('ph',22)}</span></div></div>
${c&&c.email?`<div class="cd"><div class="r2"><div><div style="font-size:15px;color:#ffffffa6">이메일</div>${c.email}</div></div></div>`:''}${c&&c.org?`<div class="cd"><div class="r2"><div><div style="font-size:15px;color:#ffffffa6">회사</div>${c.org}</div></div></div>`:''}${c&&c.note?`<div class="cd"><div class="r2"><div><div style="font-size:15px;color:#ffffffa6">메모</div>${c.note}</div></div></div>`:''}
<div class="cd"><div class="r2" data-a="toast" data-v="연락처 공유는 시뮬레이션에 포함되지 않습니다">연락처 공유</div>${c?`<div class="r2" data-a="favt" data-v="${c.id}">${c.fav?'즐겨찾기에서 제거':'즐겨찾기에 추가'}</div><div class="r2" data-a="editc" data-v="${c.id}">연락처 편집</div>`:`<div class="r2" data-a="newn" data-v="${num}">새로운 연락처 등록</div><div class="r2" data-a="toast" data-v="기존 연락처에 추가됨(시뮬레이션)">기존 연락처에 추가</div>`}</div>
<div class="cd"><div class="r2" data-a="toast" data-v="긴급 연락처에 추가됨(시뮬레이션)">긴급 연락처에 추가</div></div><div class="cd"><div class="r2" data-a="toast" data-v="차단됨(시뮬레이션)">연락처 차단</div>${recs.length?`<div class="r2" style="color:#ff6b61" data-a="delh">통화 기록 삭제</div>`:''}</div>`;
let o=$('.ov.dark');if(o)o.innerHTML=h;else{o=ov(h,'dark');o.onscroll=()=>o.classList.toggle('sc',o.scrollTop>330)}}
function editC(id,num){const c=id?cn(id):{name:'',phone:num||'',org:'',email:'',note:''};
ov(`<div style="display:flex;justify-content:space-between;padding:0 16px 8px"><button class="a" data-a="close">취소</button><button class="a" data-a="save" data-v="${id||0}"><b>완료</b></button></div><h1>${id?'연락처 편집':'새로운 연락처'}</h1><div class="grp">${[['name','이름'],['phone','전화번호'],['org','회사'],['email','이메일'],['note','메모']].map(f=>`<div><small>${f[1]}</small><input data-f="${f[0]}" value="${c[f[0]]||''}"></div>`).join('')}</div>`,'sh2 light')}
function showVm(id){const v=V.find(x=>x.id==id),c=v.cid&&cn(v.cid);v.un=0;all();let p=0;
const o=ov(`<div style="padding:0 16px">${rb('closev','cl','뒤로','w')}</div><div style="display:flex;flex-direction:column;align-items:center;text-align:center;padding:10px 24px"><div class="av" style="--s:90px;font-size:36px;margin-top:10px">${c?ini(c.name):ic('sil')}</div><div style="font-size:26px;font-weight:700;margin-top:8px">${c?c.name:v.num}</div><div class="sb" style="justify-content:center">${v.num} · ${ft(v.t)}</div><div class="prog"><i></i></div><div class="sb" style="width:80%;justify-content:space-between"><span id="vc">0:00</span><span>0:${String(v.len).padStart(2,'0')}</span></div><button class="cbn" style="background:var(--b);margin:14px" id="pp" aria-label="재생">${ic('pp',34)}</button><p style="margin:10px 0;line-height:1.5">${v.txt}</p></div><div class="grp"><div class="a" data-a="dialn" data-c="${v.cid}" data-n="${v.num}">콜백</div><div class="d" data-a="delv" data-v="${id}">삭제</div></div>`,'light');
o.querySelector('#pp').onclick=()=>{const b=o.querySelector('#pp');if(vt){clearInterval(vt);vt=null;b.innerHTML=ic('pp',34);return}if(p>=v.len)p=0;b.innerHTML=ic('pa',34);
vt=setInterval(()=>{p+=.25;o.querySelector('.prog i').style.width=Math.min(100,p/v.len*100)+'%';o.querySelector('#vc').textContent='0:'+String(Math.floor(p)).padStart(2,'0');if(p>=v.len){clearInterval(vt);vt=null;b.innerHTML=ic('pp',34)}},250)}}
function openSearch(){const o=ov(`<div class="sbx"><div>${ic('se',18)}<input id="sq" placeholder="이름 또는 전화번호 검색" autofocus></div><b data-a="close">취소</b></div><div id="sr"></div>`,'light');
const f=()=>{const q=o.querySelector('#sq').value.trim(),l=C.filter(c=>q&&[c.name,c.phone,c.org,c.note].join(' ').includes(q));o.querySelector('#sr').innerHTML=q?(l.length?l.map(c=>`<div class="row" style="min-height:65px" data-a="cinfo" data-v="${c.id}">${av(c,45)}<div class="m" style="height:65px"><div class="mm"><span class="n">${c.name}</span><div class="sb">${c.phone}</div></div></div></div>`).join(''):'<div class="empty">결과 없음</div>'):''};o.querySelector('#sq').oninput=f;o.querySelector('#sq').focus()}
/* ---- call ---- */
function startCall(cid,num){if(call)return;const c=cid&&cn(cid)||byNum(num);call={cid:c?c.id:0,num:c?c.phone:num,s:'dial',sec:0,dt:''};showCall();setTimeout(()=>{if(call&&call.s=='dial')goOn()},2200)}
function goOn(){call.s='on';tm=setInterval(()=>{call.sec++;const e=$('.call .cs');if(e&&!call.hold)e.textContent=mmss(call.sec)},1000);showCall()}
function incoming(cid){if(call)return;const c=cn(cid);call={cid,num:c.phone,s:'ring',in:1,sec:0,dt:''};showCall()}
function showCall(){let o=$('.ov.call');if(!o){o=ov('','call');}const c=call.cid&&cn(call.cid),nm=c?c.name:call.num,sub=c?'휴대전화':'대한민국';
const stx=call.s=='dial'?'연결 중...':call.s=='ring'?'휴대전화 수신':call.s=='end'?'통화 종료':call.hold?'통화 보류 중':mmss(call.sec);
const head=`<div class="ch"><div class="cs">${stx}</div><div class="cn">${call.kp&&call.dt?call.dt:nm}</div>${call.kp?'':`<div class="cl">${sub}</div>`}</div>`;
const b=(k,i,l,a='cb')=>`<button class="${call[k]?'on':''}" data-a="${a}" data-v="${k}"><span>${ic(i,34)}</span>${l}</button>`;
let body;
if(call.s=='ring')body=`${head}<div class="g6" style="grid-template-columns:repeat(2,79px);gap:0 90px"><button class="cr" data-a="rej"><span>${ic('ph',36)}</span>거절</button><button data-a="acc"><span style="background:#3f8a47;border-color:#5ccb69">${ic('ph',36)}</span>응답</button></div>`;
else if(call.kp&&call.s=='on')body=`${head}<div class="pad dt">${padH()}</div><div class="g6" style="grid-template-columns:repeat(3,79px)"><span style="visibility:hidden"></span><button class="cr" data-a="end"><span>${ic('ph',36)}</span>종료</button><button data-a="cb" data-v="kp"><span style="background:none;border:0;width:79px;height:auto;font-size:17px">숨기기</span></button></div>`;
else body=`${head}<div class="g6">${b('sp','sp','스피커')}${b('ftm','ft','FaceTime','ft')}${b('mute','mu','소리 끔')}<button data-a="more"><span>${ic('dots',34)}</span>더 보기</button><button class="cr" data-a="end"><span>${ic('ph',36)}</span>종료</button>${b('kp','grid','키패드')}</div>`;
o.innerHTML=body+'<div class="hi"></div>'}
function endCall(miss){if(!call||call.s=='end')return;const k=call;clearInterval(tm);
if(!k.in||miss||k.s=='on')L.unshift({id:++nid,cid:k.cid,num:k.num,type:k.in?(miss||k.s!='on'?'miss':'in'):'out',t:Date.now(),dur:k.s=='on'?k.sec:0});
call.s='end';call.kp=0;showCall();all();setTimeout(()=>{call=null;document.querySelectorAll('.ov.call').forEach(e=>e.remove())},1100)}
/* ---- actions ---- */
const rf=()=>{if($('.ov.dark')&&cur)openInfo(cur[0],cur[1]);all()};
const act={tab:v=>{document.querySelectorAll('.ov:not(.call)').forEach(e=>e.remove());tab=v;all()},close:(v,e)=>e.closest('.ov').remove(),closev:(v,e)=>{clearInterval(vt);vt=null;e.closest('.ov').remove()},
info:v=>{const r=L.find(x=>x.id==v);openInfo(r.cid,r.num)},cinfo:v=>{const c=cn(v);document.querySelectorAll('.ov.light').forEach(x=>x.remove());openInfo(c.id,c.phone)},
vm:v=>showVm(v),dialn:(v,e)=>{startCall(+e.dataset.c,e.dataset.n)},dialk:()=>{if(dial)startCall(0,fm(dial))},bs:()=>{dial=dial.slice(0,-1);rKp()},
edit:()=>{edit=!edit;rCalls()},del:v=>{L=L.filter(r=>r.id!=v);all()},clr:()=>sheet('모든 통화 기록을 삭제할까요?',[['모두 삭제',()=>{L=[];edit=0;all()},1]]),
delh:()=>sheet('이 연락처의 통화 기록을 삭제할까요?',[['삭제',()=>{const[c,n]=cur;L=L.filter(r=>c?r.cid!=c:r.num!=n);all();rf()},1]]),
delv:v=>sheet('이 음성 메시지를 삭제할까요?',[['삭제',()=>{clearInterval(vt);vt=null;V=V.filter(x=>x.id!=v);document.querySelectorAll('.ov.light').forEach(x=>x.remove());all()},1]]),
menu:()=>{const d=document.createElement('div');d.className='menu';d.innerHTML='<div>'+Object.keys(FN).map(k=>`<button data-a="flt" data-v="${k}">${k=='all'?'모든 통화':FN[k]}${flt==k?ic('ck',18):''}</button>`).join('')+'</div>';app.append(d);d.onclick=e=>{if(e.target==d)d.remove()}},
flt:v=>{flt=v;document.querySelector('.menu').remove();rCalls()},search:()=>openSearch(),jump:v=>{let i=IDX.indexOf(v),el;for(;i<IDX.length&&!(el=$('#s-'+IDX[i]));i++);if(el)el.scrollIntoView({block:'start'})},
new:()=>editC(0),newn:v=>editC(0,v),editc:v=>editC(+v),favt:v=>{const c=cn(v);c.fav=!c.fav;rf()},toast:v=>toast(v),
save:(v,e)=>{const o=e.closest('.ov'),d={};o.querySelectorAll('[data-f]').forEach(i=>d[i.dataset.f]=i.value.trim());if(!d.name)return toast('이름을 입력하세요');let c;
if(+v){c=cn(v);Object.assign(c,d)}else{c={id:++nid,fav:0,...d};C.push(c);L.forEach(r=>{if(!r.cid&&dg(r.num)==dg(c.phone))r.cid=c.id})}
o.remove();if($('.ov.dark'))cur=[c.id,c.phone];rf()},
cb:v=>{call[v]=!call[v];if(v=='hold')call.hold=call[v];showCall()},ft:()=>toast('FaceTime은 지원되지 않습니다'),
more:()=>sheet('',[[call.hold?'통화 보류 해제':'통화 보류',()=>{call.hold=!call.hold;showCall()}],['통화 추가',()=>sheet('통화 추가',C.slice(0,6).map(c=>[c.name,()=>toast(c.name+' 추가됨(시뮬레이션)')]))]]),
end:()=>endCall(),rej:()=>endCall(1),acc:()=>goOn(),inc:()=>incoming(3)};
app.addEventListener('click',e=>{const k=e.target.closest('[data-k]');if(k){if(k.lp){k.lp=0;return}const key=k.dataset.k;
if(call&&k.closest('.call')){call.dt+=key;showCall()}else if(dial.length<20){dial+=key;rKp()}return}
const t=e.target.closest('[data-a]');if(t&&act[t.dataset.a])act[t.dataset.a](t.dataset.v,t,e)});
app.addEventListener('pointerdown',e=>{const k=e.target.closest('[data-k]');if(k&&k.dataset.k=='0'&&!k.closest('.call')){k.h=setTimeout(()=>{k.lp=1;dial+='+';rKp()},500);['pointerup','pointerleave'].forEach(n=>k.addEventListener(n,()=>clearTimeout(k.h),{once:true}))}
const b=e.target.closest('[data-a=bs]');if(b){b.h=setTimeout(()=>{dial='';rKp()},600);['pointerup','pointerleave'].forEach(n=>b.addEventListener(n,()=>clearTimeout(b.h),{once:true}))}});
new MutationObserver(()=>app.classList.toggle('dk',!!app.querySelector('.ov.dark'))).observe(app,{childList:true});
$('#t-calls').addEventListener('dblclick',e=>{if(e.target.closest('.hd .tt'))incoming(3)});
all();

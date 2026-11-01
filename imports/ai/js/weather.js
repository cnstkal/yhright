const $=s=>document.querySelector(s),A=$('#app');
$('#rays').innerHTML=[0,1,2,3,4,5,6,7].map(i=>`<path d="M24 4v5" transform="rotate(${i*45} 24 24)"/>`).join('');
const I=(n,s=34)=>`<svg width="${s}" height="${s}" viewBox="0 0 48 48"><use href="#${n}"/></svg>`;
const U=(p,s=24,x='')=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" ${x}>${p}</svg>`;
const P={map:'<path d="M3 6.5l6-2.3 6 2.3 6-2.3v13.3l-6 2.3-6-2.3-6 2.3zM9 4.2v13.3M15 6.5v13.3"/>',list:'<path d="M9 6.5h12M9 12h12M9 17.5h12"/><circle cx="4.2" cy="6.5" r=".9"/><circle cx="4.2" cy="12" r=".9"/><circle cx="4.2" cy="17.5" r=".9"/>',more:'<circle cx="5" cy="12" r="1.3" fill="currentColor"/><circle cx="12" cy="12" r="1.3" fill="currentColor"/><circle cx="19" cy="12" r="1.3" fill="currentColor"/>',search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5L21 21"/>',mic:'<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21"/>',drop:'<path d="M12 3.5c3.8 4.6 6 7.6 6 10.5a6 6 0 0 1-12 0c0-2.9 2.2-5.9 6-10.5z"/>',wind:'<path d="M3 9h10a2.8 2.8 0 1 0-2.8-2.8M3 14h14a2.8 2.8 0 1 1-2.8 2.8M3 19h6"/>',cloud:'<path d="M7 18a4 4 0 0 1-.4-8A5.5 5.5 0 0 1 17 8.5 4.7 4.7 0 0 1 17 18z"/>',minus:'<path d="M6 12h12"/>',check:'<path d="M5 12.5l4.5 4.5L19 7"/>'};
const arrow=(s=18)=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="currentColor"><path d="M3.5 11L20.5 3.5 13 20.5l-2-7.5z"/></svg>`;
const C=[['me','서울특별시','Asia/Seoul',126.98,37.57,10,1],['seoul','서울','Asia/Seoul',126.98,37.57,10,2],['incheon','인천','Asia/Seoul',126.7,37.46,9.5,3],['jeju','제주특별자치도','Asia/Seoul',126.53,33.5,13,4],['anyang','안양시','Asia/Seoul',126.95,37.39,9,5],['busan','부산','Asia/Seoul',129.07,35.18,13,6],['daegu','대구','Asia/Seoul',128.6,35.87,11,7],['daejeon','대전','Asia/Seoul',127.38,36.35,10,8],['gwangju','광주','Asia/Seoul',126.85,35.16,12,9],['suwon','수원','Asia/Seoul',127.03,37.26,9.5,10],['tokyo','도쿄','Asia/Tokyo',139.7,35.7,16,11],['ny','뉴욕','America/New_York',-74,40.7,14,12],['london','런던','Europe/London',-0.12,51.5,11,13],['paris','파리','Europe/Paris',2.35,48.85,12,14],['sydney','시드니','Australia/Sydney',151.2,-33.9,19,15],['sg','싱가포르','Asia/Singapore',103.8,1.35,29,16]].map(a=>({id:a[0],n:a[1],tz:a[2],x:a[3],y:a[4],t:a[5],sd:a[6]}));
const byId=id=>C.find(c=>c.id==id);
let L;try{L=JSON.parse(localStorage.getItem('wx.c'))}catch(e){}if(!Array.isArray(L)||!L.length)L=['me','seoul','incheon','jeju','anyang'];
const save=()=>{try{localStorage.setItem('wx.c',JSON.stringify(L))}catch(e){}};
const S={v:'main',i:0,m:'c',ed:0,q:''};
const R=s=>()=>{s|=0;s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};
const CN={clear:'청명함',pclear:'부분적으로 흐림',cloud:'흐림',rain:'비',snow:'눈',wind:'바람'};
const hrOf=tz=>+new Intl.DateTimeFormat('en-US',{hour:'numeric',hourCycle:'h23',timeZone:tz}).format(new Date());
const isN=h=>h<6||h>=18;
const ic=(c,n)=>c=='clear'?(n?'moon':'sun'):c=='pclear'?(n?'pmoon':'psun'):c;
const cache={};
function gen(c){const h=hrOf(c.tz),k=c.id+h;if(cache[k])return cache[k];const r=R(c.sd*97),cs=['clear','pclear','cloud','rain','rain','wind','clear','rain','rain','wind'];
const o=c.sd%4,D=cs.map((x,i)=>{const cc=i?cs[(i+o)%10]:'clear',hi=Math.round(c.t+4+r()*7+i%3),lo=Math.round(hi-6-r()*6);return{c:cc,hi,lo,p:cc=='rain'?Math.round((35+r()*45)/5)*5:0}});
const H=[];for(let q=0;q<24;q++){const x=h+q,hr=x%24,d=D[x>=24?1:0],t=Math.round(d.lo+(d.hi-d.lo)*(.5+.5*Math.sin((hr-9)/24*2*Math.PI)));H.push({hr,t,c:d.c,p:d.p,w:2+(q*7+c.sd)%6})}
return cache[k]={D,H,now:H[0].t,c:D[0].c,h}}
const lab=(hr,q)=>q?`${hr<12?'오전':'오후'} ${hr%12||12}시`:'지금';
const tc=t=>t<=8?'#6fd0e4':t<=14?'#8fd8b8':t<=19?'#d6dc7a':t<=23?'#f3c64d':'#f59a35';
function sky(n,c,h,nm){let s=['<svg viewBox="0 0 400 800" preserveAspectRatio="xMidYMid slice">'],r=R(h+7);
if(n){for(let i=0;i<110;i++){const x=r()*400,y=r()*800,z=.4+r()*1.2,o=.25+r()*.75;s.push(`<circle cx="${x|0}" cy="${y|0}" r="${z.toFixed(1)}" fill="#fff" opacity="${o.toFixed(2)}"/>`);if(z>1.2)s.push(`<circle cx="${x|0}" cy="${y|0}" r="${(z*2.6).toFixed(1)}" fill="#cfe0ff" opacity=".35" filter="url(#gl)"/>`)}
if(c!='cloud'&&c!='rain'&&!nm)s.push(`<g transform="translate(36 40) scale(1.25)"><circle cx="40" cy="40" r="46" fill="#aab8e8" opacity=".18" filter="url(#gm)"/><circle cx="40" cy="40" r="32" fill="url(#mg)"/><g clip-path="url(#mc)"><g fill="#6c7388" opacity=".42"><circle cx="30" cy="30" r="7"/><circle cx="50" cy="26" r="4.5"/><circle cx="46" cy="48" r="9"/><circle cx="26" cy="52" r="5"/><circle cx="58" cy="40" r="3.5"/></g><circle cx="58" cy="52" r="34" fill="#0d1226" opacity=".35"/></g></g>`)}

if(c!='clear'){for(let i=0;i<5;i++)s.push(`<ellipse cx="${r()*400|0}" cy="${60+r()*300|0}" rx="${90+r()*70|0}" ry="${20+r()*14|0}" fill="${n?'#8a93b0':'#fff'}" opacity="${n?.14:.3}" filter="url(#gm)"/>`)}
return s.join('')+'</svg>'}
function toggleBtns(){const b=[['c','cloud'],['r','drop'],['w','wind']];return `<div class="sg">${b.map((x,i)=>(i?'<i></i>':'')+`<button data-a="m" data-v="${x[0]}" class="${S.m==x[0]?'on':''}">${U(P[x[1]],22)}</button>`).join('')}</div>`}
function bar(d,g,now){const a=(d.lo-g[0])/(g[1]-g[0])*100,w=Math.max(6,(d.hi-d.lo)/(g[1]-g[0])*100);return `<div class="tr"><u style="left:${a}%;width:${w}%;background:linear-gradient(90deg,${tc(d.lo)},${tc(d.hi)})"></u>${now!=null?`<s style="left:${Math.min(100,Math.max(0,(now-g[0])/(g[1]-g[0])*100))}%;top:0"></s>`:''}</div>`}
function main(){const c=byId(L[S.i]),g=gen(c),n=isN(g.h),cl=n?'n':'d',x=g.c=='cloud'||g.c=='rain'?' c':'';
const gr=[Math.min(...g.D.map(d=>d.lo)),Math.max(...g.D.map(d=>d.hi))],d0=g.D[0];
const wd=i=>i?new Date(Date.now()+i*864e5).toLocaleDateString('ko-KR',{weekday:'short',timeZone:c.tz}):'오늘';
const hv=(h,q)=>S.m=='c'?`<div class="v">${h.t}°</div>`:S.m=='r'?`<div class="v" style="font-size:18px">${h.p?h.p+'%':'-'}</div>`:`<div class="v" style="font-size:17px">${h.w}m/s</div>`;
const hi=(h,q)=>S.m=='c'?I(ic(h.c,isN(h.hr)),38):S.m=='r'?U(P.drop,30,'style="color:#68c8f0"'):U(P.wind,30);
return `<div class="bg ${cl}${x}">${sky(n,g.c,g.h)}</div><div class="sc" id="sc"><div class="hero" id="hero"><div class="l">${S.i?'':'나의 위치'}</div><div class="cn">${c.n}</div><div class="tp">${g.now}°</div><div class="cd">${CN[g.c]}</div><div class="hl">최고:${d0.hi}°&nbsp; 최저:${d0.lo}°</div></div>
<div class="pn"><div class="ph"><div><b>기상 상태</b><small>온도(°C)</small></div>${toggleBtns()}</div><div class="hr">${g.H.map((h,q)=>`<div class="hc"><div class="t">${lab(h.hr,q)}</div>${hi(h)}${hv(h)}</div>`).join('')}</div></div>
<div class="pn" id="dly" style="padding-top:6px;padding-bottom:6px">${g.D.map((d,i)=>`<div class="dr"><div class="w">${wd(i)}</div><div class="ic">${I(ic(d.c,i==0&&n),32)}${d.p?`<em>${d.p}%</em>`:''}</div><div class="rg"><span class="lo">${d.lo}°</span>${bar(d,gr,i?null:g.now)}<span class="hi">${d.hi}°</span></div></div>`).join('')}</div>
<div style="text-align:center;font-size:12px;color:var(--sub);margin:4px 0 8px">예시 데이터이며 실제 날씨가 아닙니다</div></div>

<div class="bar"><button class="rb" data-a="v" data-v="map">${U(P.map,26)}</button><div class="cap"><span>${arrow(18)}</span>${L.map((_,i)=>`<i class="${i==S.i?'on':''}" data-a="go" data-v="${i}"></i>`).join('')}</div><button class="rb" data-a="v" data-v="list">${U(P.list,26)}</button></div>`}
function list(){const q=S.q.trim(),res=q?C.filter(c=>!L.includes(c.id)&&c.n.includes(q)):[];
const cards=L.map((id,i)=>{const c=byId(id),g=gen(c),n=isN(g.h),d=g.D[0],x=g.c=='cloud'||g.c=='rain'?' c':'',t=new Intl.DateTimeFormat('ko-KR',{hour:'numeric',minute:'2-digit',hour12:true,timeZone:c.tz}).format(new Date());
return `<div class="cc">${S.ed&&id!='me'?`<button class="dl" data-a="del" data-v="${id}">${U(P.minus,22)}</button>`:''}<button class="in bg-in" data-a="go2" data-v="${i}" style="background:${n?(x?'#2a3050':'#1b2147'):(x?'#6b7f98':'#3f86cf')}"><svg viewBox="0 0 400 130" preserveAspectRatio="xMidYMid slice">${sky(n,g.c,i+3,1).replace(/<svg[^>]*>|<\/svg>/g,'')}</svg><div><div><b>${c.n}</b><small>${i?t:'나의 위치'}</small></div><div class="sd">${CN[g.c]}</div></div><div class="r"><div class="tt">${g.now}°</div><div class="hl">최고:${d.hi}° 최저:${d.lo}°</div></div></button></div>`}).join('');
return `<div class="sc" id="sc"><div class="top"><h1>날씨</h1><button class="rb" data-a="ed">${S.ed?U(P.check,24):U(P.more,26)}</button></div>${q?(res.length?res.map(c=>`<button class="sr" data-a="add" data-v="${c.id}"><span>${c.n}</span><small>추가</small></button>`).join(''):'<div style="padding:24px 8px;color:var(--sub)">검색 결과가 없습니다</div>'):cards}</div>
<div class="sb">${U(P.search,22,'style="color:rgba(190,200,225,.6)"')}<input id="q" placeholder="도시 또는 공항 검색" value="${S.q.replace(/"/g,'&quot;')}"><button data-a="mic" style="color:rgba(190,200,225,.7)">${U(P.mic,22)}</button></div>`}
function mapv(){const cs=L.map(byId),xs=cs.map(c=>c.x),ys=cs.map(c=>c.y),px=Math.max(.8,(Math.max(...xs)-Math.min(...xs))*.2),py=Math.max(.8,(Math.max(...ys)-Math.min(...ys))*.2),x0=Math.min(...xs)-px,x1=Math.max(...xs)+px,y0=Math.min(...ys)-py,y1=Math.max(...ys)+py,k=Math.min(340/(x1-x0),560/(y1-y0));
const ps=cs.map((c,i)=>{const g=gen(c),X=20+(c.x-x0)*k,Y=70+(y1-c.y)*k;return `<g data-a="go2" data-v="${i}" style="cursor:pointer" transform="translate(${X.toFixed(0)} ${Y.toFixed(0)})"><circle r="22" fill="#2e3a62" stroke="rgba(255,255,255,.25)"/><text y="5" text-anchor="middle" fill="#fff" font-size="15" font-weight="600">${g.now}°</text><text y="38" text-anchor="middle" fill="#bcc8e6" font-size="12">${c.n}</text></g>`}).join('');
return `<div class="mp"><svg viewBox="0 0 380 700" width="100%" height="100%" preserveAspectRatio="xMidYMid meet"><g stroke="rgba(255,255,255,.07)">${[1,2,3,4,5,6,7,8,9,10,11,12].map(i=>`<path d="M${i*32} 0V700M0 ${i*58}H380"/>`).join('')}</g>${ps}</svg><div class="top"><h1>지도</h1><button class="rb" data-a="v" data-v="list">${U(P.list,24)}</button></div></div><div class="bar"><button class="rb" data-a="v" data-v="main">${U(P.map,26)}</button><div class="cap"><span>${arrow(18)}</span>${L.map((_,i)=>`<i class="${i==S.i?'on':''}" data-a="go" data-v="${i}"></i>`).join('')}</div><button class="rb" data-a="v" data-v="list">${U(P.list,26)}</button></div>`}
function draw(keep){const y=$('#sc')?$('#sc').scrollTop:0;A.className=S.v=='list'?'ls':'';A.innerHTML=S.v=='main'?main():S.v=='list'?list():mapv();const s=$('#sc');if(!s)return;if(keep)s.scrollTop=y;

const q=$('#q');if(q){q.oninput=e=>{S.q=e.target.value;const p=e.target.selectionStart;draw(1);const n=$('#q');n.focus();n.setSelectionRange(p,p)}}}
A.onclick=e=>{const t=e.target.closest('[data-a]');if(!t)return;const a=t.dataset.a,v=t.dataset.v;
if(a=='m')S.m=v;else if(a=='v'){S.v=v;S.q=''}else if(a=='go'){S.i=+v;if(S.v=='list')S.v='main'}else if(a=='go2'){S.i=+v;S.v='main'}
else if(a=='ed')S.ed=!S.ed;else if(a=='del'){L=L.filter(x=>x!=v);S.i=0;save()}else if(a=='add'){L.push(v);S.q='';save()}
else if(a=='mic'){const SR=window.SpeechRecognition||window.webkitSpeechRecognition;if(SR){const r=new SR();r.lang='ko-KR';r.onresult=ev=>{S.q=ev.results[0][0].transcript;draw()};try{r.start()}catch(x){}}return}
draw(a=='m')};
draw();

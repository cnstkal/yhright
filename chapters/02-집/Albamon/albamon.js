(function(){
const D=window.ALBA_DATA,$=s=>document.querySelector(s),app=$('#app');
const ICON={
 menu:'<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>',
 me:'<svg class="ic" viewBox="0 0 24 24" fill="#fff"><circle cx="12" cy="8" r="4.5"/><path d="M3 22c0-5 4-8 9-8s9 3 9 8z"/></svg>',
 back:'<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2"><path d="M15 4 7 12l8 8"/></svg>',
 home:'<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M3 11 12 3l9 8M6 9v11h12V9"/></svg>',
 set:'<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><circle cx="12" cy="12" r="3.5"/><circle cx="12" cy="12" r="8"/></svg>',
 x:'<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2"><path d="M4 4l16 16M20 4 4 20"/></svg>',
 sr:'<svg viewBox="0 0 24 24" fill="none" stroke="#ff6428" stroke-width="2.4"><circle cx="10" cy="10" r="6.5"/><path d="m15 15 6 6"/></svg>'};
/* 상태 */
let applied;try{applied=JSON.parse(localStorage.getItem('alba2018_applied'))}catch(e){}
if(!Array.isArray(applied))applied=D.applied.slice();
const save=()=>{try{localStorage.setItem('alba2018_applied',JSON.stringify(applied))}catch(e){}};
let area="서울",gu="전체",q="",stack=[],menuTab="채용정보";
const job=id=>D.jobs.find(j=>j.id==id);
const toast=m=>{const t=$('#toast');t.textContent=m;t.classList.add('on');clearTimeout(toast.t);toast.t=setTimeout(()=>t.classList.remove('on'),1400)};
const soon=()=>toast('서비스 준비 중입니다.');
const logo=j=>`<div class="lg" style="color:${j.color}">${j.logo}</div>`;
const sc={};
function mk(id,html){let e=sc[id];if(!e){e=sc[id]=document.createElement('div');e.className='scr';app.appendChild(e)}e.innerHTML=html;return e}
function go(id,push=true){if(push&&stack[stack.length-1]!==id)stack.push(id);app.querySelectorAll('.scr').forEach(e=>e.classList.remove('on'));render[id]();sc[id].classList.add('on')}
function back(){if(stack.length<2)return false;stack.pop();go(stack[stack.length-1],false);return true}
const sub=(t,right='')=>`<div class="hd sub"><div class="top"><button data-a="back">${ICON.back}</button><span class="tt">${t}</span><span class="sp"></span>${right}</div></div>`;
const render={
home(){
 const list=D.jobs.filter(j=>(gu==="전체"||j.area.startsWith(gu))&&(!q||(j.title+j.co+j.sub).includes(q)));
 const cards=list.length?list.map(j=>`<button class="cd" data-job="${j.id}">${j.hot?'<div class="hot"><span>HOT</span></div>':''}<i class="dots"></i>${logo(j)}<div class="co">${j.sub}</div><div class="ti">${j.title}</div><div class="mt">${j.area} · <b>${j.pay}</b> ${j.amt}</div></button>`).join(''):'<div class="empty">조건에 맞는 공고가 없습니다.</div>';
 const opts=o=>o.map(x=>`<option${x==gu?' selected':''}>${x}</option>`).join('');
 const e=mk('home',`<div class="hd"><div class="top"><button data-a="menu">${ICON.menu}</button><span class="logo">albamon</span><button data-a="apply">${ICON.me}</button></div>
 <div class="sr"><input id="q" value="${q}" placeholder="" enterkeyhint="search"><button data-a="search">${ICON.sr}</button></div>
 <div class="cat"><button data-a="soon">맞춤알바</button><button data-a="soon">지역알바</button><button data-a="soon">단기알바</button><button data-a="soon">급구알바</button></div></div>
 <div class="body"><div class="bn"><small>알바, 몸으로 구하라</small><b>알바의 신기술</b></div>
 <div class="rg"><label><span>${area}</span><i></i><select id="ar">${Object.keys(D.areas).map(a=>`<option${a==area?' selected':''}>${a}</option>`).join('')}</select></label><label><span>${gu}</span><i></i><select id="gu">${opts(D.areas[area])}</select></label></div>
 <div class="gd"><div class="gt"><span class="av"></span>M 지역 Grand<em><b>1</b> / 36</em></div><div class="grid">${cards}</div><button class="more" data-a="soon">더보기</button></div></div>`);
 const qi=e.querySelector('#q');qi.onkeydown=ev=>{if(ev.key==='Enter'){q=qi.value.trim();go('home',false)}};
 e.querySelector('#ar').onchange=ev=>{area=ev.target.value;gu="전체";go('home',false)};
 e.querySelector('#gu').onchange=ev=>{gu=ev.target.value;go('home',false)};
},
menu(){
 const tabs=Object.keys(D.menu),items=D.menu[menuTab].map(m=>m==='-'?'<hr>':`<button class="${m[1]==='b'?'b':''} ${m[1]==='dot'?'dot':''}" data-a="${m[2]||'soon'}">${m[0]}</button>`).join('');
 mk('menu',`<div class="mh"><span class="nm">김알바님</span><button data-a="home">${ICON.home}</button><button data-a="soon">${ICON.set}</button><button data-a="back">${ICON.x}</button></div>
 <div class="nt"><span>공지</span>알바몬 택시&버스 광고 인증샷 이벤트<u data-a="soon">더보기</u></div>
 <div class="body"><div class="fv"><h4>즐겨찾는 메뉴<s>⊕ 편집</s></h4><div class="fvs"><button data-a="soon"><i class="bx"></i>맞춤알바</button><button data-a="soon"><i class="bx"></i>지역별</button><button data-a="apply"><i class="bx"></i>지원현황</button><button data-a="soon"><i class="pl">+</i>추가</button></div></div><div class="sep"></div>
 <div class="mt2">${tabs.map(t=>`<button class="${t==menuTab?'on':''}" data-tab="${t}">${t}</button>`).join('')}</div><div class="ml">${items}</div></div>`);
},
apply(){
 const n=s=>applied.filter(a=>a.status===s).length;
 const rows=applied.length?applied.map(a=>{const j=job(a.jobId),k=a.status==='면접제안'?'i':a.status==='열람'?'k':'';return`<button class="ap" data-job="${j.id}"><div class="lg" style="color:${j.color}">${j.logo}</div><div class="in"><div class="co">${j.co}</div><div class="ti">${j.title}</div><div class="mt">지원일 ${a.date} · ${j.area}</div></div><span class="tag ${k}">${a.status}</span></button>`}).join(''):'<div class="none">지원한 알바가 없습니다.</div>';
 mk('apply',`${sub('지원현황')}<div class="body"><div class="st"><div><b>${applied.length}</b>전체</div><div><b>${n('미열람')}</b>미열람</div><div><b>${n('열람')}</b>열람</div><div><b>${n('면접제안')}</b>면접제안</div></div>${rows}</div>`);
},
detail(){
 const j=job(render.cur),done=applied.some(a=>a.jobId==j.id);
 mk('detail',`${sub('채용정보')}<div class="body"><div class="dt">${logo(j)}<div class="co">${j.co}</div><h2>${j.title}</h2><dl><div><dt>근무지</dt><dd>서울 ${j.area}</dd></div><div><dt>급여</dt><dd><b>${j.pay} ${j.amt}</b></dd></div><div><dt>근무시간</dt><dd>${j.time}</dd></div><div><dt>고용형태</dt><dd>${j.type}</dd></div></dl><p>${j.desc}</p></div></div>
 <div class="bt"><button data-a="soon">스크랩</button><button class="p ${done?'d':''}" data-apply="${j.id}">${done?'지원완료':'입사지원'}</button></div>`);
}};
app.addEventListener('click',e=>{
 const t=e.target.closest('[data-a],[data-job],[data-tab],[data-apply]');if(!t)return;
 const d=t.dataset;
 if(d.job){render.cur=d.job;go('detail')}
 else if(d.tab){menuTab=d.tab;go('menu',false)}
 else if(d.apply){if(applied.some(a=>a.jobId==d.apply))return toast('이미 지원한 공고입니다.');applied.unshift({jobId:+d.apply,date:'2018.05.15',status:'미열람'});save();toast('입사지원이 완료되었습니다.');go('detail',false)}
 else switch(d.a){
  case'back':back();break;case'menu':go('menu');break;case'apply':stack=['home','apply'];go('apply',false);break;
  case'home':stack=['home'];go('home',false);break;
  case'search':{const v=$('#q').value.trim();q=v;go('home',false);break}
  default:soon()}
});
window.addEventListener('message',e=>{if(e.data&&e.data.type==='back'){const h=back();e.source.postMessage({type:'backHandled',handled:h},'*')}});
stack=['home'];go('home',false);
})();

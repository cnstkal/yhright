(function(){
const D=window.SOL_DATA,$=s=>document.querySelector(s),app=$('#app');
const won=n=>String(Math.abs(n)).replace(/\B(?=(\d{3})+(?!\d))/g,',');
/* 거래 후 잔액 누적 계산 (고정 데이터 → 항상 동일) */
D.accounts.forEach(a=>{let b=a.open;a.list=a.tx.map(t=>{const s=t[2]==='in'?1:-1;b+=s*t[4];return{d:t[0],t:t[1],type:t[2],desc:t[3],amt:s*t[4],bal:b}});a.balance=b});
const total=D.accounts.reduce((s,a)=>s+a.balance,0);
const I={me:'<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.5 3.500-7 8-7s8 2.500 8 7"/></svg>',
 bell:'<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M6 17V11a6 6 0 0 1 12 0v6l2 2H4zM10 21h4"/></svg>',
 menu:'<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>',
 back:'<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2"><path d="M15 4 7 12l8 8"/></svg>',
 home:'<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M3 11 12 3l9 8M6 9v11h12V9"/></svg>'};
const toast=m=>{const t=$('#toast');t.textContent=m;t.classList.add('on');clearTimeout(toast.t);toast.t=setTimeout(()=>t.classList.remove('on'),1400)};
const soon=()=>toast('서비스 준비 중입니다.');
let stack=['main'],cur=1,flt='전체';const sc={};
function mk(id,h){let e=sc[id];if(!e){e=sc[id]=document.createElement('div');e.className='scr';app.appendChild(e)}e.innerHTML=h}
function go(id,push=true){if(push&&stack[stack.length-1]!==id)stack.push(id);app.querySelectorAll('.scr').forEach(e=>e.classList.remove('on'));R[id]();sc[id].classList.add('on')}
function back(){if(stack.length<2)return false;stack.pop();go(stack[stack.length-1],false);return true}
const acc=id=>D.accounts.find(a=>a.id==id);
const tabs=a=>`<nav class="tb">${['전체계좌','상품몰','자산관리','챗봇','고객지원'].map(t=>`<button class="${t===a?'on':''}" data-a="${t==='전체계좌'?'all':'soon'}"><i></i>${t}</button>`).join('')}</nav>`;
const rows=()=>D.accounts.map(a=>`<button class="al" data-acc="${a.id}"><div class="in"><div class="n1">${a.name}</div><div class="n2">${a.no}</div></div><div class="am">${won(a.balance)}원</div></button>`).join('');
const R={
main(){const a=acc(1);
 mk('main',`<div class="hd"><button data-a="soon">${I.me}</button><img src="assets/logo.svg" alt="SOL"><button data-a="soon">${I.bell}</button><button data-a="soon">${I.menu}</button></div>
 <div class="body"><div class="top"><div class="hi">${D.user}님, 안녕하세요</div><div class="card"><div class="nm">${a.name}</div><div class="no">${a.no}</div><div class="bal" data-acc="1">${won(a.balance)}<small>원</small></div><div class="dts"><i></i><i></i><i></i></div><div class="ac"><button data-a="soon">이체</button><button data-acc="1">거래내역</button></div></div></div>
 <div class="sum"><span>전체 계좌 잔액</span><b>${won(total)}원</b></div>
 <div class="sec"><h4>내 계좌</h4>${rows()}</div>
 <div class="sc">${['쏠편한환전','신한카드<br>승인내역','신한플러스','이벤트/<br>쿠폰박스','모바일번호표','모바일OTP<br>발급'].map(t=>`<button data-a="soon">${t}</button>`).join('')}<button class="pl" data-a="soon">+</button></div>
 <div class="notice"><span>퇴직연금(DC,IRP) 자산진단을 점검해 보세요</span><span>›</span></div></div>${tabs('')}`)},
all(){mk('all',`<div class="hd"><button data-a="back">${I.back}</button><span class="tt">전체계좌</span><button data-a="home">${I.home}</button></div>
 <div class="body"><div class="sum" style="margin-top:0"><span>총 잔액</span><b>${won(total)}원</b></div><div class="sec" style="margin-top:0">${rows()}</div></div>${tabs('전체계좌')}`)},
detail(){const a=acc(cur);let l=a.list.slice().reverse();
 if(flt!=='전체')l=l.filter(t=>({입금:'in',출금:'out',체크카드:'card'})[flt]===t.type);
 let h='',last='';
 l.forEach(t=>{if(t.d!==last){last=t.d;h+=`<div class="dd">${t.d.replace(/-/g,'.')}</div>`}
  const lb={in:'입금',out:'출금',card:'체크카드'}[t.type];
  h+=`<div class="tx t-${t.type}"><div class="l"><div class="ds">${t.desc}</div><div class="sb"><span class="tg">${lb}</span>${t.t}</div></div><div class="r"><div class="a">${t.amt>0?'+':'-'}${won(t.amt)}원</div><div class="bl">잔액 ${won(t.bal)}원</div></div></div>`});
 mk('detail',`<div class="hd"><button data-a="back">${I.back}</button><span class="tt">거래내역조회</span><button data-a="home">${I.home}</button></div>
 <div class="dh"><div class="nm">${a.name}</div><div class="no">${a.no}</div><div class="bal">${won(a.balance)}<small>원</small></div><div class="ac"><button data-a="soon">이체</button><button data-a="soon">계좌관리</button></div></div>
 <div class="fl">${['전체','입금','출금','체크카드'].map(f=>`<button class="${f===flt?'on':''}" data-f="${f}">${f}</button>`).join('')}</div>
 <div class="body">${h||'<div class="none">거래내역이 없습니다.</div>'}</div>`)}};
app.addEventListener('click',e=>{const t=e.target.closest('[data-a],[data-acc],[data-f]');if(!t)return;const d=t.dataset;
 if(d.acc){cur=+d.acc;flt='전체';go('detail')}else if(d.f){flt=d.f;go('detail',false)}
 else if(d.a==='back')back();else if(d.a==='all')go('all');else if(d.a==='home'){stack=['main'];go('main',false)}else soon()});
window.addEventListener('message',e=>{if(e.data&&e.data.type==='back'){const h=back();e.source.postMessage({type:'backHandled',handled:h},'*')}});
go('main',false);
})();

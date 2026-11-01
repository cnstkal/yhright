(()=>{'use strict';
const $=s=>document.querySelector(s),KEY='yhright.phone.v1',MSG='yhright.messages.v1';
const defaults=[['엄마','010-3960-2207'],['형','010-2394-7716'],['민준','010-3347-8850'],['지수','010-7316-8842']];
let contacts=defaults.map((x,i)=>({id:'p'+i,name:x[0],phone:x[1]})),logs=[];
try{const d=JSON.parse(localStorage.getItem(KEY)||'{}');if(Array.isArray(d.contacts))contacts=d.contacts;if(Array.isArray(d.logs))logs=d.logs}catch(e){}
try{const m=JSON.parse(localStorage.getItem(MSG)||'{}');(m.contacts||[]).forEach(c=>{if(c.phone&&!contacts.some(x=>digits(x.phone)===digits(c.phone)))contacts.push({id:c.id,name:c.name,phone:c.phone})})}catch(e){}
const digits=s=>(s||'').replace(/\\D/g,''),save=()=>localStorage.setItem(KEY,JSON.stringify({contacts,logs})),q=new URLSearchParams(location.search);
let num=q.get('number')||'',selected=null,started=0,timer=null;
function fmt(s){const n=digits(s);return n.length>7?n.replace(/^(02|0\\d{2})(\\d{3,4})(\\d{4})$/,'$1-$2-$3'):s}
function contact(n){return contacts.find(c=>digits(c.phone)===digits(n))}
function toast(s){const t=$('#toast');t.textContent=s;t.hidden=false;setTimeout(()=>t.hidden=true,1500)}
function showTab(t){document.querySelectorAll('.page').forEach(e=>e.classList.remove('on'));$('#'+t).classList.add('on');document.querySelectorAll('[data-tab]').forEach(e=>e.classList.toggle('on',e.dataset.tab===t));if(t==='log')renderLogs();if(t==='fav')renderFav();if(t==='contacts')renderContacts();if(t==='keypad')renderKeypad()}
function row(x){const c=contact(x.number),name=x.name||c?.name||x.number;return '<div class="entry" data-num="'+x.number+'"><span class="avatar">'+(name[0]||'?')+'</span><div class="entry-main"><b>'+name+'</b><small>'+fmt(x.number)+' · '+x.type+'</small></div><time>'+new Date(x.time).toLocaleDateString('ko-KR')+'</time><button class="callbtn" data-call="'+x.number+'">☎</button></div>'}
function renderLogs(){$('#loglist').innerHTML=logs.length?logs.slice().reverse().map(row).join(''):'<p style="text-align:center;color:#999;padding:55px 0">최근 통화 기록이 없습니다.</p>'}
function renderFav(){$('#favlist').innerHTML=contacts.filter(c=>c.fav).map(c=>'<div class="entry" data-num="'+c.phone+'"><span class="avatar">'+c.name[0]+'</span><div class="entry-main"><b>'+c.name+'</b><small>'+c.phone+'</small></div><button class="callbtn" data-call="'+c.phone+'">☎</button></div>').join('')||'<p style="text-align:center;color:#999;padding:55px 0">즐겨찾기가 없습니다.</p>'}
function renderContacts(){const term=$('#search').value||'';$('#contactlist').innerHTML=contacts.filter(c=>c.name.includes(term)||c.phone.includes(term)).map(c=>'<div class="entry" data-detail="'+c.phone+'"><span class="avatar">'+c.name[0]+'</span><div class="entry-main"><b>'+c.name+'</b><small>'+c.phone+'</small></div><button class="callbtn" data-call="'+c.phone+'">☎</button></div>').join('')}
function renderKeypad(){$('#number').textContent=fmt(num);$('#dial').disabled=!digits(num);$('#sms').disabled=!digits(num)}
function dial(n){num=n;showTab('keypad');renderKeypad()}
function details(n){selected=n;const c=contact(n);$('#dName').textContent=c?.name||n;$('#dAvatar').textContent=(c?.name||n)[0]||'?';$('#dNumber').textContent=n;$('#dHistory').innerHTML=logs.filter(x=>digits(x.number)===digits(n)).slice(-6).reverse().map(x=>'<div class="entry"><div class="entry-main"><b>'+x.type+'</b><small>'+new Date(x.time).toLocaleString('ko-KR')+'</small></div></div>').join('');$('#detail').hidden=false}
function startCall(n){if(!digits(n))return;num=n;const c=contact(n),name=c?.name||n;$('#cName').textContent=name;$('#cAvatar').textContent=name[0];$('#cNumber').textContent=n;$('#callState').textContent='통화 연결 중…';$('#calling').hidden=false;started=Date.now();clearInterval(timer);timer=setInterval(()=>{$('#callState').textContent=Math.floor((Date.now()-started)/1000)+'초'},1000)}
function endCall(){if(!started)return;const c=contact(num);logs.push({number:num,name:c?.name||'',type:'발신',time:Date.now()});save();started=0;clearInterval(timer);$('#calling').hidden=true;renderLogs();toast('통화가 종료되었습니다.')}
document.querySelectorAll('[data-tab]').forEach(b=>b.addEventListener('click',()=>showTab(b.dataset.tab)));
$('#keys').innerHTML=[['1',''],['2','ABC'],['3','DEF'],['4','GHI'],['5','JKL'],['6','MNO'],['7','PQRS'],['8','TUV'],['9','WXYZ'],['*',''],['0','+'],['#','']].map(x=>'<button class="key" data-key="'+x[0]+'"><b>'+x[0]+'</b><small>'+x[1]+'</small></button>').join('');
$('#keys').addEventListener('click',e=>{const b=e.target.closest('[data-key]');if(b){num+=b.dataset.key;renderKeypad()}});
$('#erase').onclick=()=>{num=num.slice(0,-1);renderKeypad()};
$('#dial').onclick=()=>startCall(num);
$('#sms').onclick=()=>location.href='../Messages/messages.html?to='+encodeURIComponent(num)+'&name='+encodeURIComponent(contact(num)?.name||num);
$('#openMessages').onclick=()=>location.href='../Messages/messages.html';
$('#search').addEventListener('input',renderContacts);
$('#loglist').addEventListener('click',e=>{const c=e.target.closest('[data-call]');if(c){startCall(c.dataset.call);return}const r=e.target.closest('[data-num]');if(r)details(r.dataset.num)});
$('#favlist').addEventListener('click',e=>{const c=e.target.closest('[data-call]');if(c)startCall(c.dataset.call)});
$('#contactlist').addEventListener('click',e=>{const c=e.target.closest('[data-call]');if(c){startCall(c.dataset.call);return}const r=e.target.closest('[data-detail]');if(r)details(r.dataset.detail)});
$('#dCall').onclick=()=>{const n=selected;$('#detail').hidden=true;startCall(n)};
$('#dSms').onclick=()=>location.href='../Messages/messages.html?to='+encodeURIComponent(selected)+'&name='+encodeURIComponent(contact(selected)?.name||selected);
$('#end').onclick=endCall;
$('#mute').onclick=()=>toast('음소거가 설정되었습니다.');
$('#speaker').onclick=()=>toast('스피커가 설정되었습니다.');
$('#keyToggle').onclick=()=>{dial(num);$('#calling').hidden=true};
document.querySelectorAll('[data-close]').forEach(b=>b.onclick=()=>$('#detail').hidden=true);
$('#more').onclick=()=>$('#menu').hidden=!$('#menu').hidden;
$('#menuDelete').onclick=()=>{logs=[];save();renderLogs();$('#menu').hidden=true;toast('통화 기록을 삭제했습니다.')};
$('#menuSettings').onclick=()=>{toast('설정은 준비 중입니다.');$('#menu').hidden=true};
showTab('log');
if(num){dial(num);if(q.get('call')==='1')startCall(num)}
})();
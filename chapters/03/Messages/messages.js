'use strict';
(()=>{
const $=s=>document.querySelector(s);
const KEY='ios14-messages-v1';
const MIN=6e4,now=Date.now();
const T=m=>now+m*MIN;
const PEOPLE={
  c1:{n:'김민준',col:'#ff6b6b'},c2:{n:'이서연',col:'#4dabf7'},c3:{n:'박지호',col:'#63c132'},
  c4:{n:'최유진',col:'#b197fc'},c6:{n:'한지민',col:'#38d9a9'},c8:{n:'강시우',col:'#91a7ff'},
  c10:{n:'010-5555-0147',col:'#adb5bd'}
};
const SEED=[
  {id:'c1',pin:1,unread:1,msgs:[{f:'c1',t:T(-42),x:'오늘 저녁 7시 괜찮아?'},{f:'c1',t:T(-40),x:'장소는 종로로 잡을까'}]},
  {id:'c2',pin:1,unread:0,msgs:[{f:'me',t:T(-320),x:'사진 보내줄게'},{f:'c2',t:T(-300),x:'좋아, 기다리는 중!'},{f:'c2',t:T(-299),type:'photo'}]},
  {id:'c3',pin:1,unread:0,msgs:[{f:'c3',t:T(-600),x:'다음 주 러닝 같이 할래?'},{f:'me',t:T(-590),x:'좋아 토요일 아침 어때'}]},
  {id:'g1',pin:1,unread:2,group:['c3','c6','c8'],title:'주말 농구팀',msgs:[{f:'c3',t:T(-90),x:'토요일 9시 가능한 사람?'},{f:'c6',t:T(-88),x:'@박지호 나 가능!'},{f:'c8',t:T(-85),x:'나도 가능 체육관 예약할게'}]},
  {id:'c6',sms:1,unread:0,msgs:[{f:'c6',t:T(-2000),x:'내일 택배 왔더라'},{f:'me',t:T(-1990),x:'고마워 ㅎㅎ'}]},
  {id:'c10',sms:1,unread:0,msgs:[{f:'c10',t:T(-4200),x:'인증번호는 4821입니다.'}]},
  {id:'c4',unread:0,msgs:[{f:'c4',t:T(-7000),x:'회의 자료 보내드렸어요'}]}
];

function load(){try{const s=JSON.parse(localStorage.getItem(KEY));if(s&&s.length)return s}catch(e){}return JSON.parse(JSON.stringify(SEED))}
let C=load();
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(C))}catch(e){}};
const conv=id=>C.find(c=>c.id===id);
const name=id=>id==='me'?'나':(PEOPLE[id]?PEOPLE[id].n:id);
const colOf=id=>PEOPLE[id]?PEOPLE[id].col:'#adb5bd';
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const title=c=>c.group?c.title:(PEOPLE[c.id]?PEOPLE[c.id].n:c.id);
const last=c=>c.msgs[c.msgs.length-1];
const P=n=>String(n).padStart(2,0);
function fmtTime(t){const d=new Date(t),n=new Date(),same=d.toDateString()===n.toDateString();
  if(same){const h=d.getHours();return `${h<12?'오전':'오후'} ${h%12||12}:${P(d.getMinutes())}`}
  const y=new Date(n);y.setDate(n.getDate()-1);if(d.toDateString()===y.toDateString())return '어제';
  return `${d.getMonth()+1}/${d.getDate()}`}
function fmtList(t){const d=new Date(t),n=new Date(),same=d.toDateString()===n.toDateString();return same?`${d.getHours()<12?'오전':'오후'} ${d.getHours()%12||12}:${P(d.getMinutes())}`:fmtTime(t)}
function fmtDay(t){const d=new Date(t);return `${d.getHours()<12?'오전':'오후'} ${d.getHours()%12||12}:${P(d.getMinutes())}`}

const CHEV='<svg class="chev" viewBox="0 0 12 16"><path d="M2 2l6 6-6 6"/></svg>';
const avatar=(id,cls='')=>`<i class="av ${cls}" style="background:${colOf(id)}">${esc((name(id)||'?')[0])}</i>`;
const stack=c=>c.group?`<div class="stack">${c.group.slice(0,3).map(m=>avatar(m)).join('')}</div>`:avatar(c.id);
const typing=new Set();

/* 목록 화면 */
function renderList(){
  const pins=C.filter(c=>c.pin).slice(0,9);
  const rows=C.filter(c=>!c.pin).sort((a,b)=>last(b).t-last(a).t);
  $('#pins').innerHTML=pins.map(c=>`<div class="pin" data-id="${c.id}">${c.unread?'<i class="dot"></i>':''}${typing.has(c.id)?'<div class="tdot" style="margin:0;padding:6px 8px;position:absolute;top:-14px;right:-6px">…</div>':''}${stack(c).replace('class="av"','class="av"')}<span class="nm">${esc(title(c))}</span></div>`).join('');
  $('#rows').innerHTML=rows.map(c=>{const l=last(c);
    const pv=typing.has(c.id)?'<span class="pv typing">입력 중…</span>':`<div class="pv">${c.group?esc(name(l.f))+': ':''}${l.type==='photo'?'사진':esc(l.x||'')}</div>`;
    return `<div class="li${c.unread?' unread':''}" data-id="${c.id}">${c.unread?'<i class="dot"></i>':''}${stack(c)}<div class="tx"><div class="r1"><span class="nm">${esc(title(c))}</span><span class="tm">${fmtList(l.t)}</span></div>${pv}</div>${CHEV}</div>`}).join('');
}

/* 대화 화면 */
let cur=null,replyTo=null;
function bubbleHTML(m,i,arr,c){
  const prev=arr[i-1],next=arr[i+1],mine=m.f==='me';
  const grpStart=!prev||prev.f!==m.f,grpEnd=!next||next.f!==m.f;
  const gap=!prev||m.t-prev.t>15*MIN;
  let h='';
  if(gap)h+=`<div class="ts">${fmtDay(m.t)}</div>`;
  const cls=`${mine?'me':''} ${c.sms&&mine?'sms':''} ${c.group&&!mine&&grpStart?'g':''} ${grpStart&&!gap?'':''}`;
  const sn=c.group&&!mine&&grpStart?`<div class="sn">${esc(name(m.f))}</div>`:'';
  const av=c.group&&!mine?(grpEnd?avatar(m.f,'sm'):'<span class="sp"></span>'):(!mine?'<span class="sp"></span>':'');
  const quote=m.reply?`<div class="rq">${esc(m.reply)}</div>`:'';
  const body=m.type==='photo'?`<div class="bub ph ${grpStart?'first':''} ${grpEnd?'last':''}"></div>`
    :`<div class="bub ${grpStart?'first':''} ${grpEnd?'last':''}">${fmt(m.x)}</div>`;
  h+=`<div class="mrow ${cls}" data-i="${i}">${!mine?av:''}<div class="col">${sn}${quote}${body}</div>${mine?'':''}</div>`;
  if(mine&&m.st&&!next)h+=`<div class="stat" style="${m.st==='read'?'':''}">${m.st==='read'?'읽음':'전송됨'}</div>`;
  return h;
}
function fmt(x){return esc(x||'').replace(/@(\S+)/g,'<span class="mention">@$1</span>')}
function renderChat(){
  const c=cur;
  $('#chdr').innerHTML=`<button class="back" data-a="back"><svg viewBox="0 0 24 24"><path d="M15 4l-8 8 8 8"/></svg>메시지${c.unread?`<span class="badge" style="background:#ff3b30;color:#fff;border-radius:9px;font-size:12px;padding:0 6px;margin-left:4px;line-height:18px">${c.unread}</span>`:''}</button>
  <div class="who">${c.group?stack(c).replace('class="stack"','class="stack"'):avatar(c.id)}<span class="nm">${esc(title(c))}${c.group?'':''}${c.group?CHEVS():''}</span></div>
  <button class="vid" data-a="noop" aria-label="FaceTime"><svg viewBox="0 0 24 24"><rect x="2.5" y="6.5" width="13" height="11" rx="2.5"/><path d="M15.5 10.5l6-3.5v10l-6-3.5"/></button>`;
  const m=$('#msgs');
  m.innerHTML=c.msgs.map((x,i,a)=>bubbleHTML(x,i,a,c)).join('')+(typing.has(c.id)?'<div class="tdot"><i></i><i></i><i></i></div>':'');
  m.scrollTop=m.scrollHeight;
  $('#rbar').classList.toggle('on',!!replyTo);
  $('#rtx').textContent=replyTo?`${name(replyTo.f)}: ${replyTo.type==='photo'?'사진':replyTo.x}`:'';
}
function CHEVS(){return '<svg viewBox="0 0 8 12" style="width:8px;height:10px;stroke-width:2.2"><path d="M2 1l4 5-4 5"/></svg>'}

function openChat(id){
  const c=conv(id);if(!c)return;
  cur=c;c.unread=0;save();replyTo=null;
  $('#vList').hidden=true;$('#vChat').hidden=false;
  renderChat();renderList();
}
function backList(){$('#vChat').hidden=true;$('#vList').hidden=false;cur=null;renderList()}

/* 전송 및 시뮬레이션 */
function send(text){
  const c=cur;if(!c||!text.trim())return;
  const m={f:'me',t:Date.now(),x:text.trim(),st:'sent'};
  if(replyTo)m.reply=(replyTo.type==='photo'?'사진':replyTo.x);
  c.msgs.push(m);replyTo=null;save();renderChat();renderList();
  setTimeout(()=>{if(c.msgs.includes(m)){m.st='read';save();if(cur===c)renderChat()}},900);
  // 상대 응답 시뮬레이션
  const ps=c.group?c.group.filter(x=>x!=='me'):[c.id];
  const who=ps[Math.floor(Math.random()*ps.length)];
  const lines=['좋아요!','알겠어요 :)','ㅇㅋ','확인해볼게','그럼 그때 봐요'];
  setTimeout(()=>{typing.add(c.id);if(cur===c)renderChat();renderList()},1500);
  setTimeout(()=>{typing.delete(c.id);c.msgs.push({f:who,t:Date.now(),x:lines[Math.floor(Math.random()*lines.length)]});
    if(cur!==c)c.unread=(c.unread||0)+1;save();if(cur===c)renderChat();renderList()},3000);
}

/* 이벤트 */
document.addEventListener('click',e=>{
  const li=e.target.closest('.li,.pin');
  if(li&&!$('#vList').hidden){openChat(li.dataset.id);return}
  const b=e.target.closest('[data-a]');if(!b)return;
  const a=b.dataset.a;
  if(a==='back')backList();
  else if(a==='compose'){$('#q').focus()}
  else if(a==='rx'){replyTo=null;renderChat()}
});
$('#msgs').addEventListener('dblclick',e=>{const r=e.target.closest('.mrow');if(!r||!cur)return;replyTo=cur.msgs[+r.dataset.i];renderChat();$('#cin').focus()});
$('#cin').addEventListener('input',e=>{$('#comp').classList.toggle('has',!!e.target.value.trim())});
$('#comp').addEventListener('submit',e=>{e.preventDefault();const i=$('#cin');send(i.value);i.value='';$('#comp').classList.remove('has')});
$('#q').addEventListener('input',e=>{const q=e.target.value.trim();document.querySelectorAll('#rows .li').forEach(li=>{const c=conv(li.dataset.id);li.style.display=!q||title(c).includes(q)?'':'none'})});

/* 화면 구성 */
$('#app').innerHTML=`<section class="view" id="vList">
  <header class="hd"><button class="b" data-a="noop">편집</button><span class="tt">메시지</span><button class="b" data-a="compose" aria-label="새 메시지"><svg viewBox="0 0 24 24"><path d="M14.5 4.5h-7a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-7"/><path d="M18.5 3.5l2 2L12 14l-3 1 1-3z"/></svg></button></header>
  <label class="sbox"><svg viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="6"/><path d="M15 15l5 5"/></svg><input id="q" placeholder="검색" autocomplete="off"></label>
  <div class="pins" id="pins"></div>
  <div class="rowl" id="rows"></div>
</section>
<section class="view" id="vChat" hidden>
  <header class="chdr" id="chdr"></header>
  <div class="msgs" id="msgs"></div>
  <div class="rbar" id="rbar"><span class="tx" id="rtx"></span><button class="x" data-a="rx" aria-label="답장 취소"><svg viewBox="0 0 14 14"><path d="M2 2l10 10M12 2L2 12"/></svg></button></div>
  <form class="comp" id="comp" autocomplete="off">
    <button class="plus" type="button" data-a="noop" aria-label="앱 추가"><svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg></button>
    <label class="field"><input id="cin" placeholder="iMessage" autocomplete="off"><button class="ab mic" type="button" data-a="noop" aria-label="음성 메시지"><svg viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21"/></svg></button><button class="ab send" type="submit" aria-label="보내기"><svg viewBox="0 0 24 24"><path d="M12 19V5M6 11l6-6 6 6"/></svg></button></label>
  </form>
</section>`;
renderList();

})();

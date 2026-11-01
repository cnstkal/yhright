(()=>{
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const LANGS=[
 {c:'ko',n:'한국어',tag:'ko-KR',k:'ko'},
 {c:'en-US',n:'영어 (미국)',s:'영어',tag:'en-US',k:'en'},
 {c:'en-GB',n:'영어 (영국)',s:'영어',tag:'en-GB',k:'en'},
 {c:'zh-CN',n:'중국어 (북경어, 간체)',s:'중국어',tag:'zh-CN',k:'zh'},
 {c:'zh-TW',n:'중국어 (번체)',s:'중국어',tag:'zh-TW',k:'zhT'},
 {c:'ja',n:'일본어',tag:'ja-JP',k:'ja'},
 {c:'fr',n:'프랑스어',tag:'fr-FR',k:'fr'},
 {c:'es',n:'스페인어',tag:'es-ES',k:'es'}
];
const L=c=>LANGS.find(l=>l.c===c);
const PH={ko:'텍스트 입력','en':'Enter text','zh':'输入文本','zhT':'輸入文字',ja:'テキストを入力',fr:'Saisir du texte',es:'Introducir texto'};
// 사전 준비된 샘플 번역 데이터 (실제 번역 API 아님)
const DICT=[
 {ko:'안녕하세요',en:'Hello.',zh:'你好',zhT:'你好',ja:'こんにちは',fr:'Bonjour.',es:'Hola.'},
 {ko:'감사합니다',en:'Thank you.',zh:'谢谢',zhT:'謝謝',ja:'ありがとうございます',fr:'Merci.',es:'Gracias.'},
 {ko:'여기는 어디인가요',en:'Where is this?',zh:'这里是哪里',zhT:'這裡是哪裡',ja:'ここはどこですか',fr:'Où sommes-nous ?',es:'¿Dónde estamos?'},
 {ko:'노동 공원은 어디로 가야 하나요',en:'How do I get to Labor Park?',zh:'劳动公园要去哪里',zhT:'勞動公園要去哪裡',ja:'労働公園はどこへ行けばいいですか',fr:'Comment aller au parc du Travail ?',es:'¿Cómo llego al Parque del Trabajo?'},
 {ko:'제 눈을 바라보세요.',en:'Look me in the eyes.',zh:'请看着我的眼睛。',zhT:'請看著我的眼睛。',ja:'私の目を見てください。',fr:'Regardez-moi dans les yeux.',es:'Mírame a los ojos.'},
 {ko:'화장실은 어디예요',en:'Where is the restroom?',zh:'洗手间在哪里',zhT:'洗手間在哪裡',ja:'トイレはどこですか',fr:'Où sont les toilettes ?',es:'¿Dónde está el baño?'},
 {ko:'얼마예요',en:'How much is it?',zh:'多少钱',zhT:'多少錢',ja:'いくらですか',fr:'Combien ça coûte ?',es:'¿Cuánto cuesta?'},
 {ko:'도와주세요',en:'Please help me.',zh:'请帮帮我',zhT:'請幫幫我',ja:'助けてください',fr:'Aidez-moi, s\'il vous plaît.',es:'Ayúdame, por favor.'},
 {ko:'맛있어요',en:'It is delicious.',zh:'很好吃',zhT:'很好吃',ja:'おいしいです',fr:'C\'est délicieux.',es:'Está delicioso.'},
 {ko:'공항에 가고 싶어요',en:'I want to go to the airport.',zh:'我想去机场',zhT:'我想去機場',ja:'空港に行きたいです',fr:'Je veux aller à l\'aéroport.',es:'Quiero ir al aeropuerto.'}
];
const norm=s=>s.trim().toLowerCase().replace(/[\s.?!。？！,，]+/g,'');
function translate(text,from,to){
 const t=norm(text); if(!t) return null;
 const fk=L(from).k, tk=L(to).k;
 const hit=DICT.find(d=>norm(d[fk]||'')===t);
 return hit?hit[tk]:null;
}
// state
const load=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}};
const save=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch{}};
let st=load('tr.state',{src:'ko',tgt:'zh-CN'});
let favs=load('tr.favs',null);
if(!favs){favs=[{id:1,src:'en-US',tgt:'ko',st:'Look me in the eyes.',tt:'제 눈을 바라보세요.'}];save('tr.favs',favs)}
let chat=load('tr.chat',null);
if(!chat){chat=[
 {src:'ko',tgt:'zh-CN',st:'여기는 어디인가요',tt:'这里是哪里'},
 {src:'ko',tgt:'zh-CN',st:'노동 공원은 어디로 가야 하나요',tt:'劳动公园要去哪里'}];save('tr.chat',chat)}
const saveSt=()=>save('tr.state',st);

// icons
const chev=c=>`<svg width="14" height="20" viewBox="0 0 14 20" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 8l5-5 5 5M2 12l5 5 5-5"/></svg>`;
const mic=c=>`<svg width="30" height="42" viewBox="0 0 30 42" fill="none" stroke="${c}" stroke-width="2.600" stroke-linecap="round"><rect x="9" y="2" width="12" height="22" rx="6"/><path d="M3 18c0 7 5 12 12 12s12-5 12-12M15 30v8M8 38h14"/></svg>`;
const playI=`<svg width="16" height="18" viewBox="0 0 16 18"><path d="M3 2l12 7-12 7z" fill="#fff" stroke="#fff" stroke-width="2" stroke-linejoin="round"/></svg>`;
$('#micSrc').innerHTML=mic('#000'); $('#micTgt').innerHTML=mic('#55C2D0');
$$('.chev').forEach(e=>e.innerHTML=chev(e.classList.contains('t')?'#9BDDE6':'#8E8E93'));
$('#btnSwap').innerHTML=`<svg width="30" height="30" viewBox="0 0 30 30" fill="none" stroke="#55C2D0" stroke-width="2.600" stroke-linecap="round" stroke-linejoin="round"><path d="M8 5v18M3 18l5 5 5-5M22 25V7M17 12l5-5 5 5"/><path d="M13 5h2M15 25h2" stroke-width="0"/></svg>`;

// toast
let tt;function toast(m){const e=$('#toast');e.textContent=m;e.classList.add('on');clearTimeout(tt);tt=setTimeout(()=>e.classList.remove('on'),2200)}

// speech
function speak(text,lang){
 if(!('speechSynthesis' in window)){toast('이 브라우저는 음성 재생을 지원하지 않습니다');return}
 speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang=L(lang).tag;speechSynthesis.speak(u);
}
const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
function listen(lang,cb){
 if(!SR){toast('이 브라우저는 음성 인식을 지원하지 않습니다');return}
 const r=new SR();r.lang=L(lang).tag;r.onresult=e=>cb(e.results[0][0].transcript);r.onerror=()=>toast('음성 인식을 사용할 수 없습니다');
 try{r.start();toast('듣는 중…')}catch{toast('음성 인식을 시작할 수 없습니다')}
}
function copy(t){
 if(!t){toast('복사할 내용이 없습니다');return}
 (navigator.clipboard?navigator.clipboard.writeText(t):Promise.reject()).then(()=>toast('복사되었습니다'),()=>{
  const a=document.createElement('textarea');a.value=t;document.body.appendChild(a);a.select();try{document.execCommand('copy');toast('복사되었습니다')}catch{toast('복사할 수 없습니다')}a.remove()});
}

// translate screen
function renderTr(){
 $('#srcName').textContent=L(st.src).n;$('#tgtName').textContent=L(st.tgt).n;
 $('#srcText').placeholder=PH[L(st.src).k];
 const v=$('#srcText').value,o=$('#tgtOut'),r=translate(v,st.src,st.tgt);
 if(!v.trim()){o.className='out ph';o.textContent=PH[L(st.tgt).k]}
 else if(r){o.className='out';o.textContent=r;pushHist(v,r)}
 else{o.className='out';o.innerHTML='<span class="note">샘플 번역 데이터에 없는 문장입니다. 실제 번역 API는 연결되어 있지 않습니다.</span>'}
 $('#cvSrcName').textContent=L(st.src).n;$('#cvTgtName').textContent=L(st.tgt).n;
 $('#cvSrc').placeholder=PH[L(st.src).k];$('#cvTgt').placeholder=PH[L(st.tgt).k];
}
let hist=load('tr.hist',[]);
function pushHist(s,t){const h={src:st.src,tgt:st.tgt,st:s.trim(),tt:t};if(hist[0]&&hist[0].st===h.st&&hist[0].src===h.src&&hist[0].tgt===h.tgt)return;hist.unshift(h);hist=hist.slice(0,50);save('tr.hist',hist)}
$('#srcText').addEventListener('input',renderTr);
$('#btnSwap').onclick=()=>{[st.src,st.tgt]=[st.tgt,st.src];const o=$('#tgtOut');if(!o.classList.contains('ph')&&!o.querySelector('.note'))$('#srcText').value=o.textContent;saveSt();renderTr();renderChat()};
$('#micSrc').onclick=()=>listen(st.src,t=>{$('#srcText').value=t;renderTr()});
$('#micTgt').onclick=()=>listen(st.tgt,t=>{$('#srcText').value='';const back=translate(t,st.tgt,st.src);if(back){$('#srcText').value=back}else toast('샘플 데이터에 없는 문장: '+t);renderTr()});

// chat
function renderChat(){
 const c=$('#msgs');c.innerHTML='';
 chat.forEach(m=>{
  const d=document.createElement('div');d.className='bub';
  d.innerHTML=`<button class="play" aria-label="재생">${playI}</button><div class="b"><div class="s"></div><hr><div class="t"></div></div>`;
  d.querySelector('.s').textContent=m.st;d.querySelector('.t').textContent=m.tt;
  d.querySelector('.play').onclick=()=>speak(m.tt,m.tgt);
  c.appendChild(d)});
 $('#chat').scrollTop=$('#chat').scrollHeight;
}
function addChat(text,from,to){
 const r=translate(text,from,to);
 if(!r){toast('샘플 번역 데이터에 없는 문장입니다');return false}
 chat.push({src:from,tgt:to,st:text.trim(),tt:r});save('tr.chat',chat);renderChat();return true;
}
function bindChatInput(id,from,to){
 $(id).addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();const v=e.target.value;if(!v.trim())return;if(addChat(v,from(),to()))e.target.value=''}});
}
bindChatInput('#cvSrc',()=>st.src,()=>st.tgt);bindChatInput('#cvTgt',()=>st.tgt,()=>st.src);
$('#cvMic').onclick=()=>listen(st.src,t=>{if(!addChat(t,st.src,st.tgt))return});
$('#btnView').onclick=()=>{$('#chat').scrollTop=$('#chat').scrollHeight;toast('최신 대화로 이동')};

// tabs (카메라 탭은 핸들러 없음)
$$('.tab[data-tab]').forEach(b=>b.onclick=()=>{
 $$('.tab').forEach(x=>x.classList.toggle('on',x===b));
 $$('.screen').forEach(s=>s.classList.remove('on'));
 $('#s-'+b.dataset.tab).classList.add('on');
 if(b.dataset.tab==='cv')renderChat();
});

// language picker
let pickWhich=null,pickSel=null;
function renderLangs(){
 const q=$('#langSearch').value.trim().toLowerCase();
 const l=$('#langList');l.innerHTML='';
 LANGS.filter(x=>!q||x.n.toLowerCase().includes(q)||x.c.toLowerCase().includes(q)).forEach(x=>{
  const b=document.createElement('button');b.className='li'+(x.c===pickSel?' sel':'');
  b.innerHTML=`<span>${x.n}</span>${x.c===pickSel?'<svg width="22" height="18" viewBox="0 0 22 18" fill="none" stroke="#55C2D0" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9l6 6L20 3"/></svg>':''}`;
  b.onclick=()=>{pickSel=x.c;renderLangs()};l.appendChild(b)});
}
$$('[data-pick]').forEach(b=>b.onclick=()=>{pickWhich=b.dataset.pick;pickSel=st[pickWhich];$('#langTitle').textContent=pickWhich==='src'?'출발 언어':'도착 언어';$('#langSearch').value='';renderLangs();$('#langModal').classList.add('on')});
$('#langSearch').oninput=renderLangs;
$('#langDone').onclick=()=>{if(pickSel){st[pickWhich]=pickSel;saveSt();renderTr();renderChat()}$('#langModal').classList.remove('on')};
$('#langModal').onclick=e=>{if(e.target.id==='langModal')$('#langModal').classList.remove('on')};

// favorites
function pairTitle(f){const a=L(f.src),b=L(f.tgt);return (b.s||b.n)+' - '+(a.s||a.n)}
function renderFav(){
 const b=$('#favBody');b.innerHTML='<h1 style="margin-left:6px">즐겨찾기</h1>';
 if(!favs.length){b.insertAdjacentHTML('beforeend','<div class="empty">저장된 즐겨찾기가 없습니다</div>');return}
 favs.forEach(f=>{
  const sub=document.createElement('div');sub.className='sub';sub.textContent=(L(f.tgt).s||L(f.tgt).n)+' - '+(L(f.src).s||L(f.src).n);b.appendChild(sub);
  const c=document.createElement('div');c.className='card fav';
  c.innerHTML=`<div class="small">${L(f.src).n}</div><div class="line"><div class="big"></div><button class="play k" data-a="s">${playI}</button></div><hr>
  <div class="small" style="color:var(--teal)">${L(f.tgt).n}</div><div class="line"><div class="big t"></div><button class="play" data-a="t">${playI}</button></div>
  <div class="tools"><button data-a="x" aria-label="전환"><svg width="34" height="34" viewBox="0 0 34 34" fill="none" stroke="#55C2D0" stroke-width="2.600" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12V4h8M4 4l9 9M30 22v8h-8M30 30l-9-9"/></svg></button>
  <button data-a="f" aria-label="즐겨찾기 해제"><svg width="38" height="36" viewBox="0 0 38 36"><path d="M19 2l5 11 12 1-9 8 3 12-11-7-11 7 3-12-9-8 12-1z" fill="#55C2D0" stroke="#55C2D0" stroke-width="2" stroke-linejoin="round"/></svg></button>
  <button data-a="c" aria-label="복사"><svg width="34" height="40" viewBox="0 0 34 40" fill="none" stroke="#55C2D0" stroke-width="2.600" stroke-linejoin="round"><path d="M4 12v22a3 3 0 003 3h14a3 3 0 003-3V16l-7-7H7a3 3 0 00-3 3z"/><path d="M12 6V4a3 3 0 013-3h10l7 7v18a3 3 0 01-3 3h-2"/></svg></button></div>`;
  c.querySelectorAll('.big')[0].textContent=f.st;c.querySelectorAll('.big')[1].textContent=f.tt;
  c.querySelector('[data-a=s]').onclick=()=>speak(f.st,f.src);
  c.querySelector('[data-a=t]').onclick=()=>speak(f.tt,f.tgt);
  c.querySelector('[data-a=c]').onclick=()=>copy(f.tt);
  c.querySelector('[data-a=x]').onclick=()=>{[f.src,f.tgt]=[f.tgt,f.src];[f.st,f.tt]=[f.tt,f.st];save('tr.favs',favs);renderFav()};
  c.querySelector('[data-a=f]').onclick=()=>{favs=favs.filter(x=>x!==f);save('tr.favs',favs);renderFav();toast('즐겨찾기에서 해제했습니다')};
  b.appendChild(c)});
}
$('#btnFavList').onclick=()=>{renderFav();$('#favSheet').classList.add('on')};
$('#favClose').onclick=()=>$('#favSheet').classList.remove('on');

// more menu
function menuToggle(e){e.stopPropagation();$('#menu').classList.toggle('on')}
$('#btnMore').onclick=menuToggle;$('#btnMore2').onclick=menuToggle;
document.addEventListener('click',()=>$('#menu').classList.remove('on'));
$('#mClear').onclick=()=>{$('#srcText').value='';renderTr()};
$('#mCopy').onclick=()=>{const o=$('#tgtOut');copy(o.classList.contains('ph')||o.querySelector('.note')?'':o.textContent)};
$('#mHist').onclick=()=>{
 if(!hist.length){toast('번역 기록이 없습니다');return}
 const h=hist[0];$('#srcText').value=h.st;st.src=h.src;st.tgt=h.tgt;saveSt();renderTr();toast('최근 기록: '+h.st)};
$('#mReset').onclick=()=>{chat=[];save('tr.chat',chat);renderChat();toast('대화 기록을 삭제했습니다')};
// 현재 번역을 즐겨찾기에 추가하려면 번역 결과 길게 누르기 대신 결과 영역 더블탭
$('#tgtOut').ondblclick=()=>{const v=$('#srcText').value.trim(),r=translate(v,st.src,st.tgt);if(!r)return;
 const i=favs.findIndex(f=>f.src===st.src&&f.tgt===st.tgt&&f.st===v);
 if(i>=0){favs.splice(i,1);toast('즐겨찾기에서 해제했습니다')}else{favs.unshift({id:Date.now(),src:st.src,tgt:st.tgt,st:v,tt:r});toast('즐겨찾기에 추가했습니다')}save('tr.favs',favs)};

renderTr();renderChat();
})();

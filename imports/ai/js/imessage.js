const K='imsg_sim_v2',$=s=>document.querySelector(s),W='일월화수목금토';
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const uid=()=>'i'+Math.random().toString(36).slice(2,9);
const tm=t=>{const d=new Date(t),h=d.getHours();return(h<12?'오전 ':'오후 ')+(h%12||12)+':'+String(d.getMinutes()).padStart(2,'0')};
const dd=t=>{const a=new Date(t),b=new Date();return Math.round((new Date(b.getFullYear(),b.getMonth(),b.getDate())-new Date(a.getFullYear(),a.getMonth(),a.getDate()))/864e5)};
const ld=t=>{const k=dd(t),a=new Date(t);if(k<=0)return tm(t);if(k==1)return'어제';if(k<7)return W[a.getDay()]+'요일';return String(a.getFullYear()).slice(2)+'. '+(a.getMonth()+1)+'. '+a.getDate()+'.'};
const sd=t=>{const k=dd(t),a=new Date(t);let s=k<=0?'오늘':k==1?'어제':k==2?'(그저께)':k<7?W[a.getDay()]+'요일':(a.getFullYear()!=new Date().getFullYear()?a.getFullYear()+'년 ':'')+(a.getMonth()+1)+'월 '+a.getDate()+'일 ('+W[a.getDay()]+')';return s+' '+tm(t)};
const loc=t=>{const d=new Date(t),p=n=>String(n).padStart(2,'0');return d.getFullYear()+'-'+p(d.getMonth()+1)+'-'+p(d.getDate())+'T'+p(d.getHours())+':'+p(d.getMinutes())};
function seed(){const n=new Date(),B=(o,h,m)=>+new Date(n.getFullYear(),n.getMonth(),n.getDate()-o,h,m),Y=(m,d,h,mi)=>+new Date(2026,m-1,d,h,mi);
const M=(dir,text,ts,read)=>({id:uid(),dir,text,ts,read:!!read});
const C=(name,phone,type,unread,msgs,x={})=>Object.assign({id:uid(),name,phone,img:'',type,unread,draft:'',folder:'inbox',del:false,msgs},x);
return{contacts:[
C('엄마','010-1234-0001','sms',true,[M('in','성화야 밥은 먹었어?',B(0,12,10)),M('out','응 먹었어 엄마',B(0,12,25),1),M('in','냉장고에 반찬 넣어놨다. 주말에 집 한번 와',B(0,12,30)),M('in','알겠어 시간 되면 갈게',B(0,12,31)),M('in','교통 막힐 수 있으니까 일찍 출발해',B(0,12,40)),M('out','응응 ㅎㅎ',B(0,12,42),1),M('in','그리고 아빠가 지난번 그 과일 또 사왔더라',B(0,12,50))]),
C('민재','010-1234-0002','sms',true,[M('in','야 이번 주 토요일 시간 돼?',B(1,21,4)),M('out','어 왜',B(1,21,10),1),M('in','그냥 같이 밥이나 먹자 ㅋㅋ',B(1,21,11)),M('in','아 그리고 지난번 빌려준 우산 가져와',B(1,21,11)),M('out','아 맞다 깜빡했다 ㅋㅋ 토요일에 챙길게',B(1,21,20),1),M('in','ㅇㅋ 늦지 마라',B(1,21,22))]),
C('지우','010-1234-0003','sms',false,[M('in','오늘 연습실 몇 시에 끝나?',B(0,8,40)),M('in','혹시 몰라서 물어봐',B(0,8,40)),M('out','6시 반쯤 끝날 듯',B(0,8,55),1),M('in','오케이 그럼 끝나고 편의점 가자',B(0,8,57))]),
C('매니저 형','010-1234-0004','sms',true,[M('in','내일 스케줄 9시 출발이야. 늦지 마',B(0,22,15)),M('out','네 알겠습니다',B(0,22,18),1),M('in','그리고 어제 찍은 사진 정리해서 보내줘',B(0,22,20)),M('in','촬영장 주차는 뒤쪽이래',B(0,22,26)),M('out','넵 확인했습니다',B(0,22,30),1)]),
C('동네 빵집','010-1234-0005','sms',false,[M('in','[단골 알림] 오늘 크림빵 마감 전 픽업 가능합니다 :)',B(2,7,30)),M('out','혹시 식빵도 남아 있나요?',B(2,8,10),1),M('in','네 한 봉지 남아 있어요!',B(2,8,12))]),
C('택배','010-1234-0006','sms',false,[M('in','택배가 도착했습니다. 경비실에서 찾아가세요.',B(2,17,5))]),
C('하린','010-1234-0007','sms',true,[M('in','성화 너 그 노래 연습 영상 봤어? 진짜 좋더라',B(4,23,12)),M('out','헐 고마워 ㅠㅠ 다음 주에 공개할게',B(4,23,30),1),M('in','기대할게!!',B(4,23,31)),M('in','근데 세번째 파트 음 좀 높지 않았어?',B(4,23,33))]),
C('팀 단톡','010-1234-0008','sms',true,[M('in','리더: 내일 녹음 오전 10시로 변경',B(0,19,0)),M('in','지훈: 확인!',B(0,19,3)),M('out','알겠어요',B(0,19,6),1),M('in','도윤: 간식은 누가 챙겨오지',B(0,19,9)),M('in','리더: 내가 챙길게',B(0,19,10)),M('out','커피도 부탁드려요 ㅎㅎ',B(0,19,12),1)]),
C('서연','010-1234-0009','sms',false,[M('in','생일 축하해! 올해도 건강하자',B(7,0,5)),M('out','고마워 ㅠㅠ 밥 한번 사줄게',B(7,9,10),1)]),
C('세무사 사무실','010-1234-0010','sms',false,[M('in','[안내] 이번 달 부가세 신고 기한은 25일입니다. 서류 준비 부탁드립니다.',B(3,10,0))])]}}
let S;try{S=JSON.parse(localStorage.getItem(K))}catch(e){}if(!S||!S.contacts)S=seed();
const save=()=>{try{localStorage.setItem(K,JSON.stringify(S))}catch(e){alert('저장 공간이 부족합니다. 이미지를 줄여주세요.')}};
const V={s:'list',id:null,f:'inbox',q:'',e:false,m:false};
const gc=id=>S.contacts.find(c=>c.id==id),nm=c=>c.name||c.phone,last=c=>c.msgs[c.msgs.length-1];
const FN={inbox:'메시지',spam:'스팸',trash:'최근 삭제된 항목',unread:'읽지 않음',draft:'임시 저장'};
const ic={
av:'<svg viewBox="0 0 45 45" preserveAspectRatio="xMidYMid slice"><circle cx="22.5" cy="16" r="8.5" fill="#fff"/><path d="M4 45c0-11 8-17 18.5-17S41 34 41 45z" fill="#fff"/></svg>',
ch:'<svg width="10" height="16" viewBox="0 0 10 16"><path d="M2 2l6 6-6 6" fill="none" stroke="#c4c4c7" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
bk:'<svg width="12" height="20" viewBox="0 0 12 20"><path d="M10 2L2 10l8 8" fill="none" stroke="#000" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
fl:'<svg width="24" height="18" viewBox="0 0 24 18"><path d="M1 2h22M4 9h16M8 16h8" stroke="#000" stroke-width="2.4" stroke-linecap="round"/></svg>',
mic:'<svg width="20" height="24" viewBox="0 0 20 24"><rect x="6" y="1" width="8" height="14" rx="4" fill="none" stroke="#000" stroke-width="2"/><path d="M2 11a8 8 0 0016 0M10 19v4" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round"/></svg>',
sr:'<svg width="22" height="22" viewBox="0 0 22 22"><circle cx="9" cy="9" r="7" fill="none" stroke="#000" stroke-width="2.4"/><path d="M14 14l6 6" stroke="#000" stroke-width="2.6" stroke-linecap="round"/></svg>',
cp:'<svg width="26" height="26" viewBox="0 0 26 26"><path d="M11 4H6a3 3 0 00-3 3v13a3 3 0 003 3h13a3 3 0 003-3v-5" fill="none" stroke="#000" stroke-width="2.4" stroke-linecap="round"/><path d="M10 16l1-5 10-10 4 4-10 10z" fill="none" stroke="#000" stroke-width="2.4" stroke-linejoin="round"/></svg>',
pl:'<svg width="20" height="20" viewBox="0 0 20 20"><path d="M10 2v16M2 10h16" stroke="#000" stroke-width="2.6" stroke-linecap="round"/></svg>',
up:'<svg width="18" height="20" viewBox="0 0 18 20"><path d="M9 18V3M3 9l6-6 6 6" fill="none" stroke="#fff" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
ms:'<svg width="30" height="26" viewBox="0 0 30 26"><path d="M11 3C5.500 3 2 6.500 2 11c0 2.500 1 4.500 2.700 6L3 22l5-2c1 .3 2 .5 3 .5 5.500 0 9-3.500 9-9S16.500 3 11 3z" fill="none" stroke="#000" stroke-width="2"/><path d="M20 8c4 .5 7 3 7 7 0 2-1 4-2.500 5l1.500 4-4-1.500" fill="none" stroke="#000" stroke-width="2"/></svg>',
sp:'<svg width="30" height="26" viewBox="0 0 30 26"><rect x="3" y="3" width="24" height="5" rx="2" fill="none" stroke="#000" stroke-width="2"/><path d="M5 8v13a2 2 0 002 2h16a2 2 0 002-2V8M11 13l8 6M19 13l-8 6" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round"/></svg>',
tr:'<svg width="30" height="26" viewBox="0 0 30 26"><path d="M5 6h20M12 6V3h6v3M7 6l1 17h14l1-17M12 11v8M18 11v8" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round"/></svg>',
un:'<svg width="30" height="26" viewBox="0 0 30 26"><path d="M13 3C7 3 3 7 3 12c0 2.500 1 4.500 3 6l-1.500 5 5-2.500c1 .3 2 .5 3.500.5 6 0 10-4 10-9" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round"/><circle cx="23" cy="6" r="4" fill="#000"/></svg>',
dr:'<svg width="30" height="26" viewBox="0 0 30 26"><path d="M13 3C7 3 3 7 3 12c0 2.500 1 4.500 3 6l-1.500 5 5-2.500c1 .3 2 .5 3.500.5 5.500 0 10-4 10-9S18.500 3 13 3z" fill="none" stroke="#000" stroke-width="2"/><circle cx="9" cy="12" r="1.500"/><circle cx="14" cy="12" r="1.500"/><circle cx="19" cy="12" r="1.500"/></svg>'};
const avh=c=>'<div class="av">'+(c.img?'<img src="'+c.img+'">':ic.av)+'</div>';
const SB='';
function list(){const a=S.contacts.filter(c=>{const f=V.f;if(f=='trash')return c.del;if(c.del)return false;if(f=='spam')return c.folder=='spam';if(f=='unread')return c.unread;if(f=='draft')return c.draft;return c.folder!='spam'});
const q=V.q.trim().toLowerCase();const b=q?a.filter(c=>(nm(c)+c.phone+c.msgs.map(m=>m.text).join(' ')).toLowerCase().includes(q)):a;
return b.map(c=>{const l=last(c);const pv=c.draft?'임시 저장: '+c.draft:l?(l.img&&!l.text?'사진':l.text):'';
return'<div class="row" data-a="row" data-id="'+c.id+'">'+(V.e?'<button class="mn" data-a="del" data-id="'+c.id+'">−</button>':'<div class="dot'+(c.unread?' u':'')+'"></div>')+avh(c)+'<div class="rb"><div class="top"><div class="nm">'+esc(nm(c))+'</div><div class="dt">'+(l?ld(l.ts):'')+(V.e?'':ic.ch)+'</div></div><div class="pv">'+esc(pv)+'</div></div>'+(V.e?'<div class="ct"><button data-a="up" data-id="'+c.id+'">▲</button><button data-a="dn" data-id="'+c.id+'">▼</button></div>':'')+'</div>'}).join('')||'<div style="text-align:center;color:#8e8e93;margin-top:60px">대화 없음</div>'}
function menu(){const it=(k,i)=>'<button data-a="flt" data-k="'+k+'"><span class="ck">'+(V.f==k?'✓':'')+'</span>'+i+'<span>'+FN[k]+'</span></button>';
return'<div class="bk" data-a="cm"></div><div class="menu">'+it('inbox',ic.ms)+it('spam',ic.sp)+it('trash',ic.tr)+'<hr><small>필터 기준</small>'+it('unread',ic.un)+it('draft',ic.dr)+'<hr><button data-a="mng" style="padding-left:42px">필터링 관리</button></div>'}
function L(){return SB+'<div id="scr"><div class="bar"><button class="pill" data-a="edit">'+(V.e?'완료':'편집')+'</button><button class="pill c" data-a="menu">'+ic.fl+'</button></div><h1>'+FN[V.f]+'</h1><div id="rows">'+list()+'</div></div>'+(V.e?'<div class="tb"><button class="pill" data-a="add">대화 추가</button><button class="pill" data-a="exp">내보내기</button><button class="pill" data-a="imp">가져오기</button><button class="pill" data-a="rst">초기화</button></div>':'<div class="bot" style="justify-content:flex-end"><button class="pill c" style="width:45px;height:45px" data-a="add">'+ic.cp+'</button></div>')+(V.m?menu():'')+'<input type="file" id="imf" accept=".json,application/json" hidden>'}
function chat(){const c=gc(V.id);let h='',p=0;const lo=c.msgs.filter(m=>m.dir=='out').pop();
c.msgs.forEach((m,i)=>{const pv=c.msgs[i-1],tl=!pv||pv.dir!=m.dir||m.ts-pv.ts>36e5||dd(m.ts)!=dd(pv.ts);if(!p||m.ts-p>36e5||dd(m.ts)!=dd(p))h+='<div class="sep">'+sd(m.ts)+'</div>';p=m.ts;
h+='<div class="b '+m.dir+(tl?' t':'')+'" data-mid="'+m.id+'">'+(m.img?'<img src="'+m.img+'">':'')+esc(m.text).replace(/\d{4,8}/g,x=>'<u>'+x+'</u>')+'</div>';
if(m===lo&&c.type=='imessage')h+='<div class="rd">'+(m.read?'읽음 '+tm(m.ts):'전달됨')+'</div>'});
return SB+'<div class="ch"><button class="pill c back" data-a="back">'+ic.bk+'</button>'+avh(c)+'<span class="np">'+esc(nm(c))+'</span></div><div class="msgs" id="ms">'+h+'</div><div class="inp"><button class="plus" data-a="photo">'+ic.pl+'</button><div class="ib"><input id="ti" placeholder="'+(c.type=='imessage'?'iMessage':'문자 메시지 · SMS')+'" value="'+esc(c.draft)+'" enterkeyhint="send" autocomplete="off"><button class="sd" id="sd" data-a="send">'+ic.up+'</button><span id="mi">'+ic.mic.replace(/#000/g,'#8e8e93')+'</span></div></div><div class="hi"><i></i></div><input type="file" id="pf" accept="image/*" hidden>'}
function R(){const a=$('#app');a.innerHTML=V.s=='list'?L():chat();if(V.s=='chat'){const m=$('#ms');m.scrollTop=m.scrollHeight;tog()}}
function tog(){const v=$('#ti').value.trim();$('#sd').style.display=v?'flex':'none';$('#mi').style.display=v?'none':'block'}
function SH(t,h,fn){const d=document.createElement('div');d.id='sh';d.innerHTML='<div class="p"><h3>'+t+'</h3>'+h+'</div>';d.onclick=e=>{if(e.target==d)d.remove()};document.body.appendChild(d);fn&&fn(d);return d}
const shr=(img,fn)=>{const r=new FileReader();r.onload=()=>{const i=new Image();i.onload=()=>{const s=Math.min(1,img/Math.max(i.width,i.height)),c=document.createElement('canvas');c.width=i.width*s;c.height=i.height*s;c.getContext('2d').drawImage(i,0,0,c.width,c.height);fn(c.toDataURL('image/jpeg',.8))};i.src=r.result};return f=>f&&r.readAsDataURL(f)};
const rd=f=>{const r=new FileReader();return new Promise(o=>{r.onload=()=>o(r.result);r.readAsDataURL(f)})};
function rs(f,max){return rd(f).then(u=>new Promise(o=>{const i=new Image();i.onload=()=>{const s=Math.min(1,max/Math.max(i.width,i.height)),c=document.createElement('canvas');c.width=i.width*s;c.height=i.height*s;c.getContext('2d').drawImage(i,0,0,c.width,c.height);o(c.toDataURL('image/jpeg',.82))};i.src=u}))}
function CF(id,isNew){const c=isNew?{id:uid(),name:'',phone:'',img:'',type:'sms',unread:false,draft:'',folder:'inbox',del:false,msgs:[]}:gc(id);let img=c.img;const fo=c.del?'trash':c.folder;
SH(isNew?'새 메시지':'연락처 정보','<div class="big"><div class="av" id="pa">'+(img?'<img src="'+img+'">':ic.av)+'</div><b>'+esc(nm(c)||'')+'</b></div><div class="f"><label>이름<input type="text" id="n" value="'+esc(c.name)+'" placeholder="선택"></label><label>전화번호<input type="tel" id="p" value="'+esc(c.phone)+'"></label><label>사진<span><input type="file" id="f" accept="image/*"><button id="fr" style="color:#ff3b30">제거</button></span></label><label>유형<select id="t"><option value="sms">SMS</option><option value="imessage">iMessage</option></select></label><label>폴더<select id="fo"><option value="inbox">메시지</option><option value="spam">스팸</option><option value="trash">최근 삭제된 항목</option></select></label><label>읽지 않음<input type="checkbox" id="u"'+(c.unread?' checked':'')+'></label><label>임시 저장<input type="text" id="d" value="'+esc(c.draft)+'"></label></div><div class="sb2">'+(isNew?'':'<button id="am">메시지 추가</button><button class="dg" id="dl">삭제</button>')+'<button class="pr" id="sv">저장</button></div>',d=>{
$('#t',d).value=c.type;$('#fo',d).value=fo;
$('#f',d).onchange=async e=>{if(e.target.files[0]){img=await rs(e.target.files[0],200);$('#pa',d).innerHTML='<img src="'+img+'">'}};
$('#fr',d).onclick=()=>{img='';$('#pa',d).innerHTML=ic.av};
const sv=()=>{c.name=$('#n',d).value.trim();c.phone=$('#p',d).value.trim();c.img=img;c.type=$('#t',d).value;const f=$('#fo',d).value;c.del=f=='trash';c.folder=f=='trash'?'inbox':f;c.unread=$('#u',d).checked;c.draft=$('#d',d).value;if(!c.name&&!c.phone)c.phone='새 대화'};
$('#sv',d).onclick=()=>{sv();if(isNew){S.contacts.unshift(c);V.s='chat';V.id=c.id}save();d.remove();R()};
if(!isNew){$('#am',d).onclick=()=>{sv();save();d.remove();MF(c.id)};$('#dl',d).onclick=()=>{if(confirm('이 대화를 삭제할까요?')){S.contacts=S.contacts.filter(x=>x!=c);save();d.remove();V.s='list';R()}}}})}
function MF(cid,mid){const c=gc(cid),n=!mid,m=n?{id:uid(),dir:'in',text:'',ts:Date.now(),read:false}:c.msgs.find(x=>x.id==mid);
SH(n?'메시지 추가':'메시지 편집','<div class="f"><label style="display:block"><textarea id="x" placeholder="메시지 내용">'+esc(m.text)+'</textarea></label><label>방향<select id="r"><option value="in">수신 (회색)</option><option value="out">발신 (파랑)</option></select></label><label>날짜·시간<input type="datetime-local" id="s" value="'+loc(m.ts)+'"></label><label>읽음<input type="checkbox" id="rd"'+(m.read?' checked':'')+'></label></div><div class="sb2">'+(n?'':'<button class="dg" id="dl">삭제</button>')+'<button class="pr" id="sv">저장</button></div>',d=>{
$('#r',d).value=m.dir;
$('#sv',d).onclick=()=>{m.text=$('#x',d).value;m.dir=$('#r',d).value;m.ts=+new Date($('#s',d).value)||Date.now();m.read=$('#rd',d).checked;if(n){if(!m.text&&!m.img)return;c.msgs.push(m)}c.msgs.sort((a,b)=>a.ts-b.ts);save();d.remove();R()};
if(!n)$('#dl',d).onclick=()=>{c.msgs=c.msgs.filter(x=>x!=m);save();d.remove();R()}})}
function mng(){SH('필터링 관리','<div class="f">'+S.contacts.map(c=>'<label>'+esc(nm(c))+'<select data-c="'+c.id+'"><option value="inbox">메시지</option><option value="spam">스팸</option><option value="trash">최근 삭제된 항목</option></select></label>').join('')+'</div><div class="sb2"><button class="pr" id="ok">완료</button></div>',d=>{
d.querySelectorAll('select').forEach(s=>{const c=gc(s.dataset.c);s.value=c.del?'trash':c.folder;s.onchange=()=>{c.del=s.value=='trash';c.folder=c.del?'inbox':s.value;save()}});$('#ok',d).onclick=()=>{d.remove();R()}})}
function send(){const c=gc(V.id),i=$('#ti'),t=i.value.trim();if(!t)return;c.msgs.push({id:uid(),dir:'out',text:t,ts:Date.now(),read:false});c.draft='';c.unread=false;S.contacts=[c,...S.contacts.filter(x=>x!=c)];save();R();$('#ti').focus()}
function mv(id,d){const a=S.contacts,i=a.findIndex(c=>c.id==id),j=i+d;if(j<0||j>=a.length)return;[a[i],a[j]]=[a[j],a[i]];save()}
const acts={
edit(){V.e=!V.e;V.m=false;R()},menu(){V.m=!V.m;R()},cm(){V.m=false;R()},flt(t){V.f=t.dataset.k;V.m=false;R()},mng(){V.m=false;R();mng()},
row(t){const c=gc(t.dataset.id);if(V.e)return CF(c.id);V.s='chat';V.id=c.id;c.unread=false;save();R()},
del(t){const c=gc(t.dataset.id);if(c.del){if(confirm('영구 삭제할까요?'))S.contacts=S.contacts.filter(x=>x!=c)}else c.del=true;save();R()},
up(t){mv(t.dataset.id,-1);R()},dn(t){mv(t.dataset.id,1);R()},add(){CF(null,true)},
exp(){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(S,null,1)],{type:'application/json'}));a.download='messages.json';a.click()},
imp(){$('#imf').click()},rst(){if(confirm('모든 데이터를 초기화할까요?')){S=seed();save();V.f='inbox';R()}},
mic(){const SR=window.SpeechRecognition||window.webkitSpeechRecognition;if(!SR)return $('#q').focus();const r=new SR();r.lang='ko-KR';r.onresult=e=>{V.q=e.results[0][0].transcript;R()};r.start()},
back(){V.s='list';R()},info(){CF(V.id)},send,photo(){$('#pf').click()}};
const A=$('#app');
A.addEventListener('click',e=>{const t=e.target.closest('[data-a]');if(t&&acts[t.dataset.a]){e.stopPropagation();acts[t.dataset.a](t)}});
A.addEventListener('input',e=>{if(e.target.id=='q'){V.q=e.target.value;$('#rows').innerHTML=list()}if(e.target.id=='ti'){gc(V.id).draft=e.target.value;save();tog()}});
A.addEventListener('keydown',e=>{if(e.key=='Enter'&&!e.isComposing&&e.target.id=='ti'){e.preventDefault();send()}});
A.addEventListener('change',async e=>{const f=e.target.files&&e.target.files[0];if(!f)return;
if(e.target.id=='pf'){const c=gc(V.id);c.msgs.push({id:uid(),dir:'out',text:'',img:await rs(f,600),ts:Date.now(),read:false});save();R()}
if(e.target.id=='imf'){try{const j=JSON.parse(await new Promise(o=>{const r=new FileReader();r.onload=()=>o(r.result);r.readAsText(f)}));if(!Array.isArray(j.contacts))throw 0;S=j;save();R()}catch(x){alert('올바른 JSON 파일이 아닙니다.')}}});
let T;A.addEventListener('pointerdown',e=>{const b=e.target.closest('.b');if(!b)return;T=setTimeout(()=>{T=0;MF(V.id,b.dataset.mid)},450)});
['pointerup','pointermove','pointercancel','scroll'].forEach(n=>A.addEventListener(n,()=>{clearTimeout(T)},true));
A.addEventListener('contextmenu',e=>{const b=e.target.closest('.b');if(b){e.preventDefault();clearTimeout(T);MF(V.id,b.dataset.mid)}});
document.addEventListener('gesturestart',e=>e.preventDefault());
let lt=0;document.addEventListener('touchend',e=>{const n=Date.now();if(n-lt<300&&!/INPUT|TEXTAREA/.test(e.target.tagName))e.preventDefault();lt=n},{passive:false});
R();

const $=s=>document.querySelector(s);
const KEY='yhright.notes.v1';let mem=null;
function load(){try{return JSON.parse(localStorage.getItem(KEY))||{notes:[],cats:[]}}catch(e){return mem||{notes:[],cats:[]}}}
function save(){try{localStorage.setItem(KEY,JSON.stringify(D))}catch(e){mem=D}}
let D=load();D.notes=D.notes||[];D.cats=D.cats||[];D.fa=D.fa||{};
let F='d:i',query='',edit=false,fedit=false,sel=new Set(),cur=null,dirty=false,range=null,tm=null,fns=[];
if(window.parent!==window)document.body.classList.add('embedded');
const uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,6);
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const pad=n=>String(n).padStart(2,'0');
(function clk(){const d=new Date();$('#clk').textContent=pad(d.getHours())+':'+pad(d.getMinutes());setTimeout(clk,30000)})();
const AN={i:'iCloud',l:'나의 iPhone'};
const accOf=n=>n.cat?(D.fa[n.cat]||'i'):(n.acc||'i');
const inF=(n,f)=>f[0]==='a'?accOf(n)===f[2]:f[0]==='d'?(!n.cat&&accOf(n)===f[2]):n.cat===f.slice(2);
const fname=f=>f[0]==='a'?'모든 '+AN[f[2]]:f[0]==='d'?'메모':f.slice(2);
function fmt(ts){const d=new Date(ts),t=new Date(),s=x=>new Date(x.getFullYear(),x.getMonth(),x.getDate()).getTime(),dd=Math.round((s(t)-s(d))/864e5);if(dd<=0)return pad(d.getHours())+':'+pad(d.getMinutes());if(dd===1)return'어제';if(dd<7)return'일월화수목금토'[d.getDay()]+'요일';return d.getFullYear()+'. '+(d.getMonth()+1)+'. '+d.getDate()+'.'}
const fullDate=ts=>{const d=new Date(ts);return d.getFullYear()+'년 '+(d.getMonth()+1)+'월 '+d.getDate()+'일 '+pad(d.getHours())+':'+pad(d.getMinutes())};
const show=id=>document.querySelectorAll('.view').forEach(v=>v.classList.toggle('show',v.id===id));
/* 액션 시트 */
function sheet(title,bt){$('#shb').innerHTML='<div class="shg">'+(title?'<div class="sht">'+esc(title)+'</div>':'')+bt.map((b,i)=>`<button class="shbtn${b.red?' red':''}" data-i="${i}">${esc(b.t)}</button>`).join('')+'</div><button class="shbtn cn" data-i="x">취소</button>';fns=bt;$('#shw').classList.add('show')}
$('#shw').onclick=e=>{const b=e.target.closest('[data-i]'),i=b&&b.dataset.i;$('#shw').classList.remove('show');if(i!==undefined&&i!=='x')fns[i].fn()};
/* 폴더 */
const FI='<svg class="fi" viewBox="0 0 24 20"><path d="M1 3a2 2 0 0 1 2-2h5l2 2h11a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2z"/></svg>';
const cnt=f=>D.notes.filter(n=>inF(n,f)).length;
function renderF(){let h='';['i','l'].forEach(a=>{h+=`<div class="sh">${a==='i'?'iCLOUD':'나의 iPHONE'}</div>`;const cs=D.cats.filter(c=>(D.fa[c]||'i')===a),rows=[];if(cs.length)rows.push(['a:'+a,'모든 '+AN[a],0]);rows.push(['d:'+a,'메모',0]);cs.forEach(c=>rows.push(['f:'+c,c,1]));h+='<div class="grp">'+rows.map(([f,n,x])=>`<div class="fr" data-f="${esc(f)}" data-x="${x}">${fedit&&x?`<i class="mn" data-del="${esc(n)}"></i>`:''}${FI}<span class="fn">${esc(n)}</span><span class="fc">${cnt(f)}</span><i class="ch"></i></div>`).join('')+'</div>'});$('#fList').innerHTML=h;$('#fEdit').textContent=fedit?'완료':'편집'}
function goF(){fedit=false;renderF();show('vF')}
function goL(){edit=false;sel.clear();query='';$('#q').value='';$('.sb').classList.remove('sf');show('vL');renderL()}
$('#fList').onclick=e=>{const r=e.target.closest('.fr');if(!r)return;const f=r.dataset.f;
if(e.target.dataset.del!==undefined)return delFolder(e.target.dataset.del);
if(fedit){if(r.dataset.x==='1')renFolder(f.slice(2));return}
F=f;goL()};
$('#fEdit').onclick=()=>{fedit=!fedit;renderF()};
$('#fNew').onclick=()=>sheet('새로운 폴더',[{t:'iCloud',fn:()=>newFolder('i')},{t:'나의 iPhone',fn:()=>newFolder('l')}]);
function nameOk(n,old){n=(n||'').trim();if(!n)return'';if(n!==old&&(D.cats.includes(n)||n==='메모')){alert('이미 사용 중인 이름입니다.');return''}return n}
function newFolder(a){const n=nameOk(prompt('새로운 폴더\n이 폴더의 이름을 입력하십시오.',''));if(!n)return;D.cats.push(n);D.fa[n]=a;save();renderF()}
function renFolder(old){const n=nameOk(prompt('폴더 이름 변경\n이 폴더의 새로운 이름을 입력하십시오.',old),old);if(!n||n===old)return;D.cats[D.cats.indexOf(old)]=n;D.fa[n]=D.fa[old]||'i';delete D.fa[old];D.notes.forEach(x=>{if(x.cat===old)x.cat=n});if(F==='f:'+old)F='f:'+n;save();renderF()}
function delFolder(c){sheet(`'${c}' 폴더를 삭제하면 이 폴더의 메모는 '메모' 폴더로 이동됩니다.`,[{t:'삭제',red:1,fn:()=>{const a=D.fa[c]||'i';D.notes.forEach(x=>{if(x.cat===c){x.cat='';x.acc=a}});D.cats=D.cats.filter(x=>x!==c);delete D.fa[c];if(F==='f:'+c)F='d:'+a;save();renderF()}}])}
/* 목록 */
function renderL(){const q=query.trim().toLowerCase();let l=D.notes.filter(n=>inF(n,F));
if(q)l=l.filter(n=>((n.title||'')+' '+(n.text||'')+' '+(n.items||[]).map(i=>i.t).join(' ')).toLowerCase().includes(q));
l.sort((a,b)=>b.ts-a.ts);
$('#nList').innerHTML=l.map(n=>{const pv=((n.text||'').split('\n').find(x=>x.trim()))||((n.items||[])[0]||{}).t||'';return`<div class="nr${sel.has(n.id)?' on':''}" data-id="${n.id}">${edit?'<i class="sc"></i>':''}<div class="rt"><b>${esc(n.title||'새로운 메모')}</b><p><span>${fmt(n.ts)}</span>${pv?esc(pv):'<em>추가 텍스트 없음</em>'}</p></div></div>`}).join('');
$('#empty').style.display=l.length?'none':'block';$('#empty').textContent=q?'검색 결과 없음':'메모 없음';
$('#lT').textContent=fname(F);$('#lEdit').textContent=edit?'완료':'편집';
$('#lCnt').textContent=edit&&sel.size?sel.size+'개 선택됨':l.length+'개의 메모';
$('#vL').classList.toggle('editing',edit);$('#lMv').style.opacity=$('#lDel').style.opacity=edit&&!sel.size?.4:1}
$('#nList').onclick=e=>{const r=e.target.closest('.nr');if(!r)return;const id=r.dataset.id;if(edit){sel.has(id)?sel.delete(id):sel.add(id);renderL()}else openEd(D.notes.find(n=>n.id===id))};
$('#lBack').onclick=goF;
$('#lEdit').onclick=()=>{edit=!edit;sel.clear();renderL()};
$('#q').oninput=e=>{query=e.target.value;renderL()};
$('#q').onfocus=()=>$('.sb').classList.add('sf');
$('#qC').onclick=()=>{query='';$('#q').value='';$('#q').blur();$('.sb').classList.remove('sf');renderL()};
$('#lNew').onclick=()=>openEd(null);
$('#lDel').onclick=()=>{if(!sel.size)return;sheet(null,[{t:sel.size+'개의 메모 삭제',red:1,fn:()=>{D.notes=D.notes.filter(n=>!sel.has(n.id));sel.clear();save();renderL()}}])};
$('#lMv').onclick=()=>{if(sel.size)moveSheet([...sel],()=>{sel.clear();edit=false;renderL()})};
function moveSheet(ids,done){const b=[];['i','l'].forEach(a=>{b.push({t:'메모 ('+AN[a]+')',a,c:''});D.cats.filter(c=>(D.fa[c]||'i')===a).forEach(c=>b.push({t:c+' ('+AN[a]+')',a,c}))});
sheet('폴더로 이동',b.map(x=>({t:x.t,fn:()=>{D.notes.forEach(n=>{if(ids.includes(n.id)){n.cat=x.c;n.acc=x.a}});if(cur&&ids.includes(cur.id)){cur.cat=x.c;cur.acc=x.a}save();done()}})))}
/* 편집기 */
const ED=$('#ebody'),ZW='\u200b';
const ckH=(t,d)=>`<div class="ck"><span class="cb${d?' on':''}" contenteditable="false"></span>${ZW}${esc(t)}</div>`;
function build(n){if(n.html)return n.html;let h='<div>'+(esc(n.title)||'<br>')+'</div>';if(n.text)n.text.split('\n').forEach(t=>h+='<div>'+(esc(t)||'<br>')+'</div>');(n.items||[]).forEach(i=>h+=ckH(i.t,i.d));(n.imgs||[]).forEach(s=>h+=`<div><img src="${s}"></div>`);return h}
function extract(){const all=[];ED.childNodes.forEach(c=>{if(c.nodeType===3){if(c.textContent.trim())all.push({t:c.textContent.trim()});return}
if(c.classList&&c.classList.contains('ck')){all.push({t:c.textContent.replace(/\u200b/g,'').trim(),ck:1,d:!!c.querySelector('.cb.on')});return}
(c.innerText||'').split('\n').forEach(t=>all.push({t:t.trim()}))});
const ti=all.findIndex(x=>x.t&&!x.ck),title=ti>-1?all[ti].t:(all.find(x=>x.t)||{t:''}).t,rest=all.filter((x,i)=>i!==ti);
return{title,text:rest.filter(x=>!x.ck).map(x=>x.t).join('\n').replace(/^\n+|\n+$/g,''),items:rest.filter(x=>x.ck&&x.t).map(x=>({t:x.t,d:x.d})),hasImg:!!ED.querySelector('img')}}
function saveCur(){if(!cur||(!dirty&&!cur.isNew))return;const x=extract(),empty=!x.title&&!x.text&&!x.items.length&&!x.hasImg&&!cur.audio,i=D.notes.findIndex(n=>n.id===cur.id);
if(empty){if(i>-1)D.notes.splice(i,1)}else{const o={id:cur.id,title:x.title,text:x.text,items:x.items,imgs:[],audio:cur.audio||'',cat:cur.cat,acc:cur.acc,ts:Date.now(),html:ED.innerHTML};cur.ts=o.ts;i>-1?D.notes[i]=o:D.notes.push(o);cur.isNew=false;$('#edate').textContent=fullDate(cur.ts)}
dirty=false;save()}
const sched=()=>{dirty=true;clearTimeout(tm);tm=setTimeout(saveCur,500)};
function openEd(n){const c=F[0]==='f'?F.slice(2):'';cur=n?{id:n.id,cat:n.cat||'',acc:accOf(n),ts:n.ts,audio:n.audio||'',isNew:false}:{id:uid(),cat:c,acc:F[0]==='f'?(D.fa[c]||'i'):F[2],ts:Date.now(),audio:'',isNew:true};
ED.innerHTML=n?build(n):'<div><br></div>';dirty=false;range=null;$('#edate').textContent=fullDate(cur.ts);
$('#eatt').innerHTML=cur.audio?`<audio controls src="${cur.audio}"></audio>`:'';$('#eBackT').textContent='메모';
$('#aaP').classList.remove('show');$('#vE').classList.remove('foc');show('vE');if(!n)setTimeout(()=>ED.focus(),60)}
function closeEd(){clearTimeout(tm);saveCur();cur=null;ED.blur();goL()}
$('#eBack').onclick=closeEd;
$('#eDone').onclick=()=>{saveCur();ED.blur();$('#vE').classList.remove('foc')};
$('#tX').onclick=$('#eDone').onclick;
ED.onfocus=()=>$('#vE').classList.add('foc');
ED.onblur=()=>setTimeout(()=>{if(document.activeElement!==ED&&!sheetBusy)$('#vE').classList.remove('foc')},150);
let sheetBusy=false;
ED.oninput=sched;
document.addEventListener('selectionchange',()=>{const s=getSelection();if(s.rangeCount&&ED.contains(s.anchorNode))range=s.getRangeAt(0).cloneRange()});
document.addEventListener('visibilitychange',()=>{if(document.hidden)saveCur()});window.addEventListener('pagehide',()=>saveCur());
ED.onclick=e=>{if(e.target.classList.contains('cb')){e.target.classList.toggle('on');sched()}};
ED.onmousedown=e=>{if(e.target.classList.contains('cb'))e.preventDefault()};
document.querySelectorAll('#aaP button,.ftb button').forEach(b=>b.onmousedown=e=>e.preventDefault());
function caret(el){const r=document.createRange();r.selectNodeContents(el);r.collapse(false);const s=getSelection();s.removeAllRanges();s.addRange(r)}
function toggleCk(){const s=getSelection();if(!s.rangeCount)return;let n=s.anchorNode;if(n===ED){ED.innerHTML='<div><br></div>';n=ED.firstChild}
while(n&&n.parentNode!==ED)n=n.parentNode;if(!n)return;
if(n.nodeType!==1){const d=document.createElement('div');ED.replaceChild(d,n);d.appendChild(n);n=d}
const d=document.createElement('div');
if(n.classList.contains('ck')){d.innerHTML=esc(n.textContent.replace(/\u200b/g,''))||'<br>'}else{d.className='ck';d.innerHTML='<span class="cb" contenteditable="false"></span>'+ZW+esc(n.innerText.replace(/\n$/,''))}
ED.replaceChild(d,n);caret(d);sched()}
$('#tCk').onclick=toggleCk;
ED.onkeydown=e=>{if(e.key!=='Enter'&&e.key!=='Backspace')return;const s=getSelection();let n=s.anchorNode;while(n&&n!==ED&&!(n.classList&&n.classList.contains('ck')))n=n.parentNode;if(!n||n===ED)return;const t=n.textContent.replace(/\u200b/g,'');
if(e.key==='Enter'){e.preventDefault();if(!t.trim()){toggleCk();return}const d=document.createElement('div');d.className='ck';d.innerHTML='<span class="cb" contenteditable="false"></span>'+ZW;n.after(d);caret(d);sched()}
else if(!t&&s.isCollapsed){e.preventDefault();toggleCk()}};
$('#tAa').onclick=()=>$('#aaP').classList.toggle('show');
$('#aaP').onclick=e=>{const b=e.target.closest('button');if(!b)return;ED.focus();if(b.dataset.c)document.execCommand(b.dataset.c);if(b.dataset.b)document.execCommand('formatBlock',false,'<'+b.dataset.b+'>');sched()};
/* 편집기 하단/공유/삭제/이동 */
$('#eNew').onclick=()=>{saveCur();openEd(null)};
$('#eDel').onclick=()=>sheet(null,[{t:'메모 삭제',red:1,fn:()=>{D.notes=D.notes.filter(n=>n.id!==cur.id);save();cur=null;goL()}}]);
$('#eMv').onclick=()=>{saveCur();if(cur.isNew)return alert('내용을 입력한 후 이동할 수 있습니다.');moveSheet([cur.id],()=>{})};
$('#eShare').onclick=()=>{const x=extract(),txt=ED.innerText.replace(/\u200b/g,'').trim(),sub=x.title||'메모';
sheet(null,[{t:'메시지',fn:()=>{location.href='sms:&body='+encodeURIComponent(txt)}},{t:'Mail',fn:()=>{location.href='mailto:?subject='+encodeURIComponent(sub)+'&body='+encodeURIComponent(txt)}},{t:'복사',fn:()=>{try{navigator.clipboard.writeText(txt)}catch(e){const t=document.createElement('textarea');t.value=txt;document.body.appendChild(t);t.select();document.execCommand('copy');t.remove()}}}])};
/* 사진 */
function insImg(src){ED.focus();if(range&&ED.contains(range.commonAncestorContainer)){const s=getSelection();s.removeAllRanges();s.addRange(range)}else caret(ED);document.execCommand('insertHTML',false,`<div><img src="${src}"></div><div><br></div>`);sched()}
$('#tCam').onclick=()=>sheet('사진 추가',[{t:'사진 촬영',fn:()=>$('#fCam').click()},{t:'사진 보관함에서 선택',fn:()=>$('#fLib').click()}]);
function pick(e){const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{const im=new Image();im.onload=()=>{const s=Math.min(1,800/im.width),c=document.createElement('canvas');c.width=im.width*s;c.height=im.height*s;c.getContext('2d').drawImage(im,0,0,c.width,c.height);insImg(c.toDataURL('image/jpeg',.8))};im.src=r.result};r.readAsDataURL(f);e.target.value=''}
$('#fCam').onchange=$('#fLib').onchange=pick;
/* 스케치 */
const cv=$('#cv'),cx=cv.getContext('2d');let drw=false,pts=[],base=null,hist=[],rdo=[],tool='pen',col='#000000';
const TL={pen:[3,1],marker:[14,.35],pencil:[2,.7],eraser:[20,1]},COLS=['#000000','#0076ff','#4cd964','#ffcc00','#ff3b30'];
$('#cols').innerHTML=COLS.map(c=>`<i data-c="${c}" style="background:${c}" class="${c===col?'on':''}"></i>`).join('');
$('#cols').onclick=e=>{const i=e.target.closest('i');if(!i)return;col=i.dataset.c;document.querySelectorAll('#cols i').forEach(x=>x.classList.toggle('on',x===i))};
$('#tools').onclick=e=>{const b=e.target.closest('button');if(!b)return;tool=b.dataset.t;document.querySelectorAll('#tools button').forEach(x=>x.classList.toggle('on',x===b))};
$('#tSk').onclick=()=>{saveCur();show('vS');const w=$('#cw').clientWidth,h=$('#cw').clientHeight;cv.width=w*2;cv.height=h*2;cv.style.width=w+'px';cv.style.height=h+'px';cx.lineCap=cx.lineJoin='round';hist=[];rdo=[]};
const snap=()=>cx.getImageData(0,0,cv.width,cv.height);
function stk(){const[w,a]=TL[tool];cx.save();cx.globalCompositeOperation=tool==='eraser'?'destination-out':'source-over';cx.globalAlpha=a;cx.strokeStyle=col;cx.lineWidth=w*2;cx.beginPath();cx.moveTo(pts[0][0],pts[0][1]);if(pts.length===1)cx.lineTo(pts[0][0]+.1,pts[0][1]);pts.forEach(p=>cx.lineTo(p[0],p[1]));cx.stroke();cx.restore()}
const pt=e=>{const r=cv.getBoundingClientRect();return[(e.clientX-r.left)*cv.width/r.width,(e.clientY-r.top)*cv.height/r.height]};
cv.onpointerdown=e=>{drw=true;cv.setPointerCapture(e.pointerId);base=snap();hist.push(base);if(hist.length>20)hist.shift();rdo=[];pts=[pt(e)];stk()};
cv.onpointermove=e=>{if(!drw)return;pts.push(pt(e));cx.putImageData(base,0,0);stk()};
cv.onpointerup=cv.onpointercancel=()=>drw=false;
$('#sU').onclick=()=>{if(!hist.length)return;rdo.push(snap());cx.putImageData(hist.pop(),0,0)};
$('#sR').onclick=()=>{if(!rdo.length)return;hist.push(snap());cx.putImageData(rdo.pop(),0,0)};
$('#sC').onclick=()=>show('vE');
$('#sD').onclick=()=>{show('vE');if(!hist.length)return;const W=cv.width,H=cv.height,d=cx.getImageData(0,0,W,H).data;let x0=W,y0=H,x1=0,y1=0;
for(let y=0;y<H;y++)for(let x=0;x<W;x++)if(d[(y*W+x)*4+3]>8){if(x<x0)x0=x;if(x>x1)x1=x;if(y<y0)y0=y;if(y>y1)y1=y}
if(x1<x0)return;x0=Math.max(0,x0-16);y0=Math.max(0,y0-16);x1=Math.min(W,x1+16);y1=Math.min(H,y1+16);
const c=document.createElement('canvas');c.width=(x1-x0)/2;c.height=(y1-y0)/2;c.getContext('2d').drawImage(cv,x0,y0,x1-x0,y1-y0,0,0,c.width,c.height);insImg(c.toDataURL('image/png'))};
renderL();

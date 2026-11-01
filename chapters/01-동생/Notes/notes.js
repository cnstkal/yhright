const $=s=>document.querySelector(s);
const KEY='yhright.notes.v1';let mem=null;
function load(){try{return JSON.parse(localStorage.getItem(KEY))||{notes:[],cats:[]}}catch(e){return mem||{notes:[],cats:[]}}}
function save(){try{localStorage.setItem(KEY,JSON.stringify(D))}catch(e){mem=D}}
let D=load(),cat='all',query='',cur=null;
if(window.parent!==window)document.body.classList.add('embedded');
const uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,6);
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
(function clk(){const d=new Date(),h=d.getHours();$('#clk').textContent=(h<12?'오전 ':'오후 ')+((h%12)||12)+':'+String(d.getMinutes()).padStart(2,'0');setTimeout(clk,30000)})();

function render(){
 const q=query.toLowerCase();
 const list=D.notes.filter(n=>(cat==='all'||n.cat===cat)&&(!q||(n.title+n.text+(n.items||[]).map(i=>i.t).join(' ')).toLowerCase().includes(q))).sort((a,b)=>b.ts-a.ts);
 $('#grid').innerHTML=list.map(n=>{
  let h='';if(n.imgs&&n.imgs[0])h+=`<img src="${n.imgs[0]}">`;
  if(n.title)h+=`<div class="t big">${esc(n.title)}</div>`;
  if(n.items&&n.items.length)h+='<div class="cl">'+n.items.slice(0,8).map(i=>`<div>${i.d?'☑':'☐'} ${i.d?'<s style="color:#aaa">'+esc(i.t)+'</s>':esc(i.t)}</div>`).join('')+'</div>';
  if(n.text){const len=n.text.length;h+=`<div class="t ${!n.title&&len<18?'big':!n.title&&len<40?'mid':''}">${esc(n.text)}</div>`}
  if(n.audio)h+='<div class="cat">🎤 음성 메모</div>';
  if(n.cat)h+=`<div class="cat">${esc(n.cat)}</div>`;
  return `<div class="card" data-id="${n.id}">${h}<div class="fade"></div></div>`}).join('');
 $('#empty').style.display=list.length?'none':'block';
 $('#chips').innerHTML=['all',...D.cats].map(c=>`<div class="chip ${c===cat?'on':''}" data-c="${esc(c)}">${c==='all'?'전체':esc(c)}</div>`).join('');
 $('#dp').innerHTML='<h4>카테고리</h4>'+['all',...D.cats].map(c=>`<div class="${c===cat?'on':''}" data-c="${esc(c)}">${c==='all'?'모든 메모':esc(c)}</div>`).join('');
}
$('#grid').onclick=e=>{const c=e.target.closest('.card');if(c)openEd(D.notes.find(n=>n.id===c.dataset.id))};
$('#chips').onclick=e=>{const c=e.target.closest('.chip');if(c){cat=c.dataset.c;render()}};
$('#dp').onclick=e=>{const c=e.target.closest('[data-c]');if(c){cat=c.dataset.c;$('#drawer').classList.remove('show');render()}};
$('#menuBtn').onclick=()=>$('#drawer').classList.add('show');
$('#drawer .bg').onclick=()=>$('#drawer').classList.remove('show');
$('#sBtn').onclick=()=>{const b=$('#bar');b.classList.toggle('searching');if(b.classList.contains('searching'))$('#q').focus();else{query='';$('#q').value='';render()}};
$('#q').oninput=e=>{query=e.target.value;render()};
$('#mBtn').onclick=e=>{e.stopPropagation();$('#sheet').classList.toggle('show')};
document.addEventListener('click',()=>$('#sheet').classList.remove('show'));
$('#mCat').onclick=()=>{const n=prompt('카테고리 이름');if(n&&n.trim()&&!D.cats.includes(n.trim())){D.cats.push(n.trim());save();render()}};
$('#mDelCat').onclick=()=>{if(cat==='all')return alert('삭제할 카테고리를 먼저 선택하세요.');if(confirm(`'${cat}' 카테고리를 삭제할까요? 메모는 유지됩니다.`)){D.notes.forEach(n=>{if(n.cat===cat)n.cat=''});D.cats=D.cats.filter(c=>c!==cat);cat='all';save();render()}};
$('#mClear').onclick=()=>{if(confirm('모든 메모를 삭제할까요?')){D.notes=[];save();render()}};
$('#quick').onkeydown=e=>{if(e.key==='Enter'&&e.target.value.trim()){D.notes.push({id:uid(),title:'',text:e.target.value.trim(),items:[],imgs:[],audio:'',cat:cat==='all'?'':cat,ts:Date.now()});e.target.value='';save();render()}};
document.querySelector('.tools').onclick=e=>{const b=e.target.closest('[data-n]');if(!b)return;const k=b.dataset.n;
 openEd(null);if(k==='list')toggleList();if(k==='photo')$('#file').click();if(k==='voice')rec()};

/* editor */
function renderBody(){
 const b=$('#ebody');
 if(cur.list){b.innerHTML=cur.items.map((i,x)=>`<div class="row ${i.d?'done':''}"><input type="checkbox" data-x="${x}" ${i.d?'checked':''}><input type="text" data-t="${x}" value="${esc(i.t)}"><span data-r="${x}" style="color:#aaa;padding:0 6px">✕</span></div>`).join('')+'<div class="row" style="color:#999" id="addI">＋ 항목 추가</div>'}
 else b.innerHTML='<textarea id="etext" placeholder="내용을 입력하세요"></textarea>',$('#etext').value=cur.text,$('#etext').oninput=e=>{cur.text=e.target.value;e.target.style.height='auto';e.target.style.height=Math.max(120,e.target.scrollHeight)+'px'};
 $('#eatt').innerHTML=cur.imgs.map(s=>`<img src="${s}">`).join('')+(cur.audio?`<audio controls src="${cur.audio}"></audio>`:'');
}
$('#ebody').onclick=e=>{const t=e.target;
 if(t.dataset.x!==undefined){cur.items[t.dataset.x].d=t.checked;renderBody()}
 else if(t.dataset.r!==undefined){cur.items.splice(t.dataset.r,1);renderBody()}
 else if(t.id==='addI'){cur.items.push({t:'',d:false});renderBody();const a=document.querySelectorAll('[data-t]');a[a.length-1].focus()}};
$('#ebody').oninput=e=>{if(e.target.dataset.t!==undefined)cur.items[e.target.dataset.t].t=e.target.value};
$('#ebody').onkeydown=e=>{if(e.key==='Enter'&&e.target.dataset.t!==undefined){e.preventDefault();cur.items.splice(+e.target.dataset.t+1,0,{t:'',d:false});renderBody();document.querySelectorAll('[data-t]')[+e.target.dataset.t+1].focus()}};
function toggleList(){if(cur.list){cur.text=cur.items.map(i=>i.t).join('\n');cur.items=[];cur.list=false}else{cur.items=(cur.text||'').split('\n').filter(x=>x.trim()).map(t=>({t,d:false}));if(!cur.items.length)cur.items=[{t:'',d:false}];cur.text='';cur.list=true}renderBody()}
function openEd(n){
 cur=n?JSON.parse(JSON.stringify(n)):{id:uid(),title:'',text:'',items:[],imgs:[],audio:'',cat:cat==='all'?'':cat,ts:Date.now(),isNew:true};
 cur.list=!!(cur.items&&cur.items.length);
 $('#etitle').value=cur.title;$('#etitle').oninput=e=>cur.title=e.target.value;
 $('#ecat').innerHTML='<option value="">카테고리 없음</option>'+D.cats.map(c=>`<option ${c===cur.cat?'selected':''}>${esc(c)}</option>`).join('');
 $('#ecat').onchange=e=>cur.cat=e.target.value;
 renderBody();$('#editor').classList.add('show');
}
function commit(){
 if(cur.list)cur.items=cur.items.filter(i=>i.t.trim());
 const empty=!cur.title.trim()&&!cur.text.trim()&&!cur.items.length&&!cur.imgs.length&&!cur.audio;
 const i=D.notes.findIndex(n=>n.id===cur.id);
 if(empty){if(i>-1)D.notes.splice(i,1)}else{const o={id:cur.id,title:cur.title,text:cur.text,items:cur.items,imgs:cur.imgs,audio:cur.audio,cat:cur.cat,ts:Date.now()};if(i>-1)D.notes[i]=o;else D.notes.push(o)}
 save();$('#editor').classList.remove('show');render();
}
$('#eSave').onclick=commit;$('#eBack').onclick=commit;
$('#eDel').onclick=()=>{if(confirm('이 메모를 삭제할까요?')){D.notes=D.notes.filter(n=>n.id!==cur.id);save();$('#editor').classList.remove('show');render()}};
$('#eList').onclick=toggleList;
$('#ePhoto').onclick=()=>$('#file').click();
$('#file').onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{const im=new Image();im.onload=()=>{const s=Math.min(1,800/im.width),c=document.createElement('canvas');c.width=im.width*s;c.height=im.height*s;c.getContext('2d').drawImage(im,0,0,c.width,c.height);cur.imgs.push(c.toDataURL('image/jpeg',.8));renderBody()};im.src=r.result};r.readAsDataURL(f);e.target.value=''};

/* voice */
let mr=null,ch=[];
async function rec(){
 if(mr&&mr.state==='recording'){mr.stop();return}
 try{const st=await navigator.mediaDevices.getUserMedia({audio:true});mr=new MediaRecorder(st);ch=[];
  mr.ondataavailable=e=>ch.push(e.data);
  mr.onstop=()=>{st.getTracks().forEach(t=>t.stop());const r=new FileReader();r.onload=()=>{cur.audio=r.result;renderBody()};r.readAsDataURL(new Blob(ch));$('#eVoice').style.color=''};
  mr.start();$('#eVoice').style.color='#d33';
  setTimeout(()=>{if(mr&&mr.state==='recording')mr.stop()},120000);
 }catch(e){alert('마이크를 사용할 수 없습니다.')}
}
$('#eVoice').onclick=rec;

/* drawing */
const cv=$('#cv'),cx=cv.getContext('2d');let dr=false;
function sz(){cv.width=cv.clientWidth;cv.height=Math.max(300,$('.cw').clientHeight-18);cv.style.height=cv.height+'px';cx.fillStyle='#fff';cx.fillRect(0,0,cv.width,cv.height);cx.lineWidth=3;cx.lineCap='round';cx.strokeStyle='#222'}
$('#eDraw').onclick=()=>{$('#draw').classList.add('show');sz()};
$('#dClear').onclick=sz;$('#dCancel').onclick=()=>$('#draw').classList.remove('show');
$('#dOk').onclick=()=>{cur.imgs.push(cv.toDataURL('image/png'));$('#draw').classList.remove('show');renderBody()};
const pt=e=>{const r=cv.getBoundingClientRect();return[(e.clientX-r.left)*cv.width/r.width,(e.clientY-r.top)*cv.height/r.height]};
cv.onpointerdown=e=>{dr=true;cv.setPointerCapture(e.pointerId);const[x,y]=pt(e);cx.beginPath();cx.moveTo(x,y);cx.lineTo(x+.1,y+.1);cx.stroke()};
cv.onpointermove=e=>{if(!dr)return;const[x,y]=pt(e);cx.lineTo(x,y);cx.stroke()};
cv.onpointerup=cv.onpointercancel=()=>dr=false;
render();

const $=s=>document.querySelector(s);
const S={wifi:true,cur:'YUYU',join:null,assist:true,edit:false,bt:true,scan:false,
nets:[{n:'YUYU',k:1,l:1,s:3}],
bts:[{n:'AirPods',st:'c',my:1,display:'YUYU의 마음...💗'}],found:true};
const CH='<svg class="ch" viewBox="0 0 8 14" fill="none" stroke="#c4c4c8" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 1l6 6-6 6"/></svg>';
const TG=on=>`<div class="tg ro${on?' on':''}"><i></i></div>`;
const wfi=s=>`<svg width="20" height="17" viewBox="0 0 20 17" fill="none" stroke="#000" stroke-width="2.2" stroke-linecap="round"><path opacity="${s>=3?1:.25}" d="M1.5 5a12 12 0 0 1 17 0"/><path opacity="${s>=2?1:.25}" d="M4.5 8.2a8 8 0 0 1 11 0"/><path d="M7.5 11.2a4 4 0 0 1 5 0"/><circle cx="10" cy="14.2" r="1" fill="#000" stroke="none"/></svg>`;
const lock='<svg width="13" height="17" viewBox="0 0 13 17"><rect x="0" y="6.5" width="13" height="10.5" rx="2.5"/><path d="M3 7V5a3.5 3.5 0 0 1 7 0v2" fill="none" stroke="#000" stroke-width="2"/></svg>';
const back='<div class="pill" onclick="nav(\'main\')"><svg width="12" height="20" viewBox="0 0 12 20" fill="none" stroke="#000" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2L2 10l8 8"/></svg></div>';
function nav(id){['main','wf','bt'].forEach(x=>$('#'+x).classList.toggle('hid',x!==id));if(id=='main')rMain();if(id=='wf')rWf();if(id=='bt'){rBt();scanBt()}}
function R(i,bg,l,st,k,extra){return `<div class="row${k?' ck':''}" ${k?`onclick="nav('${k}')"`:''} style="${extra||''}"><div class="ic" style="background:${bg}">${i}</div><div class="l">${l}</div>${st||''}</div>`}
const stt=t=>`<span class="st">${t}</span>`;
const P={pods:'<path d="M8 3a3 3 0 0 0-3 3v3a3 3 0 0 0 3 3v7M16 3a3 3 0 0 1 3 3v3a3 3 0 0 1-3 3v7"/>',plane:'<path fill="#fff" stroke="none" d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z"/>',wifi:'<path d="M2 9a14 14 0 0 1 20 0M5.5 12.5a9 9 0 0 1 13 0M9 16a4 4 0 0 1 6 0"/><circle cx="12" cy="19.5" r="1" fill="#fff"/>',bt:'<path d="M7 7l10 10-5 4V3l5 4L7 17"/>',cell:'<circle cx="12" cy="11" r="1.5"/><path d="M12 12.5V21M7.5 6.5a6.5 6.5 0 0 0 0 9M16.5 6.5a6.5 6.5 0 0 1 0 9"/>',link:'<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',bat:'<rect x="2" y="7" width="18" height="10" rx="3"/><path d="M22 11v2"/>',vpn:'<circle cx="12" cy="11" r="8"/><path d="M4 11h16M12 3c3 3 3 13 0 16M12 3c-3 3-3 13 0 16M12 19v3M8 22h8"/>',gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>',acc:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="8" r="1"/><path d="M7 10.5l5 1 5-1M12 11.5V15M10 19l2-4 2 4"/>',srch:'<circle cx="10" cy="10" r="6"/><path d="M15 15l6 6"/>',sun:'<circle cx="12" cy="12" r="4" fill="#fff"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>',flow:'<circle cx="12" cy="12" r="2"/><circle cx="12" cy="7" r="3.5"/><circle cx="12" cy="17" r="3.5"/><circle cx="7" cy="12" r="3.5"/><circle cx="17" cy="12" r="3.5"/>',sb:'<rect x="3" y="6" width="18" height="12" rx="3"/><path d="M7 12l2 2 3-4M14 11h4"/>',cc:'<rect x="4" y="4" width="16" height="7" rx="3.5"/><rect x="4" y="13" width="16" height="7" rx="3.5"/><circle cx="8" cy="7.5" r="1.5" fill="#fff"/><circle cx="16" cy="16.5" r="1.5" fill="#fff"/>',cam:'<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',home:'<rect x="6" y="2" width="12" height="20" rx="3"/><path d="M9 7h.01M12 7h.01M15 7h.01M9 10h.01M12 10h.01M15 10h.01"/>',mode:'<circle cx="12" cy="12" r="9"/><path fill="#fff" d="M12 3a9 9 0 0 0 0 18z"/>',bell:'<path d="M6 16v-5a6 6 0 0 1 12 0v5l2 2H4zM10 21h4"/>',snd:'<path d="M4 9h4l5-4v14l-5-4H4zM16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11"/>',moon:'<path fill="#fff" stroke="none" d="M20 14A8 8 0 1 1 10 4a6.5 6.5 0 0 0 10 10z"/>',hg:'<path d="M7 3h10M7 21h10M8 3c0 5 8 5 8 9s-8 4-8 9M16 3c0 5-8 5-8 9s8 4 8 9"/>',fid:'<path d="M4 9V6a2 2 0 0 1 2-2h3M15 4h3a2 2 0 0 1 2 2v3M20 15v3a2 2 0 0 1-2 2h-3M9 20H6a2 2 0 0 1-2-2v-3M9 10v2M15 10v2M9 16c1.5 1.5 4.5 1.5 6 0"/>',hand:'<path d="M8 12V5a1.5 1.5 0 0 1 3 0v6V3.5a1.5 1.5 0 0 1 3 0V11V5a1.5 1.5 0 0 1 3 0v8c0 4-2 7-6 7-3 0-4-2-6-5l-1-2a1.5 1.5 0 0 1 3-1z"/>',wal:'<rect x="3" y="6" width="18" height="13" rx="3"/><path d="M3 11h18"/>',gc:'<circle cx="9" cy="9" r="5" fill="#ff3b5c" stroke="none"/><circle cx="15" cy="14" r="5" fill="#3b82f0" stroke="none" opacity=".85"/>',cloud:'<path fill="#4aa3f0" stroke="none" d="M7 18a4 4 0 0 1-.5-8A6 6 0 0 1 18 11a3.5 3.5 0 0 1-.5 7z"/>'};
const ic=(k,z=20)=>`<svg width="${z}" height="${z}" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${P[k]}</svg>`;
function rMain(){
const btc=S.bts.filter(d=>d.st=='c').length;
const w=S.wifi&&S.cur?S.cur:'끔';
const card=a=>`<div class="card">${a.join('')}</div>`;
const A=(i,bg,l,s)=>R(i,bg,l,(s?stt(s):'')+CH);
$('#main').innerHTML=`<div class="pad"><h1>설정</h1>
<div class="card"><div class="row" style="padding:12px 16px;--sl:112px"><div class="av">박</div><div class="l"><b style="font-size:22px">박성화</b><div class="st" style="font-size:15px">Apple 계정, iCloud+ 등</div></div>${CH}</div>
<div class="row" style="--sl:16px"><div class="l">저장 공간이 부족합니다.</div><div class="badge">1</div>${CH}</div></div>
${card([A(ic('pods'),'#8e8e93','AirPods')])}
${card([R(ic('plane'),'#f09a37','에어플레인 모드',TG(0)),R(ic('wifi'),'#3b82f0','Wi-Fi',stt(w)+CH,'wf'),R(ic('bt'),'#3b82f0','Bluetooth',stt(S.bt?'켬':'끔')+CH,'bt'),A(ic('cell'),'#34c759','셀룰러','끔'),`<div class="row" style="opacity:.45"><div class="ic" style="background:#34c759">${ic('link')}</div><div class="l">개인용 핫스팟</div>${stt('끔')+CH}</div>`,A(ic('bat'),'#34c759','배터리'),R(ic('vpn'),'#3b82f0','VPN',TG(0))])}
${card([A(ic('gear'),'#8e8e93','일반'),A(ic('acc'),'#3b82f0','손쉬운 사용'),A(ic('srch'),'#8e8e93','검색'),A(ic('sun'),'#3b82f0','디스플레이 및 밝기'),A(ic('flow'),'#4cb8e0','배경화면'),A(ic('sb'),'#000','스탠바이'),A(ic('cc'),'#8e8e93','제어 센터'),A(ic('cam'),'#8e8e93','카메라'),A(ic('home'),'#3b82f0','홈 화면 및 앱 보관함'),A(ic('mode'),'#000','화면 모드')])}
${card([A(ic('bell'),'#e8453c','알림'),A(ic('snd'),'#e8384f','사운드 및 햅틱'),A(ic('moon'),'#5856d6','집중 모드'),A(ic('hg'),'#5856d6','스크린 타임')])}
${card([A(ic('fid'),'#34c759','Face ID 및 암호'),A('<b style="font-size:11px">SOS</b>','#e8453c','긴급 구조 요청'),A(ic('hand'),'#3b82f0','개인정보 보호 및 보안')])}
${card([A(ic('wal'),'#000','지갑 및 Apple Pay'),A(ic('gc'),'#e8e8ec','Game Center'),A(ic('cloud'),'#e8f0fb','iCloud')])}
</div>`;
$('#main').querySelectorAll('.row:not(.ck)').forEach(r=>r.style.cursor='default')}
function netRow(n,known){
const cur=S.cur===n.n&&S.wifi,jn=S.join===n.n;
return `<div class="row ck" style="--sl:60px" onclick="pick('${n.n}')">${S.edit&&known?`<div class="minus" onclick="event.stopPropagation();forget('${n.n}')">−</div>`:`<div class="chk">${cur?'✓':''}</div>`}<div class="l" style="font-size:${n.n.length>20?17:17}px">${n.n}${jn?'<div class="st" style="font-size:13px">연결 중…</div>':''}</div>${n.l?lock:''}${wfi(n.s)}<div class="ib" onclick="event.stopPropagation();winfo('${n.n}')">i</div></div>`}
function rWf(){
const known=S.nets.filter(n=>n.k),other=S.nets.filter(n=>!n.k);
const cur=S.nets.find(n=>n.n===S.cur&&S.wifi);
let h=`<div class="top">${back}<b>Wi-Fi</b><div class="pill" onclick="S.edit=!S.edit;rWf()">${S.edit?'완료':'편집'}</div></div><div class="pad" style="padding-top:20px">
<div class="card"><div class="intro"><div class="big">${ic('wifi',38)}</div><h2>Wi-Fi</h2><p>Wi-Fi에 연결하고, 사용 가능한 네트워크를 확인하고, 네트워크 연결 및 근처 핫스팟에 대한 설정을 관리할 수 있습니다. <span class="lk">더 알아보기…</span></p></div>
<div class="row" style="--sl:60px"><div class="chk"></div><div class="l">Wi-Fi</div><div class="tg${S.wifi?' on':''}" onclick="togWf()"><i></i></div></div>${S.wifi&&cur?netRow(cur,1):''}</div>`;
if(S.wifi){
const kn=known.filter(n=>n!==cur);
if(kn.length)h+=`<div class="hd">알고 있는 네트워크</div><div class="card">${kn.map(n=>netRow(n,1)).join('')}</div>`;
if(other.filter(n=>n!==cur).length)h+=`<div class="hd">다른 네트워크</div><div class="card">${other.filter(n=>n!==cur).map(n=>netRow(n)).join('')}<div class="row ck" style="--sl:60px" onclick="other()"><div class="chk"></div><div class="l">기타…</div></div></div>`}h+=`<div class="card"><div class="row" style="padding:12px 16px;--sl:16px"><div class="l">연결 지원<div class="st" style="font-size:17px">440MB</div></div><div class="tg${S.assist?' on':''}" onclick="S.assist=!S.assist;rWf()"><i></i></div></div><div class="row ck" style="--sl:16px" onclick="reset()"><div class="lk l">데이터 사용량 재설정</div></div></div>
<div class="ft">더 안정적인 인터넷 연결을 위해 Wi-Fi 외에도 셀룰러 데이터를 사용합니다. <span class="lk">더 알아보기…</span><br><br>iPhone이(가) 연결에 사용된 셀룰러 데이터 사용량을 추적합니다. 전체 셀룰러 데이터 사용량은 ‘셀룰러’ 설정에서 확인할 수 있습니다.<br><br><span id="rs">최근 재설정: 2026. 1. 12. 오후 2:31</span></div></div>`;
const y=$('#wf').scrollTop;$('#wf').innerHTML=h;$('#wf').scrollTop=y}
function reset(){const d=new Date();$('#rs').textContent='최근 재설정: '+d.getFullYear()+'. '+(d.getMonth()+1)+'. '+d.getDate()+'. '+(d.getHours()<12?'오전 ':'오후 ')+((d.getHours()%12)||12)+':'+String(d.getMinutes()).padStart(2,'0');}
function togWf(){S.wifi=!S.wifi;if(!S.wifi)S.cur=null;rWf()}
function pick(n){const x=S.nets.find(o=>o.n===n);if(S.edit||S.cur===n)return;
if(x.l&&!x.k)return pw(x);conn(x)}
function conn(x){S.join=x.n;rWf();setTimeout(()=>{S.cur=x.n;S.join=null;if(!x.k)x.k=1;rWf()},900)}
function modal(h){$('#sh').innerHTML=h;$('#md').classList.add('s')}
function close_(){$('#md').classList.remove('s')}
$('#md').onclick=e=>{if(e.target.id=='md')close_()};
function pw(x){modal(`<h3>“${x.n}”의 암호 입력</h3><input id="pi" type="password" placeholder="암호" autocomplete="off"><div class="err" id="pe"></div><div class="st" style="font-size:13px;margin:0 4px">시뮬레이션: 실제 Wi-Fi 연결은 이루어지지 않습니다. 8자 이상 입력하세요.</div><button class="bt" onclick="pwOk('${x.n}')"><b>연결</b></button><button class="bt" onclick="close_()">취소</button>`);setTimeout(()=>$('#pi').focus(),50)}
function pwOk(n){if($('#pi').value.length<8){$('#pe').textContent='암호는 8자 이상이어야 합니다.';return}close_();x=S.nets.find(o=>o.n===n);x.l=1;conn(x)}
function other(){modal(`<h3>네트워크 추가</h3><input id="ni" placeholder="네트워크 이름"><input id="np" type="password" placeholder="암호"><div class="err" id="pe"></div><button class="bt" onclick="addNet()"><b>연결</b></button><button class="bt" onclick="close_()">취소</button>`)}
function addNet(){const n=$('#ni').value.trim(),p=$('#np').value;if(!n){$('#pe').textContent='이름을 입력하세요.';return}if(p.length<8){$('#pe').textContent='암호는 8자 이상이어야 합니다.';return}
if(S.nets.find(o=>o.n===n)){$('#pe').textContent='이미 있는 네트워크입니다.';return}close_();const x={n,l:1,s:2};S.nets.push(x);conn(x)}
function forget(n){const x=S.nets.find(o=>o.n===n);x.k=0;if(S.cur===n)S.cur=null;rWf()}
function winfo(n){const x=S.nets.find(o=>o.n===n),c=S.cur===n&&S.wifi;
const r=(a,b)=>`<div class="row" style="--sl:16px"><div class="l">${a}</div>${stt(b)}</div>`;
modal(`<h3>${n}</h3><div class="card" style="margin:0 0 10px">${r('상태',c?'연결됨(시뮬레이션)':'연결 안 됨')}${r('보안',x.l?'WPA2/WPA3 개인용':'없음')}${r('신호 세기',['','약함','보통','강함'][x.s])}${r('저장됨',x.k?'예':'아니요')}</div>
${c?`<button class="bt d" onclick="S.cur=null;close_();rWf()">연결 해제</button>`:''}${x.k?`<button class="bt d" onclick="forget('${n}');close_()">이 네트워크 지우기</button>`:''}<button class="bt" onclick="close_()">닫기</button>`)}
/* Bluetooth */
let st_;
function scanBt(){S.scan=false;}
function rBt(){
const lab={c:'연결됨',d:'연결 안 됨',p:'연결 중...'};
const dr=d=>`<div class="row ck" style="--sl:16px" onclick="btp('${d.n}')"><div class="l">${d.display||d.n}</div>${d.my?stt(lab[d.st]):d.st=='p'?stt('연결 중...'):''}<div class="ib" onclick="event.stopPropagation();binfo('${d.n}')">i</div></div>`;
const my=S.bts.filter(d=>d.my),ot=S.bts.filter(d=>!d.my);
const y=$('#bt').scrollTop;
$('#bt').innerHTML=`<div class="top">${back}</div><div class="pad" style="padding-top:20px">
<div class="card"><div class="intro"><div class="big">${ic('bt',38)}</div><h2>Bluetooth</h2><p>음악 스트리밍, 전화 통화 및 게임과 같은 활동에 사용할 수 있는 액세서리에 연결하십시오. <span class="lk">더 알아보기…</span></p></div>
<div class="row" style="--sl:16px"><div class="l">Bluetooth</div><div class="tg${S.bt?' on':''}" onclick="togBt()"><i></i></div></div></div>
<div class="ft">이 iPhone은 Bluetooth 설정이 열려 있는 동안 ‘iPhone’(으)로 인식 가능합니다.</div>
${S.bt?`${my.length?`<div class="hd" style="font-size:19px;margin-top:6px">나의 기기</div><div class="card">${my.map(dr).join('')}</div>`:''}
<div class="hd" style="font-size:19px">다른 기기 ${S.scan?'<div class="sp"></div>':''}</div>${ot.length?`<div class="card">${ot.map(dr).join('')}</div>`:''}`:''}
<div class="ft" style="margin-top:0">Apple Watch를 iPhone과 페어링하려면,<br><span class="lk">Apple Watch 앱</span>(으)로 이동하십시오.<br><br>이 화면은 가상 기기를 사용한 시뮬레이션입니다.</div></div>`;
$('#bt').scrollTop=y}
function togBt(){S.bt=!S.bt;if(!S.bt)S.bts.forEach(d=>{if(d.st!='d')d.st='d'});S.found=S.found&&!S.bt?S.found:S.found;rBt();if(S.bt)scanBt()}
function btp(n){const d=S.bts.find(o=>o.n===n);if(d.st=='p')return;
if(d.st=='c'){d.st='d';rBt();return}
d.st='p';rBt();setTimeout(()=>{d.st='c';d.my=1;rBt()},1100)}
function binfo(n){const d=S.bts.find(o=>o.n===n);
modal(`<h3>${n}</h3><div class="card" style="margin:0 0 10px"><div class="row" style="--sl:16px"><div class="l">이름</div>${stt(n)}</div><div class="row" style="--sl:16px"><div class="l">상태</div>${stt(d.st=='c'?'연결됨(시뮬레이션)':d.st=='p'?'연결 중...':'연결 안 됨')}</div></div>
<button class="bt" onclick="close_();btp('${n}')">${d.st=='c'?'연결 해제':'연결'}</button>${d.n!='AirPods'?`<button class="bt d" onclick="close_();S.bts=S.bts.filter(o=>o.n!='${n}');rBt()">이 기기 지우기</button>`:''}<button class="bt" onclick="close_()">닫기</button>`)}
rMain();

(function(){
var $=function(s){return document.querySelector(s)},app=$('#app');
var stack=[{v:'main'}],recent=JSON.parse(sessionStorage.getItem('nvRecent')||'[]');
function save(){try{sessionStorage.setItem('nvRecent',JSON.stringify(recent))}catch(e){}}
var SV=[['메일','M','#1ec800','mail'],['카페','C','#ff8a00','cafe'],['블로그','B','#2db400','blog'],['지식iN','iN','#3b8bff','kin'],['쇼핑','S','#f5426c','shop'],['웹툰','W','#00c9a7','toon'],['지도','맵','#4a90e2','map'],['사전','A','#7b61ff','dict']];
var HOT=['리우올림픽','폭염 대비','포켓몬고','열대야','방학 계획','아이폰7 출시','갤럭시노트7','개학 준비','태풍 경로','무한도전'];
var CATS=['주요뉴스','정치','경제','사회','생활/문화','IT/과학','스포츠','연예'];
var NEWS=[
['리우올림픽 양궁 대표팀, 단체전 금메달 확정','연합뉴스','10분 전','태극 궁사들이 결승에서 접전 끝에 우승했다. 현지 응원단도 열띤 응원을 보냈다.'],
['전국 폭염경보…열대야 이어져 전력 수요 급증','KBS뉴스','32분 전','기상청은 이번 주말까지 무더위가 계속될 것으로 내다봤다.'],
['포켓몬 고 열풍, 속초 관광객 크게 늘어','SBS','1시간 전','게임 출시를 앞두고 일부 지역에 이용자가 몰리고 있다.'],
['2학기 개학 앞두고 학용품 할인 행사 잇따라','매일경제','2시간 전','대형마트와 온라인몰이 앞다퉈 할인에 나섰다.'],
['스마트폰 신제품 공개 임박…업계 관심 집중','전자신문','3시간 전','하반기 시장 경쟁이 본격화될 전망이다.'],
['주말 전국 소나기…태풍 북상 가능성 주시','MBC','4시간 전','기상청은 이동 경로를 예의주시하고 있다.']];
function body(i){return '<div class="art"><h2>'+NEWS[i][0]+'</h2><div class="m">'+NEWS[i][1]+' | 2016.08.12. 오전 9:'+(10+i)+'</div><div class="img">기사 이미지</div><p>'+NEWS[i][3]+' 전문가들은 당분간 같은 흐름이 이어질 것으로 보고 있다.</p><p>관계자는 "시민들의 관심이 높은 만큼 지속적으로 상황을 살피겠다"고 밝혔다. 이번 사안은 다음 주에도 주요 의제로 다뤄질 것으로 보인다.</p><p><span class="btn">공유</span><span class="btn">스크랩</span></p></div>'}
function thumb(c){return '<div class="th" style="background:'+(c||'#bbb')+'">NEWS</div>'}
function newsLi(i){return '<div class="li" data-go="art" data-a="'+i+'"><div class="tx"><h3>'+NEWS[i][0]+'</h3><p>'+NEWS[i][3]+'</p><div class="m">'+NEWS[i][1]+' · '+NEWS[i][2]+'</div></div>'+thumb()+'</div>'}
function hd(t,right){return '<div class="hd t"><div class="bk" data-back>‹</div><h1>'+t+'</h1>'+(right||'')+'</div>'}
function items(t,n,sub){var o='';for(var i=1;i<=n;i++)o+='<div class="li" data-go="det" data-a="'+t+' '+i+'"><div class="tx"><h3>'+t+' '+i+'번째 글</h3><p>'+sub+'</p><div class="m">2016.08.'+(13-i%9)+' · 조회 '+(i*37)+'</div></div></div>';return o}
var SCR={
main:function(){var s='';SV.forEach(function(v){s+='<div data-go="svc" data-a="'+v[3]+'"><i style="background:'+v[2]+'">'+v[1]+'</i>'+v[0]+'</div>'});
var h='';HOT.forEach(function(k,i){h+='<div data-q="'+k+'"><b>'+(i+1)+'</b>'+k+'</div>'});
var n='';for(var i=0;i<NEWS.length;i++)n+=newsLi(i);
return '<div class="hd"><span class="logo">NAVER</span><span class="sp"></span><span class="ic">🔔</span><span class="ic">≡</span></div><div class="sbox"><div class="sin" data-go="search"><span>N</span><input readonly placeholder="검색어를 입력하세요"><span>🎤</span></div></div><div class="body">'+'<div class="svc">'+s+'</div><div class="sec">실시간 급상승 검색어<small>08.12. 09:00 기준</small></div><div class="rk">'+h+'</div><div class="sec" data-go="news">뉴스 <small>더보기 ›</small></div>'+n+'<div class="ft">© NAVER Corp.</div></div>'},
search:function(){return '<div class="hd"><div class="bk" data-back>‹</div><div class="sin" style="flex:1;height:36px"><span>N</span><input id="q" autofocus placeholder="검색어를 입력하세요"><span id="clr" data-clr>✕</span></div><span class="ic" data-do>🔍</span></div><div class="body"><div id="ac" class="ac"></div><div id="rc"></div></div>'},
news:function(a){var c=a||0,t='';CATS.forEach(function(x,i){t+='<div class="'+(i==c?'on':'')+'" data-go="news" data-a="'+i+'" data-rep>'+x+'</div>'});var n='';for(var i=0;i<NEWS.length;i++)n+=newsLi((i+c)%NEWS.length);return hd('뉴스')+'<div class="tabs">'+t+'</div><div class="body">'+n+'</div>'},
art:function(a){var rel='<div class="sec">관련 기사</div>';for(var i=0;i<3;i++)rel+=newsLi((+a+i+1)%NEWS.length);return hd('뉴스','<span class="ic">⇪</span>')+'<div class="body">'+body(a)+rel+'</div>'},
result:function(q){var o='';for(var i=1;i<=6;i++)o+='<div class="li res"><div class="tx"><div class="u">'+['blog.naver.com','cafe.naver.com','kin.naver.com','news.naver.com','shopping.naver.com','terms.naver.com'][i-1]+'</div><h3>'+q+' 관련 정보 '+i+'</h3><p class="s">'+q+'에 대한 자세한 내용과 이용 후기를 확인해 보세요. 2016.08.1'+i+'.</p></div>'+(i%2?'<div class="th">IMG</div>':'')+'</div>';return '<div class="hd"><div class="bk" data-back>‹</div><div class="sin" style="flex:1;height:36px" data-go="search"><span>N</span><input readonly value="'+q+'"></div></div><div class="tabs"><div class="on">통합</div><div>블로그</div><div>카페</div><div>지식iN</div><div>뉴스</div><div>쇼핑</div></div><div class="body">'+o+'</div>'},
svc:function(k){var T={mail:['메일',['받은메일함','보낸메일함','내게쓴메일함','휴지통'],'새 메일이 도착했습니다.'],cafe:['카페',['가입 카페','인기글','내 활동'],'오늘 올라온 인기 게시글입니다.'],blog:['블로그',['이웃새글','추천글','내 블로그'],'여름 휴가 다녀온 이야기입니다.'],kin:['지식iN',['질문 목록','답변하기','내 질문'],'궁금한 점을 질문합니다.'],shop:['쇼핑',['오늘의 특가','패션','디지털'],''],toon:['웹툰',['월','화','수','목','금','토','일'],'새 에피소드가 업데이트되었습니다.'],map:['지도',[],''],dict:['사전',['영어','국어','한자','일본어'],'']};
var t=T[k],tabs='';t[1].forEach(function(x,i){tabs+='<div class="'+(i?'':'on')+'" data-tab>'+x+'</div>'});var c;
if(k=='map')return hd('지도')+'<div class="sbox" style="background:#fff"><div class="sin" style="border-color:#ccc"><span>⌕</span><input placeholder="장소, 주소, 버스 검색"></div></div><div class="map"><i>📍</i></div>';
if(k=='shop'){c='<div class="grid2">';for(i=1;i<=6;i++)c+='<div data-go="det" data-a="상품 '+i+'"><div class="th">상품</div><h3>인기 상품 '+i+'</h3><b>'+(i*8+11)+',900원</b></div>';c+='</div>'}
else if(k=='dict')c='<div class="sbox" style="background:#fff"><div class="sin" style="border-color:#1ec800"><span>⌕</span><input id="dq" placeholder="단어를 입력하세요"></div></div><div id="dr"></div>';
else c=items(t[0],8,t[2]);
return hd(t[0])+(tabs?'<div class="tabs">'+tabs+'</div>':'')+'<div class="body">'+c+'</div>'},
det:function(a){return hd(a)+'<div class="body"><div class="art"><h2>'+a+'</h2><div class="m">작성자 naver_user · 2016.08.12.</div><div class="img">이미지</div><p>2016년 여름의 이야기입니다. 이 화면은 가상의 상세 내용으로 구성되었습니다.</p><p><span class="btn">공감</span><span class="btn">댓글</span><span class="btn">공유</span></p></div></div>'}
};
function render(rep){var t=stack[stack.length-1],d=document.createElement('div');d.className='scr';d.innerHTML=SCR[t.v](t.a);app.innerHTML='';app.appendChild(d);bind(d,t)}
function go(v,a,rep){if(rep)stack.pop();stack.push({v:v,a:a});render()}
function back(){if(stack.length<2)return false;stack.pop();render();return true}
function doSearch(q){q=q.trim();if(!q)return;recent=recent.filter(function(x){return x!=q});recent.unshift(q);recent=recent.slice(0,10);save();go('result',q)}
function bind(d,t){
d.onclick=function(e){var el=e.target.closest('[data-back],[data-go],[data-q],[data-do],[data-clr],[data-del],[data-tab],[data-ac]');if(!el)return;var D=el.dataset;
if('back' in D)back();else if(D.q)doSearch(D.q);else if(D.ac)doSearch(D.ac);else if('do' in D)doSearch($('#q').value);else if('clr' in D){$('#q').value='';upd()}
else if(D.del!==undefined){recent.splice(+D.del,1);save();upd()}
else if('tab' in D){d.querySelectorAll('.tabs div').forEach(function(x){x.className=''});el.className='on'}
else if(D.go)go(D.go,D.a,'rep' in D)};
if(t.v=='search'){var q=$('#q');q.focus();q.oninput=upd;q.onkeydown=function(e){if(e.key=='Enter')doSearch(q.value)};upd()}
if(t.v=='svc'&&t.a=='dict'){$('#dq').oninput=function(){var v=this.value;$('#dr').innerHTML=v?'<div class="li"><div class="tx"><h3>'+v+'</h3><p>[명사] '+v+'에 대한 사전 뜻풀이입니다.</p></div></div>':''}}}
function upd(){var v=$('#q').value.trim(),ac=$('#ac'),rc=$('#rc'),o='';
if(v){HOT.concat(['','맛집','날씨','지도','번역']).forEach(function(k,i){var w=k?(k.indexOf(v)>-1?k:''):'';if(i>=HOT.length&&!w)w=v+' '+['','','맛집','날씨','지도','번역'][i-HOT.length+0]});
var base=[v+' 날씨',v+' 맛집',v+' 후기',v+' 뜻',v+' 가격'];base.forEach(function(k){o+='<div data-ac="'+k+'"><span>'+k+'</span><em>↖</em></div>'});ac.innerHTML=o;rc.innerHTML='';return}
ac.innerHTML='';var r='<div class="sec">최근 검색어</div>';if(!recent.length)r+='<div class="ft">최근 검색 내역이 없습니다.</div>';
recent.forEach(function(k,i){r+='<div data-q="'+k+'"><span>'+k+'</span><em data-del="'+i+'">✕</em></div>'});rc.className='rc';rc.innerHTML=r}
window.naverBack=back;
window.addEventListener('message',function(e){if(e.data&&(e.data==='back'||e.data.type==='back')){var ok=back();if(window.parent!==window)parent.postMessage({type:'backHandled',handled:ok},'*')}});
render();
})();

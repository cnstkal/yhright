'use strict';
/* 신한 슈퍼SOL 2026 연출용: 계좌 조회·카드 이용내역만 동작, 나머지는 UI 버튼 */
(function(){
var KEY='ssol26.v1',MON=['2026-08','2026-09','2026-10','2026-11'],TODAY='2026-11-03',NAME='박지우',LM=MON.length-1;
function pad(n){return n<10?'0'+n:''+n}
function num(n){return String(n).replace(/\B(?=(\d{3})+(?!\d))/g,',')}
function won(n){return num(n)+'원'}
function R(s){return function(){s|=0;s=s+1831565813|0;var t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}

function gen(){
  var rnd=R(20260801);
  function ri(a,b){return a+Math.floor(rnd()*(b-a+1))}
  function amt(a,b){return Math.round(ri(a,b)/10)*10}
  var P=[['GS25','편의점',1600,8200,8,23,.28,0],['CU','편의점',1300,7000,8,23,.2,0],
   ['스타벅스','카페',4700,10200,9,19,.2,0],['메가MGC커피','카페',1700,5200,9,18,.18,0],
   ['티머니 대중교통','대중교통',1550,2800,7,22,.55,0],['카카오택시','카카오택시',5000,15800,20,23,.07,1],
   ['맘스터치','음식점',5900,10200,11,21,.1,0],['김밥천국','음식점',5500,9500,11,20,.1,0],['이삭토스트','음식점',3800,6400,8,11,.08,0],
   ['배달의민족','배달',15000,29000,18,23,.16,1],['쿠팡','온라인쇼핑',9000,44000,9,23,.08,1],
   ['네이버페이','네이버페이',5000,36000,10,23,.09,1],['무신사','온라인쇼핑',25000,82000,12,23,.03,1]];
  var SUB={5:['넷플릭스',17000],12:['유튜브 프리미엄',14900],20:['멜론',10900]};
  var ev=[],d=new Date(Date.UTC(2026,7,1)),end=new Date(Date.UTC(2026,10,3));
  while(d<=end){
    var ds=d.toISOString().slice(0,10),dn=d.getUTCDate();
    if(dn==1)ev.push({d:ds,t:'09:12',k:'in',desc:'부모님 용돈',amt:400000});
    if(dn==10)ev.push({d:ds,t:'10:03',k:'in',desc:'급여(아르바이트)',amt:540000});
    if(dn==20)ev.push({d:ds,t:'13:00',k:'out',desc:'SKT 통신요금',amt:49000});
    if(dn==14)ev.push({d:ds,t:'06:00',k:'bill'});
    if(dn==26)ev.push({d:ds,t:'18:30',k:'save',desc:'비상금 통장 이체',amt:300000});
    if(SUB[dn])ev.push({d:ds,t:'02:14',k:'c',m:SUB[dn][0],cat:'구독',amt:SUB[dn][1],card:1,st:'승인'});
    P.forEach(function(p){
      if(rnd()<p[6]){
        var a=p[0]=='티머니 대중교통'?(rnd()<.5?1550:3100):amt(p[2],p[3]);
        ev.push({d:ds,t:pad(ri(p[4],p[5]))+':'+pad(ri(0,59)),k:'c',m:p[0],cat:p[1],amt:a,card:p[7],st:rnd()<.04?'승인취소':'승인'});
      }
    });
    d=new Date(d.getTime()+864e5);
  }
  ev=ev.filter(function(e){return e.d<TODAY||e.t<='15:00'});
  ev.sort(function(a,b){return (a.d+a.t)<(b.d+b.t)?-1:1});
  var a1={id:0,name:'쏠편한 입출금통장(저축예금)',no:'110-482-731904',bal:600000,tx:[]},
      a2={id:1,name:'신한 쏠 비상금 통장',no:'110-502-318276',bal:800000,tx:[]},
      cards=[{id:0,name:'신한 SOL트래블 체크카드',no:'9410-****-****-2217',kind:'체크',tx:[]},
             {id:1,name:'신한카드 Deep Dream',no:'5365-****-****-1204',kind:'신용',tx:[]}],n=0;
  function at(a,e,type,desc,sub,v){a.bal+=type=='in'?v:-v;a.tx.push({d:e.d,t:e.t,type:type,desc:desc,sub:sub,amt:v,after:a.bal})}
  ev.forEach(function(e){
    if(e.k=='in')at(a1,e,'in',e.desc,'입금',e.amt);
    else if(e.k=='out')at(a1,e,'out',e.desc,'자동이체',e.amt);
    else if(e.k=='save'){at(a1,e,'out',e.desc,'이체',e.amt);at(a2,e,'in','입출금통장에서 이체','입금',e.amt)}
    else if(e.k=='bill'){
      var mi=MON.indexOf(e.d.slice(0,7)),v=187300;
      if(mi>0){v=0;cards[1].tx.forEach(function(x){if(x.st=='승인'&&x.d.slice(0,7)==MON[mi-1])v+=x.amt})}
      if(v)at(a1,e,'out','신한카드 카드대금','카드결제',v);
    }else{
      if(e.card==0&&e.st=='승인'&&e.amt>a1.bal-1000)return;
      cards[e.card].tx.push({n:++n,d:e.d,t:e.t,m:e.m,cat:e.cat,amt:e.amt,st:e.st,ap:String(10000000+Math.floor(rnd()*89999999))});
      if(e.card==0&&e.st=='승인')at(a1,e,'out',e.m,'체크카드',e.amt);
    }
  });
  return{v:1,accounts:[a1,a2],cards:cards};
}

var D;
try{D=JSON.parse(localStorage.getItem(KEY)||'null')}catch(e){D=null}
if(!D||D.v!==1){D=gen();try{localStorage.setItem(KEY,JSON.stringify(D))}catch(e){}}

var S={v:'home',acc:0,card:0,mon:LM,f:'all',hide:false,sel:null,st:[]},root=document.getElementById('root');
var DW=['일','월','화','수','목','금','토'];
function dl(ds){var x=new Date(ds+'T00:00:00');return (x.getMonth()+1)+'월 '+x.getDate()+'일 ('+DW[x.getDay()]+')'}
function dd(ds){return Math.round((new Date(ds+'T00:00:00')-new Date(TODAY+'T00:00:00'))/864e5)}
function dmb(label,ic,cl){return '<button class="dm" type="button">'+(ic?'<span class="ci '+(cl||'')+'">'+ic+'</span>':'')+label+'</button>'}
function usage(c,mon){var s=0;c.tx.forEach(function(x){if(x.st=='승인'&&x.d.slice(0,7)==mon)s+=x.amt});return s}
function mlabel(m){return m.slice(0,4)+'년 '+parseInt(m.slice(5),10)+'월'}
function hdr(t){return '<div class="hd"><button data-a="back">‹</button>'+t+'</div>'}
function monNav(){return '<div class="mn"><button data-a="mon" data-i="-1"'+(S.mon<1?' disabled':'')+'>‹</button>'+mlabel(MON[S.mon])+'<button data-a="mon" data-i="1"'+(S.mon>=LM?' disabled':'')+'>›</button></div>'}
function nextDay(day){var t=new Date(TODAY+'T00:00:00'),y=t.getFullYear(),m=t.getMonth();if(t.getDate()>day)m++;return y+'-'+pad(m+1)+'-'+pad(day)}

function home(){
  var a=D.accounts[S.acc],cm=MON[LM],pm=MON[LM-1],u0=usage(D.cards[0],cm),u1=usage(D.cards[1],cm),bill=usage(D.cards[1],cm);
  var pay=nextDay(10),bd=nextDay(14),last=D.accounts[0].tx[D.accounts[0].tx.length-1],cats={},tot=0;
  D.cards.forEach(function(c){c.tx.forEach(function(x){if(x.st=='승인'&&x.d.slice(0,7)==cm){cats[x.cat]=(cats[x.cat]||0)+x.amt;tot+=x.amt}})});
  var top=Object.keys(cats).sort(function(x,y){return cats[y]-cats[x]}).slice(0,5);
  var h='<header class="top"><div class="logo"><i class="mk">S</i>신한 슈퍼SOL</div><div class="ti"><span>🔍</span><span>🔔</span><span data-a="go" data-i="menu">≡</span></div></header>';
  h+='<p class="hi">'+NAME+'님,<br>오늘도 한 앱에서 모두 확인하세요<small>은행 · 카드 · 증권 · 라이프</small></p>';
  h+='<button class="ai dm" type="button"><span>무엇을 도와드릴까요? 대화로 물어보세요</span><b>AI</b></button>';
  h+='<section class="sec"><h3>오늘<em>급여일 · 결제일 · 알림</em></h3><div class="today">'+
   '<div class="tc">급여일<b>'+parseInt(pay.slice(5,7),10)+'월 '+parseInt(pay.slice(8),10)+'일</b><span class="d">D-'+dd(pay)+'</span></div>'+
   '<div class="tc">카드 결제일<b>'+parseInt(bd.slice(5,7),10)+'월 '+parseInt(bd.slice(8),10)+'일</b><span class="d">D-'+dd(bd)+'</span> · '+won(usage(D.cards[1],pm))+'</div>'+
   '<div class="tc">최근 '+(last.type=='in'?'입금':'출금')+' 알림<b>'+last.desc+'</b>'+(last.type=='in'?'+':'-')+won(last.amt)+'</div></div></section>';
  h+='<section class="sec"><div class="acc"><div class="a-n"><span>신한은행 · '+a.name+'</span><span>'+(S.acc+1)+'/'+D.accounts.length+'</span></div><div class="a-no">'+a.no+'</div>';
  h+='<div class="a-amt"><span>'+(S.hide?'●●●●●':num(a.bal))+'<small>원</small></span><button class="eye" data-a="hide">'+(S.hide?'잔액 보기':'잔액 숨김')+'</button></div>';
  h+='<div class="btns"><button class="dm" type="button">이체</button><button data-a="go" data-i="acc">조회</button><button data-a="go" data-i="cards">카드내역</button></div>';
  h+='<div class="dots">'+D.accounts.map(function(x,i){return '<i data-a="acc" data-i="'+i+'" class="'+(i==S.acc?'on':'')+'"></i>'}).join('')+'</div></div></section>';
  h+='<section class="sec"><h3>자주 쓰는 메뉴<em class="dm">편집</em></h3><div class="fav"><div class="grid">'+
   '<button class="dm" type="button"><span class="ci">↗</span>이체</button>'+
   '<button data-a="go" data-i="acc"><span class="ci">▤</span>계좌조회</button>'+
   '<button data-a="go" data-i="cards"><span class="ci c">▭</span>카드내역</button>'+
   dmb('주식','📈','s')+'</div></div></section>';
  h+='<section class="sec"><h3>신한금융그룹 한눈에<em>하나의 앱</em></h3><div class="gp">'+
   '<button class="gc" style="--c:#0046ff" data-a="go" data-i="acc"><span>신한은행</span><b>'+num(D.accounts[0].bal+D.accounts[1].bal)+'원</b>계좌 '+D.accounts.length+'개 잔액</button>'+
   '<button class="gc" style="--c:#0a9bb0" data-a="go" data-i="cards"><span>신한카드</span><b>'+num(u0+u1)+'원</b>이번 달 이용</button>'+
   '<button class="gc dm" style="--c:#6a4cff" type="button"><span>신한투자증권</span><b>1,284,300원</b>평가금액(예시)</button>'+
   '<button class="gc dm" style="--c:#ff7a1a" type="button"><span>신한라이프</span><b>38,000원</b>납입 예정(예시)</button></div></section>';
  var G=[['은행','#0046ff','',[['예금·적금','💰'],['대출','📋'],['외환','💱'],['쏠 패밀리','👪']]],['카드','#0a9bb0','c',[['결제 관리','🧾'],['한도 조회','📊'],['카드 신청','💳'],['혜택','🎁']]],['증권','#6a4cff','s',[['주식','📈'],['해외주식','🌐'],['펀드','🧩'],['연금','🏦']]],['라이프','#ff7a1a','l',[['보험 조회','🛡'],['보험 가입','📝'],['보험금 청구','💬'],['건강관리','❤']]],['생활·금융상품','#5a6373','g',[['금융상품','🛍'],['공과금','💡'],['생활 서비스','🏠'],['이벤트','🎉']]]];
  G.forEach(function(g){h+='<section class="sec"><h3>'+g[0]+'</h3><div class="fav"><div class="grid">'+g[3].map(function(x){return dmb(x[0],x[1],g[2])}).join('')+'</div></div></section>'});
  h+='<section class="sec"><h3>이번 달 소비<em>카드 합계 '+won(tot)+'</em></h3><div class="bx">'+top.map(function(c){return '<div class="bar"><span>'+c+'</span><u><i style="width:'+Math.max(6,Math.round(cats[c]/cats[top[0]]*100))+'%"></i></u><b>'+won(cats[c])+'</b></div>'}).join('')+'</div></section>';
  h+='<section class="sec"><button class="bn dm" type="button"><span>그룹 통합 혜택 확인하기</span><span>›</span></button></section>';
  return h+'<p class="note">연출용 가상 데이터 · 실제 금융 정보 아님</p>';
}
function accView(){
  var a=D.accounts[S.acc],m=MON[S.mon],l=a.tx.filter(function(x){return x.d.slice(0,7)==m&&(S.f=='all'||x.type==S.f)}).reverse();
  var h=hdr('계좌 조회')+'<div class="cdt">'+D.accounts.map(function(x,i){return '<button data-a="acc" data-i="'+i+'" class="'+(i==S.acc?'on':'')+'">'+x.name.split('(')[0]+'</button>'}).join('')+'</div>';
  h+='<div class="sum"><p>신한은행 '+a.no+'</p><p class="big">'+won(a.bal)+'</p></div>'+monNav();
  h+='<div class="chips">'+[['all','전체'],['in','입금'],['out','출금']].map(function(x){return '<button data-a="flt" data-i="'+x[0]+'" class="'+(S.f==x[0]?'on':'')+'">'+x[1]+'</button>'}).join('')+'</div>';
  var last='';
  if(!l.length)h+='<p class="note">거래내역이 없습니다</p>';
  l.forEach(function(x){
    if(x.d!=last){h+='<div class="dh">'+dl(x.d)+'</div>';last=x.d}
    h+='<div class="tx"><div class="l">'+x.desc+'<small>'+x.t+' · '+x.sub+'</small></div><div class="r '+(x.type=='in'?'in':'')+'">'+(x.type=='in'?'입금 +':'출금 -')+won(x.amt)+'<small>잔액 '+won(x.after)+'</small></div></div>';
  });
  return h;
}
function cardsView(){
  var c=D.cards[S.card],m=MON[S.mon],l=c.tx.filter(function(x){return x.d.slice(0,7)==m}).reverse(),u=usage(c,m);
  var h=hdr('카드 이용내역')+'<div class="cdt">'+D.cards.map(function(x,i){return '<button data-a="card" data-i="'+i+'" class="'+(i==S.card?'on':'')+'">'+x.name+'</button>'}).join('')+'</div>';
  h+='<div style="background:#fff;padding:4px 0 14px"><div class="cv k'+S.card+'"><span>'+c.name+'</span><b>'+c.no+'</b><span>'+c.kind+'카드</span></div></div>';
  h+='<div class="info"><div>'+(c.kind=='신용'?'결제일<b>매월 14일</b>':'결제방식<b>즉시 출금</b>')+'</div><div>'+(c.kind=='신용'?'결제 예정금액':'월 이용금액')+'<b>'+won(u)+'</b></div></div>'+monNav();
  var last='';
  if(!l.length)h+='<p class="note">이용내역이 없습니다</p>';
  l.forEach(function(x){
    if(x.d!=last){h+='<div class="dh">'+dl(x.d)+'</div>';last=x.d}
    h+='<div class="tx" data-a="tx" data-i="'+x.n+'"><div class="l">'+x.m+'<small>'+x.t+' · '+x.cat+'</small></div><div class="r '+(x.st=='승인'?'':'cx')+'">'+won(x.amt)+'<small>'+x.st+'</small></div></div>';
  });
  return h;
}
function txView(){
  var x=null;D.cards.forEach(function(c){c.tx.forEach(function(t){if(t.n==S.sel)x=t;})});
  var c=D.cards[S.card];
  return hdr('이용내역 상세')+'<div class="dt"><h2>'+x.m+'</h2><div class="am '+(x.st=='승인'?'':'cx')+'">'+won(x.amt)+'</div>'+
   [['승인상태',x.st],['결제일시',x.d.replace(/-/g,'.')+' '+x.t],['카드',c.name],['업종',x.cat],['할부','일시불'],['승인번호',x.ap]].map(function(k){return '<div class="kv"><span>'+k[0]+'</span><span>'+k[1]+'</span></div>'}).join('')+'</div>';
}
function menuView(){
  var C=[['신한은행','#0046ff','#eaf0ff',[['전체계좌조회','acc'],['거래내역조회','acc'],'이체','예금·적금','대출','외환','쏠 패밀리','오픈뱅킹']],
   ['신한카드','#0a9bb0','#e3f5f7',[['카드 이용내역','cards'],'결제 관리','한도 조회','카드 신청']],
   ['신한투자증권','#6a4cff','#eeeaff',['주식','해외주식','펀드','연금']],
   ['신한라이프','#ff7a1a','#fff0e3',['보험 조회','보험 가입','보험금 청구','건강관리']],
   ['생활·기타','#5a6373','#eef0f4',['금융상품','상품몰','공과금','생활 서비스','자산관리','AI 금융','이벤트','인증센터','보안센터','고객센터']]];
  var h='<div class="hd"><button data-a="back">‹</button>전체 메뉴</div>';
  C.forEach(function(g){h+='<div class="mc" style="--c:'+g[1]+';--b:'+g[2]+'"><h3><span class="tg">'+g[0]+'</span></h3><div class="ml">'+g[3].map(function(i){return typeof i=='string'?'<button class="dm" type="button">'+i+'</button>':'<button class="ok" data-a="go" data-i="'+i[1]+'">'+i[0]+'</button>'}).join('')+'</div></div>'});
  return h+'<p class="note">조회 메뉴 외 항목은 연출용입니다</p>';
}
function render(){
  var m={home:home,acc:accView,cards:cardsView,tx:txView,menu:menuView};
  root.innerHTML=m[S.v]();
  var t=S.v=='tx'?'cards':S.v=='acc'?'home':S.v;
  [].forEach.call(document.querySelectorAll('#tabbar [data-t]'),function(e){e.classList.toggle('on',e.dataset.t==t)});
}
function go(v){if(v!=S.v){S.st.push(S.v)}S.v=v;if(v!='tx')S.f='all';window.scrollTo(0,0);render()}
document.addEventListener('click',function(e){
  var t=e.target.closest('[data-a]');if(!t)return;
  var a=t.dataset.a,i=t.dataset.i;
  if(a=='go'){if(i=='home')S.st=[];go(i)}
  else if(a=='back'){S.v=S.st.pop()||'home';window.scrollTo(0,0);render()}
  else if(a=='hide'){S.hide=!S.hide;render()}
  else if(a=='acc'){S.acc=+i;S.f='all';render()}
  else if(a=='card'){S.card=+i;render()}
  else if(a=='mon'){S.mon=Math.max(0,Math.min(LM,S.mon+ +i));render()}
  else if(a=='flt'){S.f=i;render()}
  else if(a=='tx'){S.sel=+i;go('tx')}
});
render();
})();

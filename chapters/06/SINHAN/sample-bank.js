'use strict';
/* 신한 SOL뱅크 2025 연출용: 계좌 조회·카드 이용내역만 동작, 나머지는 UI 버튼 */
(function(){
var KEY='sol25.v1',MON=['2025-09','2025-10','2025-11'],TODAY='2025-11-20',NAME='김하늘';
function pad(n){return n<10?'0'+n:''+n}
function won(n){return String(n).replace(/\B(?=(\d{3})+(?!\d))/g,',')+'원'}
function R(s){return function(){s|=0;s=s+1831565813|0;var t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}

function gen(){
  var rnd=R(20250901);
  function ri(a,b){return a+Math.floor(rnd()*(b-a+1))}
  function amt(a,b){return Math.round(ri(a,b)/10)*10}
  var P=[ /* 가맹점,분류,최소,최대,시작시,끝시,일 확률,카드(0체크/1신용) */
   ['GS25','편의점',1500,7800,8,23,.28,0],['CU','편의점',1200,6500,8,23,.2,0],
   ['스타벅스','카페',4500,9800,9,19,.2,0],['메가MGC커피','카페',1500,4900,9,18,.18,0],
   ['티머니 대중교통','대중교통',1550,2800,7,22,.55,0],['카카오택시','카카오택시',4800,14800,20,23,.07,1],
   ['맘스터치','음식점',5500,9800,11,21,.1,0],['김밥천국','음식점',5000,9000,11,20,.1,0],['이삭토스트','음식점',3500,6000,8,11,.08,0],
   ['배달의민족','배달',14000,27000,18,23,.16,1],['쿠팡','온라인쇼핑',9000,42000,9,23,.08,1],
   ['네이버페이','네이버페이',5000,35000,10,23,.09,1],['무신사','온라인쇼핑',25000,79000,12,23,.03,1]];
  var SUB={5:['넷플릭스',17000],12:['유튜브 프리미엄',14900],20:['멜론',10900]};
  var ev=[],d=new Date(Date.UTC(2025,8,1)),end=new Date(Date.UTC(2025,10,20));
  while(d<=end){
    var ds=d.toISOString().slice(0,10),dn=d.getUTCDate();
    if(dn==1)ev.push({d:ds,t:'09:12',k:'in',desc:'부모님 용돈',amt:400000});
    if(dn==10)ev.push({d:ds,t:'10:03',k:'in',desc:'급여(아르바이트)',amt:520000});
    if(dn==20)ev.push({d:ds,t:'13:00',k:'out',desc:'SKT 통신요금',amt:48000});
    if(dn==14)ev.push({d:ds,t:'06:00',k:'bill'});
    if(dn==26&&ds<'2025-11')ev.push({d:ds,t:'18:30',k:'save',desc:'비상금 통장 이체',amt:300000});
    if(SUB[dn])ev.push({d:ds,t:'02:14',k:'c',m:SUB[dn][0],cat:'구독',amt:SUB[dn][1],card:1,st:'승인'});
    P.forEach(function(p){
      if(rnd()<p[6]){
        var a=p[0]=='티머니 대중교통'?(rnd()<.5?1550:3100):amt(p[2],p[3]);
        ev.push({d:ds,t:pad(ri(p[4],p[5]))+':'+pad(ri(0,59)),k:'c',m:p[0],cat:p[1],amt:a,card:p[7],st:rnd()<.04?'승인취소':'승인'});
      }
    });
    d=new Date(d.getTime()+864e5);
  }
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
      var pm=e.d.slice(0,7)=='2025-09'?null:MON[MON.indexOf(e.d.slice(0,7))-1],v=187300;
      if(pm){v=0;cards[1].tx.forEach(function(x){if(x.st=='승인'&&x.d.slice(0,7)==pm)v+=x.amt})}
      if(v)at(a1,e,'out','신한카드 카드대금','카드결제',v);
    }else{
      if(e.card==0&&e.st=='승인'&&e.amt>a1.bal-1000)return;
      var c=cards[e.card];
      c.tx.push({n:++n,d:e.d,t:e.t,m:e.m,cat:e.cat,amt:e.amt,st:e.st,ap:String(10000000+Math.floor(rnd()*89999999))});
      if(e.card==0&&e.st=='승인')at(a1,e,'out',e.m,'체크카드',e.amt);
    }
  });
  return{v:1,accounts:[a1,a2],cards:cards};
}

var D;
try{D=JSON.parse(localStorage.getItem(KEY)||'null')}catch(e){D=null}
if(!D||D.v!==1){D=gen();try{localStorage.setItem(KEY,JSON.stringify(D))}catch(e){}}

var S={v:'home',acc:0,card:0,mon:2,f:'all',hide:false,sel:null,st:[]},root=document.getElementById('root');
var DW=['일','월','화','수','목','금','토'];
function dl(ds){var x=new Date(ds+'T00:00:00');return (x.getMonth()+1)+'월 '+x.getDate()+'일 ('+DW[x.getDay()]+')'}
function dm(label,ic){return '<button class="dm" type="button">'+(ic?'<span class="ci">'+ic+'</span>':'')+label+'</button>'}
function usage(c,mon){var s=0;c.tx.forEach(function(x){if(x.st=='승인'&&x.d.slice(0,7)==mon)s+=x.amt});return s}
function mlabel(m){return m.slice(0,4)+'년 '+parseInt(m.slice(5),10)+'월'}
function hdr(t){return '<div class="hd"><button data-a="back">‹</button>'+t+'</div>'}
function monNav(){return '<div class="mn"><button data-a="mon" data-i="-1"'+(S.mon<1?' disabled':'')+'>‹</button>'+mlabel(MON[S.mon])+'<button data-a="mon" data-i="1"'+(S.mon>1?' disabled':'')+'>›</button></div>'}

function home(){
  var a=D.accounts[S.acc],cm=MON[2],tot=usage(D.cards[0],cm)+usage(D.cards[1],cm);
  var h='<header class="top"><div class="logo"><i class="mk">S</i>신한 SOL뱅크</div><div class="ti"><span>🔔</span><span data-a="go" data-i="menu">≡</span></div></header>';
  h+='<p class="hi"><b>'+NAME+'</b>님, 안녕하세요</p>';
  h+='<section class="acc"><div class="a-n"><span>'+a.name+'</span><span>'+(S.acc+1)+'/'+D.accounts.length+'</span></div><div class="a-no">신한 '+a.no+'</div>';
  h+='<div class="a-amt"><span>'+(S.hide?'●●●●●':String(a.bal).replace(/\B(?=(\d{3})+(?!\d))/g,','))+'<small>원</small></span><button class="eye" data-a="hide">'+(S.hide?'잔액 보기':'잔액 숨김')+'</button></div>';
  h+='<div class="btns"><button class="dm" type="button">이체</button><button data-a="go" data-i="acc">조회</button><button data-a="go" data-i="cards">카드내역</button></div>';
  h+='<div class="dots">'+D.accounts.map(function(x,i){return '<i data-a="acc" data-i="'+i+'" class="'+(i==S.acc?'on':'')+'"></i>'}).join('')+'</div></section>';
  h+='<section class="sec"><h3>이번 달 카드 이용<em data-a="go" data-i="cards">내역 보기 ›</em></h3><div class="row" data-a="go" data-i="cards"><span>'+mlabel(cm)+' 이용금액<small>체크·신용 합계</small></span><b>'+won(tot)+'</b></div></section>';
  h+='<section class="sec"><h3>금융 서비스</h3><div class="grid">'+[['오픈뱅킹','🏦'],['예금·적금','💰'],['대출','📋'],['외환','💱'],['자산관리','📊'],['증권','📈'],['보험','🛡'],['상품몰','🛍'],['공과금','🧾'],['인증센터','🔐'],['이벤트','🎁'],['생활 서비스','🏠']].map(function(x){return dm(x[0],x[1])}).join('')+'</div></section>';
  h+='<section class="sec"><div class="bn"><span>쏠 혜택·이벤트 확인하기</span><span>›</span></div></section>';
  h+='<section class="sec"><h3>환율<em>예시 데이터</em></h3><div class="fx"><span>USD 미국</span><b>1,432.50</b></div><div class="fx"><span>EUR 유럽</span><b>1,665.20</b></div><div class="fx"><span>JPY(100) 일본</span><b>937.80</b></div></section>';
  return h+'<p class="note">연출용 가상 데이터 · 실제 금융 정보 아님</p>';
}
function accView(){
  var a=D.accounts[S.acc],m=MON[S.mon],l=a.tx.filter(function(x){return x.d.slice(0,7)==m&&(S.f=='all'||x.type==S.f)}).reverse();
  var h=hdr('계좌 조회')+'<div class="cdt">'+D.accounts.map(function(x,i){return '<button data-a="acc" data-i="'+i+'" data-r="1" class="'+(i==S.acc?'on':'')+'">'+x.name.split('(')[0]+'</button>'}).join('')+'</div>';
  h+='<div class="sum"><p>신한 '+a.no+'</p><p class="big">'+won(a.bal)+'</p></div>'+monNav();
  h+='<div class="chips">'+[['all','전체'],['in','입금'],['out','출금']].map(function(x){return '<button data-a="flt" data-i="'+x[0]+'" class="'+(S.f==x[0]?'on':'')+'">'+x[1]+'</button>'}).join('')+'</div>';
  var last='';
  if(!l.length)h+='<p class="note">거래내역이 없습니다</p>';
  l.forEach(function(x){
    if(x.d!=last){h+='<div class="dh">'+dl(x.d)+'</div>';last=x.d}
    h+='<div class="tx"><div class="l">'+x.desc+'<small>'+x.t+' · '+x.sub+'</small></div><div class="r '+(x.type=='in'?'in':'')+'">'+(x.type=='in'?'입금 ':'출금 ')+(x.type=='in'?'+':'-')+won(x.amt).replace('원','')+'원<small>잔액 '+won(x.after)+'</small></div></div>';
  });
  return h;
}
function cardsView(){
  var c=D.cards[S.card],m=MON[S.mon],l=c.tx.filter(function(x){return x.d.slice(0,7)==m}).reverse(),u=usage(c,m);
  var h=hdr('카드 이용내역')+'<div class="cdt">'+D.cards.map(function(x,i){return '<button data-a="card" data-i="'+i+'" class="'+(i==S.card?'on':'')+'">'+x.name+'</button>'}).join('')+'</div>';
  h+='<div style="background:#fff;padding:4px 0 14px"><div class="cv k'+S.card+'"><span>'+c.name+'</span><b>'+c.no+'</b><span>'+c.kind+'카드</span></div></div>';
  h+='<div class="info"><div>'+(c.kind=='신용'?'결제일<b>매월 14일</b>':'결제방식<b>즉시 출금</b>')+'</div><div>'+(c.kind=='신용'?'결제 예정금액':'이용금액')+'<b>'+won(u)+'</b></div></div>'+monNav();
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
  var C=[['조회',[['전체계좌조회','acc'],['카드 이용내역','cards'],['거래내역조회','acc'],['증명서']]],['이체',['이체','예약이체','자동이체','오픈뱅킹']],['상품',['예금','적금','대출','상품몰']],['카드',['카드 신청','한도 조회','결제 관리','혜택 조회']],['자산관리',['내 자산','증권','보험','연금']],['외환',['환전','해외송금','환율 조회','외화통장']],['인증·보안',['인증센터','보안센터','OTP','인증서 관리']],['고객지원',['고객센터','이벤트','공지사항','설정']]];
  var h='<div class="hd"><button data-a="back">‹</button>전체 메뉴</div>';
  C.forEach(function(g){h+='<div class="mc"><h3>'+g[0]+'</h3><div class="ml">'+g[1].map(function(i){return typeof i=='string'||!i[1]?'<button class="dm" type="button">'+(i[0]||i)+'</button>':'<button class="ok" data-a="go" data-i="'+i[1]+'">'+i[0]+'</button>'}).join('')+'</div></div>'});
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
  if(a=='go'){S.st=(i=='home')?[]:S.st;go(i)}
  else if(a=='back'){S.v=S.st.pop()||'home';window.scrollTo(0,0);render()}
  else if(a=='hide'){S.hide=!S.hide;render()}
  else if(a=='acc'){S.acc=+i;S.f='all';render()}
  else if(a=='card'){S.card=+i;render()}
  else if(a=='mon'){S.mon=Math.max(0,Math.min(2,S.mon+ +i));render()}
  else if(a=='flt'){S.f=i;render()}
  else if(a=='tx'){S.sel=+i;go('tx')}
});
render();
})();

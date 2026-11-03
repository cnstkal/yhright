'use strict';
/* 신한은행 (2018-2019) 연출용 - 계좌조회/카드이용내역만 동작, 모든 데이터는 가상 */
(function () {
  var KEY = 'yhright.shinhan.2019.v2', NOW = '2019-01-05', MONTHS = ['2018-12', '2019-01'];
  var $ = function (id) { return document.getElementById(id); };
  var V = $('view'), TOP = $('top'), DR = $('drawer');
  var pad = function (n) { return n < 10 ? '0' + n : '' + n; };
  var won = function (n) { return String(Math.abs(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ','); };
  var iso = function (d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); };
  var dot = function (s) { return s.replace(/-/g, '.'); };
  function rng(s) { s = s >>> 0; return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }

  var CAT = {
    cv: { n: '편의점', m: ['GS25 역삼점', 'CU 강남역점', '세븐일레븐 서초점', '미니스톱 신논현점'], lo: 1200, hi: 9800, rd: 10, h: [7, 23] },
    cafe: { n: '카페', m: ['스타벅스 강남R점', '이디야커피 역삼점', '카페베네 선릉점', '투썸플레이스 서초점', '할리스커피 강남점'], lo: 2500, hi: 9800, rd: 100, h: [8, 17] },
    food: { n: '음식점', m: ['김밥천국 역삼점', '맘스터치 강남점', '본죽 선릉점', '홍콩반점0410', '한솥도시락 서초점', '명동칼국수', '서가앤쿡 강남점'], lo: 5500, hi: 32000, rd: 100, h: [11, 21] },
    trans: { n: '교통', m: ['서울교통공사', '티머니 충전', '카카오택시', 'KORAIL 승차권'], fix: [1250, 1250, 1350, 2500, 3800, 4800, 9300, 14500], h: [7, 20] },
    shop: { n: '온라인쇼핑', m: ['쿠팡', '11번가', 'G마켓', '옥션', '인터파크'], lo: 9800, hi: 89000, rd: 100, h: [19, 23] },
    mart: { n: '마트/생활', m: ['이마트 역삼점', '올리브영 강남점', '다이소 역삼점', '홈플러스 영등포점'], lo: 4000, hi: 62000, rd: 10, h: [12, 21] },
    del: { n: '배달', m: ['배달의민족', '요기요'], lo: 12000, hi: 24000, rd: 100, h: [18, 22] },
    fun: { n: '문화/여가', m: ['CGV 강남', '메가박스 코엑스', 'YES24', '교보문고 광화문점'], lo: 9000, hi: 28000, rd: 100, h: [14, 22] }
  };
  var CARDS = [
    { id: 0, name: '신한 Deep Dream 신용카드', short: 'Deep Dream 신용', no: '9410-12**-****-1274', type: 'credit' },
    { id: 1, name: '신한 S20 체크카드', short: 'S20 체크', no: '9409-35**-****-5086', type: 'debit' }
  ];
  var ACCTS = [
    { id: 0, name: '신한 주거래 입출금통장', no: '110-498-201901', kind: '입출금', base: 490000 }
  ];

  function genCard(card) {
    return [];
  }
  function monthSum(txs, mo) {
    var s = 0; txs.forEach(function (t) { if (t.d.indexOf(mo) === 0) s += t.st === 'A' ? t.a : -t.a; }); return s;
  }
  function genAccts() {
    var tx = [
      { d:'2018-12-01', t:'10:10:00', memo:'모텔 장기투숙비', out:280000, in:0 },
      { d:'2018-12-28', t:'09:00:12', memo:'아르바이트 급여', out:0, in:320000 },
      { d:'2018-12-29', t:'10:15:08', memo:'모텔 장기투숙비', out:280000, in:0 },
      { d:'2018-12-30', t:'16:42:31', memo:'편의점 (삼각김밥)', out:1800, in:0 },
      { d:'2019-01-02', t:'22:18:44', memo:'입금 술집 사장', out:0, in:600000 },
      { d:'2019-01-03', t:'14:06:19', memo:'온라인 결제 (운동화)', out:410000, in:0 },
      { d:'2019-01-04', t:'11:32:05', memo:'편의점 (과자)', out:2300, in:0 }
    ];
    var bal = 490000;
    tx.forEach(function (x) { bal += x.in - x.out; x.bal = bal; });
    return [{ id:0, name:ACCTS[0].name, no:ACCTS[0].no, kind:ACCTS[0].kind, bal:bal, tx:tx }];
  }
  function load() {
    var cards = CARDS.map(function (c) { var o = Object.assign({}, c); o.tx = []; return o; });
    var S = { accts: genAccts(), cards: cards };
    try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {}
    return S;
  }
  var S = load();

  var ICONS = '<button type="button" class="ic dummy" aria-label="알림"><svg viewBox="0 0 24 24"><path d="M12 3a5 5 0 0 0-5 5v4l-2 3h14l-2-3V8a5 5 0 0 0-5-5zM10 18a2 2 0 0 0 4 0"/></svg></button>' +
    '<button type="button" class="ic" data-menu="1" aria-label="전체메뉴"><svg viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg></button>';
  function setTop(t) {
    TOP.innerHTML = (t ? '<button type="button" class="bk" data-back="1" aria-label="뒤로">‹</button><span class="ttl">' + t + '</span>' : '<span class="logo"><i class="mark"></i>신한은행</span>') + '<span class="sp"></span>' + ICONS;
  }
  function setTab(k) { document.querySelectorAll('[data-tab]').forEach(function (b) { b.classList.toggle('on', b.dataset.tab === k); }); }

  function vHome() {
    setTop(''); setTab('home');
    var a = S.accts[0], g = [['예', '예금/적금'], ['대', '대출'], ['외', '외환'], ['납', '공과금'], ['자', '자동이체'], ['산', '자산관리'], ['인', '인증센터'], ['보', '보안센터']];
    V.innerHTML = '<div class="loginbar"><span><b>정윤호</b>님 로그인</span><span class="tm" id="tm"></span><button type="button" class="mini dummy">시간연장</button><button type="button" class="mini dummy">로그아웃</button></div>' +
      '<section class="hero"><div class="nm">' + a.name + '</div><div class="no">' + a.no + '</div><div class="bal">' + won(a.bal) + '<em>원</em></div>' +
      '<div class="btns"><button type="button" data-go="#/acct">계좌조회</button><button type="button" class="dummy">이체</button></div></section>' +
      '<button type="button" class="hero2" data-go="#/acct"><span>내 계좌 ' + S.accts.length + '개</span><span>전체계좌 보기 ›</span></button>' +
      '<div class="grid">' + g.map(function (x) { return '<button type="button" class="dummy"><i class="gi">' + x[0] + '</i>' + x[1] + '</button>'; }).join('') + '</div>' +
      '<button type="button" class="banner dummy"><b>신한은행 모바일뱅킹 안내</b><span>스마트폰 뱅킹 이용 고객 대상 (예시)</span></button>' +
      '<div class="lst"><button type="button" data-go="#/card">카드 이용내역</button><button type="button" class="dummy">이벤트</button><button type="button" class="dummy">고객센터</button></div>' +
      '<p class="foot">※ 본 화면의 모든 정보는 가상의 데이터이며 실제 금융 정보가 아닙니다.</p>';
    tick();
  }
  function vInq() {
    setTop('조회'); setTab('inq');
    V.innerHTML = '<div class="lst" style="margin-top:12px"><button type="button" data-go="#/acct">계좌조회</button><button type="button" data-go="#/card">카드 이용내역</button><button type="button" class="dummy">거래내역 증명서</button><button type="button" class="dummy">대출 조회</button><button type="button" class="dummy">외환 조회</button></div>';
  }
  function vAcctList() {
    setTop('계좌조회'); setTab('inq');
    var tot = 0; S.accts.forEach(function (a) { tot += a.bal; });
    V.innerHTML = '<div class="sum"><span>총 잔액</span><b>' + won(tot) + '원</b></div><ul>' + S.accts.map(function (a) {
      return '<li><button type="button" class="arow" data-go="#/acct/' + a.id + '"><span class="an">' + a.name + '<small>' + a.no + ' · ' + a.kind + '</small></span><span class="ab">' + won(a.bal) + '<em>원</em></span></button></li>';
    }).join('') + '</ul>';
  }
  function vAcct(id, mo) {
    var a = S.accts[id]; if (!a) return vAcctList();
    mo = mo || '2019-01'; setTop('거래내역조회'); setTab('inq');
    var rows = a.tx.filter(function (t) { return mo === 'all' || t.d.indexOf(mo) === 0; }).reverse(), ti = 0, to = 0;
    rows.forEach(function (t) { ti += t.in; to += t.out; });
    var chips = [['all', '전체']].concat(MONTHS.slice().reverse().map(function (m) { return [m, +m.slice(5) + '월']; }));
    V.innerHTML = '<div class="info"><div class="n">' + a.name + ' ' + a.no + '</div><div class="big">' + won(a.bal) + '<em>원</em></div></div>' +
      '<div class="chips">' + chips.map(function (c) { return '<button type="button" class="' + (c[0] === mo ? 'on' : '') + '" data-replace="1" data-go="#/acct/' + id + '/' + c[0] + '">' + c[1] + '</button>'; }).join('') + '</div>' +
      '<div class="stat"><div>입금<b class="in">' + won(ti) + '</b></div><div>출금<b class="out">' + won(to) + '</b></div><div>건수<b>' + rows.length + '</b></div></div>' +
      (rows.length ? '<ul>' + rows.map(function (t) {
        return '<li class="tr"><div class="l1"><span class="dt">' + dot(t.d) + ' ' + t.t.slice(0, 5) + '</span><span class="bl">잔액 <b>' + won(t.bal) + '</b></span></div><div class="l2"><span class="memo">' + t.memo + '</span>' +
          (t.in ? '<span class="amt in"><small>입금</small>' + won(t.in) + '</span>' : '<span class="amt out"><small>출금</small>' + won(t.out) + '</span>') + '</div></li>';
      }).join('') + '</ul>' : '<p class="empty">거래내역이 없습니다.</p>');
  }
  function vCard(id, mo) {
    var c = S.cards[id]; if (!c) { id = 0; c = S.cards[0]; }
    mo = mo || '2019-01'; setTop('카드 이용내역'); setTab('inq');
    var rows = c.tx.filter(function (t) { return t.d.indexOf(mo) === 0; }).reverse(), mi = MONTHS.indexOf(mo), cnt = rows.filter(function (t) { return t.st === 'A'; }).length;
    var html = '<div class="chips">' + S.cards.map(function (x) { return '<button type="button" class="' + (x.id === id ? 'on' : '') + '" data-replace="1" data-go="#/card/' + x.id + '/' + mo + '">' + x.short + '</button>'; }).join('') + '</div>' +
      '<div class="info"><div class="n">' + c.name + '<br>' + c.no + '</div><div class="n" style="margin-top:4px">' + (c.type === 'credit' ? '결제계좌 ' + S.accts[0].name + ' · 매월 14일 결제' : '출금계좌 ' + S.accts[0].name) + '</div></div>' +
      '<div class="mnav"><button type="button" ' + (mi > 0 ? 'data-replace="1" data-go="#/card/' + id + '/' + MONTHS[mi - 1] + '"' : 'disabled') + '>‹</button><span>' + mo.slice(0, 4) + '년 ' + (+mo.slice(5)) + '월</span><button type="button" ' + (mi < MONTHS.length - 1 ? 'data-replace="1" data-go="#/card/' + id + '/' + MONTHS[mi + 1] + '"' : 'disabled') + '>›</button></div>' +
      '<div class="stat"><div>이용금액<b>' + won(monthSum(c.tx, mo)) + '원</b></div><div>승인건수<b>' + cnt + '건</b></div></div>';
    var last = '';
    rows.forEach(function (t) {
      if (t.d !== last) { last = t.d; html += '<div class="dh">' + dot(t.d) + '</div>'; }
      html += '<button type="button" class="tx ' + (t.st === 'C' ? 'cancel' : '') + '" data-go="#/ctx/' + t.id + '"><div class="l1"><span class="memo"><b>' + t.m + '</b></span><span class="amt ' + (t.st === 'C' ? 'out' : '') + '">' + (t.st === 'C' ? '-' : '') + won(t.a) + '원</span></div><div class="l2"><span class="dt">' + dot(t.d) + ' ' + t.t.slice(0, 5) + '</span><span class="tag ' + (t.st === 'A' ? 'a' : 'c') + '">' + (t.st === 'A' ? '승인' : '승인취소') + '</span></div></button>';
    });
    V.innerHTML = html + (rows.length ? '' : '<p class="empty">이용내역이 없습니다.</p>');
  }
  function vCtx(tid) {
    var cid = +tid.charAt(1), c = S.cards[cid], t = c && c.tx.filter(function (x) { return x.id === tid; })[0];
    if (!t) return vCard(0); setTop('이용내역 상세'); setTab('inq');
    var mo = t.d.slice(0, 7), cr = c.type === 'credit';
    var kv = [['가맹점명', t.m], ['이용일시', dot(t.d) + ' ' + t.t], ['승인상태', t.st === 'A' ? '승인' : '승인취소'], ['승인번호', t.ap], ['이용구분', t.ins ? '할부 ' + t.ins + '개월' : '일시불'], ['업종', t.c], ['이용카드', c.name + ' (' + c.no.slice(-4) + ')'],
      cr ? ['결제예정일', (t.d.slice(0, 4)) + '.' + pad(+mo.slice(5) + 1 > 12 ? 1 : +mo.slice(5) + 1) + '.14'] : ['출금계좌', S.accts[0].name]];
    V.innerHTML = '<div class="dtl"><div class="m">' + t.m + '</div><div class="big ' + (t.st === 'C' ? 'out' : '') + '">' + (t.st === 'C' ? '-' : '') + won(t.a) + '원</div></div><table class="kv">' +
      kv.map(function (x) { return '<tr><th>' + x[0] + '</th><td>' + x[1] + '</td></tr>'; }).join('') + '</table>';
  }

  var MENU = [['조회', ['계좌조회@#/acct', '카드 이용내역@#/card', '거래내역 증명서']], ['이체', ['계좌이체', '자동이체', '이체결과 조회']], ['공과금', ['공과금 납부', '지로 납부']], ['금융상품', ['예금/적금 가입', '대출', '외환/환전', '금융상품 안내']], ['자산관리', ['자산관리', '목표저축']], ['인증/보안', ['인증센터', '공인인증서 관리', '보안센터']], ['고객지원', ['고객센터', '이벤트', '부가서비스']]];
  function openMenu() {
    DR.innerHTML = '<div class="dh2"><span>전체메뉴</span><button type="button" data-close="1" aria-label="닫기">×</button></div>' + MENU.map(function (s) {
      return '<div class="dsec">' + s[0] + '</div><div class="dlist">' + s[1].map(function (m) { var p = m.split('@'); return '<button type="button" ' + (p[1] ? 'data-go="' + p[1] + '"' : 'class="dummy"') + '>' + p[0] + '</button>'; }).join('') + '</div>';
    }).join('');
    DR.classList.add('open');
  }
  function closeMenu() { DR.classList.remove('open'); }

  var nav = 0, secs = 600;
  function tick() { var e = $('tm'); if (e) e.textContent = '자동로그아웃 ' + pad(Math.floor(secs / 60)) + ':' + pad(secs % 60); }
  setInterval(function () { secs = secs > 0 ? secs - 1 : 600; tick(); }, 1000);

  function route() {
    var h = (location.hash || '#/').split('/'), p = h[1] || '';
    closeMenu(); window.scrollTo(0, 0);
    if (p === 'inq') vInq();
    else if (p === 'acct') h[2] !== undefined && h[2] !== '' ? vAcct(+h[2], h[3]) : vAcctList();
    else if (p === 'card') vCard(h[2] ? +h[2] : 0, h[3]);
    else if (p === 'ctx') vCtx(h[2] || '');
    else vHome();
  }
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-go],[data-back],[data-menu],[data-close]');
    if (!t || t.disabled) return;
    if (t.dataset.menu) return openMenu();
    if (t.dataset.close) return closeMenu();
    if (t.dataset.back) { if (nav > 0) history.back(); else location.hash = '#/'; return; }
    if (t.dataset.replace) location.replace(t.dataset.go); else if (location.hash === t.dataset.go) route(); else location.hash = t.dataset.go;
  });
  window.addEventListener('hashchange', function () { nav++; route(); });
  route();
})();

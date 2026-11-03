'use strict';
/* 신한 SOL (2020) 연출용 - 계좌조회/카드 이용내역만 동작, 모든 데이터는 가상 */
(function () {
  var KEY = 'sinhan_sol_ch3_v2', NOW = '2020-10-28', MONTHS = ['2020-07', '2020-08', '2020-09', '2020-10'];
  var $ = function (id) { return document.getElementById(id); };
  var V = $('view'), TOP = $('top'), TAB = $('tabbar');
  var pad = function (n) { return n < 10 ? '0' + n : '' + n; };
  var won = function (n) { return String(Math.abs(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ','); };
  var iso = function (d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); };
  var dot = function (s) { return s.replace(/-/g, '.'); };
  var DOW = ['일', '월', '화', '수', '목', '금', '토'];
  var dlabel = function (s) { var p = s.split('-'); return (+p[1]) + '월 ' + (+p[2]) + '일 (' + DOW[new Date(+p[0], p[1] - 1, +p[2]).getDay()] + ')'; };
  function rng(s) { s = s >>> 0; return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }

  var P = {
    acct: 'M6 4h12v16H6zM9 8h6M9 12h6M9 16h3', card: 'M3 6h18v12H3zM3 10h18M6 15h4', send: 'M4 9h13l-3-3M20 15H7l3 3',
    open: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18',
    dep: 'M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16zM9 9l3 6 3-6M9 12h6', sav: 'M5 19V10M10 19V6M15 19v-6M20 19V4',
    loan: 'M4 20V10l8-6 8 6v10zM9 20v-6h6v6', fx: 'M12 3v18M16 7.5C16 6 14 5 12 5s-4 1-4 3 2 3 4 3 4 1 4 3-2 3-4 3-4-1-4-2.5',
    bill: 'M6 3h12v18l-3-2-3 2-3-2-3 2zM9 8h6M9 12h6', auto: 'M12 4a8 8 0 1 0 8 8M12 8v4l3 2M20 4v4h-4',
    cert: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6zM9 12l2 2 4-4', life: 'M12 20s-8-5-8-11a4.5 4.5 0 0 1 8-2.5A4.5 4.5 0 0 1 20 9c0 6-8 11-8 11z',
    all: 'M4 7h16M4 12h16M4 17h10', mall: 'M5 8h14l-1 12H6zM9 8a3 3 0 0 1 6 0', help: 'M5 14v-2a7 7 0 0 1 14 0v2M5 14h3v5H5zM16 14h3v5h-3z', bot: 'M4 5h16v11H9l-5 4z',
    bell: 'M12 3a5 5 0 0 0-5 5v4l-2 3h14l-2-3V8a5 5 0 0 0-5-5zM10 18a2 2 0 0 0 4 0', menu: 'M4 7h16M4 12h16M4 17h16', back: 'M15 5l-7 7 7 7'
  };
  var svg = function (k) { return '<svg viewBox="0 0 24 24"><path d="' + P[k] + '"/></svg>'; };

  var CAT = {
    cv: { n: '편의점', g: '편', m: ['GS25 한빛대점', 'CU 한빛대정문점', '이마트24 학교앞점', '세븐일레븐 원룸촌점'], lo: 1000, hi: 8500, rd: 10, h: [8, 23] },
    cafe: { n: '카페', g: '카', m: ['스타벅스 한빛대점', '메가MGC커피', '컴포즈커피', '이디야커피', '투썸플레이스'], lo: 1500, hi: 7500, rd: 100, h: [9, 19] },
    food: { n: '음식점', g: '식', m: ['한빛대 학생식당', '맘스터치', '김밥천국', '신전떡볶이', '본죽&비빔밥', '홍콩반점0410', '역전우동'], lo: 3500, hi: 14000, rd: 100, h: [11, 21] },
    del: { n: '배달', g: '배', m: ['배달의민족', '요기요', '쿠팡이츠'], lo: 11000, hi: 22000, rd: 100, h: [18, 23] },
    trans: { n: '교통', g: '교', m: ['티머니 충전', '카카오T', '서울교통공사', 'KORAIL'], fix: [1250, 1250, 1350, 1400, 2500, 3800, 5300, 10000], h: [7, 22] },
    shop: { n: '온라인쇼핑', g: '쇼', m: ['쿠팡', '11번가', '지마켓', '무신사', '올리브영'], lo: 7000, hi: 59000, rd: 100, h: [19, 23] },
    mart: { n: '생활/약국', g: '생', m: ['다이소 한빛대점', '올리브영 한빛대점', '온누리약국', '이마트'], lo: 1500, hi: 28000, rd: 10, h: [11, 21] },
    study: { n: '도서/학습', g: '학', m: ['교보문고', '알라딘 중고서점', '프린트카페 한빛', 'YES24'], lo: 1000, hi: 24000, rd: 100, h: [10, 18] },
    ent: { n: '문화', g: '문', m: ['CGV', '메가박스', 'YES24 티켓'], lo: 9000, hi: 15000, rd: 500, h: [13, 22] }
  };
  var CARDS = [
    { id: 0, name: '신한카드 Hey Young 체크', short: 'Hey Young 체크', no: '9409-72**-****-3318', type: 'debit', W: { cv: 3, cafe: 3, food: 3, del: 1, trans: 3, shop: 1, mart: 1, study: 1 } },
    { id: 1, name: '신한카드 Mr.Life 신용', short: 'Mr.Life 신용', no: '9410-48**-****-7702', type: 'credit', W: { shop: 3, del: 2, food: 1, mart: 1, study: 1, ent: 1 } }
  ];
  var ACCTS = [
    { id: 0, name: '쏠편한 입출금통장(저축예금)', no: '110-448-293517', kind: '입출금', bank: '신한은행', base: 7000000 }
  ];

  function genCard(card, r) {
    var W = card.W, keys = Object.keys(W), sum = 0; keys.forEach(function (k) { sum += W[k]; });
    var pick = function () { var x = r() * sum; for (var i = 0; i < keys.length; i++) { x -= W[keys[i]]; if (x < 0) return keys[i]; } return keys[0]; };
    var cr = card.type === 'credit', out = [], extra = [], d = new Date(2020, 6, 1), end = new Date(2020, 9, 28);
    for (; d <= end; d.setDate(d.getDate() + 1)) {
      var ds = iso(d), today = ds === NOW, x = r(), n = cr ? (x < .55 ? 0 : x < .88 ? 1 : 2) : (x < .2 ? 0 : x < .62 ? 1 : x < .9 ? 2 : 3);
      if (today) n = Math.min(n, 1);
      for (var k = 0; k < n; k++) {
        var c = CAT[pick()], m = c.m[Math.floor(r() * c.m.length)], a;
        if (c.fix) a = c.fix[Math.floor(r() * c.fix.length)]; else { a = c.lo + r() * (c.hi - c.lo); a = Math.round(a / c.rd) * c.rd; }
        var h = today ? 9 : c.h[0] + Math.floor(r() * (c.h[1] - c.h[0] + 1));
        var tx = { d: ds, t: pad(h) + ':' + pad(Math.floor(r() * 60)) + ':' + pad(Math.floor(r() * 60)), m: m, c: c.n, g: c.g, a: a, st: 'A', ap: String(20000000 + Math.floor(r() * 79999999)), ins: (cr && a >= 50000 && r() < .5) ? [2, 3][Math.floor(r() * 2)] : 0 };
        out.push(tx);
        if (!today && r() < .04) {
          var nd = new Date(d); nd.setDate(nd.getDate() + 1);
          if (iso(nd) < NOW) extra.push({ d: iso(nd), t: pad(10 + Math.floor(r() * 7)) + ':' + pad(Math.floor(r() * 60)) + ':' + pad(Math.floor(r() * 60)), m: m, c: c.n, g: c.g, a: a, st: 'C', ap: tx.ap, ins: 0 });
        }
      }
    }
    if (cr) MONTHS.forEach(function (mo) {
      out.push({ d: mo + '-12', t: '03:14:09', m: 'NETFLIX.COM', c: '정기결제', g: '정', a: 9500, st: 'A', ap: String(40000000 + Math.floor(r() * 9999999)), ins: 0 });
      out.push({ d: mo + '-15', t: '06:30:41', m: 'LG유플러스 통신요금', c: '통신', g: '통', a: 42900, st: 'A', ap: String(50000000 + Math.floor(r() * 9999999)), ins: 0 });
    });
    out = out.filter(function (t) { return t.d <= NOW; }).concat(extra).sort(function (p, q) { return (p.d + p.t) < (q.d + q.t) ? -1 : 1; });
    out.forEach(function (t, i) { t.id = 'c' + card.id + '_' + i; });
    return out;
  }
  function monthSum(txs, mo) { var s = 0; txs.forEach(function (t) { if (t.d.indexOf(mo) === 0) s += t.st === 'A' ? t.a : -t.a; }); return s; }
  function genAccts(cards, r) {
    return [{
      id: 0, name: ACCTS[0].name, no: ACCTS[0].no, kind: ACCTS[0].kind,
      bank: ACCTS[0].bank, open: 0, bal: 7000000,
      tx: [{ d: '2020-10-25', t: '18:20:00', memo: '아르바이트 급여', out: 0, in: 420000, bal: 7000000 }]
    }];
  }
  function load() {
    try { var s = localStorage.getItem(KEY); if (s) return JSON.parse(s); } catch (e) {}
    var cards = CARDS.map(function (c) { return genCard(c, rng(2020 + c.id * 37)); });
    var S = { accts: genAccts(cards, rng(2020)), cards: CARDS.map(function (c, i) { return { id: c.id, name: c.name, short: c.short, no: c.no, type: c.type, tx: cards[i] }; }) };
    try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {}
    return S;
  }
  var S = load();

  function setTop(t) {
    TOP.innerHTML = (t ? '<button type="button" class="bk" data-back="1" aria-label="뒤로">' + svg('back') + '</button><span class="ttl">' + t + '</span>' : '<span class="sol"><small>신한</small><b>SOL</b></span>') +
      '<span class="sp"></span><button type="button" class="hi dummy" aria-label="알림">' + svg('bell') + '</button><button type="button" class="hi dummy" aria-label="전체메뉴">' + svg('menu') + '</button>';
  }
  function setTab(on) {
    var T = [['all', '전체계좌', '#/acct'], ['mall', '상품몰'], ['help', '고객지원'], ['bot', '챗봇']];
    TAB.innerHTML = T.map(function (x) { return '<button type="button" class="' + (x[2] ? '' : 'dummy ') + (on === x[0] ? 'on' : '') + '"' + (x[2] ? ' data-go="' + x[2] + '"' : '') + '>' + svg(x[0]) + x[1] + '</button>'; }).join('');
  }

  function vHome() {
    setTop(''); setTab('');
    var a = S.accts[0];
    var M = [['acct', '계좌조회', '#/acct'], ['card', '카드 이용내역', '#/card'], ['send', '이체'], ['open', '오픈뱅킹'], ['dep', '예금'], ['sav', '적금'], ['loan', '대출'], ['fx', '환전'], ['bill', '공과금'], ['auto', '자동이체'], ['cert', '인증센터'], ['life', '쏠쏠한 라이프']];
    V.innerHTML = '<div class="dots"><i></i><i class="on"></i><i></i></div><div class="hi-line"><span class="hy">Hey Young</span><br><b>김하늘님,<br>오늘도 좋은 하루 보내세요</b></div>' +
      '<section class="mainc"><div class="nm">' + a.name + '</div><div class="no">신한 ' + a.no + '</div><div class="bal">' + won(a.bal) + '<em>원</em></div>' +
      '<div class="btns"><button type="button" class="b1" data-go="#/acct/0">조회</button><button type="button" class="b2 dummy">이체</button></div></section>' +
      '<button type="button" class="ob dummy"><span><b>오픈뱅킹</b>다른 은행 계좌까지 한눈에 모아보세요</span><span class="pl">계좌 등록</span></button>' +
      '<div class="sec"><b>맞춤메뉴</b><button type="button" class="dummy">편집</button></div><div class="mg">' +
      M.map(function (x) { return '<button type="button" ' + (x[2] ? 'data-go="' + x[2] + '"' : 'class="dummy"') + '><span class="mi">' + svg(x[0]) + '</span>' + x[1] + '</button>'; }).join('') + '</div>' +
      '<button type="button" class="hyb dummy"><b>Hey Young 20대 혜택</b><span>생활 속 할인과 적금 우대금리를 만나보세요 (예시)</span></button>' +
      '<p class="foot">※ 본 화면의 모든 정보는 가상의 데이터이며 실제 금융 정보가 아닙니다.</p>';
  }
  function vAcctList() {
    setTop('전체계좌'); setTab('all');
    var t1 = 0, t2 = 0, h1 = '', h2 = '';
    var row = function (a) { return '<button type="button" class="arow" data-go="#/acct/' + a.id + '"><span class="ai">' + a.bank.charAt(0) + '</span><span class="an">' + a.name + (a.open ? '<span class="tg">오픈뱅킹</span>' : '') + '<small>' + a.bank + ' ' + a.no + '</small></span><span class="ab">' + won(a.bal) + '원</span></button>'; };
    S.accts.forEach(function (a) { if (a.open) { t2 += a.bal; h2 += row(a); } else { t1 += a.bal; h1 += row(a); } });
    V.innerHTML = '<div class="sumh"><small>총 잔액</small><b>' + won(t1 + t2) + '원</b></div>' +
      '<div class="grp"><span>신한은행 계좌</span><span>' + won(t1) + '원</span></div>' + h1 + '<div class="grp"><span>오픈뱅킹 타행 계좌</span><span>' + won(t2) + '원</span></div>' + h2;
  }
  function vAcct(id, mo) {
    var a = S.accts[id]; if (!a) return vAcctList();
    mo = mo || '2020-10'; setTop('조회'); setTab('all');
    var rows = a.tx.filter(function (t) { return mo === 'all' || t.d.indexOf(mo) === 0; }).reverse(), ti = 0, to = 0;
    rows.forEach(function (t) { ti += t.in; to += t.out; });
    var ch = [['all', '전체']].concat(MONTHS.slice().reverse().map(function (m) { return [m, +m.slice(5) + '월']; }));
    var html = '<div class="dh"><div class="n">' + a.name + '</div><div class="no">' + a.bank + ' ' + a.no + '</div><div class="big">' + won(a.bal) + '원</div>' +
      '<div class="btns"><button type="button" class="b2 dummy">이체</button><button type="button" class="b1 dummy">계좌관리</button></div></div>' +
      '<div class="pills">' + ch.map(function (c) { return '<button type="button" class="' + (c[0] === mo ? 'on' : '') + '" data-replace="1" data-go="#/acct/' + id + '/' + c[0] + '">' + c[1] + '</button>'; }).join('') + '</div>' +
      '<div class="stat"><div>입금<b class="in">' + won(ti) + '원</b></div><div>출금<b>' + won(to) + '원</b></div><div>거래<b>' + rows.length + '건</b></div></div>', last = '';
    rows.forEach(function (t) {
      if (t.d !== last) { last = t.d; html += '<div class="dg">' + dlabel(t.d) + '</div>'; }
      html += '<div class="tr"><div class="l"><div class="m">' + t.memo + '</div><div class="s">' + dot(t.d) + ' ' + t.t.slice(0, 5) + '</div></div><div class="r"><div class="a ' + (t.in ? 'in' : '') + '">' + (t.in ? '+' + won(t.in) : '-' + won(t.out)) + '원</div><div class="b">잔액 ' + won(t.bal) + '원</div></div></div>';
    });
    V.innerHTML = html + (rows.length ? '' : '<p class="empty">거래내역이 없습니다.</p>');
  }
  function vCard(id, mo) {
    var c = S.cards[id]; if (!c) { id = 0; c = S.cards[0]; }
    mo = mo || '2020-10'; setTop('카드 이용내역'); setTab('');
    var rows = c.tx.filter(function (t) { return t.d.indexOf(mo) === 0; }).reverse(), mi = MONTHS.indexOf(mo), cnt = rows.filter(function (t) { return t.st === 'A'; }).length;
    var html = '<div class="cards">' + S.cards.map(function (x) { return '<button type="button" class="pc cg' + x.id + (x.id === id ? ' on' : '') + '" data-replace="1" data-go="#/card/' + x.id + '/' + mo + '"><b>' + x.name + '</b><span>' + x.no.slice(0, 4) + ' ····' + x.no.slice(-4) + '</span></button>'; }).join('') + '</div>' +
      '<div class="mn"><button type="button" ' + (mi > 0 ? 'data-replace="1" data-go="#/card/' + id + '/' + MONTHS[mi - 1] + '"' : 'disabled') + '>‹</button><span>' + mo.slice(0, 4) + '년 ' + (+mo.slice(5)) + '월</span><button type="button" ' + (mi < MONTHS.length - 1 ? 'data-replace="1" data-go="#/card/' + id + '/' + MONTHS[mi + 1] + '"' : 'disabled') + '>›</button></div>' +
      '<div class="stat"><div>이용금액<b>' + won(monthSum(c.tx, mo)) + '원</b></div><div>승인건수<b>' + cnt + '건</b></div></div>', last = '';
    rows.forEach(function (t) {
      if (t.d !== last) { last = t.d; html += '<div class="dg">' + dlabel(t.d) + '</div>'; }
      html += '<button type="button" class="tx ' + (t.st === 'C' ? 'cancel' : '') + '" data-go="#/ctx/' + t.id + '"><span class="ai">' + t.g + '</span><span class="l"><div class="m">' + t.m + '</div><div class="s">' + t.t.slice(0, 5) + ' · ' + t.c + '</div></span><span class="r"><div class="a">' + (t.st === 'C' ? '-' : '') + won(t.a) + '원</div><span class="st ' + (t.st === 'A' ? 'a' : 'c') + '">' + (t.st === 'A' ? '승인' : '승인취소') + '</span></span></button>';
    });
    V.innerHTML = html + (rows.length ? '' : '<p class="empty">이용내역이 없습니다.</p>');
  }
  function vCtx(tid) {
    var cid = +tid.charAt(1), c = S.cards[cid], t = c && c.tx.filter(function (x) { return x.id === tid; })[0];
    if (!t) return vCard(0); setTop('이용내역 상세'); setTab('');
    var cr = c.type === 'credit', nm = +t.d.slice(5, 7) + 1;
    var kv = [['이용일시', dot(t.d) + ' ' + t.t], ['승인상태', t.st === 'A' ? '승인' : '승인취소'], ['승인번호', t.ap], ['이용구분', t.ins ? '할부 ' + t.ins + '개월' : '일시불'], ['업종', t.c], ['이용카드', c.name + ' (' + c.no.slice(-4) + ')'],
      cr ? ['결제예정일', (nm > 12 ? '2021.01' : '2020.' + pad(nm)) + '.14'] : ['출금계좌', S.accts[0].name]];
    V.innerHTML = '<div class="dtl"><div class="m">' + t.m + '</div><div class="big ' + (t.st === 'C' ? 'cancel' : '') + '">' + (t.st === 'C' ? '-' : '') + won(t.a) + '원</div></div><table class="kv">' +
      kv.map(function (x) { return '<tr><th>' + x[0] + '</th><td>' + x[1] + '</td></tr>'; }).join('') + '</table>';
  }

  var nav = 0;
  function route() {
    var h = (location.hash || '#/').split('/'), p = h[1] || '';
    window.scrollTo(0, 0);
    if (p === 'acct') h[2] ? vAcct(+h[2], h[3]) : vAcctList();
    else if (p === 'acct0') vAcct(0, h[2]);
    else if (p === 'card') vCard(h[2] ? +h[2] : 0, h[3]);
    else if (p === 'ctx') vCtx(h[2] || '');
    else vHome();
  }
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-go],[data-back]');
    if (!t || t.disabled) return;
    if (t.dataset.back) { if (nav > 0) history.back(); else location.hash = '#/'; return; }
    if (t.dataset.replace) location.replace(t.dataset.go); else if (location.hash === t.dataset.go) route(); else location.hash = t.dataset.go;
  });
  window.addEventListener('hashchange', function () { nav++; route(); });
  route();
})();

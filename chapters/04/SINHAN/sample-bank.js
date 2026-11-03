'use strict';
/* 신한 SOL (2023, 슈퍼SOL 출시 이전) 연출용 - 계좌조회/카드 이용내역만 동작, 모든 데이터는 가상 */
(function () {
  var KEY = 'sinhan_sol_2023_v1', NOW = '2023-11-28', MONTHS = ['2023-08', '2023-09', '2023-10', '2023-11'];
  var $ = function (id) { return document.getElementById(id); };
  var V = $('view'), TOP = $('top'), TAB = $('tabbar');
  var pad = function (n) { return n < 10 ? '0' + n : '' + n; };
  var won = function (n) { return String(Math.abs(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ','); };
  var iso = function (d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); };
  var dot = function (s) { return s.replace(/-/g, '.'); };
  var DOW = ['일', '월', '화', '수', '목', '금', '토'];
  var dlabel = function (s) { var p = s.split('-'); return dot(s) + ' (' + DOW[new Date(+p[0], p[1] - 1, +p[2]).getDay()] + ')'; };
  function rng(s) { s = s >>> 0; return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }

  var P = {
    home: 'M4 11l8-7 8 7v9H4zM10 20v-6h4v6', acct: 'M5 4h14v16H5zM8 9h8M8 13h8M8 17h4', card: 'M3 6h18v12H3zM3 10h18M6 15h4', send: 'M4 9h13l-3-3M20 15H7l3 3',
    prod: 'M5 8h14l-1 12H6zM9 8a3 3 0 0 1 6 0', asset: 'M4 18l5-6 4 3 7-9M4 20h16', open: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18',
    bill: 'M6 3h12v18l-3-2-3 2-3-2-3 2zM9 8h6M9 12h6', fx: 'M12 3v18M16 7.5C16 6 14 5 12 5s-4 1-4 3 2 3 4 3 4 1 4 3-2 3-4 3-4-1-4-2.5',
    all: 'M4 7h16M4 12h16M4 17h16', bell: 'M12 3a5 5 0 0 0-5 5v4l-2 3h14l-2-3V8a5 5 0 0 0-5-5zM10 18a2 2 0 0 0 4 0', back: 'M15 5l-7 7 7 7'
  };
  var svg = function (k) { return '<svg viewBox="0 0 24 24"><path d="' + P[k] + '"/></svg>'; };

  var CAT = {
    cv: { n: '편의점', m: ['GS25 한빛대점', 'CU 한빛대정문점', '이마트24 학교앞점', '세븐일레븐 원룸촌점'], lo: 1000, hi: 9500, rd: 100, h: [8, 23] },
    cafe: { n: '카페', m: ['스타벅스 한빛대점', '메가MGC커피', '컴포즈커피', '빽다방', '이디야커피', '투썸플레이스'], lo: 1500, hi: 8500, rd: 100, h: [9, 19] },
    food: { n: '음식점', m: ['한빛대 학생식당', '맘스터치', '김밥천국', '요거트아이스크림의정석', '라화쿵푸마라탕', '신전떡볶이', '역전우동'], lo: 4000, hi: 16000, rd: 100, h: [11, 21] },
    del: { n: '배달', m: ['배달의민족', '요기요', '쿠팡이츠'], lo: 14000, hi: 26000, rd: 100, h: [18, 23] },
    trans: { n: '교통', h: [7, 22] },
    shop: { n: '온라인쇼핑', m: ['쿠팡', '네이버페이', '무신사', '올리브영', '지마켓', '29CM'], lo: 8000, hi: 69000, rd: 100, h: [19, 23] },
    mart: { n: '생활/약국', m: ['다이소 한빛대점', '올리브영 한빛대점', '온누리약국', '이마트'], lo: 1500, hi: 30000, rd: 100, h: [11, 21] },
    study: { n: '도서/학습', m: ['교보문고', '알라딘 중고서점', '프린트카페 한빛', 'YES24'], lo: 1000, hi: 26000, rd: 100, h: [10, 18] },
    ent: { n: '문화', m: ['CGV', '메가박스', 'YES24 티켓'], lo: 11000, hi: 15000, rd: 500, h: [13, 22] }
  };
  var CARDS = [
    { id: 0, name: '신한카드 Deep Once 체크', short: '체크카드', no: '9409-61**-****-4207', type: 'debit', W: { cv: 3, cafe: 3, food: 3, del: 1, trans: 3, shop: 1, mart: 1, study: 1 } },
    { id: 1, name: '신한카드 Mr.Life', short: '신용카드', no: '9410-27**-****-9153', type: 'credit', W: { shop: 3, del: 2, food: 1, mart: 1, study: 1, ent: 1 } }
  ];
  var ACCTS = [
    { id: 0, name: '쏠편한 입출금통장(저축예금)', no: '110-532-407186', kind: '입출금', bank: '신한은행', base: 250000 },
    { id: 1, name: '신한 청년도약계좌', no: '110-571-230945', kind: '적금', bank: '신한은행', base: 100000 },
    { id: 2, name: '토스뱅크 통장', no: '1000-2841-7703', kind: '입출금', bank: '토스뱅크', open: 1, base: 150000 }
  ];

  function genCard(card, r) {
    var W = card.W, keys = Object.keys(W), sum = 0; keys.forEach(function (k) { sum += W[k]; });
    var pick = function () { var x = r() * sum; for (var i = 0; i < keys.length; i++) { x -= W[keys[i]]; if (x < 0) return keys[i]; } return keys[0]; };
    var cr = card.type === 'credit', out = [], extra = [], d = new Date(2023, 7, 1), end = new Date(2023, 10, 28);
    for (; d <= end; d.setDate(d.getDate() + 1)) {
      var ds = iso(d), today = ds === NOW, x = r(), n = cr ? (x < .55 ? 0 : x < .88 ? 1 : 2) : (x < .2 ? 0 : x < .62 ? 1 : x < .9 ? 2 : 3);
      if (today) n = Math.min(n, 1);
      for (var k = 0; k < n; k++) {
        var key = pick(), c = CAT[key], m, a;
        if (key === 'trans') {
          var q = r(), sub = ds < '2023-10-07' ? 1400 : 1550, bus = ds < '2023-08-12' ? 1200 : 1500;
          if (q < .45) { m = '서울 지하철'; a = sub; } else if (q < .7) { m = '서울 버스'; a = bus; } else if (q < .82) { m = '티머니 충전'; a = r() < .5 ? 10000 : 20000; }
          else { m = '카카오T'; a = Math.round((4800 + r() * 11000) / 100) * 100; }
        } else { m = c.m[Math.floor(r() * c.m.length)]; a = Math.round((c.lo + r() * (c.hi - c.lo)) / c.rd) * c.rd; }
        var h = today ? 9 : c.h[0] + Math.floor(r() * (c.h[1] - c.h[0] + 1));
        var tx = { d: ds, t: pad(h) + ':' + pad(Math.floor(r() * 60)) + ':' + pad(Math.floor(r() * 60)), m: m, c: c.n, a: a, st: 'A', ap: String(30000000 + Math.floor(r() * 69999999)), ins: (cr && a >= 50000 && r() < .5) ? [2, 3][Math.floor(r() * 2)] : 0 };
        out.push(tx);
        if (!today && r() < .04) {
          var nd = new Date(d); nd.setDate(nd.getDate() + 1);
          if (iso(nd) < NOW) extra.push({ d: iso(nd), t: pad(10 + Math.floor(r() * 7)) + ':' + pad(Math.floor(r() * 60)) + ':' + pad(Math.floor(r() * 60)), m: m, c: c.n, a: a, st: 'C', ap: tx.ap, ins: 0 });
        }
      }
    }
    if (cr) MONTHS.forEach(function (mo) {
      out.push({ d: mo + '-12', t: '03:14:09', m: 'NETFLIX.COM', c: '정기결제', a: 13500, st: 'A', ap: String(40000000 + Math.floor(r() * 9999999)), ins: 0 });
      out.push({ d: mo + '-15', t: '06:30:41', m: 'U+ 통신요금', c: '통신', a: 49000, st: 'A', ap: String(50000000 + Math.floor(r() * 9999999)), ins: 0 });
      out.push({ d: mo + '-20', t: '04:02:17', m: 'YouTube Premium', c: '정기결제', a: 14900, st: 'A', ap: String(60000000 + Math.floor(r() * 9999999)), ins: 0 });
    });
    out = out.filter(function (t) { return t.d <= NOW; }).concat(extra).sort(function (p, q) { return (p.d + p.t) < (q.d + q.t) ? -1 : 1; });
    out.forEach(function (t, i) { t.id = 'c' + card.id + '_' + i; });
    return out;
  }
  function monthSum(txs, mo) { var s = 0; txs.forEach(function (t) { if (t.d.indexOf(mo) === 0) s += t.st === 'A' ? t.a : -t.a; }); return s; }
  function genAccts(cards, r) {
    var ev = [[], [], []];
    var add = function (i, d, t, memo, o, n) { if (d <= NOW) ev[i].push({ d: d, t: t, memo: memo, out: o || 0, in: n || 0 }); };
    var pay = [521400, 536900, 508200, 549700];
    [8, 9, 10, 11].forEach(function (m, idx) {
      var mo = '2023-' + pad(m);
      add(0, mo + '-01', '09:10:14', '월세 이체(원룸 임대인)', 400000);
      add(0, mo + '-05', '08:20:40', '용돈 입금(아버지)', 0, 400000);
      add(0, mo + '-10', '17:30:12', '급여 (주)메가커피 한빛점', 0, pay[idx]);
      add(0, mo + '-14', '10:02:45', '신한카드 결제대금', idx === 0 ? 112400 : monthSum(cards[1], MONTHS[idx - 1]));
      add(0, mo + '-20', '14:21:08', '이체 비상금(김하늘)', 30000); add(2, mo + '-20', '14:21:08', '입금 신한(김하늘)', 0, 30000);
      add(0, mo + '-25', '18:21:00', '청년도약계좌 자동이체', 50000); add(1, mo + '-25', '18:21:00', '청년도약계좌 납입', 0, 50000);
      for (var k = 0; k < 3; k++) {
        var dd = 2 + Math.floor(r() * 26), nm = ['박지수', '이도윤', '최서연', '정민우'][Math.floor(r() * 4)], tm = pad(12 + Math.floor(r() * 10)) + ':' + pad(Math.floor(r() * 60)) + ':10';
        if (r() < .7) add(0, mo + '-' + pad(dd), tm, '모바일이체 ' + nm, [12000, 18500, 25000, 32000][Math.floor(r() * 4)]);
        else add(0, mo + '-' + pad(dd), tm, '모바일입금 ' + nm, 0, [10000, 15000, 22000][Math.floor(r() * 3)]);
      }
    });
    add(0, '2023-09-20', '11:40:22', '교내근로장학금 입금', 0, 450000);
    cards[0].forEach(function (t) { add(0, t.d, t.t, (t.st === 'A' ? '체크카드 ' : '체크취소 ') + t.m, t.st === 'A' ? t.a : 0, t.st === 'C' ? t.a : 0); });
    return ACCTS.map(function (a, i) {
      var e = ev[i].sort(function (p, q) { return (p.d + p.t) < (q.d + q.t) ? -1 : 1; }), run = 0, min = 0;
      e.forEach(function (x) { run += x.in - x.out; if (run < min) min = run; });
      var bal = Math.max(a.base, -min + 60000);
      e.forEach(function (x) { bal += x.in - x.out; x.bal = bal; });
      return { id: a.id, name: a.name, no: a.no, kind: a.kind, bank: a.bank, open: a.open || 0, bal: bal, tx: e };
    });
  }
  function load() {
    try { var s = localStorage.getItem(KEY); if (s) return JSON.parse(s); } catch (e) {}
    var cards = CARDS.map(function (c) { return genCard(c, rng(2023 + c.id * 41)); });
    var S = { accts: genAccts(cards, rng(2023)), cards: CARDS.map(function (c, i) { return { id: c.id, name: c.name, short: c.short, no: c.no, type: c.type, tx: cards[i] }; }) };
    try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {}
    return S;
  }
  var S = load();

  function setTop(t) {
    TOP.innerHTML = (t ? '<button type="button" class="bk" data-back="1" aria-label="뒤로">' + svg('back') + '</button><span class="ttl">' + t + '</span>' : '<span class="lg"><i>SOL</i>신한 SOL</span>') +
      '<span class="sp"></span><button type="button" class="hi dummy" aria-label="알림">' + svg('bell') + '</button><button type="button" class="hi dummy" aria-label="전체메뉴">' + svg('all') + '</button>';
  }
  function setTab(on) {
    var T = [['home', '홈', '#/'], ['acct', '계좌', '#/acct'], ['card', '카드', '#/card'], ['prod', '상품몰'], ['all', '전체메뉴']];
    TAB.innerHTML = T.map(function (x) { return '<button type="button" class="' + (x[2] ? '' : 'dummy ') + (on === x[0] ? 'on' : '') + '"' + (x[2] ? ' data-go="' + x[2] + '"' : '') + '>' + svg(x[0]) + x[1] + '</button>'; }).join('');
  }
  var arow = function (a) { return '<button type="button" class="ar" data-go="#/acct/' + a.id + '"><span class="an">' + a.name + (a.open ? '<span class="tg">오픈뱅킹</span>' : '') + '<small>' + a.bank + ' ' + a.no + '</small></span><span class="ab">' + won(a.bal) + '원</span></button>'; };

  function vHome() {
    setTop(''); setTab('home');
    var a = S.accts[0], G = [['acct', '조회', '#/acct'], ['send', '이체'], ['prod', '상품'], ['card', '카드', '#/card'], ['asset', '자산관리'], ['open', '오픈뱅킹'], ['bill', '공과금'], ['fx', '외환']];
    V.innerHTML = '<div class="greet"><b>김하늘님, 안녕하세요</b><p>최근 접속 2023.11.27 22:14</p></div>' +
      '<section class="main"><div class="nm">' + a.name + '</div><div class="no">신한 ' + a.no + '</div><div class="bal">' + won(a.bal) + '<em>원</em></div>' +
      '<div class="btns"><button type="button" class="b1" data-go="#/acct/0">조회</button><button type="button" class="b2 dummy">이체</button></div></section><div class="band"></div>' +
      '<div class="sh"><b>다른 계좌</b><button type="button" data-go="#/acct">전체계좌 ›</button></div>' + S.accts.slice(1).map(arow).join('') + '<div class="band"></div>' +
      '<div class="sg">' + G.map(function (x) { return '<button type="button" ' + (x[2] ? 'data-go="' + x[2] + '"' : 'class="dummy"') + '>' + svg(x[0]) + x[1] + '</button>'; }).join('') + '</div><div class="band"></div>' +
      '<div class="sh"><b>금융상품</b></div><button type="button" class="ls dummy">예금 · 적금</button><button type="button" class="ls dummy">대출</button><button type="button" class="ls dummy">상품몰</button>' +
      '<button type="button" class="bn dummy"><b>가을맞이 적금 이벤트</b><span>신한 SOL 가입 고객 대상 (예시)</span></button><div class="band"></div>' +
      '<div class="sh"><b>고객지원</b></div><div class="chips"><button type="button" class="dummy">인증센터</button><button type="button" class="dummy">보안센터</button><button type="button" class="dummy">고객센터</button><button type="button" class="dummy">이벤트</button></div>' +
      '<p class="foot">※ 본 화면의 모든 정보는 가상의 데이터이며 실제 금융 정보가 아닙니다.</p>';
  }
  function vAcctList() {
    setTop('전체계좌'); setTab('acct');
    var t1 = 0, t2 = 0, h1 = '', h2 = '';
    S.accts.forEach(function (a) { if (a.open) { t2 += a.bal; h2 += arow(a); } else { t1 += a.bal; h1 += arow(a); } });
    V.innerHTML = '<div class="sum"><small>총 잔액</small><b>' + won(t1 + t2) + '원</b></div><div class="grp"><span>신한은행</span><span>' + won(t1) + '원</span></div>' + h1 + '<div class="grp"><span>오픈뱅킹 · 타행 계좌</span><span>' + won(t2) + '원</span></div>' + h2;
  }
  function vAcct(id, mo) {
    var a = S.accts[id]; if (!a) return vAcctList();
    mo = mo || '2023-11'; setTop('거래내역조회'); setTab('acct');
    var rows = a.tx.filter(function (t) { return mo === 'all' || t.d.indexOf(mo) === 0; }).reverse(), ti = 0, to = 0;
    rows.forEach(function (t) { ti += t.in; to += t.out; });
    var ch = MONTHS.slice().reverse().map(function (m) { return [m, +m.slice(5) + '월']; }).concat([['all', '전체']]);
    var html = '<div class="dh"><div class="n">' + a.name + '</div><div class="no">' + a.bank + ' ' + a.no + '</div><div class="big">' + won(a.bal) + '원</div><div class="btns"><button type="button" class="b2 dummy">이체</button><button type="button" class="b1 dummy">계좌관리</button></div></div>' +
      '<div class="seg">' + ch.map(function (c) { return '<button type="button" class="' + (c[0] === mo ? 'on' : '') + '" data-replace="1" data-go="#/acct/' + id + '/' + c[0] + '">' + c[1] + '</button>'; }).join('') + '</div>' +
      '<div class="stat"><div>입금<b class="in">' + won(ti) + '원</b></div><div>출금<b>' + won(to) + '원</b></div><div>거래<b>' + rows.length + '건</b></div></div>', last = '';
    rows.forEach(function (t) {
      if (t.d !== last) { last = t.d; html += '<div class="dg">' + dlabel(t.d) + '</div>'; }
      html += '<div class="tr"><div class="l"><div class="m">' + t.memo + '</div><div class="s">' + t.t.slice(0, 5) + ' · ' + (t.in ? '입금' : '출금') + '</div></div><div class="r"><div class="a ' + (t.in ? 'in' : 'out') + '">' + (t.in ? '+' + won(t.in) : '-' + won(t.out)) + '원</div><div class="b">잔액 ' + won(t.bal) + '원</div></div></div>';
    });
    V.innerHTML = html + (rows.length ? '' : '<p class="empty">거래내역이 없습니다.</p>');
  }
  function vCard(id, mo) {
    var c = S.cards[id]; if (!c) { id = 0; c = S.cards[0]; }
    mo = mo || '2023-11'; setTop('카드 이용내역'); setTab('card');
    var rows = c.tx.filter(function (t) { return t.d.indexOf(mo) === 0; }).reverse(), mi = MONTHS.indexOf(mo), cnt = rows.filter(function (t) { return t.st === 'A'; }).length;
    var html = '<div class="seg">' + S.cards.map(function (x) { return '<button type="button" class="' + (x.id === id ? 'on' : '') + '" data-replace="1" data-go="#/card/' + x.id + '/' + mo + '">' + x.short + '</button>'; }).join('') + '</div>' +
      '<div class="dh" style="padding-bottom:4px"><div class="n">' + c.name + '</div><div class="no">' + c.no + (c.type === 'credit' ? ' · 결제일 매월 14일' : ' · ' + S.accts[0].name) + '</div></div>' +
      '<div class="mn"><button type="button" ' + (mi > 0 ? 'data-replace="1" data-go="#/card/' + id + '/' + MONTHS[mi - 1] + '"' : 'disabled') + '>‹</button><span>' + mo.slice(0, 4) + '년 ' + (+mo.slice(5)) + '월</span><button type="button" ' + (mi < MONTHS.length - 1 ? 'data-replace="1" data-go="#/card/' + id + '/' + MONTHS[mi + 1] + '"' : 'disabled') + '>›</button></div>' +
      '<div class="stat"><div>이용금액<b>' + won(monthSum(c.tx, mo)) + '원</b></div><div>승인건수<b>' + cnt + '건</b></div></div>', last = '';
    rows.forEach(function (t) {
      if (t.d !== last) { last = t.d; html += '<div class="dg">' + dlabel(t.d) + '</div>'; }
      html += '<button type="button" class="tx ' + (t.st === 'C' ? 'cancel' : '') + '" data-go="#/ctx/' + t.id + '"><span class="l"><div class="m">' + t.m + '</div><div class="s">' + t.t.slice(0, 5) + ' · ' + t.c + '</div></span><span class="r"><div class="a">' + (t.st === 'C' ? '-' : '') + won(t.a) + '원</div><span class="st ' + (t.st === 'A' ? 'a' : 'c') + '">' + (t.st === 'A' ? '승인' : '승인취소') + '</span></span></button>';
    });
    V.innerHTML = html + (rows.length ? '' : '<p class="empty">이용내역이 없습니다.</p>');
  }
  function vCtx(tid) {
    var cid = +tid.charAt(1), c = S.cards[cid], t = c && c.tx.filter(function (x) { return x.id === tid; })[0];
    if (!t) return vCard(0); setTop('이용내역 상세'); setTab('card');
    var cr = c.type === 'credit', nm = +t.d.slice(5, 7) + 1;
    var kv = [['이용일시', dot(t.d) + ' ' + t.t], ['승인상태', t.st === 'A' ? '승인' : '승인취소'], ['승인번호', t.ap], ['이용구분', t.ins ? '할부 ' + t.ins + '개월' : '일시불'], ['업종', t.c], ['이용카드', c.name + ' (' + c.no.slice(-4) + ')'],
      cr ? ['결제예정일', (nm > 12 ? '2024.01' : '2023.' + pad(nm)) + '.14'] : ['출금계좌', S.accts[0].name]];
    V.innerHTML = '<div class="dtl"><div class="m">' + t.m + '</div><div class="big ' + (t.st === 'C' ? 'cancel' : '') + '">' + (t.st === 'C' ? '-' : '') + won(t.a) + '원</div></div><table class="kv">' +
      kv.map(function (x) { return '<tr><th>' + x[0] + '</th><td>' + x[1] + '</td></tr>'; }).join('') + '</table>';
  }

  var nav = 0;
  function route() {
    var h = (location.hash || '#/').split('/'), p = h[1] || '';
    window.scrollTo(0, 0);
    if (p === 'acct') h[2] ? vAcct(+h[2], h[3]) : vAcctList();
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

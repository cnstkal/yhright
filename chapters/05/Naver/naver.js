/* NAVER iOS 앱 - 2024년 하반기 기준 (4탭: 쇼핑 / 홈 / 콘텐츠 / 클립) */
(function () {
'use strict';
var D = window.ND, I = window.NI, ic = I.ic, sv = I.sv, th = I.thumb;
var app = document.getElementById('app');
var S = { tab: 'home', feed: '전체', feedN: 6, topic: '뉴스', shop: '추천', clip: 'rec', rtab: '통합', q: '' };
var recent = [];
try { recent = JSON.parse(sessionStorage.getItem('nvRecent24') || 'null') || D.recent.slice(); } catch (e) { recent = D.recent.slice(); }
function save() { try { sessionStorage.setItem('nvRecent24', JSON.stringify(recent)); } catch (e) {} }
function E(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function won(n) { return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); }
function tri(up) { return '<svg viewBox="0 0 10 10" width="9" height="9" aria-hidden="true"><path d="' + (up ? 'M5 1 9.500 9h-9z' : 'M5 9 .5 1h9z') + '" fill="currentColor"/></svg>'; }
function person(s) { return '<svg class="vi" viewBox="0 0 24 24" width="' + s + '" height="' + s + '" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="8.500" r="3.800"/><path d="M4.500 20a7.500 7.500 0 0 1 15 0"/></svg>'; }
function refreshBar() { setTimeout(function () { try { window.dispatchEvent(new Event('load')); } catch (e) {} }, 80); }

/* ───────── 뼈대 ───────── */
function build() {
  app.innerHTML =
    '<div id="view">' +
      '<section class="pg home on" id="pg-home"></section>' +
      '<section class="pg" id="pg-shop"></section>' +
      '<section class="pg" id="pg-content"></section>' +
      '<section class="pg clip" id="pg-clip"></section>' +
    '</div>' +
    '<nav class="tb" id="tb"></nav>' +
    '<div class="sp" id="sp"></div>' +
    '<div class="ov" id="ovv"></div><div class="ov dkc" id="ovl"></div>' +
    '<div class="dim" id="dim" data-a="close-sheet"></div><div class="sheet" id="sheet"></div>' +
    '<div class="fs" id="fs"></div>';
  renderTabs(); renderHome(); renderShop(); renderContent(); renderClip();
}
function renderTabs() {
  var T = [['shop', '쇼핑', 't_shop'], ['home', '홈', 't_home'], ['content', '콘텐츠', 't_content'], ['clip', '클립', 't_clip']];
  document.getElementById('tb').innerHTML = T.map(function (t) {
    return '<button class="' + (S.tab === t[0] ? 'on' : '') + '" data-a="tab" data-v="' + t[0] + '">' + ic(t[2], 26, 'currentColor', 1.6) + '<span>' + t[1] + '</span></button>';
  }).join('');
  app.classList.toggle('dk', S.tab === 'clip');
}
function setTab(t) {
  S.tab = t;
  ['home', 'shop', 'content', 'clip'].forEach(function (k) { document.getElementById('pg-' + k).classList.toggle('on', k === t); });
  renderTabs(); refreshBar();
  if (t !== 'clip') pauseAll(); else syncClip();
}

/* ───────── 검색창 (홈/쇼핑 공통) ───────── */
function searchBox(ph) {
  return '<div class="sbx" data-a="search">' +
    '<span class="lg">' + I.logoN(30) + '</span><span class="ph">' + ph + '</span>' +
    '<button class="ai" data-a="ai" aria-label="AI 검색">' + ic('ai', 18, '#fff') + 'AI</button>' +
    '<button class="bt" data-a="lens" aria-label="렌즈">' + ic('lens', 24, '#03C75A', 2) + '</button></div>';
}

/* ───────── 홈 ───────── */
function stockCard() {
  return '<div class="wc"><h3>' + ic('stock', 16, '#767678') + '증시</h3>' + D.stocks.map(function (s) {
    return '<div class="st"><span class="nm">' + s[0] + '</span><span class="pr">' + s[1] + '</span><span class="ch ' + (s[3] ? 'up' : 'dn') + '">' + tri(s[3]) + s[2].replace(/[+-]/, '') + '</span></div>';
  }).join('') + '</div>';
}
function weatherCard() {
  var w = D.weather;
  return '<div class="wc"><h3>' + ic('pin', 16, '#767678') + w.city + '</h3><div class="wx">' + ic(w.icon, 52, '#F5A623', 1.4) +
    '<div class="tp">' + w.temp + '°</div><div class="ds">' + w.desc + '<br>' + w.lo + '° / ' + w.hi + '°<br>미세먼지 ' + w.dust + '</div></div></div>';
}
function alertCard() {
  return '<div class="wc"><h3>' + ic('bell', 16, '#767678') + '날씨 알림</h3><div style="font-size:15px;line-height:1.5;font-weight:600">오후부터 기온이 내려가요.<br>가벼운 겉옷을 챙기세요.</div>' +
    '<div style="margin-top:12px"><span class="pill">' + ic('dust', 14, '#555') + '미세먼지 보통</span><span class="pill">' + ic('sun', 14, '#555') + '자외선 낮음</span></div></div>';
}
function feedItems() {
  var a = D.feed.filter(function (f) { return S.feed === '전체' || f.k === S.feed; });
  return a;
}
function card(f, w) {
  return '<div class="cd' + (w ? ' w' : '') + '" data-a="noop"><div class="im">' + th(f.n) + '<span class="bdg">' + E(f.k) + '</span></div><h4>' + E(f.t) + '</h4><p>' + E(f.s) + '</p></div>';
}
function feedHTML() {
  var a = feedItems(), shown = a.slice(0, S.feedN);
  if (!shown.length) return '<p style="padding:40px 16px;text-align:center;color:#767678">표시할 콘텐츠가 없어요</p>';
  var wide = shown[0], rest = shown.slice(1);
  var h = '<div class="g2">' + card(wide, true) + rest.slice(0, 4).map(function (f) { return card(f); }).join('') + '</div>';
  h += '<div class="theme"><h3>내 취향 테마</h3><div class="chips">' + D.themes.map(function (t) { return '<button class="chip" data-a="theme" data-v="' + t + '">' + ic('star', 14, '#03C75A', 2) + t + '</button>'; }).join('') + '</div></div>';
  if (rest.length > 4) h += '<div class="g2">' + rest.slice(4).map(function (f) { return card(f); }).join('') + '</div>';
  if (S.feedN < a.length) h += '<button class="more" data-a="more">콘텐츠 더보기</button>'; else h += '<div style="height:24px"></div>';
  return h;
}
function renderHome() {
  document.getElementById('pg-home').innerHTML =
    '<div class="top" id="htop">' + searchBox('검색어를 입력하세요') + '</div>' +
    '<div class="scroll" data-top="htop" id="hs">' +
      '<div class="gband"><div class="wb" id="wb">' + stockCard() + weatherCard() + alertCard() + '</div><div class="dots" id="wd"><i class="on"></i><i></i><i></i></div></div>' +
      '<div class="qs"><div class="qh"><b>자주 사용하는 서비스</b><button data-a="noop">편집</button></div><div class="qg">' +
        D.services.map(function (s) { return '<button class="qi" data-a="noop">' + sv(s[1], 46) + '<span>' + s[0] + '</span></button>'; }).join('') + '</div></div>' +
      '<div class="fh"><h2>홈피드</h2>' + ic('grid', 20, '#767678') + '</div>' +
      '<div class="chips">' + D.feedTabs.map(function (t) { return '<button class="chip' + (t === S.feed ? ' on' : '') + '" data-a="feed" data-v="' + t + '">' + t + '</button>'; }).join('') + '</div>' +
      '<div id="feedbox">' + feedHTML() + '</div>' +
    '</div>';
}

/* ───────── 쇼핑 ───────── */
function product(p, i) {
  var og = Math.round(p.p / (1 - p.d / 100) / 100) * 100;
  return '<div class="pd" data-a="noop"><div class="im">' + th(i + 3) + '</div><div class="nm">' + E(p.n) + '</div>' +
    '<div class="pc"><span class="dc">' + p.d + '%</span><span class="pv">' + won(p.p) + '원</span></div><div class="og">' + won(og) + '원</div>' +
    '<div class="mt">' + ic('star', 12, '#FFB800', 1.4).replace('fill="none"', 'fill="#FFB800"') + p.r + ' (' + p.c + ')</div><span class="tg">' + p.b + '</span></div>';
}
function renderShop() {
  document.getElementById('pg-shop').innerHTML =
    '<div class="top" id="stop">' + searchBox('쇼핑 검색') + '</div>' +
    '<div class="subtab">' + D.shopTabs.map(function (t) { return '<button class="' + (t === S.shop ? 'on' : '') + '" data-a="shoptab" data-v="' + t + '">' + t + '</button>'; }).join('') + '</div>' +
    '<div class="scroll" data-top="stop">' +
      '<div class="cat">' + D.shopCats.map(function (c) { return '<button class="qi" data-a="noop"><i class="sv" style="width:52px;height:52px;background:#F4F5F7;color:#333">' + ic(c[1], 26, 'currentColor', 1.6) + '</i><span>' + c[0] + '</span></button>'; }).join('') + '</div>' +
      '<div class="ban"><div><p>' + S.shop + ' 특가</p><h3>오늘만 이 가격<br>가을 맞이 쇼핑 혜택</h3></div>' + ic('gift', 56, '#03C75A', 1.3) + '</div>' +
      '<div class="fyh"><h2><span>FOR YOU</span> 맞춤 추천</h2><i>나의 관심 기반</i></div>' +
      '<div class="fy">' + D.forYou.map(product).join('') + '</div>' +
      '<div class="fyh"><h2>지금 많이 찾는 상품</h2></div>' +
      '<div class="pg2">' + D.forYou.slice().reverse().slice(0, 4).map(product).join('') + '</div>' +
      '<div class="fyh"><h2>쇼핑 콘텐츠</h2></div>' +
      '<div class="g2" style="padding-bottom:24px">' + D.shopContents.map(function (c) { return '<div class="cd" data-a="noop"><div class="im">' + th(c.n) + '</div><h4>' + E(c.t) + '</h4><p>' + E(c.s) + '</p></div>'; }).join('') + '</div>' +
    '</div>';
}

/* ───────── 콘텐츠 ───────── */
function renderContent() {
  var list = D.topicFeed[S.topic], first = list[0];
  var extra = '';
  if (S.topic === '헬스') {
    extra = '<div class="pdm"><svg class="vi" viewBox="0 0 64 64" width="68" height="68" aria-hidden="true"><circle cx="32" cy="32" r="26" fill="none" stroke="#D5EFDF" stroke-width="7"/><circle cx="32" cy="32" r="26" fill="none" stroke="#03C75A" stroke-width="7" stroke-linecap="round" stroke-dasharray="131 163" transform="rotate(-90 32 32)"/></svg>' +
      '<div><h3>오늘 걸음 수</h3><div class="n">6,412<small> / 8,000걸음</small></div></div></div>';
  } else if (S.topic === '게임') {
    extra = '<div class="pdm" style="background:#F4F1FF"><i class="sv" style="width:52px;height:52px;background:#E6DEFF;color:#7A4DE8">' + ic('trophy', 26, 'currentColor') + '</i><div><span class="lv"><i></i>LIVE</span><div style="font-weight:700;margin-top:6px;font-size:15px">e스포츠 결승전 생중계</div></div></div>';
  }
  document.getElementById('pg-content').innerHTML =
    '<div class="top white" id="ctop2"><div class="hrow" style="margin:0">' + I.wordmark(18, '#03C75A') +
      '<div class="r"><button class="ib" data-a="search" aria-label="검색">' + ic('search', 24, '#1E1E23', 2) + '</button><button class="ib" data-a="noop" aria-label="알림">' + ic('bell', 24, '#1E1E23', 1.8) + '</button></div></div></div>' +
    '<div class="ttab">' + D.topics.map(function (t) { return '<button class="' + (t[0] === S.topic ? 'on' : '') + '" data-a="topic" data-v="' + t[0] + '">' + t[0] + '</button>'; }).join('') + '</div>' +
    '<div class="scroll" data-top="ctop2">' + extra +
      '<div class="hl"><div class="im">' + th(S.topic.length * 3 + 1) + '</div><h3>' + E(first[0]) + '</h3><p>' + E(first[1]) + '</p></div>' +
      list.slice(1).map(function (a, i) { return '<div class="li" data-a="noop"><div><h4>' + E(a[0]) + '</h4><p>' + E(a[1]) + '</p></div><span class="tm">' + th(i + S.topic.length) + '</span></div>'; }).join('') +
      '<div style="height:30px"></div></div>';
}

/* ───────── 클립 ───────── */
function clipList() { var c = D.clips.slice(); return S.clip === 'pop' ? c.reverse() : c; }
function slide(c, i) {
  var tags = c.tag.map(function (t) { return '<span class="tg2">' + ic(t[0], 14, '#fff', 2) + t[1] + '</span>'; }).join('');
  return '<div class="cl" data-i="' + i + '"><div class="cv' + (c.h ? ' hz' : '') + '" data-a="pz">' + th(c.n + 2) + '</div>' +
    (S.clip === 'pop' ? '<span class="rk">' + ic('flame', 14, '#fff', 2) + '인기 ' + (i + 1) + '위</span>' : '') +
    '<div class="pl">' + ic('play', 30, '#fff') + '</div>' +
    (c.h ? '<button class="fsb" data-a="fs" data-v="' + i + '">' + ic('expand', 14, '#fff', 2) + '가로 전체 화면</button>' : '') +
    '<div class="rail"><button data-a="like">' + ic('heart', 30, '#fff', 1.8) + '<span>' + c.like + '</span></button>' +
      '<button data-a="cmt" data-v="' + i + '">' + ic('chat', 30, '#fff', 1.8) + '<span>' + c.cmt + '</span></button>' +
      '<button data-a="noop">' + ic('share', 28, '#fff', 1.8) + '<span>공유</span></button>' +
      '<button data-a="noop">' + ic('more', 26, '#fff') + '</button></div>' +
    '<div class="cinfo"><div class="cu" data-a="prof" data-v="' + i + '"><span class="av">' + th(c.n + 6) + '</span>' + E(c.u) + '<button class="fo" data-a="noop">팔로우</button></div>' +
      '<h3>' + E(c.t) + '</h3><div class="tags">' + tags + '</div></div>' +
    '<div class="prog"><i></i></div></div>';
}
function renderClip() {
  var L = clipList();
  document.getElementById('pg-clip').innerHTML =
    '<div class="ctop"><span style="width:44px"></span><div class="tabs"><button class="' + (S.clip === 'rec' ? 'on' : '') + '" data-a="cliptab" data-v="rec">추천</button><button class="' + (S.clip === 'pop' ? 'on' : '') + '" data-a="cliptab" data-v="pop">인기</button></div>' +
    '<button class="ib" data-a="search" aria-label="검색">' + ic('search', 24, '#fff', 2) + '</button></div>' +
    '<div class="cf" id="cf">' + L.map(slide).join('') + '</div>';
  if (S.tab === 'clip') syncClip(); else pauseAll();
}
function syncClip() { var f = document.getElementById('cf'); if (!f || !f.clientHeight) return; var i = Math.round(f.scrollTop / f.clientHeight), n = f.children; for (var k = 0; k < n.length; k++) n[k].classList.toggle('pz', k !== i); }
function pauseAll() { var n = document.querySelectorAll('.cl'); for (var i = 0; i < n.length; i++) n[i].classList.add('pz'); }

/* ───────── 시트 ───────── */
function openSheet(h) { document.getElementById('sheet').innerHTML = '<div class="hd"></div>' + h; document.getElementById('sheet').classList.add('on'); document.getElementById('dim').classList.add('on'); }
function closeSheet() { document.getElementById('sheet').classList.remove('on'); document.getElementById('dim').classList.remove('on'); }
function commentSheet(i) {
  var c = clipList()[i], names = ['maru', '하늘이', 'coffee_j', '여행자'], msgs = ['영상 너무 유용해요', '저장해두고 따라 해볼게요', '정보 태그 덕분에 찾기 편해요', '다음 영상도 기대할게요'];
  openSheet('<div style="padding:0 20px 10px;font-weight:700;font-size:16px">댓글 ' + c.cmt + '</div><div class="cmts">' + names.map(function (n, k) { return '<div class="it"><i>' + person(18) + '</i><div><b>' + n + '</b>' + msgs[k] + '</div></div>'; }).join('') + '</div>');
}
function profileSheet(i) {
  var c = clipList()[i];
  openSheet('<div class="prf"><span class="av">' + th(c.n + 6) + '</span><div><b>' + E(c.u) + '</b><p>팔로워 1.2만 · 클립 ' + (c.pl.length * 6) + '개</p></div></div>' +
    '<div style="padding:4px 20px 6px;font-weight:700">재생목록</div>' +
    c.pl.map(function (p, k) { return '<div class="pli"><span class="tm">' + th(c.n + k + 1) + '</span><div><h5>' + E(p) + '</h5><p>' + ic('list', 12, '#767678', 2).replace('class="vi"', 'class="vi" style="display:inline;vertical-align:-2px"') + ' 클립 ' + (4 + k * 3) + '개</p></div></div>'; }).join(''));
}
function aiSheet() {
  var q = S.q || '검색어';
  openSheet('<div style="padding:0 20px 6px;display:flex;align-items:center;gap:6px;font-weight:700;font-size:17px;color:#087F6C">' + ic('ai', 20, '#087F6C') + 'AI 검색</div>' +
    '<div class="aib"><b>샘플 요약</b>\'' + E(q) + '\' 관련 블로그, 카페, 뉴스 문서를 모아 핵심만 정리해 보여주는 화면이에요. 실제 AI 응답이 아닌 데모 문구입니다.</div>' +
    '<div class="chips" style="padding:0 20px">' + ['관련 추천', '후기 모아보기', '가격 비교'].map(function (t) { return '<button class="chip" data-a="submit" data-v="' + E(q + ' ' + t) + '">' + t + '</button>'; }).join('') + '</div>');
}

/* ───────── 검색 ───────── */
var sp = document.getElementById('sp');
function sbar(val) {
  return '<div class="sph"><button class="bk" data-a="sclose" aria-label="뒤로">' + ic('back', 24, '#1E1E23', 2) + '</button>' +
    '<div class="sin"><input id="qi" type="text" value="' + E(val) + '" placeholder="검색어를 입력하세요" autocomplete="off"><button id="qx" data-a="qclear" aria-label="지우기" style="' + (val ? '' : 'display:none') + '">' + ic('close', 18, '#8b8b90', 2) + '</button>' +
    '<button data-a="voice" aria-label="음성 검색" style="color:#03C75A">' + ic('mic', 22, '#03C75A', 2) + '</button><button data-a="lens" aria-label="렌즈" style="color:#03C75A">' + ic('lens', 22, '#03C75A', 2) + '</button></div></div>';
}
function openSearch(q) {
  S.q = q || ''; sp = document.getElementById('sp');
  sp.classList.add('on'); showSearchHome();
  refreshBar();
}
function toolsRow() {
  return '<div class="tools"><button class="tl" data-a="voice">' + ic('mic', 18, '#03C75A', 2) + '음성 검색</button><button class="tl" data-a="lens">' + ic('lens', 18, '#03C75A', 2) + '렌즈</button><button class="tl ai" data-a="ai">' + ic('ai', 18, '#fff') + 'AI 검색</button></div>';
}
function listRows() {
  var v = (document.getElementById('qi') || {}).value || '';
  if (v.trim()) {
    return ['', ' 날씨', ' 추천', ' 후기', ' 가격'].map(function (s) { return '<div class="rs" data-a="submit" data-v="' + E(v + s) + '"><span class="ci">' + ic('search', 18, '#8b8b90', 2) + '</span><span>' + E(v + s) + '</span></div>'; }).join('');
  }
  var h = '<div class="sh2"><b>최근 검색어</b><button data-a="clearall">전체삭제</button></div>';
  h += recent.length ? recent.map(function (r, i) {
    return '<div class="rs" data-a="submit" data-v="' + E(r) + '"><span class="ci">' + ic('clock', 18, '#8b8b90', 1.8) + '</span><span>' + E(r) + '</span><button class="xx" data-a="delr" data-v="' + i + '" aria-label="삭제">' + ic('close', 16, '#b0b0b6', 2) + '</button></div>';
  }).join('') : '<p style="padding:14px 16px;color:#767678;font-size:13px">최근 검색어가 없어요</p>';
  h += '<div class="sh2"><b>추천 검색어</b><span style="font-size:12px;color:#9a9aa0">나의 관심 기반</span></div>';
  h += D.suggest.map(function (r) { return '<div class="rs" data-a="submit" data-v="' + E(r) + '"><span class="ci">' + ic('search', 18, '#8b8b90', 2) + '</span><span>' + E(r) + '</span></div>'; }).join('');
  return h;
}
function showSearchHome() {
  sp.innerHTML = sbar(S.q) + toolsRow() + '<div class="scroll" id="sbody">' + listRows() + '</div>';
  var qi = document.getElementById('qi');
  qi.addEventListener('input', function () { document.getElementById('qx').style.display = qi.value ? '' : 'none'; document.getElementById('sbody').innerHTML = listRows(); });
  qi.addEventListener('keydown', function (e) { if (e.key === 'Enter' && qi.value.trim()) submit(qi.value.trim()); });
  setTimeout(function () { try { qi.focus(); } catch (e) {} }, 60);
}
function resultBody(t, q) {
  var Q = E(q), ps = [0, 1, 2, 3].map(function (i) { return D.forYou[i]; });
  function posts(n) { return D.feed.slice(0, n || 5).map(function (f, i) { return '<div class="ri"><div><h4>' + Q + ' ' + E(f.t) + '</h4><p>' + E(f.s) + ' · ' + (i + 1) + '일 전</p></div><span class="tm">' + th(f.n) + '</span></div>'; }).join(''); }
  function prods() { return '<div class="pg2" style="padding:0">' + ps.map(product).join('') + '</div>'; }
  function news() { return D.topicFeed['뉴스'].slice(0, 4).map(function (n, i) { return '<div class="ri"><div><h4>' + Q + ' ' + E(n[0]) + '</h4><p>' + E(n[1]) + '</p></div><span class="tm">' + th(i + 2) + '</span></div>'; }).join(''); }
  if (t === 'VIEW' || t === '인플루언서' || t === '지도') return '<div class="rsec">' + posts() + '</div>';
  if (t === '이미지') return '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:2px">' + [0, 1, 2, 3, 4, 5, 6, 7, 8].map(function (i) { return '<div style="aspect-ratio:1">' + th(i) + '</div>'; }).join('') + '</div>';
  if (t === '지식iN') return '<div class="rsec">' + [0, 1, 2].map(function (i) { return '<div class="ri"><div><h4>Q. ' + Q + ' 어떻게 하면 좋을까요?</h4><p>답변 ' + (i + 2) + '개 · 조회 ' + (i + 1) + ',2' + i + '3</p></div></div>'; }).join('') + '</div>';
  if (t === '쇼핑') return '<div class="rsec">' + prods() + '</div>';
  if (t === '뉴스') return '<div class="rsec">' + news() + '</div>';
  return '<div class="rsec"><h3>VIEW</h3>' + posts(3) + '</div>' +
    '<div class="rsec"><h3>쇼핑 <span class="sml">' + Q + ' 관련 상품</span></h3>' + prods() + '</div>' +
    '<div class="rsec"><h3>지식iN</h3><div class="ri"><div><h4>Q. ' + Q + ' 질문드려요</h4><p>답변 3개</p></div></div></div>' +
    '<div class="rsec"><h3>뉴스</h3>' + news() + '</div>';
}
function showResult() {
  sp.innerHTML = sbar(S.q) + '<div class="rtabs">' + D.tabsResult.map(function (t) { return '<button class="' + (t === S.rtab ? 'on' : '') + '" data-a="rtab" data-v="' + t + '">' + t + '</button>'; }).join('') + '</div>' +
    '<div class="scroll">' + resultBody(S.rtab, S.q) + '</div>';
  var qi = document.getElementById('qi');
  qi.addEventListener('keydown', function (e) { if (e.key === 'Enter' && qi.value.trim()) submit(qi.value.trim()); });
  qi.addEventListener('focus', function () { S.q = qi.value; showSearchHome(); });
}
function submit(q) {
  closeSheet(); document.getElementById('ovv').classList.remove('on'); document.getElementById('ovl').classList.remove('on');
  S.q = q; S.rtab = '통합';
  recent = [q].concat(recent.filter(function (r) { return r !== q; })).slice(0, 10); save();
  sp.classList.add('on'); showResult(); refreshBar();
}
function closeSearch() { sp.classList.remove('on'); sp.innerHTML = ''; refreshBar(); }

/* 음성 / 렌즈 */
var vt = 0;
function openVoice() {
  var o = document.getElementById('ovv');
  o.innerHTML = '<button class="cl2" data-a="vclose" aria-label="닫기">' + ic('close', 26, '#1E1E23', 2) + '</button><div class="mc">' + ic('mic', 44, '#fff', 2) + '</div><h3>말씀해 주세요</h3><p>예: 주말 날씨, 가까운 카페</p>';
  o.classList.add('on'); clearTimeout(vt);
  vt = setTimeout(function () { if (o.classList.contains('on')) { o.classList.remove('on'); submit('주말 날씨'); } }, 2600);
}
function openLens() {
  var o = document.getElementById('ovl');
  o.innerHTML = '<button class="cl2" data-a="lclose" aria-label="닫기">' + ic('close', 26, '#fff', 2) + '</button><div class="vf"><i></i><i></i><i></i><i></i></div>' +
    '<div class="lm"><span class="on">검색</span><span>쇼핑</span><span>번역</span><span>문제풀이</span></div><button class="sh3" data-a="shutter" aria-label="촬영"><i></i></button>';
  o.classList.add('on');
}

/* 가로 전체 화면 */
function openFS(i) {
  var c = clipList()[i], f = document.getElementById('fs'), W = app.clientWidth, H = app.clientHeight;
  f.style.width = H + 'px'; f.style.height = W + 'px'; f.style.left = W + 'px';
  f.innerHTML = '<div class="cv">' + th(c.n + 2) + '</div><button class="x" data-a="fsclose" aria-label="닫기">' + ic('close', 22, '#fff', 2) + '</button><div class="tt">' + E(c.t) + '</div>' +
    '<div class="ct">' + ic('pause', 22, '#fff') + '<div class="bar"><i></i></div></div>';
  f.classList.add('on');
}

/* ───────── 이벤트 ───────── */
document.addEventListener('click', function (e) {
  var t = e.target.closest('[data-a]'); if (!t) return;
  var a = t.getAttribute('data-a'), v = t.getAttribute('data-v');
  if (a === 'delr') { e.stopPropagation(); recent.splice(+v, 1); save(); document.getElementById('sbody').innerHTML = listRows(); return; }
  switch (a) {
    case 'tab': setTab(v); break;
    case 'search': case 'lens-search': openSearch(''); break;
    case 'ai': e.stopPropagation(); aiSheet(); break;
    case 'lens': e.stopPropagation(); openLens(); break;
    case 'voice': openVoice(); break;
    case 'vclose': clearTimeout(vt); document.getElementById('ovv').classList.remove('on'); break;
    case 'lclose': document.getElementById('ovl').classList.remove('on'); break;
    case 'shutter': document.getElementById('ovl').classList.remove('on'); submit('가을 코디'); break;
    case 'sclose': closeSearch(); break;
    case 'qclear': S.q = ''; showSearchHome(); break;
    case 'clearall': recent = []; save(); document.getElementById('sbody').innerHTML = listRows(); break;
    case 'submit': submit(v); break;
    case 'rtab': S.rtab = v; showResult(); break;
    case 'feed': S.feed = v; S.feedN = 6; renderHome(); break;
    case 'more': S.feedN += 4; document.getElementById('feedbox').innerHTML = feedHTML(); break;
    case 'theme': S.feed = '전체'; submit(v); break;
    case 'shoptab': S.shop = v; renderShop(); break;
    case 'topic': S.topic = v; renderContent(); break;
    case 'cliptab': S.clip = v; renderClip(); break;
    case 'pz': t.closest('.cl').classList.toggle('pz'); break;
    case 'like': t.classList.toggle('on'); break;
    case 'cmt': commentSheet(+v); break;
    case 'prof': profileSheet(+v); break;
    case 'fs': openFS(+v); break;
    case 'fsclose': document.getElementById('fs').classList.remove('on'); break;
    case 'close-sheet': closeSheet(); break;
  }
});
/* 피드 스크롤에 반응하는 검색창 (2024.7) */
document.addEventListener('scroll', function (e) {
  var s = e.target; if (!s.getAttribute || !s.getAttribute('data-top')) return;
  var top = document.getElementById(s.getAttribute('data-top'));
  if (top) top.classList.toggle('cp', s.scrollTop > 12);
}, true);
document.addEventListener('scroll', function (e) {
  if (e.target.id !== 'wb') return;
  var w = e.target, i = Math.round(w.scrollLeft / (w.clientWidth - 34)), d = document.querySelectorAll('#wd i');
  for (var k = 0; k < d.length; k++) d[k].classList.toggle('on', k === i);
}, true);
/* 클립: 화면에 보이는 영상만 재생 */
document.addEventListener('scroll', function (e) {
  if (e.target.id !== 'cf') return;
  var f = e.target, i = Math.round(f.scrollTop / f.clientHeight), n = f.children;
  for (var k = 0; k < n.length; k++) n[k].classList.toggle('pz', k !== i);
}, true);

build();
})();

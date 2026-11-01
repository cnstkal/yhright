'use strict';
(() => {
const TZ = 'Asia/Seoul';
const WD = ['일', '월', '화', '수', '목', '금', '토'];
const HH = 56; // hour height
const TOP = 12; // grid top padding
const pad = n => String(n).padStart(2, '0');
const $ = s => document.querySelector(s);
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/* ---------- date helpers (all KST, string based) ---------- */
function kstNow() {
  const p = {};
  new Intl.DateTimeFormat('en-GB', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })
    .formatToParts(new Date()).forEach(x => { if (x.type !== 'literal') p[x.type] = x.value; });
  return { key: `${p.year}-${p.month}-${p.day}`, h: +p.hour, mi: +p.minute };
}
const today = () => kstNow().key;
const key = (y, m, d) => `${y}-${pad(m + 1)}-${pad(d)}`;
function parseKey(k) { const [y, m, d] = k.split('-').map(Number); return { y, m: m - 1, d }; }
function addDays(k, n) { const { y, m, d } = parseKey(k); const dt = new Date(Date.UTC(y, m, d + n)); return key(dt.getUTCFullYear(), dt.getUTCMonth(), dt.getUTCDate()); }
function dow(k) { const { y, m, d } = parseKey(k); return new Date(Date.UTC(y, m, d)).getUTCDay(); }
const monIdx = k => (dow(k) + 6) % 7;
const dim = (y, m) => new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
function addMonths(k, n) { const { y, m, d } = parseKey(k); const t = y * 12 + m + n; const ny = Math.floor(t / 12), nm = t - ny * 12; return key(ny, nm, Math.min(d, dim(ny, nm))); }
const weekStart = k => addDays(k, -monIdx(k));
function fmtLong(k) { const { y, m, d } = parseKey(k); return `${y}년 ${m + 1}월 ${d}일 ${WD[dow(k)]}요일`; }
function fmtShort(k) { const { m, d } = parseKey(k); return `${m + 1}월 ${d}일 ${WD[dow(k)]}요일`; }
function fmtTime(t) { const [h, mi] = t.split(':').map(Number); return `${h < 12 ? '오전' : '오후'} ${h % 12 || 12}:${pad(mi)}`; }
const toMin = t => { const [h, m] = t.split(':').map(Number); return h * 60 + m; };
const fromMin = n => `${pad(Math.floor(n / 60))}:${pad(n % 60)}`;
function absMin(k, t) { const { y, m, d } = parseKey(k); return Date.UTC(y, m, d) / 86400000 * 1440 + toMin(t); }
function fromAbs(a) { const days = Math.floor(a / 1440); const mi = a - days * 1440; const dt = new Date(days * 86400000); return { k: key(dt.getUTCFullYear(), dt.getUTCMonth(), dt.getUTCDate()), t: fromMin(mi) }; }

/* ---------- holidays (Korea) ---------- */
const FIXED = { '01-01': '신정', '03-01': '삼일절', '05-01': '노동절', '05-05': '어린이날', '06-06': '현충일', '07-17': '제헌절', '08-15': '광복절', '10-03': '개천절', '10-09': '한글날', '12-25': '성탄절' };
const EXTRA = {
  2024: { '02-09': '설날', '02-10': '설날', '02-11': '설날', '02-12': '설날', '04-10': '국회의원 선거', '05-06': '어린이날', '05-15': '부처님오신날', '09-16': '추석', '09-17': '추석', '09-18': '추석', '10-01': '국군의 날' },
  2025: { '01-27': '임시공휴일', '01-28': '설날', '01-29': '설날', '01-30': '설날', '03-03': '삼일절', '05-06': '부처님오신날', '06-03': '대통령 선거', '10-05': '추석', '10-06': '추석', '10-07': '추석', '10-08': '추석' },
  2026: { '02-16': '설날 연휴', '02-17': '설날', '02-18': '설날 연휴', '03-02': '삼일절 대체공휴일', '05-24': '부처님오신날', '05-25': '부처님오신날 대체공휴일', '06-03': '전국동시지방선거', '08-17': '광복절 대체공휴일', '09-24': '추석 연휴', '09-25': '추석', '09-26': '추석 연휴', '10-05': '개천절 대체공휴일' },
  2027: { '02-06': '설날 연휴', '02-07': '설날', '02-08': '설날 연휴', '02-09': '설날 대체공휴일', '05-03': '노동절 대체공휴일', '05-13': '부처님오신날', '07-19': '제헌절 대체공휴일', '08-16': '광복절 대체공휴일', '09-14': '추석 연휴', '09-15': '추석', '09-16': '추석 연휴', '10-04': '개천절 대체공휴일', '10-11': '한글날 대체공휴일', '12-27': '성탄절 대체공휴일' }
};
function holiday(k) { const { y } = parseKey(k); const md = k.slice(5); return (EXTRA[y] && EXTRA[y][md]) || FIXED[md] || null; }

/* ---------- state & storage ---------- */
const LS = 'ioscal.v1';
const COLORS = ['#55aaef', '#ff9f0a', '#34c759', '#af52de', '#ff6482', '#8e8e93', '#ac8e68'];
const S = { view: 'month', prev: 'month', sel: today(), sheet: null, events: [], cals: [], hidden: [], fired: {}, dayTop: null };
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

function seed() {
  S.cals = [{ id: 'c1', name: '캘린더', color: '#55aaef' }, { id: 'c2', name: '집', color: '#ff9f0a' }, { id: 'c3', name: '업무', color: '#34c759' }];
  S.events = [
    { id: uid(), title: '8주년', loc: '', notes: '', allDay: true, sd: '2026-10-24', st: '09:00', ed: '2026-10-24', et: '10:00', cal: 'c1', alert: 'none' }
  ];
  S.hidden = [];
}
function load() {
  try {
    const d = JSON.parse(localStorage.getItem(LS));
    if (d && Array.isArray(d.events) && Array.isArray(d.cals) && d.cals.length) { S.events = d.events; S.cals = d.cals; S.hidden = d.hidden || []; S.fired = d.fired || {}; return; }
  } catch (e) { /* ignore */ }
  seed(); save();
}
function save() {
  try { localStorage.setItem(LS, JSON.stringify({ events: S.events, cals: S.cals, hidden: S.hidden, fired: S.fired })); } catch (e) { /* storage unavailable */ }
}
const calOf = id => S.cals.find(c => c.id === id) || S.cals[0];
const isVis = e => !S.hidden.includes(calOf(e.cal).id);
function effEnd(e) { let ek = e.ed; if (!e.allDay && e.et === '00:00' && ek > e.sd) ek = addDays(ek, -1); return ek; }
function eventsOn(k) {
  return S.events.filter(e => isVis(e) && e.sd <= k && k <= effEnd(e))
    .sort((a, b) => (b.allDay - a.allDay) || a.st.localeCompare(b.st) || a.title.localeCompare(b.title));
}
const isMulti = e => e.sd !== effEnd(e);

/* ---------- colors ---------- */
function rgba(hex, a) { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})`; }
function dark(hex, f = .5) { const n = parseInt(hex.slice(1), 16); const c = v => Math.round(v * (1 - f)); return `rgb(${c(n >> 16)},${c((n >> 8) & 255)},${c(n & 255)})`; }
const HOL = '#af52de';

/* ---------- icons ---------- */
const ic = {
  back: '<svg viewBox="0 0 24 24" fill="none" stroke="#111" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M15 4.5 7.5 12l7.5 7.5"/></svg>',
  search: '<svg viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="6.8"/><path d="m15.6 15.6 5.4 5.4"/></svg>',
  plus: '<svg viewBox="0 0 24 24"><path d="M12 3.5v17M3.5 12h17"/></svg>',
  x: '<svg viewBox="0 0 24 24"><path d="M5 5l14 14M19 5 5 19"/></svg>',
  listM: '<svg viewBox="0 0 24 24"><rect x="3.5" y="3.5" width="17" height="7.5" rx="2.6"/><rect x="3.5" y="13" width="17" height="7.5" rx="2.6"/><path d="M7 7.3h6M7 16.8h6"/></svg>',
  listD: '<svg viewBox="0 0 24 24"><rect x="7" y="3.5" width="14" height="17" rx="3"/><path d="M7 8h14M7 16h14"/><path d="M3 5v.01M3 8.5v.01M3 12v.01M3 15.5v.01M3 19v.01" stroke-width="2.4"/></svg>',
  cal: '<svg viewBox="0 0 24 24" fill="none" stroke="#111" stroke-width="2.2"><rect x="3" y="3" width="18" height="18" rx="3.6"/><path d="M3.5 3.5h17v5h-17z" fill="#111"/><g stroke-width="1.6" stroke-linecap="round" stroke="#111"><path d="M7 12v.01M10 12v.01M13 12v.01M16 12v.01M7 15v.01M10 15v.01M13 15v.01M16 15v.01M7 18v.01M10 18v.01M13 18v.01M16 18v.01"/></g></svg>',
  inbox: '<svg viewBox="0 0 24 24"><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>',
  bell: '<svg class="l" viewBox="0 0 24 24"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>',
  calL: '<svg class="l" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="17" rx="3"/><path d="M3 9h18" stroke-width="3"/><path d="M7 13v.01M10 13v.01M13 13v.01M16 13v.01M7 16.5v.01M10 16.5v.01M13 16.5v.01M16 16.5v.01" stroke-width="1.8"/></svg>',
  ud: '<svg viewBox="0 0 24 24"><path d="m8 9 4-4 4 4M8 15l4 4 4-4"/></svg>',
  star: '<svg viewBox="0 0 24 24"><path d="m12 2.8 2.7 5.8 6.3.8-4.6 4.3 1.2 6.3L12 17l-5.6 3 1.2-6.3L3 9.4l6.3-.8z"/></svg>',
  mini: '<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="17" rx="3" stroke="#fff"/><path d="M3 9h18" stroke="#fff" stroke-width="3"/><path d="M7 13.5h2M11 13.5h2M15 13.5h2M7 17h2M11 17h2" stroke="#fff" stroke-width="2"/></svg>',
  check: '<svg viewBox="0 0 24 24"><path d="m5 12.5 4.5 4.5L19 7"/></svg>'
};
const ALERTS = [['none', '없음'], ['0', '이벤트 시각'], ['5', '5분 전'], ['15', '15분 전'], ['30', '30분 전'], ['60', '1시간 전'], ['120', '2시간 전'], ['1440', '1일 전']];
const alertName = v => (ALERTS.find(a => a[0] === v) || ALERTS[0])[1];

/* ---------- common chrome ---------- */
const grp = (toggleIcon) => `<div class="pill grp">${toggleIcon ? `<button class="ibtn" data-act="toList" aria-label="목록 보기">${toggleIcon}</button>` : ''}<button class="ibtn" data-act="search" aria-label="검색">${ic.search}</button><button class="ibtn" data-act="add" aria-label="일정 추가">${ic.plus}</button></div>`;
const backBtn = (act, label) => `<button class="pill back" data-act="${act}">${ic.back}<span>${label}</span></button>`;
function bottomBar() {
  return `<div class="bbar"><button class="pill today" data-act="today">오늘</button><div class="pill"><button class="ibtn" data-act="cals" aria-label="캘린더">${ic.cal}</button><button class="ibtn" data-act="inbox" aria-label="받은 편지함">${ic.inbox}</button></div></div>`;
}

/* ---------- chips ---------- */
function chipHTML(e) {
  const c = calOf(e.cal).color;
  const icon = (e.allDay || isMulti(e)) ? `<i class="ci" style="background:${c}">${ic.mini}</i>` : `<i class="dot" style="background:${c}"></i>`;
  return `<div class="chip" style="background:${rgba(c, .28)};color:${dark(c)}">${icon}<span>${esc(e.title)}</span></div>`;
}
function chipsFor(k) {
  let h = '';
  const hn = holiday(k);
  if (hn && !S.hidden.includes('holiday')) h += `<div class="chip" style="background:${rgba(HOL, .2)};color:#8944ab"><i class="ci" style="background:${HOL}">${ic.star}</i><span>${esc(hn)}</span></div>`;
  eventsOn(k).forEach(e => { h += chipHTML(e); });
  return h;
}

/* ---------- views ---------- */
function viewMonth() {
  const { y, m } = parseKey(S.sel);
  const lead = monIdx(key(y, m, 1)), n = dim(y, m), rows = Math.ceil((lead + n) / 7), t = today();
  let cells = '';
  for (let i = 0; i < rows * 7; i++) {
    const d = i - lead + 1;
    if (d < 1 || d > n) { cells += '<div class="cell"></div>'; continue; }
    const k = key(y, m, d);
    const cls = 'num' + (k === t ? ' today' : k === S.sel ? ' sel' : '') + (i % 7 >= 5 ? ' wke' : '');
    cells += `<div class="cell" data-act="pickDay" data-k="${k}"><div class="${cls}">${d}</div><div class="chips">${chipsFor(k)}</div></div>`;
  }
  return `<div class="screen"><div class="topbar">${backBtn('toYear', y + '년')}${grp(ic.listM)}</div>
    <div class="mtitle">${m + 1}월</div>
    <div class="wkhead">${'월화수목금토일'.split('').map((w, i) => `<span class="${i > 4 ? 'w' : ''}">${w}</span>`).join('')}</div>
    <div class="mgrid" style="grid-template-rows:repeat(${rows},1fr)">${cells}</div></div>${bottomBar()}`;
}

function viewYear() {
  const { y } = parseKey(S.sel), sm = parseKey(S.sel).m, t = today();
  let months = '';
  for (let m = 0; m < 12; m++) {
    const lead = monIdx(key(y, m, 1)), n = dim(y, m);
    let g = '<span></span>'.repeat(lead);
    for (let d = 1; d <= n; d++) {
      const k = key(y, m, d);
      g += `<span class="${k === t ? 't' : k === S.sel ? 's' : ''}">${d}</span>`;
    }
    months += `<div class="mm" data-act="pickMonth" data-y="${y}" data-m="${m}"><div class="mname${m === sm ? ' red' : ''}">${m + 1}월</div><div class="mg">${g}</div></div>`;
  }
  return `<div class="screen"><div class="topbar"><span></span>${grp()}</div><div class="ytitle">${y}년</div><div class="yscroll">${months}</div></div>${bottomBar()}`;
}

function hourLabel(h) {
  if (h === 0) return '<div class="hlab noon">자정</div>';
  if (h === 12) return '<div class="hlab noon">정오</div>';
  const ap = h < 12 ? '오전' : '오후', n = h % 12;
  return `<div class="hlab"><small>${ap}</small><b>${n}</b><em>시</em></div>`;
}
function layoutDay(k) {
  const items = [];
  eventsOn(k).filter(e => !e.allDay).forEach(e => {
    let s = e.sd === k ? toMin(e.st) : 0, en = effEnd(e) === k ? (e.ed === k ? toMin(e.et) : 1440) : 1440;
    if (en <= s) en = Math.min(1440, s + 30);
    items.push({ e, s, en, ee: Math.max(en, s + 30) });
  });
  items.sort((a, b) => a.s - b.s || b.ee - a.ee);
  const res = []; let cluster = [], cEnd = -1;
  const flush = () => {
    const cols = [];
    cluster.forEach(it => { let c = 0; while (cols[c] !== undefined && cols[c] > it.s) c++; cols[c] = it.ee; it.col = c; });
    cluster.forEach(it => { it.n = cols.length; }); res.push(...cluster); cluster = []; cEnd = -1;
  };
  items.forEach(it => { if (cluster.length && it.s >= cEnd) flush(); cluster.push(it); cEnd = Math.max(cEnd, it.ee); });
  if (cluster.length) flush();
  return res;
}
function viewDay() {
  const k = S.sel, { m } = parseKey(k), t = today(), ws = weekStart(k);
  let strip = '';
  for (let i = 0; i < 7; i++) {
    const d = addDays(ws, i), cls = 'dn' + (d === t ? ' today' : d === k ? ' sel' : '') + (i > 4 && d !== k ? ' w' : '');
    strip += `<button data-act="pickStrip" data-k="${d}"><span class="wd ${i > 4 ? 'w' : ''}">${'월화수목금토일'[i]}</span><span class="${cls}">${parseKey(d).d}</span></button>`;
  }
  const evs = eventsOn(k), allday = evs.filter(e => e.allDay || isMulti(e) && false);
  let ad = '';
  if (allday.length) ad = `<div class="allday"><div class="adl">하루<br>종일</div><div class="adc">${allday.map(e => { const c = calOf(e.cal).color; return `<div class="achip" data-act="openEv" data-id="${e.id}" style="background:${rgba(c, .2)};color:${dark(c, .45)}"><i class="ci" style="background:${c}">${ic.mini}</i><span>${esc(e.title)}</span></div>`; }).join('')}</div></div>`;
  let grid = '';
  for (let h = 0; h < 24; h++) { const y = TOP + h * HH; grid += `<div class="hl" style="top:${y}px"></div><div style="position:absolute;left:0;top:${y}px;width:73px">${hourLabel(h)}</div>`; }
  layoutDay(k).forEach(it => {
    const c = calOf(it.e.cal).color, top = TOP + it.s * HH / 60, hgt = Math.max(24, (it.en - it.s) * HH / 60 - 1);
    const w = `calc((100% - 88px) / ${it.n})`;
    grid += `<div class="blk" data-act="openEv" data-id="${it.e.id}" style="top:${top}px;height:${hgt}px;left:calc(84px + (100% - 88px) * ${it.col} / ${it.n});width:calc(${w} - 2px);background:${rgba(c, .22)};border-color:${c};color:${dark(c, .5)}"><b>${esc(it.e.title)}</b><span>${fmtTime(it.e.sd === k ? it.e.st : '00:00')} – ${fmtTime(effEnd(it.e) === k ? it.e.et : '23:59')}</span></div>`;
  });
  if (k === t) { const n = kstNow(); grid += `<div class="nowline" id="nowline" style="top:${TOP + (n.h * 60 + n.mi) * HH / 60}px"></div>`; }
  return `<div class="screen"><div class="topbar">${backBtn('toMonth', (m + 1) + '월')}${grp(ic.listD)}</div>
    <div class="strip" id="strip">${strip}</div><div class="dtitle">${fmtLong(k)}</div>${ad}
    <div class="dscroll" id="dscroll"><div class="hours" id="hours" data-act="none">${grid}</div></div></div>${bottomBar()}`;
}

function evTimeText(e) {
  if (e.allDay) return e.sd === e.ed ? '하루 종일' : '하루 종일';
  return `${fmtTime(e.st)} – ${fmtTime(e.et)}`;
}
function viewList() {
  const { y, m } = parseKey(S.sel), t = today(), n = dim(y, m);
  let body = '';
  for (let d = 1; d <= n; d++) {
    const k = key(y, m, d), evs = eventsOn(k), hn = holiday(k);
    const showH = hn && !S.hidden.includes('holiday');
    if (!evs.length && !showH) continue;
    body += `<div class="lh${k === t ? ' t' : ''}">${fmtShort(k)}${k === t ? ' · 오늘' : ''}</div>`;
    if (showH) body += `<div class="li"><i style="background:${HOL}"></i><div><b>${esc(hn)}</b><small>공휴일</small></div></div>`;
    evs.forEach(e => { body += `<div class="li" data-act="openEv" data-id="${e.id}"><i style="background:${calOf(e.cal).color}"></i><div><b>${esc(e.title)}</b><small>${evTimeText(e)}${e.loc ? ' · ' + esc(e.loc) : ''}</small></div></div>`; });
  }
  if (!body) body = '<div class="empty-msg">이 달에는 일정이 없습니다</div>';
  return `<div class="screen"><div class="topbar">${backBtn('backList', S.prev === 'day' ? (m + 1) + '월' : y + '년')}${grp(ic.listM)}</div>
    <div class="mtitle">${m + 1}월</div><div class="wkhead" style="height:1px"></div><div class="lscroll">${body}</div></div>${bottomBar()}`;
}

/* ---------- render ---------- */
function render() {
  const ds = $('#dscroll'); if (ds && S.view === 'day' && S.dayTop == null) S.dayTop = null; else if (ds) S.dayTop = ds.scrollTop;
  const v = S.view;
  $('#screen').innerHTML = v === 'year' ? viewYear() : v === 'day' ? viewDay() : v === 'list' ? viewList() : viewMonth();
  if (v === 'month') requestAnimationFrame(layoutChips);
  if (v === 'day') {
    const sc = $('#dscroll');
    if (S.dayTop == null) {
      const ts = layoutDay(S.sel); const first = ts.length ? Math.min(...ts.map(i => i.s)) : 240;
      const hr = Math.min(4, Math.floor(first / 60));
      S.dayTop = Math.max(0, hr * HH + TOP - 37);
    }
    sc.scrollTop = S.dayTop;
  }
}
function layoutChips() {
  document.querySelectorAll('.chips').forEach(c => {
    const kids = [...c.children].filter(x => !x.classList.contains('more'));
    kids.forEach(k => { k.style.display = ''; }); c.querySelectorAll('.more').forEach(x => x.remove());
    const cap = Math.max(0, Math.floor((c.clientHeight + 3) / 20));
    if (kids.length <= cap) return;
    const keep = Math.max(0, cap - 1);
    kids.forEach((k, i) => { if (i >= keep) k.style.display = 'none'; });
    const more = document.createElement('div'); more.className = 'more'; more.textContent = `+${kids.length - keep}개`; c.appendChild(more);
  });
}

/* ---------- navigation ---------- */
function setView(v) { S.view = v; if (v === 'day') S.dayTop = null; render(); }
function nav(dir) {
  const v = S.view;
  if (v === 'year') S.sel = addMonths(S.sel, 12 * dir);
  else if (v === 'day') S.sel = addDays(S.sel, dir);
  else S.sel = addMonths(S.sel, dir);
  render();
}

/* ---------- sheets ---------- */
function openSheet(html, mount) {
  const sh = $('#sheet'), wasOn = sh.classList.contains('on');
  sh.innerHTML = html;
  if (mount) mount(sh);
  if (!wasOn) { void sh.offsetHeight; sh.classList.add('on'); $('#backdrop').classList.add('on'); }
}
function closeSheet() {
  const sh = $('#sheet'); sh.classList.remove('on'); $('#backdrop').classList.remove('on');
  if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
  S.sheet = null;
  setTimeout(() => { if (!S.sheet) sh.innerHTML = ''; }, 380);
}
const sheetHead = (right) => `<div class="shead"><button class="pill cbtn" data-act="closeSheet" aria-label="닫기">${ic.x}</button>${right || ''}</div>`;

function detailSheet(id) {
  const e = S.events.find(x => x.id === id); if (!e) return closeSheet();
  S.sheet = { type: 'detail', id };
  const c = calOf(e.cal);
  let when;
  if (e.sd === e.ed) when = `${fmtLong(e.sd)}<br>${e.allDay ? '하루 종일' : fmtTime(e.st) + ' – ' + fmtTime(e.et)}`;
  else when = `${fmtLong(e.sd)}${e.allDay ? '' : ' ' + fmtTime(e.st)}<br>~ ${fmtLong(e.ed)}${e.allDay ? '' : ' ' + fmtTime(e.et)}`;
  openSheet(`${sheetHead('<button class="pill txt" data-act="editEv" data-id="' + e.id + '">편집</button>')}
    <div class="sbody"><div class="dhead"><div class="dbar" style="background:${c.color}"></div><div><div class="dt">${esc(e.title)}</div><div class="dd">${when}</div>${e.loc ? `<div class="dx">${esc(e.loc)}</div>` : ''}${e.notes ? `<div class="dx">${esc(e.notes)}</div>` : ''}</div></div>
    <div class="sec">옵션</div>
    <div class="row">${ic.calL}<span>캘린더</span><span class="sp"></span><span class="val"><i class="cdot" style="background:${c.color}"></i>${esc(c.name)}<svg viewBox="0 0 24 24">${ic.ud.slice(ic.ud.indexOf('>') + 1, -6)}</svg></span></div>
    <div class="row">${ic.bell}<span>알림</span><span class="sp"></span><span class="val">${alertName(e.alert)}<svg viewBox="0 0 24 24">${ic.ud.slice(ic.ud.indexOf('>') + 1, -6)}</svg></span></div>
    <div class="row del" data-act="delEv" data-id="${e.id}">이벤트 삭제</div></div>`);
}

function newDraft(sd, hour) {
  const n = kstNow();
  const h = hour != null ? hour : Math.min(23, n.h + 1);
  const en = Math.min(23 * 60 + 59, (h + 1) * 60);
  return { id: null, title: '', loc: '', notes: '', allDay: false, sd, st: `${pad(h)}:00`, ed: sd, et: fromMin(en), cal: S.cals[0].id, alert: 'none' };
}
function editSheet(d) {
  const isNew = !d.id; S.sheet = { type: 'edit', isNew };
  const udIcon = `<svg viewBox="0 0 24 24">${ic.ud.slice(ic.ud.indexOf('>') + 1, -6)}</svg>`;
  const calOpts = S.cals.map(c => `<option value="${c.id}"${c.id === d.cal ? ' selected' : ''}>${esc(c.name)}</option>`).join('');
  const alOpts = ALERTS.map(a => `<option value="${a[0]}"${a[0] === d.alert ? ' selected' : ''}>${a[1]}</option>`).join('');
  const c = calOf(d.cal);
  openSheet(`${sheetHead('<button class="pill txt" data-act="saveEv" style="font-weight:600">완료</button>')}
    <div class="sbody" id="eform" data-id="${d.id || ''}">
    <div class="card"><input class="big" id="f-title" type="text" placeholder="제목" value="${esc(d.title)}" autocomplete="off"><div style="height:1px;background:#ececf0;margin:0 20px"></div><input id="f-loc" type="text" placeholder="위치" value="${esc(d.loc)}" autocomplete="off"></div>
    <div class="card${d.allDay ? ' allday-on' : ''}" id="when">
      <div class="row"><span>종일</span><span class="sp"></span><label class="sw"><input type="checkbox" id="f-all"${d.allDay ? ' checked' : ''}><i></i></label></div>
      <div class="row"><span>시작</span><span class="sp"></span><span class="pair"><input type="date" id="f-sd" value="${d.sd}"><input class="timed" type="time" id="f-st" value="${d.st}"></span></div>
      <div class="row"><span>종료</span><span class="sp"></span><span class="pair"><input type="date" id="f-ed" value="${d.ed}"><input class="timed" type="time" id="f-et" value="${d.et}"></span></div>
    </div>
    <div class="row">${ic.calL}<span>캘린더</span><span class="sp"></span><span class="val"><i class="cdot" id="f-cdot" style="background:${c.color}"></i><span id="f-cname">${esc(c.name)}</span>${udIcon}</span><select id="f-cal">${calOpts}</select></div>
    <div class="row">${ic.bell}<span>알림</span><span class="sp"></span><span class="val"><span id="f-aname">${alertName(d.alert)}</span>${udIcon}</span><select id="f-alert">${alOpts}</select></div>
    <div class="card"><textarea id="f-notes" placeholder="메모">${esc(d.notes)}</textarea></div>
    ${isNew ? '' : `<div class="row del" data-act="delEv" data-id="${d.id}">이벤트 삭제</div>`}</div>`, bindForm);
  if (isNew) setTimeout(() => { const t = $('#f-title'); if (t) t.focus({ preventScroll: true }); }, 380);
}
function bindForm() {
  const g = id => document.getElementById(id);
  let prev = absMin(g('f-sd').value || S.sel, g('f-st').value || '09:00');
  g('f-all').addEventListener('change', e => g('when').classList.toggle('allday-on', e.target.checked));
  const shift = () => {
    const sd = g('f-sd').value, st = g('f-st').value || '09:00';
    if (!sd) return;
    const ns = absMin(sd, st);
    const ed = g('f-ed').value || sd, et = g('f-et').value || st;
    const ne = absMin(ed, et) + (ns - prev); prev = ns;
    const r = fromAbs(ne); g('f-ed').value = r.k; g('f-et').value = r.t;
  };
  g('f-sd').addEventListener('change', shift); g('f-st').addEventListener('change', shift);
  g('f-cal').addEventListener('change', e => { const c = calOf(e.target.value); g('f-cname').textContent = c.name; g('f-cdot').style.background = c.color; });
  g('f-alert').addEventListener('change', e => { g('f-aname').textContent = alertName(e.target.value); });
}
function saveForm() {
  const g = id => document.getElementById(id); if (!g('f-title')) return;
  const id = g('eform').dataset.id;
  const allDay = g('f-all').checked;
  let sd = g('f-sd').value || S.sel, ed = g('f-ed').value || sd;
  let st = g('f-st').value || '09:00', et = g('f-et').value || '10:00';
  if (allDay) { if (ed < sd) ed = sd; }
  else if (absMin(ed, et) < absMin(sd, st)) { ed = sd; et = fromMin(Math.min(1439, toMin(st) + 60)); if (toMin(et) <= toMin(st)) et = st; }
  const obj = { id: id || uid(), title: g('f-title').value.trim() || '새로운 이벤트', loc: g('f-loc').value.trim(), notes: g('f-notes').value.trim(), allDay, sd, st, ed, et, cal: g('f-cal').value, alert: g('f-alert').value };
  const i = S.events.findIndex(e => e.id === obj.id);
  if (i >= 0) S.events[i] = obj; else S.events.push(obj);
  save(); S.sel = sd; closeSheet(); render();
}
function deleteEvent(id) {
  if (!confirm('이 이벤트를 삭제할까요?')) return;
  S.events = S.events.filter(e => e.id !== id); save(); closeSheet(); render();
}

function searchSheet() {
  S.sheet = { type: 'search' };
  openSheet(`<div class="shead"><div class="sbox">${ic.search}<input id="q" type="search" placeholder="이벤트 검색" autocomplete="off"></div><button class="pill txt" data-act="closeSheet" style="box-shadow:none">취소</button></div>
    <div class="sbody" id="results"><div class="empty-msg">검색어를 입력하세요</div></div>`, sh => {
    const q = sh.querySelector('#q'), out = sh.querySelector('#results');
    q.addEventListener('input', () => {
      const t = q.value.trim().toLowerCase();
      if (!t) { out.innerHTML = '<div class="empty-msg">검색어를 입력하세요</div>'; return; }
      const r = S.events.filter(e => isVis(e) && [e.title, e.notes, e.loc, calOf(e.cal).name].join('\n').toLowerCase().includes(t)).sort((a, b) => a.sd.localeCompare(b.sd) || a.st.localeCompare(b.st)).slice(0, 200);
      out.innerHTML = r.length ? `<div class="res">${r.map(e => `<div class="li" data-act="openEv" data-id="${e.id}"><i style="background:${calOf(e.cal).color}"></i><div><b>${esc(e.title)}</b><small>${fmtShort(e.sd)}${e.allDay ? ' · 하루 종일' : ' · ' + fmtTime(e.st)}${e.loc ? ' · ' + esc(e.loc) : ''}</small></div></div>`).join('')}</div>` : '<div class="empty-msg">결과 없음</div>';
    });
    setTimeout(() => q.focus({ preventScroll: true }), 380);
  });
}

function calsSheet() {
  S.sheet = { type: 'cals' };
  const row = c => `<div class="crow"><button class="ck" data-act="calToggle" data-id="${c.id}" style="border-color:${c.color};background:${S.hidden.includes(c.id) ? 'transparent' : c.color}" aria-label="표시 전환">${S.hidden.includes(c.id) ? '' : ic.check}</button><input type="text" data-calname="${c.id}" value="${esc(c.name)}" maxlength="30"><input type="color" data-calcolor="${c.id}" value="${c.color}">${S.cals.length > 1 ? `<button class="rm" data-act="calDel" data-id="${c.id}">삭제</button>` : ''}</div>`;
  openSheet(`${sheetHead('<span style="font-size:19px;font-weight:700;align-self:center;margin-right:auto;margin-left:6px">캘린더</span><button class="pill txt" data-act="closeSheet" style="font-weight:600">완료</button>')}
    <div class="sbody"><div class="sec">내 캘린더</div><div class="res">${S.cals.map(row).join('')}</div>
    <div class="sec" style="margin-top:22px">공휴일</div><div class="res"><div class="crow"><button class="ck" data-act="calToggle" data-id="holiday" style="border-color:${HOL};background:${S.hidden.includes('holiday') ? 'transparent' : HOL}">${S.hidden.includes('holiday') ? '' : ic.check}</button><span style="flex:1;font-size:17px">대한민국 공휴일</span></div></div>
    <button class="addc" data-act="calAdd">캘린더 추가…</button></div>`, sh => {
    sh.querySelectorAll('[data-calname]').forEach(i => i.addEventListener('change', () => { const c = calOf(i.dataset.calname); c.name = i.value.trim() || c.name; i.value = c.name; save(); render(); }));
    sh.querySelectorAll('[data-calcolor]').forEach(i => i.addEventListener('change', () => { calOf(i.dataset.calcolor).color = i.value; save(); calsSheet(); render(); }));
  });
}
function inboxSheet() {
  S.sheet = { type: 'inbox' };
  openSheet(`${sheetHead('<span style="font-size:19px;font-weight:700;align-self:center;margin-right:auto;margin-left:6px">받은 편지함</span>')}<div class="sbody"><div class="empty-msg">받은 초대가 없습니다</div></div>`);
}

/* ---------- toast & alerts ---------- */
let toastT;
function toast(title, sub) {
  const t = $('#toast'); t.innerHTML = `<b>${esc(title)}</b>${esc(sub)}`; t.classList.add('on');
  clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('on'), 5000);
}
function checkAlerts() {
  const n = kstNow(), na = absMin(n.key, `${pad(n.h)}:${pad(n.mi)}`);
  S.events.forEach(e => {
    if (e.alert === 'none') return;
    const trig = absMin(e.sd, e.allDay ? '09:00' : e.st) - Number(e.alert), fk = e.id + ':' + trig;
    if (na >= trig && na < trig + 2 && !S.fired[fk]) {
      S.fired[fk] = 1; save();
      toast(e.title, e.alert === '0' ? '지금 시작합니다' : alertName(e.alert).replace('전', '후 시작'));
    }
  });
}
function tick() {
  const n = kstNow(); $('#sb-time').textContent = `${n.h % 12 || 12}:${pad(n.mi)}`;
  const nl = $('#nowline'); if (nl) nl.style.top = (TOP + (n.h * 60 + n.mi) * HH / 60) + 'px';
  checkAlerts();
}

/* ---------- events ---------- */
function openEv(id) {
  const e = S.events.find(x => x.id === id); if (!e) return;
  detailSheet(id);
}
document.addEventListener('click', ev => {
  if (Date.now() - swipeAt < 350) return;
  const el = ev.target.closest('[data-act]'); if (!el) return;
  const a = el.dataset.act, d = el.dataset;
  switch (a) {
    case 'toYear': setView('year'); break;
    case 'toMonth': setView('month'); break;
    case 'toList': S.prev = S.view; setView('list'); break;
    case 'backList': setView(S.prev || 'month'); break;
    case 'search': searchSheet(); break;
    case 'add': S.sheet = null; editSheet(newDraft(S.sel)); break;
    case 'today': S.sel = today(); render(); break;
    case 'cals': calsSheet(); break;
    case 'inbox': inboxSheet(); break;
    case 'pickDay': S.sel = d.k; setView('day'); break;
    case 'pickStrip': S.sel = d.k; S.dayTop = $('#dscroll') ? $('#dscroll').scrollTop : null; render(); break;
    case 'pickMonth': {
      const y = +d.y, m = +d.m, t = parseKey(today());
      S.sel = (t.y === y && t.m === m) ? today() : key(y, m, 1); setView('month'); break;
    }
    case 'openEv': openEv(d.id); break;
    case 'closeSheet': closeSheet(); break;
    case 'editEv': { const e = S.events.find(x => x.id === d.id); if (e) editSheet({ ...e }); break; }
    case 'saveEv': saveForm(); break;
    case 'delEv': deleteEvent(d.id); break;
    case 'calToggle': { const i = S.hidden.indexOf(d.id); if (i >= 0) S.hidden.splice(i, 1); else S.hidden.push(d.id); save(); calsSheet(); render(); break; }
    case 'calAdd': S.cals.push({ id: uid(), name: '새 캘린더', color: COLORS[S.cals.length % COLORS.length] }); save(); calsSheet(); break;
    case 'calDel': {
      const c = calOf(d.id);
      if (S.cals.length < 2 || !confirm(`'${c.name}' 캘린더와 포함된 이벤트를 삭제할까요?`)) break;
      S.cals = S.cals.filter(x => x.id !== d.id); S.events = S.events.filter(e => e.cal !== d.id); S.hidden = S.hidden.filter(h => h !== d.id);
      save(); calsSheet(); render(); break;
    }
    default: break;
  }
});
document.addEventListener('dblclick', ev => {
  const h = ev.target.closest('#hours'); if (!h || ev.target.closest('.blk') || S.sheet) return;
  const y = ev.clientY - h.getBoundingClientRect().top - TOP;
  const hr = Math.max(0, Math.min(23, Math.floor(y / HH)));
  editSheet(newDraft(S.sel, hr));
});
$('#backdrop').addEventListener('click', () => { if (S.sheet && S.sheet.type !== 'edit') closeSheet(); });
document.addEventListener('keydown', ev => {
  if (ev.key === 'Escape' && S.sheet) { closeSheet(); return; }
  if (/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName) || S.sheet) return;
  if (ev.key === 'ArrowLeft') nav(-1); else if (ev.key === 'ArrowRight') nav(1);
});

/* swipe */
let sx = 0, sy = 0, sActive = false, swipeAt = 0, inStrip = false;
document.addEventListener('pointerdown', e => { if (S.sheet) return; sActive = true; sx = e.clientX; sy = e.clientY; inStrip = !!e.target.closest('#strip'); });
document.addEventListener('pointerup', e => {
  if (!sActive) return; sActive = false;
  const dx = e.clientX - sx, dy = e.clientY - sy;
  if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.6) {
    swipeAt = Date.now();
    const dir = dx < 0 ? 1 : -1;
    if (S.view === 'day' && inStrip) { S.sel = addDays(S.sel, 7 * dir); S.dayTop = $('#dscroll').scrollTop; render(); }
    else { if (S.view === 'day') S.dayTop = $('#dscroll').scrollTop; nav(dir); }
  }
});
document.addEventListener('pointercancel', () => { sActive = false; });
window.addEventListener('resize', () => { if (S.view === 'month') layoutChips(); });

/* ---------- requested schedule import ---------- */
function importRequestedSchedule() {
  const version = 'seonghwa-schedule-2026-v1';
  try { if (localStorage.getItem(version)) return; } catch(e) {}
  const schedule = [
    ['01-08','재킷 촬영'],['01-12','신곡 녹음'],['01-15','팬미팅 리허설'],['01-17','팬미팅'],['01-24','타이베이'],['01-31','자카르타'],
    ['02-05','기자간담회'],['02-06','뮤뱅'],['02-07','음중'],['02-08','인가'],['02-13','뮤뱅'],['02-14','음중'],['02-14','한터'],['02-15','인가'],['02-22','싱가포르'],
    ['03-02','멜버른'],['03-03','멜버른'],['03-06','시드니'],['03-07','시드니'],['03-14','마닐라'],['03-22','쿠알라룸푸르'],['03-28','마카오'],
    ['04-04','방콕'],['04-11','The Performance'],['04-12','The Performance'],['05-16','ASEA 2026'],['06-21','인가'],['06-28','BST Hyde Park'],['07-03','뮤뱅'],['07-04','음중'],
    ['07-17','팬미팅'],['07-18','팬미팅'],['07-19','팬미팅'],['07-28','일본 쇼케'],
    ['08-04','일본 팬미팅'],['08-05','일본 팬미팅'],['08-06','일본 팬미팅'],['08-07','뮤직 스테이션'],['08-09','가요대전'],['08-14','이스탄불 페스티벌'],['08-27','케이월드'],
    ['09-19','더팩트'],['09-20','아타페'],['10-07','뮤뱅 바르셀로나'],['10-17','82월드'],['10-25','뮤직 엑스포 대만']
  ];
  const cal = S.cals.find(x=>x.id==='c1') || S.cals[0];
  schedule.forEach(([md,title])=>{
    const date='2026-'+md;
    if(S.events.some(e=>e.sd===date&&e.title===title)) return;
    S.events.push({id:uid(),title,loc:'',notes:'',allDay:true,sd:date,st:'09:00',ed:date,et:'10:00',cal:cal.id,alert:'none'});
  });
  save();
  try { localStorage.setItem(version,'1'); } catch(e) {}
}

/* ---------- init ---------- */
load();
importRequestedSchedule();
render();
tick();
setInterval(tick, 15000);
window.__cal = { S, render, kstNow };
})();

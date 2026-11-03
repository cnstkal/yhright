(function () {
  const KEY = 'notes-ch05-v1', root = document.getElementById('root'), dev = document.getElementById('device');
  const H = 3600e3, D = 24 * H, now = Date.now();
  const T = s => s.split('\n').map(x => x.startsWith('[ ] ') ? { t: 'ck', c: x.slice(4), d: false } : x.startsWith('[x] ') ? { t: 'ck', c: x.slice(4), d: true } : { t: 'tx', c: x });

  // ---------- 데이터 ----------
  const seed = () => ({
    folders: [{ id: 'icn', name: '메모', acct: 'icloud' }, { id: 'todo', name: '할 일', acct: 'icloud' }, { id: 'trip', name: '여행', acct: 'icloud' }, { id: 'school', name: '학교', acct: 'icloud' }, { id: 'me', name: '개인', acct: 'icloud' }, { id: 'ph', name: '메모', acct: 'iphone' }],
    notes: [
      { id: 'n1', folder: 'icn', pin: true, ts: now - 12 * 60e3, lines: T('장보기 목록\n[ ] 우유 1L\n[x] 계란 한 판\n[ ] 통밀 식빵\n[ ] 사과 3개\n[ ] 주방 세제') },
      { id: 'n2', folder: 'trip', pin: true, ts: now - 3 * H, lines: T('제주도 여행 계획\n1/10(금) ~ 1/13(월), 3박 4일\n1일차: 제주공항 도착, 렌터카 수령, 협재 해변\n2일차: 한라산 영실 코스 등반\n3일차: 우도 자전거 일주, 흑돼지 저녁\n[x] 숙소 예약\n[ ] 항공권 예약\n[ ] 렌터카 보험 확인') },
      { id: 'n3', folder: 'school', pin: false, ts: now - 1 * D - 2 * H, lines: T('학교 과제\n경영학원론 보고서: 12/20(금) 자정까지 제출\nA4 5장 이내, 참고문헌 5개 이상\n팀 프로젝트 자료조사는 지수와 반씩 나누기') },
      { id: 'n4', folder: 'icn', pin: false, ts: now - 2 * D, lines: T('약속 일정\n12/21(토) 오후 2시 지수와 성수동 카페\n12/24(화) 저녁 7시 가족 모임\n12/28(토) 오전 10시 30분 치과 예약') },
      { id: 'n5', folder: 'todo', pin: false, ts: now - 4 * D, lines: T('할 일 목록\n[x] 공과금 납부\n[ ] 택배 반품 신청\n[ ] 병원 예약 전화\n[ ] 독서 30분\n[ ] 방 정리') },
      { id: 'n6', folder: 'icn', pin: false, ts: now - 9 * D, lines: T('사고 싶은 물건\n에어팟 케이스 (민트색)\n저소음 적축 무선 키보드\n책상 위 스탠드 조명\n러닝화 270mm') },
      { id: 'n7', folder: 'me', pin: false, ts: now - 15 * D, lines: T('개인적인 기록\n오랜만에 한강에 나가서 한 시간쯤 걸었다.\n바람이 차가웠지만 머릿속이 한결 가벼워졌다.\n내년에는 아침 산책을 습관으로 만들어 보고 싶다.') },
      { id: 'n8', folder: 'icn', pin: false, ts: now - 45 * D, lines: T('김치볶음밥 레시피\n묵은지 한 줌과 대파를 기름에 먼저 볶는다.\n밥을 넣고 고추장 반 숟가락, 간장 한 숟가락.\n마지막에 참기름과 계란 프라이를 올린다.') },
      { id: 'n9', folder: 'ph', pin: false, ts: now - 6 * D, lines: T('아이디어 메모\n앱 이름 후보: 오늘한줄, 하루조각\n다음 주 회의 때 공유하기') },
      { id: 'n10', folder: 'me', pin: false, ts: now - 120 * D, lines: T('읽고 싶은 책\n데미안 — 헤르만 헤세\n사피엔스 — 유발 하라리\n작별하지 않는다 — 한강') }
    ]
  });
  let DB; try { DB = JSON.parse(localStorage.getItem(KEY)); } catch (e) {} if (!DB || !DB.notes) DB = seed();
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(DB)); } catch (e) {} };

  // ---------- 유틸 ----------
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const sv = (p, o = '') => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" ${o}>${p}</svg>`;
  const IC = {
    back: sv('<path d="M15 5l-7 7 7 7"/>', 'stroke-width="2.4"'), folder: sv('<path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" fill="currentColor" stroke="none"/>'),
    trash: sv('<path d="M5 7h14M9 7V4h6v3M7 7l1 13h8l1-13"/>'), more: sv('<circle cx="12" cy="12" r="9"/><circle cx="8" cy="12" r=".6" fill="currentColor"/><circle cx="12" cy="12" r=".6" fill="currentColor"/><circle cx="16" cy="12" r=".6" fill="currentColor"/>'),
    share: sv('<path d="M12 3v12M8 7l4-4 4 4M5 11v9h14v-9"/>'), undo: sv('<path d="M9 5L4 10l5 5M4 10h10a6 6 0 010 12h-3"/>'), redo: sv('<path d="M15 5l5 5-5 5M20 10H10a6 6 0 000 12h3"/>'),
    compose: sv('<path d="M4 20h4L19 9l-4-4L4 16zM13 7l4 4"/>'), newf: sv('<path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2zM12 10v6M9 13h6"/>'),
    search: sv('<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>'), pin: sv('<path d="M9 4h6l-1 6 3 3H7l3-3zM12 13v7"/>', 'fill="currentColor"'), chev: sv('<path d="M9 5l7 7-7 7"/>', 'stroke="#c4c4c8"'),
    check: sv('<circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/>'), table: sv('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M9 5v14M15 5v14"/>'),
    clip: sv('<path d="M20 11l-8 8a5 5 0 01-7-7l9-9a3.500 3.500 0 015 5l-9 9a2 2 0 01-3-3l8-8"/>'), pen: sv('<path d="M16 3l5 5L9 20l-6 1 1-6z"/>'),
    acc: sv('<path d="M7 17l4-10 4 10M8.500 14h5M17 8h3M18.500 6.500v3"/>')
  };
  const sig = '<svg viewBox="0 0 18 12" fill="#000"><rect y="8" width="3" height="4" rx=".8"/><rect x="5" y="5.500" width="3" height="6.500" rx=".8"/><rect x="10" y="3" width="3" height="9" rx=".8"/><rect x="15" width="3" height="12" rx=".8"/></svg>';
  const wifi = '<svg viewBox="0 0 17 12" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round"><path d="M1.500 4.500a10 10 0 0114 0M4 7.200a6.500 6.500 0 019 0"/><circle cx="8.500" cy="10.200" r="1.200" fill="#000" stroke="none"/></svg>';
  const bat = '<svg viewBox="0 0 27 12" fill="none"><rect x=".5" y=".5" width="23" height="11" rx="3.500" stroke="#000" opacity=".4"/><rect x="2" y="2" width="20" height="8" rx="2.200" fill="#000"/><path d="M25 4v4c.8-.3 1.500-1.100 1.500-2S25.800 4.300 25 4z" fill="#000" opacity=".4"/></svg>';

  const tstr = d => { const h = d.getHours(); return `${h < 12 ? '오전' : '오후'} ${h % 12 || 12}:${String(d.getMinutes()).padStart(2, '0')}`; };
  const sameDay = (a, b) => a.toDateString() === b.toDateString();
  const listDate = ts => { const d = new Date(ts), n = new Date(); if (sameDay(d, n)) return tstr(d); const y = new Date(n - D); if (sameDay(d, y)) return '어제'; if (n - ts < 7 * D) return '월화수목금토일'.charAt((d.getDay() + 6) % 7) ? ['일', '월', '화', '수', '목', '금', '토'][d.getDay()] + '요일' : ''; return `${d.getFullYear()}. ${d.getMonth() + 1}. ${d.getDate()}.`; };
  const fullDate = ts => { const d = new Date(ts); return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일 ${tstr(d)}`; };
  const group = ts => { const n = Date.now() - ts, d = new Date(ts); if (sameDay(d, new Date())) return '오늘'; if (n < 2 * D && sameDay(d, new Date(Date.now() - D))) return '어제'; if (n < 7 * D) return '지난 7일'; if (n < 30 * D) return '지난 30일'; return d.getFullYear() === new Date().getFullYear() ? `${d.getMonth() + 1}월` : `${d.getFullYear()}년`; };
  const lineTxt = l => l.c.trim();
  const title = n => { const l = n.lines.find(lineTxt); return l ? lineTxt(l) : '새로운 메모'; };
  const preview = n => { const a = n.lines.filter(lineTxt); return a.length > 1 ? lineTxt(a[1]) : '추가 텍스트 없음'; };
  const isEmpty = n => !n.lines.some(lineTxt);
  const F = id => DB.folders.find(f => f.id === id);
  const live = () => DB.notes.filter(n => !n.del);
  const inFolder = f => f === 'all' ? live().filter(n => F(n.folder).acct === 'icloud') : f === 'trash' ? DB.notes.filter(n => n.del) : live().filter(n => n.folder === f);
  const fname = f => f === 'all' ? '전체 iCloud' : f === 'trash' ? '최근 삭제된 항목' : F(f).name;

  // ---------- 상태 ----------
  const S = { stack: [{ v: 'folders' }], sheet: null, pop: false, toast: '', q: '' };
  const top = () => S.stack[S.stack.length - 1];
  let hist = [], hi = 0, timer = null, editing = false, kbOpen = false;

  // ---------- 화면 HTML ----------
  const noteRow = (n, showF) => `<button class="nr" data-a="open" data-id="${n.id}"><div class="in"><b>${n.pin ? `<span class="pn">${IC.pin}</span>` : ''}${esc(title(n))}</b><div class="s"><span>${listDate(n.ts)}</span>${esc(preview(n))}</div>${showF ? `<div class="f">${IC.folder.replace('fill="currentColor"', 'fill="#8a8a8e"')}${esc(fname(n.del ? 'trash' : n.folder))}</div>` : ''}</div></button>`;
  const folderRow = (id, name, cnt, ic) => `<button class="fr" data-a="folder" data-id="${id}"><span class="ic">${ic || IC.folder}</span><span class="n">${esc(name)}<small>${cnt}${IC.chev}</small></span></button>`;
  function foldersHTML() {
    const ic = DB.folders.filter(f => f.acct === 'icloud'), ph = DB.folders.filter(f => f.acct === 'iphone');
    const cnt = id => inFolder(id).length;
    return `<div class="nav"><span class="l"></span><button class="r" data-a="noop">편집</button></div><div class="body"><h1 class="t">폴더</h1>
      <button class="sb" data-a="search">${IC.search}검색</button>
      <div class="sech big">iCloud</div><div class="grp">${folderRow('all', '전체 iCloud', cnt('all'), IC.folder)}${ic.map(f => folderRow(f.id, f.name, cnt(f.id))).join('')}</div>
      ${ph.length ? `<div class="sech big">나의 iPhone</div><div class="grp">${ph.map(f => folderRow(f.id, f.name, cnt(f.id))).join('')}</div>` : ''}
      <div class="sech"></div><div class="grp">${folderRow('trash', '최근 삭제된 항목', cnt('trash'), IC.trash)}</div></div>
      <div class="tb"><button data-a="newfolder" aria-label="새로운 폴더">${IC.newf}</button><button data-a="compose" aria-label="새로운 메모">${IC.compose}</button></div>`;
  }
  function listHTML(fid) {
    const arr = inFolder(fid).sort((a, b) => b.ts - a.ts), trash = fid === 'trash';
    const pinned = trash ? [] : arr.filter(n => n.pin), rest = trash ? arr : arr.filter(n => !n.pin), showF = fid === 'all';
    let secs = ''; if (pinned.length) secs += `<div class="sech big" style="font-size:17px">${IC.pin}고정된 메모</div><div class="grp">${pinned.map(n => noteRow(n, showF)).join('')}</div>`;
    const g = []; rest.forEach(n => { const k = group(n.ts), l = g[g.length - 1]; l && l.k === k ? l.a.push(n) : g.push({ k, a: [n] }); });
    secs += g.map(x => `<div class="sech big" style="font-size:17px">${x.k}</div><div class="grp">${x.a.map(n => noteRow(n, showF)).join('')}</div>`).join('');
    return `<div class="nav"><button class="l" data-a="back">${IC.back}폴더</button><button class="r" data-a="noop" aria-label="더 보기">${IC.more}</button></div>
      <div class="body"><h1 class="t">${esc(fname(fid))}</h1><button class="sb" data-a="search">${IC.search}검색</button>${arr.length ? secs : '<div class="empty">메모 없음</div>'}</div>
      <div class="tb"><span></span><span class="c">${arr.length}개의 메모</span>${trash ? '<span style="width:25px"></span>' : `<button data-a="compose" aria-label="새로운 메모">${IC.compose}</button>`}</div>`;
  }
  function editHTML(id) {
    const n = DB.notes.find(x => x.id === id), prev = S.stack[S.stack.length - 2];
    const lbl = prev.v === 'list' ? fname(prev.f) : prev.v === 'search' ? '검색' : '폴더';
    return `<div class="nav"><button class="l" data-a="back">${IC.back}${esc(lbl)}</button>
      <span class="r">${editing ? '<button data-a="done" style="font-weight:600">완료</button>' : ''}<button data-a="undo" id="bu" aria-label="실행 취소">${IC.undo}</button><button data-a="redo" id="br" aria-label="다시 실행">${IC.redo}</button><button data-a="share" aria-label="공유">${IC.share}</button><button data-a="menu" aria-label="더 보기">${IC.more}</button></span></div>
      <div class="edbody" id="edbody"><div class="edate">${fullDate(n.ts)}</div><div class="ed" id="ed" spellcheck="false"></div></div>
      <div class="kbbar" id="kbbar"><button data-a="tcheck" aria-label="체크리스트">${IC.check}</button><button data-a="noop" aria-label="표">${IC.table}</button><button data-a="noop" aria-label="첨부">${IC.clip}</button><button data-a="noop" aria-label="서식">${IC.acc}</button><button data-a="noop" aria-label="손글씨">${IC.pen}</button></div>`;
  }
  function searchHTML() {
    const q = S.q.trim().toLowerCase();
    const res = q ? live().filter(n => n.lines.some(l => l.c.toLowerCase().includes(q))).sort((a, b) => b.ts - a.ts) : [];
    return `<div class="nav" style="gap:10px;padding-top:4px"><div class="sb" style="margin:0;flex:1;width:auto">${IC.search}<input id="sq" placeholder="검색" value="${esc(S.q)}" style="flex:1;border:0;background:none;outline:none;font-size:17px;min-width:0" autocomplete="off"></div><button data-a="back" style="font-size:17px">취소</button></div>
      <div class="body" id="sres">${q ? (res.length ? `<div class="sech">${res.length}개 발견</div><div class="grp">${res.map(n => noteRow(n, true)).join('')}</div>` : '<div class="empty">검색 결과 없음</div>') : '<div class="empty" style="font-size:17px;font-weight:400">제목이나 본문으로 메모를 검색해 보세요</div>'}</div>`;
  }
  function sheetHTML() {
    if (S.pop) { const n = DB.notes.find(x => x.id === top().id); return `<div class="scrim" data-a="sclose" style="background:transparent"><div class="pop" data-stop>${n.del ? `<button data-a="restore">복구${IC.back.replace('M15 5l-7 7 7 7', 'M5 12h14')}</button><button class="red" data-a="del">영구 삭제${IC.trash}</button>` : `<button data-a="pin">${n.pin ? '메모 고정 해제' : '메모 고정'}${IC.pin}</button><button data-a="move">폴더로 이동${IC.folder}</button><button class="red" data-a="del">삭제${IC.trash}</button>`}</div></div>`; }
    if (!S.sheet) return '';
    if (S.sheet.t === 'move') return `<div class="scrim" data-a="sclose"><div class="sheet" data-stop><h3>폴더로 이동</h3><div class="grp">${DB.folders.map(f => `<button class="fr" data-a="moveto" data-id="${f.id}"><span class="ic">${IC.folder}</span><span class="n">${esc(f.name)}<small>${f.acct === 'iphone' ? '나의 iPhone' : 'iCloud'}</small></span></button>`).join('')}</div></div></div>`;
    return `<div class="scrim" data-a="sclose"><div class="sheet" data-stop><h3>새로운 폴더</h3><input id="nf" placeholder="이름" autocomplete="off"><button class="go" data-a="mkfolder">저장</button></div></div>`;
  }

  function render() {
    const t = top(); let inner = t.v === 'folders' ? foldersHTML() : t.v === 'list' ? listHTML(t.f) : t.v === 'edit' ? editHTML(t.id) : searchHTML();
    root.innerHTML = `<div class="status"><span>9:41</span><span class="r">${sig}${wifi}${bat}</span></div><div class="scr">${inner}</div>${sheetHTML()}${S.toast ? `<div class="toast">${esc(S.toast)}</div>` : ''}`;
    if (t.v === 'edit') mountEditor(t.id);
    if (t.v === 'search') { const q = document.getElementById('sq'); q.focus(); q.setSelectionRange(q.value.length, q.value.length); q.addEventListener('input', () => { S.q = q.value; const r = document.getElementById('sres'); const tmp = document.createElement('div'); tmp.innerHTML = searchHTML(); r.innerHTML = tmp.querySelector('#sres').innerHTML; }); }
  }
  const toast = m => { S.toast = m; render(); setTimeout(() => { S.toast = ''; render(); }, 1500); };

  // ---------- 편집기 ----------
  const lineEl = l => { const d = document.createElement('div'); if (l.t === 'ck') { d.className = 'ln ck' + (l.d ? ' done' : ''); d.innerHTML = '<i class="cb" contenteditable="false"></i><span></span>'; d.lastChild.textContent = l.c; if (!l.c) d.lastChild.innerHTML = '<br>'; } else { d.className = 'ln'; d.textContent = l.c; if (!l.c) d.innerHTML = '<br>'; } return d; };
  const txtOf = el => (el.querySelector('span') || el).textContent.replace(/\u200b/g, '');
  function readLines(ed) {
    [...ed.childNodes].forEach(c => { if (c.nodeType === 3 || (c.nodeType === 1 && !c.classList.contains('ln'))) { const d = lineEl({ t: 'tx', c: c.textContent }); ed.replaceChild(d, c); } });
    if (!ed.children.length) ed.appendChild(lineEl({ t: 'tx', c: '' }));
    return [...ed.children].map(el => ({ t: el.classList.contains('ck') ? 'ck' : 'tx', c: txtOf(el), d: el.classList.contains('done') }));
  }
  function caretTo(el, end) { const r = document.createRange(), tgt = el.querySelector('span') || el; r.selectNodeContents(tgt); r.collapse(!end); const s = getSelection(); s.removeAllRanges(); s.addRange(r); }
  const curLine = ed => { const s = getSelection(); if (!s.rangeCount) return null; let n = s.anchorNode; while (n && n.parentNode !== ed) n = n.parentNode; return n && n.nodeType === 1 ? n : null; };
  function mountEditor(id) {
    const n = DB.notes.find(x => x.id === id), ed = document.getElementById('ed');
    ed.contentEditable = 'plaintext-only'; if (ed.contentEditable !== 'plaintext-only') ed.contentEditable = 'true';
    if (n.del) ed.contentEditable = 'false';
    n.lines.forEach(l => ed.appendChild(lineEl(l)));
    hist = [JSON.stringify(n.lines)]; hi = 0; updUR();
    const commit = (push = true) => { const ls = readLines(ed), j = JSON.stringify(ls); if (j === JSON.stringify(n.lines)) return; n.lines = ls; n.ts = Date.now(); save(); if (push) { hist = hist.slice(0, hi + 1); hist.push(j); hi = hist.length - 1; updUR(); } document.querySelector('.edate').textContent = fullDate(n.ts); };
    const later = () => { clearTimeout(timer); timer = setTimeout(commit, 350); };
    ed.addEventListener('input', later);
    ed.addEventListener('focus', () => { editing = true; setBar(); const b = document.querySelector('[data-a=back]'); });
    ed.addEventListener('blur', () => setTimeout(() => { if (document.activeElement !== ed) { editing = false; setBar(); } }, 150));
    ed.addEventListener('mousedown', e => { if (e.target.closest('.cb')) e.preventDefault(); });
    ed.addEventListener('click', e => { const cb = e.target.closest('.cb'); if (!cb) return; cb.parentNode.classList.toggle('done'); commit(); });
    ed.addEventListener('keydown', e => {
      const ln = curLine(ed); if (!ln) return; const sel = getSelection(), isCk = ln.classList.contains('ck'), tgt = ln.querySelector('span') || ln;
      if (e.key === 'Enter' && !e.isComposing) {
        e.preventDefault(); const r = sel.getRangeAt(0); if (!r.collapsed) r.deleteContents();
        if (isCk && !txtOf(ln).trim()) { const d = lineEl({ t: 'tx', c: '' }); ln.replaceWith(d); caretTo(d); commit(); return; }
        const r2 = document.createRange(); r2.selectNodeContents(tgt); r2.setStart(r.endContainer, r.endOffset); const rest = r2.extractContents().textContent;
        if (!tgt.textContent) tgt.innerHTML = '<br>';
        const d = lineEl({ t: isCk ? 'ck' : 'tx', c: rest, d: false }); ln.after(d); caretTo(d); commit(); d.scrollIntoView({ block: 'nearest' });
      } else if (e.key === 'Backspace' && sel.isCollapsed && isCk) {
        const r = document.createRange(); r.selectNodeContents(tgt); r.setEnd(sel.anchorNode, sel.anchorOffset);
        if (!r.toString().length) { e.preventDefault(); const d = lineEl({ t: 'tx', c: txtOf(ln) }); ln.replaceWith(d); caretTo(d); commit(); }
      }
    });
    ed._commit = commit;
    if (!n.del && isEmpty(n)) setTimeout(() => { ed.focus(); caretTo(ed.firstChild); }, 60);
  }
  function updUR() { const u = document.getElementById('bu'), r = document.getElementById('br'); if (u) u.disabled = hi <= 0; if (r) r.disabled = hi >= hist.length - 1; }
  function applyHist() { const n = DB.notes.find(x => x.id === top().id), ed = document.getElementById('ed'); n.lines = JSON.parse(hist[hi]); n.ts = Date.now(); save(); ed.innerHTML = ''; n.lines.forEach(l => ed.appendChild(lineEl(l))); updUR(); }
  function flush() { const ed = document.getElementById('ed'); if (ed && ed._commit) { clearTimeout(timer); ed._commit(); } }
  function leaveEdit() { flush(); const n = DB.notes.find(x => x.id === top().id); if (n && isEmpty(n) && !n.del) DB.notes = DB.notes.filter(x => x !== n); save(); editing = false; kbOpen = false; S.stack.pop(); render(); }
  function setBar() { const b = document.getElementById('kbbar'); if (!b) return; b.classList.toggle('on', editing); b.classList.toggle('kb', kbOpen); const d = document.querySelector('[data-a=done]'); if (editing && !d) { const r = document.querySelector('.nav .r'); const x = document.createElement('button'); x.dataset.a = 'done'; x.style.fontWeight = 600; x.textContent = '완료'; r.prepend(x); } else if (!editing && d) d.remove(); }
  const vv = window.visualViewport;
  function onVV() { if (!vv) return; const kb = Math.max(0, window.innerHeight - vv.height - vv.offsetTop); dev.style.setProperty('--kb', kb + 'px'); kbOpen = kb > 60; setBar(); }
  if (vv) { vv.addEventListener('resize', onVV); vv.addEventListener('scroll', onVV); }

  // ---------- 동작 ----------
  function newNote() { const t = top(), fid = t.v === 'list' && t.f !== 'all' && t.f !== 'trash' ? t.f : 'icn'; const n = { id: 'n' + Date.now(), folder: fid, pin: false, ts: Date.now(), lines: [{ t: 'tx', c: '', d: false }] }; DB.notes.push(n); save(); S.stack.push({ v: 'edit', id: n.id }); render(); }
  root.addEventListener('click', e => {
    const t = e.target.closest('[data-a]'); if (!t) return;
    if (t.classList.contains('scrim') && e.target.closest('[data-stop]')) return; const a = t.dataset.a, id = t.dataset.id;
    if (a === 'noop') return;
    const cur = top();
    switch (a) {
      case 'folder': S.stack.push({ v: 'list', f: id }); break;
      case 'open': S.stack.push({ v: 'edit', id }); break;
      case 'back': if (cur.v === 'edit') return leaveEdit(); S.stack.pop(); S.q = ''; break;
      case 'search': S.stack.push({ v: 'search' }); break;
      case 'compose': return newNote();
      case 'done': { const ed = document.getElementById('ed'); flush(); ed.blur(); editing = false; kbOpen = false; setBar(); return; }
      case 'undo': flush(); if (hi > 0) { hi--; applyHist(); } return;
      case 'redo': if (hi < hist.length - 1) { hi++; applyHist(); } return;
      case 'tcheck': { const ed = document.getElementById('ed'); let ln = curLine(ed); if (!ln) { ln = ed.lastElementChild; } const ck = ln.classList.contains('ck'), d = lineEl({ t: ck ? 'tx' : 'ck', c: txtOf(ln), d: false }); ln.replaceWith(d); caretTo(d, true); ed._commit(); ed.focus(); return; }
      case 'share': return toast('공유 시트는 지원하지 않아요');
      case 'menu': flush(); S.pop = true; break;
      case 'sclose': S.pop = false; S.sheet = null; break;
      case 'pin': { const n = DB.notes.find(x => x.id === cur.id); n.pin = !n.pin; save(); S.pop = false; render(); return toast(n.pin ? '메모를 고정했어요' : '고정을 해제했어요'); }
      case 'move': S.pop = false; S.sheet = { t: 'move' }; break;
      case 'moveto': { const n = DB.notes.find(x => x.id === cur.id); n.folder = id; save(); S.sheet = null; render(); return toast(`'${F(id).name}' 폴더로 이동했어요`); }
      case 'del': { const n = DB.notes.find(x => x.id === cur.id); S.pop = false; if (n.del) DB.notes = DB.notes.filter(x => x !== n); else { n.del = true; n.pin = false; } save(); S.stack.pop(); break; }
      case 'restore': { const n = DB.notes.find(x => x.id === cur.id); delete n.del; save(); S.pop = false; S.stack.pop(); break; }
      case 'newfolder': S.sheet = { t: 'nf' }; break;
      case 'mkfolder': { const v = document.getElementById('nf').value.trim(); if (!v) return; DB.folders.splice(DB.folders.filter(f => f.acct === 'icloud').length, 0, { id: 'f' + Date.now(), name: v, acct: 'icloud' }); save(); S.sheet = null; break; }
    }
    render();
  });
  root.addEventListener('mousedown', e => { if (e.target.closest('.kbbar')) e.preventDefault(); });
  root.addEventListener('keydown', e => { if (e.key === 'Enter' && e.target.id === 'nf') document.querySelector('[data-a=mkfolder]').click(); });
  render();
})();

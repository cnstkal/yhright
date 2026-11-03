(function () {
  const root = document.getElementById('root');

  // ---------- 사진 데이터 (장마다 서로 다른 이미지를 생성) ----------
  const rng = seed => { let a = seed >>> 0; return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; };
  function scene(i, W, H) {
    const r = rng(i * 7919 + 13), mode = i % 5, h = Math.floor(r() * 360), night = mode === 2;
    const f = (x) => x.toFixed(0), hs = (hh, s, l, a = 1) => `hsla(${hh % 360},${s}%,${l}%,${a})`;
    let s = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${W} ${H}'><defs><linearGradient id='g' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='${hs(h, 65, night ? 16 : 60)}'/><stop offset='1' stop-color='${hs(h + 40, 70, night ? 34 : 82)}'/></linearGradient></defs><rect width='${W}' height='${H}' fill='url(#g)'/>`;
    if (mode === 0) {
      s += `<circle cx='${f(r() * W)}' cy='${f(H * (.15 + r() * .2))}' r='${f(W * (.06 + r() * .06))}' fill='${hs(h + 20, 90, 92, .9)}'/>`;
      for (let k = 0; k < 3; k++) { let y = H * (.5 + k * .12), p = `M0 ${H} L0 ${f(y)}`; for (let x = 0; x <= W; x += W / 5) p += ` L${f(x)} ${f(y - r() * H * .22)}`; s += `<path d='${p} L${W} ${H}Z' fill='${hs(h + 120 + k * 15, 35, 30 - k * 6 + 10)}'/>`; }
    } else if (mode === 1) {
      const hy = H * (.5 + r() * .12);
      s += `<circle cx='${f(W * (.25 + r() * .5))}' cy='${f(hy - W * .05)}' r='${f(W * .1)}' fill='${hs(h + 25, 95, 80)}'/><rect y='${f(hy)}' width='${W}' height='${f(H - hy)}' fill='${hs(h + 200, 55, 28)}'/>`;
      for (let k = 0; k < 6; k++) s += `<rect x='${f(r() * W * .5)}' y='${f(hy + k * (H - hy) / 6)}' width='${f(W * (.3 + r() * .6))}' height='3' fill='#fff' opacity='${(.15 + r() * .3).toFixed(2)}'/>`;
    } else if (mode === 2) {
      s += `<circle cx='${f(W * (.2 + r() * .6))}' cy='${f(H * .2)}' r='${f(W * .05)}' fill='#fff6d0'/>`;
      for (let x = 0; x < W;) { const bw = 20 + r() * 40, bh = H * (.25 + r() * .4); s += `<rect x='${f(x)}' y='${f(H - bh)}' width='${f(bw)}' height='${f(bh)}' fill='${hs(h + 220, 30, 10 + r() * 10)}'/>`; for (let wy = H - bh + 8; wy < H - 8; wy += 14) for (let wx = x + 5; wx < x + bw - 6; wx += 10) if (r() > .55) s += `<rect x='${f(wx)}' y='${f(wy)}' width='4' height='6' fill='#ffd966'/>`; x += bw + 2; }
    } else if (mode === 3) {
      s += `<rect width='${W}' height='${H}' fill='${hs(h + 30, 40, 78)}'/>`;
      const cx = W * (.4 + r() * .2), cy = H * (.4 + r() * .2), R = W * .32;
      s += `<circle cx='${f(cx)}' cy='${f(cy)}' r='${f(R)}' fill='#fff'/><circle cx='${f(cx)}' cy='${f(cy)}' r='${f(R * .78)}' fill='${hs(h, 20, 94)}'/>`;
      for (let k = 0; k < 9; k++) s += `<circle cx='${f(cx + (r() - .5) * R)}' cy='${f(cy + (r() - .5) * R)}' r='${f(6 + r() * 16)}' fill='${hs(h + r() * 90, 75, 55)}'/>`;
    } else {
      for (let k = 0; k < 26; k++) s += `<circle cx='${f(r() * W)}' cy='${f(r() * H)}' r='${f(10 + r() * 38)}' fill='${hs(h + r() * 80, 75, 60, (.35 + r() * .5).toFixed(2))}'/>`;
    }
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(s + '</svg>');
  }
  const places = ['서울 마포구', '제주시', '부산 해운대구', '강릉시', '서울 성동구', '경주시', '대전 유성구', '여수시'];
  const tagsBy = ['풍경', '여행', '여행', '음식', '일상'];
  const photos = (function () {
    const r = rng(2024), out = []; let day = new Date(2024, 11, 28), n = 0;
    while (n < 90) {
      const cnt = 1 + Math.floor(r() * 4), loc = places[Math.floor(r() * places.length)]; let hr = 8 + Math.floor(r() * 4);
      for (let k = 0; k < cnt && n < 90; k++, n++) {
        const d = new Date(day); hr += 1 + Math.floor(r() * 3); d.setHours(Math.min(hr, 22), Math.floor(r() * 60));
        const v = n % 8 === 7, port = r() < .55, land = !port && r() < .5;
        const W = port ? 300 : 400, H = port ? 400 : land ? 300 : 400;
        const sec = 5 + Math.floor(r() * 150);
        out.push({ date: d, loc, type: v ? 'video' : 'photo', dur: `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`, tag: tagsBy[n % 5], fav: n % 6 === 0, kind: !v && n % 11 === 3 ? 'live' : !v && n % 13 === 5 ? 'portrait' : !v && n % 17 === 9 ? 'pano' : '', img: scene(n + 1, W, H) });
      }
      day.setDate(day.getDate() - (4 + Math.floor(r() * 11)));
    }
    return out.reverse().map((p, i) => (p.id = i, p));
  })();

  // ---------- 앨범 정의 ----------
  const albumDefs = [
    { k: 'recent', n: '최근 항목', f: () => true }, { k: 'fav', n: '즐겨찾는 항목', f: p => p.fav },
    { k: 'travel', n: '여행', f: p => p.tag === '여행' }, { k: 'food', n: '음식', f: p => p.tag === '음식' },
    { k: 'land', n: '풍경', f: p => p.tag === '풍경' }, { k: 'daily', n: '일상', f: p => p.tag === '일상' }
  ];
  const mediaDefs = [
    { k: 'video', n: '동영상', f: p => p.type === 'video', ic: '<rect x="3" y="6" width="13" height="12" rx="2"/><path d="M16 10l5-3v10l-5-3z"/>' },
    { k: 'live', n: 'Live Photo', f: p => p.kind === 'live', ic: '<circle cx="12" cy="12" r="2" fill="currentColor"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="9.500" stroke-dasharray="1.500 2"/>' },
    { k: 'portrait', n: '인물 사진', f: p => p.kind === 'portrait', ic: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="10" r="3"/><path d="M6.500 18c1-3 3-4 5.500-4s4.500 1 5.500 4"/>' },
    { k: 'pano', n: '파노라마', f: p => p.kind === 'pano', ic: '<path d="M2 8c6 2 14 2 20 0v8c-6-2-14-2-20 0z"/>' }
  ];
  const all = [...albumDefs, ...mediaDefs];
  const list = k => photos.filter(all.find(a => a.k === k).f);

  // ---------- 상태 ----------
  const S = { tab: 'library', view: 'days', select: false, sel: new Set(), album: null };
  let ctx = photos.map(p => p.id);

  // ---------- 유틸 ----------
  const sv = (p, o = '') => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" ${o}>${p}</svg>`;
  const dstr = d => `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
  const tstr = d => { const h = d.getHours(); return `${h < 12 ? '오전' : '오후'} ${h % 12 || 12}:${String(d.getMinutes()).padStart(2, '0')}`; };
  const cnt = arr => { const v = arr.filter(p => p.type === 'video').length; return `${arr.length - v}장의 사진${v ? `, ${v}개의 비디오` : ''}`.replace('장의 사진', '장의 사진'); };
  const footer = arr => { const v = arr.filter(p => p.type === 'video').length; return `<div class="foot">사진 ${arr.length - v}장, 비디오 ${v}개<small>오늘 업데이트됨</small></div>`; };
  const tile = p => `<button class="tile ${S.sel.has(p.id) ? 'on' : ''}" data-id="${p.id}" aria-label="${p.type === 'video' ? '비디오' : '사진'}, ${dstr(p.date)}"><img src="${p.img}" alt="" loading="lazy">${p.type === 'video' ? `<span class="dur">${sv('<path d="M7 4l13 8-13 8z" fill="currentColor"/>')}${p.dur}</span>` : ''}<i class="ck">${sv('<path d="M6 12.500l4 4 8-9"/>', 'stroke-width="3"')}</i></button>`;
  const grid = (arr, c) => `<div class="grid c${c}">${arr.map(tile).join('')}</div>`;

  const sig = '<svg viewBox="0 0 18 12" fill="#000"><rect y="8" width="3" height="4" rx=".8"/><rect x="5" y="5.500" width="3" height="6.500" rx=".8"/><rect x="10" y="3" width="3" height="9" rx=".8"/><rect x="15" width="3" height="12" rx=".8"/></svg>';
  const wifi = '<svg viewBox="0 0 17 12" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round"><path d="M1.500 4.500a10 10 0 0114 0M4 7.200a6.500 6.500 0 019 0"/><circle cx="8.500" cy="10.200" r="1.200" fill="#000" stroke="none"/></svg>';
  const bat = '<svg viewBox="0 0 27 12" fill="none"><rect x=".5" y=".5" width="23" height="11" rx="3.500" stroke="#000" opacity=".4"/><rect x="2" y="2" width="20" height="8" rx="2.200" fill="#000"/><path d="M25 4v4c.8-.3 1.500-1.100 1.500-2S25.800 4.300 25 4z" fill="#000" opacity=".4"/></svg>';

  // ---------- 화면 ----------
  function navHTML() {
    if (S.tab === 'albums') return S.album ? `<button class="btn" data-a="albback">‹ 앨범</button><div class="mid"><b>${all.find(a => a.k === S.album).n}</b></div><span style="width:50px"></span>` : `<h1>앨범</h1><span class="pill" style="background:none;font-size:28px;padding:0">+</span>`;
    if (S.tab === 'search') return '<h1>검색</h1><span></span>';
    return S.select ? `<span style="width:50px"></span><div class="mid"><b>${S.sel.size ? `${S.sel.size}장 선택됨` : '항목 선택'}</b></div><button class="btn" data-a="cancel">취소</button>` : '<h1>보관함</h1><button class="pill" data-a="select">선택</button>';
  }
  function libBody() {
    if (S.view === 'all') return grid(photos, 4) + footer(photos);
    if (S.view === 'days') {
      const g = []; photos.forEach(p => { const k = dstr(p.date), l = g[g.length - 1]; l && l.k === k ? l.a.push(p) : g.push({ k, loc: p.loc, a: [p] }); });
      return g.map(x => `<div id="d-${x.a[0].id}"><div class="gh">${x.k}<small>${x.loc}</small></div>${grid(x.a, 3)}</div>`).join('') + footer(photos);
    }
    const key = S.view === 'months' ? p => `${p.date.getFullYear()}년 ${p.date.getMonth() + 1}월` : p => `${p.date.getFullYear()}년`;
    const g = []; photos.forEach(p => { const k = key(p), l = g[g.length - 1]; l && l.k === k ? l.a.push(p) : g.push({ k, a: [p] }); });
    return `<div class="cards">${g.map(x => `<button class="card" data-a="jump" data-id="${x.a[0].id}"><img src="${x.a[Math.floor(x.a.length / 2)].img}" alt=""><span>${x.k}<small>${x.a.length}개 항목</small></span></button>`).join('')}</div>`;
  }
  function albumsBody() {
    if (S.album) { const a = list(S.album); return grid(a, 4) + footer(a); }
    const cv = (k, big) => { const a = list(k); return a[a.length - 1] ? a[a.length - 1].img : ''; };
    const alb = a => `<button class="alb" data-a="album" data-k="${a.k}"><div class="cv"><img src="${cv(a.k)}" alt=""></div><b>${a.n}</b><small>${list(a.k).length}</small></button>`;
    const row = a => `<button class="li" data-a="album" data-k="${a.k}">${sv(a.ic)}<span>${a.n}</span><small>${list(a.k).length} ›</small></button>`;
    const people = [['엄마', 4], ['지수', 9], ['콩이', 14], ['민호', 21]];
    return `<div class="sh"><b>나의 앨범</b><span>모두 보기</span></div><div class="hs">${albumDefs.map(alb).join('')}</div>
      <div class="sh"><b>사람 및 반려동물</b><span>모두 보기</span></div><div class="ppl">${people.map(([n, i]) => `<div><div class="cv"><img src="${photos[i].img}" alt=""></div><b>${n}</b></div>`).join('')}</div>
      <div class="sh"><b>장소</b><span>모두 보기</span></div><div class="place">${sv('<path d="M0 60 Q100 10 200 70 T400 40M0 120 Q150 80 260 130 T400 110M80 0 L120 160M260 0 L230 160" stroke="#fff" stroke-width="4" fill="none"/>', 'preserveAspectRatio="none" viewBox="0 0 400 160"')}<i style="left:90px;top:40px"></i><i style="left:210px;top:70px"></i><i style="left:290px;top:30px"></i><b>${new Set(photos.map(p => p.loc)).size}곳</b></div>
      <div class="sh"><b>미디어 유형</b></div><div class="list">${mediaDefs.map(row).join('')}</div>
      <div class="sh"><b>기타 항목</b></div><div class="list">${[['가져온 항목', '<path d="M12 4v11M7 11l5 5 5-5M4 20h16"/>'], ['숨겨진 항목', '<path d="M3 3l18 18M10 6a9 9 0 0111 6 9 9 0 01-3 3.500M6 8a9 9 0 00-3 4c3 6 9 7 14 4"/>'], ['최근 삭제된 항목', '<path d="M5 7h14M9 7V4h6v3M7 7l1 13h8l1-13"/>']].map(([n, ic]) => `<div class="li dis">${sv(ic)}<span>${n}</span><small>›</small></div>`).join('')}</div><div class="pad"></div>`;
  }
  function searchBody() {
    const rec = ['제주도', '2024년 여름', '음식', '서울 마포구'];
    const loc = [...new Set(photos.map(p => p.loc))].slice(0, 4);
    return `<div class="dis"><div class="sbox">${sv('<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>')}<input placeholder="사진, 사람, 장소 등" disabled aria-label="검색"></div>
      <div class="sh"><b>최근 검색</b><span>지우기</span></div>${rec.map(t => `<div class="rec">${sv('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>')}${t}</div>`).join('')}
      <div class="sh"><b>장소</b></div><div class="cards" style="grid-template-columns:1fr 1fr;padding-bottom:6px">${loc.map((l, i) => `<div class="card sm"><img src="${photos[i * 7 + 2].img}" alt=""><span style="font-size:16px">${l}</span></div>`).join('')}</div>
      <div class="sh"><b>날짜</b></div><div class="chips">${['2024년 12월', '2024년 11월', '2024년 10월', '2024년 9월'].map(t => `<span class="chip">${t}</span>`).join('')}</div><div class="pad"></div></div>`;
  }
  function render(keepScroll) {
    const tab = (k, ic, lb) => `<button class="tab ${S.tab === k ? 'on' : ''}" data-a="tab" data-t="${k}">${ic}<span>${lb}</span></button>`;
    const bodyH = S.tab === 'library' ? libBody() : S.tab === 'albums' ? albumsBody() : searchBody();
    const seg = S.tab === 'library' && !S.select ? `<div class="seg">${[['years', '연도'], ['months', '월'], ['days', '일'], ['all', '모든 사진']].map(([k, n]) => `<button class="${S.view === k ? 'on' : ''}" data-a="view" data-v="${k}">${n}</button>`).join('')}</div>` : '';
    root.innerHTML = `<div class="status"><span>9:41</span><span class="r">${sig}${wifi}${bat}</span></div>
      <div class="scr ${S.select ? 'sel' : ''}" id="scr"><div class="nav" id="nav">${navHTML()}</div><div class="body" id="body">${bodyH}</div>${seg}</div>
      <div class="tabbar">${tab('library', sv('<rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="9" cy="9" r="2"/><path d="M3 17l5-5 4 4 3-3 6 6"/>', 'stroke-width="1.8"'), '보관함')}${tab('albums', sv('<rect x="4" y="6" width="16" height="14" rx="3"/><path d="M7 3h10"/>', 'stroke-width="1.8"'), '앨범')}${tab('search', sv('<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>', 'stroke-width="2"'), '검색')}</div>`;
    const b = document.getElementById('body');
    if (S.tab === 'library' || S.album) b.scrollTop = b.scrollHeight;
  }
  function refreshSel() {
    document.getElementById('nav').innerHTML = navHTML();
    document.querySelectorAll('.tile').forEach(t => t.classList.toggle('on', S.sel.has(+t.dataset.id)));
  }

  // ---------- 전체 화면 보기 ----------
  function openViewer(arr, pos) {
    const v = document.createElement('div'); v.className = 'viewer';
    const back = S.tab === 'albums' ? '앨범' : '보관함';
    v.innerHTML = `<div class="nav"><button class="btn" data-a="vclose">‹ ${back}</button><div class="mid" id="vmid"></div><button class="btn">편집</button></div>
      <div class="strip" id="strip">${arr.map(p => `<div data-v="1"><img src="${p.img}" alt="${dstr(p.date)}">${p.type === 'video' ? `<span class="play">${sv('<path d="M7 4l13 8-13 8z" fill="currentColor"/>', 'stroke="none"')}</span>` : ''}</div>`).join('')}</div>
      <div class="tools">${sv('<path d="M12 3v12M8 7l4-4 4 4M5 11v9h14v-9"/>')}${sv('<path d="M12 20s-8-5-8-11a4.500 4.500 0 018-2.500A4.500 4.500 0 0120 9c0 6-8 11-8 11z"/>')}${sv('<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.500v.1"/>')}${sv('<path d="M5 7h14M9 7V4h6v3M7 7l1 13h8l1-13"/>')}</div>`;
    root.appendChild(v);
    const st = v.querySelector('#strip'), mid = v.querySelector('#vmid');
    const upd = () => { const p = arr[Math.round(st.scrollLeft / st.clientWidth)] || arr[0]; mid.innerHTML = `<b>${dstr(p.date)}</b>${tstr(p.date)}`; };
    st.scrollLeft = pos * st.clientWidth; upd(); st.addEventListener('scroll', upd);
    st.addEventListener('click', () => v.classList.toggle('dark'));
    v.querySelector('[data-a=vclose]').onclick = () => v.remove();
  }

  // ---------- 이벤트 ----------
  root.addEventListener('click', e => {
    const t = e.target.closest('[data-a],.tile'); if (!t) return;
    if (t.classList.contains('tile')) {
      const id = +t.dataset.id;
      if (S.select) { S.sel.has(id) ? S.sel.delete(id) : S.sel.add(id); refreshSel(); return; }
      const arr = S.tab === 'albums' && S.album ? list(S.album) : photos;
      openViewer(arr, arr.findIndex(p => p.id === id)); return;
    }
    const a = t.dataset.a;
    if (a === 'tab') { S.tab = t.dataset.t; S.select = false; S.sel.clear(); S.album = null; render(); }
    else if (a === 'view') { S.view = t.dataset.v; render(); }
    else if (a === 'select') { S.select = true; render(); }
    else if (a === 'cancel') { S.select = false; S.sel.clear(); render(); }
    else if (a === 'album') { S.album = t.dataset.k; render(); }
    else if (a === 'albback') { S.album = null; render(); }
    else if (a === 'jump') { S.view = 'days'; render(); const el = document.getElementById('d-' + t.dataset.id) || document.getElementById('body'); const b = document.getElementById('body'); b.scrollTop = el.offsetTop - 4; }
  });
  render();
})();

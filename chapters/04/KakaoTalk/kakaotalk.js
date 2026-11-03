// 기존 친구/프로필/채팅 데이터는 이 파일에 넣으세요.
// photo: { bg:'CSS 배경', emoji:'표시' } 또는 { src:'이미지 URL' }
(function () {
  const now = new Date();
  const at = (daysAgo, h, m) => { const d = new Date(now); d.setDate(d.getDate() - daysAgo); d.setHours(h, m, 0, 0); return d.toISOString(); };
  window.DATA = {
    me: { name: '민지', status: '오늘도 화이팅 :)', photo: { bg: 'linear-gradient(160deg,#ffd194,#ff9a8b)', emoji: '🙂' } },
    friends: [
      { id: 'f1', name: '김서연', status: '커피 마시러 갈 사람?', fav: true, photo: { bg: 'linear-gradient(160deg,#a1c4fd,#c2e9fb)', emoji: '☕' } },
      { id: 'f2', name: '박지우', status: '', fav: true, photo: { bg: 'linear-gradient(160deg,#fbc2eb,#a6c1ee)', emoji: '🐶' } },
      { id: 'f3', name: '이도윤', status: '바쁘다 바빠', birthday: true, photo: { bg: 'linear-gradient(160deg,#f6d365,#fda085)', emoji: '🎂' } },
      { id: 'f4', name: '강하은', status: '운동 중 💪', photo: { bg: 'linear-gradient(160deg,#84fab0,#8fd3f4)', emoji: '🌿' } },
      { id: 'f5', name: '최수빈', status: '여행 가고 싶다', photo: { bg: 'linear-gradient(160deg,#fa709a,#fee140)', emoji: '✈️' } },
      { id: 'f6', name: '정예린', status: '', photo: { bg: 'linear-gradient(160deg,#667eea,#764ba2)', emoji: '📷' } },
      { id: 'f7', name: '한유나', status: '잠시 자리 비움', photo: { bg: 'linear-gradient(160deg,#c3cfe2,#f5f7fa)', emoji: '📚' } },
      { id: 'f8', name: '윤태현', status: '주말엔 등산!', photo: { bg: 'linear-gradient(160deg,#d4fc79,#96e6a1)', emoji: '⛰️' } }
    ],
    chats: [
      { id: 'c1', friend: 'f1', msgs: [
        { from: 'f1', text: '내일 점심 뭐 먹을래?', ts: at(1, 18, 2) },
        { from: 'me', text: '샐러드 어때?', ts: at(1, 18, 5) },
        { from: 'f1', text: '좋아! 12시에 역 앞에서 보자', ts: at(0, 9, 12) },
        { from: 'f1', text: '늦지 마~ ㅎㅎ', ts: at(0, 9, 13) } ], unread: 2 },
      { id: 'c2', friend: 'f3', msgs: [
        { from: 'me', text: '생일 축하해!! 🎉', ts: at(0, 8, 30) },
        { from: 'f3', text: '고마워 ㅠㅠ 저녁에 시간 돼?', ts: at(0, 8, 41) } ], unread: 1 },
      { id: 'c3', group: '주말 등산 모임', members: ['f8', 'f4', 'f5'], photo: { bg: 'linear-gradient(160deg,#d4fc79,#96e6a1)', emoji: '⛰️' }, msgs: [
        { from: 'f8', text: '이번 주 토요일 북한산 어때요?', ts: at(2, 20, 10) },
        { from: 'f4', text: '저는 좋아요!', ts: at(2, 20, 12) },
        { from: 'me', text: '저도 참석할게요', ts: at(2, 20, 30) } ], unread: 0 },
      { id: 'c4', friend: 'f2', msgs: [
        { from: 'f2', text: '사진 보내줘서 고마워', ts: at(4, 14, 2) },
        { from: 'me', text: '별말씀을~', ts: at(4, 14, 20) } ], unread: 0 }
    ]
  };
})();
(function () {
  const D = window.DATA, KEY = 'kakao2023-ch04';
  const root = document.getElementById('root');
  const S = { tab: 'friends', view: null, chats: JSON.parse(JSON.stringify(D.chats)) };
  try { const s = JSON.parse(localStorage.getItem(KEY)); if (s && s.chats) S.chats = s.chats; } catch (e) {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify({ chats: S.chats })); } catch (e) {} };

  const F = id => D.friends.find(f => f.id === id);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const bg = p => p.src ? `background-image:url(${p.src})` : `background:${p.bg}`;
  const fc = p => p.src ? '' : (p.emoji || '');
  const av = (p, sz) => `<div class="av ${sz}" style="${bg(p)}">${fc(p)}</div>`;
  const hm = iso => { const d = new Date(iso), h = d.getHours(); return `${h < 12 ? '오전' : '오후'} ${h % 12 || 12}:${String(d.getMinutes()).padStart(2, '0')}`; };
  const ymd = d => d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
  const listTime = iso => { const d = new Date(iso), n = new Date(); if (ymd(d) === ymd(n)) return hm(iso); const y = new Date(n); y.setDate(n.getDate() - 1); return ymd(d) === ymd(y) ? '어제' : `${d.getMonth() + 1}월 ${d.getDate()}일`; };
  const dateLabel = iso => { const d = new Date(iso); return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일 ${'일월화수목금토'[d.getDay()]}요일`; };

  const stroke = 'fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"';
  const I = {
    search: `<svg viewBox="0 0 24 24" ${stroke}><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>`,
    addf: `<svg viewBox="0 0 24 24" ${stroke}><circle cx="10" cy="8" r="4"/><path d="M2.5 20c0-4 3.5-6 7.500-6M18 8v6M15 11h6"/></svg>`,
    gear: `<svg viewBox="0 0 24 24" ${stroke}><circle cx="12" cy="12" r="3"/><path d="M12 3v2.500M12 18.500V21M3 12h2.500M18.500 12H21M5.600 5.600l1.800 1.800M16.600 16.600l1.800 1.800M5.600 18.400l1.800-1.800M16.600 7.400l1.800-1.800"/></svg>`,
    back: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" width="26" height="26"><path d="M15 5l-7 7 7 7"/></svg>`,
    close: `<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" width="26" height="26"><path d="M6 6l12 12M18 6L6 18"/></svg>`,
    plus: `<svg viewBox="0 0 24 24" ${stroke}><path d="M12 5v14M5 12h14"/></svg>`,
    msg: `<svg viewBox="0 0 24 24" fill="#fff"><path d="M12 3C6.500 3 2.500 6.500 2.500 10.800c0 2.800 1.700 5.200 4.300 6.600l-1 3.700c-.1.400.3.600.6.400l4.400-2.900c.4 0 .8.100 1.200.1 5.500 0 9.500-3.500 9.500-7.900S17.500 3 12 3z"/></svg>`
  };
  const T = {
    friends: on => on ? `<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="7.500" r="4.200"/><path d="M3.500 21c0-4.700 3.800-7.500 8.500-7.500s8.500 2.800 8.500 7.500z"/></svg>` : `<svg viewBox="0 0 24 24" ${stroke}><circle cx="12" cy="7.500" r="4"/><path d="M4 20.500c0-4.200 3.500-6.500 8-6.500s8 2.300 8 6.500z"/></svg>`,
    chats: on => on ? `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3C6.500 3 2.500 6.500 2.500 10.800c0 2.800 1.700 5.200 4.300 6.600l-1 3.700c-.1.400.3.600.6.400l4.400-2.900c.4 0 .8.100 1.200.1 5.500 0 9.500-3.500 9.500-7.900S17.500 3 12 3z"/></svg>` : `<svg viewBox="0 0 24 24" ${stroke}><path d="M12 3.500c-5 0-9 3.200-9 7.300 0 2.600 1.600 4.800 4 6.100l-.9 3.300 4-2.600c.6.100 1.200.2 1.900.2 5 0 9-3.200 9-7.300s-4-7-9-7z"/></svg>`,
    open: () => `<svg viewBox="0 0 24 24" ${stroke}><path d="M12 3.500c-5 0-9 3.200-9 7.300 0 2.600 1.600 4.800 4 6.100l-.9 3.300 4-2.600c.6.100 1.200.2 1.900.2 5 0 9-3.200 9-7.300s-4-7-9-7z"/><circle cx="12" cy="10" r="1.800"/><path d="M8.800 14.200c.8-1.500 2.200-2 3.200-2s2.400.5 3.200 2"/></svg>`,
    shop: () => `<svg viewBox="0 0 24 24" ${stroke}><path d="M5 8h14l-1 12H6z"/><path d="M9 8V6.500a3 3 0 016 0V8"/></svg>`,
    more: () => `<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="5.500" cy="12" r="1.700"/><circle cx="12" cy="12" r="1.700"/><circle cx="18.500" cy="12" r="1.700"/></svg>`
  };

  const nameOf = c => c.group || F(c.friend).name;
  const photoOf = c => c.group ? c.photo : F(c.friend).photo;
  const last = c => c.msgs[c.msgs.length - 1];
  const totalUnread = () => S.chats.reduce((a, c) => a + (c.unread || 0), 0);
  const sorted = () => S.chats.filter(c => c.msgs.length).sort((a, b) => new Date(last(b).ts) - new Date(last(a).ts));

  function friendsTab() {
    const fr = D.friends, fav = fr.filter(f => f.fav), bd = fr.filter(f => f.birthday);
    const row = f => `<button class="row" data-a="profile" data-id="${f.id}">${av(f.photo, 's')}<div class="t"><b>${esc(f.name)}</b>${f.status ? `<small>${esc(f.status)}</small>` : ''}</div></button>`;
    return `<div class="me"><button class="row" data-a="profile" data-id="me">${av(D.me.photo, 'm')}<div class="t"><b>${esc(D.me.name)}</b>${D.me.status ? `<small>${esc(D.me.status)}</small>` : ''}</div></button></div>
      ${bd.length ? `<div class="sec">생일인 친구</div>${bd.map(f => `<button class="row bday" data-a="profile" data-id="${f.id}">${av(f.photo, 's')}<div class="t"><b>${esc(f.name)} 🎂</b><small>오늘 생일이에요</small></div></button>`).join('')}` : ''}
      ${fav.length ? `<div class="sec">즐겨찾기 ${fav.length}</div>${fav.map(row).join('')}` : ''}
      <div class="sec">친구 ${fr.length}</div>${fr.map(row).join('')}<div style="height:16px"></div>`;
  }
  function chatsTab() {
    const list = sorted();
    if (!list.length) return '<div class="empty">채팅방이 없어요</div>';
    return list.map(c => { const m = last(c); return `<button class="crow" data-a="room" data-id="${c.id}">${av(photoOf(c), 'm')}<div class="t"><b>${esc(nameOf(c))}${c.group ? `<i>${c.members.length + 1}</i>` : ''}</b><small>${esc(m.text)}</small></div><div class="r"><time>${listTime(m.ts)}</time>${c.unread ? `<span class="cnt">${c.unread}</span>` : ''}</div></button>`; }).join('');
  }
  function profileView(id) {
    const me = id === 'me', p = me ? D.me : F(id), ph = p.photo;
    const chat = !me && S.chats.find(c => c.friend === id);
    return `<div class="pv"><div class="bgp" style="${bg(ph)}"></div>
      <div class="top"><button class="ib" data-a="back" aria-label="닫기">${I.close}</button></div>
      <div class="center"><div class="big" style="${bg(ph)}">${fc(ph)}</div><h2>${esc(p.name)}</h2><p>${esc(p.status || '')}</p></div>
      ${me ? '<div class="act" style="padding-bottom:40px"></div>' : `<div class="act"><button data-a="msgto" data-id="${id}">${I.msg}메시지 보내기</button></div>`}</div>`;
  }
  function msgsHTML(c) {
    let out = '', lastD = '';
    c.msgs.forEach((m, i) => {
      const d = ymd(new Date(m.ts)); if (d !== lastD) { out += `<div class="dv">${dateLabel(m.ts)}</div>`; lastD = d; }
      const prev = c.msgs[i - 1], next = c.msgs[i + 1];
      const sameMin = (a, b) => a && b && a.from === b.from && ymd(new Date(a.ts)) === ymd(new Date(b.ts)) && hm(a.ts) === hm(b.ts);
      const showTime = !sameMin(m, next);
      const t = showTime ? `<time>${hm(m.ts)}</time>` : '';
      if (m.from === 'me') { out += `<div class="m me">${t}<div class="bub">${esc(m.text)}</div></div>`; return; }
      const f = F(m.from), cont = prev && prev.from === m.from && ymd(new Date(prev.ts)) === d && sameMin(prev, m);
      out += `<div class="m th ${cont ? 'cont' : ''}">${av(f.photo, 's')}<div class="col">${c.group ? `<span class="nm">${esc(f.name)}</span>` : '<span class="nm" style="display:none"></span>'}<div class="line"><div class="bub">${esc(m.text)}</div>${t}</div></div></div>`;
    });
    return out;
  }
  function roomView(id) {
    const c = S.chats.find(x => x.id === id);
    return `<div class="room"><div class="rh"><button class="ib" data-a="back" aria-label="뒤로">${I.back}</button><h3>${esc(nameOf(c))}${c.group ? `<span>${c.members.length + 1}</span>` : ''}</h3><span class="ib" style="color:#333">${I.search}</span></div>
      <div class="msgs" id="msgs">${msgsHTML(c)}</div>
      <div class="input"><span class="plus">${I.plus}</span><input id="inp" type="text" enterkeyhint="send" placeholder="" autocomplete="off"><button class="send" id="sendbtn" data-a="send" data-id="${id}">전송</button></div></div>`;
  }

  function render() {
    const tab = (k, ic, lb, on, enabled, badge) => `<button class="tab ${on ? 'on' : ''} ${enabled ? '' : 'off'}" ${enabled ? `data-a="tab" data-t="${k}"` : 'tabindex="-1" aria-disabled="true"'}>${ic}${badge ? `<i class="bd">${badge > 99 ? '99+' : badge}</i>` : ''}<span>${lb}</span></button>`;
    const isF = S.tab === 'friends';
    root.innerHTML = `<div class="gap"></div><div class="hdr"><h1>${isF ? '친구' : '채팅'}</h1><div class="icons"><span class="ib">${I.search}</span>${isF ? `<span class="ib">${I.addf}</span><span class="ib">${I.gear}</span>` : ''}</div></div>
      <div class="body" id="body">${isF ? friendsTab() : chatsTab()}</div>
      <div class="tabs">${tab('friends', T.friends(isF), '친구', isF, true)}${tab('chats', T.chats(!isF), '채팅', !isF, true, totalUnread())}${tab('open', T.open(), '오픈채팅', false, false)}${tab('shop', T.shop(), '쇼핑', false, false)}${tab('more', T.more(), '더보기', false, false)}</div>
      ${S.view ? (S.view.k === 'profile' ? profileView(S.view.id) : roomView(S.view.id)) : ''}`;
    if (S.view && S.view.k === 'room') { const m = document.getElementById('msgs'); m.scrollTop = m.scrollHeight; bindInput(S.view.id); }
  }
  function bindInput(id) {
    const inp = document.getElementById('inp'), btn = document.getElementById('sendbtn');
    inp.addEventListener('input', () => btn.classList.toggle('on', !!inp.value.trim()));
    inp.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.isComposing && e.keyCode !== 229) { e.preventDefault(); send(id); } });
  }
  function send(id) {
    const inp = document.getElementById('inp'); if (!inp) return; const v = inp.value.trim(); if (!v) return;
    const c = S.chats.find(x => x.id === id); c.msgs.push({ from: 'me', text: v, ts: new Date().toISOString() }); save();
    inp.value = ''; document.getElementById('sendbtn').classList.remove('on');
    const box = document.getElementById('msgs'); box.innerHTML = msgsHTML(c); box.scrollTop = box.scrollHeight; inp.focus();
  }
  function openRoom(id) { const c = S.chats.find(x => x.id === id); c.unread = 0; save(); S.view = { k: 'room', id }; render(); }

  root.addEventListener('click', e => {
    const t = e.target.closest('[data-a]'); if (!t) return;
    const a = t.dataset.a, id = t.dataset.id;
    if (a === 'tab') { S.tab = t.dataset.t; render(); }
    else if (a === 'profile') { S.view = { k: 'profile', id }; render(); }
    else if (a === 'back') { S.view = null; render(); }
    else if (a === 'room') openRoom(id);
    else if (a === 'msgto') {
      let c = S.chats.find(x => x.friend === id);
      if (!c) { c = { id: 'c-' + id, friend: id, msgs: [], unread: 0 }; S.chats.push(c); }
      S.tab = 'chats'; openRoom(c.id);
    } else if (a === 'send') send(id);
  });
  render();
})();

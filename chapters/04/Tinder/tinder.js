// 기존 프로필/사진/매칭/대화 데이터는 이 파일에 넣으세요.
// photo: { bg: 'CSS 배경', emoji: '표시' } 또는 { src: '이미지 URL' }
window.DATA = {
  me: {
    name: '민지', age: 27,
    bio: '주말엔 한강 러닝, 평일엔 커피 한 잔. 맛집 지도 만드는 게 취미예요.',
    photos: [
      { bg: 'linear-gradient(160deg,#ff9a8b,#ff6a88)', emoji: '🏃‍♀️' },
      { bg: 'linear-gradient(160deg,#a18cd1,#fbc2eb)', emoji: '☕' },
      { bg: 'linear-gradient(160deg,#84fab0,#8fd3f4)', emoji: '🌿' }
    ],
    interests: ['러닝', '카페 투어', '전시회', '여행'],
    info: { pets: '고양이', drink: '가끔', smoke: '비흡연', workout: '자주' },
    goal: '장기 연애',
    prompts: [
      { q: '내 마음의 열쇠는…', a: '먼저 안부를 물어 주는 사람' },
      { q: '내 버킷리스트의 첫 번째 항목은…', a: '아이슬란드에서 오로라 보기' }
    ],
    quiz: { q: '내가 가장 좋아하는 계절은?', options: ['봄', '여름', '가을', '겨울'], answer: 2 }
  },
  profiles: [
    { id: 'p1', name: '서연', age: 26, km: 3, job: '디자이너', school: '홍익대학교', likesMe: true,
      bio: '고양이 두 마리와 살아요. 같이 전시 보러 가요.',
      photos: [
        { bg: 'linear-gradient(160deg,#f6d365,#fda085)', emoji: '🐱' },
        { bg: 'linear-gradient(160deg,#fbc2eb,#a6c1ee)', emoji: '🎨' },
        { bg: 'linear-gradient(160deg,#84fab0,#8fd3f4)', emoji: '🌳' }
      ],
      interests: ['전시회', '고양이', '필름 카메라'],
      info: { pets: '고양이', drink: '가끔', smoke: '비흡연', workout: '가끔' }, goal: '장기 연애',
      prompts: [{ q: '내 마음의 열쇠는…', a: '같이 웃을 수 있는 유머 코드' }, { q: '나에 대한 두 가지 진실과 거짓', a: '고양이 둘 · 마라톤 완주 · 비행기 조종 경험 (하나는 거짓)' }],
      quiz: { q: '내 최애 디저트는?', options: ['마카롱', '티라미수', '붕어빵', '빙수'], answer: 1 } },
    { id: 'p2', name: '지우', age: 29, km: 7, job: '개발자', school: '연세대학교', likesMe: false,
      bio: '새벽 러닝 하고 브런치 먹는 주말을 좋아해요.',
      photos: [
        { bg: 'linear-gradient(160deg,#89f7fe,#66a6ff)', emoji: '🏃' },
        { bg: 'linear-gradient(160deg,#fddb92,#d1fdff)', emoji: '🥞' }
      ],
      interests: ['러닝', '브런치', '보드게임'],
      info: { pets: '없음', drink: '자주', smoke: '비흡연', workout: '매일' }, goal: '새로운 친구',
      prompts: [{ q: '내 버킷리스트의 첫 번째 항목은…', a: '하프 마라톤 1시간 40분 안에 들어오기' }],
      quiz: { q: '내가 사는 동네는?', options: ['마포', '성수', '판교', '송도'], answer: 3 } },
    { id: 'p3', name: '하은', age: 25, km: 12, job: '간호사', school: '서울대학교', likesMe: true,
      bio: '야간 근무 끝나고 먹는 라면이 인생 낙.',
      photos: [
        { bg: 'linear-gradient(160deg,#ffecd2,#fcb69f)', emoji: '🍜' },
        { bg: 'linear-gradient(160deg,#a1c4fd,#c2e9fb)', emoji: '🌊' },
        { bg: 'linear-gradient(160deg,#d4fc79,#96e6a1)', emoji: '⛺' }
      ],
      interests: ['캠핑', '라면', '넷플릭스'],
      info: { pets: '강아지', drink: '비음주', smoke: '비흡연', workout: '가끔' }, goal: '아직 모르겠어요',
      prompts: [{ q: '내 마음의 열쇠는…', a: '따뜻한 국물 같은 사람' }],
      quiz: { q: '내 취미는?', options: ['캠핑', '서핑', '독서', '요리'], answer: 0 } },
    { id: 'p4', name: '도윤', age: 30, km: 5, job: '셰프', school: '경희대학교', likesMe: false,
      bio: '요리해 드릴게요. 대신 설거지는 같이.',
      photos: [
        { bg: 'linear-gradient(160deg,#f093fb,#f5576c)', emoji: '🍳' },
        { bg: 'linear-gradient(160deg,#4facfe,#00f2fe)', emoji: '🔪' }
      ],
      interests: ['요리', '와인', '재즈'],
      info: { pets: '없음', drink: '자주', smoke: '가끔', workout: '가끔' }, goal: '장기 연애',
      prompts: [{ q: '나에 대한 두 가지 진실과 거짓', a: '파리 유학 · 미슐랭 근무 · 완벽한 길치 (하나는 거짓)' }],
      quiz: { q: '제가 제일 자신 있는 요리는?', options: ['파스타', '스테이크', '된장찌개', '오믈렛'], answer: 0 } },
    { id: 'p5', name: '유나', age: 24, km: 2, job: '대학원생', school: '이화여자대학교', likesMe: true,
      bio: '논문 쓰다 지치면 산책해요. 같이 걸어요.',
      photos: [
        { bg: 'linear-gradient(160deg,#c3cfe2,#f5f7fa)', emoji: '📚' },
        { bg: 'linear-gradient(160deg,#ffd1ff,#fad0c4)', emoji: '🌸' }
      ],
      interests: ['산책', '독서', '클래식'],
      info: { pets: '없음', drink: '가끔', smoke: '비흡연', workout: '가끔' }, goal: '장기 연애',
      prompts: [{ q: '내 버킷리스트의 첫 번째 항목은…', a: '논문 통과하고 제주 한 달 살기' }],
      quiz: { q: '내가 공부하는 분야는?', options: ['심리학', '통계학', '문학', '건축'], answer: 0 } },
    // 이미 매칭된 프로필
    { id: 'm1', name: '수빈', age: 27, km: 4, job: '마케터', school: '고려대학교', likesMe: true,
      bio: '맛집 탐방 같이 해요.', photos: [{ bg: 'linear-gradient(160deg,#fa709a,#fee140)', emoji: '🍣' }, { bg: 'linear-gradient(160deg,#30cfd0,#330867)', emoji: '🌃' }],
      interests: ['맛집', '여행'], info: { pets: '없음', drink: '가끔', smoke: '비흡연', workout: '가끔' }, goal: '장기 연애',
      prompts: [{ q: '내 마음의 열쇠는…', a: '맛있는 걸 같이 먹는 사람' }], quiz: { q: '좋아하는 음식은?', options: ['초밥', '피자', '떡볶이', '곱창'], answer: 0 } },
    { id: 'm2', name: '예린', age: 28, km: 9, job: '사진작가', school: '중앙대학교', likesMe: true,
      bio: '사진 찍는 걸 좋아해요.', photos: [{ bg: 'linear-gradient(160deg,#667eea,#764ba2)', emoji: '📷' }],
      interests: ['사진', '여행'], info: { pets: '고양이', drink: '자주', smoke: '비흡연', workout: '가끔' }, goal: '새로운 친구',
      prompts: [{ q: '내 버킷리스트의 첫 번째 항목은…', a: '사하라 사막에서 별 사진 찍기' }], quiz: { q: '제 카메라 브랜드는?', options: ['캐논', '소니', '니콘', '후지'], answer: 3 } },
    { id: 'm3', name: '다은', age: 26, km: 6, job: '요가 강사', school: '한양대학교', likesMe: true,
      bio: '요가와 명상.', photos: [{ bg: 'linear-gradient(160deg,#96fbc4,#f9f586)', emoji: '🧘‍♀️' }],
      interests: ['요가', '명상'], info: { pets: '강아지', drink: '비음주', smoke: '비흡연', workout: '매일' }, goal: '장기 연애',
      prompts: [{ q: '내 마음의 열쇠는…', a: '차분한 대화' }], quiz: { q: '아침 루틴은?', options: ['요가', '러닝', '독서', '늦잠'], answer: 0 } }
  ],
  matches: ['m1', 'm2', 'm3'],
  chats: {
    m1: [
      { from: 'them', type: 'text', text: '안녕하세요! 프로필 보고 반가웠어요 😊' },
      { from: 'me', type: 'text', text: '안녕하세요! 저도요' },
      { from: 'them', type: 'text', text: '이번 주말에 성수 카페 가볼래요?' }
    ],
    m2: [
      { from: 'them', type: 'photo', bg: 'linear-gradient(160deg,#667eea,#764ba2)', emoji: '🌌' },
      { from: 'them', type: 'text', text: '어제 찍은 사진이에요' }
    ],
    m3: []
  },
  unread: { m1: 1, m2: 2, m3: 0 }
};
(function () {
  const D = window.DATA;
  const KEY = 'tinder2023-ch04';
  const byId = id => D.profiles.find(p => p.id === id);
  const dev = document.getElementById('device');
  const root = document.getElementById('root');

  // ---------- state ----------
  const S = {
    tab: 'discover', views: [], sheet: null, toast: '', matchOverlay: null,
    deck: D.profiles.filter(p => !D.matches.includes(p.id)).map(p => p.id),
    history: [], pi: {}, matches: D.matches.slice(), chats: JSON.parse(JSON.stringify(D.chats)),
    unread: Object.assign({}, D.unread), me: JSON.parse(JSON.stringify(D.me)), quiz: {}, boosted: false,
    dark: false, set: { dist: 30, amin: 22, amax: 35, show: '모두', push: true, msgs: true, likes: true }, newSeen: {}
  };
  try { const s = JSON.parse(localStorage.getItem(KEY)); if (s) Object.assign(S, s, { views: [], sheet: null, matchOverlay: null, toast: '' }); } catch (e) {}
  const save = () => { try { const { views, sheet, matchOverlay, toast, ...rest } = S; localStorage.setItem(KEY, JSON.stringify(rest)); } catch (e) {} };

  // ---------- icons ----------
  const I = {
    flame: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.6 2.2c.3 2.2-.5 3.7-1.7 5.2C9.4 9.2 8 10.7 8 13.1c0 1.2.5 2.1 1.2 2.7-.1-1.6.7-2.7 1.8-3.6.9 2 3.9 2.7 3.9 5.5 0 1.5-.9 2.6-2.3 3.1 3.1-.1 5.4-2.4 5.4-5.6 0-3.7-2.6-5-3.5-7.6-.4-1-.5-2.3-.4-3.4-1.2.4-2.4.7-2.5 0-.2-.8.1-1.5.1-2z"/></svg>',
    bell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 01-3.4 0"/></svg>',
    gear: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1.1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.5-1.1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.8.3H9a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8V9a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z"/></svg>',
    chat: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h16a2 2 0 012 2v10a2 2 0 01-2 2H9l-5 4v-4a2 2 0 01-2-2V6a2 2 0 012-2z"/></svg>',
    user: '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="8" r="4.5"/><path d="M3.5 21c0-4.5 3.8-7 8.5-7s8.5 2.5 8.5 7z"/></svg>',
    back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>',
    down: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 9l7 7 7-7"/></svg>',
    info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 11v5M12 7.5v.1"/></svg>',
    rewind: '<svg viewBox="0 0 24 24" fill="none" stroke="#ffc629" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6v5h5"/><path d="M4.5 11A8 8 0 1112 20"/></svg>',
    nope: '<svg viewBox="0 0 24 24" fill="none" stroke="#fd267a" stroke-width="3.4" stroke-linecap="round"><path d="M5 5l14 14M19 5L5 19"/></svg>',
    star: '<svg viewBox="0 0 24 24" fill="#1da8f9"><path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7L12 17.2 5.8 20.9l1.6-7L2 9.2l7.1-.6z"/></svg>',
    like: '<svg viewBox="0 0 24 24" fill="#21d07a"><path d="M12 21s-8-5.2-8-11a4.6 4.6 0 018-3 4.6 4.6 0 018 3c0 5.800-8 11-8 11z"/></svg>',
    bolt: '<svg viewBox="0 0 24 24" fill="#a25af0"><path d="M13 2L4 14h7l-1 8 9-12h-7z"/></svg>',
    heart: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-8-5.2-8-11a4.6 4.6 0 018-3 4.6 4.6 0 018 3c0 5.800-8 11-8 11z"/></svg>',
    flag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 21V4M5 4h12l-2 4 2 4H5"/></svg>',
    send: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 11l18-8-8 18-2-8z"/></svg>',
    img: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5-5-8 9"/></svg>'
  };

  // ---------- helpers ----------
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const bg = ph => ph.src ? `background-image:url(${ph.src})` : `background:${ph.bg}`;
  const face = ph => ph.src ? '' : (ph.emoji || '');
  const toast = msg => { S.toast = msg; render(); clearTimeout(toast.t); toast.t = setTimeout(() => { S.toast = ''; render(); }, 1800); };
  const labels = { pets: '반려동물', drink: '음주', smoke: '흡연', workout: '운동' };
  const infoTags = i => Object.keys(labels).filter(k => i[k]).map(k => `<span class="tag">${labels[k]} · ${esc(i[k])}</span>`).join('');
  const lastMsg = id => { const c = S.chats[id] || []; const m = c[c.length - 1]; return m ? (m.type === 'photo' ? '사진을 보냈어요' : (m.from === 'me' ? '나: ' : '') + m.text) : '새 매칭! 먼저 인사해 보세요'; };

  // ---------- sections ----------
  function profileSections(p, mine) {
    const flag = el => mine ? '' : `<button class="flag" data-act="report" data-el="${el}" aria-label="신고">${I.flag}</button>`;
    const q = p.quiz, ans = S.quiz[p.id];
    const quiz = q ? `<div class="sec">${flag('프로필 퀴즈')}<div class="quiz"><small>프로필 퀴즈</small><p>${esc(q.q)}</p>${q.options.map((o, i) =>
      `<button class="opt ${ans != null ? (i === q.answer ? 'ok' : (i === ans ? 'no' : '')) : ''}" data-act="quiz" data-id="${p.id}" data-i="${i}">${esc(o)}${ans != null && i === q.answer ? ' ✓' : ''}</button>`).join('')}</div></div>` : '';
    const prompts = (p.prompts || []).map(pr => `<div class="sec">${flag('프로필 문답')}<div class="prompt"><small>${esc(pr.q)}</small><p>${esc(pr.a)}</p></div></div>`);
    return { quiz, prompts };
  }

  // ---------- discover ----------
  function cardHTML(p, top) {
    const i = Math.min(S.pi[p.id] || 0, p.photos.length - 1), ph = p.photos[i];
    return `<div class="card ${top ? 'top' : 'next'}" data-id="${p.id}">
      <div class="photo" style="${bg(ph)}">${face(ph)}</div>
      ${p.photos.length > 1 ? `<div class="bars">${p.photos.map((_, k) => `<i class="${k === i ? 'on' : ''}"></i>`).join('')}</div>` : ''}
      ${top ? '<div class="zone l" data-act="prevph"></div><div class="zone r" data-act="nextph"></div>' : ''}
      <div class="shade"></div>
      <div class="stamp like">LIKE</div><div class="stamp nope">NOPE</div><div class="stamp sl">SUPER LIKE</div>
      <div class="cinfo"><h2>${esc(p.name)}<span>${p.age}</span></h2><p>${p.km}km 거리 · ${esc(p.job)}</p><p class="bio">${esc(p.bio)}</p></div>
      ${top ? `<button class="infobtn" data-act="detail" data-id="${p.id}" aria-label="프로필 상세">${I.info}</button>` : ''}</div>`;
  }
  function discover() {
    const top = byId(S.deck[0]), nxt = byId(S.deck[1]);
    const deck = top ? (nxt ? cardHTML(nxt, false) : '') + cardHTML(top, true)
      : `<div class="empty"><div><div class="pulse"></div><b>주변 프로필을 모두 확인했어요</b>나중에 다시 확인해 보세요</div></div>`;
    const b = (cls, act, ic, extra = '') => `<button class="act ${cls} ${extra}" data-act="${act}" aria-label="${act}">${ic}</button>`;
    return `<div class="deck">${deck}</div><div class="actions">
      ${b('sm', 'rewind', I.rewind)}${b('lg', 'nope', I.nope)}${b('sm', 'super', I.star)}${b('lg', 'like', I.like)}${b('sm', 'boost', I.bolt, S.boosted ? 'pop' : '')}</div>`;
  }

  // ---------- matches ----------
  function matchesTab() {
    const fresh = S.matches.filter(id => !(S.chats[id] || []).length);
    const talk = S.matches.filter(id => (S.chats[id] || []).length);
    return `<div style="height:100%;overflow-y:auto">
      <div class="sechd">새로운 매칭</div>
      <div class="newrow">${fresh.length ? fresh.map(id => { const p = byId(id); return `<button class="newm" data-act="chat" data-id="${id}"><div class="pic fresh" style="${bg(p.photos[0])}">${face(p.photos[0])}</div>${esc(p.name)}</button>`; }).join('') : '<div style="color:var(--sub);padding:8px 0">새 매칭이 없어요</div>'}</div>
      <div class="sechd">메시지</div>
      ${talk.length ? talk.map(id => { const p = byId(id), u = S.unread[id] > 0; return `<button class="convo ${u ? 'unread' : ''}" data-act="chat" data-id="${id}"><div class="ava" style="${bg(p.photos[0])}">${face(p.photos[0])}</div><div class="t"><b>${esc(p.name)}</b><span>${esc(lastMsg(id))}</span></div>${u ? '<i class="ud"></i>' : ''}</button>`; }).join('') : '<div style="color:var(--sub);padding:12px 16px">아직 대화가 없어요</div>'}</div>`;
  }

  // ---------- me ----------
  function meTab() {
    const m = S.me, ps = profileSections(m, true);
    return `<div style="height:100%;overflow-y:auto;padding-bottom:20px">
      <div class="mehead"><div class="ring"><div class="in" style="${bg(m.photos[0])}">${face(m.photos[0])}</div></div><h1>${esc(m.name)}<span>, ${m.age}</span></h1></div>
      <div class="mebtns"><button class="edit" data-act="edit">프로필 편집</button><button class="set" data-act="settings">설정</button></div>
      <div class="sec"><h4>자기소개</h4><p>${esc(m.bio)}</p></div>
      <div class="sec"><h4>사진</h4><div class="pgrid">${m.photos.map(ph => `<div style="${bg(ph)}">${face(ph)}</div>`).join('')}</div></div>
      <div class="sec"><h4>관심사</h4><div class="tags">${m.interests.map(t => `<span class="tag hl">${esc(t)}</span>`).join('')}</div></div>
      <div class="sec"><h4>기본 정보</h4><div class="tags">${infoTags(m.info)}</div></div>
      <div class="sec"><h4>관계 목표</h4><div class="tags"><span class="tag goal">${esc(m.goal)}</span></div></div>
      ${ps.prompts.join('')}${ps.quiz}</div>`;
  }

  // ---------- views ----------
  function detailView(id) {
    const p = byId(id), ps = profileSections(p, false), n = p.photos.length;
    const ph = k => { const x = p.photos[k % n]; return `<div class="dphoto ${k ? 's' : ''}" style="${bg(x)}">${face(x)}</div>`; };
    const inMatch = S.matches.includes(id);
    return `<div class="view" data-view="detail"><div class="vhdr"><button class="ibtn" data-act="close" aria-label="닫기">${I.down}</button><h3>${esc(p.name)}</h3><button class="ibtn" data-act="report" data-el="프로필 전체" aria-label="신고">${I.flag}</button></div>
      <div class="vbody">${ph(0)}
      <div class="sec"><h1>${esc(p.name)}<span>${p.age}</span></h1><div class="row">${esc(p.job)}</div><div class="row">${esc(p.school)}</div><div class="row">${p.km}km 거리</div></div>
      <div class="sec">${'<button class="flag" data-act="report" data-el="자기소개" aria-label="신고">' + I.flag + '</button>'}<h4>자기소개</h4><p>${esc(p.bio)}</p></div>
      <div class="sec"><h4>관계 목표</h4><div class="tags"><span class="tag goal">${esc(p.goal)}</span></div></div>
      <div class="sec"><button class="flag" data-act="report" data-el="기본 정보" aria-label="신고">${I.flag}</button><h4>기본 정보</h4><div class="tags">${infoTags(p.info)}</div></div>
      ${n > 1 ? ph(1) : ''}${ps.prompts[0] || ''}
      <div class="sec"><h4>관심사</h4><div class="tags">${p.interests.map(t => `<span class="tag hl">${esc(t)}</span>`).join('')}</div></div>
      ${n > 2 ? ph(2) : ''}${ps.prompts[1] || ''}${ps.quiz}
      <button class="reportbtn" data-act="report" data-el="프로필 전체">${esc(p.name)} 님 신고하기</button></div>
      ${inMatch ? '' : `<div class="floatact"><button class="act lg" data-act="dnope" data-id="${id}">${I.nope}</button><button class="act sm" data-act="dsuper" data-id="${id}">${I.star}</button><button class="act lg" data-act="dlike" data-id="${id}">${I.like}</button></div>`}</div>`;
  }
  function chatView(id) {
    const p = byId(id), msgs = S.chats[id] || [];
    return `<div class="view" data-view="chat"><div class="vhdr"><button class="ibtn" data-act="close" aria-label="뒤로">${I.back}</button><h3>${esc(p.name)}</h3><button class="ibtn" data-act="detail" data-id="${id}" aria-label="프로필">${I.info}</button></div>
      <div class="chat" id="chatbox"><div class="matchnote">${esc(p.name)} 님과 매칭되었어요</div>${msgs.map(m => m.type === 'photo'
        ? `<div class="bub pic ${m.from}" style="${m.src ? 'background-image:url(' + m.src + ');background-size:cover' : 'background:' + m.bg}">${m.src ? '' : m.emoji}</div>`
        : `<div class="bub ${m.from}">${esc(m.text)}</div>`).join('')}</div>
      <div class="composer"><button class="ibtn" data-act="attach" data-id="${id}" aria-label="사진">${I.img}</button><input id="msg" placeholder="메시지 입력" autocomplete="off"><button class="send" data-act="send" data-id="${id}" aria-label="전송">${I.send}</button></div></div>`;
  }
  function settingsView() {
    const s = S.set, sw = (k) => `<span class="sw ${s[k] ? 'on' : ''}"></span>`;
    return `<div class="view" data-view="settings"><div class="vhdr"><button class="ibtn" data-act="close" aria-label="뒤로">${I.back}</button><h3>설정</h3></div><div class="vbody" style="padding-bottom:30px;background:var(--bg)">
      <div class="sgrp">계정 설정</div>
      <div class="srow"><span>전화번호</span><small>010-****-1234</small></div><div class="srow"><span>이메일</span><small>minji@example.com</small></div>
      <div class="sgrp">검색 설정</div>
      <div class="srow col"><div class="top"><span>검색 거리</span><small id="vdist">${s.dist}km</small></div><input type="range" min="2" max="160" value="${s.dist}" data-range="dist"></div>
      <div class="srow col"><div class="top"><span>나이 범위</span><small id="vage">${s.amin} - ${s.amax}세</small></div><input type="range" min="18" max="60" value="${s.amin}" data-range="amin"><input type="range" min="18" max="60" value="${s.amax}" data-range="amax" style="margin-top:8px"></div>
      <button class="srow" data-act="show"><span>보고 싶은 성별</span><small>${s.show} ›</small></button>
      <div class="sgrp">알림</div>
      <button class="srow" data-act="tog" data-k="push"><span>푸시 알림</span>${sw('push')}</button>
      <button class="srow" data-act="tog" data-k="msgs"><span>메시지 알림</span>${sw('msgs')}</button>
      <button class="srow" data-act="tog" data-k="likes"><span>새 매칭 알림</span>${sw('likes')}</button>
      <div class="sgrp">화면</div>
      <button class="srow" data-act="dark"><span>다크 모드</span><span class="sw ${S.dark ? 'on' : ''}"></span></button>
      <div class="sgrp">개인정보 및 안전</div>
      <button class="srow" data-act="soon"><span>개인정보 보호</span><small>›</small></button><button class="srow" data-act="soon"><span>안전 센터</span><small>›</small></button><button class="srow" data-act="soon"><span>차단 목록</span><small>›</small></button></div></div>`;
  }
  function editView() {
    const m = S.me;
    return `<div class="view" data-view="edit"><div class="vhdr"><button class="ibtn" data-act="close" aria-label="취소">${I.back}</button><h3>프로필 편집</h3><button class="ibtn" data-act="saveedit" style="width:auto;padding:0 10px;font-weight:700;font-size:16px">저장</button></div><div class="vbody" style="padding:18px">
      <label class="field">이름<input id="e-name" value="${esc(m.name)}"></label><label class="field">나이<input id="e-age" type="number" min="18" max="99" value="${m.age}"></label>
      <label class="field">자기소개<textarea id="e-bio">${esc(m.bio)}</textarea></label><label class="field">관심사 (쉼표로 구분)<input id="e-int" value="${esc(m.interests.join(', '))}"></label></div></div>`;
  }
  function matchHTML(id) {
    const p = byId(id), me = S.me;
    const conf = Array.from({ length: 22 }, (_, k) => `<span class="conf" style="left:${(k * 4.7) % 100}%;animation-duration:${2 + (k % 5) * .5}s;animation-delay:${(k % 7) * .15}s">${['💗', '🧡', '💚', '✨'][k % 4]}</span>`).join('');
    return `<div class="match">${conf}<h1>IT'S A MATCH!</h1><div class="sub">${esc(p.name)} 님과 서로 좋아요를 눌렀어요</div>
      <div class="pair"><div class="pic a" style="${bg(me.photos[0])}">${face(me.photos[0])}</div><div class="pic b" style="${bg(p.photos[0])}">${face(p.photos[0])}</div><div class="heart">${I.heart}</div></div>
      <div class="btns"><button class="cta ghost" data-act="matchchat" data-id="${id}">메시지 보내기</button><button class="cta" style="background:rgba(255,255,255,.2)" data-act="matchclose">계속 둘러보기</button></div></div>`;
  }
  function sheetHTML() {
    const sh = S.sheet; if (!sh) return '';
    if (sh.type === 'report') {
      const opts = ['사진', '자기소개', '프로필 문답', '프로필 퀴즈', '기본 정보', '프로필 전체'];
      return `<div class="scrim" data-act="sheetclose"><div class="sheet" data-stop><h3>무엇을 신고하시겠어요?</h3><div class="sub">신고할 프로필 요소를 선택해 주세요</div>
        ${opts.map(o => `<button class="li ${o === sh.el ? 'on' : ''}" data-act="rpick" data-el="${o}">${o}<span>${o === sh.el ? '●' : '○'}</span></button>`).join('')}<button class="cta" data-act="rsend">신고 접수</button></div></div>`;
    }
    if (sh.type === 'show') return `<div class="scrim" data-act="sheetclose"><div class="sheet" data-stop><h3>보고 싶은 성별</h3><div class="sub">&nbsp;</div>${['남성', '여성', '모두'].map(o => `<button class="li ${S.set.show === o ? 'on' : ''}" data-act="spick" data-v="${o}">${o}<span>${S.set.show === o ? '●' : '○'}</span></button>`).join('')}</div></div>`;
    return '';
  }

  // ---------- render ----------
  function render() {
    dev.dataset.theme = S.dark ? 'dark' : 'light';
    const v = S.views.map(x => x.k === 'detail' ? detailView(x.id) : x.k === 'chat' ? chatView(x.id) : x.k === 'settings' ? settingsView() : editView()).join('');
    const unreadN = Object.values(S.unread).reduce((a, b) => a + b, 0);
    const body = S.tab === 'discover' ? discover() : S.tab === 'matches' ? matchesTab() : meTab();
    const hdr = S.tab === 'discover' ? `<div class="hdr"><span class="logo">${I.flame}tinder</span><div style="display:flex"><button class="ibtn" data-act="notif" aria-label="알림">${I.bell}<i class="dot"></i></button><button class="ibtn" data-act="settings" aria-label="설정">${I.gear}</button></div></div>`
      : `<div class="hdr"><b style="font-size:22px">${S.tab === 'matches' ? '매칭' : '내 프로필'}</b>${S.tab === 'me' ? `<button class="ibtn" data-act="settings" aria-label="설정">${I.gear}</button>` : ''}</div>`;
    const tb = (t, ic, lb, badge) => `<button class="tab ${S.tab === t ? 'on' : ''}" data-act="tab" data-t="${t}" aria-label="${lb}">${ic}${badge ? `<i class="badge">${badge}</i>` : ''}</button>`;
    const keepMsg = (document.getElementById('msg') || {}).value;
    root.innerHTML = `<div class="statusgap"></div>${hdr}<div class="main">${body}</div><div class="tabbar">${tb('discover', I.flame, '카드')}${tb('matches', I.chat, '매칭', unreadN)}${tb('me', I.user, '내 프로필')}</div>${v}${sheetHTML()}${S.matchOverlay ? matchHTML(S.matchOverlay) : ''}${S.toast ? `<div class="toast">${esc(S.toast)}</div>` : ''}`;
    if (keepMsg) { const el = document.getElementById('msg'); if (el) el.value = keepMsg; }
    const cb = document.getElementById('chatbox'); if (cb) cb.scrollTop = cb.scrollHeight;
    const top = root.querySelector('.card.top'); if (top && !S.views.length) bindDrag(top);
    save();
  }

  // ---------- swipe ----------
  let lock = false;
  function commit(dir, id) {
    const p = byId(id); S.deck = S.deck.filter(x => x !== id);
    const matched = (dir === 'like' && p.likesMe) || (dir === 'super' && (p.likesMe || p.age % 2 === 1));
    S.history.push({ id, dir, matched });
    if (matched) { S.matches.unshift(id); S.chats[id] = []; S.unread[id] = 0; S.matchOverlay = id; }
    lock = false; render();
  }
  function fly(dir, id) {
    if (lock) return; const c = root.querySelector('.card.top'); if (!c || c.dataset.id !== id) return commit(dir, id);
    lock = true; c.classList.remove('snap'); c.classList.add('fly');
    const t = dir === 'like' ? 'translate(520px,40px) rotate(24deg)' : dir === 'nope' ? 'translate(-520px,40px) rotate(-24deg)' : 'translateY(-900px)';
    const st = c.querySelector('.stamp.' + (dir === 'like' ? 'like' : dir === 'nope' ? 'nope' : 'sl')); if (st) st.style.opacity = 1;
    c.style.transform = t; c.style.opacity = 0; setTimeout(() => commit(dir, id), 300);
  }
  let suppress = false;
  function bindDrag(c) {
    let sx, sy, drag = false, down = false;
    const L = c.querySelector('.stamp.like'), N = c.querySelector('.stamp.nope'), U = c.querySelector('.stamp.sl');
    c.addEventListener('pointerdown', e => { if (lock) return; down = true; drag = false; sx = e.clientX; sy = e.clientY; });
    c.addEventListener('pointermove', e => {
      if (!down) return; const dx = e.clientX - sx, dy = e.clientY - sy;
      if (!drag && Math.hypot(dx, dy) > 8) { drag = true; c.setPointerCapture(e.pointerId); c.classList.remove('snap'); }
      if (!drag) return;
      c.style.transform = `translate(${dx}px,${dy}px) rotate(${dx / 18}deg)`;
      L.style.opacity = Math.max(0, Math.min(1, dx / 90)); N.style.opacity = Math.max(0, Math.min(1, -dx / 90));
      U.style.opacity = dy < 0 && Math.abs(dx) < 60 ? Math.min(1, -dy / 90) : 0;
    });
    const end = e => {
      if (!down) return; down = false; if (!drag) return; suppress = true; setTimeout(() => suppress = false, 50);
      const dx = e.clientX - sx, dy = e.clientY - sy, id = c.dataset.id;
      if (dx > 100) fly('like', id); else if (dx < -100) fly('nope', id); else if (dy < -110) fly('super', id);
      else { c.classList.add('snap'); c.style.transform = ''; L.style.opacity = N.style.opacity = U.style.opacity = 0; }
    };
    c.addEventListener('pointerup', end); c.addEventListener('pointercancel', end);
  }

  // ---------- events ----------
  function openChat(id) { S.unread[id] = 0; S.views.push({ k: 'chat', id }); }
  function reply(id) {
    const r = ['ㅎㅎ 좋아요!', '오 정말요? 더 얘기해 주세요', '저도 그렇게 생각했어요 😊', '이번 주 시간 괜찮으세요?'];
    setTimeout(() => { (S.chats[id] = S.chats[id] || []).push({ from: 'them', type: 'text', text: r[Math.floor(Math.random() * r.length)] }); if (!S.views.some(v => v.k === 'chat' && v.id === id)) S.unread[id] = (S.unread[id] || 0) + 1; render(); }, 1200);
  }
  root.addEventListener('click', e => {
    if (suppress) return;
    const t = e.target.closest('[data-act]'); if (!t) return;
    if (e.target.closest('[data-stop]') && t.classList.contains('scrim')) return;
    const a = t.dataset.act, id = t.dataset.id;
    const topId = S.deck[0];
    switch (a) {
      case 'tab': S.tab = t.dataset.t; break;
      case 'nextph': { const p = byId(topId); S.pi[topId] = Math.min((S.pi[topId] || 0) + 1, p.photos.length - 1); break; }
      case 'prevph': S.pi[topId] = Math.max((S.pi[topId] || 0) - 1, 0); break;
      case 'like': case 'nope': case 'super': if (topId) { const b = t; b.classList.add('pop'); fly(a, topId); } return;
      case 'rewind': { const h = S.history.pop(); if (!h) return toast('되돌릴 프로필이 없어요'); S.deck.unshift(h.id); if (h.matched) { S.matches = S.matches.filter(x => x !== h.id); delete S.chats[h.id]; } break; }
      case 'boost': S.boosted = true; toast('부스트 시작 · 30분 동안 내 프로필이 더 많이 노출돼요'); return;
      case 'detail': S.views.push({ k: 'detail', id }); break;
      case 'close': S.views.pop(); break;
      case 'chat': openChat(id); break;
      case 'settings': S.views.push({ k: 'settings' }); break;
      case 'edit': S.views.push({ k: 'edit' }); break;
      case 'notif': return toast('새 알림이 없어요');
      case 'soon': return toast('준비 중인 메뉴예요');
      case 'quiz': S.quiz[id] = +t.dataset.i; break;
      case 'report': S.sheet = { type: 'report', el: t.dataset.el }; break;
      case 'rpick': S.sheet.el = t.dataset.el; break;
      case 'rsend': { const el = S.sheet.el; S.sheet = null; render(); return toast(`'${el}' 신고가 접수되었어요`); }
      case 'sheetclose': S.sheet = null; break;
      case 'show': S.sheet = { type: 'show' }; break;
      case 'spick': S.set.show = t.dataset.v; S.sheet = null; break;
      case 'tog': S.set[t.dataset.k] = !S.set[t.dataset.k]; break;
      case 'dark': S.dark = !S.dark; break;
      case 'dlike': case 'dnope': case 'dsuper': { const d = a === 'dlike' ? 'like' : a === 'dnope' ? 'nope' : 'super'; S.views = []; if (S.deck.includes(id)) { S.deck = S.deck.filter(x => x !== id); S.deck.unshift(id); lock = false; commit(d, id); return; } break; }
      case 'matchchat': S.matchOverlay = null; S.tab = 'matches'; S.views = []; openChat(id); break;
      case 'matchclose': S.matchOverlay = null; break;
      case 'send': { const inp = document.getElementById('msg'); const v = inp.value.trim(); if (!v) return; (S.chats[id] = S.chats[id] || []).push({ from: 'me', type: 'text', text: v }); inp.value = ''; render(); reply(id); return; }
      case 'attach': { const g = ['linear-gradient(160deg,#ffd194,#70e1f5)', 'linear-gradient(160deg,#ee9ca7,#ffdde1)']; (S.chats[id] = S.chats[id] || []).push({ from: 'me', type: 'photo', bg: g[Date.now() % 2], emoji: '🌅' }); break; }
      case 'saveedit': {
        const n = document.getElementById('e-name').value.trim(), ag = +document.getElementById('e-age').value;
        if (!n || ag < 18) return toast('이름과 나이(18세 이상)를 확인해 주세요');
        Object.assign(S.me, { name: n, age: ag, bio: document.getElementById('e-bio').value.trim(), interests: document.getElementById('e-int').value.split(',').map(x => x.trim()).filter(Boolean) });
        S.views.pop(); render(); return toast('프로필이 저장되었어요');
      }
    }
    render();
  });
  root.addEventListener('input', e => {
    const r = e.target.dataset.range; if (!r) return; S.set[r] = +e.target.value;
    if (S.set.amin > S.set.amax) { if (r === 'amin') S.set.amax = S.set.amin; else S.set.amin = S.set.amax; }
    const d = document.getElementById('vdist'), g = document.getElementById('vage');
    if (d) d.textContent = S.set.dist + 'km'; if (g) g.textContent = `${S.set.amin} - ${S.set.amax}세`; save();
  });
  root.addEventListener('keydown', e => { if (e.key === 'Enter' && e.target.id === 'msg') { const b = root.querySelector('[data-act=send]'); if (b) b.click(); } });
  render();
})();

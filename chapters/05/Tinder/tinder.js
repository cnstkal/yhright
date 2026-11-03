/* Tinder 2024 (iOS) — 챕터 4 Tinder 구조를 바탕으로 챕터 5용으로 변형
   - 모든 아이콘/그래픽은 SVG 벡터 (이모지·문자 아이콘 없음)
   - 사진 항목: { art:[색1,색2,종류] } 벡터 일러스트 | { src:'경로' } 실제 사진 | { video:'경로', poster:{...} } 동영상 */
(function () {
  'use strict';
  const KEY = 'tinder2024-ch05';
  const NOW = Date.now(), MIN = 60000, HR = 3600000, DAY = 86400000;

  /* ---------- 데이터 ---------- */
  const D = {
    me: {
      name: '민지', age: 27, verified: true,
      bio: '주말엔 한강 러닝, 평일엔 커피 한 잔. 맛집 지도 만드는 게 취미예요.',
      photos: [{ art: [350, 20, 'f'] }, { art: [270, 320, 'f'] }, { art: [150, 190, 'n'] }],
      interests: ['러닝', '카페 투어', '전시회', '여행'],
      info: { pets: '고양이', drink: '가끔', smoke: '비흡연', workout: '자주' }, goal: '장기 연애',
      prompts: [{ q: '내 마음의 열쇠는…', a: '먼저 안부를 물어 주는 사람' }, { q: '내 버킷리스트의 첫 번째 항목은…', a: '아이슬란드에서 오로라 보기' }],
      quiz: { q: '내가 가장 좋아하는 계절은?', options: ['봄', '여름', '가을', '겨울'], answer: 2 }
    },
    profiles: [
      { id: 'p1', name: '서연', age: 26, km: 3, job: '디자이너', school: '홍익대학교', likesMe: true, verified: true,
        bio: '고양이 두 마리와 살아요. 같이 전시 보러 가요.',
        photos: [{ art: [30, 340, 'f'] }, { art: [200, 260, 'f'] }, { art: [140, 80, 'n'] }],
        interests: ['전시회', '고양이', '필름 카메라'],
        info: { pets: '고양이', drink: '가끔', smoke: '비흡연', workout: '가끔' }, goal: '장기 연애',
        prompts: [{ q: '내 마음의 열쇠는…', a: '같이 웃을 수 있는 유머 코드' }, { q: '나에 대한 두 가지 진실과 거짓', a: '고양이 둘 · 마라톤 완주 · 비행기 조종 경험 (하나는 거짓)' }],
        quiz: { q: '내 최애 디저트는?', options: ['마카롱', '티라미수', '붕어빵', '빙수'], answer: 1 } },
      { id: 'p2', name: '지우', age: 29, km: 7, job: '개발자', school: '연세대학교', likesMe: false, verified: false,
        bio: '새벽 러닝 하고 브런치 먹는 주말을 좋아해요.',
        photos: [{ art: [190, 230, 'm'] }, { src: 'photos/lake.jpg' }],
        interests: ['러닝', '브런치', '보드게임'],
        info: { pets: '없음', drink: '자주', smoke: '비흡연', workout: '매일' }, goal: '새로운 친구',
        prompts: [{ q: '내 버킷리스트의 첫 번째 항목은…', a: '하프 마라톤 1시간 40분 안에 들어오기' }],
        quiz: { q: '내가 사는 동네는?', options: ['마포', '성수', '판교', '송도'], answer: 3 } },
      { id: 'p3', name: '하은', age: 25, km: 12, job: '간호사', school: '서울대학교', likesMe: true, verified: true,
        bio: '야간 근무 끝나고 먹는 라면이 인생 낙.',
        photos: [{ art: [20, 50, 'f'] }, { src: 'photos/meal.jpg' }, { art: [200, 150, 'n'] }],
        interests: ['캠핑', '라면', '넷플릭스'],
        info: { pets: '강아지', drink: '비음주', smoke: '비흡연', workout: '가끔' }, goal: '아직 모르겠어요',
        prompts: [{ q: '내 마음의 열쇠는…', a: '따뜻한 국물 같은 사람' }],
        quiz: { q: '내 취미는?', options: ['캠핑', '서핑', '독서', '요리'], answer: 0 } },
      { id: 'p4', name: '도윤', age: 30, km: 5, job: '셰프', school: '경희대학교', likesMe: false, verified: true,
        bio: '요리해 드릴게요. 대신 설거지는 같이.',
        photos: [{ art: [320, 10, 'm'] }, { art: [210, 180, 'm'] }],
        interests: ['요리', '와인', '재즈'],
        info: { pets: '없음', drink: '자주', smoke: '가끔', workout: '가끔' }, goal: '장기 연애',
        prompts: [{ q: '나에 대한 두 가지 진실과 거짓', a: '파리 유학 · 미슐랭 근무 · 완벽한 길치 (하나는 거짓)' }],
        quiz: { q: '제가 제일 자신 있는 요리는?', options: ['파스타', '스테이크', '된장찌개', '오믈렛'], answer: 0 } },
      { id: 'p5', name: '유나', age: 24, km: 2, job: '대학원생', school: '이화여자대학교', likesMe: true, verified: false,
        bio: '논문 쓰다 지치면 산책해요. 같이 걸어요.',
        photos: [{ art: [225, 270, 'f'] }, { src: 'photos/lake2.jpg' }],
        interests: ['산책', '독서', '클래식'],
        info: { pets: '없음', drink: '가끔', smoke: '비흡연', workout: '가끔' }, goal: '장기 연애',
        prompts: [{ q: '내 버킷리스트의 첫 번째 항목은…', a: '논문 통과하고 제주 한 달 살기' }],
        quiz: { q: '내가 공부하는 분야는?', options: ['심리학', '통계학', '문학', '건축'], answer: 0 } },
      { id: 'm1', name: '수빈', age: 27, km: 4, job: '마케터', school: '고려대학교', likesMe: true, verified: true,
        bio: '맛집 탐방 같이 해요.', photos: [{ art: [340, 40, 'f'] }, { art: [260, 220, 'n'] }],
        interests: ['맛집', '여행'], info: { pets: '없음', drink: '가끔', smoke: '비흡연', workout: '가끔' }, goal: '장기 연애',
        prompts: [{ q: '내 마음의 열쇠는…', a: '맛있는 걸 같이 먹는 사람' }], quiz: { q: '좋아하는 음식은?', options: ['초밥', '피자', '떡볶이', '곱창'], answer: 0 } },
      { id: 'm2', name: '예린', age: 28, km: 9, job: '사진작가', school: '중앙대학교', likesMe: true, verified: false,
        bio: '사진 찍는 걸 좋아해요.', photos: [{ art: [250, 300, 'f'] }],
        interests: ['사진', '여행'], info: { pets: '고양이', drink: '자주', smoke: '비흡연', workout: '가끔' }, goal: '새로운 친구',
        prompts: [{ q: '내 버킷리스트의 첫 번째 항목은…', a: '사하라 사막에서 별 사진 찍기' }], quiz: { q: '제 카메라 브랜드는?', options: ['캐논', '소니', '니콘', '후지'], answer: 3 } },
      { id: 'm3', name: '다은', age: 26, km: 6, job: '요가 강사', school: '한양대학교', likesMe: true, verified: true,
        bio: '요가와 명상.', photos: [{ art: [110, 170, 'f'] }],
        interests: ['요가', '명상'], info: { pets: '강아지', drink: '비음주', smoke: '비흡연', workout: '매일' }, goal: '장기 연애',
        prompts: [{ q: '내 마음의 열쇠는…', a: '차분한 대화' }], quiz: { q: '아침 루틴은?', options: ['요가', '러닝', '독서', '늦잠'], answer: 0 } }
    ],
    matches: ['m1', 'm2', 'm3'],
    chats: {
      m1: [
        { from: 'them', type: 'text', text: '안녕하세요! 프로필 보고 반가웠어요', ts: NOW - 3 * DAY },
        { from: 'me', type: 'text', text: '안녕하세요! 저도요', ts: NOW - 3 * DAY + 4 * MIN, read: true },
        { from: 'them', type: 'text', text: '이번 주말에 성수 카페 가볼래요?', ts: NOW - 2 * HR }
      ],
      m2: [
        { from: 'them', type: 'photo', src: 'photos/lake.jpg', ts: NOW - 26 * HR },
        { from: 'them', type: 'text', text: '어제 찍은 사진이에요', ts: NOW - 26 * HR + MIN }
      ],
      m3: []
    },
    unread: { m1: 1, m2: 2, m3: 0 },
    notifs: [
      { k: 'match', who: 'm3', t: '다은 님과 새로운 매치가 성사되었어요', s: '먼저 인사를 건네 보세요', ts: NOW - 20 * MIN },
      { k: 'like', who: 'p1', t: '누군가 나를 좋아해요', s: '좋아요 탭에서 확인해 보세요', ts: NOW - 5 * HR },
      { k: 'msg', who: 'm1', t: '수빈 님이 메시지를 보냈어요', s: '이번 주말에 성수 카페 가볼래요?', ts: NOW - 2 * HR },
      { k: 'boost', t: '부스트로 프로필 노출이 올라갔어요', s: '지난 30분 동안 조회수 +68%', ts: NOW - 2 * DAY }
    ]
  };

  const byId = id => D.profiles.find(p => p.id === id);
  const root = document.getElementById('root'), phone = document.getElementById('phone');

  /* ---------- 상태 ---------- */
  const S = {
    tab: 'discover', views: [], sheet: null, toast: '', matchOverlay: null, anim: false, typing: {},
    deck: D.profiles.filter(p => !D.matches.includes(p.id)).map(p => p.id),
    history: [], pi: {}, matches: D.matches.slice(), chats: JSON.parse(JSON.stringify(D.chats)),
    unread: Object.assign({}, D.unread), me: JSON.parse(JSON.stringify(D.me)), quiz: {}, boosted: false,
    dark: false, set: { dist: 30, amin: 22, amax: 35, show: '모두', push: true, msgs: true, likes: true }
  };
  try {
    const s = JSON.parse(localStorage.getItem(KEY));
    if (s) Object.assign(S, s, { views: [], sheet: null, matchOverlay: null, toast: '', anim: false, typing: {} });
  } catch (e) {}
  const save = () => {
    try { const { views, sheet, matchOverlay, toast, anim, typing, ...rest } = S; localStorage.setItem(KEY, JSON.stringify(rest)); } catch (e) {}
  };

  /* ---------- 벡터 아이콘 ---------- */
  const sv = (body, o = '') => `<svg viewBox="0 0 24 24" ${o}>${body}</svg>`;
  const ST = 'fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"';
  const FL = 'M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.15.43-2.29 1-3a2.5 2.5 0 0 0 2.5 2.5z';
  const HT = 'M12 21s-8-5.2-8-11a4.6 4.6 0 018-3 4.6 4.6 0 018 3c0 5.800-8 11-8 11z';
  const I = {
    flame: sv(`<path d="${FL}" fill="currentColor"/>`, 'fill="currentColor"'),
    flameO: sv(`<path d="${FL}" ${ST}/>`),
    compass: sv('<circle cx="12" cy="12" r="9.500"/><path d="M15.800 8.200l-2 5.600-5.600 2 2-5.600z" />', ST),
    compassF: sv('<circle cx="12" cy="12" r="10.500" fill="currentColor"/><path d="M16 8l-2.100 5.900L8 16l2.100-5.900z" fill="var(--bg)"/>'),
    heart: sv(`<path d="${HT}" fill="currentColor"/>`),
    heartO: sv(`<path d="${HT}"/>`, ST),
    chat: sv('<path d="M4 4h16a2 2 0 012 2v10a2 2 0 01-2 2H9l-5 4v-4a2 2 0 01-2-2V6a2 2 0 012-2z" fill="currentColor"/>'),
    chatO: sv('<path d="M4 4h16a2 2 0 012 2v10a2 2 0 01-2 2H9l-5 4v-4a2 2 0 01-2-2V6a2 2 0 012-2z"/>', ST),
    user: sv('<circle cx="12" cy="8" r="4.500" fill="currentColor"/><path d="M3.500 21c0-4.500 3.800-7 8.500-7s8.500 2.500 8.500 7z" fill="currentColor"/>'),
    userO: sv('<circle cx="12" cy="8" r="4.200"/><path d="M4 20.500c0-4 3.500-6.200 8-6.200s8 2.200 8 6.200z"/>', ST),
    bell: sv('<path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.700 21a2 2 0 01-3.400 0"/>', ST),
    sliders: sv('<path d="M4 7h9M17 7h3M4 17h3M11 17h9"/><circle cx="15" cy="7" r="2"/><circle cx="9" cy="17" r="2"/>', ST),
    gear: sv('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1.1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.5-1.1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.8.3H9a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8V9a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z"/>', ST),
    back: sv('<path d="M15 5l-7 7 7 7"/>', 'fill="none" stroke="currentColor" stroke-width="2.600" stroke-linecap="round" stroke-linejoin="round"'),
    down: sv('<path d="M5 9l7 7 7-7"/>', 'fill="none" stroke="currentColor" stroke-width="2.600" stroke-linecap="round" stroke-linejoin="round"'),
    chev: sv('<path d="M9 5l7 7-7 7"/>', 'fill="none" stroke="currentColor" stroke-width="2.400" stroke-linecap="round" stroke-linejoin="round"'),
    info: sv('<circle cx="12" cy="12" r="10"/><path d="M12 11v5M12 7.500v.1"/>', 'fill="none" stroke="currentColor" stroke-width="2.400" stroke-linecap="round"'),
    rewind: sv('<path d="M4 6v5h5"/><path d="M4.500 11A8 8 0 1112 20"/>', 'fill="none" stroke="#ffc629" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"'),
    nope: sv('<path d="M5 5l14 14M19 5L5 19"/>', 'fill="none" stroke="#fd267a" stroke-width="3.600" stroke-linecap="round"'),
    star: sv('<path d="M12 2l2.900 6.600 7.100.6-5.400 4.700 1.600 7L12 17.200 5.800 20.900l1.600-7L2 9.200l7.100-.6z"/>', 'fill="#1da8f9" stroke="#1da8f9" stroke-width="1" stroke-linejoin="round"'),
    like: sv(`<path d="${HT}"/>`, 'fill="#21d07a"'),
    bolt: sv('<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>', 'fill="#a25af0" stroke="#a25af0" stroke-width="1" stroke-linejoin="round"'),
    flag: sv('<path d="M5 21V4M5 4h12l-2 4 2 4H5"/>', ST),
    send: sv('<path d="M3 11l18-8-8 18-2-8z" fill="currentColor"/>'),
    img: sv('<rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5-5-8 9"/>', ST),
    check: sv('<path d="M5 12.500l4.500 4.500L19 7.500"/>', 'fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"'),
    plus: sv('<path d="M12 5v14M5 12h14"/>', 'fill="none" stroke="currentColor" stroke-width="2.400" stroke-linecap="round"'),
    pin: sv('<path d="M12 21s-7-6.200-7-11.500a7 7 0 0114 0C19 14.800 12 21 12 21z"/><circle cx="12" cy="9.500" r="2.500"/>', ST),
    lock: sv('<rect x="5" y="11" width="14" height="10" rx="2.500" fill="currentColor"/><path d="M8 11V8a4 4 0 018 0v3" fill="none" stroke="currentColor" stroke-width="2.200" stroke-linecap="round"/>'),
    edit: sv('<path d="M4 20h4L19 9a2.800 2.800 0 00-4-4L4 16z"/><path d="M14 6l4 4"/>', ST),
    shield: sv('<path d="M12 3l7 3v5c0 5-3.200 8.500-7 10-3.800-1.500-7-5-7-10V6z"/>', ST),
    play: sv('<path d="M8 5v14l11-7z" fill="currentColor"/>'),
    sparkle: sv('<path d="M12 2l2.200 6.800L21 11l-6.800 2.200L12 20l-2.200-6.800L3 11l6.800-2.200z" fill="currentColor"/>'),
    ok: sv('<circle cx="12" cy="12" r="11" fill="#fd267a"/><path d="M7 12.500l3.500 3.500L17.500 9" fill="none" stroke="#fff" stroke-width="2.600" stroke-linecap="round" stroke-linejoin="round"/>'),
    radioOn: sv('<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="5" fill="currentColor"/>'),
    radioOff: sv('<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2" opacity=".45"/>'),
    verified: `<svg class="verified" viewBox="0 0 24 24"><path d="M12 1.500l2.600 1.800 3.100-.3 1.200 2.900 2.800 1.400-.5 3.100 1.100 2.900-2.200 2.200-.5 3.100-3.100.5-2.500 1.900-2.600-1.800-3.100.3-1.200-2.900L2.300 17l.5-3.100L1.700 11l2.200-2.200.5-3.100 3.100-.5z" fill="#1da8f9"/><path d="M7.700 12.200l3 3 5.600-6" fill="none" stroke="#fff" stroke-width="2.400" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  };

  /* ---------- 사진 (벡터 일러스트 / 실제 사진 / 동영상) ---------- */
  const artCache = {};
  function art(a) {
    const key = a.join('-'); if (artCache[key]) return artCache[key];
    const [h1, h2, k] = a;
    const g = `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="hsl(${h1} 75% 72%)"/><stop offset="1" stop-color="hsl(${h2} 70% 52%)"/></linearGradient><linearGradient id="s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="hsl(${h1} 80% 80%)"/><stop offset="1" stop-color="hsl(${h2} 70% 60%)"/></linearGradient></defs>`;
    let body;
    if (k === 'n') {
      body = `<rect width="600" height="800" fill="url(#s)"/><circle cx="420" cy="250" r="82" fill="#fff" opacity=".75"/><path d="M0 560C120 450 220 470 320 540 420 470 520 440 600 500V800H0z" fill="hsl(${h2} 40% 38%)"/><path d="M0 650C150 570 300 600 400 650 480 610 540 610 600 630V800H0z" fill="hsl(${h2} 45% 28%)"/>`;
    } else {
      const skin = 'hsl(24 55% 78%)', hair = `hsl(${k === 'f' ? 18 : 25} 35% 18%)`, cloth = `hsl(${(h1 + 180) % 360} 38% 34%)`;
      const hairBack = k === 'f' ? `<path d="M190 420C170 250 240 190 300 190S430 250 410 420L440 640H160z" fill="${hair}"/>` : '';
      const hairTop = k === 'f' ? `<path d="M205 370C200 260 250 215 305 215S405 260 395 370C360 320 330 300 300 296 270 300 240 320 205 370z" fill="${hair}"/>` : `<path d="M208 372C196 250 250 214 304 214S412 250 394 372C372 330 352 308 300 306 250 308 230 330 208 372z" fill="${hair}"/>`;
      body = `<rect width="600" height="800" fill="url(#g)"/><circle cx="110" cy="150" r="90" fill="#fff" opacity=".14"/><circle cx="520" cy="260" r="60" fill="#fff" opacity=".12"/><circle cx="470" cy="620" r="120" fill="#fff" opacity=".1"/>${hairBack}<path d="M70 800C70 640 180 590 300 590S530 640 530 800z" fill="${cloth}"/><rect x="266" y="500" width="68" height="100" rx="30" fill="${skin}"/><ellipse cx="300" cy="400" rx="96" ry="112" fill="${skin}"/>${hairTop}<circle cx="262" cy="410" r="7" fill="#2b2220"/><circle cx="338" cy="410" r="7" fill="#2b2220"/><path d="M270 462Q300 484 330 462" fill="none" stroke="#b5584f" stroke-width="7" stroke-linecap="round"/>`;
    }
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800" preserveAspectRatio="xMidYMid slice">${g}${body}</svg>`;
    return (artCache[key] = "url('data:image/svg+xml," + encodeURIComponent(svg).replace(/'/g, '%27') + "')");
  }
  const bg = ph => {
    const p = ph.video ? (ph.poster || { art: [200, 260, 'n'] }) : ph;
    return p.src ? `background-image:url('${p.src}')` : `background-image:${art(p.art)}`;
  };
  const media = ph => ph.video ? `<video src="${ph.video}" ${ph.poster && ph.poster.src ? `poster="${ph.poster.src}"` : ''} autoplay muted loop playsinline></video>` : '';

  /* ---------- 유틸 ---------- */
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const labels = { pets: '반려동물', drink: '음주', smoke: '흡연', workout: '운동' };
  const infoTags = i => Object.keys(labels).filter(k => i[k]).map(k => `<span class="tag">${labels[k]} · ${esc(i[k])}</span>`).join('');
  const pad = n => String(n).padStart(2, '0');
  function fmt(ts) {
    const d = new Date(ts), n = new Date(), h = d.getHours();
    const clock = (h < 12 ? '오전 ' : '오후 ') + (h % 12 || 12) + ':' + pad(d.getMinutes());
    const dd = Math.floor((new Date(n.getFullYear(), n.getMonth(), n.getDate()) - new Date(d.getFullYear(), d.getMonth(), d.getDate())) / DAY);
    return dd <= 0 ? clock : dd === 1 ? '어제' : (d.getMonth() + 1) + '월 ' + d.getDate() + '일';
  }
  const clockOnly = ts => { const d = new Date(ts), h = d.getHours(); return (h < 12 ? '오전 ' : '오후 ') + (h % 12 || 12) + ':' + pad(d.getMinutes()); };
  const lastMsg = id => { const c = S.chats[id] || []; const m = c[c.length - 1]; return m ? (m.type === 'photo' ? (m.from === 'me' ? '사진을 보냈어요' : '사진을 받았어요') : (m.from === 'me' ? '나: ' : '') + m.text) : '새로운 매치예요. 먼저 인사해 보세요'; };
  const toast = msg => { S.toast = msg; render(); clearTimeout(toast.t); toast.t = setTimeout(() => { S.toast = ''; render(); }, 1800); };
  const SOON = '시뮬레이션에서는 사용할 수 없는 기능이에요';

  /* ---------- 프로필 섹션 ---------- */
  function profileSections(p, mine) {
    const flag = el => mine ? '' : `<button class="flag" data-act="report" data-el="${el}" aria-label="신고">${I.flag}</button>`;
    const q = p.quiz, ans = S.quiz[p.id];
    const quiz = q ? `<div class="sec">${flag('프로필 퀴즈')}<div class="quiz"><small>프로필 퀴즈</small><p>${esc(q.q)}</p>${q.options.map((o, i) =>
      `<button class="opt ${ans != null ? (i === q.answer ? 'ok' : (i === ans ? 'no' : '')) : ''}" data-act="quiz" data-id="${p.id}" data-i="${i}"><span>${esc(o)}</span>${ans != null && i === q.answer ? I.check : ''}</button>`).join('')}</div></div>` : '';
    const prompts = (p.prompts || []).map(pr => `<div class="sec">${flag('프로필 문답')}<div class="prompt"><small>${esc(pr.q)}</small><p>${esc(pr.a)}</p></div></div>`);
    return { quiz, prompts };
  }

  /* ---------- 탐색(카드) ---------- */
  function cardHTML(p, top) {
    const i = Math.min(S.pi[p.id] || 0, p.photos.length - 1), ph = p.photos[i];
    const chg = top && S.anim ? ' chg' : '';
    return `<div class="card ${top ? 'top' : 'next'}" data-id="${p.id}">
      <div class="photo${chg}" style="${bg(ph)}">${media(ph)}</div>
      ${p.photos.length > 1 ? `<div class="bars">${p.photos.map((_, k) => `<i class="${k === i ? 'on' : ''}"></i>`).join('')}</div>` : ''}
      ${top ? '<div class="zone l" data-act="prevph"></div><div class="zone r" data-act="nextph"></div>' : ''}
      <div class="shade"></div>
      <div class="stamp like">LIKE</div><div class="stamp nope">NOPE</div><div class="stamp sl">SUPER LIKE</div>
      <div class="cinfo"><h2>${esc(p.name)}<span>${p.age}</span>${p.verified ? I.verified : ''}</h2>
        <div class="ln">${I.pin}${p.km}km 거리</div>
        <div class="ln">${esc(p.job)}</div>
        <p class="bio">${esc(p.bio)}</p>
        <div class="tg">${p.interests.slice(0, 3).map(t => `<b>${esc(t)}</b>`).join('')}</div></div>
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

  /* ---------- 둘러보기(화면만) ---------- */
  function exploreTab() {
    const T = [['장기 연애', '진지한 만남', I.heart, 'linear-gradient(135deg,#fd267a,#ff6036)'], ['새로운 친구', '가볍게 대화해요', I.chat, 'linear-gradient(135deg,#1da8f9,#6a7bff)'],
      ['커피 한 잔', '근처에서 한 잔', I.sparkle, 'linear-gradient(135deg,#a25af0,#e04fa0)'], ['운동 메이트', '같이 땀 흘려요', I.bolt, 'linear-gradient(135deg,#21d07a,#0fa3a3)'],
      ['반려동물', '함께 산책해요', I.flame, 'linear-gradient(135deg,#ffb020,#ff6036)'], ['여행 친구', '떠나고 싶을 때', I.compassF, 'linear-gradient(135deg,#3a4a7c,#6a7bff)']];
    return `<div class="pane"><div class="h1">둘러보기</div><div class="likehd">관심사와 만남의 목적으로 새로운 사람을 찾아보세요.</div>
      <div class="tiles">${T.map(t => `<button class="tile" data-act="soon" style="background:${t[3]}">${t[2]}<b>${t[0]}</b><small>${t[1]}</small></button>`).join('')}</div>
      <div class="disabled-note">이 화면은 구경만 할 수 있어요</div></div>`;
  }

  /* ---------- 좋아요(화면만) ---------- */
  function likesTab() {
    const L = D.profiles.filter(p => p.likesMe && S.deck.includes(p.id));
    return `<div class="pane"><div class="h1">좋아요</div>
      <div class="likehd"><b>${L.length}명</b>이 나를 좋아해요. Tinder Gold 회원이 되면 누가 좋아했는지 바로 확인하고 매치할 수 있어요.</div>
      <div class="lgrid">${L.map(p => `<button class="lcard" data-act="soon"><div class="bl" style="${bg(p.photos[0])}"></div><span class="badge2">${I.heart}</span><div class="lk">${p.age}세</div></button>`).join('') || '<div class="empty" style="position:static;padding:60px 20px"><div><b>아직 받은 좋아요가 없어요</b>카드를 더 넘겨 보세요</div></div>'}</div>
      <div class="goldbar"><button class="gold" data-act="soon">나를 좋아한 사람 보기</button></div></div>`;
  }

  /* ---------- 채팅 ---------- */
  function chatTab() {
    const fresh = S.matches.filter(id => !(S.chats[id] || []).length);
    const talk = S.matches.filter(id => (S.chats[id] || []).length).sort((a, b) => S.chats[b].slice(-1)[0].ts - S.chats[a].slice(-1)[0].ts);
    const lk = D.profiles.filter(p => p.likesMe && S.deck.includes(p.id)).length;
    return `<div class="pane"><div class="chead"><div class="h1">채팅</div><button class="ibtn" data-act="safe" aria-label="안전">${I.shield}</button></div>
      <div class="sechd">새로운 매치</div>
      <div class="newrow"><button class="newm" data-act="tab" data-t="likes"><div class="pic" style="background:var(--bg2);color:var(--g1)"><span style="width:44px;height:44px;display:block">${I.heart}</span></div>${lk}명</button>
      ${fresh.map(id => { const p = byId(id); return `<button class="newm" data-act="chat" data-id="${id}"><div class="pic fresh" style="${bg(p.photos[0])}"></div>${esc(p.name)}</button>`; }).join('')}</div>
      <div class="sechd">메시지</div>
      ${talk.length ? talk.map(id => { const p = byId(id), u = S.unread[id] > 0, m = S.chats[id].slice(-1)[0];
        return `<button class="convo ${u ? 'unread' : ''}" data-act="chat" data-id="${id}"><div class="ava" style="${bg(p.photos[0])}"></div><div class="t"><div class="row1"><b>${esc(p.name)}</b><span class="tm" style="margin:0">${fmt(m.ts)}</span></div><span>${esc(lastMsg(id))}</span></div>${u ? '<i class="ud"></i>' : ''}</button>`; }).join('')
        : '<div style="padding:30px;text-align:center;color:var(--sub)">아직 대화가 없어요</div>'}</div>`;
  }
  function chatView(id) {
    const p = byId(id), msgs = S.chats[id] || [];
    let html = '', lastDay = '';
    msgs.forEach((m, k) => {
      const day = new Date(m.ts).toDateString();
      if (day !== lastDay) { html += `<div class="dayline">${fmt(m.ts) === clockOnly(m.ts) ? '오늘' : fmt(m.ts)}</div>`; lastDay = day; }
      const nx = msgs[k + 1], end = !nx || nx.from !== m.from || new Date(nx.ts).toDateString() !== day;
      const bub = m.type === 'photo' ? `<div class="bub pic ${m.from}" style="${m.src ? `background-image:url('${m.src}');background-size:cover` : bg({ art: m.art })}"></div>` : `<div class="bub ${m.from}">${esc(m.text)}</div>`;
      const last = m.from === 'me' && k === msgs.map(x => x.from).lastIndexOf('me');
      const meta = end ? `<div class="meta">${last ? (m.read ? I.check + '읽음 · ' : '전송됨 · ') : ''}${clockOnly(m.ts)}</div>` : '';
      html += `<div class="bwrap ${m.from}">${bub}${meta}</div>`;
    });
    if (S.typing[id]) html += `<div class="bwrap them"><div class="bub them typing"><i></i><i></i><i></i></div></div>`;
    return `<div class="view" data-view="chat"><div class="vhdr"><button class="ibtn" data-act="close" aria-label="뒤로">${I.back}</button>
      <button class="who" data-act="detail" data-id="${id}"><i style="${bg(p.photos[0])}"></i><h3>${esc(p.name)}</h3>${p.verified ? I.verified : ''}</button><button class="ibtn" data-act="safe" aria-label="안전">${I.shield}</button></div>
      <div class="chat" id="chatbox"><div class="matchnote">${esc(p.name)} 님과 매치되었어요</div>${html}</div>
      <div class="composer"><button class="ibtn" data-act="attach" data-id="${id}" aria-label="사진">${I.img}</button><input id="msg" placeholder="메시지 입력" autocomplete="off"><button class="send" data-act="send" data-id="${id}" aria-label="전송">${I.send}</button></div></div>`;
  }

  /* ---------- 내 프로필 ---------- */
  function meTab() {
    const m = S.me, ps = profileSections(m, true), pct = 82, R = 66, C = 2 * Math.PI * R;
    return `<div class="pane" style="padding-bottom:30px">
      <div class="mehead"><div class="ring"><svg class="pr" viewBox="0 0 140 140"><circle cx="70" cy="70" r="${R}" fill="none" stroke="var(--line)" stroke-width="5"/><circle cx="70" cy="70" r="${R}" fill="none" stroke="url(#pg)" stroke-width="5" stroke-linecap="round" stroke-dasharray="${C * pct / 100} ${C}" transform="rotate(-90 70 70)"/><defs><linearGradient id="pg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fd267a"/><stop offset="1" stop-color="#ff6036"/></linearGradient></defs></svg><div class="in" style="${bg(m.photos[0])};border-radius:50%"></div><span class="pct">${pct}% 완성</span></div>
      <h1>${esc(m.name)}<span>, ${m.age}</span>${m.verified ? I.verified : ''}</h1></div>
      <div class="mecirc"><button data-act="settings"><i>${I.gear}</i>설정</button><button data-act="soon"><i>${I.img}</i>미디어 추가</button><button data-act="edit"><i>${I.edit}</i>프로필 수정</button></div>
      <div class="promo"><span class="gl">${I.sparkle}</span><b>Tinder Gold</b><span>나를 좋아한 사람을 확인하고 무제한으로 좋아요를 보내 보세요.</span></div>
      <div class="promo pk"><span class="gl">${I.flame}</span><b>부스트</b><span>30분 동안 내 프로필을 더 많은 사람에게 보여줘요.</span></div>
      <div class="sec"><h4>자기소개</h4><p>${esc(m.bio)}</p></div>
      <div class="sec"><h4>사진</h4><div class="pgrid">${m.photos.map(ph => `<div style="${bg(ph)};background-size:cover"></div>`).join('')}</div></div>
      <div class="sec"><h4>관심사</h4><div class="tags">${m.interests.map(t => `<span class="tag hl">${esc(t)}</span>`).join('')}</div></div>
      <div class="sec"><h4>기본 정보</h4><div class="tags">${infoTags(m.info)}</div></div>
      <div class="sec"><h4>관계 목표</h4><div class="tags"><span class="tag goal">${esc(m.goal)}</span></div></div>
      ${ps.prompts.join('')}${ps.quiz}</div>`;
  }

  /* ---------- 상세 / 알림 / 설정 / 편집 ---------- */
  function detailView(id) {
    const p = byId(id), ps = profileSections(p, false), n = p.photos.length;
    const ph = k => { const x = p.photos[k % n]; return `<div class="dphoto ${k ? 's' : ''}" style="${bg(x)}">${media(x)}</div>`; };
    const inMatch = S.matches.includes(id);
    return `<div class="view" data-view="detail"><div class="vhdr"><button class="ibtn" data-act="close" aria-label="닫기">${I.down}</button><h3>${esc(p.name)}</h3><button class="ibtn" data-act="report" data-el="프로필 전체" aria-label="신고">${I.flag}</button></div>
      <div class="vbody">${ph(0)}
      <div class="sec"><h1 style="display:flex;align-items:center">${esc(p.name)}<span>${p.age}</span>${p.verified ? I.verified : ''}</h1><div class="row">${esc(p.job)}</div><div class="row">${esc(p.school)}</div><div class="row">${p.km}km 거리</div></div>
      <div class="sec"><button class="flag" data-act="report" data-el="자기소개" aria-label="신고">${I.flag}</button><h4>자기소개</h4><p>${esc(p.bio)}</p></div>
      <div class="sec"><h4>관계 목표</h4><div class="tags"><span class="tag goal">${esc(p.goal)}</span></div></div>
      <div class="sec"><button class="flag" data-act="report" data-el="기본 정보" aria-label="신고">${I.flag}</button><h4>기본 정보</h4><div class="tags">${infoTags(p.info)}</div></div>
      ${n > 1 ? ph(1) : ''}${ps.prompts[0] || ''}
      <div class="sec"><h4>관심사</h4><div class="tags">${p.interests.map(t => `<span class="tag hl">${esc(t)}</span>`).join('')}</div></div>
      ${n > 2 ? ph(2) : ''}${ps.prompts[1] || ''}${ps.quiz}
      <button class="reportbtn" data-act="report" data-el="프로필 전체">${esc(p.name)} 님 신고하기</button></div>
      ${inMatch ? '' : `<div class="floatact"><button class="act lg" data-act="dnope" data-id="${id}">${I.nope}</button><button class="act sm" data-act="dsuper" data-id="${id}">${I.star}</button><button class="act lg" data-act="dlike" data-id="${id}">${I.like}</button></div>`}</div>`;
  }
  function notifView() {
    const ic = { match: ['var(--grad)', I.flame], like: ['var(--grad)', I.heart], msg: ['#1da8f9', I.chat], boost: ['#a25af0', I.bolt] };
    return `<div class="view" data-view="notif"><div class="vhdr"><button class="ibtn" data-act="close" aria-label="뒤로">${I.back}</button><h3>알림</h3></div><div class="vbody" style="padding-bottom:30px">
      ${D.notifs.map(n => { const p = n.who ? byId(n.who) : null;
        return `<button class="nrow" data-act="${n.k === 'match' || n.k === 'msg' ? 'chat' : 'soon'}" data-id="${n.who || ''}">${p && n.k !== 'like' ? `<div class="ic" style="${bg(p.photos[0])};background-size:cover"></div>` : `<div class="ic" style="background:${ic[n.k][0]}">${ic[n.k][1]}</div>`}<div><b>${esc(n.t)}</b><span>${esc(n.s)}</span></div><time>${fmt(n.ts)}</time></button>`; }).join('')}</div></div>`;
  }
  function settingsView() {
    const s = S.set, sw = k => `<span class="sw ${s[k] ? 'on' : ''}"></span>`, ch = `<span class="sw2">${I.chev}</span>`;
    return `<div class="view" data-view="settings"><div class="vhdr"><button class="ibtn" data-act="close" aria-label="뒤로">${I.back}</button><h3>설정</h3></div><div class="vbody" style="padding-bottom:30px;background:var(--bg)">
      <div class="sgrp">계정 설정</div>
      <div class="srow"><span>전화번호</span><small>010-****-1234</small></div><div class="srow"><span>이메일</span><small>minji@example.com</small></div>
      <div class="sgrp">검색 설정</div>
      <div class="srow col"><div class="top"><span>검색 거리</span><small id="vdist">${s.dist}km</small></div><input type="range" min="2" max="160" value="${s.dist}" data-range="dist"></div>
      <div class="srow col"><div class="top"><span>나이 범위</span><small id="vage">${s.amin} - ${s.amax}세</small></div><input type="range" min="18" max="60" value="${s.amin}" data-range="amin"><input type="range" min="18" max="60" value="${s.amax}" data-range="amax"></div>
      <button class="srow" data-act="show"><span>보고 싶은 성별</span><small style="display:flex;align-items:center;gap:4px">${s.show}${ch}</small></button>
      <div class="sgrp">알림</div>
      <button class="srow" data-act="tog" data-k="push"><span>푸시 알림</span>${sw('push')}</button>
      <button class="srow" data-act="tog" data-k="msgs"><span>메시지 알림</span>${sw('msgs')}</button>
      <button class="srow" data-act="tog" data-k="likes"><span>새 매치 알림</span>${sw('likes')}</button>
      <div class="sgrp">화면</div>
      <button class="srow" data-act="dark"><span>다크 모드</span><span class="sw ${S.dark ? 'on' : ''}"></span></button>
      <div class="sgrp">개인정보 및 안전</div>
      <button class="srow" data-act="soon"><span>개인정보 보호</span>${ch}</button><button class="srow" data-act="soon"><span>안전 센터</span>${ch}</button><button class="srow" data-act="soon"><span>차단 목록</span>${ch}</button>
      <div class="sgrp">계정</div>
      <button class="srow" data-act="soon"><span>로그아웃</span>${ch}</button><button class="srow" data-act="soon"><span style="color:var(--g1)">계정 삭제</span>${ch}</button></div></div>`;
  }
  function editView() {
    const m = S.me;
    return `<div class="view" data-view="edit"><div class="vhdr"><button class="ibtn" data-act="close" aria-label="취소">${I.back}</button><h3>프로필 수정</h3><button class="ibtn" data-act="saveedit" style="width:auto;padding:0 10px;font-weight:700;font-size:16px">완료</button></div><div class="vbody" style="padding:16px 18px 40px">
      <div class="eslots">${[0, 1, 2, 3, 4, 5].map(k => m.photos[k] ? `<div class="f" style="${bg(m.photos[k])};background-size:cover"><span class="x">${I.edit}</span></div>` : `<button data-act="soon" style="display:grid;place-items:center;aspect-ratio:3/4;border-radius:12px;border:1.5px dashed var(--line);color:var(--sub)">${I.plus}</button>`).join('')}</div>
      <label class="field">이름<input id="e-name" value="${esc(m.name)}"></label><label class="field">나이<input id="e-age" type="number" min="18" max="99" value="${m.age}"></label>
      <label class="field">자기소개<textarea id="e-bio">${esc(m.bio)}</textarea></label><label class="field">관심사 (쉼표로 구분)<input id="e-int" value="${esc(m.interests.join(', '))}"></label></div></div>`;
  }

  /* ---------- 매치 / 시트 ---------- */
  function matchHTML(id) {
    const p = byId(id), me = S.me;
    const conf = Array.from({ length: 22 }, (_, k) => `<span class="confv" style="left:${(k * 4.7) % 100}%;animation-duration:${2 + (k % 5) * .5}s;animation-delay:${(k % 7) * .15}s;color:${['#fff', '#ffe2ee', '#ffd1b8', '#c9ffe3'][k % 4]}">${I.heart}</span>`).join('');
    return `<div class="match">${conf}<h1>IT'S A MATCH!</h1><div class="sub">${esc(p.name)} 님과 서로 좋아요를 눌렀어요</div>
      <div class="pair"><div class="pic a" style="${bg(me.photos[0])}"></div><div class="pic b" style="${bg(p.photos[0])}"></div><div class="heart">${I.heart}</div></div>
      <div class="btns"><button class="cta ghost" data-act="matchchat" data-id="${id}">메시지 보내기</button><button class="cta" style="background:rgba(255,255,255,.2)" data-act="matchclose">계속 둘러보기</button></div></div>`;
  }
  function sheetHTML() {
    const sh = S.sheet; if (!sh) return '';
    if (sh.type === 'report') {
      const opts = ['사진', '자기소개', '프로필 문답', '프로필 퀴즈', '기본 정보', '프로필 전체'];
      return `<div class="scrim" data-act="sheetclose"><div class="sheet" data-stop><h3>무엇을 신고하시겠어요?</h3><div class="sub">신고할 프로필 요소를 선택해 주세요</div>
        ${opts.map(o => `<button class="li ${o === sh.el ? 'on' : ''}" data-act="rpick" data-el="${o}">${o}${o === sh.el ? I.radioOn : I.radioOff}</button>`).join('')}<button class="cta" data-act="rsend">신고 접수</button></div></div>`;
    }
    if (sh.type === 'show') return `<div class="scrim" data-act="sheetclose"><div class="sheet" data-stop><h3>보고 싶은 성별</h3><div class="sub">&nbsp;</div>${['남성', '여성', '모두'].map(o => `<button class="li ${S.set.show === o ? 'on' : ''}" data-act="spick" data-v="${o}">${o}${S.set.show === o ? I.radioOn : I.radioOff}</button>`).join('')}</div></div>`;
    return '';
  }

  /* ---------- 렌더 ---------- */
  function render() {
    phone.dataset.theme = S.dark ? 'dark' : 'light';
    const V = { detail: v => detailView(v.id), chat: v => chatView(v.id), settings: settingsView, edit: editView, notif: notifView };
    const v = S.views.map(x => V[x.k](x)).join('');
    const unreadN = Object.values(S.unread).reduce((a, b) => a + b, 0);
    const body = { discover: discover, explore: exploreTab, likes: likesTab, chat: chatTab, me: meTab }[S.tab]();
    const hdr = S.tab === 'discover' ? `<div class="hdr"><div class="l"><button class="ibtn" data-act="notif" aria-label="알림">${I.bell}<i class="dot"></i></button></div><span class="logo">${I.flame}tinder</span><div class="r"><button class="ibtn" data-act="settings" aria-label="검색 설정">${I.sliders}</button></div></div>` : '';
    const tb = (t, on, off, lb, badge) => `<button class="tab ${S.tab === t ? 'on' : ''}" data-act="tab" data-t="${t}" aria-label="${lb}">${S.tab === t ? on : off}${badge ? `<i class="badge">${badge}</i>` : ''}</button>`;
    const keepMsg = (document.getElementById('msg') || {}).value;
    const prevPane = root.querySelector('.pane'), sc = prevPane ? prevPane.scrollTop : 0;
    root.innerHTML = `<div class="statusgap"></div>${hdr}<div class="main">${body}</div><div class="tabbar">${tb('discover', I.flame, I.flameO, '카드')}${tb('explore', I.compassF, I.compass, '둘러보기')}${tb('likes', I.heart, I.heartO, '좋아요')}${tb('chat', I.chat, I.chatO, '채팅', unreadN)}${tb('me', I.user, I.userO, '내 프로필')}</div>${v}${sheetHTML()}${S.matchOverlay ? matchHTML(S.matchOverlay) : ''}${S.toast ? `<div class="toast">${esc(S.toast)}</div>` : ''}`;
    if (keepMsg) { const el = document.getElementById('msg'); if (el) el.value = keepMsg; }
    const pane = root.querySelector('.pane'); if (pane && sc && prevPane) pane.scrollTop = sc;
    const cb = document.getElementById('chatbox'); if (cb) cb.scrollTop = cb.scrollHeight;
    const top = root.querySelector('.card.top'); if (top && !S.views.length) bindDrag(top);
    S.anim = false; save();
  }

  /* ---------- 스와이프 ---------- */
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
    const t = dir === 'like' ? 'translate(560px,60px) rotate(26deg)' : dir === 'nope' ? 'translate(-560px,60px) rotate(-26deg)' : 'translateY(-900px) scale(.9)';
    const st = c.querySelector('.stamp.' + (dir === 'like' ? 'like' : dir === 'nope' ? 'nope' : 'sl')); if (st) st.style.opacity = 1;
    const nx = root.querySelector('.card.next'); if (nx) { nx.style.transition = 'transform .3s'; nx.style.transform = 'none'; nx.style.filter = 'none'; }
    c.style.transform = t; c.style.opacity = 0; setTimeout(() => commit(dir, id), 300);
  }
  let suppress = false;
  function bindDrag(c) {
    let sx, sy, drag = false, down = false;
    const L = c.querySelector('.stamp.like'), N = c.querySelector('.stamp.nope'), U = c.querySelector('.stamp.sl'), nx = root.querySelector('.card.next');
    c.addEventListener('pointerdown', e => { if (lock) return; down = true; drag = false; sx = e.clientX; sy = e.clientY; });
    c.addEventListener('pointermove', e => {
      if (!down) return; const dx = e.clientX - sx, dy = e.clientY - sy;
      if (!drag && Math.hypot(dx, dy) > 8) { drag = true; c.setPointerCapture(e.pointerId); c.classList.remove('snap'); }
      if (!drag) return;
      c.style.transform = `translate(${dx}px,${dy}px) rotate(${dx / 18}deg)`;
      L.style.opacity = Math.max(0, Math.min(1, dx / 90)); N.style.opacity = Math.max(0, Math.min(1, -dx / 90));
      U.style.opacity = dy < 0 && Math.abs(dx) < 60 ? Math.min(1, -dy / 90) : 0;
      if (nx) { const k = Math.min(1, Math.hypot(dx, dy) / 160); nx.style.transition = 'none'; nx.style.transform = `scale(${.95 + .05 * k}) translateY(${10 - 10 * k}px)`; nx.style.filter = `brightness(${.92 + .08 * k})`; }
    });
    const end = e => {
      if (!down) return; down = false; if (!drag) return; suppress = true; setTimeout(() => suppress = false, 50);
      const dx = e.clientX - sx, dy = e.clientY - sy, id = c.dataset.id;
      if (dx > 100) fly('like', id); else if (dx < -100) fly('nope', id); else if (dy < -110) fly('super', id);
      else { c.classList.add('snap'); c.style.transform = ''; L.style.opacity = N.style.opacity = U.style.opacity = 0; if (nx) { nx.style.transition = 'transform .25s'; nx.style.transform = ''; nx.style.filter = ''; } }
    };
    c.addEventListener('pointerup', end); c.addEventListener('pointercancel', end);
  }

  /* ---------- 이벤트 ---------- */
  function openChat(id) { S.unread[id] = 0; S.views.push({ k: 'chat', id }); }
  function reply(id) {
    const r = ['ㅎㅎ 좋아요!', '오 정말요? 더 얘기해 주세요', '저도 그렇게 생각했어요', '이번 주 시간 괜찮으세요?'];
    S.typing[id] = true; setTimeout(render, 300);
    setTimeout(() => {
      S.typing[id] = false; const c = (S.chats[id] = S.chats[id] || []);
      c.forEach(m => { if (m.from === 'me') m.read = true; });
      c.push({ from: 'them', type: 'text', text: r[Math.floor(Math.random() * r.length)], ts: Date.now() });
      if (!S.views.some(v => v.k === 'chat' && v.id === id)) S.unread[id] = (S.unread[id] || 0) + 1; render();
    }, 1800);
  }
  root.addEventListener('click', e => {
    if (suppress) return;
    const t = e.target.closest('[data-act]'); if (!t) return;
    if (e.target.closest('[data-stop]') && t.classList.contains('scrim')) return;
    const a = t.dataset.act, id = t.dataset.id;
    const topId = S.deck[0];
    switch (a) {
      case 'tab': S.tab = t.dataset.t; break;
      case 'nextph': { const p = byId(topId); const n = Math.min((S.pi[topId] || 0) + 1, p.photos.length - 1); if (n !== (S.pi[topId] || 0)) S.anim = true; S.pi[topId] = n; break; }
      case 'prevph': { const n = Math.max((S.pi[topId] || 0) - 1, 0); if (n !== (S.pi[topId] || 0)) S.anim = true; S.pi[topId] = n; break; }
      case 'like': case 'nope': case 'super': if (topId) { t.classList.add('pop'); fly(a, topId); } return;
      case 'rewind': { const h = S.history.pop(); if (!h) return toast('되돌릴 프로필이 없어요'); S.deck.unshift(h.id); if (h.matched) { S.matches = S.matches.filter(x => x !== h.id); delete S.chats[h.id]; } break; }
      case 'boost': S.boosted = true; toast('부스트 시작 · 30분 동안 내 프로필이 더 많이 노출돼요'); return;
      case 'detail': S.views.push({ k: 'detail', id }); break;
      case 'close': S.views.pop(); break;
      case 'chat': if (!id) return toast(SOON); S.tab = 'chat'; S.views = []; openChat(id); break;
      case 'settings': S.views.push({ k: 'settings' }); break;
      case 'edit': S.views.push({ k: 'edit' }); break;
      case 'notif': S.views.push({ k: 'notif' }); break;
      case 'safe': return toast(SOON);
      case 'soon': return toast(SOON);
      case 'quiz': S.quiz[id] = +t.dataset.i; break;
      case 'report': S.sheet = { type: 'report', el: t.dataset.el }; break;
      case 'rpick': S.sheet.el = t.dataset.el; break;
      case 'rsend': { const el = S.sheet.el; S.sheet = null; render(); return toast(`'${el}' 신고가 접수되었어요`); }
      case 'sheetclose': S.sheet = null; break;
      case 'show': S.sheet = { type: 'show' }; break;
      case 'spick': S.set.show = t.dataset.v; S.sheet = null; break;
      case 'tog': S.set[t.dataset.k] = !S.set[t.dataset.k]; break;
      case 'dark': S.dark = !S.dark; break;
      case 'dlike': case 'dnope': case 'dsuper': {
        const d = a === 'dlike' ? 'like' : a === 'dnope' ? 'nope' : 'super'; S.views = [];
        if (S.deck.includes(id)) { S.deck = S.deck.filter(x => x !== id); S.deck.unshift(id); lock = false; commit(d, id); return; } break;
      }
      case 'matchchat': S.matchOverlay = null; S.tab = 'chat'; S.views = []; openChat(id); break;
      case 'matchclose': S.matchOverlay = null; break;
      case 'send': {
        const inp = document.getElementById('msg'); const v = inp.value.trim(); if (!v) return;
        (S.chats[id] = S.chats[id] || []).push({ from: 'me', type: 'text', text: v, ts: Date.now(), read: false }); inp.value = ''; render(); reply(id); return;
      }
      case 'attach': (S.chats[id] = S.chats[id] || []).push({ from: 'me', type: 'photo', src: 'photos/lake2.jpg', ts: Date.now(), read: false }); render(); reply(id); return;
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

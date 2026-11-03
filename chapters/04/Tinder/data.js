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

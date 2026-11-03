/* NAVER 2024 - 벡터 아이콘 / 로고 (전부 SVG 경로, 이모지·문자 아이콘 없음) */
(function () {
'use strict';
var P = {
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.4 15.4 21 21"/>',
  lens: '<path d="M4 8V6a2 2 0 0 1 2-2h2M16 4h2a2 2 0 0 1 2 2v2M20 16v2a2 2 0 0 1-2 2h-2M8 20H6a2 2 0 0 1-2-2v-2"/><circle cx="12" cy="12" r="3.2"/>',
  mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21"/>',
  ai: '<path d="M10 3l1.7 4.8L16.5 9.5l-4.8 1.7L10 16l-1.7-4.8L3.5 9.5l4.8-1.7z" fill="currentColor" stroke="none"/><path d="M18 14l.9 2.4 2.4.9-2.4.9L18 20.6l-.9-2.4-2.4-.9 2.4-.9z" fill="currentColor" stroke="none"/>',
  bell: '<path d="M6 16v-5a6 6 0 0 1 12 0v5l1.5 2h-15z"/><path d="M10 20.5a2 2 0 0 0 4 0"/>',
  back: '<path d="M15 4 7 12l8 8"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  chevR: '<path d="M9 5l7 7-7 7"/>',
  chevD: '<path d="M5 9l7 7 7-7"/>',
  heart: '<path d="M12 20.5S3.8 15 3.8 9.2A4.4 4.4 0 0 1 12 7.4a4.4 4.4 0 0 1 8.2 1.8C20.2 15 12 20.5 12 20.5z"/>',
  chat: '<path d="M4 5.5h16v11H10l-5 4v-4H4z"/>',
  share: '<path d="M12 15V3.5M7.5 8 12 3.5 16.5 8M5 13v7h14v-7"/>',
  more: '<circle cx="12" cy="5" r="1.6" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none"/><circle cx="12" cy="19" r="1.6" fill="currentColor" stroke="none"/>',
  play: '<path d="M8 5v14l11-7z" fill="currentColor" stroke="none"/>',
  pause: '<path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" fill="currentColor" stroke="none"/>',
  expand: '<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>',
  tag: '<path d="M3.5 12.5V4.5h8l9 9-8 8z"/><circle cx="8" cy="9" r="1.3"/>',
  pin: '<path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/>',
  list: '<path d="M4 6h12M4 12h12M4 18h8M18 14v6l4-3z"/>',
  trash: '<path d="M5 7h14M10 7V4.5h4V7M7 7l1 13h8l1-13"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7v5.5l3.5 2"/>',
  flame: '<path d="M12 21a6 6 0 0 1-6-6c0-3 2-5 3.5-7 .5 2 1.5 3 2.5 3 0-3 1-5.5 3-7 .5 4 5 6 5 11a6 6 0 0 1-8 6z"/>',
  /* 하단 탭 (얇은 검정 라인) */
  t_shop: '<path d="M5 8.5h14l-1.2 11.5H6.2zM9 8.5V7a3 3 0 0 1 6 0v1.5"/>',
  t_home: '<path d="M4 11l8-7 8 7M6 9.5V20h12V9.5"/>',
  t_content: '<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>',
  t_clip: '<rect x="5" y="3.5" width="14" height="17" rx="3"/><path d="M10.5 9v6l4.5-3z" fill="currentColor"/>',
  /* 서비스 */
  mail: '<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M3.5 7.5 12 13.5l8.5-6"/>',
  cafe: '<path d="M5 9h11v5.5a4.5 4.5 0 0 1-4.5 4.5h-2A4.5 4.5 0 0 1 5 14.500zM16 10.5h1.5a2.3 2.3 0 0 1 0 4.600H16M8 4v2M12 4v2"/>',
  blog: '<path d="M4 20l1-4.5L16 4.500l3.500 3.500L8.500 19zM14 6.500l3.500 3.500"/>',
  kin: '<path d="M4 5h16v11h-8l-4 4v-4H4z"/><path d="M10 9.500a2 2 0 1 1 3 1.700c-.7.4-1 .8-1 1.500"/>',
  toon: '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M4 15l4-4 4 4 3-3 5 5"/><circle cx="9" cy="8.500" r="1.200"/>',
  map: '<path d="M4 6.500l5-2 6 2 5-2v13l-5 2-6-2-5 2zM9 4.500v13M15 6.500v13"/>',
  stock: '<path d="M4 4v16h16M7.500 15l3.500-4 3 2.500 4.500-6"/>',
  dict: '<path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3zM5 17a3 3 0 0 1 3-3h11"/>',
  news: '<path d="M5 4h11v16H7a2 2 0 0 1-2-2zM16 8h3v10a2 2 0 0 1-2 2M8 8h5M8 12h5M8 16h5"/>',
  tv: '<rect x="3" y="5" width="18" height="12" rx="2"/><path d="M8 21h8M12 17v4M10 9l5 3-5 3z"/>',
  sports: '<circle cx="12" cy="12" r="8.500"/><path d="M3.500 12h17M12 3.500c3.200 3 3.200 14 0 17M12 3.500c-3.200 3-3.200 14 0 17"/>',
  game: '<rect x="3" y="8" width="18" height="9" rx="4.500"/><path d="M8 10.500v4M6 12.500h4"/><circle cx="15.500" cy="11.500" r=".9" fill="currentColor"/><circle cx="18" cy="13.500" r=".9" fill="currentColor"/>',
  health: '<path d="M12 20S4 14.500 4 9.500A4 4 0 0 1 12 8a4 4 0 0 1 8 1.500C20 14.500 12 20 12 20z"/><path d="M8 12.500h2l1.500-2.500 2 4 1.200-1.500H17"/>',
  money: '<circle cx="12" cy="12" r="8.500"/><path d="M12 7v10M9.500 9.500c0-1.200 1-1.800 2.500-1.800s2.500.7 2.500 1.800-1 1.500-2.500 1.800-2.500.7-2.500 1.900 1 1.800 2.500 1.800 2.500-.6 2.500-1.800"/>',
  star: '<path d="M12 3.500l2.600 5.400 5.900.8-4.300 4.100 1 5.900-5.200-2.800-5.200 2.800 1-5.900L3.500 9.700l5.900-.8z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2.500v2.200M12 19.300v2.200M2.500 12h2.200M19.300 12h2.200M5.300 5.300l1.500 1.500M17.200 17.200l1.500 1.500M5.300 18.700l1.500-1.500M17.200 6.800l1.500-1.500"/>',
  cloudsun: '<circle cx="8.500" cy="8.500" r="3"/><path d="M8.500 3v1.300M3 8.500h1.300M4.600 4.600l.9.9M12.400 4.600l-.9.9"/><path d="M8.500 20a4 4 0 0 1 .5-8A5.500 5.500 0 0 1 19.500 13.500 3.250 3.250 0 0 1 19 20z"/>',
  dust: '<path d="M4 9h10a2.500 2.500 0 1 0-2.400-3M4 13h14a2.500 2.500 0 1 1-2.400 3M4 17h7"/>',
  steps: '<path d="M9 4c1.700 0 2.500 1.500 2.500 3.500S10.500 11 9 11 6.500 9.500 6.500 7.500 7.300 4 9 4zM15 12c1.700 0 2.500 1.500 2.500 3.500S16.500 19 15 19s-2.500-1.500-2.500-3.500S13.300 12 15 12z"/>',
  grid: '<circle cx="6" cy="6" r="1.800" fill="currentColor" stroke="none"/><circle cx="12" cy="6" r="1.800" fill="currentColor" stroke="none"/><circle cx="18" cy="6" r="1.800" fill="currentColor" stroke="none"/><circle cx="6" cy="12" r="1.800" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.800" fill="currentColor" stroke="none"/><circle cx="18" cy="12" r="1.800" fill="currentColor" stroke="none"/><circle cx="6" cy="18" r="1.800" fill="currentColor" stroke="none"/><circle cx="12" cy="18" r="1.800" fill="currentColor" stroke="none"/><circle cx="18" cy="18" r="1.800" fill="currentColor" stroke="none"/>',
  cart: '<path d="M3 4h2.500l2 11h10l2-8H7"/><circle cx="9" cy="19" r="1.500"/><circle cx="17" cy="19" r="1.500"/>',
  gift: '<rect x="4" y="9" width="16" height="11" rx="1.500"/><path d="M3 9h18v3H3zM12 9v11M12 9c-1-4-5-4-5-1.500S10.500 9 12 9zM12 9c1-4 5-4 5-1.500S13.500 9 12 9z"/>',
  live: '<rect x="3" y="6" width="18" height="12" rx="2.500"/><circle cx="12" cy="12" r="2.200" fill="currentColor"/><path d="M7 9.500a6 6 0 0 0 0 5M17 9.500a6 6 0 0 1 0 5"/>',
  zap: '<path d="M13 3 5 13.500h6L10 21l8-10.500h-6z"/>',
  trophy: '<path d="M8 4h8v5a4 4 0 0 1-8 0zM8 6H5v1.500A3 3 0 0 0 8 10.500M16 6h3v1.500a3 3 0 0 1-3 3M12 13v4M8.500 20h7M10 17h4"/>'
};

function ic(n, s, c, w) {
  return '<svg class="vi" viewBox="0 0 24 24" width="' + s + '" height="' + s + '" fill="none" stroke="' + (c || 'currentColor') +
    '" stroke-width="' + (w || 1.8) + '" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (P[n] || '') + '</svg>';
}

/* 네이버 N 로고 (초록 사각형 + 흰 N) */
function logoN(s) {
  return '<svg class="vi" viewBox="0 0 28 28" width="' + s + '" height="' + s + '" aria-hidden="true"><rect width="28" height="28" rx="6" fill="#03C75A"/>' +
    '<path fill="#fff" d="M7.500 7h5.200l3.600 6.300V7h4.200v14h-5.200l-3.600-6.300V21H7.500z"/></svg>';
}

/* NAVER 워드마크 (벡터 경로) */
function wordmark(h, color) {
  var f = color || '#03C75A';
  return '<svg class="vi" viewBox="0 0 112 22" height="' + h + '" width="' + (h * 112 / 22) + '" fill="' + f + '" aria-label="NAVER" role="img">' +
    '<path d="M0 0h6l8 12.500V0h6v22h-6L6 9.500V22H0z"/>' +
    '<path fill-rule="evenodd" d="M22 22 30 0h4l8 22h-6l-1.200-4h-5.600L28 22zM33 8.800 31.500 14h3z" transform="translate(2 0)"/>' +
    '<path d="M44 0h6l4 14 4-14h6l-7.500 22h-5z" transform="translate(2 0)"/>' +
    '<path d="M66 0h15.500v5H72v3.500h8.500v5H72V17h10v5H66z" transform="translate(2 0)"/>' +
    '<path fill-rule="evenodd" d="M86 0h9.500a6 6 0 0 1 2.300 11.500L103 22h-6.500L92 13h-.2v9H86zM91.800 4.800v4.200H95a2.100 2.100 0 0 0 0-4.200z" transform="translate(2 0)"/></svg>';
}

/* 서비스 아이콘 색상 */
var COL = { mail: '#03C75A', cafe: '#FF8A1F', blog: '#03C75A', kin: '#2F80ED', toon: '#00B8A0', map: '#3C8BF4', stock: '#F04452', dict: '#6B5CE7', news: '#505866', tv: '#E5484D', sports: '#2B9E5B', game: '#7A4DE8', health: '#F0527F', money: '#E8A100', shop: '#03C75A', gift: '#F0527F', live: '#E5484D', zap: '#FF6B2C' };
function sv(k, size) {
  size = size || 48;
  return '<i class="sv" style="width:' + size + 'px;height:' + size + 'px;background:' + (COL[k] || '#888') + '1A;color:' + (COL[k] || '#888') + '">' + ic(k, size * 0.5, 'currentColor', 1.8) + '</i>';
}

/* 썸네일 대체 벡터 일러스트 (저작권 있는 사진 대신 사용) */
var SC = [['#BFE6FF', '#6BB5F0', '#3E8E5A'], ['#FFD9B8', '#FF9F6B', '#8C5A3C'], ['#E6D9FF', '#A98BF0', '#5B4B9E'], ['#CFF5E1', '#6FD3A2', '#2E7D5B'], ['#FFE3EC', '#FF8FB0', '#A14568'], ['#FFF1B8', '#FFC93D', '#A8741A'], ['#D5E3F5', '#7FA3D6', '#3A5A8C'], ['#E8E8EE', '#B5B5C4', '#5A5A6B']];
var uid = 0;
function thumb(i, shape) {
  var c = SC[Math.abs(i) % SC.length], id = 'g' + (uid++);
  var k = (Math.abs(i) % 3);
  var mid = k === 0 ? '<circle cx="62" cy="26" r="11" fill="#fff" opacity=".75"/><path d="M0 76 28 44l20 24 16-14 36 36v10H0z" fill="' + c[2] + '"/>' :
    k === 1 ? '<rect x="22" y="30" width="56" height="44" rx="8" fill="#fff" opacity=".6"/><circle cx="50" cy="52" r="14" fill="' + c[2] + '"/><circle cx="50" cy="52" r="6" fill="#fff" opacity=".8"/>' :
      '<path d="M0 70c18-18 30 6 50-8s36-2 50-10v48H0z" fill="' + c[2] + '"/><circle cx="30" cy="30" r="10" fill="#fff" opacity=".7"/>';
  return '<svg class="thm" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="' + id + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="' + c[0] + '"/><stop offset="1" stop-color="' + c[1] + '"/></linearGradient></defs><rect width="100" height="100" fill="url(#' + id + ')"/>' + mid + '</svg>';
}

window.NI = { ic: ic, logoN: logoN, wordmark: wordmark, sv: sv, thumb: thumb };
})();

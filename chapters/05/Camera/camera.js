(function () {
  const KEY = 'camera-ch05-photos';
  const root = document.getElementById('root');
  let photos = [], stream = null, expanded = false, focalOpen = false, focal = '24mm';
  try { photos = JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { photos = []; }
  const persist = () => { for (;;) { try { localStorage.setItem(KEY, JSON.stringify(photos)); return; } catch (e) { if (photos.length <= 1) return; photos.pop(); } } };

  const sv = (p, o = '') => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" ${o}>${p}</svg>`;
  const I = {
    flash: sv('<path d="M13 2L5 13h6l-1 9 8-11h-6z"/><path d="M3 3l18 18"/>'),
    live: sv('<circle cx="12" cy="12" r="2.200" fill="currentColor"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="9.500" stroke-dasharray="1.600 2.200"/>'),
    chev: sv('<path d="M5 15l7-7 7 7"/>', 'stroke-width="2.4"'),
    night: sv('<path d="M20 14.500A8.500 8.500 0 119.500 4a7 7 0 0010.500 10.500z"/>'),
    style: sv('<rect x="4" y="4" width="7" height="7" rx="1.500"/><rect x="13" y="4" width="7" height="7" rx="1.500"/><rect x="4" y="13" width="7" height="7" rx="1.500"/><rect x="13" y="13" width="7" height="7" rx="1.500"/>'),
    expo: sv('<circle cx="12" cy="12" r="9"/><path d="M12 7v10M7 12h10" /><path d="M0 0" />'),
    timer: sv('<circle cx="12" cy="13.500" r="7.500"/><path d="M12 9.500v4l2.500 1.500M10 2.500h4"/>'),
    filter: sv('<circle cx="9" cy="10" r="5.500"/><circle cx="15" cy="10" r="5.500"/><circle cx="12" cy="15" r="5.500"/>'),
    flip: sv('<path d="M20 8h-4l-2-2.500h-4L8 8H4v11h16z" opacity="0"/><path d="M4.500 10a8 8 0 0113.500-3.500L20 8.500M20 4v4.500h-4.500M19.500 14a8 8 0 01-13.500 3.500L4 15.500M4 20v-4.500h4.500"/>', 'stroke-width="2"')
  };
  const sig = '<svg viewBox="0 0 18 12" fill="#fff"><rect x="0" y="8" width="3" height="4" rx=".8"/><rect x="5" y="5.500" width="3" height="6.500" rx=".8"/><rect x="10" y="3" width="3" height="9" rx=".8"/><rect x="15" y="0" width="3" height="12" rx=".8"/></svg>';
  const wifi = '<svg viewBox="0 0 17 12" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"><path d="M1.500 4.500a10 10 0 0114 0M4 7.200a6.500 6.500 0 019 0"/><circle cx="8.500" cy="10.200" r="1.200" fill="#fff" stroke="none"/></svg>';
  const bat = '<svg viewBox="0 0 27 12" fill="none"><rect x=".5" y=".5" width="23" height="11" rx="3.500" stroke="#fff" opacity=".5"/><rect x="2" y="2" width="20" height="8" rx="2.200" fill="#fff"/><path d="M25 4v4c.8-.3 1.500-1.100 1.500-2S25.800 4.300 25 4z" fill="#fff" opacity=".5"/></svg>';

  root.innerHTML = `
    <div class="status"><span>9:41</span><span class="r">${sig}${wifi}${bat}</span></div>
    <div class="top">
      <button class="ic" aria-label="플래시">${I.flash}</button>
      <button class="ic mid" id="chev" aria-label="카메라 설정 열기">${I.chev}</button>
      <div class="rt"><span class="raw" aria-label="RAW 꺼짐">RAW</span><button class="ic" aria-label="Live Photo">${I.live}</button></div>
    </div>
    <div class="vf" id="vf">
      <video id="video" playsinline muted autoplay hidden></video>
      <div class="fallback" id="fb"><p><b>카메라를 사용할 수 없어요</b>카메라 권한을 허용하면 실시간 화면이 표시돼요. 지금은 샘플 화면으로 촬영할 수 있어요.</p></div>
      <div class="blink" id="blink"></div>
      <div class="panel" id="panel">
        <button class="ic" aria-label="플래시">${I.flash}</button>
        <button class="ic y" aria-label="야간 모드">${I.night}</button>
        <button class="ic" aria-label="Live Photo">${I.live}</button>
        <button class="ic" aria-label="사진 스타일">${I.style}</button>
        <button class="ic" aria-label="화면 비율"><span>4:3</span></button>
        <button class="ic" aria-label="노출 조절">${I.expo}</button>
        <button class="ic" aria-label="타이머">${I.timer}</button>
        <button class="ic" aria-label="필터">${I.filter}</button>
      </div>
      <div class="zoom">
        <div class="focal" id="focal"><button data-f="24mm" class="on">24mm</button><button data-f="28mm">28mm</button><button data-f="35mm">35mm</button></div>
        <div class="zbar"><button aria-label="0.5배">.5</button><button class="on" id="z1" aria-label="1배">1×</button><button aria-label="2배">2</button><button aria-label="3배">3</button></div>
      </div>
    </div>
    <div class="below">
      <div class="modes" id="modes"><div class="in" id="min"><span>시네마틱</span><span>비디오</span><span class="on" id="m-photo">사진</span><span>인물 사진</span><span>파노라마</span></div></div>
      <div class="shutrow">
        <button class="thumb" id="thumb" aria-label="최근 사진 보기"></button>
        <button class="shutter" id="shutter" aria-label="사진 촬영"><i></i></button>
        <button class="flip" aria-label="전면/후면 카메라 전환">${I.flip}</button>
      </div>
    </div>`;

  const $ = id => document.getElementById(id);
  const video = $('video'), vf = $('vf');

  function centerModes() { const m = $('modes'), s = $('m-photo'), r = $('min'); r.style.transition = 'none'; r.style.transform = `translateX(${m.clientWidth / 2 - (s.offsetLeft + s.offsetWidth / 2)}px)`; }
  function setThumb() { const t = $('thumb'); t.style.backgroundImage = photos.length ? `url(${photos[0]})` : ''; }
  centerModes(); setThumb(); addEventListener('resize', centerModes);

  // 시각 전용 UI (카메라 기능과 연결되지 않음)
  $('chev').addEventListener('click', () => { expanded = !expanded; $('chev').classList.toggle('open', expanded); $('panel').classList.toggle('open', expanded); });
  $('z1').addEventListener('click', () => { focalOpen = !focalOpen; $('focal').classList.toggle('open', focalOpen); });
  $('focal').addEventListener('click', e => { const b = e.target.closest('button[data-f]'); if (!b) return; focal = b.dataset.f; document.querySelectorAll('#focal button').forEach(x => x.classList.toggle('on', x === b)); });

  // 카메라 스트림
  (async function () {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) throw 0;
      stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: 'environment' }, width: { ideal: 1920 }, height: { ideal: 1440 } }, audio: false });
      video.srcObject = stream; await video.play(); video.hidden = false; $('fb').hidden = true;
    } catch (e) { stream = null; }
  })();

  function capture() {
    const W = 1080, rw = vf.clientWidth, rh = vf.clientHeight, H = Math.round(W * rh / rw);
    const c = document.createElement('canvas'); c.width = W; c.height = H; const g = c.getContext('2d');
    if (stream && video.videoWidth) {
      const vw = video.videoWidth, vh = video.videoHeight, ar = rw / rh;
      let sw = vw, sh = vw / ar; if (sh > vh) { sh = vh; sw = vh * ar; }
      g.drawImage(video, (vw - sw) / 2, (vh - sh) / 2, sw, sh, 0, 0, W, H);
    } else {
      const bgc = g.createLinearGradient(0, 0, 0, H); bgc.addColorStop(0, '#2b3a55'); bgc.addColorStop(.55, '#6c7fa6'); bgc.addColorStop(.56, '#35402f'); bgc.addColorStop(1, '#1c241a');
      g.fillStyle = bgc; g.fillRect(0, 0, W, H);
      g.fillStyle = '#ffd9a0'; g.beginPath(); g.arc(W * .7, H * .24, W * .08, 0, 7); g.fill();
      g.fillStyle = 'rgba(255,255,255,.85)'; g.font = `600 ${W * .045}px sans-serif`; g.textAlign = 'center';
      g.fillText(new Date().toLocaleString('ko-KR'), W / 2, H - W * .06);
    }
    return c.toDataURL('image/jpeg', .72);
  }
  $('shutter').addEventListener('click', () => {
    const b = $('blink'); b.classList.remove('on'); void b.offsetWidth; b.classList.add('on');
    photos.unshift(capture()); persist(); setThumb();
  });

  // 사진 확인
  $('thumb').addEventListener('click', () => {
    if (!photos.length) return;
    const v = document.createElement('div'); v.className = 'viewer';
    v.innerHTML = `<div class="vh"><button id="vclose">완료</button><b id="vcount">1 / ${photos.length}</b><i></i></div><div class="strip" id="strip">${photos.map(p => `<div><img src="${p}" alt="촬영한 사진"></div>`).join('')}</div><div class="vf2"></div>`;
    $('root').appendChild(v);
    $('vclose').onclick = () => v.remove();
    const st = $('strip'); st.addEventListener('scroll', () => { $('vcount').textContent = `${Math.round(st.scrollLeft / st.clientWidth) + 1} / ${photos.length}`; });
  });
})();

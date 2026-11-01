/* 공용 상단 시스템 바: 시간(실시간) · 와이파이 · 배터리
   각 앱 HTML의 <head>에 <script src="../shared/system-bar.js"></script> 로 불러옵니다.
   Galaxy S8 / Samsung Experience 9.0 상태 표시줄(24dp). */
(function () {
  if (window.top !== window.self && document.documentElement.hasAttribute("data-selfpad-ok")) document.documentElement.setAttribute("data-selfpad", "");
  if (window.__sysBar) return; window.__sysBar = true;
  const css = `
.sys-bar{position:relative;z-index:50;flex:none;box-sizing:border-box;height:24px;padding:0 8px;display:flex;align-items:center;justify-content:flex-end;
  pointer-events:none;font-family:Roboto,"Noto Sans KR",sans-serif;color:#000;}
.sys-bar.sys-overlay{position:absolute;top:0;left:0;right:0}
.sys-bar.sys-dark{color:#fff}
.sys-bar .sb-r{display:flex;gap:5px;align-items:center;color:inherit;font-size:12px}
.sys-bar .sb-t{font-size:12px;font-weight:400;letter-spacing:0}
.sys-bar svg{height:12px;width:auto}`;

  const WIFI = '<svg class="sb-wifi" viewBox="0 0 18 14"><path d="M1 4.2C5.5.3 12.5.3 17 4.2L15.4 5.8C11.8 2.7 6.2 2.7 2.6 5.8Z"/><path d="M4 7.2c2.9-2.5 7.1-2.5 10 0l-1.6 1.6c-2-1.7-4.8-1.7-6.8 0Z"/><path d="M7 10.2c1.2-1 2.8-1 4 0L9 12.3Z"/></svg>';

  function lum(c) {
    const m = (c || "").match(/\d+(\.\d+)?/g); if (!m || m.length < 3) return null;
    return (0.2126 * m[0] + 0.7152 * m[1] + 0.0722 * m[2]) / 255;
  }
  function bgOf(barH) {
    // 바 아래 여러 지점을 샘플링해서 가장 많이 나온 배경색을 씁니다.
    // body/html 배경(어두운 기본값일 수 있음)은 제외하고, 그라데이션은 "image"로 표시합니다.
    const counts = {};
    const W = window.innerWidth, y = barH + 4;
    for (const fx of [0.1, 0.5, 0.9]) {
      try {
        let el = document.elementFromPoint(W * fx, y);
        while (el && el !== document.body && el !== document.documentElement) {
          const cs = getComputedStyle(el);
          let key = null;
          if (cs.backgroundImage && cs.backgroundImage !== "none") key = "image";
          else if (cs.backgroundColor && cs.backgroundColor !== "transparent" && cs.backgroundColor !== "rgba(0, 0, 0, 0)") key = cs.backgroundColor;
          if (key) { counts[key] = (counts[key] || 0) + 1; break; }
          el = el.parentElement;
        }
      } catch (e) {}
    }
    const best = Object.keys(counts).sort((x, z) => counts[z] - counts[x])[0];
    if (best) return best;
    const c = getComputedStyle(document.body).backgroundColor;
    return (c && c !== "transparent" && c !== "rgba(0, 0, 0, 0)") ? c : "#fff";
  }

  function build() {
    const style = document.createElement("style");
    style.textContent = css; document.head.appendChild(style);
    const bar = document.createElement("div");
    bar.className = "sys-bar";
    bar.setAttribute("aria-hidden", "true");
    bar.innerHTML = '<span class="sb-r"><svg viewBox="0 0 24 18"><path d="M12 16.5 0 4.5C3.3 1.6 7.4 0 12 0s8.7 1.6 12 4.5z" opacity=".4" fill="currentColor"/><path d="M12 16.5 5 9.5C6.8 8 9.3 7 12 7s5.2 1 7 2.5z" fill="currentColor"/></svg><svg viewBox="0 0 16 16"><path d="M0 16 16 0v16z" opacity=".4" fill="currentColor"/><path d="M0 16 10 6v10z" fill="currentColor"/></svg><span id="battery-pct">100%</span><svg viewBox="0 0 10 16" style="height:13px"><rect x="3" y="0" width="4" height="2" fill="currentColor"/><rect x="1" y="2" width="8" height="13" rx="1.2" fill="none" stroke="currentColor" stroke-width="1.4"/><rect id="battery-fill" x="2.5" y="12" width="5" height="2" fill="currentColor"/></svg><span class="sb-t"></span></span>';
    // 앱이 스스로 상단 여백을 잡는 경우(data-selfpad)에는 그 자리에 겹쳐 올리고, 아니면 본문 맨 위에 끼워 넣습니다.
    const bodyDisplay = getComputedStyle(document.body).display;
    // 본문이 flex/grid 레이아웃이면 끼워 넣으면 배치가 깨지므로 겹쳐 올립니다.
    const mode = document.documentElement.getAttribute("data-sysbar") || "";
    // data-sysbar="pad": 본문 전체를 바 높이만큼 아래로 밀어냄 (flex 가운데 정렬 앱 등)
    const padMode = mode === "pad";
    const overlay = !padMode && (mode === "overlay" || document.documentElement.hasAttribute("data-selfpad") || /flex|grid/.test(bodyDisplay));
    if (overlay) bar.classList.add("sys-overlay");
    document.body.insertBefore(bar, document.body.firstChild);

    // 본문 맨 위에 고정(fixed)된 전체 화면 컨테이너는 바 높이만큼 아래로 내려 헤더가 가려지지 않게 합니다.
    const h = bar.offsetHeight;
    if (padMode) {
      bar.classList.add("sys-overlay");
      document.body.style.boxSizing = "border-box";
      document.body.style.paddingTop = h + "px";
    }
    [...document.body.children].forEach(el => {
      if (el === bar) return;
      const cs = getComputedStyle(el);
      if (cs.position === "fixed" && (cs.top === "0px" || cs.top === "auto") && el.id !== "toast") {
        el.style.top = h + "px";
      }
    });
    const t = bar.querySelector(".sb-t");
    const tick = () => { const d = new Date(); t.textContent = (d.getHours() < 12 ? "오전 " : "오후 ") + (d.getHours() % 12 || 12) + ":" + String(d.getMinutes()).padStart(2, "0"); };
    tick(); setInterval(tick, 10000);

    const paint = () => {
      const bg = bgOf(bar.offsetHeight);
      if (bg === "image") { bar.style.background = "transparent"; bar.classList.add("sys-dark"); return; }
      bar.style.background = overlay ? "transparent" : bg;
      const l = lum(bg);
      bar.classList.toggle("sys-dark", l !== null && l < 0.5);
    };
    paint(); window.addEventListener("load", paint);

    if (navigator.getBattery) navigator.getBattery().then(b => {
      const fill = bar.querySelector("#battery-fill");
      const draw = () => { const hh = Math.max(1, 11 * b.level); fill.setAttribute("height", hh); fill.setAttribute("y", 14 - hh); const pc = bar.querySelector("#battery-pct"); if (pc) pc.textContent = Math.round(b.level * 100) + "%"; };
      draw(); b.addEventListener("levelchange", draw);
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", build);
  else build();
})();

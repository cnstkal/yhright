/* 공용 상단 시스템 바 (iOS 12, iPhone 6s 20pt 상태 바): 왼쪽 신호·통신사·Wi-Fi / 가운데 시간(실시간) / 오른쪽 배터리
이 챕터의 각 앱 HTML에서 <script src="../system-bar.js"></script> 로 불러옵니다 (챕터 내부 파일).
*/
(function () {
if (window.top !== window.self && document.documentElement.hasAttribute("data-selfpad-ok")) document.documentElement.setAttribute("data-selfpad", "");
if (window.__sysBar) return; window.__sysBar = true;
const css = `
.sys-bar{position:relative;z-index:50;flex:none;box-sizing:border-box;height:calc(env(safe-area-inset-top,0px) + 20px);
padding:env(safe-area-inset-top,0px) 7px 0 7px;display:flex;align-items:center;justify-content:space-between;
pointer-events:none;font-family:-apple-system,BlinkMacSystemFont,"SF Pro Text","Pretendard",sans-serif;color:#000;}
.sys-bar.sys-overlay{position:absolute;top:0;left:0;right:0}
.sys-bar.sys-dark{color:#fff}
.sys-bar .sb-t{position:absolute;left:0;right:0;text-align:center;font-size:12px;font-weight:600;letter-spacing:-.1px;font-feature-settings:"tnum"}
.sys-bar .sb-l,.sys-bar .signals{display:flex;gap:4px;align-items:center;color:inherit;position:relative;z-index:1;font-size:12px;font-weight:600;letter-spacing:-.1px}
.sys-bar .signals{margin-left:auto}
.sys-bar svg{display:block;height:11px;width:auto}
.sys-bar .sb-dots{height:7px}`;
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
bar.innerHTML = '<span class="sb-l"><svg class="sb-dots" viewBox="0 0 30 8" fill="currentColor"><circle cx="3" cy="4" r="2.6"/><circle cx="9.5" cy="4" r="2.6"/><circle cx="16" cy="4" r="2.6"/><circle cx="22.5" cy="4" r="2.6"/><circle cx="29" cy="4" r="2.1" fill="none" stroke="currentColor" stroke-width="1"/></svg><span>KT</span><svg viewBox="0 0 18 13" fill="currentColor"><path d="M9 12.4 6.6 10a3.4 3.4 0 0 1 4.8 0zM9 7.4c-1.8 0-3.5.7-4.8 1.9L3 8.1A8.5 8.5 0 0 1 9 5.7c2.3 0 4.4.9 6 2.4l-1.2 1.2A6.8 6.8 0 0 0 9 7.4zM9 3C6.2 3 3.7 4.1 1.8 5.9L.6 4.7A11.6 11.6 0 0 1 9 1.3c3.2 0 6.1 1.3 8.4 3.4l-1.2 1.2A9.8 9.8 0 0 0 9 3z"/></svg></span><span class="sb-t"></span><span class="signals"><span id="battery-pct">40%</span><svg viewBox="0 0 28 13" fill="none"><rect x=".5" y=".5" width="23" height="12" rx="3.5" stroke="currentColor" stroke-opacity=".5"/><rect id="battery-fill" x="2" y="2" width="9.5" height="9" rx="2" fill="currentColor"/><path d="M25.5 4.5v4" stroke="currentColor" stroke-opacity=".5" stroke-width="1.6" stroke-linecap="round"/></svg></span>';
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
const tick = () => { const d = new Date(); t.textContent = (d.getHours() % 12 || 12) + ":" + String(d.getMinutes()).padStart(2, "0"); };
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
const fill = bar.querySelector("#battery-fill"), pct = bar.querySelector("#battery-pct");
const draw = () => { fill.setAttribute("width", Math.max(1, 21 * b.level)); pct.textContent = Math.round(b.level * 100) + "%"; };
draw(); b.addEventListener("levelchange", draw);
});
}
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", build);
else build();
})();

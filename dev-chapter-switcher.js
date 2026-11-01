/* TEMPORARY DEVELOPMENT TOOL: delete this file and its script tags to remove the chapter switcher. */
(() => {
  if (window.top !== window.self) return;
  if (document.getElementById("dev-chapter-switcher")) return;
  const match = decodeURIComponent(location.pathname).match(/\/chapters\/(\d{2})\//);
  const current = match ? match[1] : "01";
  const chapters = ["01", "02", "03"];
  const rootPath = location.pathname.slice(0, location.pathname.indexOf("/chapters/"));
  const root = document.createElement("div");
  root.id = "dev-chapter-switcher";
  root.innerHTML = `
    <style>
      #dev-chapter-switcher{position:fixed;top:12px;right:12px;z-index:2147483000;font-family:Arial,sans-serif}
      #dev-chapter-switcher button{border:1px solid rgba(255,255,255,.32);background:rgba(25,29,38,.78);color:#fff;border-radius:18px;padding:7px 11px;font-size:11px;font-weight:700;letter-spacing:.02em;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);box-shadow:0 2px 10px #0003;cursor:pointer}
      #dev-chapter-switcher .panel{display:none;position:absolute;right:0;top:36px;min-width:100px;padding:6px;border:1px solid #ffffff30;border-radius:12px;background:rgba(25,29,38,.94);box-shadow:0 8px 24px #0004}
      #dev-chapter-switcher.open .panel{display:block}
      #dev-chapter-switcher a{display:block;padding:10px 11px;border-radius:8px;color:#fff;text-decoration:none;font-size:12px;white-space:nowrap}
      #dev-chapter-switcher a:hover{background:#ffffff20}
    </style>
    <button type="button" aria-expanded="false" aria-controls="dev-chapter-panel">CH ${current}⌄</button>
    <div class="panel" id="dev-chapter-panel">${chapters.map(n => `<a href="${rootPath}/chapters/${n}/home.html">CH ${n}</a>`).join("")}</div>
  `;
  const button = root.querySelector("button");
  button.addEventListener("click", event => {
    event.stopPropagation();
    const open = root.classList.toggle("open");
    button.setAttribute("aria-expanded", String(open));
  });
  document.addEventListener("click", event => {
    if (!root.contains(event.target)) {
      root.classList.remove("open");
      button.setAttribute("aria-expanded", "false");
    }
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      root.classList.remove("open");
      button.setAttribute("aria-expanded", "false");
    }
  });
  document.body.appendChild(root);
})();
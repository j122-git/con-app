const systems = [
  {id:"dalux", name:"Dalux", desc:"Site management & drawings", icon:"⌂", tone:"green"},
  {id:"projectwise", name:"ProjectWise", desc:"Project information & drawings", icon:"◈", tone:"blue"},
  {id:"sharepoint", name:"SharePoint", desc:"Documents & project sites", icon:"S", tone:"purple"},
  {id:"teams", name:"Microsoft Teams", desc:"Calls, chat & collaboration", icon:"T", tone:"blue"},
  {id:"powerbi", name:"Power BI", desc:"Dashboards & project data", icon:"▥", tone:"orange"},
  {id:"other", name:"Other project systems", desc:"More tools used on the project", icon:"＋", tone:"green"}
];

const trainings = [
  {id:"dalux", name:"Dalux", desc:"Getting started with site management", progress:0},
  {id:"sharepoint", name:"SharePoint", desc:"Finding and managing documents", progress:50},
  {id:"teams", name:"Microsoft Teams", desc:"Essential skills for everyday use", progress:75},
  {id:"projectwise", name:"ProjectWise", desc:"Finding project information", progress:0},
  {id:"powerbi", name:"Power BI", desc:"Reading project dashboards", progress:0}
];

let state = { screen: "home", modal: null, query: "" };

function app() { return document.getElementById("app"); }
function esc(s) { return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c])); }

function header(title, back=false) {
  return `<div class="topbar">
    ${back ? `<button class="icon-btn" aria-label="Back" onclick="go('home')">←</button>` : `<div class="brand-mini"><span class="logo-mark">BT</span><span>Digital Hub</span></div>`}
    ${!back ? `<button class="icon-btn" aria-label="Help" onclick="showHelp()">?</button>` : `<span></span>`}
  </div>
  ${title ? `<h1>${title}</h1>` : ""}`;
}

function nav(active) {
  return `<nav class="bottom-nav">
    <button class="nav-item ${active==='home'?'active':''}" onclick="go('home')"><span>⌂</span>Home</button>
    <button class="nav-item ${active==='apps'?'active':''}" onclick="go('apps')"><span>▦</span>Apps</button>
    <button class="nav-item ${active==='training'?'active':''}" onclick="go('training')"><span>◆</span>Training</button>
  </nav>`;
}

function render() {
  let html = "";
  if (state.screen === "welcome") html = welcome();
  if (state.screen === "home") html = home();
  if (state.screen === "apps") html = apps();
  if (state.screen === "training") html = training();
  if (state.screen === "system") html = systemDetail(state.modal);
  if (state.screen === "course") html = courseDetail(state.modal);
  if (state.screen === "help") html = helpdesk();
  app().innerHTML = html;
}

function welcome() {
  return `<section class="welcome">
    <div class="welcome-brand"><span class="logo-mark">BT</span><span>BOUYGUES · MURPHY</span></div>
    <div class="welcome-copy">
      <div class="eyebrow">SITE DIGITAL HUB</div>
      <h1>Construction<br>Digital Hub</h1>
      <p class="lead">The tools, apps and support you need — all in one place.</p>
      <div class="hardhat" aria-hidden="true"></div>
      <div class="callout">Scan the QR code on site to access the hub.<br><strong>No login needed to start.</strong></div>
    </div>
    <div class="welcome-actions">
      <button class="btn btn-primary" onclick="go('home')">Get started <span>→</span></button>
    </div>
  </section>`;
}

function home() {
  return `<section class="screen">
    ${header("")}
    <p class="eyebrow">WELCOME</p>
    <h1>Everything you need<br>to get to work.</h1>
    <p class="lead">Choose what you need. You'll only be asked to sign in when it's required.</p>
    <div class="quick-grid" style="margin-top:22px">
      <button class="quick-card support" onclick="go('help')">
        <span class="round-icon orange">◉</span><span><h3>IT Helpdesk</h3><p class="lead" style="margin:0;font-size:13px">Can't access something? Raise a ticket.</p></span><span class="arrow">→</span>
      </button>
      <button class="quick-card apps" onclick="go('apps')">
        <span class="round-icon green">▦</span><span><h3>Apps & Systems</h3><p class="lead" style="margin:0;font-size:13px">Open the tools you need.</p></span><span class="arrow">→</span>
      </button>
      <button class="quick-card training" onclick="go('training')">
        <span class="round-icon purple">◆</span><span><h3>Training</h3><p class="lead" style="margin:0;font-size:13px">Learn how to use digital apps.</p></span><span class="arrow">→</span>
      </button>
    </div>
    <div class="callout" style="margin-top:16px"><strong>Tip:</strong> You don't need to remember where anything is. Start with the thing you need.</div>
    ${nav('home')}
  </section>`;
}

function apps() {
  const q = state.query.toLowerCase();
  const list = systems.filter(s => `${s.name} ${s.desc}`.toLowerCase().includes(q));
  return `<section class="screen">
    ${header("Apps & Systems", true)}
    <p class="lead">Open the digital tools you need to do your job.</p>
    <div class="search">⌕ <input autofocus value="${esc(state.query)}" oninput="state.query=this.value;render()" placeholder="Search apps and systems…" aria-label="Search apps"></div>
    <div class="list">
      ${list.map(s => `<button class="system-card" onclick="openSystem('${s.id}')">
        <span class="round-icon ${s.tone}">${esc(s.icon)}</span>
        <span class="meta"><h3>${esc(s.name)}</h3><small>${esc(s.desc)}</small></span><span class="arrow">→</span>
      </button>`).join("") || `<div class="callout">No system found. Try another search or raise an IT ticket.</div>`}
    </div>
    ${nav('apps')}
  </section>`;
}

function training() {
  const q = state.query.toLowerCase();
  const list = trainings.filter(t => `${t.name} ${t.desc}`.toLowerCase().includes(q));
  return `<section class="screen">
    ${header("Training", true)}
    <p class="lead">Learn how to use the digital apps and systems you need.</p>
    <div class="search">⌕ <input autofocus value="${esc(state.query)}" oninput="state.query=this.value;render()" placeholder="Search training…" aria-label="Search training"></div>
    <div class="list">
      ${list.map(t => `<button class="system-card" onclick="openCourse('${t.id}')">
        <span class="round-icon purple">◆</span>
        <span class="meta"><h3>${esc(t.name)}</h3><small>${esc(t.desc)}</small>
        <div class="progress"><span style="width:${t.progress}%"></span></div>
        </span>
        <span class="arrow">→</span>
      </button>`).join("")}
    </div>
    ${nav('training')}
  </section>`;
}

function systemDetail(id) {
  const s = systems.find(x => x.id === id) || systems[0];
  return `<section class="screen">
    ${header(s.name, true)}
    <div class="detail-card">
      <div class="detail-header">
        <span class="round-icon ${s.tone}">${esc(s.icon)}</span>
        <div><h2 style="margin:0">${esc(s.name)}</h2><span class="pill">Digital system</span></div>
      </div>
      <p class="lead">${esc(s.desc)}.</p>
      <button class="btn btn-primary" onclick="signIn('${esc(s.id)}')">Open ${esc(s.name)} <span>→</span></button>
      <button class="btn btn-secondary" style="margin-top:9px" onclick="openCourse('${esc(s.id)}')">How to use ${esc(s.name)}</button>
    </div>
    <div class="callout"><strong>Having trouble?</strong><br>You can raise an IT ticket without signing in here.</div>
    <button class="btn btn-orange" style="margin-top:12px" onclick="go('help')">Raise an IT ticket</button>
  </section>`;
}

function courseDetail(id) {
  const t = trainings.find(x => x.id === id) || trainings[0];
  return `<section class="screen">
    ${header(`${esc(t.name)} training`, true)}
    <div class="detail-card">
      <span class="pill">Digital skills</span>
      <h2 style="margin-top:12px">${esc(t.desc)}</h2>
      <p class="lead">Short, practical guidance for using the system on the project.</p>
      <div class="progress"><span style="width:${t.progress}%"></span></div>
      <p style="font-size:13px;color:var(--muted)">${t.progress}% complete</p>
      <button class="btn btn-primary" onclick="signIn('training-${esc(t.id)}')">${t.progress ? "Continue training" : "Start training"} <span>→</span></button>
    </div>
    <div class="callout">Training sign-in is only requested when you start the course.</div>
  </section>`;
}

function helpdesk() {
  return `<section class="screen">
    ${header("IT Helpdesk", true)}
    <p class="lead">Tell us what you need help with. No hub login required.</p>
    <form class="detail-card form" onsubmit="submitTicket(event)">
      <div class="field"><label for="name">Name</label><input id="name" required placeholder="Your name"></div>
      <div class="field"><label for="system">System</label>
        <select id="system"><option>Not sure</option>${systems.map(s=>`<option>${esc(s.name)}</option>`).join("")}</select>
      </div>
      <div class="field"><label for="issue">What is the problem?</label><textarea id="issue" required placeholder="Briefly describe the issue"></textarea></div>
      <div class="field"><label for="contact">Contact details</label><input id="contact" required placeholder="Email or phone"></div>
      <button class="btn btn-orange" type="submit">Raise ticket <span>→</span></button>
      <p class="hint">Prototype only: this form currently shows a confirmation. Connect it to your real IT ticketing API before deployment.</p>
    </form>
  </section>`;
}

function showHelp() {
  state.modal = "help";
  app().insertAdjacentHTML("beforeend", `<div class="modal-backdrop" onclick="if(event.target===this)closeModal()"><div class="modal">
    <button class="close" onclick="closeModal()">×</button><p class="eyebrow">HOW IT WORKS</p><h2>Keep it simple</h2>
    <p class="lead">Scan the QR code → choose what you need → sign in only when the selected system or training requires it.</p>
    <button class="btn btn-primary" onclick="closeModal()">Got it</button>
  </div></div>`);
}
function signIn(target) {
  app().insertAdjacentHTML("beforeend", `<div class="modal-backdrop" onclick="if(event.target===this)closeModal()"><div class="modal">
    <button class="close" onclick="closeModal()">×</button><p class="eyebrow">SIGN IN</p><h2>Sign in to continue</h2>
    <p class="lead">The hub itself doesn't require a login. You only sign in here because the selected service requires it.</p>
    <button class="btn btn-primary" onclick="closeModal();toast('Demo sign-in complete')">Continue to sign in <span>→</span></button>
  </div></div>`);
}
function closeModal() { document.querySelector(".modal-backdrop")?.remove(); }
function submitTicket(e) {
  e.preventDefault();
  toast("Ticket submitted — thank you");
  e.target.reset();
}
function toast(message) {
  const t=document.getElementById("toast"); t.textContent=message; t.classList.add("show");
  setTimeout(()=>t.classList.remove("show"),2600);
}
function go(screen) {
  state.screen=screen; state.modal=null; state.query=""; render(); window.scrollTo(0,0);
}
function openSystem(id) { state.modal=id; state.screen="system"; render(); }
function openCourse(id) { state.modal=id; state.screen="course"; render(); }

const path = location.pathname.toLowerCase();
state.screen = location.hash === "#welcome" ? "welcome" : "home";
render();

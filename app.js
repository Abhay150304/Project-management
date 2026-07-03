/* ============================================================
   PROFLOW — PROJECT MANAGEMENT SYSTEM — APP.JS
   Full application logic: state, routing, rendering, real-time
   ============================================================ */

'use strict';

// ─── State ─────────────────────────────────────────────────
const STATE = {
  currentPage: 'dashboard',
  theme: 'dark',
  sessionStart: new Date(),

  projects: [
    { id: 1, name: 'Website Redesign',       color: '#7c3aed', deadline: '2026-07-20', progress: 68 },
    { id: 2, name: 'Mobile App v2.0',        color: '#06b6d4', deadline: '2026-08-05', progress: 42 },
    { id: 3, name: 'API Integration',        color: '#10b981', deadline: '2026-07-15', progress: 85 },
    { id: 4, name: 'Data Analytics Dash',    color: '#f59e0b', deadline: '2026-08-30', progress: 25 },
    { id: 5, name: 'Cloud Migration',        color: '#f43f5e', deadline: '2026-09-01', progress: 55 },
    { id: 6, name: 'Weather Forecast App',   color: '#06b6d4', deadline: '2026-07-25', progress: 30 },
    { id: 7, name: 'Data Viz Dashboard',     color: '#f59e0b', deadline: '2026-08-10', progress: 15 },
  ],

  tasks: [
    // ── Website Redesign ──
    { id: 1,  title: 'Design new landing page',          desc: 'Create modern hero section and feature blocks with responsive grid layout.',           priority:'high',   status:'inprogress', project:1, assignee:1, due:'2026-07-08' },
    { id: 6,  title: 'Performance audit',                desc: 'Run Lighthouse audit. Target 90+ score on Performance, SEO and Accessibility.',          priority:'medium', status:'todo',       project:1, assignee:1, due:'2026-07-18' },
    { id: 8,  title: 'Design system components',         desc: 'Storybook setup and component documentation for all reusable UI elements.',              priority:'medium', status:'review',     project:1, assignee:4, due:'2026-07-09' },
    { id: 11, title: 'SEO optimisation',                 desc: 'Add meta tags, XML sitemap, structured data markup and Open Graph tags.',               priority:'low',    status:'done',       project:1, assignee:1, due:'2026-07-04' },
    // ── Mobile App v2.0 ──
    { id: 3,  title: 'User authentication module',       desc: 'JWT-based auth with refresh tokens and biometric login support.',                       priority:'high',   status:'inprogress', project:2, assignee:3, due:'2026-07-12' },
    { id: 9,  title: 'Unit test coverage',               desc: 'Bring test coverage to 80% across all app modules using Jest.',                          priority:'low',    status:'todo',       project:2, assignee:3, due:'2026-07-25' },
    // ── API Integration ──
    { id: 2,  title: 'Set up CI/CD pipeline',            desc: 'Configure GitHub Actions for automated build, test and deployment workflows.',          priority:'high',   status:'todo',       project:3, assignee:2, due:'2026-07-10' },
    { id: 5,  title: 'API documentation',                desc: 'Write OpenAPI 3.0 spec for all REST endpoints with example requests and responses.',    priority:'low',    status:'review',     project:3, assignee:2, due:'2026-07-14' },
    { id: 12, title: 'Load testing',                     desc: 'Run k6 load tests simulating 1000 concurrent users. Fix any bottlenecks found.',        priority:'medium', status:'done',       project:3, assignee:2, due:'2026-07-06' },
    // ── Data Analytics Dash ──
    { id: 4,  title: 'Dashboard wireframes',             desc: 'Low-fidelity wireframes for all analytics screens. Review with stakeholders.',         priority:'medium', status:'done',       project:4, assignee:4, due:'2026-07-05' },
    // ── Cloud Migration ──
    { id: 7,  title: 'Migrate user database',            desc: 'Move MySQL to PostgreSQL with connection pooling. Zero-downtime migration plan.',        priority:'high',   status:'inprogress', project:5, assignee:5, due:'2026-07-22' },
    { id: 10, title: 'Kubernetes cluster setup',         desc: 'Provision EKS cluster with auto-scaling, node groups and Helm chart deployments.',      priority:'high',   status:'todo',       project:5, assignee:5, due:'2026-07-30' },
    // ── Weather Forecast App ──
    { id: 13, title: 'Current weather API integration',  desc: 'Fetch live temperature, humidity, wind speed, pressure from Open-Meteo API. Auto-refresh every 60 seconds with animated countdown timer.', priority:'high',   status:'inprogress', project:6, assignee:2, due:'2026-07-10' },
    { id: 14, title: '7-day forecast cards UI',          desc: 'Design horizontal scrollable row of daily forecast cards. Each card shows day name, weather emoji, high/low temps, precipitation bar. Highlight today.', priority:'high', status:'todo', project:6, assignee:3, due:'2026-07-12' },
    { id: 15, title: 'City search with geocoding',       desc: 'Search bar with live autocomplete using Open-Meteo Geocoding API. Show city + country dropdown. Save last searched city to localStorage.', priority:'medium', status:'todo', project:6, assignee:2, due:'2026-07-14' },
    { id: 16, title: 'Loading indicators & skeleton UI', desc: 'Full-screen loader on initial load. Shimmer skeleton on weather cards during data fetch. Spinner during city geocoding.', priority:'medium', status:'done', project:6, assignee:3, due:'2026-07-08' },
    { id: 17, title: 'Temperature trend chart',          desc: 'Implement Chart.js line chart showing 7-day max/min temperature with purple gradient fill and dark theme styling.', priority:'low', status:'review', project:6, assignee:1, due:'2026-07-16' },
    { id: 18, title: 'Mobile responsive weather layout', desc: 'Ensure all weather cards, forecast row and chart work on screens 320px and above. Test touch scrolling on forecast strip.', priority:'low', status:'todo', project:6, assignee:3, due:'2026-07-18' },
    // ── Data Viz Dashboard ──
    { id: 19, title: 'KPI overview stat cards',          desc: 'Build 6 animated KPI cards: Total Revenue, Monthly Growth, Active Users, Conversion Rate, Avg Order Value, Customer Satisfaction. Counter animation on load.', priority:'high', status:'done', project:7, assignee:1, due:'2026-07-11' },
    { id: 20, title: 'Revenue & user growth charts',     desc: 'Monthly Revenue line chart (Jan–Dec) and User Growth area chart using Chart.js with dark-theme gradient fills. Responsive.', priority:'high', status:'inprogress', project:7, assignee:2, due:'2026-07-15' },
    { id: 21, title: 'Sales transactions report table',  desc: '20-row sortable transactions table with search, status filter (All/Completed/Pending/Failed), and pagination (10 rows/page). Show total at bottom.', priority:'high', status:'inprogress', project:7, assignee:3, due:'2026-07-17' },
    { id: 22, title: 'Statistics heatmap & regional chart', desc: 'GitHub-style 7×24 activity heatmap. Horizontal bar chart for 5 regions. Top 5 products table with progress bars.', priority:'medium', status:'todo', project:7, assignee:1, due:'2026-07-20' },
    { id: 23, title: 'Export CSV, JSON and PDF/Print',   desc: 'Export report table as downloadable CSV and JSON. PDF via browser print with print-specific CSS. Log exports in localStorage.', priority:'medium', status:'todo', project:7, assignee:2, due:'2026-07-22' },
    { id: 24, title: 'Dark/light mode toggle',           desc: 'Theme toggle with localStorage persistence. All Chart.js charts must rerender with correct colors on theme switch.', priority:'low', status:'review', project:7, assignee:3, due:'2026-07-19' },
  ],

  users: [
    { id:1, name:'Abhay Kumar',   role:'Project Manager', dept:'Management', email:'abhay@proflow.io',   status:'online',  avatar:'AK', tasks:8,  projects:5, color:'#7c3aed', isAdmin:true  },
    { id:2, name:'Riya Sharma',   role:'Backend Developer',dept:'Engineering',email:'riya@proflow.io',   status:'online',  avatar:'RS', tasks:6,  projects:3, color:'#06b6d4', isAdmin:false },
    { id:3, name:'Arjun Mehta',   role:'Frontend Developer',dept:'Engineering',email:'arjun@proflow.io', status:'away',    avatar:'AM', tasks:5,  projects:3, color:'#10b981', isAdmin:false },
    { id:4, name:'Priya Patel',   role:'UI/UX Designer',  dept:'Design',    email:'priya@proflow.io',   status:'online',  avatar:'PP', tasks:4,  projects:4, color:'#f59e0b', isAdmin:false },
    { id:5, name:'Dev Nair',      role:'DevOps Engineer', dept:'Infrastructure',email:'dev@proflow.io',  status:'offline', avatar:'DN', tasks:3,  projects:2, color:'#f43f5e', isAdmin:true  },
    { id:6, name:'Aisha Khan',    role:'QA Engineer',     dept:'Quality',   email:'aisha@proflow.io',   status:'away',    avatar:'AK', tasks:4,  projects:4, color:'#6366f1', isAdmin:false },
    { id:7, name:'Vikram Singh',  role:'Data Analyst',    dept:'Analytics', email:'vikram@proflow.io',  status:'online',  avatar:'VS', tasks:2,  projects:2, color:'#ec4899', isAdmin:false },
  ],

  events: [
    { id:1, title:'Sprint Planning',   date:'2026-07-02', type:'Meeting'  },
    { id:2, title:'API Deadline',      date:'2026-07-15', type:'Deadline' },
    { id:3, title:'Design Review',     date:'2026-07-08', type:'Review'   },
    { id:4, title:'v2.0 Release',      date:'2026-08-05', type:'Release'  },
    { id:5, title:'Team Retrospective',date:'2026-07-09', type:'Meeting'  },
    { id:6, title:'Cloud Go-Live',     date:'2026-09-01', type:'Release'  },
    { id:7, title:'Q3 Planning',       date:'2026-07-14', type:'Meeting'  },
  ],

  activityLog: [],
  minuteData: {},   // minute key -> activity count
  calendarDate: new Date(2026, 6, 1),   // July 2026
  selectedDate: null,
  draggedTaskId: null,
  analyticsPeriod: 'week',

  // session counters
  actionsCount: 0,
  tasksCreated: 0,
  tasksMoved: 0,

  charts: {},
  nextTaskId: 25,
  nextUserId: 8,
  nextEventId: 8,
  nextProjectId: 8,
};

// ─── Utility Helpers ───────────────────────────────────────
const $ = id => document.getElementById(id);

/* ============================================================
   LOCAL STORAGE PERSISTENCE
   ============================================================ */
const STORAGE_KEY = 'proflow_v1';

// Keys we persist
const PERSIST_KEYS = [
  'projects','tasks','users','events',
  'theme',
  'nextTaskId','nextUserId','nextEventId','nextProjectId',
];

function saveState() {
  try {
    const snapshot = {};
    PERSIST_KEYS.forEach(k => { snapshot[k] = STATE[k]; });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  } catch(e) {
    console.warn('ProFlow: Could not save to localStorage:', e);
  }
}

/**
 * Load persisted data into STATE. Returns true if data was restored.
 */
function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const saved = JSON.parse(raw);
    PERSIST_KEYS.forEach(k => {
      if (saved[k] !== undefined) STATE[k] = saved[k];
    });
    return true;
  } catch(e) {
    console.warn('ProFlow: Could not load from localStorage:', e);
    return false;
  }
}

function clearStorage() {
  if (!confirm('Reset all data to defaults? This will erase all your tasks, projects, and team members.')) return;
  localStorage.removeItem(STORAGE_KEY);
  showToast('🔄 Data reset — reloading…', 'info');
  setTimeout(() => location.reload(), 1200);
}

function fmt(date) {
  return new Date(date).toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' });
}

function fmtTime(date = new Date()) {
  return date.toLocaleTimeString('en-IN', { hour:'2-digit', minute:'2-digit', second:'2-digit', hour12:false });
}

function fmtTimeShort(date = new Date()) {
  return date.toLocaleTimeString('en-IN', { hour:'2-digit', minute:'2-digit', hour12:false });
}

function getMinuteKey(date = new Date()) {
  return `${date.getHours()}:${String(date.getMinutes()).padStart(2,'0')}`;
}

function getUserById(id) { return STATE.users.find(u => u.id === id); }
function getProjectById(id) { return STATE.projects.find(p => p.id === id); }

function avatarHTML(user, size='') {
  return `<div class="avatar ${size}" style="background:linear-gradient(135deg,${user.color},${user.color}99)">${user.avatar}</div>`;
}

// ─── Navigation ────────────────────────────────────────────
function navigate(page) {
  // Update active state
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  const navEl = $(`nav-${page}`);
  if (navEl) navEl.classList.add('active');

  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const pageEl = $(`page-${page}`);
  if (pageEl) pageEl.classList.add('active');

  // Update topbar title
  const titles = {
    dashboard: 'Dashboard',
    tasks: 'Task Board',
    calendar: 'Calendar',
    analytics: 'Analytics',
    activity: 'Activity Log',
    users: 'Team Members',
  };
  $('topbar-title').textContent = titles[page] || page;

  STATE.currentPage = page;
  logActivity(`Navigated to <strong>${titles[page]}</strong>`);

  // Page-specific init
  if (page === 'analytics')  initCharts();
  if (page === 'calendar')   renderCalendar();
  if (page === 'activity')   renderActivityPage();
  if (page === 'users')      renderUsers();

  closeSidebar();
}

// ─── Sidebar ───────────────────────────────────────────────
function toggleSidebar() {
  $('sidebar').classList.toggle('open');
  $('sidebarOverlay').classList.toggle('open');
}

function closeSidebar() {
  $('sidebar').classList.remove('open');
  $('sidebarOverlay').classList.remove('open');
}

// ─── Theme ─────────────────────────────────────────────────
function toggleTheme() {
  STATE.theme = STATE.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', STATE.theme);
  $('themeBtn').textContent = STATE.theme === 'dark' ? '🌙' : '☀️';
  saveState();
  logActivity(`Switched to <strong>${STATE.theme} mode</strong>`);
}

// ─── Activity Logging ──────────────────────────────────────
function logActivity(text, type = 'default') {
  const now = new Date();
  const entry = { text, time: now, type };
  STATE.activityLog.unshift(entry);
  if (STATE.activityLog.length > 200) STATE.activityLog.pop();

  // Update minute data
  const key = getMinuteKey(now);
  STATE.minuteData[key] = (STATE.minuteData[key] || 0) + 1;

  STATE.actionsCount++;
  $('actionsCount') && ($('actionsCount').textContent = STATE.actionsCount);

  renderActivityFeed();
  renderMinuteGrid();
  updateSessionSummary();
}

function renderActivityFeed() {
  const feed = $('activityFeed');
  if (!feed) return;
  const colors = { task: '#7c3aed', user: '#06b6d4', calendar: '#10b981', default: '#6366f1' };
  feed.innerHTML = STATE.activityLog.slice(0, 10).map(a => `
    <div class="activity-item">
      <div class="activity-dot" style="background:${colors[a.type] || colors.default};color:${colors[a.type] || colors.default}"></div>
      <div class="activity-text">${a.text}</div>
      <div class="activity-time">${fmtTimeShort(a.time)}</div>
    </div>
  `).join('');
}

// ─── Live Clock ────────────────────────────────────────────
function startClock() {
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

  function tick() {
    const now = new Date();
    const clock = $('liveClock');
    const dateEl = $('liveDate');
    if (clock) clock.textContent = fmtTime(now);
    if (dateEl) dateEl.textContent = `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;

    // Log activity every minute if page is active
    if (now.getSeconds() === 0) {
      logActivity(`Minute <strong>${fmtTimeShort(now)}</strong> — session active`);
    }
  }
  tick();
  setInterval(tick, 1000);
}

// ─── Minute Grid ───────────────────────────────────────────
function renderMinuteGrid() {
  ['minuteGrid','activityHeatmap'].forEach(id => {
    const grid = $(id);
    if (!grid) return;

    const now = new Date();
    const cells = [];
    for (let i = 59; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 60000);
      const key = getMinuteKey(d);
      const count = STATE.minuteData[key] || 0;
      let cls = 'minute-cell';
      if (count >= 3) cls += ' active';
      else if (count >= 1) cls += ' moderate';
      else if (count > 0) cls += ' low';
      const tip = `${key}: ${count} action${count !== 1 ? 's' : ''}`;
      cells.push(`<div class="${cls}" data-tooltip="${tip}"></div>`);
    }
    grid.innerHTML = cells.join('');
  });
}

// ─── Session Summary ───────────────────────────────────────
function updateSessionSummary() {
  const start = $('sessionStart');
  if (start) start.textContent = fmtTimeShort(STATE.sessionStart);
  const ac = $('actionsCount'); if (ac) ac.textContent = STATE.actionsCount;
  const tc = $('tasksCreated'); if (tc) tc.textContent = STATE.tasksCreated;
  const tm = $('tasksMoved');   if (tm) tm.textContent = STATE.tasksMoved;
  const sub = $('activitySubtitle');
  if (sub) sub.textContent = `${STATE.actionsCount} actions logged since ${fmtTimeShort(STATE.sessionStart)}`;
}

// ─── Activity Full Timeline ────────────────────────────────
function renderActivityPage() {
  const timeline = $('fullTimeline');
  if (!timeline) return;
  timeline.innerHTML = STATE.activityLog.map(a => `
    <div class="timeline-item">
      <div class="timeline-time">${fmtTime(a.time)}</div>
      <div class="timeline-content">${a.text}</div>
    </div>
  `).join('') || '<div class="empty-state"><div class="empty-icon">📭</div><p>No activity yet</p></div>';
  renderMinuteGrid();
  renderActiveHoursChart();
  updateSessionSummary();
}

function renderActiveHoursChart() {
  const el = $('activeHoursChart');
  if (!el) return;
  const data = [12, 28, 45, 38, 22, 55, 47, 33, 18];
  const max = Math.max(...data);
  el.innerHTML = data.map((v, i) => {
    const h = Math.round((v / max) * 100);
    const colors = ['var(--accent)', 'var(--cyan)', 'var(--emerald)', 'var(--amber)', 'var(--indigo)', 'var(--accent)', 'var(--cyan)', 'var(--emerald)', 'var(--amber)'];
    return `<div style="flex:1;height:${h}%;background:${colors[i]};border-radius:3px 3px 0 0;opacity:0.8;transition:opacity 0.2s" title="${v} actions"></div>`;
  }).join('');
}

function clearActivity() {
  STATE.activityLog = [];
  STATE.minuteData = {};
  STATE.actionsCount = 0;
  STATE.tasksCreated = 0;
  STATE.tasksMoved = 0;
  renderActivityPage();
  renderActivityFeed();
  showToast('🗑️ Activity log cleared', 'info');
}

// ─── Stats ─────────────────────────────────────────────────
function updateDashStats() {
  animateCount('stat-projects', STATE.projects.length);
  animateCount('stat-tasks', STATE.tasks.length);
  animateCount('stat-done', STATE.tasks.filter(t => t.status === 'done').length);
  animateCount('stat-overdue', STATE.tasks.filter(t => t.due && new Date(t.due) < new Date() && t.status !== 'done').length);
  animateCount('stat-members', STATE.users.length);

  // badge
  const openTasks = STATE.tasks.filter(t => t.status !== 'done').length;
  $('badge-tasks').textContent = openTasks;
}

function animateCount(id, target) {
  const el = $(id);
  if (!el) return;
  let val = 0;
  const step = Math.ceil(target / 30);
  const interval = setInterval(() => {
    val = Math.min(val + step, target);
    el.textContent = val;
    if (val >= target) clearInterval(interval);
  }, 30);
}

// ─── Projects ──────────────────────────────────────────────
function renderProjects() {
  const list = $('projectList');
  if (!list) return;
  const colors = { 'Website Redesign':'#7c3aed','Mobile App v2.0':'#06b6d4','API Integration':'#10b981','Data Analytics Dash':'#f59e0b','Cloud Migration':'#f43f5e' };
  list.innerHTML = STATE.projects.map(p => {
    const taskCount = STATE.tasks.filter(t => t.project === p.id).length;
    const doneCount = STATE.tasks.filter(t => t.project === p.id && t.status === 'done').length;
    const prog = taskCount > 0 ? Math.round((doneCount / taskCount) * 100) : p.progress;
    return `
      <div class="project-item">
        <div class="project-color" style="background:${p.color}"></div>
        <div class="project-info">
          <div class="project-name">${p.name}</div>
          <div class="project-meta-row">
            <span class="project-tasks-count">${taskCount} tasks · ${doneCount} done</span>
            <span class="project-tasks-count">Due: ${fmt(p.deadline)}</span>
          </div>
          <div class="progress-bar" style="margin-top:6px">
            <div class="progress-fill" style="width:${prog}%;background:${p.color}"></div>
          </div>
        </div>
        <span style="font-size:0.75rem;font-weight:700;color:var(--text-secondary)">${prog}%</span>
      </div>
    `;
  }).join('');
}

// ─── Task Board (Kanban) ───────────────────────────────────
const STATUS_LABELS = { todo:'todo', inprogress:'inprogress', review:'review', done:'done' };
let taskFilter = 'all';

function renderKanban(filter = 'all') {
  taskFilter = filter;
  const statuses = ['todo','inprogress','review','done'];
  statuses.forEach(st => {
    const container = $(`tasks-${st}`);
    const countEl   = $(`count-${st}`);
    if (!container) return;

    const filtered = STATE.tasks.filter(t =>
      t.status === st && (filter === 'all' || t.priority === filter)
    );
    countEl.textContent = filtered.length;

    container.innerHTML = filtered.map(task => {
      const assignee = getUserById(task.assignee);
      const project  = getProjectById(task.project);
      const isOver   = task.due && new Date(task.due) < new Date() && task.status !== 'done';
      return `
        <div class="task-card" draggable="true"
          id="task-card-${task.id}"
          ondragstart="dragStart(event,${task.id})"
          ondragend="dragEnd(event)"
        >
          ${project ? `<div style="display:flex;gap:6px;align-items:center;margin-bottom:8px"><div style="width:8px;height:8px;border-radius:50%;background:${project.color}"></div><span style="font-size:0.68rem;color:var(--text-muted)">${project.name}</span></div>` : ''}
          <div class="task-card-title">${task.title}</div>
          <div class="task-card-desc">${task.desc}</div>
          <div class="task-meta">
            <span class="priority-badge priority-${task.priority}">${task.priority}</span>
            ${task.due ? `<span class="due-date" style="${isOver ? 'color:var(--rose)' : ''}">📅 ${fmt(task.due)}</span>` : ''}
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-top:10px">
            ${assignee ? `<div class="assignee-stack">${avatarHTML(assignee)}</div>` : ''}
            <div style="display:flex;gap:6px;margin-left:auto">
              <button class="btn-icon" style="width:26px;height:26px;font-size:12px" onclick="event.stopPropagation();openViewTask(${task.id})" title="View details">👁️</button>
              <button class="btn-icon" style="width:26px;height:26px;font-size:12px" onclick="event.stopPropagation();openEditTaskModal(${task.id})" title="Edit task">✏️</button>
              <button class="btn-icon" style="width:26px;height:26px;font-size:12px;color:var(--rose)" onclick="event.stopPropagation();deleteTask(${task.id})" title="Delete">🗑️</button>
            </div>
          </div>
        </div>
      `;
    }).join('') || `<div style="text-align:center;padding:24px;color:var(--text-muted);font-size:0.8rem">No tasks</div>`;
  });

  renderTasksTable(filter);
}

function renderTasksTable(filter = 'all') {
  const tbody = $('tasksTableBody');
  if (!tbody) return;
  const filtered = STATE.tasks.filter(t => filter === 'all' || t.priority === filter);
  const statusColors = { todo:'#64748b', inprogress:'#f59e0b', review:'#6366f1', done:'#10b981' };
  const statusLabels = { todo:'To Do', inprogress:'In Progress', review:'Review', done:'Done' };
  tbody.innerHTML = filtered.map(t => {
    const u = getUserById(t.assignee);
    const p = getProjectById(t.project);
    const isOver = t.due && new Date(t.due) < new Date() && t.status !== 'done';
    return `<tr>
      <td><span style="font-weight:600">${t.title}</span></td>
      <td>${p ? `<span class="tag" style="background:${p.color}22;color:${p.color};border-color:${p.color}44">${p.name}</span>` : '—'}</td>
      <td>${u ? `<div style="display:flex;align-items:center;gap:8px">${avatarHTML(u)} <span>${u.name}</span></div>` : '—'}</td>
      <td><span class="priority-badge priority-${t.priority}">${t.priority}</span></td>
      <td><span style="background:${statusColors[t.status]}22;color:${statusColors[t.status]};border:1px solid ${statusColors[t.status]}44;border-radius:99px;padding:2px 10px;font-size:0.72rem;font-weight:700">${statusLabels[t.status]}</span></td>
      <td style="${isOver ? 'color:var(--rose);font-weight:600' : ''}">${t.due ? fmt(t.due) : '—'}</td>
      <td style="white-space:nowrap">
        <button class="btn btn-secondary btn-sm" onclick="openViewTask(${t.id})" style="padding:4px 8px" title="View">👁️ View</button>
        <button class="btn btn-primary btn-sm" onclick="openEditTaskModal(${t.id})" style="padding:4px 8px;margin:0 4px" title="Edit">✏️ Edit</button>
        <button class="btn btn-danger btn-sm" onclick="deleteTask(${t.id})" style="padding:4px 8px" title="Delete">🗑️</button>
      </td>
    </tr>`;
  }).join('') || `<tr><td colspan="7"><div class="empty-state"><div class="empty-icon">📭</div><p>No tasks found</p></div></td></tr>`;
}

function filterTasks(priority, btn) {
  document.querySelectorAll('#taskFilter .filter-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderKanban(priority);
}

// Drag & Drop
function dragStart(e, taskId) {
  STATE.draggedTaskId = taskId;
  e.dataTransfer.effectAllowed = 'move';
  setTimeout(() => {
    const el = $(`task-card-${taskId}`);
    if (el) el.style.opacity = '0.4';
  }, 0);
}
function dragEnd(e) {
  const el = $(`task-card-${STATE.draggedTaskId}`);
  if (el) el.style.opacity = '1';
}
function allowDrop(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
}
function dropTask(e, newStatus) {
  e.preventDefault();
  if (!STATE.draggedTaskId) return;
  const task = STATE.tasks.find(t => t.id === STATE.draggedTaskId);
  if (task && task.status !== newStatus) {
    const oldStatus = task.status;
    task.status = newStatus;
    STATE.tasksMoved++;
    saveState();
    logActivity(`Moved task <strong>"${task.title}"</strong> from ${oldStatus} → ${newStatus}`, 'task');
    renderKanban(taskFilter);
    updateDashStats();
    showToast(`✅ Task moved to ${newStatus}`, 'success');
  }
  STATE.draggedTaskId = null;
}

function deleteTask(id) {
  const task = STATE.tasks.find(t => t.id === id);
  if (!task) return;
  if (!confirm(`Delete task "${task.title}"? This cannot be undone.`)) return;
  STATE.tasks = STATE.tasks.filter(t => t.id !== id);
  saveState();
  logActivity(`Deleted task <strong>"${task.title}"</strong>`, 'task');
  renderKanban(taskFilter);
  updateDashStats();
  renderProjects();
  showToast('🗑️ Task deleted', 'info');
}

// ─── View Task Detail ──────────────────────────────────────
let _viewingTaskId = null;

function openViewTask(id) {
  const task = STATE.tasks.find(t => t.id === id);
  if (!task) return;
  _viewingTaskId = id;

  const assignee = getUserById(task.assignee);
  const project  = getProjectById(task.project);
  const isOver   = task.due && new Date(task.due) < new Date() && task.status !== 'done';
  const statusColors = { todo:'#64748b', inprogress:'#f59e0b', review:'#6366f1', done:'#10b981' };
  const statusLabels = { todo:'To Do', inprogress:'In Progress', review:'Review', done:'Done' };

  $('viewTaskTitle').textContent = task.title;
  $('viewTaskBody').innerHTML = `
    <div style="display:flex;flex-direction:column;gap:14px">
      <!-- Status + Priority row -->
      <div style="display:flex;gap:10px;flex-wrap:wrap">
        <span class="priority-badge priority-${task.priority}" style="font-size:0.8rem;padding:4px 12px">${task.priority} priority</span>
        <span style="background:${statusColors[task.status]}22;color:${statusColors[task.status]};border:1px solid ${statusColors[task.status]}44;border-radius:99px;padding:4px 14px;font-size:0.8rem;font-weight:700">${statusLabels[task.status]}</span>
        ${isOver ? '<span class="tag tag-rose" style="font-size:0.8rem">⚠️ Overdue</span>' : ''}
      </div>

      <!-- Description -->
      <div style="background:var(--bg-input);border:1px solid var(--border);border-radius:var(--radius-md);padding:14px">
        <div style="font-size:0.72rem;color:var(--text-muted);font-weight:700;letter-spacing:0.5px;text-transform:uppercase;margin-bottom:6px">Description</div>
        <div style="font-size:0.875rem;color:var(--text-secondary);line-height:1.6">${task.desc || 'No description provided.'}</div>
      </div>

      <!-- Meta grid -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
        <div style="background:var(--bg-input);border:1px solid var(--border);border-radius:var(--radius-md);padding:12px">
          <div style="font-size:0.7rem;color:var(--text-muted);font-weight:700;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:6px">Project</div>
          ${project ? `<div style="display:flex;align-items:center;gap:8px"><div style="width:10px;height:10px;border-radius:50%;background:${project.color}"></div><span style="font-weight:600;font-size:0.85rem">${project.name}</span></div>` : '<span style="color:var(--text-muted)">—</span>'}
        </div>
        <div style="background:var(--bg-input);border:1px solid var(--border);border-radius:var(--radius-md);padding:12px">
          <div style="font-size:0.7rem;color:var(--text-muted);font-weight:700;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:6px">Assignee</div>
          ${assignee ? `<div style="display:flex;align-items:center;gap:8px">${avatarHTML(assignee)}<span style="font-weight:600;font-size:0.85rem">${assignee.name}</span></div>` : '<span style="color:var(--text-muted)">Unassigned</span>'}
        </div>
        <div style="background:var(--bg-input);border:1px solid var(--border);border-radius:var(--radius-md);padding:12px">
          <div style="font-size:0.7rem;color:var(--text-muted);font-weight:700;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:6px">Due Date</div>
          <div style="font-weight:600;font-size:0.85rem;color:${isOver ? 'var(--rose)' : 'var(--text-primary)'}">${task.due ? fmt(task.due) : 'No due date'}</div>
        </div>
        <div style="background:var(--bg-input);border:1px solid var(--border);border-radius:var(--radius-md);padding:12px">
          <div style="font-size:0.7rem;color:var(--text-muted);font-weight:700;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:6px">Task ID</div>
          <div style="font-weight:600;font-size:0.85rem;color:var(--accent-light)">#${task.id}</div>
        </div>
      </div>
    </div>
  `;
  openModal('viewTaskModal');
  logActivity(`Viewed task <strong>"${task.title}"</strong>`, 'task');
}

function switchToEdit() {
  closeModal('viewTaskModal');
  if (_viewingTaskId) openEditTaskModal(_viewingTaskId);
}

// ─── Edit Task ─────────────────────────────────────────────
function openEditTaskModal(id) {
  const task = STATE.tasks.find(t => t.id === id);
  if (!task) return;

  // Populate dropdowns
  $('editTaskProject').innerHTML  = STATE.projects.map(p => `<option value="${p.id}" ${p.id===task.project?'selected':''}>${p.name}</option>`).join('');
  $('editTaskAssignee').innerHTML = STATE.users.map(u => `<option value="${u.id}" ${u.id===task.assignee?'selected':''}>${u.name}</option>`).join('');

  // Fill fields
  $('editTaskId').value       = task.id;
  $('editTaskTitle').value    = task.title;
  $('editTaskDesc').value     = task.desc;
  $('editTaskPriority').value = task.priority;
  $('editTaskStatus').value   = task.status;
  $('editTaskDue').value      = task.due || '';

  openModal('editTaskModal');
  logActivity(`Opened edit for <strong>"${task.title}"</strong>`, 'task');
}

function submitEditTask() {
  const id    = parseInt($('editTaskId').value);
  const title = $('editTaskTitle').value.trim();
  if (!title) { showToast('⚠️ Task title is required', 'warn'); return; }

  const task = STATE.tasks.find(t => t.id === id);
  if (!task) return;

  const oldTitle  = task.title;
  const oldStatus = task.status;

  task.title    = title;
  task.desc     = $('editTaskDesc').value.trim() || 'No description';
  task.priority = $('editTaskPriority').value;
  task.status   = $('editTaskStatus').value;
  task.project  = parseInt($('editTaskProject').value);
  task.assignee = parseInt($('editTaskAssignee').value);
  task.due      = $('editTaskDue').value;

  if (oldStatus !== task.status) STATE.tasksMoved++;

  saveState();
  logActivity(`Updated task <strong>"${title}"</strong>${oldStatus !== task.status ? ` — moved to <em>${task.status}</em>` : ''}`, 'task');
  renderKanban(taskFilter);
  updateDashStats();
  renderProjects();
  closeModal('editTaskModal');
  showToast('✅ Task updated!', 'success');
}

function deleteTaskFromModal() {
  const id = parseInt($('editTaskId').value);
  const task = STATE.tasks.find(t => t.id === id);
  if (!task) return;
  if (!confirm(`Delete "${task.title}"? This cannot be undone.`)) return;
  STATE.tasks = STATE.tasks.filter(t => t.id !== id);
  saveState();
  logActivity(`Deleted task <strong>"${task.title}"</strong>`, 'task');
  renderKanban(taskFilter);
  updateDashStats();
  renderProjects();
  closeModal('editTaskModal');
  showToast('🗑️ Task deleted', 'info');
}

// ─── Modal Helpers ─────────────────────────────────────────
function openModal(id) { $(id).classList.add('open'); }
function closeModal(id) { $(id).classList.remove('open'); }

function openAddTaskModal() {
  // Populate dropdowns
  const projSel = $('taskProject');
  projSel.innerHTML = STATE.projects.map(p => `<option value="${p.id}">${p.name}</option>`).join('');
  const userSel = $('taskAssignee');
  userSel.innerHTML = STATE.users.map(u => `<option value="${u.id}">${u.name}</option>`).join('');
  // Default due date to tomorrow
  const tom = new Date(); tom.setDate(tom.getDate() + 1);
  $('taskDue').value = tom.toISOString().split('T')[0];
  openModal('addTaskModal');
}

function submitTask() {
  const title = $('taskTitle').value.trim();
  if (!title) { showToast('⚠️ Task title is required', 'warn'); return; }
  const task = {
    id: STATE.nextTaskId++,
    title,
    desc: $('taskDesc').value.trim() || 'No description',
    priority: $('taskPriority').value,
    status: 'todo',
    project: parseInt($('taskProject').value),
    assignee: parseInt($('taskAssignee').value),
    due: $('taskDue').value,
  };
  STATE.tasks.push(task);
  STATE.tasksCreated++;
  saveState();
  logActivity(`Created task <strong>"${task.title}"</strong>`, 'task');
  renderKanban(taskFilter);
  updateDashStats();
  renderProjects();
  closeModal('addTaskModal');
  $('taskTitle').value = ''; $('taskDesc').value = '';
  showToast('✅ Task created!', 'success');
}

function openAddUserModal() { openModal('addUserModal'); }
function submitUser() {
  const name = $('newUserName').value.trim();
  if (!name) { showToast('⚠️ Name is required', 'warn'); return; }
  const colors = ['#7c3aed','#06b6d4','#10b981','#f59e0b','#f43f5e','#6366f1','#ec4899'];
  const user = {
    id: STATE.nextUserId++,
    name,
    role: $('newUserRole').value,
    dept: $('newUserDept').value || 'General',
    email: $('newUserEmail').value,
    status: 'online',
    avatar: name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase(),
    tasks: 0, projects: 0,
    color: colors[Math.floor(Math.random() * colors.length)],
    isAdmin: false,
  };
  STATE.users.push(user);
  saveState();
  logActivity(`Added team member <strong>${user.name}</strong>`, 'user');
  renderUsers();
  updateDashStats();
  closeModal('addUserModal');
  $('newUserName').value = ''; $('newUserEmail').value = '';
  showToast(`👤 ${user.name} added to team!`, 'success');
}

function openAddEventModal() {
  const today = new Date().toISOString().split('T')[0];
  $('eventDate').value = today;
  openModal('addEventModal');
}
function submitEvent() {
  const title = $('eventTitle').value.trim();
  if (!title) { showToast('⚠️ Event title required', 'warn'); return; }
  const event = {
    id: STATE.nextEventId++,
    title,
    date: $('eventDate').value,
    type: $('eventType').value,
  };
  STATE.events.push(event);
  saveState();
  logActivity(`Added event <strong>"${event.title}"</strong> on ${fmt(event.date)}`, 'calendar');
  renderCalendar();
  closeModal('addEventModal');
  $('eventTitle').value = '';
  showToast('📅 Event added!', 'success');
}

function openAddProjectModal() { openModal('addProjectModal'); }
function submitProject() {
  const name = $('projectName').value.trim();
  if (!name) { showToast('⚠️ Project name required', 'warn'); return; }
  const proj = {
    id: STATE.nextProjectId++,
    name,
    color: $('projectColor').value,
    deadline: $('projectDeadline').value || new Date(Date.now() + 30*86400000).toISOString().split('T')[0],
    progress: 0,
  };
  STATE.projects.push(proj);
  saveState();
  logActivity(`Created project <strong>"${proj.name}"</strong>`, 'task');
  renderProjects();
  updateDashStats();
  closeModal('addProjectModal');
  $('projectName').value = '';
  showToast('📁 Project created!', 'success');
}

function openSettings() {
  showToast('⚙️ Settings panel coming soon!', 'info');
  logActivity('Opened <strong>Settings</strong>');
}

// ─── Calendar ──────────────────────────────────────────────
function renderCalendar() {
  const grid = $('calendarGrid');
  if (!grid) return;

  const year  = STATE.calendarDate.getFullYear();
  const month = STATE.calendarDate.getMonth();
  const today = new Date();

  const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  $('calendarMonth').textContent = `${monthNames[month]} ${year}`;

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();
  const prevLast = new Date(year, month, 0).getDate();

  const dayHeaders = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  let html = dayHeaders.map(d => `<div class="cal-header">${d}</div>`).join('');

  // Prev month trailing days
  for (let i = firstDay - 1; i >= 0; i--) {
    html += `<div class="cal-day other-month"><div class="day-num">${prevLast - i}</div></div>`;
  }

  // Current month days
  for (let d = 1; d <= lastDate; d++) {
    const dateStr = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const isToday = today.getDate()===d && today.getMonth()===month && today.getFullYear()===year;
    const dayEvents = STATE.events.filter(e => e.date === dateStr);
    const hasTasks  = STATE.tasks.some(t => t.due === dateStr);
    const hasEvent  = dayEvents.length > 0 || hasTasks;
    const evClass   = dayEvents.length ? `<div class="cal-event-dot">${dayEvents[0].title}</div>` : '';
    const taskDot   = hasTasks && !dayEvents.length ? `<div class="cal-event-dot" style="background:var(--cyan)">Task Due</div>` : '';
    html += `
      <div class="cal-day${isToday?' today':''}${hasEvent?' has-event':''}" onclick="selectDate('${dateStr}')">
        <div class="day-num">${d}</div>
        ${evClass}${taskDot}
      </div>`;
  }

  // Next month leading days
  const totalCells = Math.ceil((firstDay + lastDate) / 7) * 7;
  let nextD = 1;
  for (let i = firstDay + lastDate; i < totalCells; i++) {
    html += `<div class="cal-day other-month"><div class="day-num">${nextD++}</div></div>`;
  }

  grid.innerHTML = html;
  renderUpcomingDeadlines();
  if (!STATE.selectedDate) selectDate(today.toISOString().split('T')[0]);
}

function changeMonth(dir) {
  STATE.calendarDate = new Date(STATE.calendarDate.getFullYear(), STATE.calendarDate.getMonth() + dir, 1);
  renderCalendar();
}

function selectDate(dateStr) {
  STATE.selectedDate = dateStr;
  $('selectedDateTitle').textContent = `📅 ${fmt(dateStr)}`;
  const eventsEl = $('dayEventsList');
  const dayEvents = STATE.events.filter(e => e.date === dateStr);
  const dayTasks  = STATE.tasks.filter(t => t.due === dateStr);
  const typeColors = { Meeting:'#6366f1', Deadline:'#f43f5e', Review:'#f59e0b', Release:'#10b981' };

  let html = '';
  dayEvents.forEach(ev => {
    html += `<div class="project-item" style="padding:10px 14px">
      <div class="project-color" style="background:${typeColors[ev.type] || '#7c3aed'};height:30px"></div>
      <div><div style="font-weight:700;font-size:0.875rem">${ev.title}</div><div style="font-size:0.72rem;color:var(--text-muted)">${ev.type}</div></div>
    </div>`;
  });
  dayTasks.forEach(t => {
    html += `<div class="project-item" style="padding:10px 14px">
      <div class="project-color" style="background:var(--cyan);height:30px"></div>
      <div><div style="font-weight:700;font-size:0.875rem">${t.title}</div><div style="font-size:0.72rem;color:var(--text-muted)">Task Due · <span class="priority-badge priority-${t.priority}">${t.priority}</span></div></div>
    </div>`;
  });
  eventsEl.innerHTML = html || `<div class="empty-state" style="padding:20px"><div class="empty-icon" style="font-size:2rem">📭</div><p>No events on this day</p></div>`;
}

function renderUpcomingDeadlines() {
  const el = $('upcomingDeadlines');
  if (!el) return;
  const now = new Date();
  const soon = STATE.tasks
    .filter(t => t.due && t.status !== 'done')
    .sort((a,b) => new Date(a.due) - new Date(b.due))
    .slice(0, 5);
  el.innerHTML = soon.map(t => {
    const daysLeft = Math.ceil((new Date(t.due) - now) / 86400000);
    const col = daysLeft < 0 ? 'var(--rose)' : daysLeft < 3 ? 'var(--amber)' : 'var(--text-secondary)';
    return `<div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid var(--border)">
      <div>
        <div style="font-size:0.83rem;font-weight:600">${t.title}</div>
        <span class="priority-badge priority-${t.priority}">${t.priority}</span>
      </div>
      <div style="font-size:0.75rem;font-weight:700;color:${col};text-align:right">
        ${daysLeft < 0 ? `${Math.abs(daysLeft)}d overdue` : daysLeft === 0 ? 'Today' : `${daysLeft}d left`}
      </div>
    </div>`;
  }).join('') || '<div class="empty-state" style="padding:20px"><p>No upcoming deadlines 🎉</p></div>';
}

// ─── Analytics Charts ──────────────────────────────────────
function initCharts() {
  if (!window.Chart) return;

  const chartDefaults = {
    color: '#8b9cc8',
    borderColor: 'rgba(255,255,255,0.05)',
    backgroundColor: 'rgba(255,255,255,0)',
  };
  Chart.defaults.color = chartDefaults.color;

  const isDark = STATE.theme === 'dark';
  const gridColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';

  destroyCharts();

  // Bar Chart
  const barCtx = $('barChart');
  if (barCtx) {
    STATE.charts.bar = new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
        datasets: [
          {
            label: 'Completed',
            data: [4, 7, 5, 9, 6, 3, 8],
            backgroundColor: 'rgba(124,58,237,0.7)',
            borderRadius: 6,
          },
          {
            label: 'Created',
            data: [6, 5, 7, 4, 8, 2, 5],
            backgroundColor: 'rgba(6,182,212,0.5)',
            borderRadius: 6,
          }
        ]
      },
      options: {
        responsive: true,
        plugins: { legend: { labels: { color: '#8b9cc8' } } },
        scales: {
          x: { grid: { color: gridColor }, ticks: { color: '#8b9cc8' } },
          y: { grid: { color: gridColor }, ticks: { color: '#8b9cc8' } }
        }
      }
    });
  }

  // Doughnut Chart
  const doughCtx = $('doughnutChart');
  if (doughCtx) {
    const statuses = { todo:0, inprogress:0, review:0, done:0 };
    STATE.tasks.forEach(t => statuses[t.status]++);
    STATE.charts.doughnut = new Chart(doughCtx, {
      type: 'doughnut',
      data: {
        labels: ['To Do','In Progress','Review','Done'],
        datasets: [{
          data: [statuses.todo, statuses.inprogress, statuses.review, statuses.done],
          backgroundColor: ['rgba(100,116,139,0.8)','rgba(245,158,11,0.8)','rgba(99,102,241,0.8)','rgba(16,185,129,0.8)'],
          borderWidth: 0,
          hoverOffset: 8,
        }]
      },
      options: {
        responsive: true,
        cutout: '65%',
        plugins: {
          legend: { position: 'bottom', labels: { color: '#8b9cc8', padding: 16 } }
        }
      }
    });
  }

  // Line / Burndown Chart
  const lineCtx = $('lineChart');
  if (lineCtx) {
    STATE.charts.line = new Chart(lineCtx, {
      type: 'line',
      data: {
        labels: ['Wk 1','Wk 2','Wk 3','Wk 4'],
        datasets: [
          {
            label: 'Ideal',
            data: [30,20,10,0],
            borderColor: 'rgba(99,102,241,0.6)',
            borderDash: [6,3],
            tension: 0,
            pointRadius: 0,
            fill: false,
          },
          {
            label: 'Actual',
            data: [30,22,14,5],
            borderColor: '#7c3aed',
            backgroundColor: 'rgba(124,58,237,0.1)',
            tension: 0.3,
            fill: true,
            pointBackgroundColor: '#7c3aed',
            pointRadius: 5,
          }
        ]
      },
      options: {
        responsive: true,
        plugins: { legend: { labels: { color: '#8b9cc8' } } },
        scales: {
          x: { grid: { color: gridColor }, ticks: { color: '#8b9cc8' } },
          y: { grid: { color: gridColor }, ticks: { color: '#8b9cc8' } }
        }
      }
    });
  }

  // Member Productivity Bar Chart
  const memberCtx = $('memberChart');
  if (memberCtx) {
    STATE.charts.member = new Chart(memberCtx, {
      type: 'bar',
      data: {
        labels: STATE.users.slice(0,5).map(u => u.name.split(' ')[0]),
        datasets: [{
          label: 'Tasks Completed',
          data: [12, 9, 7, 11, 5],
          backgroundColor: STATE.users.slice(0,5).map(u => u.color + 'cc'),
          borderRadius: 6,
        }]
      },
      options: {
        responsive: true,
        indexAxis: 'y',
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { color: gridColor }, ticks: { color: '#8b9cc8' } },
          y: { grid: { color: gridColor }, ticks: { color: '#8b9cc8' } }
        }
      }
    });
  }
}

function destroyCharts() {
  Object.values(STATE.charts).forEach(c => { try { c.destroy(); } catch(e){} });
  STATE.charts = {};
}

function setAnalyticsPeriod(period, btn) {
  document.querySelectorAll('#page-analytics .filter-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  STATE.analyticsPeriod = period;
  logActivity(`Viewed analytics for <strong>${period}</strong>`);
  destroyCharts();
  setTimeout(initCharts, 50);
}

// ─── Users ─────────────────────────────────────────────────
function renderUsers() {
  const grid = $('usersGrid');
  if (!grid) return;

  grid.innerHTML = STATE.users.map(u => {
    const taskCount = STATE.tasks.filter(t => t.assignee === u.id && t.status !== 'done').length;
    const doneCount = STATE.tasks.filter(t => t.assignee === u.id && t.status === 'done').length;
    return `
      <div class="user-card">
        <div class="user-card-avatar">
          <div class="avatar xl" style="background:linear-gradient(135deg,${u.color},${u.color}99)">${u.avatar}</div>
          <div class="online-dot ${u.status}"></div>
        </div>
        <div class="user-card-name">${u.name}</div>
        <div class="user-card-role">${u.role}</div>
        <div style="margin-bottom:10px">
          ${u.isAdmin ? '<span class="tag tag-purple">👑 Admin</span>' : ''}
          <span class="tag tag-cyan" style="margin-left:4px">${u.dept}</span>
        </div>
        <div class="user-card-stats">
          <div class="user-stat"><div class="user-stat-val">${taskCount}</div><div class="user-stat-lbl">Active</div></div>
          <div class="user-stat"><div class="user-stat-val">${doneCount}</div><div class="user-stat-lbl">Done</div></div>
          <div class="user-stat"><div class="user-stat-val">${u.projects}</div><div class="user-stat-lbl">Projects</div></div>
        </div>
        <div style="display:flex;gap:8px;justify-content:center">
          <button class="btn btn-secondary btn-sm" onclick="showToast('📧 Email sent to ${u.name}','success')">✉️ Message</button>
          ${!u.isAdmin ? `<button class="btn btn-danger btn-sm" onclick="removeUser(${u.id})">Remove</button>` : ''}
        </div>
      </div>
    `;
  }).join('');

  // Update status counts
  $('count-online').textContent  = STATE.users.filter(u => u.status === 'online').length;
  $('count-away').textContent    = STATE.users.filter(u => u.status === 'away').length;
  $('count-offline').textContent = STATE.users.filter(u => u.status === 'offline').length;
  $('count-admins').textContent  = STATE.users.filter(u => u.isAdmin).length;
}

function removeUser(id) {
  const user = getUserById(id);
  if (!user) return;
  STATE.users = STATE.users.filter(u => u.id !== id);
  saveState();
  logActivity(`Removed user <strong>${user.name}</strong>`, 'user');
  renderUsers();
  updateDashStats();
  showToast(`🗑️ ${user.name} removed`, 'info');
}

// ─── Search ────────────────────────────────────────────────
function handleSearch(q) {
  if (!q.trim()) return;
  const results = STATE.tasks.filter(t => t.title.toLowerCase().includes(q.toLowerCase()));
  if (results.length) {
    navigate('tasks');
    showToast(`🔍 Found ${results.length} task(s) matching "${q}"`, 'info');
  }
}

// ─── Toast ─────────────────────────────────────────────────
function showToast(message, type = 'info') {
  const container = $('toastContainer');
  const colors = { success:'var(--emerald)', info:'var(--cyan)', warn:'var(--amber)', error:'var(--rose)' };
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.style.borderLeftColor = colors[type] || colors.info;
  toast.innerHTML = `<span class="toast-message">${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(30px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ─── Periodic Activity Simulator ───────────────────────────
const ACTIVITY_TEMPLATES = [
  () => `<strong>${STATE.users[Math.floor(Math.random()*STATE.users.length)].name}</strong> updated a task`,
  () => `<strong>${STATE.users[Math.floor(Math.random()*STATE.users.length)].name}</strong> commented on <strong>"${STATE.tasks[Math.floor(Math.random()*STATE.tasks.length)].title}"</strong>`,
  () => `<strong>${STATE.projects[Math.floor(Math.random()*STATE.projects.length)].name}</strong> progress updated`,
  () => `New notification: <strong>Sprint ${Math.floor(Math.random()*10)+1}</strong> started`,
  () => `<strong>${STATE.users[Math.floor(Math.random()*STATE.users.length)].name}</strong> logged ${Math.floor(Math.random()*4)+1}h on task`,
];

function simulateActivity() {
  const fn = ACTIVITY_TEMPLATES[Math.floor(Math.random() * ACTIVITY_TEMPLATES.length)];
  logActivity(fn());
}

// ─── Close modals on overlay click ─────────────────────────
document.addEventListener('click', e => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('open');
  }
});

// ─── Keyboard shortcuts ────────────────────────────────────
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('open'));
  }
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    $('globalSearch').focus();
  }
});

// ─── Boot ──────────────────────────────────────────────────
function init() {
  // ── Restore persisted data ──
  const restored = loadState();

  // Apply saved theme immediately
  document.documentElement.setAttribute('data-theme', STATE.theme);
  $('themeBtn').textContent = STATE.theme === 'dark' ? '🌙' : '☀️';

  startClock();
  updateDashStats();
  renderProjects();
  renderKanban();
  renderCalendar();
  renderMinuteGrid();
  renderActivityFeed();
  updateSessionSummary();

  // Initial activity logs
  logActivity('Session started — <strong>ProFlow</strong> loaded');
  if (restored) {
    logActivity(`✅ Data restored from <strong>local storage</strong> — ${STATE.tasks.length} tasks, ${STATE.projects.length} projects, ${STATE.users.length} members`);
  } else {
    logActivity(`Loaded <strong>${STATE.tasks.length} tasks</strong> across <strong>${STATE.projects.length} projects</strong>`);
  }

  // Simulate periodic activity every 25s
  setInterval(simulateActivity, 25000);

  // Update minute grid every 30s
  setInterval(renderMinuteGrid, 30000);

  // Show welcome toast
  const msg = restored
    ? `💾 Data restored! ${STATE.tasks.length} tasks loaded.`
    : '👋 Welcome back, Abhay! ProFlow is ready.';
  setTimeout(() => showToast(msg, 'success'), 500);

  // Populate session start
  $('sessionStart').textContent = fmtTimeShort(STATE.sessionStart);
}

// Wait for Chart.js to load
window.addEventListener('load', init);

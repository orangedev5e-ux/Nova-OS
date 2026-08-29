// ==========================================================================
// 1. DOM ELEMENTS & STATE
// ==========================================================================
// Navigation & Views
const navItems = document.querySelectorAll('.nav-item');
const viewPanels = document.querySelectorAll('.view-panel');
const workspaceTitle = document.getElementById('workspace-title');
const workspaceSubtitle = document.getElementById('workspace-subtitle');
const appSidebar = document.getElementById('app-sidebar');
const sidebarBackdrop = document.getElementById('sidebar-backdrop');
const hamburgerBtn = document.getElementById('hamburger-btn');
const closeSidebarBtn = document.getElementById('close-sidebar-btn');
const quickThemeBtn = document.getElementById('quick-theme-btn');
const liveClock = document.getElementById('live-clock');
const currentDateBadge = document.getElementById('current-date-badge');

// Overview Metrics
const heroGreeting = document.getElementById('hero-greeting');
const heroSubtext = document.getElementById('hero-subtext');
const progressPercent = document.getElementById('progress-percent');
const progressFill = document.getElementById('progress-fill');
const statTotalTasks = document.getElementById('stat-total-tasks');
const statHighPriority = document.getElementById('stat-high-priority');
const statDoneTasks = document.getElementById('stat-done-tasks');
const statTotalDocs = document.getElementById('stat-total-docs');
const overviewTaskItems = document.getElementById('overview-task-items');
const tasksBadge = document.getElementById('tasks-badge');
const docsBadge = document.getElementById('docs-badge');

// Quick Jump Buttons
const btnJumpTasks = document.getElementById('btn-jump-tasks');
const btnJumpCal = document.getElementById('btn-jump-cal');
const btnJumpDocs = document.getElementById('btn-jump-docs');
const btnJumpChat = document.getElementById('btn-jump-chat');
const btnViewAllTasks = document.getElementById('btn-view-all-tasks');

// Task Manager Elements
const btnAddTask = document.getElementById('btn-add-task');
const taskCreatePanel = document.getElementById('task-create-panel');
const cancelTaskBtn = document.getElementById('cancel-task-btn');
const newTaskForm = document.getElementById('new-task-form');
const colTodo = document.getElementById('col-todo');
const colInprog = document.getElementById('col-inprogress');
const colDone = document.getElementById('col-done');
const todoCount = document.getElementById('todo-count');
const progCount = document.getElementById('prog-count');
const doneCount = document.getElementById('done-count');
const taskDateInput = document.getElementById('task-date-input');

// Calendar Elements
const calendarMonthYear = document.getElementById('calendar-month-year');
const calendarDaysGrid = document.getElementById('calendar-days-grid');
const calPrevBtn = document.getElementById('cal-prev-btn');
const calNextBtn = document.getElementById('cal-next-btn');
const calTodayBtn = document.getElementById('cal-today-btn');
const calSelectedDateTitle = document.getElementById('cal-selected-date-title');
const calSelectedDayBadge = document.getElementById('cal-selected-day-badge');
const calDayTasksList = document.getElementById('cal-day-tasks-list');
const calQuickAddTaskBtn = document.getElementById('cal-quick-add-task-btn');

// Document Studio Elements
const btnAddDoc = document.getElementById('btn-add-doc');
const docUploadPanel = document.getElementById('doc-upload-panel');
const cancelDocBtn = document.getElementById('cancel-doc-btn');
const newDocForm = document.getElementById('new-doc-form');
const docsListContainer = document.getElementById('docs-list-container');
const docsEmptyState = document.getElementById('docs-empty-state');
const docModal = document.getElementById('doc-modal');
const closeDocModalBtn = document.getElementById('close-doc-modal-btn');
const modalDocTitle = document.getElementById('modal-doc-title');
const modalDocTag = document.getElementById('modal-doc-tag');
const modalDocContent = document.getElementById('modal-doc-content');
const modalDocMeta = document.getElementById('modal-doc-meta');
const modalDeleteDocBtn = document.getElementById('modal-delete-doc-btn');

// Chat Elements
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const chatMessagesBox = document.getElementById('chat-messages-box');
const clearChatBtn = document.getElementById('clear-chat-btn');
const promptChips = document.querySelectorAll('.chip-btn');

// Auth & Modals
const authModal = document.getElementById('auth-modal');
const openAuthBtn = document.getElementById('open-auth-btn');
const headerAuthBtn = document.getElementById('header-auth-btn');
const closeAuthBtn = document.getElementById('close-auth-btn');
const tabSignUp = document.getElementById('tab-signup');
const tabLogIn = document.getElementById('tab-login');
const formTitle = document.getElementById('form-title');
const formSubtitle = document.getElementById('form-subtitle');
const nameGroup = document.getElementById('name-group');
const nameInput = document.getElementById('name-input');
const emailLabel = document.getElementById('email-label');
const emailInput = document.getElementById('email-input');
const passwordInput = document.getElementById('password-input');
const submitBtn = document.getElementById('submit-btn');
const btnText = document.getElementById('btn-text');
const alertBox = document.getElementById('alert-box');
const togglePrompt = document.getElementById('toggle-prompt');
const accountBtn = document.getElementById('account-btn');
const sidebarAvatar = document.getElementById('sidebar-avatar');
const sidebarUsername = document.getElementById('sidebar-username');
const sidebarRole = document.getElementById('sidebar-role');
const currentUserStatus = document.getElementById('current-user-status');
const accountModal = document.getElementById('account-modal');
const closeAccountBtn = document.getElementById('close-account-btn');
const modalAvatar = document.getElementById('modal-avatar');
const modalUsername = document.getElementById('modal-username');
const modalEmail = document.getElementById('modal-email');
const modalLogoutBtn = document.getElementById('modal-logout-btn');
const deleteAccountBtn = document.getElementById('delete-account-btn');
const verifyTokenBtn = document.getElementById('verify-token-btn');
const modalApiBox = document.getElementById('modal-api-box');
const settingsBtn = document.getElementById('settings-btn');
const settingsModal = document.getElementById('settings-modal');
const closeSettingsBtn = document.getElementById('close-settings-btn');
const saveSettingsBtn = document.getElementById('save-settings-btn');
const themeButtons = document.querySelectorAll('.theme-btn');
const fontSizeSelect = document.getElementById('font-size-select');

// App State
let currentMode = 'signup';
let currentUser = null;
let userTasks = JSON.parse(localStorage.getItem('nova_tasks')) || [];
let userDocs = JSON.parse(localStorage.getItem('nova_docs')) || [];
let currentCalMonth = new Date().getMonth();
let currentCalYear = new Date().getFullYear();
let selectedCalDateString = new Date().toISOString().split('T')[0];
let activeViewingDocId = null;

// ==========================================================================
// 2. LIVE CLOCK & DATE ENGINE
// ==========================================================================
function updateClock() {
    const now = new Date();
    liveClock.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}
setInterval(updateClock, 1000);
updateClock();

function updateDateBadge() {
    const now = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
    currentDateBadge.textContent = now.toLocaleDateString('en-US', options);
    if (taskDateInput) taskDateInput.value = now.toISOString().split('T')[0];
}
updateDateBadge();

// ==========================================================================
// 3. THEME & SETTINGS MANAGER
// ==========================================================================
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('nova_theme', theme);
    quickThemeBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
    themeButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.themeVal === theme);
    });
}

function applyFontSize(size) {
    document.documentElement.setAttribute('data-font', size);
    localStorage.setItem('nova_font', size);
    fontSizeSelect.value = size;
}

const savedTheme = localStorage.getItem('nova_theme') || 'dark';
const savedFont = localStorage.getItem('nova_font') || 'normal';
applyTheme(savedTheme);
applyFontSize(savedFont);

// ==========================================================================
// 4. NAVIGATION & VIEW SWITCHER
// ==========================================================================
const viewSubtitles = {
    'dashboard': 'Your personal productivity and planning dashboard.',
    'tasks': 'Create, prioritize, schedule, and track your tasks.',
    'calendar': 'Monthly overview of your scheduled deadlines and tasks.',
    'documents': 'Private vault for technical notes, geological drafts, and ideas.',
    'chat': 'Personal AI assistant ready for queries and research drafts.'
};

function switchView(viewName) {
    navItems.forEach(item => {
        item.classList.toggle('active', item.dataset.view === viewName);
    });

    viewPanels.forEach(panel => {
        panel.classList.toggle('active', panel.id === `view-${viewName}`);
    });

    const activeItem = document.querySelector(`.nav-item[data-view="${viewName}"] span:nth-child(2)`);
    if (activeItem) {
        workspaceTitle.textContent = activeItem.textContent;
        workspaceSubtitle.textContent = viewSubtitles[viewName] || 'Personal Workspace';
    }

    if (viewName === 'calendar') {
        renderCalendar();
    }

    closeMobileSidebar();
}

navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        switchView(item.dataset.view);
    });
});

if (btnJumpTasks) btnJumpTasks.addEventListener('click', () => switchView('tasks'));
if (btnJumpCal) btnJumpCal.addEventListener('click', () => switchView('calendar'));
if (btnJumpDocs) btnJumpDocs.addEventListener('click', () => switchView('documents'));
if (btnJumpChat) btnJumpChat.addEventListener('click', () => switchView('chat'));
if (btnViewAllTasks) btnViewAllTasks.addEventListener('click', () => switchView('tasks'));

// Mobile Sidebar
function openMobileSidebar() {
    appSidebar.classList.add('open');
    sidebarBackdrop.classList.add('active');
}
function closeMobileSidebar() {
    appSidebar.classList.remove('open');
    sidebarBackdrop.classList.remove('active');
}
hamburgerBtn.addEventListener('click', () => {
    if (appSidebar.classList.contains('open')) {
        closeMobileSidebar();
    } else {
        openMobileSidebar();
    }
});
closeSidebarBtn.addEventListener('click', closeMobileSidebar);
sidebarBackdrop.addEventListener('click', closeMobileSidebar);
quickThemeBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    applyTheme(current === 'dark' ? 'light' : 'dark');
});

// ==========================================================================
// 5. TASK ENGINE (CREATE, MOVE, COMPLETE, DELETE)
// ==========================================================================
btnAddTask.addEventListener('click', () => {
    taskCreatePanel.style.display = taskCreatePanel.style.display === 'none' ? 'block' : 'none';
});

cancelTaskBtn.addEventListener('click', () => {
    taskCreatePanel.style.display = 'none';
});

function saveTasks() {
    localStorage.setItem('nova_tasks', JSON.stringify(userTasks));
    renderTasks();
    updateOverviewMetrics();
    renderCalendar();
    renderSelectedDayTasks();
}

newTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('task-title-input').value.trim();
    const priority = document.getElementById('task-priority-select').value;
    const dueDate = document.getElementById('task-date-input').value;
    const category = document.getElementById('task-category-select').value;
    const notes = document.getElementById('task-notes-input').value.trim();

    const newTask = {
        id: Date.now().toString(),
        title,
        priority,
        dueDate,
        category,
        notes,
        status: 'todo',
        createdAt: new Date().toISOString()
    };

    userTasks.unshift(newTask);
    saveTasks();

    newTaskForm.reset();
    updateDateBadge();
    taskCreatePanel.style.display = 'none';
});

window.deleteTask = function(taskId) {
    if (confirm("Delete this task?")) {
        userTasks = userTasks.filter(t => t.id !== taskId);
        saveTasks();
    }
};

window.moveTaskStatus = function(taskId, newStatus) {
    const task = userTasks.find(t => t.id === taskId);
    if (task) {
        task.status = newStatus;
        saveTasks();
    }
};

function renderTasks() {
    colTodo.innerHTML = '';
    colInprog.innerHTML = '';
    colDone.innerHTML = '';

    userTasks.forEach(task => {
        const tagClass = task.priority === 'High' ? 'high' : task.priority === 'Medium' ? 'medium' : 'low';
        const isDone = task.status === 'done';

        const card = document.createElement('div');
        card.className = `task-card ${isDone ? 'done-card' : ''}`;
        card.innerHTML = `
            <div class="task-header-row">
                <span class="tag ${tagClass}">${task.priority} Priority</span>
                <span class="task-due-date">📅 ${task.dueDate || 'No date'}</span>
            </div>
            <h4>${task.title}</h4>
            ${task.notes ? `<p class="task-notes">${task.notes}</p>` : ''}
            <div class="task-card-footer">
                <span class="date-badge" style="margin: 0; font-size: 0.6875rem;">${task.category}</span>
                <div class="task-btn-group">
                    ${!isDone && task.status === 'todo' ? `<button class="task-action-btn" onclick="moveTaskStatus('${task.id}', 'inprogress')" title="Move to In Progress">⚡ Work</button>` : ''}
                    ${!isDone && task.status === 'inprogress' ? `<button class="task-action-btn btn-done" onclick="moveTaskStatus('${task.id}', 'done')" title="Mark as Done">✓ Done</button>` : ''}
                    ${isDone ? `<button class="task-action-btn" onclick="moveTaskStatus('${task.id}', 'todo')" title="Re-open Task">↩ Re-open</button>` : ''}
                    <button class="task-action-btn btn-delete" onclick="deleteTask('${task.id}')" title="Delete Task">🗑️</button>
                </div>
            </div>
        `;

        if (task.status === 'done') colDone.appendChild(card);
        else if (task.status === 'inprogress') colInprog.appendChild(card);
        else colTodo.appendChild(card);
    });

    todoCount.textContent = colTodo.children.length;
    progCount.textContent = colInprog.children.length;
    doneCount.textContent = colDone.children.length;
    tasksBadge.textContent = userTasks.filter(t => t.status !== 'done').length;
}

// ==========================================================================
// 6. INTERACTIVE CALENDAR ENGINE
// ==========================================================================
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function renderCalendar() {
    calendarMonthYear.textContent = `${monthNames[currentCalMonth]} ${currentCalYear}`;
    calendarDaysGrid.innerHTML = '';

    const firstDayIndex = new Date(currentCalYear, currentCalMonth, 1).getDay(); // 0 is Sunday
    // Adjust so Monday is 0, Sunday is 6
    const startingDay = (firstDayIndex === 0 ? 6 : firstDayIndex - 1);
    const daysInMonth = new Date(currentCalYear, currentCalMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(currentCalYear, currentCalMonth, 0).getDate();

    const todayISO = new Date().toISOString().split('T')[0];

    // Previous Month padding days
    for (let i = startingDay - 1; i >= 0; i--) {
        const dayCell = document.createElement('div');
        dayCell.className = 'cal-day-cell other-month';
        dayCell.innerHTML = `<span class="day-num">${daysInPrevMonth - i}</span>`;
        calendarDaysGrid.appendChild(dayCell);
    }

    // Current Month days
    for (let d = 1; d <= daysInMonth; d++) {
        const dayCell = document.createElement('div');
        dayCell.className = 'cal-day-cell';

        const monthStr = String(currentCalMonth + 1).padStart(2, '0');
        const dayStr = String(d).padStart(2, '0');
        const dateISO = `${currentCalYear}-${monthStr}-${dayStr}`;

        if (dateISO === todayISO) dayCell.classList.add('today');
        if (dateISO === selectedCalDateString) dayCell.classList.add('selected-day');

        // Check for tasks on this date
        const tasksOnDate = userTasks.filter(t => t.dueDate === dateISO);
        let dotsHtml = '';
        if (tasksOnDate.length > 0) {
            dayCell.classList.add('has-tasks');
            dotsHtml = `<div class="day-tasks-dots">${tasksOnDate.slice(0, 3).map(t => `<span class="cal-task-dot ${t.priority.toLowerCase()}"></span>`).join('')}</div>`;
        }

        dayCell.innerHTML = `
            <span class="day-num">${d}</span>
            ${dotsHtml}
        `;

        dayCell.addEventListener('click', () => {
            selectedCalDateString = dateISO;
            document.querySelectorAll('.cal-day-cell').forEach(c => c.classList.remove('selected-day'));
            dayCell.classList.add('selected-day');
            renderSelectedDayTasks();
        });

        calendarDaysGrid.appendChild(dayCell);
    }

    renderSelectedDayTasks();
}

function renderSelectedDayTasks() {
    calSelectedDateTitle.textContent = `Schedule: ${selectedCalDateString}`;
    const todayISO = new Date().toISOString().split('T')[0];
    calSelectedDayBadge.textContent = selectedCalDateString === todayISO ? 'Today' : selectedCalDateString;

    const dayTasks = userTasks.filter(t => t.dueDate === selectedCalDateString);
    calDayTasksList.innerHTML = '';

    if (dayTasks.length === 0) {
        calDayTasksList.innerHTML = `<div class="empty-state-notice" style="padding: 1rem;"><p>No tasks scheduled for this date.</p></div>`;
        return;
    }

    dayTasks.forEach(task => {
        const item = document.createElement('div');
        item.className = 'task-card';
        item.style.padding = '0.75rem';
        const tagClass = task.priority === 'High' ? 'high' : task.priority === 'Medium' ? 'medium' : 'low';
        item.innerHTML = `
            <div class="task-header-row">
                <span class="tag ${tagClass}">${task.priority}</span>
                <span style="font-size: 0.75rem; color: var(--text-muted);">${task.status.toUpperCase()}</span>
            </div>
            <h4 style="font-size: 0.875rem;">${task.title}</h4>
            <div class="task-card-footer" style="padding-top: 0.35rem; margin-top: 0.35rem;">
                <span style="font-size: 0.6875rem; color: var(--text-dim);">${task.category}</span>
                <button class="task-action-btn btn-delete" onclick="deleteTask('${task.id}')">🗑️</button>
            </div>
        `;
        calDayTasksList.appendChild(item);
    });
}

calPrevBtn.addEventListener('click', () => {
    currentCalMonth--;
    if (currentCalMonth < 0) {
        currentCalMonth = 11;
        currentCalYear--;
    }
    renderCalendar();
});

calNextBtn.addEventListener('click', () => {
    currentCalMonth++;
    if (currentCalMonth > 11) {
        currentCalMonth = 0;
        currentCalYear++;
    }
    renderCalendar();
});

calTodayBtn.addEventListener('click', () => {
    currentCalMonth = new Date().getMonth();
    currentCalYear = new Date().getFullYear();
    selectedCalDateString = new Date().toISOString().split('T')[0];
    renderCalendar();
});

calQuickAddTaskBtn.addEventListener('click', () => {
    switchView('tasks');
    taskCreatePanel.style.display = 'block';
    taskDateInput.value = selectedCalDateString;
});

// ==========================================================================
// 7. DOCUMENT STUDIO (NOTES, PAPERS, READER MODAL)
// ==========================================================================
btnAddDoc.addEventListener('click', () => {
    docUploadPanel.style.display = docUploadPanel.style.display === 'none' ? 'block' : 'none';
});

cancelDocBtn.addEventListener('click', () => {
    docUploadPanel.style.display = 'none';
});

function saveDocs() {
    localStorage.setItem('nova_docs', JSON.stringify(userDocs));
    renderDocs();
    updateOverviewMetrics();
}

newDocForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('doc-title-input').value.trim();
    const category = document.getElementById('doc-category-select').value;
    const content = document.getElementById('doc-desc-input').value.trim();

    const newDoc = {
        id: Date.now().toString(),
        title,
        category,
        content,
        createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    userDocs.unshift(newDoc);
    saveDocs();
    newDocForm.reset();
    docUploadPanel.style.display = 'none';
});

function renderDocs() {
    docsListContainer.innerHTML = '';
    if (userDocs.length === 0) {
        docsEmptyState.style.display = 'block';
    } else {
        docsEmptyState.style.display = 'none';
    }

    userDocs.forEach(doc => {
        const card = document.createElement('div');
        card.className = 'doc-card';
        card.innerHTML = `
            <div class="doc-badge">${doc.category}</div>
            <h4>${doc.title}</h4>
            <p>${doc.content}</p>
            <div class="doc-footer">
                <span>📅 ${doc.createdAt}</span>
                <button class="doc-view-btn" onclick="openDocReader('${doc.id}')">Read Note 📖</button>
            </div>
        `;
        docsListContainer.appendChild(card);
    });

    docsBadge.textContent = userDocs.length;
}

window.openDocReader = function(docId) {
    const doc = userDocs.find(d => d.id === docId);
    if (!doc) return;
    activeViewingDocId = docId;

    modalDocTitle.textContent = doc.title;
    modalDocTag.textContent = doc.category;
    modalDocContent.textContent = doc.content;
    modalDocMeta.textContent = `Created: ${doc.createdAt}`;
    docModal.style.display = 'flex';
};

closeDocModalBtn.addEventListener('click', () => {
    docModal.style.display = 'none';
});

modalDeleteDocBtn.addEventListener('click', () => {
    if (activeViewingDocId && confirm("Permanently delete this document note?")) {
        userDocs = userDocs.filter(d => d.id !== activeViewingDocId);
        saveDocs();
        docModal.style.display = 'none';
    }
});

// ==========================================================================
// 8. CHAT & AI ASSISTANT FRONTEND
// ==========================================================================
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = chatInput.value.trim();
    if (!query) return;

    appendChatMessage(currentUser ? currentUser.userName : 'You', query, 'outgoing');
    chatInput.value = '';

    // Simulated response / Hook for your upcoming custom backend!
    setTimeout(() => {
        const assistantReply = `I received your message: "${query}". Whenever you connect your Python/FastAPI or Node backend endpoints, I will stream back real-time generative responses and database queries!`;
        appendChatMessage('Nova Assistant', assistantReply, 'incoming');
    }, 600);
});

promptChips.forEach(chip => {
    chip.addEventListener('click', () => {
        chatInput.value = chip.dataset.prompt;
        chatForm.dispatchEvent(new Event('submit'));
    });
});

clearChatBtn.addEventListener('click', () => {
    chatMessagesBox.innerHTML = `
        <div class="message-group incoming">
            <div class="msg-avatar">N</div>
            <div class="msg-content">
                <div class="msg-meta">
                    <span class="msg-sender">Nova Assistant</span>
                    <span class="msg-timestamp">Ready</span>
                </div>
                <div class="msg-bubble">Chat history cleared. How can I assist you next?</div>
            </div>
        </div>
    `;
});

function appendChatMessage(sender, text, type = 'incoming') {
    const initial = sender.charAt(0).toUpperCase();
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const msgGroup = document.createElement('div');
    msgGroup.className = `message-group ${type}`;
    msgGroup.innerHTML = `
        <div class="msg-avatar">${initial}</div>
        <div class="msg-content">
            <div class="msg-meta">
                <span class="msg-sender">${sender}</span>
                <span class="msg-timestamp">${time}</span>
            </div>
            <div class="msg-bubble">${text}</div>
        </div>
    `;

    chatMessagesBox.appendChild(msgGroup);
    chatMessagesBox.scrollTop = chatMessagesBox.scrollHeight;
}

// ==========================================================================
// 9. OVERVIEW METRICS & FOCUS HUB
// ==========================================================================
function updateOverviewMetrics() {
    const total = userTasks.length;
    const done = userTasks.filter(t => t.status === 'done').length;
    const high = userTasks.filter(t => t.priority === 'High' && t.status !== 'done').length;
    const totalDocs = userDocs.length;

    statTotalTasks.textContent = total;
    statDoneTasks.textContent = done;
    statHighPriority.textContent = high;
    statTotalDocs.textContent = totalDocs;

    const percent = total > 0 ? Math.round((done / total) * 100) : 0;
    progressPercent.textContent = `${percent}%`;
    progressFill.style.width = `${percent}%`;

    // Render Priority Focus list
    const focusTasks = userTasks.filter(t => t.status !== 'done').slice(0, 4);
    overviewTaskItems.innerHTML = '';

    if (focusTasks.length === 0) {
        overviewTaskItems.innerHTML = `<div class="empty-state-notice"><p>🎉 All caught up! No pending tasks right now.</p></div>`;
    } else {
        focusTasks.forEach(task => {
            const row = document.createElement('div');
            row.className = 'task-card';
            row.style.padding = '0.75rem';
            const tagClass = task.priority === 'High' ? 'high' : task.priority === 'Medium' ? 'medium' : 'low';
            row.innerHTML = `
                <div class="task-header-row">
                    <span class="tag ${tagClass}">${task.priority}</span>
                    <span class="task-due-date">📅 ${task.dueDate}</span>
                </div>
                <h4>${task.title}</h4>
            `;
            overviewTaskItems.appendChild(row);
        });
    }
}

// ==========================================================================
// 10. AUTH MODAL, SETTINGS & DELETE ACCOUNT
// ==========================================================================
function openAuth(mode = 'signup') {
    setAuthMode(mode);
    authModal.style.display = 'flex';
    closeMobileSidebar();
}
function closeAuth() {
    authModal.style.display = 'none';
    alertBox.style.display = 'none';
}
if (openAuthBtn) openAuthBtn.addEventListener('click', () => openAuth('signup'));
if (headerAuthBtn) headerAuthBtn.addEventListener('click', () => openAuth('login'));
if (closeAuthBtn) closeAuthBtn.addEventListener('click', closeAuth);
authModal.addEventListener('click', (e) => { if (e.target === authModal) closeAuth(); });

function setAuthMode(mode) {
    currentMode = mode;
    alertBox.style.display = 'none';
    if (mode === 'signup') {
        tabSignUp.classList.add('active');
        tabLogIn.classList.remove('active');
        formTitle.textContent = 'Your Personal Cloud';
        formSubtitle.textContent = 'Register to sync your private tasks, calendar, and notes';
        nameGroup.style.display = 'block';
        nameInput.required = true;
        emailLabel.textContent = 'Email Address';
        btnText.textContent = 'Create Account';
        togglePrompt.innerHTML = `Already registered? <a href="#" id="toggle-link">Log In here</a>`;
    } else {
        tabLogIn.classList.add('active');
        tabSignUp.classList.remove('active');
        formTitle.textContent = 'Sign In to Nova';
        formSubtitle.textContent = 'Enter your credentials to access your synced space';
        nameGroup.style.display = 'none';
        nameInput.required = false;
        emailLabel.textContent = 'Username or Email';
        btnText.textContent = 'Enter Workspace';
        togglePrompt.innerHTML = `Need an account? <a href="#" id="toggle-link">Create one →</a>`;
    }
    document.getElementById('toggle-link').addEventListener('click', (e) => {
        e.preventDefault();
        setAuthMode(currentMode === 'signup' ? 'login' : 'signup');
    });
}
tabSignUp.addEventListener('click', () => setAuthMode('signup'));
tabLogIn.addEventListener('click', () => setAuthMode('login'));

document.getElementById('auth-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    submitBtn.disabled = true;
    try {
        if (currentMode === 'signup') {
            btnText.textContent = 'Creating...';
            const res = await fetch('/api/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userName: nameInput.value, userEmail: emailInput.value, userPassword: passwordInput.value })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Failed to sign up');
            alertBox.textContent = 'Account created! Please log in.';
            alertBox.className = 'alert-box success';
            alertBox.style.display = 'block';
            passwordInput.value = '';
            setTimeout(() => setAuthMode('login'), 900);
        } else {
            btnText.textContent = 'Authenticating...';
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ identifier: emailInput.value, userPassword: passwordInput.value })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Failed to log in');
            localStorage.setItem('authToken', data.token);
            currentUser = data.user;
            closeAuth();
            renderUserSession();
        }
    } catch (err) {
        alertBox.textContent = err.message;
        alertBox.className = 'alert-box error';
        alertBox.style.display = 'block';
    } finally {
        submitBtn.disabled = false;
        btnText.textContent = currentMode === 'signup' ? 'Create Account' : 'Enter Workspace';
    }
});

function renderUserSession() {
    if (currentUser) {
        const name = currentUser.userName || 'Inamullah';
        openAuthBtn.style.display = 'none';
        headerAuthBtn.style.display = 'none';
        accountBtn.style.display = 'flex';
        sidebarAvatar.textContent = name.charAt(0).toUpperCase();
        sidebarUsername.textContent = name;
        currentUserStatus.textContent = `${name}'s Space`;
        heroGreeting.textContent = `Welcome back, ${name}! 👋`;
        modalAvatar.textContent = name.charAt(0).toUpperCase();
        modalUsername.textContent = name;
        modalEmail.textContent = currentUser.userEmail || '';
    } else {
        openAuthBtn.style.display = 'flex';
        headerAuthBtn.style.display = 'inline-block';
        accountBtn.style.display = 'none';
        currentUserStatus.textContent = 'Personal Space';
        heroGreeting.textContent = `Welcome to Nova! 👋`;
    }
}

// Settings & Account
settingsBtn.addEventListener('click', () => { settingsModal.style.display = 'flex'; closeMobileSidebar(); });
closeSettingsBtn.addEventListener('click', () => { settingsModal.style.display = 'none'; });
saveSettingsBtn.addEventListener('click', () => { settingsModal.style.display = 'none'; });
themeButtons.forEach(btn => btn.addEventListener('click', () => applyTheme(btn.dataset.themeVal)));
fontSizeSelect.addEventListener('change', (e) => applyFontSize(e.target.value));

accountBtn.addEventListener('click', () => { accountModal.style.display = 'flex'; closeMobileSidebar(); });
closeAccountBtn.addEventListener('click', () => { accountModal.style.display = 'none'; });
window.addEventListener('click', (e) => {
    if (e.target === settingsModal) settingsModal.style.display = 'none';
    if (e.target === accountModal) accountModal.style.display = 'none';
    if (e.target === docModal) docModal.style.display = 'none';
});

verifyTokenBtn.addEventListener('click', async () => {
    const token = localStorage.getItem('authToken');
    if (!token) return;
    try {
        modalApiBox.style.display = 'block';
        modalApiBox.textContent = 'Verifying with MongoDB Atlas...';
        const res = await fetch('/api/profile', { headers: { 'Authorization': `Bearer ${token}` } });
        const data = await res.json();
        modalApiBox.textContent = JSON.stringify(data, null, 2);
    } catch (err) { modalApiBox.textContent = err.message; }
});

modalLogoutBtn.addEventListener('click', () => {
    localStorage.removeItem('authToken');
    currentUser = null;
    accountModal.style.display = 'none';
    renderUserSession();
});

deleteAccountBtn.addEventListener('click', async () => {
    if (!confirm("Permanently delete your account and erase all credentials from MongoDB?")) return;
    const token = localStorage.getItem('authToken');
    if (!token) return;
    try {
        deleteAccountBtn.textContent = 'Deleting...';
        const res = await fetch('/api/account', { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to delete');
        alert('Account deleted.');
        localStorage.removeItem('authToken');
        currentUser = null;
        accountModal.style.display = 'none';
        renderUserSession();
    } catch (err) { alert(err.message); }
    finally { deleteAccountBtn.textContent = '🗑️ Delete Account Permanently'; }
});

// ==========================================================================
// 11. INITIALIZATION ON LOAD
// ==========================================================================
window.addEventListener('DOMContentLoaded', async () => {
    renderUserSession();
    renderTasks();
    renderDocs();
    renderCalendar();
    updateOverviewMetrics();

    const token = localStorage.getItem('authToken');
    if (token) {
        try {
            const res = await fetch('/api/profile', { headers: { 'Authorization': `Bearer ${token}` } });
            if (res.ok) {
                const data = await res.json();
                currentUser = data.user;
                renderUserSession();
            } else { localStorage.removeItem('authToken'); }
        } catch { localStorage.removeItem('authToken'); }
    }
});






// ==========================================================================
// 1. DOM ELEMENTS
// ==========================================================================
// Auth Drawer Elements
const authModal = document.getElementById('auth-modal');
const closeAuthBtn = document.getElementById('close-auth-btn');
const openAuthBtn = document.getElementById('open-auth-btn');
const headerAuthBtn = document.getElementById('header-auth-btn');
const tabSignUp = document.getElementById('tab-signup');
const tabLogIn = document.getElementById('tab-login');
const formTitle = document.getElementById('form-title');
const formSubtitle = document.getElementById('form-subtitle');
const nameGroup = document.getElementById('name-group');
const nameInput = document.getElementById('name-input');
const emailGroup = document.getElementById('email-group');
const emailLabel = document.getElementById('email-label');
const emailInput = document.getElementById('email-input');
const passwordInput = document.getElementById('password-input');
const submitBtn = document.getElementById('submit-btn');
const btnText = document.getElementById('btn-text');
const alertBox = document.getElementById('alert-box');
const togglePrompt = document.getElementById('toggle-prompt');

// Navigation & Layout Elements
const appSidebar = document.getElementById('app-sidebar');
const sidebarBackdrop = document.getElementById('sidebar-backdrop');
const hamburgerBtn = document.getElementById('hamburger-btn');
const closeSidebarBtn = document.getElementById('close-sidebar-btn');
const quickThemeBtn = document.getElementById('quick-theme-btn');
const navItems = document.querySelectorAll('.nav-item');
const viewPanels = document.querySelectorAll('.view-panel');
const workspaceTitle = document.getElementById('workspace-title');
const workspaceSubtitle = document.getElementById('workspace-subtitle');

// Profile & Dynamic Badges
const accountBtn = document.getElementById('account-btn');
const sidebarAvatar = document.getElementById('sidebar-avatar');
const sidebarUsername = document.getElementById('sidebar-username');
const sidebarRole = document.getElementById('sidebar-role');
const heroGreeting = document.getElementById('hero-greeting');
const heroSubtext = document.getElementById('hero-subtext');
const modalAvatar = document.getElementById('modal-avatar');
const modalUsername = document.getElementById('modal-username');
const modalEmail = document.getElementById('modal-email');
const currentTeamName = document.getElementById('current-team-name');

// Stats Counters & Badges
const statDocsCount = document.getElementById('stat-docs-count');
const statTasksCount = document.getElementById('stat-tasks-count');
const docsCountBadge = document.getElementById('docs-count-badge');
const tasksCountBadge = document.getElementById('tasks-count-badge');
const activityFeed = document.getElementById('activity-feed');

// Modals
const settingsBtn = document.getElementById('settings-btn');
const settingsModal = document.getElementById('settings-modal');
const closeSettingsBtn = document.getElementById('close-settings-btn');
const saveSettingsBtn = document.getElementById('save-settings-btn');
const themeButtons = document.querySelectorAll('.theme-btn');
const fontSizeSelect = document.getElementById('font-size-select');

const accountModal = document.getElementById('account-modal');
const closeAccountBtn = document.getElementById('close-account-btn');
const modalLogoutBtn = document.getElementById('modal-logout-btn');
const deleteAccountBtn = document.getElementById('delete-account-btn');
const verifyTokenBtn = document.getElementById('verify-token-btn');
const modalApiBox = document.getElementById('modal-api-box');

// Interactive Feature Elements
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const chatMessagesBox = document.getElementById('chat-messages-box');
const emptyChatState = document.getElementById('empty-chat-state');

const btnAddDoc = document.getElementById('btn-add-doc');
const docUploadPanel = document.getElementById('doc-upload-panel');
const cancelDocBtn = document.getElementById('cancel-doc-btn');
const newDocForm = document.getElementById('new-doc-form');
const docsListContainer = document.getElementById('docs-list-container');
const docsEmptyState = document.getElementById('docs-empty-state');

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

// Team Directory Elements
const teamMyAvatar = document.getElementById('team-my-avatar');
const teamMyName = document.getElementById('team-my-name');
const teamMyRole = document.getElementById('team-my-role');

// Quick Jump Actions
const btnJumpChat = document.getElementById('btn-jump-chat');
const btnJumpDocs = document.getElementById('btn-jump-docs');
const btnJumpPlans = document.getElementById('btn-jump-plans');

// App State
let currentMode = 'signup'; // 'signup' or 'login'
let currentUser = null; // null for Guest, object when logged in
let userDocs = [];
let userTasks = [];

// ==========================================================================
// 2. THEME & SETTINGS MANAGER
// ==========================================================================
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('terraforge_theme', theme);
    quickThemeBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
    themeButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.themeVal === theme);
    });
}

function applyFontSize(size) {
    document.documentElement.setAttribute('data-font', size);
    localStorage.setItem('terraforge_font', size);
    fontSizeSelect.value = size;
}

const savedTheme = localStorage.getItem('terraforge_theme') || 'dark';
const savedFont = localStorage.getItem('terraforge_font') || 'normal';
applyTheme(savedTheme);
applyFontSize(savedFont);

// ==========================================================================
// 3. NAVIGATION & VIEW SWITCHER
// ==========================================================================
const viewSubtitles = {
    'dashboard': 'Welcome to your collaborative team operations center.',
    'chat': 'Real-time discussion channel with your project team members.',
    'documents': 'Central repository for field logs, PDFs, and architecture papers.',
    'plans': 'Track milestones, sprints, and task distributions.',
    'team': 'Directory of active contributors and specialized domain roles.'
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
        workspaceSubtitle.textContent = viewSubtitles[viewName] || 'Collaborative team workspace.';
    }

    closeMobileSidebar();
}

navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        switchView(item.dataset.view);
    });
});

if (btnJumpChat) btnJumpChat.addEventListener('click', () => switchView('chat'));
if (btnJumpDocs) btnJumpDocs.addEventListener('click', () => switchView('documents'));
if (btnJumpPlans) btnJumpPlans.addEventListener('click', () => switchView('plans'));

// ==========================================================================
// 4. MOBILE SIDEBAR CONTROLS
// ==========================================================================
function openMobileSidebar() {
    appSidebar.classList.add('open');
    sidebarBackdrop.classList.add('active');
}

function closeMobileSidebar() {
    appSidebar.classList.remove('open');
    sidebarBackdrop.classList.remove('active');
}

hamburgerBtn.addEventListener('click', openMobileSidebar);
closeSidebarBtn.addEventListener('click', closeMobileSidebar);
sidebarBackdrop.addEventListener('click', closeMobileSidebar);

quickThemeBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    applyTheme(current === 'dark' ? 'light' : 'dark');
});

// ==========================================================================
// 5. AUTH POPUP DRAWER & USER SESSION MANAGEMENT
// ==========================================================================
function openAuthModal(mode = 'signup') {
    setMode(mode);
    authModal.style.display = 'flex';
    closeMobileSidebar();
}

function closeAuthModal() {
    authModal.style.display = 'none';
    hideAlert();
}

if (openAuthBtn) openAuthBtn.addEventListener('click', () => openAuthModal('signup'));
if (headerAuthBtn) headerAuthBtn.addEventListener('click', () => openAuthModal('login'));
if (closeAuthBtn) closeAuthBtn.addEventListener('click', closeAuthModal);

authModal.addEventListener('click', (e) => {
    if (e.target === authModal) closeAuthModal();
});

function showAlert(message, type = 'error') {
    alertBox.textContent = message;
    alertBox.className = `alert-box ${type}`;
    alertBox.style.display = 'block';
}

function hideAlert() {
    alertBox.style.display = 'none';
}

function setMode(mode) {
    currentMode = mode;
    hideAlert();

    if (mode === 'signup') {
        tabSignUp.classList.add('active');
        tabLogIn.classList.remove('active');
        formTitle.textContent = 'Join Your Team';
        formSubtitle.textContent = 'Create an account to save custom docs, tasks, and chats';
        nameGroup.style.display = 'block';
        nameInput.required = true;
        emailLabel.textContent = 'Email Address';
        emailInput.placeholder = 'name@example.com';
        btnText.textContent = 'Create Account';
        togglePrompt.innerHTML = `Already on the team? <a href="#" id="toggle-link">Log In here</a>`;
    } else {
        tabLogIn.classList.add('active');
        tabSignUp.classList.remove('active');
        formTitle.textContent = 'Team Sign In';
        formSubtitle.textContent = 'Enter your credentials to enter your workspace';
        nameGroup.style.display = 'none';
        nameInput.required = false;
        emailLabel.textContent = 'Username or Email';
        emailInput.placeholder = 'e.g. Inamullah or name@gmail.com';
        btnText.textContent = 'Enter Workspace';
        togglePrompt.innerHTML = `Need an account? <a href="#" id="toggle-link">Create one →</a>`;
    }

    document.getElementById('toggle-link').addEventListener('click', (e) => {
        e.preventDefault();
        setMode(currentMode === 'signup' ? 'login' : 'signup');
    });
}

tabSignUp.addEventListener('click', () => setMode('signup'));
tabLogIn.addEventListener('click', () => setMode('login'));

// Update UI depending on Guest vs Logged In state
function renderUserState() {
    if (currentUser) {
        // Logged In User
        const displayName = currentUser.userName || 'Team Member';
        const initial = displayName.charAt(0).toUpperCase();

        if (openAuthBtn) openAuthBtn.style.display = 'none';
        if (headerAuthBtn) headerAuthBtn.style.display = 'none';
        if (accountBtn) accountBtn.style.display = 'flex';

        sidebarAvatar.textContent = initial;
        sidebarUsername.textContent = displayName;
        sidebarRole.textContent = 'Team Member • Online';
        currentTeamName.textContent = `${displayName}'s Workspace`;

        heroGreeting.textContent = `Welcome back, ${displayName}! 👋`;
        heroSubtext.textContent = `Here is your personal team operations hub. Add your documents, sprint tasks, and discussions below.`;

        modalAvatar.textContent = initial;
        modalUsername.textContent = displayName;
        modalEmail.textContent = currentUser.userEmail || 'user@example.com';

        teamMyAvatar.textContent = initial;
        teamMyName.textContent = displayName;
        teamMyRole.textContent = 'Active Contributor & Lead';

    } else {
        // Guest / Visitor
        if (openAuthBtn) openAuthBtn.style.display = 'flex';
        if (headerAuthBtn) headerAuthBtn.style.display = 'inline-block';
        if (accountBtn) accountBtn.style.display = 'none';

        currentTeamName.textContent = `Public Workspace`;
        heroGreeting.textContent = `Welcome to TerraForge! 👋`;
        heroSubtext.textContent = `Explore the collaborative hub. Sign in or create an account on the left to save your own team docs and sprint tasks.`;

        teamMyAvatar.textContent = 'G';
        teamMyName.textContent = 'Guest Visitor';
        teamMyRole.textContent = 'Public Observer';
    }

    updateStatsAndBadges();
}

function updateStatsAndBadges() {
    const docCount = userDocs.length;
    const taskCount = userTasks.length;

    statDocsCount.textContent = docCount;
    statTasksCount.textContent = taskCount;
    docsCountBadge.textContent = docCount;
    tasksCountBadge.textContent = taskCount;

    // Toggle Empty State for Docs
    if (docCount === 0) {
        docsEmptyState.style.display = 'block';
    } else {
        docsEmptyState.style.display = 'none';
    }
}

// Form Submit Handler
document.getElementById('auth-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    hideAlert();

    const password = passwordInput.value;
    submitBtn.disabled = true;

    try {
        if (currentMode === 'signup') {
            btnText.textContent = 'Creating Account...';
            const name = nameInput.value;
            const email = emailInput.value;

            const response = await fetch('/api/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userName: name, userEmail: email, userPassword: password })
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Failed to sign up');

            showAlert('Account created! Switching to login...', 'success');
            passwordInput.value = '';
            setTimeout(() => setMode('login'), 1000);

        } else {
            btnText.textContent = 'Authenticating...';
            const identifier = emailInput.value;

            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ identifier: identifier, userPassword: password })
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Failed to log in');

            localStorage.setItem('authToken', data.token);
            currentUser = data.user;
            
            // Clean empty state for new user
            userDocs = [];
            userTasks = [];
            renderDocs();
            renderTasks();

            showAlert('Login successful! Entering workspace...', 'success');

            setTimeout(() => {
                closeAuthModal();
                renderUserState();
            }, 600);
        }
    } catch (err) {
        showAlert(err.message, 'error');
    } finally {
        submitBtn.disabled = false;
        btnText.textContent = currentMode === 'signup' ? 'Create Account' : 'Enter Workspace';
    }
});

// ==========================================================================
// 6. INTERACTIVE CHAT, DOCUMENTS & KANBAN TASKS
// ==========================================================================

// --- A. Real-Time Chat ---
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = chatInput.value.trim();
    if (!text) return;

    if (emptyChatState) emptyChatState.style.display = 'none';

    const senderName = currentUser ? currentUser.userName : 'Guest Visitor';
    const initial = senderName.charAt(0).toUpperCase();
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const msgGroup = document.createElement('div');
    msgGroup.className = 'message-group outgoing';
    msgGroup.innerHTML = `
        <div class="msg-avatar">${initial}</div>
        <div class="msg-content">
            <div class="msg-meta">
                <span class="msg-sender">${senderName}</span>
                <span class="msg-timestamp">${time}</span>
            </div>
            <div class="msg-bubble">${text}</div>
        </div>
    `;

    chatMessagesBox.appendChild(msgGroup);
    chatInput.value = '';
    chatMessagesBox.scrollTop = chatMessagesBox.scrollHeight;
});

// --- B. Document Sharing ---
btnAddDoc.addEventListener('click', () => {
    docUploadPanel.style.display = docUploadPanel.style.display === 'none' ? 'block' : 'none';
});

cancelDocBtn.addEventListener('click', () => {
    docUploadPanel.style.display = 'none';
});

function renderDocs() {
    docsListContainer.innerHTML = '';
    userDocs.forEach((doc, index) => {
        const card = document.createElement('div');
        card.className = 'doc-card';
        card.innerHTML = `
            <div class="doc-badge">${doc.category}</div>
            <h4>${doc.title}</h4>
            <p>${doc.desc}</p>
            <div class="doc-footer">
                <span>By ${doc.author}</span>
                <button class="doc-view-btn" onclick="removeDoc(${index})">Remove</button>
            </div>
        `;
        docsListContainer.appendChild(card);
    });
    updateStatsAndBadges();
}

window.removeDoc = function(index) {
    userDocs.splice(index, 1);
    renderDocs();
};

newDocForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('doc-title-input').value;
    const desc = document.getElementById('doc-desc-input').value;
    const category = document.getElementById('doc-category-select').value;
    const author = currentUser ? currentUser.userName : 'Guest';

    userDocs.unshift({ title, desc, category, author });
    renderDocs();
    newDocForm.reset();
    docUploadPanel.style.display = 'none';
});

// --- C. Task / Kanban Management ---
btnAddTask.addEventListener('click', () => {
    taskCreatePanel.style.display = taskCreatePanel.style.display === 'none' ? 'block' : 'none';
});

cancelTaskBtn.addEventListener('click', () => {
    taskCreatePanel.style.display = 'none';
});

function renderTasks() {
    colTodo.innerHTML = '';
    colInprog.innerHTML = '';
    colDone.innerHTML = '';

    userTasks.forEach((task, index) => {
        const tagClass = task.priority === 'High' ? 'high' : task.priority === 'Medium' ? 'medium' : 'done-tag';
        const card = document.createElement('div');
        card.className = 'task-card';
        card.innerHTML = `
            <span class="tag ${tagClass}">${task.priority}</span>
            <h4>${task.title}</h4>
            <div class="task-meta">👤 ${task.assignee}</div>
        `;

        if (task.status === 'done') {
            card.classList.add('done-card');
            colDone.appendChild(card);
        } else if (task.status === 'inprogress') {
            colInprog.appendChild(card);
        } else {
            colTodo.appendChild(card);
        }
    });

    todoCount.textContent = colTodo.children.length;
    progCount.textContent = colInprog.children.length;
    doneCount.textContent = colDone.children.length;
    updateStatsAndBadges();
}

newTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('task-title-input').value;
    const assignee = document.getElementById('task-assignee-input').value;
    const priority = document.getElementById('task-priority-select').value;

    userTasks.unshift({ title, assignee, priority, status: 'todo' });
    renderTasks();
    newTaskForm.reset();
    taskCreatePanel.style.display = 'none';
});

// ==========================================================================
// 7. SETTINGS & ACCOUNT MODALS + DELETE ACCOUNT
// ==========================================================================
settingsBtn.addEventListener('click', () => {
    settingsModal.style.display = 'flex';
    closeMobileSidebar();
});

closeSettingsBtn.addEventListener('click', () => {
    settingsModal.style.display = 'none';
});

themeButtons.forEach(btn => {
    btn.addEventListener('click', () => applyTheme(btn.dataset.themeVal));
});

fontSizeSelect.addEventListener('change', (e) => applyFontSize(e.target.value));

saveSettingsBtn.addEventListener('click', () => {
    settingsModal.style.display = 'none';
});

// Account Profile Modal
accountBtn.addEventListener('click', () => {
    accountModal.style.display = 'flex';
    modalApiBox.style.display = 'none';
    closeMobileSidebar();
});

closeAccountBtn.addEventListener('click', () => {
    accountModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === settingsModal) settingsModal.style.display = 'none';
    if (e.target === accountModal) accountModal.style.display = 'none';
});

// Verify Token With Backend
verifyTokenBtn.addEventListener('click', async () => {
    const token = localStorage.getItem('authToken');
    if (!token) return;

    try {
        modalApiBox.style.display = 'block';
        modalApiBox.textContent = 'Verifying token with /api/profile...';

        const response = await fetch('/api/profile', {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        const data = await response.json();
        modalApiBox.textContent = JSON.stringify(data, null, 2);
    } catch (err) {
        modalApiBox.textContent = `Error: ${err.message}`;
    }
});

// Log Out Action
modalLogoutBtn.addEventListener('click', () => {
    localStorage.removeItem('authToken');
    currentUser = null;
    userDocs = [];
    userTasks = [];
    renderDocs();
    renderTasks();
    accountModal.style.display = 'none';
    renderUserState();
});

// DELETE ACCOUNT ACTION (Permanent MongoDB Removal)
deleteAccountBtn.addEventListener('click', async () => {
    const confirmDelete = confirm("⚠️ Are you sure you want to permanently delete your account? All your profile data will be erased from MongoDB Atlas. This cannot be undone.");
    if (!confirmDelete) return;

    const token = localStorage.getItem('authToken');
    if (!token) return;

    try {
        deleteAccountBtn.textContent = 'Deleting Account...';
        deleteAccountBtn.disabled = true;

        const response = await fetch('/api/account', {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Failed to delete account');

        alert('Your account has been deleted permanently.');
        localStorage.removeItem('authToken');
        currentUser = null;
        userDocs = [];
        userTasks = [];
        renderDocs();
        renderTasks();
        accountModal.style.display = 'none';
        renderUserState();

    } catch (err) {
        alert(`Error deleting account: ${err.message}`);
    } finally {
        deleteAccountBtn.textContent = '🗑️ Delete Account Permanently';
        deleteAccountBtn.disabled = false;
    }
});

// ==========================================================================
// 8. AUTO-INITIALIZE ON PAGE LOAD
// ==========================================================================
window.addEventListener('DOMContentLoaded', async () => {
    renderUserState();
    renderDocs();
    renderTasks();

    const token = localStorage.getItem('authToken');
    if (token) {
        try {
            const response = await fetch('/api/profile', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                currentUser = data.user;
                renderUserState();
            } else {
                localStorage.removeItem('authToken');
                currentUser = null;
                renderUserState();
            }
        } catch {
            localStorage.removeItem('authToken');
            currentUser = null;
            renderUserState();
        }
    }
});





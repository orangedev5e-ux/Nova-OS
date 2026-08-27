// ==========================================================================
// 1. DOM ELEMENTS
// ==========================================================================
// Auth Elements
const authSection = document.getElementById('auth-section');
const appSection = document.getElementById('app-section');
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
const toggleLink = document.getElementById('toggle-link');

// App & Navigation Elements
const appSidebar = document.getElementById('app-sidebar');
const sidebarBackdrop = document.getElementById('sidebar-backdrop');
const hamburgerBtn = document.getElementById('hamburger-btn');
const closeSidebarBtn = document.getElementById('close-sidebar-btn');
const quickThemeBtn = document.getElementById('quick-theme-btn');
const navItems = document.querySelectorAll('.nav-item');
const viewPanels = document.querySelectorAll('.view-panel');
const workspaceTitle = document.getElementById('workspace-title');
const workspaceSubtitle = document.getElementById('workspace-subtitle');

// User Profile Elements
const sidebarAvatar = document.getElementById('sidebar-avatar');
const sidebarUsername = document.getElementById('sidebar-username');
const heroGreeting = document.getElementById('hero-greeting');
const modalAvatar = document.getElementById('modal-avatar');
const modalUsername = document.getElementById('modal-username');
const modalEmail = document.getElementById('modal-email');

// Modals
const settingsBtn = document.getElementById('settings-btn');
const settingsModal = document.getElementById('settings-modal');
const closeSettingsBtn = document.getElementById('close-settings-btn');
const saveSettingsBtn = document.getElementById('save-settings-btn');
const themeButtons = document.querySelectorAll('.theme-btn');
const fontSizeSelect = document.getElementById('font-size-select');

const accountBtn = document.getElementById('account-btn');
const accountModal = document.getElementById('account-modal');
const closeAccountBtn = document.getElementById('close-account-btn');
const modalLogoutBtn = document.getElementById('modal-logout-btn');
const verifyTokenBtn = document.getElementById('verify-token-btn');
const modalApiBox = document.getElementById('modal-api-box');

// Feature Interactive Elements (Chat, Docs, Tasks)
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const chatMessagesBox = document.getElementById('chat-messages-box');

const btnAddDoc = document.getElementById('btn-add-doc');
const docUploadPanel = document.getElementById('doc-upload-panel');
const cancelDocBtn = document.getElementById('cancel-doc-btn');
const newDocForm = document.getElementById('new-doc-form');
const docsListContainer = document.getElementById('docs-list-container');

const btnAddTask = document.getElementById('btn-add-task');
const taskCreatePanel = document.getElementById('task-create-panel');
const cancelTaskBtn = document.getElementById('cancel-task-btn');
const newTaskForm = document.getElementById('new-task-form');
const colTodo = document.getElementById('col-todo');
const todoCount = document.getElementById('todo-count');

// Quick Jump Buttons
const btnJumpChat = document.getElementById('btn-jump-chat');
const btnJumpDocs = document.getElementById('btn-jump-docs');
const btnJumpPlans = document.getElementById('btn-jump-plans');

let currentMode = 'signup';
let currentUser = { userName: 'Inamullah', userEmail: 'inam@gmail.com' };

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

// Initialize theme from storage or default to dark
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

    // Update Header
    const activeItem = document.querySelector(`.nav-item[data-view="${viewName}"] span:nth-child(2)`);
    if (activeItem) {
        workspaceTitle.textContent = activeItem.textContent;
        workspaceSubtitle.textContent = viewSubtitles[viewName] || 'Collaborative team workspace.';
    }

    // Close mobile drawer if open
    closeMobileSidebar();
}

navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        switchView(item.dataset.view);
    });
});

// Quick Jump Actions
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

// Quick Theme Button in Header
quickThemeBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    applyTheme(current === 'dark' ? 'light' : 'dark');
});

// ==========================================================================
// 5. INTERACTIVE FEATURES: CHAT, DOCS, TASKS
// ==========================================================================

// --- A. Real-Time Chat Simulation ---
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = chatInput.value.trim();
    if (!text) return;

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const initial = (currentUser.userName || 'U')[0].toUpperCase();

    const msgGroup = document.createElement('div');
    msgGroup.className = 'message-group outgoing';
    msgGroup.innerHTML = `
        <div class="msg-avatar">${initial}</div>
        <div class="msg-content">
            <div class="msg-meta">
                <span class="msg-sender">${currentUser.userName || 'You'}</span>
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

newDocForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('doc-title-input').value;
    const desc = document.getElementById('doc-desc-input').value;
    const category = document.getElementById('doc-category-select').value;

    const newCard = document.createElement('div');
    newCard.className = 'doc-card';
    newCard.innerHTML = `
        <div class="doc-badge">${category}</div>
        <h4>${title}</h4>
        <p>${desc}</p>
        <div class="doc-footer">
            <span>Uploaded by ${currentUser.userName || 'Inamullah'}</span>
            <button class="doc-view-btn">Inspect</button>
        </div>
    `;

    docsListContainer.prepend(newCard);
    newDocForm.reset();
    docUploadPanel.style.display = 'none';
});

// --- C. Task Creation ---
btnAddTask.addEventListener('click', () => {
    taskCreatePanel.style.display = taskCreatePanel.style.display === 'none' ? 'block' : 'none';
});

cancelTaskBtn.addEventListener('click', () => {
    taskCreatePanel.style.display = 'none';
});

newTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('task-title-input').value;
    const assignee = document.getElementById('task-assignee-input').value;
    const priority = document.getElementById('task-priority-select').value;

    const tagClass = priority === 'High' ? 'high' : priority === 'Medium' ? 'medium' : 'done-tag';

    const taskCard = document.createElement('div');
    taskCard.className = 'task-card';
    taskCard.innerHTML = `
        <span class="tag ${tagClass}">${priority}</span>
        <h4>${title}</h4>
        <p>Assigned team task in active sprint backlog.</p>
        <div class="task-meta">👤 ${assignee}</div>
    `;

    colTodo.prepend(taskCard);
    todoCount.textContent = colTodo.children.length;
    newTaskForm.reset();
    taskCreatePanel.style.display = 'none';
});

// ==========================================================================
// 6. MODALS LOGIC (SETTINGS & ACCOUNT)
// ==========================================================================
// Settings Modal
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

// Account Modal
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

// Log Out
modalLogoutBtn.addEventListener('click', () => {
    localStorage.removeItem('authToken');
    passwordInput.value = '';
    showAuth();
});

// ==========================================================================
// 7. AUTHENTICATION & LOGIN FLOW
// ==========================================================================
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
        formSubtitle.textContent = 'Access collaborative chats, documents, and project plans';
        nameGroup.style.display = 'block';
        nameInput.required = true;
        emailLabel.textContent = 'Email Address';
        emailInput.placeholder = 'name@example.com';
        btnText.textContent = 'Create Team Account';
        togglePrompt.innerHTML = `Already on the team? <a href="#" id="toggle-link">Log In here</a>`;
    } else {
        tabLogIn.classList.add('active');
        tabSignUp.classList.remove('active');
        formTitle.textContent = 'Team Sign In';
        formSubtitle.textContent = 'Enter your credentials to enter the workspace';
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
toggleLink.addEventListener('click', (e) => {
    e.preventDefault();
    setMode('login');
});

function populateUserData(user) {
    currentUser = user;
    const displayName = user.userName || 'Developer';
    const initial = displayName.charAt(0).toUpperCase();

    sidebarAvatar.textContent = initial;
    sidebarUsername.textContent = displayName;
    heroGreeting.textContent = `Welcome back, ${displayName}! 👋`;

    modalAvatar.textContent = initial;
    modalUsername.textContent = displayName;
    modalEmail.textContent = user.userEmail || 'team@terraforge.io';
}

function showApp(user) {
    populateUserData(user);
    authSection.style.display = 'none';
    appSection.style.display = 'flex';
}

function showAuth() {
    appSection.style.display = 'none';
    authSection.style.display = 'flex';
    accountModal.style.display = 'none';
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
            showAlert('Login successful!', 'success');

            setTimeout(() => {
                showApp(data.user);
            }, 500);
        }
    } catch (err) {
        showAlert(err.message, 'error');
    } finally {
        submitBtn.disabled = false;
        btnText.textContent = currentMode === 'signup' ? 'Create Team Account' : 'Enter Workspace';
    }
});

// Auto Check Token on Page Load
window.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('authToken');
    if (token) {
        try {
            const response = await fetch('/api/profile', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                showApp(data.user);
            } else {
                localStorage.removeItem('authToken');
            }
        } catch {
            localStorage.removeItem('authToken');
        }
    }
});




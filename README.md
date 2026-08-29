# 💠 NOVA OS | Personal Workspace 🏳️

> A modern, full-stack team collaboration platform designed for researchers, and developers. Built with **Node.js (Express)**, **MongoDB Atlas**, **JWT & bcrypt Security**, and a **Mobile-First Responsive UI** with Dark/Light mode.

---

## ✨ Key Features

- **🔐 End-to-End Authentication:**
  - Secure user registration and login with crypt password hashing (10 salt rounds).
  - Stateless authentication with digitally signed **JSON Web Tokens (JWT)**.
  - Protected API routes verified via custom uthMiddleware.
  - Duplicate email detection and MongoDB user indexing.

- **💬 Real-Time Team Discussions:**
  - Interactive multi-user team chat channel with timestamps and avatar indicators.

- **📁 Document & Research Repository:**
  - Central repository for geological logs, PDFs, architecture specifications, and notes with instant category filtering.

- **📋 Sprint Roadmap & Kanban Board:**
  - Interactive task board (*To Do, In Progress, Completed*) with live task creation and priority tags (🔴 High, 🟡 Medium, 🟢 Low).

- **🎨 Display & Theme Engine:**
  - Quick **Dark Mode / Light Mode** toggle with persistent storage in localStorage.
  - Scalable typography (*Compact, Standard, Spacious*).
  - 100% responsive with a mobile navigation drawer for smartphones and tablets.

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js (ES Modules)
- **Database:** MongoDB Atlas (Cloud NoSQL)
- **Security:** jsonwebtoken (JWT), crypt, cors, dotenv
- **Frontend:** Vanilla JavaScript (ES6+), Modern CSS3 (Custom Properties & Flex/Grid), HTML5
- **Architecture:** Client-Server RESTful Architecture with JWT Bearer Token Security

---

## 🚀 Quick Start Guide

### 1. Clone the Repository
\\\ash
git clone https://github.com/your-username/Nova-OS.git
cd Nova-OS/my-project
\\\

### 2. Install Dependencies
\\\ash
npm install
\\\

### 3. Setup Environment Variables
Create a .env file inside the my-project directory (or copy from .env.example):
\\\env
PORT=5000
JWT_SECRET=your_super_secret_jwt_key
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?appName=Cluster0
\\\

### 4. Run the Server
\\\ash
npm start
\\\
Open **http://localhost:5000** in your browser!

---

## 📂 Project Structure

\\\	ext
connecDb/
├── README.md                 <-- Project Documentation
├── public/                   <-- Frontend Client Files
│   ├── index.html            <-- Main Single Page App (Auth + Hub Views)
│   ├── style.css             <-- Dark/Light Theme & Responsive CSS
│   └── app.js                <-- Client State, Routing & API Fetch Logic
└── my-project/               <-- Backend Server Files
    ├── .env                  <-- Environment Secrets (Ignored by Git)
    ├── .env.example          <-- Sample Environment Template
    ├── .gitignore            <-- Git Ignore File
    ├── authMiddleware.js     <-- JWT Verification Middleware
    ├── server.js             <-- Express REST API & MongoDB Atlas Engine
    └── package.json          <-- Backend Dependencies & Scripts
\\\

---

## 👨‍💻 Author

- **I** — *Full-Stack Developer| MERN Stack*

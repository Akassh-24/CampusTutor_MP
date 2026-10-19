# 🎓 Campus-Tutor: Peer Academic Help Marketplace
> **A Complete Full-Stack Campus Tutoring Platform for University Students**  
> *Node.js + Express REST API Backend & High-Performance Responsive Web Frontend*

---

## 📌 Project Overview
**Campus-Tutor** is a peer-to-peer academic assistance marketplace built specifically for campus environments. It allows university students who are struggling with a course topic, chapter, problem set, or exam preparation to post their request with an hourly or flat budget (₹ INR) and meeting preference (Campus Library, Student Lab, Zoom, Hybrid). Qualified student peers who have already completed the course can discover listings, send tutoring proposals, connect, and conduct collaborative study sessions for a fee.

---

## 🔐 Master Administrator Access (Strictly Restricted)
The institutional administration console ([`admin.html`](admin.html)) and dedicated admin portal ([`admin-login.html`](admin-login.html)) are strictly restricted to **one authorized master administrator account**:

- **Admin Email:** `akashshelke.2607@gmail.com`
- **Master Password:** `Akash1029@`

> **Security Guard:** Both the frontend gateway and the backend REST API (`/api/auth/admin-login`) reject any other email or credentials trying to enter the administrative moderation console. Regular students cannot register or sign in with this email through the student portal.

---

## 🚀 Key Features

### 1. 🎓 Student Authentication & Account Database
- **Secure Registration:** Students register with Name, Campus Email, Major, Student ID, and Password. Passwords are securely hashed using `bcryptjs` before being stored in the database.
- **Pure Email & Password:** Google authentication has been removed to keep a clean, uniform institutional login flow.
- **Session Management:** Generates JWT authentication tokens and stores user profiles with academic standing, peer rating, and completed session stats.

### 2. 🔍 Tutoring Marketplace (`browse.html`)
- **Instant Keyword Search:** Real-time search across course codes, topics, subjects, descriptions, or student names with instant (✕) clear button.
- **Subject Category Chips:** 1-click filter pills for **Computer Science**, **Mathematics**, **Physics**, **Chemistry**, **Economics**, and **Engineering**.
- **Multi-Parameter Filtering & Sorting:** Urgency (⚡ Exam in 2-3 Days), meeting mode (Library, Lab, Online, Hybrid), and budget sorting.
- **🚩 Report Fraud Button:** Every listing card has a report button to flag unauthorized cheating, commercial spam, or misconduct directly to campus moderators.
- **Offer Help Modal:** Tutors can submit custom proposals with their rate and availability pitch.

### 3. ✍️ Tutoring Request Studio (`postrequest.html`)
- **Live Side-by-Side Card Preview:** A real-time preview card that renders exactly how your request will look to peers as you type.
- **Dual Budget Switcher:** Toggle between **Hourly Rate (₹/hr)** and **Fixed Budget (₹ flat)**.
- **Timeline & Urgency Selector:** Set clear expectations (⚡ Urgent exam prep vs flexible ongoing help).

### 4. 👤 Student Profile & Proposal Management (`profile.html`)
- **Sub-Tabs Navigation:**
  - **📋 My Posted Requests:** View your active requests, delete/cancel listings, and view received proposals.
  - **✉️ My Sent Proposals:** View all proposals you sent to fellow students with live status badges (`⏳ Pending Review` or `🎉 Proposal Accepted!`).
- **Received Proposals Review Modal:** Inspect incoming tutor pitches, contact details, and rates. Clicking **`✓ Accept Proposal`** confirms the match and sends an instant alert to the tutor.
- **Account Activity:** Live counter of requests posted, proposals sent, sessions completed, and star rating.

### 5. 🔔 Real-Time Alerts & Notification Center
- **Navbar Alerts Tab:** Logged-in students have a `🔔 Alerts` tab with an unread badge counter.
- **Notification Feed:** Informs users when a request is published, when a tutor proposes an offer, and when a proposal is accepted. Includes a "Mark all read" button.

### 6. 🛡️ Institutional Moderation Console (`admin.html`)
- **Member Directory:** Full directory of students and tutors with role promotion and account suspension actions.
- **Flagged Reports Feed:** Review incident reports filed from browse cards, inspect evidence, and update status (`investigating`, `resolved`).

---

## 📁 Project Architecture & File Structure

```text
CAMPUS-TUTOR-MP/
│
├── server.js            # Node.js + Express REST API server & static file host
├── db.js                # Database persistence module (JSON store with password hashing & auto-seeding)
├── package.json         # Backend dependencies (express, cors, bcryptjs, jsonwebtoken, dotenv)
├── render.yaml          # Render Blueprint deployment specification
├── .env.example         # Template for environment variables (PORT, ADMIN_EMAIL, ADMIN_PASSWORD)
├── .gitignore           # Ignores node_modules, .env, and temp files
│
├── index.html           # Landing page with stats, process cards, and recent requests
├── browse.html          # Marketplace with real-time search, filters, offer modal & report modal
├── postrequest.html     # Request creation portal with live interactive preview card
├── profile.html         # Student profile with sub-tabs (Posted Requests vs Sent Proposals)
├── admin.html           # Moderation console (strictly locked to akashshelke.2607@gmail.com)
├── admin-login.html     # Dedicated admin authentication gateway
├── login.html           # Student email/password authentication portal
│
├── stylee.css           # Responsive CSS design system (tokens, cards, tables, modals)
├── app.js               # Frontend controller, reactive store, notification modal, & API bridge
└── data/                # Auto-created database directory (users, requests, offers, reports)
```

---

## 🛠️ REST API Endpoints Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Server health check and uptime status |
| `POST` | `/api/auth/register` | Register a new student (hashes password with bcrypt) |
| `POST` | `/api/auth/login` | Student login with campus email and password |
| `POST` | `/api/auth/admin-login` | Strict admin login (only `akashshelke.2607@gmail.com`) |
| `PUT` | `/api/auth/profile` | Update user department, year, or bio |
| `GET` | `/api/requests` | Fetch all tutoring requests |
| `POST` | `/api/requests` | Create and publish a new tutoring request |
| `DELETE` | `/api/requests/:id` | Cancel/delete a tutoring request |
| `GET` | `/api/offers` | Fetch offers (optional `?requestId=` or `?tutorContact=`) |
| `POST` | `/api/offers` | Submit tutor proposal on a request |
| `POST` | `/api/offers/:id/accept` | Accept a tutor proposal & trigger notifications |
| `GET` | `/api/notifications` | Fetch user alerts by `?email=` |
| `PUT` | `/api/notifications/mark-read` | Mark all or single notification as read |
| `GET` | `/api/reports` | Fetch all flagged incident reports |
| `POST` | `/api/reports` | Submit a fraudulent listing report |
| `PUT` | `/api/reports/:id/status` | Update report status (`investigating`, `resolved`) |
| `GET` | `/api/admin/members` | Get member directory and statistics |
| `PUT` | `/api/admin/members/:id/role` | Promote/demote member role |
| `PUT` | `/api/admin/members/:id/status` | Suspend or reactivate member account |

---

## 💻 How to Run Locally

### Prerequisites
- Node.js (v18 or higher recommended)
- npm (comes with Node.js)

### Step 1: Install Dependencies
Open your terminal in the project directory (`d:\Codes\CAMPUS-TUTOR-MP`):
```bash
npm install
```

### Step 2: Configure Environment
Copy `.env.example` to `.env` (already created for you):
```bash
PORT=5000
ADMIN_EMAIL=akashshelke.2607@gmail.com
ADMIN_PASSWORD=Akash1029@
JWT_SECRET=campus_tutor_ultra_secure_jwt_secret_2026
```

### Step 3: Start Server
```bash
npm start
```
The server will start at **`http://localhost:5000`**.  
Open your browser and visit:
- **Student Home:** `http://localhost:5000`
- **Browse Requests:** `http://localhost:5000/browse.html`
- **Post a Request:** `http://localhost:5000/postrequest.html`
- **Student Login:** `http://localhost:5000/login.html`
- **Admin Portal:** `http://localhost:5000/admin-login.html`

*(Note: If you ever open HTML files directly via `file://` or Live Server, the frontend automatically points to `http://localhost:5000/api` without needing any extra configuration!)*

---

## ☁️ How to Deploy to Render (Step-by-Step)

Deploying Campus-Tutor to Render is fast and free. The Express backend serves both the API and the frontend files from the same origin, so you only need **one single Render Web Service**.

### Method 1: One-Click Blueprint Deployment (Recommended)
1. Push your project code to a **GitHub** or **GitLab** repository.
2. Log in to [Render.com](https://render.com/).
3. In the Render Dashboard, click **New +** $\to$ **Blueprint**.
4. Select your `CAMPUS-TUTOR-MP` repository.
5. Render will automatically detect [`render.yaml`](render.yaml) and configure:
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment Variables (`ADMIN_EMAIL`, `ADMIN_PASSWORD`, `JWT_SECRET`)
6. Click **Apply**. Render will build and launch your live site!

---

### Method 2: Manual Web Service Setup
If you prefer creating the web service manually on Render:

1. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Campus-Tutor full-stack platform"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/CAMPUS-TUTOR-MP.git
   git push -u origin main
   ```
2. **Go to [dashboard.render.com](https://dashboard.render.com/)** and click **New +** $\to$ **Web Service**.
3. **Connect your GitHub repository:** Choose your `CAMPUS-TUTOR-MP` repo.
4. **Configure the Web Service Settings:**
   - **Name:** `campus-tutor` (or your preferred name)
   - **Region:** Choose the region closest to your users (e.g., Singapore, Frankfurt, Oregon)
   - **Branch:** `main`
   - **Root Directory:** Leave empty (default)
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** `Free`
5. **Add Environment Variables:**
   Under the **Environment Variables** section, click **Add Environment Variable**:
   - `ADMIN_EMAIL` = `akashshelke.2607@gmail.com`
   - `ADMIN_PASSWORD` = `Akash1029@`
   - `JWT_SECRET` = `campus_tutor_ultra_secure_jwt_secret_2026`
   - `PORT` = `10000` (Render assigns its own PORT automatically, but setting 10000 is recommended)
6. **Click "Create Web Service":**
   Render will download dependencies, start `server.js`, and provide a free live URL (e.g. `https://campus-tutor.onrender.com`).
7. **Verify Live Deployment:**
   - Visit `https://your-service.onrender.com` in your browser.
   - Test Student Sign In / Register at `/login.html`.
   - Test Admin Login with `akashshelke.2607@gmail.com` and `Akash1029@` at `/admin-login.html`.

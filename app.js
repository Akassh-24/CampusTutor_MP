/**
 * Campus-Tutor - Core Frontend Application Store & Mock Services
 * Mini Project: Frontend Architecture (No backend server required)
 */

(function () {
  'use strict';

  // Dynamic API Base URL for backend connection (supports Render, localhost, and custom host)
  const API_BASE = (function () {
    if (typeof window !== 'undefined' && window.API_BASE_URL) return window.API_BASE_URL;
    if (typeof window !== 'undefined') {
      const isLocalHost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      const isFileProtocol = window.location.protocol === 'file:';
      if (isFileProtocol || (isLocalHost && window.location.port !== '5000')) {
        return 'http://localhost:5000/api';
      }
    }
    return '/api';
  })();

  // =========================================================================
  // Default Demo Tutoring Requests
  // =========================================================================
  const DEFAULT_REQUESTS = [
    {
      id: "req-101",
      title: "CS201: Binary Search Trees & AVL Balancing",
      subject: "Computer Science",
      requesterName: "Alex Morgan",
      requesterYear: "Sophomore (2nd Year)",
      requesterEmail: "alex.m@campus.edu",
      budget: "₹350 / hr",
      budgetAmount: 350,
      budgetType: "hourly",
      mode: "In-Person (Campus Library)",
      urgency: "Urgent (Exam in 2-3 Days)",
      isUrgent: true,
      description: "Need help preparing for the CS201 midterm this Thursday. Specifically struggling with tree rotations in AVL balancing, recursion traces, and deletion cases.",
      createdAt: "2 hours ago",
      timestamp: Date.now() - 7200000,
      offersCount: 3,
      status: "active"
    },
    {
      id: "req-102",
      title: "MATH102: Multivariable Calculus - Stokes' Theorem",
      subject: "Mathematics",
      requesterName: "Priya Sharma",
      requesterYear: "Junior (3rd Year)",
      requesterEmail: "priya.s@campus.edu",
      budget: "₹400 / hr",
      budgetAmount: 400,
      budgetType: "hourly",
      mode: "Online (Zoom / Meet)",
      urgency: "This Week",
      isUrgent: false,
      description: "Struggling with surface integrals and applying Stokes' Theorem to 3D vector fields. Looking for a tutor who can walk through 4-5 practice problem sets together.",
      createdAt: "5 hours ago",
      timestamp: Date.now() - 18000000,
      offersCount: 2,
      status: "active"
    },
    {
      id: "req-103",
      title: "PHY204: Quantum Mechanics & Wave Packet Spreading",
      subject: "Physics",
      requesterName: "Liam Johnson",
      requesterYear: "Senior (4th Year)",
      requesterEmail: "liam.j@campus.edu",
      budget: "₹1,200 flat",
      budgetAmount: 1200,
      budgetType: "fixed",
      mode: "In-Person (Student Center/Lab)",
      urgency: "Urgent (Exam in 2-3 Days)",
      isUrgent: true,
      description: "Need an intensive 2-hour crash coaching session covering 1D Schrödinger equation bound states, probability currents, and harmonic oscillator ladder operators.",
      createdAt: "1 day ago",
      timestamp: Date.now() - 86400000,
      offersCount: 1,
      status: "active"
    },
    {
      id: "req-104",
      title: "CHEM210: Organic Synthesis & Reaction Mechanisms",
      subject: "Chemistry",
      requesterName: "Ananya Patel",
      requesterYear: "Sophomore (2nd Year)",
      requesterEmail: "ananya.p@campus.edu",
      budget: "₹300 / hr",
      budgetAmount: 300,
      budgetType: "hourly",
      mode: "Hybrid (Flexible)",
      urgency: "Next Week",
      isUrgent: false,
      description: "Looking for an experienced student peer who ace'd Organic Chem I & II to review Diels-Alder stereochemistry, carbonyl additions, and Grignard pathways.",
      createdAt: "2 days ago",
      timestamp: Date.now() - 172800000,
      offersCount: 4,
      status: "active"
    },
    {
      id: "req-105",
      title: "ECON301: Econometrics Regression Analysis in R",
      subject: "Economics",
      requesterName: "Marcus Brody",
      requesterYear: "Junior (3rd Year)",
      requesterEmail: "marcus.b@campus.edu",
      budget: "₹1,500 flat",
      budgetAmount: 1500,
      budgetType: "fixed",
      mode: "Online (Zoom / Meet)",
      urgency: "Flexible Schedule",
      isUrgent: false,
      description: "Need guidance debugging my OLS multivariable regression model in R Studio, checking for heteroscedasticity, multicollinearity, and interpreting dummy variables.",
      createdAt: "3 days ago",
      timestamp: Date.now() - 259200000,
      offersCount: 2,
      status: "active"
    },
    {
      id: "req-106",
      title: "ENGR220: Fluid Mechanics Navier-Stokes Solutions",
      subject: "Engineering",
      requesterName: "David Chen",
      requesterYear: "Junior (3rd Year)",
      requesterEmail: "david.c@campus.edu",
      budget: "₹450 / hr",
      budgetAmount: 450,
      budgetType: "hourly",
      mode: "In-Person (Campus Library)",
      urgency: "This Week",
      isUrgent: false,
      description: "Working on Couette and Poiseuille flow derivations using cylindrical coordinates. Looking for mechanical or civil engineering student who can tutor step-by-step.",
      createdAt: "4 days ago",
      timestamp: Date.now() - 345600000,
      offersCount: 0,
      status: "active"
    }
  ];

  // =========================================================================
  // Default Demo Members & Reports for Admin Console
  // =========================================================================
  const DEFAULT_MEMBERS = [
    {
      id: "STU-8821",
      name: "Alex Morgan",
      email: "alex.m@campus.edu",
      role: "student",
      department: "Computer Science",
      year: "Sophomore (2nd Year)",
      rating: 4.8,
      sessionsCount: 6,
      status: "active",
      strikes: 0
    },
    {
      id: "TUT-4402",
      name: "Maya Chen",
      email: "maya.c@campus.edu",
      role: "tutor",
      department: "Computer Science",
      year: "Senior (4th Year)",
      rating: 4.9,
      sessionsCount: 38,
      status: "active",
      strikes: 0
    },
    {
      id: "TUT-3190",
      name: "Dr. Vance (Staff Admin)",
      email: "admin@campus.edu",
      role: "admin",
      department: "Academic Affairs",
      year: "Staff Moderator",
      rating: 5.0,
      sessionsCount: 120,
      status: "active",
      strikes: 0
    },
    {
      id: "STU-9104",
      name: "Rohan Verma",
      email: "rohan.v@campus.edu",
      role: "student",
      department: "Mechanical Engineering",
      year: "Freshman (1st Year)",
      rating: 4.2,
      sessionsCount: 2,
      status: "warning",
      strikes: 1
    },
    {
      id: "TUT-5511",
      name: "Sarah Jenkins",
      email: "sarah.j@campus.edu",
      role: "tutor",
      department: "Mathematics",
      year: "Graduate Student",
      rating: 4.95,
      sessionsCount: 64,
      status: "active",
      strikes: 0
    }
  ];

  const DEFAULT_REPORTS = [
    {
      id: "REP-902",
      title: "Unapproved Coursework Completion Solicitation",
      targetUser: "Rohan Verma (STU-9104)",
      reporter: "Prof. Wallace (CS Faculty)",
      category: "Student Conduct",
      priority: "high",
      status: "pending",
      date: "Today at 08:30 AM",
      description: "User posted a tutoring request offering ₹2,000 for someone to complete their graded coursework directly instead of requesting conceptual coaching.",
      evidence: "Flagged keyword in description: 'complete my lab and submit the zip file'."
    },
    {
      id: "REP-884",
      title: "No-Show & Unresponsive Tutor",
      targetUser: "Karan Johal (TUT-1049)",
      reporter: "Priya Sharma (STU-7721)",
      category: "Service Conduct",
      priority: "medium",
      status: "investigating",
      date: "Yesterday",
      description: "Tutor confirmed a 2-hour Calculus prep session at the campus library, did not arrive, and did not reply to messages for 48 hours.",
      evidence: "Verified confirmed chat timestamps and reservation receipt."
    },
    {
      id: "REP-812",
      title: "Commercial Spam / Course Note Seller",
      targetUser: "Anonymous Bot (STU-9901)",
      reporter: "Alex Morgan",
      category: "Platform Abuse",
      priority: "low",
      status: "resolved",
      date: "3 days ago",
      description: "Account was mass-messaging students with external links to paid PDF note sales websites.",
      evidence: "External bit.ly redirect links flagged and blocked."
    }
  ];

  // =========================================================================
  // Default Demo Offers & Proposals
  // =========================================================================
  const DEFAULT_OFFERS = [
    {
      id: "off-101",
      requestId: "req-101",
      requestTitle: "CS201: Binary Search Trees & AVL Balancing",
      requesterName: "Alex Morgan",
      requesterEmail: "alex.m@campus.edu",
      tutorName: "Maya Chen",
      tutorContact: "maya.c@campus.edu",
      proposedRate: "₹350 / hr",
      message: "Hi Alex! I took CS201 with Prof. Wallace last fall and aced it (grade: A+). I can walk you through AVL rotations, insertion/deletion traces, and practice problems at the campus library.",
      createdAt: "1 hour ago",
      timestamp: Date.now() - 3600000,
      status: "pending"
    },
    {
      id: "off-102",
      requestId: "req-101",
      requestTitle: "CS201: Binary Search Trees & AVL Balancing",
      requesterName: "Alex Morgan",
      requesterEmail: "alex.m@campus.edu",
      tutorName: "Sarah Jenkins",
      tutorContact: "sarah.j@campus.edu",
      proposedRate: "₹400 / hr",
      message: "Available this Wednesday afternoon for a focused 2-hour crash walkthrough on tree balance factors, recursion tracing, and midterm review.",
      createdAt: "3 hours ago",
      timestamp: Date.now() - 10800000,
      status: "pending"
    },
    {
      id: "off-103",
      requestId: "req-101",
      requestTitle: "CS201: Binary Search Trees & AVL Balancing",
      requesterName: "Alex Morgan",
      requesterEmail: "alex.m@campus.edu",
      tutorName: "Rohan Verma",
      tutorContact: "rohan.v@campus.edu",
      proposedRate: "₹300 / hr",
      message: "Can do an online session tonight covering binary search tree traversals and exam prep.",
      createdAt: "Yesterday",
      timestamp: Date.now() - 86400000,
      status: "pending"
    },
    {
      id: "off-104",
      requestId: "req-102",
      requestTitle: "MATH102: Multivariable Calculus - Stokes' Theorem",
      requesterName: "Priya Sharma",
      requesterEmail: "priya.s@campus.edu",
      tutorName: "Alex Morgan",
      tutorContact: "alex.m@campus.edu",
      proposedRate: "₹400 / hr",
      message: "Hi Priya! I took Vector Calc with Prof. Gomez and got a 96%. I can walk through practice problems on Stokes' theorem and 3D surface integrals.",
      createdAt: "4 hours ago",
      timestamp: Date.now() - 14400000,
      status: "pending"
    },
    {
      id: "off-105",
      requestId: "req-104",
      requestTitle: "CHEM210: Organic Synthesis & Reaction Mechanisms",
      requesterName: "Ananya Patel",
      requesterEmail: "ananya.p@campus.edu",
      tutorName: "Alex Morgan",
      tutorContact: "alex.m@campus.edu",
      proposedRate: "₹300 / hr",
      message: "Happy to review Diels-Alder stereochemistry and Grignard reaction pathways this Thursday on campus.",
      createdAt: "2 days ago",
      timestamp: Date.now() - 172800000,
      status: "accepted"
    }
  ];

  // =========================================================================
  // Default Demo Notifications
  // =========================================================================
  const DEFAULT_NOTIFICATIONS = [
    {
      id: "notif-101",
      recipientEmail: "alex.m@campus.edu",
      type: "proposal_received",
      title: "New Proposal Received ✉️",
      message: "Maya Chen submitted an offer (₹350 / hr) for your request 'CS201: Binary Search Trees'.",
      timestamp: Date.now() - 3600000,
      timeAgo: "1 hour ago",
      isRead: false,
      link: "profile.html"
    },
    {
      id: "notif-102",
      recipientEmail: "alex.m@campus.edu",
      type: "proposal_accepted",
      title: "Proposal Accepted! 🎉",
      message: "Ananya Patel accepted your tutoring proposal for 'CHEM210: Organic Synthesis & Reaction Mechanisms'!",
      timestamp: Date.now() - 14400000,
      timeAgo: "4 hours ago",
      isRead: false,
      link: "profile.html"
    },
    {
      id: "notif-103",
      recipientEmail: "alex.m@campus.edu",
      type: "request_posted",
      title: "Request Live on Board",
      message: "Your tutoring request for CS201 is now active and receiving tutor proposals.",
      timestamp: Date.now() - 86400000,
      timeAgo: "1 day ago",
      isRead: true,
      link: "profile.html"
    }
  ];

  // =========================================================================
  // LocalStorage Helpers
  // =========================================================================
  const STORAGE_KEYS = {
    REQUESTS: "campus_tutor_requests_v2",
    OFFERS: "campus_tutor_offers_v2",
    MEMBERS: "campus_tutor_members_v2",
    REPORTS: "campus_tutor_reports_v2",
    NOTIFICATIONS: "campus_tutor_notifications_v2",
    CURRENT_USER: "campus_tutor_user_v2"
  };

  function getStoredRequests() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.REQUESTS);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.warn("Error reading stored requests", e);
    }
    // Seed default if empty
    localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(DEFAULT_REQUESTS));
    return [...DEFAULT_REQUESTS];
  }

  function saveRequest(request) {
    const list = getStoredRequests();
    const existingIndex = list.findIndex(r => r.id === request.id);
    if (existingIndex >= 0) {
      list[existingIndex] = { ...list[existingIndex], ...request };
    } else {
      list.unshift(request);
    }
    localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(list));
    dispatchStoreChange('requests', list);

    // Sync to backend API
    fetch(`${API_BASE}/requests`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request)
    }).catch(() => {});

    // Generate confirmation notification for requester
    if (request.requesterEmail) {
      saveNotification({
        recipientEmail: request.requesterEmail,
        type: "request_posted",
        title: "Request Published 🚀",
        message: `Your request "${request.title}" is now live on the marketplace.`,
        link: "profile.html"
      });
    }

    return request;
  }

  function deleteRequest(id) {
    const list = getStoredRequests().filter(r => r.id !== id);
    localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(list));
    dispatchStoreChange('requests', list);

    // Sync to backend API
    fetch(`${API_BASE}/requests/${id}`, { method: 'DELETE' }).catch(() => {});
    return true;
  }

  function getStoredOffers() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.OFFERS);
      if (data) return JSON.parse(data);
    } catch (e) {}
    localStorage.setItem(STORAGE_KEYS.OFFERS, JSON.stringify(DEFAULT_OFFERS));
    return [...DEFAULT_OFFERS];
  }

  function saveOffer(offer) {
    const offers = getStoredOffers();
    const newOffer = {
      id: "off-" + Date.now(),
      status: "pending",
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      timestamp: Date.now(),
      ...offer
    };
    offers.unshift(newOffer);
    localStorage.setItem(STORAGE_KEYS.OFFERS, JSON.stringify(offers));

    // Also increment offersCount on parent request
    const requests = getStoredRequests();
    const req = requests.find(r => r.id === offer.requestId);
    if (req) {
      req.offersCount = (req.offersCount || 0) + 1;
      localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(requests));
      dispatchStoreChange('requests', requests);

      // Save notification for the requester that a new proposal was received
      saveNotification({
        recipientEmail: req.requesterEmail,
        type: "proposal_received",
        title: "New Tutor Proposal Received ✉️",
        message: `${offer.tutorName} submitted a proposal (${offer.proposedRate}) for "${req.title}".`,
        link: "profile.html"
      });
    }

    // Sync to backend API
    fetch(`${API_BASE}/offers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newOffer)
    }).catch(() => {});

    dispatchStoreChange('offers', offers);
    return newOffer;
  }

  function acceptProposal(offerId) {
    const offers = getStoredOffers();
    const offer = offers.find(o => o.id === offerId);
    if (!offer) return false;

    offer.status = "accepted";
    localStorage.setItem(STORAGE_KEYS.OFFERS, JSON.stringify(offers));

    const currentUser = getCurrentUser();

    // 1. Notify the tutor that their proposal was accepted!
    saveNotification({
      recipientEmail: offer.tutorContact,
      type: "proposal_accepted",
      title: "Proposal Accepted! 🎉",
      message: `Your tutoring proposal for "${offer.requestTitle}" was accepted! Contact ${currentUser ? currentUser.name : 'the student'} at ${currentUser ? currentUser.email : ''} to schedule your session.`,
      link: "profile.html"
    });

    // 2. Notify the requester confirmation
    if (currentUser) {
      saveNotification({
        recipientEmail: currentUser.email,
        type: "proposal_confirmed",
        title: "Tutor Confirmed ✓",
        message: `You selected ${offer.tutorName} for "${offer.requestTitle}". Contact them at ${offer.tutorContact}.`,
        link: "profile.html"
      });
    }

    // Sync to backend API
    fetch(`${API_BASE}/offers/${offerId}/accept`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ requester: currentUser })
    }).catch(() => {});

    dispatchStoreChange('offers', offers);
    return offer;
  }

  function getProposalsForRequest(reqId) {
    const offers = getStoredOffers();
    return offers.filter(o => o.requestId === reqId);
  }

  function getProposalsSentByUser(user) {
    if (!user || !user.email) return [];
    const offers = getStoredOffers();
    return offers.filter(o => o.tutorContact && o.tutorContact.toLowerCase() === user.email.toLowerCase());
  }

  function getStoredNotifications() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
      if (data) return JSON.parse(data);
    } catch (e) {}
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(DEFAULT_NOTIFICATIONS));
    return [...DEFAULT_NOTIFICATIONS];
  }

  function saveNotification(notif) {
    const list = getStoredNotifications();
    const newNotif = {
      id: "notif-" + Date.now(),
      timestamp: Date.now(),
      timeAgo: "Just now",
      isRead: false,
      link: "profile.html",
      ...notif
    };
    list.unshift(newNotif);
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(list));
    dispatchStoreChange('notifications', list);
    if (typeof updateNavNotificationBadge === 'function') {
      updateNavNotificationBadge();
    }
    return newNotif;
  }

  function markAllNotificationsRead(userEmail) {
    const list = getStoredNotifications();
    const updated = list.map(n => {
      if (!userEmail || (n.recipientEmail && n.recipientEmail.toLowerCase() === userEmail.toLowerCase())) {
        return { ...n, isRead: true };
      }
      return n;
    });
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(updated));
    dispatchStoreChange('notifications', updated);
    if (typeof updateNavNotificationBadge === 'function') {
      updateNavNotificationBadge();
    }
  }

  function getUserNotifications(user) {
    const list = getStoredNotifications();
    if (!user || !user.email) return [];
    return list.filter(n => !n.recipientEmail || n.recipientEmail.toLowerCase() === user.email.toLowerCase());
  }

  function getStoredMembers() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.MEMBERS);
      if (data) return JSON.parse(data);
    } catch (e) {}
    localStorage.setItem(STORAGE_KEYS.MEMBERS, JSON.stringify(DEFAULT_MEMBERS));
    return [...DEFAULT_MEMBERS];
  }

  function getStoredReports() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.REPORTS);
      if (data) return JSON.parse(data);
    } catch (e) {}
    localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(DEFAULT_REPORTS));
    return [...DEFAULT_REPORTS];
  }

  function saveReport(reportData) {
    const reports = getStoredReports();
    const newReport = {
      id: "REP-" + Math.floor(Math.random() * 899 + 100),
      date: "Just now",
      status: "pending",
      priority: reportData.category && reportData.category.includes("Fraud") ? "high" : "medium",
      ...reportData
    };
    reports.unshift(newReport);
    localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(reports));
    dispatchStoreChange('reports', reports);

    // Sync to backend API
    fetch(`${API_BASE}/reports`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newReport)
    }).catch(() => {});

    return newReport;
  }

  // Auth session helpers
  function getCurrentUser() {
    try {
      const isLoggedOut = localStorage.getItem("campus_tutor_logged_out");
      if (isLoggedOut === "true") {
        return null; // Explicitly logged out
      }

      const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      if (data) {
        if (data === "null" || data === "guest") return null;
        return JSON.parse(data);
      }
    } catch (e) {}

    // First time demo user (Alex Morgan) only if not logged out
    const isInit = localStorage.getItem("campus_tutor_user_init");
    if (!isInit) {
      localStorage.setItem("campus_tutor_user_init", "true");
      const defaultUser = {
        uid: "user-alex-101",
        name: "Alex Morgan",
        email: "alex.m@campus.edu",
        role: "student",
        department: "Computer Science",
        year: "Sophomore (2nd Year)",
        rating: 4.8,
        sessionsCount: 6,
        bio: "Sophomore CS student passionate about algorithms, web systems, and collaborative peer learning."
      };
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(defaultUser));
      return defaultUser;
    }

    return null;
  }

  function setCurrentUser(user) {
    if (!user) {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
      localStorage.setItem("campus_tutor_logged_out", "true");
    } else {
      localStorage.removeItem("campus_tutor_logged_out");
      localStorage.setItem("campus_tutor_user_init", "true");
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    }
    dispatchStoreChange('user', user);
  }

  function logoutUser(e) {
    if (e && e.preventDefault) e.preventDefault();
    const isAdminPage = window.location.pathname.includes("admin");
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    localStorage.setItem("campus_tutor_logged_out", "true");
    localStorage.setItem("campus_tutor_user_init", "true");
    dispatchStoreChange('user', null);
    showToast(isAdminPage ? "Signed out of Admin Console." : "Signed out successfully.", "👋");
    setTimeout(() => {
      window.location.href = isAdminPage ? "admin-login.html" : "login.html";
    }, 450);
  }

  // =========================================================================
  // Custom Event Bus for Reactive UI Updates
  // =========================================================================
  const authListeners = [];
  function dispatchStoreChange(key, value) {
    if (key === 'user') {
      authListeners.forEach(fn => {
        try { fn(value); } catch (e) { console.error(e); }
      });
      initAuthNav();
    }
    if (key === 'notifications' || key === 'offers') {
      updateNavNotificationBadge();
    }
    window.dispatchEvent(new CustomEvent('campus_store_change', { detail: { key, value } }));
  }

  // =========================================================================
  // UI Helpers: Initials, Toast Notification
  // =========================================================================
  function getInitials(name) {
    if (!name) return "CT";
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  function showToast(message, icon = "✓") {
    let container = document.querySelector(".toast-container");
    if (!container) {
      container = document.createElement("div");
      container.className = "toast-container";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `
      <span style="font-size: 18px;">${icon}</span>
      <span>${message}</span>
    `;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(40px)";
      toast.style.transition = "all 0.3s ease";
      setTimeout(() => toast.remove(), 350);
    }, 3600);
  }

  // =========================================================================
  // Notification Modal & UI Helpers
  // =========================================================================
  function escapeHtml(text) {
    if (!text) return "";
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function updateNavNotificationBadge() {
    const user = getCurrentUser();
    const notifBtn = document.querySelector(".nav-notifications-btn");
    if (!notifBtn) return;

    if (!user || user.role === 'admin') {
      notifBtn.style.display = "none";
      return;
    }
    notifBtn.style.display = "inline-flex";

    const notifs = getUserNotifications(user);
    const unreadCount = notifs.filter(n => !n.isRead).length;

    notifBtn.innerHTML = `
      🔔 <span class="nav-notif-label">Alerts</span>
      ${unreadCount > 0 ? `<span class="notif-badge">${unreadCount}</span>` : ''}
    `;
    notifBtn.setAttribute("aria-label", `${unreadCount} unread notifications`);
  }

  function ensureNotificationModalDOM() {
    let overlay = document.getElementById("notifications-modal-overlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.id = "notifications-modal-overlay";
      overlay.className = "notif-modal-overlay";
      overlay.innerHTML = `
        <div class="notif-card" onclick="event.stopPropagation()">
          <div class="notif-header">
            <h4>🔔 Notifications <span id="notif-header-count" class="tab-badge" style="font-size: 11px; padding: 2px 7px; background: #E2E8F0; border-radius: 999px;"></span></h4>
            <div style="display: flex; gap: 8px; align-items: center;">
              <button type="button" class="btn-mark-read" id="btn-mark-all-read">Mark all read</button>
              <button type="button" class="btn-ghost" style="padding: 4px 8px; font-size: 14px; cursor: pointer; border: none; background: transparent; font-weight: 700;" id="btn-close-notif">✕</button>
            </div>
          </div>
          <div class="notif-list" id="notif-modal-list">
            <!-- Items rendered dynamically -->
          </div>
        </div>
      `;
      overlay.onclick = () => toggleNotificationsModal(false);
      document.body.appendChild(overlay);

      const closeBtn = overlay.querySelector("#btn-close-notif");
      if (closeBtn) {
        closeBtn.onclick = () => toggleNotificationsModal(false);
      }

      const markAllBtn = overlay.querySelector("#btn-mark-all-read");
      if (markAllBtn) {
        markAllBtn.onclick = () => {
          const user = getCurrentUser();
          if (user) {
            markAllNotificationsRead(user.email);
            renderNotificationsList();
            updateNavNotificationBadge();
            showToast("All notifications marked as read.", "✓");
          }
        };
      }
    }
    return overlay;
  }

  function renderNotificationsList() {
    const user = getCurrentUser();
    const listEl = document.getElementById("notif-modal-list");
    const countEl = document.getElementById("notif-header-count");
    if (!listEl) return;

    if (!user) {
      listEl.innerHTML = `
        <div style="text-align: center; padding: 30px 15px; color: #64748B;">
          <p style="font-size: 14px; margin-bottom: 10px;">Please sign in to view your notifications.</p>
          <a href="login.html" class="btn-primary" style="font-size: 12px; padding: 6px 14px; text-decoration: none;">Sign In</a>
        </div>
      `;
      if (countEl) countEl.textContent = "0";
      return;
    }

    const notifs = getUserNotifications(user);
    const unreadCount = notifs.filter(n => !n.isRead).length;
    if (countEl) countEl.textContent = unreadCount ? `${unreadCount} new` : `${notifs.length} total`;

    if (notifs.length === 0) {
      listEl.innerHTML = `
        <div style="text-align: center; padding: 36px 16px; color: #94A3B8;">
          <span style="font-size: 32px; display: block; margin-bottom: 8px;">📭</span>
          <p style="font-size: 13.5px; margin: 0; font-weight: 500;">No notifications yet</p>
          <p style="font-size: 12px; margin-top: 4px; color: #CBD5E1;">You will receive updates here when tutors propose or select your requests.</p>
        </div>
      `;
      return;
    }

    listEl.innerHTML = notifs.map(n => {
      let icon = "🔔";
      if (n.type === "proposal_received") icon = "✉️";
      else if (n.type === "proposal_accepted") icon = "🎉";
      else if (n.type === "proposal_confirmed") icon = "✓";
      else if (n.type === "request_posted") icon = "🚀";

      return `
        <a href="${n.link || 'profile.html'}" class="notif-item ${!n.isRead ? 'unread' : ''}" onclick="window.markSingleNotificationRead('${n.id}')">
          <div class="notif-item-icon">${icon}</div>
          <div class="notif-item-content">
            <h5>${escapeHtml(n.title || 'Notification')}</h5>
            <p>${escapeHtml(n.message || '')}</p>
            <span class="notif-item-time">${n.timeAgo || 'Recently'}</span>
          </div>
          ${!n.isRead ? '<span style="width: 8px; height: 8px; background: #2563EB; border-radius: 50%; align-self: center; flex-shrink: 0;"></span>' : ''}
        </a>
      `;
    }).join('');
  }

  function markSingleNotificationRead(notifId) {
    const list = getStoredNotifications();
    const target = list.find(n => n.id === notifId);
    if (target) {
      target.isRead = true;
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(list));
      dispatchStoreChange('notifications', list);
      updateNavNotificationBadge();
    }
  }

  function toggleNotificationsModal(forceState) {
    const overlay = ensureNotificationModalDOM();
    const isOpen = overlay.classList.contains("open");
    const shouldOpen = forceState !== undefined ? forceState : !isOpen;

    if (shouldOpen) {
      renderNotificationsList();
      overlay.classList.add("open");
    } else {
      overlay.classList.remove("open");
    }
  }

  // =========================================================================
  // Navbar Authentication State Updater (Separated for Student vs Admin)
  // =========================================================================
  function initAuthNav() {
    // 1. Admin Console & Admin Login Pages: Strict Isolation
    if (window.location.pathname.includes("admin.html")) {
      const user = getCurrentUser();
      const adminNameEl = document.getElementById("nav-admin-name");
      const adminAvatarEl = document.querySelector(".admin-user-pill-header .nav-avatar-mini");
      if (user && user.role === 'admin') {
        if (adminNameEl) adminNameEl.textContent = user.name;
        if (adminAvatarEl) adminAvatarEl.textContent = getInitials(user.name);
      }
      return; // Do not inject student navigation tabs
    }

    if (window.location.pathname.includes("admin-login.html")) {
      return; // Do not inject student navigation tabs
    }

    // 2. Student Platform Pages (index, browse, postrequest, profile, login)
    const nav = document.querySelector("header.site-header nav, header nav");
    if (!nav) return;

    // Remove any user avatar pills from navbar (Replaced by standard "My Profile" tab as requested)
    const userPills = nav.querySelectorAll(".nav-user-pill");
    userPills.forEach(pill => pill.remove());

    // Ensure clean, standard "My Profile" tab exists in student navigation
    let profileLink = nav.querySelector('a[href="profile.html"]');
    if (!profileLink) {
      profileLink = document.createElement("a");
      profileLink.href = "profile.html";
      profileLink.textContent = "My Profile";

      const authBtn = nav.querySelector(".nav-login-btn, .nav-signout-btn");
      if (authBtn) {
        nav.insertBefore(profileLink, authBtn);
      } else {
        nav.appendChild(profileLink);
      }
    }
    profileLink.textContent = "My Profile";
    profileLink.className = window.location.pathname.includes("profile.html") ? "active" : "";

    const user = getCurrentUser();

    if (user && user.role !== 'admin') {
      // Regular student is logged in:
      // 1. Show Notifications Bell Tab
      let notifBtn = nav.querySelector(".nav-notifications-btn");
      if (!notifBtn) {
        notifBtn = document.createElement("button");
        notifBtn.type = "button";
        notifBtn.className = "nav-notifications-btn";
        notifBtn.onclick = () => toggleNotificationsModal();
        nav.appendChild(notifBtn);
      }
      updateNavNotificationBadge();

      // 2. Show "Sign Out" button
      let signoutBtn = nav.querySelector(".nav-signout-btn");
      if (!signoutBtn) {
        signoutBtn = document.createElement("a");
        signoutBtn.href = "javascript:void(0)";
        signoutBtn.className = "nav-login-btn nav-signout-btn";
        signoutBtn.onclick = logoutUser;
        nav.appendChild(signoutBtn);
      }
      signoutBtn.textContent = "Sign Out";
      signoutBtn.title = `Signed in as ${user.name} - Click to Sign Out`;

      const signinBtn = nav.querySelector('a[href="login.html"]');
      if (signinBtn) signinBtn.remove();

    } else if (user && user.role === 'admin') {
      // Admin viewing student pages: remove notifications button & show shortcut to return to admin console
      const notifBtn = nav.querySelector(".nav-notifications-btn");
      if (notifBtn) notifBtn.remove();

      let adminShortcut = nav.querySelector(".nav-admin-shortcut");
      if (!adminShortcut) {
        adminShortcut = document.createElement("a");
        adminShortcut.href = "admin.html";
        adminShortcut.className = "nav-login-btn nav-admin-shortcut";
        adminShortcut.style.borderColor = "#3B82F6";
        adminShortcut.style.color = "#3B82F6";
        adminShortcut.textContent = "🛡️ Admin Console";
        nav.appendChild(adminShortcut);
      }

      let signoutBtn = nav.querySelector(".nav-signout-btn");
      if (!signoutBtn) {
        signoutBtn = document.createElement("a");
        signoutBtn.href = "javascript:void(0)";
        signoutBtn.className = "nav-login-btn nav-signout-btn";
        signoutBtn.onclick = logoutUser;
        nav.appendChild(signoutBtn);
      }
      signoutBtn.textContent = "Sign Out";

      const signinBtn = nav.querySelector('a[href="login.html"]');
      if (signinBtn) signinBtn.remove();

    } else {
      // Guest mode (Signed out) - remove notifications button & DO NOT show profile name or avatar card
      const notifBtn = nav.querySelector(".nav-notifications-btn");
      if (notifBtn) notifBtn.remove();

      const signoutBtn = nav.querySelector(".nav-signout-btn");
      if (signoutBtn) signoutBtn.remove();

      const adminShortcut = nav.querySelector(".nav-admin-shortcut");
      if (adminShortcut) adminShortcut.remove();

      let signinBtn = nav.querySelector('a[href="login.html"]');
      if (!signinBtn) {
        signinBtn = document.createElement("a");
        signinBtn.href = "login.html";
        nav.appendChild(signinBtn);
      }
      signinBtn.className = "nav-login-btn" + (window.location.pathname.includes("login.html") ? " active" : "");
      signinBtn.textContent = "Sign In";
    }

    // Ensure raw admin console link is removed from student nav
    const adminLink = nav.querySelector('a[href="admin.html"]:not(.nav-admin-shortcut), a[href="admin-login.html"]');
    if (adminLink) {
      adminLink.remove();
    }
  }

  // =========================================================================
  // Mock Firebase/Backend Interface (window.CampusBackend)
  // Ensures compatibility with the reference templates without requiring a real backend
  // =========================================================================
  window.CampusBackend = {
    getCurrentUser: function () {
      return getCurrentUser();
    },

    getRequests: async function () {
      return getStoredRequests();
    },

    subscribeRequests: function (callback) {
      callback(getStoredRequests());
      window.addEventListener('campus_store_change', (e) => {
        if (e.detail.key === 'requests') {
          callback(e.detail.value);
        }
      });
    },

    createRequest: async function (requestData) {
      const newRequest = {
        id: "req-" + Date.now(),
        createdAt: "Just now",
        timestamp: Date.now(),
        offersCount: 0,
        status: "active",
        ...requestData
      };
      saveRequest(newRequest);
      return newRequest;
    },

    deleteRequest: async function (id) {
      return deleteRequest(id);
    },

    submitOffer: async function (offerData) {
      return saveOffer(offerData);
    },

    updateUserProfile: async function (profileUpdates) {
      const current = getCurrentUser() || {};
      const updated = { ...current, ...profileUpdates };
      setCurrentUser(updated);
      return updated;
    },

    signInStudent: async function (email, password) {
      if (!email || !email.includes("@")) throw new Error("Invalid campus email format.");
      if (!password || password.length < 5) throw new Error("Password must be at least 6 characters.");

      const trimmedEmail = email.toLowerCase().trim();

      // Guard: Institutional admin cannot log in via student portal
      if (trimmedEmail === 'akashshelke.2607@gmail.com') {
        throw new Error("Institutional Administrator account detected. Please sign in via the Dedicated Admin Portal.");
      }

      try {
        const res = await fetch(`${API_BASE}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: trimmedEmail, password })
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Login failed.');
        }
        if (data.token) localStorage.setItem('campus_tutor_token', data.token);
        setCurrentUser(data.user);
        return data.user;
      } catch (err) {
        if (err.message && !err.message.includes('fetch') && !err.message.includes('NetworkError') && !err.message.includes('Failed to fetch')) {
          throw err;
        }
        // Local offline fallback when server is not running
        console.warn("Backend server not connected. Falling back to local demo account.");
        const user = {
          uid: "stu-" + Math.floor(Math.random() * 8999 + 1000),
          name: email.split("@")[0].replace(".", " ").replace(/\b\w/g, c => c.toUpperCase()),
          email: trimmedEmail,
          role: "student",
          department: "Computer Science",
          year: "Campus Scholar",
          rating: 4.9,
          sessionsCount: 3,
          bio: "Campus student connecting with peers for tutoring and study sessions."
        };
        setCurrentUser(user);
        return user;
      }
    },

    signUpStudent: async function ({ name, email, department, studentId, password }) {
      if (!name || !email) throw new Error("Please fill in all required fields.");
      const trimmedEmail = email.toLowerCase().trim();

      if (trimmedEmail === 'akashshelke.2607@gmail.com') {
        throw new Error("This email is reserved for institutional administration.");
      }

      try {
        const res = await fetch(`${API_BASE}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            email: trimmedEmail,
            department: department || 'General Studies',
            studentId,
            password: password || 'student123'
          })
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Registration failed.');
        }
        if (data.token) localStorage.setItem('campus_tutor_token', data.token);
        setCurrentUser(data.user);
        return data.user;
      } catch (err) {
        if (err.message && !err.message.includes('fetch') && !err.message.includes('NetworkError') && !err.message.includes('Failed to fetch')) {
          throw err;
        }
        console.warn("Backend server not connected. Falling back to local registration.");
        const user = {
          uid: "stu-" + (studentId || Math.floor(Math.random() * 8999 + 1000)),
          name: name,
          email: trimmedEmail,
          role: "student",
          department: department || "General Studies",
          year: "Student",
          rating: 5.0,
          sessionsCount: 0,
          bio: `New campus student in ${department || 'General Studies'}.`
        };
        setCurrentUser(user);
        return user;
      }
    },

    signInAdmin: async function (email, password) {
      const trimmedEmail = (email || '').toLowerCase().trim();

      // STRICT VALIDATION: Only akashshelke.2607@gmail.com is authorized
      if (trimmedEmail !== 'akashshelke.2607@gmail.com') {
        throw new Error("Access Denied: Only the designated master administrator (akashshelke.2607@gmail.com) can access the institutional console.");
      }

      try {
        const res = await fetch(`${API_BASE}/auth/admin-login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: trimmedEmail, password })
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Invalid administrator credentials.');
        }
        if (data.token) localStorage.setItem('campus_tutor_admin_token', data.token);
        setCurrentUser(data.user);
        return data.user;
      } catch (err) {
        if (err.message && !err.message.includes('fetch') && !err.message.includes('NetworkError') && !err.message.includes('Failed to fetch')) {
          throw err;
        }
        // Local offline verification fallback
        if (trimmedEmail === 'akashshelke.2607@gmail.com' && password === 'Akash1029@') {
          const adminUser = {
            uid: "adm-master-akash",
            name: "Akash Shelke",
            email: "akashshelke.2607@gmail.com",
            role: "admin",
            department: "Institutional Administration & Moderation",
            year: "Lead System Moderator",
            rating: 5.0,
            sessionsCount: 180,
            bio: "Institutional administrator overseeing peer tutor compliance and student community guidelines."
          };
          setCurrentUser(adminUser);
          return adminUser;
        }
        throw new Error("Invalid administrative credentials. Access rejected.");
      }
    },

    onAuthChange: function (callback) {
      authListeners.push(callback);
    }
  };

  // Expose Global Utilities for Inline HTML scripts
  window.getStoredRequests = getStoredRequests;
  window.saveRequest = saveRequest;
  window.deleteRequest = deleteRequest;
  window.getStoredOffers = getStoredOffers;
  window.saveOffer = saveOffer;
  window.acceptProposal = acceptProposal;
  window.getProposalsForRequest = getProposalsForRequest;
  window.getProposalsSentByUser = getProposalsSentByUser;
  window.getStoredMembers = getStoredMembers;
  window.getStoredReports = getStoredReports;
  window.saveReport = saveReport;
  window.getStoredNotifications = getStoredNotifications;
  window.getUserNotifications = getUserNotifications;
  window.saveNotification = saveNotification;
  window.markAllNotificationsRead = markAllNotificationsRead;
  window.markSingleNotificationRead = markSingleNotificationRead;
  window.toggleNotificationsModal = toggleNotificationsModal;
  window.updateNavNotificationBadge = updateNavNotificationBadge;
  window.getCurrentUser = getCurrentUser;
  window.setCurrentUser = setCurrentUser;
  window.logoutUser = logoutUser;
  window.getInitials = getInitials;
  window.showToast = showToast;
  window.initAuthNav = initAuthNav;

  // Background sync with Node.js Express Backend
  async function syncWithBackend() {
    try {
      const res = await fetch(`${API_BASE}/requests`);
      if (res.ok) {
        const requests = await res.json();
        if (Array.isArray(requests) && requests.length > 0) {
          localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(requests));
          dispatchStoreChange('requests', requests);
        }
      }
    } catch (e) {}

    try {
      const res = await fetch(`${API_BASE}/offers`);
      if (res.ok) {
        const offers = await res.json();
        if (Array.isArray(offers)) {
          localStorage.setItem(STORAGE_KEYS.OFFERS, JSON.stringify(offers));
          dispatchStoreChange('offers', offers);
        }
      }
    } catch (e) {}

    const user = getCurrentUser();
    if (user && user.email) {
      try {
        const res = await fetch(`${API_BASE}/notifications?email=${encodeURIComponent(user.email)}`);
        if (res.ok) {
          const notifs = await res.json();
          if (Array.isArray(notifs)) {
            localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifs));
            dispatchStoreChange('notifications', notifs);
          }
        }
      } catch (e) {}
    }

    if (user && user.role === 'admin') {
      try {
        const res = await fetch(`${API_BASE}/reports`);
        if (res.ok) {
          const reports = await res.json();
          if (Array.isArray(reports)) {
            localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(reports));
            dispatchStoreChange('reports', reports);
          }
        }
      } catch (e) {}

      try {
        const res = await fetch(`${API_BASE}/admin/members`);
        if (res.ok) {
          const members = await res.json();
          if (Array.isArray(members)) {
            localStorage.setItem(STORAGE_KEYS.MEMBERS, JSON.stringify(members));
            dispatchStoreChange('members', members);
          }
        }
      } catch (e) {}
    }
  }

  window.syncWithBackend = syncWithBackend;

  // Initialize navigation state and sync on load
  document.addEventListener("DOMContentLoaded", () => {
    initAuthNav();
    syncWithBackend();
  });
})();

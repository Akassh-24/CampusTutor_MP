const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const DATA_DIR = path.join(__dirname, 'data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const FILES = {
  USERS: path.join(DATA_DIR, 'users.json'),
  REQUESTS: path.join(DATA_DIR, 'requests.json'),
  OFFERS: path.join(DATA_DIR, 'offers.json'),
  REPORTS: path.join(DATA_DIR, 'reports.json'),
  NOTIFICATIONS: path.join(DATA_DIR, 'notifications.json'),
};

// Safe file reader
function readJSON(file, defaultValue = []) {
  try {
    if (!fs.existsSync(file)) {
      writeJSON(file, defaultValue);
      return defaultValue;
    }
    const content = fs.readFileSync(file, 'utf-8');
    return JSON.parse(content || '[]');
  } catch (err) {
    console.error(`Error reading ${file}:`, err);
    return defaultValue;
  }
}

// Safe atomic file writer
function writeJSON(file, data) {
  try {
    const tempFile = `${file}.tmp`;
    fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), 'utf-8');
    fs.renameSync(tempFile, file);
    return true;
  } catch (err) {
    console.error(`Error writing ${file}:`, err);
    return false;
  }
}

// Seed initial dataset if database is empty
function initDatabase() {
  // 1. Initial Users
  if (!fs.existsSync(FILES.USERS)) {
    const salt = bcrypt.genSaltSync(10);
    const defaultStudents = [
      {
        uid: "user-alex-101",
        name: "Alex Morgan",
        email: "alex.m@campus.edu",
        passwordHash: bcrypt.hashSync("student123", salt),
        role: "student",
        department: "Computer Science",
        year: "Sophomore (2nd Year)",
        rating: 4.8,
        sessionsCount: 6,
        bio: "Sophomore CS student passionate about algorithms, web systems, and collaborative peer learning.",
        createdAt: new Date().toISOString()
      },
      {
        uid: "user-maya-102",
        name: "Maya Chen",
        email: "maya.c@campus.edu",
        passwordHash: bcrypt.hashSync("student123", salt),
        role: "tutor",
        department: "Computer Science & Engineering",
        year: "Senior (4th Year)",
        rating: 4.95,
        sessionsCount: 24,
        bio: "Senior CS TA specializing in Data Structures, AVL Trees, and Python. Happy to meet in the campus library.",
        createdAt: new Date().toISOString()
      }
    ];
    writeJSON(FILES.USERS, defaultStudents);
  }

  // 2. Initial Requests
  if (!fs.existsSync(FILES.REQUESTS)) {
    const defaultRequests = [
      {
        id: "req-101",
        title: "CS201: Binary Search Trees & AVL Balancing",
        subject: "Computer Science",
        description: "Need help preparing for Friday's midterms. Specifically struggling with tree rotations and time complexity analysis of insertion/deletion. Prefer library meetup.",
        budget: "₹350 / hr",
        budgetAmount: 350,
        budgetType: "hourly",
        mode: "In-Person (Campus Library)",
        urgency: "Urgent (Exam in 2-3 Days)",
        isUrgent: true,
        requesterName: "Alex Morgan",
        requesterEmail: "alex.m@campus.edu",
        requesterYear: "Sophomore CS",
        createdAt: "2 hours ago",
        timestamp: Date.now() - 7200000,
        offersCount: 1,
        status: "active"
      },
      {
        id: "req-102",
        title: "MATH210: Multivariable Calculus (Lagrange Multipliers)",
        subject: "Mathematics",
        description: "Stuck on constrained optimization and Lagrange multiplier problem set #4. Need an experienced peer to review problem steps and graphical intuition.",
        budget: "₹500 flat",
        budgetAmount: 500,
        budgetType: "fixed",
        mode: "In-Person (Student Center / Lab)",
        urgency: "This Week",
        isUrgent: false,
        requesterName: "Rohan Verma",
        requesterEmail: "rohan.v@campus.edu",
        requesterYear: "Freshman Engineering",
        createdAt: "5 hours ago",
        timestamp: Date.now() - 18000000,
        offersCount: 0,
        status: "active"
      },
      {
        id: "req-103",
        title: "PHYS102: Electromagnetism Gauss's Law Practice",
        subject: "Physics",
        description: "Looking for someone to walk through electric flux across cylindrical and spherical Gaussian surfaces. Can do Zoom or campus student center.",
        budget: "₹400 / hr",
        budgetAmount: 400,
        budgetType: "hourly",
        mode: "Online (Zoom / Meet)",
        urgency: "Next Week",
        isUrgent: false,
        requesterName: "Sneha Patel",
        requesterEmail: "sneha.p@campus.edu",
        requesterYear: "Junior EE",
        createdAt: "1 day ago",
        timestamp: Date.now() - 86400000,
        offersCount: 0,
        status: "active"
      }
    ];
    writeJSON(FILES.REQUESTS, defaultRequests);
  }

  // 3. Initial Offers
  if (!fs.existsSync(FILES.OFFERS)) {
    const defaultOffers = [
      {
        id: "off-101",
        requestId: "req-101",
        requestTitle: "CS201: Binary Search Trees & AVL Balancing",
        requesterName: "Alex Morgan",
        requesterEmail: "alex.m@campus.edu",
        tutorName: "Maya Chen",
        tutorContact: "maya.c@campus.edu",
        proposedRate: "₹350 / hr",
        message: "Hi Alex! I took CS201 with Prof. Wallace last fall and aced it with an A+. I can walk you through AVL rotations, insertion/deletion traces, and midterms practice at the campus library.",
        createdAt: "1 hour ago",
        timestamp: Date.now() - 3600000,
        status: "pending"
      }
    ];
    writeJSON(FILES.OFFERS, defaultOffers);
  }

  // 4. Initial Reports
  if (!fs.existsSync(FILES.REPORTS)) {
    const defaultReports = [
      {
        id: "REP-901",
        title: "Academic Misconduct / Graded Assignment Cheating",
        targetUser: "Anonymous Student (STU-4412)",
        reporter: "Prof. Wallace (CS Faculty)",
        category: "Academic Fraud",
        priority: "high",
        status: "pending",
        date: "Today at 08:30 AM",
        description: "User posted a request offering ₹2,000 for someone to complete their graded coursework zip file directly instead of conceptual peer coaching.",
        evidence: "Flagged keyword in listing: 'write my code and submit the zip file'."
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
        description: "Tutor confirmed a 2-hour Calculus prep session at the campus library, did not arrive, and remained unreachable for 48 hours.",
        evidence: "Verified booking timestamps and library reservation receipt."
      }
    ];
    writeJSON(FILES.REPORTS, defaultReports);
  }

  // 5. Initial Notifications
  if (!fs.existsSync(FILES.NOTIFICATIONS)) {
    const defaultNotifications = [
      {
        id: "notif-001",
        recipientEmail: "alex.m@campus.edu",
        type: "proposal_received",
        title: "New Tutor Proposal Received ✉️",
        message: "Maya Chen submitted a proposal (₹350 / hr) for your request 'CS201: Binary Search Trees & AVL Balancing'.",
        timeAgo: "1 hour ago",
        timestamp: Date.now() - 3600000,
        isRead: false,
        link: "profile.html"
      },
      {
        id: "notif-002",
        recipientEmail: "alex.m@campus.edu",
        type: "request_posted",
        title: "Request Live on Marketplace 🚀",
        message: "Your request 'CS201: Binary Search Trees & AVL Balancing' was published and is now visible to campus tutors.",
        timeAgo: "2 hours ago",
        timestamp: Date.now() - 7200000,
        isRead: true,
        link: "profile.html"
      }
    ];
    writeJSON(FILES.NOTIFICATIONS, defaultNotifications);
  }
}

initDatabase();

// ============================================================================
// Database Helper Methods
// ============================================================================

const db = {
  // Users
  getUsers() {
    return readJSON(FILES.USERS);
  },

  findUserByEmail(email) {
    if (!email) return null;
    const users = this.getUsers();
    return users.find(u => u.email.toLowerCase() === email.toLowerCase().trim()) || null;
  },

  createUser(userData) {
    const users = this.getUsers();
    const existing = users.find(u => u.email.toLowerCase() === userData.email.toLowerCase().trim());
    if (existing) {
      throw new Error("An account with this campus email already exists.");
    }

    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(userData.password, salt);

    const newUser = {
      uid: "stu-" + Math.floor(Math.random() * 8999 + 1000),
      name: userData.name,
      email: userData.email.toLowerCase().trim(),
      passwordHash: passwordHash,
      role: "student",
      department: userData.department || "General Studies",
      year: userData.year || "Student",
      studentId: userData.studentId || `STU-${Math.floor(Math.random() * 8999 + 1000)}`,
      rating: 5.0,
      sessionsCount: 0,
      bio: `Campus student in ${userData.department || 'Undergraduate Studies'}. Connecting with peers for tutoring and study sessions.`,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    writeJSON(FILES.USERS, users);
    
    // Return sanitized user object
    const { passwordHash: _, ...sanitized } = newUser;
    return sanitized;
  },

  updateUser(email, updates) {
    const users = this.getUsers();
    const index = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase().trim());
    if (index === -1) return null;

    users[index] = { ...users[index], ...updates };
    writeJSON(FILES.USERS, users);

    const { passwordHash: _, ...sanitized } = users[index];
    return sanitized;
  },

  verifyPassword(user, password) {
    if (!user || !user.passwordHash) return false;
    return bcrypt.compareSync(password, user.passwordHash);
  },

  // Requests
  getRequests() {
    return readJSON(FILES.REQUESTS);
  },

  createRequest(reqData) {
    const requests = this.getRequests();
    const newReq = {
      id: "req-" + Date.now(),
      createdAt: "Just now",
      timestamp: Date.now(),
      offersCount: 0,
      status: "active",
      ...reqData
    };
    requests.unshift(newReq);
    writeJSON(FILES.REQUESTS, requests);

    // Also auto-generate notification for requester
    if (newReq.requesterEmail) {
      this.createNotification({
        recipientEmail: newReq.requesterEmail,
        type: "request_posted",
        title: "Request Live on Marketplace 🚀",
        message: `Your request "${newReq.title}" is now active and visible to verified peers.`,
        link: "profile.html"
      });
    }

    return newReq;
  },

  deleteRequest(id) {
    const requests = this.getRequests();
    const filtered = requests.filter(r => r.id !== id);
    writeJSON(FILES.REQUESTS, filtered);
    return true;
  },

  // Offers
  getOffers() {
    return readJSON(FILES.OFFERS);
  },

  createOffer(offerData) {
    const offers = this.getOffers();
    const newOffer = {
      id: "off-" + Date.now(),
      status: "pending",
      createdAt: "Just now",
      timestamp: Date.now(),
      ...offerData
    };
    offers.unshift(newOffer);
    writeJSON(FILES.OFFERS, offers);

    // Update request offer count
    const requests = this.getRequests();
    const req = requests.find(r => r.id === offerData.requestId);
    if (req) {
      req.offersCount = (req.offersCount || 0) + 1;
      writeJSON(FILES.REQUESTS, requests);

      // Notify requester that a tutor submitted a proposal
      this.createNotification({
        recipientEmail: req.requesterEmail,
        type: "proposal_received",
        title: "New Tutor Proposal Received ✉️",
        message: `${newOffer.tutorName} submitted a proposal (${newOffer.proposedRate}) for "${req.title}".`,
        link: "profile.html"
      });
    }

    return newOffer;
  },

  acceptOffer(offerId, currentRequester) {
    const offers = this.getOffers();
    const offer = offers.find(o => o.id === offerId);
    if (!offer) return null;

    offer.status = "accepted";
    writeJSON(FILES.OFFERS, offers);

    // 1. Notify the tutor that their proposal was accepted!
    this.createNotification({
      recipientEmail: offer.tutorContact,
      type: "proposal_accepted",
      title: "Proposal Accepted! 🎉",
      message: `Your tutoring proposal for "${offer.requestTitle}" was accepted! Contact ${currentRequester ? currentRequester.name : 'the student'} at ${currentRequester ? currentRequester.email : ''} to schedule your session.`,
      link: "profile.html"
    });

    // 2. Notify the requester confirmation
    if (currentRequester) {
      this.createNotification({
        recipientEmail: currentRequester.email,
        type: "proposal_confirmed",
        title: "Tutor Confirmed ✓",
        message: `You selected ${offer.tutorName} for "${offer.requestTitle}". Reach them at ${offer.tutorContact}.`,
        link: "profile.html"
      });
    }

    return offer;
  },

  // Reports
  getReports() {
    return readJSON(FILES.REPORTS);
  },

  createReport(reportData) {
    const reports = this.getReports();
    const newReport = {
      id: "REP-" + Math.floor(Math.random() * 899 + 100),
      date: "Just now",
      status: "pending",
      priority: reportData.category && reportData.category.includes("Fraud") ? "high" : "medium",
      ...reportData
    };
    reports.unshift(newReport);
    writeJSON(FILES.REPORTS, reports);
    return newReport;
  },

  updateReportStatus(id, status) {
    const reports = this.getReports();
    const rep = reports.find(r => r.id === id);
    if (!rep) return null;
    rep.status = status;
    writeJSON(FILES.REPORTS, reports);
    return rep;
  },

  // Notifications
  getNotifications(recipientEmail) {
    const notifs = readJSON(FILES.NOTIFICATIONS);
    if (!recipientEmail) return notifs;
    return notifs.filter(n => !n.recipientEmail || n.recipientEmail.toLowerCase() === recipientEmail.toLowerCase().trim());
  },

  createNotification(notifData) {
    const notifs = readJSON(FILES.NOTIFICATIONS);
    const newNotif = {
      id: "notif-" + Date.now(),
      timestamp: Date.now(),
      timeAgo: "Just now",
      isRead: false,
      link: "profile.html",
      ...notifData
    };
    notifs.unshift(newNotif);
    writeJSON(FILES.NOTIFICATIONS, notifs);
    return newNotif;
  },

  markNotificationsRead(recipientEmail, notifId = null) {
    const notifs = readJSON(FILES.NOTIFICATIONS);
    const updated = notifs.map(n => {
      const matchUser = !recipientEmail || (n.recipientEmail && n.recipientEmail.toLowerCase() === recipientEmail.toLowerCase().trim());
      const matchId = !notifId || n.id === notifId;
      if (matchUser && matchId) {
        return { ...n, isRead: true };
      }
      return n;
    });
    writeJSON(FILES.NOTIFICATIONS, updated);
    return updated;
  }
};

module.exports = db;

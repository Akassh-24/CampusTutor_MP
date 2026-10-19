const express = require('express');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const db = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'campus_tutor_secure_jwt_secret_2026';

// STRICT ADMIN CREDENTIALS CONFIGURATION
const MASTER_ADMIN = {
  email: (process.env.ADMIN_EMAIL || 'akashshelke.2607@gmail.com').toLowerCase().trim(),
  password: process.env.ADMIN_PASSWORD || 'Akash1029@',
  name: 'Akash Shelke',
  role: 'admin',
  department: 'Institutional Administration & Moderation',
  year: 'Lead System Moderator'
};

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend static files
app.use(express.static(path.join(__dirname)));

// Helper: Token generator
function generateToken(user) {
  return jwt.sign(
    { uid: user.uid, email: user.email, role: user.role, name: user.name },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

// Helper: Authentication Middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    req.user = null;
    return next();
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      req.user = null;
    } else {
      req.user = decoded;
    }
    next();
  });
}

app.use(authenticateToken);

// ============================================================================
// 1. HEALTH CHECK & SYSTEM STATUS
// ============================================================================
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Campus-Tutor API Server',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    adminConfigured: MASTER_ADMIN.email
  });
});

// ============================================================================
// 2. AUTHENTICATION ROUTES (Student & Strictly Restricted Admin)
// ============================================================================

// Student Registration
app.post('/api/auth/register', (req, res) => {
  try {
    const { name, email, password, department, studentId, year } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required.' });
    }

    if (!email.includes('@')) {
      return res.status(400).json({ error: 'Please enter a valid campus email address.' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
    }

    // Do not allow regular registration with master admin email
    if (email.toLowerCase().trim() === MASTER_ADMIN.email) {
      return res.status(400).json({ error: 'This email is reserved for institutional administration.' });
    }

    const newUser = db.createUser({
      name,
      email,
      password,
      department: department || 'General Studies',
      studentId,
      year: year || 'Student'
    });

    const token = generateToken(newUser);

    res.status(201).json({
      success: true,
      message: `Account created successfully. Welcome, ${newUser.name}!`,
      user: newUser,
      token
    });
  } catch (err) {
    res.status(400).json({ error: err.message || 'Registration failed.' });
  }
});

// Student Login (Email & Password Only)
app.post('/api/auth/login', (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    // Check if user is attempting admin login through student portal
    if (email.toLowerCase().trim() === MASTER_ADMIN.email) {
      return res.status(403).json({
        error: 'Institutional Administrator account detected. Please sign in via the Dedicated Admin Portal.'
      });
    }

    const user = db.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'No student account found with this email. Please create an account.' });
    }

    const isMatch = db.verifyPassword(user, password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Incorrect password. Please verify your credentials.' });
    }

    const { passwordHash: _, ...sanitizedUser } = user;
    const token = generateToken(sanitizedUser);

    res.json({
      success: true,
      message: `Welcome back, ${sanitizedUser.name}!`,
      user: sanitizedUser,
      token
    });
  } catch (err) {
    res.status(500).json({ error: 'Login error occurred. Please try again.' });
  }
});

// STRICT ADMIN LOGIN - ONLY akashshelke.2607@gmail.com WITH Akash1029@
app.post('/api/auth/admin-login', (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Admin email and master password are required.' });
    }

    const inputEmail = email.toLowerCase().trim();

    // STRICT CHECK 1: Must be exactly the designated admin email
    if (inputEmail !== MASTER_ADMIN.email) {
      return res.status(401).json({
        error: 'Access Denied: Only the designated institutional administrator (akashshelke.2607@gmail.com) is permitted to access the admin console.'
      });
    }

    // STRICT CHECK 2: Password must match exactly
    if (password !== MASTER_ADMIN.password) {
      return res.status(401).json({
        error: 'Invalid administrative master key. Access rejected.'
      });
    }

    // Clearance Verified
    const adminUser = {
      uid: 'adm-master-akash',
      name: MASTER_ADMIN.name,
      email: MASTER_ADMIN.email,
      role: 'admin',
      department: MASTER_ADMIN.department,
      year: MASTER_ADMIN.year,
      rating: 5.0,
      sessionsCount: 180,
      bio: 'Institutional Administrator & System Moderator overseeing peer tutoring compliance and dispute resolution.'
    };

    const token = generateToken(adminUser);

    res.json({
      success: true,
      message: 'Master Administrator clearance verified. Welcome, Akash Shelke!',
      user: adminUser,
      token
    });
  } catch (err) {
    res.status(500).json({ error: 'Admin authentication server error.' });
  }
});

// Update Profile Details
app.put('/api/auth/profile', (req, res) => {
  try {
    const { email, name, department, year, bio } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'User email is required.' });
    }

    const updated = db.updateUser(email, { name, department, year, bio });
    if (!updated) {
      return res.status(404).json({ error: 'User not found.' });
    }

    res.json({
      success: true,
      message: 'Profile updated successfully.',
      user: updated
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update profile.' });
  }
});

// ============================================================================
// 3. TUTORING REQUESTS ROUTES
// ============================================================================

// Get all requests
app.get('/api/requests', (req, res) => {
  try {
    const requests = db.getRequests();
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch requests.' });
  }
});

// Create new tutoring request
app.post('/api/requests', (req, res) => {
  try {
    const { title, subject, description, budget, budgetAmount, budgetType, mode, urgency, isUrgent, requesterName, requesterEmail, requesterYear } = req.body;

    if (!title || !subject || !description) {
      return res.status(400).json({ error: 'Title, subject, and description are required.' });
    }

    const newRequest = db.createRequest({
      title,
      subject,
      description,
      budget: budget || '₹350 / hr',
      budgetAmount: Number(budgetAmount) || 350,
      budgetType: budgetType || 'hourly',
      mode: mode || 'In-Person (Campus Library)',
      urgency: urgency || 'This Week',
      isUrgent: Boolean(isUrgent),
      requesterName: requesterName || 'Campus Student',
      requesterEmail: requesterEmail || '',
      requesterYear: requesterYear || 'Student'
    });

    res.status(201).json({
      success: true,
      message: 'Tutoring request published successfully!',
      request: newRequest
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create request.' });
  }
});

// Delete tutoring request
app.delete('/api/requests/:id', (req, res) => {
  try {
    const { id } = req.params;
    db.deleteRequest(id);
    res.json({ success: true, message: 'Request removed from board.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete request.' });
  }
});

// ============================================================================
// 4. TUTOR OFFERS & PROPOSALS ROUTES
// ============================================================================

// Get offers
app.get('/api/offers', (req, res) => {
  try {
    const { requestId, tutorContact } = req.query;
    let offers = db.getOffers();

    if (requestId) {
      offers = offers.filter(o => o.requestId === requestId);
    }
    if (tutorContact) {
      offers = offers.filter(o => o.tutorContact && o.tutorContact.toLowerCase() === tutorContact.toLowerCase().trim());
    }

    res.json(offers);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch offers.' });
  }
});

// Submit tutor proposal
app.post('/api/offers', (req, res) => {
  try {
    const { requestId, requestTitle, tutorName, tutorContact, proposedRate, message } = req.body;

    if (!requestId || !tutorName || !tutorContact || !proposedRate || !message) {
      return res.status(400).json({ error: 'All proposal fields are required.' });
    }

    const newOffer = db.createOffer({
      requestId,
      requestTitle: requestTitle || 'Tutoring Request',
      tutorName,
      tutorContact,
      proposedRate,
      message
    });

    res.status(201).json({
      success: true,
      message: 'Proposal submitted! The student has been notified.',
      offer: newOffer
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit proposal.' });
  }
});

// Accept a proposal
app.post('/api/offers/:id/accept', (req, res) => {
  try {
    const { id } = req.params;
    const { requester } = req.body;

    const accepted = db.acceptOffer(id, requester);
    if (!accepted) {
      return res.status(404).json({ error: 'Proposal not found.' });
    }

    res.json({
      success: true,
      message: `Proposal accepted! ${accepted.tutorName} has been notified.`,
      offer: accepted
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to accept proposal.' });
  }
});

// ============================================================================
// 5. INCIDENT REPORTS ROUTES (Moderation)
// ============================================================================

// Get all reports
app.get('/api/reports', (req, res) => {
  try {
    const reports = db.getReports();
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch incident reports.' });
  }
});

// File report on fraudulent request
app.post('/api/reports', (req, res) => {
  try {
    const { title, targetUser, reporter, category, description, evidence, priority } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required.' });
    }

    const newReport = db.createReport({
      title,
      targetUser: targetUser || 'Unspecified User',
      reporter: reporter || 'Anonymous Student',
      category: category || 'Academic Fraud',
      description,
      evidence: evidence || 'Reported directly from marketplace listing.',
      priority: priority || (category && category.includes('Fraud') ? 'high' : 'medium')
    });

    res.status(201).json({
      success: true,
      message: 'Report filed with campus moderation.',
      report: newReport
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to file report.' });
  }
});

// Update report status
app.put('/api/reports/:id/status', (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updated = db.updateReportStatus(id, status);
    if (!updated) {
      return res.status(404).json({ error: 'Report not found.' });
    }

    res.json({
      success: true,
      message: `Report status updated to ${status}.`,
      report: updated
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update report status.' });
  }
});

// ============================================================================
// 6. NOTIFICATIONS ROUTES
// ============================================================================

// Get user notifications
app.get('/api/notifications', (req, res) => {
  try {
    const { email } = req.query;
    const notifs = db.getNotifications(email);
    res.json(notifs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch notifications.' });
  }
});

// Mark notifications read
app.put('/api/notifications/mark-read', (req, res) => {
  try {
    const { email, notifId } = req.body;
    const updated = db.markNotificationsRead(email, notifId);
    res.json({ success: true, notifications: updated });
  } catch (err) {
    res.status(500).json({ error: 'Failed to mark notifications read.' });
  }
});

// ============================================================================
// 7. ADMIN MANAGEMENT ROUTES
// ============================================================================

// Get members directory
app.get('/api/admin/members', (req, res) => {
  try {
    const users = db.getUsers().map(({ passwordHash: _, ...u }) => ({
      id: u.uid || u.studentId,
      name: u.name,
      email: u.email,
      department: u.department,
      year: u.year,
      role: u.role || 'student',
      rating: u.rating || 5.0,
      sessionsCount: u.sessionsCount || 0,
      strikes: u.strikes || 0,
      status: u.status || 'active'
    }));
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load member directory.' });
  }
});

// Update member role (e.g. promote to tutor)
app.put('/api/admin/members/:id/role', (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    const users = db.getUsers();
    const user = users.find(u => u.uid === id || u.studentId === id || u.email === id);
    if (!user) {
      return res.status(404).json({ error: 'Member not found.' });
    }

    const updated = db.updateUser(user.email, { role });
    res.json({ success: true, message: `Member role updated to ${role}.`, user: updated });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update member role.' });
  }
});

// Suspend / activate member
app.put('/api/admin/members/:id/status', (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const users = db.getUsers();
    const user = users.find(u => u.uid === id || u.studentId === id || u.email === id);
    if (!user) {
      return res.status(404).json({ error: 'Member not found.' });
    }

    const updated = db.updateUser(user.email, { status });
    res.json({ success: true, message: `Member status set to ${status}.`, user: updated });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update member status.' });
  }
});

// Fallback: Serve index.html for root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start listening
app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🚀 Campus-Tutor Server is running on port: ${PORT}`);
  console.log(`🌐 Base URL: http://localhost:${PORT}`);
  console.log(`🛡️ Master Admin Configured: ${MASTER_ADMIN.email}`);
  console.log(`📁 Database Storage Path: ${path.join(__dirname, 'data')}`);
  console.log(`=======================================================`);
});

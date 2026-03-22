/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║   Viara Studios — Backend Server                             ║
 * ║   Designed & Developed by: Garvit Arora                      ║
 * ║   All rights reserved © 2026                                 ║
 * ╚══════════════════════════════════════════════════════════════╝
 *
 * Minimal Express backend for the Viara Studios portfolio project.
 * Serves the static frontend and provides a contact form API.
 *
 * Setup:
 *   npm install
 *   node server.js
 *
 * Then visit: http://localhost:3000
 */

const express = require('express');
const path    = require('path');
const fs      = require('fs');

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve the frontend folder as static files
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// ── In-memory message store (resets on server restart) ────────────────────────
// For a real project, replace with a database (MongoDB, SQLite, etc.)
const messages = [];

// ── API Routes ────────────────────────────────────────────────────────────────

/**
 * POST /api/contact
 * Receives a message from the contact form.
 * Validates fields, saves to in-memory store, and logs to a local JSON file.
 */
app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      error: 'Name, email, and message are required.'
    });
  }

  // Simple email format check
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRe.test(email)) {
    return res.status(400).json({ success: false, error: 'Invalid email address.' });
  }

  const entry = {
    id:        messages.length + 1,
    name:      name.trim(),
    email:     email.trim().toLowerCase(),
    subject:   (subject || 'General').trim(),
    message:   message.trim(),
    receivedAt: new Date().toISOString()
  };

  messages.push(entry);
  console.log(`\n[Contact] New message from ${entry.name} <${entry.email}>`);
  console.log(`          Subject : ${entry.subject}`);
  console.log(`          Message : ${entry.message.substring(0, 80)}…\n`);

  // Persist to a local file (optional, survives server restarts)
  try {
    const logPath = path.join(__dirname, 'messages.json');
    const existing = fs.existsSync(logPath)
      ? JSON.parse(fs.readFileSync(logPath, 'utf8'))
      : [];
    existing.push(entry);
    fs.writeFileSync(logPath, JSON.stringify(existing, null, 2));
  } catch (err) {
    // Non-fatal — the in-memory store already has the entry
    console.warn('[Warning] Could not write to messages.json:', err.message);
  }

  return res.status(200).json({
    success: true,
    message: 'Message received. Garvit will get back to you soon!'
  });
});

/**
 * GET /api/messages
 * Returns all stored contact messages.
 * Protected by a simple admin token (set ADMIN_TOKEN env variable).
 * Usage: GET /api/messages?token=your_secret
 */
app.get('/api/messages', (req, res) => {
  const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'viara-admin-2026';
  if (req.query.token !== ADMIN_TOKEN) {
    return res.status(401).json({ success: false, error: 'Unauthorized.' });
  }
  return res.json({ success: true, count: messages.length, messages });
});

/**
 * GET /api/health
 * Simple health-check endpoint.
 */
app.get('/api/health', (req, res) => {
  res.json({
    status:  'ok',
    project: 'Viara Studios',
    author:  'Garvit Arora',
    uptime:  Math.round(process.uptime()) + 's'
  });
});

// ── Catch-all: serve index.html for any unknown route ────────────────────────
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log('');
  console.log('  ╔══════════════════════════════════════════════╗');
  console.log('  ║   Viara Studios — Server Running             ║');
  console.log(`  ║   http://localhost:${PORT}                       ║`);
  console.log('  ║   Author: Garvit Arora                       ║');
  console.log('  ╚══════════════════════════════════════════════╝');
  console.log('');
});

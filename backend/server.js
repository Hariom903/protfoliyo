const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Setup
const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database', err);
    } else {
        console.log('Connected to SQLite database.');
        
        // Initialize Tables
        db.serialize(() => {
            // Projects Table
            db.run(`CREATE TABLE IF NOT EXISTS projects (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT,
                tag TEXT,
                techStack TEXT,
                link TEXT,
                desc TEXT,
                code TEXT
            )`);
            
            // Skills Table
            db.run(`CREATE TABLE IF NOT EXISTS skills (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                icon TEXT
            )`);
            
            // Messages Table
            db.run(`CREATE TABLE IF NOT EXISTS messages (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                email TEXT,
                phone TEXT,
                message TEXT,
                status TEXT DEFAULT 'new',
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )`);
        });
    }
});

// --- API Endpoints ---

// 1. Projects
app.get('/api/projects', (req, res) => {
    db.all('SELECT * FROM projects', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.post('/api/projects', (req, res) => {
    const { title, tag, techStack, link, desc, code } = req.body;
    db.run(
        'INSERT INTO projects (title, tag, techStack, link, desc, code) VALUES (?, ?, ?, ?, ?, ?)',
        [title, tag, techStack, link, desc, code],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID });
        }
    );
});

app.delete('/api/projects/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM projects WHERE id = ?', id, function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ deleted: this.changes });
    });
});

// 2. Skills
app.get('/api/skills', (req, res) => {
    db.all('SELECT * FROM skills', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.post('/api/skills', (req, res) => {
    const { name, icon } = req.body;
    db.run(
        'INSERT INTO skills (name, icon) VALUES (?, ?)',
        [name, icon],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID });
        }
    );
});

app.delete('/api/skills/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM skills WHERE id = ?', id, function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ deleted: this.changes });
    });
});

// 3. Messages (Contact Form)
app.get('/api/messages', (req, res) => {
    db.all('SELECT * FROM messages ORDER BY created_at DESC', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.post('/api/messages', (req, res) => {
    const { name, email, phone, message } = req.body;
    db.run(
        'INSERT INTO messages (name, email, phone, message) VALUES (?, ?, ?, ?)',
        [name, email, phone, message],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID });
        }
    );
});

app.delete('/api/messages/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM messages WHERE id = ?', id, function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ deleted: this.changes });
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

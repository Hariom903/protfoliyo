const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

const projectsData = [
    {
        tag: 'Laravel',
        title: 'Restaurant Food Order & Table Booking',
        desc: 'Developed a dual-role platform for Admin and Users with real-time order tracking. Implemented email notifications and Laravel Pusher for instant updates. Streamlined the dining experience with table reservation and order management features.',
        techStack: 'Laravel, MySQL, Pusher, Email Notification',
        link: '#',
        code: 'https://github.com/hariom903/restaurant-booking'
    },
    {
        tag: 'Laravel',
        title: 'SK AutoService CRM',
        desc: 'Developed a multi-role CRM to manage garage operations including billing and inventory. Integrated Razorpay payment gateway and Twilio API for live chat support. Designed backend architecture and managed hosting via cPanel.',
        techStack: 'Laravel, MySQL, Bootstrap, JavaScript, Socket.io, Razorpay, Twilio',
        link: '#',
        code: 'https://github.com/hariom903/autoservice-crm'
    },
    {
        tag: 'Backend',
        title: 'Toll Management System API',
        desc: 'Architected a scalable REST API to manage high-volume toll operations and daily audits. Engineered a secure geolocation-based attendance system integrated with Python-driven Facial Recognition. Built asynchronous data pipelines for massive Excel processing. Integrated Aadhaar KYC (DIGIO) and ensured enterprise security with strict RBAC.',
        techStack: 'Laravel, PHP 8.2, Python, AWS S3, MySQL, REST API',
        link: '#',
        code: 'https://github.com/Hariom903/mypro'
    },
    {
        tag: 'MERN',
        title: 'Tender Management Web App',
        desc: 'Developed a full-stack web application using the MERN stack. Implemented secure authentication using JWT. Designed REST APIs, managed database schemas, and performed CRUD operations with dynamic front-end integration.',
        techStack: 'React, Node.js, Express, MongoDB, JWT',
        link: '#',
        code: 'https://github.com/hariom903/tender-management'
    }
];

const messagesData = [
    { name: 'John Doe', email: 'john@example.com', phone: '1234567890', message: 'Hello, I loved your portfolio and would like to hire you for a project.', status: 'new' },
    { name: 'Jane Smith', email: 'jane@example.com', phone: '0987654321', message: 'Can you help us build a Laravel CRM?', status: 'read' }
];

db.serialize(() => {
    
    // Attempt to add new columns to projects table. 
    // Ignore errors if they already exist.
    db.run("ALTER TABLE projects ADD COLUMN desc TEXT", (err) => {});
    db.run("ALTER TABLE projects ADD COLUMN code TEXT", (err) => {});

    db.run("BEGIN TRANSACTION");
    
    const projectStmt = db.prepare("INSERT INTO projects (title, tag, techStack, link, desc, code) VALUES (?, ?, ?, ?, ?, ?)");
    projectsData.forEach(p => {
        projectStmt.run(p.title, p.tag, p.techStack, p.link, p.desc, p.code);
    });
    projectStmt.finalize();

    const msgStmt = db.prepare("INSERT INTO messages (name, email, phone, message, status) VALUES (?, ?, ?, ?, ?)");
    messagesData.forEach(m => {
        msgStmt.run(m.name, m.email, m.phone, m.message, m.status);
    });
    msgStmt.finalize();

    db.run("COMMIT", (err) => {
        if(err) {
            console.error("Error committing transaction:", err);
        } else {
            console.log("Successfully seeded projects and messages into the database.");
        }
        db.close();
    });
});

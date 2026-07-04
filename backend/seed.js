const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

const skillsPath = path.resolve(__dirname, '../skills.json');
const skillsData = JSON.parse(fs.readFileSync(skillsPath, 'utf8'));

db.serialize(() => {
    db.run("BEGIN TRANSACTION");
    const stmt = db.prepare("INSERT INTO skills (name, icon) VALUES (?, ?)");
    
    skillsData.forEach(skill => {
        stmt.run(skill.name, skill.icon);
    });
    
    stmt.finalize();
    db.run("COMMIT", (err) => {
        if(err) {
            console.error("Error committing transaction:", err);
        } else {
            console.log("Successfully seeded skills into the database.");
        }
        db.close();
    });
});

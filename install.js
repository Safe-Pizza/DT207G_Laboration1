const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./db/courses.db");

db.serialize(() => {
    db.run(`DROP TABLE IF EXISTS course;`);
    db.run(`
        CREATE TABLE course (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        course_code TEXT NOT NULL,
        course_name TEXT NOT NULL,
        course_progression TEXT NOT NULL,
        course_syllabus TEXT NOT NULL,
        user_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
        )`);
});

db.close();
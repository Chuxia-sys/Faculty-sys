const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
const path = require("path");

// Ensure database directory exists
const dbDir = path.join(__dirname, "database");
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new sqlite3.Database("./database/users.db", (err) => {
  if (err) {
    console.log("Error connecting to database:", err.message);
  } else {
    console.log("Connected to SQLite database.");
  }
});

db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT
  )
`, (err) => {
  if (err) {
    console.error("Error creating table:", err.message);
  } else {
    console.log("Users table ready.");
  }
});

module.exports = db;
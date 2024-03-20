const sqlite3 = require('sqlite3').verbose();
const path = require('path');


// Construct the absolute path to the SQLite database file
const dbPath = path.join(__dirname, '..', 'data', 'mydb.db');

// Create or open SQLite database
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to SQLite database');
        createTables(); // Call the function to create tables
    }
});

// Function to create tables
function createTables() {
    db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      workname TEXT NOT NULL UNIQUE,
      county TEXT NOT NULL
    )
  `, (err) => {
        if (err) {
            console.error('Error creating users table:', err.message);
        } else {
            console.log('Users table created successfully');
        }
    });
}

// Function to add user to the database
function addUser(userData, event) {
    let { name, workname, county } = userData;
    name = name.toLowerCase();
    workname = workname.toLowerCase();
    county = county.toLowerCase();
    
    db.run(`
    INSERT INTO users (name, workname, county)
    VALUES (?, ?, ?)
  `, [name, workname, county], (err) => {
        if (err) {
            console.error('Error adding user data:', err.message);
            event.reply('add-user-response', { error: err.message });
        } else {
            console.log('User data added successfully');
            event.reply('add-user-response', { success: true });
        }
    });
}

// Function to fetch all users from the database
function getUsers(event) {
    db.all('SELECT * FROM users', (err, rows) => {
        if (err) {
            console.error('Error fetching users:', err.message);
            event.reply('get-users-response', { error: err.message });
        } else {
            event.reply('get-users-response', rows);
        }
    });
}

module.exports = {
    createTables,
    addUser,
    getUsers,
};

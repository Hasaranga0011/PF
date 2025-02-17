const db = require('../config/db'); // MySQL Connection

// Create a new user
const createUser = async (username, email, password) => {
    const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    return new Promise((resolve, reject) => {
        db.query(sql, [username, email, password], (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
};

// Find user by email
const getUserByEmail = async (email) => {
    const sql = 'SELECT * FROM users WHERE email = ?';
    return new Promise((resolve, reject) => {
        db.query(sql, [email], (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
};

module.exports = { createUser, getUserByEmail };

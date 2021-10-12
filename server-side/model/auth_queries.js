const pool = require('./db_connection');

// Add a new user in database
const createUser = (user) => {
    return new Promise((resolve, reject) => {
        const created_on = new Date().toLocaleDateString();
        const {username, password, email} = user;
        pool.query('INSERT INTO accounts (username, password, email, created_on) VALUES ($1, $2, $3, $4)', [username, password, email, created_on], (error, results) => {
            if (error) {
                reject(error);
            }
            resolve('Signup successfully');
        });
    });
}

// This is for "signup"
const getOneByEmailAndUsername = (email, username) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT (SELECT email FROM accounts WHERE email = $1) as email, (SELECT username FROM accounts WHERE username = $2) as username FROM accounts LIMIT 1', 
            [email, username], (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results.rows[0]);
        })
    })
}
// This is for "login"
const getOneByUsername = (username) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT user_id, username, password FROM accounts  WHERE username = $1', [username], (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results.rows[0]);
        })
    })
}

module.exports = {
    createUser,
    getOneByEmailAndUsername,
    getOneByUsername,
};
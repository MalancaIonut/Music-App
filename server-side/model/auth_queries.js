const pool = require('./db_connection');

const createUser = (user) => {
    return new Promise((resolve, reject) => {
        const created_on = new Date().toLocaleDateString();
        const {username, password, email} = user;
        pool.query('INSERT INTO accounts (username, password, email, created_on) VALUES ($1, $2, $3, $4) RETURNING *', [username, password, email, created_on], (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results.rows[0]);
        });
    });
}

const getOneByEmailAndUsername = (email, username) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT (SELECT email FROM accounts WHERE email = $1) as email, (SELECT username FROM accounts WHERE username = $2) as username FROM accounts LIMIT 1', 
            [email, username], (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results.rows[0]);
        });
    });
}

const getOneUserByUsername = (username) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM accounts JOIN account_roles ON accounts.user_id = account_roles.user_id WHERE username = $1', [username], (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results.rows[0]);
        });
    });
}

const addRole = (id) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO account_roles (user_id, role_id) VALUES ($1, $2)', [id, 1], (error, results) => {
            if (error) {
                reject(error);
            }
            resolve('ADD ROLE DONE');
        });
    });
}

const addVote = (id) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO account_votes (user_id, track_ids) VALUES ($1, DEFAULT)', [id], (error, results) => {
            if (error) {
                reject(error);
            }
            resolve('ADD VOTE DONE');
        });
    });
}

module.exports = {
    addVote,
    createUser,
    getOneByEmailAndUsername,
    getOneUserByUsername,
    addRole,
};
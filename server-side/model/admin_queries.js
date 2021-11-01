const pool = require('./db_connection');

const addInVote = (id) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO musictracks_votes (track_id, track_votes) VALUES ($1, DEFAULT)', [id], (error, results) => {
            if (error) {
                reject(error);
            }
            resolve('INSERTED DONE');
        });
    });
}

const getOneById = (id) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT role_id FROM account_roles WHERE user_id = $1 LIMIT 1', [id], (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results.rows[0])
        });
    });
}

const createTrack = (body) => {
    return new Promise((resolve, reject) => {
        const {artist, title, link} = body;
        pool.query('INSERT INTO musictracks (artist, title, link) VALUES ($1, $2, $3) RETURNING *' , [artist, title, link], (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results.rows[0]);
        });
    });
}

const getAllTracks = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM musictracks', (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results.rows);
        });
    });
}

const getAllUsersAndRoles = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM accounts JOIN account_roles ON accounts.user_id = account_roles.user_id', (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results.rows);
        });
    });
}

const deleteUser = (user_id) => {
    return new Promise((resolve, reject) => {
        const id = parseInt(user_id);
        pool.query('DELETE FROM accounts WHERE user_id = $1', [id], (error, results) => {
            if (error) {
                reject(error);
            }
            resolve('DELETE DONE');
        });
    });
}

const updateRole = (user_id, role_id) => {
    return new Promise((resolve, reject) => {
        const id = parseInt(user_id);
        var role = 0;
        if (parseInt(role_id) === 1) {
            role = 2;
        } else {
            role = 1;
        }
        pool.query('UPDATE account_roles SET role_id = $1 WHERE user_id = $2', [role, id], (error, results) => {
            if (error) {
                reject(error);
            }
            resolve('UPDATE DONE');
        });
    });
}

module.exports = {
    addInVote,
    getOneById,
    createTrack,
    getAllTracks,
    getAllUsersAndRoles,
    deleteUser,
    updateRole,
}
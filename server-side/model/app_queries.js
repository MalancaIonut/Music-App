const pool = require('./db_connection');

const allSongs = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM musictracks', (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results.rows);
        });
    });
}

const trackVotes = (track_id) => {
    return new Promise((resolve, reject) => {
        const id = parseInt(track_id);
        pool.query('UPDATE musictracks_votes SET track_votes = track_votes + 1 WHERE track_id = $1', [id], (error, results) => {
            if (error) {
                reject(error);
            }
            resolve('VOTE UPDATE DONE !');
        });
    });
}

const userVotes = (track_id, user_id) => {
    return new Promise((resolve, reject) => {
        const trackId = parseInt(track_id);
        const userId = parseInt(user_id);
        pool.query('UPDATE account_votes SET track_ids = array_append(track_ids, $1) WHERE user_id = $2', [trackId, userId], (error, results) => {
            if (error) {
                reject(error);
            }
            resolve('INSERTED IN USER VOTE TABLE');
        });
    });
}

const getUserVotes = (id) => {
    return new Promise((resolve, reject) => {
        const user_id = parseInt(id);
        pool.query('SELECT track_ids FROM account_votes WHERE user_id = $1', [user_id], (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results.rows[0]);
        });
    });
}

const getTop = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM musictracks JOIN musictracks_votes ON musictracks.track_id = musictracks_votes.track_id ORDER BY track_votes DESC LIMIT 15', (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results.rows);
        });
    });
}
module.exports = {
    getTop,
    getUserVotes,
    userVotes,
    allSongs,
    trackVotes,
}
const pool = require('../model/admin_queries');

function alreadyLoggedIn(req, res, next) {
    if (req.signedCookies.user_id) {
        res.redirect('/');
    } else {
        next();
    }
}

function ensureLoggedIn(req, res, next) {
    if (req.signedCookies.user_id) {
        next();
    } else {
        res.redirect('auth/login');
    }
}

function ensureAuthorization(req, res, next) {
    pool.getOneById(req.signedCookies.user_id)
    .then(response => {
        if (response.role_id === 2) {
            next();
        } else {
            next(new Error('Un-Authorized ! Not admin'));
        }
    })
    .catch(error => {
        next(new Error('Something gone wrong ! Admin check'));
    });
}

module.exports = {
    ensureLoggedIn,
    ensureAuthorization,
    alreadyLoggedIn,
};
const express = require('express');
const router = express.Router();
const query = require('../model/auth_queries');
const bcrypt = require('bcrypt');
const authMiddleware = require('./middleware');

router.get('/', authMiddleware.alreadyLoggedIn, (req, res) => {
    res.render('auth');
});

router.get('/successfully', authMiddleware.alreadyLoggedIn, (req, res) => {
    res.render('message', {message: 'Successfully created account !'});
});

router.post('/signup', authMiddleware.alreadyLoggedIn, (req, res, next) => {
    if(valid_user(req.body) && valid_email(req.body.email)) {
        // check if email and username its allready used
        query.getOneByEmailAndUsername(req.body.email, req.body.username)
        .then(response => {
            if (response === undefined || (response.email == null && response.username == null)) {
                bcrypt.hash(req.body.password, 10)
                .then(hash => {
                    const user = {
                        username: req.body.username,
                        email: req.body.email,
                        password: hash
                    }
                    query.createUser(user)
                    .then(response => {
                        query.addRole(response.user_id).then(result => { console.log(result); }).catch(error => { next(new Error('Something gone wrong ! ADD USER ROLE IN DB'));});
                        query.addVote(response.user_id).then(result => { console.log(result); }).catch(error => { next(new Error('Something gone wrong ! ADD USER VOTE IN DB'));});
                        res.json({
                            message: 'DONE'
                        });
                    })
                    .catch(error => {
                        next('Something gone wrong ! Add user in database fail');
                    });
                }) 
            } else if (response.email == null && response.username != null) {
                next(new Error('This username is allready used'));
            } else if (response.email != null && response.username == null) {
                next(new Error('This email is allready used'));
            } else if (response.email != null && response.username != null) {
                next(new Error('This username and email are allready used'));
            }
        })
        .catch(error => {
            next(new Error('Something gone wrong ! Email search fail'));
        });
        
    } else {
        next(new Error('Invalid user !! Please fill the filds correctly.'));
    }
});

router.get('/login', authMiddleware.alreadyLoggedIn, (req, res) => {
    res.render('login');
});

router.post('/login/user', authMiddleware.alreadyLoggedIn, (req, res, next) => {
    if (valid_user(req.body)) {
        query.getOneUserByUsername(req.body.username)
        .then(response => {
            if (response) {
                bcrypt.compare(req.body.password, response.password)
                .then(result => {
                    if (result) {
                        res.cookie('user_id', response.user_id, {
                            httpOnly: true,
                            signed: true,
                            secure: true,
                        });
                        res.json({
                            role: response.role_id,
                            id: response.user_id,
                            message: 'Login successfully'
                        })
                    } else {
                        next(new Error('Wrong password !'));
                    }
                })
            } else {
                next(new Error('Invalid username !'));
            }
        })
        .catch(error => {
            next(new Error('Something gone wrong ! Get one user.'));
        })
    } else {
        next(new Error('Invalid login !! Please fill the filds correctly.'));
    }
});

router.get('/logout', authMiddleware.ensureLoggedIn, (req, res) => {
    res.clearCookie('user_id');
    res.render('logout');
});

function valid_email(email) {
    const valid_email = typeof email == 'string' && email.trim() != '';
    return valid_email
}

function valid_user(user) {
    const valid_username = typeof user.username == 'string' && user.username.trim() != ''
                            && user.username.trim().length <= 15;
    const valid_password = typeof user.password == 'string' && user.password.trim().length >= 6 
                            && user.password.trim().length <= 20;
    return valid_username && valid_password;
}

module.exports = router;
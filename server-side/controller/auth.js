const express = require('express');
const router = express.Router();
const query = require('../model/auth_queries');
const bcrypt = require('bcrypt');

router.get('/successfully', (req, res) => {
    res.render('message', {message: 'Successfully created account !'});
});

router.get('/', (req, res) => {
    res.render('auth');
});

router.post('/signup', (req, res, next) => {
    if(valid_user(req.body) && valid_email(req.body.email)) {
        // check if email and username its allready used
        query.getOneByEmailAndUsername(req.body.email, req.body.username)
        .then(response => {
            if (response.email == null && response.username == null) {
                bcrypt.hash(req.body.password, 10)
                .then(hash => {
                    const user = {
                        username: req.body.username,
                        email: req.body.email,
                        password: hash
                    }
                    query.createUser(user)
                    .then(response => {
                        res.json({
                            message: `${response}`
                        });
                    })
                    .catch(error => {
                        next(new Error('Something gone wrong'));
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
            next(new Error('Something gone wrong'));
        });
    } else {
        next(new Error('Invalid user !! Please fill the filds correctly.'));
    }
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login/user', (req, res, next) => {
    if (valid_user(req.body)) {
        query.getOneByUsername(req.body.username)
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
            next(new Error('Something gone wrong !'));
        })
    } else {
        next(new Error('Invalid login !! Please fill the filds correctly.'));
    }
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
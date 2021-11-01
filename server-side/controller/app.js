const express = require('express');
const router = express.Router();
const query = require('../model/app_queries');
const authMiddleware = require('./middleware');

router.get('/', (req, res, next) => {
    query.getTop()
    .then(resolve => { 
        res.render('home', {top: resolve});
    })
    .catch(error => {
        next(new Error('Something gone wrong ! Music Top'));
    });
});

router.get('/musicTracks', authMiddleware.ensureLoggedIn, (req, res, next) => {
    var allUserVotes = [];
    query.getUserVotes(req.signedCookies.user_id)
    .then(response => { return response; })
    .then(response => {
        allUserVotes = response;
        query.allSongs()
        .then(response => {
            res.render('musicTracks', {songs: response, votes: allUserVotes});
        })
        .catch(error => {
            next(new Error('Something gone wrong ! All Songs'));
        });
    })
    .catch(error => {
        next(new Error('Something gone wrong ! Get All User Votes' + error));
    });
});

router.post('/musicTracks/vote/:id', authMiddleware.ensureLoggedIn, (req, res, next) => {
    query.trackVotes(req.params.id)
    .then(response => {
        console.log(response);
        query.userVotes(req.params.id, req.signedCookies.user_id)
        .then(response => {
                console.log(response);
        })
        .catch(error => {
            next(new Error('Something gone wrong ! USER VOTE' + error));
        });
        res.redirect(301, '/musicTracks');
    })
    .catch(error => {
        next(new Error('Something gone wrong ! TRACK VOTE' + error));
    });
});

module.exports = router;
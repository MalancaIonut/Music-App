const express = require('express');
const router = express.Router();
const query = require('../model/admin_queries');

router.get('/', (req, res, next) => {
    var allMusicTracks = [];
    query.getAllTracks()
    .then(response => { return response; })
    .then(response => {
        allMusicTracks = response;
        query.getAllUsersAndRoles()
        .then(results => {
            const users = results;
            res.render('admin', {allTracks: allMusicTracks, allUsers: users});
        })
        .catch(error => {
            next(new Error('Something gone wrong ! Get all users'));
        });
    }).catch(error => {
        next(new Error('Something gone wrong ! Get all tracks'));
    });
});

router.get('/newTrack', (req, res) => {
    res.render('newTrack');
});

router.post('/newTrack/new', (req, res, next) => {
    query.createTrack(req.body)
    .then(response => {
        query.addInVote(response.track_id)
        .then(response => { console.log(response); })
        .catch(error => {'Something gone wrong ! Add track in vote table'});
        res.redirect(301, '/admin');
    })
    .catch(error => {
        next(new Error('Something gone wrong ! Create New Music Track'));
    });
});

router.post('/delete/:id', (req, res, next) => {
    query.deleteUser(req.params.id)
    .then(response => {
        console.log(response);
        res.redirect(301, '/admin');
    })
    .catch(error => {
        console.log(error);
        next(new Error('Something gone wrong ! DELETE USER.'));
    });
});

router.post('/updateRole/:id/:role', (req, res, next) => {
    query.updateRole(req.params.id, req.params.role)
    .then(response => {
        console.log(response);
        res.redirect(301, '/admin');
    })
    .catch(error => {
        console.log(error);
        next(new Error('Something gone wrong ! UPDATE ROLE.'));
    });
});

module.exports = router;


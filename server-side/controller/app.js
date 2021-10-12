const express = require('express');
const router = express.Router();
const query = require('../model/app_queries');

router.get('/', (req, res) => {
    res.render('index');
});

module.exports = router;
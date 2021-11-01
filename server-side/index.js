const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const cors = require('cors')
const cookieParser = require('cookie-parser')
const authMiddleware = require('./controller/middleware');
const helmet = require('helmet');
require('dotenv').config();

const app_routes = require('./controller/app');
const auth_routes = require('./controller/auth');
const admin_routes = require('./controller/admin');

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(helmet({
    contentSecurityPolicy: false,
}));
app.use('/public', express.static(__dirname + '/public'))
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.json());

app.use(express.urlencoded({
    extended: true,
    })
);

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'pug');

app.use('/admin', authMiddleware.ensureLoggedIn, authMiddleware.ensureAuthorization, admin_routes);
app.use('/auth', auth_routes);
app.use('/', app_routes);

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: req.app.err
    });
})

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});

module.exports = app;
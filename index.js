const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const routes = require('./controller/app');

app.use(express.json());

app.use(express.urlencoded({
    extended: true,
    })
);

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'pug');
app.use('/', routes);
app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});
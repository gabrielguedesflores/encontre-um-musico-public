const express = require("express");
const app = express();
const PATCH_ENV = '/home/gabrielflores/Documentos/code/encontre-musico/';
let bodyParser = require('body-parser');
let path = require('path');
const session = require("express-session");
const {viewsRouter} = require('./src/router/views.routes');

app.use(session({
    secret: 'dalakgajgangapkgnapkhnah',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 900000,
        sameSite: true,
        httpOnly: true
    }
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/static', express.static('views'));

app.use(express.static(__dirname + '/images'));
app.use(express.static(path.join(__dirname, '/assets')));

app.use('/', viewsRouter);

app.listen(process.env.PORT || 3000);


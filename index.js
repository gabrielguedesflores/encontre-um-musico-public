const express = require("express");
const app = express();
const PATCH_ENV = '/home/gabrielflores/Documentos/code/encontre-musico/';
let bodyParser = require('body-parser');
let path = require('path');
const {viewsRouter} = require('./src/router/views.routes');

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/static', express.static('views'));

app.use(express.static(__dirname + '/images'));
app.use(express.static(path.join(__dirname, '/assets')));

app.use('/', viewsRouter);

app.listen(process.env.PORT || 3000);


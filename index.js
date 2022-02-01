const express = require("express");
const app = express();
const PATCH_ENV = '/home/gabrielflores/Documentos/code/encontre-musico/';
var path = require('path');

app.use(express.static(__dirname + '/images'));
app.use(express.static(path.join(__dirname, '/assets')));

app.get("/", function(req, res){
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/feed", function(req, res){
  res.sendFile(__dirname + '/views/feed.html');
});

app.get("/amigos", function(req, res){
  res.sendFile(__dirname + '/views/amigos.html');
});

app.get("/configuracoes", function(req, res){
  res.sendFile(__dirname + '/views/generic.html');
});

app.get("/sair", function(req, res){
  res.sendFile(__dirname + '/views/generic.html');
});

app.get("/login", function(_, res){
  res.sendFile(__dirname + '/views/login-register/login.html');
});

app.get("/cadastro", function(_, res){
  res.sendFile(__dirname + '/views/login-register/cadastro.html');
});

app.listen(process.env.PORT || 3000);

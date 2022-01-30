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
  res.sendFile(__dirname + '/views/elements.html');
});

app.get("/configuracoes", function(req, res){
  res.sendFile(__dirname + '/views/generic.html');
});

app.get("/sair", function(req, res){
  res.sendFile(__dirname + '/views/generic.html');
});

app.listen(8081, function() {
  console.log('Servidor rodando...')
});

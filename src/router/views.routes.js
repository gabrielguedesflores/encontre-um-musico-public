const express = require("express");
const viewsRouter = express.Router();
var path = require('path');
const { validateLoginController } = require("./../controller/validateLogin.controller");

viewsRouter.get("/", function (_, res) {
  res.sendFile(path.resolve('./views/index.html'));
});

viewsRouter.get("/feed", function (_, res) {
  res.sendFile(path.resolve('./views/feed.html'));
});

viewsRouter.get("/amigos", function (_, res) {
  res.sendFile(path.resolve('./views/amigos.html'));
});

viewsRouter.get("/configuracoes", function (_, res) {
  res.sendFile(path.resolve('./views/generic.html'));
});

viewsRouter.get("/sair", function (_, res) {
  res.sendFile(path.resolve('./views/generic.html'));
});

viewsRouter.get("/login", function (_, res) {
  res.sendFile(path.resolve('./views/login-register/login.html'));
});

viewsRouter.get("/cadastro", function (_, res) {
  res.sendFile(path.resolve('./views/login-register/cadastro.html'));
});

viewsRouter.post("/validate-login", validateLoginController);

module.exports = {
  viewsRouter
};


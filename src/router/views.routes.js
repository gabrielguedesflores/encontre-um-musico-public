const express = require("express");
const viewsRouter = express.Router();
var path = require('path');
const { validateLoginController } = require("./../controller/validateLogin.controller");
const { validateUserAuthentication } = require("../middleware/authentication.middleware");

viewsRouter.get("/", function (req, res) {
  res.sendFile(path.resolve('./views/index.html'));
});

viewsRouter.get("/feed", validateUserAuthentication, function (_, res) {
  res.sendFile(path.resolve('./views/feed.html'));
});

viewsRouter.get("/amigos", validateUserAuthentication, function (_, res) {
  res.sendFile(path.resolve('./views/amigos.html'));
});

viewsRouter.get("/configuracoes", validateUserAuthentication, function (_, res) {
  res.sendFile(path.resolve('./views/generic.html'));
});

viewsRouter.get("/sair", validateUserAuthentication, function (_, res) {
  res.sendFile(path.resolve('./views/generic.html'));
});

viewsRouter.get("/login", function (req, res) {
  res.sendFile(path.resolve('./views/login-register/login.html'));
});

viewsRouter.get("/login/error", function (req, res) {
  res.sendFile(path.resolve('./views/login-register/login.html'));
});

viewsRouter.get("/cadastro", function (_, res) {
  res.sendFile(path.resolve('./views/login-register/cadastro.html'));
});

viewsRouter.post("/validate-login", validateLoginController);

module.exports = {
  viewsRouter
};


const express = require("express");
const viewsRouter = express.Router();
var path = require('path');
const { validateLoginController, logoutController } = require("./../controller/validateLogin.controller");
const { validateUserAuthentication } = require("../middleware/authentication.middleware");
const req = require("express/lib/request");

viewsRouter.get("/", validateUserAuthentication, function (req, res) {
  // const { jwtTokenDecodificator } = require("../../src/helper/jwtTokenManipulator.helper");
  // const userJwtToken = req.headers.cookie.split(";")[0].slice(16);
  // let { userId } = jwtTokenDecodificator(userJwtToken);
  // res.send(userId)

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

viewsRouter.get("/sair", validateUserAuthentication, logoutController);

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

viewsRouter.get("/amigos/:user_id", validateUserAuthentication, function (_, res) {
  res.sendFile(path.resolve('./views/perfil-amigos.html'));
});


/* MENU DE NAVEGAÇÃO DE INSTRUMENTOS */

viewsRouter.get("/navegar/:search", validateUserAuthentication, function (_, res) {
  res.sendFile(path.resolve('./views/explorer/search.html'));
});

/*   */


module.exports = {
  viewsRouter
};


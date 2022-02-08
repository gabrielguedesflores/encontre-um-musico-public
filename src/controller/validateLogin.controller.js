const { validateLoginService } = require("../service/validateLogin.services");
const { jwtTokenCreator } = require("../helper/jwtTokenManipulator.helper");

const validateLoginController = async (req, res) => {
    const { userName, userPswrd } = req.body;
    const { body } = await validateLoginService(userName, userPswrd);
    const { user } = body;
    if (user != "") {
        req.session.isUserLogged = true;
        const jwtTokenCookie = await jwtTokenCreator(req.sessionID ,user[0].user_id);
        res.cookie('userTokenCookie', jwtTokenCookie, { maxAge: 900000, httpOnly: true });
        res.redirect("/");
    } else {
        res.redirect('/login/error');
    }
}

const logoutController = (_, res) => {
    res.clearCookie("connect.sid");
    res.clearCookie("userTokenCookie");
    res.redirect("/login");
}

module.exports = {
    validateLoginController,
    logoutController
}
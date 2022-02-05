const { validateLoginService } = require("../service/validateLogin.services");

const validateLoginController = async (req, res) => {
    const { userName, userPswrd } = req.body;
    const { body } = await validateLoginService(userName, userPswrd);
    const { user } = body;
    if (user != "") {
        // req.session.isUserLogged = true;
        // localStorage.setItem('isUserLogged', true);
        res.redirect("/");
    } else {
        // req.session.isUserLogged = false;
        // localStorage.setItem('isUserLogged', false);
        res.redirect('/login/error');
    }
}

module.exports = {
    validateLoginController
}
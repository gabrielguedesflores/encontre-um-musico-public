const { validateLoginService } = require("../service/validateLogin.services");

const validateLoginController = async (req, res) => {
    const { userName, userPswrd } = req.body;
    const { body } = await validateLoginService(userName, userPswrd);
    const { user } = body;
    console.log(user);
    if(user != ""){
        res.redirect("/");
    }else{
        res.redirect('/login');
    }
}

module.exports = {
    validateLoginController
}
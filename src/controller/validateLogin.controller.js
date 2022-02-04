const { validateLoginService } = require("../service/validateLogin.services");

const validateLoginController = async (req, res) => {
    const { userName, userPswrd } = req.body;
    const { body } = await validateLoginService(userName, userPswrd);
    const { user } = body;
    if(user != ""){
        res.redirect("/");
    }else{
        res.render('/login', {
            returnResponse: "Usuário não encontrado!"
        });
    }
}

module.exports = {
    validateLoginController
}
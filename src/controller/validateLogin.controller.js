const validateLoginController = (req, res) => {
    const { userName, userPswrd } = req.body;
    if (userName == 'mateus' && userPswrd == '123456') {
        
    } else {
        
    }
}

module.exports = {
    validateLoginController
}

const validateUserAuthentication = (_, res, next) => {
    if(isLogged){
        next();
    }else{
        res.redirect('/login');
    }
}

module.exports = {
    validateUserAuthentication
}
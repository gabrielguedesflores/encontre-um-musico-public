const { jwtTokenDecodificator } = require("../helper/jwtTokenManipulator.helper");

const validateUserAuthentication = (req, res, next) => {
    if (req.headers.cookie) {
        const userTokenCookie = req.headers.cookie.split(";")[0].slice(16);
        const connect_sid = req.headers.cookie.split(";")[1].slice(13);
        const { sessionId } = jwtTokenDecodificator(userTokenCookie);
        if (connect_sid.includes(sessionId)) {
            next();
        } else {
            res.redirect("/");
        }
    } else {
        res.redirect("/");
    }

}

module.exports = {
    validateUserAuthentication
}
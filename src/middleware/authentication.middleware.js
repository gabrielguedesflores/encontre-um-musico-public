const { jwtTokenDecodificator } = require("../helper/jwtTokenManipulator.helper");
const { brcptjsCompare } = require("../helper/dataEncryptionManipulator.helper");

const validateUserAuthentication = (req, res, next) => {
    if (req.headers.cookie) {
        const userTokenCookie = req.headers.cookie.split(";")[0].slice(16);
        const connect_sid = req.headers.cookie.split(";")[1].slice(13);
        const { sessionId } = jwtTokenDecodificator(userTokenCookie);
        if (brcptjsCompare(connect_sid,sessionId)) {
            next();
        } else {
            res.redirect("/login/error");
        }
    } else {
        res.redirect("/login/error");
    }

}

module.exports = {
    validateUserAuthentication
}
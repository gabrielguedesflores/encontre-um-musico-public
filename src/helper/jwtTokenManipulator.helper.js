const jwt = require("jsonwebtoken");
const { bcrptjsEncryption } = require("./dataEncryptionManipulator.helper");
require("dotenv").config();

const secret = process.env.JWT_SECRET_KEY;

const jwtTokenCreator = async (userSessionId, userID) => {

    const usrSessionId = await bcrptjsEncryption(userSessionId);
    //const usrId = await bcrptjsEncryption(userID);
    const usrId = userID

    const token = jwt.sign(
        {
            sessionId: usrSessionId,
            userId: usrId
        },
        secret,
        {
            expiresIn: 900000
        }
    );
    return token;
}

const jwtTokenDecodificator = (jwtToken) => {

    const decodedToken = jwt.decode(jwtToken);
    return decodedToken;
}

module.exports = {
    jwtTokenCreator,
    jwtTokenDecodificator
}
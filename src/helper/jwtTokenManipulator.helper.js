const jwt = require("jsonwebtoken");
const { dataEncryption, dataCompare } = require("./dataEncryptionManipulator.helper");
require("dotenv").config();

const secret = process.env.JWT_SECRET_KEY;

const jwtTokenCreator = async (userSessionId, userID) => {

    const usrSessionId = await dataEncryption(userSessionId);
    const usrId = await dataEncryption(userID);
    
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
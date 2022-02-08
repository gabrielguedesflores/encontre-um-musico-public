const jwt = require("jsonwebtoken");
const secret = 'gj4CsZHE5TGg68o3j5kkmDvbDb1StE80';

const jwtTokenCreator = (userSessionId, userID) => {
    const token = jwt.sign(
        {
            sessionId: userSessionId,
            userId: userID
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
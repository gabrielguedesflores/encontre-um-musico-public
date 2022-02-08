const bcrptjs = require("bcryptjs");

const bcrptjsEncryption = async (plainTextData) => {
    const randomSalt = await bcrptjs.genSalt(10);
    return bcrptjs.hash(`${plainTextData}`, randomSalt);
}

const brcptjsCompare = async (receivedData, hashedData) => {
    return await bcrptjs.compare(`${receivedData}`, `${hashedData}`);
}

module.exports = {
    bcrptjsEncryption,
    brcptjsCompare
}
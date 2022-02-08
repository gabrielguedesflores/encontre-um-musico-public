const bcrptjs = require("bcryptjs");

const dataEncryption = async (plainTextData) => {
    const randomSalt = await bcrptjs.genSalt(10);
    return bcrptjs.hash(`${plainTextData}`, randomSalt);
}

const dataCompare = async (receivedData, hashedData) => {
    return await bcrptjs.compare(`${receivedData}`, `${hashedData}`);
}

module.exports = {
    dataEncryption,
    dataCompare
}
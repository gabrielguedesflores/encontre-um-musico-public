const axios = require("axios");

const validateLoginService = async (userName, userPswrd) => {
    try {
        const { data } = await axios.post('https://encontre-um-musico-api.herokuapp.com/api/users/login', {
            user_name: userName,
            user_pass: userPswrd
        });

        return data;
        
    } catch (error) {
        return error;
    }
}

module.exports = {
    validateLoginService
}
const users = require('../models/Users');
const { decryptPasswd } = require('../config/encrypt');

const login = async(email, password) => {
    try {
        var existed = await users.findOne({email});
        console.log(existed);

        if(!existed){
            throw "Email is incorrect"
        }
        console.log(existed.password);
        if(!decryptPasswd(password,existed.password)){
            throw "Password is incorrect"
        }
        return {
            success: true,
            data: existed
        }
    } catch (error) {
        return {
            success: false,
            err: error
        }
    }
}

module.exports = login

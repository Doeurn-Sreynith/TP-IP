const users = require('../models/Users')
const {encryptPasswd} = require('../config/encrypt')
const register = async(param) => {
    const { email, username, firstname, lastname, password, confirmpassword} = param;
    try {

        var existed = await users.findOne({email})
        if(existed){
            throw "Email is already existed!"
        }
        existed = await users.findOne({username})
        if(existed){
            throw "Username is already existed!"
        }
        if(password == confirmpassword){
            var hash = encryptPasswd(password);

            const newUser = {
                email, 
                username, 
                firstname, 
                lastname, 
                password : hash,
                confirmpassword : hash
            }

            const createUser = await users.create(newUser);
            // res.json(createUser)
            return {
                Register: true,
                data: createUser
            }
        }else {
            return{
                Register: false
                
            }
        }
    } catch (error) {
        return{
            Register: false,
            err :error
        }

    }
}

module.exports = register
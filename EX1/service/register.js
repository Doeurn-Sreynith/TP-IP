const users = require('../models/Users')
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

        const newUser = {
            email, 
            username, 
            firstname, 
            lastname, 
            password, 
            confirmpassword
        }

        const createUser = await users.create(newUser);
        // res.json(createUser)
        return {
            Register: true,
            data: createUser
        }
    } catch (error) {
        console.log(error);

    }
}

module.exports = register
const express = require('express')
const router = express.Router();

const register = require('../service/register')
const login = require('../service/login')
const { joiValidation } = require('../middleware/joiValidation');
const { registerSchema , loginSchema} = require('../Schema/index');

 router.post('/register',joiValidation(registerSchema), async (req, res)=>{
    try {
        const user = await register(req.body);
        res.json(user)

    } catch (error) {
        console.log(error);
    }
})

//login page
router.post('/login', joiValidation(loginSchema), async(req,res) => {
    try {
        console.log(req.body);
        const { email, password} = req.body;
        const result = await login(email, password);
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

module.exports = router
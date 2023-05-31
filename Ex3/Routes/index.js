const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken');

const register = require('../service/register')
const login = require('../service/login')
const { joiValidation } = require('../middleware/joiValidation');
const { registerSchema , loginSchema} = require('../Schema/index');
const {logout} = require('../service/logout')
const { ensureSignedIn, ensureSignedOut } = require('../middleware/auth');

 router.post('/register',joiValidation(registerSchema), async (req, res)=>{
    try {
        const user = await register(req.body);
        res.json(user)

    } catch (error) {
        console.log(error);
    }
})

//login page
router.post('/login', ensureSignedOut, joiValidation(loginSchema), async(req,res) => {
    try {
        console.log(req.body);
        const { email, password} = req.body;
        const result = await login(email, password);
        const token = jwt.sign(req.body, "t0kenEncrypti0n");
        req.session.jwtToken = token;
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

//logout page
router.post('/logout', ensureSignedIn, (req,res) => {
    try {
        const result = logout(req.session);
        console.log("cookie", req.cookies);
        res.clearCookie('token')
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

module.exports = router
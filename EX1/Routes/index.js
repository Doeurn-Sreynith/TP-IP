const express = require('express')
const router = express.Router();

const register = require('../service/register')

 router.post('/register', async (req, res)=>{
    try {
        const user = await register(req.body);
        res.json(user)

    } catch (error) {
        console.log(error);
    }
})

module.exports = router
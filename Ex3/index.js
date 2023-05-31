const express = require("express")
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');

const oneHour = 1000*60*60;

app.use(session({
    secret: "SecretKeyIsEnCrypt",
    saveUninitialized: true,
    cookie: {maxAge: oneHour},
    resave: false,
    name: "token"
}))
app.use(cookieParser());

app.use(express.json())

app.get('/', (req, res) =>{
    res.send('<h1>Hello Nith</h1>')
})

app.listen(3001, () =>{
    console.log('Running on port 3001');
})

require('./config/db')()

app.use(require('./Routes'))


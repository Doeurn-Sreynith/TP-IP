const express = require("express")
const app = express();

app.use(express.json())

app.get('/', (req, res) =>{
    res.send('<h1>Hello Nith</h1>')
})

app.listen(3001, () =>{
    console.log('Running on port 3001');
})

require('./Config/db')()

app.use(require('./Routes/index'))
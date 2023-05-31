const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true, 
        unique: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }

},
{
    timestamps: true
})

const createUser = mongoose.model('Users', userSchema)
module.exports = createUser
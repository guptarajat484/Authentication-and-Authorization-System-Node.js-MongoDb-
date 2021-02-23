
const connection = require('./conection')

const userSchema = new connection.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()

    },
    isAdmin: {
        type: Boolean
    }

})

const User = connection.model('User', userSchema)

module.exports = User;


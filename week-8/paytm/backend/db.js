const mongoose = require("mongoose")
const { Schema, number } = require("zod")

mongoose.connect("mongodb+srv://admin04:hlyShlsR4FWCbHe7@cluster0.00msngw.mongodb.net/paytm")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }

})

const accoutSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true

    },
    balance: {
        type: Number,
        required: true
    }
})

const User = mongoose.model('user', userSchema)
const Account = mongoose.model('Account', accoutSchema)

module.exports = {
    User,
    Account
}
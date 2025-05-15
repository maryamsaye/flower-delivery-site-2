const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');

const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema ({
    Email:
    {
        type: String,
        unique: true,
        required: true
    },
    Password:
    {
        type: String,
        required: true
    },
    token: { 
        type: String
    }

})

userSchema.statics.signUp = async function(Email, Password) {

    //validator
    if (!Email || !Password) {
        throw Error("All fields must be filled")
    }
    if (!validator.isEmail(Email)) {
        throw Error('Email is not valid')
    }
    if (!validator.isStrongPassword(Password)) {
        throw Error('Password is not strong enough')
    }

    const exists = await this.findOne({ Email })

    if (exists) {
        throw Error('Email exists')
    }

    // bcrypt
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(Password, salt)

    const user = await this.create({ Email, Password: hash })

    return user 
}

module.exports = mongoose.model('User', userSchema)
const mongoose = require('mongoose')
const brcypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        min: 2,
        max: 20,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        min: 2,
        max: 20,
    },
    emailId: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    hashPassword: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
    },
    profilePicture: {
        type: String,
        default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
}, { timestaps: true })

userSchema.methods = {
    authenticate: async function (password) {
        return await brcypt.compare(password, this.hashPassword);
    }
};

const user = mongoose.model('User', userSchema);
module.exports = user;
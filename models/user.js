const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    school: {
        type: String,
        required: false,
        minlength: 1
    },
    username: {
        type: String,
        required: true,
        minlength: 1,
        unique: true
    },
    fullName: {
        type: String,
        required: false,
        minlength: 1,
    },
    password: {
        type: String,
        required: true
        // minlength: 
    },
    isAdmin: {
        type: Boolean,
        required: true,
    },
    // following: {
    //     type: [User],
    //     required: true
    // },
    contact: {
        type: String,
        required: false,
        minlength: 1
    }
})

UserSchema.pre('save', function(next) {
    const user = this;

    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            })
        })
    } else {
        next();
    }
})

UserSchema.statics.findByUsernamePassword = function(username, password) {
    const User = this;

    return User.findOne({username: username}).then((user => {
        if (!user) {
            return Promise.reject();
        }

        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    resolve(user);
                } else {
                    reject();
                }
            })
        })
    }))
}

const User = mongoose.model('User', UserSchema)
module.exports = { User }
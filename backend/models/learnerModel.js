const mongoose = require('mongoose');
const crypto = require('crypto');

const learnerSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            trim: true,
            required: true,
            max: 32,
            unique: true,
            index: true,
            lowercase: true
        },
        name: {
            type: String,
            trim: true,
            required: true,
            max: 32
        },
        parentid: {
            type: Object,
            trim: true,
            required: true
        },
        hashed_password: {
            type: String,
            required: true
        },
        salt: String,
        about: {
            type: String
        },
        role: {
            type: Number,
            trim: true
        },
        photo: {
            data: Buffer,
            contentType: String
        },
        resetPasswordLink: {
            data: String,
            default: ''
        }
    },
    { timestamp: true }
);

learnerSchema
    .virtual('password')
    .set(function(password) {
        // create a temporarity variable called _password
        this._password = password;
        // generate salt
        this.salt = this.makeSalt();
        // encryptPassword
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function() {
        return this._password;
    });

    learnerSchema.methods = {
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },

    encryptPassword: function(password) {
        if (!password) return '';
        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        } catch (err) {
            return '';
        }
    },

    makeSalt: function() {
        return Math.round(new Date().valueOf() * Math.random()) + '';
    }
};

module.exports = mongoose.model('Learner', learnerSchema);

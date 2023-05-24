const mongoose = require('mongoose');
const crypto = require('crypto');

const LearnerSchema = new mongoose.Schema(
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
        firstname: {
            type: String,
            trim: true,
            required: true,
            max: 32
        },
        lastname: {
            type: String,
            trim: true,
            required: true,
            max: 32
        },
        parentemail: {
            type: Object,
            trim: true,
            required: true
        },
        hashed_password: {
            type: String,
            required: true
        },
        missionProgress: {
            type:Array,
            required: true

        },
        chapterProgress: {
            type:Array,
            required: true
        },
        quizProgress: {
            type:Array,
            required: true
        },
        activityState: {
            type:Number,
            required: true

        },
        activityState: {
            type:Number,
            required: true

        },
        typeWriterDelay: {
            type:Number,
            required: true

        },
        forwardSpeed: {
            type:Number,
            required: true

        },
        isCairoMuted: {
            type:Boolean,
            required: true

        },
        cairoVoice: {
            type:String,
            required: true

        },
        salt: String,
    },
    { timestamp: true }
);

LearnerSchema
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

    LearnerSchema.methods = {
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

export default mongoose.models.Learner || mongoose.model('Learner', LearnerSchema)

const mongoose = require('mongoose');
const {Schema} = require('mongoose');
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator');


mongoose.plugin(uniqueValidator);

const UserSchema = new Schema({
    login: {
        type: String,
        required: [true, 'Укажите логин']
    },

    email: {
        type: String,
        unique: 'User with email "{VALUE}" already exist',
        lowercase: true,
        required: 'Укажите Эл. почту',
    },
    password: {
        type: String,
        required: 'Укажите пароль',
    },
    name: {
        type: String,
        set: i => (i == '' ? 'Anonim' : i)
    }

}, {
    timestamp: true,
});

UserSchema.statics.createFields = ['name', 'email', 'password', 'login'];

UserSchema.pre('save', function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    const salt = bcrypt.genSaltSync(10);

    this.password = bcrypt.hashSync(this.password, salt);

    next();
});

UserSchema.methods.comparePasswords = function (password) {
    return bcrypt.compareSync(password, this.password);
};

UserSchema.statics.findOneWithPublicFields = function (params, cb) {
    return this.findOne(params, cb).select({
        password: 0,
        _id: 0,
        __v: 0
    });
};

module.exports = mongoose.model('user', UserSchema);
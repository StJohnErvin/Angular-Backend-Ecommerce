"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var mongoose_1 = require("mongoose");
var bcryptjs_1 = require("bcryptjs");
var salt_Round = process.env.SALT_ROUND;
var AddressSchema = new mongoose_1.Schema({
    addressLine1: {
        type: String,
        required: false
    },
    addressLine2: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: false
    },
    pin: {
        type: String,
        required: false
    }
});
var UserSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        trim: true,
        required: true
    },
    lastName: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        maxlength: 12
    },
    mobile: {
        type: String,
        trim: true,
        required: true
    },
    dob: {
        type: Date,
        trim: true,
        required: true
    },
    addressInfo: AddressSchema,
    role: {
        type: String,
        trim: true,
        required: true,
        default: 'User'
    }
});
UserSchema.pre('save', function (next) {
    var user = this;
    if (user.isModified("password")) {
        var saltRound = parseInt(salt_Round);
        bcryptjs_1.genSalt(saltRound, function (err, salt) {
            bcryptjs_1.hash(user.password, salt, function (err, hash) {
                if (err) {
                    throw err;
                }
                else {
                    user.password = hash;
                    next();
                }
            });
        });
    }
    else {
        next();
    }
});
exports.User = mongoose_1.model('User', UserSchema);

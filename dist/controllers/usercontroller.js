"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
var bcryptjs_1 = require("bcryptjs");
var User_1 = require("../models/User");
var jsonwebtoken_1 = require("jsonwebtoken");
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.login = function (req, res, next) {
        var private_key = process.env.PRIVATEKEY || "";
        User_1.User.findOne({ email: req.body.email }, function (err, result) {
            if (err) {
                res.status(500).json({ status: "failed", message: err });
            }
            else {
                if (result != undefined) {
                    if (bcryptjs_1.compareSync(req.body.password, result.password)) {
                        var token = jsonwebtoken_1.sign({ id: result._id }, private_key, {
                            expiresIn: "1h",
                        });
                        res.json({
                            status: "Success",
                            message: "Login Success!",
                            data: token,
                            role: result.role,
                        });
                    }
                    else {
                        res.json({ status: "Failed", message: "Incorrect Credentials" });
                    }
                }
                else {
                    res.json({ status: "Failed", message: "Incorrect Credentials" });
                }
            }
        });
    };
    UserController.registration = function (req, res, next) {
        var user = new User_1.User(req.body);
        User_1.User.create({ user: user }, function (err, result) {
            if (err) {
                res.status(500).json({ status: "failed", message: err });
            }
            else {
                res.json({
                    status: "success",
                    message: "Registration Successful!",
                    data: result,
                });
            }
        });
    };
    UserController.updateProfile = function (req, res, next) {
        var userId = req.body.userId;
        User_1.User.findByIdAndUpdate(userId, {
            $set: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                addressInfo: req.body.addressInfo,
            },
        }, function (err, result) {
            if (err) {
                res.status(500).json({ status: "failed", message: err });
            }
            else {
                res.json({
                    status: "success",
                    message: "Pofile Updated!",
                    data: null,
                });
            }
        });
    };
    UserController.getProfile = function (req, res, next) {
        var userId = req.body.userId;
        User_1.User.findById(userId, function (err, result) {
            if (err) {
                res.status(500).json({ status: "failed", message: err });
            }
            else {
                res.json({
                    status: "success",
                    message: "Pofile Updated!",
                    data: result,
                });
            }
        });
    };
    return UserController;
}());
exports.UserController = UserController;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
var usercontroller_1 = require("../controllers/usercontroller");
var express = require("express");
exports.userRoutes = express.Router();
exports.userRoutes.post("/login", usercontroller_1.UserController.login);
exports.userRoutes.post("/registration", usercontroller_1.UserController.registration);
exports.userRoutes.put("/", usercontroller_1.UserController.updateProfile);

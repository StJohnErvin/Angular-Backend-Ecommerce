"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var userRoutes_1 = require("./routes/userRoutes");
var bodyParser = require("body-parser");
var db_1 = require("./db/db");
require("dotenv").config();
var app = express();
//app.get("/", (req, res) => res.send("Get API"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/user", userRoutes_1.userRoutes);
app.listen(3000, function () {
    db_1.MongoConnect.connect().then(function (req) { return console.log("DB connected"); })
        .catch(function (err) { return console.log(err); });
    console.log("Server Running Port:3000");
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var index_1 = require("./routes/index");
var bodyParser = require("body-parser");
var db_1 = require("./db/db");
var helmet = require("helmet");
var compression = require("compression");
require("dotenv").config();
var app = express();
app.use(helmet());
app.use(compression());
// app.get("/", (req, res) => res.send("This is get express API"));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT");
    next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/user", index_1.userRoutes);
app.use("/category", index_1.categoryRoute);
app.use("/product", index_1.productRoute);
app.use("/errorLog", index_1.errorLogRoute);
app.use("/wishlist", index_1.wishlistRoute);
app.use("/cart", index_1.cartRoute);
app.use("/order", index_1.orderRoute);
app.listen(process.env.PORT || 3000, function () {
    db_1.MongoConnect.connect().then(function (res) { return console.log("DB connected"); });
    console.log("Server running on port 3000");
});

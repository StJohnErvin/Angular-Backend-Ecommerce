"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoConnect = void 0;
var mongoose = require("mongoose");
var MongoConnect = /** @class */ (function () {
    function MongoConnect() {
    }
    MongoConnect.connect = function () {
        var mongoDBConn = process.env.MONGODB_URL || '';
        return mongoose.connect(mongoDBConn, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
    };
    return MongoConnect;
}());
exports.MongoConnect = MongoConnect;

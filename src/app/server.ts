import * as express from "express";
import { userRoutes } from "./routes/userRoutes";
import * as bodyParser from "body-parser";
import * as dotenv from "dotenv/types";
import { MongoConnect } from "./db/db";
require("dotenv").config();

const app = express();

//app.get("/", (req, res) => res.send("Get API"));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use("/user", userRoutes);
app.listen(3000, () => {
  MongoConnect.connect()
    .then((req) => console.log("DB connected"))
    .catch((err) => console.log(err));

  console.log("Server Running Port:3000");
});

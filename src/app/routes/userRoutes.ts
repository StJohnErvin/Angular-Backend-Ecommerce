import { UserController } from "../controllers/usercontroller";
import * as express from "express";

export const userRoutes = express.Router();

userRoutes.post("/login", UserController.login);
userRoutes.post("/registration", UserController.registration);
userRoutes.put("/", UserController.updateProfile);

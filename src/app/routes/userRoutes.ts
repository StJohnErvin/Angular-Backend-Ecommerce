import { UserController } from "../controllers/usercontroller";
import * as express from "express";
import { validateUser } from "../middleware/auth";

export const userRoutes = express.Router();

userRoutes.get("/", validateUser, UserController.getProfile);
userRoutes.post("/login", UserController.login);
userRoutes.post("/registration", UserController.registration);
userRoutes.put("/", validateUser, UserController.updateProfile);

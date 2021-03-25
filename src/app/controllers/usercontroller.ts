import { compareSync } from "bcryptjs";
import { Request, Response, NextFunction, Errback } from "express";
import { User } from "../models/User";
import { sign } from "jsonwebtoken";

export class UserController {
  static login(req: Request, res: Response, next: NextFunction) {
    const private_key = process.env.PRIVATEKEY || "";
    User.findOne({ email: req.body.email }, (err: Errback, result: any) => {
      if (err) {
        res.status(500).json({ status: "failed", message: err });
      } else {
        if (result != undefined) {
          if (compareSync(req.body.password, result.password)) {
            const token = sign({ id: result._id }, private_key, {
              expiresIn: "1h",
            });
            res.json({ status: "Success", message: "Login Success!" , data: token,  role: result.role});
          } else {
            res.json({ status: "Failed", message: "Incorrect Credentials" });
          }
        } else {
          res.json({ status: "Failed", message: "Incorrect Credentials" });
        }
      }
    });
  }

  static registration(req: Request, res: Response, next: NextFunction) {
    const user = new User(req.body);
    User.create({ user }, (err, result: any) => {
      if (err) {
        res.status(500).json({ status: "failed", message: err });
      } else {
        res.json({
          status: "success",
          message: "Registration Successful!",
          data: result,
        });
      }
    });
  }

  static updateProfile(req: Request, res: Response, next: NextFunction) {
    const userId = req.body.userId;

    User.findByIdAndUpdate(
      userId,
      {
        $set: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          addressInfo: req.body.addressInfo,
        },
      },
      (err: Errback, result: any) => {
        if (err) {
          res.status(500).json({ status: "failed", message: err });
        } else {
          res.json({
            status: "success",
            message: "Pofile Updated!",
            data: null,
          });
        }
      }
    );
  }

  static getProfile(req: Request, res: Response, next: NextFunction) {
    const userId = req.body.userId;
    User.findById(userId, (err: Errback, result: any) => {
      if (err) {
        res.status(500).json({ status: "failed", message: err });
      } else {
        res.json({
          status: "success",
          message: "Pofile Updated!",
          data: result,
        });
      }
    });
  }
}


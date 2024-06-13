import { NextFunction, Request, Response } from "express";
import { Admin } from "../model/adminSchema";
import { hash, genSalt } from "bcryptjs";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../model/userSchema";

const adminUsername = "lalsportsacademy";
const adminPassword = "d12Uc5OQ@47osOsiOD";

export const loginController = () => {
  return {
    adminLogin: async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { username, password } = req.body;
        const admin: any = await Admin.findOne({ username });
        if (admin) {
          console.log(
            "🚀 ~ file: loginController.ts:17 ~ adminLogin: ~ admin:",
            admin
          );
          const isMatch: boolean = await bcrypt.compare(
            password,
            admin.password
          );
          if (!isMatch) {
            throw new Error("Username or password incorrect");
          } else {
            let payload = {
              _id: String(admin?._id),
              username: admin?.username!,
              role: "admin",
            };
            const accessToken = jwt.sign(
              payload,
              String(process.env.ACCESS_TOKEN_SECRET),
              { expiresIn: "1h" }
            );
            res.clearCookie("user_jwt");
            res.cookie("admin_jwt", accessToken, {
              httpOnly: true,
              secure: true,
              sameSite: "none",
            });
            const adminObject = admin.toObject();
            delete adminObject.password;
            res.status(200).json({
              success: true,
              data: adminObject,
              message: "Admin verified!",
            });
          }
        } else {
          throw new Error("Account not found");
        }
        if (username == adminUsername && password == adminPassword) {
          const hashedPassword = await hash(password, await genSalt(10));
        }
      } catch (error) {
        next(error);
      }
    },
    userLogin: async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { phoneNumber } = req.body;
        let user = await User.findOne({ phoneNumber });
        if (!user) {
          user = new User({ phoneNumber });
          await user.save();
        }
        const payload = { id: user._id, role: "user" };
        const token = jwt.sign(
          payload,
          String(process.env.ACCESS_TOKEN_SECRET),
          { expiresIn: "1h" }
        );
        res.clearCookie("admin_jwt");
        res.cookie("user_jwt", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        });
        return res.status(200).json({
          success: true,
          data: user,
          message: "User verified!",
        });
      } catch (error) {
        next(error);
      }
    },
  };
};

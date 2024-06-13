import { NextFunction, Request, Response } from "express";
import { Admin } from "../model/adminSchema";
import { hash, genSalt } from "bcryptjs";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const adminUsername = "lalsportsacademy";
const adminPassword = "d12Uc5OQ@47osOsiOD";

export const loginController = () => {
  return {
    adminLogin: async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { username, password } = req.body;
        const admin: any = await Admin.findOne({ username });
        if (admin) {
          console.log("🚀 ~ file: loginController.ts:17 ~ adminLogin: ~ admin:", admin)
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
            res.cookie("admin_jwt", accessToken, {
              httpOnly: true,
              secure: true,
              sameSite: "none",
            });
            const adminObject = admin.toObject();
            delete adminObject.password;
            res.json({
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
  };
};

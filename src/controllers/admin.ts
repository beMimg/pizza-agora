import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { adminModel } from "../models/admin";
import generateToken from "../utils/tokenGenerator";

/* 
Controller with functionality to verify if the user credentials match a user in the database,
If thats the case, a jwt token will be generate and send as a json.
*/
const authAdmin = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    const admin = await adminModel.findOne({ username: req.body.username });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const match = await bcrypt.compare(password, admin.password);

    if (!match) {
      res.status(400).json({ message: "Password is incorrect" });
    }

    const accessToken = generateToken(admin);

    res.status(200).json({ accessToken: accessToken });
  } catch (err) {
    console.error("Error", err);
  }
};

export { authAdmin };

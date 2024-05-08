import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { adminModel } from "../models/admin";

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

    const match = await bcrypt.compare(req.body.password, admin.password);

    if (!match) {
      res.status(400).json({ message: "Password is incorrect" });
    }

    res.status(200).json({ message: "You're logged in" });
  } catch (err) {
    console.error(err, "err");
  }
};

export { authAdmin };

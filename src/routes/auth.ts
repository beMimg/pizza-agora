import express, { Router } from "express";
import { authAdmin } from "../controllers/admin";

const router: Router = express.Router();

router.post("/", authAdmin);

export default router;

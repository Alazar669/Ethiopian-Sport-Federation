import express from "express";
import { login, register ,changePassword} from "../controllers/auth.js";

const router = express.Router();

router.post("/register", register)
router.post("/login", login)
router.put("/changePassword", changePassword)

export default router
import express from "express";
import {
  updateUser,deleteUser,getUser,getUsers,updateUserActionPlan
} from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router(); // DEFAULT CONFIGRATION


//UPDATE
router.put("/:id", updateUser);

// 

router.patch("/availability/:id", updateUserActionPlan);
//DELETE
router.delete("/:id", deleteUser);

//GET
router.get("/:id", getUser);

//GET ALL
router.get("/", getUsers);

export default router;



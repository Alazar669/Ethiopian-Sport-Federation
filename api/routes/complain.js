import express from "express";
import {
  createComplain,
  deleteComplain,
  getComplain,
  getComplains,
  updateComplain
} from "../controllers/complain.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();
//CREATE
router.post("/", createComplain);

//UPDATE
// router.put("/availability/:id", updateComplainAvailability);
router.put("/:id", updateComplain);
//DELETE
router.delete("/:id", verifyAdmin, deleteComplain);
//GET SINGLE

router.get("/:id", getComplain);
//GET ALL

router.get("/", getComplains);


export default router;

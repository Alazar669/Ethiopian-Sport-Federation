import express from "express";
import {
  createDeparetement,
  getDeparetements,
  updateDeparetement
} from "../controllers/Deparetement.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();
//CREATE
router.post("/", createDeparetement);

//UPDATE
// router.put("/availability/:id", updateDeparetementAvailability);
router.post("/:id", updateDeparetement);
//DELETE

//GET ALL

router.get("/", getDeparetements);


export default router;

import express from "express";
import { getInfo, generateImage } from "./../controllers/dalleController.js";

const router = express.Router();

router.get("/", getInfo);
router.post("/", generateImage);

export default router;

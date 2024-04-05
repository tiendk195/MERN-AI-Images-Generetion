import express from "express";
import { getPosts, uploadPost } from "./../controllers/postController.js";

const router = express.Router();

router.get("/", getPosts);

router.post("/", uploadPost);

export default router;

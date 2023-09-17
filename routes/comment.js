import express from "express";
import { getComments, writeComments } from "../controllers/comment.js";

const router = express.Router()

router.get("/", getComments)
router.post("/", writeComments)

export default router
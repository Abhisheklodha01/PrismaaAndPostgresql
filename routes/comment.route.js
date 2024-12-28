import { Router } from "express";
import { deleteComment, getCommentByID, getComments, postComment, updateComment } from "../controllers/comment.controller.js";

const router = Router();

router.post("/postcomment", postComment);
router.put("/update-comment", updateComment);
router.get("/getcomments", getComments);
router.get("/getcomment/:commentid", getCommentByID);
router.delete("/deletecomment/:commentid", deleteComment);

export default router;

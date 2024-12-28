import { Router } from "express";
import {
  createPost,
  deletePost,
  getPostByID,
  getPosts,
  updatePost,
} from "../controllers/post.controller.js";

const router = Router();

router.post("/createpost", createPost);
router.put("/update-post", updatePost);
router.get("/getposts", getPosts);
router.get("/getpost/:postid", getPostByID);
router.delete("/deletepost/:postid", deletePost);

export default router;

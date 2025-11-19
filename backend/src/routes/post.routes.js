import { Router } from "express";
import { createPost, getAllPosts, updatePost, deletePost } from "../controllers/post.controllers.js";

const router = Router();

router.route('/create').post(createPost);
router.route('/getPost').get(getAllPosts);
router.route('/update/:id').patch(updatePost);
router.route('/delete/:id').delete(deletePost);

export default router;
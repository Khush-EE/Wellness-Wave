import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

import { comment, createBlog, deleteBlog, deleteComment, getAllBlogs, getBlogById, getBlogsUsingTags, likeBlog } from "../controllers/blog.controller.js";

const router = Router();


router.route("/").get(getAllBlogs)
router.route("/filter").get(getBlogsUsingTags)
router.route("/:id").get(getBlogById)
router.route("/:blogId/comment/:id").get(verifyJWT, getBlogById)

// secured routes
router.route("/create").post(
  upload.fields([
    { name: "images", maxCount: 2 },
  ]),
  verifyJWT,
  createBlog
);

router.route("/:id/delete").delete(verifyJWT, deleteBlog)
router.route("/:id/like").post(verifyJWT, likeBlog)
router.route("/:id/comment").post(verifyJWT, comment)
router.route("/:blogId/comment/:id/delete").delete(verifyJWT, deleteComment)

export default router;


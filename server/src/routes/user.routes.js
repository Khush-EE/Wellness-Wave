import { Router } from 'express';
import {upload} from "../middleware/multer.middleware.js"

import {
    login,
    register,
    logout,
    getUserById,
    getAllUsers,
    updateUserProfile,
    updateMentalDisorder,
    getUserWithSameMentalDisorder,
    updateUserProfileImage,
} from "../controllers/user.controller.js"
import { verifyJWT } from '../middleware/auth.middleware.js';


const router = Router()

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/").get(getAllUsers)
router.route("/:id").get(getUserById)
router.route("/disorder/getUsersWithSameDisorder").get(getUserWithSameMentalDisorder)

// semi

// secured routes
router.route("/logout").post(verifyJWT, logout)
router.route("/:id/updateUserProfileImage").patch(upload.single('avatarImage'),verifyJWT, updateUserProfileImage)
router.route("/:id/updateUserProfile").post(verifyJWT, updateUserProfile)
router.route("/:id/updateDisorder").patch(verifyJWT, updateMentalDisorder)

export default router;
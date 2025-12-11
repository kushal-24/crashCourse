import { Router } from "express";
import { changeUserPass, createUser, deleteUser, getUserDetails, refreshAccessToken, userLogin, userLogout } from "../controllers/user.controller";
import { verifyJWT } from "../middlewares/auth.middleware";


const router=Router()

router.route("/signup").post(createUser);
router.route("/login").post(userLogin);
router.route("/logout").post(verifyJWT,userLogout);
router.route("/changepassword").post(verifyJWT ,changeUserPass);
router.route("/myprofile").get(verifyJWT ,getUserDetails);
router.route("/refreshtoken").post(refreshAccessToken);
router.route("/deleteaccount").delete(deleteUser);

export default router();


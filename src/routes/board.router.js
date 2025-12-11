import { Router } from "express";
import { createBoard, deleteBoard, getBoard, updateBoard } from "../controllers/board.controller";
import { verifyJWT } from "../middlewares/auth.middleware";
import { verify } from "jsonwebtoken";

const router=Router()

router.route("/createboard").post(verifyJWT,createBoard);
router.route("/viewboard").get(verifyJWT, getBoard);
router.route("/updateboard").patch(verifyJWT, updateBoard);
router.route("/deleteboard").delete(verifyJWT,deleteBoard);

export default router;

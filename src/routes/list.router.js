import { Router } from "express";
import { createList, deleteList, getLists, updateList } from "../controllers/lists.controller";
import { verifyJWT } from "../middlewares/auth.middleware";

const router= Router()

router.route("/boards/:boardId/createlists").post(verifyJWT, createList);
router.route("/boards/:boardId/getlist").get(verifyJWT, getLists);
router.route("/lists/:listId").patch(verifyJWT, updateList);
router.route("/lists/:listId").delete(verifyJWT, deleteList);

export default router;

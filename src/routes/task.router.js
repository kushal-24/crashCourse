import { Router } from "express";
import { createTask, getTasks, updateTask, deleteTask } from "../controllers/tasks.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { assignUser, fetchAllAssignees, unassignUser } from "../controllers/asignee.controller.js";

const router = Router();

router.post("/lists/:listId/tasks", verifyJWT, createTask);
router.get("/lists/:listId/tasks", verifyJWT, getTasks);
router.patch("/tasks/:taskId", verifyJWT, updateTask);
router.delete("/tasks/:taskId", verifyJWT, deleteTask);
router.route('/tasks/:taskId/assign').post(verifyJWT, assignUser);
router.route('/tasks/:taskId/unassign').post(verifyJWT, unassignUser);
router.route('/tasks/:taskId/getallassignee').get(verifyJWT, fetchAllAssignees);


export default router;

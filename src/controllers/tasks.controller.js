import { Task } from "../models/task.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";


const createTask=asyncHandler(async(req,res,next)=>{
    const { listId } = req.params;
    const{title, description,priority, date}=req.body;

    if([title, description,priority, date, order].some((prev)=>prev.trim()=="")){
        throw new apiError(400, "details are empty");
    }

    const task=Task.create({
        title,
        description,
        priority,
        date,
        createdBy: req.user?._id,
    });

    if(!task){
        throw new apiError(500, "server error in creating task");
    }


    return res.status(201).json(
        new apiResponse(201, task, "Task created successfully")
    );
})

const getTasks = asyncHandler(async (req, res) => {
    const { listId } = req.params;

    const tasks = await Task.find({ listId }).sort({ order: 1 });

    if(!tasks){
        throw new apiError(400, "server error in finding tasks");
    }

    return res.status(200).json(
        new apiResponse(200, tasks, "Tasks fetched successfully")
    );
});

const updateTask = asyncHandler(async (req, res) => {
    const { taskId } = req.params;
    const updateData = req.body; //Because right now your task system is basic, and flexibility helps.

    const updated = await Task.findByIdAndUpdate(
        taskId,
        updateData,
        { new: true }
    );

    if (!updated) {
        throw new apiError(404, "Task not found");
    }

    return res.status(200).json(
        new apiResponse(200, updated, "Task updated successfully")
    );
});

const deleteTask = asyncHandler(async (req, res) => {
    const { taskId } = req.params;

    const deleted = await Task.findByIdAndDelete(taskId);

    if (!deleted) {
        throw new apiError(404, "Task not found");
    }

    return res.status(200).json(
        new apiResponse(200, {}, "Task deleted successfully")
    );
});

export{deleteTask, updateTask, getTasks, createTask};



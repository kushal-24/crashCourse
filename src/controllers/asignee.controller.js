import asyncHandler from "../utils/asyncHandler";
import apiError from "../utils/apiError";
import apiResponse from "../utils/apiResponse";
import { User } from "../models/user.model";
import { Task } from "../models/task.model";

const assignUser=asyncHandler(async(req,res,next)=>{
    const {taskId}=req.params;
    const {userId}= req.body;

    const task = await Task.findById(taskId);
    if(!taskId){
        throw new apiError(400, "no task found");
    }

    const user= await User.findById(userId);
    if(!userId){
        throw new apiError(400, "problem in userId");
    }
    
    if(taskask.assignees.includes(userId)){
        throw new apiError(400, "this user is already assigned for the task");
    }

    task.assignees.push(userId);
    await task.save();
    
    return res.status(200).json(
        new apiResponse(200, task, "User assigned successfully")
    );
})

const unassignUser=asyncHandler(async(req,res,next)=>{
    const {taskId}=req.params;
    const {userId}= req.body;

    const task = await Task.findById(taskId);
    if(!taskId){
        throw new apiError(400, "no task found");
    }

    const user= await User.findById(userId);
    if(!userId){
        throw new apiError(400, "problem in userId");
    }
    
    if(!taskask.assignees.includes(userId)){
        throw new apiError(400, "this user was not assigned for the task");
    }

    task.assignees.filter(id => id !== userId);
    await task.save();

    return res.status(200).json(
        new apiResponse(200, task, "User assigned successfully")
    );
})

const fetchAllAssignees=asyncHandler(async(req,res,next)=>{
    const {taskId}=req.params;

    const task= await Task.findById(taskId).populate("assignees", "-password -refreshToken");


    if(!task){
        throw new apiError(400, "no task found by id");
    }

    const allAssignees=task.assignees;

    return res
    .status(200)
    .json( new apiResponse( 200,
        "fetched all assignees succsssfully!",
        allAssignees))
})

export{fetchAllAssignees, unassignUser,assignUser}
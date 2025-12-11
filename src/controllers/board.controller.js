import { Board } from "../models/board.model";
import asyncHandler from "../utils/asyncHandler";
import apiError from "../utils/apiError";

const createBoard= asyncHandler( async(req,res)=>{
    const{title, description}=req.body;

    if([title, description].some((item)=>item.trim()=="")){
        throw new apiError(400, "details are incomplete owner");
    }
    const existingBoard= Board.findById(Board._id);

    if(existingBoard){
        throw new apiError(400, "Board with the given name already exists");
    }

    const board= await Board.create({
        title,
        description,
        OwnerId: req.Admin?._id
    })

    const createdBoard= await Board.findOne({title});
    if (!createdBoard) {
        throw new apiError(500, "New board wasn't created")
    }

    return res
    .status(200)
    .json(
        new apiResponse(200, "board has been created successfully")
    )
})

const getBoard=asyncHandler(async(req,res)=>{
    const{Name}=req.body;

    const board= await Board.findOne({Name});

    if(!board){
        throw new apiError(400, "no such board exists, sorry");
    }

    return res
    .status(200)
    .json(
        new apiResponse(200, 
            board,
            "all board details fetched successfully"
        )
    )
})

const updateBoard=asyncHandler(async(req,res)=>{
    const{description, title}=req.body;

    if ([title, description].some((field) => field?.trim() === "")) {
        throw new apiError(400, "Fields cannot be empty");
    }

    const board= await Board.findOneAndUpdate(
        req.params.id,
        {$set:{title, description}},
        { new: true }
    );
    if (!board) {
        throw new apiError(400, "No such board updated");
    }
    return res
        .status(200)
        .json(
            new apiResponse(
                200,
                board,
                "board details are updated successfully"
            )
        )
})

const deleteBoard = asyncHandler(async (req, res) => {
    const { title } = req.body;

    const board = await Board.findOneAndDelete({ title });

    if (!board) {
        throw new apiError(404, "No board found with the given title");
    }

    return res.status(200).json(
        new apiResponse(200, board, "Board deleted successfully")
    );
});

export {createBoard, updateBoard, getBoard, deleteBoard};
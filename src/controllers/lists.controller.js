import asyncHandler from '../utils/asyncHandler'
import apiError from '../utils/apiError'
import { List } from '../models/list.model';
import apiResponse from '../utils/apiResponse'

const createList = asyncHandler(async (req, res) => {
    const { boardId } = req.params;
    const { title } = req.body;

    if (!title) {
        throw new apiError(400, "Title is required");
    }

    const list = await List.create({
        title,
        boardId,
    });

    return res.status(201).json(
        new apiResponse(201, list, "List created successfully")
    );
});

const getLists = asyncHandler(async (req, res) => {
    const { boardId } = req.params;

    const lists = await List.find({ boardId }).sort({ order: 1 });

    return res.status(200).json(
        new apiResponse(200, lists, "Lists fetched successfully")
    );
});

const updateList = asyncHandler(async (req, res) => {
    const { listId } = req.params;
    const { title } = req.body;

    if (!title) {
        throw new apiError(400, "Title is required");
    }

    const updatedList = await List.findByIdAndUpdate(
        listId,
        { title },
        { new: true }
    );

    if (!updatedList) {
        throw new apiError(404, "List not found");
    }

    return res.status(200).json(
        new apiResponse(200, updatedList, "List updated successfully")
    );
});

const deleteList = asyncHandler(async (req, res) => {
    const { listId } = req.params;

    const deleted = await List.findByIdAndDelete(listId);

    if (!deleted) {
        throw new apiError(404, "List not found");
    }

    return res.status(200).json(
        new apiResponse(200, {}, "List deleted successfully")
    );
});

export {createList, getLists, updateList, deleteList};




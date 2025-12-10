import mongoose, { Schema } from "mongoose"

const boardSchema= new Schema({
    Name:{
        type: String,
        required:true,
    },
    Description:{
        type: String,
        required: true,
    },
    OwnerId:{
        type: Number,
        ref: "admin",
        required:true,
    }
},{timestamps:true})

export const Board= mongoose.model('Board',boardSchema);
import mongoose, { Schema } from "mongoose";
const eventSchema= new Schema({
    Name: {
        type: String,
        required: true,
    },
    Description: {
        type: String,
        required: true,
    }
}, {timestamps: true})

export const Event= mongoose.model("events", eventSchema)
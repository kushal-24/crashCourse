import mongoose from 'mongoose'
import { DB_NAME } from '../constants.js'
import dotenv from 'dotenv'
dotenv.config({
    path: '/.env',
})

const connectDB=async()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`hogaya bhaii connect database`)
    } catch (error) {
        console.log(`connection has failed`);
        process.exit();
    }
}

export default connectDB
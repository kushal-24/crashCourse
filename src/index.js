import express from 'express'
import dotenv from "dotenv";
import connectDB from './db/index.js';
dotenv.config();

const app=express();

connectDB()

app.get('/',(req,res)=>{
    res.send('server is Live!');
})

const port=process.env.PORT||3000;

app.listen(port, ()=>{
    console.log(`🚀 Server running at http://localhost:${port}`);
})
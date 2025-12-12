import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

const app=express();

app.use(cors({
    origin: process.env.CORS_ORIGIN, //👉 “Allow this frontend to access my backend and allow cookies.”
    credentials: true,
}))
app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit:"16kb"}));
app.use(express.static("public"))
app.use(cookieParser());

import boardRouter from './routes/board.router';
import userRouter from './routes/user.router';
import taskRouter from './routes/task.router'


app.use('/api/v1/user/', userRouter);
app.use('/api/v1/board/', boardRouter);
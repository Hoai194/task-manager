import express from 'express'
import cors  from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import userRouter from './routes/userRoute.js';
import taskRouter from './routes/taskRoute.js';
import tagRouter from './routes/tagRoute.js';
import projectRouter from './routes/projectRoute.js';

const app = express();
app.use(cors());
dotenv.config();
app.use(express.json());

connectDB();

app.use('/api/user', userRouter);
app.use('/api/task', taskRouter);
app.use('/api/tag', tagRouter);
app.use('/api/project', projectRouter);


app.listen(process.env.PORT, ()=>{
    console.log("SERVER RUN!!!");
})
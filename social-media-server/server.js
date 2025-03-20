import express from 'express';
import cookieParser from 'cookie-parser';


import userRouter from './routes/userRouter.js';

import connectMongoDB from './db/connectMongoDB.js';


const app = express();

app.use(cookieParser());

console.log(process.env.MONGO_URI);

const port=process.env.PORT;

app.use('/test',userRouter);

app.listen(port,()=>{
    console.log(`Server is runnig in the port having the port number: ${port}`);
    connectMongoDB();
})
import express from 'express';
import dotenv from 'dotenv';

const app = express();  // create an express app

app.use(express.json()); // middleware to parse JSON bodies

// Load environment variables
dotenv.config();

// import routes here

import userRouter from './routes/user.route.js';
import postRouter from './routes/post.routes.js';

// route declaration

app.use('/api/v1/users', userRouter);
app.use('/api/v1/posts', postRouter);

// example root route: http://localhost:8000/api/v1/users/register


export default app;
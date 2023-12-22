require('dotenv').config();
import express,{NextFunction, Request, Response} from 'express';
export const app = express();
import cors from 'cors';
import cookieParser from 'cookie-parser';
import {ErrorMiddleware} from './middleware/error';
import userRouter from './routes/user.route';

// body parser
app.use(express.json({ limit: '50mb' }));

// cookies parser
app.use(cookieParser());

// cors
app.use(cors({ credentials: true, origin: process.env.ORIGIN }));

// test route
app.use('/api/v1', userRouter);

// testing API
app.get('/test', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        success: true,
        message: 'API is working',
    });
});

// unknown route
app.all('*', (req: Request, res: Response, next: NextFunction) => {
    const err = new Error(`Route ${req.originalUrl} not found`) as any;
    err.statusCode = '404';
    next(err);
});

app.use(ErrorMiddleware);
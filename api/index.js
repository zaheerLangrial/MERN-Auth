import express from 'express';
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
import cors from 'cors'
import cookieParser from 'cookie-parser';
dotenv.config()

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('Done hugyaa.....')
}).catch((error) => {
    console.log(error)
})

const app = express();

// 

app.use(express.json());

app.use(
    cors({
        origin : ['http://localhost:5173'],
        credentials : true
    })
)

app.use(cookieParser())

app.listen(3000 , () => {
    console.log('Server listening on port 3000')
})


app.get('/' , (req , res) => {
    res.json({
        message: 'Api is Working',
    });
});

app.use('/api/user' , userRoutes)
app.use('/api/auth' , authRoutes)


app.use((err , req , res , next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internet server error';
    return res.status(statusCode).json({
        success : false,
        message,
        statusCode,
    })
})
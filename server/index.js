import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import 'dotenv/config'
import connectDB from './dB/dB.js'
import errorHandler from './middlewares/errorHandler.middleware.js'
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import { apiLimiter } from './middlewares/rateLimiter.middleware.js';


import companyRouter from './routes/company.routes.js'
import jobRouter from './routes/job.routes.js'
import userRouter from './routes/user.routes.js'
import authRouter from './routes/auth.routes.js'


// Initialize express
const app = express()

// Connect to database
await connectDB()

// Middlewares
const corsOptions = {
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(helmet());
app.use('/api/', apiLimiter);
app.use(express.json({ limit: '10mb' })) // body parser with size limit
app.use(express.urlencoded({ extended: true, limit: '10mb' })) 


// Route
app.get('/',(req,res) => res.send("API Working"))

app.use('/api/company', companyRouter);
app.use('/api/jobs', jobRouter);
app.use('/api/users', userRouter)
app.use('/api/auth', authRouter)


app.use(errorHandler) // Middlewares

// PORT 
const PORT = process.env.PORT || 5000

app.listen(PORT, ()=> {
    console.log(`⚙️ Server is running at port :  ${PORT}`)
})
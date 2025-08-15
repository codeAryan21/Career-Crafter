import './utils/instrument.js'
import express from 'express'
import * as Sentry from "@sentry/node"
import cors from 'cors'
import 'dotenv/config'
import connectDB from './dB/dB.js'
import { clerkWebHooks } from './controllers/webHooks.js'
import { clerkMiddleware } from '@clerk/express'
import errorHandler from './middlewares/errorHandler.middleware.js'


import companyRouter from './routes/company.routes.js'
import jobRouter from './routes/job.routes.js'
import userRouter from './routes/user.routes.js'



// Initialize express
const app = express()

// Connect to database
await connectDB()

// Middlewares
app.use(cors())
app.use(express.json()) // body parser 
app.use(clerkMiddleware())


// Route
app.get('/',(req,res) => res.send("API Working"))
app.post('/webhooks', clerkWebHooks)

app.use('/api/company', companyRouter);
app.use('/api/jobs', jobRouter);
app.use('/api/users', userRouter)


app.use(errorHandler) // Middlewares

// PORT 
const PORT = process.env.PORT || 5000

Sentry.setupExpressErrorHandler(app);

app.listen(PORT, ()=> {
    console.log(`⚙️ Server is running at port :  ${PORT}`)
})
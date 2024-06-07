import  express  from "express";
import morgan from 'morgan';
import authRoutes from './routes/auth.routes.js'
import cookieParser from "cookie-parser";
import cors from 'cors'
import { FRONT_END_URL } from "./config.js";
const app= express()
app.use(cors({
    origin : FRONT_END_URL,
    credentials :true

}))
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
app.use("/api",authRoutes)





export default app; 

import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"



const app = express()

app.use(cors(
    {
        origin : process.env.CORS_ORIGIN,
        credentials : true
    }
))
// jab json data aaye tab 
app.use(express.json({limit:"20kb"}))
// jab url se data aaye tab wo %20 dikhta hai waise wala
app.use(express.urlencoded({extended: true, limit: "20kb"}))

app.use(express.static("public"))
app.use(cookieParser())

// routes import

import useRouter from "./routes/user.routes.js"

//routes declaration syntax

app.use("/api/v1/users",useRouter)
// apn api bana rahe so uska version likhna is good practise
// https://localhost:8000/users/register/



export {app}
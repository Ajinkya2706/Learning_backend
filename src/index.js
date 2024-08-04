
// require('dotenv').config({path : './env'});

import dotnev from "dotenv"

import connectDB from "./db/index.js";

dotnev.config({
    path : './env'
})




connectDB()

/*
import express from "express"
const app = express()

( async () =>{
    try {
    await  mongoose.connect(`${process.env.MONGO_DBURL} / ${DB_NAME}`)
    app.on("error" ,() => {
        console.log("ERROR", error);
        throw error
    })      
    
    app.listen(process.env.PORT, () =>{
        console.log(`App is Listening on port ${process.env.PORT}`);
    })
    }
     catch (error) {
                console.error("ERROR", error);
                throw err
                  }
    })()
                  */
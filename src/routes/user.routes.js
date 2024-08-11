import { Router } from "express";
import registerUser from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router =  Router()


router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount : 1
        },
        {
            name: "coverImage",
            maxCount : 1
        }
    ]),
    
    // yaha humne middleware add kiya avatr and coverImage ke liye
    // so post route pe jane ke pehele middleware se baa karne jayenge
    
    registerUser)












export default router
import mongoose, {Schema} from "mongoose";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import bcrypt from "bcrypt"
import { json } from "express";


const userSchema = new Schema(
    {
        username : {
            type : String,
            required : true,
            unique : true, 
            lowercase : true,
            trim : true,
            // agar search karna hai to index ko true kar do
            index : true
        },

        email : {
            type : String,
            required : true,
            unique : true, 
            lowercase : true,
            trim : true,
         
            
        },
        fullname : {
            type : String,
            required : true,
            trim : true,
            // agar search karna hai to index ko true kar do
            index : true
        },

        avatar : {
            type : String, //cloudnary url
            required : true,
           
        },

        coverImage : {
            type : String // cloudnary url
        },

        watchHistory: [
            {
                type : Schema.Types.ObjectId,
                ref : "Video"
            }
        ],
        password : {
            type : String,
            required : [true, "password is required"]
        },
        refreshToken:{
            type: String
        },
        

    }, {timestamps : true})


// agar pre ke function me this ka context nahi hota sso aise use karo
    userSchema.pre("save", async function (next){
        // hash me jo apne ko encrypt karna hai and kitne rounds dene hai 
        // wo pass karenge and hone ke baad  next ko call karenge
        if(!this.isModified("password")) return next();
        // mtlb jab hi password modify hoga tab hi password hash me convert hoga 
        // nahi to return ho jayega
        this.password = bcrypt.hash(this.password,10)

        next()
    })

    // yaha pe hum apni method bana rahe hai pass check ke liye 
    // system me jara hai so async and await use kar rahe hai 
    userSchema.methods.isPasswordCorrect = async function(password) {
        return await bcrypt.compare(password, this.password)
    }

    // ek aur method token access karne ke liye user ke 
userSchema.methods.generateAccessToken = function(){
    return  jwt.sign({
        // ye to data base se aayengi 
        _id : this._id,
        email : this.email,
        username : this.username,
        fullname : this.fullname
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        TokenExpiredError: process.env.ACCESS_TOKEN_EXPIRY
    }
    )
    }
userSchema.methods.generateRefreshToken = function(){
    return  jwt.sign({
        // ye to data base se aayengi 
        _id : this._id,
       
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        TokenExpiredError: process.env.REFRESH_TOKEN_EXPIRY
    }

)
}



export const User = mongoose.model("User", userSchema)


// // Most common Headers
//  Accept : application /json
//  Userr :agent, brower engine safari se wo sab yaha se nikala jata hai 
// authorization  beararer token
// content type , 
//  cookie, cache-control data ko kab remove karu wo likho 


// access control allow origin
// access ccontrol allow  Credential


/*
get : retrive a resource
put : replace a resource
post : interact with resource(mostly add)
delete : remove a resource
trace : loopback test(gett some data)



*/

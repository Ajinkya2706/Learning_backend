import {asyncHandler} from "../utils/asyncHandler.js"

const registerUser = asyncHandler( async (req,res) => {
   return res.status(200).json({
        message: "Hey are you finne"
    })
})


export default registerUser
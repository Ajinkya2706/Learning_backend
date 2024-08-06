const asyncHandler = (requestHandler) =>{
    (req,res,next) => {
        Promise.resolve(requestHandler(req,res,next)).
        catch((err) =>next(err))
    }
}

export {asyncHandler}

// const asyncHandler = () =>{}
// const asyncHandler = (func) => () =>{}
// const asyncHandler = (func) => async() =>{}


// apan ek wrapper function bana rahe hai so apna kaam aasan hoo
// const asyncHandler = (fn) => async(req,res,next) =>{
//     try {
        
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success: false,
//             message : err.message
//         })
//     }
// }
// import  jwt  from "jsonwebtoken";
// import {asyncHandler} from "./asyncHandler.js";
// import { MyError } from "../utils/myError.js";
// export const protect = asyncHandler(async(req, res, next) => {
//     if(!req.headers.authorization){
//         throw new MyError("ene uildeliig hiihed tanii erh hurehgui bn. Ta ehleed newtrej oroh ystoi!", 401);
//     }
//     const token = req.headers.authorization.split(" ")[1];
//     if(!token){
//         throw new MyError("Ta ehleed newtrej oroh ystoi!", 400);
//     }

//     const tokenObj = jwt.verify(token, process.env.JWT_SECRET);

//     // req.user = User.findById(tokenObj.id);
//     req.userId = tokenObj.id;
//     // req.userRole = tokenObj.role;
//     next();
// });
// export const authorize = (createUser, nowUser) => {
//     if (createUser != nowUser) {
//         return false
//         //throw new MyError(`Tanii erh ene uildlig hiihed hureltsehgui!`, 403);
//     }else{
//         return true
//     }
// }
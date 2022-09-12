import  jwt  from "jsonwebtoken";
import { MyError } from "../utils/myError.js";
export const protect = async(event) => {
    if(!event.headers.authorization){
        throw new MyError("ene uildeliig hiihed tanii erh hurehgui bn. Ta ehleed newtrej oroh ystoi!", 401);
    }
    const token = event.headers.authorization.split(" ")[1];
    if(!token){
        throw new MyError("Ta ehleed newtrej oroh ystoi!", 400);
    }

    const tokenObj = jwt.verify(token, process.env.JWT_SECRET);

    // req.user = User.findById(tokenObj.id);
    event.userId = tokenObj.id;
    // req.userRole = tokenObj.role;
};
export const authorize = (createUser, nowUser) => {
    if (createUser != nowUser) {
        return false
    }else{
        return true
    }
}
import { Human } from "../model/UserModel.js";
import { MyError } from "../utils/myError.js";

//user register
export const userRegister = async (event) => {
    const body = JSON.parse(event.body);
    const user = await Human.create(body);
    return {
        statusCode: 200,
        body: JSON.stringify(
          {
            success: true,
            user
          },
          null,
          2
        ),
      };
}

//user login 
export const userLogin = async (event) => {
  const {email, password} = JSON.parse(event.body);
  if (!email || !password) {
    throw new MyError("ta email eswel nuuts ugee oruulna uu", 401);
  }
  const user = await Human.findOne({email}).select("+password");
  if(!user){
    throw new MyError("email bolon nuuts ugee zow oruulna uu!", 401);
  }
  const pass = await user.checkPassword(password);
  if(!pass){
    throw new MyError("email bolon nuuts ugee zow oruulna uu!", 401);
  }
  return{
    statusCode: 200,
    body: JSON.stringify({
      success: true,
      token: user.getJsonWebToken(),
      user: user,
    })
  }
}


//data get 
export const humanGet = async (event) => {
    const user = await Human.find();
    return {
        statusCode: 200,
        body: JSON.stringify(
          {
            success: true,
            user
          },
          null,
          2
        ),
      };
}

//1 hereglegch awah
export const getUser = async(event) => {
  const user = await Human.findById(event.pathParameters.id);
  if(!user){
    throw new MyError("bhgu bn!!!", 401);
  }
  return{
    statusCode: 200,
    body: JSON.stringify({
      success: true,
      user
    })
  }
}
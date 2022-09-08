"use strict";
import  dotenv from "dotenv";
import { connectDB } from "./config/db.js"; 
import {userRegister, humanGet, userLogin} from "./controller/human.js"

dotenv.config({path: './config/config.env'});
export const hello = async (event) => {
  await connectDB();
  const route = event.pathParameters.routeName;
  const met = event.requestContext.http.method;
  switch(route){
    case "hello":
      if (met == "GET") {
        return humanGet(event)
      }
      if (met == "POST") {
        return userRegister(event)
      }
      break;
    case "login":
      if (met == "POST") {
        return userLogin(event);
      }
    default: return {}
    }
}

// module.exports.give = async (event) => {
//   const body = JSON.parse(event.body)
//   console.log(event);
//   return {
//     statusCode: 200,
//     body: JSON.stringify(
//       {
//         success: true,
//         statusCode: 200,
//         message: "hello AWS help!",
//         //input: event,
//         body,
//       },
//       null,
//       2
//     ),
//   };
// };

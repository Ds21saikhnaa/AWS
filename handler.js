"use strict";
import AWS from "aws-sdk";
import { connectDB} from "./dbConfig/db.js"; 
import { connectDDb} from "./dbConfig/ddb.js"; 
import {userRegister, humanGet, userLogin, getUser} from "./controller/userController.js";
import { getPosts, getUserPosts,newPost,getTimeline,deletePost } from "./controller/postController.js";
import {createPersonTable, createUser, getPerson, findPerson, updateUser, deleteUser} from "./controller/dynamoController.js";
import {protect} from "./middleware/protect.js"
import { Person, PersonTable } from "./model/PersonModel.js";

//connectDB();
const def = () => {
  return {
    statusCode: 200,
    body: "api is runnig...",
  };
};

export const hello = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  connectDB();
  const route = event.pathParameters.routeName;
  const met = event.requestContext.http.method;
  if(met === "GET") {
    switch (route) {
      case "getUsers":
        await protect(event);
        return humanGet(event);
      case "getUser":
        return getUser(event);
      case "getPosts":
        return getPosts(event);
      default:
        return def();
    }
  }
  if (met ==  "POST") {
    switch (route) {
      case "register":
        return userRegister(event);
      case "login":
        console.log(event);
        return userLogin(event);
      default:
        return def();
    }
  }
}


export const fileUpload = async(event) => {
  const s3 = new AWS.S3();
  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    
    region: "ap-southeast-1",
    signatureVersion: "v4",
  });
  const myBucket = "ds21test1";
  const myKey = "file-name33.png";
  const signedUrlExpireSeconds = 30000;
  const url = await s3.getSignedUrl("putObject", {
    Bucket: myBucket,
    Key: myKey,
    Expires: signedUrlExpireSeconds,
    ContentType: "image/*" || "video/*",
  });
  return {
    statusCode: 200,
    body: JSON.stringify({
      url: url,
    }),
  };
}

export const getPresignedUrl = async(event) => {
  const s3 = new AWS.S3();
  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    
    region: "ap-southeast-1",
    signatureVersion: "v4",
  });
  const myBucket = "ds21test1";
  const myKey = "file-name33.png";
  const signedUrlExpireSeconds = 30000;

  const geturl = await s3
    .getSignedUrl("getObject", {
      Bucket: myBucket,
      Key: myKey,
      Expires: signedUrlExpireSeconds,
    })
  return {
    statusCode: 200,
    body: JSON.stringify({
      url: geturl,
    }),
  };
}

export const dynamo = async (event) => {
  await connectDDb();
  const route = event.pathParameters.routeName;
  const paramsId = event.pathParameters.id;
  const met = event.requestContext.http.method;
  // console.log(event);
  if (met === "GET") {
    switch (route) {
      case "getPerson":
        return getPerson(event);
      case "findPerson":
        console.log(event);
        return findPerson(event, paramsId);
      default:
        return def();
    }
  }
  if(met === "POST"){
    switch(route){
      case "createPerson":
        return createUser(event);
      default: 
        return def();
    }
  }
  if (met === "PUT") {
    switch (route) {
      case "updatePerson":
        return updateUser(event, paramsId);
      default:
        return def();
    }
  }
  if (met === "DELETE") {
    switch (route) {
      case "deleteUser":
        return deleteUser(event, paramsId);
        default:
          return def();
    } 
  }
};

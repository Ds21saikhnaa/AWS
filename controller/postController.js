import { Post } from "../model/PostModel.js";
import { MyError } from "../utils/myError.js";
import { TimeLine } from "../model/TimeLine.js";
import { authorize } from "../middleware/protect.js";

//new post
export const getPosts = async(event) => {
    const post = await Post.find().populate("createUser").lean();
    return {
        statusCode: 200,
        body: JSON.stringify(
          {
            success: true,
            count: post.length,
            post: post
          },
          null,
          2
        ),
    };
};

//get user post
export const getUserPosts = async(event) => {
    const post = await Post.find({"createUser":req.params.id}).populate("createUser").lean();
    return {
        statusCode: 200,
        body: JSON.stringify(
          {
            success: true,
            post
          },
          null,
          2
        ),
    };
}
//new post
export const newPost = async( event) => {
    const userId = req.userId;
    const post = await Post.create({...req.body, createUser:userId});
    const followers = await Follow.find({
        follower: userId,
      }).lean();
      followers.forEach(async (user) => {
        TimeLine.create({
            follower: user.follower,
            following: user.following,
            post: post._id,
        //   following: user._id,
        //   follower: userId,
        //   post: post._id,
        });
      });
      return {
        statusCode: 200,
        body: JSON.stringify(
        {
            success: true,
            post: post
        },
          null,
          2
        ),
    };
};
//getTimeLine
export const getTimeline = async (event) => {
    const userId = req.userId;
    const timelines = await TimeLine.find({
      following: userId,
    })
      .populate("following")
      .populate("post")
      .lean();
      return {
        statusCode: 200,
        body: JSON.stringify(
          {
            success: true,
            count: timelines.length,
        data: timelines,
          },
          null,
          2
        ),
    };
}
//delete post
export const deletePost = async(event) => {
    const post = await Post.findById(req.params.id);
    if(!post){
        throw new MyError("iim post bhgui bn!", 404);
    }
    let create = post.createUser.toString();
    let flag = authorize(create, req.userId);
    if (!flag) {
        throw new MyError("ene uildeliig hiihed tanii erh hurehgui!", 404);
    }
    post.remove();
    return {
        statusCode: 200,
        body: JSON.stringify(
          {
            success: true,
          },
          null,
          2
        ),
    };
};
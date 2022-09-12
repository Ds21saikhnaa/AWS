import { MyError } from "../utils/myError.js";
import { Post } from "../models/PostModel.js";
import { authorize } from "../middleware/protect";

//getComment
export const getComments = asyncHandler(async(req, res, next) => {
    const post = await Post.findById(req.params.id);
    if(!post){
        throw new MyError("iim post bhgui bn!", 404);
    };

    const comments = await post.comments;
    res.status(200).json({
        success: true,
        comments
    });
});

//newComment 
export const newComment = asyncHandler(async( req, res, next) => {
    const userId = req.userId;
    const post = await Post.findById(req.params.id);
    if(!post){
        throw new MyError("iim post bhgui bn!", 404);
    }
    const result = await post.comments.push({...req.body,userId });
    await post.save()
    res.status(200).json({
        success: true,
        result
    });
});


//update comment
export const updateComment = asyncHandler(async(req, res, next) => {
    const post = await Post.findById({ _id: req.params.id, "comments._id": req.body.commentId });
    let create = post.createUser.toString();
    let flag = authorize(create, req.userId);
    if (!flag) {
        throw new MyError("ene uildeliig hiihed tanii erh hurehgui!", 404);
    }
    for(let atr in post.comments){
        if(post.comments[atr]._id.toString() === req.body.commentId){
            post.comments[atr].comment = req.body.comment;
        }
    }
    await post.save();
    // Post.findOneAndUpdate({ _id: req.params.id, "comments._id": req.body.commentId },
    //      { $set: { 'comments.$.comment': req.body.comment } }, { new: true }, 
    //      function(err, doc) {
    //     (err ? res.status(400).send(err) : res.status(200).json(doc));
    //     });
        res.status(200).json({
            success: true,
            post
        });
});

//delete comment
export const deleteComment = asyncHandler(async(req, res, next) => {
    const post = await Post.findById(req.params.id);
    if(!post){
        throw new MyError("iim post bhgui bn!", 404);
    }
    let create = post.createUser.toString();
    let flag = authorize(create, req.userId);
    if (!flag) {
        throw new MyError("ene uildeliig hiihed tanii erh hurehgui!", 404);
    }
    post.comments.remove(req.body.commentId);
    await post.save();
    res.status(200).json({
        success: true,
        post
    });
});
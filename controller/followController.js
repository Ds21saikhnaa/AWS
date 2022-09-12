import { MyError } from "../utils/myError.js";
import { Follow } from "../models/FollowModel.js";

export const follow = asyncHandler(async (req, res, next) => {
    const follower = req.userId;
    const following = req.body.following;
    const follows = await Follow.create({ follower, following });
    res.status(200).json({
        follows
    });
});
  
export const following = async (req, res) => {
    const follower = req.userId;
    const follows = await Follow.find({ follower })
      .populate("following")
      .populate("follower")
      .lean();
    res.send(follows);
};
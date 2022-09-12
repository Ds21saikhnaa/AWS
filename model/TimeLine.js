import mongoose from "mongoose";
const { Schema } = mongoose;

const timeLine = new Schema(
    {
        follower: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
          following: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        post: {
            type: Schema.Types.ObjectId,
            ref: "Post",
            required: true,
        },   
    },
    {timestamps: true}
);

export const TimeLine = mongoose.model("timeline", timeLine);
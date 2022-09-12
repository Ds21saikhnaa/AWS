import mongoose from "mongoose";
const { Schema } = mongoose;

const followSchema = new Schema(
    {
        follower: {
            type: mongoose.Schema.ObjectId,
            ref:"Human",
            required: true
        },
        following: {
            type: mongoose.Schema.ObjectId,
            ref:"Human",
            required: true
        }
    },
    {
        timestamps: true,
    }
);

// followSchema.statics.computeFollowerCount = async function(userId) {
//     const obj = await this.aggregate([
//         {$match: {follower: userId}},
//        // {$match: {following: userId}},
//         {$group: {_id: "$follower", followerCount:{$sum:1}}},
//     ]);
//     console.log(obj);

//     // await this.model("User").findByIdAndUpdate(catId, {
//     //     averagePrice: obj[0].avgPrice,
//     // });
//     // return obj;
// }

// followSchema.post("save", function() {
//     this.constructor.computeFollowerCount(this.follower);
// });

export const Follow = mongoose.model("Follow", followSchema);
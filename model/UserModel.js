import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "Ta neree zaawal oruulna uu!"]
    },
    email: {
        type: String,
        required: [true, "hereglegchiin email zaawal oruulna uu!"],
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "email hayg buruu bn!"]
    },
    password:{
        type:String,
        minlength: 4,
        required: [true, "nuuts ugee oruulna uu!"],
        select: false
    },
    proFilePhoto :{
        type: String,
        default: "https://secure.gravatar.com/avatar/4b21ce3917fcb75324268ba4d3143c37?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-0.png",
    },
    followers:{
        type: Number,
        default: 0
    },
    following:{
        type: Number,
        default: 0
    },
    posts:{
        type: Number,
        default: 0
    },
},{timestamps: true});

UserSchema.pre("save", async function(next) {
    // if(!this.isModified("password")) next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// UserShema.pre("remove",async function (next){
//     await this.model("Post").deleteMany({createUser: this._id})
//     next();
// });

UserSchema.methods.getJsonWebToken = function(){
    const token = jwt.sign({id: this._id, name: this.name}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRESIN
    });
    console.log('token')
    return token;
};

UserSchema.methods.checkPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

export const Human = mongoose.model("Human", UserSchema);
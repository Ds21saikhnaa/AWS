import mongoose from "mongoose";
export const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
    //     useCreateIndex: true,
    //   useFindAndModify: false,
      useUnifiedTopology: true,
    }); 
    console.log(`MongoDB холбогдлоо : ${conn.connection.host}`);
}
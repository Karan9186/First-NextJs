import mongoose from "mongoose"
import env from "dotenv"

env.config()
export const mongooseConnection = async () => {
    // const mongooseURL = process.env.MONGOOSE_URL
    // if (!mongooseURL) {
    //     throw new Error("MONGOOSE_URL environment variable is not defined");
    // }
    await mongoose.connect("mongodb://localhost:27017/userproduct")
}
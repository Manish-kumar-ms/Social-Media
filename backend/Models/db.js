import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

const mongo_url=process.env.MONGODB_URL

const connectDB=()=>{
    mongoose.connect(mongo_url)
    .then(()=>{
        console.log("mongoose connect sucessfully")
    })
    .catch((err)=>{
        console.log(err)
    })
}
export default connectDB
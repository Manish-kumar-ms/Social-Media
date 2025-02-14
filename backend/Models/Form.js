import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        
    },
    socialhandle:{
        type:String,
        required :true,
        unique:true
    },
    image:[
    {
        type:String,
        required:true,
    },
    ]
})

const UserForm=mongoose.model('Form',userSchema)
export default UserForm
import mongoose from "mongoose";


const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        trim:true,
        index:true,
    },
    description:{
        type:String,
        trim:true,
    },
    owner:{
        type:mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    isComment:{
        type:Boolean,
        default:false,
    },
    images:[{
        type:String,
    }],
    tags:[{
        type:String,
    }],
    noOfLikes:{
        type:Number,
        default:0,
    },
    comment:[{
        type:mongoose.Types.ObjectId,
        ref: "Blog"
    }],
}, {timestamps:true})

export const Blog = mongoose.model('Blog', blogSchema)

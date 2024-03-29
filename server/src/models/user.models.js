import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required:true,
        trim:true,
        index: true,
    },
    email:{
        type:String,
        lowercase: true,
        required:true,
        trim:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    phoneNumber:{
      type:Number,
    },
    refreshToken:{
        type:String,
    },
    avatarImage:{
        type:String,
    },
    mentalDisorder:[{
      type:String,
    }],
    blogs: [{
        type:mongoose.Types.ObjectId,
        ref: "Blog"
    }],
    blogHistory:[{
        type:mongoose.Types.ObjectId,
        ref: "Blog"
    }],
    likedBlogs:[{
        type: mongoose.Types.ObjectId,
        ref: "Blog"
    }],
}, {timestamps: true})

userSchema.pre("save", async function(next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    return next();
});

userSchema.methods.isPasswordCorrect = async function(password){
    // password correct or not
    // returns true or false
    return await bcrypt.compare(password, this.password)
}


userSchema.methods.generateAccessToken = async function(){
    return jwt.sign({
        _id: this._id,
        username: this.username,
        fullName: this.fullName,
        email: this.email        
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    })
}

userSchema.methods.generateRefreshToken = async function(){
    return jwt.sign({
        _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    })
}


export const User = mongoose.model("User", userSchema)
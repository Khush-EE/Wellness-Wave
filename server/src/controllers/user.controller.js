import {User} from "../models/user.models.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"
import { uploadOnCloud } from "../utils/cloudinary.js"
import jwt from "jsonwebtoken"


export const generateAccessAndRefreshToken = async(id) => {
    const user = await User.findById(id)

    if(!user){
        throw new ApiError(401, "Unauthorized access")
    }

    const accessToken = await user.generateAccessToken()
    const refreshToken = await user.generateRefreshToken()

    user.refreshToken = refreshToken

    await user.save({validateBeforeSave: false})

    return {accessToken, refreshToken}
}

export const renewLoggedinSession = asyncHandler(async(req, res) => {
  const token = req.cookies?.refreshToken || req.header("Authorizaton")?.replace("Bearer ", "")
  
  if(!token){
    throw new ApiError(401, "unauthorized user")
  }

  const decodedToken = await jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
  
  let user = await User.findById(decodedToken?._id)
  
  if(!user){
    throw new ApiError(401, "Unauthorized request")
  }

  const accessToken = await user.generateAccessToken()
  user.accessToken = accessToken
  await user.save({validateBeforeSave:false})

  const sendUser = await User.findById(decodedToken?._id).select("-password -refreshToken -role")


  return res
    .status(200)
    .cookie("accessToken", accessToken, {
      sameSite: false,
      maxAge: 24 * 60 * 60 * 1000,
  })
    .json(new ApiResponse(200, {"user" :sendUser}, "access token generated successfully"))
})

export const register = asyncHandler(async(req, res) => {
    const { username, fullName, email, password } = req.body

    if([username, fullName, email, password].some((field)=> !field || field.trim() === "")){
        throw new ApiError(401, "All the fields are required!!!")
    }
    
    const userExists = await User.findOne({
        $or : [{username}, {email}]
    })

    if(userExists){
        throw new ApiError(400, "User with same username or email already exists")
    }

    const user = await User.create({
        username,
        fullName,
        email,
        password,
    })

    if(!user){
        throw new ApiError(500, "Error while register user")
    }

    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if(!createdUser){
        throw new ApiError(500, "Error while register user (search me nhi mile for createdUser)")
    }

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            {
                createdUser
            },
            "User registerd successfully"
        ))
})

export const login = asyncHandler(async(req, res) => {
    const { email, password } = req.body

    if(!email && !password){
        throw new ApiError(400, "Email and Password both are required")
    }

    const user = await User.findOne({email})

    if(!user){
        throw new ApiError(404, "User not found, please register first")
    }

   const isPasswordValid = await user.isPasswordCorrect(password)

    if(!isPasswordValid){
        throw new ApiError(403, "Unauthorized access, password is incorrect")
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    return res
        .status(200)
        .cookie("accessToken", accessToken, {
            sameSite: false,
            maxAge: 24 * 60 * 60 * 4000,
        })
    .cookie("refreshToken", refreshToken, {
        sameSite: false,
        maxAge: 24 * 60 * 60 * 10000,
    })
        .json(new ApiResponse(
            200, 
            {
                loggedInUser
            },
            "User logged in successfully"
        ))
})

export const logout = asyncHandler(async(req, res)=>{

    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken : undefined
            }
        }
    )

    const options = {
        // httpOnly: true,
        // sameSite: none,
        // secure: true,
    }

    return res
        .status(200)
        .clearCookie("refreshToken")
        .clearCookie("accessToken")
        .json(new ApiResponse(
            200,
            {},
            "User logged off successfully"
        ))
})

export const getUserById = asyncHandler(async(req, res) => {
    const { id } = req.params

    if(!id){
        throw new ApiError(400, "Id is required, bad request")
    }

    let user;

    try {
        user = await User.findById(id)?.select("-password -refreshToken")
    
    } catch (error) {
        throw new ApiError(400, "Invalid id, bad request")
    }

    if(!user){
        throw new ApiError(400, "Invalid id, Bad request")
    }


    return res
        .status(200)
        .json(new ApiResponse(
            200,
            {
                user
            },
            "User fetched successfully"
        ))
})

export const getAllUsers = asyncHandler(async(req, res) => {
    
    const user = await User.find()?.select("-password -refreshToken")

    if(!user){
        throw new ApiError(500, "Error on server")
    }

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            {
                user
            },
            "All users fetched successfully"
        ))

})

export const updateUserProfile = asyncHandler(async(req, res) => {
    const loggedInUser = req.user
    const {id} = req.params

    const {fullName, email} = req.body

    if(!loggedInUser){
        throw new ApiError(401, "User must be logged in to user these features")
    }

    if(!id){
        throw new ApiError(400, "Invalid user id")
    }

    if([fullName, email].some((field) => !field || field.trim() === "")){
        throw new ApiError(400, "All fields are required!!")
    }

    const user = await User.findByIdAndUpdate(loggedInUser._id, {
      $set : {
        fullName, email
      },
      $new:true,
    })

    if(!user){
        throw new ApiError(404, "User not found!!")
    }

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            {
                user
            },
            "User updated successfully"
        ))
})

export const updateMentalDisorder = asyncHandler(async(req, res) => {
  const loggedInUser = req.user
  const id = req.params.id
  const disorder = req.body.disorder

  if(!id){
    throw new ApiError(400, "Invalid user id")
  }

  if(!loggedInUser){
    throw new ApiError(401, "User must be logged in to user these features")
  }

  if(!disorder){
    throw new ApiError(400, "mental disorder is required")
  }

  const user = await User.findById(loggedInUser._id)

  if(!user){
    throw new ApiError(404, "User does not exists")
  }

  if(!user.mentalDisorder.includes(disorder)){
    await user.mentalDisorder.push(disorder)
    await user.save({validateBeforeSave:false})
  }

  const userResponse = await User.findById(user._id).select("-password -refreshToken")

  if(!userResponse){
    throw new ApiError(404, "User does not exists")
  }

  return res
    .status(200)
    .json(new ApiResponse(
      200,
      {
        user : userResponse
      },
      "Mental disorder updated successfully"
    ))
})

export const getUserWithSameMentalDisorder = asyncHandler(async(req, res) => {
  const disorder = req.body.disorder

  if(!disorder){
    return res.status(200).json("Empty")
  }

  const usersWithSameDisorder = await User.aggregate([
    {
      $match : {
        mentalDisorder : {
          $in: [disorder]
        },
      }
    },
    {
      $project :{
        _id: 1
      }
    }
  ])

  console.log(usersWithSameDisorder)


  return res.status.json(
    new ApiResponse(
      200,
      {
        user : usersWithSameDisorder
      },
      "Users fetched successfully"
    )
  )
})
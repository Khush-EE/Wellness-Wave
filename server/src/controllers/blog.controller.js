
import { Blog } from "../models/blog.models.js";
import { User } from "../models/user.models.js";
import { Like } from "../models/likes.models.js";

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"
import { uploadOnCloud } from "../utils/cloudinary.js"
import mongoose from "mongoose";


export const createBlog = asyncHandler(async(req, res) => {
    const user = req.user
    
    if(!user){
        throw new ApiError(401, "unauthorised user, you must be logged in to post blogs")
    }

    const { title, description, tags } = req.body

    if([title, description].some((field) => !field || field?.trim() === "")){
        throw new ApiError(400, "Both title and description are required!!!")
    }

    const imagesLocalPath = req.files?.images;

    let images = [];

    if(imagesLocalPath){
      for (const image of imagesLocalPath) {
        const img = await uploadOnCloud(image?.path);
  
        if (!img) {
          throw new ApiError(500, "Error while uploading blog image to server");
        }
  
        images.push(img?.url);
      }
    }

    const blog = await Blog.create({
        title,
        description,
        tags,
        images: images,
        owner : user._id
    })

    if(!blog){
        throw new ApiError(500, "Error while creating blog!!!")
    }

    user.blogs.push(blog._id)
    await user.save({validateBeforeSave:false})

    const userBlogUpdate = await User.findById(user._id).select("-password -refreshToken")
    
    return res
        .status(200)
        .json(new ApiResponse(
            200,
            {
                blog, user:userBlogUpdate
            },
            "Blog created successfully"
        ))
})

export const getAllBlogs = asyncHandler(async(req, res) => {
    
    const blogs = await Blog.find({isComment: false}).sort({createdAt: -1})

    if(!blogs){
        throw new ApiError(500, "Error while fetching all the blogs")
    }

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            {
                blogs
            },
            "Fetched all blogs successfully"
        ))
})

export const deleteBlog = asyncHandler(async(req, res) => {
    const blogId = req.params.id
    const user = req.user

    if(!blogId){
        throw new ApiError(400, "invalid blog id")
    }

    if(!user){
        throw new ApiError(401, "Login to perform these actions")
    }

    const blog = await Blog.findById(blogId)

    if(!blog){
        throw new ApiError(400, "Invalid Blog Id")
    }

    if(!(String(user._id) == String(blog.owner))){
        throw new ApiError(401, "You are unauthorised to delete blogs of other users")
    }

    const comments = blog.comment

    const deletedComments = await Blog.deleteMany({ _id : comments})

    if(!deletedComments){
        throw new ApiError(500, "Not able to delete blog's comment")
    }

    const deletedBlog = await Blog.findByIdAndDelete(blogId)

    if(!deletedBlog){
        throw new ApiError(500, "Error while deleting blog")
    }

    user.blogHistory = user.blogHistory.filter(blog_Id => {return String(blog_Id) !== String(blogId)})
    user.blogs = user.blogs.filter(blog_Id => {return String(blog_Id) !== String(blogId)})
    await user.save({validateBeforeSave:false})

    const userResponse = {
      _id: user._id,
      username: user.username,
      fullName: user.fullName,
      email: user.email,
      avatarImage: user.avatarImage,
      blogs: user.blogs,
      blogHistory: user.blogHistory,
      likedBlogs: user.likedBlogs,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            {
                deleteBlog,
                "History" :user.blogHistory,
                "blogs" : user.blogs,
                user:userResponse
            },
            "Blog Deleted Successfully"
        ))
})

export const likeBlog = asyncHandler(async(req, res) => {
  const user = req.user
  const blogId = req.params.id

  if(!user){
      throw new ApiError(401, "unauthorised user, you must be logged in to like blogs")
  }

  if(!blogId){
      throw new ApiError(400, "Blog id is required")
  }

  const blog = await Blog.findById(blogId)

  if(!blog){
      throw new ApiError(400, "Blog id is invalid")
  }

  const like = await Like.findOne({blog: blogId, likedBy: user._id})

  if(like){
      await Like.findByIdAndDelete(like._id)

      blog.noOfLikes -= 1
      await blog.save({validateBeforeSave: false})

      user.likedBlogs = user.likedBlogs.filter(likedBlogId => {
          return String(likedBlogId) !== String(blogId)
      });
      await user.save({validateBeforeSave: false})

      const userResponse = {
        _id: user._id,
        username: user.username,
        fullName: user.fullName,
        email: user.email,
        avatarImage: user.avatarImage,
        blogs: user.blogs,
        blogHistory: user.blogHistory,
        likedBlogs: user.likedBlogs,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }

      return res
          .status(200)
          .json(new ApiResponse(
              200,
              {
                  blog,
                  user:userResponse
              },
              "Blog unliked successfully"
          ))
  }

  await Like.create({
      blog: blogId,
      likedBy: user._id
  })

  blog.noOfLikes += 1
  await blog.save({validateBeforeSave: false})

  user.likedBlogs.push(blogId)
  await user.save({validateBeforeSave: false})

  const userResponse = {
    _id: user._id,
    username: user.username,
    fullName: user.fullName,
    email: user.email,
    avatarImage: user.avatarImage,
    blogs: user.blogs,
    blogHistory: user.blogHistory,
    likedBlogs: user.likedBlogs,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  }

  return res
      .status(200)
      .json(new ApiResponse(
          200,
          {
              blog,
              user:userResponse
          },
          "Blog liked successfully"
      ))
})

export const getBlogById = asyncHandler(async(req, res) => {
    const blogId = req.params.id

    if(!blogId){
        throw new ApiError(400, "Blog id is required")
    }

    const blog = await Blog.findById(blogId)

    if(!blog){
        throw new ApiError(400, "Blog id is invalid")
    }


    return res
        .status(200)
        .json(new ApiResponse(
            200,
            {
                blog
            },
            "fetched blog successfully"
        ))
})

export const comment = asyncHandler(async(req, res) => {
  const user = req.user
  const id = req.params.id

  if(!user){
      throw new ApiError(401, "unauthorised user, you must be logged in to post blogs")
  }

  const { title, description } = req.body

  if(!description || description.trim() === ""){
    throw new ApiError(400, "Content is required!!!")
  }

  const imagesLocalPath = req.files?.images;

  let images = [];

  if(imagesLocalPath){
    for (const image of imagesLocalPath) {
      const img = await uploadOnCloud(image?.path);
  
      if (!img) {
        throw new ApiError(500, "Error while uploading blog image to server");
      }
  
      images.push(img?.url);
    }
  }

  const comment = await Blog.create({
      title: title || "",
      description,
      isComment: true,
      images: images,
      owner : user._id
  })

  if(!comment){
      throw new ApiError(500, "Error while creating blog!!!")
  }
  
  const userResponse = {
    _id: user._id,
    username: user.username,
    fullName: user.fullName,
    email: user.email,
    avatarImage: user.avatarImage,
    blogs: user.blogs,
    blogHistory: user.blogHistory,
    likedBlogs: user.likedBlogs,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  }

  const blog = await Blog.findById(id)

  blog.comment.push(comment._id)
  await blog.save({validateBeforeSave: false})

  return res
    .status(200)
    .json(new ApiResponse(
      200,
      {
        comment, user: userResponse, blog: blog
      },
      "comment posted successfully"
    ))
})

export const deleteComment = asyncHandler(async(req, res) => {
  const blogId = req.params.blogId
  const commentId = req.params.id
  const user = req.user

  if(!blogId || !commentId){
      throw new ApiError(400, "Invalid blog id or comment id")
  }

  if(!user){
      throw new ApiError(401, "Login to perform these actions")
  }

  const blog = await Blog.findById(blogId)

  if(!blog){
      throw new ApiError(400, "Invalid Blog Id")
  }

  const comment = await Blog.findById(commentId)

  if(!comment){
      throw new ApiError(400, "Invalid Comment Id")
  }

  if(!(String(user._id) == String(comment.owner))){
      throw new ApiError(401, "You are unauthorised to delete this comment")
  }

  const deletedComment = await Blog.findByIdAndDelete(commentId)

  if(!deletedComment){
      throw new ApiError(500, "Error while deleting comment")
  }

  blog.comment = blog.comment.filter(comment_Id => {return String(comment_Id) !== String(commentId)})
  await blog.save({validateBeforeSave:false})

  return res
      .status(200)
      .json(new ApiResponse(
          200,
          {
              deletedComment,
              blog
          },
          "Comment Deleted Successfully"
      ))
})

export const getBlogsUsingTags = asyncHandler(async(req, res) => {
  const tags = req.query.tags

  if(!tags || tags.length === 0){
    throw new ApiError(400, "Tags are required")
  }

  const blogs = await Blog.find({tags: {$in: tags}}).sort({createdAt: -1})

  if(!blogs){
    throw new ApiError(500, "Error while fetching blogs")
  }

  return res
      .status(200)
      .json(new ApiResponse(
          200,
          {
              blogs
          },
          "Fetched blogs successfully"
      ))
})
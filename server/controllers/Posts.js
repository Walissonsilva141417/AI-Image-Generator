import Post from "../models/Posts.js";
import * as dotenv from "dotenv";
import { createError } from "../error.js";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Get all posts
export const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({});
    return res.status(200).json({ success: true, data: posts });
  } catch (error) {
    return next(
      createError(
        error.status,
        error?.response?.data?.error.message || error.message
      )
    );
  }
};

// Create new post
export const createPost = async (req, res, next) => {
  try {
    const { name, prompt, photo } = req.body;
    if (!name || !prompt || !photo) {
      return next(createError(400, "name, prompt, and photo are required"));
    }

    // Cloudinary expects a data URI when receiving base64 content
    const normalizedPhoto = photo.trim().startsWith("data:")
      ? photo.trim()
      : `data:image/png;base64,${photo.trim()}`;

    const [, base64Payload] = normalizedPhoto.split(",");
    if (!base64Payload) {
      return next(createError(400, "Invalid photo payload"));
    }

    const cloudinaryOptions = {
      resource_type: "image",
    };

    if (process.env.CLOUDINARY_FOLDER) {
      cloudinaryOptions.folder = process.env.CLOUDINARY_FOLDER;
    }

    const photoUrl = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        cloudinaryOptions,
        (error, result) => {
          if (error) return reject(error);
          return resolve(result);
        }
      );

      uploadStream.end(Buffer.from(base64Payload, "base64"));
    });

    const newPost = await Post.create({
      name,
      prompt,
      photo: photoUrl.secure_url,
    });

    return res.status(200).json({ success: true, data: newPost });
  } catch (error) {
    console.log("createPost error", error);
    const statusCode =
      error.status || error.http_code || error?.response?.status || 500;
    const message =
      error.message ||
      error?.response?.data?.error?.message ||
      "Failed to create post";
    return next(createError(statusCode, message));
  }
};
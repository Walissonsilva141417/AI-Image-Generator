import axios from "axios";

const API = axios.create({
  baseURL: "https://ai-image-generator-h6o0.onrender.com/api",
});

export const GetPosts = () => API.get("post");
export const CreatePost = (data) => API.post("post", data);
export const GenerateImageFromPrompt = (data) => API.post("generateImage", data);

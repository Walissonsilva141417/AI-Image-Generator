import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
});

export const GetPosts = () => API.get("post");
export const CreatePost = (data) => API.post("post", data);
export const GenerateImageFromPrompt = (data) => API.post("generateImage", data);
import axios from "axios";
import { createError } from "../error.js";

// Controller to generate Image from custom Worker
export const generateImage = async (req, res, next) => {
  try {
    const { prompt } = req.body;
    const workerToken = process.env.WORKER_BEARER_TOKEN;
    const workerUrl = process.env.WORKER_ENDPOINT ||
      "https://ai-image.faizan4504365.workers.dev";

    if (!workerToken) {
      return next(createError(500, "Worker token not configured"));
    }

    if (!prompt) {
      return next(createError(400, "Prompt is required"));
    }

    // Send request to your custom Worker
    const response = await axios.post(
      workerUrl,
      { prompt },
      {
        headers: {
          Authorization: `Bearer ${workerToken}`,
          "Content-Type": "application/json",
        },
        responseType: "arraybuffer", // important to handle image binary
      }
    );

    // Convert binary data to base64 for the client
    const base64Image = Buffer.from(response.data, "binary").toString("base64");

    res.status(200).json({ photo: base64Image });
  } catch (error) {
    next(
      createError(
        error.response?.status || 500,
        error?.response?.data?.error || error.message
      )
    );
  }
};

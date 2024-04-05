import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

export const getInfo = async (req, res) => {
  res.status(200).json({ message: "Hello from DALL-E!" });
};

//create dalle image
export const generateImage = async (req, res) => {
  try {
    const { prompt } = req.body;
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createImage({
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });
    const image = response.data.data[0].b64_json;
    res.status(200).json({ photo: image });
  } catch (error) {
    res
      .status(500)
      .send(error?.response.data.error.message || "Something went wrong");
  }
};

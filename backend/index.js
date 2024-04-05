import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";

dotenv.config();
const app = express();

app.get("/", (req, res) => {
  res.send("Application is running ");
});
const port = process.env.PORT || 9999;

const corsOptions = {
  origin: true,
  credentials: true,
  optionSuccessStatus: 200,
};

mongoose.set("strictQuery", false);
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {});
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(`Connect failed: ${error}`);
  }
};
app.use(cors(corsOptions));
app.use(cors());
app.use(
  express.json({
    limit: "50mb",
  })
);
app.use(
  express.urlencoded({
    limit: "50mb",
    extended: true,
  })
);

app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);
app.listen(port, () => {
  connect();
  console.log(`Server is running on port ${port}`);
});

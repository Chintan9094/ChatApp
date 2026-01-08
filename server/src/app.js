import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import messageRouter from "./routes/message.routes.js";

const app = express();
app.set("trust proxy", 1);
app.use(
  cors({
    origin: [
      "http://localhost:5174",
      "https://chatapp-go.vercel.app",
    ],
    credentials: true,
  })
);
app.options("*", cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/message", messageRouter);

app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        success: false,
        statusCode: err.statusCode || 500,
        message: err.message || "Internal Server Error"
    });
});

export default app;
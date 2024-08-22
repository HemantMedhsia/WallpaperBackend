import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import adminRouter from "./Routes/adminRouter.js";
import loginRouter from "./Routes/loginRoute.js";
import userRouter from "./Routes/userRoute.js";
import superAdminRouter from "./Routes/superAdminRoute.js";
import wallpaperRouter from "./Routes/wallpaperRoute.js";
import razorPayRouter from "./Routes/razorpayRoute.js";
import errorMiddleware from "./Middlewares/errorMiddleware.js";
import bodyParser from "body-parser";

const app = express();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "16kb" }));

app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(express.static("public"));

app.use(cookieParser());

app.use("/",(req,res)=>{
    res.send("Welcome to Backend");
});

app.use("/api", userRouter);
app.use("/api", adminRouter);
app.use("/api", loginRouter);
app.use("/api",superAdminRouter);
app.use("/api",wallpaperRouter);
app.use("/api",razorPayRouter);
app.use(errorMiddleware);
export { app };

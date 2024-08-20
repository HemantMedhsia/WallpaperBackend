import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./Routes/userRoute.js";
import errorMiddleware from "./Middlewares/errorMiddleware.js";

const app = express();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);

app.use(express.json({ limit: "16kb" }));

app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(express.static("public"));

app.use(cookieParser());

app.use("/api",router); 


app.use(errorMiddleware);


export { app };

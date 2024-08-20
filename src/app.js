import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import adminRouter from "./Routes/adminRouter.js";
import loginRouter from "./Routes/loginRoute.js";
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


app.use("/api",router); 
app.use("/api", adminRouter);
app.use("/api", loginRouter)

app.use(errorMiddleware);


app.use("/api", adminRouter);
app.use("/api", loginRouter)
export { app };

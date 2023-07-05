import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user-routes";
import adminRouter from "./routes/admin-route";
import movieRouter from "./routes/movie-route";
import bookingsRouter from "./routes/booking-route";
import cors from "cors";

dotenv.config();
const app = express();

const corsOrigin ={
    origin:'http://localhost:3000', //or whatever port your frontend is using
    credentials:true,            
    optionSuccessStatus:200
}
app.use(cors(corsOrigin));
// middlewares
app.use(express.json());
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/movie", movieRouter);
app.use("/booking", bookingsRouter)


mongoose
    .connect(
    `mongodb+srv://samuelfolder404:${process.env.MONGODB_PASSWORD}@cluster0.u0tz2qu.mongodb.net/`
    )
    .then(() => 
        app.listen(5000, () =>
            console.log(`Connected to Database and Server is Running`)
    )    
    )
.catch(e => console.log(e));
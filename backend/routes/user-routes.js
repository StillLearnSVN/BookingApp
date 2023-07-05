import express from "express";
import {
    getBookingsOfUser,
    getUserById,
    deleteUser,
    getAllUsers,
    login,
    signup,
    updateUser
} from "../controllers/user-controller";

const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.post("/signup", signup);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);
userRouter.post("/login", login);
userRouter.get("/bookings/:id", getBookingsOfUser);
userRouter.get("/:id", getUserById);

export default userRouter;
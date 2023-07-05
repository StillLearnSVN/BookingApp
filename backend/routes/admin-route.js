 import express from "express";
import { addAdmin, adminLogin, getAllAdmin } from "../controllers/admin-controller";

 const adminRouter = express.Router();

 adminRouter.get("/", getAllAdmin);
 adminRouter.post("/signup", addAdmin);
 adminRouter.post("/login", adminLogin);

 export default adminRouter;
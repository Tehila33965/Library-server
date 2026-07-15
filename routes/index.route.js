import { Router } from "express";
import bookRouter from "./book.route.js";
import userRouter from "./user.route.js";

const router = Router();

router.use("/users", userRouter);

router.use("/books", bookRouter);

export default router;
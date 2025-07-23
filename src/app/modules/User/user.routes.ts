import express, { NextFunction, Request, Response } from "express"
import { UserController } from "./user.controller";
import auth from "../../middilewares/auth";
import { UserRole } from "../../../../generated/prisma";


const router =express.Router();

router.post("/create-admin",auth(UserRole.SUPER_ADMIN),UserController.createAdmin)

router.get("/",UserController.getAllDB)


export const userRouter=router;
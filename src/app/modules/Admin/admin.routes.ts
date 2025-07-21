import express, { NextFunction, Request, Response } from "express"
import { AdminController } from "./admin.controller";



const router =express.Router();


router.get("/:id",AdminController.getByIdFormDB)


export const adminRouter=router;
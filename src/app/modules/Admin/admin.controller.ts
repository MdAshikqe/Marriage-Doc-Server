import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { Request, Response } from "express";
import { UserService } from "../User/user.service";
import { AdminService } from "./admin.service";

const getByIdFormDB=catchAsync(async(req:Request,res:Response)=>{
  const {id}=req.params;
  const result= await AdminService.getByIdFormDB(id);

  sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:"All users successfully fetch",
    data:result
  })

});


export const AdminController={
    getByIdFormDB
}
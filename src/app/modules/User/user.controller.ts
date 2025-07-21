import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import { UserService } from "./user.service"
import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import { userFiltarableFields, userPaginationFields } from "./user.constant";

const createAdmin= async (req:Request,res:Response)=>{
    console.log(req.body.data)
   try {
     const result= await UserService.createAdmin(req);

    sendResponse(res,{
        success:true,
        statusCode:httpStatus.OK,
        message:"User create successfully",
        data:result
    })
    
   } catch (error) {
       res.status(500).json({
        success:false,
        message:(error as any)?.name || "Internal server error",
        error
    })
    
   }
}

const getAllDB=catchAsync(async(req:Request,res:Response)=>{
  const filter=pick(req.query,userFiltarableFields)
  const options= pick(req.query,userPaginationFields)
  const result= await UserService.getAllDB(filter,options);

  sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:"All users successfully fetch",
    metaData:result.metaData,
    data:result.data
  })

});




export const UserController={
    createAdmin,
    getAllDB,
}
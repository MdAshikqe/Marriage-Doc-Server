import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { MetaService } from "./meta.service";
import { IAuthUser } from "../interface/common";
import httpStatus from "http-status";

const fetchDashboardMetaData=catchAsync(async(req:Request & {user?:IAuthUser},res:Response)=>{
        const user=req.user;
        const result=await MetaService.fetchDashboardMetaData(user as IAuthUser);

        sendResponse(res,{
            success:true,
            statusCode:httpStatus.OK,
            message:"Meta data successfully retrive",
            data:result
        })
})

export const MetaControllers={
    fetchDashboardMetaData
}
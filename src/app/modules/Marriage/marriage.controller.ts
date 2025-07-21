import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { MarrigeService } from "./marriage.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import pick from "../../../shared/pick";
import { marriageFilterAbleFields, marriagePaginationFields } from "./marriage.constant";

const createMarriageDocumention=catchAsync(async(req:Request,res:Response)=>{
    const result= await MarrigeService.createMarriageDocumention(req);

    sendResponse(res,{
        success:true,
        statusCode:httpStatus.OK,
        message:"create marriage documention",
        data:result
    })
})
const createWitness=catchAsync(async(req:Request,res:Response)=>{
    const result= await MarrigeService.createWitness(req);

    sendResponse(res,{
        success:true,
        statusCode:httpStatus.OK,
        message:"create witness successfully",
        data:result
    })
})

const create=catchAsync(async(req:Request,res:Response)=>{
    const result= await MarrigeService.create(req);

    sendResponse(res,{
        success:true,
        statusCode:httpStatus.OK,
        message:"create successfully",
        data:result
    })
})
const getAllMarriageDoc=catchAsync(async(req:Request,res:Response)=>{
    const filter=pick(req.query,marriageFilterAbleFields)
    const options=pick(req.query,marriagePaginationFields)

    const result= await MarrigeService.getAllMarriageDoc(filter,options);

    sendResponse(res,{
        success:true,
        statusCode:httpStatus.OK,
        message:"Marrigae doc retrive successfully",
        metaData:result.metaData,
        data:result.data
    })
})

const getByIdMarriageDoc=catchAsync(async(req:Request,res:Response)=>{
    const {id}=req.params;
    const result= await MarrigeService.getByIdMarriageDoc(id);

    sendResponse(res,{
        success:true,
        statusCode:httpStatus.OK,
        message:"Get by id retrive data successfully",
        data:result
    })
})

export const MarrigeController={
    createMarriageDocumention,
    createWitness,
    create,
    getAllMarriageDoc,
    getByIdMarriageDoc
}
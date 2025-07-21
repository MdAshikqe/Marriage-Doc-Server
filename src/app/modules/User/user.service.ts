import bcrypt from "bcryptjs";
import { Prisma, UserRole } from "../../../../generated/prisma";
import prisma from "../../../shared/prisma";
import { PaginationHelpers } from "../../../helpers/paginationHelpers";
import { userSearchableFields } from "./user.constant";

const createAdmin= async(req:any)=>{
    // const file=req.file;
    // if(file){
    //     const uploadToCloudinary= await fileUploader.uploadToCloudinary(file)
    //     req.body.admin.profilePhoto=uploadToCloudinary?.secure_url;
    // }
    const hashPassword:string= await bcrypt.hash(req.body.password,12);

    const userData={
        email:req.body.admin.email,
        password:hashPassword,
        role:UserRole.ADMIN
    }

    const result= await prisma.$transaction(async (transactinClient)=>{
        await transactinClient.user.create({
            data:userData
        })
        const createAdminData= await transactinClient.admin.create({
            data:req.body.admin
        })
        return createAdminData;
    })
    return result;

}

const getAllDB= async(params:any,options:any)=>{
        const {limit,page,skip}=PaginationHelpers.calculatePagination(options);
        const {searchTerm,...filterData}=params;

        const andConditions:Prisma.UserWhereInput[]=[]
        if(params.searchTerm){
            andConditions.push({
                OR:userSearchableFields.map(field=>({
                    [field]:{
                        contains:params.searchTerm,
                        mode:"insensitive"
                    }
                }))
            })
        }
        if(Object.keys(filterData).length>0){
            andConditions.push({
                AND:Object.keys(filterData).map(key=>({
                    [key]:{
                        equals:(filterData as any)[key]
                    }
                }))
            })
        };

        const whereCondition:Prisma.UserWhereInput={AND:andConditions};

        const result= await prisma.user.findMany({
            where:whereCondition,
            skip,
            take:limit,
            orderBy:options.sortBy && options.sortOrder ? {
                [options.sortBy]:options.sortOrder
            }:{
                createdAt:"desc"
            },
            select:{
                id:true,
                email:true,
                status:true,
                needChangePassword:true,
                role:true,
                createdAt:true,
                updatedAt:true,
                admin:true,
            }
        });
        
        const total=await prisma.user.count({
            where:whereCondition
        })

        return{
            metaData:{
                page,
                limit,
                total
            },
            data:result
        }
   
}




export const UserService={
    createAdmin,
    getAllDB
}
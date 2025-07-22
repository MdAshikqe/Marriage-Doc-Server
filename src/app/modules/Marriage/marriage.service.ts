import { MarriageDocumention, Prisma } from "../../../../generated/prisma";
import { PaginationHelpers } from "../../../helpers/paginationHelpers";
import prisma from "../../../shared/prisma"
import { marriaeSearchAbleFields } from "./marriage.constant";

const create=async(req:any)=>{

     const witnessesData = req.body.witness.map((w: any) => ({
      name: w.name,
      relation: w.relation,
      contactInfo: w.contactInfo,
      marriageCertificateNo: req.body.marriage.marriageCertificateNumber
    }));
        const result= await prisma.$transaction(async (transactinClient)=>{
        await transactinClient.marriageDocumention.create({
            data:req.body.marriage
        })
        const createAdminData= await transactinClient.witness.createMany({
            data:witnessesData
        })
        return createAdminData;
    })
    return result;
}

const createMarriageDocumention=async(req:any)=>{
    const result= await prisma.marriageDocumention.create({
        data:req.body
    })

    return result;

}

const createWitness= async(req:any)=>{
        const result= await prisma.witness.createMany({
        data:req.body
    })

    return result;
}

const getAllMarriageDoc=async(filters:any,options:any)=>{
    const {limit,page,skip}=PaginationHelpers.calculatePagination(options);
    const {searchTerm,...filterData}=filters;

    const andConditions:Prisma.MarriageDocumentionWhereInput[]=[];

        if(searchTerm){
        andConditions.push({
            OR:marriaeSearchAbleFields.map(field=>({
                [field]:{
                    contains:filters.searchTerm,
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
    }
     const whereCondition:Prisma.MarriageDocumentionWhereInput=andConditions.length>0 ? {AND:andConditions}:{};

        const result= await prisma.marriageDocumention.findMany({
        where:whereCondition,
        skip,
        take:limit,
        orderBy:options.sortBy && options.sortOrder ? {
            [options.sortBy]:options.sortOrder
        }:{
            createdAt:"desc"
        },
        include:{
            witness:true
        }
    }
);
        const total= await prisma.marriageDocumention.count({
            where:whereCondition
        })

            return {
        metaData:{
            page,
            limit,
            total
        },
        data:result
    };
        
}

const getByIdMarriageDoc=async(id:string)=>{
    const result= await prisma.marriageDocumention.findUniqueOrThrow({
        where:{
            id
        },
        include:{
            witness:true
        }

    })
    return result;
}

const updateIntoMarriagDB= async(id:string,data:Partial<MarriageDocumention>):Promise<MarriageDocumention>=>{
    //is exit
     await prisma.marriageDocumention.findUniqueOrThrow({
        where:{
            id
        }
    })

    const result= await prisma.marriageDocumention.update({
        where:{
            id
        },
        data
    })
    return result
};

const deleteFromMarriageDB= async(id:string)=>{

    await prisma.marriageDocumention.findUniqueOrThrow({
        where:{
            id
        }
    })
    const result= await prisma.$transaction(async(transactionClient)=>{
        const deleteMarriagData= await transactionClient.marriageDocumention.delete({
            where:{
                id
            } 
        });
            await transactionClient.witness.deleteMany({
            where:{
                marriageCertificateNo:deleteMarriagData?.marriageCertificateNumber
            }
        });
        return deleteMarriagData;

    })
    return result;
}


export const MarrigeService={
    createMarriageDocumention,
    createWitness,
    create,
    getAllMarriageDoc,
    getByIdMarriageDoc,
    updateIntoMarriagDB,
    deleteFromMarriageDB
}
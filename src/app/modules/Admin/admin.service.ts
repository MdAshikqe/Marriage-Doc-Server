import prisma from "../../../shared/prisma"

const getByIdFormDB= async(id:string)=>{
    const result= await prisma.admin.findUniqueOrThrow({
        where:{
                id
        }
    })
    return result
}

export const AdminService={
    getByIdFormDB
}
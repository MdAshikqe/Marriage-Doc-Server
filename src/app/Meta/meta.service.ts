import { UserRole } from "../../../generated/prisma";
import prisma from "../../shared/prisma";
import { IAuthUser } from "../interface/common"

const fetchDashboardMetaData =(user:IAuthUser)=>{
    let metaData;
    switch (user?.role) {
        case UserRole.SUPER_ADMIN:
            metaData=getSuperAdminMetaData(user);
            break;
        case UserRole.ADMIN:
            metaData=getAdminMetaData(user);
            break;
        default:
            throw new Error("Invalid user role")
    }
    return metaData;
}

const getSuperAdminMetaData = async (user:IAuthUser) => {
    const superAdminData=await prisma.admin.findUniqueOrThrow({
        where:{
            email:user?.email
        }
    })
    const marriageCount=await prisma.marriageDocumention.count();
    const adminCount=await prisma.admin.count();
    const userCount=await prisma.user.count();
    // const marriageStatusDistributtion= await prisma.marriageDocumention.groupBy({
    //     by:["marriageType"],
    //     _count:{id:true},
    //     where:{
    //         id:superAdminData.id
    //     }
        
    // })
    // const formattedMarriageStatusDistribution= marriageStatusDistributtion.map(({marriageType,_count})=>({
    //     marriageType,
    //     count:Number(_count.id)
    // }))


    const barCharData= await getBarChartData();
    const pieChartData=await getPieChartData();

    return {marriageCount,adminCount,userCount,pieChartData,barCharData}
}
const getAdminMetaData = async (user:IAuthUser) => {
    const adminData=await prisma.admin.findUniqueOrThrow({
        where:{
            email:user?.email
        }
    })
    const marriageCount=await prisma.marriageDocumention.count();
    const adminCount=await prisma.admin.count();
    const userCount=await prisma.user.count();
    // const marriageStatusDistributtion= await prisma.marriageDocumention.groupBy({
    //     by:["marriageType"],
    //     _count:{id:true},
    //     where:{
    //         id:adminData.id
    //     }
        
    // })
    // const formattedMarriageStatusDistribution= marriageStatusDistributtion.map(({marriageType,_count})=>({
    //     marriageType,
    //     count:Number(_count.id)
    // }))


    const barCharData= await getBarChartData();
    const pieChartData=await getPieChartData();

    return {marriageCount,adminCount,userCount,pieChartData,barCharData}
}

const getBarChartData=async()=>{
    const marriageDoctCountByMonths= await prisma.$queryRaw`
    SELECT DATE_TRUNC('month',"createdAt") AS month,
    CAST(COUNT(*) AS INTEGER) AS count
    FROM "marriage_documention"
    GROUP BY month
    ORDER BY month ASC
    `

    return marriageDoctCountByMonths;
}

const getPieChartData=async()=>{
       const marriageTypeStatusDistributtion= await prisma.marriageDocumention.groupBy({
        by:["marriageType"],
        _count:{id:true}
        
    })
    const formattedMarriageTypeStatusDistribution= marriageTypeStatusDistributtion.map(({marriageType,_count})=>({
        marriageType,
        count:Number(_count.id)
    }))

    return formattedMarriageTypeStatusDistribution;
}

export const MetaService={
    fetchDashboardMetaData
}

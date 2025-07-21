import prisma from "../../../shared/prisma"

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


export const MarrigeService={
    createMarriageDocumention,
    createWitness,
    create
}
import status from "http-status";
import { UserStatus } from "../../../../generated/prisma";
import z from "zod";

const createAdmin=z.object({
    password:z.string(),
    admin:z.object({
        name:z.string(),
        email:z.string(),
        contactNumber:z.string()
    })
})

const updateStatus=z.object({
    body:z.object({
        status:z.enum([UserStatus.ACTIVE,UserStatus.BLOCKED,UserStatus.DELETED])
    })
})


export const UserValidation={
    createAdmin,
    updateStatus
}
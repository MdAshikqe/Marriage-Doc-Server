import express from "express";
import { MarrigeController } from "./marriage.controller";
import auth from "../../middilewares/auth";
import { UserRole } from "../../../../generated/prisma";


const router= express.Router();

router.post("/create-marriage",MarrigeController.createMarriageDocumention)
router.post("/create-witness",MarrigeController.createWitness)
router.post("/create",auth(UserRole.ADMIN),MarrigeController.create)
router.get("/",MarrigeController.getAllMarriageDoc)
router.get("/:id",MarrigeController.getByIdMarriageDoc)
router.patch("/:id",MarrigeController.updateIntoMarriagDB)
router.delete("/:id",MarrigeController.deleteFromMarriageDB)



export const marriageRoute=router;
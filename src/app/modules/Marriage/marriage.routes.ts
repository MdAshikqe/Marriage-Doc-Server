import express from "express";
import { MarrigeController } from "./marriage.controller";


const router= express.Router();

router.post("/create-marriage",MarrigeController.createMarriageDocumention)
router.post("/create-witness",MarrigeController.createWitness)
router.post("/create",MarrigeController.create)
router.get("/",MarrigeController.getAllMarriageDoc)
router.get("/:id",MarrigeController.getByIdMarriageDoc)
router.patch("/:id",MarrigeController.updateIntoMarriagDB)



export const marriageRoute=router;
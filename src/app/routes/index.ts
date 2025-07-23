import express from "express";
import { userRouter } from "../modules/User/user.routes";
import { adminRouter } from "../modules/Admin/admin.routes";
import { marriageRoute } from "../modules/Marriage/marriage.routes";
import { authRoutes } from "../modules/Auth/auth.routes";
import { metaRoutes } from "../Meta/meta.routes";


const router= express.Router();

const moduleRoutes=[
    {
        path:"/user",
        route:userRouter
    },
    {
        path:"/admin",
        route:adminRouter
    },
    {
        path:"/marriage",
        route:marriageRoute
    },
    {
        path:"/auth",
        route:authRoutes
    },
    {
        path:"/meta",
        route:metaRoutes
    },

];
moduleRoutes.forEach(route=>router.use(route.path, route.route));

export default router;

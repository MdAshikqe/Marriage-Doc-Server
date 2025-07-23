import  express, { Application, Request, Response }  from "express";
import cors from "cors";
import router from "./app/routes";
import cookieParser from "cookie-parser"
import globalErrorHandaler from "./app/middilewares/globalErrorHandaler";
import notFound from "./app/middilewares/notFound";



const app:Application= express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());


app.get("/",(req:Request,res:Response)=>{
    res.send({
        message:"Marriage document server is running......"
    })

})

// app.use("/api/v1/user",userRoutes)
// app.use("/api/v1/admin",AdminRoutes)

app.use("/api/v1",router);
app.use(globalErrorHandaler)
app.use(notFound)


export default app;
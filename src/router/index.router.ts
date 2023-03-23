import express from "express";
import authRouter from "./auth.router";
import pageRouter from "./page.router";
import dashboardRouter from "./dashboard.router";


const router = express.Router()

export default ():express.Router =>{
    pageRouter(router)
    authRouter(router)
    dashboardRouter(router)
    return  router
}
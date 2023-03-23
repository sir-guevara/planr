
import express from "express";
import { loginController, loginPageController, logoutPageController, registerController,registerPageController } from "../controllers/auth.controller";



export default (router:express.Router) =>{

    /* GET Login page. */
    router.get("/login",loginPageController) 

    /* GET Login page. */
    router.get("/register",registerPageController) 

    // POST Register page
    router.post("/register",registerController) 

    // POST Login page
    router.post("/login",loginController)


    // get logout
    router.get("/logout",logoutPageController)
};

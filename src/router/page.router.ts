import express from "express";
import { indexController } from "../controllers/index.controller";




export default (router:express.Router) => {
    /* GET home page. */
    router.get("",indexController )
};

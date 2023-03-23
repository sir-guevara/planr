import { Request, Response } from 'express';
export async function indexController(req:Request,res:Response){
     return res.render("pages/index");
  }

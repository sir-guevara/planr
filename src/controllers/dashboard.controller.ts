import { Request, Response } from 'express';
import { validatePlanInput } from '../schemas/plan.schema';
import planModel from '../models/plan.model';


export async function dashboardPageController(req:Request,res:Response){
    
    var today = new Date();
    today.setUTCHours(0,0,0,0);
      //@ts-ignore
    const user = req.identity,
    const plan = await planModel.findOne({ date:today,owner:user.id }).lean()
    return res.render("pages/dashboard",{
       
        plan,
        user

    });}

export async function addPlanPageController(req:Request,res:Response){
    // @ts-ignore
    return res.render("pages/addplan",{user:req.identity})
}


export async function addPlanController(req:Request,res:Response){
    const body = req.body;
        // @ts-ignore
    const owner=req.identity.id;
    try {
        let plan  = validatePlanInput(body)
        plan.owner = owner
        
        var today = new Date(body.date);
        today.setUTCHours(0,0,0,0);
        const existingPlan = await planModel.findOne({date:today,owner:owner});
        if(existingPlan) return res.status(400).json({message: "Plan already exists"})

        const newPlan = new planModel(plan)
        await newPlan.save()

        return res.status(201).json(newPlan).end()
    } catch (error:any) {
        
            console.log("errrrrrrrrrrrr",error)
        if(error.issues){
            for (const issue of error.issues) {
                console.log("========>",issue.message)
           }
        }
           
    }
    // return res.redirect("/addplan")
}
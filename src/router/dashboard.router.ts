import express from 'express'
import { addPlanController, addPlanPageController, dashboardPageController } from '../controllers/dashboard.controller'
import { isAuthenticated } from '../middlewares/auth'


export default (router:express.Router)=>{
    // dashboard
    router.get('/dashboard',isAuthenticated,dashboardPageController)
    router.get('/addplan',isAuthenticated,addPlanPageController)
    router.post('/addplan',isAuthenticated,addPlanController)
}
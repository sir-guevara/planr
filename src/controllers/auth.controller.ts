import { Request, Response } from 'express';
import { getUserByEmail, registerUserService } from '../services/user.service';
import { signJwt } from '../utils/jwt.utls';



export async function loginPageController(req:Request,res:Response){
     return res.render("pages/login");
  }

export async function registerPageController(req:Request,res:Response){
     return res.render("pages/register");
  }


export async function registerController(req:Request,res:Response){
   const data = req.body
   if(!data.email || !data.password || !data.firstName||!data.lastName||!data.confirmPassword){
      console.log("Please enter all fields")
      return res.render("pages/register");
   }
   if(data.password !== data.confirmPassword){return res.render("pages/register")}
  const registerData = {email:data.email, authentication:{password:data.password}, firstName:data.firstName,lastName:data.lastName}

   const newUser = await registerUserService(registerData);
   if(!newUser){
      return res.render("pages/register");
   }
   return res.redirect("/login");
}



export async function loginController(req:Request,res:Response){
   const {email, password} = req.body
   if(!email || ! password){
      console.log("please provide credentials")
      return res.render("pages/login");
   }
   const user =  await getUserByEmail(email).select('+authentication.password')
   if(!user){
         console.log("invalide credentials")
         return res.render("pages/login");
   }

   const isUser = await user.comparePassword(password)
   console.log({isUser}
      )
   if(!isUser){
      console.log("invalid credentials")
      return res.render("pages/login")
   }
   
   const token = await signJwt({
      id:user._id,fullname:user.fullName
   })
   user.authentication.sessionToken = token
   await user.save()
   const cookieOptions={
      domain:'localhost',
      path: '/',
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7
   }
   res.cookie('PLANR-AUTH',user.authentication.sessionToken,cookieOptions)

   return res.redirect('/dashboard')
   

}


export  function logoutPageController(req: Request, res: Response){
   res.clearCookie('PLANR-AUTH');
   res.redirect('/login')
}
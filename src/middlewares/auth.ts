import { NextFunction , Request, Response} from "express"
import { verifyJwt } from "../utils/jwt.utls";
import { getUserBySessionToken } from "../services/user.service";
import { merge } from "lodash";

// Deserializing the session/token
export async function isAuthenticated(req:Request, res:Response , next:NextFunction) {
    const sessionToken = req.cookies['PLANR-AUTH'];
    console.log({sessionToken})
    if(!sessionToken) return res.redirect("/login")
    // valid access token 
    const existingUser = await getUserBySessionToken(sessionToken) 
    if(!existingUser) return res.redirect("/login")

    const {payload,isValid} = verifyJwt(sessionToken)
    if(!isValid) return res.redirect("/login")
    if(payload){
        // console.log(payload)
        merge(req,{identity: payload})
        return next()
        }

}

// export const requireUser = async function (req:Request, res:Response , next:NextFunction) {
//     const user = res.locals.user
//     if(!user) return res.redirect('/login')
//     try {
//          const usr = await prisma.user.findUnique({
//             where:{
//                 id:user.userId
//             }
//          });
//          if(!usr) return res.redirect("/login");
//          if(!usr.isActive) {
//                 // req.flash("danger", "Account has been disabled please contact admin");
//                return  res.redirect('/disabled')}
//     } catch (error) {
//          return  res.clearCookie("access_token").clearCookie("refresh_token").redirect('/login')
//     }
//     return next()
// }


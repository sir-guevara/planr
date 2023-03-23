import  User from "../models/users.model";

export const getUserBySessionToken =  (sessionToken:string) => User.findOne({
    'authentication.sessionToken':sessionToken,
})
export const createUser =  (values:Record<string,any>) =>new User(values).save().then((user) =>user.toObject());
export const deleteUserById = (id:string) => User.findOneAndDelete({_id:id});
export const updateUserById =  (id:string, values:Record<string,any>) =>  User.findByIdAndUpdate(id, values);



export const getUsers =  ()=>{
    return  User.find();
 
}
export const getUserByEmail =  (email:string) =>  User.findOne({email});

export const getUserById =  (id:string)=>{
        return  User.findById(id);
}

interface IRegisterUser{
    email:string,
    firstName: string,
    lastName: string,
    authentication:{
        password:string
    }
}
export const registerUserService = async (user:IRegisterUser)=>{
    console.log(user)
    try {
        if(await getUserByEmail(user.email)) {return false} ;
         const newuser =  await  createUser(user)
         return newuser
    } catch (error) {
        console.log(error);
        return false;
    }
    
}   
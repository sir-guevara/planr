import mongoose from "mongoose";
import bcrypt from "bcrypt";

interface IUser{
    email:string,
    firstName: string,
    lastName: string,
    authentication:{
        password: string,
        sessionToken?: string
    }
}

interface IUserDocument extends IUser,mongoose.Document{
    fullName:string,
    createdAt:Date,
    updatedAt:Date,
    comparePassword(candidatePassword:string):Promise<boolean>
}

const UserSchema= new mongoose.Schema<IUser>({
    email:{
        type: String,
        required: true,
        unique:true
    },
    firstName:{
        type: String,
        required: true,},
    lastName:{
        type: String,
        required: true},
    authentication:{
        password:{type:String, required:true,select:false},
        sessionToken:{type:String,select:false},

    }
},{
    timestamps: true
  });
UserSchema.index({email:1})

// virtual methods
UserSchema.virtual('fullName').get(function (this:IUserDocument) {return `${this.firstName} ${this.lastName}`})

// when the user registers
UserSchema.pre('save',async function(this:IUserDocument, next: (err?: Error) => void){
    // only hash the password if it has been modified (or is new)
    if(!this.isModified("authentication.password")) return next();

    // Random addition data
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hashSync(this.authentication.password, salt);

    // replace the password with hash
    this.authentication.password =hash;
    return next();
});

// compare a candidate password with the user's password
UserSchema.methods.comparePassword = async function (candidatePassword:string):Promise<boolean>{
    // so we don't have to pass this into the interface method
    const user= this as IUserDocument;
    return bcrypt.compare(candidatePassword,user.authentication.password).catch(err => false);
}
    
export default  mongoose.model<IUserDocument>('User', UserSchema);

import mongoose from "mongoose";


interface IPriority{
    name: string,
    status: boolean
}

interface IMealPlan{
    lunch: Array<string>,
    dinner: Array<string>,
    breakfast: Array<string>,
    snacks: Array<string>,

}

interface ITodos{
    name: string,
    status: boolean
}

interface ISchedule{
    time: string,
    item: string
}

interface IItem{
    item: string,
    amount:number
}

interface IFinance{
    expense:IItem[],
    income:IItem[],
    comment?:Array<string>
}
interface IExercise{
    items: Array<string>,
    steps:number
}

interface IPlan{
    owner:  {type: mongoose.Types.ObjectId, ref: "User"},
    date:Date,
    priorities:IPriority[],
    todos:ITodos[],
    schedules:ISchedule[],
    goals:Array<string>,
    mealPlan:IMealPlan,
    finace:IFinance,
    note:string,
    exercises:IExercise,
    mood:string,
    water:number,
    alcohol:boolean,
    thankful:Array<string>
}

export interface IPlanDocument extends IPlan,mongoose.Document{
    fullName:string,
    createdAt:Date,
    updatedAt:Date,
}

const PrioritySchema= new mongoose.Schema<IPriority>({
    name:{type:String, required:true},
    status: {type:Boolean, default: false,}
})
const ITodosSchema= new mongoose.Schema<ITodos>({
    name:{type:String, required:true},
    status: {type:Boolean, default: false,}
})
const IScheduleSchema= new mongoose.Schema<ISchedule>({
    time:{type:String, required:true},
    item: {type:String, required:true}
})

const IMealPlanSchema= new mongoose.Schema<IMealPlan>({
    lunch: {type:[String], required:true},
    dinner: {type:[String], required:true},
    breakfast: {type:[String], required:true},
    snacks: {type:[String], required:true},
})

const IItemSchema= new mongoose.Schema<IItem>({
    item: {type:String, required:true},
    amount:{type:Number, required:true}
})

const IFinanceSchema= new mongoose.Schema<IFinance>({
    expense:{type:[IItemSchema], required:true},
    income:{type:[IItemSchema], required:true},
    comment:{type:[String], required:false},
})

const IExerciseSchema= new mongoose.Schema<IExercise>({
    items: {type:[String], required:true},
    steps:{type:Number, required:true}
})


const PlanSchema = new mongoose.Schema<IPlan>({
    owner: {type: mongoose.Types.ObjectId, ref: "User",required:true},
    date: Date,
    priorities: {type:[PrioritySchema], required:true },
    todos: {type:[ITodosSchema], required:true},
    schedules:{type:[IScheduleSchema],required:true},
    goals:{type:[String],required:true},
    mealPlan:{type:IMealPlanSchema,required:true},
    finace:{type:IFinanceSchema, },
    note:{type:String,required:true},
    exercises:{type:IExerciseSchema},
    mood:{type: String, enum: ['😀','🙂','😐','😔','🥲'],default:'🙂'},
    water:{type:Number,required:true, default:0},
    alcohol:{type:Boolean,required:true, default:false},
    thankful:{type:[String],}
    
})

export default  mongoose.model<IPlanDocument>('Plan', PlanSchema);

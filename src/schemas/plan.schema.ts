import { z } from "zod";


const PlanInput= z.object({
    date:z.string({
        required_error: "Date is required",
        invalid_type_error: "Enter a valid date",
    }),
    priorities:z.array(z.object({
        name: z.string(),
        status:z.boolean().default(false),
    }),{  required_error: "Priorities is required",}).max(3),
    todos:z.array(z.object({ 
        name: z.string(),
        status:z.boolean().default(false),
    }), {  required_error: "Todo is required"} ),

    schedules:z.array(z.object({
        time:z.string(),
        item: z.string()
    },{ required_error: "Schedule is required"})),
    goals:z.array(z.string(),{ required_error: "A Goal is required"}).max(3),
    mealPlan:z.object({
        lunch:z.array
        (z.string(),{ required_error: "Lunch is required"}),
        dinner: z.array
        (z.string(),{ required_error: "Dinner is required"}),
        breakfast: z.array
        (z.string(),{ required_error: "Breakfasr is required"}),
        snacks: z.array
        (z.string(),{ required_error: "Snack is required"}),
    }),
    finace:z.object({
        expense:z.array(z.object({
            item:z.string({required_error: "Item is required"}),
            price:z.number({required_error: "price is required"})
        })).optional(),
        income:z.array(z.object({
            item:z.string({required_error: "Item is required"}),
            price:z.number({required_error: "price is required"})
        })).optional(),
        comment:z.string().array().optional()

    }).optional(),
    note:z.string({
        required_error: "Note is required",
        invalid_type_error: "Note must be a string",
      }),
    exercises:z.object({
        item:z.array(z.string(),{ required_error: "An exercise is required"}).optional(),
        steps:z.number().optional()}).optional(),
    mood: z.enum(['😀','🙂','😐','😔','🥲'],{ required_error: "Mood is required"}).optional(),
    water:z.number({ required_error: "Water is required"}).optional(),
    alcohol:z.boolean().optional(),
    thankful:z.string().array().optional(),
    owner:z.string().optional()
})


export type PlanInput = z.infer<typeof PlanInput>;


export  const validatePlanInput= (inputs: unknown) => {
    const isValidData = PlanInput.parse(inputs);
    return isValidData;
  };
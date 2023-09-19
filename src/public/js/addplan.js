
  const { createApp } = Vue

  createApp({
    data() {
      return {
        loading:false,
        date:"",
        priorityItem:"",
        todoItem:"",
        scheduleItem:{time:"",schedule:""},
        goalItem:"",
        note:"",
        breakfastItem:"",
        lunchItem:"",
        dinnerItem:"",
        snacksItem:"",
        expenseItem:{item:"", amount:0,},
        incomeItem:{item:"", amount:0,},
        commentItem:"",
        exerciseItem:"",
        steps:0,
        water:0,
        thankfulItem:"",

        // the shcema
        plan:{
            date:"",
            priorities:[],
            todos:[
               
            ],
            schedules:[],
            goals:[],
            note:"",
            mealPlan:{
                breakfast:[],
                lunch:[],
                dinner:[],
                snacks:[]
            },
            finance:{
                expense:[],
                income:[],
                comment:[]
            },
            exercises:{
                steps:0,
                items:[]
            },
            alcohol:false,
            thankful:[],
            mood:'🙂',
            water:0
        }
      }
    },
    methods:{
        setDate(){
            this.plan.date =this.date
        },
        addPriority(){
           
            if(this.priorityItem.trim()!=""){
                this.plan.priorities.push({name:this.priorityItem.trim()});
                this.priorityItem=""
            }
        },
        addTodo(){
           
            if(this.todoItem.trim()!=""){
                this.plan.todos.push({name:this.todoItem.trim()});
                this.todoItem=""
            }
        },
        addGoal(){
           
            if(this.goalItem.trim()!=""){
                this.plan.goals.push(this.goalItem.trim());
                this.goalItem=""
            }
        },
        addNote(){
           
            this.plan.note =this.note.trim();
        },
        addSchedule(){
           
            if(this.scheduleItem.time != null && this.scheduleItem.schedule.trim() != ""){
                this.plan.schedules.push({
                    item:this.scheduleItem.schedule.trim(),
                    time:this.scheduleItem.time
                })
                this.scheduleItem.schedule="",
                this.scheduleItem.time=null
            }
        },
        addBreakfast(){
           
            if(this.breakfastItem.trim()!=""){
                this.plan.mealPlan.breakfast.push(this.breakfastItem.trim());
                this.breakfastItem=""
            }
        },
        addLunch(){
           
            if(this.lunchItem.trim()!=""){
                this.plan.mealPlan.lunch.push(this.lunchItem.trim());
                this.lunchItem=""
            }
        },
        addDinner(){
           
            if(this.dinnerItem.trim()!=""){
                this.plan.mealPlan.dinner.push(this.dinnerItem.trim());
                this.dinnerItem=""
            }
        },
        addsnacks(){
           
            if(this.snacksItem.trim()!=""){
                this.plan.mealPlan.snacks.push(this.snacksItem.trim());
                this.snacksItem=""
            }
        },
        addExpense(){
           
            if(this.expenseItem.item.trim()!='' && this.expenseItem.amount !=0){
                this.plan.finance.expense.push(this.expenseItem)
                this.expenseItem={
                    item:"",
                    amount:null
                }
            }
        },

        addIncome(){
           
            if(this.incomeItem.item.trim()!='' && this.incomeItem.amount !=0){
                this.plan.finance.income.push(this.incomeItem)
                this.incomeItem={
                    item:"",
                    amount:null
                }
            }
        },
        addComment(){
           
            if(this.commentItem.trim()!=''){
                this.plan.finance.comment.push(this.commentItem)
                this.commentItem=""
            }
        },
        addExercise(){
           
            if(this.exerciseItem.trim()!=''){
                this.plan.exercises.items.push(this.exerciseItem)
                this.exerciseItem=""
            }
        },
        addSteps(){
           
            if(this.steps!=0){
                this.plan.exercises.steps=this.steps
                this.steps =0
            }
        },
        setMood(mood){
    
            this.plan.mood=mood
        },
        setWater(water){
           
            this.plan.water=water
        },
        selectedWater(a,c){
           
            if (a <= c){ return '/img/water-active.png'}
            else{return '/img/water.png'}
        },

        addThank(){
           
            if(this.thankfulItem.trim()!=''){
                this.plan.thankful.push(this.thankfulItem)
                this.thankfulItem=""
            }
        },

verifyForm(){
        if(this.plan.date =="" || this.plan.priorities.length < 3 || this.plan.todos.length < 1 || this.plan.schedules.length < 3 || this.plan.goals.length < 1 || this.plan.note ==""||this.plan.mealPlan.breakfast.length < 1||this.plan.mealPlan.lunch.length <1||this.plan.mealPlan.dinner.length< 1||this.plan.mealPlan.snacks.length<1 ){
            return false;
        }else {return true}
    },


    addPlan(){
        this.loading=true
        //localhost:3000/addplan
        axios.post('https://planr.life/addplan', this.plan).then(function (response) {
            console.log(response)
            
        })
        this.loading=false
    }

    }
  }).mount('#addplanApp')

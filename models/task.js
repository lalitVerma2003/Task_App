import  mongoose  from 'mongoose';
const taskSchema=new mongoose.Schema({
    id:{
        type:Number
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        enum:['male','female','trans']
    },
    status:{
        type:String,
        enum:['active','inactive']
    }
})

const Task=mongoose.model('Task',taskSchema);

export default Task;
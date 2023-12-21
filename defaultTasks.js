import Task from './models/task.js';

import mongoose from 'mongoose';
mongoose.connect('mongodb://127.0.0.1:27017/taskDb')
    .then(() => {
        console.log("Connection formed");
    })
    .catch(err => {
        console.log("Error Occured");
        console.log(err);
    })

const taskArray = [
    {
        id:'1',
        name: 'Lalit',
        email: 'lalitverma@gmail.com',
        gender: 'male',
        status: 'inactive',
    },
    {
        id:2,
        name: 'Mayank',
        email: 'mayankgupta@gmail.com',
        gender: 'male',
        status: 'active'
    },
    {
        id:3,
        name: 'Akhtar',
        email: 'akhtarkhan@gmail.com',
        gender: 'male',
        status: 'active'
    },
    {
        id:4,
        name: 'Nitesh',
        email: 'niteshkamboj@gmail.com',
        gender: 'male',
        status: 'inactive'
    }
]
Task.insertMany(taskArray)
    .then(data=>{
        console.log(data);
    })

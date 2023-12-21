import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();
import Task from './models/task.js';
import methodOverride from 'method-override';
import mongoose from 'mongoose';
mongoose.connect(`${process.env.MONGO_URL}/${process.env.MONGO_DATABASE_NAME}`)
.then(() => {
    console.log("Connection formed");
})
.catch(err => {
    console.log("Error Occured");
    console.log(err);
})

app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.use(express.json());  // try
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));



const gender=['Male','Female'];
const status=['Active','Inactive'];
let count=0;

app.get('/tasks', async (req, res) => {
    const { status } = req.query;
    if (status === 'active' || status === 'inactive') {
        const allTasks = await Task.find({ status });
        console.log(allTasks);
        res.render('home.ejs', { allTasks });
    }
    else {
        const allTasks = await Task.find({});
        res.render('home.ejs', { allTasks });
    }
})
app.get('/tasks/new', (req, res) => {
    res.render('form.ejs');
})
app.post('/tasks/new', async (req, res) => {
    const newTask = new Task(req.body);
    newTask.id=++count;
    await newTask.save();
    console.log(newTask);
    res.redirect('/tasks');
})
app.get('/tasks/:id/edit',async(req,res)=>{
    const{id}=req.params;
    const task=await Task.findById(id);
    res.render('edit.ejs',{task,gender,status});
})
app.put('/tasks/:id',async(req,res)=>{
    const{id}=req.params;
    const newTask=await Task.findByIdAndUpdate(id,req.body,{new:true,runValidations:true});
    console.log(newTask);
    res.redirect('/tasks');
})



app.delete('/tasks/:id',async(req,res)=>{
    const {id}=req.params;
    await Task.findByIdAndDelete(id); 
    res.redirect('/tasks');
    const { status } = req.query;
    if (status === 'active' || status === 'inactive') {
        const allTasks = await Task.find({ status });
        console.log(allTasks);
        res.render('home.ejs', { allTasks });
    }
    else {
        const allTasks = await Task.find({});
        res.render('home.ejs', { allTasks });
    }
})





app.listen(3000, () => {
    console.log("Server build");
})
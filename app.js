
const express = require('express');

const app = express();
app.use(express.json())

const db = require('./db');

db.getDatabase();

const userModel = require('./userModel');


// Create New User

app.post('/createuser',async(req,res) => 
{

    const user = new userModel({name:req.body.name,subject:req.body.subject});

    const saveData = await user.save();

})


app.listen(3020,() => {
    console.log("Server running")
})
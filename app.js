
const express = require('express');

const app = express();
app.use(express.json())

const db = require('./db');

db.getDatabase();

const userModel = require('./userModel');


// Create New User

app.post('/createuser',async(req,res) => 
{
    try{
        const user = new userModel({name:req.body.name,subject:req.body.subject});
        const saveData = await user.save();

           res.status(200).json({
                httpcode:200,
                status:true,
                message:"User created",
                data:{
                    name: saveData.name,
                    subject:saveData.subject
                }
            })
    }
    catch(e)
    {
            res.status(500).json({
                httpcode:500,
                status:false,
                message:"Faild to create user",
                error:error.message
            })
    }

    

})


app.listen(3020,() => {
    console.log("Server running")
})
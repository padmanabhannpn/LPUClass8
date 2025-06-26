
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
    catch(error)
    {
        if (error.name === 'ValidationError') {
      const messages = {};
      let statusCode = 400;

      for (let field in error.errors) {
        const err = error.errors[field];
        messages[field] = err.message;

        // Optional: set custom status code per error type
        if (err.kind === 'required') {
          statusCode = 422; // Unprocessable Entity
        } else if (err.kind === 'minlength') {
          statusCode = 406; // Not Acceptable
        } else if (err.kind === 'maxlength') {
          statusCode = 413; // Payload Too Large
        } else {
          statusCode = 400; // Generic validation error
        }
      }

      return res.status(statusCode).json({
        HttpCode: statusCode,
        Status: false,
        Message: "Validation error",
        Errors: messages
      });
    }

            res.status(500).json({
                httpcode:500,
                status:false,
                message:"Faild to create user",
                error:error.message
            })
    }

    

})

// Get All users
app.get('/getusers',async(req,res) => 
{
    try
    {
        const user = await userModel.find({});//,'name'
        res.status(200).json({
            httpcode:200,
                status:true,
                message:"Get All Users",
                data:user
        })
    }
    catch(error)
    {
            res.status(500).json({
                httpcode:500,
                status:false,
                message:"Faild to create user",
                error:error.message
            })
    }

})

// GEtting particular user

app.get('/users/:name',async(req,res) => {

    try{ 

        const user = await userModel.findOne({name:req.params.name},['name','subject']);

        if(!user)
        {
            return res.status(404).json({
            httpcode:404,
                status:true,
                message:"User Not fpond",
                data:user
        })
        }

         res.status(200).json({
            httpcode:200,
                status:true,
                message:"Get Users",
                data:user
        })

    } catch(error)
    {

    }
})

// Update the record

app.put('/updateuser/:name',async (req,res) => 
{

    try{
            const updatauser = await userModel.findOneAndUpdate({name:req.params.name},
                {
                    name:req.body.name,
                    subject:req.body.subject
                },
                {
                    new:true
                }
            )

            if(!updatauser)
        {
            return res.status(404).json({
            httpcode:404,
                status:true,
                message:"User Not fpond",
                data:user
        })
        }

         res.status(200).json({
            httpcode:200,
                status:true,
                message:"Get Users",
                data:updatauser
        })

    }
    catch(error)
    {
        res.status(500).json({
                httpcode:500,
                status:false,
                message:"Faild to create user",
                error:error.message
            })
    }

})

//Delete

app.delete('/deleteuser/:name',async(req,res) =>
{
    try{
            const deleteuser = await userModel.findOneAndDelete({name:req.params.name});

                if(!deleteuser)
        {
            return res.status(404).json({
            httpcode:404,
                status:true,
                message:"User Not fpond",
                data:user
        })
        }

         res.status(200).json({
            httpcode:200,
                status:true,
                message:"Delete the user",
                
        })
    }
    catch(e)
    {

    }
})


app.listen(3020,() => {
    console.log("Server running")
})
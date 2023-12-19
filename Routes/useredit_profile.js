const express = require('express')
const profileeditor = express.Router()
const bcrypt = require('bcrypt')
const saltRounds = 10  
const {User} = require('../Database/schema.js')

profileeditor.post('/',async(req,res)=>{

    try{
        const {_id,username,oldUserName,email,fullName,cgpa} = req.body
        
       

        const userdata = await User.find({_id : _id})

        // const userdata = await User.find({ $and : [ {oldUserName : oldUserName}, {batch:batch},{userType : userType}, {rollNo : rollNo}]})

        if(userdata.length===0){
          return res.status(200).json({
            Success : false,
            Message : "There is no such user found for Updation"
          })
        }else{
          await User.updateOne(
            { _id: _id },
            {
              $set: {
                username : username,
                email : email,
                oldUserName : username,
                fullName : fullName,
                cgpa : cgpa,
              }
            }
         )
        res.status(200).json({
            Success : true,
            Message : "Profile Updated Successfully..."
        })
      }
    }catch(error){
        console.log(error)
        res.status(404).json({
            Success : false,
            Message : "There is an error in updating the profile...."
        })
    }
})

module.exports = profileeditor


// Verified - Success
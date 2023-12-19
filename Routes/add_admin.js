const express = require('express')
const { Admin } = require('../Database/schema')
const adminadder = express.Router()

adminadder.post('/',async(req,res)=>{
    // login
    try{
        const {email,password,userType,username,department,rollNo} = req.body
        console.group('hegoi')
        const add = new Admin({
            username : username,
            email : email,
            password : password,
            userType : userType,
            department : department,
            rollNo : rollNo
        })
        await add.save()
        res.status(200).json({
            Success : true,
            Message : "Admin Details Added Successfully..."
        })
    }catch(err){
        console.log(err)
        res.status(404).json({
            Success : false,
            Message : "There is an Error in adding Admin Details..."
        })
    }
})


module.exports = adminadder
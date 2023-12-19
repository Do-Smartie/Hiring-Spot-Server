const express = require('express')
const register = express.Router()
const registermiddleware = require('../Middlewares/register')
const sendmailer = require('../EmailFunction/registrationemail')


register.post('/',registermiddleware,(req,res)=>{
    try{
        const {username,email} = req.body
        sendmailer(email,username)
        res.status(200).json({
            Success : true,
            Message : "Registered Successfully"
        })
    }catch(error){
        console.log(error)
        res.status(404).json({
            Success : false,
            Message : "Hello User! There is an Error in Registering, Please Try Again sometimes Later..."
        })
    }
})

module.exports = register


// Verified - Success
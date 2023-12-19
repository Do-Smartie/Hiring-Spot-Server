const express = require('express')
const logger = express.Router()
const { validUser } = require('../Middlewares/login')
const { User } = require('../Database/schema')


logger.post('/',validUser,async(req,res)=>{
    // after validating the credentials
    try{
        return res.status(200).json({
            Success : true,
            Message : "Log In Successful"
        })
    }catch(error){
        console.log(error)
        res.status(404).json({
            Success : false,
            Message : "Hello User! There is an Error in Loggin In. Please, Try again after sometimes!"
        })
    }
})

module.exports = logger


// Verified - Success
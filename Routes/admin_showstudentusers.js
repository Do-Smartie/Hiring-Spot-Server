const express = require('express')
const usershower = express.Router()
const {User} = require('../Database/schema.js')

usershower.post('/',async(req,res)=>{
    try{
        const {batch} = req.body
        const userdetails = await User.find({batch:batch})
        if(userdetails.length===0){
            res.status(200).json({
                Success : false,
                Message : "There is no Users found for this Batch"
            })
        }else{
            res.status(200).json({
                Success : true,
                Data : userdetails
            })
        }
    }catch(error){
        console.log(error)
        res.status(404).json({
            Success : false,
            Message : "There is an Error in Finding the Users..."
        })
    }  
})

module.exports = usershower

// Verified - Success
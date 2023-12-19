const express = require('express');
const { User } = require('../Database/schema');
const cgpaenabler = express.Router()

cgpaenabler.post('/',async(req,res)=>{
    try{
        const {department,batch} = req.body
        const ans = await User.updateMany({ $and : [{department : department},{batch:batch}]}, { $set: { edit: "true" } });
        res.status(200).json({
            Success : true,
            Message : "CGPA Edit Option Enabled..."
        })
    }catch(err){
        console.log(err)
        res.status(404).json({
            Success : false,
            Message : "There is an Error in Enabling the Cgpa Edit Option...Please Try Again Sometimes Later..."
        })
    }
})

module.exports = cgpaenabler
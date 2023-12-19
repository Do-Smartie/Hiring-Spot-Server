const express = require('express');
const { User } = require('../Database/schema');
const cgpadisabler = express.Router()

cgpadisabler.post('/',async(req,res)=>{
    try{
        const {department,batch} = req.body
        const ans = await User.updateMany({ $and : [{department : department},{batch:batch}]}, { $set: { edit: "false" } });
        res.status(200).json({
            Success : true,
            Message : "CGPA Edit Option Disbaled..."
        })
    }catch(err){
        console.log(err)
        res.status(404).json({
            Success : false,
            Message : "There is an Error in Disabling the Cgpa Edit Option...Please Try Again Sometimes Later..."
        })
    }
})

module.exports = cgpadisabler
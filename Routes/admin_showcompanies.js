const express = require('express')
const {Company} = require('../Database/schema.js')
const companyshower = express.Router()


// ongoing and upcoming
// pipelined
companyshower.post('/',async(req,res)=>{
    try{
        const {batch} = req.body
        const data = await Company.find({batch:batch})
        if(data.length===0){
            return res.status(200).json({
                Success : false,
                Message : "Sorry! There is No Companies to Show...",
                Data : data
            })
        }else{
            return res.status(200).json({
                Success : true,
                Data : data
            })
        }
    }catch(error){
        console.log(error)
        res.status(404).json({
            Success : false,
            Message : "There is an error in Showing th Company Details"
        })
    }
})

module.exports = companyshower


// Verified - Success
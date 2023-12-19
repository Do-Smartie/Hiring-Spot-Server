const express = require('express')
const { Company } = require('../Database/schema')
const homecompletedcompanyshower = express.Router()

homecompletedcompanyshower.get('/',async(req,res)=>{
    try{
        const status = "Completed"
        const companydetails = await Company.find({ $and : [ {status : status} ,{batch:"2020-2024"}]},{companyName:1,PlacedCount:1,_id:0})
        return res.status(200).json({
            Success : true,
            Message : "Here we go for Company Details...",
            Data : companydetails
        })
    }catch(err){
        console.log(err)
        res.status(404).json({
            Success : false,
            Message : "There is an Error in Loading the Completed Company Details..."
        })
    }
})


module.exports = homecompletedcompanyshower
const express = require('express')
const { Resultdetails, Register } = require('../Database/schema')
const completedcompanydetailsshower = express.Router()


completedcompanydetailsshower.post('/',async(req,res)=>{
    try{
        const {companyName,batch,role} = req.body
        console.log(companyName,batch,role)
        const placedstudentdetails = await Resultdetails.find({$and : [{companyName : companyName}, {batch:batch}, {role : role}]})
        // const registeredstudentdetails = await Register.find({$and : [{companyName : companyName}, {batch:batch}, {role : role}]})
        return res.status(200).json({
            Success : true,
            StudentDetails : placedstudentdetails,
            Message : "Here we go for Completed Company Details..."
        })
    }catch(err){
        console.log(err)
        res.status(404).json({
            Success : true,
            Message : "There is an Error in Showing the Completed Company Details..."
        })
    }
})



module.exports = completedcompanydetailsshower
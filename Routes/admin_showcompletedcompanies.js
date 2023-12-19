const express = require('express')
const { Company } = require('../Database/schema')
const completedcompanyshower = express.Router()

completedcompanyshower.post('/',async(req,res)=>{
    try{
        const {batch} = req.body
        const Status = 'Completed'
        const completedcompany = await Company.find({ $and : [{batch:batch},{status : Status}]})
        if(completedcompany.length===0){
            return res.status(200).json({
                Success : false,
                Data : completedcompany,
                Message : "There is No Such Company Found for Particular Batch..."
            })
        }else{
            return res.status(200).json({
                Success : true,
                Data : completedcompany,
                Message : "Here we go for Company Details"
            })
        }

    }catch(err){
        console.log(err)
        res.status(404).json({
            Success : false,
            Message : "There is an Error in Showing the Completed Company Details..."
        })
    }
})


module.exports = completedcompanyshower
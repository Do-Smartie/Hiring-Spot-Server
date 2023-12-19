const express = require('express')
const { Company } = require('../Database/schema')
const companyeditor = express.Router()
const ObjectId = require('mongodb').ObjectId;

companyeditor.post('/',async(req,res)=>{
    try{
        const {_id,companyName,role,Package,category,dateOfDrive,lastDateOfReg,batch} = req.body
     
        const companydata = await Company.find({_id : _id})
      
        if(companydata.length===0){
          return res.status(200).json({
            Success : false,
            Message : "There is no such company found for Editing..."
          })
        }

        const date = new Date(dateOfDrive)
        const updation = await Company.updateOne(
            { _id: _id },
            {
              $set: {
                companyName : companyName,
                role : role,
                Package : Package,
                category : category,
                lastDateOfReg : lastDateOfReg,
                batch : batch,
                dateOfDrive : dateOfDrive,
                Date:date.getDate(),
                Month:date.getMonth()+1,
                Year:date.getFullYear()
              }
            }
         )
         console.log(updation.modifiedCount)
         if(updation.modifiedCount>=0){
            res.status(200).json({
              Success : true,
              Message : "Company Details Updated Successfully..."
            })
         }else if(updation.modifiedCount<0){
          res.status(200).json({
            Success : true,
            Message : "There is an Error in Editing the Company Details..."
          })
         }
    }catch(error){
        console.log(error)
        res.status(404).json({
            Success : false,
            Message : "There is an Error in updating the Company Details"
        })
    }
   
})

module.exports = companyeditor


// Verified - Success
const express = require('express')
const { Result, Company } = require('../Database/schema')
const addresulter = express.Router()

addresulter.post('/',async(req,res)=>{
    const {companyName,batch,roundNumber,role} = req.body
    try{
        console.log('HI')
        const companydetails = await Company.find({ $and : [{companyName : companyName}, {batch:batch}, {role : role}]})
        if(companydetails.length===0){
            return res.status(401).json({
                Success : false,
                Message : "Hey Mr.Admin, There is no such company found for adding results..."
            })
        }else{
            const resultadded = await Result.find({ $and : [{CompanyName : companyName}, {Role : role}, {Batch:batch},{RoundNumber:roundNumber}]})
            console.log(resultadded)
            if(resultadded.length!==0){
                return res.status(409).json({
                    Success : false,
                    Message : "Hey Mr.Admin, You have already added the Result Details for this Company..."
                })
            }else{
                // req.session.companyname = companyname
                // req.session.batch = batch
                // req.session.role = role
                // req.session.roundnumber = roundnumber
                res.cookie("companyname",companyName,{httpOnly:true})
                res.cookie("batch",batch,{httpOnly:true})
                res.cookie("role",role,{httpOnly:true})
                res.cookie("roundnumber",roundNumber,{httpOnly:true})
                return res.status(200).json({
                    Success : true,
                    Message : "Hye Mr.Admin, Please Proceed to add the Result file..."
                })
            }
        }
    }catch(error){
        console.log(error)
        res.status(404).json({
            Success : false,
            Message : "Hey Mr.Admin, There is an Error in Adding the result files! Please try again sometimes later..."
        })
    }
})


module.exports = addresulter


// Verified - Success
const express = require('express')
const { Company } = require('../Database/schema')
const { Batch } = require('mongodb')
const { sessionvalidator } = require('../Middlewares/session_validation')
const adder = express.Router()

adder.post('/',sessionvalidator,async(req,res)=>{
    try{
        const {companyName,role,Package,category,dateOfDrive,lastDateOfReg,batch} = req.body
        console.log(dateOfDrive)
        const datedetails = new Date(dateOfDrive)
        console.log(datedetails.getDate())
        const dateno = Number(datedetails.getDate())
        const datemonth = Number(datedetails.getMonth()+1)
        const dateyear = Number(datedetails.getFullYear())
        const companydetails = await Company.find({ $and : [{companyName : companyName}, {batch:batch}, {role : role}]})
        if(companydetails.length!==0){
            res.status(409).json({
                Success : false,
                Message : "Sorry Mr.Admin, You have already Added this Company Details..."
            })
        }else{
            const count = 0
            const st = 'Not Completed'
            const addcompanydetails = new Company({
                companyName : companyName,
                role : role,
                Package : Package,
                category : category,
                lastDateOfReg : lastDateOfReg,
                dateOfDrive : dateOfDrive,
                batch : batch,
                RegistrationCount : count,
                PlacedCount : count,
                Date:dateno,
                Month:datemonth,
                Year:dateyear,
                status:st
            })
            await addcompanydetails.save()
            // req.session.companyname = companyName
            // req.session.batch = batch
            // req.session.role = role
            res.cookie("companyname",companyName,{httpOnly:true})
            res.cookie("batch",batch,{httpOnly:true})
            res.cookie("role",role,{httpOnly:true})
            return res.status(200).json({
                Success : true,
                Message : "Hey Mr.Admin, Company Details got Stored and Proceed to Upload JD to Add Company!"
            })
        }
    }catch(error){
        console.log(error)
        res.status(404).json({
            Success : false,
            Message : "Hey Mr.Admin, There is an Error in adding Company Details! Please try again after sometimes..."
        })
    }
})

module.exports = adder


// Verified - Success
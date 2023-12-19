const express = require('express')
const companydetailsshower = express.Router()
const {Company, Register} = require('../Database/schema.js')

// Ongoing and Upcoming Companiess
// pipelined


companydetailsshower.post('/',async(req,res)=>{
    try{
        const {companyName,batch,role} = req.body
        console.log(companyName,batch,role)
        const companydetails = await Company.find({ $and : [ {companyName:companyName},{batch:batch} ] })
        if(companydetails.length===0){
            return res.status(200).json({
                Success : false,
                Message : "There is no such company found..."
            })
        }
        const studentdetails = await Register.find( { $and: [ { companyName:companyName}, { batch:batch}, {role:role} ] } )
        return res.status(200).json({
            Success : true,
            StudentDetails : studentdetails
        })
    }catch(error){
        console.log(error)
        return res.status(404).json({
            Success : false,
            Messag : "There is an Error in Showing the Company details..."
        })
    }
})

module.exports = companydetailsshower


// Verified - Success
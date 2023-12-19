const express = require('express')
const { User,Register, Company } = require('../Database/schema')
const userdetailsshower = express.Router()

userdetailsshower.post('/',async(req,res)=>{
    try{
        const {rollNo,batch} = req.body
        const userdetailsdata = await User.find({ $and: [ { rollNo:rollNo}, { batch:batch} , {userType : 'Student'} ] } )
        console.log(userdetailsdata)
        if(userdetailsdata.length===0){
            res.status(200).json({
                Success : true,
                Message : "There is No User Data..."
            })
        }else{
            const userregno = userdetailsdata[0].regNo
            console.log(userregno)
            const userregisteredcompanies = await Register.find({ $and : [ {registerNumber:userregno}, {batch:batch}]})
            // console.log(userregisteredcompanies)
            res.status(200).json({
                Success : true,
                Message : "Successfully Fetched...",
                CompanyData : userregisteredcompanies
            })
        }
    }catch(error){
        res.status(404).json({
            Success : true,
            Message : "There is an Error in Finding the user Details..."
        })
    }
})


module.exports = userdetailsshower

// Verified - Success
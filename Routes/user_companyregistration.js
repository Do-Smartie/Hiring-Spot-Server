const express = require('express')
const { Register, Company, User } = require('../Database/schema')
const {db} = require('../Database/mongoose')
const companyregister = express.Router()

companyregister.post('/',async(req,res)=>{
    try{
    const {_id,companyName,Package,role,batch,onePageResume,threePageResume,dateOfDrive} = req.body
    const userid = req.cookies.user_id
    const userdetails = await User.find({_id : userid})
    console.log(userdetails)
    const companydetails = await Company.find( { $and: [ { companyName:companyName}, { batch:batch}, {role : role} ] } )
    if(companydetails.length===0){
        res.status(200).json({
            Success : false,
            Message : "There is no Such company found for Registration...",
        })
    }else{
        const userexactname = userdetails[0].fullName
        const userrollNumber = userdetails[0].rollNo
        const userregisterNo = userdetails[0].regNo
        const userdepartment = userdetails[0].department
        const usergender = userdetails[0].gender
        const userdob = userdetails[0].dob
        const usertenthPercent = userdetails[0].tenthPercent
        const usertwelthPercent = userdetails[0].twelthPercent
        const userdiplomaPercent = userdetails[0].diplomaPercent
        const usercgpa = userdetails[0].cgpa
        const usernoofarrears = userdetails[0].noOfArrears
        const userhistoryofarrears = userdetails[0].historyOfArrears
        const usermobile = userdetails[0].mobileNumber
        const usermailid = userdetails[0].email
        const useraddress = userdetails[0].address
        const alreadyregistered = await Register.find({ $and : [ {name:userexactname}, {batch:batch}, {role : role}, {registerNumber : userregisterNo}]})
        if(alreadyregistered.length!==0){
            res.status(200).json({
                Success : false,
                Message : "You Have Already Registered for this Company..."
            })
        }else if(userdetails.length===0){
            res.status(200).json({
                Success : false,
                Message : "Please Provide Valid Credentials..."
            })        
        }else{
            const registerStudent = new Register({
                companyName : companyName,
                Package : Package,
                batch : batch,
                registerNumber : userregisterNo,
                rollNumber : userrollNumber,
                name : userexactname,
                role : role,
                department : userdepartment,
                gender : usergender,
                dob : userdob,
                dateOfDrive : dateOfDrive,
                tenthPercent : usertenthPercent,
                twelthPercent : usertwelthPercent,
                diplomaPercent : userdiplomaPercent,
                cgpa : usercgpa,
                noOfArrears : usernoofarrears,
                historyOfArrears : userhistoryofarrears,
                mobileNumber : usermobile,
                mailID : usermailid,
                address : useraddress,
                onePageResume : onePageResume,
                threePageResume : threePageResume
            })
            await registerStudent.save()
            const companyid = companydetails[0]._id
            await Company.updateOne(
                { _id: companyid },
                { $inc: { RegistrationCount: 1 } },
            )
            if(userdetails.length===0){
                return res.status(200).json({
                    Success : false,
                    Message : "Please Provide Valid Credentials..."
                })
            }else{
                await User.updateOne(
                    { _id: userid },
                    { $inc: { RegistrationCompanyCount : 1 } },
                )
                res.status(200).json({
                    Success : true,
                    Message : "Registered for Company Successfully"
                })
            }
        }
    }
    }catch(error){
        console.log(error)
        res.status(404).json({
            Success : false,
            Message : "There is an Error in Registering to the Company..."
        })
    }
})


module.exports = companyregister


// Verified - Success
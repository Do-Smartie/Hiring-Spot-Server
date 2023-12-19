const express = require('express')
const { User, Faculty, Admin } = require('../Database/schema')
const profileshower = express.Router()


profileshower.get('/',async(req,res)=>{
    try{
        const _id = req.cookies.user_id
        const userType = req.cookies.user_type
        if(userType==='Student'){
            const userdata = await User.find({ _id : _id})
            if(userdata.length===0){
                return res.status(200).json({
                    Success : true,
                    Message : "There is no user Found",
                })
            }else{
                return res.status(200).json({
                    Success : true,
                    Message : "Here is the Profile to show... ",
                    Data : userdata
                })
            }
        }else if(userType==='FacultyPC'  || userType==='Faculty'){
            const userdata = await Faculty.find({ _id : _id})
            if(userdata.length===0){
                return res.status(200).json({
                    Success : true,
                    Message : "There is no user Found",
                })
            }else{
                return res.status(200).json({
                    Success : true,
                    Message : "Here is the Profile to show... ",
                    Data : userdata
                })
            }
        }else if(userType==='Admin'){
            const admindata = await Admin.find({_id : _id})
            if(admindata.length===0){
                return res.status(200).json({
                    Success : true,
                    Message : "There is no user Found",
                })
            }else{
                return res.status(200).json({
                    Success : true,
                    Message : "Here is the Profile to show... ",
                    Data : admindata
                })
            }
        }
        
        
    }catch(error){
        console.log(error)
        res.status(404).json({
            Success : true,
            Message : 'There is an Error in Fetching the User Profile'
        })
    }
})

module.exports = profileshower


// Verified - Success
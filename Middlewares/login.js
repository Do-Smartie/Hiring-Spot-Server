const express = require('express')
const bcrypt = require('bcrypt')
const {User, Faculty, Admin} = require('../Database/schema.js')

const validUser = async(req,res,next)=>{
    try{
        const {username,password,userType} = req.body
        console.log(userType,'HEEEE')
        if(userType==='Student'){
            const username_available = await User.find({username:username})
            if(username_available.length===0){
                return res.status(401).json({
                    Success : false,
                    Message : "Hello User! Username Provided is Invalid..."
                })
            }else{
                const password_match = username_available[0].password
                const result1 = await bcrypt
                .compare(password,password_match)
                .then(async(result) => {
                    console.log(result) // return true
                    if(result===false){
                        return res.status(401).json({
                            Success : false,
                            Message : "Hello User! User Password Provided is Invalid..."
                        })
                    }else if(result===true){
                        res.cookie("user_id",username_available[0]._id,{httpOnly:true})
                        res.cookie("user_type",userType,{httpOnly:true})
                        next()
                    }
                })
            }
        }else if(userType==='Faculty' || userType==='FacultyPC'){
            console.log('Here')
            const faculty_available = await Faculty.find({username:username})
            if(faculty_available.length===0){
                return res.status(401).json({
                    Success : false,
                    Message : "Hello User! Username Provided is Invalid..."
                })
            }else{
                const facultypassword_match = faculty_available[0].password
                const result1 = await bcrypt
                .compare(password,facultypassword_match)
                .then(async(result) => {
                    console.log(result) // return true
                    if(result===false){
                        return res.status(401).json({
                            Success : false,
                            Message : "Hello User! User Password Provided is Invalid..."
                        })
                    }else if(result===true){
                        res.cookie("user_id",faculty_available[0]._id,{httpOnly:true})
                        res.cookie("user_type",userType,{httpOnly:true})
                        next()
                    }
                })
            }
        }else{
            const admindata = await Admin.find({username:username})
            const adminpassword = admindata[0].password
            const adminid = admindata[0]._id
            if(adminpassword===password){
                res.cookie("user_id",adminid,{httpOnly:true})
                res.cookie("user_type","Admin",{httpOnly:true})
                next()
            }else{
                res.status(200).json({
                    Success : false,
                    Message : "Invalid Password"
                })
            }
        }
    }catch(error){
        console.log(error)
        return res.status(404).json({
            Success : false,
            Message : " There is an Error in Loggin In. Please, Try again after sometimes!"
        })
    }
}


module.exports = {validUser}
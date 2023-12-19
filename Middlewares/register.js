const express = require('express')
const bcrypt = require('bcrypt')
const saltRounds = 10  
const {User, Faculty, Admin} = require('../Database/schema.js')




const registermiddleware = async(req,res,next)=>{
    try{

        const {username,email,password,regNo,rollNo,batch,department,fullName,gender,dob,tenthPercent,twelthPercent,diplomaPercent,cgpa,noOfArrears,historyOfArrears,mobileNumber,address} = req.body
       
        const {userType} = req.body
        if(userType==='Admin'){
            const add = new Admin({
                username : username,
                email : email,
                password : password,
                userType : userType,
                department : department,
                rollNo : rollNo
        })
            await add.save() // 5sec
            res.status(200).json({
                Success : true,
                Message : "Admin Resgistered Successfully..."
            })
        }
        if(userType==='Student'){
            const count = 0
            const pl = 'NotPlaced'
            const bool = 'false'
            const username_available = await User.find({username:username})
            if(username_available.length!==0){
                return res.status(409).json({
                    Success : false,
                    Message : "Username Already Exists...Please Try again by using another Username!"
                })
            }else{
                const email_available = await User.find({email : email})
                if(email_available.length!==0){
                    return res.status(409).json({
                        Success : false,
                        Message : "UserEmail Already Exists...Please Try again by using another Email!"
                    }) 
                }else{
                const hashpassword = await bcrypt.hash(password, saltRounds)
                // console.log(hashpassword)
                const add = new User({
                    username : username,
                    oldUserName : username,
                    password  : hashpassword,
                    email : email,
                    regNo : regNo,
                    rollNo : rollNo,
                    userType : userType,
                    batch : batch,
                    department : department,
                    gender : gender,
                    dob : dob,
                    fullName : fullName,
                    tenthPercent : tenthPercent,
                    twelthPercent : twelthPercent,
                    diplomaPercent : diplomaPercent,
                    cgpa : cgpa,
                    edit : bool,
                    noOfArrears : noOfArrears,
                    historyOfArrears : historyOfArrears,
                    mobileNumber : mobileNumber,
                    address : address,
                    RegistrationCompanyCount : count,
                    Placed : pl
                })
                await add.save()
                const user = await User.find({$and : [{username:username}, {userType : userType}, {email : email}]})
                if(user.length!==0){
                    console.log(user)
                    res.cookie("user_id",user[0]._id,{httpOnly:true})
                    res.cookie("user_type",userType,{httpOnly:true})
                    next()
                }else{
                    return res.status(404).json({
                        Success : false,
                        Message : "Hello User! There is an Error in Registering, Please Try Again sometimes Later..."
                    })
                }
                
                }
            }
        }else if(userType==='Faculty' || userType==='FacultyPC'){
            const facultyname_available = await Faculty.find({username:username})
            if(facultyname_available.length!==0){
                return res.status(409).json({
                    Success : false,
                    Message : "Username Already Exists...Please Try again by using another Username!"
                })
            }else{
                const facultyemail_available = await Faculty.find({email : email})
                console.log(facultyemail_available)
                if(facultyemail_available.length!==0){
                    return res.status(409).json({
                        Success : false,
                        Message : "UserEmail Already Exists...Please Try again by using another Email!"
                    }) 
                }else{
                    const hashpassword = await bcrypt.hash(password, saltRounds)
                    // console.log(hashpassword)
                    const add = new Faculty({
                        username : username,
                        oldUserName : username,
                        password  : hashpassword,
                        email : email,
                        rollNo : rollNo,
                        userType : userType,
                        department : department
                    })
                    await add.save()
                    const faculty = await Faculty.find({$and : [{username:username}, {userType : userType}, {email : email}]})
                    if(faculty.length!==0){
                        console.log(faculty[0]._id)
                        res.cookie("user_id",faculty[0]._id,{httpOnly:true})
                        res.cookie("user_type",userType,{httpOnly:true})
                        next()
                    }else{
                        return res.status(404).json({
                            Success : false,
                            Message : "Hello User! There is an Error in Registering, Please Try Again sometimes Later..."
                        })
                    }
                }
            }
        }
    }catch(error){
        console.log(error)
        res.status(404).json({
            Success : false,
            Message : "Hello User! There is an Error in Registering, Please Try Again sometimes Later..."
        })
    }
}

module.exports = registermiddleware
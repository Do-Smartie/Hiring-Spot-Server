const express = require('express')
const { Resultdetails, User, Company } = require('../Database/schema')
const resultdetailsadder = express.Router()

resultdetailsadder.post('/',async(req,res)=>{
    try{
        const {fullName,companyName,rollNo,regNo,department,role,batch,Package} = req.body
        console.log(companyName,batch)
        const companyavailable = await Company.find({ $and : [{companyName : companyName}, {batch:batch}]})
        const resultavailable = await Resultdetails.find({ $and : [{fullName : fullName}, {regNo : regNo}, {rollNo : rollNo}, {batch : batch}]})
        console.log(resultavailable)
        if(resultavailable.length!==0){
            return res.status(200).json({
                Success : false,
                Message : "You Have already Added the Result Details for This Student..."
            })
        }
        else if(companyavailable.length===0){
            return res.status(200).json({
                Success : false,
                Message : "There is No Such Company or Role Found for Adding Results..."
            })
        }else{
            const userdetailss = await User.find({ $and : [{fullName : fullName}, {regNo : regNo}, {rollNo : rollNo}, {batch : batch}]})
            if(userdetailss.length===0){
                return res.status(200).json({
                    Success : false,
                    Message : "There is no Such User Found for adding the Result Details.Please Check the Entered Details and Try Again.."
                })
            }else{
                const resultddadder = new Resultdetails({
                    fullName : fullName,
                    companyName : companyName,
                    rollNo : rollNo,
                    regNo : regNo,
                    role : role,
                    department : department,
                    batch : batch,
                    Package : Package
                })
                await resultddadder.save()
                const userdetailsid = userdetailss[0]._id
                await User.updateOne(
                    { _id: userdetailsid },
                    {
                      $set: {
                        Placed : companyName
                      }
                    }
                 )
                 const companyid = companyavailable[0]._id
                 console.log(companyid)
                 const Status = "Completed"
                 await Company.updateOne(
                    { _id: companyid },
                    {
                      $set: {
                        status : Status
                      }
                    }
                 )
                 await Company.updateOne(
                    { _id: companyid },
                    { $inc: { PlacedCount: 1 } },
                 )
                 return res.status(200).json({
                    Success : true,
                    Message : "Result Added Successfully..."
                 })
            }
        }
    }catch(err){
        console.log(err)
        res.status(404).json({
            Success : false,
            Message : "There is an Error in Adding the Result Details..."
        })
    }
})

module.exports = resultdetailsadder
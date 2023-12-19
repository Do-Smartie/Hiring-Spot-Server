const express = require('express')
const { User } = require('../Database/schema')
const studentprovider = express.Router()


studentprovider.post('/',async(req,res)=>{
    try{
        const {rollNo,batch} = req.body
        console.log(rollNo,batch)
        const studentdata = await User.find({ $and : [{rollNo:rollNo},{batch:batch}]},{fullName:1,regNo:1,department:1,rollNo:1})
        if(studentdata.length===0){
            return res.status(200).json({
                Success : false,
                Message : "There is No Such User Found.."
            })
        }else{
            return res.status(200).json({
                Success : true,
                Message : "Here we go for User Details...",
                Data : studentdata
            })
        }
    }catch(err){
        console.log(err)
        return res.status(404).json({
            Success : false,
            Message : "There is an Problem in Providing Student Details..."
        })
    }
})


module.exports = studentprovider
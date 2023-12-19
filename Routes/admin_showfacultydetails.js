const express = require('express')
const { User } = require('../Database/schema')
const facultydetailsshower = express.Router()

facultydetailsshower.post('/',async(req,res)=>{
    try{
        const {rollNo} = req.body
        const facultydata = await User.find({ $and : [ {userType : 'Faculty'}, {rollNo : rollNo} ] })
        if(facultydata.length===0){
            return res.status(200).json({
                Success : true,
                Message : "There is no Faculties.."
            })
        }else{
            return res.status(200).json({
                Success : true,
                Message : "faculty data fetched successfully",
                Data : facultydata
            })
        }
    }catch(error){
        res.status(404).json({
            Success : true,
            Message : "There is an error in showing the faculty Details..."
        })
    }
})

module.exports = facultydetailsshower


// Verified - Success
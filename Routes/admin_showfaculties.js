const express = require('express')
const facultyshower = express.Router()
const { User, Faculty } = require('../Database/schema')

facultyshower.get('/',async(req,res)=>{
    try{
        const facultydata = await Faculty.find({ $or : [{userType:'Faculty'},{userType:'FacultyPC'}]})
        if(facultydata.length===0){
            return res.status(200).json({
                Success : false,
                Message : "There is no Faculties..",
                FacultyData : facultydata
            })
        }else{
            return res.status(200).json({
                Success : true,
                Message : "faculty data fetched successfully",
                FacultyData : facultydata
            })
        }
    }catch(error){
        res.status(404).json({
            Success : true,
            Message : "There is an error in showing the faculty Details..."
        })
    }
})

module.exports = facultyshower

// Verified - Success
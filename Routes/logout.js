const express = require('express')
const logouter = express.Router()

logouter.get('/',(req,res)=>{
    try{
        const clearcookie = res.clearCookie("user_id");
        const getcookie = req.cookies["user_id"]
        const clearcookie2 = res.clearCookie("user_type");
        
        return res.status(200).json({
            Success : true,
            Message : "Logout Successfull"
        })
        
    }catch(error){
        return res.status(404).json({
            Success : true,
            Message : "There is an error in logging out..."
        })
    }
})

module.exports = logouter
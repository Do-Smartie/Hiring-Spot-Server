const express = require('express')

const sessionvalidator = (req,res,next)=>{
    try{
        if(req.cookies.user_id===undefined){
            return res.status(200).json({
                Message : "You Need to Login to Move Further..."
            })
        }else{
            console.log(req.cookies.user_id)
            next()
        }
    }catch(err){
        console.log(err)
        res.status(404).json({
            Message : "Ther is an Error in doing Operations..."
        })
    }
}

module.exports = {sessionvalidator}
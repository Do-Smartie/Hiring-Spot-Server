const express = require('express')
const { User } = require('../Database/schema')
const { sessionvalidator } = require('../Middlewares/session_validation')
const typeprovider = express.Router()

typeprovider.get('/',async(req,res)=>{
    try{
        const id = req.cookies.user_id
        const usertype = req.cookies.user_type
        console.log(id)
        // if(type==='Student'){
        //     const userdetails = await User.find({_id:id})
        //     console.log(userdetails)
        //     if(userdetails.length===0){
        //         return res.status(401).json({
        //             Success : true,
        //             Message : "There is no Such User Found..."
        //         })
        //     }else{
        //         const usertype = userdetails[0].userType
        //         console.log(usertype)
        //         return res.status(200).send(usertype)
        //     }
        // }
        return res.status(200).send(usertype)
    }catch(err){
        console.log(err)
        res.status(404).json({
            Success : false,
            Message : "There is an Error in Fetching the User Details..."
        })
    }
})

module.exports = typeprovider
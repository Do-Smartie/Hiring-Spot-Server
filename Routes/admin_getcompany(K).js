const express = require('express')
const { Company } = require('../Database/schema')
const kcompanycompanyprovider = express.Router()

kcompanycompanyprovider.post('/',async(req,res)=>{
    try{
        const {batch} = req.body
        console.log(req.body)
        const companynames = await Company.find({batch:batch},{companyName:1,_id:0})
        const valuesArray = companynames.map(doc => doc.companyName);
        console.log(companynames)
        if(companynames.length===0){
            return res.status(200).json({
                Success : false,
                Message : "There is no Company Found for this Batch..."
            })
        }else{
            return res.status(200).json({
                Success : true,
                Data : valuesArray,
                Message : "Hey Admin, Here we go for Company Details..."
            })
        }
    }catch(err){
        console.log(err)
        res.status(404).json({
            Succcess : false,
            Message : "There is an Error in Fetching the Company Details..."
        })
    }
})


module.exports = kcompanycompanyprovider
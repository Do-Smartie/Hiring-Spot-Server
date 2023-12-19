const express = require('express')
const { Company } = require('../Database/schema')
const rolepackageprovider = express.Router()

rolepackageprovider.post('/',async(req,res)=>{
    try{
        const {companyName,batch} = req.body
        const companydata = await Company.find({ $and : [{companyName:companyName},{batch:batch}]},{role:1,Package:1})
        const rolearray = companydata.map(doc=>doc.role)
        const packagearray = companydata.map(doc=>doc.Package)
        // const package = await Company.find({ $and : [{companyName:companyName},{batch:batch}]},{Package:1})
        if(rolearray.length===0 || packagearray.length===0){
            return res.status(200).json({
                Success : false,
                Message : "There is No Role or Package..."
            })
        }else{
            return res.status(200).json({
                Success : true,
                roles : rolearray,
                packages : packagearray,
                Message : "Here we go for Role and Package Details..."
            })
        }
    }catch(err){
        console.log(err)
        return res.status(404).json({
            Success : false,
            Message : "There is an Error in Providing the Role and Package Details..."
        })
    }
})


module.exports = rolepackageprovider
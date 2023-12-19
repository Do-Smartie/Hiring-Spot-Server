const express = require('express')
const { Company, User, Faculty } = require('../Database/schema')
const countshower = express.Router()

countshower.get('/',async(req,res)=>{
    try{
        const nonplacedtext = "NotPlaced"
        const status = "Completed"
        const total_company = await Company.find().count()
        const Student_user = await User.find({userType:'Student'}).count()
        const Faculty_user = await Faculty.find().count()
        const placed_count = await User.find({Placed : { $ne: nonplacedtext}}).count()
        const pipelined_companies = await Company.find({status : { $ne: status}}).count()
        const completedcompanies = await Company.find({status : status}).count()
        res.status(200).json({
            Success : true,
            Message : "Here is Your Count Details",
            Company_Count : total_company,
            Student_Count : Student_user,
            Faculty_User : Faculty_user,
            Placed_Count : placed_count,
            PiplinedCompanies_Count : pipelined_companies,
            CompletedCompanies_Count : completedcompanies
        })
    }catch(error){
        console.log(error)
        res.status(404).json({
            Success : false,
            Message : "There is an Error in Fetching Count Details..."
        })
    }
})

module.exports = countshower
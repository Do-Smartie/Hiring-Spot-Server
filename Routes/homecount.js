const express = require('express')
const { User, Company, Resultdetails } = require('../Database/schema')
const homecountshower = express.Router()

homecountshower.get('/',async(req,res)=>{
    try{
        const nonplacedtext = "NotPlaced"
        const status = "Completed"
        const Placed = await User.find({Placed : { $ne: nonplacedtext}}).count()
        const nonplaced = await User.find({Placed : nonplacedtext}).count()
        const completedcompanies = await Company.find({status : status}).count()
        const pipelinedcompanies = await Company.find({status : { $ne: status}}).count()
        res.status(200).json({
            Success : true,
            placed : Placed,
            nonPlaced : nonplaced,
            completedCompanies : completedcompanies,
            pipelinedCompanies : pipelinedcompanies,
            batch : "2024"
        })
    }catch(err){
        console.log(err)
        res.status(404).json({
            Success : false,
            Message : "There is an Error in Showing the Home Page Details..."
        })
    }
})


module.exports = homecountshower

// pipelinedCompanies
// completedCompanies
const express = require('express')
const moment = require('moment')
const homeshower = express.Router()
var isodate = require("isodate")
const {Company, User} = require('../Database/schema.js')
const { Timestamp } = require('mongodb')



homeshower.get('/',async(req,res)=>{
   try{
    const current_datedetails = new Date()
    const current_date = current_datedetails.getDate()
    const current_month = current_datedetails.getMonth()+1
    const current_year = current_datedetails.getFullYear()
    const current_data = await Company.find({$and: [ {Date: {$lte: current_date}},{Month: {$lte: current_month}}, {Year: {$lte: current_year}},{status : { $eq: 'Not Completed'}}]})
    const future_data = await Company.find({$and: [ {Date: {$gt: current_date}},{Month: {$gte: current_month}}, {Year: {$gte: current_year}}, {status : { $eq: 'Not Completed'}}] })
    res.status(200).json({
        Success : true,
        Message : "Data Fetched Successfully...",
        onGoingCompanies : current_data,
        upComingCompanies : future_data,
    })
   }catch(error){
    console.log(error)
        res.status(404).json({
            Success : false,
            Message : "There is an Error in Server..."
        })
   }
})

module.exports = homeshower


// Verified - Success
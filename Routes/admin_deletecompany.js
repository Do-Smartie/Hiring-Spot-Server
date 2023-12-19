const express = require('express');
const {db, User} = require('../Database/schema.js');
const { MongoClient } = require('mongodb')
const ObjectId = require('mongodb').ObjectId;
const companydeleter = express.Router()


companydeleter.post('/',async(req,res)=>{
    try{
        const {_id} = req.body
        
        const uri = "mongodb://127.0.0.1:27017/";
        const client = new MongoClient(uri);

        const database = client.db("SECE_PLACEMENTS");
        const company = database.collection("COMPANY");

        const query = { _id: new ObjectId(_id) };

        const result = await company.deleteOne(query);

        console.log(result)

        if (result.deletedCount === 1) {
            console.log("Successfully deleted one document.");
            res.status(200).json({
                Success : true,
                Message : "Company Deleted Successfully..."
            })
          } else {
            if(result.deletedCount === 0){
                console.log("No documents matched the query. Deleted 0 documents.");
                res.status(200).json({
                    Success : true,
                    Message : "No such Company Found..."
                })
            }else{
                res.status(200).json({
                    Success : true,
                    Message : "Company Deletion Not Successfull..."
                })
            }
          }
    }catch(error){
        console.log(error)
        res.status(404).json({
            Success : false,
            Message : "There is an Error in Deleting the Company.."
        })
    }
})

module.exports = companydeleter


// Verified - Success
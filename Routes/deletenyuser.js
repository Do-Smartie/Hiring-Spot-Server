const express = require('express');
const {db, User} = require('../Database/schema.js');
const { MongoClient } = require('mongodb')
const ObjectId = require('mongodb').ObjectId;
const userdeleter = express.Router()


userdeleter.post('/',async(req,res)=>{
    try{
        const {_id } = req.body
        
        const uri = "mongodb://localhost:27017";
        const client = new MongoClient(uri);

        const database = client.db("SECE_PLACEMENTS");
        const user = database.collection("USER");

        const userdata = await User.find({_id : _id})

        if(userdata.length===0){
            return res.status(200).json({
                Success : true,
                Message : "There is no such User Data Found for Deleting..."
            })
        }

        const query = { "_id" : new ObjectId( _id) };

        const result = await user.deleteOne(query);

        console.log(result)

        if (result.deletedCount === 1) {
            console.log("Successfully deleted one document.");
            res.status(200).json({
                Success : true,
                Message : "User Account Deleted Successfully..."
            })
          } else {
            if(result.deletedCount === 0){
                console.log("No documents matched the query. Deleted 0 documents.");
                res.status(200).json({
                    Success : true,
                    Message : "No User Account Found..."
                })
            }else{
                res.status(200).json({
                    Success : true,
                    Message : "User Account Deletion Not Successfull..."
                })
            }
          }
        
    }catch(error){
        console.log(error)
        res.status(404).json({
            Success : false,
            Message : "There is an Error in Deleting the Account.."
        })
    }
})

module.exports = userdeleter


// Verified - Success
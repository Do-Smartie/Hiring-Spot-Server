const express = require('express')
const resultdownloader = express.Router()
const {Result} = require('../Database/schema')
const dbConfig = require("../Config/db.js");
const MongoClient = require("mongodb").MongoClient;
const GridFSBucket = require("mongodb").GridFSBucket;

const url = dbConfig.url;
const mongoClient = new MongoClient(url);


resultdownloader.post('/',async(req,res)=>{
    try{
        const {companyName,batch,roundNumber,role} = req.body
        console.log(companyName,batch,roundNumber,role)
        const roundresults = await Result.find({ $and : [{CompanyName : companyName}, {Batch:batch}, {RoundNumber:roundNumber},{Role : role}]})
        if(roundresults.length===0){
            res.status(200).json({
                Success : false,
                Message : "There is no result for downloading"
            })
        }else{
            const generatedfilename =  roundresults[0].Result_Available[0].Generated_Filename
            // console.log(generatedfilename)
            const download = async (name) => {
    
                await mongoClient.connect();
            
                const database = mongoClient.db(dbConfig.database);
                const bucket = new GridFSBucket(database, {
                bucketName: dbConfig.Bucket,
                });
            
                let downloadStream = bucket.openDownloadStreamByName(name);
    
            
                downloadStream.on("data", function (data) {
                    return res.status(200).send(name);
                });
            
            
                downloadStream.on("error", function (err) {
                  console.log(err)
                  return res.status(404).send({ message: "Cannot download the File!" });
                });
            
                downloadStream.on("end", () => {
                  return res.end();
                });
            };
            // download(generatedfilename)
            console.log(generatedfilename)
            return res.status(200).send(generatedfilename)
        }
    }catch(error){
        console.log(error)
        res.status(404).json({
            Success : false,
            Message : "There is an error in downloading the JD File of this Company..."
        })
    }
})

module.exports = resultdownloader


// Verified - Success
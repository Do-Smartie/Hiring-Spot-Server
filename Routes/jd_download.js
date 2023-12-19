const express = require('express')
const {Jd} = require('../Database/schema.js')
const dbConfig = require("../Config/db.js");
const MongoClient = require("mongodb").MongoClient;
const GridFSBucket = require("mongodb").GridFSBucket;


const url = dbConfig.url;
const mongoClient = new MongoClient(url);
const jddownloader = express.Router()


jddownloader.post('/',async(req,res)=>{
    try{
        const {companyName,batch,role} = req.body
        console.log(companyName,batch,role)
        const Jdfiledetails = await Jd.find({ $and : [{CompanyName:companyName}, {Batch:batch}, {Role:role}]})
        if(Jdfiledetails.length===0){
            return res.status(200).json({
                Success : false,
                Message : "There is no JD Available for this company..."
            })
        }else{
            const generatedfilename = Jdfiledetails[0].JD_Available[0].Generated_Filename
           
            const download = async (name) => {

                await mongoClient.connect();
            
                const database = mongoClient.db(dbConfig.database);
                const bucket = new GridFSBucket(database, {
                bucketName: dbConfig.Bucket,
                });
            
                let downloadStream = bucket.openDownloadStreamByName(name);

            
                downloadStream.on("data", function (data) {
                  //console.log(data);
                  return res.status(200).send(name);
                });
            
            
                downloadStream.on("error", function (err) {
                  console.log(err)
                  return res.status(404).send({ message: "Cannot download the File!" });
                });
            
                /*downloadStream.on("end", () => {
                  return res.end();
                });*/
            };
        
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

module.exports = jddownloader


// Verified - Success
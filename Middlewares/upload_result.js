const util = require("util");
const multer = require("multer");
const crypto = require('crypto');
const path = require('path');
const dbConfig = require("../Config/db");
const { GridFsStorage } = require("multer-gridfs-storage");
const {Result} = require('../Database/schema.js')

try{
  var storage = new GridFsStorage({
    // url: dbConfig.url + dbConfig.database,
    url: 'mongodb://localhost:27017/SECE_PLACEMENTS',
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
        const companyname = req.cookies.companyname
        const companybatch = req.cookies.batch
        const companyrole = req.cookies.role
        const companyroundnumber = req.cookies.roundnumber
        
          const Filename = [
            {
              Original_Filename : file.originalname,
              Generated_Filename : filename
            }
          ]
      
          const callFunction = async()=>{
            const filealreadyavailable = await Result.find({ $and : [{CompanyName : companyname}, {Batch : companybatch}, {RoundNumber : companyroundnumber}]})
            if(filealreadyavailable.length===0){
              const add1 = new Result({
                CompanyName : companyname,
                Batch : companybatch,
                RoundNumber : companyroundnumber,
                Role : companyrole,
                Result_Available : Filename
              })
              add1.save()
            }
          }
          callFunction()

        const fileInfo = {
            filename: filename,
            bucketName: dbConfig.Bucket
          };
          resolve(fileInfo);
        });
      });
    }
  });
  
}catch(err){
  console.log(err)
  return res.status(404).json({
    Message : "Error in Uploading Files"
  })
}

var uploadFiles = multer({ storage: storage }).single("ResultFile");
var uploadresultFilesMiddleware = util.promisify(uploadFiles);
module.exports = {uploadresultFilesMiddleware}


const util = require("util");
const multer = require("multer");
const crypto = require('crypto');
const path = require('path');
const dbConfig = require("../Config/db");
const { GridFsStorage } = require("multer-gridfs-storage");
const {Jd} = require('../Database/schema.js')

try{

  

  var storage = new GridFsStorage({
    // console.log(req.session)
    url: 'mongodb://localhost:27017/SECE_PLACEMENTS',
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          // console.log(filename)

        const companyname = req.cookies.companyname
        const companybatch = req.cookies.batch
        const role = req.cookies.role
        console.log(companyname)
        console.log(companybatch)
          const Filename = [
            {
              Original_Filename : file.originalname,
              Generated_Filename : filename
            }
          ]
          const callFunction = async()=>{
            const add1 = new Jd({
              CompanyName : companyname,
              Batch : companybatch,
              Role : role,
              JD_Available : Filename
            })
            await add1.save()
          }
          callFunction()
        // console.log(file.originalname)

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

var uploadFiles = multer({ storage: storage }).single("JDfile");
var uploadFilesMiddleware = util.promisify(uploadFiles);
module.exports = {uploadFilesMiddleware}


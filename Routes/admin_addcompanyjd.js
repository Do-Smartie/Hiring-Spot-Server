const express = require('express')
const jdadder = express.Router()
const {uploadFilesMiddleware} = require("../Middlewares/upload_jd.js")
const {Jd, User} = require('../Database/schema.js')
const sendcompanymailer = require('../EmailFunction/sendmultiplemail_company.js')


jdadder.post('/',async(req,res)=>{
    try {
      const company_name = req.cookies.companyname
      const company_batch = req.cookies.batch
      const role_company = req.cookies.role
      const filealreadyavailable = await Jd.find({ $and : [{CompanyName : company_name}, {Batch : company_batch}, {Role : role_company}]})
      // console.log(req.file)
      if(filealreadyavailable.length!==0){
          res.clearCookie("companyname");
          res.clearCookie("batch");
          res.clearCookie("role");
          res.status(409).json({
            Success : true,
            Message : "Sorry Mr.Admin, You have already added the JD file for this Company..."
          })
      }else{
        if(company_name===undefined || company_batch===undefined || role_company===undefined){
          return res.status(400).json({
            Success : false,
            Message : "Sorry Mr.Admin, You must Provide Company Details for uploading JD File..."
          })
        }else{

          await uploadFilesMiddleware(req, res);
          
          if (req.file === undefined) {
            return res.status(400).json({
              Success : false,
              Message: "Sorry Mr.Admin, You must select a file to upload JD..."
            })
          }else{
              sendcompanymailer(await User.distinct("UserEmail"),req.cookies.companyname)
              res.clearCookie("companyname");
              res.clearCookie("batch");
              res.clearCookie("role");
              return res.status(200).json({
                Success : true,
                Message: "Hey Mr.Admin,Your File has been uploaded...",
              })
          }
        }
      }
    } catch (error) {
      console.log(error);
      return res.status(404).send({
        Success : false,
        Message: "Hey Mr.Admin, There is an Error when trying to uploading the File! Please try again after sometimes..."
      });
    }
})



module.exports = jdadder


// Verified - Success
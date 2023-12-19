const express = require('express')
const resultfileadder = express.Router()
const {uploadresultFilesMiddleware} = require("../Middlewares/upload_result.js")
const {Result,User,Company} = require('../Database/schema.js')
const resultmailer = require('../EmailFunction/sendmultiplemail_result.js')

resultfileadder.post('/',async(req,res)=>{
    try {

        // const companyname = req.session.companyname
        // const companybatch = req.session.batch
        // const companyrole = req.session.role
        // const companyroundnumber = req.session.roundnumber

        const companyname = req.cookies.companyname
        const companybatch = req.cookies.batch
        const companyrole = req.cookies.role
        const companyroundnumber = req.cookies.roundnumber

        // const companydetails = await Company.find({ $and : [{CompanyName : companyname}, {Batch:companybatch}, {Role : companyrole}]})
        // console.log(companydetails)
        // if(companydetails.length===0){
        //     return res.status(200).json({
        //         Success : true,
        //         Message : "There is no such company found for adding Files.."
        //     })
        // }

        const filealreadyavailable = await Result.find({ $and : [{CompanyName : companyname}, {Batch : companybatch}, {RoundNumber : companyroundnumber}, {Role : companyrole}]})

        if(filealreadyavailable.length!==0){
          res.clearCookie("companyname");
          res.clearCookie("companybatch");
          res.clearCookie("companyrole");
          res.clearCookie("companyroundnumber");
          res.status(409).json({
            Success : false,
            Message : "Hey Mr.Admin,You have already uploaded the result for this company and this round..."
          })
        }else if(companyname===undefined || companybatch===undefined || companyroundnumber===undefined || companyrole===undefined){
          res.status(400).json({
            Success : true,
            Message : "Hey Mr.admin, You must Provide Company details to provide result..."
          })
        }else{

        await uploadresultFilesMiddleware(req, res);
  
        if (req.file === undefined) {
          return res.status(400).json({
            Success : false,
            Message: "Sorry Mr.Admin, You must select a file to upload Result..."
          });
        }else{

          resultmailer(await User.distinct("UserEmail"),req.cookies.companyname,req.cookies.roundnumber,req.cookies.batch)

          // req.session.companyname = null
          // req.session.roundnumber = null
          // req.session.batch = null
          // req.session.role = null

          res.clearCookie("companyname");
          res.clearCookie("companybatch");
          res.clearCookie("companyrole");
          res.clearCookie("companyroundnumber");
          
          return res.status(200).json({
            Success : true,
            Message: "Hey Mr.Admin, YourFile has been uploaded...",
          });
        }

      }
      } catch (error) {
        console.log(error);
  
        return res.status(404).send({
          Success : true,
          Message: "Hey Mr.Admin, There is an Error when trying to upload the File! Please try again later...",
        });
      }
})

module.exports = resultfileadder

// Verified - Success
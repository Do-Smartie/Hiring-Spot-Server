const express = require('express')
const passwordprovider = express.Router()
const bcrypt = require('bcrypt')
const saltRounds = 10  
const {User} = require('../Database/schema.js')

passwordprovider.post('/',async(req,res)=>{
    try{
        const  {email,username,newpassword} = req.body
        const userdata = await User.find({ $and : [{email:email}, {username : username}]})
        if(userdata.length===0){
            return res.status(401).json({
                Success : true,
                Message : "Thers is no such user credentials ..."
            })
        }else{
            const userid = userdata[0]._id
            async function forgotpassword(password){
                console.log(password)
                await bcrypt
                        .hash(password, saltRounds)
                        .then(async(hash) => {
                            console.log(hash)
                            await User.updateOne(
                                { _id: userid },
                                {
                                  $set: {
                                    password : hash,
                                  }
                                }
                             )
                        })
            }
            await forgotpassword(newpassword)
            return res.status(200).json({
                Success : true,
                Message : "Password Successfully Changed..."
            })
        }
    }catch(error){
        console.log(error)
        res.status(404).json({
            Success : false,
            Message : "There in Error in making forgot password..."
        })
    }
})


module.exports = passwordprovider


// Verified - Success
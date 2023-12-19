const express = require('express')
const twilio = require('twilio')
const dotenv = require('dotenv')
const app = express()

dotenv.config()


async function sendSMS(){
    const client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN)
    
    return client.messages
    .create({body:'Hey this is a message', from:'+14065055396', to:process.env.PHONE_NUMBER})
    .then(message=>console.log(message,"Message sent"))
    .catch(error=>console.log(error))
}


sendSMS()



app.listen(5000,()=>{
    console.log('Server Listening to Port NUmber 5000...')
})
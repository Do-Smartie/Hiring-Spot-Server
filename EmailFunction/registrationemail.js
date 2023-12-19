const express = require('express')
const nodemailer = require("nodemailer");



function sendmailer(mail,username){


        const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "sanjairagul.m2020it@sece.ac.in",
            pass: "seceit2020"
        },
        tls: {
            rejectUnauthorized: false
        }
        });
        const registered_username = username
        const mailOptions = {
        from: "sanjairagul.m2020it@sece.ac.in",
        to: mail,
        subject: "SECE - Placement Cell",
        html : `Welcome ${registered_username},<p>Thank You for Registering on SECE PLACEMENTS! We are so glad to travel along with your journey and make an awesome placement record.</p><p>As we get a little closer to you, we will be sending you complete upcoming and ongoing company details.</p><p>Registration for Applicable Companies and Result Publishment will be undergoing and published only through SECE Placements. Stay Connected!</p><p>With Regards,<br>SECE Placements Cell,<br>Sri Eshwar College of Engineering,<br>Coimbatore.</p>`,
        // text: `Hello ${registered_username}  , This Mail is From Sri Eshwar College Placement Cell Application Developement regarding Server Validation Purpose. One again We Deliver our Delightful Thankful for your constant support.Good Luck!                   With Regards - SANJAI RAGUL M SECE PLACEMENTS DEVELOPER`
        };

        transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }else{
            console.log("Email sent: " + info.response);
        }
        });
    }

module.exports = sendmailer
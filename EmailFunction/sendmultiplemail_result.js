const express = require('express')
const nodemailer = require("nodemailer");



function resultmailer(maillist,companyname,roundnumber,batch){
            
        console.log(maillist)

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
        const companyname_resulter = companyname
        const company_roundnumber = roundnumber
        const company_batch = batch

        const mailOptions = {
        from: "sanjairagul.m2020it@sece.ac.in",
        to: maillist,
        subject: "SECE - Placement Cell",
        html : `Hello Eshwarite,<p>We are thrilled to announce the results! Yes, Placemenrt Drive conducted by an corporate named ${companyname_resulter} and they released their results for Round ${company_roundnumber} and Batch ${company_batch}! Please check SECE Placements Apllication for further Details!</p><p>As we get a little closer to you, we will be sending you complete upcoming and ongoing company details.</p><p>Registration for Applicable Companies and Result Publishment will be undergoing and published only through SECE Placements. Stay Connected!</p><p>With Regards,<br>SECE Placements Cell,<br>Sri Eshwar College of Engineering,<br>Coimbatore.</p>`
        // text: `Hello Eshwarite  , This Mail is From Sri Eshwar College Placement Cell Application Developement regarding Server Validation Purpose. One again We Deliver our Delightful Thankful for your constant support.Good Luck!                   With Regards - SANJAI RAGUL M SECE PLACEMENTS DEVELOPER`
        };

        transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }else{
            console.log("Email sent: " + info.response);
        }
        });
    }

module.exports = resultmailer
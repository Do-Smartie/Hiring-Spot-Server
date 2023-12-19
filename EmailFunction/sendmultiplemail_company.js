const express = require('express')
const nodemailer = require("nodemailer");



function sendcompanymailer(maillist,companyname){
            
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
        const newcompanyname = companyname
        const mailOptions = {
        from: "sanjairagul.m2020it@sece.ac.in",
        to: maillist,
        subject: "SECE - Placement Cell",
        html : `Hello Eshwarite,<p>Let an Another milestone to get shine is waiting ahead! Yes, an Placemenrt Drive by an corporate named ${newcompanyname} has been Scheduled! Please check SECE Placements Apllication for further Details!</p><p>As we get a little closer to you, we will be sending you complete upcoming and ongoing company details.</p><p>Registration for Applicable Companies and Result Publishment will be undergoing and published only through SECE Placements. Stay Connected!</p><p>With Regards,<br>SECE Placements Cell,<br>Sri Eshwar College of Engineering,<br>Coimbatore.</p>`,
        // text: `Hello Eshwarite  , This Mail is From Sri Eshwar College Placement Cell `
        };
        console.log('Seconf')
        transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }else{
            console.log("Email sent: " + info.response);
        }
        });
    }

module.exports = sendcompanymailer
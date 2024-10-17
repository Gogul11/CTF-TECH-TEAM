const express = require('express')
const mongoose = require('mongoose')
const bcrypt  = require('bcrypt')
const {userModel} = require('../model.js')
const nodemailer = require('nodemailer')

const user = express.Router()

require('dotenv').config()

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false, 
    auth: {
        user: "lugog1108@gmail.com",
        pass: process.env.PASS,
    },
})

const sendmail = async(data) => {
    const UserData = JSON.stringify(data, null, 2)
    const formattedData = Object.entries(data)
    .map(([key, value]) => `<p><strong>${key}:</strong> ${value}</p>`)
    .join('');
    await transporter.sendMail({
        from : {
            name : "Developers Hub",
            address : "lugog1108@gmail.com"
        },
        to : data.email,
        sub : "verification",
        html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5;">
            <h2>Verification Details</h2>
            <p>Thank you for signing up! Here are your details:</p>
            ${formattedData}
            <p>If you did not request this email, please ignore it.</p>
        </div>
    `
    })
}


user.get("/", (req, res) => {
    try {
        return res.status(200).json({success : true})
    } catch (error) {
        return res.status(404).json({success : false, message : error.message})
    }
})

user.post("/", async (req, res) => {
    try {
        sendmail(req.body);
        const salt = await bcrypt.genSalt(10);
        const newPassword = await bcrypt.hash(req.body.password, salt)
        req.body.password = newPassword
        const newUser = await userModel(req.body)
        await newUser.save()
        return res.status(200).json({success : true})
    } catch (error) {
        return res.status(404).json({success : false, message : error.message})
    }
})

module.exports = user

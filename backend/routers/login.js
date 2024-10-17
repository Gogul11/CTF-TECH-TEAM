const express = require('express');
const {userModel} = require('../model.js');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

require('dotenv').config()


const login = express.Router();
login.get("/", (req, res) => {
    try {
        return res.status(200).json({success : true})
    } catch (error) {
        return res.status(404).json({success : false, message : error.message})
    }
})

login.post("/", async(req, res) => {
    try {
        const user = await userModel.findOne({username : req.body.username})
        if(user == null) return res.status(404).json({success : false, message : 'could not find the user'})
        const foundUser = await bcrypt.compare(req.body.password, user.password)
        if(!foundUser) return res.status(404).json({success: false, message : 'password mismatch'})
        const token = jwt.sign(foundUser, process.env.KEY); 
        return res.status(200).json({success : true, token : token, id : user._id})
    } catch (error) {
        return res.status(404).json({success : false, message : error.message})
    }
})

module.exports = login;

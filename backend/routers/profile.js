const express = require('express')
const {userModel} = require('../model.js')
const jwt = require('jsonwebtoken')

const profile = express.Router()


require('dotenv').config()

const auth = async (req, res, next) => {
    const token = await req.header('Authorization')?.split(' ')[1];
    if(!token){
        return res.status(404).json({success : false})
    }
    try {
        const decoded = jwt.verify(token, process.env.KEY)
        req.user = decoded;
        req.username = decoded.username;
        next()
    } catch (error) {
        return res.status(404).json({success : false, message : error.message})
    }
}


profile.get("/",auth, async(req, res) => {
    try {
        if(await req.user){
            const profiles = await userModel.find({username : {$ne : req.username}})
            if(profiles)
                return res.status(200).json({success : true, profiles : profiles})
        }
        return res.status(404).json({success : false})
    } catch (error) {
        return res.status(404).json({success : false, message : error.message})
    }
})

profile.get("/info/:id",auth, async(req, res) => {
    try {
        if(await req.user){
            const profile = await userModel.findById(req.params.id)
            if(profile)
                return res.status(200).json({success : true, profile : profile})
        }
        return res.status(400).json({success : false})
    } catch (error) {
        return res.status(404).json({success : false, message : error.message})
    }
})

profile.get("/myprofile/:id", auth,async(req, res) => {
    try {
        if(await req.user){
            const myinfo = await userModel.findById(req.params.id)
            if(myinfo)
                return res.status(200).json({success : true, profile : myinfo})
        }
        return res.status(404).json({success : false})
    } catch (error) {
        return res.status(404).json({success : false, message : error.message})
    }
})






module.exports = profile
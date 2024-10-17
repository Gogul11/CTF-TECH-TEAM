const mongoose = require('mongoose');
const { number } = require('zod');

const registerSchema = new mongoose.Schema(
    {
        username : {
            type : String,
            unique : true,
            required : true
        },
        password : {
            type : String,
            required : true
        },
        email :{
            type : String,
            required: true,
            unique : true,
            validate: {
                validator: function (v) {
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
                },
                message: (props) => `${props.value} is not a valid email!`,
                }
        },
        role : {
            type : String,
            required : true,
        },
        experience : {
            type : Number,
            required : true
        },
        lp : {
            type : String,
            required : true
        },
        portfolio : {
            type : String,
            required : false
        },
        ts : {
            type : String,
            required : false
        },
        pl : {
            type : String,
            required : true
        },
        np : {
            type : String,
            required : true
        },
        mi : {
            type : String,
            required : true
        }
    },
    {
        timestamps: true
    }
)

const userModel = new mongoose.model('users', registerSchema);

module.exports = {userModel}


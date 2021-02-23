const express = require('express');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const auth = require('../middleware/auth')
const UserModel = require('../models/userModel');
const nodeMailer = require('nodemailer')
var otpGenerator = require('otp-generator')
const routes = express.Router();

var randoNumber = null
var us = null
var getotp = null

routes.post('', async (req, res) => {
    const { email, password } = req.body;
    if (!email | !password) {
        return res.send("Please Enter Required Fields")
    }
    let user = await UserModel.findOne({
        email
    })
    if (!user) {
        return res.send("User does not Exist")
    }
    const compare = await bcrypt.compare(password, user.password)

    if (!compare) {
        return res.send("Please Enter Correct Password")
    }
    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, 'thisssssssssssssssssssssssssssss')
    res.send(token)
})

routes.post('/forget', async (req, res) => {

    const { email } = req.body;
    console.log(email)
    if (!email) {
        return res.send("Please Enter Email")
    }
    us = await UserModel.findOne({
        email
    })
    if (!us) {
        return res.send("User Not Found");
    }
    randoNumber = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });
    let nodeTransporte = nodeMailer.createTransport({

        service: 'gmail',
        secure: false,
        auth: {
            user: 'gupta.rajat484@gmail.com',
            pass: ''
        }
    });
    let mailDetails = {
        from: 'gupta.rajat484@gmail.com',
        to: 'gupta.rajat484@gmail.com',

        subject: "Forget Password Authentication",
        text: randoNumber,
    }
    nodeTransporte.sendMail(mailDetails, function (err, data) {
        if (err)
            console.log(err)
        else {
            return res.redirect('/otp').send("Mail Send Successfully" + data.response)
        }
    })
})

routes.post('/otp', (req, res) => {
    if (!us) {
        return res.redirect('/login')
    }
    getotp = req.body.otp;

    console.log(getotp)
    if (getotp != randoNumber) {
        return res.send("Please Enter Valid OTP");
    }
    return res.send('OTP Mached Succssfully')
})

routes.post('/change-password', async (req, res) => {
    if (!us) {
        return res.redirect('/login')
    }
    console.log(getotp);
    console.log(randoNumber)
    if (getotp != randoNumber) {
        return res.redirect('/otp')
    }
    const { password } = req.body;
    var salt = bcrypt.genSaltSync(16);
    var hash = bcrypt.hashSync(password, salt);
    try {
        up = await us.updateOne({ password: hash });
        await up.save();
        return res.send('/login')
    }
    catch (err) {
        return res.send(err)
    }

})

module.exports = routes;

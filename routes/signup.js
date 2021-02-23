const express = require('express')
const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')
const userModel = require('../models/userModel')
const routes = express.Router();
routes.post('', async (req, res) => {
    
    const { name, email, password } = req.body;
    if (!name | !email | !password) {
        return res.send("Please Enter All Fields")
    }
    let user = await userModel.findOne({
        email
    })
    if (user) {
        return res.send("User Is Already Register")
    }

    var salt = bcrypt.genSaltSync(16);
    var hash = bcrypt.hashSync(password, salt);

    user = new userModel({
        name: name,
        email: email,
        password: hash
    })

    user.save().then(res => {
        console.log("data save")
    }).catch(err => {
        console.log(err)
    })
    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, 'thisssssssssssssssssssssssssssss')
    res.header('x-auth', token).send(token);
})

module.exports = routes;
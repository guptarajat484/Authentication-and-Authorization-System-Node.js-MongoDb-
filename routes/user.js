const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/userModel');
const admin = require('../middleware/admin');
const routes = express.Router()

routes.get('', [auth, admin], async (req, res) => {
    console.log(req.user)
    const user = await User.findById(req.user.id);
    res.json(user.name);
})

module.exports = routes;
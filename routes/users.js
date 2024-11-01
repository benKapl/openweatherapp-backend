var express = require('express');
var router = express.Router();

const fetch = require('node-fetch');
const User = require('../models/users');

const { checkBody } = require("../modules/checkBody")

router.post("/signup", async (req, res) => {
    // Check if email or password is null of undefined
    if (!checkBody(req.body,["name", "email", "password"])) {
        res.json({ result: false, error: "Missing or empty fields" })
        return
    }

    // Check if email already in db
    if (await User.findOne({ email: { $regex: new RegExp(req.body.email, "i")}})) {
        res.json({ result: false, error: "User already exists"})
        return
    }

    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });

    const data = await newUser.save();
    console.log("User to save: ", data)
    res.json({ result: true })
})

router.post("/signin", async (req, res) => {
    // Check if email or password is null of undefined
    if (!checkBody(req.body,["email", "password"])) {
        res.json({ result: false, error: "Missing or empty fields" })
        return
    }

    //Check if user is found with email and password
    const userFound = await User.findOne({ 
        email: { $regex: new RegExp(req.body.email, "i")},
        password: req.body.password,
    });
    
    if (!userFound) {
        res.json({ result: false, error: "User not found"})
        return
    }

    console.log(await userFound); // simple user check in terminal
    res.json({ result: true })
})

module.exports = router;
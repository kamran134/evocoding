require("dotenv").config();
const config = process.env;
const express = require('express');
const api = express.Router();
const User = require('../../models/User.js');
const jwt = require("jsonwebtoken");
const vacancy = require("./vacancy.js");
const course = require("./course.js");
const category = require("./category.js");
const subcategory = require("./subcategory.js");
const appeal = require("./appeal.js");
const home = require("./home.js");

api.use('/subcategories', subcategory)
api.use("/categories", category);
api.use("/vacancies", vacancy);
api.use('/courses', course);
api.use('/appeals', appeal);
api.use("/home", home);


// Auth
api.post("/auth/login", async (req, res) => {
    const user = await User.findOne(
        {
            name: req.body.name,
            password: req.body.password
        }
    );
    if (!user) {
        res.status(400).send("User does not exist!")
        return;
    }

    const token = jwt.sign(
        {
            name: user.username,
            id: user._id
        },
        process.env.SECRET_KEY,
        {
            expiresIn: "2D"
        }
    )
    user.token = token;
    res.send(user);
})
api.post("/check-token-validity", (req, res) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    if (!token) {
        return res.status(401).json({ error: 'Token not found' });
    }

    try {
        const decoded = jwt.verify(token, config.SECRET_KEY);
        const expirationTime = decoded.exp * 1000;
        const currentTime = Date.now();
        return res.json({ expired: expirationTime < currentTime });
    } catch (error) {
        return res.status(401).json({ error: 'Token is not valid' });
    }
});


module.exports = api;

const home = require("express").Router();
const Home = require("../../models/Home.js");
const auth = require("../../middleware/auth.js");
const path = require('path');


home.get('/', async (req, res) => res.send(await Home.findOne({})));
home.put('/', auth, async (req, res) => {
    const image = req.files.img;
    image.mv(path.resolve(__dirname, "../../public/src/images", image.name))
    await Home.findOneAndUpdate({}, { text: req.body.text, img: `./src/images/${image.name}` }, { new: true })
    res.send("Home Edited");
})

module.exports = home;
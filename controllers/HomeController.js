const Home = require("../models/Home.js");

const HomeController = {
    getHome: (req, res) => {
        Home.find({}).then(home => {

        })
    }
}
module.exports = HomeController;
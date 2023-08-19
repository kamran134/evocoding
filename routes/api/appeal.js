const Vacancy = require("../../models/Appeals/Vacancy.js");
const Education = require("../../models/Appeals/Education.js");
const auth = require("../../middleware/auth.js");
const appeal = require("express").Router();

appeal.get("/educations", auth, async (req, res) => res.send(await Education.find({})));

appeal.post("/educations", async (req, res) => {
    await Education.create({ ...req.body });
    res.send("Thank You");
})

appeal.get("/vacancies", auth, async (req, res) => res.send(await Vacancy.find({})));
appeal.post("/vacancies", async (req, res) => {
    await Vacancy.create({ ...req.body });
    res.send("Thank You <3");
})


module.exports = appeal;
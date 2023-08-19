const vacancy = require("express").Router();
const Vacancy = require("../../models/Vacancy.js");
const auth = require('../../middleware/auth.js');

vacancy.get("/", async (req, res) => res.send(await Vacancy.find({})));
vacancy.post("/", auth, async (req, res) => res.send(await Vacancy.create({ name: req.body.name })));
vacancy.delete("/:id", auth, async (req, res) => res.send(await Vacancy.findByIdAndDelete(req.params.id)));

module.exports = vacancy;
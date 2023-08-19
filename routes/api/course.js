const course = require("express").Router();
const Course = require("../../models/Course.js");
const auth = require('../../middleware/auth.js');

course.post("/", auth, async (req, res) => res.send(await Course.create({ ...req.body })));
course.get("/", async (req, res) => res.send(await Course.find({})));
course.get("/:id", async (req, res) => res.send(await Course.findById(req.params.id)));
course.delete("/:id", auth, async (req, res) => res.send(await Course.findByIdAndDelete(req.params.id)));

module.exports = course;
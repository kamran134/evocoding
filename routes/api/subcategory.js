const subcategory = require("express").Router();
const Category = require("../../models/Category.js");
const Subcategory = require("../../models/Subcategory.js");
const mongoose = require("mongoose");
const auth = require("../../middleware/auth.js");

subcategory.post('/:id', auth, async (req, res) => {
    const subcategory = await Subcategory.create({
        name: req.body.name,
        keyword: req.body.keyword,
    });
    await Category.updateOne(
        { _id: req.params.id },
        { $push: { subcategories: subcategory._id } }
    )
    res.send(subcategory);
})
subcategory.get("/:id", async (req, res) => {
    const subcategory = await Subcategory.findById(req.params._id);
    res.send(subcategory);
})
subcategory.delete("/:id", auth, async (req, res) => {
    const _id = req.body._id;
    await Category.findByIdAndUpdate(_id, {
        $pull: {
            subcategories: new mongoose.Types.ObjectId(req.params.id)
        }
    })
    res.send(await Subcategory.findByIdAndDelete(req.params._id));
})

module.exports = subcategory;
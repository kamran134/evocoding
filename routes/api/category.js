const category = require("express").Router();
const Category = require("../../models/Category.js");
const Subcategory = require("../../models/Subcategory.js");
const auth = require('../../middleware/auth.js');


category.get('/', async (req, res) => {
    const categories = await Category.find({});
    let subcategories = [];
    for (let i of categories) {
        for (let j of i.subcategories) {
            subcategories.push(await Subcategory.findById(j));
        }
        i.subcategories = subcategories;
        subcategories = [];
    }
    res.send(categories);
})
category.post('/', auth, async (req, res) => {
    const categories = await Category.create({
        name: req.body.name,
        keyword: req.body.keyword,
        subcategories: [],
    });
    res.send(categories);
})
category.delete('/:id', auth, async (req, res) => {
    const { subcategories } = await Category.findById(req.params.id);
    await Promise.all(subcategories.map(async (subcategory) => {
        await Subcategory.findByIdAndDelete(subcategory._id);
    }));
    const category = await Category.findByIdAndDelete(req.params.id);
    res.send(category);
})
module.exports = category;
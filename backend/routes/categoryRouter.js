const Category = require('../models/Category');
const router = require('express').Router();
// const hash = require('bcrypt')


router.get("/", async (req, res) => {
    try {
        // const result = await hash.hash("1", 15)
        // console.log("HASH: ",result, "Compare to 1",await hash.compare("1", result));
        res.json(await Category.find());
    }
    catch (err) {
        console.log("GET ERROR: ", err)
    }
})

router.post("/", async (req, res) => {
    try {
        const newCategory = new Category({
            name: req.body.name,
            description: req.body.description,
            status: req.body.status
        })
        await newCategory.save()
        console.log(req.body.name ,"saved")
        res.json(newCategory)
    } catch (err) {
        console.log("Something wrong!!", err)
    }
})

router.get("/:id", async (req, res) => {
    try {
        const target = await Category.findById(req.params.id);
        res.json(target)
    }
    catch {
        console.log("Not found")
    }
})

router.put("/:id", async (req, res) => {
    try {
        await Category.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.json(req.body)
    }
    catch {
        console.log("Not found")
    }
})

router.delete("/:id", async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id)
        console.log("Category has been deleted")
    }
    catch {
        console.log("Not found")
    }
})

module.exports = router;
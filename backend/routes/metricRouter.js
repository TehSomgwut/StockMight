const router = require('express').Router();
const Metric = require('../models/Metric');

router.get("/", async (req, res) => {
    try {
        const metrics = await Metric.find()
        res.json(metrics)
    }
    catch (err) {
        console.log("Cannot GET : ", err)
    }
})

router.get("/:id", async (req, res) => {
    try {
        const unit = await Metric.findById(req.params.id);

        if (!unit) {
            res.status(404).send({message: "ไม่พบข้อมูล"});
        }

        res.json(unit);
    } catch {
        console.log(req.params.id, "NOT FOUND")
    }
})

router.post("/", async (req, res) => {
    try {
        const newUnit = new Metric({
            name: req.body.name,
            description: req.body.description,
            status: req.body.status,
        })
        await newUnit.save().then(() => {console.log(req.body.name, "saved")})
        res.json(newUnit)
    } catch (err) {
        console.log("CANNOT POST : ", err)
    }
})

router.put("/:id", async (req, res) => {
    try {
        const metric = await Metric.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.json(metric)
    }
    catch (err) {
        console.log("PUT ERROR", err);
        res.send("ERROR")
    }
})

router.delete("/:id", async (req, res) => {
    try {
        await Metric.findByIdAndDelete(req.params.id)
        console.log("DELETED")
        res.json({message: "ลบสำเร็จ"})
    }
    catch (err) {
        res.status(404).send("Cannot find ", req.params.id)
    }
})

module.exports = router;
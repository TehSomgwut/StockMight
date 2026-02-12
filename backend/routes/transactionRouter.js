const router = require('express').Router()
const Transaction = require('../models/Transaction')

// get all
// get one
// post
// put
// delete

router.get("/", async (req, res) => {
    try {
        const Transactions = await Transaction.find()
        res.json(Transactions);
        
    }
    catch (err) {
        console.log("GET ERROR: ", err);
        res.status(404).send("Ha Mai Juor Krub")
    }
})

router.get("/:id", async (req, res) => {
    try {
        const target = await Transaction.findById(req.params.id)
        if (!target) {
            res.send("Not Found Sorry.")
        }
        res.json(target)
    }
    catch {
        res.json({message: ("ไม่พบ", req.params.id)})
    }
})

router.post("/", async (req, res) => {
    try {
        const newT = new Transaction({...req.body})
        await newT.save()
        res.json(newT)
    }
    catch (err) {
        console.log("Error: ", err)
        res.json({message: "ไม่สามารถเพิ่มได้ เกิดข้อผิดพลาดบางอย่าง ขอโทษครับท่านผู้ทรงปัญญา"})
    }
})

router.put("/:id", async (req, res) => {
    try {
        const update = await Transaction.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.json(update)
    }
    catch (err) {
        console.log("Err: ", err);
        res.json({message: "มีปัญหาเกี่ยวกับการอัพเดต ขอโทษด้วย คงหาไม่เจอแหละ"})
    }
})

router.delete("/:id", async (req, res) => {
    try {
        await Transaction.findByIdAndDelete(req.params.id)
        res.json({message: "มีการลบเกิดขึ้นและลบสำเร็จ"})
    }
    catch (err) {
        console.log("ERR: ", err)
        res.json({message: "ลบไม่ได้เสียดายจริงเชียว"})
    }
})

module.exports = router
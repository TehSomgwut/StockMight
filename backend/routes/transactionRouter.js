const router = require('express').Router()
const Transaction = require('../models/Transaction')
const product = require('../models/Product')

// get all
// get one
// post
// put
// delete

router.get("/", async (req, res) => {
    try {
        const Transactions = await Transaction.find().populate({path: 'product', select: 'name role code'}).populate({path: 'user', select: 'username realname role'})
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

router.patch("/:id", async (req, res) => {
    try {
        const { amount, type, user, note, reason } = req.body;
        const productId = req.params.id;
        const prevProduct = await product.findById(productId);
        if (!prevProduct) return res.status(404).json({ message: "ไม่พบสินค้า" });

        const prevQuantity = prevProduct.quantity;

        let incValue = 0;
        if (type === 'import') {
            incValue = amount;
        } else if (type === 'export') {
            if (amount > prevQuantity) {
                return res.status(400).json({ message: "จำนวนคงเหลือไม่เพียงพอสำหรับการเบิกออก" });
            }
            incValue = -amount;
        } else {
            return res.status(400).json({ message: "ประเภทรายการไม่ถูกต้อง" });
        }
        const updatedProduct = await product.findByIdAndUpdate(
            productId, 
            { $inc: { quantity: incValue } }, 
            { new: true }
        );

        const transaction = new Transaction({
            product: productId,
            user: user,
            type: type,
            quantity: amount,
            previous: prevQuantity,
            current: updatedProduct.quantity,
            note: note,
            reason: reason
        });
        await transaction.save();
        const io = req.app.get('io');
        if (io) {
            io.emit('updateTransaction');
            io.emit('updateSupply');
        }
        res.json({
            message: "บันทึกรายการสำเร็จ",
            transaction: transaction
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "เกิดข้อผิดพลาดภายในระบบ", error: err.message });
    }
});

module.exports = router
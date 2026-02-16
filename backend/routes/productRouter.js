const router = require('express').Router()
const Supply = require('../models/Product')
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images")
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + path.extname(file.originalname)
        cb(null, uniqueName)
    }
})

const upload = multer({ storage })

router.get("/", async (req, res) => {
    try {
        const product = await Supply.find()
        res.json(product)
    }
    catch {
        console.log("Err")
        res.json({message: "NOT Found"})
    }
})

router.get("/:id", async (req, res) => {
    try {
        const product = await Supply.findById(req.params.id);
        res.json(product)
    }
    catch {
        res.json({message: "Not Found"})
    }
})

// router.post("/", async (req, res) => {
//     try {
//         const newProduct = new Supply({
//             ...req.body,
//             image: `/images/${req.file.filename}`
//         })
//         await newProduct.save();
//         console.log(req.body.name, "saved : ")
//         res.status(200).json({message: ("เพิ่ม", req.body.name, "สำเร็จ")})
//     }
//     catch (err) {
//         console.log("Not Found", err)
//         res.json({message: "การเพิ่มล้มเหลว"})
//     }
// })

// router.post("/", upload.single('image'), async (req, res) => {
//     try {
//         // ตรวจสอบว่ามีไฟล์ส่งมาไหม
//         const imagePath = req.file ? `/images/${req.file.filename}` : "";
//         console.log(req.file)

//         const newProduct = new Supply({
//             ...req.body,
//             image: imagePath
//         })
//         console.log(newProduct)
//         // await newProduct.save();
//         res.status(200).json({ message: `เพิ่ม ${req.body.name} สำเร็จ` })
//     }
//     catch (err) {
//         console.log("POST Error", err)
//         res.status(500).json({ message: "การเพิ่มล้มเหลว" })
//     }
// })

router.post("/", upload.single('image'), async (req, res) => {
    try {        
        const imagePath = req.file ? `/images/${req.file.filename}${Math.round(Math.random*100)}` : "";
        const newProduct = new Supply({
            ...req.body,
            image: imagePath
        });
        
        console.log(newProduct)
        await newProduct.save();
        res.status(200).json({ message: "เพิ่มสำเร็จ" });
    } catch (err) {
        console.log("POST Error", err);
        res.status(500).json({ message: "การเพิ่มล้มเหลว" });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const Update = await Supply.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.json(Update)
    }
    catch {
        console.log("Not Found")
        res.json({message: "ไม่พบสินค้า"})
    }
})

router.delete("/:id", async (req, res) => {
    try {
        await Supply.findByIdAndDelete(req.params.id)
        res.json({message: (req.params.id, "has been deleted")})
    }
    catch {
        console.log("Not Found")
        res.json({message: "ไม่พบสินค้า"})
    }
})

module.exports = router
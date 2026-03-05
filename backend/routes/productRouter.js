const router = require('express').Router()
const Supply = require('../models/Product')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

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
        product = await Supply.find().populate('metric', 'name').populate('category', 'name');
        res.json(product)
    }
    catch (err) {
        console.log("Err")
        res.json({message: "NOT Found", error: err})
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
        const imagePath = req.file ? `/images/${req.file.filename}` : "";
        const newProduct = new Supply({
            ...req.body,
            image: imagePath
        });
        
        await newProduct.save();
        const io = req.app.get('io')
        io.emit("updateSupply")
        res.status(200).json({ message: "เพิ่มสำเร็จ" });
    } catch (err) {
        console.log("POST Error", err);
        res.status(500).json({ message: "การเพิ่มล้มเหลว" });
    }
});

router.put("/:id", upload.single("image"), async (req, res) => {
    try {
        const Update = { ...req.body };
        const target = await Supply.findById(req.params.id);
        if (!target) {
            return res.status(404).json({ message: "ไม่พบสินค้า" });
        }
        if (req.file) {
            if (target.image) {
                const oldPath = path.join(__dirname, "../public", target.image);
                console.log("1. ชื่อไฟล์ใน DB:", target.image);
                console.log("2. พยายามจะลบไฟล์ที่:", oldPath);
                if (fs.existsSync(oldPath)) {
                    fs.unlinkSync(oldPath);
                }
            }
            Update.image = "/images/" + req.file.filename;
        }
        const updatedProduct = await Supply.findByIdAndUpdate(req.params.id, Update, { new: true });
        
        const io = req.app.get('io');
        io.emit("updateSupply");
        res.json(updatedProduct);
    }
    catch (err) {
        console.log("Update Error: ", err);
        res.status(500).json({ message: "เกิดข้อผิดพลาดในการอัปเดตข้อมูล" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        // await Supply.findByIdAndDelete(req.params.id)
        const target = await Supply.findById(req.params.id)
        await Supply.findByIdAndDelete(req.params.id).then(() =>{
            const oldPath = path.join(__dirname, "../public", target.image)
            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath)
            }
        })
        const io = req.app.get('io')
        io.emit("updateSupply")
        res.json({message: (req.params.id, "has been deleted")})
    }
    catch {
        console.log("Not Found")
        res.json({message: "ไม่พบสินค้า"})
    }
})

module.exports = router

router.get("/", async (req, res) => {
    try {
        const products = await Product.find()
        res.json(products)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})
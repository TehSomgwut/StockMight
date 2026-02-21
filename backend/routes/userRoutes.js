const router = require('express').Router();
const User = require('../models/User');

router.post("/", async (req, res) => { // Create user link. /api/users/
    try {
        // counterUser = (await User.find({role: req.body.role})).length + 1;
        const newUser = new User({ ...req.body })
        console.log(newUser)
        await newUser.save().then(() => console.log(req.body.username, "saved"))
        const io = req.app.get('io')
        io.emit('userUpdate')
        res.json({message: `เพิ่ม ${req.body.username} สำเร็จ`})
    }
    catch (err) {
        console.log("newUser error: ", err);
    }
})

router.post("/login", async (req, res) => {
    try{
        const user = await User.findOne({ $or: [{ username: req.body.username }, {email: req.body.email}]})
        if (!user) {
            return res.status(401).json({message: "ไม่พบผู้ใช้"})
        }
        if (user.password !== req.body.password ) {
            return res.status(401).json({message: "รหัสผ่านไม่ถูกต้อง"})
        }
        if (user.status == "ปิดการใช้งาน") {
            return res.status(401).json({message: "บัญชีนี้ถูกปิดการใช้งาน"})
        }

        req.session.user = {
            secret: process.env.SESSION_SECRET,
            id: user._id,
            username: user.username,
            role: user.role
        };
        res.json({message: "Login สำเร็จ"})
    }

    catch (err) {
        console.error("Login Error: "+ err)
        res.json({message: "error"})
    }
})

router.get("/me", (req, res) => {
    if(req.session.id) {
        return res.status(401).json({ user: null })
    }

    res.json({ username: req.session.username, role: req.session.role })
})

// Read Users ✅
// Read One User ✅
// Update User ✅
// Delete User ✅
// Create User 

router.get("/", async (req, res) => {
    const users = await User.find();
    res.json(users);
})

router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id).catch((err) => console.log(err));
        res.json(user)
    } catch (err) {
        console.log("GET USER ERROR", err)
        res.status(404).json({error: "User not found"})
    }
})

router.put("/:id", async (req, res) => {
    try {
        const updated = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updated);
    } catch (err) {
        console.log("User not found", err);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        const io = req.app.get('io')
        io.emit('userUpdate')
        res.json({message: "ลบเสร็จสิ้น"})
    } catch {
        console.log("USER NOT FOUND")
    }
})

module.exports = router;
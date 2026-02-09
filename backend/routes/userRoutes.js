const router = require('express').Router();
const User = require('../models/User');

router.post("/", async (req, res) => { // Create user link. /api/users/
    try {
        counterUser = (await User.find({role: req.body.role})).length + 1;
        const newUser = new User({
            userId: `${req.body.role}00${counterUser}${Math.round(Math.random()*100)}`,
            name: req.body.name,
            password: req.body.password, // ยังไม่ได้แฮช
            role: req.body.role
        })
        await newUser.save().then(() => console.log(req.body.name, "saved"))
        res.send(newUser)
    }
    catch (err) {
        console.log("newUser error: ", err);
    }
})

// Read Users ✅
// Read One User ✅
// Update User
// Delete User

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
    } catch {
        console.log("USER NOT FOUND")
    }
})

module.exports = router;
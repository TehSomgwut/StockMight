const router = require('express').Router();
const User = require('../models/User');

router.post("/", async (req, res) => { // Create user link. /api/users/
    try {
        counterUser = (await User.find({role: req.body.role})).length + 1;
        const newUser = new User({
            userId: `${req.body.role}${counterUser}`,
            name: req.body.name,
            password: req.body.password, // ยังไม่ได้แฮช
            role: req.body.role
        })
        console.log( `${req.body.role}${counterUser}`)
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
        const user = await User.findOne({userId: req.params.id}).catch((err) => console.log(err));
        res.send(user)
    } catch (err) {
        console.log("GET USER ERROR", err)
        res.status(404).json({error: "User not found"})
    }
})

module.exports = router;
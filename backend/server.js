const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const TestDB = require('./models/test-for-teach') // import
const User = require('./models/User');

const userRoutes = require("./routes/userRoutes")
const categoryRouter = require("./routes/categoryRouter")

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/category", categoryRouter);

mongoose.connect(process.env.MONGO_URI).then(() => console.log("DB connected.")).catch((err) => {
    console.log(err)
})

app.get("/", (req, res) => {
    res.send("API Working");
});

app.get(("/api/posts"), async (req, res) => { // ขอข้อมูล
    const gets = await TestDB.find();
    res.json(gets)
})

app.post(("/api/posts"), async (req, res) => {
    const newTest = new TestDB({
        title: req.body.title,
        name: req.body.name,
        history: {
            activity: req.body.history.activity,
            amount: req.body.history.amount
        }
    })

    await newTest.save();
    res.json(newTest);
})

// app.post(("/api/post/user"), async (req, res) => {
//     const newUser = new User({
//         userId: req.body.userId,
//         name: req.body.name,
//         password: req.body.password,
//         role: req.body.role
//     })

//     await newUser.save().then(() => {
//         console.log(req.body.name, "user saved!")
//     }).catch((err) => {
//         console.log("error: ", err);
//     });

//     res.json(await User.find());
// })

app.listen(3000, () => {
    console.log("Server running at PORT 3000");
})
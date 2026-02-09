const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const TestDB = require('./models/test-for-teach') // import

const app = express();
app.use(cors());
app.use(express.json());

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

app.listen(3000, () => {
    console.log("Server running at PORT 3000");
})
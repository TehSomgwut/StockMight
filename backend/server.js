const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const TestDB = require('./models/test-for-teach') // import
const User = require('./models/User');
const path = require('path')

const userRoutes = require("./routes/userRoutes")
const categoryRouter = require("./routes/categoryRouter")
const MetricRouter = require('./routes/metricRouter')
const productRouter = require('./routes/productRouter')
const TransactionRouter = require('./routes/transactionRouter')

const app = express();
app.use(cors());
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use("/api/users", userRoutes);
app.use("/api/category", categoryRouter);
app.use("/api/metric", MetricRouter);
app.use("/api/product", productRouter);
app.use("/api/transaction", TransactionRouter);

mongoose.connect(process.env.MONGO_URI).then(() => console.log("DB connected.")).catch((err) => {
    console.log(err)
})

app.get("/", (req, res) => {
    res.send("API Working");
});

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
const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const { Server } = require('socket.io')
const cors = require('cors');
require('dotenv').config();
const TestDB = require('./models/test-for-teach') // import
const User = require('./models/User');
const path = require('path')
const session = require('express-session')

const userRoutes = require("./routes/userRoutes")
const categoryRouter = require("./routes/categoryRouter")
const MetricRouter = require('./routes/metricRouter')
const productRouter = require('./routes/productRouter')
const TransactionRouter = require('./routes/transactionRouter')

const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use(session({
    secret: "supersecret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false}
}))

app.use("/api/users", userRoutes);
app.use("/api/category", categoryRouter);
app.use("/api/metric", MetricRouter);
app.use("/api/product", productRouter);
app.use("/api/transaction", TransactionRouter);

mongoose.connect(process.env.MONGO_URI).then(() => console.log("DB connected.")).catch((err) => {
    console.log(err)
})

const server = http.createServer(app); // หุ้มด้วย http
const io = new Server(server, {cors: {origin: "*"}})
app.set('io', io);


app.get("/", (req, res) => {
    res.send("API Working");
});

server.listen(3000, () => {
    console.log("Server running at PORT 3000");
})
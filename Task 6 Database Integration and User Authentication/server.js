const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const User = require("./user");
const auth = require("./auth");

const app = express();
app.use(express.json());
app.use(cors());

// 🔹 DATABASE CONNECTION
mongoose.connect("mongodb://127.0.0.1:27017/authDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// 🔹 REGISTER API
app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
        name,
        email,
        password: hashedPassword
    });

    await user.save();
    res.json({ message: "User Registered Successfully" });
});

// 🔹 LOGIN API
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Wrong password" });
    }

    const token = jwt.sign({ id: user._id }, "SECRET_KEY", {
        expiresIn: "1h"
    });

    res.json({ token });
});

// 🔹 PROTECTED API (STEP 3)
app.get("/dashboard", auth, (req, res) => {
    res.json({ message: "Welcome to Secure Dashboard" });
});

// 🔹 START SERVER
app.listen(5000, () => {
    console.log("Server running on port 5000");
});

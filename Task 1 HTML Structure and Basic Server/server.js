const express = require("express");
const path = require("path");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});
app.post("/submit", (req, res) => {
    const { name, age, profession } = req.body;
    res.render("result", { name, age, profession });
});
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});

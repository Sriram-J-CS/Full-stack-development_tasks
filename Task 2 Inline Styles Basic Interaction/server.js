const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));

// Temporary storage
let users = [];

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/submit", (req, res) => {
    const { name, email, age, password } = req.body;

    // Server-side validation
    if (!name || name.length < 3)
        return res.send("Server Error: Invalid Name");

    if (!email || !email.includes("@"))
        return res.send("Server Error: Invalid Email");

    if (!age || age < 18)
        return res.send("Server Error: Age must be 18+");

    if (!password || password.length < 6)
        return res.send("Server Error: Weak Password");

    users.push({ name, email, age });

    console.log("Registered Users:", users);

    res.send(`
<!DOCTYPE html>
<html>
<head><title>Success</title></head>

<body style="
margin:0;
height:100vh;
display:flex;
justify-content:center;
align-items:center;
background:#1e3c72;
font-family:Arial;
">

<div style="
background:white;
padding:30px;
border-radius:10px;
text-align:center;
width:400px;
">

<h2>✅ Registration Successful</h2>
<p><b>Name:</b> ${name}</p>
<p><b>Email:</b> ${email}</p>
<p><b>Age:</b> ${age}</p>

<p style="color:green;">Server-side validation completed</p>

<a href="/" style="
display:inline-block;
margin-top:10px;
text-decoration:none;
color:white;
background:#1e3c72;
padding:8px 15px;
border-radius:5px;
">
⬅ Back
</a>

</div>
</body>
</html>
    `);
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});

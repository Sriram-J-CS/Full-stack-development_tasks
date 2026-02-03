const express = require("express");
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static("public"));

// Sample data (acts like database)
let users = [
  { id: 1, name: "Sriram", role: "Student" }
];

// READ (GET)
app.get("/api/users", (req, res) => {
  res.json(users);
});

// CREATE (POST)
app.post("/api/users", (req, res) => {
  const newUser = {
    id: Date.now(),
    name: req.body.name,
    role: req.body.role
  };
  users.push(newUser);
  res.json(newUser);
});

// UPDATE (PUT)
app.put("/api/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  users = users.map(user =>
    user.id === userId ? { ...user, ...req.body } : user
  );
  res.json({ message: "User updated" });
});

// DELETE (DELETE)
app.delete("/api/users/:id", (req, res) => {
  users = users.filter(user => user.id !== parseInt(req.params.id));
  res.json({ message: "User deleted" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

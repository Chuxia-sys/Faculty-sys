const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

/* REGISTER */
app.post("/register", async (req, res) => {

  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const sql = `
    INSERT INTO users (name, email, password)
    VALUES (?, ?, ?)
  `;

  db.run(sql, [name, email, hashedPassword], function(err) {

    if (err) {
      return res.status(400).json({
        error: err.message
      });
    }

    res.json({
      message: "User registered successfully"
    });

  });

});

/* LOGIN */
app.post("/login", (req, res) => {

  const { email, password } = req.body;

  const sql = `
    SELECT * FROM users WHERE email = ?
  `;

  db.get(sql, [email], async (err, user) => {

    if (err) {
      return res.status(500).json({
        error: err.message
      });
    }

    if (!user) {
      return res.status(401).json({
        message: "User not found"
      });
    }

    const validPassword = await bcrypt.compare(
      password,
      user.password
    );

    if (!validPassword) {
      return res.status(401).json({
        message: "Invalid password"
      });
    }

    res.json({
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });

  });

});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
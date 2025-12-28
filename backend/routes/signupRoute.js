import express from "express";
import db from "../config/db.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/", async (req, res) => {
  const { first_name, last_name, email, phone_number, password } = req.body;

  try {
    const [existingUsers] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    if(existingUsers.length > 0){
      return res.status(400).json({error: "this email has already been registred with another acount"})
    }


    const hashedPassword = await bcrypt.hash(password, 10)
    const [result] = await db.query(
      "INSERT INTO users (first_name, last_name, email, phone_number, password) VALUES (?, ?, ?, ?, ?)",
      [first_name, last_name, email, phone_number, hashedPassword]
    );

    res.status(201).json({
      message: "User registered successfully",
      userId: result.insertId
    });
  } catch (error) {
    console.error("MySQL Error:", error);
    res.status(500).json({ error: "Database error" });
  }
});

export default router;

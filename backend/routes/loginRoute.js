import express from "express";
import db from '../config/db.js';
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Fetch user from DB
        const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);

        if (rows.length === 0) {
            return res.status(401).json({ message: "Invalid email address" });
        }

        const user = rows[0];

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        // ✅ Store user info in session
        req.session.user = {
            id: user.id,       // optional, but good for future reference
            email: user.email
        };

        // Return success message
        res.json({
            message: "Login successful",
            email: user.email
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error });
    }
});

export default router;

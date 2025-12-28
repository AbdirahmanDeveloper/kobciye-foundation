import express from "express";
import db from "../config/db.js";

const router = express.Router();

router.get("/", async(req,res) => {
    try{
        const [news] = await db.query(
            "SELECT * FROM news"
        )

        res.json(news);
    }catch(error){
        console.error(error);
        return res.status(500).json({message: "server error", error});
    }
})
export default router
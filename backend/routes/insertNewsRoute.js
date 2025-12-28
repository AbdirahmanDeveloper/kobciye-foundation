import express from "express";
import db from "../config/db.js";
import multer from "multer";
import path from "path";
import fs from 'fs';

const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const router = express.Router();

const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req,file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({storage: storage});

router.post("/", upload.single("image"), async(req,res) => {

    const imagePath = req.file ? `/uploads/${req.file.filename}`: null;

    const  {
        project,
        news_title,
        news_content,
    } = req.body;

    if( !project || !news_title || !news_content){
        return res.status(400).json({message: "missing required fileds please fill of the empty fileds"});
    }

   try{
    const [news] = await db.query(
        "INSERT INTO news(project, news_title, news_content, image) VALUES(?, ?, ?, ?)",
        [project, news_title, news_content, imagePath]
    )

    return res.status(201).json({message: "News inserted suucessfully",
        id: news.insertId
    });
   }catch(error){
    console.error(error);
    return res.status(500).json({message: "serverside error", error});
    
   }

});

export default router
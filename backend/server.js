import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors"
import db from "./config/db.js";
import session from "express-session";
import signupRoute from "./routes/signupRoute.js";
import loginRoute from "./routes/loginRoute.js";
import newsRouter from "./routes/newsRoute.js";
import insertNewsRoute from "./routes/insertNewsRoute.js";
import userRoutes from "./routes/usersRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: ["http://localhost:5500", "http://127.0.0.1:5500"],
  credentials: true
}));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "lax"
  }
}));


app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api/signup", signupRoute);
app.use("/api/login", loginRoute);
app.use("/api/news", newsRouter);
app.use("/api/insert-news", insertNewsRoute);
app.use("/api/count-users", userRoutes);



app.get("/api/check-session", (req, res) => {
  if (req.session.user) {
      res.json({ loggedIn: true, email: req.session.user.email });
  } else {
      res.json({ loggedIn: false });
  }
});


    (async () => {
        try {
          const connection = await db.getConnection();
          console.log('✅ Database connected successfully.');
          connection.release();
        } catch (error) {
          console.error('❌ Database connection failed:', error.message);
        }
      })();

app.get('/', (req,res) => {
    res.send("hello from kobciye foundaation");
});

app.listen(port, () => {
    console.log(`🚀 server is connected successfully `);
});

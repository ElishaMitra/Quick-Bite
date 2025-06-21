import express from "express"
import cors from "cors"
import foodRouter from "./routes/foodRouter.js"
import dotenv from 'dotenv';
import mongoose from "mongoose";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config';
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import Stripe from "stripe";



// App config
const app = express()
const port= 4000;
dotenv.config();

// Middleware
app.use(express.json())
app.use(cors())

// DB connection
mongoose.connect(
    process.env.MONGODB_URI
  ).then(() => {
      console.log('Connected to database!')
  }).catch(() => {
      console.log('Connection failed!')
  })


// API endpoints
app.use("/api/food", foodRouter)
app.use("/images", express.static("uploads"))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)

app.get("/", (req, res) => {
    res.send("API working")
})

app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`)
})

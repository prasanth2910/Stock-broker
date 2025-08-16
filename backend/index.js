require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const authRoutes = require("./routes/auth");
const auth = require("./middleware/auth");

const PORT = process.env.PORT ;
const uri = process.env.MONGO_URL ;

const app = express();

const allowedOrigins = [
  "https://stock-broker-ten.vercel.app",
  "https://stock-broker-sh31.vercel.app", // if you still need it
  process.env.frontendUrl,
  process.env.dashboardUrl,
].filter(Boolean);

app.use(cors({
  origin: true,
  credentials: true,
}));

console.log("CORS enabled for:", process.env.frontendUrl, process.env.dashboardUrl);

app.set('trust proxy', true);

app.use(bodyParser.json());

// Authentication routes (public)
app.use('/api/auth', authRoutes);

// Protected routes - require authentication
app.get("/api/allHoldings", auth, async (req, res) => {
  try {
    let allHoldings = await HoldingsModel.find({});
    res.json(allHoldings);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get("/api/allPositions", auth, async (req, res) => {
  try {
    let allPositions = await PositionsModel.find({});
    res.json(allPositions);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post("/api/newOrder", auth, async (req, res) => {
  try {
    let newOrder = new OrdersModel({
      name: req.body.name,
      qty: req.body.qty,
      price: req.body.price,
      mode: req.body.mode,
      status: req.body.status || 'pending',
      userId: req.user._id // Associate order with user
    });

    await newOrder.save();
    res.json({ message: "Order saved successfully!" });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get("/api/orders", auth, async (req, res) => {
  try {
    let orders = await OrdersModel.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });  
  } 
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? "connected" : "disconnected";
  res.json({ 
    status: "OK", 
    message: "Server is running",
    database: dbStatus,
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}!`);
  
  // Connect to MongoDB with retry logic
  const connectDB = async () => {
    try {
      await mongoose.connect(uri);
      console.log("Database connected successfully!");
    } catch (error) {
      console.error("Database connection failed:", error.message);
    }
  };
  
  connectDB();
});
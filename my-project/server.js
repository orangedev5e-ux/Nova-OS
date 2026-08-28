import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import dns from 'node:dns';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';
import authMiddleware from './authMiddleware.js';

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "MY_SUPER_SECRET_KEY_123";

// Fix DNS resolution for MongoDB Atlas SRV records
dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '8.8.4.4']);

app.use(cors());
app.use(express.json());
app.use(express.static('../public'));

// Read MongoDB URI from .env or fallback
const uri = process.env.MONGO_URI || "mongodb+srv://simpleUsername:abcL5t8dFcQpZ@cluster0.gv9kwt2.mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri);

let db;
let usersCollection;

async function getCollection() {
  if (!usersCollection) {
    await client.connect();
    db = client.db('User_DataBase');
    usersCollection = db.collection('Users');
    console.log("Connected to MongoDB Atlas successfully!");
  }
  return usersCollection;
}
getCollection().catch(err => console.error("Initial Atlas connect error:", err.message));

// 1. SIGN UP (REGISTER) ROUTE
app.post('/api/submit', async (req, res) => {
  try {
    const { userName, userEmail, userPassword } = req.body;

    if (!userName || !userEmail || !userPassword) {
      return res.status(400).json({ error: "Please fill in all fields." });
    }

    const collection = await getCollection();

    // Check if user already exists
    const existingUser = await collection.findOne({ userEmail: userEmail.toLowerCase().trim() });
    if (existingUser) {
      return res.status(400).json({ error: "This email is already registered. Please log in." });
    }

    // Hash the password securely
    const hashedPassword = await bcrypt.hash(userPassword, 10);

    const newUser = await collection.insertOne({
      userName: userName.trim(),
      userEmail: userEmail.toLowerCase().trim(),
      userPassword: hashedPassword,
      createdAt: new Date()
    });

    console.log("New user registered:", userName);
    res.status(201).json({
      success: true,
      message: "Account created successfully! Please log in.",
      userId: newUser.insertedId
    });
  } catch (error) {
    console.error("Sign up error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// 2. LOGIN ROUTE (Public)
app.post('/api/login', async (req, res) => {
  try {
    const { identifier, userPassword } = req.body;

    if (!identifier || !userPassword) {
      return res.status(400).json({ error: "Please enter your username/email and password." });
    }

    const collection = await getCollection();

    // Allow login using either Email or Username
    const user = await collection.findOne({
      $or: [
        { userEmail: identifier.toLowerCase().trim() },
        { userName: identifier.trim() }
      ]
    });

    if (!user) {
      return res.status(400).json({ error: "Incorrect email/username or password." });
    }

    // Compare entered password with stored hash
    const isPasswordValid = await bcrypt.compare(userPassword, user.userPassword);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Incorrect email/username or password." });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { userId: user._id, userName: user.userName, userEmail: user.userEmail },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      success: true,
      message: "Login successful!",
      token: token,
      user: {
        id: user._id,
        userName: user.userName,
        userEmail: user.userEmail
      }
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// 3. PROTECTED ROUTE (Requires valid JWT via authMiddleware)
app.get('/api/profile', authMiddleware, async (req, res) => {
  try {
    const collection = await getCollection();
    const user = await collection.findOne(
      { _id: new ObjectId(req.user.userId) },
      { projection: { userPassword: 0 } }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    res.json({
      success: true,
      user: user
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. DELETE ACCOUNT ROUTE
app.delete('/api/account', authMiddleware, async (req, res) => {
  try {
    const collection = await getCollection();
    const result = await collection.deleteOne({ _id: new ObjectId(req.user.userId) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "User account not found or already deleted." });
    }
    console.log(`Account deleted: ID ${req.user.userId}`);
    res.json({
      success: true,
      message: "Account deleted permanently."
    });
  } catch (error) {
    console.error("Delete account error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Open in browser: http://localhost:${PORT}`);
});




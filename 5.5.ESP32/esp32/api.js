import express from 'express';
import cors from 'cors';
import crypto from 'crypto';
import { database } from './firebase.js';
import { ref, get, set } from "firebase/database";

// Hardcoded password hash for "password"
const PASSWORD_HASH = '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8';

const app = express();
app.use(cors());
app.use(express.json());

// Updated Helper function to validate the password
const validatePassword = (req) => {
  const providedPassword = req.headers['x-password'];
  if (!providedPassword) return false;
  const providedHash = crypto.createHash('sha256').update(providedPassword).digest('hex');
  return providedHash === PASSWORD_HASH;
  //return true; // for testing
};

// GET endpoint to fetch globalCount
app.get('/globalCount', async (req, res) => {
  if (!validatePassword(req)) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const countRef = ref(database, 'globalCount');
    const snapshot = await get(countRef);
    if (snapshot.exists()) {
      res.json({ globalCount: snapshot.val() });
    } else {
      res.status(404).json({ error: "globalCount not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST endpoint to update globalCount
app.post('/globalCount', async (req, res) => {
  if (!validatePassword(req)) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const { value } = req.body;
  if (typeof value !== 'number') {
    return res.status(400).json({ error: "value must be a number" });
  }
  try {
    const countRef = ref(database, 'globalCount');
    await set(countRef, value);
    res.json({ success: true, globalCount: value });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Default route for "/"
app.get('/', (req, res) => {
  res.send("Welcome to the ESP32 API. Use /globalCount to get or update the count.");
});

const PORT = process.env.API_PORT || 3001;
app.listen(PORT, () => console.log(`API server listening on port ${PORT}`));

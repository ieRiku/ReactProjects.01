import express from 'express';
import cors from 'cors'; // new import
import { db } from './src/firebase.js';
import { ref, get, set } from "firebase/database";

const app = express();
app.use(cors()); // added cors middleware
app.use(express.json());

// GET endpoint to fetch globalCount
app.get('/globalCount', async (req, res) => {
  try {
    const countRef = ref(db, 'globalCount');
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
  const { value } = req.body;
  if (typeof value !== 'number') {
    return res.status(400).json({ error: "value must be a number" });
  }
  try {
    const countRef = ref(db, 'globalCount');
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API server listening on port ${PORT}`));

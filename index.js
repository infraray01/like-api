const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let count = 0;
const FILE = "likes.json";

// Load count from file
if (fs.existsSync(FILE)) {
  const data = fs.readFileSync(FILE);
  count = JSON.parse(data).count || 0;
}

// GET current like count
app.get("/likes", (req, res) => {
  res.json({ count });
});

// POST to increase like count
app.post("/like", (req, res) => {
  count++;
  fs.writeFileSync(FILE, JSON.stringify({ count }));
  res.json({ count });
});

app.listen(PORT, () => {
  console.log(`Like API running on port ${PORT}`);
});

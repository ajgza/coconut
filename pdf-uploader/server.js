const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 3000;

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

app.use(express.static('public'));
app.use('/uploads', express.static('uploads')); // serve uploaded PDFs

app.post('/upload', upload.single('pdf'), (req, res) => {
  res.json({ success: true });
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});





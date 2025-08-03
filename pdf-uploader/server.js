const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));

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
  const title = req.body.title || 'Untitled';
  const filePath = `/uploads/${req.file.originalname}`;
  res.json({ 
    success: true,
    title, 
    filePath});
});


const fs = require('fs');

app.get('/uploaded-files', (req, res) => {
  const uploadsDir = path.join(__dirname, 'uploads');
  fs.readdir(uploadsDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Unable to list files' });
    }
    // Only return .pdf files
    const pdfFiles = files.filter(file => file.endsWith('.pdf'));
    res.json(pdfFiles);
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});






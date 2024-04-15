const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors()); // Enable CORS

const port = process.env.PORT || 5000;

// Multer config for file uploads
const storage = multer.diskStorage({
    destination: 'uploads/', // specify the uploads directory
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

// Routes
app.post('/upload', upload.single('file'), (req, res) => {
    res.status(200).send('File uploaded successfully');
});

// Serve React App
app.use(express.static(path.join(__dirname, 'build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

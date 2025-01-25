import express from 'express';
import cors from 'cors';
import path from 'path';

const app = express();

app.use(cors({
  origin: 'http://localhost:8080',
}));

app.use(express.json());

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'dist')));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.post("/submit-form", (req, res) => {
  const { name, email, phone, message } = req.body;

  const errors = {};

  if (!name) errors.name = "Name is required";
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter a valid email address";
  }
  if (!phone) {
    errors.phone = "Phone is required";
  } else {
    const phoneDigits = phone.replace(/\D/g, '');
    
    if (phoneDigits.length < 12) {
      errors.phone = "Enter a valid phone number";
    }
  }

  if (!message) errors.message = "Message is required";

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      status: "error",
      fields: errors,
    });
  }

  res.json({
    status: "success",
    msg: "Your message has been sent successfully!",
  });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
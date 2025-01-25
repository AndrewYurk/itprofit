import request from 'supertest';
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

describe('POST /submit-form', () => {
  it('should return an error if name is missing', async () => {
    const response = await request(app)
      .post('/submit-form')
      .send({
        email: 'test@example.com',
        phone: '123456789012',
        message: 'Hello'
      });

    expect(response.status).toBe(400);
    expect(response.body.fields.name).toBe('Name is required');
  });

  it('should return an error if email is invalid', async () => {
    const response = await request(app)
      .post('/submit-form')
      .send({
        name: 'John Doe',
        email: 'invalid-email',
        phone: '123456789012',
        message: 'Hello'
      });

    expect(response.status).toBe(400);
    expect(response.body.fields.email).toBe('Enter a valid email address');
  });

  it('should return an error if phone is invalid', async () => {
    const response = await request(app)
      .post('/submit-form')
      .send({
        name: 'John Doe',
        email: 'test@example.com',
        phone: '12345',
        message: 'Hello'
      });

    expect(response.status).toBe(400);
    expect(response.body.fields.phone).toBe('Enter a valid phone number');
  });

  it('should return success if all fields are valid', async () => {
    const response = await request(app)
      .post('/submit-form')
      .send({
        name: 'John Doe',
        email: 'test@example.com',
        phone: '123456789012',
        message: 'Hello'
      });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.msg).toBe('Your message has been sent successfully!');
  });
});
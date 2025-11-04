import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import pool from './db.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

//  Route to insert data into "users"
app.post('/api/save-user', async (req, res) => {
  try {
    const { first_name, phn_number } = req.body;

    if (!first_name || !phn_number) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const query = `
      INSERT INTO users (first_name, phn_number)
      VALUES ($1, $2)
      RETURNING *;
    `;

    const result = await pool.query(query, [first_name, phn_number]);

    res.status(201).json({
      message: 'User saved successfully',
      data: result.rows[0],
    });
  } catch (err) {
    console.error('Error saving user:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

//  Route to fetch all users
app.get('/api/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users ORDER BY id DESC;');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(process.env.PORT, () => {
  console.log(` Server running on port ${process.env.PORT}`);
});

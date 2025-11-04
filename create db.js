// create_table.js
import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pkg;

// connect to PostgreSQL
const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

// SQL for creating table
const createTableQuery = `
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(255),
  phn_number VARCHAR(255)
);
`;

// Run the query
(async () => {
  try {
    await pool.query(createTableQuery);
    console.log(' Table "users" created successfully!');
  } catch (err) {
    console.error(' Error creating table:', err);
  } finally {
    await pool.end();
  }
})();

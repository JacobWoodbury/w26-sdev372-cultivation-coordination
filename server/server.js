import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = 3000;

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
}); 

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});
    
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}); 

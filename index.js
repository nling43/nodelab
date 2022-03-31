const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const signale = require('signale');
const PORT = process.env.PORT || 3000

// connect to DB
mongoose.connect(process.env.DB_CONNECT, { useUnifiedTopology: true, useNewUrlParser: true }, () => {
    signale.success('Connected to db')
})

//http://localhost:3000/
app.listen(PORT, () => {
    signale.success('Server running')
})
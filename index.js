const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const signale = require('signale');
const userRoute = require('./routes/users');



//middleware
app.use(express.json())
app.use(express.static('client'))

//routes
app.use('/api/user', userRoute);

// connect to DB
dotenv.config();
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    signale.success('Connected to db')
})
//http://localhost:3000
app.listen(process.env.PORT, () => {
    signale.success('Server running')
})
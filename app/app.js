const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config()

app.use(cors());
app.use(express.json())

// ROUTES
app.use('/api/auth', require("./routes/auth/auth"))
app.use('/api/account', require("./routes/account/account"))
app.use('/api/form', require("./routes/form/form"))

module.exports = app;
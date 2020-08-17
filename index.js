const express =  require('express');
const connectDB = require('./config/db');
const app = express();
require('dotenv').config()

//connect to DB
connectDB();

app.use(express.json({ extended : false}));

//Define Routes
app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'))

const port = process.env.PORT;

app.listen(port, () => console.log(`Server Running on Port ${port}`));
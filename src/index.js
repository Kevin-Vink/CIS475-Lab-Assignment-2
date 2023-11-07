// Load .env file
require('dotenv').config({
  path: '.env'
});

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const {makeConnection} = require("./helpers/mysqlHelper");

const app = express();
makeConnection();

app.use(cors({origin: true, credentials: true}));
app.options("*", cors({origin: true, credentials: true}));

app.use(bodyParser.json());

// Routes


// Start server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
const express = require("express");
const app = express();
const cors = require("cors");
const routes = require('./routes/index.routes')
app.use(express.json());
app.use(cors());
app.options("*", cors());
app.use('/',routes)
module.exports =app;

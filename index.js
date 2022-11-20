import express from "express";
import cors from "cors";
import { hallRouter } from "./routers.js";

const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Homepage : Hall Bookiing API');
});

app.use("/api", hallRouter);

app.listen(PORT, console.log("Server running on port " + PORT));
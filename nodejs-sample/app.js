require("dotenv").config();
require('./instrumentation.js');

const express = require('express');
const { trace } = require("@opentelemetry/api");

const PORT = parseInt(process.env.PORT || '8080');
const app = express();

function getRandomNumber(min, max) {
  const span = trace.getTracer('dice-service').startSpan('getRandomNumber');
  try {
    return Math.floor(Math.random() * (max - min + 1) + min);
  } finally {
    span.end();
  }
}

app.get('/rolldice', (req, res) => {
  const result = getRandomNumber(1, 6);
  res.send(result.toString());
});

app.listen(PORT, () => {
  console.log(`Listening for requests on http://localhost:${PORT}`);
});
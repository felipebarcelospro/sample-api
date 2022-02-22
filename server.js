const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send({ ok: true })
});

app.listen(3333, () => {
  console.log('Server started on port 3333!');
})
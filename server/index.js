const express = require("express");
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;
const indexHTML = path.join(__dirname, '../client/dist');

app.use(cors());
app.use(express.json());
app.use(express.static(indexHTML));

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../'))
// })













app.listen(port, () => {
  console.log(`Listening on ${port}..`)
})
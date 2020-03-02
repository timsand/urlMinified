const express = require("express");
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;
const indexHTML = path.join(__dirname, '../client/dist');
const getNewUrl = require('./rebrandly.js')

app.use(cors());
app.use(express.json());
app.use(express.static(indexHTML));


app.post('/miniurl', (req, res) => {
  console.log('what up, I got it');
  console.log(req.body);

  getNewUrl()
    .then(response => response.json())
    .then((data) => {
      console.log(data.shortUrl);
      res.end();
    })
    .catch((err) => {
      console.log('ERRORS!');
      console.log(err);
      res.status(400).send();
    })
})









app.listen(port, () => {
  console.log(`Listening on ${port}..`)
})
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
  let destination = req.body.destination;

  getNewUrl(destination)
    .then(response => response.json())
    .then((data) => {
      if (data.errors) {
        //there is data in errors at data.errors[0].verbose
        //can use this information sometime in the future for more detailed errors
        res.status(400).send();
      }
      data = JSON.stringify(data.shortUrl);
      res.send(data);
    })
    .catch((err) => {
      console.log('ERRORS!');
      res.status(400).send();
    })
})


app.listen(port, () => {
  console.log(`Listening on ${port}..`);
})
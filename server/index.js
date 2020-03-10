const express = require("express");
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;
const indexHTML = path.join(__dirname, '../client/dist');
// const getNewUrl = require('./rebrandly.js');
const validUrl = require('valid-url');
const db = require('../db/db.js');
const crypto = require('crypto');

app.use(cors());
app.use(express.json());
app.use(express.static(indexHTML));


const encryptSHA1 = (input) => {
  return crypto.createHash('sha1').update(input).digest('hex');
}

app.post('/miniurl', (req, res) => {
  let destination = req.body.destination;


  // getNewUrl(destination)
  //   .then(response => response.json())
  //   .then((data) => {
  //     if (data.errors) {
  //       //there is data in errors at data.errors[0].verbose
  //       //can use this information sometime in the future for more detailed errors
  //       res.status(400).send();
  //     }
  //     data = JSON.stringify(data.shortUrl);
  //     res.send(data);
  //   })
  //   .catch((err) => {
  //     console.log('ERRORS!');
  //     res.status(400).send();
  //   })

  if (!validUrl.isUri(destination)) {
    res.status(400).send();
  } else {
    db.findShortUrlFromLong(destination)
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        //entry in database does not exist, create entry
        //Increasing potential hash collisions by getting substring, can change later...
        //For demo purposes only
        let shortCode = encryptSHA1(destination).substring(0, 15);
        let shortUrl;
        if (process.env.domain) {
          //can be expanded upon later, create more meaningful links than localhost
          shortUrl = `${process.env.domain}/sh/${shortCode}`;
        } else {
          shortUrl = `http://www.localhost:${port}/sh/${shortCode}`;
        }
        db.saveUrl(shortCode, shortUrl, destination)
          .then((result) => {
            res.send(shortUrl);
          })
          .catch((err) => {
            console.log(err);
            res.status(400).send();
          })
      })
  }


})

app.get('/sh/:urlCode', (req, res) => {
  let urlCode = req.params.urlCode;
  db.findShortUrlFromCode(urlCode)
    .then((url) => {
      res.redirect(url.longUrl)
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send();
    })
})


app.listen(port, () => {
  console.log(`Listening on ${port}..`);
})


module.exports = app;
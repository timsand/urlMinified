const dbModel = require('./dbModel.js')

const findShortUrlFromLong = (longUrl) => {
  return new Promise((resolve, reject) => {
    dbModel.findOne({ longUrl: longUrl })
      .then((result) => {
        resolve(result.shortUrl)
      })
      .catch((err) => {
        reject(err);
      })
  })
}

const findShortUrlFromCode = (code) => {
  return new Promise((resolve, reject) => {
    dbModel.findOne({ shortCode: code })
      .then((results) => {
        resolve(results);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      })
  })
}

const saveUrl = (shortCode, shortUrl, longUrl) => {
  let urlObject = { shortCode: shortCode, shortUrl: shortUrl, longUrl: longUrl }
  let newUrlEntry = new dbModel(urlObject);
  return new Promise((resolve, reject) => {
    newUrlEntry.save()
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      })
  })
}



module.exports = { findShortUrlFromLong, saveUrl, findShortUrlFromCode };
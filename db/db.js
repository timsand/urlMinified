const mongoose = require('mongoose');
const dbModel = require('./dbModel.js')



mongoose.connect(`mongodb+srv://kazoo:kazootest@kazoo-iixhb.mongodb.net/test?retryWrites=true&w=majority`, {
  dbName: `kazoo`
})
  .then(() => {
    console.log('db connected')
  })
  .catch((err) => {
    console.log(`errors connecting to db...    ${err}`)
  })

const findShortUrl = (longUrl) => {
  return new Promise((resolve, reject) => {
    dbModel.findOne({ longUrl: longUrl })
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err);
      })
  })
}

const saveUrl = (shortUrl, longUrl) => {
  let urlObject = { shortUrl: shortUrl, longUrl: longUrl }
  return new Promise((resolve, reject) => {
    dbModel.save(urlObject)
      .then((result) => {
        console.log(result);
        resolve(result);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      })
  })
}



module.exports = { findShortUrl, saveUrl };
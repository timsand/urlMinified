const fetch = require('node-fetch');
// const SECRET = process.env.urlkey || require('./secrets.js');
const SECRET = "f1bd656040634e7d9638d0f21bfb9788";

const getNewUrl = (destination) => {

  let urlToMinify = {
    destination: destination,
    domain: { fullName: "rebrand.ly" }
  }
  let requestHeaders = {
    "Content-Type": "application/json",
    "apikey": `${SECRET}`
  }

  return fetch("https://api.rebrandly.com/v1/links", {
    method: 'POST',
    body: JSON.stringify(urlToMinify),
    headers: requestHeaders
  })
}

module.exports = getNewUrl;
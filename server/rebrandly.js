const fetch = require('node-fetch');

const getNewUrl = (destination) => {

  let urlToMinify = {
    destination: destination,
    domain: { fullName: "rebrand.ly" }
  }
  let requestHeaders = {
    "Content-Type": "application/json",
    "apikey": `${process.env.URLKEY}`
  }

  return fetch("https://api.rebrandly.com/v1/links", {
    method: 'POST',
    body: JSON.stringify(urlToMinify),
    headers: requestHeaders
  })
}

module.exports = getNewUrl;
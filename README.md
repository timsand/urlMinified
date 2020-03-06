# urlMinified
Minifies URLs!


This is a fairly simple app that minifies urls. To set it up:

1) Clone down the repo
2) npm install
3) Ensure that the MongoDB Atlas connection string is correct, and that it will accept connections to your local machine (by default it only accepts whitelisted connections)
4) npm run build
5) npm run server


This app comes with some cypress testing. If you want to run a test, make sure that you replace process.env.URLKEY with the appropriate API key. Afterwards you can run:

1) npx cypress open
2) click on full_site.js

This app contains some mocha/chai testing as well for the API. Again, replace process.env.URLKEY with a key. Then run:

1) npm test

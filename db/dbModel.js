const mongoose = require('mongoose');


const kazooSchema = new mongoose.Schema({
  shortCode: {
    type: String
  },
  shortUrl: {
    type: String
  },
  longUrl: {
    type: String
  }
});

const kazooModel = mongoose.model("kazooModel", kazooSchema, "kazoo");


module.exports = kazooModel;
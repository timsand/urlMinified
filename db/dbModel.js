const mongoose = require('mongoose');


const kazooSchema = new mongoose.Schema({
  longUrl: {
    type: String
  },
  shortUrl: {
    type: String
  }
});

const kazooModel = mongoose.model(kazooModel, kazooSchema, "kazoo");


module.exports = kazooModel;
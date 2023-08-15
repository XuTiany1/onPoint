const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const summarySchema = new Schema({
  transactionId: {
    type: String,
    required: true,
    unique: true
  },
  gistSummary: {
    type: String,
    required: false  
  },
  headlineSummary: {
    type: String,
    required: false  
  },
  bulletSummary: {
    type: String,
    required: false  
  }
});

module.exports = mongoose.model("videoSummary", summarySchema)
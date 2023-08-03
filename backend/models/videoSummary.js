const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const summarySchema = new Schema({
  transactionId: {
    type: String,
    required: true,
    unique: true
  },
  summary: {
    type: String,
    required: false  
  }
});

module.exports = mongoose.model("videoSummary", summarySchema)
const mongoose = require('mongoose');

const schemaTarefa = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Tarefa', schemaTarefa);

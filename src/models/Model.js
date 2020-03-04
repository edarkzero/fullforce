class Model {
  constructor() {
    this.config = require("./../config/main");
    this.mongoose = require("mongoose");
    this.mongoose.connect(this.config.mongo.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }
}

module.exports = Model;

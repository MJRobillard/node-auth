const mongoose = require("mongoose");

const ShopSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  count: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

// export model user with UserSchema
module.exports = mongoose.model("Club_Info", ShopSchema);

const mongoose = require("mongoose");
//Username: robillard.matthew22@berkeley.edu 
//Password: fullstack2023 
// Replace this with your MONGOURI.
const MONGOURI = "mongodb+srv://robillardmatthew22:fullstack2023@cluster0.m5vitkg.mongodb.net/?retryWrites=true&w=majority";

const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(MONGOURI, {
      useNewUrlParser: true
    });
    console.log("Connected to DB !!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = InitiateMongoServer;

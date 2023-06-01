const mongoose = require("mongoose")
const Contact = mongoose.Schema({
    Name: String,
    Mobile: String,
    email: String,
    query: String,
});


module.exports = mongoose.model("contacts", Contact)
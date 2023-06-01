const mongoose = require("mongoose")
const book = mongoose.Schema({
    Name: String,
    Mobile: String,
    email: String,
    Fdate: String,
    Tdate: String,
    Unit: String,
    Requirements: String,
    Order_Delevered: String
});


module.exports = mongoose.model("booking", book)
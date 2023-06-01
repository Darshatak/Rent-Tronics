const mongoose = require("mongoose")
const details = mongoose.Schema({
    brandName: String,
    nav1: String,
    nav2: String,
    nav3: String,
    HeaderDiscription: String,
    HeaderImg: String,
    HeaderImg2: String,
    l1Name: String,
    l1Dissc: String,
    url1: String,
    l2Name: String,
    l2Dissc: String,
    url2: String,
    l3Name: String,
    l3Dissc: String,
    url3: String,
    Address: String,
    Email: String,
    Mobile: String
});


module.exports = mongoose.model("darsh", details)
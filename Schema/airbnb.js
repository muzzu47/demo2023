const mongoose = require("mongoose");

const AirBnbSchema = new mongoose.Schema({
    listing_url:String,
    name:String,
    summary:String,
    space:String,
    description:String,
    meighborhood_overview:String,
    notes:String,
    transti:String,
    access:String
},{collection:"sample_airbnb"})

module.exports = mongoose.model("sample_airbnb",AirBnbSchema);
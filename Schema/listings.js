const mongoose = require("mongoose");

const Listings = new mongoose.Schema({
    listing_url:String,
    name:String,
    summary:String,
    space:String,
    description:String,
    neighborhood_overview:String,
    notes:String,
    transti:String,
    access:String
},{collection:"listingsAndReviews"})

module.exports = mongoose.model("listingsAndReviews",Listings);
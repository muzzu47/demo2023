const mongoose = require("mongoose");

const MoviesSchema = new mongoose.Schema({
    plot:String,
    genres:Array,
    runtime:Number,
    cast:Array,
    num_mflix_comments:Number,
    title:String,
    fullplot:String,
    countries:Array,
    released:Date
},{collection:"movies"})

module.exports = mongoose.model("movies",MoviesSchema);
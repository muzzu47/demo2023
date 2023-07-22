const express = require("express");
const app = express();
// const fork = require("child_process.fork");
// const {fork} = require('child_process');
const cp = require('child_process');
const routes = express.Router();
const AirBnbController = require("./../controllers/airbnbController");
const MoviesController = require("./../controllers/movies")

// routes.get()

routes.get("/", (req, res) => {
    res.send("Alhamdulillah...");
})
routes.get("/coming", (req, res) => {
    res.send("Masha Allah... Good Job!!!!")
});

routes.get("/bnb-records", async (req, res) => {
    console.log("Masha Allah... Good Job!!!!")
    let result = await AirBnbController.getRecords(req, res);
    res.send(result);
});

routes.get("/get-movies", async (req, res) => {
    let result = await MoviesController.getMovies(req, res);
    res.send(result);
})

routes.get("/get-all-movies", async (req, res) => {
    let result = await MoviesController.getAllMovies(req, res);
    res.send(result);
})
routes.get("/get-custom-movies", async (req, res) => {
    try {
        // console.log("Hitting this...",req.query);
        let keys = Object.keys(req.query);
        let values = Object.values(req.query);
        // res.send(`This is coming ${Object.keys(data)} and  ${Object.values(data)}`);
        let result = await MoviesController.getCustomMovies(keys, values);
        res.send(result);
    } catch (error) {
        console.log("Error in the call", error);
        return "undefined";
    }

})

//routing for Child Process testing
routes.get("/test-child",(req,res) => {
    const child = cp.fork("./../controllers/childProcess.js", {silent: true});
    child.send('start');
    console.log("Child message as start sent...")
    child.on('message',(sum) => {
        res.send({sum: sum});
    })
})

routes.post("posting", (req, res) => {
    res.send("Sending the req", req);
})

module.exports = routes;
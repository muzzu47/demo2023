const express = require('express');
const app = express();
// const ejs = require('ejs');
const mongoose = require('mongoose');
const AirBnb = require("./Schema/airbnb");
const Listings = require("./Schema/listings");
const routes = require("./routes/routes.js");
const cluster = require('cluster');
const cors = require('cors');
const bodyParser = require('body-parser');
// const numCpus = require('os').cpus().length;
const numCpus = 2;

app.use(cors());
app.use(bodyParser.json());

// if(cluster.isMaster){
//     console.log(`Master ${process.pid} is running and num workers are ${numCpus}`);

//     for(let i=0;i<numCpus;i++){
//         cluster.fork();
//     }

//     cluster.on('exit',(worker,code,signal) => {
//         console.log(`worker ${worker.process.pid} died`);
//     })
// } else{
//     app.listen(3000,(err,data)=>{
//             // console.log("Connected to Port 3000");
//             console.log(`Worker ${process.pid} started`);
//         })
// }

// mongodb+srv://muzzuwdi:<password>@ipcluster.7xwdrat.mongodb.net/

let url = "mongodb+srv://muzzuwdi:TY1QSXiiGexPCF1H@ipcluster.7xwdrat.mongodb.net/sample_airbnb";
// let url = "mongodb+srv://muzzuwdi:TY1QSXiiGexPCF1H@ipcluster.7xwdrat.mongodb.net/sample_mflix";

app.get("/",(req,res) => {
    res.send("Connection established");
})

app.post("/bnb/:id",async (req,res)=> {
    try{
        console.log("Posting id AirBnb books");
        // if(req.body )
        // console.log("what is in req.body",req.query);
        // console.log("what is in req.body",req.params);
        const result = await AirBnb.find({});
        // console.log("Data from db",result);
        try{
            res.send(JSON.stringify(result));
        }catch (err){
            res.status(500).send(err);
        }

    } catch (err){
        res.status(500).send(`Coming from catch block ${err}`);
    }
})

app.post("/bnb",async (req,res)=> {
    try{
        console.log("Posting AirBnb books");
        // if(req.body )
        // console.log("what is in req.body",req.query);
        // console.log("what is in req.body",req.params);
        // const resultUpdate = await AirBnb.save({"_id": "648f151643f9cf9e17568add","look_id": "10052657","name":"Hana"},{ new: true });
        const result = await AirBnb.find({}).sort({"look_id":-1});
        // console.log("Data from db",result);
        try{
            res.send(JSON.stringify(result));
        }catch (err){
            res.status(500).send(err);
        }

    } catch (err){
        res.status(500).send(`Coming from catch block ${err}`);
    }
})
app.get("/bnb",async (req,res)=> {
    try{
        console.log("Getting AirBnb books");
        // if(req.body )
        // const result = await AirBnb.find({"name":{$in:["10052657","Madiha","Hania"]}});
        // const resultUpdate = await AirBnb.updateOne({"name":"Hannu"},{$set:{"name":"Hani","newField":"test"}});
        const resultUpdate = await AirBnb.save({"name":"Hania","name":"Hannu"});

        const result = await AirBnb.find({});
        // console.log("Data from db",result);
        try{
            res.send(JSON.stringify(result));
        }catch (err){
            res.status(500).send(err);
        }

    } catch (err){
        res.status(500).send(`Coming from catch block ${err}`);
    }
})



app.get("/listings",async (req,res)=> {
    console.log("Getting Listings");
    const result = await Listings.find({});
    console.log("Data from db",result);
    try{
        res.send(JSON.stringify(result));
    }catch (err){
        res.status(500).send(err);
    }
})

/* Tried using .cursor() of mongoose */
app.get("/cursor",async (req,res)=> {
    console.log("Getting Listings");
    // let count = 0;
    res.setHeader("Content-Type","text/html");
    Listings.find({}).cursor.on('data', function(data){
        console.log("streaming data!!!! \n",data.id);
        // count++;
        // res.writeHead(200, {"Content-Type":"text/html"});
        // res.write(JSON.stringify(count + <br/>))
        // res.write(`${count} <br/>`)
        res.write(`${data} <br/>`)
    })
    .on('end', function(){
        // res.send("Data Transfer Completed !!!!");
        res.end("******* Data Transfer Completed *********")
        console.log("streaming data Completed");

    });
    // console.log("Data from db",result);
    // try{
    //     res.send(JSON.stringify(result));
    // }catch (err){
    //     res.status(500).send(err);
    // }
})

app.get("/modified",async (req,res)=> {
    console.log("Getting Listings");
    const result = await Listings.aggregate([{$group : {_id : "$property_type", min_nights : {$push : "$minimum_nights" }}}]);
    console.log("Data from db",result);
    try{
        res.send(JSON.stringify(result));
    }catch (err){
        res.status(500).send(err);
    }
})

app.use('/call',routes);

mongoose.connect(url).then(()=>{
    console.log("Connection to DB successfull...");
}).catch((err)=> {
    console.log("error while connecting to db..",err);
});
// mongoose.connect(url2).then(()=>{
//     console.log("Connection to DB2 successfull...");
// }).catch((err)=> {
//     console.log("error while connecting to db..",err);
// });

app.listen(3000,(err,data)=>{
    console.log("Connected to Port 3000");
})




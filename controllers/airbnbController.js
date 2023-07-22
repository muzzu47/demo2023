const AirBnb = require("./../Schema/airbnb");


const getRecords = async (req,res)=>{
    // return "Coming from getRecords";
    try{
        console.log("Getting AirBnb books");
        // if(req.body )
        // const resultUpdate = await AirBnb.find({"name":{$in:["10052657","Madiha","Hania"]}});
        // const resultUpdate = await AirBnb.updateOne({"name":"Hannu"},{$set:{"name":"Hani","newField":"test"}});
        // const resultUpdate = await AirBnb.save({"name":"Hania","name":"Hannu"});

        const result1 = await AirBnb.find({},{"name":1,"_id":0});
        const result = result1.map(x => x.name);
        // const result = await AirBnb.distinct("name");
        // const result = await AirBnb.aggregate([{$project:{"name":1,"_id":0}}])
        // const result = resultUpdate.forEach()
        // console.log("Data from db",result);
        try{
            res.send(JSON.stringify(result));
        }catch (err){
            res.status(500).send(err);
        }

    } catch (err){
        res.status(500).send(`Coming from catch block ${err}`);
    }
};


module.exports = {getRecords}
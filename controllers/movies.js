const Movies = require("./../Schema/sample_mflix/movies");
const EventEmitter = require('events');
const readStream = require('stream');

const getMovies = async (req,res) => {
    const result = await Movies.find({"title":"Blacksmith Scene"});

    if(result){
        return result;
    } else{
        return "undefined";
    }

}
const getAllMovies = async (req,res) => {
    const result = await Movies.find({});
    console.log("Final Result done",result);

    if(result){
        return result;
    } else{
        return "undefined";
    }

}

const getCustomMovies = async (keys,values) => {
    try{
        // console.log("what is keys",keys,values);
        let testEvent = new EventEmitter();
        testEvent.on('callEvent',(x)=>{
            process.nextTick(()=>{
                console.log("What is x of process.nextTick",x)
            })
        })
        testEvent.on('callEvent',(x)=>{
            setTimeout(()=>{
                console.log("What is x",x)
            },3000)
            setImmediate(()=>{
                console.log("When is this executed")
            },0);

        });

        testEvent.emit('callEvent',callingEvent());
        let query = {};
        query[keys] = values;
        console.log("query is",query);
        const result = await Movies.find(query);
        // console.log("Final Result done",result);
        if(result){
            // console.log("Getting inside result if")
            // testEvent.on('callEvent',()=>{
            //     console.log("What is x")
            // });
            // return 5;
            return result;
        } else{
            return "undefined";
        }

    }catch(err){
        console.log("Error in the call", err.message);
        return "error in the call";
    }

}

function callingEvent(){
    console.log("This is called when event is on");
    return 5;
}

function otherEvent(){
    console.log("This is called when other event");
    return 10;
}
const testEvent = new EventEmitter();

module.exports = {getMovies,getAllMovies,getCustomMovies};
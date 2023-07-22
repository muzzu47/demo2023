

function longComputation() {
    let sum = 0;

    console.log("Started computing..");
    for (i = 0; i < 25; i++) {
        sum += i;
    }

    return sum;
}


process.on('message',(message) => {
    console.log("message as start",message === 'start');
    if(message === 'start'){
        const sum = longComputation();
        process.send(sum);
    }
})
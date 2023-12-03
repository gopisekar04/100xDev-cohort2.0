let counter = 10;

function timer(){
    if(counter == -1){
        process.exit(1);
    }
    console.log(counter)
    counter -=1;    
}

setInterval(timer, 1000);

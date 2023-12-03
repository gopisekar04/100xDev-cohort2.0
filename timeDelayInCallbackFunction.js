let curentTime;

function callBackFunction() {
    let delayedTime = Date.now() - curentTime;
    let delayedTimeInSeconds = (delayedTime - 1000)/1000;

    
    //to log the delay
    console.log(`Time Delay: ${delayedTime/1000} seconds`);
    
    //to log the exact time delay in sec
    console.log(`Time Delay: ${delayedTimeInSeconds} seconds`);    
}

curentTime = Date.now();

setTimeout(callBackFunction, 1000);

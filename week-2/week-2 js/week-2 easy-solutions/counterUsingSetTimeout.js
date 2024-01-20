function displayTime(){
    const currentTime = new Date();
    let hr = currentTime.getHours();
    let min = currentTime.getMinutes();
    let sec = String(currentTime.getSeconds()).padStart(2,'0');
    console.log(`${hr}:${min}:${sec}`);
}        
function callTimer(fn){  
    fn();
    setTimeout(function(){
        callTimer(fn)
    }, 1000);
}

callTimer(displayTime);
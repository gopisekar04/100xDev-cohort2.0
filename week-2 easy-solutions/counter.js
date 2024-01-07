function getTime(){
const currentTime = new Date();
let hr = currentTime.getHours();
let min = currentTime.getMinutes();
let sec = String(currentTime.getSeconds()).padStart(2,0);
console.log(`${hr}:${min}:${sec}`);    
}


setInterval(getTime, 1000);
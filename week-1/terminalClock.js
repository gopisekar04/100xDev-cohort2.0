let currentTime = new Date();//used to get current date time info 
let hour = currentTime.getHours(); //method used to extract the current hour
let minute = currentTime.getMinutes();
let seconds = currentTime.getSeconds();

function updateSeconds() {
    if (seconds === 59) {
        seconds = 0;
        updateMinutes();
    } else {
        seconds += 1;
    }
}

function updateMinutes() {
    if (minute === 59) {
        minute = 0;
        updateHours();
    } else {
        minute += 1;
    }
}

function updateHours() {
    if (hour === 23) {
        hour = 0;
    } else {
        hour += 1;
    }
}

function displayTime() {
    console.log(`${hour}:${minute}:${seconds}`);
}

setInterval(updateSeconds, 1000);
setInterval(displayTime, 1000);


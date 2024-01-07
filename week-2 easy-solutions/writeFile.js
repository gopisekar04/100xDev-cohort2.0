const { log } = require('console');
const fs = require('fs');

function writingToAFile() {
    fs.writeFile('textFile.txt', "this is the data to be written in textFile.txt", (err) => {
        if (err) throw err;
        console.log("file written successfully");
    })
}

writingToAFile();

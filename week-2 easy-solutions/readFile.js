const fs = require('fs');


function promiseExample(){
    return new Promise(function(resolve, reject){
        try{
            fs.readFile("./textFile.txt", "utf-8", function(err, data){
                if(err){
                    reject(err);
                }else{
                    resolve(data);
                }   
            })
        }catch(e){
            reject(e);
        }
    })
}

promiseExample().then(data => {
    console.log(data);
}).catch(error => {
    console.log(error);
});
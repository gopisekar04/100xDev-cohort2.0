const { log } = require('console');
const { read } = require('fs')
const fs = require('fs/promises')


async function cleanFile(){
    try{
        const data = await fs.readFile('./a.txt', 'utf-8');
        

        const cleanedData = data.replace(/\s+/g, ' ');
        
        await fs.writeFile('./a.txt', cleanedData)

        console.log("file cleaned Successfully");        
    }catch(e){
        console.log(e.message)
    }
}

cleanFile()

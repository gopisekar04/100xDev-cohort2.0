/*
 * Write 3 different functions that return promises that resolve after 1, 2, and 3 seconds respectively.
 * Write a function that sequentially calls all 3 of these functions in order.
 * Print out the time it takes to complete the entire operation.
 * Compare it with the results from 3-promise-all.js
 */


function wait1(t1) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Promise resolved after 1sec");
        }, t1*1000);
    })
}

function wait2(t2) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Promise resolved after 2sec");
        }, t2*1000);
    })

}

function wait3(t3) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("promise resolved after 3sec");
        }, t3*1000);
    })

}

async function calculateTime(t1, t2, t3) {
    const start = Date.now();    

    await wait1(t1)

    await wait2(t2)

    await wait3(t3)

    const endTime = Date.now();

    return ( endTime-start);

}


module.exports = calculateTime;


/*
 * Write 3 different functions that return promises that resolve after 1, 2, and 3 seconds respectively.
 * Write a function that uses the 3 functions to wait for all 3 promises to resolve using Promise.all,
 * Print how long it took for all 3 promises to resolve.
 */


function waitOneSecond(t1) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, t1*1000);
    });
}

function waitTwoSecond(t2) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, t2*1000);
    });
}

function waitThreeSecond(t3) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, t3*1000);
    });
}

function calculateTime(t1, t2, t3) {
    return new Promise(async (resolve) => {
        const start = Date.now();

        await Promise.all([
            waitOneSecond(t1),
            waitTwoSecond(t2),
            waitThreeSecond(t3),
        ]);

        const end = Date.now();
        const duration = end - start;
        

        resolve(duration);
    });
}



module.exports = calculateTime;

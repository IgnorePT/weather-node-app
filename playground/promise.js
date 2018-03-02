var asyncAdd = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(typeof a === 'number' && typeof b === 'number'){
                resolve(a + b);
            } else {
                reject('Arguments must be numbers');
            }
        },1500);
    });
};

asyncAdd(7,5).then((message)=> {
    console.log('Result: ', message);
    return asyncAdd(message, 35);
}).then((res) => {
    console.log('Result: ', res);
}).catch((errorMessage) => {
    console.log(errorMessage);
})

// var somePrimise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve('Hey. It worked');
//         //reject('Unable to fulfill promise!');
//     },2500);
// });

// somePrimise.then((message) => {
//     console.log('Success: ', message);
// }, (errorMessage) => {
//     console.log('Error: ', errorMessage);
// })
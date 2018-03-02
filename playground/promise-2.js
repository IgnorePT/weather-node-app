const request = require('request');

var geocodeAddress = (address) => {

    return new Promise((resolve, reject) => {

    var addressForRequest = encodeURIComponent(address);

        request({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${addressForRequest}`,
            json: true
        }, (error, response, body) => {
            if(error){
                reject('Unable to connect to Google Servers');
            } else if(body.status === "ZERO_RESULTS"){
                reject('Unable to find that address');
            
            } else if(response.statusCode === 200 && body.status === "OK"){
                resolve({
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng
                });
            } else {
                reject("Error Undefined");
            }
            
        });

    });
};

geocodeAddress('19146').then((location) => {
    console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
    console.log(errorMessage);
});
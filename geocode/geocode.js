
const request = require('request');

var geocodeAddress = (address, callback) =>{

    var addressForRequest = encodeURIComponent(address);

    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${addressForRequest}`,
        json: true
    }, (error, response, body) => {
        if(error){
            callback('Unable to connect to Google Servers');
        } else if(body.status === "ZERO_RESULTS"){
            callback('Unable to find that address');
        
        } else if(response.statusCode === 200 && body.status === "OK"){
            callback(undefined, {
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            });
        } else {
            console.log("Error Undefined");
            console.log(body);
        }
        
    });

}

module.exports = {
    geocodeAddress
}
// b665ba40387dcc6dc3e4bb8db3b12190
// https://api.darksky.net/forecast/[key]/[latitude],[longitude]
//https://api.darksky.net/forecast/b665ba40387dcc6dc3e4bb8db3b12190/38.725058,-9.2491676

const request = require('request');

var getWeather = (lat, lng, callback) => {

    request({
        url: `https://api.darksky.net/forecast/b665ba40387dcc6dc3e4bb8db3b12190/${lat},${lng}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to Forecast.IO server.');
        } else if (!error && response.statusCode === 200) {
            callback(undefined,{
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            });
        } else {
            callback('Unable to fetch wheather.');
        }

    })


}

module.exports.getWeather = getWeather;

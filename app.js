const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weater');

const argv = yargs
    .options({
        a: {
            alias: 'address',
            describe: 'Address to fetch weather',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

geocode.geocodeAddress(argv.a, (errorMessage, results) => {
     if (errorMessage) {
         console.log(errorMessage);
     } else {
         console.log(results.address);
         weather.getWeather(results.latitude, results.longitude, (errorMessage, weaterResults) => {
            if(errorMessage){
                console.log(errorMessage);
            } else {
                console.log(`The temperature is ${weaterResults.temperature}. It feels like ${weaterResults.apparentTemperature}`)
            }
        });
     }
 });



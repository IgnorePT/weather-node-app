const express = require('express');
const yargs = require('yargs');
const axios = require('axios');
const hbs = require('hbs');

var address;

const port = process.env.PORT || 2000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');

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

console.log(argv.address);
if(argv.address == null || argv.address == "" || argv.address == 'undefined'){
    address = "Porto,Portugal";
} else {
    address = argv.address;
}

//Middleware
app.use((req,res,next) =>{
    res.render('maintenance.hbs');
});

var addressForRequest = encodeURIComponent(address);

var geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${addressForRequest}`;

axios.get(geocodeURL).then((response) => {
    if(response.data.status === 'ZERO_RESULTS'){
        throw new Error('Unable to find that address');
    }

    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;
    var weaterURL = `https://api.darksky.net/forecast/b665ba40387dcc6dc3e4bb8db3b12190/${lat},${lng}`;
    
    console.log(response.data.results[0].formatted_address);
    return axios.get(weaterURL);

}).then((response) => {
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;

    console.log(`It's currently ${temperature} and it feels like ${apparentTemperature}`);

}).catch((e) => {

    if(e.code === 'ENOTFOUND'){
        console.log('Unable to connect API servers');
    } else {
        console.log(e.message);
    }
  
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

const yargs = require('yargs');
const axios = require('axios');



var argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }

  })
.help()
.alias('help', 'h')
.argv;

var googleAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${googleAddress}&key=AIzaSyB9iPM7PglpYSJFS1HhjC2jmzNaerKfp6M`;

axios.get(geocodeUrl).then((response) => {
  //console.log(response.data.status);
  if (response.data.status === 'ZERO_RESULTS') {
    throw new Error('Unable to find that address.');
  }
    //console.log(response.data);
    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;
    var weatherUrl = `https://api.darksky.net/forecast/6f6cad3996db6b62a78de1e93a631f8d/${lat},${lng}?units=auto&lang=nl`;
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherUrl);
}).then((response) => {
    var temp = response.data.currently.temperature;
    var appTemp = response.data.currently.apparentTemperature;
    console.log(`It's currecntly ${temp} but feels like ${appTemp}`);
}).catch((e) => {
  if (e.code === 'ENOTFOUND') {
    console.log('Unable to connect to API servers.');
  } else {
    console.log(e.message);
  }
})

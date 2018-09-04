
const request = require('request');

var geocodeAddress = (address, callback) => {

  var googleAddress = encodeURIComponent(address);

  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${googleAddress}&key=AIzaSyB9iPM7PglpYSJFS1HhjC2jmzNaerKfp6M`,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to Google servers');
    } else if (body.status === "ZERO_RESULTS") {
      callback('No results found, address unknown?');
    } else if (body.status === "OK") {
      callback(undefined, {
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng,
      });
    }
  });
};

module.exports = {
  geocodeAddress,
};

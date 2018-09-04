const request = require('request');

var getWeather = (lat, lng, callback) => {
  request({
    url: `https://api.darksky.net/forecast/6f6cad3996db6b62a78de1e93a631f8d/${lat},${lng}?units=auto&lang=nl`,
    json: true
    }, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        callback(undefined, {
          temperature: body.currently.temperature,
          apparentTemperature: body.currently.apparentTemperature
        });
      } else {
        callback (`Unable to fetch weather.`);
      }
    }
  );
};

module.exports = {
  getWeather,
}

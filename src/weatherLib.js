const request = require('request');
const { requestOfGeoCode, requestOfForecast } = require('./utils');

const getForecastDetails = ({ location, longitude, latitude }, callback) => {
  const key = '893cb995b21d1bdf5c5bd0a05207792a';
  let url = 'https://api.darksky.net/forecast/';
  url = `${url}${key}/${latitude},${longitude}?units=si`;
  request({ url, json: true }, requestOfForecast(callback, location));
};

const geoCode = (address, callback) => {
  let accessToken = 'pk.eyJ1Ijoic2hpdmlyYWoiLCJhIjoiY2s0bnoxM2';
  accessToken += 'JjMDY0aTNldDI5Y2V1MmF4cCJ9.q-znG-rhQtGtuV5uhg7WMg';
  address = encodeURIComponent(address);
  let url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
  url += `${address}.json?access_token=${accessToken}`;
  request({ url, json: true }, requestOfGeoCode(callback));
};

module.exports = { geoCode, getForecastDetails };

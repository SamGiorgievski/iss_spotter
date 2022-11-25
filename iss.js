/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const request = require('request');

const fetchMyIP = function(callback) {
  request("https://api.ipify.org?format=json", (error, response, body) => {

    if (error) {
      return callback(error, null);
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      return callback(Error(msg), null);
    }

    const ip = JSON.parse(body).ip;

    return callback(null, ip);

  });
};


const fetchCoordsByIP = function(ip, callback) {
  request("http://ipwho.is/" + ip, (error, response, body) => {
 
  if (error) {
    return callback(error, null);
  }

  bodyParse = JSON.parse(body);

    if (bodyParse.success === false) {
      const message = `Success status is: ${bodyParse.success}`;
      return callback(message, null);
    }

    coordinates = {};
    coordinates.latitude = bodyParse.latitude;
    coordinates.longitude = bodyParse.longitude;
  
  return callback(null, coordinates);
})
};



module.exports = { fetchMyIP, fetchCoordsByIP };
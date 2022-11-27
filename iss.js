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

//`https://iss-flyover.herokuapp.com/json/?lat=${lat}&lon=${lon}`

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
 const fetchISSFlyOverTimes = function(coords, callback) {
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;
  
  request(url, (error, response, body) => { 
    
  if (error) {
      return callback(error, null);
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }

    const info = JSON.parse(body).response;

    return callback(null, info);

  }); 
  
};


module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };
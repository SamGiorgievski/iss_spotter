
const { fetchMyIP, fetchCoordsByIP } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  console.log('It worked! Returned IP:', ip);
});

fetchCoordsByIP("142.181.52.242", (error, data) => {
  
  if (error) {
    console.log(error);
  }
  
  console.log(data);
})
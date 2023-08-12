const request = require("request");

const geocode = (url_latlong, callback) => {
  request(url_latlong, (error, response) => {
    const data = JSON.parse(response.body);
    if (data.error) {
      console.log("Unable to fetch coordinates");
      const error = "Unable to fetch coordinates to the entered location";
      callback("", error);
    } else {
        if(data.features.length !== 0){
            callback(data, "");
        }else {
            const error = "Unable to fetch coordinates to the entered location";
            callback("", error);
        }      
    }
  });
};

module.exports = geocode;

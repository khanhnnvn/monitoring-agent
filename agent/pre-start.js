var http = require('request-promise');
var lds = require('./linux-dash-service-api'); 

module.exports = function (userAccessKey) {

  // If user access key is not set, exit
  if (!userAccessKey) {
    logAndKill("User Access Key not provided.")
   }

  // Verify User Access Key with LDS
  lds
    .verifyUserAccessKey(userAccessKey)
    .then(lds.register);
      // Setup LDS Phone Home Interval

};
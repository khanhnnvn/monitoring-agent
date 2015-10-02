var http = require('request-promise');
var lds  = require('./linux-dash-service-api');

module.exports = function (userAccessKey) {

  // If user access key is not set, exit
  if (!userAccessKey) {
    logAndKill("User Access Key not provided.")
   }

  return lds
    .verifyUserAccessKey(userAccessKey) // Verify User Access Key with LDS
    .then(lds.register) // Register server with LDS
    .then(lds.setupCheckinInterval); // Setup LDS Phone Home Interval

};
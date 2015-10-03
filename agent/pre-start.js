var lds        = require('./linux-dash-service-api');
var logAndKill = require('./log-and-kill');

module.exports = function (userAccessKey) {

  // If user access key is not set, exit
  if (!userAccessKey) {
    logAndKill("User Access Key not provided.")
   }

  return lds
  	.pingServer()
    .verifyUserAccessKey(userAccessKey) // Verify User Access Key with LDS
    .then(lds.register) // Register server with LDS
    .then(lds.setupCheckinInterval); // Setup LDS Phone Home Interval

};
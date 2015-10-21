"use strict";

var lds        = require('./linux-dash-service-api');
var logAndKill = require('./log-and-kill');

module.exports = function (userAccessKey) {

  // If user access key is not set, exit
  if (!userAccessKey) {
    logAndKill("User Access Key not provided.")
  }

  return lds
  	
    .verifyServiceIsUp()
    
    .verifyUserAccessKey(userAccessKey)
    
    .then(lds.register)
    
    .then(lds.setupCheckinInterval);

};
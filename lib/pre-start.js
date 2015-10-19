"use strict";

var lds        = require('./linux-dash-service-api');
var logAndKill = require('./log-and-kill');

module.exports = function (userAccessKey, serverId) {

  // If user access key is not set, exit
  if (!userAccessKey) {
    logAndKill("User Access Key not provided.")
  }

  if (!serverId) {
  	logAndKill("Linux Dash could not find this server's unique ID.");
  }

  return lds
  	.pingServer()
    .verifyServerId(serverId)
    .verifyUserAccessKey(userAccessKey) // Verify User Access Key with LDS
    .then(lds.register) // Register server with LDS
    .then(lds.setupCheckinInterval); // Setup LDS Phone Home Interval

};
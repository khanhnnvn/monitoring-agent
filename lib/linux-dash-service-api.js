"use strict";

var settings   = require('../config');
var apiBaseUrl = settings.LDS_API_URL;
var logAndKill = require('./log-and-kill');
var http       = require('axios');
var os         = require("os");

var ldsCache = {};

function getPublicIp() {
  return http.get('https://api.ipify.org?format=json').then(function (res) {
    return res.ip;
  });
}

function phoneHome() {
  
  var url = apiBaseUrl 
    + 'users/' + ldsCache.userAccessKey 
    + '/servers';

  var ramUtilization = parseInt((os.freemem() / os.totalmem()) * 100);
  var cpuUtilization = parseInt((os.loadavg()[0] * 100));

  var options = {
    url: url,
    method: 'PUT',
    json: true,
    data: {
      cpu_utilization: cpuUtilization,
      ram_utilization: ramUtilization,
      uptime: parseInt(os.uptime(), 10),
    }
  };

  console.log("Making call to LDS", new Date());
  
  return http(options).catch(function (err) {

    console.error("Error occurred while checking in with Linux Dash Service.");
    console.error(err.message);

  });

}

function getAndCatch(url, catchLogMessage) {

  return http.get(url).catch(function () {
    logAndKill(catchLogMessage);
  });

}

var ldsAPI = {
  
  _setCacheKey: function (key, value) {
    ldsCache[key] = value;
  },

  verifyServiceIsUp: function () {

    console.log("Verifying if Linux Dash Service is up.");
    
    getAndCatch(apiBaseUrl+'ping', "Could not reach Linux Dash API.");

    return this;
  },

  verifyUserAccessKey: function (userAccessKey) {
   
    console.log("Verifying User Access Key with LDS.");
    this._setCacheKey('userAccessKey', userAccessKey);

    var url = apiBaseUrl + 'users/' + ldsCache.userAccessKey + '/verify';

    return getAndCatch(url, "User Access Key is invalid.");

  },

  register: function () {

    var options = {
      url: apiBaseUrl + 'users/' + ldsCache.userAccessKey + '/servers',
      method: 'POST',
      json: true,
      data: {
        hostname: os.hostname(),
      }
    };

    return http(options).catch(function (err) {
      logAndKill(err);
    });

  },

  setupCheckinInterval: function () {
    setInterval(phoneHome, settings.ET_INTERVAL);
  },

  deregister: function () {
    var url = apiBaseUrl 
      + 'users/' + ldsCache.userAccessKey 
      + '/servers/';

    var options = {
      url: url,
      method: 'DELETE',
    };

    return http(options);
  }

};

module.exports = ldsAPI; 
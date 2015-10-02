var apiBaseUrl = 'http://localhost:3000/';
var logAndKill = require('./log-and-kill');
var http = require('request-promise');
var getIP = require('external-ip')();
var os = require("os");

var cachedUserAccessKey;

function getPublicIp() {
  return http('https://api.ipify.org?format=json').then(function (res) {
    return res.ip;
  });
}

module.exports = {
  
  _setAccessKey: function (key) {
    cachedUserAccessKey = key;
  },

  verifyUserAccessKey: function (userAccessKey) {
   

   this._setAccessKey(userAccessKey);

    var url = apiBaseUrl + 'users/' + cachedUserAccessKey + '/verify';

    return http(url).catch(function (err) {

      logAndKill("User Access Key is invalid.");

    });

  },

  register: function () {

    var options = {
      uri: apiBaseUrl + 'users/' + cachedUserAccessKey + '/servers',
      method: 'POST',
      json: true,
      body: {
        hostname: os.hostname(),
      }
    };

    return http(options).then(function (registrationResponse) {
      
      process.env["LINUX_DASH_SEVER_ID"] = registrationResponse.server_id;

    }).catch(function (err) {

      logAndKill(err.message);

    });

  },

};
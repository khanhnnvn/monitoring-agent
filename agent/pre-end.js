"use strict";

var lds  = require('./linux-dash-service-api');

module.exports = function (userAccessKey) {

	return lds.deregister(userAccessKey).then(function () {
	    process.exit();
	}).catch(function () {
		console.error("Cleanup unsuccessful:");
		console.error("Could not deregister from Linux Dash service.");
		process.exit();
	});

};
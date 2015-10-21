"use strict";

var lds  = require('./linux-dash-service-api');

module.exports = function () {

	return lds.deregister().then(function () {
		console.log("Linux Dash successfully stopped.");
		process.exit();
	}).catch(function (err) {
		console.error("Cleanup unsuccessful:");
		console.error("Could not deregister from Linux Dash service.");
		process.exit();
	});

};
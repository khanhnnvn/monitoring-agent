"use strict";

module.exports = function (msg) {
  console.error("Linux Dash Monitoring Agent:", msg);
  process.exit();
};
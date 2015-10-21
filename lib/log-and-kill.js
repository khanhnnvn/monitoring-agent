"use strict";

module.exports = function (msg) {
  console.error("Unexpected Failure:", msg);
  process.exit();
};
var express  = require('express');
var app      = express();
var spawn    = require('child_process').spawn;
var fs       = require('fs');
var http     = require('request-promise');
var settings = JSON.parse(fs.readFileSync('../config.json', 'utf8'));
var preStart = require('./pre-start');
var preEnd   = require('./pre-end');

/**
 * Monitoring Agent is always called with
 * user access key. ALWAYS.
 */
var args = require('minimist')(process.argv.slice(2));

/**
 * Before starting monitoring agent,
 * run validation & initialization steps
 */
preStart(args['user-access-key']);

/**
 * Listen for websocket calls from LD Service
 */
app.get('/server/', function (req, res) {

  var shellFile = __dirname + '/modules/shell_files/' + req.query.module + '.sh';

  if (req.query.module.indexOf('.') > -1 || !req.query.module || !fs.existsSync(shellFile)) {
    res.sendStatus(406);
    return;
  }

  var command = spawn(shellFile, [ req.query.color || '' ]);
  var output  = [];

  command.stdout.on('data', function (chunk) {
    output.push(chunk);
  });

  command.on('close', function (code) {
    if (code === 0) {
      res.send(output.toString());
    } else {
      res.sendStatus(500);
    }
  });

});

/**
 * Start Linux Dash Monitoring Agent
 */
var server = app.listen(settings.PORT, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Linux Dash Monitoring Agent started @ http://%s:%s', host, port);
});

/**
 * Process exit event handlers 
 * to call preEnd routine
 */
process.on('exit', preEnd.bind(null, args['user-access-key']));
process.on('SIGINT', preEnd.bind(null, args['user-access-key']));
process.on('uncaughtException', preEnd.bind(null, args['user-access-key']));
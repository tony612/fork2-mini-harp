#!/usr/bin/env node

var createMiniHarp = require("../index");

var app = createMiniHarp();

var argv = require('minimist')(process.argv.slice(2));

port = argv.port || 4000;
console.log("Starting mini-harp on http://localhost:" + port);
app.listen(port);

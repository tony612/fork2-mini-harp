#!/usr/bin/env node

var miniHarp = require("../index");

var argv = require('minimist')(process.argv.slice(2));

var root = argv._[0]  || process.cwd();
var app = miniHarp(root);

port = argv.port || 4000;
console.log("Starting mini-harp on http://localhost:" + port);
app.listen(port);

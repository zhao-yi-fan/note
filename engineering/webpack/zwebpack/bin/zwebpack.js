#! /usr/bin/env node
const path = require('path');
const Compiler = require('../lib/Compiler.js');
const config = require(path.resolve('webpack.config.js'));
const compiler = new Compiler(config)
compiler.hooks.entryOption.call();
compiler.run();
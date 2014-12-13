var _ = require('underscore');

var globals = {
  __basedir: __dirname + '/'
};


global.__basedir = globals.__basedir;

module.exports = globals;


'use strict';

const internals = {};

exports.register = (server, options, next) => {
  server.register(
    [
      require('./plugins/database-csa.js'),
      require('./plugins/auth-cookie.js'),
      require('./plugins/static.js'),
      require('./plugins/web.js'),
    ],
    (err) => {
      if (err) return next(err);
      return next();
    }
  );
};

exports.register.attributes = {
  pkg: require('./package.json'),
};

exports.options = internals.options = {

};

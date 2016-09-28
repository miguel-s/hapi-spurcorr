'use strict';

const internals = {};

exports.register = (server, options, next) => {
  server.dependency(['vision', 'SpurcorrAuthCookie'], internals.after);
  return next();
};

exports.register.attributes = {
  name: 'SpurcorrWeb',
};

internals.after = (server, next) => {
  server.views({
    engines: {
      pug: {
        module: require('pug'),
        isCached: process.env.NODE_ENV === 'production',
      },
    },
    relativeTo: __dirname,
    path: '../views',
  });

  server.route([
    {
      method: 'GET',
      path: '/',
      config: {
        description: 'Returns the index page',
        auth: { strategy: 'spurcorr-session', mode: 'try' },
        plugins: { 'hapi-auth-cookie': { redirectTo: '/login' } },
        handler: {
          view: {
            template: 'index',
          },
        },
      },
    },
    {
      method: 'GET',
      path: '/login',
      config: {
        description: 'Returns a login form',
        auth: { strategy: 'spurcorr-session', mode: 'try' },
        plugins: { 'hapi-auth-cookie': { redirectTo: false } },
        handler: {
          view: {
            template: 'login',
          },
        },
      },
    },
  ]);

  return next();
};

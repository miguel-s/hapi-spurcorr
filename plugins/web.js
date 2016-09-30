'use strict';

const Joi = require('joi');

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
    // authentication routes
    {
      method: 'GET',
      path: '/login',
      config: {
        description: 'Returns a login form',
        auth: { strategy: 'spurcorr-session', mode: 'try' },
        plugins: { 'hapi-auth-cookie': { redirectTo: false } },
        handler: require('../controllers/login.js'),
      },
    },
    {
      method: 'POST',
      path: '/login',
      config: {
        description: 'Returns a login form',
        auth: { strategy: 'spurcorr-session', mode: 'try' },
        plugins: { 'hapi-auth-cookie': { redirectTo: false } },
        validate: {
          payload: require('../models/user.js'),
          failAction: require('../controllers/login.js'),
        },
        handler: require('../controllers/login.js'),
      },
    },
    {
      method: 'GET',
      path: '/logout',
      config: {
        description: 'Logout user',
        handler: require('../controllers/logout.js'),
      },
    },
    {
      method: 'GET',
      path: '/signup',
      config: {
        description: 'Returns a sinup form',
        auth: { strategy: 'spurcorr-session', mode: 'try' },
        plugins: { 'hapi-auth-cookie': { redirectTo: false } },
        handler: require('../controllers/signup.js'),
      },
    },
    {
      method: 'POST',
      path: '/signup',
      config: {
        description: 'Returns a sinup form',
        auth: { strategy: 'spurcorr-session', mode: 'try' },
        plugins: { 'hapi-auth-cookie': { redirectTo: false } },
        validate: {
          payload: require('../models/user.js'),
          failAction: require('../controllers/signup.js'),
        },
        handler: require('../controllers/signup.js'),
      },
    },

    // web routes
    {
      method: 'GET',
      path: '/',
      config: {
        description: 'Returns the index page',
        auth: { strategy: 'spurcorr-session', mode: 'try' },
        plugins: { 'hapi-auth-cookie': { redirectTo: '/login' } },
        handler: require('../controllers/index.js'),
      },
    },
    {
      method: 'GET',
      path: '/map',
      config: {
        description: 'Returns the map page',
        auth: { strategy: 'spurcorr-session', mode: 'try' },
        plugins: { 'hapi-auth-cookie': { redirectTo: '/login' } },
        handler: require('../controllers/map.js'),
      },
    },
    {
      method: 'GET',
      path: '/list',
      config: {
        description: 'Returns the list page',
        auth: { strategy: 'spurcorr-session', mode: 'try' },
        plugins: { 'hapi-auth-cookie': { redirectTo: '/login' } },
        validate: {
          query: {
            page: Joi.number().integer().default(1).optional(),
          },
        },
        handler: require('../controllers/list.js'),
      },
    },
  ]);

  return next();
};

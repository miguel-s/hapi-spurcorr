'use strict';

const Boom = require('boom');

module.exports = function handler(request, reply) {
  const sql = request.server.app.minsaitdb;

  const pPages = new sql.Request()
    .query('SELECT COUNT(1) AS [pages] FROM [ibc_zcc].[DM_OPORTUNIDADES]');
  const pVenues = new sql.Request()
    .query(`SELECT TOP ${request.query.page * 20} * FROM [ibc_zcc].[DM_OPORTUNIDADES]`);

  Promise.all([pPages, pVenues])
  .then(values => reply.view('list', {
    path: request.path,
    page: request.query.page,
    pages: Math.ceil(values[0][0].pages / 20),
    headers: Object.keys(values[1][0]),
    data: values[1],
  }))
  .catch(err => reply.view('list', {
    path: request.path,
    error: err,
  }));
};

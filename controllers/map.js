'use strict';

module.exports = function handler(request, reply) {
  request.server.app.minsaitdb.query`
    SELECT *
    FROM (
      SELECT  [CD_PDV] AS [id],
              [SEGMENTO] AS [segment],
              [LAT] AS [lat],
              [LONG] AS [lon]
      FROM [ibc_zcc].[V_DM_CAMARA_COMERCIO_CORRELACIONES]
      GROUP BY  [CD_PDV],
                [SEGMENTO],
                [LAT],
                [LONG]) AS A
    LEFT JOIN (
      SELECT DISTINCT [CD_PDV] AS [id]
      FROM [ibc_zcc].[DM_OPORTUNIDADES]) AS B
    ON A.[id] = B.[id]
    WHERE B.[id] IS NOT NULL`
  .then(rows => reply.view('map', {
    path: request.path,
    data: rows,
  }))
  .catch(err => reply.view('map', {
    path: request.path,
    error: err,
  }));
};

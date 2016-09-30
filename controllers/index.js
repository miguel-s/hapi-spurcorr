'use strict';

module.exports = function handler(request, reply) {
  return reply.view('index', {
    path: request.path,
  });
};

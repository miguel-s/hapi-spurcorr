'use strict';

module.exports = function handler(request, reply) {
  request.cookieAuthSpurcorr.clear();

  return reply.redirect('/');
};

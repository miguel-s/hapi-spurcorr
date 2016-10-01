'use strict';

$(document).on('shown.bs.tab', () => {
  $(document).trigger('redraw.bs.charts');
});

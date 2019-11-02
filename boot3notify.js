/*
 *
 * boot3notify.js
 * version 0.2.4
 *
 * Plugin for notification messages for Bootstrap 3.X
 *
 * requires: jQuery
 *
 * author:   Caleb Nance
 * date:     04/05/2014
 * modified: 03/02/2015
 *
 * usage
 * $.fn.boot4notify({ msg: 'Red Wine, Success!'});
 * $.fn.boot4notify({ msg: 'Something is not right with me!', alertClass: 'danger'});
 *
 * params much defaults: (so hip)
 *
 * msg: (the only required param),
 *
 * extended params: (much wow)
 *
 * alertClass:	success|info|warning|danger,
 * clrBefore:		true|false,
 * queueLimit:	numeric,
 * effectIn: 		fadeIn|slideDown|show
 * effectOut:   fadeOut|slideUp|hide
 * transIn:   	(miliseconds)
 * transOut:   	(miliseconds)
 *
 */
(function($) {
  $.fn.boot3notify = function(options) {
    // establish our default settings
    var settings = $.extend(
      {
        msg: "",
        alertClass: "success",
        clrBefore: false,
        queueLimit: 5,
        effectIn: "slideDown",
        effectOut: "slideUp",
        transIn: 400,
        transOut: 400,
        timeoutMili: 4000,
        css: ""
      },
      options
    );

    // times var
    var b3nto;

    // is there a message to display
    if (!settings.msg) {
      console.log("No Message Set To Display");

      return false;
    }

    // build button
    var closeBtn =
      '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>';

    // Is the element already on the page?
    if ($("#boot3notify").length) {
      // clear html and go
      $("#boot3notify").html(closeBtn + settings.msg);
    } else {
      // new element to body and then go
      $("body").append(
        '<div id="boot3notify" class="alert alert-' +
          settings.alertClass +
          ' alert-dismissable" style="position: fixed; right: 16px; top: 16px">' +
          closeBtn +
          " " +
          settings.msg +
          "</div>"
      );
    }

    // transition in
    $("#boot3notify")[settings.effectIn](settings.transIn);

    // timeout
    clearInterval(b3nto);

    b3nto = setInterval(function() {
      // transition out
      $("#boot3notify")[settings.effectOut](settings.transOut);

      // clear timeout
      clearInterval(b3nto);
    }, settings.timeoutMili);
  };
})(jQuery);

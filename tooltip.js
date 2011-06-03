
(function($){
  $.fn.tooltip = function(text) {
    return this.each(
      function() {
        $.hideTooltips();

        var tooltip = $("<div class='tooltip'></div>").appendTo("body");

        tooltip
          .hide()
          .text(text)
          .css("max-width", "180px")
          .css("font", "14px Arial")
          .css("position", "absolute")
          .css("padding", "10px 15px")
          .css("font-weight", "bold")
          .css("background-color", "#fff")
          .css("color", "#820000")
          .css("-webkit-border-radius", "5px")
          .css("-moz-border-radius", "5px")
          .css("border-radius", "5px");

        var x = $(this).offset().left + $(this).outerWidth() / 2;
        x -= tooltip.outerWidth() / 2;

        var y = $(this).offset().top - tooltip.outerHeight() / 2 - 25;

        if(y < 0)
          y = $(this).offset().top + $(this).outerHeight() + 10;

        tooltip.css("left", x).css("top", y).css("opacity", 0.9).fadeIn("fast");
      }
    );
  }

  $.hideTooltips = function() {
    $(".tooltip").fadeOut("fast", function() { $(this).remove(); });
  }
})(jQuery);


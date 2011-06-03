
function Dealer(){
  this.hand = [];

  this.hit = function(){
    return this.hand.length < 3;
  }

  this.fly = function(card) {
    var self = this;

    var handSize = self.hand.length;

    $(document).queue(function() {
      var doc = this;

      $("<img src='images/Playing_card_" + card + ".png' class='card' />")
        .appendTo("body")
        .css("position", "absolute")
        .css("left", $("#stack").offset().left)
        .css("top", $("#stack").offset().top)
        .animate({ left: $("#dealer").offset().left + handSize * 20, top: $("#dealer").offset().top }, 300, function() {
          $(doc).dequeue();
      });
    });
  }
}

Dealer.prototype = new Player();



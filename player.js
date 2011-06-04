
function Player(){
  this.hand = [];

  this.playerDiv = $("<div class='player'></div>");

  this.playerDiv[0].player = this;

  $("#players").append(this.playerDiv);

  this.getHand = function(){
    return this.hand;
  }

  this.clearHand = function() {
    this.hand = [];
  }

  this.getPlayerDiv = function() {
    return this.playerDiv;
  }

  this.receiveCard = function(card){
    this.hand.push(card);

    this.fly(card);
  }

  this.hit = function(){
    return this.hand.length < 3;
  }

  // fancy animations

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
        .animate({ left: self.getPlayerDiv().offset().left + handSize * 20, top: self.getPlayerDiv().offset().top }, 300, function() {
          $(this).remove();
          $(doc).dequeue();

          $("<img src='images/Playing_card_" + card + ".png' class='card' />")
            .appendTo(self.getPlayerDiv())
            .css("position", "absolute")
            .css("margin-left", handSize * 20);
      });
    });
  }
}



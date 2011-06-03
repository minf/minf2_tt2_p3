
function Player(){
  this.hand = [];

  this.dom = $("<div class='player'></div>").appendTo("#players");

  this.getHand = function(){
    return this.hand;
  }

  this.clearHand = function() {
    this.hand = [];
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
        .animate({ left: $(self.dom).offset().left + handSize * 20, top: $(self.dom).offset().top }, 300, function() {
          $(doc).dequeue();
      });
    });
  }

  this.receiveCard = function(card){
    this.hand.push(card);

    this.fly(card);
  }

  this.hit = function(){
    return this.hand.length < 3;
  }
}



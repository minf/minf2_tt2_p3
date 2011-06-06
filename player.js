
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
    this.fly(card);
    this.hand.push(card);
  }

  this.hit = function(){
    var willHit = this.hand.length < 3;
    this.hitNotify(willHit);
    return willHit;
  }

  this.hitNotify = function(hit){
    if(Game.trainingMode) return;

    var self = this;

    $(document).queue(function(){
      var doc = this;

      $("<div class='notify'>" + (hit?"hit":"stick") + "</div>")
        .appendTo(self.getPlayerDiv())
        .fadeIn(200)
        .delay(300)
        .fadeOut(100, function(){
          $(this).remove();
          $(doc).dequeue();
        });
    });
  }

  // fancy animations
  this.fly = function(card) {
    var self = this;

    var handSize = self.hand.length;

    if(Game.trainingMode){
      $("<img src='images/Playing_card_" + card + ".png' class='card' />")
              .appendTo(self.getPlayerDiv())
              .css("position", "absolute")
              .css("margin-left", handSize * 20);
    }else{
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
}



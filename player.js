
function Player(){
  this.hand = [];

  this.playerDiv = $("<div class='player'></div>");

  this.playerDiv[0].player = this;

  $("#players").append(this.playerDiv);

  this.handValue = function(){
    var aces = 0, sum = 0;
    $.each(this.hand, function(){
      var value = this.split('_')[1];
      var nValue = parseInt(value, 10);
      if(isNaN(nValue)){
        switch(value){
          case 'J':
          case 'Q':
          case 'K':
            sum += 10;
            break;
          case 'A':
            aces++;
            break;
          default:
            alert("this shouldn't happen");
            break;
        }
      } else {
        sum += nValue;
      }
    });

    while(aces > 0){
      if(sum + aces*11 <= 21)
        return sum + aces*11;
      aces--;
      sum += 1;
    }
    return sum;
  }

  this.winner = function() {
    this.getPlayerDiv().css("background-color", "#156400");
  }

  this.loser = function() {
    this.getPlayerDiv().css("background-color", "#a40000");
  }

  this.getHand = function(){
    return this.hand;
  }

  this.clearHand = function() {
    this.hand = [];
  }

  this.getPlayerDiv = function() {
    return this.playerDiv;
  }

  this.receiveCard = function(card, callback) {
    this.fly(card, callback);
  }

  this.hit = function(callbackHit, callbackStick) {
    var willHit = this.handValue() < 17;

    this.hitNotify(willHit, callbackHit, callbackStick);

    return willHit;
  }

  this.active = function() {
    $(".player").removeClass("active");
    this.getPlayerDiv().addClass("active");
  }

  this.hitNotify = function(hit, callbackHit, callbackStick) {
    var self = this;

    self.active();

    $("<div class='notify'>" + (hit?"hit":"stick") + "</div>")
      .appendTo(self.getPlayerDiv())
      .fadeIn(100 * Game.speed)
      .delay(300 * Game.speed)
      .fadeOut(100 * Game.speed, function(){
        $(this).remove();

        self.getPlayerDiv().attr("title", self.handValue());

        if(callbackHit && hit)
          callbackHit();
        else if(callbackStick)
          callbackStick();
      });
  }

  this.fly = function(card, callback) {
    var self = this;

    var handSize = self.hand.length;

    self.active();

    $("<img src='images/Playing_card_" + card + ".png' class='card' />")
      .appendTo("body")
      .css("position", "absolute")
      .css("left", $("#stack").offset().left)
      .css("top", $("#stack").offset().top)
      .animate({ left: self.getPlayerDiv().offset().left + handSize * 20, top: self.getPlayerDiv().offset().top }, 300 * Game.speed, function() {
        $(this).remove();

        $("<img src='images/Playing_card_" + card + ".png' class='card' />")
          .appendTo(self.getPlayerDiv())
          .css("position", "absolute")
          .css("margin-left", handSize * 20);

        self.hand.push(card);

        if(callback)
          callback();
      });
  }
}



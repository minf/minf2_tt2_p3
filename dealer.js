
function Dealer(){
  this.hand = [];

  $("#dealer")[0].player = this;

  this.hitDecision = function() {
    return this.handValue() < 17;
  }

  this.getPlayerDiv = function() {
    return $("#dealer");
  }

  this.getFirstCard = function(){
    return this.hand.length > 0 ? this.hand[0] : "";
  }
}

Dealer.prototype = new Player();



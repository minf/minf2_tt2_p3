
function Dealer(){
  this.hand = [];

  $("#dealer")[0].player = this;

  this.hitDecision = function() {
    return this.handValue() < 17;
  }

  this.getPlayerDiv = function() {
    return $("#dealer");
  }
}

Dealer.prototype = new Player();



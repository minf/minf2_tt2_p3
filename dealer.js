
function Dealer(){
  this.hand = [];

  $("#dealer")[0].player = this;

  this.hit = function(){
    return this.hand.length < 3;
  }

  this.getPlayerDiv = function() {
    return $("#dealer");
  }
}

Dealer.prototype = new Player();



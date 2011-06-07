
function Dealer(){
  this.hand = [];

  $("#dealer")[0].player = this;

  this.hit = function(callbackHit, callbackStick) {
    var willHit = this.handValue() < 17;

    this.hitNotify(willHit, callbackHit, callbackStick);

    return willHit;
  }

  this.getPlayerDiv = function() {
    return $("#dealer");
  }
}

Dealer.prototype = new Player();



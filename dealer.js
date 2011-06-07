
function Dealer(){
  this.hand = [];

  $("#dealer")[0].player = this;

  this.hit = function(callbackHit, callbackStick) {
    if(this.handValue() > 21) {
      if(callbackStick)
        callbackStick();

      return false;
    }

    var willHit = this.handValue() < 17;

    this.hitNotify(willHit, callbackHit, callbackStick);

    return willHit;
  }

  this.getPlayerDiv = function() {
    return $("#dealer");
  }
}

Dealer.prototype = new Player();




function HumanPlayer() {
  this.hand = [];
  this.alreadySticked = false;

  this.playerDiv = $("<div class='player'></div>");

  this.playerDiv[0].player = this;

  $("#players").append(this.playerDiv);

  this.hit = function(callbackHit, callbackStick) {
    this.active();

    var willHit = confirm("Hit?");

    this.hitNotify(willHit, callbackHit, callbackStick);

    return willHit;
  }
}

HumanPlayer.prototype = new Player();

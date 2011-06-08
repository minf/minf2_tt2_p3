
function HumanPlayer() {
  this.hand = [];
  this.alreadySticked = false;

  this.playerDiv = $("<div class='player'></div>");

  this.playerDiv[0].player = this;

  $("#players").append(this.playerDiv);

  this.hitDecision = function() {
    if(this.alreadySticked) return false;
    this.alreadySticked = !confirm("Hit?");
    return !this.alreadySticked;
  }
}

HumanPlayer.prototype = new Player();

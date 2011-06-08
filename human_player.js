
function HumanPlayer() {
  this.hand = [];
  this.alreadySticked = false;

  this.playerDiv = $("<div class='player'></div>");

  this.playerDiv[0].player = this;

  $("#players").append(this.playerDiv);

  this.reset = function(){
    this.getPlayerDiv()
      .css("background-color", "")
      .empty();
    this.alreadySticked = false;
    this.clearHand();
  }

  this.hitDecision = function() {
    if(this.alreadySticked) return false;
    this.alreadySticked = !confirm("Hit?");
    return !this.alreadySticked;
  }
}

HumanPlayer.prototype = new Player();

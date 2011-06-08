/*

Monte Carlo ES

States:
┌─ no usable ace ────┐ ┌─ usable ace ────────┐
<12 12 ... 19 20 >=21   <12 12 ... 19 20 >=21  <- hand value
  0  1 ...  8  9   10    11 12 ... 19 20   21  <- state id

Actions:
- hit = true
- stick = false

Reward:
 +1  if winner
 -1  if loser
  0  if draw

*/


function MonteCarloPlayer() {
  this.hand = [];

  this.playerDiv = $("<div class='player'></div>");

  this.playerDiv[0].player = this;

  $("#players").append(this.playerDiv);

  this.episode = [];

  this.pi = [];
  this.Q = [[], []];
  this.Returns = [[], []];

  for(var i = 0; i <= 21 /*states*/; i++){
    this.pi.push(Math.random()<0.5);
    this.Q[0][i] = 0.5; // hit
    this.Q[1][i] = 0.5; // stick
  }

  this.hitDecision = function(){
    var v = this.handValue();
    var ace = this.usableAce;

    var stateId = v < 12 ? 0 : ( v > 21 ? 10 : v - 11);
    if (ace) stateId += 11;

    var action = this.pi[stateId];
    this.episode.push({ s:stateId, a:action });
    return action;
  }

  this.reset = function(){
    this.getPlayerDiv()
      .css("background-color", "")
      .empty();
    this.episode = [];
    this.clearHand();
  }

  this.draw = function(){
    this.getPlayerDiv()
      .removeClass("active")
      .css("background-color", "#e3ad00");

    // TODO: reset episode
  }

  this.winner = function() {
    this.getPlayerDiv()
      .removeClass("active")
      .css("background-color", "#156400");

    // TODO: Reward +1, improve policy, reset episode
  }

  this.loser = function() {
    this.getPlayerDiv()
      .removeClass("active")
      .css("background-color", "#a40000");

    // TODO: Reward -1, improve policy, reset episode
  }

  this.improvePolicy = function(){
    // TODO:
  }
}

MonteCarloPlayer.prototype = new Player();
/*

Monte Carlo ES

States:
  see below

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

  this.playerDiv = $("<div class='player monte-carlo-player'></div>");

  this.playerDiv[0].player = this;

  $("#players").append(this.playerDiv);

  this.episode = [];

  this.pi = [];

  this.Q = [[], []];

  // splitting into sumReturns and numReturns lets us calculate
  // the average in constant time: average = sumReturns / numReturns

  this.sumReturns = [[], []];
  this.numReturns = [[], []];

  // serialization

  this.dump = function() {
    return JSON.stringify({ pi: this.pi, Q: this.Q, sumReturns: this.sumReturns, numReturns: this.numReturns });
  }

  this.load = function(str) {
    var o = JSON.parse(str);

    this.pi = o.pi;
    this.Q = o.Q;
    this.sumReturns = o.sumReturns;
    this.numReturns = o.numReturns;
  }

  // sutton:
  // the player makes decisions on the basis of three variables.
  // his current sum (12-21), the dealer's one showing card (ace-10),
  // and whether or not he holds a usable ace. this makes a total
  // of 200 states.

  // player: 12, 13, 14, 15, 16, 17, 18, 19, 20, 21 (10 states)
  // dealer: 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 (10 states)
  // player: usable ace or not (2 states)
  // 2 * 10 * 10 => 200 states

  this.stateIndexFor = function(p1, d1, p2) {
    return ((p1 - 12) << 5) + ((d1 - 2) << 1) + p2;
  }

  for(var p1 = 12; p1 <= 21; p1++) {
    for(var d1 = 2; d1 <= 11; d1++) {
      for(var p2 = 0; p2 <= 1; p2++) {
        var stateIndex = this.stateIndexFor(p1, d1, p2);

//         // initial strategy: hit for < 20
//         this.Q[0][stateIndex] = p1<20?1:0; // hit
//         this.Q[1][stateIndex] = p1<20?0:1; // stick
        this.Q[0][stateIndex] = Math.random(); // hit
        this.Q[1][stateIndex] = Math.random(); // stick

        this.pi[stateIndex] = this.Q[0][stateIndex] > this.Q[1][stateIndex]; // hit better than stick

        this.sumReturns[0][stateIndex] = 0; // hit
        this.sumReturns[1][stateIndex] = 0; // stick

        this.numReturns[0][stateIndex] = 0; // hit
        this.numReturns[1][stateIndex] = 0; // stick
      }
    }
  }

  this.hitDecision = function(){
    var v = this.handValue();
    var ace = this.usableAce;

    if(v < 12) // always hit
      return true;

    if(v > 21) // always stick
      return false;

    var p1 = v; // players sum (12-21)
    var d1 = $("#dealer")[0].player.handValue(); // dealers showing card (ace-10)
    var p2 = ace ? 1 : 0; // usable ace?

    var stateIndex = this.stateIndexFor(p1, d1, p2);

    var action = this.pi[stateIndex];

    // epsilon?
    if(Math.random() > 0.8)
      action = !action;

    this.episode.push({ s: stateIndex, a: action });

    return action;
  }

  this.reset = function(){
    this.getPlayerDiv()
      .css("background-color", "")
      .empty();

    this.episode = [];

    this.clearHand();

    $("textarea").text(this.dump());
  }

  this.draw = function(){
    this.getPlayerDiv()
      .removeClass("active")
      .css("background-color", "#e3ad00");

    this.processEpisode(0);
  }

  this.processEpisode = function(reward) {
    // for each pair s, a appearing in the episode:
    //   R <- return following the first occurrence of s, a
    //   Append R to Returns(s, a)
    //   Q(s, a) <- average(Returns(s, a))

    for(var i = 0; i < this.episode.length; i++) {
      var s = this.episode[i].s;
      var a = this.episode[i].a ? 0 : 1; // hit => 0, stick => 1

      // update returns for (s, a)

      this.sumReturns[a][s] += reward;
      this.numReturns[a][s] += 1;

      // calculate average

      this.Q[a][s] = this.sumReturns[a][s] / this.numReturns[a][s];
    }

    // prevent using episode more than once
    this.episode = [];

    this.improvePolicy();
  }

  this.winner = function() {
    this.getPlayerDiv()
      .removeClass("active")
      .css("background-color", "#156400");

    this.processEpisode(1);
  }

  this.loser = function() {
    this.getPlayerDiv()
      .removeClass("active")
      .css("background-color", "#a40000");

    this.processEpisode(-1);
  }

  this.improvePolicy = function(){
    // for each s in the episode:
    //   pi(s) <- arg max_a Q(s, a)

    // for simplicity we check all states of policy,
    // not just states visited in current episode

    for(var p1 = 12; p1 <= 21; p1++) {
      for(var d1 = 2; d1 <= 11; d1++) {
        for(var p2 = 0; p2 <= 1; p2++) {
          var stateIndex = this.stateIndexFor(p1, d1, p2);

          this.pi[stateIndex] = this.Q[0][stateIndex] > this.Q[1][stateIndex]; // hit better than stick?
        }
      }
    }
  }
}

MonteCarloPlayer.prototype = new Player();

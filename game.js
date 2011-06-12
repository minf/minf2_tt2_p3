
function Game(){
  //this.players = [ new Player(), new MonteCarloPlayer(), new HumanPlayer() ];
  this.players = [ new MonteCarloPlayer() ];
  this.dealer = new Dealer();
  this.cardstack = new Cardstack();
  this.cardstack.init();

  this.numEpisodes = 0;
  this.paused = false;

  this.match = function(){
    document.title = (this.numEpisodes++) + " Episodes played";

    var self = this;

    // hand out a card to each player and to the dealer

    function firstCards(callback) {
      $.each(self.players, function(){
        var player = this;

        $(document).queue(function(next) {
          player.receiveCard(self.cardstack.draw(), function() {
            next();
          });
        });
      });

      $(document).queue(function(next) {
        self.dealer.receiveCard(self.cardstack.draw(), function() {
          next();
        });
      });

      // The player is dealt an initial tow card hand [..]
      // (according to http://en.wikipedia.org/wiki/Blackjack)
      $.each(self.players, function(){
        var player = this;

        $(document).queue(function(next) {
          player.receiveCard(self.cardstack.draw(), function() {
            next();
          });
        });
      });

      $(document).queue(function(next){
        if(callback)
          callback();
        next();
      });
    }

    // recursively ask players for one more card until no one hits

    function askPlayers(callback) {
      var cardWanted = false;
      var dealerCard = self.dealer.getFirstCard();

      $.each(self.players, function() {
        var player = this;

        $(document).queue(function(next) {
          player.hit(
            function() {
              player.receiveCard(self.cardstack.draw(), function() {
                cardWanted = true;

                next();
              });
            }, function() {
              next();
            }
          );
        });
      });

      // if anybody hit, we start a new round, otherwise hand over to dealer

      $(document).queue(function(next) {
        if(cardWanted)
          askPlayers(callback);
        else {
          if(callback)
            callback();
        }

        next();
      });
    }

    // ask dealer recursively for one more card until stick

    function askDealer(callback) {
      $(document).queue(function(next) {
        self.dealer.hit(function() {
          self.dealer.receiveCard(self.cardstack.draw(), function() {
            askDealer(callback);
          });
        }, function() {
          if(callback)
            callback();
        });

        next();
      });
    }

    // match is over, notify winners and losers

    function winnersAndLosers(callback) {
      var dealer = self.dealer;
      var dealerHandValue = dealer.handValue();

      $.each(self.players, function() {
        var player = this;

        var hasWon = player.handValue() <= 21 && (player.handValue() > dealerHandValue || dealerHandValue > 21);
        var hasDraw = !hasWon && (dealerHandValue <= 21 && player.handValue() == dealerHandValue);

        hasWon ? player.winner() : (hasDraw ? player.draw() : player.loser());
      });

      // is this leaky? building an infinite stack..
      if(Game.speed == 0 || confirm("Another game?"))
      {
        $.each(self.players, function(){
          self.cardstack.receiveCards(this.getHand());
          this.reset();
        });

        self.cardstack.receiveCards(self.dealer.getHand());
        self.dealer.reset();

        if(callback)
          callback();
      }
    }

    firstCards(function() {
      askPlayers(function() {
        askDealer(function() {
          winnersAndLosers(function(){
            $(document).queue(function(next){
              if(!self.paused)
                self.match();

              next();
            });
          });
        });
      });
    });
  }

  this.pause = function() {
    this.paused = true;
  }

  this.unpause = function() {
    this.paused = false;
    this.match();
  }

  this.getCardstack = function() {
    return this.cardstack;
  }
}

Game.speed = 0;



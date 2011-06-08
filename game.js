
function Game(){
  this.players = [ new Player(), new MonteCarloPlayer()];//, new HumanPlayer() ];
  this.dealer = new Dealer();
  this.cardstack = new Cardstack();
  this.cardstack.init();

  this.match = function(){
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
      if(callback && confirm("Another game?"))
      {
        $.each(self.players, function(){
          self.cardstack.receiveCards(this.getHand());
          this.reset();
        });

        self.cardstack.receiveCards(self.dealer.getHand());
        self.dealer.reset();

        callback();
      }
    }

    firstCards(function() {
      askPlayers(function() {
        askDealer(function() {
          winnersAndLosers(function(){
            $(document).queue(function(next){
              self.match();
              next();
            });
          });
        });
      });
    });
  }

  this.getCardstack = function() {
    return this.cardstack;
  }
}

Game.speed = 1;



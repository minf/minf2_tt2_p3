
function Game(){
  this.players = [new Player(), new Player(), new Player()];
  this.dealer = new Dealer();
  this.cardstack = new Cardstack();
  this.cardstack.init();

  this.match = function(){
    var self = this;

    $.each(this.players, function(){ this.receiveCard(self.cardstack.draw()); });
    this.dealer.receiveCard(this.cardstack.draw());

    while(true) {
      var cardWanted = false;

      $.each(this.players, function() {
        if(this.hit()) {
          this.receiveCard(self.cardstack.draw());
          cardWanted = true;
        }
      });

      if(!cardWanted)
        break;
    }

    while(this.dealer.hit())
      this.dealer.receiveCard(this.cardstack.draw());

    // $.each(this.players, function(){ self.cardstack.receiveCard(this.getHand().getCards()); });

    // TODO clear hands and back to stack
  }

  this.getCardstack = function() {
    return this.cardstack;
  }
}



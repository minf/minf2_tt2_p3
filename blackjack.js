
(function($) {

  function Cardstack(){
    this.stack = [];
    this.playedCards = [];

    this.init = function(){
      var tempStack = [];

      $.each([2,3,4,5,6,7,8,9,10,'J','Q','K','A'], function() {
	      var num = this;

        $.each(['C','D','H','S'], function(){
          tempStack.push(this+' '+num);
        });
      });

      this.stack = [];
      this.playedCards = [];

      for(var i = 0; i < 6;i++){this.stack = this.stack.concat(tempStack);}

      this.shuffleCards();
    }

    this.shuffleCards = function(){
      for(var i = 0; i < this.stack.length; i++){
        this.swap(i, parseInt(Math.random()*10000)%this.stack.length);
      }
    }

    this.swap = function(idx1, idx2){
      var tmpEl = this.stack[idx1];
      this.stack[idx1] = this.stack[idx2];
      this.stack[idx2] = tmpEl;
    }

    this.draw = function(){
      if(this.stack.length < 0.75 * 6 * 52)
      {
        this.stack = this.stack.concat(this.playedCards);
        this.shuffleCards();
        this.playedCards = [];
      }

      return this.stack.pop();
    }

    this.receiveCards = function(cards){
      this.playedCards = this.playedCards.concat(cards);
    }
  }
  
  function Hand(){
    this.cards = [];

    this.add = function(card){
      this.cards.push(card);
    }
    this.getCards = function(){
      return this.cards;
    }
  }

  function Game(){
    this.players = [new Player(), new Player()];
    this.dealer = new Dealer();
    this.cardstack = new Cardstack();

    this.match = function(){
      $.each(this.players, function(){ this.setHand(new Hand()); });
      this.dealer.setHand(new Hand());

      $.each(this.players, function(){ this.receiveCard(this.cardstack.draw()); });
      this.dealer.receiveCard(this.cardstack.draw());

      while(true){
        var cardWanted = false;
        $.each(this.players, function(){ 
          if(this.hit())
          {
            this.receiveCard(this.cardstack.draw()); 
            cardWanted = true;
          }
        });
        if(!cardWanted)
          break;
      }      

      while(this.dealer.hit())
        this.dealer.receiveCard(this.cardstack.draw());

      var self = this;
      $.each(this.players, function(){ self.cardstack.receiveCard(this.getHand().getCards()); });
    }
  }

  function Player(){
    this.hand = null;

    this.setHand = function(hand){
      this.hand = hand;
    }
    this.getHand = function(){
      return this.hand;
    }
    this.receiveCard = function(card){
    }
    this.hit = function(){
      return this.hand.cards.length < 3;
    }
  }

  function Dealer(){
    this.hit = function(){
      return false;
    }
  }

  Dealer.prototype = new Player();

  $(document).ready(
    function() {
        new Game().match();

/*      var c = new Cardstack();
      c.init();

      var hand = new Hand();
      for(var i = 0; i < 4; i++)
        hand.add(c.draw());
      
      c.addHand(hand);
*/
    }
  );
})(jQuery);


(function($) {

  function Cardstack(){
    this.stack = [];
    this.playedCards = [];

    this.init = function(){
      var tempStack = [];

      $.each([2,3,4,5,6,7,8,9,10,'J','Q','K','A'], function() {
	      var num = this;

        $.each(['club','diamond','heart','spade'], function(){
          tempStack.push(this + '_' + num);
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
  
  function Game(){
    this.players = [new Player(), new Player()];
    this.dealer = new Dealer();
    this.cardstack = new Cardstack();
    this.cardstack.init();

    this.match = function(){
      var self = this;

      $.each(this.players, function(){ this.receiveCard(self.cardstack.draw()); });
      this.dealer.receiveCard(this.cardstack.draw());

      while(true){
        var cardWanted = false;
        $.each(this.players, function(){ 
          if(this.hit())
          {
            this.receiveCard(self.cardstack.draw()); 
            cardWanted = true;
          }
        });
        if(!cardWanted)
          break;
      }      

      while(this.dealer.hit())
        this.dealer.receiveCard(this.cardstack.draw());

      $.each(this.players, function(){ self.cardstack.receiveCard(this.getHand().getCards()); });

      // TODO clear hands and back to stack
    }
  }

  function Player(){
    this.hand = [];

    this.dom = $("<div class='player'></div>").appendTo("#players");

    this.getHand = function(){
      return this.hand;
    }

    this.clearHand = function() {
      this.hand = [];
    }

    this.fly = function(card) {
      var domCard = $("<img src='images/Playing_card_" + card + ".png' class='card' />")
        .appendTo("body")
        .css("position", "absolute")
        .css("left", $("#stack").offset().left)
        .css("top", $("#stack").offset().top)
        .animate({ left: $(this.dom).offset().left, top: $(this.dom).offset().top }, 2000);
    }

    this.receiveCard = function(card){
      this.hand.push(card);
      this.fly(card);
    }

    this.hit = function(){
      return this.hand.length < 3;
    }
  }

  function Dealer(){
    this.hand = [];

    this.hit = function(){
      return false;
    }

    this.fly = function(card) {
      var domCard = $("<img src='images/Playing_card_" + card + ".png' class='card' />")
        .appendTo("body")
        .css("position", "absolute")
        .css("left", $("#stack").offset().left)
        .css("top", $("#stack").offset().top)
        .animate({ left: $("#dealer").offset().left, top: $("#dealer").offset().top }, 2000);
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


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


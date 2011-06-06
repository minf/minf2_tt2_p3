
function Dealer(){
  this.hand = [];

  $("#dealer")[0].player = this;

  this.hit = function(){
    var willHit = this.handValue() < 17;
    this.hitNotify(willHit);
    return willHit;
  }

  this.handValue = function(){
    var aces = 0, sum = 0;
    $.each(this.hand, function(){
      var value = this.split('_')[1];
      var nValue = parseInt(value, 10);
      if(isNaN(nValue)){
        switch(value){
          case 'J':
          case 'Q':
          case 'K':
            sum += 10;
            break;
          case 'A':
            aces++;
            break;
          default:
            alert("this shouldn't happen");
            break;
        }
      } else {
        sum += nValue;
      }
    });

    while(aces > 0){
      if(sum + aces*11 <= 21)
        return sum + aces*11;
      aces--;
      sum += 1;
    }
    return sum;
  }

  this.getPlayerDiv = function() {
    return $("#dealer");
  }
}

Dealer.prototype = new Player();



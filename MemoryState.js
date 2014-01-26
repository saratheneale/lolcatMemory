//Game possible States:
// oneFlipped
// matched
// notMatched
// noFlipped
// winnder
var BaseState = Backbone.Model.extend({
  initialize: function(owner) {
    this.owner = owner;
  },
  enter: function() {
    // Implement me in your state objects
  },
  execute: function() {
    // Implement me in your state objects
  },
  oneFlip:function(card){
  	console.log('changing to the oneflipped state...');
    this.owner.changeState(this.owner.states.oneFlipped,card);

  },
  match:function(){
	console.log('changing to the matched state...');
    this.owner.changeState(this.owner.states.matched);

  },
  notMatched:function(){
	console.log('changing to the notmatched state...');
    this.owner.changeState(this.owner.states.notMatched);
  },
  noFlip:function(){
	console.log('changing to the noFlipped state...');
    this.owner.changeState(this.owner.states.noFlipped);
  },
  win:function(){
	console.log('changing to the winner state...');
    this.owner.changeState(this.owner.states.winner);
  },
  exit:function(){
  	// Implement me in your state objects
  }
})

var oneFlippedState = BaseState.extend({
	card:undefined,
	enter:function(card){
		if (card)
			this.card = card;
			console.log('enter in oneFlippedState');
			console.log('you flipped ' + this.card)
	},
	execute:function(){
		if (this.card)
			console.log('executing oneFlippedState');
	},
	exit:function(){
		if (this.card)
			//this.card.render();
			console.log('exit oneFlippedState')
	},
	oneFlip:function(card){
	  	console.log('already in state oneflip... Go to match or not matched here?');
  		
  }
});

var twoFlippedState = BaseState.extend({
	card:undefined,
	enter:function(card){
		if (card)
			this.card = card;
			console.log('enter in 2FlippedState');
			console.log('you flipped ' + this.card)
	},
	execute:function(){
		if (this.card)
			console.log('executing 2FlippedState');
	},
	exit:function(){
		if (this.card)
			console.log('exit 2FlippedState')
	},
	twoflip:function(card){
	  	console.log('already in state tw0flip... Go to match or not matched here?');
  		
  }
});

//This Model depends on global var pairsOfCards
var matchedState = BaseState.extend({
	matches:[],
	enter:function(){
		console.log('enter in matchedState');
	},
	execute:function(card){
		console.log('executing matchedState: set the matched card...');
		this.matches.push(card);
		//if matched length is 6, winner. otherwise, noflip.
		if(this.matches.length===pairsOfCards)
			this.win();
		else
			this.noFlip();
		//this.exit(); exiting should be done from the state. All evalutation code should go here. 

	},
	exit:function(){
		console.log('exit matched')

	},
	match:function(){
	  	console.log('already in state matched...');
  }
});

var notMatchedState = BaseState.extend({
	enter:function(){
		console.log('enter in notMatchedState');
	},
	execute:function(){
		console.log('executing notMatchedState');
		console.log('go to noFlipState')
		this.noFlip()
	},
	exit:function(){
		console.log('exit notMatchedState')
	},
	notMatched:function(){
	  	console.log('already in state notMatched... ');
  }
});

var noFlipState = BaseState.extend({
	enter:function(){
		console.log('enter in noFlipState');
	},
	execute:function(){
		console.log('executing noFlipState');
	},
	exit:function(){
		console.log('exit noFlipState')
	},
	noFlip:function(){
	  	console.log('already in state oneflip... Go to match or not matched here?');
  }
});

var winnerState = BaseState.extend({
	enter:function(){
		console.log('enter in winnerState');
	},
	execute:function(){
		console.log('executing winnerState');
		//Send Data to Keen

		var winstate = {
			winner: "true"
		}
		Keen.addEvent('Lolcat-MemoryWinner', winstate)
	},
	exit:function(){
		console.log('exit winnerState')
	},
	win:function(){
	  	console.log('already in state win');
  }
});
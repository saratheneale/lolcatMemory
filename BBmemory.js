var CardModel = Backbone.Model.extend({
	initialize: function(){
		console.log("Hello!")
	}

});//end CardModel definition
var CardsCollection = Backbone.Collection.extend({
	model:CardModel,
	url: "https://api.thecatapi.com/v1/images/search?limit=6&page=1&order=Desc",
	parse: function(response){
		//todo create pairs. 
		var newResponses = [];
		response.forEach(function(card, i){
			//add a copy to response. 
			card.MatchNum = i;
			card.card_id = i+5;
			var newCard = JSON.parse(JSON.stringify(card));
			newCard.MatchNum = i+5;
			newCard.card_id = i;
			newCard.id = newCard.id+"2";
			newResponses.push(newCard);

		});
		// console.log(newResponses)
		var newOne = response.concat(newResponses);
		console.log(newOne)
		return newOne;
	}

})
var CardView = Backbone.View.extend({
	className: "card_wrap",
	template:  $('#start_card_template').html(),
	events:{
		"click":'flipCard'
	},
	render:    function(){
				this.$el.html("")
				var temp1=_.template(this.template);
				var obj = {nouns:'Kittens'}
				this.$el.append(_.template(this.template)({nouns:'Kittens'}));
				return this;
			},
	flipCard:  function(){
				//1. Is this the only flipped card?

				//2. Is this a match to the other flipped card?
				//2a. Yes- trigger match function
				//2b. No - rerender this view and the other card. 
				var temp1=_.template($('#flip_card_template').html());
				var obj ={model:this.model.toJSON()}
				//show the card
				this.$el.html("")
				this.$el.append(temp1(obj));
				

				
				if (memoryAppView.state === memoryAppView.states.oneFlipped){
					//1. Check if memoryAppView.states.oneFlipped.card is this.match
					//2. Set status accordingly, and render proper view.
					if (this.isMatch()){
						memoryAppView.changeState(memoryAppView.states.matched,this);
						//TODO: confetti view! 
					}
					else{
						
						var that=this
						setTimeout(function(){
							memoryAppView.states.oneFlipped.card.render() //re-render that card.
							that.render()//will re-render the view to noFlip

							memoryAppView.changeState(memoryAppView.states.notMatched);
							
						},2000)
						
						 
					}
				}
				else {
					memoryAppView.changeState(memoryAppView.states.oneFlipped,this);
				}

	},
	isMatch:function(){
		var card1 = memoryAppView.states.oneFlipped.card.model;
		var card2 = this.model;
		if(card1.get('card_id') === card2.get('MatchNum'))
			return true;
		return false;
	}
});
  
  // The Application
  // ---------------
pairsOfCards = 6;
MemoryAppView = Backbone.View.extend({

	events:{
		"click .card_wrap":'flipCard'
	},
	initialize:function(){
		// get 6 urls
		var newUrl = "https://api.thecatapi.com/v1/images/search?limit=6&page=1&order=Desc";
		this.cards = new CardsCollection();
		var self = this;
		this.cards.fetch({
			success: function(){
				console.log("I succeeded!");
				self.cards.reset(self.cards.shuffle(), {silent:false})

				// try renderCardView? 
				self.render();
			},
			reset: true
	});
		//Create 6 pairs of cards and add to collection
		// for(i = 0; i < pairsOfCards; i++){
		// 	//Generate a random number between 900 and 1250
		// 	var urlNum = Math.floor(Math.random()*(1250-900+1)+900);
		// 	//Concatenate to lolcat URL
		// 	var url = "http://lolcat.com/images/lolcats/"+urlNum+".jpg";
		// 	//Create Models and add to Collection
		// 	var card1 = new CardModel({
		// 		urlNum:urlNum,
		// 		url:url,
		// 		MatchNum:i+5,
		// 		card_id:i
		// 	});
		// 	var card2 = new CardModel({
		// 		urlNum:urlNum,
		// 		url:url,
		// 		MatchNum:i,
		// 		card_id:i+5
		// 		});
		// 	this.cards.add([card1,card2]);
		// }

		//Shuffle the collection
		// this.cards.reset(this.cards.shuffle(), {silent:true})

		//Set up the game States:
		// oneFlipped
		// matched
		// notMatched
		// noFlipped
		// winner
		this.states = {};
	    this.states.oneFlipped = new oneFlippedState(this);
	   // this.states.twoFlipped = new oneFlippedState(this);
	    this.states.matched = new  matchedState(this);
	    this.states.notMatched = new notMatchedState(this);
	    this.states.noFlipped = new noFlipState(this);
	    this.states.winner = new winnerState(this);
	    this.changeState(this.states.noFlipped);


	},
	//args is optional.
	changeState: function(state, args) {
		//Make sure the current state wasn't passed in.
		if (this.state !== state){
			//1. Exit current state.
			if (this.state){
				this.state.exit();
			}
			//2. Set current state.
			this.state = state;

			//3. Enter and execute state.
			this.state.enter(args);
			this.state.execute(args);
		}

	},
	render:function(){
		
		this.renderCardView();

		return this;
	},
	renderCardView:function(){
		this.cards.forEach(function(item){
			console.log("Rendering")
			cardView = new CardView({model:item});
			$('#card_grid').append(cardView.render().el)
		})
	},
	flipCard:function(){
		alert("I bubbled up")
	},
	matched:function(){
		//confetti or something

	},
	notMatched:function(){
		//re-render flipped cards
	}

})

//Create the Application

 var memoryAppView = new MemoryAppView();
 $('#BBVersion').append(memoryAppView.render().el)

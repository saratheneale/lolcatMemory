var CardModel = Backbone.Model.extend({
	initialize: function(){
		console.log("Hello!")
	}

});//end CardModel definition
var CardsCollection = Backbone.Collection.extend({
	model:CardModel,

})
var CardView = Backbone.View.extend({
	className: "card_wrap",
	template:  $('#start_card_template').html(),
	events:{
		"click":'flipCard'
	},
	render:    function(){
				var temp1=_.template(this.template);
				var obj = {nouns:'Kittens'}
				this.$el.append(_.template(this.template)({nouns:'Kittens'}));
				return this;
			},
	flipCard:   function(){
				var temp1=_.template($('#flip_card_template').html());
				var obj ={model:this.model.toJSON()}
				//show the card
				this.$el.html("")
				this.$el.append(
					temp1(obj)
					);

	}
});
  
  // The Application
  // ---------------
pairsOfCards = 6;
MemoryAppView = Backbone.View.extend({

	initialize:function(){
		this.cards = new CardsCollection();
		//Create 6 pairs of cards and add to collection
		for(i = 0; i < pairsOfCards; i++){
			//Generate a random number between 900 and 1250
			var urlNum = Math.floor(Math.random()*(1250-900+1)+900);
			//Concatenate to lolcat URL
			var url = "http://lolcat.com/images/lolcats/"+urlNum+".jpg";
			//Create Models and add to Collection
			var card1 = new CardModel({
				urlNum:urlNum,
				url:url,
				MatchNum:i+5,
				card_id:i
			});
			var card2 = new CardModel({
				urlNum:urlNum,
				url:url,
				MatchNum:i,
				card_id:i+5
				});
			this.cards.add([card1,card2]);
		}

		//Shuffle the collection
		this.cards.reset(this.cards.shuffle(), {silent:true})
		
		// var cardView = new CardView();
		// $('#BBVersion').append(cardView.render().$el);
	},
	render:function(){
		this.$el.html("SUP");
		this.renderCardView();

		return this;
	},
	renderCardView:function(){
		this.cards.forEach(function(item){
			cardView = new CardView({model:item});
			$('#card_grid').append(cardView.render().el)
		})
	}

})

 var memoryAppView = new MemoryAppView();
 $('#BBVersion').append(memoryAppView.render().el)

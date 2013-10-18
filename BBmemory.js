var CardModel = Backbone.Model.extend({
	initialize: function(){
		console.log("Hello!")
	}

});//end CardModel definition
var CardsCollection = Backbone.Collection.extend({
	model:CardModel,

})
var CardView = Backbone.View.extend({
	template:_.template($('#testTemplate').html()),
	render: function(){
		this.$el.append(this.template({nouns:'Kittens'}));
		return this;
	}
});

var card = new CardModel();
var cards = new CardsCollection();
var cardView = new CardView();
$('body h1').append(cardView.render().$el);

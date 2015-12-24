// useable functions
var shuffle = function (input_deck) {
	var current_deck = input_deck;
	for(var j, x, i = current_deck.length; i; j = Math.floor(Math.random() * i), x = current_deck[--i], current_deck[i] = current_deck[j], current_deck[j] = x);
	return current_deck;
};

// example player proto-type 
var example_player = {
	deck: [1,2,3,4,5,6,7,8,9,0],
	hand: [],
	play: function () {
		this.hand.push(this.deck[0]);
	}
}


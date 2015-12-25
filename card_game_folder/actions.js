// useable functions
var shuffle = function (input_deck) {
	var deck = input_deck;
	for(var j, x, i = deck.length; i; j = Math.floor(Math.random() * i), x = deck[--i], deck[i] = deck[j], deck[j] = x);
	return deck;
};



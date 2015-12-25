// someFunction = function() {
//     alert("done");
// }

// someFunction = (function() {
//     var cached_function = someFunction;
//     return function() {
//         // your code
//         var result = cached_function.apply(this, arguments); // use .apply() to call it
//         // more of your code
//         return result;
//     };
// }) ();


// example player proto-type 
var example_player = {
	deck: [1,2,3,4,5,6,7,8,9,0],
	hand: [],
	play: function () {
		this.hand.push(this.deck[0]);
	}
}

// player creator
var Player = function () {
};

// declare and add function
var sayName = function() { 
	return "myFirstName" + " " + "myLastName"; 
};
Player.prototype.name = sayName;


var main = function() {
	
	var makeGrid = function(size) {
		//make a symmetric grid
		array = [];
		for (var i = 0; i < size; i++) {
			array.push([]);
			for (var j = 0; j < size; j++) {
				array[i].push(false);	//set false to areas the character can move to
			}
		}
		return array;
	}

	var makeObstacle = function(inputArray, startx, endx, starty, endy) {
		//takes an array as input and sets true to areas that the player cannot move to
		for (var i = startx; i < endx; i++ ) {
			for (var j = starty; j < endy; j++) {
				inputArray[i][j] = true;
			}
		}
		return ([startx, endx, starty, endy]); //return entrance coordinate
	}

	//store the following in json
	//start
	var girdSize = 12;
	var gridArray = makeGrid(girdSize);
	var charPosition = [0, 0];	//x, y position of the main character
	var obstacles = {
		'home': makeObstacle(gridArray, 2, 4, 2, 4)
	}
	var animSpeed = 50;	//animation speed
	//end

	$(document).keydown(function(keystroke) {
		//capture keystrokes and move the character in that direction
		switch(keystroke.which) {
			case 38:
				//up
				//do nothing if at the edge or the new position is set to true, meaning it is occupied
				var newPos = [charPosition[0] - 1, charPosition[1]];	//grab the position it will be in if it succeeded
				if (charPosition[0] === 0 || gridArray[newPos[0]][newPos[1]]) { break; };	
				charPosition[0] -= 1;	//move the character
				$('.main_char').animate({top: '-=50'}, animSpeed);	//move the main character
				break;
			case 40:
				//down
				var newPos = [charPosition[0] + 1, charPosition[1]];
				if (charPosition[0] === girdSize - 1 || gridArray[newPos[0]][newPos[1]]) { break; };	//gridSize is used to determine the max
				charPosition[0] += 1;
				$('.main_char').animate({top: '+=50'}, animSpeed);
				break;
			case 37:
				//left
				var newPos = [charPosition[0], charPosition[1] - 1];
				if (charPosition[1] === 0 || gridArray[newPos[0]][newPos[1]]) { break; };
				charPosition[1] -= 1;
				$('.main_char').animate({left: '-=50'}, animSpeed);
				break;
			case 39:
				//right
				var newPos = [charPosition[0], charPosition[1] + 1];
				if (charPosition[1] === girdSize - 1 || gridArray[newPos[0]][newPos[1]]) { break; };
				charPosition[1] += 1;
				$('.main_char').animate({left: '+=50'}, animSpeed);
				break;
			default:
				break;
		}
	});
}

$(document).ready(main);
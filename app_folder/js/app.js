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

	var makeObstacle = function(inputArray, start, end, entrance) {
		var startx = start[0];
		var starty = start[1];
		var endx = end[0];
		var endy = end[1];
		//takes an array as input and sets true to areas that the player cannot move to
		for (var i = startx; i < endx; i++ ) {
			for (var j = starty; j < endy; j++) {
				if (i === entrance[0] && j === entrance[1]) { continue; } //skip if it's interactive
				inputArray[i][j] = true;
			}
		}
		return ([startx, endx, starty, endy]); //return entrance coordinate
	}

	//store the following in json
	//start
	var charPosition = [0, 0];	//x, y position of the main character

	var animSpeed = 50;	//animation speed
	//end

	$.getJSON('data/districts.json', function(data) {
		homeDistrict = data[0];
		gridSize = homeDistrict.gridSize;
		gridArray = makeGrid(gridSize);

		for (index in homeDistrict.buildings) {
			start = homeDistrict.buildings[index].start;
			end = homeDistrict.buildings[index].end;
			entrance = homeDistrict.buildings[index].entrance;
			makeObstacle(gridArray, start, end, entrance);
		}
	});

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
				if (charPosition[0] === gridSize - 1 || gridArray[newPos[0]][newPos[1]]) { break; };	//gridSize is used to determine the max
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
				if (charPosition[1] === gridSize - 1 || gridArray[newPos[0]][newPos[1]]) { break; };
				charPosition[1] += 1;
				$('.main_char').animate({left: '+=50'}, animSpeed);
				break;
			default:
				break;
		}
	});
}

$(document).ready(main);
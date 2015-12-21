var main = function() {
	var makeGrid = function(size) {
		array = [];
		for (var i = 0; i < size; i++) {
			array.push([]);
			for (var j = 0; j < size; j++) {
				array[i].push(false);
			}
		}
		return array;
	}

	var makeObstacle = function(inputArray, startx, endx, starty, endy) {
		for (var i = startx; i < endx; i++ ) {
			for (var j = starty; j < endy; j++) {
				inputArray[i][j] = true;
			}
		}
		return ([startx, endx, starty, endy]); //why?
	}

	var girdSize = 12;
	var gridArray = makeGrid(girdSize);
	var charPosition = [0, 0];	//x, y
	var obstacles = {
		'home': makeObstacle(gridArray, 2, 4, 2, 4)
	}

	console.log(gridArray);

	$(document).keydown(function(keystroke) {
		switch(keystroke.which) {
			case 38:
				//up
				var newPos = [charPosition[0] - 1, charPosition[1]];
				if (charPosition[0] === 0 || gridArray[newPos[0]][newPos[1]]) { break; };
				charPosition[0] -= 1;
				$('.main_char').animate({top: '-=50'});
				break;
			case 40:
				//down
				var newPos = [charPosition[0] + 1, charPosition[1]];
				if (charPosition[0] === girdSize - 1 || gridArray[newPos[0]][newPos[1]]) { break; };
				charPosition[0] += 1;
				$('.main_char').animate({top: '+=50'});
				break;
			case 37:
				//left
				var newPos = [charPosition[0], charPosition[1] - 1];
				if (charPosition[1] === 0 || gridArray[newPos[0]][newPos[1]]) { break; };
				charPosition[1] -= 1;
				$('.main_char').animate({left: '-=50'});
				break;
			case 39:
				//right
				var newPos = [charPosition[0], charPosition[1] + 1];
				if (charPosition[1] === girdSize - 1 || gridArray[newPos[0]][newPos[1]]) { break; };
				charPosition[1] += 1;
				$('.main_char').animate({left: '+=50'});
				break;
			default:
				break;
		}
	});
}

$(document).ready(main);
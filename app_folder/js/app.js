var main = function() {

	function zone(zoneData) {
		this.array = [];
		for (var i = 0; i < zoneData.gridSize; i++) {
			this.array.push([]);
			for (var j = 0; j < zoneData.gridSize; j++) {
				this.array[i].push(false);	//set false to areas the character can move to
			}
		}

		for (index in zoneData.buildings) {
			//for each entrance, get start and end of rectangle, then the interactive point
			//interactive point should be on the edge
			var start = zoneData.buildings[index].start;
			var end = zoneData.buildings[index].end;
			var entrance = zoneData.buildings[index].entrance;

			var startx = start[0];
			var starty = start[1];
			var endx = end[0];
			var endy = end[1];
			//takes an array as input and sets true to areas that the player cannot move to
			for (var i = startx; i < endx; i++ ) {
				for (var j = starty; j < endy; j++) {
					if (i === entrance[0] && j === entrance[1]) { continue; } //skip if it's interactive
					this.array[i][j] = true;
				}
			}
		}
	}

	$.getJSON('data/districts.json', function(data) {
		//get json data
		var homeDistrict = data[0];	//first item in the json is the home district
		var homeZone = new zone(homeDistrict);	//construct new zone
		currentZone = homeZone;
		charPosition = homeDistrict.charStartPos;
	});
	var animSpeed = 50;	//animation speed

	$(document).keydown(function(keystroke) {
		//capture keystrokes and move the character in that direction
		switch(keystroke.which) {
			case 38:
				//up
				//do nothing if at the edge or the new position is set to true, meaning it is occupied
				var newPos = [charPosition[0] - 1, charPosition[1]];	//grab the position it will be in if it succeeded
				if (charPosition[0] === 0 || currentZone.array[newPos[0]][newPos[1]]) { break; };	
				charPosition[0] -= 1;	//move the character
				$('.main_char').animate({top: '-=50'}, animSpeed);	//move the main character
				break;
			case 40:
				//down
				var newPos = [charPosition[0] + 1, charPosition[1]];
				if (charPosition[0] === currentZone.gridSize - 1 || currentZone.array[newPos[0]][newPos[1]]) { break; };	//currentZone.gridSize is used to determine the max
				charPosition[0] += 1;
				$('.main_char').animate({top: '+=50'}, animSpeed);
				break;
			case 37:
				//left
				var newPos = [charPosition[0], charPosition[1] - 1];
				if (charPosition[1] === 0 || currentZone.array[newPos[0]][newPos[1]]) { break; };
				charPosition[1] -= 1;
				$('.main_char').animate({left: '-=50'}, animSpeed);
				break;
			case 39:
				//right
				var newPos = [charPosition[0], charPosition[1] + 1];
				if (charPosition[1] === currentZone.gridSize - 1 || currentZone.array[newPos[0]][newPos[1]]) { break; };
				charPosition[1] += 1;
				$('.main_char').animate({left: '+=50'}, animSpeed);
				break;
			default:
				break;
		}
	});
}

$(document).ready(main);
app.factory('zoneService', ['$http', function($http) {
	return {
		zone: function(zoneData) {
			this.array = [];
			this.entrances = {};
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
						if (i === entrance[0] && j === entrance[1]) {
							this.entrances[i.toString() + j.toString()] = zoneData.buildings[index];
							continue;
						} //skip if it's interactive
						this.array[i][j] = true;
					}
				}
			}
			return {
				array: this.array,
				entrances: this.entrances
			}
		}
	}
}]);
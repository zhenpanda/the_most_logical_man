app.controller('HomeController', ['zoneService', '$http', '$scope', function(zoneService, $http, $scope) {
	$http.get('data/districts.json').success(function(data) {
		$scope.currentDistrict = data[0];	//first item in the json is the home district
		$scope.currentZone = zoneService.zone($scope.currentDistrict);
		$scope.zoneArray = $scope.currentZone.array;
		$scope.entrances = $scope.currentZone.entrances;
		$scope.charPosition = $scope.currentDistrict.charStartPos;
		$scope.gridSpacing = $scope.currentDistrict.gridSpacing;
		$scope.charInBuilding = false;
	});

	checkEntry = function(coords) {
		stringCoords = coords[0].toString() + coords[1].toString();
		if (stringCoords in $scope.entrances) {
			$scope.currentBuilding = $scope.entrances[stringCoords];
			$scope.buildingArray = zoneService.building($scope.currentBuilding);
			$scope.charInBuilding = true;
			$scope.$apply();
			//$('#display_building').modal('toggle');
		}
	}

	var animSpeed = 50;	//animation speed

	$(document).keydown(function(keystroke) {
		//capture keystrokes and move the character in that direction
		switch(keystroke.which) {
			case 38:
				//up
				//do nothing if at the edge or the new position is set to true, meaning it is occupied
				var newPos = [$scope.charPosition[0] - 1, $scope.charPosition[1]];	//grab the position it will be in if it succeeded
				if ($scope.charPosition[0] === 0 || $scope.zoneArray[newPos[0]][newPos[1]]) { break; };	
				$scope.charPosition[0] -= 1;	//move the character
				$('.main_char').animate({top: '-=' + $scope.gridSpacing}, animSpeed);	//move the main character
				checkEntry(newPos);
				break;
			case 40:
				//down
				var newPos = [$scope.charPosition[0] + 1, $scope.charPosition[1]];
				if ($scope.charPosition[0] === $scope.currentDistrict.gridSize - 1 || $scope.zoneArray[newPos[0]][newPos[1]]) { break; };	//$scope.currentZone.gridSize is used to determine the max
				$scope.charPosition[0] += 1;
				$('.main_char').animate({top: '+=' + $scope.gridSpacing}, animSpeed);
				$scope.charInBuilding = false;
				$scope.$apply();
				break;
			case 37:
				//left
				var newPos = [$scope.charPosition[0], $scope.charPosition[1] - 1];
				if ($scope.charPosition[1] === 0 || $scope.zoneArray[newPos[0]][newPos[1]]) { break; };
				$scope.charPosition[1] -= 1;
				$('.main_char').animate({left: '-=' + $scope.gridSpacing}, animSpeed);
				break;
			case 39:
				//right
				var newPos = [$scope.charPosition[0], $scope.charPosition[1] + 1];
				if ($scope.charPosition[1] === $scope.currentDistrict.gridSize - 1 || $scope.zoneArray[newPos[0]][newPos[1]]) { break; };
				$scope.charPosition[1] += 1;
				$('.main_char').animate({left: '+=' + $scope.gridSpacing}, animSpeed);
				break;
			default:
				break;
		}
	});
}]);
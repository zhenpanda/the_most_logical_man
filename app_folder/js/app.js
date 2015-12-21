var main = function() {
	$(document).keydown(function(keystroke) {
		switch(keystroke.which) {
			case 38:
				console.log('pressed up');
				$('.main_char').animate({top: '-=50'});
				break;
			case 40:
				console.log('pressed down');
				$('.main_char').animate({top: '+=50'});
				break;
			case 37:
				console.log('pressed left');
				$('.main_char').animate({left: '-=50'});
				break;
			case 39:
				console.log('pressed right');
				$('.main_char').animate({left: '+=50'});
				break;
			default:
				console.log(keystroke.which);
				break;
		}
	});
}

$(document).ready(main);
$(document).ready(function(){
	let block_menu = $('.menu');
	let block_game = $('.game');
	$('.start').click(function(){
		block_game.fadeIn();
		block_menu.fadeOut();
		Game();
	});
});

$(document).ready(function(){
	$('.game').hover(function(){
		$(this).css({'background-color':'#b35900', 'cursor':'pointer'});
	},
	function(){
		$(this).css("background-color","rgb(255,185,80)");
	});
	$('#quizDiv').on('click', function(){
		$(this).css({"border-bottom-color":"#b35900","border-bottom-style":"solid"});
		$('#hangmanDiv').css("border","none");
		$('.lower').html('');
		$.get('quizPg1.html', function(response){
			$('.lower').html(response);
		});

	});
	$('#hangmanDiv').on('click', function(){
		$(this).css({"border-bottom-color":"#b35900","border-bottom-style":"solid"});
		$('#quizDiv').css("border","none");
		$('.lower').html('');
		$.get('hangmanPg1.html', function(response){
			$('.lower').html(response);
		});
	});
});
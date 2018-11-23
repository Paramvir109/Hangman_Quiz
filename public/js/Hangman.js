function converted(phrase){
	var a = "";
	for(let i = 0; i < phrase.length;i++){
		a += "-";
	}
	return a;
}
let lives;
var imageArr = ["res/5.jpg", "res/4.jpg", "res/3.jpg", "res/2.jpg" , "res/1.jpg" , "res/0.jpg"];
var imagec;
let phrase;
let actualWord;
$(document).on('click', '.difficulty', function(){
	let selected = $(this).text(); // If u use it under getJSON (this) wont return you desired value
	$.get('HangmanData.json', function(response){
		//console.log($(this).html()); // used as a getter instead of setter
		let lower = '';
		lives = 5;
		imagec= 0;
		$.each(response, function(index, value){
			if(value.difficulty === selected) {
				let ans = converted(value.phrase);
				actualWord = value.phrase;
				lower += '<div class = "livesLeft">Lives left : <span class = "lives">' +lives + '</span>/5</div>';
				lower += '<div class = "word">' + ans + '</div>';
				lower += '<div class = "input"><input type = "text" id ="getCharacter" placeholder = "Enter to guess"></div>';
				lower += '<div class = "img"><img id = "hangmanImg" src = "' + imageArr[imagec] + '" height = "220" width = "120"></div>';
				$('.lower').html(lower);
			}
		});
	});
});
$(document).keypress('#getCharacter', function(e){
	if(e.which == 13){
		if($('#getCharacter').val().length == 1){
			let  userInput = $('#getCharacter').val().toUpperCase(); //toUpperCase is a function, not property
			phrase = $('.word').text();
				if(phrase.includes(userInput) === false){ // To not enter redundant(not unique) value
				let str = "";
				for(let i = 0;i < actualWord.length;i++) {
					if(userInput === actualWord[i]) {
						//phrase[i] = userInput;         Strings are immutable
						str += userInput;
					} else {
						str += phrase[i];
					}
				}
				if(str === phrase) {
					lives--;
					imagec++;
					$('.lives').html(lives);
					$('#hangmanImg').attr("src",imageArr[imagec]);
				$('.lower').append('<div id = "oops" style = "font-family:Verdana, Geneva, sans-serif;font-size: 20px;position:relative;right:50px;top:180px;">OOPS!</div>')
				$('.lives').animate({fontSize:'50px'},200);
				$('.lives').animate({fontSize:'30px'},200);
				$('#oops').fadeOut("slow", function(){$(this).remove();}); //$('#oops').fadeOut("slow");  //Element is there only display hidden
												                           //$('#oops').remove();
				}
				$('#getCharacter').val('');
				$('.word').html(str);
				
				if(str === actualWord) {

					let conclusion = '<div class = "result" style = "color:green; display:none">YOU WON!</div>';
					$('#getCharacter').css("display", "none");
					$('.lower').append(conclusion);
					$('.result').fadeIn(1000);
				}
				if(lives === 0){
					let conclusion = '<div class = "result" style = "color:red; display:none">YOU LOST!</div>';
					$('#getCharacter').css("display", "none");
					$('.lower').append(conclusion);
					$('.result').fadeIn(1000);
				}
			}else{
				alert("Already entered");
			}
		}
		else{
			alert("Enter a single character");
		}
	}
});
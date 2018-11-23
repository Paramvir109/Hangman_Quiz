var c = 0;
var score = 0;
var answerIndex;
var visited = new Array(10).fill(false);
$(document).on('click', '#startQuiz',function(){ //Event delegation(to make newly loaded content respsond)
		var lowerHTML = '';
		$.getJSON('QuizData.json',function(response){  //Will look for specified file in folder where HomePage is located
			let rI = Math.floor(Math.random() * (9 - 0 + 1)) + 0;
			while(visited[rI] === true) {
				rI = Math.floor(Math.random() * (9 - 0 + 1)) + 0;
			}
			visited[rI] = true;
			answerIndex = $.inArray(response[rI].answer, response[rI].options); 
			lowerHTML += '<div class = "question"><h1>Q' + (c + 1).toString() +'.  '+ response[rI].question + '</h1></div>';
			lowerHTML += '<div class = "rightOrWrong"></div>';
			lowerHTML += '<div class = "options"><ul class = "optionList">';
			$.each(response[rI].options,function(index, value){
				lowerHTML += '<li><input type = "radio" name = "options" class = "'+ index +  '">' + value + '</li>';
			});
			lowerHTML += '</ul></div>';
			lowerHTML += '<button class = "submitAns">Submit</button>' + '<button class = "nextQuestion">Next</button>';
			$('.lower').html(lowerHTML);
		});
});

$(document).on('click', '.submitAns',function(){ 
		$(this).css("visibility","hidden");
		$('.nextQuestion').css("visibility","visible")
		var selected = $('input[name=options]:checked').attr('class'); //Will return classname of checked radio button
		if(answerIndex == selected){ 									 // Here we use == as answerIndex is integer and selected is a string
			$('.rightOrWrong').html('CORRECT!').css("color","green");
			score += 1;
		} 
		else if(selected === undefined){
			$('.rightOrWrong').html('SUBMIT AN OPTION!').css("color","blue");
			$(this).css("visibility","visible");
			$('.nextQuestion').css("visibility","hidden");
		}
		else{
			$('.rightOrWrong').html('WRONG!').css("color","red");
		}
});

$(document).on('click', '.nextQuestion',function(){ 
		c = c+1;
		var lowerHTML = '';
		$.getJSON('QuizData.json',function(response){
				if(c < 5) {
					let rI = Math.floor(Math.random() * (9 - 0 + 1)) + 0;
				while(visited[rI] === true) {
					rI = Math.floor(Math.random() * (9 - 0 + 1)) + 0;
				}
				visited[rI] = true;
				answerIndex = $.inArray(response[rI].answer, response[rI].options); 
				lowerHTML += '<div class = "question"><h1>Q' +(c + 1).toString() +'.  '+ response[rI].question + '</h1></div>';
				lowerHTML += '<div class = "rightOrWrong"></div>';
				lowerHTML += '<div class = "options"><ul class = "optionList">';
				$.each(response[rI].options,function(index, value){
					lowerHTML += '<li><input type = "radio" name = "options" class = "'+ index +  '">' + value + '</li>';
				});
				lowerHTML += '</ul></div>';
				lowerHTML += '<button class = "submitAns">Submit</button>' + '<button class = "nextQuestion">Next</button>';
				$('.lower').html(lowerHTML);
			} else{
				visited = new Array(5).fill(false);
				$(this).css("visibility","hidden");
				lowerHTML += '<div class ="finalScore" style = "display:none;">Score: ' + score + '/' + c +'</div>';
				lowerHTML += '<div class = "finalImage">'
				if(score > c/2){
					lowerHTML += '<img src="res/wellplayed.jpg" height=180 width=180>';
				}
				else {
					lowerHTML += '<img src="res/dumb.jpg" height=180 width=220>'
				}
				c = 0;
				score = 0;
				$('.lower').html(lowerHTML);
				$('.finalScore').fadeIn(2000);
			}
		});
});
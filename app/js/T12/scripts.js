/*var time = 15; /!* how long the timer runs for *!/
var initialOffset = '440';
var i = 1;
var interval = setInterval(function() {
	$('.circle_animation').css('stroke-dashoffset', initialOffset-((-(time+i))*(initialOffset/time)));
	$('.js-counter').text(15-i);
	if (i == time) {
		clearInterval(interval);
		quiz.nextQuestion();
	}
	i++;
}, 1000);*/

$(document).ready(function(){
	var elem = document.getElementById("myScore");

	var width = 0;
	var id = setInterval(frame, 50);
	function frame() {
		/!*Übergabe der Data_Value nach score*!/
		var score = document.getElementById("myScore").getAttribute("data-value");
		if (width >= score) {
			clearInterval(id);
		} else {
			width++;
			document.getElementById("JS_ScaleScore").style.width = width + '%';
		}
	}
});

$(document).ready(function(){
	$("#nav-icon1, #nav-icon2, #nav-icon3, #nav-icon4").click(function(){
        openNav();
		$(this).toggleClass("open");
	});
});


/* Jorge H. F. Pereira did new one 
 function changeAnswerButtonColor(n) {
 switch(n){
 case "wrongAnswer1":
 document.getElementById('wrongAnswer1').style.backgroundColor = '#cb0727';
 document.getElementById('rightAnswer').className += " animated flashshort";
 document.getElementById('rightAnswer').style.backgroundColor = '#4ac725';
 document.getElementById('currentQuestionProgress').style.backgroundColor = '#cb0727';
 break;
 case "wrongAnswer2":
 document.getElementById('wrongAnswer2').style.backgroundColor = '#cb0727';
 document.getElementById('rightAnswer').className += " animated flashshort";
 document.getElementById('rightAnswer').style.backgroundColor = '#4ac725';
 document.getElementById('currentQuestionProgress').style.backgroundColor = '#cb0727';
 break;
 case "wrongAnswer3":
 document.getElementById('wrongAnswer3').style.backgroundColor = '#cb0727';
 document.getElementById('rightAnswer').className += " animated flashshort";
 document.getElementById('rightAnswer').style.backgroundColor = '#4ac725';
 document.getElementById('currentQuestionProgress').style.backgroundColor = '#cb0727';
 break;
 case "rightAnswer":
 document.getElementById('rightAnswer').className += " animated flashshort";
 document.getElementById('rightAnswer').style.backgroundColor = '#4ac725';
 document.getElementById('currentQuestionProgress').style.backgroundColor = '#4ac725';
 break;
 }
 }
 */
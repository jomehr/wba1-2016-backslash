/*from: https://codepen.io/designcouch/pen/Atyop */
/*Hamburgertransformation*/
$(document).ready(function(){
	$('#nav-icon1,#nav-icon2,#nav-icon3,#nav-icon4').click(function(){
		$(this).toggleClass('open');
	});
});
/*selfwritten*/
function changeAnswerButtonColor(n) {
	switch(n){
		case "wrongAnswer1":
			document.getElementById('wrongAnswer1').style.backgroundColor = '#cb0727';
			document.getElementById('rightAnswer').className += " animated flashshort";
			document.getElementById('rightAnswer').style.backgroundColor = '#4ac725';
			document.getElementById('currentQuestionProgress').className += " animated fadeInShort";
			document.getElementById('currentQuestionProgress').style.backgroundColor = '#cb0727';
		break;
		case "wrongAnswer2":
			document.getElementById('wrongAnswer2').style.backgroundColor = '#cb0727';
			document.getElementById('rightAnswer').className += " animated flashshort";
			document.getElementById('rightAnswer').style.backgroundColor = '#4ac725';
			document.getElementById('currentQuestionProgress').className += " animated fadeInShort";
			document.getElementById('currentQuestionProgress').style.backgroundColor = '#cb0727';
		break;
		case "wrongAnswer3":
			document.getElementById('wrongAnswer3').style.backgroundColor = '#cb0727';
			document.getElementById('rightAnswer').className += " animated flashshort";
			document.getElementById('rightAnswer').style.backgroundColor = '#4ac725';
			document.getElementById('currentQuestionProgress').className += " animated fadeInShort";
			document.getElementById('currentQuestionProgress').style.backgroundColor = '#cb0727';
		break;
		case "rightAnswer":
			document.getElementById('rightAnswer').className += " animated flashshort";
			document.getElementById('rightAnswer').style.backgroundColor = '#4ac725';
			document.getElementById('currentQuestionProgress').className += " animated fadeInShort";
			document.getElementById('currentQuestionProgress').style.backgroundColor = '#4ac725';
		break;
	}
}

/* from: http://stackoverflow.com/questions/29649643/how-to-create-a-circular-countdown-timer-using-html-css-or-javascript */
var time = 15; /* how long the timer runs for */
var initialOffset = '440';
var i = 1;
var interval = setInterval(function() {
    $('.circle_animation').css('stroke-dashoffset', initialOffset-((-(time+i))*(initialOffset/time)));
    $('h2').text(15-i);
    if (i == time) {
        clearInterval(interval);
    }
    i++;  
}, 1000);

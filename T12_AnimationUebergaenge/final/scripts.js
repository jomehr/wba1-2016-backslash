function checkAnswer(index) {
	switch(index) {
		case 0:
		case 1:
		case 2:
			return false;
		case 3:
			return true;
	}
}


function changeAnswerButtonColor(e) {

	var clickedElem = e.target;

	var indexToCheck = parseInt(clickedElem.dataset.antwort);
	var correct = checkAnswer(indexToCheck);


	document.querySelectorAll('[data-antwort]').forEach(function(elem) {
		elem.classList.add('animated')
		elem.classList.add('flashshort');

		var indexToCheck = parseInt(elem.dataset.antwort);

		if(checkAnswer(indexToCheck))
			elem.parentNode.classList.add('answer--correct');
		else
			elem.parentNode.classList.add('answer--wrong');
	});


	var answer_status_class = (correct) ? 'green': 'red';
	document.querySelector('#currentQuestionProgress').classList.add(answer_status_class);

	console.log( correct ? 'Richtig!': 'Falsch!' );
}

document.addEventListener('DOMContentLoaded', function() {
	document.querySelectorAll('[data-antwort]').forEach(function(elem) {
		elem.addEventListener('click', changeAnswerButtonColor);
	});
});

var time = 15; /* how long the timer runs for */
var initialOffset = '440';
var i = 1;
var interval = setInterval(function() {
    $('.circle_animation').css('stroke-dashoffset', initialOffset-((-i)*(initialOffset/time)));
    $('h2').text(15-i);
    if (i == time) {
        clearInterval(interval);
    }
    i++;
}, 1000);

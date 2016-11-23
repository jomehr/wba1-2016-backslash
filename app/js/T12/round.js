var interval;

function startTimer() {
    var time = 13,
        timeOffset = 13,
        initialOffset = 440;

    clearInterval(interval);
    interval = setInterval(function () {
        var offsetTemp = initialOffset - (time * initialOffset / timeOffset);
        $(".circle_animation").css("stroke-dashoffset", offsetTemp);

        if (time === 0) {
            time = 15;
            timeOffset = 15;
            $(".circle_animation").css("stroke-dashoffset", offsetTemp);
        }

        time--;
    }, 1000);
}

function checkAnswer(index) {
    switch (index) {
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

    document.querySelectorAll('[data-antwort]').forEach(function (elem) {
        elem.classList.add('animated');
        elem.classList.add('flashshort');

        var indexToCheck = parseInt(elem.dataset.antwort);

        if (checkAnswer(indexToCheck))
            elem.parentNode.classList.add('answer--correct');
        else
            elem.parentNode.classList.add('answer--wrong');
    });

    var answer_status_class = (correct) ? 'green' : 'red';
    //document.querySelector('#currentQuestionProgress').classList.add(answer_status_class);

    console.log(correct ? 'Richtig!' : 'Falsch!');
}

document.addEventListener('DOMContentLoaded', function () {
    /*console.log("sth");
    document.querySelectorAll('[data-antwort]').forEach(function (elem) {
        elem.addEventListener('click', changeAnswerButtonColor);
    });*/
});
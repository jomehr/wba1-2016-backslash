var QuizRound = {

    counterElement: null,

    timeInterval: null,

    startTimer: function () {
        if (this.counterElement === null) {
            this.counterElement = document.querySelector('.js-counter');
        }

        clearInterval(this.timerInterval);
        this.timerInterval = null;

        var that = this,
            time = quiz.quizDuration,
            timeOffset = time,
            initialOffset = 440;

        var $circle_animation = $(".circle_animation");

        /* Reset*/
        $circle_animation.css('stroke-dashoffset', 0);

        function calcAndUpdate(firstTime) {
            if (this.timerInterval === null && firstTime !== true)
                return;

            var offsetTemp = initialOffset - (time * initialOffset / timeOffset);
            $circle_animation.css('stroke-dashoffset', offsetTemp);

            that.counterElement.innerHTML = time;

            if (time > timeOffset - 2)
                $circle_animation.css('transition', 'all 1s linear');

            if (time === -1) {
                $circle_animation.css('transition', 'none');
                time = timeOffset;
            }

            time--;
        }

        this.timerInterval = setInterval(calcAndUpdate, 1000);
        calcAndUpdate(true);
    },

    pauseTimer: function () {
        clearInterval(this.timerInterval);
        this.timerInterval = null;
    },

    changeAnswerButtonColor: function () {
        var answerElements = Array.prototype.slice.call(document.querySelectorAll('.js-answer'));

        answerElements.forEach(function (elem) {
            var btnElem = elem.parentNode;
            var indexToCheck = parseInt(btnElem.getAttribute('data-antwort'));

            if (quiz.currentQuestion.antworten[indexToCheck].check)
                btnElem.classList.add('answer--correct');
            else
                btnElem.classList.add('answer--wrong');

            elem.classList.add('animated');
            elem.classList.add('flashshort');
        });
    },


    resetAnswerButtonColor: function () {
        var answerElements = Array.prototype.slice.call(document.querySelectorAll('.js-answer'));

        answerElements.forEach(function (elem) {
            elem.classList.remove('animated');
            elem.classList.remove('flashshort');

            var btnElem = elem.parentNode;
            btnElem.classList.remove('answer--correct');
            btnElem.classList.remove('answer--wrong');
        });
    },


    bindAnswerClickListener: function () {
        var that = this;

        var answerElements = Array.prototype.slice.call(document.querySelectorAll('.js-answer'));
        answerElements.forEach(function (elem) {
            elem.parentNode.addEventListener('click', that.changeAnswerButtonColor);
        })
    }
};
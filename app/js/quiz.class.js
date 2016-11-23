var Quizobject = {};
//Basis Configs
var base = {
    quizDuration: 15
};

var quiz = {

    //Anzahl der richtig beantworteten Fragen
    countCorrectAnswers: [false, false, false, false, false, false, false, false, false, false],

    correctAnswersNumber: null,

    //Anzahl der Fragen
    numberOfQuestions: null,

    //Aktuelle Frage
    indexCurrentQuestion: null,

    //JSON mit Fragen
    questions: null,

    //Startzeit
    startTime: null,

    //Reference Interval
    interval: null,

    //Timer
    counter: null,


    //Antwort prüfen
    checkAnswer: function (e) {
        var indexAnswer = this.getAttribute('data-antwort');
        var feedbackicons = document.querySelectorAll('.bg-mediumgrey');
        //Wurde die Frage richtig beantwortet?
        if (quiz.currentQuestion.antworten[indexAnswer].check) {
            //quiz.countCorrectAnswers[indexAnswer]++;
            quiz.countCorrectAnswers[quiz.indexCurrentQuestion - 1] = true;
            quiz.correctAnswersNumber++;
            feedbackicons[0].className = "qr-answer_icon bg-green";
        } else {
            feedbackicons[0].className = "qr-answer_icon bg-red";
        }
        quiz.nextQuestion();
    },

    //Nächste Frage abrufen
    nextQuestion: function () {
        $("body").addClass("qr-mobile-body");

        //Haben wir noch eine Frage?
        if (quiz.indexCurrentQuestion < quiz.numberOfQuestions) {
            /*document.querySelectorAll('[data-antwort]').forEach(function (elem) {
                elem.addEventListener('click', changeAnswerButtonColor);
            });*/

            //Aktuelle Frage und Antworten aus JSON holen
            quiz.currentQuestion = quiz.questions[quiz.indexCurrentQuestion];
            //Aktuelle Frage in HTML schreiben

            $(".js-quizfrage").text(quiz.currentQuestion.frage);
            //Erstellen eines Arrays mit 4 Zufälligen Zahlen von 1-4 die jeweils einmalig sind
            //für die zufällige Reihenfolge der Buttons
            var arr = [];
            while (arr.length < 4) {
                var randomnumber = Math.floor(Math.random() * 4);
                if (arr.indexOf(randomnumber) > -1) continue;
                arr[arr.length] = randomnumber;
            }

            //Antwortbuttons befüllen
            var answerButtons = document.querySelectorAll('.js-answer');
            for (var i = 0; i < answerButtons.length; i++) {

                //Ausgabe der Antwort Buttons in zufälliger Reihenfolge
                answerButtons[i].parentNode.setAttribute("data-antwort", arr[i]);
                answerButtons[i].innerHTML = quiz.currentQuestion.antworten[arr[i]].text;
            }

            //Counter initialisieren
            var counter = base.quizDuration;

            quiz.counter.innerHTML = counter;

            //Counter clearen
            clearInterval(quiz.interval);

            //Counter herunterzählen
            quiz.interval = setInterval(function () {
                counter--;
                quiz.counter.innerHTML = counter;

                //Ist der Counter abgelaufen?
                if (counter === 0) {
                    //Nächste Frage anzeigen
                    quiz.nextQuestion();
                    var feedbackicons = document.querySelectorAll('.bg-mediumgrey');
                    feedbackicons[0].className = "qr-answer_icon bg-red";
                }
            }, 1000);

            //Index erhöhen
            quiz.indexCurrentQuestion++;
        } else {

            //Quizrunde beenden
            clearInterval(quiz.interval);
            quiz.endQuiz();
        }
    },

    //Quiz starten
    startQuiz: function (data) {

        //Fragen kommen via data
        Quizobject = data;
        //QuizID aus URL holen
        //Variablen initialisieren
        quiz.indexCurrentQuestion = 0;
        quiz.correctAnswersNumber = 0;

        quiz.numberOfQuestions = 10;
        quiz.questions = [];

        //Erstellen eines Arrays mit 10 Zufälligen Zahlen von 1-30 die jeweils einmalig sind für die zufällige Reihenfolge der Fragen
        var arr = [];
        while (arr.length < 10) {
            var randomnumber = Math.floor(Math.random() * Quizobject.quiz.quizFragen.length);
            if (arr.indexOf(randomnumber) > -1) continue;
            arr[arr.length] = randomnumber;
            quiz.questions.push(Quizobject.quiz.quizFragen[randomnumber]);
        }

        quiz.startTime = Date.now();
        quiz.counter = document.querySelector('.js-counter');

        //Eventlistener für Antwortbuttons setzen
        var answerButtons = document.querySelectorAll('.js-answer');
        for (var i = 0; i < answerButtons.length; i++) {
            answerButtons[i].parentNode.addEventListener('click', quiz.checkAnswer);
        }

        //Frage und Antworten anzeigen
        quiz.nextQuestion();

    },

    endQuiz: function () {
        var currentTime = Date.now();
        var duration = (currentTime - quiz.startTime) / 1000;
        //Quiz counter stoppen
        quiz.counter.innerHTML = 0;
        var gesamtZeitSek = parseFloat(duration, 10).toFixed(3);
        var maxMultiplikator = 1.0;
        var aktMultiplikator = 0;
        if (gesamtZeitSek <= 30) {
            aktMultiplikator = 1.0;
        }
        else if (gesamtZeitSek >= 80) {
            aktMultiplikator = 0.5;
        }
        else {
            aktMultiplikator = maxMultiplikator - (gesamtZeitSek * 0.01);
        }

        var endpunktzahl = parseInt(quiz.correctAnswersNumber * 100 * aktMultiplikator);
        sessionStorage.setItem('points', endpunktzahl);
        sessionStorage.setItem('maxpoints', "1000");
        sessionStorage.setItem('correctanswers', quiz.correctAnswersNumber);
        sessionStorage.setItem('amountquestions', quiz.numberOfQuestions);
        sessionStorage.setItem('view', '3');
        sessionStorage.setItem('rs_fragen', JSON.stringify(quiz.countCorrectAnswers));
        sessionStorage.setItem('time_needed', gesamtZeitSek);
        //Weiterleiten auf Quizende
        document.getElementById('quiz_beenden').click();
    }
};
var Quizobject = {};

var quiz = {
    //Anzahl korrekter Antworten
    correctAnswersNumber: null,

    //Anzahl der richtig beantworteten Fragen
    countCorrectAnswers: [false, false, false, false, false, false, false, false, false, false],

    //Timer
    counter: null,

    //Aktuelle Frage
    indexCurrentQuestion: null,

    //Reference Interval
    interval: null,

    //Anzahl der Fragen
    numberOfQuestions: null,

    //JSON mit Fragen
    questions: null,

    //Blocks quiz between two questions
    quizBlocked: false,

    //Zeit pro Frage (in Sek.)
    quizDuration: 15,

    //Startzeit
    startTime: null,

    //Antwort prüfen
    checkAnswer: function (e) {
        if (!this.quizBlocked) {
            this.quizBlocked = true;

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

            clearInterval(quiz.interval);
            quiz.interval = null;
            QuizRound.pauseTimer();
            setTimeout(quiz.nextQuestion, 2000);
        }
    },

    //Nächste Frage abrufen
    nextQuestion: function (firstQuestion) {
        $("body").addClass("qr-mobile-body");
        this.quizBlocked = false;

        if (!firstQuestion) {
            // Hintergrundfarben der Antwortbuttons bei jeder neuen Frage zurücksetzen
            QuizRound.resetAnswerButtonColor();
            QuizRound.startTimer();
        }

        //Haben wir noch eine Frage?
        if (quiz.indexCurrentQuestion < quiz.numberOfQuestions) {
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

            //Counter clearen
            clearInterval(quiz.interval);

            var counter = this.quizDuration;

            //Counter herunterzählen
            quiz.interval = setInterval(function () {
                counter--;

                //Ist der Counter abgelaufen?
                if (counter === 0) {
                    //Nächste Frage anzeigen
                    setTimeout(function () {
                        quiz.nextQuestion();
                        var feedbackicons = document.querySelectorAll('.bg-mediumgrey');
                        feedbackicons[0].className = "qr-answer_icon bg-red";
                    }, 1000);
                }
            }, 1000);

            //Index erhöhen
            quiz.indexCurrentQuestion++;
        } else {

            //Quizrunde beenden
            clearInterval(quiz.interval);
            quiz.interval = null;
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

        //Eventlistener für Antwortbuttons setzen
        var answerButtons = document.querySelectorAll('.js-answer');
        for (var i = 0; i < answerButtons.length; i++) {
            answerButtons[i].parentNode.addEventListener('click', quiz.checkAnswer);
        }

        //Frage und Antworten anzeigen
        quiz.nextQuestion(true);

    },

    endQuiz: function () {
        var currentTime = Date.now();
        var duration = (currentTime - quiz.startTime) / 1000;
        //Quiz counter stoppen
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
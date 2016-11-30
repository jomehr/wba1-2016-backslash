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
        if (!quiz.quizBlocked) {
            quiz.quizBlocked = true;

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
        quiz.quizBlocked = false;

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

            var counter = quiz.quizDuration;

            //Counter herunterzählen
            quiz.interval = setInterval(function () {
                counter--;
                //Ist der Counter abgelaufen?
                if (counter === 0) {

                    //Nächste Frage anzeigen
                    clearInterval(quiz.interval);
                    quiz.interval = null;
                    QuizRound.pauseTimer();
                    setTimeout(quiz.nextQuestion, 2000);
                        var feedbackicons = document.querySelectorAll('.bg-mediumgrey');
                        feedbackicons[0].className = "qr-answer_icon bg-red";
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
    //T08: changed function call to get data via given object
    startQuiz: function (data) {
        quiz.init();

        Quizobject = data;
        //QuizID aus URL holen
        //Variablen initialisieren
        quiz.indexCurrentQuestion = 0;
        quiz.correctAnswersNumber = 0;
        quiz.numberOfQuestions = 10;
        quiz.questions = [];
        //T08 end
        
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
        counter = 0;
        //T08 change new scoring and sessionstorage saving
        var gesamtZeitSek = parseFloat(duration, 10).toFixed(3);
        var maxpunktzahl= quiz.correctAnswersNumber*100;
        var minpunktzahl = maxpunktzahl-100;
        var endpunktzahl = parseInt(maxpunktzahl - gesamtZeitSek + 50);  //20 sekunden animationen timer +30 sekunde für volle punkte
        if(endpunktzahl > maxpunktzahl) {
          endpunktzahl = maxpunktzahl;
        } else if (endpunktzahl < minpunktzahl) {
          endpunktzahl = minpunktzahl;
        }

        sessionStorage.setItem('points', endpunktzahl);
        sessionStorage.setItem('maxpoints', "1000");
        sessionStorage.setItem('correctanswers', quiz.correctAnswersNumber);
        sessionStorage.setItem('amountquestions', quiz.numberOfQuestions);
        sessionStorage.setItem('view', '3');
        sessionStorage.setItem('rs_fragen', JSON.stringify(quiz.countCorrectAnswers));
        sessionStorage.setItem('time_needed', gesamtZeitSek);
        //Added auto end click

        document.getElementById('quiz_beenden').click();
        //T08 end
    },
    //T08/09 init function resetting all data
    init: function () {
        quiz.correctAnswersNumber = null;
        quiz.countCorrectAnswers = [false, false, false, false, false, false, false, false, false, false];
        quiz.counter = null;
        quiz.indexCurrentQuestion = null;
        quiz.interval = null;
        quiz.numberOfQuestions = null;
        quiz.questions = null;
        quiz.quizBlocked = false;
        quiz.quizDuration = 15;
        quiz.startTime = null;

        sessionStorage.setItem('points', 0);
        sessionStorage.setItem('maxpoints', "1000");
        sessionStorage.setItem('correctanswers', quiz.correctAnswersNumber);
        sessionStorage.setItem('amountquestions', quiz.numberOfQuestions);
        sessionStorage.setItem('rs_fragen', JSON.stringify(quiz.countCorrectAnswers));
        sessionStorage.setItem('time_needed', 0);
    }
    //T08/09 end
};

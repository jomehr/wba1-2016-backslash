//Zur Initialisierung der Views
var view = {

	//View Quizübersicht initialisieren
	initQuizOverview: function () {

		//JSON via AJAX holen
		getAjax(dataUrls.dataQuizOverviewURL, function (data) {
			console.log(data);
			//JSON speichern
			var jsonData = JSON.parse(data);

			//View mit Daten füttern
			var element = document.querySelector('.js-quiz-uebersicht');
			for (var i = 0; i < jsonData.quiz.length; i++)
				{
				var quiz = jsonData.quiz[i];
				var content = '<li><a href="' + viewUrls.viewQuizStartURL + '?quizId=' + quiz.quizID + '">';
				content += '<h2>' + quiz.titel + '</h2>';
				content += '<p>' + quiz.text + '</p>';
				content += '</a></li>';
				element.innerHTML += content;
				}
		})
	},

	//View Quizstart initialisieren
	initQuizStart: function () {

		//JSON via AJAX holen
		getAjax(dataUrls.dataQuizOverviewURL, function (data) {

			//JSON speichern
			var jsonData = JSON.parse(data);

			//quizID aus URL holen
			var quizID = getQueryString('quizId', window.location.href);

			//Ausgewähltes Quiz aus JSOn holen
			var quiz = jsonData.quiz[quizID];

			//View mit Daten füttern
			var element = document.querySelector('.js-quiz-info');
			var content = '<h1>' + quiz.titel + '</h1>';
			content += '<p>' + quiz.text + '</p>';
			element.innerHTML += content;

			var element = document.querySelector('.js-quiz-starten');
			element.setAttribute('href', viewUrls.viewQuizRundeURL + '?quizId=' + quizID);
		})
	},

	//View Quizende initialisieren
	initQuizEnd: function () {

		//quizID aus URL holen
        var quizID = getQueryString('quizId', window.location.href );

		//View mit Daten füttern
		var element = document.querySelector('.js-quiz-starten');
		element.setAttribute('href', viewUrls.viewQuizStartURL + '?quizId=' + quizID);

		document.querySelector('.js-dauer').innerHTML = formatDuration(getQueryString('duration'));
		document.querySelector('.js-anzahl-fragen').innerHTML = getQueryString('numberOfQuestions');
		document.querySelector('.js-anzahl-richtig').innerHTML = getQueryString('countCorrectAnswers');   
        document.querySelector('.js-endpunktzahl').innerHTML = getQueryString('endpunktzahl');
	}
}

//Spiellogik
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
		var indexAnswer = e.target.getAttribute('data-antwort');

		//Wurde die Frage richtig beantwortet?
		if (quiz.currentQuestion.antworten[indexAnswer].check) {
			//quiz.countCorrectAnswers[indexAnswer]++;
            quiz.countCorrectAnswers[quiz.indexCurrentQuestion-1]=true; 
            quiz.correctAnswersNumber++;            
		}
        quiz.nextQuestion();
	},

	//Nächste Frage abrufen
	nextQuestion: function () {
        
		//Haben wir noch eine Frage?
		if (quiz.indexCurrentQuestion < quiz.numberOfQuestions) {

			//Aktuelle Frage und Antworten aus JSON holen
			quiz.currentQuestion = quiz.questions[quiz.indexCurrentQuestion];
            
			//Aktuelle Frage in HTML schreiben
			document.querySelector('.js-quizfrage').innerHTML = quiz.currentQuestion.frage;
            
            //Erstellen eines Arrays mit 4 Zufälligen Zahlen von 1-4 die jeweils einmalig sind
            //für die zufällige Reihenfolge der Buttons
            var arr = []
            while(arr.length < 4){
                var randomnumber = Math.floor(Math.random()*4)
                if(arr.indexOf(randomnumber) > -1) continue;
                arr[arr.length] = randomnumber;
                }
                
			//Antwortbuttons befüllen
			var answerButtons = document.querySelectorAll('.js-answer');
			for (var i = 0; i < answerButtons.length; i++) {
                
                //Ausgabe der Antwort Buttons in zufälliger Reihenfolge
                answerButtons[i].setAttribute("data-antwort", arr[i]);
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

					//Counter clearen
				//	clearInterval(quiz.interval);
				}
			}, 1000)

			//Index erhöhen
			quiz.indexCurrentQuestion++;
		} else {

			//Quizrunde beenden
			quiz.endQuiz();
		}
	},

	//Quiz starten
	startQuiz: function () {

		//Fragen holen
		getAjax(dataUrls.dataQuestionsURL, function (data) {

			//Daten speichern
			var jsonData = JSON.parse(data);

			//QuizID aus URL holen
			var quizID = getQueryString('quizId', window.location.href);

			//Variablen initialisieren
			quiz.indexCurrentQuestion = 0;
			quiz.correctAnswersNumber = 0;
            
            quiz.numberOfQuestions = 10;            
            quiz.questions = new Array;
            
            //Erstellen eines Arrays mit 10 Zufälligen Zahlen von 1-30 die jeweils einmalig sind für die zufällige Reihenfolge der Fragen
            var arr = []
            while(arr.length < 10){
                var randomnumber = Math.floor(Math.random()*30)
                if(arr.indexOf(randomnumber) > -1) continue;
                arr[arr.length] = randomnumber;
                quiz.questions.push(jsonData[quizID].quizFragen[randomnumber]);
                }
            
			quiz.startTime = Date.now();
			quiz.counter = document.querySelector('.js-counter');

			//Eventlistener für Antwortbuttons setzen
			var answerButtons = document.querySelectorAll('.js-answer');
			for (var i = 0; i < answerButtons.length; i++) {
                answerButtons[i].addEventListener('click', quiz.checkAnswer);
			}

			//Frage und Antworten anzeigen
			quiz.nextQuestion();
		});
	},

	endQuiz: function () {
		var currentTime = Date.now();
		var duration = (currentTime - quiz.startTime)/1000;
        
        var gesamtZeitSek = parseFloat(duration, 10).toFixed(3);
        
        console.log(gesamtZeitSek);
        var maxMultiplikator = 1.0;
        var aktMultiplikator = 0;
            if(gesamtZeitSek <= 30)
            {aktMultiplikator = 1.0;}
            else if (gesamtZeitSek >= 80)
            {aktMultiplikator = 0.5;}
            else {aktMultiplikator = maxMultiplikator-(gesamtZeitSek*0.01);}
            
        var endpunktzahl = parseInt(quiz.correctAnswersNumber*100*aktMultiplikator);
        console.log(endpunktzahl);
        


		//QuizID aus URL holen
		var quizID = getQueryString('quizId', window.location.href);

		//Weiterleiten auf Quizende
		window.location.href = viewUrls.viewQuizEndeURL + '?quizId=' + quizID + '&duration=' + duration + '&numberOfQuestions=' + quiz.numberOfQuestions + '&countCorrectAnswers=' + quiz.countCorrectAnswers +'&endpunktzahl=' + endpunktzahl;
	}
}

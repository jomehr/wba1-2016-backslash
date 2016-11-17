//Basis Configs
var base = {
	dataURL: '/assets/json',
	quizDuration: 10
};

//URLs JSONs
var dataUrls = {
    //einbinden der Übersicht JSON
	dataQuizOverviewURL: base.dataURL + '/uebersichtQuiz.json',
    //einbinden der Fragen+Antworten JSON
	dataQuestionsURL: base.dataURL + '/quiz.json'

};

//URLs HTML-Dateien
var viewUrls = {
	viewQuizStartURL: 'quiz-start.html',
	viewQuizRundeURL: 'quiz-runde.html',
	viewQuizEndeURL: 'quiz-ende.html'
};
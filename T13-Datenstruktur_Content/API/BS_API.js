//Die Base-URL für die JSON Dateien (location)
var baseURL = 'https://rawgit.com/th-koeln/wba1-2016-backslash/master/T13-Datenstruktur_Content/JSON'
var extHighscore = '/highscore.json';
var extQuiz = '/quiz.json';
var extView = '/uebersichtQuiz.json';

//Eine der Funktionen, die im HTML Code abgerufen werden können
function loadExample() {
    //Link zu der JSON mit den Daten
    var highscoreData = baseURL + extHighscore;

    //Erstellung einer XMLHttpRequest
    var json_request = new XMLHttpRequest();

    json_request.onreadystatechange = function () {
        if (json_request.readyState == 4 && json_request.status === 200) {
            //Ab hier wird Bearbeitung der erhaltenen json durchgeführt
            //Javascript Funktion JSON.parse zum parsen der JSON data
            var jsonData = JSON.parse(json_request.responseText);
            // jsonData Variable enthält nun die Datenstruktur
            // und kann per jsonData.["Name"] zugegriffen werden
            //Erstellung einer Variable jsonOut, die am Ende zurückgegeben wird
            var jsonOut = jsonData;
            //Funktion zum Übergeben der angefragten Daten
            //trigger benötigt den Eventnamen (selber Name in html-code)
            //und die zu übergebenden Daten (jsonOut in diesem Fall)
            $(document).trigger("onDataDelivered", [jsonOut]);
        }
    };
    json_request.open("GET", highscoreData, true);
    json_request.send();
}

//Holt Quiz mit der passenden ID
function getQuizByID(quizID) {
    var quizData = baseURL + extQuiz;
    var json_request = new XMLHttpRequest();

    json_request.onreadystatechange = function () {
        if (json_request.readyState == 4 && json_request.status === 200) {
            var jsonData = JSON.parse(json_request.responseText);
            var questionArray = [];
            var checkArray = [];

            while (checkArray.length <= jsonData[quizID].quizFragen.length) {
                checkArray.push({done: false});
            }
            while (questionArray.length < 10) {
                var random = Math.floor((Math.random() * jsonData[quizID].quizFragen.length));
                if (checkArray[random].done === false) {
                    questionArray.push(jsonData[quizID].quizFragen[random]);
                    checkArray[random].done = true;
                }
            }
            var jsonOut = ({
                quizID: jsonData[quizID].quizID,
                quizFragen: questionArray
            });
            $(document).trigger("onQuizData", [jsonOut]);
        }
    };
    json_request.open("GET", quizData, true);
    json_request.send();
}

//Holt Highscore mit der passenden ID
function getHighscoreByID(quizID) {
    var highscoreData = baseURL + extHighscore;
    var json_request = new XMLHttpRequest();

    json_request.onreadystatechange = function () {
        if (json_request.readyState == 4 && json_request.status === 200) {
            var jsonData = JSON.parse(json_request.responseText);
            //Die Highscore mit der passenden ID wird der Variable jsonOut zugewiesen
            var jsonOut = jsonData[quizID];
            $(document).trigger("onHighscoreData", [jsonOut]);
        }
    };
    json_request.open("GET", highscoreData, true);
    json_request.send();
}

//Holt QuizUebersicht
var jsonQuizView = "";

function getQuizView(anzahl, searchString, sort) {
    searchString = searchString || "";
    sort = sort || 0;
    var quizView = baseURL + extView;
    var json_request = new XMLHttpRequest();

    json_request.onreadystatechange = function () {
        if (json_request.readyState == 4 && json_request.status === 200) {
            //Abfrage ob die JSON schon geparsed wurde
            if (jsonQuizView == "") {
                var jsonData = JSON.parse(json_request.responseText);
                jsonQuizView = jsonData;
            }
            else {
                jsonData = jsonQuizView;
            }
            //Array in das die angefragten Quize hinzugefuegt werden 
            var quizArray = [];

            //Optionale Suche nach übergebenen Parameter "searchString"
            for (var i = 0; i < jsonData.length; i++) {
                if(searchString != "" && jsonData[i].titel.toLowerCase().search(searchString) >= 0)
                //Bei einem Fund wird dieses Quiz hinzugefuegt
                    quizArray.push(jsonData[i]);
                else if (searchString == "")
                //Der Fall wenn nach keinem Wort gesucht wird
                    quizArray.push(jsonData[i]);
            }
            //Die unterschiedlichen Sortierarten, abfrage auf den Parameter "sort"
            if (sort == 0)
                sortJSON(quizArray, "datum", false);
            else if (sort == 1)
                sortJSON(quizArray, "titel", true);
            else if (sort == 2)
                sortJSON(quizArray, "spielzahl", false);
            else
                sortJSON(quizArray, "datum", false);
            //Zuschneidung des Arrays auf die angefragte Groesse
            var jsonOut = quizArray.slice(0, anzahl);
            $(document).trigger("onQuizView", [jsonOut]);
        }
    };
    json_request.open("GET", quizView, true);
    json_request.send();
}

//Holt ein bestimmtes Quiz aus der Uebersicht
function getQuizViewByID(quizID) {
    var quizView = baseURL + extView;
    var json_request = new XMLHttpRequest();

    json_request.onreadystatechange = function () {
        if (json_request.readyState == 4 && json_request.status === 200) {
            var jsonData = JSON.parse(json_request.responseText);
            //Das Quiz mit der passenden ID wird jsonOut zugewiesen
            var jsonOut = jsonData[quizID];
            $(document).trigger("onQuizViewByID", [jsonOut]);
        }
    };
    json_request.open("GET", quizView, true);
    json_request.send();
}

var jsonHighsorePosition = "";
//Holt 2 Position über und unter den angegebenen Punkten
function getHighscorePositions(quizID, user, punkte, searchString = ""){
    var highscoreData = baseURL + "/highscore.json";
    var json_request = new XMLHttpRequest();

    json_request.onreadystatechange = function(){
        if(json_request.readyState == 4 && json_request.status === 200 ){
			if(jsonHighsorePosition == "") {
				var jsonData = JSON.parse(json_request.responseText);
				jsonHighsorePosition = jsonData;
			}	
			else
				var jsonData = jsonHighsorePosition;
            var hs = jsonData[quizID];
            var highscoreArray = [];
            var done = true;
            var i = 0;
            if(searchString == "") {
				while(done){
					if(i<hs.highscore.length){
						//Abfrage ob die übergebenen Punkte groesser gleich der momentan ausgewaehlten sind
						if(hs.highscore[i].punktzahl <= punkte){
							//Spezialfall wenn Position 1 ist: es werden vier positionen unter dem user hinzugefuegt
							if(hs.highscore[i].position == 1){
								highscoreArray.push({position: 1, name: user, punktzahl: punkte});
								for(var j=0;j<4;j++){highscoreArray.push({position: (hs.highscore[i+j].position)+1,
																		  name: hs.highscore[i+j].name,
																		  punktzahl: hs.highscore[i+j].punktzahl});}
							}
							//Spezialfall wenn Position 2 ist: es werden 3 positionen unter dem user hinzugefuegt und eine darueber
							else if(hs.highscore[i].position == 2){
								highscoreArray.push(hs.highscore[i-1]);
								highscoreArray.push({position: 2, name: user, punktzahl: punkte});
								for(var j=0;j<3;j++){highscoreArray.push({position: (hs.highscore[i+j].position)+1,
																		  name: hs.highscore[i+j].name,
																		  punktzahl: hs.highscore[i+j].punktzahl});}
							}
							//Normalfall: es werden zwei positionen unter dem user hinzugefuegt und zwei darueber
							else if(hs.highscore[i].position < hs.highscore.length){
								for(var j=0;j<2;j++){highscoreArray.push(hs.highscore[i-2+j]);}
								highscoreArray.push({position: i+1, name: user, punktzahl: punkte});
								for(var j=0;j<2;j++){highscoreArray.push({position: (hs.highscore[i+j].position)+1,
																		  name: hs.highscore[i+j].name,
																		  punktzahl: hs.highscore[i+j].punktzahl});}
							}
							//Spezialfall wenn Position n-1 ist: es werden drei positionen ueber dem user hinzugefuegt und eine darunter
							else if(hs.highscore[i].position == hs.highscore.length){
								for(var j=0;j<3;j++){highscoreArray.push(hs.highscore[i-3+j]);}
								highscoreArray.push({position: i+1, name: user, punktzahl: punkte});
								highscoreArray.push({position: (hs.highscore[i].position)+1,
													 name: hs.highscore[i].name,
													 punktzahl: hs.highscore[i].punktzahl});
							}                    
						var jsonOut = ({highscore: highscoreArray});
						//Wenn die Suche erledigt ist wird es auf false gesetzt
						done = false;
						}
					}
					else{
						//Spezialfall wenn Position die Highscorelistlaenge ueberschreitet
						for(var j=0;j<4;j++){highscoreArray.push(hs.highscore[i-4+j]);}
						highscoreArray.push({position: i+1, name: user, punktzahl: punkte});
						var jsonOut = ({highscore: highscoreArray});
						done = false;
					}
					i++;
				}
			}
			else {
				jsonOut = hs.highscore.filter(function(hs){
					return hs.name.toLowerCase().search(searchString.toLowerCase()) > -1 ? true : false;
				});
			}
            $( document ).trigger( "onHighscorePositions", [ jsonOut ] );
        }};
json_request.open("GET", highscoreData,true );
json_request.send();
}

//Zusaetzliche Funktionen fuer die Bearbeitung
//Funktion zum sortieren des Arrays nach bestimmten Kategorien
function sortJSON(json, prop, asc) {
    json = json.sort(function (a, b) {
        if (asc) {
            if (prop == "datum")
                return (parseDate(a[prop]) > parseDate(b[prop])) ? 1 : ((parseDate(a[prop]) < parseDate(b[prop])) ? -1 : 0);
            else if (prop == "spielzahl")
                return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
            else
                return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
        } else {
            if (prop == "datum")
                return (parseDate(b[prop]) > parseDate(a[prop])) ? 1 : ((parseDate(b[prop]) < parseDate(a[prop])) ? -1 : 0);
            else if (prop == "spielzahl")
                return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
            else
                return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
        }
    });
}

//Funktion zum parsen des Datum
function parseDate(input) {
    var parts = input.match(/(\d+)/g);
    return new Date(parts[2], parts[1] - 1, parts[0]);
}

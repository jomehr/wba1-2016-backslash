//Eine der Funktionen, die im HTML Code abgerufen werden können
function loadExample(){
    //Link zu der JSON mit den Daten
    var highscoreData = "https://raw.githubusercontent.com/th-koeln/wba1-2016-backslash/master/T13-Datenstruktur_Content/JSON/highscore.json";
    
    //Erstellung einer XMLHttpRequest
    var json_request = new XMLHttpRequest();

    json_request.onreadystatechange = function(){
        if(json_request.readyState == 4 && json_request.status === 200 ){
            //Javascript Funktion JSON.parse zum parsen der JSON data
            var jsonData = JSON.parse(json_request.responseText);

            // jsonData Variable enthält nun die Datenstruktur
            // und kann per jsonData.["Name"] zugegriffen werden
                       //Erstellung einer Variable jsonOut, die am Ende zurückgegeben wird
            var jsonOut = jsonData;
            //Funktion zum Übergeben der angefragten Daten
            //trigger benötigt den Eventnamen (selber Name in html)
            //und die zu übergebenden Daten (jsonOut in diesem Fall)
            $( document ).trigger( "onDataDelivered", [ jsonOut ] );
        }
    };
json_request.open("GET", highscoreData,true );
json_request.send();
}

//Holt Quiz mit der passenden ID
function getQuizByID(quizID){
    var quizData = "https://rawgit.com/th-koeln/wba1-2016-backslash/master/T13-Datenstruktur_Content/JSON/quiz.json";
    var json_request = new XMLHttpRequest();

    json_request.onreadystatechange = function(){
        if(json_request.readyState == 4 && json_request.status === 200 ){
            var jsonData = JSON.parse(json_request.responseText);
            var questionArray = [];
            var checkArray = [];
            
            while (checkArray.length<=jsonData[quizID].quizFragen.length) {
                checkArray.push({done: false});
                }
                while (questionArray.length<10) {
                    var random = Math.floor((Math.random() * jsonData[quizID].quizFragen.length) ); 
                    if (checkArray[random].done===false) {
                        questionArray.push(jsonData[quizID].quizFragen[random]);
                        checkArray[random].done=true;
                        }               
                }
                var jsonOut = ({quizID: jsonData[quizID].quizID,
                                quizFragen: questionArray});
            $( document ).trigger( "onQuizData", [ jsonOut ] );
        }};
json_request.open("GET", quizData,true );
json_request.send();
}

//Holt Highscore mit der passenden ID
function getHighscoreByID(quizID){
    var highscoreData = "https://rawgit.com/th-koeln/wba1-2016-backslash/master/T13-Datenstruktur_Content/JSON/highscore.json";
    var json_request = new XMLHttpRequest();

    json_request.onreadystatechange = function(){
        if(json_request.readyState == 4 && json_request.status === 200 ){
            var jsonData = JSON.parse(json_request.responseText);
            var jsonOut = jsonData[quizID];
            $( document ).trigger( "onHighscoreData", [ jsonOut ] );
        }};
json_request.open("GET", highscoreData,true );
json_request.send();
}

//Holt QuizUebersicht
var jsonQuizView = "";

function getQuizView(anzahl, searchString = "", sort = 0){
    var quizView = "https://rawgit.com/th-koeln/wba1-2016-backslash/master/T13-Datenstruktur_Content/JSON/uebersichtQuiz.json";
    var json_request = new XMLHttpRequest();

    json_request.onreadystatechange = function(){
        if(json_request.readyState == 4 && json_request.status === 200 ){
            if(jsonQuizView == "") {
                var jsonData = JSON.parse(json_request.responseText);
                jsonQuizView = jsonData;
            }
            else {
                jsonData = jsonQuizView;
            }

            var quizArray = [];

            for(var i=0;i<anzahl;i++){
                if(searchString != "" && jsonData[i].titel.indexOf(searchString) >= 0) 
                    quizArray.push(jsonData[i]);
                else if(searchString == "")
                    quizArray.push(jsonData[i]);
            }

            if(sort == 0) 
                sortJSON(quizArray, "datum", false);
            else if(sort == 1)
                sortJSON(jsonData, "titel", true);
            else if(sort == 2) 
                sortJSON(quizArray, "spielzahl", true);
            else    
                sortJSON(quizArray, "datum", false);

            var jsonOut = quizArray;
            $( document ).trigger( "onQuizView", [ jsonOut ] );
        }};
json_request.open("GET", quizView,true );
json_request.send();
}

//Holt ein bestimmtes Quiz aus der Uebersicht
function getQuizViewByID(quizID){
    var quizView = "https://rawgit.com/th-koeln/wba1-2016-backslash/master/T13-Datenstruktur_Content/JSON/uebersichtQuiz.json";
    var json_request = new XMLHttpRequest();

    json_request.onreadystatechange = function(){
        if(json_request.readyState == 4 && json_request.status === 200 ){
            var jsonData = JSON.parse(json_request.responseText);
            var jsonOut = jsonData[quizID];
   
            $( document ).trigger( "onQuizViewByID", [ jsonOut ] );
        }};
json_request.open("GET", quizView,true );
json_request.send();
}

//Holt 2 Position über und unter den angegebenen Punkten
function getHighscorePositions(quizID, user, punkte){
    var highscoreData = "https://rawgit.com/th-koeln/wba1-2016-backslash/master/T13-Datenstruktur_Content/JSON/highscore.json";
    var json_request = new XMLHttpRequest();

    json_request.onreadystatechange = function(){
        if(json_request.readyState == 4 && json_request.status === 200 ){
            var jsonData = JSON.parse(json_request.responseText);
            var hs = jsonData[quizID];
            var highscoreArray = [];
            var done = true;
            var i = 0;
            
            while(done){
            if(i<hs.highscore.length){
                if(hs.highscore[i].punktzahl <= punkte){
                    
                    if(hs.highscore[i].position == 1){
                        highscoreArray.push({position: 1, name: user, punktzahl: punkte});
                        for(var j=0;j<4;j++){highscoreArray.push({position: (hs.highscore[i+j].position)+1,
                                                                  name: hs.highscore[i+j].name,
                                                                  punktzahl: hs.highscore[i+j].punktzahl});}
                    }
                    
                    else if(hs.highscore[i].position == 2){
                        highscoreArray.push(hs.highscore[i-1]);
                        highscoreArray.push({position: 2, name: user, punktzahl: punkte});
                        for(var j=0;j<3;j++){highscoreArray.push({position: (hs.highscore[i+j].position)+1,
                                                                  name: hs.highscore[i+j].name,
                                                                  punktzahl: hs.highscore[i+j].punktzahl});}
                    }
                    
                    else if(hs.highscore[i].position < hs.highscore.length){
                        for(var j=0;j<2;j++){highscoreArray.push(hs.highscore[i-2+j]);}
                        highscoreArray.push({position: i+1, name: user, punktzahl: punkte});
                        for(var j=0;j<2;j++){highscoreArray.push({position: (hs.highscore[i+j].position)+1,
                                                                  name: hs.highscore[i+j].name,
                                                                  punktzahl: hs.highscore[i+j].punktzahl});}
                    }
                
                    else if(hs.highscore[i].position == hs.highscore.length){
                        for(var j=0;j<3;j++){highscoreArray.push(hs.highscore[i-3+j]);}
                        highscoreArray.push({position: i+1, name: user, punktzahl: punkte});
                        highscoreArray.push({position: (hs.highscore[i].position)+1,
                                             name: hs.highscore[i].name,
                                             punktzahl: hs.highscore[i].punktzahl});
                    }                    
                var jsonOut = ({highscore: highscoreArray});
                done = false;
                }
            }
            else{
                for(var j=0;j<4;j++){highscoreArray.push(hs.highscore[i-4+j]);}
                highscoreArray.push({position: i+1, name: user, punktzahl: punkte});
                var jsonOut = ({highscore: highscoreArray});
                done = false;
            }
                i++;
            }
            
            $( document ).trigger( "onHighscorePositions", [ jsonOut ] );
        }};
json_request.open("GET", highscoreData,true );
json_request.send();
}

//Zusaetzliche Funktionen fuer die Bearbeitung
//Funktion zum sortieren des Arrays
function sortJSON(json, prop, asc) {
    json = json.sort(function(a, b) {
        if (asc) {
            if(prop == "datum") 
                return (parseDate(a[prop]) > parseDate(b[prop])) ? 1 : ((parseDate(a[prop]) < parseDate(b[prop])) ? -1 : 0);
            else if(prop == "spielzahl")
                return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
            else 
                return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);    
        } else {
            if(prop == "datum") 
                return (parseDate(b[prop]) > parseDate(a[prop])) ? 1 : ((parseDate(b[prop]) < parseDate(a[prop])) ? -1 : 0);
            else if(prop == "spielzahl")
                return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
            else
                return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
        }
    });
}

//Funktion zum parsen des Datum
function parseDate(input) {
  var parts = input.match(/(\d+)/g);
  return new Date(parts[2], parts[1]-1, parts[0]);
}

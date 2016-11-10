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
    var quizData = "https://raw.githubusercontent.com/th-koeln/wba1-2016-backslash/master/T13-Datenstruktur_Content/JSON/quiz.json";
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
    var highscoreData = "https://raw.githubusercontent.com/th-koeln/wba1-2016-backslash/master/T13-Datenstruktur_Content/JSON/highscore.json";
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
function getQuizView(anzahl){
    var quizView = "https://raw.githubusercontent.com/th-koeln/wba1-2016-backslash/master/T13-Datenstruktur_Content/JSON/uebersichtQuiz.json";
    var json_request = new XMLHttpRequest();

    json_request.onreadystatechange = function(){
        if(json_request.readyState == 4 && json_request.status === 200 ){
            var jsonData = JSON.parse(json_request.responseText);
            var quizArray = [];
            
            for(var i=0;i<anzahl;i++){
                quizArray.push(jsonData[i]);
            }
            var jsonOut = quizArray;
            $( document ).trigger( "onQuizView", [ jsonOut ] );
        }};
json_request.open("GET", quizView,true );
json_request.send();
}

//Holt ein bestimmtes Quiz aus der Uebersicht
function getQuizViewByID(quizID){
    var quizView = "https://raw.githubusercontent.com/th-koeln/wba1-2016-backslash/master/T13-Datenstruktur_Content/JSON/uebersichtQuiz.json";
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
    var highscoreData = "https://raw.githubusercontent.com/th-koeln/wba1-2016-backslash/master/T13-Datenstruktur_Content/JSON/highscore.json";
    var json_request = new XMLHttpRequest();

    json_request.onreadystatechange = function(){
        if(json_request.readyState == 4 && json_request.status === 200 ){
            var jsonData = JSON.parse(json_request.responseText);
            var hs = jsonData[quizID];
            var highscoreArray = [];
            var done = true;
            var i = 0;
            
            while(done){
                if(hs.highscore[i].punktzahl <= punkte){
                    
                    if(hs.highscore[i].position == 1){
                        highscoreArray.push({position: 1, name: user, punktzahl: punkte});
                        for(var j=0;j<4;j++){highscoreArray.push({position: parseInt(hs.highscore[i+j].position)+1,
                                                                  name: hs.highscore[i+j].name,
                                                                  punktzahl: hs.highscore[i+j].punktzahl});}
                    }
                    
                    else if(hs.highscore[i].position == 2){
                        highscoreArray.push(hs.highscore[i-1]);
                        highscoreArray.push({position: 2, name: user, punktzahl: punkte});
                        for(var j=0;j<3;j++){highscoreArray.push({position: parseInt(hs.highscore[i+j].position)+1,
                                                                  name: hs.highscore[i+j].name,
                                                                  punktzahl: hs.highscore[i+j].punktzahl});}
                    }
                    
                    else{
                        for(var j=0;j<2;j++){highscoreArray.push(hs.highscore[i-2+j]);}
                        highscoreArray.push({position: i+1, name: user, punktzahl: punkte});
                        for(var j=0;j<2;j++){highscoreArray.push({position: parseInt(hs.highscore[i+j].position)+1,
                                                                  name: hs.highscore[i+j].name,
                                                                  punktzahl: hs.highscore[i+j].punktzahl});}
                    }
                    var jsonOut = highscoreArray;
                    done = false;
                }
                i++;
            }
            
            $( document ).trigger( "onHighscorePositions", [ jsonOut ] );
        }};
json_request.open("GET", highscoreData,true );
json_request.send();
}

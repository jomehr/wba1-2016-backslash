//Eine der Funktionen, die im HTML Code abgerufen werden können
//Wichtig ist die beachtung der Parameter des "triggers"
function loadJSON(){
    //Link zu der JSON mit den Daten
    var highscoreData = "https://raw.githubusercontent.com/th-koeln/wba1-2016-backslash/master/T13-Datenstruktur_Content/JSON/highscore.json";
    
    //Erstellung einer XMLHttpRequest
    var json_request = new XMLHttpRequest();

    json_request.onreadystatechange = function(){
        if(json_request.readyState == 4 && json_request.status === 200 ){
            //console.log(json_request.responseText);
            //Javascript Funktion JSON.parse zum parsen der JSON data
            var jsonData = JSON.parse(json_request.responseText);
            //Erstellung einer Variable jsonOut, die am Ende zurückgegeben wird
            var jsonOut = {};

            // jsonData Variable enthält nun die Datenstruktur
            // und kann per jsonData.["Name"] zugegriffen werden
            for(var i=0;i<jsonData.highscore.length;i++){
                //Mit JSON.stringify werden Daten in jsonOut eingefügt
                //im JSON Format
                jsonOut = JSON.stringify({position: jsonData[i].position,
                                          name: jsonData[i].name,
                                          punktzahl: jsonData[i].punktzahl});
            }
            //Funktion zum Übergeben der angefragten Daten
            //trigger benötigt den Eventnamen (selber Name in html)
            //und die zu übergebenden Daten (jsonOut in diesem Fall)
            $( document ).trigger( "onDataDelivered", [ jsonOut ] );
        }
    };
json_request.open("GET", highscoreData,true );
json_request.send();
}

//Holt Daten mit der passenden ID
function getQuizByID(quizID){
    var highscoreData = "https://raw.githubusercontent.com/th-koeln/wba1-2016-backslash/master/T13-Datenstruktur_Content/JSON/highscore.json";
    var json_request = new XMLHttpRequest();

    json_request.onreadystatechange = function(){
        if(json_request.readyState == 4 && json_request.status === 200 ){
            var jsonData = JSON.parse(json_request.responseText);
            var jsonOut = {};

            //for(var i=0;i<jsonData.highscore.length-1;i++){
                jsonOut = JSON.stringify({position: jsonData[quizID].highscore[quizID].position,
                                          name: jsonData[quizID].highscore[quizID].name,
                                          punktzahl: jsonData[quizID].highscore[quizID].punktzahl});
            //}
            $( document ).trigger( "onQuizData", [ jsonOut ] );
        }};
json_request.open("GET", highscoreData,true );
json_request.send();
}

//Holt QuizUebersicht
function getQuizView(){
    var quizView = "https://raw.githubusercontent.com/th-koeln/wba1-2016-backslash/master/T13-Datenstruktur_Content/JSON/uebersichtQuiz.json";
    var json_request = new XMLHttpRequest();

    json_request.onreadystatechange = function(){
        if(json_request.readyState == 4 && json_request.status === 200 ){
            var jsonData = JSON.parse(json_request.responseText);
            var jsonOut = {};
            var quizArray = new array();
            
            for(var i=0;i<3;i++){
                quizArray.push({quizID: jsonData[i].quizID,
                                titel: jsonData[i].titel,
                                autor: jsonData[i].autor,
                                datum: jsonData[i].datum,
                                spielzahl: jsonData[i].spielzahl,
                                bild: jsonData[i].bild,
                                text: jsonData[i].text
                });
                jsonOut = JSON.stringify(quizArray);
            }
            
            $( document ).trigger( "onQuizView", [ jsonOut ] );
        }};
json_request.open("GET", quizView,true );
json_request.send();
}

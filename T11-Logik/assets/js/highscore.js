//ID des Quiz dessen Highscore ausgegeben werden soll
var quizID = 0;
getHighscoreByID(quizID);

$(document).on( "onHighscoreData", function( event, data) { 
// Hier werden die erhaltenen Daten bearbeitet
// in “data“ sind die Informationen

//Data wird in highscore gespeichert, welches als JSON-String in den Local Storage gespeichert wird
 var highscore = data.highscore;
localStorage.setItem("highscore", JSON.stringify(highscore));   
});

//zugreifen auf den Highscore der in Localstorage gespeichert ist
var storedHighscore = JSON.parse(localStorage.getItem("highscore"));
console.log(storedHighscore);

//durch die Schleife können alle Elemente des Highscores ausgegeben werden
//die Daten werden aus dem Local Storage geladen
    var i;
    for(i=0;i<storedHighscore.length;i++)
        {
            console.log("<p>Position:"+storedHighscore[i].position+"</p>");
            console.log("<p>Name:"+storedHighscore[i].name+"</p>");
            console.log("<p>Punktzahl:"+storedHighscore[i].punktzahl+"</p>");       
        }
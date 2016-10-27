var fcount;     //Fragen-Zähler
var timer;      //Timer während einer Runde
var score;      //Punkteanzahl
var maxf;       //maximale Anzahl Fragen einer Runde
var fragen;     //Fragen eines Quiz im Array

function quizAbrufen() {      //JSON-Datei mit Inhalt der Fragen/Antworten in [fragen] speichern
            
}

function frageAnzeigen() {   //Frage der jeweiligen Spielrunde anzeigen

}
countdown();
function countdown() {           //Countdown wie viel Zeit für eine Spielrunde übrig sind
    
    timer = 45;
    runningTimer(timer);
}

function runningTimer(int) {
    console.log(int);
    if(int == 0)
        console.log("end");
    else
        setTimeout(function(){runningTimer(int-1)}, 1000);
}


function abbrechen() {       //Quiz beenden und zurück zu Home

}

function quizBeendet() {     //Quiz beenden und Score anzeigen

}
 
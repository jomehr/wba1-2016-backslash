var Quizobject = {};
var sessionobject = {};

function fnc_reloadssobject(callback) {   // function to reload sessionobject
    sessionobject = {
        "points": sessionStorage.getItem('points'),
        "maxpoints": sessionStorage.getItem('maxpoints'),
        "countright": sessionStorage.getItem('correctanswers'),
        "countquestions": sessionStorage.getItem('amountquestions'),
        "quizID": sessionStorage.getItem('quizid'),
        "username": sessionStorage.getItem('username'),
        "view": sessionStorage.getItem('view')
    };
    if (typeof callback == "function") {  //callback to for other functions to say done.
        callback("justheretosayimready");
    }
}

var view = {
    availableViews: [   //array available views
        "quizoverview", //0
        "quizinfo",     //1
        "quizround",    //2
        "quizend",      //3
        "highscore"     //4
    ],
    name: "quizoverview",
    render: function (view, callback) {
        //reset quizround mobile optimizations for all views
        $("body").removeClass("qr-mobile-body");
        if (this.availableViews.indexOf(view) > -1) {   //check if called view is defined
            var pre_function = this["pre_" + view];
            if (typeof pre_function == "function") {  //check if prefunction is existing. if does get template with data else render template without data
                pre_function(function (data) {     //Call prefunction, on callback execute remaining
                    $.get("templates/" + view + ".tpl", function (source) {   //Jquery call to get template
                        var template = Handlebars.compile(source);
                        var templatespaceholder = $("#templatespaceholder");
                        templatespaceholder.empty();
                        templatespaceholder.append(template(data));
                        this.name = view;

                        if (typeof callback == "function") {    //callback for after render attribute changing
                            callback(data);
                        }
                    });
                });
            } else {
                $.get("templates/" + view + ".tpl", function (source) { //jquery call to get template
                    var template = Handlebars.compile(source);
                    var templatespaceholder = $("#templatespaceholder");
                    templatespaceholder.empty();
                    templatespaceholder.append(template());   //append empty template
                    this.name = view;

                    if (typeof callback == "function") {  //callback for after render attribute changing
                        callback(data);
                    }
                });
            }
        }
    },
    pre_quizoverview: function (callback) { // prefunction

        getQuizView(10);  // Request API

        $(document).on("onQuizView", function (event, data) { // ON API callback add data
            Quizobject.quizes = data; //copy object

            if (typeof callback == "function") {    //Callback finish prefunction for render function to proceed
                callback(Quizobject);
            }
        });
    },
    pre_quizinfo: function (callback) {
        getQuizViewByID(sessionobject.quizID);  //Request API

        $(document).on("onQuizViewByID", function (event, data) {   // API Response
            Quizobject.quizinfo = data;
            Quizobject.sessionobject = sessionobject;

            if (typeof callback == "function") { //Callback finish prefunction for render function to proceed
                callback(Quizobject);
            }
        });
    },
    pre_quizround: function (callback) {
        getQuizByID(sessionobject.quizID);

        $(document).on("onQuizData", function (event, data) {
            Quizobject.quiz = data;
            Quizobject.sessionobject = sessionobject;
            getQuizViewByID(sessionobject.quizID);
        });
        $(document).on("onQuizViewByID", function (event, data) {
          Quizobject.quiz.titel = data.titel;
          if (typeof callback == "function") { //Callback finish prefunction for render function to proceed
              callback(Quizobject);
          }
        });
    },
    pre_quizend: function (callback) {
        fnc_reloadssobject(function (ready) {   //reload sessionobject
            getQuizViewByID(sessionobject.quizID);   //API call
        });
        $(document).on("onQuizViewByID", function (event, data) {
            getHighscorePositions(sessionobject.quizID, sessionobject.username, sessionobject.points);    //NEXT API Request for highscore position.
            var quizInfo = {};
            Quizobject.datquiz = data;
        });

        // HIGHSCORE info
        $(document).on("onHighscorePositions", function (event, data) {
            getQuizView(7);
            $.extend(Quizobject.datquiz, data);
        });

        //Random Quiz Vorschlag
        $(document).on("onQuizView", function (event, data) {
            var nQuizObject = data; //copy object
            var quizInfo = data;
            var icount = 0;
            var ARQused = [];
            ARQused[0] = sessionobject.quizID;
            var iRand = Math.random();

            //RAND Quiz außer aufgerufene Quiz.
            for (var i = 0; icount < 4; i++) {    // loop to generate 4 random quizes as next suggestion.
                iRand = Math.round(Math.random() * ( quizInfo.length - 0 ));  //rand generate
                if (iRand !== 0) {  //if Rand !=0 Rand-1
                    iRand--;
                }
                while ((ARQused.indexOf("" + iRand) > -1)) {  //if iRand is in the index of ARQ (ArrayRandomQuiz) -> generate new rand
                    iRand = Math.round(Math.random() * ( quizInfo.length - 0 ));
                    if (iRand !== 0) {
                        iRand--;
                    }
                }

                if (quizInfo[iRand].quizID !== sessionobject.quizID) { // <- Abfrage ob QuizID != Random ID ist wenn false neu generieren
                    icount++; //increase counter
                    ARQused[icount] = quizInfo[iRand].quizID;
                    nQuizObject[icount - 1] = quizInfo[iRand];
                    if (quizInfo[iRand].bild === "/URL") {    //check if the image link is corrupt
                        quizInfo[iRand].bild = "https://raw.githubusercontent.com/th-koeln/wba1-2016-backslash/master/T10-Asset/Bilder/Bilder%20Klein/Stadion3-Klein.jpg";
                    }
                }
            }

            Quizobject.quizes = nQuizObject;    //add the rand quiz object to the quizobject
            Quizobject.quizes = Quizobject.quizes.slice(0, 4);    //Slice to only have 4 attributes
            $.extend(Quizobject.datquiz, sessionobject);  //extend with sessionobject

            if (typeof callback == "function") { //Callback finish prefunction for render function to proceed
                callback(Quizobject);
            }
        });
    },
    pre_highscore: function (callback) {
        getHighscoreByID(sessionobject.quizID); //API Request

        $(document).on("onHighscoreData", function (event, data) {  //on API callback add data
            Quizobject = data;
            Quizobject.sessionobject = sessionobject;

            if (typeof callback == "function") { //Callback finish prefunction for render function to proceed
                callback(Quizobject);
            }
        });
    }
};
